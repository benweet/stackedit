// RequireJS configuration
requirejs.config({
    waitSeconds: 0,
    packages: [
        {
            name: 'css',
            location: 'bower-libs/require-css',
            main: 'css'
        },
        {
            name: 'less',
            location: 'bower-libs/require-less',
            main: 'less'
        }
    ],
    paths: {
        jquery: 'bower-libs/jquery/jquery',
        underscore: 'bower-libs/underscore/underscore',
        crel: 'libs/crel',
        jgrowl: 'bower-libs/jgrowl/jquery.jgrowl',
        mousetrap: 'bower-libs/mousetrap/mousetrap',
        toMarkdown: 'libs/to-markdown',
        text: 'bower-libs/requirejs-text/text',
        mathjax: '../lib/MathJax/MathJax.js?config=TeX-AMS_HTML',
        bootstrap: 'bower-libs/bootstrap/dist/js/bootstrap',
        requirejs: 'bower-libs/requirejs/require',
        'google-code-prettify': 'bower-libs/google-code-prettify/src/prettify',
        highlightjs: 'bower-libs/highlightjs/highlight.pack',
        'jquery-mousewheel': 'bower-libs/jquery-mousewheel/jquery.mousewheel',
        'jquery-waitforimages': 'libs/jquery.waitforimages',
        'jquery-ui': 'bower-libs/jquery-ui/ui/jquery-ui',
        'jquery-ui-core': 'bower-libs/jquery-ui/ui/jquery.ui.core',
        'jquery-ui-widget': 'bower-libs/jquery-ui/ui/jquery.ui.widget',
        'jquery-ui-mouse': 'bower-libs/jquery-ui/ui/jquery.ui.mouse',
        'jquery-ui-draggable': 'bower-libs/jquery-ui/ui/jquery.ui.draggable',
        'jquery-ui-effect': 'bower-libs/jquery-ui/ui/jquery.ui.effect',
        'jquery-ui-effect-slide': 'bower-libs/jquery-ui/ui/jquery.ui.effect-slide',
        uilayout: 'libs/layout',
        css_browser_selector: 'bower-libs/css_browser_selector/css_browser_selector',
        FileSaver: 'bower-libs/FileSaver/FileSaver',
        stacktrace: 'bower-libs/stacktrace/stacktrace',
        'requirejs-text': 'bower-libs/requirejs-text/text',
        'bootstrap-tour': 'bower-libs/bootstrap-tour/build/js/bootstrap-tour'
    },
    shim: {
        underscore: {
            exports: '_'
        },
        jgrowl: {
            deps: [
                'jquery'
            ],
            exports: 'jQuery.jGrowl'
        },
        mousetrap: {
            exports: 'Mousetrap'
        },
        toMarkdown: {
            deps: [
                'jquery'
            ],
            exports: 'toMarkdown'
        },
        'bootstrap-tour': [
            'bootstrap'
        ],
        bootstrap: [
            'jquery'
        ],
        'jquery-waitforimages': [
            'jquery'
        ],
        'jquery-mousewheel': [
            'jquery'
        ],
        uilayout: [
            'jquery-ui-effect-slide'
        ],
        'jquery-ui-effect-slide': [
            'jquery-ui-effect'
        ],
        'jquery-ui-effect': [
            'jquery-ui-draggable'
        ],
        'jquery-ui-draggable': [
            'jquery-ui-mouse'
        ],
        'jquery-ui-mouse': [
            'jquery-ui-widget'
        ],
        'jquery-ui-widget': [
            'jquery-ui-core'
        ],
        'jquery-ui-core': [
            'jquery'
        ],
        'libs/Markdown.Extra': [
            'libs/Markdown.Converter',
            'google-code-prettify',
            'highlightjs'
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

var viewerMode = /(^| )viewer($| )/.test(document.body.className);

var theme = localStorage.theme || 'default';
var themeModule = "less!themes/" + theme;
if(baseDir.indexOf('-min') !== -1) {
    themeModule = "css!themes/" + theme;
}

// RequireJS entry point. By requiring synchronizer, publisher and
// media-importer, we are actually loading all the modules
require([
    "jquery",
    "core",
    "eventMgr",
    "synchronizer",
    "publisher",
    "mediaImporter",
    "css",
    themeModule,
], function($, core, eventMgr) {

    $(function() {

        // Here, all the modules are loaded and the DOM is ready
        core.onReady();
        
        // If browser has detected a new application cache.
        if(window.applicationCache) {
            window.applicationCache.addEventListener('updateready', function(e) {
                if(window.applicationCache.status === window.applicationCache.UPDATEREADY) {
                    window.applicationCache.swapCache();
                    eventMgr.onMessage('New version available.\nPlease refresh the page to upgrade.');
                }
            }, false);
        }
    });

});
