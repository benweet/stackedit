var currentTime = new Date().getTime();

function showError(msg) {
	showMessage(msg, "icon-warning-sign");
}

function showMessage(msg, iconClass, options) {
	options = options || {};
	iconClass = iconClass || "icon-info-sign";
	$.jGrowl("<i class='icon-white " + iconClass + "'></i> " + msg, options);
}

function showWorkingIndicator(show) {
	if (show === false) {
		$(".working-indicator").addClass("hide");
	} else {
		$(".working-indicator").removeClass("hide");
	}
}

var AJAX_TIMEOUT = 5000;
var CHECK_ONLINE_PERIOD = 60000;
var offline = false;
var offlineTime = currentTime;
function onOffline() {
	offline = true;
	offlineTime = currentTime;
	if ($(".msg-offline").length === 0)
		showMessage("You are offline.", "icon-exclamation-sign msg-offline", {
			sticky : true, close : function() {
				showMessage("You are back online!", "icon-signal");
			} });
}

function onOnline() {
	offline = false;
	$(".msg-offline").parents(".jGrowl-notification").trigger(
		'jGrowl.beforeClose');
}

function checkOnline() {
	// Try to reconnect if we are offline but we have some network
	if (offline === true && navigator.onLine === true
		&& offlineTime + CHECK_ONLINE_PERIOD < currentTime) {
		offlineTime = currentTime;
		// Try to download anything to test the connection
		$.ajax(
			{ url : "https://apis.google.com/js/client.js",
				timeout : AJAX_TIMEOUT, dataType : "script" }).done(function() {
			onOnline();
		});
	}
}

var SYNC_DOWN_PERIOD = 60000;
var SYNC_PROVIDER_GDRIVE = "sync.gdrive.";
var syncGoogleDrive = false;

var synchronizer = (function($) {
	var synchronizer = {};

	// A synchronization queue containing fileIndex that has to be synchronized
	var syncQueue = undefined;
	synchronizer.init = function() {
		syncQueue = ";";
		// Load the queue from localStorage in case a previous synchronization
		// was aborted
		if (localStorage["sync.queue"]) {
			syncQueue = localStorage["sync.queue"];
		}
		if (localStorage["sync.current"]) {
			this.addFile(localStorage["sync.current"]);
		}
	};

	// Add a file to the synchronization queue
	synchronizer.addFile = function(fileIndex) {
		if (syncQueue.indexOf(";" + fileIndex + ";") === -1) {
			syncQueue += fileIndex + ";";
			localStorage["sync.queue"] = syncQueue;
		}
	};

	// Recursive function to upload a single file on multiple locations
	function fileUp(fileSyncIndexList, content, title) {
		if (fileSyncIndexList.length === 0) {
			localStorage.removeItem("sync.current");
			uploadRunning = false;
			// run the next file synchronization
			synchronizer.syncUp();
			return;
		}
		var fileSyncIndex = fileSyncIndexList.pop();

		// Try to find the provider
		if (fileSyncIndex.indexOf(SYNC_PROVIDER_GDRIVE) === 0) {
			var id = fileSyncIndex.substring(SYNC_PROVIDER_GDRIVE.length);
			gdrive.updateFile(id, title, content, function(result) {
				if (result === undefined && offline === true) {
					// If we detect offline mode we put the fileIndex back in
					// the queue
					synchronizer.addFile(localStorage["sync.current"]);
					localStorage.removeItem("sync.current");
					uploadRunning = false;
					return;
				}
				fileUp(fileSyncIndexList, content, title);
			});
		} else {
			fileUp(fileSyncIndexList, content, title);
		}
	}

	var uploadRunning = false;
	synchronizer.syncUp = function() {
		// If syncUp is already running or nothing to synchronize or offline
		if (uploadRunning || syncQueue.length === 1 || offline) {
			return;
		}
		uploadRunning = true;

		// Dequeue the fileIndex
		var separatorPos = syncQueue.indexOf(";", 1);
		var fileIndex = syncQueue.substring(1, separatorPos);
		localStorage["sync.current"] = fileIndex;
		syncQueue = syncQueue.substring(separatorPos);
		localStorage["sync.queue"] = syncQueue;

		var content = localStorage[fileIndex + ".content"];
		var title = localStorage[fileIndex + ".title"];

		// Parse the list of synchronized locations associated to the file
		var fileSyncIndexList = localStorage[fileIndex + ".sync"].split(";");
		fileUp(fileSyncIndexList, content, title);
	};

	function syncDownGdrive(callback) {
		if (syncGoogleDrive === false) {
			callback();
			return;
		}
		var lastChangeId = parseInt(localStorage[SYNC_PROVIDER_GDRIVE
			+ "lastChangeId"]);
		gdrive.checkUpdates(lastChangeId, function(changes, newChangeId) {
			if (changes === undefined) {
				callback();
				return;
			}
			gdrive.downloadContent(changes, function(changes) {
				if (changes === undefined) {
					callback();
					return;
				}
				var updateFileTitles = false;
				for ( var i = 0; i < changes.length; i++) {
					var change = changes[i];
					var fileSyncIndex = SYNC_PROVIDER_GDRIVE + change.fileId;
					var fileIndexList = localStorage["file.list"].split(";");
					var fileIndex = undefined;
					// Look for local file associated to this synchronized location 
					for ( var i = 1; i < fileIndexList.length - 1; i++) {
						var tempFileIndex = fileIndexList[i];
						var sync = localStorage[tempFileIndex + ".sync"];
						if (sync.indexOf(";" + fileSyncIndex + ";") !== -1) {
							fileIndex = tempFileIndex;
							break;
						}
					}
					// No file corresponding (this should never happen...)
					if(fileIndex === undefined) {
						// We can remove the stored etag
						localStorage.removeItem(fileSyncIndex + ".etag");
						continue;
					}
					var title = localStorage[fileIndex + ".title"];
					// File deleted
					if (change.deleted === true) {
						fileManager.removeSync(fileSyncIndex);
						updateFileTitles = true;
						showMessage('"' + title + '" has been removed from Google Drive.');
						continue;
					}
					var content = localStorage[fileIndex + ".content"];
					var file = change.file;
					// File title changed
					if(title != file.title) {
						localStorage[fileIndex + ".title"] = file.title;
						updateFileTitles = true;
						showMessage('"' + title + '" has been renamed to "' + file.title + '" on Google Drive.');
					}
					// File content changed
					if(content != file.content) {
						localStorage[fileIndex + ".content"] = file.content;
						showMessage('"' + file.title + '" has been updated from Google Drive.');
						if(fileIndex == localStorage["file.current"]) {
							updateFileTitles = false; // Done by next function
							fileManager.selectFile();
						}
					}
					// Update file etag
					localStorage[fileSyncIndex + ".etag"] = file.etag;
					// Synchronize file to others locations
					synchronizer.addFile(fileIndex);
				}
				if(updateFileTitles) {
					fileManager.updateFileTitles();
				}
				localStorage[SYNC_PROVIDER_GDRIVE
				 			+ "lastChangeId"] = newChangeId;
				callback();
			});
		});
	}

	var downloadRunning = false;
	var lastSyncDown = 0;
	synchronizer.syncDown = function() {
		// If syncDown is already running or timeout is not reached or offline
		if (downloadRunning || lastSyncDown + SYNC_DOWN_PERIOD > currentTime
			|| offline) {
			return;
		}
		downloadRunning = true;
		lastSyncDown = currentTime;

		syncDownGdrive(function() {
			downloadRunning = false;
		});
	};

	return synchronizer;
})(jQuery);

var fileManager = (function($) {

	var fileManager = {};

	var save = false;
	fileManager.init = function() {
		gdrive.init();
		synchronizer.init();
		fileManager.selectFile();

		// Do periodic stuff
		window.setInterval(function() {
			currentTime = new Date().getTime();
			fileManager.saveFile();
			synchronizer.syncDown();
			synchronizer.syncUp();
			asyncTaskRunner.runTask();
			checkOnline();
		}, 1000);

		$(".action-create-file").click(function() {
			fileManager.saveFile();
			fileManager.createFile();
			fileManager.selectFile();
			$("#file-title").click();
		});
		$(".action-remove-file").click(function() {
			fileManager.deleteFile();
			fileManager.selectFile();
		});
		$(".action-refresh-manage-sync").click(refreshManageSync);
		$("#file-title").click(function() {
			$(this).hide();
			$("#file-title-input").show().focus();
		});
		$("#file-title-input").blur(function() {
			var title = $.trim($(this).val());
			if (title) {
				var fileIndexTitle = localStorage["file.current"] + ".title";
				if (title != localStorage[fileIndexTitle]) {
					localStorage[fileIndexTitle] = title;
					fileManager.updateFileTitles();
					save = true;
				}
			}
			$(this).hide();
			$("#file-title").show();
		});
		$(".action-download-md").click(
			function() {
				var content = $("#wmd-input").val();
				var uriContent = "data:application/octet-stream;base64,"
					+ base64.encode(content);
				window.open(uriContent, 'file');
			});
		$(".action-download-html").click(
			function() {
				var content = $("#wmd-preview").html();
				var uriContent = "data:application/octet-stream;base64,"
					+ base64.encode(content);
				window.open(uriContent, 'file');
			});
		$(".action-upload-gdrive").click(uploadGdrive);
	};

	var fileDescList = [];
	fileManager.selectFile = function() {
		// If file system does not exist
		if (!localStorage["file.counter"] || !localStorage["file.list"]) {
			localStorage.clear();
			localStorage["file.counter"] = 0;
			localStorage["file.list"] = ";";
		}
		// If no file create one
		if (localStorage["file.list"].length === 1) {
			this.createFile();
		}
		// Update the file titles
		this.updateFileTitles();
		// Update the editor
		var fileIndex = localStorage["file.current"];
		$("#wmd-input").val(localStorage[fileIndex + ".content"]);
		core.createEditor(function() {
			save = true;
		});
	};

	fileManager.createFile = function(title) {
		if (!title) {
			title = "Filename";
		}
		// Create the fileIndex
		var fileCounter = parseInt(localStorage["file.counter"]);
		var fileIndex = "file." + fileCounter;
		// Create the file in the localStorage
		localStorage[fileIndex + ".content"] = "";
		localStorage[fileIndex + ".title"] = title;
		localStorage[fileIndex + ".sync"] = ";";
		localStorage["file.counter"] = fileCounter + 1;
		localStorage["file.list"] += fileIndex + ";";
		localStorage["file.current"] = fileIndex;
	};

	fileManager.deleteFile = function() {
		var fileIndex = localStorage["file.current"];

		// Remove synchronized locations
		var fileSyncIndexList = localStorage[fileIndex + ".sync"].split(";");
		for ( var i = 1; i < fileSyncIndexList.length - 1; i++) {
			var fileSyncIndex = fileSyncIndexList[i];
			fileManager.removeSync(fileSyncIndex);
		}
		localStorage.removeItem(fileIndex + ".sync");

		localStorage.removeItem("file.current");
		localStorage["file.list"] = localStorage["file.list"].replace(";"
			+ fileIndex + ";", ";");
		localStorage.removeItem(fileIndex + ".title");
		localStorage.removeItem(fileIndex + ".content");
	};

	fileManager.saveFile = function() {
		if (save) {
			var content = $("#wmd-input").val();
			var fileIndex = localStorage["file.current"];
			localStorage[fileIndex + ".content"] = content;
			synchronizer.addFile(fileIndex);
			save = false;
		}
	};
	
	fileManager.updateFileTitles = function() {
		fileDescList = [];
		$("#file-selector").empty();
		var fileIndexList = localStorage["file.list"].split(";");
		for ( var i = 1; i < fileIndexList.length - 1; i++) {
			var fileIndex = fileIndexList[i];
			var title = localStorage[fileIndex + ".title"];
			fileDescList.push({ index : fileIndex, title : title });
		}
		fileDescList.sort(function(a, b) {
			if (a.title.toLowerCase() < b.title.toLowerCase())
				return -1;
			if (a.title.toLowerCase() > b.title.toLowerCase())
				return 1;
			return 0;
		});

		// If no default file take first one
		if (!localStorage["file.current"]) {
			localStorage["file.current"] = fileDescList[0].index;
		}
		
		syncGoogleDrive = false;
		function composeTitle(fileIndex) {
			var result = localStorage[fileIndex + ".title"];
			var sync = localStorage[fileIndex + ".sync"];
			if (sync.indexOf(";" + SYNC_PROVIDER_GDRIVE) !== -1) {
				syncGoogleDrive = true;
				result = '<i class="icon-gdrive"></i> ' + result;
			}
			return result;
		}

		// Update the the file title and the file selector
		var fileIndex = localStorage["file.current"];
		var title = localStorage[fileIndex + ".title"];
		document.title = "StackEdit - " + title;
		$("#file-title").html(composeTitle(fileIndex));
		$(".file-title").text(title);
		$("#file-title-input").val(title);
		$("#file-selector").empty();

		for ( var i = 0; i < fileDescList.length; i++) {
			var fileDesc = fileDescList[i];
			var a = $("<a>").html(composeTitle(fileDesc.index));
			var li = $("<li>").append(a);
			if (fileDesc.index == fileIndex) {
				li.addClass("disabled");
			} else {
				a.prop("href", "#").click((function(fileIndex) {
					return function() {
						localStorage["file.current"] = fileIndex;
						fileManager.selectFile();
					};
				})(fileDesc.index));
			}
			$("#file-selector").append(li);
		}
	};

	// Remove a synchronized location
	fileManager.removeSync = function(fileSyncIndex) {
		var fileIndexList = localStorage["file.list"].split(";");
		// Look for local files associated to this synchronized location 
		for ( var i = 1; i < fileIndexList.length - 1; i++) {
			var fileIndexSync = fileIndexList[i] + ".sync";
			localStorage[fileIndexSync] = localStorage[fileIndexSync].replace(";"
				+ fileSyncIndex + ";", ";");
		}
		// Remove etag
		localStorage.removeItem(fileSyncIndex + ".etag");
	};

	function uploadGdrive() {
		$(".file-sync-indicator").removeClass("hide");
		var fileIndex = localStorage["file.current"];
		var content = localStorage[fileIndex + ".content"];
		var title = localStorage[fileIndex + ".title"];
		gdrive.createFile(title, content, function(fileSyncIndex) {
			if (fileSyncIndex) {
				localStorage[fileIndex + ".sync"] += fileSyncIndex + ";";
				fileManager.updateFileTitles();
				showMessage('The file "' + title
					+ '" will now be synchronized on Google Drive.');
			} else {
				showError("Error while creating file on Google Drive.");
			}
		});
	}

	function refreshManageSync() {
		var fileIndex = localStorage["file.current"];
		var fileSyncIndexList = localStorage[fileIndex + ".sync"].split(";");
		$(".msg-no-sync, .msg-sync-list").addClass("hide");
		$("#manage-sync-list .input-append").remove();
		if (fileSyncIndexList.length > 2) {
			$(".msg-sync-list").removeClass("hide");
		} else {
			$(".msg-no-sync").removeClass("hide");
		}
		for ( var i = 1; i < fileSyncIndexList.length - 1; i++) {
			var fileSyncIndex = fileSyncIndexList[i];
			(function(fileSyncIndex) {
				var line = $("<div>").addClass("input-append");
				if (fileSyncIndex.indexOf(SYNC_PROVIDER_GDRIVE) === 0) {
					line.append($("<input>").prop("type", "text").prop(
						"disabled", true).addClass("span5").val(
						"Google Drive, FileID="
							+ fileSyncIndex.substring(SYNC_PROVIDER_GDRIVE.length)));
					line.append($("<a>").addClass("btn").html(
						'<i class="icon-trash"></i>').prop("title",
						"Remove this synchronized location").click(function() {
						fileManager.removeSync(fileSyncIndex);
						fileManager.updateFileTitles();
						refreshManageSync();
					}));
				}
				$("#manage-sync-list").append(line);
			})(fileSyncIndex);
		}
	}

	return fileManager;
})(jQuery);

var core = (function($) {
	var core = {};

	core.init = function() {
		this.loadSettings();
		this.createLayout();

		$(".action-load-settings").click(function() {
			core.loadSettings();
		});

		$(".action-apply-settings").click(function() {
			core.saveSettings();
			fileManager.saveFile();
			location.reload();
		});
	};

	var settings = { layoutOrientation : "horizontal" };
	core.loadSettings = function() {
		if (localStorage.settings) {
			$.extend(settings, JSON.parse(localStorage.settings));
		}

		// Layout orientation
		$(
			"input:radio[name=radio-layout-orientation][value="
				+ settings.layoutOrientation + "]").prop("checked", true);
	};

	core.saveSettings = function() {

		// Layout orientation
		settings.layoutOrientation = $(
			"input:radio[name=radio-layout-orientation]:checked").prop("value");

		localStorage.settings = JSON.stringify(settings);
	};

	core.createLayout = function() {
		var layout = undefined;
		var layoutGlobalConfig = { closable : true, resizable : false,
			slidable : false, livePaneResizing : true,
			enableCursorHotkey : false, spacing_open : 15, spacing_closed : 15,
			togglerLength_open : 90, togglerLength_closed : 90,
			center__minWidth : 100, center__minHeight : 100,
			stateManagement__enabled : false, };
		if (settings.layoutOrientation == "horizontal") {
			$(".ui-layout-south").remove();
			$(".ui-layout-east").addClass("well").prop("id", "wmd-preview");
			layout = $('body').layout(
				$.extend(layoutGlobalConfig, { east__resizable : true,
					east__size : .5, east__minSize : 200 }));
		} else if (settings.layoutOrientation == "vertical") {
			$(".ui-layout-east").remove();
			$(".ui-layout-south").addClass("well").prop("id", "wmd-preview");
			layout = $('body').layout(
				$.extend(layoutGlobalConfig, { south__resizable : true,
					south__size : .5, south__minSize : 200 }));
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
	};

	core.createEditor = function(onTextChange) {
		$("#wmd-button-bar").empty();
		var converter = Markdown.getSanitizingConverter();
		var firstChange = true;
		converter.hooks.chain("preConversion", function(text) {
			if (!firstChange) {
				onTextChange();
			}
			return text;
		});
		var editor = new Markdown.Editor(converter);
		editor.run();
		firstChange = false;

		$(".wmd-button-row").addClass("btn-group").find("li:not(.wmd-spacer)")
			.addClass("btn").css("left", 0).find("span").hide();
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

	return core;
})(jQuery);

(function($) {

	$(function() {

		$.jGrowl.defaults.life = 5000;
		$.jGrowl.defaults.closer = false;
		$.jGrowl.defaults.closeTemplate = '';
		$.jGrowl.defaults.position = 'bottom-right';

		core.init();

		// listen to online/offline events
		$(window).on('offline', onOffline);
		$(window).on('online', onOnline);
		if (navigator.onLine === false) {
			onOffline();
		}

		if (typeof (Storage) !== "undefined") {
			fileManager.init();
		} else {
			showError("Local storage is not available");
		}
	});

})(jQuery);
