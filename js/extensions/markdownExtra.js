define([
    "utils",
    "classes/Extension",
    "text!html/markdownExtraSettingsBlock.html",
    "libs/Markdown.Extra",
], function(utils, Extension, markdownExtraSettingsBlockHTML) {

    var markdownExtra = new Extension("markdownExtra", "Markdown Extra", true);
    markdownExtra.settingsBlock = markdownExtraSettingsBlockHTML;
    markdownExtra.defaultConfig = {
        prettify: true
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