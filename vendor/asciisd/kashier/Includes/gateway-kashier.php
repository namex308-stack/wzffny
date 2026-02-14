<?php

if (! defined('ABSPATH')) {
    exit;
}

class Gateway_Kashier
{
    /**
     * @var string
     */
    protected $_code = '';
    /**
     * @var string
     */
    public $id = '';
    /**
     * @var string
     */
    public $api_key;
    /**
     * @var string
     */
    public $secret_key;
    /**
     * @var bool
     */
    public $testmode;
    /**
     * @var string
     */
    public $merchant_id;
    /**
     * @var string
     */
    public $advanced_options;
    /**
     * @var string
     */
    public $selected_currency;
    /**
     * @var string
     */
    public $exchange_rate;
    /**
     * @var string
     */
    public $enable_connected_account;
    /**
     * @var string
     */
    public $connectedAccount;
    /**
     * @var string
     */
    public $color;
    /**
     * @var string
     */
    public $method;
    /**
     * @var bool
     */
    public $logging_enabled;
    /**
     * @var \Asciisd\Kashier\ApiContext\ApiContext
     */
    public $apiContext;
    public $request_url;
    public $test_url = "https://test-api.kashier.io/merchant";
    public $live_url = "https://api.kashier.io/merchant";
    private string $title;
    private string $description;
    private bool $enabled;
    private string $method_title;
    private string $method_description;
    private string $method_public_description;
    private bool $has_fields;
    private array $supports;

    /**
     * Constructor
     */
    public function __construct()
    {
        $this->id = "kashier_{$this->_code}";
        $this->method_title = WC_Kashier_Helper::get_localized_message($this->_code, 'payment_method_title');
        $this->method_description = sprintf(WC_Kashier_Helper::get_localized_message($this->_code, 'payment_method_description'), 'https://kashier.io/', 'https://merchant.kashier.io/en/signup');
        $this->method_public_description = WC_Kashier_Helper::get_localized_message($this->_code, 'payment_method_public_description');
        $this->has_fields = true;
        $this->supports = [
            'products',
            'refunds'
        ];


        // Load the form fields.
        $this->init_form_fields();

        // Load the settings.
        $this->init_settings();

        // Get setting values.
        $this->title = $this->get_option('title');
        $this->description = $this->get_option('description');
        $this->enabled = $this->get_option('enabled');
        $this->testmode = 'yes' === $this->get_option('testmode');
        $this->logging_enabled = 'yes' === $this->get_option('logging');
        $this->merchant_id = $this->get_option('merchant_id');
        $this->secret_key = $this->testmode ? $this->get_option('test_secret_key') : $this->get_option('secret_key');
        $this->request_url = $this->testmode ? $this->test_url : $this->live_url;

        $this->api_key = $this->testmode ? $this->get_option('test_api_key') : $this->get_option('api_key');
        $this->advanced_options = 'yes' === $this->get_option('advanced_options');

        if ($this->get_option('enforce_egp_payment') === 'yes') {
            $this->selected_currency = 'EGP';
            // $this->exchange_rate = number_format((float)$this->get_option('exchange_rate'), 2, '.', '');
        }
        if ($this->advanced_options) {

            $this->enable_connected_account = 'yes' === $this->get_option('connected_account');
        }

        $this->apiContext = new \Asciisd\Kashier\Rest\ApiContext(
            $this->merchant_id,
            new \Asciisd\Kashier\Auth\KashierKey($this->api_key),
            $this->secret_key
        );


        $this->apiContext->setConfig([
            'mode' => $this->testmode ? 'sandbox' : 'live',
            'log.LogEnabled' => $this->logging_enabled,
            'log.LogLevel' => $this->testmode ? 'debug' : 'info',
            'log.AdapterFactory' => WC_Kashier_Logger_Factory::class
        ]);

        // Hooks.
        add_action('wp_enqueue_scripts', [$this, 'payment_scripts']);
        add_action('woocommerce_update_options_payment_gateways_'.$this->id, [$this, 'process_admin_options']);
        add_action('set_logged_in_cookie', [$this, 'set_cookie_on_current_request']);
        add_action('woocommerce_receipt_'.$this->id, [$this, 'kashier_receipt_page']);
        add_action('woocommerce_api_wc_gateway_'.$this->id, array($this, 'check_response'));
    }


    public function admin_options()
    {
        parent::admin_options();
        $path = plugins_url('/Kashier-WooCommerce-Plugin-master/assets/js/kashier-admin.js');
        echo "<script type='text/javascript' id='kashier-admin' methodId='$this->id' src='$path'></script>";

    }

    /**
     * Initialise Gateway Settings Form Fields
     */
    public function init_form_fields()
    {
        $this->form_fields = require __DIR__.'/admin/kashier-settings.php';
    }

    /**
     *
     */
    public function check_response()
    {
        $localizedErrors = WC_Kashier_Helper::get_localized_messages();

        $response = [
            'result' => 'failure',
        ];

        $headers = getallheaders();
        // Lower case all keys
        $headers = array_change_key_case($headers);

        $kashierSignature = $headers['x-kashier-signature'];


        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $post_data = file_get_contents('php://input');
            $json_data = json_decode($post_data, true);
            $obj = $json_data['data'];
            $event = $json_data['event'];

            $data = [];

            foreach ($obj['signatureKeys'] as $key) {
                $data[$key] = $obj[$key];
            }

            $order_id = substr($obj['merchantOrderId'], 0, -11);
            $order = wc_get_order($order_id);

            if (! $order || ! is_a($order, WC_Order::class)) {
                return;
            }

            // $payment_id = $this->getPaymentMethod($order);
            // if ($payment_id != $this->id) {
            //     // return;
            // }
            $payment_gateway = wc_get_payment_gateway_by_order($order);

            $this->apiContext = new \Asciisd\Kashier\Rest\ApiContext(
                $payment_gateway->merchant_id,
                new \Asciisd\Kashier\Auth\KashierKey($payment_gateway->api_key),
                $payment_gateway->secret_key
            );

            $queryString = http_build_query($data, $numeric_prefix = "", $arg_separator = '&', $encoding_type = PHP_QUERY_RFC3986);

            $validateSignature = new \Asciisd\Kashier\Security\ValidateSignature($this->apiContext, $queryString);

            $signature = $validateSignature->encrypt();

            if ($signature === $kashierSignature) {

                if ($event === 'pay') {
                    if (strtoupper($obj['status']) === 'SUCCESS') {
                        $this->_payment_success_handler($order, wc_clean($obj['transactionId']));

                        $response['result'] = 'success';
                        $order->set_transaction_id($obj['transactionId']);
                        update_post_meta($order_id, 'kashierOrderId', wc_clean($obj['kashierOrderId']), true);
                        // $response['redirect'] = $this->get_return_url($order);
                    } else {
                        // wc_add_notice($localizedErrors[$this->id]['please_check_card_info'], 'error');
                        $message = sprintf(__('(Transaction ID: %s)', 'woocommerce-gateway-kashier'), $obj['transactionId']);
                        $order->add_order_note(__('Payment Error: ').' '.$message);
                        $order->update_status('failed');
                        // $response['redirect'] = $order->get_checkout_payment_url();
                    }
                } elseif ($event === 'refund') {
                    $transaction_from_admin = in_array($obj['transactionId'], get_post_meta($order_id, '_refund_transaction_'));
                    if (! $transaction_from_admin) {
                        if (strtoupper($obj['status']) === 'SUCCESS') {
                            $refund = wc_create_refund([
                                'amount' => $obj['amount'],
                                'reason' => 'Kashier refund',
                                'order_id' => $order_id,
                                'refund_payment' => false,
                                // 'refund_id' => 0,
                                // 'line_items'   => $line_items,
                                // 'restock_items'  => false
                            ]);

                            if (! is_wp_error($refund)) {
                                $message = sprintf(__('(Transaction ID: %s)', 'woocommerce-gateway-kashier'), $obj['transactionId']);
                                $order->add_order_note(__('Successful refund: ').' '.$message);
                                $response['result'] = 'success';
                            } else {
                                $order->add_order_note(__('Refund Error: ').' '.$refund->get_error_message());
                            }

                            // $response['redirect'] = $this->get_return_url($order);
                        } else {
                            // wc_add_notice($localizedErrors[$this->id]['please_check_card_info'], 'error');
                            $message = sprintf(__('(Transaction ID: %s)', 'woocommerce-gateway-kashier'), $obj['transactionId']);
                            $order->add_order_note(__('Refund Error: ').' '.$message);
                            // $response['redirect'] = $order->get_checkout_payment_url();
                        }
                    }
                }
            } else {
                wc_add_notice($localizedErrors[$this->_code]['order_not_found'], 'error');
            }

            wp_send_json($response);
        }
    }


    private function getPaymentMethod($order)
    {
        return WooCommerce2 ? $order->payment_method : $order->get_payment_method();
    }

    /**
     * @param WC_Order $order
     * @param string $transaction_id
     */
    protected function _payment_success_handler($order, $transaction_id)
    {
        $order->payment_complete($transaction_id);
        $message = sprintf(__('Kashier charge complete (Transaction ID: %s)', 'woocommerce-gateway-kashier'), $transaction_id);
        $order->add_order_note($message);

        // Remove cart.
        WC()->cart->empty_cart();
    }


    // to check our merchant is pf or psp

    public function check_kashier_merchant()
    {
        try {

            $args = array(
                'headers' => array('Content-Type' => 'application/json', 'Authorization' => $this->secret_key),

            );
            $response = wp_remote_get($this->request_url, $args);
            $response = preg_replace('/[\x00-\x1F\x80-\xFF]/', '', wp_remote_retrieve_body($response));
            $result = is_wp_error($response) ? $response : json_decode($response, true);
            return ($result['response']['accountType']) == "PF";
        } catch (\ReflectionException $e) {

            return false;
        }

    }

    //get rate
    public function get_rate($currancy)
    {


        try {


            $args = array(
                'headers' => array('Content-Type' => 'application/json', 'Authorization' => $this->secret_key),

            );
            $url = "https://api.kashier.io/v3/payment/exchange-rate?from=EGP&to={$currancy}";


            $response = wp_remote_get($url, $args);
            $response = preg_replace('/[\x00-\x1F\x80-\xFF]/', '', wp_remote_retrieve_body($response));
            $rate_resutl = is_wp_error($response) ? $response : json_decode($response, true);

            $currencyConversionRate = $rate_resutl['rates']["$currancy"];

            return $currencyConversionRate;
        } catch (\ReflectionException $e) {

            return false;
        }

    }

    /**
     * @param $order_id
     */

    public function kashier_receipt_page($order_id)
    {
        global $woocommerce;


        $order = new WC_Order($order_id);

        if ($this->check_kashier_merchant()) {

            if ($this->get_rate($order->get_currency()) == false) {
                $this->selected_currency = $order->get_currency();

            } else {
                $this->exchange_rate = $this->get_rate($order->get_currency());

            }
        } else {
            $this->selected_currency = $order->get_currency();
        }
        $connected_account_mid = get_post_meta($order_id, 'connectedAccount', true);
        $redirectUrl = get_post_meta($order_id, '$redirectUrl', true);

        $parameters = [
            "context" => $this->apiContext,
            "method" => $this->_code,
            "mode" => $this->testmode ? 'test' : 'live',
            "advanced_options" => $this->advanced_options,
            "selected_currency" => $this->selected_currency,
            "exchange_rate" => $this->exchange_rate,
            "connected_account_mid" => $this->enable_connected_account && isset($connected_account_mid) ? $connected_account_mid : null,
            "order" => $order,
            "webhookParameter" => 'wc_gateway_'.$this->id,
            "redirectUrl" => $redirectUrl,
        ];

        WC_Kashier_Helper::prepare_script($parameters);

    }


    /**
     * Checks if gateway should be available to use.
     */
    public function is_available()
    {
        if (is_add_payment_method_page()) {
            return false;
        }

        return parent::is_available();
    }

    /**
     * Get_icon function.
     *
     *
     *
     * @return string
     */
    public function get_icon()
    {
        $icons = $this->payment_icons();
        $icons_str = '';

        foreach ($icons as $icon => $src) {
            $icons_str .= $src;
        }

        return apply_filters('woocommerce_gateway_icon', $icons_str, $this->id);
    }

    /**
     * All payment icons that work with Kashier. Some icons references
     * WC core icons.
     *
     * @return array
     */
    public function payment_icons()
    {
        $list_icons = [];
        foreach ($this->icons as $icon) {
            $list_icons[$icon] = '<img src="'.WC_KASHIER_PLUGIN_URL.'/assets/images/'.$icon.'.svg" class="kashier-'.$icon.'-icon kashier-icon" alt="'.$icon.'" />';
        }
        return apply_filters(
            'wc_kashier_payment_icons',
            $list_icons
        );
    }

    /**
     * Payment form on checkout page
     */
    public function payment_fields()
    {
        $description = $this->get_description();
        $description = ! empty($description) ? $description : '';

        if ($this->testmode) {
            $description .= ' '.__('TEST MODE ENABLED', 'woocommerce-gateway-kashier');
        }

        $description = trim($description);

        echo apply_filters('wc_kashier_description', wpautop(wp_kses_post($description)), $this->id);


        $this->elements_form();

        echo '<div id="secured-by-kashier-container"><img src="'.WC_KASHIER_PLUGIN_URL.'/assets/images/secured-by-kashier.png" alt="Secured by Kashier"/></div>';

        do_action('wc_kashier_cards_payment_fields', $this->id);
    }

    /**
     * Renders the Kashier elements form.
     */
    public function elements_form()
    {


    }

    /**
     * Payment_scripts function.
     *
     * Outputs scripts used for kashier payment
     */
    public function payment_scripts()
    {
        global $woocommerce;

        if (! is_product() && ! is_cart() && ! is_checkout() && ! isset($_GET['pay_for_order']) && ! is_add_payment_method_page() && ! isset($_GET['change_payment_method'])) { // wpcs: csrf ok.
            return;
        }

        // If Kashier is not enabled bail.
        if ('no' === $this->enabled) {
            return;
        }

        // If keys are not set bail.
        if (! $this->are_keys_set()) {
            WC_Kashier_Logger::addLog('Keys are not set correctly.');
            return;
        }

        $suffix = defined('SCRIPT_DEBUG') && SCRIPT_DEBUG ? '' : '';

        wp_register_style('kashier_styles', plugins_url('assets/css/kashier-styles.css', WC_KASHIER_MAIN_FILE), [], WC_KASHIER_VERSION);
        wp_enqueue_style('kashier_styles');


        wp_register_script('woocommerce_kashier_iframe', plugins_url('assets/js/kashier-iframe'.$suffix.'.js', WC_KASHIER_MAIN_FILE), ['jquery-payment'], WC_KASHIER_VERSION, true);

        $kashier_params = [];


        $kashier_params['is_order_pay_page'] = is_wc_endpoint_url('order-pay');

        $kashier_params['callback_url'] = add_query_arg('wc-api', 'WC_Gateway_Kashier', home_url('/'));

        if ($kashier_params['is_order_pay_page']) {
            $order_id = wc_get_order_id_by_order_key(urldecode($_GET['key']));
            $order = wc_get_order($order_id);
            if (is_a($order, WC_Order::class)) {
                $kashier_params['billing_first_name'] = WC_Kashier_Helper::is_wc_lt('3.0') ? $order->billing_first_name : $order->get_billing_first_name();
                $kashier_params['billing_last_name'] = WC_Kashier_Helper::is_wc_lt('3.0') ? $order->billing_last_name : $order->get_billing_last_name();

                $kashier_params['current_order_key'] = urldecode($_GET['key']);
                $kashier_params['return_url'] = esc_url_raw($this->get_return_url($order));
                $kashier_params['callback_url'] = add_query_arg('wc-api', 'WC_Gateway_Kashier', home_url('/'));
            }
        }

        // Merge localized messages to be use in JS.
        $kashier_params = array_merge($kashier_params, WC_Kashier_Helper::get_localized_messages()[$this->_code]);
        $kashier_params = apply_filters('wc_kashier_params', $kashier_params);

        wp_localize_script('woocommerce_kashier_iframe', 'wc_kashier_params', $kashier_params);

        wp_enqueue_script('woocommerce_kashier_iframe');
    }

    /**
     * Checks if keys are set.
     *
     *
     * @return bool
     */
    public function are_keys_set()
    {
        if (empty($this->api_key)) {
            return false;
        }

        return true;
    }


    /**
     * Process the payment
     *
     * @param int $order_id Reference.
     * @param bool $retry Should we retry on fail.
     * @param bool $force_save_source Force save the payment source.
     * @param bool $previous_error Any error message from previous request.
     *
     * @return array
     * @throws \Asciisd\Kashier\Exception\KashierConfigurationException
     * @throws \Asciisd\Kashier\Exception\KashierConnectionException
     */
    public function process_payment($order_id, $retry = true, $force_save_source = false, $previous_error = false)
    {
        $order = wc_get_order($order_id);

        $redirectUrl = $this->get_return_url($order);
        // update_post_meta( $order_id,  'redirectUrl', $redirectUrl );

        //  $this->connectedAccount =  WC_Kashier_Helper::connected_account($this->advanced_options, $this->enable_connected_account, $_POST);


        // if(isset($this->connectedAccount)){
        //    update_post_meta( $order_id,  'connectedAccount', $this->connectedAccount );
        // }


        // if (0 >= $order->get_total()) {
        //     return $this->complete_free_order($order);
        // }

        // This will throw exception if not valid.
        // $this->validate_minimum_order_amount($order);

        WC_Kashier_Logger::addLog("Info: Begin processing payment for order $order_id for the amount of {$order->get_total()}");

        // WC_Kashier_Logger::addLog('Processing response: ' . print_r($response, true));

        $redirectUrl = $order->get_checkout_payment_url(true);
        WC_Kashier_Logger::addLog('redirect url: '.$redirectUrl);

        if (is_callable([$order, 'save'])) {
            $order->save();
        }

        return [
            'result' => 'success',
            'redirect' => $redirectUrl,
        ];

    }

    /**
     * Process the payment
     *
     * @param int $order_id Reference.
     * @param bool $retry Should we retry on fail.
     * @param bool $force_save_source Force save the payment source.
     * @param bool $previous_error Any error message from previous request.
     *
     * @return array
     * @throws \Asciisd\Kashier\Exception\KashierConfigurationException
     * @throws \Asciisd\Kashier\Exception\KashierConnectionException
     */
    public function process_refund($order_id, $amount = null, $reason = '')
    {
        $result = false;
        $order = wc_get_order($order_id);
        $kashierOrderId = get_post_meta($order_id, 'kashierOrderId', true);
        $connectedAccount = get_post_meta($order_id, 'connectedAccount', true);


        $transaction_id = $order->get_transaction_id();

        if (! $amount || ! $transaction_id || ! $kashierOrderId) {
            return false;
        }

        try {


            WC_Kashier_Logger::addLog("Info: Begin processing refund for order $order_id for the amount of {$amount}");

            $refundRequest = new \Asciisd\Kashier\Api\Data\RefundRequest();

            $refundRequest
                ->setOrderId($kashierOrderId)
                ->setAmount($amount)
                ->setTransactionId($transaction_id);

            $refund = new \Asciisd\Kashier\Api\Refund();
            $refund->setRefundRequest($refundRequest);
            $response = $refund->create($this->apiContext);


            WC_Kashier_Logger::addLog('Processing response: '.print_r($response, true));

            $responseData = $response->getResponse();

            if ($response->isSuccess()) {
                $message = sprintf(__('(Transaction ID: %s)', 'woocommerce-gateway-kashier'), $responseData['transactionId']);
                $order->add_order_note(__('Successful refund: ').' '.$message);
                do_action('wc_gateway_kashier_process_response', $response, $order);
                add_post_meta($order_id, '_refund_transaction_', $responseData['transactionId']);
                $result = true;
            } else {
                $localized_message = WC_Kashier_Helper::get_localized_message('refund_failed');
                $order->add_order_note(__('Refund Error: ').$response->getErrorMessage());
                // throw new WC_Kashier_Exception(print_r($response, true), $localized_message);
            }

        } catch (\ReflectionException $e) {
            WC_Kashier_Logger::addLog('Error: '.$e->getMessage());
            do_action('wc_gateway_kashier_process_payment_error', $e, $order);
        }

        return $result;

    }


    /**
     * Completes an order without a positive value.
     *
     *
     * @param WC_Order $order The order to complete.
     * @return array Redirection data for `process_payment`.
     */
    public function complete_free_order($order)
    {
        $order->payment_complete();

        // Remove cart.
        WC()->cart->empty_cart();

        // Return thank you page redirect.
        return [
            'result' => 'success',
            'redirect' => $this->get_return_url($order),
        ];
    }

    /**
     * Validates that the order meets the minimum order amount
     * set by Kashier.
     *
     * @param object $order
     * @throws WC_Kashier_Exception
     */
    public function validate_minimum_order_amount($order)
    {
        if ($order->get_total() * 100 < WC_Kashier_Helper::get_minimum_amount()) {
            throw new WC_Kashier_Exception('Did not meet minimum amount', sprintf(WC_Kashier_Helper::get_localized_message($this->id, 'minimum_amount_error'), wc_price(WC_Kashier_Helper::get_minimum_amount() / 100)));
        }
    }

    /**
     * Proceed with current request using new login session (to ensure consistent nonce).
     */
    public function set_cookie_on_current_request($cookie)
    {
        $_COOKIE[LOGGED_IN_COOKIE] = $cookie;
    }

}
