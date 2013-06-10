define([
    "utils",
    "text!html/markdownExtraSettingsBloc.html",
    "libs/Markdown.Extra",
], function(utils, markdownExtraSettingsBlocHTML) {

    var markdownExtra = {
        extensionId: "markdownExtra",
        extensionName: "Markdown Extra",
        optional: true,
        defaultConfig: {
            prettify: true
        },
        settingsBloc: markdownExtraSettingsBlocHTML
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