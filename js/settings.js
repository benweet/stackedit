define([
    "underscore",
    "config"
], function(_) {

    var settings = {
        layoutOrientation: "horizontal",
        lazyRendering: true,
        editorFontSize: 14,
        defaultContent: "\n\n\n> Written with [StackEdit](http://benweet.github.io/stackedit/).",
        commitMsg: "Published by http://benweet.github.io/stackedit",
        template: [
            '<!DOCTYPE html>\n',
            '<html>\n',
            '<head>\n',
            '<title><%= documentTitle %></title>\n',
            '</head>\n',
            '<body><%= documentHTML %></body>\n',
            '</html>'
        ].join(""),
        sshProxy: SSH_PROXY_URL,
        extensionSettings: {}
    };

    if(_.has(localStorage, "settings")) {
        _.extend(settings, JSON.parse(localStorage.settings));
    }

    return settings;
});