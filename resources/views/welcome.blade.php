<?php

use Illuminate\Support\Facades\App;

$is_production = App::environment('production');
$js_url = 'js/app.js';
$css_url = 'css/app.css';

$scripts = [
    '//cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.4/lodash' . ($is_production ? '.min.js' : '.js'),
    '//cdn.rawgit.com/taylorhakes/promise-polyfill/master/promise.js',
    'https://unpkg.com/axios@0.16.0/dist/axios' . ($is_production ? '.min.js' : '.js'),
    '//cdnjs.cloudflare.com/ajax/libs/moment.js/2.18.1/moment' . ($is_production ? '.min.js' : '.js'),
    '//cdnjs.cloudflare.com/ajax/libs/pusher/4.1.0/pusher' . ($is_production ? '.min.js' : '.js'),
    '//cdn.rawgit.com/leonardosantos/momentjs-business/cb4ddf2a/momentjs-business.js',
    '//cdnjs.cloudflare.com/ajax/libs/vue/2.2.6/vue' . ($is_production ? '.min.js' : '.js'),
    '//cdnjs.cloudflare.com/ajax/libs/vue-router/2.3.1/vue-router' . ($is_production ? '.min.js' : '.js'),
    '//cdnjs.cloudflare.com/ajax/libs/vuex/2.2.1/vuex' . ($is_production ? '.min.js' : '.js'),
    'https://ricostacruz.com/nprogress/nprogress.js',
];

?><!DOCTYPE html>
<html lang="{{ config('app.locale') }}">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Project Management System</title>

        <!-- Styles -->
        <link rel="stylesheet" href="{{ $is_production ? mix($css_url) : '/' . $css_url }}">

        <!-- CSRF -->
        <script>
            window.Laravel = {!! json_encode(['csrfToken' => csrf_token()]) !!};
            window.app     = {
                echo: {
                    broadcaster: 'pusher',
                    key: {!! json_encode(config('broadcasting.connections.pusher.key')) !!},
                    cluster: {!! json_encode(config('broadcasting.connections.pusher.options.cluster')) !!}
                }
            };
        </script>
    </head>
    <body>

        <svg xmlns="http://www.w3.org/2000/svg" style="display:none;">
            <defs>
                <?php
                foreach (['images/svg-icons/*.svg'] as $rel_path):
                    foreach (glob(public_path($rel_path)) as $path):
                        include($path);
                    endforeach;
                endforeach;
                ?>
            </defs>
        </svg>

        <div id="app" class="Layout">
            <router-view></router-view>
        </div>

        @foreach($scripts as $script)
            <script src="{{ $script }}"></script>
        @endforeach

        <script>
            NProgress.configure({ showSpinner: false });
        </script>

        <script src="{{ $is_production ? mix($js_url) : '/' . $js_url }}"></script>
    </body>
</html>