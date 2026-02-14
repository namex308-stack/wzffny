<?php

namespace Asciisd\Kashier\Api\Data;

use Asciisd\Kashier\Common\KashierModel;

/**
 * Class CheckoutRequest
 *
 * A resource representing a Checkout request.
 * @package Asciisd\Kashier\Api
 *
 * @property string hash
 * @property string serviceName
 * @property int expiry_year
 * @property int expiry_month
 * @property int ccv
 * @property string card_holder_name
 * @property string card_number
 * @property string merchantRedirect
 * @property string currency
 * @property string amount
 * @property string order
 * @property string orderId
 * @property string merchantId
 * @property string mid
 * @property string cardToken
 * @property string ccvToken
 * @property string shopper_reference
 * @property string display
 *
 */
class CheckoutRequest extends KashierModel
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
     * @return CheckoutRequest
     */
    public function setMerchantId($merchantId): CheckoutRequest
    {
        $this->merchantId = $merchantId;
        $this->mid = $merchantId;

        return $this;
    }

    /**
     * @return string
     */
    public function getOrder(): string
    {
        return $this->order;
    }

    /**
     * @param $order
     *
     * @return CheckoutRequest
     */
    public function setOrder($order): CheckoutRequest
    {
        $this->order = $order;
        return $this;
    }

    /**
     * @return string
     */
    public function getOrderId(): string
    {
        return $this->orderId;
    }

    /**
     * @param $orderId
     *
     * @return CheckoutRequest
     */
    public function setOrderId($orderId): CheckoutRequest
    {
        $this->orderId = $orderId;
        return $this;
    }

    /**
     * @return string
     */
    public function getAmount(): string
    {
        return $this->amount;
    }

    /**
     * @param $amount
     *
     * @return CheckoutRequest
     */
    public function setAmount($amount): CheckoutRequest
    {
        $this->amount = $amount;
        return $this;
    }

    /**
     * @return string
     */
    public function getCurrency(): string
    {
        return $this->currency;
    }

    /**
     * @param $currency
     *
     * @return CheckoutRequest
     */
    public function setCurrency($currency): CheckoutRequest
    {
        $this->currency = $currency;
        return $this;
    }

    /**
     * @return string
     */
    public function getMerchantRedirect(): string
    {
        return $this->merchantRedirect;
    }

    /**
     * @param $merchantRedirect
     *
     * @return CheckoutRequest
     */
    public function setMerchantRedirect($merchantRedirect): CheckoutRequest
    {
        $this->merchantRedirect = $merchantRedirect;
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
     * @return CheckoutRequest
     */
    public function setCardNumber($card_number): CheckoutRequest
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
     * @return CheckoutRequest
     */
    public function setCardHolderName($card_holder_name): CheckoutRequest
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
     * @return CheckoutRequest
     */
    public function setCcv($ccv): CheckoutRequest
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
     * @return CheckoutRequest
     */
    public function setExpiryMonth($expiry_month): CheckoutRequest
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
     * @return CheckoutRequest
     */
    public function setExpiryYear($expiry_year): CheckoutRequest
    {
        $this->expiry_year = $expiry_year;
        return $this;
    }

    /**
     * @return string
     */
    public function getServiceName(): string
    {
        return $this->serviceName;
    }

    /**
     * @param $serviceName
     *
     * @return CheckoutRequest
     */
    public function setServiceName($serviceName): CheckoutRequest
    {
        $this->serviceName = $serviceName;
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
     * @return CheckoutRequest
     */
    public function setHash($hash): CheckoutRequest
    {
        $this->hash = $hash;

        return $this;
    }

    /**
     * @return string
     */
    public function getCardToken(): string
    {
        return $this->cardToken;
    }

    /**
     * @param string $cardToken
     * @return CheckoutRequest
     */
    public function setCardToken(string $cardToken): CheckoutRequest
    {
        $this->cardToken = $cardToken;

        return $this;
    }

    /**
     * @return string
     */
    public function getCcvToken(): string
    {
        return $this->ccvToken;
    }

    /**
     * @param string $ccvToken
     * @return CheckoutRequest
     */
    public function setCcvToken(string $ccvToken): CheckoutRequest
    {
        $this->ccvToken = $ccvToken;

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
     * @return CheckoutRequest
     */
    public function setShopperReference(string $shopper_reference): CheckoutRequest
    {
        $this->shopper_reference = $shopper_reference;
        return $this;
    }

    /**
     * @return string
     */
    public function getMid(): string
    {
        return $this->mid;
    }

    /**
     * @param string $mid
     * @return CheckoutRequest
     */
    public function setMid(string $mid): CheckoutRequest
    {
        $this->mid = $mid;

        return $this;
    }

    /**
     * @return array
     */
    public function getConnectedAccount(): array
    {
        return $this->connected_account;
    }

    /**
     * @param string $mid
     * @return CheckoutRequest
     */
    public function setConnectedAccount(string $mid): CheckoutRequest
    {
        $this->connected_account = array(
            'mid' => $mid
        );

        return $this;
    }

    /**
     * @return string
     */
    public function getDisplay(): string
    {
        return $this->display;
    }

    /**
     * @param string $display
     * @return CheckoutRequest
     */
    public function setDisplay(string $display): string
    {
        $this->display = $display;

        return $this;
    }


}
