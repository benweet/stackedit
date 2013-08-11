define([
    "jquery",
    "underscore",
    "classes/Extension",
    "text!html/dialogManageSynchronizationLocation.html",
], function($, _, Extension, dialogManageSynchronizationLocationHTML) {

    var dialogManageSynchronization = new Extension("dialogManageSynchronization", 'Dialog "Manage synchronization"');

    var eventMgr = undefined;
    dialogManageSynchronization.onEventMgrCreated = function(eventMgrParameter) {
        eventMgr = eventMgrParameter;
    };
    
    var synchronizer = undefined;
    dialogManageSynchronization.onSynchronizerCreated = function(synchronizerParameter) {
        synchronizer = synchronizerParameter;
    };

    var fileDesc = undefined;
    var removeButtonTemplate = '<a class="btn btn-default" title="Remove this location"><i class="icon-trash"></i></a>';
    var refreshDialog = function(fileDescParameter) {
        if(fileDescParameter !== undefined && fileDescParameter !== fileDesc) {
            return;
        }

        var syncAttributesList = _.values(fileDesc.syncLocations);
        $(".msg-no-sync, .msg-sync-list").addClass("hide");
        var syncList = $("#manage-sync-list").empty();
        if(syncAttributesList.length > 0) {
            $(".msg-sync-list").removeClass("hide");
        }
        else {
            $(".msg-no-sync").removeClass("hide");
        }
        _.each(syncAttributesList, function(syncAttributes) {
            var syncDesc = syncAttributes.id || syncAttributes.path;
            var lineElement = $(_.template(dialogManageSynchronizationLocationHTML, {
                provider: syncAttributes.provider,
                syncDesc: syncDesc,
                isRealtime: syncAttributes.isRealtime
            }));
            lineElement.append($('<div class="input-group-btn">').append($(removeButtonTemplate).click(function() {
                synchronizer.tryStopRealtimeSync();
                fileDesc.removeSyncLocation(syncAttributes);
                eventMgr.onSyncRemoved(fileDesc, syncAttributes);
            })));
            syncList.append(lineElement);
        });
    };

    dialogManageSynchronization.onFileSelected = function(fileDescParameter) {
        fileDesc = fileDescParameter;
        refreshDialog(fileDescParameter);
    };

    dialogManageSynchronization.onSyncExportSuccess = refreshDialog;
    dialogManageSynchronization.onSyncRemoved = refreshDialog;

    dialogManageSynchronization.onReady = function() {
        // Handle enter key in the sync manual inputs
        $(".sync-manual").each(function() {
            var elt = $(this);
            elt.find("input").keyup(function(e) {
                if(e.which == 13) {
                    elt.find("a").click();
                    e.stopPropagation();
                }
            });
        });
    };

    return dialogManageSynchronization;

});