<?php

return [
    // Sets whether or not Comments should show up in sidebar navigation.
    'available-for-navigation' => true,

    // The resource to use as a commenter. Typically the User resource.
    'commenter' => [
        'nova-resource' => \App\Nova\User::class,
    ],

    // Configs for the comments panel
    'comments-panel' => [
        'name' => 'Comments',
    ],

    // Maximum length of comment in comments panel
    'limit' => 100,

    'date-format' => 'MMM DD, YYYY',
];
