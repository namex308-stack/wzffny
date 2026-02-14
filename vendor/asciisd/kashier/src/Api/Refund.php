<?php

namespace Asciisd\Kashier\Api;

use Asciisd\Kashier\Api\Data\RefundRequest;
use Asciisd\Kashier\Common\KashierResourceModel;
use Asciisd\Kashier\Exception\KashierConfigurationException;
use Asciisd\Kashier\Exception\KashierConnectionException;
use Asciisd\Kashier\Rest\ApiContext;
use Asciisd\Kashier\Transport\KashierRestCall;

/**
 * Class Refund
 *
 * Lets you create a new checkout post request.
 *
 * @package Asciisd\Kashier\Api
 *
 * @property RefundRequest $checkoutRequest
 * @property string $status
 * @property array $response
 * @property array error
 */
class Refund extends KashierResourceModel
{
    public const PENDING_STATUS_MAP = [
        'PENDING',
        'PENDING_ACTION'
    ];

    /**
     * @param RefundRequest $checkoutRequest
     *
     * @return Refund
     */
    public function setRefundRequest(RefundRequest $checkoutRequest): Refund
    {
        $this->checkoutRequest = $checkoutRequest;

        return $this;
    }

    /**
     * Creates and processes a checkout.
     *
     * @param ApiContext $apiContext is the APIContext for this call. It can be used to pass dynamic configuration and credentials.
     * @param KashierRestCall $restCall is the Rest Call Service that is used to make rest calls
     *
     * @return Refund
     * @throws KashierConfigurationException
     * @throws KashierConnectionException
     */
    public function create(ApiContext $apiContext, KashierRestCall $restCall = null): Refund
    {
        $transactionId = $this->getRefundRequest()->getTransactionId();
        $orderId = $this->getRefundRequest()->getOrderId();

        $payLoad = $this->getRefundRequest()->toJSON();

        $json = self::executeCall(
            '/orders/'.$orderId.'/transactions/'.$transactionId.'?operation=refund',
            'PUT',
            $payLoad,
            array('Authorization' => $apiContext->getSecretKey()),
            $apiContext,
            $restCall
        );

        $this->fromJson($json);

        return $this;
    }

    /**
     * @return RefundRequest
     */
    public function getRefundRequest(): RefundRequest
    {
        return $this->checkoutRequest;
    }

    public function isSuccess(): bool
    {
        $response = $this->getResponse();

        if (isset($response['status'])) {
            return strtoupper($response['status']) === 'SUCCESS';
        }

        return false;
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
