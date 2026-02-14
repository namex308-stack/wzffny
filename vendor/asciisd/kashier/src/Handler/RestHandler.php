<?php

/**
 * API handler for all REST API calls
 */

namespace Asciisd\Kashier\Handler;

use Asciisd\Kashier\Auth\KashierKey;
use Asciisd\Kashier\Common\KashierUserAgent;
use Asciisd\Kashier\Core\KashierConstants;
use Asciisd\Kashier\Core\KashierHttpConfig;
use Asciisd\Kashier\Exception\KashierConfigurationException;
use Asciisd\Kashier\Exception\KashierInvalidCredentialException;

/**
 * Class RestHandler
 */
class RestHandler implements IKashierHandler
{
    /**
     * Private Variable
     *
     * @var \Asciisd\Kashier\Rest\ApiContext $apiContext
     */
    private $apiContext;

    /**
     * Construct
     *
     * @param \Asciisd\Kashier\Rest\ApiContext $apiContext
     */
    public function __construct($apiContext)
    {
        $this->apiContext = $apiContext;
    }

    /**
     * @param KashierHttpConfig $httpConfig
     * @param string $request
     * @param mixed $options
     * @return mixed|void
     * @throws KashierConfigurationException
     * @throws KashierInvalidCredentialException
     */
    public function handle($httpConfig, $request, $options)
    {
        $credential = $this->apiContext->getCredential();
        $config = $this->apiContext->getConfig();

        if ($credential == null || !($credential instanceof KashierKey)) {
            throw new KashierInvalidCredentialException('Invalid credentials passed');
        }

        $httpConfig->setUrl(
            rtrim(trim($this->_getEndpoint($config)), '/') .
            (isset($options['path']) ? $options['path'] : '')
        );

        if (!array_key_exists('User-Agent', $httpConfig->getHeaders())) {
            $httpConfig->addHeader('User-Agent', KashierUserAgent::getValue(KashierConstants::SDK_NAME, KashierConstants::SDK_VERSION));
        }

        // Add any additional Headers that they may have provided
        $headers = $this->apiContext->getRequestHeaders();
        foreach ($headers as $key => $value) {
            $httpConfig->addHeader($key, $value);
        }
    }

    /**
     * End Point
     *
     * @param array $config
     *
     * @return string
     * @throws \Asciisd\Kashier\Exception\KashierConfigurationException
     */
    private function _getEndpoint($config)
    {
        if (isset($config['service.EndPoint'])) {
            return $config['service.EndPoint'];
        }

        if (isset($config['mode'])) {
            switch (strtoupper($config['mode'])) {
                case 'SANDBOX':
                    return KashierConstants::REST_SANDBOX_ENDPOINT;
                    break;
                case 'LIVE':
                    return KashierConstants::REST_LIVE_ENDPOINT;
                    break;
                default:
                    throw new KashierConfigurationException('The mode config parameter must be set to either sandbox/live');
                    break;
            }
        } else {
            // Defaulting to Sandbox
            return KashierConstants::REST_SANDBOX_ENDPOINT;
        }
    }
}
