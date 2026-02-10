<?php

use App\Http\Controllers\BillingController;
use App\Http\Controllers\PaddleWebhookListener;
use Illuminate\Support\Facades\Route;

// Paddle webhooks (configure Paddle to call /api/paddle/webhook).
Route::post('paddle/webhook', PaddleWebhookListener::class);

Route::middleware('supabase.jwt')->prefix('billing')->group(function () {
    Route::get('prices', [BillingController::class, 'prices']);
    Route::post('checkout', [BillingController::class, 'checkout']);
    Route::post('swap', [BillingController::class, 'swap']);
    Route::post('renew', [BillingController::class, 'renew']);
    Route::post('update-payment', [BillingController::class, 'updatePayment']);
    Route::get('summary', [BillingController::class, 'summary']);
});
