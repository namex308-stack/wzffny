<?php

namespace App\Http\Middleware;

use App\Models\User;
use Closure;
use Firebase\JWT\JWK;
use Firebase\JWT\JWT;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;
use RuntimeException;
use Throwable;
use UnexpectedValueException;

class VerifySupabaseJwt
{
    /**
     * Verify the Supabase JWT and attach the user to the request.
     */
    public function handle(Request $request, Closure $next)
    {
        // Extract the bearer token from the Authorization header.
        $token = $request->bearerToken();

        if (! $token) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        try {
            $claims = $this->decodeToken($token);
        } catch (Throwable $exception) {
            return response()->json(['message' => 'Invalid token'], 401);
        }

        $email = $claims['email'] ?? null;

        if (! $email) {
            return response()->json(['message' => 'Invalid token'], 401);
        }

        $name = $this->resolveName($claims, $email);

        // Create the user on first login and keep the display name updated.
        $user = User::firstOrCreate(
            ['email' => $email],
            [
                'name' => $name,
                'password' => Hash::make(Str::random(64)),
            ]
        );

        if ($user->name !== $name) {
            $user->forceFill(['name' => $name])->save();
        }

        // Log the user in when sessions are enabled, otherwise set the user directly.
        if ($request->hasSession()) {
            Auth::login($user);
        } else {
            Auth::setUser($user);
        }

        $request->setUserResolver(fn () => $user);
        $request->attributes->set('supabase', $claims);

        return $next($request);
    }

    /**
     * Decode the JWT using the cached JWKS keys.
     */
    protected function decodeToken(string $token): array
    {
        $jwks = $this->getJwks();

        try {
            $claims = $this->decodeWithJwks($token, $jwks);
        } catch (Throwable $exception) {
            // Refresh the JWKS cache in case Supabase rotated keys.
            Cache::forget($this->cacheKey());
            $jwks = $this->getJwks(true);
            $claims = $this->decodeWithJwks($token, $jwks);
        }

        $this->validateClaims($claims);

        return $claims;
    }

    /**
     * Decode the JWT payload using Supabase's JWKS.
     */
    protected function decodeWithJwks(string $token, array $jwks): array
    {
        JWT::$leeway = (int) (env('SUPABASE_JWT_LEEWAY', 60));

        $keys = JWK::parseKeySet($jwks);

        return (array) JWT::decode($token, $keys);
    }

    /**
     * Fetch and cache the JWKS from Supabase.
     */
    protected function getJwks(bool $refresh = false): array
    {
        $cacheKey = $this->cacheKey();

        if ($refresh) {
            Cache::forget($cacheKey);
        }

        return Cache::remember($cacheKey, now()->addHour(), function () {
            $response = Http::retry(2, 200)->timeout(5)->get($this->jwksUrl());

            if (! $response->ok()) {
                throw new RuntimeException('Unable to fetch Supabase JWKS.');
            }

            $jwks = $response->json();

            if (! is_array($jwks) || ! isset($jwks['keys'])) {
                throw new RuntimeException('Invalid Supabase JWKS response.');
            }

            return $jwks;
        });
    }

    /**
     * Resolve the JWKS URL for Supabase.
     */
    protected function jwksUrl(): string
    {
        $url = config('services.supabase.jwks_url') ?? env('SUPABASE_JWKS_URL');

        if ($url) {
            return $url;
        }

        $baseUrl = $this->supabaseUrl();

        if (! $baseUrl) {
            throw new RuntimeException('SUPABASE_URL is not configured.');
        }

        return rtrim($baseUrl, '/').'/auth/v1/keys';
    }

    /**
     * Resolve the Supabase project URL.
     */
    protected function supabaseUrl(): ?string
    {
        return config('services.supabase.url') ?? env('SUPABASE_URL');
    }

    /**
     * Cache key for the JWKS payload.
     */
    protected function cacheKey(): string
    {
        return 'supabase.jwks.'.md5($this->jwksUrl());
    }

    /**
     * Validate standard JWT claims like issuer and audience.
     */
    protected function validateClaims(array $claims): void
    {
        $issuer = env('SUPABASE_JWT_ISSUER');

        if (! $issuer && ($baseUrl = $this->supabaseUrl())) {
            $issuer = rtrim($baseUrl, '/').'/auth/v1';
        }

        if ($issuer && (($claims['iss'] ?? null) !== $issuer)) {
            throw new UnexpectedValueException('Invalid issuer.');
        }

        $audience = env('SUPABASE_JWT_AUDIENCE');

        if ($audience) {
            $aud = $claims['aud'] ?? null;

            if (is_array($aud)) {
                if (! in_array($audience, $aud, true)) {
                    throw new UnexpectedValueException('Invalid audience.');
                }
            } elseif ($aud !== $audience) {
                throw new UnexpectedValueException('Invalid audience.');
            }
        }
    }

    /**
     * Pick a display name from Supabase user metadata.
     */
    protected function resolveName(array $claims, string $email): string
    {
        $metadata = $claims['user_metadata'] ?? [];

        if ($metadata instanceof \stdClass) {
            $metadata = (array) $metadata;
        }

        $name = $metadata['full_name'] ?? $metadata['name'] ?? null;

        if (is_string($name) && trim($name) !== '') {
            return $name;
        }

        return Str::before($email, '@') ?: 'User';
    }
}
