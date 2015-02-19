/*globals Markdown */
define([
	"jquery",
	"underscore",
	"crel",
	"editor",
	"themeLoader",
	"layout",
	"constants",
	"utils",
	"storage",
	"settings",
	"eventMgr",
	"text!html/bodyEditor.html",
	"text!html/bodyViewer.html",
	"storage",
	'pagedown'
], function($, _, crel, editor, themeLoader, layout, constants, utils, storage, settings, eventMgr, bodyEditorHTML, bodyViewerHTML) {

	var core = {};

	// Used for periodic tasks
	var intervalId;

	// Used to detect user activity
	var isUserReal = false;
	var userActive = false;
	var windowUnique = true;
	var userLastActivity = 0;

	function setUserActive() {
		isUserReal = true;
		userActive = true;
		var currentTime = utils.currentTime;
		if(currentTime > userLastActivity + 1000) {
			userLastActivity = currentTime;
			eventMgr.onUserActive();
		}
	}

	function isUserActive() {
		if(utils.currentTime - userLastActivity > constants.USER_IDLE_THRESHOLD) {
			userActive = false;
		}
		return userActive && windowUnique;
	}

	// Used to only have 1 window of the application in the same browser
	var windowId;

	function checkWindowUnique() {
		if(isUserReal === false || windowUnique === false) {
			return;
		}
		if(windowId === undefined) {
			windowId = utils.id();
			storage.frontWindowId = windowId;
		}
		var frontWindowId = storage.frontWindowId;
		if(frontWindowId != windowId) {
			windowUnique = false;
			if(intervalId !== undefined) {
				clearInterval(intervalId);
			}
			$(".modal").modal("hide");
			$('.modal-non-unique').modal("show");
			// Attempt to close the window
			window.close();
		}
	}

	// Offline management
	var isOffline = false;
	var offlineTime = utils.currentTime;
	core.setOffline = function() {
		offlineTime = utils.currentTime;
		if(isOffline === false) {
			isOffline = true;
			eventMgr.onOfflineChanged(true);
		}
	};
	function setOnline() {
		if(isOffline === true) {
			isOffline = false;
			eventMgr.onOfflineChanged(false);
		}
	}

	function checkOnline() {
		// Try to reconnect if we are offline but we have some network
		if(isOffline === true && navigator.onLine === true && offlineTime + constants.CHECK_ONLINE_PERIOD < utils.currentTime) {
			offlineTime = utils.currentTime;
			// Try to download anything to test the connection
			$.ajax({
				url: "//www.google.com/jsapi",
				timeout: constants.AJAX_TIMEOUT,
				dataType: "script"
			}).done(function() {
				setOnline();
			});
		}
	}

	function loadSettings() {
		// Load extension settings
		eventMgr.onLoadSettings();
	}

	// Save settings from settings dialog
	function saveSettings(event) {
		var newSettings = {};

		// Save extension settings
		newSettings.extensionSettings = {};
		eventMgr.onSaveSettings(newSettings.extensionSettings, event);

		if(!event.isPropagationStopped()) {
			$.extend(settings, newSettings);
			storage.settings = JSON.stringify(settings);
		}
	}

	// Create the PageDown editor
	var pagedownEditor;
	var fileDesc;
	core.initEditor = function(fileDescParam) {
		if(fileDesc !== undefined) {
			eventMgr.onFileClosed(fileDesc);
		}
		fileDesc = fileDescParam;

		if(pagedownEditor !== undefined) {
			// If the editor is already created
			editor.undoMgr.init();
			return pagedownEditor.uiManager.setUndoRedoButtonStates();
		}

		// Create the converter and the editor
		var converter = new Markdown.Converter();
		var options = {
			_DoItalicsAndBold: function(text) {
				// Restore original markdown implementation
				text = text.replace(/(\*\*|__)(?=\S)(.+?[*_]*)(?=\S)\1/g,
					"<strong>$2</strong>");
				text = text.replace(/(\*|_)(?=\S)(.+?)(?=\S)\1/g,
					"<em>$2</em>");
				return text;
			}
		};
		converter.setOptions(options);
		pagedownEditor = new Markdown.Editor(converter, undefined, {
			undoManager: editor.undoMgr
		});

		// Custom insert link dialog
		pagedownEditor.hooks.set("insertLinkDialog", function(callback) {
			core.insertLinkCallback = callback;
			utils.resetModalInputs();
			$(".modal-insert-link").modal();
			return true;
		});

		eventMgr.onPagedownConfigure(pagedownEditor);
		pagedownEditor.hooks.chain("onPreviewRefresh", eventMgr.onAsyncPreview);
		pagedownEditor.run();
		editor.undoMgr.init();

		// Hide default buttons
		$(".wmd-button-row li").addClass("btn btn-success").css("left", 0).find("span").hide();

		// Add customized buttons
		var $btnGroupElt = $('.wmd-button-group1');
		$("#wmd-bold-button").append($('<i class="icon-bold">')).appendTo($btnGroupElt);
		$("#wmd-italic-button").append($('<i class="icon-italic">')).appendTo($btnGroupElt);
		$btnGroupElt = $('.wmd-button-group2');
		$("#wmd-link-button").append($('<i class="icon-globe">')).appendTo($btnGroupElt);
		$("#wmd-quote-button").append($('<i class="icon-indent-right">')).appendTo($btnGroupElt);
		$("#wmd-code-button").append($('<i class="icon-code">')).appendTo($btnGroupElt);
		$("#wmd-image-button").append($('<i class="icon-picture">')).appendTo($btnGroupElt);
		$btnGroupElt = $('.wmd-button-group3');
		$("#wmd-olist-button").append($('<i class="icon-list-numbered">')).appendTo($btnGroupElt);
		$("#wmd-ulist-button").append($('<i class="icon-list-bullet">')).appendTo($btnGroupElt);
		$("#wmd-heading-button").append($('<i class="icon-text-height">')).appendTo($btnGroupElt);
		$("#wmd-hr-button").append($('<i class="icon-ellipsis">')).appendTo($btnGroupElt);
		$btnGroupElt = $('.wmd-button-group5');
		$("#wmd-undo-button").append($('<i class="icon-reply">')).appendTo($btnGroupElt);
		$("#wmd-redo-button").append($('<i class="icon-forward">')).appendTo($btnGroupElt);
	};

	// Initialize multiple things and then fire eventMgr.onReady
	core.onReady = function() {
		// Add RTL class
		document.body.className += ' ' + settings.editMode;

		if(window.viewerMode === true) {
			document.body.innerHTML += bodyViewerHTML;
		}
		else {
			document.body.innerHTML += bodyEditorHTML;
		}

		// Initialize utils library
		utils.init();

		// listen to online/offline events
		$(window).on('offline', core.setOffline);
		$(window).on('online', setOnline);
		if(navigator.onLine === false) {
			core.setOffline();
		}

		// Detect user activity
		$(document).mousemove(setUserActive).keypress(setUserActive);

		layout.init();
		editor.init();

		// Do periodic tasks
		intervalId = window.setInterval(function() {
			utils.updateCurrentTime();
			checkWindowUnique();
			if(isUserActive() === true || window.viewerMode === true) {
				eventMgr.onPeriodicRun();
				checkOnline();
			}
		}, 1000);

		eventMgr.onReady();
	};

	// Other initialization that are not prioritary
	eventMgr.addListener("onReady", function() {

		$(document.body).on('shown.bs.modal', '.modal', function() {
			var $elt = $(this);
			setTimeout(function() {
				// When modal opens focus on the first button
				$elt.find('.btn:first').focus();
				// Or on the first link if any
				$elt.find('button:first').focus();
				// Or on the first input if any
				$elt.find("input:enabled:visible:first").focus();
			}, 50);
		}).on('hidden.bs.modal', '.modal', function() {
			// Focus on the editor when modal is gone
			editor.focus();
		}).on('keypress', '.modal', function(e) {
			// Handle enter key in modals
			if(e.which == 13 && !$(e.target).is("textarea")) {
				$(this).find(".modal-footer a:last").click();
			}
		});

		// Click events on "insert link" and "insert image" dialog buttons
		$(".action-insert-link").click(function(e) {
			var value = utils.getInputTextValue($("#input-insert-link"), e);
			if(value !== undefined) {
				core.insertLinkCallback(value);
				core.insertLinkCallback = undefined;
			}
		});

		// Hide events on "insert link" dialog
		$(".modal-insert-link").on('hidden.bs.modal', function() {
			if(core.insertLinkCallback !== undefined) {
				core.insertLinkCallback(null);
				core.insertLinkCallback = undefined;
			}
		});

		// Settings loading/saving
		$(".action-load-settings").click(function() {
			loadSettings();
		});
		$(".action-apply-settings").click(function(e) {
			saveSettings(e);
			if(!e.isPropagationStopped()) {
				window.location.reload();
			}
		});

		// Export settings
		$(".action-export-docs-settings").click(function() {
			utils.saveAs(JSON.stringify(storage), "StackEdit local storage.json");
		});

		$(".action-default-settings").click(function() {
			storage.removeItem("settings");
			storage.removeItem("theme");
			window.location.reload();
		});

		$(".action-app-reset").click(function() {
			storage.clear();
			window.location.reload();
		});

		// Reset inputs
		$(".action-reset-input").click(function() {
			utils.resetModalInputs();
		});

		// Avoid dropdown panels to close on click
		$("div.dropdown-menu").click(function(e) {
			e.stopPropagation();
		});

		// Non unique window dialog
		$('.modal-non-unique').modal({
			backdrop: "static",
			keyboard: false,
			show: false
		});

		// Load images
		_.each(document.querySelectorAll('img'), function(imgElt) {
			var $imgElt = $(imgElt);
			var src = $imgElt.data('stackeditSrc');
			if(src) {
				$imgElt.attr('src', window.baseDir + '/img/' + src);
			}
		});

	});

	return core;
});
