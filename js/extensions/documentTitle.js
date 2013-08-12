define([
    "jquery",
    "underscore",
    "classes/Extension",
], function($, _, Extension) {

    var documentTitle = new Extension("documentTitle", "Document Title");

    var layout = undefined;
    documentTitle.onLayoutCreated = function(layoutParameter) {
        layout = layoutParameter;
    };

    var fileDesc = undefined;
    var updateTitle = function(fileDescParameter) {
        if(fileDescParameter !== fileDesc) {
            return;
        }

        var title = fileDesc.title;
        document.title = "StackEdit - " + title;
        $(".file-title-navbar").html(fileDesc.composeTitle());
        $(".file-title").text(title);
        $(".input-file-title").val(title);

        if(layout !== undefined) {
            // Use defer to make sure UI has been updated
            _.defer(layout.resizeAll);
        }
    };

    documentTitle.onFileSelected = function(fileDescParameter) {
        fileDesc = fileDescParameter;
        updateTitle(fileDescParameter);
    };

    documentTitle.onTitleChanged = updateTitle;
    documentTitle.onSyncExportSuccess = updateTitle;
    documentTitle.onSyncRemoved = updateTitle;
    documentTitle.onNewPublishSuccess = updateTitle;
    documentTitle.onPublishRemoved = updateTitle;

    return documentTitle;

});