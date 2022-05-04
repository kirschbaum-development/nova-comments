<?php

namespace KirschbaumDevelopment\NovaComments;

use Laravel\Nova\Nova;
use Illuminate\Support\ServiceProvider;
use KirschbaumDevelopment\NovaComments\Nova\Comment;

class NovaCommentsServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     */
    public function boot()
    {
        $this->config();
        $this->migrations();
        $this->nova();
    }

    /**
     * Register any application services.
     */
    public function register()
    {
        $this->mergeConfigFrom(__DIR__ . '/../config/nova-comments.php', 'nova-comments');
    }

    /**
     * Bootstrap configurations files.
     */
    protected function config()
    {
        $this->publishes(
            [
                __DIR__ . '/../config/nova-comments.php' => config_path('nova-comments.php'),
            ]
        );
    }

    /**
     * Bootstrap database migrations.
     */
    protected function migrations()
    {
        $this->loadMigrationsFrom(__DIR__ . '/../migrations');
    }

    /**
     * Bootstrap Nova resources and components.
     */
    protected function nova()
    {
        Nova::resources([Comment::class]);

        Nova::serving(
            function () {
                Nova::script('commentable', __DIR__ . '/../dist/js/tool.js');
                Nova::style('commentable', __DIR__ . '/../dist/css/tool.css');
                if (config('nova.path')) {
                    Nova::provideToScript([
                        'tool' => [
                            'nova_path' => config('nova.path'),
                        ],
                    ]);
                }

            }
        );
    }
}
