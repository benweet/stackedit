define([
    "jquery",
    "utils",
    "classes/Extension",
    "text!html/markdownExtraSettingsBlock.html",
    "libs/Markdown.Extra",
], function($, utils, Extension, markdownExtraSettingsBlockHTML) {

    var markdownExtra = new Extension("markdownExtra", "Markdown Extra", true);
    markdownExtra.settingsBlock = markdownExtraSettingsBlockHTML;
    markdownExtra.defaultConfig = {
        extensions: [
            "fenced_code_gfm",
            "tables",
            "def_list",
            "attr_list",
            "footnotes"
        ],
        highlighter: "prettify"
    };

    markdownExtra.onLoadSettings = function() {
        function hasExtension(extensionName) {
            return _.some(markdownExtra.config.extensions, function(extension) {
                return extension == extensionName;
            });
        }
        utils.setInputChecked("#input-markdownextra-fencedcodegfm", hasExtension("fenced_code_gfm"));
        utils.setInputChecked("#input-markdownextra-tables", hasExtension("tables"));
        utils.setInputChecked("#input-markdownextra-deflist", hasExtension("def_list"));
        utils.setInputChecked("#input-markdownextra-attrlist", hasExtension("attr_list"));
        utils.setInputChecked("#input-markdownextra-footnotes", hasExtension("footnotes"));
        utils.setInputValue("#input-markdownextra-highlighter", markdownExtra.config.highlighter);
    };

    markdownExtra.onSaveSettings = function(newConfig, event) {
        newConfig.extensions = [];
        utils.getInputChecked("#input-markdownextra-fencedcodegfm") && newConfig.extensions.push("fenced_code_gfm");
        utils.getInputChecked("#input-markdownextra-tables") && newConfig.extensions.push("tables");
        utils.getInputChecked("#input-markdownextra-deflist") && newConfig.extensions.push("def_list");
        utils.getInputChecked("#input-markdownextra-attrlist") && newConfig.extensions.push("attr_list");
        utils.getInputChecked("#input-markdownextra-footnotes") && newConfig.extensions.push("footnotes");
        newConfig.highlighter = utils.getInputValue("#input-markdownextra-highlighter");
    };

    markdownExtra.onEditorConfigure = function(editor) {
        var converter = editor.getConverter();
        var options = {
            extensions: markdownExtra.config.extensions
        };
        if(markdownExtra.config.highlighter == "highlight") {
            options.highlighter = "prettify";
            editor.hooks.chain("onPreviewRefresh", function() {
                $('.prettyprint').each(function(i, e) {
                    hljs.highlightBlock(e);
                });
            });
        }
        else if(markdownExtra.config.highlighter == "prettify") {
            options.highlighter = "prettify";
            editor.hooks.chain("onPreviewRefresh", prettyPrint);
        }
        Markdown.Extra.init(converter, options);
    };

    return markdownExtra;
});