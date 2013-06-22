define([
    "jquery",
    "underscore",
    "classes/Extension",
    "text!html/buttonShare.html",
    "text!html/buttonShareLocation.html",
], function($, _, Extension, buttonShareHTML, buttonShareLocationHTML) {

    var buttonShare = new Extension("buttonShare", 'Button "Share"', true);
    buttonShare.settingsBlock = '<p>Adds a "Share document" button in the navigation bar.</p>';

    buttonShare.onCreateButton = function() {
        return $(buttonShareHTML);
    };

    var fileDesc = undefined;
    var refreshDocumentSharing = function(fileDescParameter) {
        if(fileDescParameter !== undefined && fileDescParameter !== fileDesc) {
            return;
        }

        var linkList = $("#link-container .link-list").empty();
        $("#link-container .no-link").show();

        var attributesList = _.values(fileDesc.publishLocations);
        _.each(attributesList, function(attributes) {
            if(attributes.sharingLink) {
                var lineElement = $(_.template(buttonShareLocationHTML, {
                    link: attributes.sharingLink
                }));
                lineElement.click(function(event) {
                    event.stopPropagation();
                });
                linkList.append(lineElement);
                $("#link-container .no-link").hide();
            }
        });
    };

    buttonShare.onFileSelected = function(fileDescParameter) {
        fileDesc = fileDescParameter;
        refreshDocumentSharing(fileDescParameter);
    };

    buttonShare.onNewPublishSuccess = refreshDocumentSharing;
    buttonShare.onPublishRemoved = refreshDocumentSharing;

    return buttonShare;

});