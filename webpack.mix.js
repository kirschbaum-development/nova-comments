let mix = require('laravel-mix')

require('./resources/js/nova.mix')

mix
  .setPublicPath('dist')
  .js('resources/js/tool.js', 'js')
  .vue({ version: 3 })
  .sass('resources/sass/tool.scss', 'css')
  .nova('amukhin-cyberhull/nova-comments')
