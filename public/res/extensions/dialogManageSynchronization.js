define([
    "jquery",
    "underscore",
    "classes/Extension",
    "text!html/dialogManageSynchronizationLocation.html",
], function($, _, Extension, dialogManageSynchronizationLocationHTML) {

    var dialogManageSynchronization = new Extension("dialogManageSynchronization", 'Dialog "Manage synchronization"', false, true);

    var eventMgr;
    dialogManageSynchronization.onEventMgrCreated = function(eventMgrParameter) {
        eventMgr = eventMgrParameter;
    };

    var synchronizer;
    dialogManageSynchronization.onSynchronizerCreated = function(synchronizerParameter) {
        synchronizer = synchronizerParameter;
    };

    var fileDesc;
    var syncListElt;
    var $msgSyncListElt;
    var $msgNoSyncElt;
    var $showAlreadySynchronizedElt;
    var refreshDialog = function(fileDescParameter) {
        if(fileDescParameter !== undefined && fileDescParameter !== fileDesc) {
            return;
        }

        if(_.size(fileDesc.syncLocations) > 0) {
            $msgSyncListElt.removeClass("hide");
            $msgNoSyncElt.addClass("hide");
        }
        else {
            $msgSyncListElt.addClass("hide");
            $msgNoSyncElt.removeClass("hide");
        }

        $showAlreadySynchronizedElt.toggleClass("hide", _.size(fileDesc.syncLocations) === 0);

        var syncListHtml = _.reduce(fileDesc.syncLocations, function(result, syncAttributes) {
            return result + _.template(dialogManageSynchronizationLocationHTML, {
                syncAttributes: syncAttributes,
                syncDesc: syncAttributes.id || syncAttributes.path
            });
        }, '');
        syncListElt.innerHTML = syncListHtml;

        _.each(syncListElt.querySelectorAll('.remove-button'), function(removeButtonElt) {
            var $removeButtonElt = $(removeButtonElt);
            var syncAttributes = fileDesc.syncLocations[$removeButtonElt.data('syncIndex')];
            $removeButtonElt.click(function() {
                fileDesc.removeSyncLocation(syncAttributes);
                eventMgr.onSyncRemoved(fileDesc, syncAttributes);
            });
        });
    };

    dialogManageSynchronization.onFileSelected = function(fileDescParameter) {
        fileDesc = fileDescParameter;
        refreshDialog(fileDescParameter);
    };

    dialogManageSynchronization.onSyncExportSuccess = refreshDialog;
    dialogManageSynchronization.onSyncRemoved = refreshDialog;

    dialogManageSynchronization.onReady = function() {
        var modalElt = document.querySelector(".modal-manage-sync");
        syncListElt = modalElt.querySelector(".sync-list");
        $msgSyncListElt = $(modalElt.querySelectorAll(".msg-sync-list"));
        $msgNoSyncElt = $(modalElt.querySelectorAll(".msg-no-sync"));

        $showAlreadySynchronizedElt = $(document.querySelectorAll(".show-already-synchronized"));
    };

    return dialogManageSynchronization;

});
