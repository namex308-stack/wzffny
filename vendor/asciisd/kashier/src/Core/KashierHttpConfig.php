<?php

namespace Asciisd\Kashier\Core;

/**
 * Class KashierHttpConfig
 * Http Configuration Class
 *
 * @package Asciisd\Kashier\Core
 */
class KashierHttpConfig
{
    public const HEADER_SEPARATOR = ';';
    public const HTTP_GET = 'GET';
    public const HTTP_POST = 'POST';
    /**
     * Some default options for curl
     * These are typically overridden by KashierConnectionManager
     *
     * @var array
     */
    public static $defaultCurlOptions = array(
        CURLOPT_SSLVERSION => 6,
        CURLOPT_CONNECTTIMEOUT => 10,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT => 60,    // maximum number of seconds to allow cURL functions to execute
        CURLOPT_USERAGENT => 'Kashier-PHP-SDK',
        CURLOPT_HTTPHEADER => array(),
        CURLOPT_SSL_VERIFYHOST => 2,
        CURLOPT_SSL_VERIFYPEER => 1,
        CURLOPT_SSL_CIPHER_LIST => 'TLSv1:TLSv1.2'
        //Allowing TLSv1 cipher list.
        //Adding it like this for backward compatibility with older versions of curl
    );
    private array $headers = array();

    private array $curlOptions;

    private ?string $url;

    private string $method;

    /***
     * Number of times to retry a failed HTTP call
     */
    private int $retryCount = 0;

    /**
     * Default Constructor
     *
     * @param string|null $url
     * @param string $method HTTP method (GET, POST etc.) defaults to POST
     * @param array $configs All Configurations
     */
    public function __construct(string $url = null, string $method = self::HTTP_POST, array $configs = array())
    {
        $this->url = $url;
        $this->method = $method;
        $this->curlOptions = array_replace($this->getHttpConstantsFromConfigs('http.', $configs), self::$defaultCurlOptions);
        // Update the Cipher List based on OpenSSL or NSS settings
        $curl = curl_version();
        $sslVersion = isset($curl['ssl_version']) ? $curl['ssl_version'] : '';
        if ($sslVersion && substr_compare($sslVersion, 'NSS/', 0, strlen('NSS/')) === 0) {
            //Remove the Cipher List for NSS
            $this->removeCurlOption(CURLOPT_SSL_CIPHER_LIST);
        }
    }

    /**
     * Retrieves an array of constant key, and value based on Prefix
     *
     * @param array $configs
     * @param       $prefix
     * @return array
     */
    public function getHttpConstantsFromConfigs($prefix, array $configs = array()): array
    {
        $arr = array();
        if ($prefix != null && is_array($configs)) {
            foreach ($configs as $k => $v) {
                // Check if it startsWith
                if (stripos($k, $prefix) === 0) {
                    $newKey = ltrim($k, $prefix);
                    if (defined($newKey)) {
                        $arr[constant($newKey)] = $v;
                    }
                }
            }
        }
        return $arr;
    }

    /**
     * Removes a curl option from the list
     *
     * @param $name
     */
    public function removeCurlOption($name): void
    {
        unset($this->curlOptions[$name]);
    }

    /**
     * Gets Url
     *
     * @return null|string
     */
    public function getUrl(): ?string
    {
        return $this->url;
    }

    /**
     * Sets Url
     *
     * @param $url
     */
    public function setUrl($url): void
    {
        $this->url = $url;
    }

    /**
     * Gets Method
     *
     * @return string
     */
    public function getMethod(): string
    {
        return $this->method;
    }

    /**
     * Gets all Headers
     *
     * @return array
     */
    public function getHeaders(): array
    {
        return $this->headers;
    }

    /**
     * Set Headers
     *
     * @param array $headers
     */
    public function setHeaders(array $headers = array()): void
    {
        $this->headers = $headers;
    }

    /**
     * Get Header by Name
     *
     * @param $name
     * @return string|null
     */
    public function getHeader($name): ?string
    {
        if (array_key_exists($name, $this->headers)) {
            return $this->headers[$name];
        }
        return null;
    }

    /**
     * Adds a Header
     *
     * @param      $name
     * @param      $value
     * @param bool $overWrite allows you to override header value
     */
    public function addHeader($name, $value, bool $overWrite = true): void
    {
        if (! array_key_exists($name, $this->headers) || $overWrite) {
            $this->headers[$name] = $value;
        } else {
            $this->headers[$name] = $this->headers[$name].self::HEADER_SEPARATOR.$value;
        }
    }

    /**
     * Removes a Header
     *
     * @param $name
     */
    public function removeHeader($name): void
    {
        unset($this->headers[$name]);
    }

    /**
     * Gets all curl options
     *
     * @return array
     */
    public function getCurlOptions(): array
    {
        return $this->curlOptions;
    }

    /**
     * Set Curl Options. Overrides all curl options
     *
     * @param $options
     */
    public function setCurlOptions($options): void
    {
        $this->curlOptions = $options;
    }

    /**
     * Add Curl Option
     *
     * @param string $name
     * @param mixed $value
     */
    public function addCurlOption(string $name, mixed $value): void
    {
        $this->curlOptions[$name] = $value;
    }

    /**
     * Set ssl parameters for certificate based client authentication
     *
     * @param      $certPath
     * @param null $passPhrase
     */
    public function setSSLCert($certPath, $passPhrase = null): void
    {
        $this->curlOptions[CURLOPT_SSLCERT] = realpath($certPath);
        if (isset($passPhrase) && trim($passPhrase) != '') {
            $this->curlOptions[CURLOPT_SSLCERTPASSWD] = $passPhrase;
        }
    }

    /**
     * Set connection timeout in seconds
     *
     * @param int $timeout
     */
    public function setHttpTimeout(int $timeout): void
    {
        $this->curlOptions[CURLOPT_CONNECTTIMEOUT] = $timeout;
    }

    /**
     * Set Http Retry Counts
     *
     * @param int $retryCount
     */
    public function setHttpRetryCount(int $retryCount): void
    {
        $this->retryCount = $retryCount;
    }

    /**
     * Get Http Retry Counts
     *
     * @return int
     */
    public function getHttpRetryCount(): int
    {
        return $this->retryCount;
    }

    /**
     * Sets the User-Agent string on the HTTP request
     *
     * @param string $userAgentString
     */
    public function setUserAgent(string $userAgentString): void
    {
        $this->curlOptions[CURLOPT_USERAGENT] = $userAgentString;
    }
}
