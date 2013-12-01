define([
    "jquery",
    "underscore",
    "classes/Extension",
    "text!html/dialogManageSharingLocation.html",
], function($, _, Extension, dialogManageSharingLocationHTML) {

    var dialogManageSharing = new Extension("dialogManageSharing", 'Button "Share"', false, true);

    var fileDesc;
    var shareListElt;
    var $msgShareListElt;
    var $msgNoShareElt;
    var refreshDocumentSharing = function(fileDescParameter) {
        if(fileDescParameter !== undefined && fileDescParameter !== fileDesc) {
            return;
        }

        var linkListHtml = _.reduce(fileDesc.publishLocations, function(result, attributes) {
            if(attributes.sharingLink) {
                result += _.template(dialogManageSharingLocationHTML, {
                    link: attributes.sharingLink
                });
            }
            return result;
        }, '');
        shareListElt.innerHTML = linkListHtml;
        
        $msgShareListElt.toggleClass('hide', linkListHtml.length === 0);
        $msgNoShareElt.toggleClass('hide', linkListHtml.length !== 0);
    };

    dialogManageSharing.onFileSelected = function(fileDescParameter) {
        fileDesc = fileDescParameter;
        refreshDocumentSharing(fileDescParameter);
    };

    dialogManageSharing.onNewPublishSuccess = refreshDocumentSharing;
    dialogManageSharing.onPublishRemoved = refreshDocumentSharing;
    
    dialogManageSharing.onReady = function() {
        var modalElt = document.querySelector('.modal-manage-sharing');
        shareListElt = modalElt.querySelector('.share-list');
        $msgShareListElt = $(modalElt.querySelectorAll('.msg-share-list'));
        $msgNoShareElt = $(modalElt.querySelectorAll('.msg-no-share'));
    };

    return dialogManageSharing;

});