<?php

namespace Asciisd\Kashier\Handler;

/**
 * Interface IKashierHandler
 *
 * @package Asciisd\Kashier\Handler
 */
interface IKashierHandler
{
    /**
     *
     * @param \Asciisd\Kashier\Core\KashierHttpConfig $httpConfig
     * @param string $request
     * @param mixed $options
     * @return mixed
     */
    public function handle($httpConfig, $request, $options);
}
