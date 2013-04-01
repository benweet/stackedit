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
var offlineListeners = [];
function onOffline() {
	offlineTime = currentTime;
	if(offline === false) {
		offline = true;
		showMessage("You are offline.", "icon-exclamation-sign msg-offline", {
			sticky : true, close : function() {
				showMessage("You are back online!", "icon-signal");
			} });
		for(var i=0; i<offlineListeners.length; i++) {
			offlineListeners[i]();
		}
	}
}

function onOnline() {
	if(offline === true) {
		$(".msg-offline").parents(".jGrowl-notification").trigger(
			'jGrowl.beforeClose');
		offline = false;
		for(var i=0; i<offlineListeners.length; i++) {
			offlineListeners[i]();
		}
	}
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

var DEFAULT_FILE_TITLE = "Filename";
var fileManager = (function($) {

	var fileManager = {};

	var save = false;
	fileManager.init = function() {
		gdrive.init();
		
		var changeSyncButtonState = function() {
			if(synchronizer.isRunning() || synchronizer.isQueueEmpty() || offline) {
				$(".action-force-sync").addClass("disabled");
			}
			else {
				$(".action-force-sync").removeClass("disabled");
			}
		};
		offlineListeners.push(changeSyncButtonState);
		synchronizer.init({
			onSyncBegin : changeSyncButtonState,
			onSyncEnd : changeSyncButtonState,
			onQueueChanged : changeSyncButtonState
		});
		$(".action-force-sync").click(function() {
			if(!$(this).hasClass("disabled")) {
				synchronizer.forceSync();
			}
		});
		
		fileManager.selectFile();

		// Do periodic stuff
		window.setInterval(function() {
			currentTime = new Date().getTime();
			fileManager.saveFile();
			synchronizer.sync();
			asyncTaskRunner.runTask();
			checkOnline();
		}, 1000);

		$(".action-create-file").click(function() {
			fileManager.saveFile();
			var fileIndex = fileManager.createFile();
			fileManager.selectFile(fileIndex);
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
		$(".action-upload-dropbox").click(function() {
			showMessage("Sorry, Dropbox synchronization is not yet available.");
		});
	};

	var fileDescList = [];
	fileManager.selectFile = function(fileIndex) {
		// If file system does not exist
		if (!localStorage["file.counter"] || !localStorage["file.list"]) {
			localStorage.clear();
			localStorage["file.counter"] = 0;
			localStorage["file.list"] = ";";
		}
		// If no file create one
		if (localStorage["file.list"].length === 1) {
			fileIndex = this.createFile();
		}
		
		fileIndex = fileIndex || localStorage["file.current"];
		if(fileIndex !== undefined) {
			localStorage["file.current"] = fileIndex;
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

	fileManager.createFile = function(title, content, syncIndexes) {
		content = content || "";
		syncIndexes = syncIndexes || [];
		if (!title) {
			// Create a file title 
			title = DEFAULT_FILE_TITLE;
			function exists(title) {
				for ( var i = 0; i < fileDescList.length; i++) {
					if(fileDescList[i].title == title) {
						return true;
					}
				}
			}
			var indicator = 2;
			while(exists(title)) {
				title = DEFAULT_FILE_TITLE + indicator++;
			}
		}
		// Create the fileIndex
		var fileCounter = parseInt(localStorage["file.counter"]);
		var fileIndex = "file." + fileCounter;
		// Create the file in the localStorage
		localStorage[fileIndex + ".content"] = content;
		localStorage[fileIndex + ".title"] = title;
		var sync = ";";
		for(var i=0; i<syncIndexes.length; i++) {
			sync += syncIndexes[i] + ";";
		}
		localStorage[fileIndex + ".sync"] = sync;
		localStorage["file.counter"] = fileCounter + 1;
		localStorage["file.list"] += fileIndex + ";";
		return fileIndex;
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
			synchronizer.addFileForUpload(fileIndex);
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

		var fileIndex = localStorage["file.current"];
		// If no default file take first one
		if (!fileIndex) {
			fileIndex = fileDescList[0].index;
			localStorage["file.current"] = fileIndex;
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

		// Update the file title
		var title = localStorage[fileIndex + ".title"];
		document.title = "StackEdit - " + title;
		$("#file-title").html(composeTitle(fileIndex));
		$(".file-title").text(title);
		$("#file-title-input").val(title);
		
		// Update the file selector
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
	
	// Look for local file associated to a synchronized location 
	fileManager.getFileIndexFromSync = function(fileSyncIndex) {
		var fileIndex = undefined;
		var fileIndexList = localStorage["file.list"].split(";");
		for ( var i = 1; i < fileIndexList.length - 1; i++) {
			var tempFileIndex = fileIndexList[i];
			var sync = localStorage[tempFileIndex + ".sync"];
			if (sync.indexOf(";" + fileSyncIndex + ";") !== -1) {
				fileIndex = tempFileIndex;
				break;
			}
		}
		return fileIndex;
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

		// jGrowl configuration
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

		fileManager.init();
	});

})(jQuery);
