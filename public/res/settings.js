define([
    "underscore",
    "constants",
    "storage",
], function (_, constants, storage) {

    var settings = {
        layoutOrientation: "horizontal",
        lazyRendering: true,
        editorFontFamily: 'Menlo, Consolas, "Courier New", Courier, monospace',
        editorFontSize: 13,
        maxWidth: 960,
        defaultContent: "\n\n\n> Written with [StackEdit](" + constants.MAIN_URL + ").",
        commitMsg: "Published with " + constants.MAIN_URL,
        gdriveMultiAccount: 1,
        gdriveFullAccess: true,
        dropboxFullAccess: true,
        githubFullAccess: true,
        template: [
            '<!DOCTYPE html>\n',
            '<html>\n',
            '<head>\n',
            '<meta charset="utf-8">\n',
            '<title><%= documentTitle %></title>\n',
            '<link rel="stylesheet" href="',
            constants.MAIN_URL,
            'res-min/themes/base.css" />\n',
            '<script type="text/javascript" src="',
            constants.MAIN_URL,
            'libs/MathJax/MathJax.js?config=TeX-AMS_HTML"></script>\n',
            '</head>\n',
            '<body><div class="container"><%= documentHTML %></div></body>\n',
            '</html>'
        ].join(""),
        pdfTemplate: [
            '<!DOCTYPE html>\n',
            '<html>\n',
            '<head>\n',
            '<meta charset="utf-8">\n',
            '<title><%= documentTitle %></title>\n',
            '<link rel="stylesheet" href="',
            constants.MAIN_URL,
            'res-min/themes/base.css" />\n',
            '<script type="text/x-mathjax-config">\n',
            'MathJax.Hub.Config({ messageStyle: "none" });\n',
            '</script>\n',
            '<script type="text/javascript" src="',
            constants.MAIN_URL,
            'libs/MathJax/MathJax.js?config=TeX-AMS_HTML"></script>\n',
            '</head>\n',
            '<body class="pdf"><%= documentHTML %></body>\n',
            '</html>'
        ].join(""),
        pdfPageSize: 'A4',
        sshProxy: constants.SSH_PROXY_URL,
        shortcuts: {},
        extensionSettings: {}
    };

    try {
        _.extend(settings, JSON.parse(storage.settings));
    }
    catch (e) {
        // Ignore parsing error
    }

    return settings;
});