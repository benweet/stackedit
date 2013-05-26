define([
    "jquery",
    "core",
    "utils",
    "extension-manager",
    "sharing",
    "blogger-provider",
    "dropbox-provider",
    "gist-provider",
    "github-provider",
    "gdrive-provider",
    "ssh-provider",
    "tumblr-provider",
    "wordpress-provider",
    "underscore"
], function($, core, utils, extensionManager, sharing) {

	var publisher = {};
	
	// Create a map with providerId: providerObject
	var providerMap = _.chain(arguments)
		.map(function(argument) {
			return argument && argument.providerId && [argument.providerId, argument];
		}).compact().object().value();

	// Used to know if the current file has publications
	var hasPublications = false;
	
	// Allows external modules to update hasPublications flag
	publisher.notifyPublish = function() {
		var fileDesc = core.fileManager.getCurrentFile();
		
		// Check that file has publications
		if(_.size(fileDesc.publishLocations) === 0) {
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
	// Run updatePublishButton function on online/offline event
	core.addOfflineListener(publisher.updatePublishButton);

	// Apply template to the current document
	publisher.applyTemplate = function(publishAttributes) {
		var fileDesc = core.fileManager.getCurrentFile();
		try {
			return _.template(core.settings.template, {
				documentTitle: fileDesc.title,
				documentMarkdown: $("#wmd-input").val(),
				documentHTML: $("#wmd-preview").html(),
				publishAttributes: publishAttributes
			});
		} catch(e) {
			core.showError(e);
			throw e;
		}
	};
	
	// Used to get content to publish
	function getPublishContent(publishAttributes) {
		if(publishAttributes.format === undefined) {
			publishAttributes.format = $("input:radio[name=radio-publish-format]:checked").prop("value");			
		}
		if(publishAttributes.format == "markdown") {
			return $("#wmd-input").val();
		}
		else if(publishAttributes.format == "html") {
			return $("#wmd-preview").html();
		}
		else {
			return publisher.applyTemplate(publishAttributes);
		}
	}
	
	// Recursive function to publish a file on multiple locations
	var publishAttributesList = [];
	var publishTitle = undefined;
	function publishLocation(callback, errorFlag) {
		
		// No more publish location for this document
		if (publishAttributesList.length === 0) {
			callback(errorFlag);
			return;
		}
		
		// Dequeue a synchronized location
		var publishAttributes = publishAttributesList.pop();
		var content = getPublishContent(publishAttributes);
		
		// Call the provider
		var provider = providerMap[publishAttributes.provider];
		provider.publish(publishAttributes, publishTitle, content, function(error) {
			if(error !== undefined) {
				var errorMsg = error.toString();
				if(errorMsg.indexOf("|removePublish") !== -1) {
					core.fileManager.removePublish(publishAttributes);
				}
				if(errorMsg.indexOf("|stopPublish") !== -1) {
					callback(error);
					return;
				}
			}
			publishLocation(callback, errorFlag || error );
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
		var fileDesc = fileManager.getCurrentFile();
		publishTitle = fileDesc.title;
		publishAttributesList = _.values(fileDesc.publishLocations);
		publishLocation(function(errorFlag) {
			publishRunning = false;
			publisher.updatePublishButton();
			if(errorFlag === undefined) {
				extensionManager.onPublishSuccess(fileDesc);
			}
		});
	};
	
	// Generate a publishIndex associated to a file and store publishAttributes
	function createPublishIndex(fileDesc, publishAttributes) {
		var publishIndex = undefined;
		do {
			publishIndex = "publish." + utils.randomString();
		} while(_.has(localStorage, publishIndex));
		publishAttributes.publishIndex = publishIndex;
		localStorage[publishIndex] = JSON.stringify(publishAttributes);
		core.fileManager.addPublish(fileDesc, publishAttributes);
	}
	
	// Initialize the "New publication" dialog
	var newLocationProvider = undefined;
	function initNewLocation(provider) {
		var defaultPublishFormat = provider.defaultPublishFormat || "markdown";
		newLocationProvider = provider;
		$(".publish-provider-name").text(provider.providerName);
		
		// Show/hide controls depending on provider
		$('div[class*=" modal-publish-"]').hide().filter(".modal-publish-" + provider.providerId).show();
		
		// Reset fields
		utils.resetModalInputs();
		$("input:radio[name=radio-publish-format][value=" + defaultPublishFormat + "]").prop("checked", true);
		
		// Load preferences
		var serializedPreferences = localStorage[provider.providerId + ".publishPreferences"];
		if(serializedPreferences) {
			var publishPreferences = JSON.parse(serializedPreferences);
			_.each(provider.publishPreferencesInputIds, function(inputId) {
				utils.setInputValue("#input-publish-" + inputId, publishPreferences[inputId]);
			});
			utils.setInputRadio("radio-publish-format", publishPreferences.format);
		}
		
		// Open dialog box
		$("#modal-publish").modal();
	}
	
	// Add a new publish location to a local document
	function performNewLocation(event) {
		var provider = newLocationProvider;
		var publishAttributes = provider.newPublishAttributes(event);
		if(publishAttributes === undefined) {
			return;
		}
		
		// Perform provider's publishing
		var fileDesc = core.fileManager.getCurrentFile();
		var title = fileDesc.title;
		var content = getPublishContent(publishAttributes);
		provider.publish(publishAttributes, title, content, function(error) {
			if(error === undefined) {
				publishAttributes.provider = provider.providerId;
				sharing.createLink(publishAttributes, function() {
					createPublishIndex(fileDesc, publishAttributes);
					publisher.notifyPublish();
					core.fileManager.updateFileTitles();
				});
			}
		});
		
		// Store input values as preferences for next time we open the publish dialog
		var publishPreferences = {};
		_.each(provider.publishPreferencesInputIds, function(inputId) {
			publishPreferences[inputId] = $("#input-publish-" + inputId).val();
		});
		publishPreferences.format = publishAttributes.format;
		localStorage[provider.providerId + ".publishPreferences"] = JSON.stringify(publishPreferences);
	}
	
	// Retrieve file's publish locations from localStorage
	publisher.populatePublishLocations = function(fileDesc) {
		_.chain(localStorage[fileDesc.fileIndex + ".publish"].split(";"))
			.compact()
			.each(function(publishIndex) {
				var publishAttributes = JSON.parse(localStorage[publishIndex]);
				// Store publishIndex
				publishAttributes.publishIndex = publishIndex;
				// Replace provider ID by provider module in attributes
				publishAttributes.provider = providerMap[publishAttributes.provider];
				fileDesc.publishLocations[publishIndex] = publishAttributes;
			});
	};
	
	core.onReady(function() {
		// Add every provider
		var publishMenu = $("#publish-menu");
		_.each(providerMap, function(provider) {
			// Provider's publish button
			publishMenu.append(
				$("<li>").append(
					$('<a href="#"><i class="icon-' + provider.providerId + '"></i> ' + provider.providerName + '</a>')
						.click(function() {
							initNewLocation(provider);
						}
					)
				)
			);
			// Action links (if any)
			$(".action-publish-" + provider.providerId).click(function() {
				initNewLocation(provider);
			});
		});
		
		$(".action-process-publish").click(performNewLocation);
		
		$(".action-force-publish").click(function() {
			if(!$(this).hasClass("disabled")) {
				publisher.publish();
			}
		});
	});
	
	extensionManager.onPublisherCreated(publisher);
	return publisher;
});