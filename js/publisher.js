define(["jquery", "google-helper", "github-helper", "publish-github", "underscore"], function($, googleHelper, githubHelper) {
	
	// Dependencies
	var core = undefined;
	var fileManager = undefined;

	var publisher = {};
	
	// Providers
	var providerMap = {};
	
	// Used to know if the current file has publications
	var hasPublications = false;
	
	// Allows external modules to update hasPublications flag
	publisher.notifyCurrentFile = function() {
		var fileIndex = fileManager.getCurrentFileIndex();
		
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
	
	// Used to get content to publish
	function getPublishContent(publishObject) {
		if(publishObject.format === undefined) {
			publishObject.format = $("input:radio[name=radio-publish-format]:checked").prop("value");			
		}
		if(publishObject.format == "markdown") {
			return $("#wmd-input").val();
		}
		return $("#wmd-preview").html();
	}
	
	// Recursive function to publish a file on multiple locations
	var publishIndexList = [];
	function publishLocation(callback, error) {
		
		// No more publish location for this document
		if (publishIndexList.length === 0) {
			callback(error);
			return;
		}
		
		// Dequeue a synchronized location
		var publishIndex = publishIndexList.pop();
		if(!publishIndex) {
			publishLocation(callback, error);
			return;
		}

		var publishObject = JSON.parse(localStorage[publishIndex]);
		var content = getPublishContent(publishObject);
		var commitMsg = core.settings.commitMsg;

		// Try to find the provider
		if(publishObject.provider == PUBLISH_PROVIDER_GITHUB) {
			githubHelper.upload(publishObject.repository, publishObject.branch, publishObject.path, content, commitMsg,
				function(error) {
				publishLocation(callback, error);
			});
		}
	}
	
	var publishRunning = false;
	publisher.publish = function() {
		// If publish is running or offline
		if(publishRunning === true || core.isOffline) {
			return;
		}
		
		publishRunning = true;
		publisher.updatePublishButton();
		var fileIndex = fileManager.getCurrentFileIndex();
		var title = localStorage[fileIndex + ".title"];
		publishIndexList = localStorage[fileIndex + ".publish"].split(";");;
		publishLocation(function(error) {
			publishRunning = false;
			publisher.updatePublishButton();
			if(error === undefined) {
				core.showMessage('"' + title + '" successfully published.');
			}
		});
	};
	
	// Add a new publish location to a local document
	publisher.newLocation = function(publishObject, callback) {
		var fileIndex = fileManager.getCurrentFileIndex();
		var title = localStorage[fileIndex + ".title"];
		var content = getPublishContent(publishObject);
		var provider = providerMap[publishObject.provider];
		provider.publishNew(publishObject, title, content);
	};
	
	// Associate publish provider to publisher
	_.each(arguments, function(argument) {
		if(argument !== undefined && argument.publishProvider !== undefined) {
			providerMap[argument.publishProvider] = argument;
		}
	});
	
	publisher.init = function(coreModule, fileManagerModule) {
		core = coreModule;
		fileManager = fileManagerModule;
		
		// Init providers
		_.each(providerMap, function(provider) {
			provider.init();
		});
		
		$(".action-force-publish").click(function() {
			if(!$(this).hasClass("disabled")) {
				publisher.publish();
			}
		});
	};
	
	return publisher;
});