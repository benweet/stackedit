define([
    "jquery",
    "underscore",
    "utils",
    "classes/Extension",
    "text!html/buttonHtmlCode.html",
    "text!html/buttonHtmlCodeSettingsBlock.html",
], function($, _, utils, Extension, buttonHtmlCodeHTML, buttonHtmlCodeSettingsBlockHTML) {

    var buttonHtmlCode = new Extension("buttonHtmlCode", 'Button "HTML code"', true, true);
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

    var eventMgr = undefined;
    buttonHtmlCode.onEventMgrCreated = function(eventMgrParameter) {
        eventMgr = eventMgrParameter;
    };

    buttonHtmlCode.onCreatePreviewButton = function() {
        return buttonHtmlCodeHTML;
    };

    var selectedFileDesc = undefined;
    buttonHtmlCode.onFileSelected = function(fileDesc) {
        selectedFileDesc = fileDesc;
    };

    var textareaElt = undefined;
    buttonHtmlCode.onPreviewFinished = function(html) {
        try {
            var htmlCode = _.template(buttonHtmlCode.config.template, {
                documentTitle: selectedFileDesc.title,
                documentMarkdown: selectedFileDesc.content,
                documentHTML: html
            });
            textareaElt.value = htmlCode;
        }
        catch(e) {
            eventMgr.onError(e);
            return e.message;
        }
    };

    buttonHtmlCode.onReady = function() {
        textareaElt = document.getElementById('input-html-code');
        $(".action-html-code").click(function() {
            _.defer(function() {
                $("#input-html-code").each(function() {
                    if($(this).is(":hidden"))
                        return;
                    this.select();
                });
            });
        });
    };

    return buttonHtmlCode;

});