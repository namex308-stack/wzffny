<?php

if (!defined('ABSPATH')) {
    exit;
}

/**
 * WC_Gateway_Kashier class.
 *
 * @extends WC_Payment_Gateway
 */
class WC_Gateway_Kashier_Valu extends WC_Gateway_Kashier
{
    protected $_code = 'valu';
    protected $icons = ['valu'];

}
