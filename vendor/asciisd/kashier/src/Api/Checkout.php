<?php

namespace Asciisd\Kashier\Api;

use Asciisd\Kashier\Api\Data\CheckoutRequest;
use Asciisd\Kashier\Common\KashierResourceModel;
use Asciisd\Kashier\Exception\KashierConfigurationException;
use Asciisd\Kashier\Exception\KashierConnectionException;
use Asciisd\Kashier\Rest\ApiContext;
use Asciisd\Kashier\Security\ICipher;
use Asciisd\Kashier\Transport\KashierRestCall;

/**
 * Class Checkout
 *
 * Lets you create a new checkout post request.
 *
 * @package Asciisd\Kashier\Api
 *
 * @property CheckoutRequest $checkoutRequest
 * @property string $status
 * @property array $response
 * @property array error
 */
class Checkout extends KashierResourceModel
{
    public const PENDING_STATUS_MAP = [
        'PENDING',
        'PENDING_ACTION'
    ];

    /**
     * @param CheckoutRequest $checkoutRequest
     *
     * @return Checkout
     */
    public function setCheckoutRequest(CheckoutRequest $checkoutRequest): Checkout
    {
        $this->checkoutRequest = $checkoutRequest;

        return $this;
    }

    /**
     * Creates and processes a checkout.
     *
     * @param ApiContext $apiContext is the APIContext for this call. It can be used to pass dynamic configuration and credentials.
     * @param ICipher $cipher
     * @param KashierRestCall $restCall is the Rest Call Service that is used to make rest calls
     *
     * @return Checkout
     * @throws KashierConfigurationException
     * @throws KashierConnectionException
     */
    public function create(ApiContext $apiContext, ICipher $cipher, KashierRestCall $restCall = null): Checkout
    {
        $this->getCheckoutRequest()
            ->setMerchantId($apiContext->getMerchantId())
            ->setHash($cipher->encrypt());

        $payLoad = $this->getCheckoutRequest()->toJSON();
        $json = self::executeCall(
            '/checkout',
            'POST',
            $payLoad,
            null,
            $apiContext,
            $restCall
        );

        $this->fromJson($json);

        return $this;
    }

    /**
     * @return CheckoutRequest
     */
    public function getCheckoutRequest(): CheckoutRequest
    {
        return $this->checkoutRequest;
    }

    public function isSuccess(): bool
    {
        $response = $this->getResponse();

        if (isset($response['card']['result'])) {
            return strtoupper($response['card']['result']) === 'SUCCESS';
        }

        return false;
    }

    public function isPending(): bool
    {
        $responseData = $this->getResponse();
        return in_array($this->getStatus(), self::PENDING_STATUS_MAP)
            || (isset($responseData['card']['result']) && in_array($responseData['card']['result'], self::PENDING_STATUS_MAP));
    }

    public function is3DsRequired(): bool
    {
        $responseData = $this->getResponse();
        return $this->isPending() && isset($responseData['card']['3DSecure']);
    }

    /**
     * @return string
     */
    public function getStatus(): string
    {
        return $this->status;
    }

    /**
     * @return array
     */
    public function getResponse(): array
    {
        return $this->response;
    }

    /**
     * @return array
     */
    public function getMessages(): array
    {
        return $this->messages;
    }

    public function getErrorMessage()
    {
        $responseData = $this->getResponse();
        $errorMessages = $this->getMessages();

        if (isset($errorMessages['en'])) {
            return $errorMessages['en'];
        }

        if (isset($responseData['messages']['en'])) {
            return $responseData['messages']['en'];
        }
    }

}
