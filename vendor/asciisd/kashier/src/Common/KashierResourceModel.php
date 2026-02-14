<?php

namespace Asciisd\Kashier\Common;

use Asciisd\Kashier\Exception\KashierConfigurationException;
use Asciisd\Kashier\Exception\KashierConnectionException;
use Asciisd\Kashier\Handler\RestHandler;
use Asciisd\Kashier\Rest\ApiContext;
use Asciisd\Kashier\Rest\IResource;
use Asciisd\Kashier\Transport\KashierRestCall;

/**
 * Class KashierResourceModel
 * An Executable KashierModel Class
 *
 * @package Asciisd\Kashier\Common
 */
class KashierResourceModel extends KashierModel implements IResource
{
    /**
     * Execute SDK Call to Kashier services
     *
     * @param string $url
     * @param string $method
     * @param string $payLoad
     * @param array $headers
     * @param ApiContext|null $apiContext
     * @param KashierRestCall|null $restCall
     * @param array $handlers
     * @return string json response of the object
     * @throws KashierConfigurationException
     * @throws KashierConnectionException
     */
    protected static function executeCall(string $url, string $method, string $payLoad, array $headers = array(), ApiContext $apiContext = null, KashierRestCall $restCall = null, array $handlers = [RestHandler::class]): string
    {
        //Initialize the context and rest call object if not provided explicitly
        $apiContext = $apiContext ?: new ApiContext(self::$credential);
        $restCall = $restCall ?: new KashierRestCall($apiContext);

        //Make the execution call
        return $restCall->execute($url, $method, $payLoad, $handlers, $headers);
    }
}
