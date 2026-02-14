<?php

/*
|--------------------------------------------------------------------------
| Kashier Routes
|--------------------------------------------------------------------------
|
| Here is where you can register routes for your package.
|
*/

use Asciisd\Kashier\Http\Controllers\ResponseController;
use Asciisd\Kashier\Http\Controllers\WebhookController;
use Illuminate\Support\Facades\Route;

Route::post('/webhook', [WebhookController::class, 'handle'])->name('webhook');
Route::post('/response', ResponseController::class)->name('response');
Route::get('/error', [WebhookController::class, 'error'])->name('error');
