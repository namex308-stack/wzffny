<?php

namespace Asciisd\Kashier\Providers;

use Asciisd\Kashier\KashierService;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\ServiceProvider;

class KashierServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        $this->app->singleton('kashier', function () {
            return new KashierService();
        });

        Route::group([
            'prefix'    => 'kashier',
            'namespace' => 'Asciisd\Kashier\Http\Controllers',
            'as'        => 'kashier.',
        ], function () {
            $this->loadRoutesFrom(__DIR__.'/../../routes/web.php');
        });

        //        $this->loadJsonTranslationsFrom(__DIR__.'/../../resources/lang');
        $this->loadViewsFrom(__DIR__.'/../../resources/views', 'kashier');
    }

    public function boot(): void
    {
        // Publish the configuration file
        $this->publishes([
            __DIR__.'/../../config/kashier.php' => config_path('kashier.php'),
        ], 'config');
    }
}
