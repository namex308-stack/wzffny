<?php

namespace Asciisd\Kashier\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class VerifyResponseSignature
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
        if ($request->input('paymentStatus') === 'CANCELLED') {
            return $next($request);
        }

        $queryString = "";
        $secret = config('kashier.apikey');

        foreach ($request->all() as $key => $value) {
            if ($key === "signature" || $key === "mode") {
                continue;
            }
            $queryString .= "&".$key."=".$value;
        }

        $queryString = ltrim($queryString, '&');
        $signature = hash_hmac('sha256', $queryString, $secret, false);

        if ($signature !== $request["signature"]) {
            abort(403, 'Invalid signature');
        }

        return $next($request);
    }
}
