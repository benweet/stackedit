define([
    "jquery",
    "underscore"
], function($, _) {
	
	var buttonPublish = {
		extensionId: "buttonPublish",
		extensionName: 'Button "Publish"',
        optional: true,
		settingsBloc: '<p>Adds a "Publish document" button in the navigation bar.</p>'
	};
	
	var currentFileDesc = undefined;
	var publishRunning = false;
	var hasPublications = false;
	var isOffline = false;
	// Enable/disable the button
	function updateButtonState() {
		if(publishRunning === true || hasPublications === false || isOffline === true) {
			$(".action-force-publish").addClass("disabled");
		}
		else {
			$(".action-force-publish").removeClass("disabled");
		}
	};
	
	buttonPublish.onPublishRunning = function(isRunning) {
		publishRunning = isRunning;
		updateButtonState();
	};
	
	buttonPublish.onOfflineChanged = function(isOfflineParameter) {
		isOffline = isOfflineParameter;
		updateButtonState();
	};
	
	// Check that current file has publications
	var checkPublication = function() {
		if(_.size(currentFileDesc.publishLocations) === 0) {
			hasPublications = false;
		}
		else {
			hasPublications = true;
		}
		updateButtonState();
	};
	
	buttonPublish.onFileSelected = function(fileDesc) {
		currentFileDesc = fileDesc;
		checkPublication();
	};
	
	buttonPublish.onPublishRemoved = checkPublication;
	buttonPublish.onNewPublishSuccess = checkPublication;
	
	return buttonPublish;
	
});