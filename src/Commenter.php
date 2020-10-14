<?php

namespace KirschbaumDevelopment\NovaComments;

use Laravel\Nova\ResourceTool;

class Commenter extends ResourceTool
{
    /**
     * Get the displayable name of the resource tool.
     *
     * @return string
     */
    public function name()
    {
        return __('Commenter');
    }

    /**
     * Get the component name for the resource tool.
     *
     * @return string
     */
    public function component()
    {
        return 'commenter';
    }
}
