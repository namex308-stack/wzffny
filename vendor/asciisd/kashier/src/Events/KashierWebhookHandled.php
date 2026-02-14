<?php

namespace Asciisd\Kashier\Events;

use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class KashierWebhookHandled
{
    use Dispatchable;
    use InteractsWithSockets;
    use SerializesModels;
    /**
     * The response payload.
     *
     * @var array
     */
    public array $payload;

    /**
     * Create a new event instance.
     *
     * @param array $payload
     * @return void
     */
    public function __construct(array $payload)
    {
        logger()->info('KashierWebhookHandled event fired', $payload);

        $this->payload = $payload;
    }
}
