<?php

declare(strict_types=1);

namespace KirschbaumDevelopment\NovaComments;

use KirschbaumDevelopment\NovaComments\Nova\Comment;
use Laravel\Nova\Fields\MorphMany;
use Laravel\Nova\Panel;

class CommentsPanel extends Panel
{
    /**
     * Create a new panel instance.
     */
    public function __construct()
    {
        parent::__construct('Comments', $this->prepareFields($this->fields()));
    }

    /**
     * Fields for the comment panel.
     */
    protected function fields(): array
    {
        return [
            MorphMany::make(
                config('nova-comments.comments-panel.name'),
                'comments',
                Comment::class
            ),
        ];
    }
}
