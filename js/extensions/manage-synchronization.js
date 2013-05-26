define( [ "jquery", "underscore" ], function($) {
	
	var manageSynchronization = {
		extensionId: "manageSynchronization",
		extensionName: "Manage Synchronization",
		settingsBloc: [
		               '<p>Populates the "Manage synchronization" dialog box.</p>'
		              ].join("")
	};
	
	var fileManager = undefined;
	manageSynchronization.onFileManagerCreated = function(fileManagerParameter) {
		fileManager = fileManagerParameter;
	};
	
	var fileDesc = undefined;
	var lineTemplate = [
        '<div class="input-prepend input-append">',
    		'<span class="add-on" title="<%= provider.providerName %>">',
        		'<i class="icon-<%= provider.providerId %>"></i>',
    		'</span>',
    		'<input class="span5" type="text" value="<%= syncDesc %>" disabled />',
		'</div>'].join("");
	var removeButtonTemplate = '<a class="btn" title="Remove this location"><i class="icon-trash"></i></a>';
	var refreshDialog = function(fileDescParameter) {
		if(fileDescParameter !== undefined && fileDescParameter !== fileDesc) {
			return;
		}
		
		var syncAttributesList = _.values(fileDesc.syncLocations);
		$(".msg-no-sync, .msg-sync-list").addClass("hide");
		var syncList = $("#manage-sync-list").empty();
		if (syncAttributesList.length > 0) {
			$(".msg-sync-list").removeClass("hide");
		} else {
			$(".msg-no-sync").removeClass("hide");
		}
		_.each(syncAttributesList, function(syncAttributes) {
			var syncDesc = syncAttributes.id || syncAttributes.path;
			var lineElement = $(_.template(lineTemplate, {
				provider: providerMap[syncAttributes.provider],
				syncDesc: syncDesc
			}));
			lineElement.append($(removeButtonTemplate).click(function() {
				fileManager.removeSync(syncAttributes);
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
	
	return manageSynchronization;
	
});