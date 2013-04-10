define(["jquery", "google-helper", "github-helper"], function($, googleHelper, githubHelper) {
	
	// Dependencies
	var core = undefined;
	var fileManager = undefined;

	var publisher = {};
	
	// Used to know if the current file has publications
	var hasPublications = false;
	
	// Allows external modules to update hasPublications flag
	publisher.notifyCurrentFile = function(fileIndex) {
		
		// Check that file has publications
		if(localStorage[fileIndex + ".publish"].length === 1) {
			hasPublications = false;
		}
		else {
			hasPublications = true;
		}
		publisher.updatePublishButton();
	};

	// Used to enable/disable the publish button
	publisher.updatePublishButton = function() {
		if(publishRunning === true || hasPublications === false || core.isOffline) {
			$(".action-force-publish").addClass("disabled");
		}
		else {
			$(".action-force-publish").removeClass("disabled");
		}
	};
	
	var publishRunning = false;

	publisher.init = function(coreModule, fileManagerModule) {
		core = coreModule;
		fileManager = fileManagerModule;
	};
	
	return publisher;
});