<?php

if (!defined('ABSPATH')) {
    exit;
}

/**
 * WC_Gateway_Kashier class.
 *
 * @extends WC_Payment_Gateway
 */
class WC_Gateway_Kashier_Wallet extends WC_Gateway_Kashier
{
    protected $_code = 'wallet';
    protected $icons = ['meeza-wallet'];

}
