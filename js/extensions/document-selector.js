define( [ "jquery", "underscore" ], function($) {
	
	var documentSelector = {
		extensionId: "documentSelector",
		extensionName: "Document selector",
		settingsBloc: [
		               '<p>Builds the "Open document" dropdown menu.</p>'
		              ].join("")
	};
	
	var fileSystemDescriptor = undefined;
	documentSelector.onFileSystemLoaded = function(fileSystemDescriptorParameter) {
		fileSystemDescriptor = fileSystemDescriptorParameter;
	};
	
	var fileDesc = undefined;
	var updateSelector = function() {
		var sortedDescriptor = _.sortBy(fileSystemDescriptor, function(fileDesc) {
			return fileDesc.title.toLowerCase();
		});

		function composeTitle(fileDesc) {
			var result = [];
			var syncAttributesList = _.values(fileDesc.syncLocations);
			var publishAttributesList = _.values(fileDesc.publishLocations);
			var attributesList = syncAttributesList.concat(publishAttributesList);
			_.chain(attributesList).sortBy(function(attributes) {
				return attributes.provider;
			}).each(function(attributes) {
				result.push('<i class="icon-' + attributes.provider + '"></i>');
			});
			result.push(" ");
			result.push(fileDesc.title);
			return result.join("");
		}

		$("#file-selector li:not(.stick)").empty();
		_.each(sortedDescriptor, function(fileDescToPrint) {
			var a = $("<a>").html(composeTitle(fileDescToPrint.fileIndex));
			var li = $("<li>").append(a);
			if (fileDescToPrint === fileDesc) {
				li.addClass("disabled");
			} else {
				a.prop("href", "#").click(function() {
					fileManager.selectFile(fileDescToPrint);
				});
			}
			$("#file-selector").append(li);			
		});
	};
		
	documentSelector.onFileSelected = function(fileDescParameter) {
		fileDesc = fileDescParameter;
		updateSelector();
	};
	
	documentSelector.onTitleChanged = updateSelector;
	documentSelector.onSyncExportSuccess = updateSelector;
	documentSelector.onSyncRemoved = updateSelector;
	documentSelector.onNewPublishSuccess = updateSelector;
	documentSelector.onPublishRemoved = updateSelector;
	
	return documentSelector;
	
});