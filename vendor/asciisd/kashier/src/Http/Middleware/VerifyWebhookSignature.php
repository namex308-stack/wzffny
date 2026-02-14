<?php

namespace Asciisd\Kashier\Http\Middleware;

use Asciisd\Kashier\Exception\KashierInvalidSignatureException;
use Asciisd\Kashier\KashierResponseSignature;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;

class VerifyWebhookSignature
{
    /**
     * Handle an incoming request.
     *
     * @param Request $request
     * @param Closure $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next): mixed
    {
        try {
            KashierResponseSignature::verifyHeader();
        } catch (KashierInvalidSignatureException $exception) {
            throw new AccessDeniedHttpException($exception->getMessage(), $exception);
        }

        return $next($request);
    }
}
