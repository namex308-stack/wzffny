<?php

if (!defined('ABSPATH')) {
    exit;
}

/**
 * WC_Gateway_Kashier class.
 *
 * @extends WC_Payment_Gateway
 */
class Gateway_Kashier_Aman extends WC_Gateway_Kashier
{
    protected $_code = 'aman';
    protected $icons = ['aman'];

}
