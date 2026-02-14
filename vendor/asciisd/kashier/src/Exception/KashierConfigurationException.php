<?php

namespace Asciisd\Kashier\Exception;

/**
 * Class KashierConfigurationException
 *
 * @package Asciisd\Kashier\Exception
 */
class KashierConfigurationException extends \Exception
{
    /**
     * Default Constructor
     *
     * @param string|null $message
     * @param int $code
     */
    public function __construct($message = null, int $code = 0)
    {
        parent::__construct($message, $code);
    }
}
