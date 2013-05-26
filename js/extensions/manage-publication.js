define( [ "jquery", "underscore" ], function($) {
	
	var managePublication = {
		extensionId: "managePublication",
		extensionName: "Manage Publication",
		settingsBloc: [
		               '<p>Populates the "Manage publication" dialog box.</p>'
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
			'<input class="span5" type="text" value="<%= publishDesc %>" disabled />',
		'</div>'].join("");
	var removeButtonTemplate = '<a class="btn" title="Remove this location"><i class="icon-trash"></i></a>';
	var refreshDialog = function(fileDescParameter) {
		if(fileDescParameter !== undefined && fileDescParameter !== fileDesc) {
			return;
		}
		
		var publishAttributesList = _.values(fileDesc.publishLocations);
		$(".msg-no-publish, .msg-publish-list").addClass("hide");
		var publishList = $("#manage-publish-list").empty();
		if (publishAttributesList.length > 0) {
			$(".msg-publish-list").removeClass("hide");
		} else {
			$(".msg-no-publish").removeClass("hide");
		}
		_.each(publishAttributesList, function(publishAttributes) {
			publishAttributes = _.extend({}, publishAttributes);
			if(publishAttributes.password) {
				publishAttributes.password = "********";
			}
			var publishDesc = JSON.stringify(publishAttributes).replace(/{|}|"/g, "");
			var lineElement = $(_.template(lineTemplate, {
				provider: providerMap[publishAttributes.provider],
				publishDesc: publishDesc
			}));
			lineElement.append($(removeButtonTemplate).click(function() {
				fileManager.removePublish(publishAttributes);
			}));
			publishList.append(lineElement);
		});
	};
		
	managePublication.onFileSelected = function(fileDescParameter) {
		fileDesc = fileDescParameter;
		refreshDialog(fileDescParameter);
	};
	
	managePublication.onNewPublishSuccess = refreshDialog;
	managePublication.onPublishRemoved = refreshDialog;
	
	return managePublication;
	
});