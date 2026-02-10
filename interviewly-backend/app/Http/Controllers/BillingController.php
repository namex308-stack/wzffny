<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Laravel\Paddle\Cashier;
use Laravel\Paddle\Subscription;
use Throwable;

class BillingController extends Controller
{
    /**
     * Return price previews for all plans in the requested currency.
     */
    public function prices(Request $request)
    {
        $priceMap = $this->priceMap();
        $missing = array_keys(array_filter($priceMap, fn ($value) => empty($value)));

        if ($missing) {
            return response()->json([
                'message' => 'Missing Paddle price IDs for: '.implode(', ', $missing).'.',
            ], 500);
        }

        // Allow the frontend to request local currency pricing.
        $currency = strtoupper((string) $request->query('currency', ''));

        $options = array_filter([
            'currency_code' => $currency ?: null,
            'customer_ip' => $request->ip(),
        ]);

        $previews = Cashier::previewPrices(array_values($priceMap), $options)
            ->keyBy(fn ($preview) => $preview->price()->id);

        $plans = [];

        foreach ($priceMap as $plan => $priceId) {
            $preview = $previews->get($priceId);

            if (! $preview) {
                continue;
            }

            $price = $preview->price();

            $plans[] = [
                'plan' => $plan,
                'price_id' => $priceId,
                'currency' => $price->currency()->getCode(),
                'total' => $preview->total(),
                'subtotal' => $preview->subtotal(),
                'tax' => $preview->tax(),
                'raw_total' => $preview->rawTotal(),
                'raw_subtotal' => $preview->rawSubtotal(),
                'raw_tax' => $preview->rawTax(),
                'interval' => $price->interval(),
                'frequency' => $price->frequency(),
            ];
        }

        return response()->json([
            'currency' => $plans[0]['currency'] ?? ($currency ?: config('cashier.currency')),
            'plans' => $plans,
        ]);
    }

    /**
     * Create a Paddle checkout session for the selected plan.
     */
    public function checkout(Request $request)
    {
        $data = $request->validate([
            'plan' => ['nullable', 'string'],
            'price_id' => ['nullable', 'string'],
            'return_url' => ['nullable', 'url'],
        ]);

        $priceId = $this->resolvePriceId($data);

        if (! $priceId) {
            return response()->json(['message' => 'Invalid plan or price_id.'], 422);
        }

        $checkout = $request->user()
            ->subscribe($priceId)
            ->returnTo($data['return_url'] ?? config('app.url'));

        return response()->json([
            'checkout' => $checkout->options(),
        ]);
    }

    /**
     * Swap the current subscription to a new plan.
     */
    public function swap(Request $request)
    {
        $data = $request->validate([
            'plan' => ['nullable', 'string'],
            'price_id' => ['nullable', 'string'],
        ]);

        $subscription = $request->user()->subscription('default');

        if (! $subscription) {
            return response()->json(['message' => 'No subscription found.'], 404);
        }

        $priceId = $this->resolvePriceId($data);

        if (! $priceId) {
            return response()->json(['message' => 'Invalid plan or price_id.'], 422);
        }

        $subscription->swap($priceId);

        return response()->json([
            'status' => $subscription->fresh()->status,
        ]);
    }

    /**
     * Renew a paused or canceled subscription.
     */
    public function renew(Request $request)
    {
        $data = $request->validate([
            'plan' => ['nullable', 'string'],
            'price_id' => ['nullable', 'string'],
            'return_url' => ['nullable', 'url'],
        ]);

        $subscription = $request->user()->subscription('default');

        if (! $subscription) {
            return response()->json(['message' => 'No subscription found.'], 404);
        }

        if ($subscription->paused()) {
            $subscription->resume();

            return response()->json([
                'status' => $subscription->fresh()->status,
                'action' => 'resumed',
            ]);
        }

        if ($subscription->canceled()) {
            if ($subscription->onGracePeriod()) {
                $subscription->stopCancelation();

                return response()->json([
                    'status' => $subscription->fresh()->status,
                    'action' => 'reactivated',
                ]);
            }

            $priceId = $this->currentPriceId($subscription) ?? $this->resolvePriceId($data);

            if (! $priceId) {
                return response()->json(['message' => 'Provide a plan or price_id to renew.'], 422);
            }

            $checkout = $request->user()
                ->subscribe($priceId)
                ->returnTo($data['return_url'] ?? config('app.url'));

            return response()->json([
                'action' => 'new_checkout',
                'checkout' => $checkout->options(),
            ]);
        }

        return response()->json([
            'status' => $subscription->status,
            'action' => 'no_change',
        ]);
    }

    /**
     * Return the Paddle payment method update URL.
     */
    public function updatePayment(Request $request)
    {
        $subscription = $request->user()->subscription('default');

        if (! $subscription) {
            return response()->json(['message' => 'No subscription found.'], 404);
        }

        return response()->json([
            'url' => $subscription->paymentMethodUpdateUrl(),
        ]);
    }

    /**
     * Provide a lightweight billing summary for the frontend.
     */
    public function summary(Request $request)
    {
        $subscription = $request->user()->subscription('default');

        if (! $subscription) {
            return response()->json([
                'status' => 'none',
                'plan' => null,
                'price_id' => null,
                'renewal_date' => null,
            ]);
        }

        $priceId = $this->currentPriceId($subscription);
        $plan = $this->planFromPriceId($priceId);

        $renewalDate = null;

        try {
            $nextPayment = $subscription->nextPayment();
            $renewalDate = $nextPayment?->date?->toIso8601String();
        } catch (Throwable $exception) {
            $renewalDate = null;
        }

        return response()->json([
            'status' => $subscription->status,
            'plan' => $plan,
            'price_id' => $priceId,
            'renewal_date' => $renewalDate,
        ]);
    }

    /**
     * Map human-readable plan keys to Paddle price IDs.
     */
    protected function priceMap(): array
    {
        return [
            'basic' => env('PADDLE_PRICE_BASIC'),
            'pro' => env('PADDLE_PRICE_PRO'),
            'premium' => env('PADDLE_PRICE_PREMIUM'),
        ];
    }

    /**
     * Resolve a price ID from the request payload.
     */
    protected function resolvePriceId(array $data): ?string
    {
        if (! empty($data['price_id'])) {
            return $data['price_id'];
        }

        if (! empty($data['plan'])) {
            $plan = strtolower($data['plan']);
            $map = $this->priceMap();

            return $map[$plan] ?? null;
        }

        return null;
    }

    /**
     * Reverse-map a plan key from a Paddle price ID.
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
     * Get the current subscription price ID.
     */
    protected function currentPriceId(Subscription $subscription): ?string
    {
        $subscription->loadMissing('items');

        return $subscription->items->first()?->price_id;
    }
}
