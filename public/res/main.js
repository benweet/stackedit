// RequireJS configuration
/*global requirejs */
requirejs.config({
    waitSeconds: 0,
    packages: [
        {
            name: 'ace',
            location: 'bower-libs/ace/lib/ace',
            main: 'ace'
        },
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
        crel: 'bower-libs/crel/crel',
        jgrowl: 'bower-libs/jgrowl/jquery.jgrowl',
        mousetrap: 'bower-libs/mousetrap/mousetrap',
        'mousetrap-record': 'bower-libs/mousetrap/plugins/record/mousetrap-record',
        toMarkdown: 'bower-libs/to-markdown/src/to-markdown',
        text: 'bower-libs/requirejs-text/text',
        mathjax: '../libs/MathJax/MathJax.js?config=TeX-AMS_HTML',
        bootstrap: 'bower-libs/bootstrap/dist/js/bootstrap',
        requirejs: 'bower-libs/requirejs/require',
        'google-code-prettify': 'bower-libs/google-code-prettify/src/prettify',
        highlightjs: 'libs/highlight/highlight.pack',
        'jquery-waitforimages': 'bower-libs/waitForImages/src/jquery.waitforimages',
        'jquery-ui': 'bower-libs/jquery-ui/ui/jquery-ui',
        'jquery-ui-core': 'bower-libs/jquery-ui/ui/jquery.ui.core',
        'jquery-ui-widget': 'bower-libs/jquery-ui/ui/jquery.ui.widget',
        'jquery-ui-mouse': 'bower-libs/jquery-ui/ui/jquery.ui.mouse',
        'jquery-ui-draggable': 'bower-libs/jquery-ui/ui/jquery.ui.draggable',
        'jquery-ui-effect': 'bower-libs/jquery-ui/ui/jquery.ui.effect',
        'jquery-ui-effect-slide': 'bower-libs/jquery-ui/ui/jquery.ui.effect-slide',
        uilayout: 'libs/layout',
        FileSaver: 'bower-libs/FileSaver/FileSaver',
        stacktrace: 'bower-libs/stacktrace/stacktrace',
        'requirejs-text': 'bower-libs/requirejs-text/text',
        'bootstrap-tour': 'bower-libs/bootstrap-tour/build/js/bootstrap-tour',
        css_browser_selector: 'bower-libs/css_browser_selector/css_browser_selector',
        'jquery-mousewheel': 'bower-libs/jquery-mousewheel/jquery.mousewheel',
        'pagedown-ace': 'bower-libs/pagedown-ace/Markdown.Editor',
        'pagedown-light': 'libs/Markdown.Editor.light',
        'pagedown-extra': 'bower-libs/pagedown-extra/Markdown.Extra',
        'ace/requirejs/text': 'libs/ace_text',
        'ace/commands/default_commands': 'libs/ace_commands',
        'require-css': 'bower-libs/require-css/css',
        xregexp: 'bower-libs/xregexp/xregexp-all',
        yaml: 'bower-libs/yaml.js',
        'yaml.js': 'bower-libs/yaml.js',
        'yaml-js': 'bower-libs/yaml.js/bin/yaml',
        Typo: 'bower-libs/Typo.js',
        'Typo.js': 'bower-libs/Typo.js',
        css: 'bower-libs/require-css/css',
        'css-builder': 'bower-libs/require-css/css-builder',
        normalize: 'bower-libs/require-css/normalize'
    },
    shim: {
        underscore: {
            exports: '_'
        },
        mathjax: [
            'libs/mathjax_init'
        ],
        jgrowl: {
            deps: [
                'jquery'
            ],
            exports: 'jQuery.jGrowl'
        },
        mousetrap: {
            exports: 'Mousetrap'
        },
        'yaml-js': {
            exports: 'YAML'
        },
        'bootstrap-record': [
            'mousetrap'
        ],
        toMarkdown: {
            deps: [
                'jquery'
            ],
            exports: 'toMarkdown'
        },
        stacktrace: {
            exports: 'printStackTrace'
        },
        FileSaver: {
            exports: 'saveAs'
        },
        highlightjs: {
            exports: 'hljs'
        },
        'bootstrap-tour': {
            deps: [
                'bootstrap'
            ],
            exports: 'Tour'
        },
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
        'pagedown-extra': [
            'pagedown-ace'
        ],
        'pagedown-ace': [
            'bower-libs/pagedown-ace/Markdown.Converter'
        ],
        'pagedown-light': [
            'bower-libs/pagedown-ace/Markdown.Converter'
        ]
    }
});

// Check browser compatibility
try {
    var test = 'seLocalStorageCheck';
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    var obj = {};
    Object.defineProperty(obj, 'prop', {
        get: function() {},
        set: function() {}
    });
}
catch (e) {
    alert('Your browser is not supported, sorry!');
    throw e;
}

// Viewer mode is deduced from the body class
window.viewerMode = /(^| )viewer($| )/.test(document.body.className);

// Light mode is for mobile or viewer
window.lightMode = window.viewerMode || /_light_/.test(localStorage.mode) || /(\?|&)light($|&)/.test(location.search) || (function(a) {
    if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) {
        return true;
    }
})(navigator.userAgent || navigator.vendor || window.opera);

// Keep the theme in a global variable
window.theme = localStorage.themeV3 || 'default';
var themeModule = "less!themes/" + window.theme;
if (window.baseDir.indexOf('-min') !== -1) {
    themeModule = "css!themes/" + window.theme;
}

// RequireJS entry point. By requiring synchronizer, publisher and
// media-importer, we are actually loading all the modules
require(["jquery", "core", "eventMgr", "synchronizer", "publisher", "mediaImporter", "css",
themeModule, ], function($, core, eventMgr) {
    
    if(window.noStart) {
        return;
    }

    $(function() {
        // Add RTL class
        /_rtl_/.test(localStorage.mode) && $(document.body).addClass('rtl');

        // Here, all the modules are loaded and the DOM is ready
        core.onReady();

        // If browser has detected a new application cache.
        if (window.applicationCache) {
            window.applicationCache.addEventListener('updateready', function() {
                if (window.applicationCache.status === window.applicationCache.UPDATEREADY) {
                    window.applicationCache.swapCache();
                    eventMgr.onMessage('New version available!\nJust refresh the page to upgrade.');
                }
            }, false);
        }
    });

});
