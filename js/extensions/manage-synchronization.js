define([
    "jquery",
    "underscore"
], function($, _) {

    var manageSynchronization = {
        extensionId: "manageSynchronization",
        extensionName: "Manage synchronization",
        settingsBloc: '<p>Populates the "Manage synchronization" dialog box.</p>'
    };

    var fileMgr = undefined;
    manageSynchronization.onFileMgrCreated = function(fileMgrParameter) {
        fileMgr = fileMgrParameter;
    };

    var fileDesc = undefined;
    var lineTemplate = [
        '<div class="input-prepend input-append">',
        '   <span class="add-on" title="<%= provider.providerName %>">',
        '       <i class="icon-<%= provider.providerId %>"></i>',
        '   </span>',
        '   <input class="span5" type="text" value="<%= syncDesc %>" disabled />',
        '</div>'
    ].join("");
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
            var lineElement = $(_.template(lineTemplate, {
                provider: syncAttributes.provider,
                syncDesc: syncDesc
            }));
            lineElement.append($(removeButtonTemplate).click(function() {
                fileMgr.removeSync(syncAttributes);
            }));
            syncList.append(lineElement);
        });
    };

    manageSynchronization.onFileSelected = function(fileDescParameter) {
        fileDesc = fileDescParameter;
        refreshDialog(fileDescParameter);
    };

    manageSynchronization.onSyncExportSuccess = refreshDialog;
    manageSynchronization.onSyncRemoved = refreshDialog;

    manageSynchronization.onReady = function() {
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

    return manageSynchronization;

});