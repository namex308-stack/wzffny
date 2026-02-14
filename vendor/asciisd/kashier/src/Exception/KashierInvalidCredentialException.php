<?php

namespace Asciisd\Kashier\Exception;

/**
 * Class KashierInvalidCredentialException
 *
 * @package Asciisd\Kashier\Exception
 */
class KashierInvalidCredentialException extends \Exception
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

    /**
     * prints error message
     *
     * @return string
     */
    public function errorMessage(): string
    {
        return 'Error in line '.$this->getLine().' in '.$this->getFile()
            .': <b>'.$this->getMessage().'</b>';
    }
}
