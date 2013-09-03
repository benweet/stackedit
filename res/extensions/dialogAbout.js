define([
    "underscore",
    "utils",
    "classes/Extension",
    "text!html/dialogAbout.html",
    "config"
], function(_, utils, Extension, dialogAboutHTML) {

    var dialogAbout = new Extension("dialogAbout", 'Dialog "About"');

    var libraries = {
        "Bootstrap": "http://getbootstrap.com/",
        "Bootstrap Tour": "http://bootstraptour.com/",
        "crel": "https://github.com/KoryNunn/crel",
        "CSS Browser Selector": "https://github.com/rafaelp/css_browser_selector/",
        "Dropbox-js": "https://github.com/dropbox/dropbox-js",
        "FileSaver.js": "https://github.com/eligrey/FileSaver.js/",
        "Fontello": "http://fontello.com/",
        "Font Awesome and others...": "res/libs/fontello/LICENSE.txt",
        "Gatekeeper": "https://github.com/prose/gatekeeper",
        "Github.js": "https://github.com/michael/github",
        "Glyphicons": "http://glyphicons.com/",
        "Highlight.js": "http://softwaremaniacs.org/soft/highlight/en/",
        "jGrowl": "https://github.com/stanlemon/jGrowl/",
        "jQuery": "http://jquery.com/",
        "jQuery Mouse Wheel Plugin": "https://github.com/brandonaaron/jquery-mousewheel",
        "LESS": "http://lesscss.org/",
        "MathJax": "http://www.mathjax.org/",
        "Mousetrap": "http://craig.is/killing/mice",
        "PageDown": "https://code.google.com/p/pagedown/",
        "Pagedown-extra": "https://github.com/jmcmanus/pagedown-extra/",
        "Prettify": "https://code.google.com/p/google-code-prettify/",
        "RequireJS": "http://requirejs.org/",
        "RequireJS LESS plugin": "https://github.com/guybedford/require-less",
        "stacktrace.js": "http://stacktracejs.com/",
        "to-markdown": "https://github.com/domchristie/to-markdown",
        "UI Layout": "http://layout.jquery-dev.net/",
        "Underscore.js": "http://underscorejs.org/",
        "waitForImages": "https://github.com/alexanderdickson/waitForImages"
    };

    var projects = {
        "StackEdit Download Proxy": "https://github.com/benweet/stackedit-download-proxy",
        "StackEdit Picasa Proxy": "https://github.com/benweet/stackedit-picasa-proxy",
        "StackEdit SSH Proxy": "https://github.com/benweet/stackedit-ssh-proxy",
        "StackEdit Tumblr Proxy": "https://github.com/benweet/stackedit-tumblr-proxy",
        "StackEdit WordPress Proxy": "https://github.com/benweet/stackedit-wordpress-proxy",
    };

    dialogAbout.onReady = function() {
        utils.addModal('modal-about', _.template(dialogAboutHTML, {
            libraries: libraries,
            projects: projects,
            version: VERSION
        }));
    };

    return dialogAbout;

});