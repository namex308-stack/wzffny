<?php

namespace Asciisd\Kashier;

use Exception;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\URL;
use InvalidArgumentException;

/**
 * Class KashierService
 *
 * Handles integration with Kashier payment gateway
 *
 * @package Asciisd\Kashier
 */
class KashierService
{
    /**
     * Default allowed payment methods
     *
     * @var string
     */
    private const DEFAULT_ALLOWED_METHODS = 'card,wallet,bank_installments';

    /**
     * Kashier checkout base URL
     *
     * @var string
     */
    private const CHECKOUT_BASE_URL = 'https://checkout.kashier.io/';

    /**
     * Kashier API base URL
     *
     * @var string
     */
    private const API_BASE_URL = 'https://api.kashier.io/';

    /**
     * Kashier test API base URL
     *
     * @var string
     */
    private const TEST_API_BASE_URL = 'https://test-api.kashier.io/';

    /**
     * @var string Payment methods allowed for this transaction
     */
    private string $allowedMethods;

    /**
     * KashierService constructor
     *
     * @param string|null $allowedMethods Optional custom allowed payment methods
     */
    public function __construct(?string $allowedMethods = null)
    {
        $this->allowedMethods = $allowedMethods ?? self::DEFAULT_ALLOWED_METHODS;
    }

    /**
     * Process a payment
     *
     * @return string
     */
    public function processPayment(): string
    {
        return "Processing Kashier payment!";
    }

    /**
     * Generate a secure hash for the order
     *
     * @param int $amount The order amount
     * @param string $orderId The unique order ID
     * @param string $currency The currency code (e.g. EGP, USD)
     * @return string The generated hash
     */
    public function generateOrderHash(int $amount, string $orderId, string $currency): string
    {
        $mid = config('kashier.mid');
        $secret = config('kashier.apikey');

        $path = "/?payment={$mid}.{$orderId}.{$amount}.{$currency}";
        return hash_hmac('sha256', $path, $secret);
    }

    /**
     * Build the complete payment URL for redirecting to Kashier
     *
     * @param int $amount The order amount
     * @param string $orderId The unique order ID
     * @param array $attributes Additional attributes to include in the URL
     * @return string The complete payment URL
     * @throws InvalidArgumentException If the required configuration is missing
     */
    public function buildPaymentUrl(int $amount, string $orderId, array $attributes = []): string
    {
        $this->validateAmount($amount);
        $this->validateOrderId($orderId);

        $currency = config('kashier.currency');
        $hash = $this->generateOrderHash($amount, $orderId, $currency);

        $callbackUrl = URL::to('/kashier/response');
        $webhookUrl = URL::to('/kashier/webhook');

        $queryParams = array_merge([
            'merchantId' => config('kashier.mid'),
            'orderId' => $orderId,
            'amount' => $amount,
            'currency' => $currency,
            'mode' => config('kashier.mode'),
            'hash' => $hash,
            'merchantRedirect' => $callbackUrl,
            'serverWebhook' => $webhookUrl,
            'allowedMethods' => $this->allowedMethods,
            'display' => 'en',
            'redirectMethod' => 'post'
        ], $attributes);

        return self::CHECKOUT_BASE_URL.'?'.http_build_query($queryParams);
    }

    /**
     * Retrieve transaction details from Kashier API
     *
     * @param string $orderId The order ID to retrieve details for
     * @return array The transaction details
     * @throws Exception If the API request fails
     */
    public function getTransactionDetails(string $orderId): array
    {
        $this->validateOrderId($orderId);

        $mid = config('kashier.mid');
        $baseUrl = $this->isTestMode() ? self::TEST_API_BASE_URL : self::API_BASE_URL;

        // Use custom auth token if provided, otherwise use the configured API key
        $authToken = config('kashier.secretKey');

        try {
            // Get transaction details directly from the transaction endpoint
            $response = Http::withHeaders([
                'Authorization' => $authToken
            ])->get("{$baseUrl}payments/orders/{$orderId}");

            if ($response->failed()) {
                // Try with merchantId in the path
                $response = Http::withHeaders([
                    'Authorization' => $authToken
                ])->get("{$baseUrl}payments/orders/{$mid}/{$orderId}");

                if ($response->failed()) {
                    // Fallback to the order reconciliation endpoint from the Postman collection
                    $response = Http::withHeaders([
                        'Authorization' => $authToken
                    ])->get("{$baseUrl}payments/orders/{$orderId}");

                    if ($response->failed()) {
                        throw new Exception("Failed to retrieve transaction details: ".$response->body());
                    }
                }
            }

            $data = $response->json();

            if (isset($data['status']) && $data['status'] !== 'SUCCESS') {
                // Handle authorization errors specifically
                if ($data['status'] === 'UNAUTHORIZED') {
                    $message = "Authentication failed: Your API token may have expired or is invalid. Please check your Kashier API credentials.";
                    throw new Exception($message);
                }

                $message = $data['messages']['en'] ?? $data['error']['message'] ?? 'Unknown error occurred';
                throw new Exception("Kashier API error: {$message}");
            }

            return $data['response'] ?? [];
        } catch (Exception $e) {
            throw new Exception("Error retrieving transaction details: ".$e->getMessage(), 0, $e);
        }
    }

    /**
     * Set the allowed payment methods
     *
     * @param string $methods Comma-separated list of payment methods
     * @return $this
     */
    public function setAllowedMethods(string $methods): self
    {
        $this->allowedMethods = $methods;
        return $this;
    }

    /**
     * Get a configuration value with validation
     *
     * @param string $key Configuration key
     * @param string $name Human-readable name for error messages
     * @return mixed The configuration value
     * @throws InvalidArgumentException If the configuration value is missing
     */
    private function getConfigValue(string $key, string $name)
    {
        $value = Config::get($key);

        if (empty($value)) {
            throw new InvalidArgumentException("Kashier {$name} is not configured properly.");
        }

        return $value;
    }

    /**
     * Check if the service is in test mode
     *
     * @return bool True if in test mode, false otherwise
     */
    private function isTestMode(): bool
    {
        return strtolower(config('kashier.mode')) === 'test';
    }

    /**
     * Validate the payment amount
     *
     * @param int $amount The amount to validate
     * @throws InvalidArgumentException If the amount is invalid
     */
    private function validateAmount(int $amount): void
    {
        if (! is_numeric($amount) || $amount <= 0) {
            throw new InvalidArgumentException('Payment amount must be a positive number.');
        }
    }

    /**
     * Validate the order ID
     *
     * @param string $orderId The order ID to validate
     * @throws InvalidArgumentException If the order ID is invalid
     */
    private function validateOrderId(string $orderId): void
    {
        if (empty($orderId)) {
            throw new InvalidArgumentException('Order ID cannot be empty.');
        }
    }
}
