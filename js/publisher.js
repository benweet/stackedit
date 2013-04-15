define(["jquery", "github-provider", "blogger-provider", "underscore"], function($) {
	
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
	publisher.applyTemplate = function(publishAttributes) {
		var fileIndex = fileManager.getCurrentFileIndex();
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
		var fileIndex = fileManager.getCurrentFileIndex();
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
		var fileIndex = fileManager.getCurrentFileIndex();
		var title = localStorage[fileIndex + ".title"];
		var content = getPublishContent(publishAttributes);
		provider.publish(publishAttributes, title, content, function(error) {
			if(error === undefined) {
				publishAttributes.provider = provider.providerId;
				createPublishIndex(fileIndex, publishAttributes);
				publisher.notifyPublish();
				core.showMessage('"' + title
					+ '" is now published on ' + provider.providerName + '.');
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
			var publishAttributes = JSON.parse(serializedObject);
			var publishDesc = JSON.stringify(publishAttributes).replace(/{|}|"/g, "");
			lineElement = $(_.template(lineTemplate, {
				provider: providerMap[publishAttributes.provider],
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
		
		// Init each provider
		_.each(providerMap, function(provider) {
			provider.init(core);
			// Publish provider button
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
		
		$(".tooltip-template").tooltip({
			html: true,
			container: '#modal-settings',
			placement: 'right',
			trigger: 'manual',
			title: ['Available variables:<br>',
			        '<ul><li><b>documentTitle</b>: document title</li>',
			        '<li><b>documentMarkdown</b>: document in Markdown format</li>',
			        '<li><b>documentHTML</b>: document in HTML format</li>',
			        '<li><b>publishAttributes</b>: attributes of the publish location (undefined when using "Save")</li></ul>',
			        'Examples:<br>',
			        _.escape('<title><%= documentTitle %></title>'),
			        '<br>',
			        _.escape('<div><%- documentHTML %></div>'),
			        '<br>',
			        _.escape('<% if(publishAttributes.provider == "github") print(documentMarkdown); %>'),
			        '<br><br><a target="_blank" href="http://underscorejs.org/#template">More info</a>',
			        ].join("")
		}).click(function(e) {
			$(this).tooltip('show');
			e.stopPropagation();
		});
		
		$(document).click(function(e) {
			$(".tooltip-template").tooltip('hide');
		});
	};
	
	return publisher;
});