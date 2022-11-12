<?php

declare(strict_types=1);

namespace KirschbaumDevelopment\NovaComments;

use Laravel\Nova\ResourceTool;

class Commenter extends ResourceTool
{
    /**
     * Get the displayable name of the resource tool.
     *
     * @return string
     */
    public function name(): string
    {
        return 'Commenter';
    }

    /**
     * Get the component name for the resource tool.
     *
     * @return string
     */
    public function component(): string
    {
        return 'commenter';
    }
}
