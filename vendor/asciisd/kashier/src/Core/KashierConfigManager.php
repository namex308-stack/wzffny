<?php

namespace Asciisd\Kashier\Core;

use JetBrains\PhpStorm\NoReturn;

/**
 * Class KashierConfigManager
 *
 * KashierConfigManager loads the SDK configuration file and
 * hands out appropriate config params to other classes
 *
 * @package Asciisd\Kashier\Core
 */
class KashierConfigManager
{
    /**
     * Configuration Options
     *
     * @var array
     */
    private array $configs = array();

    /**
     * Singleton Object
     *
     * @var KashierConfigManager $this
     */
    private static KashierConfigManager $instance;

    /**
     * Private Constructor
     */
    private function __construct()
    {
        if (defined('KASHIER_CONFIG_PATH')) {
            $configFile = constant('KASHIER_CONFIG_PATH').'/sdk_config.ini';
        } else {
            $configFile = implode(
                DIRECTORY_SEPARATOR,
                array(__DIR__, '..', 'config', 'sdk_config.ini')
            );
        }
        if (file_exists($configFile)) {
            $this->addConfigFromIni($configFile);
        }
    }

    /**
     * Returns the singleton object
     *
     * @return $this
     */
    public static function getInstance(): KashierConfigManager|static
    {
        if (! isset(self::$instance)) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    /**
     * Add Configuration from configuration.ini files
     *
     * @param string $fileName
     * @return $this
     */
    public function addConfigFromIni(string $fileName): KashierConfigManager|static
    {
        if ($configs = parse_ini_file($fileName)) {
            $this->addConfigs($configs);
        }
        return $this;
    }

    /**
     * If a configuration exists in both arrays,
     * then the element from the first array will be used and
     * the matching key's element from the second array will be ignored.
     *
     * @param array $configs
     * @return $this
     */
    public function addConfigs(array $configs = array()): KashierConfigManager|static
    {
        $this->configs = array_merge($configs, $this->configs);
        return $this;
    }

    /**
     * Simple getter for configuration params
     * If an exact match for key is not found,
     * does a "contains" search on the key
     *
     * @param string $searchKey
     * @return array
     */
    public function get(string $searchKey): array
    {
        if (array_key_exists($searchKey, $this->configs)) {
            return $this->configs[$searchKey];
        }

        $arr = array();
        if ($searchKey !== '') {
            foreach ($this->configs as $k => $v) {
                if (false !== stripos($k, $searchKey)) {
                    $arr[$k] = $v;
                }
            }
        }

        return $arr;
    }

    /**
     * returns the config file hashmap
     */
    public function getConfigHashmap(): array
    {
        return $this->configs;
    }

    /**
     * Disabling __clone call
     */
    #[NoReturn] public function __clone()
    {
        trigger_error('Clone is not allowed.', E_USER_ERROR);
    }
}
