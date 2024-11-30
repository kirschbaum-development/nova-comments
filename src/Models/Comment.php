<?php

declare(strict_types=1);

namespace KirschbaumDevelopment\NovaComments\Models;

use Closure;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class Comment extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'nova_comments';

    /**
     * @var Closure|callable|null
     */
    protected static $whenCreating = null;

    /**
     * The "booting" method of the model.
     */
    public static function boot(): void
    {
        parent::boot();

        static::creating(function ($comment): void {
            if (auth()->check()) {
                $comment->commenter_id = auth()->id();
            }

            if (static::$whenCreating) {
                call_user_func(static::$whenCreating, $comment);
            } else {
                $comment->comment = filter_var(
                    strip_tags($comment->comment),
                    FILTER_SANITIZE_SPECIAL_CHARS
                );
            }
        });
    }

    /**
     * @return MorphTo
     */
    public function commentable(): MorphTo
    {
        return $this->morphTo();
    }

    /**
     * @return BelongsTo
     */
    public function commenter(): BelongsTo
    {
        return $this->belongsTo(config('auth.providers.users.model'), 'commenter_id');
    }

    /**
     * @param Closure|callable $callback
     */
    public static function whenCreating($callback): void
    {
        static::$whenCreating = $callback;
    }
}
