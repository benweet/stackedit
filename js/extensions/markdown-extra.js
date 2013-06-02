define([
    "utils",
    "libs/Markdown.Extra"
], function(utils) {

    var markdownExtra = {
        extensionId: "markdownExtra",
        extensionName: "Markdown Extra",
        optional: true,
        defaultConfig: {
            prettify: true
        },
        settingsBloc: [
            '<p>Adds extra features to the original Markdown syntax.</p>',
            '<div class="form-horizontal">',
            '   <div class="control-group">',
            '       <label class="control-label" for="input-markdownextra-prettify">Prettify syntax highlighting</label>',
            '       <div class="controls">',
            '           <input type="checkbox" id="input-markdownextra-prettify">',
            '       </div>',
            '   </div>',
            '</div>'
        ].join("")
    };

    markdownExtra.onLoadSettings = function() {
        utils.setInputChecked("#input-markdownextra-prettify", markdownExtra.config.prettify);
    };

    markdownExtra.onSaveSettings = function(newConfig, event) {
        newConfig.prettify = utils.getInputChecked("#input-markdownextra-prettify");
    };

    markdownExtra.onEditorConfigure = function(editor) {
        var converter = editor.getConverter();
        var options = {};
        if(markdownExtra.config.prettify === true) {
            options.highlighter = "prettify";
            editor.hooks.chain("onPreviewRefresh", prettyPrint);
        }
        Markdown.Extra.init(converter, options);
    };

    return markdownExtra;
});