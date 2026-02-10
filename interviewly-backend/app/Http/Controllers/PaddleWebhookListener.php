<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Laravel\Paddle\Cashier;
use Laravel\Paddle\Http\Controllers\WebhookController as CashierWebhookController;

class PaddleWebhookListener extends CashierWebhookController
{
    /**
     * Sync the user billing fields when a subscription is created.
     */
    protected function handleSubscriptionCreated(array $payload)
    {
        parent::handleSubscriptionCreated($payload);

        $this->syncUserFromSubscriptionPayload($payload);
    }

    /**
     * Sync the user billing fields when a subscription is updated.
     */
    protected function handleSubscriptionUpdated(array $payload)
    {
        parent::handleSubscriptionUpdated($payload);

        $this->syncUserFromSubscriptionPayload($payload);
    }

    /**
     * Sync the user billing fields when a subscription is canceled.
     */
    protected function handleSubscriptionCanceled(array $payload)
    {
        parent::handleSubscriptionCanceled($payload);

        $this->syncUserFromSubscriptionPayload($payload);
    }

    /**
     * Sync the user billing fields when a subscription is paused.
     */
    protected function handleSubscriptionPaused(array $payload)
    {
        parent::handleSubscriptionPaused($payload);

        $this->syncUserFromSubscriptionPayload($payload);
    }

    /**
     * Handle resumed subscriptions (Paddle emits subscription.resumed).
     */
    protected function handleSubscriptionResumed(array $payload)
    {
        $this->syncUserFromSubscriptionPayload($payload);
    }

    /**
     * Update the user record from a Paddle subscription payload.
     */
    protected function syncUserFromSubscriptionPayload(array $payload): void
    {
        $data = $payload['data'] ?? null;

        if (! is_array($data)) {
            return;
        }

        $customerId = $data['customer_id'] ?? null;

        if (! $customerId) {
            return;
        }

        $billable = Cashier::findBillable($customerId);

        if (! $billable) {
            return;
        }

        $priceId = $this->extractPriceId($data);
        $plan = $this->planFromPriceId($priceId);
        $periodEnd = $this->resolvePeriodEnd($data);

        $updates = [
            'billing_status' => $data['status'] ?? $billable->billing_status,
        ];

        if ($plan) {
            $updates['plan'] = $plan;
        }

        if ($periodEnd) {
            $updates['current_period_end'] = $periodEnd;
        }

        $billable->forceFill($updates)->save();
    }

    /**
     * Extract the first price ID from the Paddle payload.
     */
    protected function extractPriceId(array $data): ?string
    {
        $items = $data['items'] ?? [];

        if (! is_array($items) || empty($items)) {
            return null;
        }

        return $items[0]['price']['id'] ?? null;
    }

    /**
     * Resolve the subscription period end date from Paddle data.
     */
    protected function resolvePeriodEnd(array $data): ?Carbon
    {
        $date = $data['next_billed_at']
            ?? ($data['scheduled_change']['effective_at'] ?? null)
            ?? ($data['canceled_at'] ?? null);

        return $date ? Carbon::parse($date, 'UTC') : null;
    }

    /**
     * Map Paddle price IDs to plan keys.
     */
    protected function planFromPriceId(?string $priceId): ?string
    {
        if (! $priceId) {
            return null;
        }

        $map = array_flip($this->priceMap());

        return $map[$priceId] ?? null;
    }

    /**
     * Plan to price mapping for Paddle products.
     */
    protected function priceMap(): array
    {
        return [
            'basic' => env('PADDLE_PRICE_BASIC'),
            'pro' => env('PADDLE_PRICE_PRO'),
            'premium' => env('PADDLE_PRICE_PREMIUM'),
        ];
    }
}
