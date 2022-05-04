let mix = require('laravel-mix')

require('./nova.mix')

mix
  .setPublicPath('dist')
  .js('resources/js/tool.js', 'js')
  .vue({ version: 3 })
  .webpackConfig({
    externals: {
      vue: 'Vue',
    },
    output: {
      uniqueName: 'amukhin-cyberhull/nova-comments',
    }
  })
  .sass('resources/sass/tool.scss', 'css')
  .nova('amukhin-cyberhull/nova-comments')
