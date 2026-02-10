<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Third Party Services
    |--------------------------------------------------------------------------
    |
    | This file is for storing the credentials for third party services such
    | as Mailgun, Postmark, AWS and more. This file provides the de facto
    | location for this type of information, allowing packages to have
    | a conventional file to locate the various service credentials.
    |
    */

    'postmark' => [
        'key' => env('POSTMARK_API_KEY'),
    ],

    'resend' => [
        'key' => env('RESEND_API_KEY'),
    ],

    'ses' => [
        'key' => env('AWS_ACCESS_KEY_ID'),
        'secret' => env('AWS_SECRET_ACCESS_KEY'),
        'region' => env('AWS_DEFAULT_REGION', 'us-east-1'),
    ],

    'slack' => [
        'notifications' => [
            'bot_user_oauth_token' => env('SLACK_BOT_USER_OAUTH_TOKEN'),
            'channel' => env('SLACK_BOT_USER_DEFAULT_CHANNEL'),
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Supabase
    |--------------------------------------------------------------------------
    |
    | Supabase settings for JWT verification and server-side access.
    |
    */

    'supabase' => [
        'url' => env('SUPABASE_URL'),
        'jwks_url' => env('SUPABASE_JWKS_URL'),
        'anon_key' => env('SUPABASE_ANON_KEY'),
        'service_role_key' => env('SUPABASE_SERVICE_ROLE_KEY'),
    ],

    /*
    |--------------------------------------------------------------------------
    | Paddle
    |--------------------------------------------------------------------------
    |
    | Paddle credentials used by Cashier and webhook verification.
    |
    */

    'paddle' => [
        'client_side_token' => env('PADDLE_CLIENT_SIDE_TOKEN'),
        'api_key' => env('PADDLE_API_KEY'),
        'retain_key' => env('PADDLE_RETAIN_KEY'),
        'webhook_secret' => env('PADDLE_WEBHOOK_SECRET'),
        'sandbox' => env('PADDLE_SANDBOX', false),
    ],

];
