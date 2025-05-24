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
               
                $locale = App::getLocale();
                
               
                return [
                    'messages' => trans('messages'), 
                    'locale' => $locale
                ];
            }
        ]);
        }
    
}
