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
    var $fileTitleNavbar = undefined;
    var updateTitle = function(fileDescParameter) {
        if(fileDescParameter !== fileDesc) {
            return;
        }

        var title = fileDesc.title;
        document.title = "StackEdit - " + title;
        $fileTitleNavbar.html(fileDesc.composeTitle());
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
    
    documentTitle.onReady = function() {
        $fileTitleNavbar = $(".file-title-navbar");
        // Add a scrolling effect on hover
        $fileTitleNavbar.hover(function() {
            var scrollLeft = $fileTitleNavbar[0].scrollWidth - $fileTitleNavbar.outerWidth();
            $fileTitleNavbar.stop(true, true).animate({
                    scrollLeft: scrollLeft
                }, scrollLeft * 15, 'linear');
        }, function() {
            $fileTitleNavbar.stop(true, true).scrollLeft(0);
        }).click(function() {
            $fileTitleNavbar.stop(true, true).scrollLeft(0);
        });
    };

    return documentTitle;

});