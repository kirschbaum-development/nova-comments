<?php
declare(strict_types=1);

namespace KirschbaumDevelopment\NovaComments;

use Illuminate\Support\ServiceProvider;
use KirschbaumDevelopment\NovaComments\Nova\Comment;
use Laravel\Nova\Nova;

class NovaCommentsServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        $this->config();
        $this->migrations();
        $this->nova();
    }

    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->mergeConfigFrom(__DIR__ . '/../config/nova-comments.php', 'nova-comments');
    }

    /**
     * Bootstrap configurations files.
     */
    protected function config(): void
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
    protected function migrations(): void
    {
        $this->loadMigrationsFrom(__DIR__ . '/../migrations');
    }

    /**
     * Bootstrap Nova resources and components.
     */
    protected function nova(): void
    {
        Nova::resources([Comment::class]);

        Nova::serving(
            function (): void {
                Nova::script('commentable', __DIR__ . '/../dist/js/tool.js');
                Nova::style('commentable', __DIR__ . '/../dist/css/tool.css');
            }
        );
    }
}
