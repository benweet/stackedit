define([
    "jquery",
    "underscore",
    "utils",
    "classes/Extension",
    "text!html/buttonHtmlCode.html",
    "text!html/buttonHtmlCodeSettingsBlock.html",
], function($, _, utils, Extension, buttonHtmlCodeHTML, buttonHtmlCodeSettingsBlockHTML) {

    var buttonHtmlCode = new Extension("buttonHtmlCode", 'Button "HTML code"', true);
    buttonHtmlCode.settingsBlock = buttonHtmlCodeSettingsBlockHTML;
    buttonHtmlCode.defaultConfig = {
        template: "<%= documentHTML %>",
    };
    
    buttonHtmlCode.onLoadSettings = function() {
        utils.setInputValue("#textarea-html-code-template", buttonHtmlCode.config.template);
    };

    buttonHtmlCode.onSaveSettings = function(newConfig, event) {
        newConfig.template = utils.getInputValue("#textarea-html-code-template");
    };

    buttonHtmlCode.onCreatePreviewButton = function() {
        return $(buttonHtmlCodeHTML);
    };

    var selectedFileDesc = undefined;
    buttonHtmlCode.onFileSelected = function(fileDesc) {
        selectedFileDesc = fileDesc;
    };

    buttonHtmlCode.onPreviewFinished = function(html) {
        try {
            var htmlCode = _.template(buttonHtmlCode.config.template, {
                documentTitle: selectedFileDesc.title,
                documentMarkdown: selectedFileDesc.content,
                documentHTML: html
            });
            $("#input-html-code").val(htmlCode);
        }
        catch(e) {
            extensionMgr.onError(e);
            return e.message;
        }
    };

    buttonHtmlCode.onReady = function() {
        $(".action-html-code").click(function() {
            _.defer(function() {
                $("#input-html-code").each(function() {
                    if($(this).is(":hidden"))
                        return;
                    $(this).get(0).select();
                });
            });
        });
    };

    return buttonHtmlCode;

});