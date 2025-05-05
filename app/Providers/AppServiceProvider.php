<?php

namespace App\Providers;

use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;
//  
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Session;

//  

use Inertia\Inertia;
use Illuminate\Support\Facades\Lang;


class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Vite::prefetch(concurrency: 3);

       
        Inertia::share([
            'translations' => function () {
                // Get current locale
                $locale = App::getLocale();
                
                // Load translations for current locale
                return [
                    'messages' => trans('messages'), // Automatically uses current locale
                    'locale' => $locale
                ];
            }
        ]);
        }
    
}
