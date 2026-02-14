<?php

namespace Asciisd\Kashier\Auth;

use Asciisd\Kashier\Common\KashierModel;
use Asciisd\Kashier\Exception\KashierConfigurationException;

/**
 * Class KashierKey
 */
class KashierKey extends KashierModel
{
    /**
     * Client secret as obtained from the developer portal
     *
     * @var string $apiKey
     */
    private string $apiKey;

    /**
     * Construct
     *
     * @param string $apiKey client secret obtained from the developer portal
     * @throws KashierConfigurationException
     */
    public function __construct($apiKey)
    {
        parent::__construct();
        $this->apiKey = $apiKey;
    }

    /**
     * Get Client Secret
     *
     * @return string
     */
    public function getApiKey(): string
    {
        return $this->apiKey;
    }
}
