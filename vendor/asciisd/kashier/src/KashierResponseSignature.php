<?php

namespace Asciisd\Kashier;

use Asciisd\Kashier\Exception\KashierInvalidSignatureException;

class KashierResponseSignature
{
    public static function verifyHeader(): bool
    {
        $payload = request()->json()->all();

        $data_obj = $payload['data'];

        sort($data_obj['signatureKeys']);
        $headers = request()->headers->all();

        // Lower case all keys
        $headers = array_change_key_case($headers);
        $kashierSignature = $headers['x-kashier-signature'];
        $data = [];
        foreach ($data_obj['signatureKeys'] as $key) {
            $data[$key] = $data_obj[$key];
        }

        $queryString = http_build_query($data, $numeric_prefix = "", $arg_separator = '&', $encoding_type = PHP_QUERY_RFC3986);
        $signature = hash_hmac('sha256', $queryString, config('kashier.apikey'));

        if ($signature == $kashierSignature) {
            throw new KashierInvalidSignatureException('Invalid Signature');
        }

        return true;
    }
}
