define([
    "jquery",
    "text!html/buttonMarkdownSyntax.html",
], function($, buttonMarkdownSyntaxHTML) {

    var buttonMarkdownSyntax = {
        extensionId: "buttonMarkdownSyntax",
        extensionName: 'Button "Markdown syntax"',
        optional: true,
        settingsBloc: '<p>Adds a "Markdown syntax" button over the preview.</p>'
    };

    buttonMarkdownSyntax.onCreatePreviewButton = function() {
        return $(buttonMarkdownSyntaxHTML);
    };

    return buttonMarkdownSyntax;

});