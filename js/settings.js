define([
    "underscore",
    "config"
], function(_) {

    var settings = {
        layoutOrientation: "horizontal",
        lazyRendering: true,
        editorFontSize: 14,
        defaultContent: "\n\n\n> Written with [StackEdit](" + MAIN_URL + ").",
        commitMsg: "Published with " + MAIN_URL,
        template: [
            '<!DOCTYPE html>\n',
            '<html>\n',
            '<head>\n',
            '<meta charset="utf-8">\n',
            '<title><%= documentTitle %></title>\n',
            '<link rel="stylesheet" href="',
            MAIN_URL,
            'css/main-min.css" />\n',
            '</head>\n',
            '<body><%= documentHTML %></body>\n',
            '</html>'
        ].join(""),
        sshProxy: SSH_PROXY_URL,
        extensionSettings: {}
    };

    try {
        _.extend(settings, JSON.parse(localStorage.settings));
    }
    catch(e) {
        // Ignore parsing error
    }

    return settings;
});