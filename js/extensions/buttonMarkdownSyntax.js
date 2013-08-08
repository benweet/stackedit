define([
    "jquery",
    "classes/Extension",
    "text!html/buttonMarkdownSyntax.html",
], function($, Extension, buttonMarkdownSyntaxHTML) {

    var buttonMarkdownSyntax = new Extension("buttonMarkdownSyntax", 'Button "Markdown syntax', true);
    buttonMarkdownSyntax.settingsBlock = '<p>Adds a "Markdown syntax" button over the preview.</p>';

    buttonMarkdownSyntax.onCreatePreviewButton = function() {
        return '<button class="btn btn-default dropdown-toggle" title="Markdown syntax" data-toggle="dropdown" data-target=".panel-markdown-syntax"><i class="icon-help-circled"></i></button>';
    };
    
    buttonMarkdownSyntax.onReady = function() {
        $('#extension-preview-buttons').append($(buttonMarkdownSyntaxHTML));
    };
    
    return buttonMarkdownSyntax;

});