define(["jquery", "github-provider", "underscore"], function($) {
	
	// Dependencies
	var core = undefined;
	var fileManager = undefined;

	var publisher = {};
	
	// Create a map with providerName: providerObject
	var providerMap = _.chain(arguments)
		.map(function(argument) {
			return argument && argument.providerType & PROVIDER_TYPE_PUBLISH_FLAG && [argument.providerId, argument];
		}).compact().object().value();

	// Used to know if the current file has publications
	var hasPublications = false;
	
	// Allows external modules to update hasPublications flag
	publisher.notifyPublish = function() {
		var fileIndex = fileManager.getCurrentFileIndex();
		
		// Check that file has publications
		if(localStorage[fileIndex + ".publish"].length === 1) {
			hasPublications = false;
		}
		else {
			hasPublications = true;
		}
		publisher.updatePublishButton();
		publisher.refreshManagePublish();
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
	
	// Apply template to the current document
	publisher.applyTemplate = function() {
		var fileIndex = fileManager.getCurrentFileIndex();
		return _.template(core.settings.template, {
			documentTitle: localStorage[fileIndex + ".title"],
			documentMarkdown: $("#wmd-input").val(),
			documentHTML: $("#wmd-preview").html()
		});
	};
	
	// Used to get content to publish
	function getPublishContent(publishObject) {
		if(publishObject.format === undefined) {
			publishObject.format = $("input:radio[name=radio-publish-format]:checked").prop("value");			
		}
		if(publishObject.format == "markdown") {
			return $("#wmd-input").val();
		}
		else if(publishObject.format == "html") {
			return $("#wmd-preview").html();
		}
		else {
			return publisher.applyTemplate();
		}
	}
	
	// Recursive function to publish a file on multiple locations
	var publishIndexList = [];
	var publishTitle = undefined;
	function publishLocation(callback, errorFlag) {
		
		// No more publish location for this document
		if (publishIndexList.length === 0) {
			callback(errorFlag);
			return;
		}
		
		// Dequeue a synchronized location
		var publishIndex = publishIndexList.pop();
		var publishObject = JSON.parse(localStorage[publishIndex]);
		var content = getPublishContent(publishObject);
		
		// Call the provider
		var provider = providerMap[publishObject.provider];
		provider.publish(publishObject, publishTitle, content, function(error) {
			publishLocation(callback, errorFlag);
		});
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
		publishTitle = localStorage[fileIndex + ".title"];
		publishIndexList = _.compact(localStorage[fileIndex + ".publish"].split(";"));
		publishLocation(function(errorFlag) {
			publishRunning = false;
			publisher.updatePublishButton();
			if(errorFlag === undefined) {
				core.showMessage('"' + title + '" successfully published.');
			}
		});
	};
	
	// Generate a publishIndex associated to a fileIndex and store a publishObject
	function createPublishIndex(fileIndex, publishObject) {
		var publishIndex = undefined;
		do {
			publishIndex = "publish." + core.randomString();
		} while(_.has(localStorage, publishIndex));
		localStorage[publishIndex] = JSON.stringify(publishObject);
		localStorage[fileIndex + ".publish"] += publishIndex + ";";
	}
	
	// Add a new publish location to a local document
	publisher.newLocation = function(publishObject) {
		var fileIndex = fileManager.getCurrentFileIndex();
		var title = localStorage[fileIndex + ".title"];
		var content = getPublishContent(publishObject);
		var provider = providerMap[publishObject.provider];
		provider.publish(publishObject, title, content, function(error) {
			if(error === undefined) {
				createPublishIndex(fileIndex, publishObject);
				publisher.notifyPublish();
				core.showMessage('"' + title
					+ '" will now be published on GitHub.');
			}
		});
	};

	// Used to populate the "Manage publication" dialog
	var lineTemplate = ['<div class="input-prepend input-append">',
		'<span class="add-on" title="<%= provider.providerName %>">',
		'<i class="icon-<%= provider.providerId %>"></i></span>',
		'<input class="span5" type="text" value="<%= publishDesc %>" disabled />',
		'</div>'].join("");
	var removeButtonTemplate = '<a class="btn" title="Remove this location"><i class="icon-trash"></i></a>';
	publisher.refreshManagePublish = function() {
		var fileIndex = fileManager.getCurrentFileIndex();
		var publishIndexList = _.compact(localStorage[fileIndex + ".publish"].split(";"));
		$(".msg-no-publish, .msg-publish-list").addClass("hide");
		$("#manage-publish-list .input-append").remove();
		if (publishIndexList.length > 0) {
			$(".msg-publish-list").removeClass("hide");
		} else {
			$(".msg-no-publish").removeClass("hide");
		}
		_.each(publishIndexList, function(publishIndex) {
			var serializedObject = localStorage[publishIndex];
			var publishObject = JSON.parse(serializedObject);
			var publishDesc = JSON.stringify(_.omit(publishObject, 'provider')).replace(/{|}|"/g, "");
			lineElement = $(_.template(lineTemplate, {
				provider: providerMap[publishObject.provider],
				publishDesc: publishDesc
			}));
			lineElement.append($(removeButtonTemplate).click(function() {
				fileManager.removePublish(publishIndex);
			}));
			$("#manage-publish-list").append(lineElement);
		});
	};
	
	publisher.init = function(coreModule, fileManagerModule) {
		core = coreModule;
		fileManager = fileManagerModule;
		
		// Init providers
		_.each(providerMap, function(provider) {
			provider.init(core);
		});
		
		$(".action-force-publish").click(function() {
			if(!$(this).hasClass("disabled")) {
				publisher.publish();
			}
		});
		
		$(".tooltip-template").tooltip({
			title: ['Variables:\n',
			        'documentTitle: the document title'
			].join("")
		});
	};
	
	return publisher;
});