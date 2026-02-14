<?php

namespace Asciisd\Kashier\Http\Controllers;

use Asciisd\Kashier\Events\KashierWebhookHandled;
use Asciisd\Kashier\Http\Middleware\VerifyWebhookSignature;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;

class WebhookController extends Controller
{
    public function __construct()
    {
        $this->middleware(VerifyWebhookSignature::class);
    }

    public function handle(Request $request)
    {
        logger()->info('Webhook received', $request->json()->all());

        // Handle the incoming webhook
        KashierWebhookHandled::dispatch($request->json()->all());
    }

    public function error(Request $request)
    {
        // Handle webhook errors
    }
}
