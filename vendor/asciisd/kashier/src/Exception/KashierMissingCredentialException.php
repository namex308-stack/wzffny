<?php

namespace Asciisd\Kashier\Exception;

/**
 * Class KashierMissingCredentialException
 *
 * @package Asciisd\Kashier\Exception
 */
class KashierMissingCredentialException extends \Exception
{
    /**
     * Default Constructor
     *
     * @param string|null $message
     * @param int $code
     */
    public function __construct(string $message = null, int $code = 0)
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
