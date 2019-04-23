<?php

namespace KirschbaumDevelopment\NovaComments;

use KirschbaumDevelopment\NovaComments\Models\Comment;

trait Commentable
{
    /**
     * @return \Illuminate\Database\Eloquent\Relations\MorphMany
     */
    public function comments()
    {
        return $this->morphMany(Comment::class, 'commentable');
    }
}
