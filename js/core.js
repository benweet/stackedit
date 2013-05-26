define(
	[ "jquery", "utils", "extension-manager", "bootstrap", "layout", "Markdown.Editor", "storage", "config",
		"underscore", "FileSaver", "css_browser_selector" ],
	function($, utils, extensionManager) {
	
	var core = {};
	
	// For convenience
	core.doNothing = function() {};
	
	// Time shared by others modules
	function updateCurrentTime() {
		core.currentTime = new Date().getTime();
	}
	updateCurrentTime();
	
	// Used for periodic tasks
	var intervalId = undefined;
	var periodicCallbacks = [];
	core.addPeriodicCallback = function(callback) {
		periodicCallbacks.push(callback);
	};
	
	// Used to detect user activity
	var userReal = false;
	var userActive = false;
	var windowUnique = true;
	var userLastActivity = 0;
	function setUserActive() {
		userReal = true;
		userActive = true;
		userLastActivity = core.currentTime;
	};
	function isUserActive() {
		if(userActive === true 
			&& core.currentTime - userLastActivity > USER_IDLE_THRESHOLD) {
			userActive = false;
		}
		return userActive && windowUnique;
	}
	
	// Used to only have 1 window of the application in the same browser
	var windowId = undefined;
	core.checkWindowUnique = function() {
		if(userReal === false || windowUnique === false) {
			return;
		}
		if(windowId === undefined) {
			windowId = utils.randomString();
			localStorage["frontWindowId"] = windowId;
		}
		var frontWindowId = localStorage["frontWindowId"];
		if(frontWindowId != windowId) {
			windowUnique = false;
			if(intervalId !== undefined) {
				clearInterval(intervalId);
			}
			$(".modal").modal("hide");
			$('#modal-non-unique').modal({
				backdrop: "static",
				keyboard: false
			});
		}
	};
	
	// Export data on disk
	core.saveFile = function(content, filename) {
		if(saveAs !== undefined) {
			var blob = new Blob([content], {type: "text/plain;charset=utf-8"});
			saveAs(blob, filename);
		}
		else {
			var uriContent = "data:application/octet-stream;base64,"
				+ utils.encodeBase64(content);
			window.open(uriContent, 'file');
		}
	};

	// Used by asyncRunner
	core.showWorkingIndicator = function(show) {
		if (show === false) {
			$(".working-indicator").removeClass("show");
			$("body").removeClass("working");
		} else {
			$(".working-indicator").addClass("show");
			$("body").addClass("working");
		}
	};

	// Log a message
	core.showMessage = function(message) {
		console.log(message);
		extensionManager.onMessage(message);
	};

	// Log an error
	core.showError = function(error) {
		console.error(error);
		if(_.isString(error)) {
			extensionManager.onMessage(error);
		}
		else if(_.isObject(error)) {
			extensionManager.onMessage(error.message);
		}
	};

	// Offline management
	core.isOffline = false;
	var offlineTime = core.currentTime;
	var offlineListeners = [];
	core.addOfflineListener = function(callback) {
		offlineListeners.push(callback);		
	};
	core.setOffline = function() {
		offlineTime = core.currentTime;
		if(core.isOffline === false) {
			core.isOffline = true;
			extensionManager.onOfflineChanged(true);
			_.each(offlineListeners, function(listener) {
				listener();
			});
		}
	};
	core.setOnline = function() {
		if(core.isOffline === true) {
			core.isOffline = false;
			extensionManager.onOfflineChanged(false);
			_.each(offlineListeners, function(listener) {
				listener();
			});
		}
	};
	function checkOnline() {
		// Try to reconnect if we are offline but we have some network
		if (core.isOffline === true && navigator.onLine === true
			&& offlineTime + CHECK_ONLINE_PERIOD < core.currentTime) {
			offlineTime = core.currentTime;
			// Try to download anything to test the connection
			$.ajax({ 
				url : "//www.google.com/jsapi",
				timeout : AJAX_TIMEOUT, dataType : "script"
			}).done(function() {
				core.setOnline();
			});
		}
	}
	
	// Setting management
	core.settings = {
		layoutOrientation : "horizontal",
		lazyRendering : true,
		editorFontSize : 14,
		defaultContent: "\n\n\n> Written with [StackEdit](http://benweet.github.io/stackedit/).",
		commitMsg : "Published by http://benweet.github.io/stackedit",
		template : ['<!DOCTYPE html>\n',
			'<html>\n',
			'<head>\n',
			'<title><%= documentTitle %></title>\n',
			'</head>\n',
			'<body><%= documentHTML %></body>\n',
			'</html>'].join(""),
		sshProxy : SSH_PROXY_URL
	};
	if (_.has(localStorage, "settings")) {
		_.extend(core.settings, JSON.parse(localStorage.settings));
	}

	core.loadSettings = function() {
		
		// Layout orientation
		utils.setInputRadio("radio-layout-orientation", core.settings.layoutOrientation);
		// Theme
		utils.setInputValue("#input-settings-theme", localStorage.theme);
		// Lazy rendering
		utils.setInputChecked("#input-settings-lazy-rendering", core.settings.lazyRendering);
		// Editor font size
		utils.setInputValue("#input-settings-editor-font-size", core.settings.editorFontSize);
		// Default content
		utils.setInputValue("#textarea-settings-default-content", core.settings.defaultContent);
		// Commit message
		utils.setInputValue("#input-settings-publish-commit-msg", core.settings.commitMsg);
		// Template
		utils.setInputValue("#textarea-settings-publish-template", core.settings.template);
		// SSH proxy
		utils.setInputValue("#input-settings-ssh-proxy", core.settings.sshProxy);
		
		// Load extension settings
		extensionManager.onLoadSettings();
	};

	core.saveSettings = function(event) {
		var newSettings = {};
		
		// Layout orientation
		newSettings.layoutOrientation = utils.getInputRadio("radio-layout-orientation");
		// Theme
		var theme = utils.getInputValue("#input-settings-theme");
		// Lazy Rendering
		newSettings.lazyRendering = utils.getInputChecked("#input-settings-lazy-rendering");
		// Editor font size
		newSettings.editorFontSize = utils.getInputIntValue("#input-settings-editor-font-size", event, 1, 99);
		// Default content
		newSettings.defaultContent = utils.getInputValue("#textarea-settings-default-content");
		// Commit message
		newSettings.commitMsg = utils.getInputTextValue("#input-settings-publish-commit-msg", event);
		// Template
		newSettings.template = utils.getInputTextValue("#textarea-settings-publish-template", event);
		// SSH proxy
		newSettings.sshProxy = utils.checkUrl(utils.getInputTextValue("#input-settings-ssh-proxy", event), true);
		
		// Save extension settings
		newSettings.extensionSettings = {};
		extensionManager.onSaveSettings(newSettings.extensionSettings, event);
		
		if(!event.isPropagationStopped()) {
			$.extend(core.settings, newSettings);
			localStorage.settings = JSON.stringify(newSettings);
			localStorage.theme = theme;
		}
	};
	
	// Create the layout
	var layout = undefined;
	core.createLayout = function() {
		if(viewerMode === true) {
			return;
		}
		var layoutGlobalConfig = {
			closable : true, 
			resizable : false,
			slidable : false, 
			livePaneResizing : true,
			enableCursorHotkey : false, 
			spacing_open : 15, 
			spacing_closed : 15,
			togglerLength_open : 90, 
			togglerLength_closed : 90,
			stateManagement__enabled : false,
			center__minWidth : 200,
			center__minHeight : 200
		};
		extensionManager.onLayoutConfigure(layoutGlobalConfig);
		if (core.settings.layoutOrientation == "horizontal") {
			$(".ui-layout-south").remove();
			$(".ui-layout-east").addClass("well").prop("id", "wmd-preview");
			layout = $('body').layout(
				$.extend(layoutGlobalConfig, {
					east__resizable : true,
					east__size : .5, 
					east__minSize : 200
				})
			);
		} else if (core.settings.layoutOrientation == "vertical") {
			$(".ui-layout-east").remove();
			$(".ui-layout-south").addClass("well").prop("id", "wmd-preview");
			layout = $('body').layout(
				$.extend(layoutGlobalConfig, { 
					south__resizable : true,
					south__size : .5, 
					south__minSize : 200
				})
			);
		}
		$(".ui-layout-toggler-north").addClass("btn").append(
			$("<b>").addClass("caret"));
		$(".ui-layout-toggler-south").addClass("btn").append(
			$("<b>").addClass("caret"));
		$(".ui-layout-toggler-east").addClass("btn").append(
			$("<b>").addClass("caret"));
		$("#navbar").click(function() {
			layout.allowOverflow('north');
		});
		
		extensionManager.onLayoutCreated();
	};
	core.layoutRefresh = function() {
		if(layout !== undefined) {
			// Use defer to make sure UI has been updated
			_.defer(layout.resizeAll);
		}
	};
	
	// Create the PageDown editor
	var insertLinkCallback = undefined;
	core.createEditor = function(onTextChange) {
		var converter = new Markdown.Converter();
		var editor = new Markdown.Editor(converter);
		// Custom insert link dialog
		editor.hooks.set("insertLinkDialog", function (callback) {
			insertLinkCallback = callback;
			utils.resetModalInputs();
			$("#modal-insert-link").modal();
			_.defer(function() {
				$("#input-insert-link").focus();
			});
			return true;
	    });
		// Custom insert image dialog
		editor.hooks.set("insertImageDialog", function (callback) {
			insertLinkCallback = callback;
			utils.resetModalInputs();
			$("#modal-insert-image").modal();
			_.defer(function() {
				$("#input-insert-image").focus();
			});
			return true;
		});
		
		var firstChange = true;
		var previewWrapper = function(makePreview) {
			return function() {
				if(firstChange !== true) {
					onTextChange();
				}
				makePreview();
			};
		};
		if(core.settings.lazyRendering === true) {
			var lastRefresh = 0;
			previewWrapper = function(makePreview) {
				//var debouncedMakePreview = _.debounce(makePreview, 500); 
				return function() {
					if(firstChange === true) {
						makePreview();
					}
					else {
						onTextChange();
						var currentDate = new Date().getTime();
						if(currentDate - lastRefresh > 500) {
							makePreview();
							lastRefresh = currentDate;
						}
						//debouncedMakePreview();
					}
				};
			};
		}
		extensionManager.onEditorConfigure(editor);
		editor.hooks.chain("onPreviewRefresh", extensionManager.onAsyncPreview);
		
		// Convert email addresses (not managed by pagedown)
		converter.hooks.chain("postConversion", function(text) {
			return text.replace(/<(mailto\:)?([^\s>]+@[^\s>]+\.\S+?)>/g, function(match, mailto, email) {
				return '<a href="mailto:' + email + '">' + email + '</a>';
			});
		});
		
		$("#wmd-input, #wmd-preview").scrollTop(0);
		$("#wmd-button-bar").empty();
		editor.run(previewWrapper);
		firstChange = false;

		// Hide default buttons
		$(".wmd-button-row").addClass("btn-group").find("li:not(.wmd-spacer)")
			.addClass("btn").css("left", 0).find("span").hide();
		
		// Add customized buttons
		$("#wmd-bold-button").append($("<i>").addClass("icon-bold"));
		$("#wmd-italic-button").append($("<i>").addClass("icon-italic"));
		$("#wmd-link-button").append($("<i>").addClass("icon-globe"));
		$("#wmd-quote-button").append($("<i>").addClass("icon-indent-left"));
		$("#wmd-code-button").append($("<i>").addClass("icon-code"));
		$("#wmd-image-button").append($("<i>").addClass("icon-picture"));
		$("#wmd-olist-button").append($("<i>").addClass("icon-numbered-list"));
		$("#wmd-ulist-button").append($("<i>").addClass("icon-list"));
		$("#wmd-heading-button").append($("<i>").addClass("icon-text-height"));
		$("#wmd-hr-button").append($("<i>").addClass("icon-hr"));
		$("#wmd-undo-button").append($("<i>").addClass("icon-undo"));
		$("#wmd-redo-button").append($("<i>").addClass("icon-share-alt"));
	};

	// Create an centered popup window
	core.popupWindow = function(url, title, w, h) {
		var left = (screen.width / 2) - (w / 2);
		var top = (screen.height / 2) - (h / 2);
		return window
			.open(
				url,
				title,
				'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width='
					+ w
					+ ', height='
					+ h
					+ ', top='
					+ top
					+ ', left='
					+ left);
	};
	
	// Keep a reference to the fileManager
	core.setFileManager = function(fileManager) {
		core.fileManager = fileManager;
		runReadyCallbacks();
	};
	
	// onReady event callbacks
	var readyCallbacks = [];
	core.onReady = function(callback) {
		readyCallbacks.push(callback);
		runReadyCallbacks();
	};
	var documentLoaded = false;
	function runReadyCallbacks() {
		if(documentLoaded === true && core.fileManager !== undefined) {
			_.each(readyCallbacks, function(callback) {
				callback();
			});
			readyCallbacks = [];
		}
	}
	$(function() {
		documentLoaded = true;
		runReadyCallbacks();
	});
	
	core.onReady(function() {
		extensionManager.init(core.settings.extensionSettings);
	});
	core.onReady(function() {
		
		// Load theme list
		_.each(THEME_LIST, function(name, value) {
			$("#input-settings-theme").append($('<option value="' + value + '">' + name + '</option>'));
		});
		
		// listen to online/offline events
		$(window).on('offline', core.setOffline);
		$(window).on('online', core.setOnline);
		if (navigator.onLine === false) {
			core.setOffline();
		}
		
		// Detect user activity
		$(document).mousemove(setUserActive).keypress(setUserActive);
		
		// Avoid dropdown to close when clicking on submenu
		$(".dropdown-submenu > a").click(function(e) {
			e.stopPropagation();
		});
		
		// Click events on "insert link" and "insert image" dialog buttons
		$(".action-insert-link").click(function(e) {
			var value = utils.getInputTextValue($("#input-insert-link"), e);
			if(value !== undefined) {
				insertLinkCallback(value);
			}
		});
		$(".action-insert-image").click(function(e) {
			var value = utils.getInputTextValue($("#input-insert-image"), e);
			if(value !== undefined) {
				insertLinkCallback(value);
			}
		});
		$(".action-close-insert-link").click(function(e) {
			insertLinkCallback(null);
		});

		// Settings loading/saving
		$(".action-load-settings").click(function() {
			core.loadSettings();
		});
		$(".action-apply-settings").click(function(e) {
			core.saveSettings(e);
			if(!e.isPropagationStopped()) {
				window.location.reload();
			}
		});
		
		$(".action-default-settings").click(function() {
			localStorage.removeItem("settings");
			localStorage.removeItem("theme");
			window.location.reload();
		});
		
		$(".action-app-reset").click(function() {
			localStorage.clear();
			window.location.reload();
		});
		
		// UI layout
		$("#menu-bar, .ui-layout-center, .ui-layout-east, .ui-layout-south").removeClass("hide");
		core.createLayout();

		// Editor's textarea
		$("#wmd-input, #md-section-helper").css({
			// Apply editor font size
			"font-size": core.settings.editorFontSize + "px",
			"line-height": Math.round(core.settings.editorFontSize * (20/14)) + "px"
		});
		
		// Manage tab key
		$("#wmd-input").keydown(function(e) {
		    if(e.keyCode === 9) {
		        var value = $(this).val();
		        var start = this.selectionStart;
		        var end = this.selectionEnd;
		        // IE8 does not support selection attributes
		        if(start === undefined || end === undefined) {
		        	return;
		        }
		        $(this).val(value.substring(0, start) + "\t" + value.substring(end));
		        this.selectionStart = this.selectionEnd = start + 1;
		        e.preventDefault();
		    }
		});

		// Tooltips
		$(".tooltip-scroll-link").tooltip({
			html: true,
			container: '#modal-settings',
			placement: 'right',
			title: ['Scroll Link is a feature that binds together editor and preview scrollbars. ',
			        'It allows you to keep an eye on the preview while scrolling the editor and vice versa. ',
			        '<br><br>',
			        'The mapping between Markdown and HTML is based on the position of the title elements (h1, h2, ...) in the page. ',
			        'Therefore, if your document does not contain any title, the mapping will be linear and consequently less efficient.',
			        ].join("")
		});
		$(".tooltip-lazy-rendering").tooltip({
			container: '#modal-settings',
			placement: 'right',
			title: 'Disable preview rendering while typing in order to offload CPU. Refresh preview after 500 ms of inactivity.'
		});
		$(".tooltip-default-content").tooltip({
			html: true,
			container: '#modal-settings',
			placement: 'right',
			title: 'Thanks for supporting StackEdit by adding a backlink in your documents!'
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

		// Reset inputs
		$(".action-reset-input").click(function() {
			utils.resetModalInputs();
		});
		
		// Do periodic tasks
		intervalId = window.setInterval(function() {
			updateCurrentTime();
			core.checkWindowUnique();
			if(isUserActive() === true || viewerMode === true) {
				_.each(periodicCallbacks, function(callback) {
					callback();
				});
				checkOnline();
			}
		}, 1000);
	});

	return core;
});

