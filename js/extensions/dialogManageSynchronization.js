define([
    "jquery",
    "underscore",
    "text!html/dialogManageSynchronizationLocation.html",
], function($, _, dialogManageSynchronizationLocationHTML) {

    var dialogManageSynchronization = {
        extensionId: "dialogManageSynchronization",
        extensionName: 'Dialog "Manage synchronization"',
        settingsBloc: '<p>Populates the "Manage synchronization" dialog box.</p>'
    };

    var extensionMgr = undefined;
    dialogManageSynchronization.onExtensionMgrCreated = function(extensionMgrParameter) {
        extensionMgr = extensionMgrParameter;
    };

    var fileDesc = undefined;
    var removeButtonTemplate = '<a class="btn" title="Remove this location"><i class="icon-trash"></i></a>';
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
                syncDesc: syncDesc
            }));
            lineElement.append($(removeButtonTemplate).click(function() {
                fileDesc.removeSyncLocation(syncAttributes);
                extensionMgr.onSyncRemoved(fileDesc, syncAttributes);
            }));
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