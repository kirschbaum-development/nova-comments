<?php

declare(strict_types=1);

namespace KirschbaumDevelopment\NovaComments\Models;

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
     * The "booting" method of the model.
     */
    public static function boot(): void
    {
        parent::boot();

        static::creating(
            function ($comment): void {
                if (auth()->check()) {
                    $comment->commenter_id = auth()->id();
                }
            }
        );
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
}
