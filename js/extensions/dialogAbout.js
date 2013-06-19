define([
    "jquery",
    "underscore",
    "text!html/dialogAbout.html",
], function($, _, dialogAboutHTML) {

    var dialogAbout = {
        extensionId: "dialogAbout",
        extensionName: 'Dialog "About"',
        settingsBloc: '<p>Prints the content of the "About" dialog box.</p>'
    };

    var libraries = {
        "Bootstrap": "http://twitter.github.io/bootstrap/",
        "CSS Browser Selector": "https://github.com/rafaelp/css_browser_selector/",
        "Dropbox-js": "https://github.com/dropbox/dropbox-js",
        "FileSaver.js": "https://github.com/eligrey/FileSaver.js/",
        "Gatekeeper": "https://github.com/prose/gatekeeper",
        "Github.js": "https://github.com/michael/github",
        "Glyphicons": "http://glyphicons.com/",
        "jGrowl": "https://github.com/stanlemon/jGrowl/",
        "jQuery": "http://jquery.com/",
        "jQuery Mouse Wheel Plugin": "https://github.com/brandonaaron/jquery-mousewheel",
        "MathJax": "http://www.mathjax.org/",
        "Mousetrap": "http://craig.is/killing/mice",
        "PageDown": "https://code.google.com/p/pagedown/",
        "Pagedown-extra": "https://github.com/jmcmanus/pagedown-extra/",
        "Prettify": "https://code.google.com/p/google-code-prettify/",
        "RequireJS": "http://requirejs.org/",
        "stacktrace.js": "http://stacktracejs.com/",
        "to-markdown": "https://github.com/domchristie/to-markdown",
        "UI Layout": "http://layout.jquery-dev.net/",
        "Underscore.js": "http://underscorejs.org/",
        "waitForImages": "https://github.com/alexanderdickson/waitForImages"
    };

    var projects = {
        "StackEdit Download Proxy": "https://github.com/benweet/stackedit-download-proxy",
        "StackEdit SSH Proxy": "https://github.com/benweet/stackedit-ssh-proxy",
        "StackEdit Tumblr Proxy": "https://github.com/benweet/stackedit-tumblr-proxy",
        "StackEdit WordPress Proxy": "https://github.com/benweet/stackedit-wordpress-proxy",
    };
    
    dialogAbout.onReady = function() {
        $("#modal-about .modal-body").html(_.template(dialogAboutHTML, {
            libraries: libraries,
            projects: projects
        }));
    };

    return dialogAbout;

});