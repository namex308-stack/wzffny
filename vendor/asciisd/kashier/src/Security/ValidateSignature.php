<?php

namespace Asciisd\Kashier\Security;

use Asciisd\Kashier\Rest\ApiContext;

/**
 * Class Cipher
 *
 * Helper class to encrypt data with api key
 *
 * @package Asciisd\Kashier\Security
 */
class ValidateSignature implements ICipher
{
    private $payload;
    private $apiContext;

    public function __construct(ApiContext $apiContext, $payload)
    {
        $this->apiContext = $apiContext;
        $this->payload = $payload;
    }

    /**
     * Encrypts the input text using the cipher key
     *
     * @return string
     */
    public function encrypt()
    {
        return hash_hmac('sha256', $this->payload, $this->apiContext->getCredential()->getApiKey(), false);
    }
}
