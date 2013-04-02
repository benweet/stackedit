define(["jquery", "core", "gdrive", "synchronizer", "async-runner", "base64"], function($, core, gdrive, synchronizer, asyncTaskRunner) {

	var fileManager = {};

	var save = false;
	fileManager.init = function() {
		gdrive.init();
		
		var changeSyncButtonState = function() {
			if(synchronizer.isRunning() || synchronizer.isQueueEmpty() || core.isOffline) {
				$(".action-force-sync").addClass("disabled");
			}
			else {
				$(".action-force-sync").removeClass("disabled");
			}
		};
		core.addOfflineListener(changeSyncButtonState);
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

		// Do periodic tasks
		window.setInterval(function() {
			core.updateCurrentTime();
			fileManager.saveFile();
			synchronizer.sync();
			asyncTaskRunner.runTask();
			core.checkOnline();
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
			core.showMessage("Sorry, Dropbox synchronization is not yet available.");
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
		
		var useGoogleDrive = false;
		function composeTitle(fileIndex) {
			var result = localStorage[fileIndex + ".title"];
			var sync = localStorage[fileIndex + ".sync"];
			if (sync.indexOf(";" + SYNC_PROVIDER_GDRIVE) !== -1) {
				useGoogleDrive = true;
				result = '<i class="icon-gdrive"></i> ' + result;
			}
			return result;
		}
		synchronizer.useGoogleDrive = useGoogleDrive;

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
				core.showMessage('"' + title
					+ '" will now be synchronized on Google Drive.');
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
});
