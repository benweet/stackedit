define([
	"jquery",
	"underscore",
	"crel",
	"mousetrap",
	"utils",
	"logger",
	"classes/Extension",
	"settings",
	"text!html/settingsExtensionsAccordion.html",
	"extensions/yamlFrontMatterParser",
	"extensions/markdownSectionParser",
	"extensions/partialRendering",
	"extensions/buttonMarkdownSyntax",
	"extensions/googleAnalytics",
	"extensions/twitter",
	"extensions/dialogAbout",
	"extensions/dialogManagePublication",
	"extensions/dialogManageSynchronization",
	"extensions/dialogManageSharing",
	"extensions/dialogOpenHarddrive",
	"extensions/documentTitle",
	"extensions/documentSelector",
	"extensions/documentPanel",
	"extensions/documentManager",
	"extensions/workingIndicator",
	"extensions/notifications",
	"extensions/umlDiagrams",
	"extensions/markdownExtra",
	"extensions/toc",
	"extensions/mathJax",
	"extensions/emailConverter",
	"extensions/scrollSync",
	"extensions/buttonSync",
	"extensions/buttonPublish",
	"extensions/buttonStat",
	"extensions/buttonHtmlCode",
	"extensions/buttonViewer",
	"extensions/welcomeTour",
	"extensions/shortcuts",
	"extensions/userCustom",
	"extensions/comments",
	"extensions/findReplace",
	"extensions/htmlSanitizer",
	"bootstrap",
	"jquery-waitforimages"
], function($, _, crel, mousetrap, utils, logger, Extension, settings, settingsExtensionsAccordionHTML) {

	var eventMgr = {};

	// Create a list of extensions from module arguments
	var extensionList = _.chain(arguments).map(function(argument) {
		return argument instanceof Extension && argument;
	}).compact().value();

	// Configure extensions
	var extensionSettings = settings.extensionSettings || {};
	_.each(extensionList, function(extension) {
		// Set the extension.config attribute from settings or default
		// configuration
		extension.config = _.extend({}, extension.defaultConfig, extensionSettings[extension.extensionId]);
		if(window.viewerMode === true && extension.disableInViewer === true) {
			// Skip enabling the extension if we are in the viewer and extension
			// doesn't support it
			extension.enabled = false;
		}
		else {
			// Enable the extension if it's not optional or it has not been
			// disabled by the user
			extension.enabled = !extension.isOptional || extension.config.enabled === undefined || extension.config.enabled === true;
		}
	});

	// Returns all listeners with the specified name that are implemented in the
	// enabled extensions
	function getExtensionListenerList(eventName) {
		return _.chain(extensionList).map(function(extension) {
			return extension.enabled && extension[eventName];
		}).compact().value();
	}

	// Returns a function that calls every listeners with the specified name
	// from all enabled extensions
	var eventListenerListMap = {};

	function createEventHook(eventName) {
		eventListenerListMap[eventName] = getExtensionListenerList(eventName);
		return function() {
			logger.log(eventName, arguments);
			var eventArguments = arguments;
			_.each(eventListenerListMap[eventName], function(listener) {
				// Use try/catch in case userCustom listener contains error
				try {
					listener.apply(null, eventArguments);
				}
				catch(e) {
					console.error(_.isObject(e) ? e.stack : e);
				}
			});
		};
	}

	// Declare an event Hook in the eventMgr that we can fire using eventMgr.eventName()
	function addEventHook(eventName) {
		eventMgr[eventName] = createEventHook(eventName);
	}

	// Used by external modules (not extensions) to listen to events
	eventMgr.addListener = function(eventName, listener) {
		try {
			eventListenerListMap[eventName].push(listener);
		}
		catch(e) {
			console.error('No event listener called ' + eventName);
		}
	};

	// Call every onInit listeners (enabled extensions only)
	createEventHook("onInit")();

	// Load/Save extension config from/to settings
	eventMgr.onLoadSettings = function() {
		logger.log("onLoadSettings");
		_.each(extensionList, function(extension) {
			var isChecked = !extension.isOptional || extension.config.enabled === undefined || extension.config.enabled === true;
			utils.setInputChecked("#input-enable-extension-" + extension.extensionId, isChecked);
			// Special case for Markdown Extra and MathJax
			if(extension.extensionId == 'markdownExtra') {
				utils.setInputChecked("#input-settings-markdown-extra", isChecked);
			}
			else if(extension.extensionId == 'mathJax') {
				utils.setInputChecked("#input-settings-mathjax", isChecked);
			}
			var onLoadSettingsListener = extension.onLoadSettings;
			onLoadSettingsListener && onLoadSettingsListener();
		});
	};
	eventMgr.onSaveSettings = function(newExtensionSettings, event) {
		logger.log("onSaveSettings");
		_.each(extensionList, function(extension) {
			var newExtensionConfig = _.extend({}, extension.defaultConfig);
			newExtensionConfig.enabled = utils.getInputChecked("#input-enable-extension-" + extension.extensionId);
			var isChecked;
			// Special case for Markdown Extra and MathJax
			if(extension.extensionId == 'markdownExtra') {
				isChecked = utils.getInputChecked("#input-settings-markdown-extra");
				if(isChecked != extension.enabled) {
					newExtensionConfig.enabled = isChecked;
				}
			}
			else if(extension.extensionId == 'mathJax') {
				isChecked = utils.getInputChecked("#input-settings-mathjax");
				if(isChecked != extension.enabled) {
					newExtensionConfig.enabled = isChecked;
				}
			}
			var onSaveSettingsListener = extension.onSaveSettings;
			onSaveSettingsListener && onSaveSettingsListener(newExtensionConfig, event);
			newExtensionSettings[extension.extensionId] = newExtensionConfig;
		});
	};

	addEventHook("onMessage");
	addEventHook("onError");
	addEventHook("onOfflineChanged");
	addEventHook("onUserActive");
	addEventHook("onAsyncRunning");
	addEventHook("onPeriodicRun");

	// To access modules that are loaded after extensions
	addEventHook("onEditorCreated");
	addEventHook("onFileMgrCreated");
	addEventHook("onSynchronizerCreated");
	addEventHook("onPublisherCreated");
	addEventHook("onSharingCreated");
	addEventHook("onEventMgrCreated");

	// Operations on files
	addEventHook("onFileCreated");
	addEventHook("onFileDeleted");
	addEventHook("onFileSelected");
	addEventHook("onFileOpen");
	addEventHook("onFileClosed");
	addEventHook("onContentChanged");
	addEventHook("onTitleChanged");

	// Operations on folders
	addEventHook("onFoldersChanged");

	// Sync events
	addEventHook("onSyncRunning");
	addEventHook("onSyncSuccess");
	addEventHook("onSyncImportSuccess");
	addEventHook("onSyncExportSuccess");
	addEventHook("onSyncRemoved");

	// Publish events
	addEventHook("onPublishRunning");
	addEventHook("onPublishSuccess");
	addEventHook("onNewPublishSuccess");
	addEventHook("onPublishRemoved");

	// Operations on Layout
	addEventHook("onLayoutCreated");
	addEventHook("onLayoutResize");
	addEventHook("onExtensionButtonResize");

	// Operations on editor
	addEventHook("onPagedownConfigure");
	addEventHook("onSectionsCreated");
	addEventHook("onCursorCoordinates");
	addEventHook("onEditorPopover");

	// Operations on comments
	addEventHook("onDiscussionCreated");
	addEventHook("onDiscussionRemoved");
	addEventHook("onCommentsChanged");

	// Refresh twitter buttons
	addEventHook("onTweet");


	var onPreviewFinished = createEventHook("onPreviewFinished");
	var onAsyncPreviewListenerList = getExtensionListenerList("onAsyncPreview");
	var previewContentsElt;
	var $previewContentsElt;
	eventMgr.onAsyncPreview = function() {
		logger.log("onAsyncPreview");
		function recursiveCall(callbackList) {
			var callback = callbackList.length ? callbackList.shift() : function() {
				setTimeout(function() {
					var html = "";
					_.each(previewContentsElt.children, function(elt) {
						if(!elt.exportableHtml) {
							var clonedElt = elt.cloneNode(true);
							_.each(clonedElt.querySelectorAll('.MathJax_SVG, .MathJax_SVG_Display, .MathJax_Preview'), function(elt) {
								elt.parentNode.removeChild(elt);
							});
							elt.exportableHtml = clonedElt.innerHTML;
						}
						html += elt.exportableHtml;
					});
					var htmlWithComments = utils.trim(html);
					var htmlWithoutComments = htmlWithComments.replace(/ <span class="comment label label-danger">.*?<\/span> /g, '');
					onPreviewFinished(htmlWithComments, htmlWithoutComments);
				}, 10);
			};
			callback(function() {
				recursiveCall(callbackList);
			});
		}

		recursiveCall(onAsyncPreviewListenerList.concat([
			function(callback) {
				// We assume some images are loading asynchronously after the preview
				$previewContentsElt.waitForImages(callback);
			}
		]));
	};

	var onReady = createEventHook("onReady");
	eventMgr.onReady = function() {
		previewContentsElt = document.getElementById('preview-contents');
		$previewContentsElt = $(previewContentsElt);

		// Create a button from an extension listener
		var createBtn = function(listener) {
			var buttonGrpElt = crel('div', {
				class: 'btn-group'
			});
			var btnElt = listener();
			if(_.isString(btnElt)) {
				buttonGrpElt.innerHTML = btnElt;
			}
			else if(_.isElement(btnElt)) {
				buttonGrpElt.appendChild(btnElt);
			}
			return buttonGrpElt;
		};

		if(window.viewerMode === false) {
			// Create accordion in settings dialog
			var accordionHtml = _.chain(extensionList).sortBy(function(extension) {
				return extension.extensionName.toLowerCase();
			}).reduce(function(html, extension) {
				return html + (extension.settingsBlock ? _.template(settingsExtensionsAccordionHTML, {
					extensionId: extension.extensionId,
					extensionName: extension.extensionName,
					isOptional: extension.isOptional,
					settingsBlock: extension.settingsBlock
				}) : "");
			}, "").value();
			document.querySelector('.accordion-extensions').innerHTML = accordionHtml;

			// Create extension buttons
			logger.log("onCreateButton");
			var onCreateButtonListenerList = getExtensionListenerList("onCreateButton");
			var extensionButtonsFragment = document.createDocumentFragment();
			_.each(onCreateButtonListenerList, function(listener) {
				extensionButtonsFragment.appendChild(createBtn(listener));
			});
			document.querySelector('.extension-buttons').appendChild(extensionButtonsFragment);
		}

		// Create extension preview buttons
		logger.log("onCreatePreviewButton");
		var onCreatePreviewButtonListenerList = getExtensionListenerList("onCreatePreviewButton");
		var extensionPreviewButtonsFragment = document.createDocumentFragment();
		_.each(onCreatePreviewButtonListenerList, function(listener) {
			extensionPreviewButtonsFragment.appendChild(createBtn(listener));
		});
		var previewButtonsElt = document.querySelector('.extension-preview-buttons');
		previewButtonsElt.appendChild(extensionPreviewButtonsFragment);

		// Shall close every popover
		mousetrap.bind('escape', function() {
			eventMgr.onEditorPopover();
		});

		// Call onReady listeners
		onReady();
	};

	// For extensions that need to call other extensions
	eventMgr.onEventMgrCreated(eventMgr);
	return eventMgr;
});
