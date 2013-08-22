define([
    "jquery",
    "underscore",
    "classes/Extension",
    "text!html/buttonShare.html",
    "text!html/buttonShareLocation.html",
], function($, _, Extension, buttonShareHTML, buttonShareLocationHTML) {

    var buttonShare = new Extension("buttonShare", 'Button "Share"', true, true);
    buttonShare.settingsBlock = '<p>Adds a "Share document" button in the navigation bar.</p>';

    buttonShare.onCreateButton = function() {
        return buttonShareHTML;
    };

    var fileDesc = undefined;
    var linkListElt = undefined;
    var $noLinkElt = undefined;
    var refreshDocumentSharing = function(fileDescParameter) {
        if(fileDescParameter !== undefined && fileDescParameter !== fileDesc) {
            return;
        }

        var linkListHtml = _.reduce(fileDesc.publishLocations, function(result, attributes) {
            if(attributes.sharingLink) {
                result += _.template(buttonShareLocationHTML, {
                    link: attributes.sharingLink
                });
            }
            return result;
        }, '');
        linkListElt.innerHTML = linkListHtml;
        $noLinkElt.toggleClass('hide', linkListHtml.length !== 0);
    };

    buttonShare.onFileSelected = function(fileDescParameter) {
        fileDesc = fileDescParameter;
        refreshDocumentSharing(fileDescParameter);
    };

    buttonShare.onNewPublishSuccess = refreshDocumentSharing;
    buttonShare.onPublishRemoved = refreshDocumentSharing;
    
    buttonShare.onReady = function() {
        var linkContainerElt = document.querySelector('.link-container');
        linkListElt = linkContainerElt.querySelector('.link-list');
        $noLinkElt = $(linkContainerElt.querySelector('.no-link'));
    };

    return buttonShare;

});