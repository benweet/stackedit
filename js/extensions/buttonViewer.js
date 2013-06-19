define([
    "jquery",
    "text!html/buttonViewer.html",
], function($, buttonViewerHTML) {

    var buttonViewer = {
        extensionId: "buttonViewer",
        extensionName: 'Button "Viewer"',
        optional: true,
        settingsBloc: '<p>Adds a "Viewer" button over the preview.</p>'
    };

    buttonViewer.onCreatePreviewButton = function() {
        return $(buttonViewerHTML);
    };

    return buttonViewer;

});