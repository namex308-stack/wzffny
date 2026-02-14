<?php

namespace Asciisd\Kashier\Http\Controllers;

use Asciisd\Kashier\Enums\OrderStatus;
use Asciisd\Kashier\Events\KashierResponseHandled;
use Asciisd\Kashier\Http\Middleware\VerifyResponseSignature;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;

class ResponseController extends Controller
{
    public function __construct()
    {
        $this->middleware(VerifyResponseSignature::class);
    }

    public function __invoke(Request $request)
    {
        KashierResponseHandled::dispatch($request->all());

        $payload = $request->all();

        // Inject orderReference if not exists
        if (!isset($payload['orderReference'])) {
            $payload['orderReference'] = $payload['merchantOrderId'];
        }

        // Inject transactionId if not exists
        if (!isset($payload['transactionId'])) {
            $payload['transactionId'] = '';
        }

        // Inject cardBrand if not exists
        if (!isset($payload['cardBrand'])) {
            $payload['cardBrand'] = 'Card';
        }

        // Determine service type from metadata or config
        if (!isset($payload['serviceType'])) {
            // Try to get from metadata if available
            if (isset($payload['metaData']) && isset($payload['metaData']['serviceType'])) {
                $payload['serviceType'] = $payload['metaData']['serviceType'];
            } else {
                // Default to config value or "Buy Course"
                $payload['serviceType'] = config('kashier.service_type', 'Buy Course');
            }
        }

        $statusStyle = OrderStatus::tryFrom($payload['paymentStatus'])?->styleColor();
        $payload['statusStyle'] = $statusStyle;

        // Check if a callback URL is configured
        $callbackUrl = config('kashier.callbackUrl');

        // If a callback URL is set, redirect to it with the payload as query parameters
        if ($callbackUrl) {
            return redirect($callbackUrl . '?' . http_build_query($payload));
        }

        // Otherwise, show the receipt view
        return view('kashier::receipt', [
            'order' => $payload
        ]);
    }
}
