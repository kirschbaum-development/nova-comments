# A commenting resource tool for Nova apps

[![Latest Version on Packagist](https://img.shields.io/packagist/v/kirschbaum-development/nova-comments.svg?style=flat-square)](https://packagist.org/packages/kirschbaum-development/nova-comments)
[![Total Downloads](https://img.shields.io/packagist/dt/kirschbaum-development/nova-comments.svg?style=flat-square)](https://packagist.org/packages/kirschbaum-development/nova-comments)

This package contains an inline commenting form for any resource to easily add comments. Think a simple version of Disqus for Nova!

###### Commenter Tool
![screenshot of the commenter resource tool](https://raw.githubusercontent.com/kirschbaum-development/nova-comments/master/screenshots/commenter.png)

###### Simple Comment Panel
![screenshot of the comments panel](https://raw.githubusercontent.com/kirschbaum-development/nova-comments/master/screenshots/comments-panel.png)

## Requirements

This Nova resource tool requires Nova 2.0 or higher.

## Installation

You can install this package in a Laravel app that uses [Nova](https://nova.laravel.com) via composer:

```bash
composer require kirschbaum-development/nova-comments
```

Next, we need to run migrations. Auto-discovery of this package's service provider helps with that!

```bash
php artisan migrate
```

And lastly, any model that you want to have comments needs the `Commentable` trait added to it.

```php
use KirschbaumDevelopment\Novacomments\Commentable;

class Post extends Model
{
    use Commentable;
    
    // ...
}
```

If you would like to publish the config for this package, run:

```bash
php artisan vendor:publish
```
And choose the provider for this package: `KirschbaumDevelopment\NovaComments\NovaCommentsServiceProvider`

This package requires that it has a commenter, which is simply a `User`. Nova Comments automatically defaults to the `App\Nova\User` resource, but can easily be changed in the publishable config file.

## Usage

There are two components that ship with this package, the `Commenter` and a `CommentsPanel`.

### Commenter

The first, and most useful, component is the `Commenter`. It is a resource tool that allows you to insert a commenting panel directly onto any Nova resource. This panel allows you to add a comment directly to a resource without needing to create one from the respective create view. The newly created comments show up below the commenting form with live updating.

Simply add the `KirschbaumDevelopment\NovaComments\Commenter` resource tool in your Nova resource:

```php
namespace App\Nova;

use KirschbaumDevelopment\NovaComments\Commenter;

class Post extends Resource
{
    // ...
    
    public function fields(Request $request)
    {
        return [
            // ...
            
            new Commenter(),

            // ...
        ];
    }
}
```

Now you can comment from the detail view of any resource you've attached the `Commenter` to! Happy commenting!

### Comments Panel

As a convenience, a prebuilt comments panel has been created for you. All you need to do is simply add it to your resource and enjoy the pre-built goodness.

```php
namespace App\Nova;

use KirschbaumDevelopment\NovaComments\Commenter;

class Post extends Resource
{
    // ...
    
    public function fields(Request $request)
    {
        return [
            // ...
            
            new CommentsPanel(),

            // ...
        ];
    }
}
```

Of course you are completely free to create your own comments panel, but to get up and running quickly, we recommend using this panel.

### Pagination caveat

Due to an limitation in how Nova paginates results, there is currently no way to set the `perPage` value for the number of comments that will display at a time from a configuration value. Nova's default value is 5 per page. If you would like to set this to a different value, such as 25, we recommend you extend the `Commenter` and set this value with the follwing code:

```php
use KirschbaumDevelopment\NovaComments\Commenter as NovaCommenter;

class Commenter extends NovaCommenter
{
    /**
     * The number of resources to show per page via relationships.
     *
     * @var int
     */
    public static $perPageViaRelationship = 25;
}
```

Then use this class instead of the default `Commenter` class within your resources.

## Changelog

Please see [CHANGELOG](CHANGELOG.md) for more information on what has changed recently.

## Contributing

Please see [CONTRIBUTING](CONTRIBUTING.md) for details.

### Security

If you discover any security related issues, please email brandon@kirschbaumdevelopment.com or nathan@kirschbaumdevelopment.com instead of using the issue tracker.

## Credits

- [Brandon Ferens](https://github.com/brandonferens)

## Sponsorship

Development of this package is sponsored by Kirschbaum Development Group, a developer driven company focused on problem solving, team building, and community. Learn more [about us](https://kirschbaumdevelopment.com) or [join us](https://careers.kirschbaumdevelopment.com)!

## License

The MIT License (MIT). Please see [License File](LICENSE.md) for more information.
