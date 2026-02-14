<?php

if (!defined('ABSPATH')) {
    exit;
}

/**
 * WC_Gateway_Kashier class.
 *
 * @extends WC_Payment_Gateway
 */
class WC_Gateway_Kashier_Installment extends WC_Gateway_Kashier
{
    protected $_code = 'bank_installments';
    protected $icons = ['bank-installments'];

}
