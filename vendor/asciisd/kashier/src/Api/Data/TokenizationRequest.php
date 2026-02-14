<?php

namespace Asciisd\Kashier\Api\Data;

use Asciisd\Kashier\Common\KashierModel;

/**
 * Class TokenizationRequest
 *
 * A resource representing a Tokenization request.
 * @package Asciisd\Kashier\Api
 *
 * @property string shopper_reference
 * @property string hash
 * @property string expiry_year
 * @property string expiry_month
 * @property string ccv
 * @property string card_holder_name
 * @property string card_number
 * @property string tokenValidity
 * @property string merchantId
 *
 */
class TokenizationRequest extends KashierModel
{
    /**
     * @return string
     */
    public function getMerchantId(): string
    {
        return $this->merchantId;
    }

    /**
     * @param $merchantId
     *
     * @return TokenizationRequest
     */
    public function setMerchantId($merchantId): TokenizationRequest
    {
        $this->merchantId = $merchantId;

        return $this;
    }

    /**
     * @return string
     */
    public function getTokenValidity(): string
    {
        return $this->tokenValidity;
    }

    /**
     * @param $tokenValidity
     *
     * @return TokenizationRequest
     */
    public function setTokenValidity($tokenValidity): TokenizationRequest
    {
        $this->tokenValidity = $tokenValidity;
        return $this;
    }

    /**
     * @return string
     */
    public function getCardNumber(): string
    {
        return $this->card_number;
    }

    /**
     * @param $card_number
     *
     * @return TokenizationRequest
     */
    public function setCardNumber($card_number): TokenizationRequest
    {
        $this->card_number = $card_number;
        return $this;
    }

    /**
     * @return string
     */
    public function getCardHolderName(): string
    {
        return $this->card_holder_name;
    }

    /**
     * @param $card_holder_name
     *
     * @return TokenizationRequest
     */
    public function setCardHolderName($card_holder_name): TokenizationRequest
    {
        $this->card_holder_name = $card_holder_name;
        return $this;
    }

    /**
     * @return int
     */
    public function getCcv(): int
    {
        return $this->ccv;
    }

    /**
     * @param $ccv
     *
     * @return TokenizationRequest
     */
    public function setCcv($ccv): TokenizationRequest
    {
        $this->ccv = $ccv;
        return $this;
    }

    /**
     * @return int
     */
    public function getExpiryMonth(): int
    {
        return $this->expiry_month;
    }

    /**
     * @param $expiry_month
     *
     * @return TokenizationRequest
     */
    public function setExpiryMonth($expiry_month): TokenizationRequest
    {
        $this->expiry_month = $expiry_month;
        return $this;
    }

    /**
     * @return int
     */
    public function getExpiryYear(): int
    {
        return $this->expiry_year;
    }

    /**
     * @param $expiry_year
     *
     * @return TokenizationRequest
     */
    public function setExpiryYear($expiry_year): TokenizationRequest
    {
        $this->expiry_year = $expiry_year;
        return $this;
    }

    /**
     * @return string
     */
    public function getHash(): string
    {
        return $this->hash;
    }

    /**
     * @param $hash
     *
     * @return TokenizationRequest
     */
    public function setHash($hash): TokenizationRequest
    {
        $this->hash = $hash;

        return $this;
    }

    /**
     * @return string
     */
    public function getShopperReference(): string
    {
        return $this->shopper_reference;
    }

    /**
     * @param string $shopper_reference
     * @return TokenizationRequest
     */
    public function setShopperReference(string $shopper_reference): TokenizationRequest
    {
        $this->shopper_reference = $shopper_reference;

        return $this;
    }
}
