<?php

namespace Asciisd\Kashier\Facades;

use Asciisd\Kashier\KashierService;
use Illuminate\Support\Facades\Facade;

/**
 * @method static KashierService setApiKey(): string
 * @method static KashierService generateOrderHash($amount, $order_id, $currency = "EGP", $customerReference = ""): string
 * @method static KashierService buildPaymentUrl($amount, $order_id, $currency = "EGP", $customerReference = ""): string
 */
class Kashier extends Facade
{
    protected static function getFacadeAccessor(): string
    {
        return 'kashier';
    }
}
