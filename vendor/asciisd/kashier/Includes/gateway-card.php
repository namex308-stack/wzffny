<?php

if (!defined('ABSPATH')) {
    exit;
}

/**
 * WC_Gateway_Kashier class.
 *
 * @extends WC_Payment_Gateway
 */
class WC_Gateway_Kashier_Card extends WC_Gateway_Kashier
{
    protected $_code = 'card';
    protected $icons = ['credit-card','visa','mastercard','meeza'];

}
