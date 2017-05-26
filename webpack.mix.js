const { mix } = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.webpackConfig({
    externals: {
        'lodash':       '_',
        'axios':        'axios',
        'moment':       'moment',
        'pusher':       'Pusher',
        'vue':          'Vue',
        'vuex':         'Vuex',
        'vue-resource': 'VueResource',
    },
    resolve:   {
        alias: { vue: 'vue/dist/vue.js' }
    },
});

mix.js('resources/assets/js/app.js', 'public/js')
    .sass('resources/assets/sass/app.scss', 'public/css');
