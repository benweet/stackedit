// RequireJS configuration
requirejs.config({
    waitSeconds: 0,
    paths: {
        "jquery": "libs/jquery",
        "underscore": "libs/underscore",
        "jgrowl": "libs/jgrowl",
        "mousetrap": "libs/mousetrap",
        "toMarkdown": "libs/to-markdown",
        "text": "libs/text",
        "libs/MathJax": '../lib/MathJax/MathJax.js?config=TeX-AMS_HTML'
    },
    shim: {
        'underscore': {
            exports: '_'
        },
        'jgrowl': {
            deps: [
                'jquery'
            ],
            exports: 'jQuery.jGrowl'
        },
        'mousetrap': {
            exports: 'Mousetrap'
        },
        'toMarkdown': {
            deps: [
                'jquery'
            ],
            exports: 'toMarkdown'
        },
        'libs/jquery-ui': [
            'jquery'
        ],
        'libs/bootstrap': [
            'jquery'
        ],
        'libs/jquery.waitforimages': [
            'jquery'
        ],
        'libs/jquery.mousewheel': [
            'jquery'
        ],
        'libs/layout': [
            'libs/jquery-ui'
        ],
        'libs/Markdown.Extra': [
            'libs/Markdown.Converter',
            'libs/prettify'
        ],
        'libs/Markdown.Editor': [
            'libs/Markdown.Converter'
        ]
    }
});

// Defines the logger object
var logger = {
    log: function() {
    },
    info: function() {
    },
    warn: function() {
    },
    error: function() {
    }
};
// We can run StackEdit with http://.../?console to print logs in the console
if(location.search.match(/(\?|&)console/)) {
    logger = console;
}

// RequireJS entry point. By requiring synchronizer, publisher and
// media-importer, we are actually loading all the modules
require([
    "jquery",
    "core",
    "synchronizer",
    "publisher",
    "mediaImporter"
], function($, core) {

    $(function() {

        // If browser has detected a new application cache.
        if(window.applicationCache) {
            window.applicationCache.addEventListener('updateready', function(e) {
                if(window.applicationCache.status === window.applicationCache.UPDATEREADY) {
                    window.applicationCache.swapCache();
                    window.location.reload();
                }
            }, false);
        }

        // Here, all the modules are loaded and the DOM is ready
        core.setReady();
    });

});
