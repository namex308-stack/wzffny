<?php

namespace Asciisd\Kashier\Api;

use Asciisd\Kashier\Api\Data\TokenizationRequest;
use Asciisd\Kashier\Common\KashierResourceModel;
use Asciisd\Kashier\Exception\KashierConfigurationException;
use Asciisd\Kashier\Exception\KashierConnectionException;
use Asciisd\Kashier\Rest\ApiContext;
use Asciisd\Kashier\Security\ICipher;
use Asciisd\Kashier\Transport\KashierRestCall;

/**
 * Class Tokenization
 *
 * Lets you create a new checkout post request.
 *
 * @package Asciisd\Kashier\Api
 *
 * @property TokenizationRequest $tokenizationRequest
 * @property string $status
 * @property array $body
 * @property array error
 */
class Tokenization extends KashierResourceModel
{
    /**
     * @param Data\TokenizationRequest $tokenizationRequest
     *
     * @return self
     */
    public function setTokenizationRequest(Data\TokenizationRequest $tokenizationRequest): Tokenization
    {
        $this->tokenizationRequest = $tokenizationRequest;

        return $this;
    }

    /**
     * Creates and processes a tokenization request.
     *
     * @param ApiContext $apiContext is the APIContext for this call. It can be used to pass dynamic configuration and credentials.
     * @param ICipher $cipher
     * @param KashierRestCall $restCall is the Rest Call Service that is used to make rest calls
     *
     * @return self
     * @throws KashierConfigurationException
     * @throws KashierConnectionException
     */
    public function send(ApiContext $apiContext, ICipher $cipher, KashierRestCall $restCall = null): Tokenization
    {
        $this->getTokenizationRequest()
            ->setMerchantId($apiContext->getMerchantId())
            ->setHash($cipher->encrypt());

        $payLoad = $this->getTokenizationRequest()->toJSON();
        $json = self::executeCall(
            '/tokenization',
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
     * @return Data\TokenizationRequest
     */
    public function getTokenizationRequest(): Data\TokenizationRequest
    {
        return $this->tokenizationRequest;
    }

    public function isSuccess(): bool
    {
        return strtoupper($this->getStatus()) === 'SUCCESS';
    }

    /**
     * @return string
     */
    public function getStatus(): string
    {
        $body = $this->getBody();
        return $body['status'];
    }

    /**
     * @return array
     */
    public function getBody(): array
    {
        return $this->body;
    }

    /**
     * @return array
     */
    public function getError(): array
    {
        return $this->error;
    }

    public function getErrorMessage()
    {
        $error = $this->getError();

        if (isset($error['explanation'])) {
            return $error['explanation'];
        }

        return null;
    }
}
