define([
    "jquery",
    "text!html/buttonHtmlCode.html",
], function($, buttonHtmlCodeHTML) {

    var buttonHtmlCode = {
        extensionId: "buttonHtmlCode",
        extensionName: 'Button "HTML code"',
        optional: true,
        settingsBloc: '<p>Adds a "HTML code" button over the preview.</p>'
    };

    buttonHtmlCode.onCreatePreviewButton = function() {
        return $(buttonHtmlCodeHTML);
    };

    buttonHtmlCode.onPreviewFinished = function() {
        $("#input-html-code").val($("#wmd-preview").html());
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