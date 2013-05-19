define(["jquery", "core", "sharing", "blogger-provider", "dropbox-provider", "gist-provider", "github-provider", "gdrive-provider", "ssh-provider", "tumblr-provider", "wordpress-provider", "underscore"],
	function($, core, sharing) {

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
		var fileIndex = core.fileManager.getCurrentFileIndex();
		
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
	// Run updatePublishButton function on online/offline event
	core.addOfflineListener(publisher.updatePublishButton);

	// Apply template to the current document
	publisher.applyTemplate = function(publishAttributes) {
		var fileIndex = core.fileManager.getCurrentFileIndex();
		try {
			return _.template(core.settings.template, {
				documentTitle: localStorage[fileIndex + ".title"],
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
		var publishAttributes = JSON.parse(localStorage[publishIndex]);
		var content = getPublishContent(publishAttributes);
		
		// Call the provider
		var provider = providerMap[publishAttributes.provider];
		provider.publish(publishAttributes, publishTitle, content, function(error) {
			if(error !== undefined) {
				var errorMsg = error.toString();
				if(errorMsg.indexOf("|removePublish") !== -1) {
					core.fileManager.removePublish(publishIndex);
					core.fileManager.updateFileTitles();
					core.showMessage(provider.providerName + " publish location has been removed.");
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
		var fileIndex = core.fileManager.getCurrentFileIndex();
		publishTitle = localStorage[fileIndex + ".title"];
		publishIndexList = _.compact(localStorage[fileIndex + ".publish"].split(";"));
		publishLocation(function(errorFlag) {
			publishRunning = false;
			publisher.updatePublishButton();
			if(errorFlag === undefined) {
				core.showMessage('"' + publishTitle + '" successfully published.');
			}
		});
	};
	
	// Generate a publishIndex associated to a fileIndex and store publishAttributes
	function createPublishIndex(fileIndex, publishAttributes) {
		var publishIndex = undefined;
		do {
			publishIndex = "publish." + core.randomString();
		} while(_.has(localStorage, publishIndex));
		localStorage[publishIndex] = JSON.stringify(publishAttributes);
		localStorage[fileIndex + ".publish"] += publishIndex + ";";
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
		core.resetModalInputs();
		$("input:radio[name=radio-publish-format][value=" + defaultPublishFormat + "]").prop("checked", true);
		
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
		var fileIndex = core.fileManager.getCurrentFileIndex();
		var title = localStorage[fileIndex + ".title"];
		var content = getPublishContent(publishAttributes);
		provider.publish(publishAttributes, title, content, function(error) {
			if(error === undefined) {
				publishAttributes.provider = provider.providerId;
				sharing.createLink(publishAttributes, function() {
					createPublishIndex(fileIndex, publishAttributes);
					publisher.notifyPublish();
					core.fileManager.updateFileTitles();
					core.showMessage('"' + title
						+ '" is now published on ' + provider.providerName + '.');
				});
			}
		});
	}

	// Used to populate the "Manage publication" dialog
	var lineTemplate = ['<div class="input-prepend input-append">',
		'<span class="add-on" title="<%= provider.providerName %>">',
		'<i class="icon-<%= provider.providerId %>"></i></span>',
		'<input class="span5" type="text" value="<%= publishDesc %>" disabled />',
		'</div>'].join("");
	var removeButtonTemplate = '<a class="btn" title="Remove this location"><i class="icon-trash"></i></a>';
	publisher.refreshManagePublish = function() {
		var fileIndex = core.fileManager.getCurrentFileIndex();
		var publishIndexList = _.compact(localStorage[fileIndex + ".publish"].split(";"));
		$(".msg-no-publish, .msg-publish-list").addClass("hide");
		var publishList = $("#manage-publish-list").empty();
		if (publishIndexList.length > 0) {
			$(".msg-publish-list").removeClass("hide");
		} else {
			$(".msg-no-publish").removeClass("hide");
		}
		_.each(publishIndexList, function(publishIndex) {
			var publishAttributes = JSON.parse(localStorage[publishIndex]);
			if(publishAttributes.password) {
				publishAttributes.password = "********";
			}
			var publishDesc = JSON.stringify(publishAttributes).replace(/{|}|"/g, "");
			var lineElement = $(_.template(lineTemplate, {
				provider: providerMap[publishAttributes.provider],
				publishDesc: publishDesc
			}));
			lineElement.append($(removeButtonTemplate).click(function() {
				core.fileManager.removePublish(publishIndex);
				core.fileManager.updateFileTitles();
			}));
			publishList.append(lineElement);
		});
	};
	
	publisher.getPublishAttributesFromFile = function(fileIndex) {
		var publishIndexList = _.compact(localStorage[fileIndex + ".publish"].split(";"));
		var attributesList = [];
		_.each(publishIndexList, function(publishIndex) {
			var publishAttributes = JSON.parse(localStorage[publishIndex]);
			attributesList.push(publishAttributes);
		});
		return attributesList;
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
	
	return publisher;
});