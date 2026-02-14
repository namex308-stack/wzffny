<?php

namespace Asciisd\Kashier\Api\Data;

use Asciisd\Kashier\Common\KashierModel;

/**
 * Class RefundRequest
 *
 * A resource representing a Refund request.
 * @package Asciisd\Kashier\Api
 *
 * @property string merchantId
 * @property string amount
 * @property string transactionId
 * @property string orderId
 *
 */
class RefundRequest extends KashierModel
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
     * @return RefundRequest
     */
    public function setMerchantId($merchantId): RefundRequest
    {
        $this->merchantId = $merchantId;

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
     * @return RefundRequest
     */
    public function setOrderId($orderId): RefundRequest
    {
        $this->orderId = $orderId;

        return $this;
    }

    /**
     * @return string
     */
    public function getTransactionId(): string
    {
        return $this->transactionId;
    }

    /**
     * @param $transactionId
     *
     * @return RefundRequest
     */
    public function setTransactionId($transactionId): RefundRequest
    {
        $this->transactionId = $transactionId;

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
     * @param string $amount
     * @return RefundRequest
     */
    public function setAmount(string $amount): RefundRequest
    {
        $this->amount = $amount;

        return $this;
    }
}
