var currentTime = new Date().getTime();

function showError(msg) {
	showMessage(msg, "icon-warning-sign");
}

function showMessage(msg, iconClass, options) {
	options = options || {};
	$.jGrowl("<i class='icon-white " + iconClass + "'></i> " + msg, options);
}

function showWorkingIndicator(show) {
	if (show === false) {
		$(".working-indicator").addClass("hide");
	} else {
		$(".working-indicator").removeClass("hide");
	}
}

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

function autoClean() {
	$("#message-container .msg-temp").each(function() {
		var displayTime = $(this).data("displayTime");
		if (displayTime + 5000 < currentTime) {
			$(this).animate({ opacity : 'hide' }, 600, function() {
				$(this).remove();
				if ($("#message-container div").length === 0) {
					$("#message-container").addClass("hide");
				}
			});
		}
	});
	if ($("#message-container div").length === 0) {
		$("#message-container").addClass("hide");
	}
	// Try to reconnect if we are offline but we have some network
	if (offline === true && navigator.onLine === true
		&& offlineTime + 60000 < currentTime) {
		offlineTime = currentTime;
		// Try to download anything to test the connection
		$.ajax(
			{ url : "https://apis.google.com/js/client.js", timeout : 5000,
				dataType : "script" }).done(function() {
			onOnline();
		});
	}
}

var SYNC_PROVIDER_GDRIVE = "sync.gdrive.";
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

	// Recursive function to run synchronization of a single file on multiple
	// locations
	function sync(fileSyncIndexList, content, title) {
		if (fileSyncIndexList.length === 0) {
			localStorage.removeItem("sync.current");
			running = false;
			// run the next file synchronization
			synchronizer.run();
			return;
		}
		var fileSyncIndex = fileSyncIndexList.pop();

		// Try to find the provider
		if (fileSyncIndex.indexOf(SYNC_PROVIDER_GDRIVE) === 0) {
			var id = fileSyncIndex.substring(SYNC_PROVIDER_GDRIVE.length);
			gdrive.updateFile(id, title, content, function(result) {
				if (!result && offline) {
					// If we detect offline mode we put the fileIndex back in
					// the queue
					synchronizer.addFile(localStorage["sync.current"]);
					localStorage.removeItem("sync.current");
					running = false;
					return;
				}
				sync(fileSyncIndexList, content, title);
			});
		} else {
			sync(fileSyncIndexList, content, title);
		}
	}

	var running = false;
	synchronizer.run = function() {
		// If synchronization is already running or nothing to synchronize
		if (running || syncQueue.length === 1 || offline) {
			return;
		}
		running = true;

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
		sync(fileSyncIndexList, content, title);
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

		// Save file automatically and synchronize
		window.setInterval(function() {
			currentTime = new Date().getTime();
			fileManager.saveFile();
			synchronizer.run();
			asyncTaskRunner.runTask();
			autoClean();
		}, 1000);

		$(".action-create-file").click(function() {
			fileManager.saveFile();
			fileManager.createFile();
			fileManager.selectFile();
		});
		$(".action-remove-file").click(function() {
			fileManager.deleteFile();
			fileManager.selectFile();
		});
		$("#file-title").click(function() {
			$(this).hide();
			$("#file-title-input").show().focus();
		});
		$("#file-title-input").blur(function() {
			var title = $.trim($(this).val());
			if (title) {
				var fileIndex = localStorage["file.current"];
				localStorage[fileIndex + ".title"] = title;
			}
			$(this).hide();
			$("#file-title").show();
			fileManager.updateFileDescList();
			fileManager.updateFileTitleUI();
			save = true;
		});
		$(".action-download-md").click(
			function() {
				var content = $("#wmd-input").val();
				var uriContent = "data:application/octet-stream,"
					+ encodeURIComponent(content);
				window.open(uriContent, 'file');
			});
		$(".action-download-html").click(
			function() {
				var content = $("#wmd-preview").html();
				var uriContent = "data:application/octet-stream,"
					+ encodeURIComponent(content);
				window.open(uriContent, 'file');
			});
		$(".action-upload-gdrive")
			.click(
				function() {
					$(".file-sync-indicator").removeClass("hide");
					var fileIndex = localStorage["file.current"];
					var content = localStorage[fileIndex + ".content"];
					var title = localStorage[fileIndex + ".title"];
					(function(fileIndex) {
						gdrive
							.createFile(
								title,
								content,
								function(fileSyncIndex) {
									if (fileSyncIndex) {
										localStorage[fileIndex + ".sync"] += fileSyncIndex
											+ ";";
									} else {
										showError("Error while creating file on Google Drive");
									}
								});
					})(fileIndex);
				});
	};

	fileManager.selectFile = function() {
		// If file system does not exist
		if (!localStorage["file.counter"] || !localStorage["file.list"]) {
			localStorage.clear();
			localStorage["file.counter"] = 0;
			localStorage["file.list"] = ";";
		}
		this.updateFileDescList();
		// If no file create one
		if (this.fileDescList.length === 0) {
			this.createFile();
			this.updateFileDescList();
		}
		// If no default file take first one
		if (!localStorage["file.current"]) {
			localStorage["file.current"] = this.fileDescList[0].index;
		}
		// Update the editor and the file title
		var fileIndex = localStorage["file.current"];
		$("#wmd-input").val(localStorage[fileIndex + ".content"]);
		core.createEditor(function() {
			save = true;
		});
		this.updateFileTitleUI();
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
		localStorage.removeItem("file.current");
		localStorage["file.list"] = localStorage["file.list"].replace(";"
			+ fileIndex + ";", ";");
		localStorage.removeItem(fileIndex + ".sync");
		localStorage.removeItem(fileIndex + ".title");
		localStorage.removeItem(fileIndex + ".content");
	};

	fileManager.updateFileDescList = function() {
		this.fileDescList = [];
		$("#file-selector").empty();
		var fileIndexList = localStorage["file.list"].split(";");
		for ( var i = 1; i < fileIndexList.length - 1; i++) {
			var fileIndex = fileIndexList[i];
			var title = localStorage[fileIndex + ".title"];
			this.fileDescList.push({ "index" : fileIndex, "title" : title });
		}
		this.fileDescList.sort(function(a, b) {
			if (a.title.toLowerCase() < b.title.toLowerCase())
				return -1;
			if (a.title.toLowerCase() > b.title.toLowerCase())
				return 1;
			return 0;
		});
	};

	fileManager.updateFileTitleUI = function() {
		// Update the editor and the file title
		var fileIndex = localStorage["file.current"];
		var title = localStorage[fileIndex + ".title"];
		document.title = "StackEdit - " + title;
		$(".file-title").text(title);
		$("#file-title-input").val(title);
		$("#file-selector").empty();

		for ( var i = 0; i < this.fileDescList.length; i++) {
			var fileDesc = this.fileDescList[i];
			var a = $("<a>").text(fileDesc.title);
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

	fileManager.saveFile = function() {
		if (save) {
			var content = $("#wmd-input").val();
			var fileIndex = localStorage["file.current"];
			localStorage[fileIndex + ".content"] = content;
			synchronizer.addFile(fileIndex);
			save = false;
		}
	};

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
