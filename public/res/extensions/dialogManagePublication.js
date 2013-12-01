define([
    "jquery",
    "underscore",
    "classes/Extension",
    "text!html/dialogManagePublicationLocation.html",
], function($, _, Extension, dialogManagePublicationLocationHTML) {

    var dialogManagePublication = new Extension("dialogManagePublication", 'Dialog "Manage publication"', false, true);

    var eventMgr;
    dialogManagePublication.onEventMgrCreated = function(eventMgrParameter) {
        eventMgr = eventMgrParameter;
    };

    var fileDesc;
    var publishListElt;
    var $msgPublishListElt;
    var $msgNoPublishElt;
    var refreshDialog = function(fileDescParameter) {
        if(fileDescParameter !== undefined && fileDescParameter !== fileDesc) {
            return;
        }

        if(_.size(fileDesc.publishLocations) > 0) {
            $msgPublishListElt.removeClass("hide");
            $msgNoPublishElt.addClass("hide");
        }
        else {
            $msgPublishListElt.addClass("hide");
            $msgNoPublishElt.removeClass("hide");
        }
        
        var publishListHtml = _.reduce(fileDesc.publishLocations, function(result, publishAttributes) {
            var formattedAttributes = _.omit(publishAttributes, "provider", "publishIndex", "sharingLink");
            formattedAttributes.password && (formattedAttributes.password = "********");
            formattedAttributes = JSON.stringify(formattedAttributes).replace(/{|}|"/g, "").replace(/,/g, ", ");
            return result + _.template(dialogManagePublicationLocationHTML, {
                publishAttributes: publishAttributes,
                publishDesc: formattedAttributes
            });
        }, '');
        publishListElt.innerHTML = publishListHtml;
        
        _.each(publishListElt.querySelectorAll('.remove-button'), function(removeButtonElt) {
            var $removeButtonElt = $(removeButtonElt);
            var publishAttributes = fileDesc.publishLocations[$removeButtonElt.data('publishIndex')];
            $removeButtonElt.click(function() {
                fileDesc.removePublishLocation(publishAttributes);
                eventMgr.onPublishRemoved(fileDesc, publishAttributes);
            });
        });
    };

    dialogManagePublication.onFileSelected = function(fileDescParameter) {
        fileDesc = fileDescParameter;
        refreshDialog(fileDescParameter);
    };

    dialogManagePublication.onNewPublishSuccess = refreshDialog;
    dialogManagePublication.onPublishRemoved = refreshDialog;

    dialogManagePublication.onReady = function() {
        var modalElt = document.querySelector(".modal-manage-publish");
        publishListElt = modalElt.querySelector(".publish-list");
        $msgPublishListElt = $(modalElt.querySelectorAll(".msg-publish-list"));
        $msgNoPublishElt = $(modalElt.querySelectorAll(".msg-no-publish"));
    };

    return dialogManagePublication;

});