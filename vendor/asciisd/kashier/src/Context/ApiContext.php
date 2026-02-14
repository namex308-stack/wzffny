<?php

namespace Asciisd\Kashier\Context;

use Asciisd\Kashier\Auth\KashierKey;
use Asciisd\Kashier\Core\KashierConfigManager;

/**
 * Class Context
 *
 * Call level parameters such as credentials ... etc.
 *
 * @package Asciisd\Kashier\Context
 */
class ApiContext
{
    private string $merchantId;

    /**
     * This is a placeholder for holding credential for the request
     * If the value is not set, it would get the value from @\Asciisd\Kashier\Core\KashierCredentialManager
     *
     * @var KashierKey|null
     */
    private ?KashierKey $credential;


    private mixed $secretKey;

    /**
     * Construct
     *
     * @param string $merchantId
     * @param KashierKey|null $credential
     * @param string $secretKey
     */
    public function __construct(string $merchantId, KashierKey $credential = null, $secretKey = null)
    {
        $this->merchantId = $merchantId;
        $this->credential = $credential;
        $this->secretKey = $secretKey;
    }

    public function getMerchantId(): string
    {
        return $this->merchantId;
    }

    /**
     * Get Credential
     *
     * @return ?KashierKey
     */
    public function getCredential(): ?KashierKey
    {
        return $this->credential;
    }

    public function getSecretKey()
    {
        return $this->secretKey;
    }

    /**
     * Sets Config
     *
     * @param array $config SDK configuration parameters
     */
    public function setConfig(array $config): void
    {
        KashierConfigManager::getInstance()->addConfigs($config);
    }

    /**
     * Gets Configurations
     *
     * @return array
     */
    public function getConfig(): array
    {
        return KashierConfigManager::getInstance()->getConfigHashmap();
    }

    /**
     * Gets a specific configuration from key
     *
     * @param $searchKey
     * @return mixed
     */
    public function get($searchKey)
    {
        return KashierConfigManager::getInstance()->get($searchKey);
    }
}
