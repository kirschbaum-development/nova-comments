<?php

namespace KirschbaumDevelopment\NovaComments;

use Illuminate\Database\Eloquent\Relations\MorphMany;
use KirschbaumDevelopment\NovaComments\Models\Comment;

trait Commentable
{
    /**
     * @return MorphMany<Comment>
     */
    public function comments(): MorphMany
    {
        return $this->morphMany(Comment::class, 'commentable');
    }
}
