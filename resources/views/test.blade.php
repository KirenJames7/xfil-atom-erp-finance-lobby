<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link href="{{ asset('/plugins/page-loader/css/page-loader.css') }}" rel="stylesheet" />
        <title>Laravel</title>
    </head>
    <body>
        <div class="page-loader">
            <div id="particles-background" class="vertical-centered-box"></div>
            <div id="particles-foreground" class="vertical-centered-box"></div>
            <div class="lds-css ng-scope">
                <div class="lds-eclipse">
                    <div></div>
                </div>
            </div>
            <div class="atom-spinner">
                <div class="spinner-inner">
                    <div class="spinner-line"></div>
                    <div class="spinner-line"></div>
                    <div class="spinner-line"></div>
                    <div class="spinner-circle">
                      &#9679;
                    </div>
                </div>
            </div>
        </div>
        <script src="{{ asset('/plugins/page-loader/js/page-loader.js') }}" type="text/javascript"></script>
    </body>
</html>
