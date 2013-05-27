define([
    "jquery",
    "underscore"
], function($, _) {
	
	var buttonShare = {
		extensionId: "buttonShare",
		extensionName: 'Button "Share"',
        optional: true,
		settingsBloc: '<p>Adds a "Share document" button in the navigation bar.</p>'
	};
	
	var fileDesc = undefined;
	var lineTemplate = [
        '<div class="input-prepend">',
			'<a href="<%= link %>" class="add-on" title="Sharing location"><i class="icon-link"></i></a>',
			'<input class="span2" type="text" value="<%= link %>" readonly />',
		'</div>'].join("");
	var refreshDocumentSharing = function(fileDescParameter) {
		if(fileDescParameter !== undefined && fileDescParameter !== fileDesc) {
			return;
		}
		
		var linkList = $("#link-container .link-list").empty();
		$("#link-container .no-link").show();
		
		var attributesList = _.values(fileDesc.publishLocations);
		_.each(attributesList, function(attributes) {
			if(attributes.sharingLink) {
				var lineElement = $(_.template(lineTemplate, {
					link: attributes.sharingLink
				}));
				lineElement.click(function(event) {
					event.stopPropagation();
				});
				linkList.append(lineElement);
				$("#link-container .no-link").hide();
			}
		});
	};
	
	buttonShare.onFileSelected = function(fileDescParameter) {
		fileDesc = fileDescParameter;
		refreshDocumentSharing(fileDescParameter);
	};
	
	buttonShare.onNewPublishSuccess = refreshDocumentSharing;
	buttonShare.onPublishRemoved = refreshDocumentSharing;
	
	return buttonShare;
	
});