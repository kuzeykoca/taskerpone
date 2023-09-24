<?php

namespace App\Providers;

use App\Services\ProjectService;
use App\Services\TaskService;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind('ProjectService', function (){
            return new ProjectService();
        });
        $this->app->bind('TaskService', function (){
            return new TaskService();
        });
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
