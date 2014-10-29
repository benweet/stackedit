define([
    "jquery",
    "underscore",
    "classes/Extension"
], function($, _, Extension) {

    var documentTitle = new Extension("documentTitle", "Document Title");

    var fileDesc;
    var $fileTitleNavbar;
    var updateTitle = _.debounce(function(fileDescParameter) {
        if(fileDescParameter !== fileDesc) {
            return;
        }

        var title = fileDesc.title;
        $fileTitleNavbar.html(fileDesc.composeTitle(true));
        $(".file-title").text(title);
        $(".input-file-title").val(title);
    }, 50);

    documentTitle.onFileSelected = function(fileDescParameter) {
        fileDesc = fileDescParameter;
        updateTitle(fileDescParameter);
    };

    documentTitle.onTitleChanged = updateTitle;
    documentTitle.onSyncExportSuccess = updateTitle;
    documentTitle.onSyncRemoved = updateTitle;
    documentTitle.onNewPublishSuccess = updateTitle;
    documentTitle.onPublishRemoved = updateTitle;
    documentTitle.onReady = updateTitle;

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
