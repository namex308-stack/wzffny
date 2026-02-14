<?php

namespace Asciisd\Kashier\Iframe;

/**
 * Class IframeParameter
 *
 * A resource representing a Iframe Parameter.
 * @package Asciisd\Kashier\Iframe
 *
 * @property string hash
 * @property string merchantRedirect
 * @property string currency
 * @property string amount
 * @property string orderId
 * @property string merchantId
 * @property string shopper_reference
 * @property string display
 * @property string mode
 * @property string method
 * @property string color
 *
 */
class IframeParameter
{
    /**
     * @return string
     */
    public function getMerchantId()
    {
        return $this->merchantId;
    }

    /**
     * @param $merchantId
     *
     * @return IframeParameter
     */
    public function setMerchantId($merchantId)
    {
        $this->merchantId = $merchantId;

        return $this;
    }


    /**
     * @return string
     */
    public function getOrderId()
    {
        return $this->orderId;
    }

    /**
     * @param $orderId
     *
     * @return IframeParameter
     */
    public function setOrderId($orderId)
    {
        $this->orderId = $orderId;
        return $this;
    }

    /**
     * @return string
     */
    public function getAmount()
    {
        return $this->amount;
    }

    /**
     * @param $amount
     *
     * @return IframeParameter
     */
    public function setAmount($amount)
    {
        $this->amount = $amount;
        return $this;
    }

    /**
     * @return string
     */
    public function getCurrency()
    {
        return $this->currency;
    }

    /**
     * @param $currency
     *
     * @return IframeParameter
     */
    public function setCurrency($currency)
    {
        $this->currency = $currency;
        return $this;
    }

    /**
     * @return string
     */
    public function getMerchantRedirect()
    {
        return $this->merchantRedirect;
    }

    /**
     * @param $merchantRedirect
     *
     * @return IframeParameter
     */
    public function setMerchantRedirect($merchantRedirect)
    {
        $this->merchantRedirect = $merchantRedirect;
        return $this;
    }

    /**
     * @return string
     */
    public function getShopperReference()
    {
        return $this->shopper_reference;
    }

    /**
     * @param string $shopper_reference
     * @return IframeParameter
     */
    public function setShopperReference($shopper_reference)
    {
        $this->shopper_reference = $shopper_reference;
        return $this;
    }

    /**
     * @return string
     */
    public function getDisplay()
    {
        return $this->display;
    }

    /**
     * @param string $display
     * @return IframeParameter
     */
    public function setDisplay($display)
    {
        $this->display = $display;

        return $this;
    }

    /**
     * @return string
     */
    public function getHash()
    {
        return $this->hash;
    }

    /**
     * @param $hash
     *
     * @return IframeParameter
     */
    public function setHash($hash)
    {
        $this->hash = $hash;

        return $this;
    }

    /**
     * @return string
     */
    public function getMode()
    {
        return $this->mode;
    }

    /**
     * @param $mode
     *
     * @return IframeParameter
     */
    public function setMode($mode)
    {
        $this->mode = $mode ;
        return $this;
    }

    /**
     * @return string
     */
    public function getMethod()
    {
        return $this->method;
    }

    /**
     * @param $method
     *
     * @return IframeParameter
     */
    public function setMethod($method)
    {
        $this->method = $method ;
        return $this;
    }

    /**
     * @return string
     */
    public function getColor()
    {
        return $this->color;
    }

    /**
     * @param $color
     *
     * @return IframeParameter
     */
    public function setColor($color)
    {
        $this->color = $color ;
        return $this;
    }

}
