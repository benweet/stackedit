define(["jquery", "core", "gdrive", "synchronizer", "async-runner"], function($, core, gdrive, synchronizer, asyncTaskRunner) {

	var fileManager = {};

	fileManager.init = function() {
		gdrive.init(fileManager);
		
		var changeSyncButtonState = function() {
			if(synchronizer.isRunning() || synchronizer.isQueueEmpty() || core.isOffline) {
				$(".action-force-sync").addClass("disabled");
			}
			else {
				$(".action-force-sync").removeClass("disabled");
			}
		};
		core.addOfflineListener(changeSyncButtonState);
		synchronizer.init(fileManager, {
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
			synchronizer.sync();
			asyncTaskRunner.runTask();
			core.checkOnline();
		}, 1000);

		$(".action-create-file").click(function() {
			var fileIndex = fileManager.createFile();
			fileManager.selectFile(fileIndex);
			$("#file-title").click();
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
				var fileIndexTitle = localStorage["file.current"] + ".title";
				if (title != localStorage[fileIndexTitle]) {
					localStorage[fileIndexTitle] = title;
					fileManager.updateFileTitles();
					fileManager.saveFile();
				}
			}
			$(this).hide();
			$("#file-title").show();
		});
		$(".action-download-md").click(
			function() {
				var content = $("#wmd-input").val();
				var uriContent = "data:application/octet-stream;base64,"
					+ core.encodeBase64(content);
				window.open(uriContent, 'file');
			});
		$(".action-download-html").click(
			function() {
				var content = $("#wmd-preview").html();
				var uriContent = "data:application/octet-stream;base64,"
					+ core.encodeBase64(content);
				window.open(uriContent, 'file');
			});
		$(".action-upload-gdrive").click(uploadGdrive);
		$(".action-download-gdrive").click(function(event) {
			var fileId = core.getInputValue($("#download-gdrive-fileid"), event);
			if(checkGdriveFileId(fileId) === true) {
				gdrive.importFiles([fileId]);
			}
		});
		$(".action-manual-gdrive").click(function(event) {
			var fileId = core.getInputValue($("#manual-gdrive-fileid"), event);
			manualGdrive(fileId);
		});
		$(".action-download-dropbox").click(function() {
			core.showMessage("Sorry, Dropbox synchronization is not yet available.");
		});
		$(".action-upload-dropbox").click(function() {
			core.showMessage("Sorry, Dropbox synchronization is not yet available.");
		});
	};

	// Caution: this function recreate the editor (reset undo operations)
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
		refreshManageSync();

		// Update the file titles
		this.updateFileTitles();
		
		// Recreate the editor
		var fileIndex = localStorage["file.current"];
		$("#wmd-input").val(localStorage[fileIndex + ".content"]);
		core.createEditor(function() {
			fileManager.saveFile();
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

	fileManager.deleteFile = function(fileIndex) {
		var fileIndexCurrent = localStorage["file.current"];
		fileIndex = fileIndex || fileIndexCurrent;
		if(fileIndex == fileIndexCurrent) {
			localStorage.removeItem("file.current");
		}

		// Remove synchronized locations
		var fileSyncIndexList = localStorage[fileIndex + ".sync"].split(";");
		for ( var i = 1; i < fileSyncIndexList.length - 1; i++) {
			var fileSyncIndex = fileSyncIndexList[i];
			fileManager.removeSync(fileSyncIndex);
		}
		localStorage.removeItem(fileIndex + ".sync");

		localStorage["file.list"] = localStorage["file.list"].replace(";"
			+ fileIndex + ";", ";");
		localStorage.removeItem(fileIndex + ".title");
		localStorage.removeItem(fileIndex + ".content");
	};

	fileManager.saveFile = function() {
		var content = $("#wmd-input").val();
		var fileIndex = localStorage["file.current"];
		localStorage[fileIndex + ".content"] = content;
		synchronizer.addFileForUpload(fileIndex);
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
		synchronizer.useGoogleDrive = useGoogleDrive;
	};

	// Remove a synchronized location
	fileManager.removeSync = function(fileSyncIndex) {
		var fileIndexCurrent = localStorage["file.current"];
		var fileIndex = this.getFileIndexFromSync(fileSyncIndex);
		if(fileIndex !== undefined) {
			localStorage[fileIndex + ".sync"] = localStorage[fileIndex + ".sync"].replace(";"
				+ fileSyncIndex + ";", ";");
			if(fileIndex == fileIndexCurrent) {
				refreshManageSync();
			}
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
		var fileIndex = localStorage["file.current"];
		var content = localStorage[fileIndex + ".content"];
		var title = localStorage[fileIndex + ".title"];
		gdrive.createFile(title, content, function(fileSyncIndex) {
			if (fileSyncIndex === undefined) {
				return;
			}
			localStorage[fileIndex + ".sync"] += fileSyncIndex + ";";
			refreshManageSync();
			fileManager.updateFileTitles();
			core.showMessage('"' + title
				+ '" will now be synchronized on Google Drive.');
		});
	}
	
	function checkGdriveFileId(fileId) {
		if(!fileId) {
			return false;
		}
		// Check that file is not synchronized with an other one
		var fileSyncIndex = SYNC_PROVIDER_GDRIVE + fileId;
		var fileIndex = fileManager.getFileIndexFromSync(fileSyncIndex);
		if(fileIndex !== undefined) {
			var title = localStorage[fileIndex + ".title"];
			core.showError('Google Drive file is already synchronized with "' + title + '"');
			return false;
		}
		return true;
	}

	function manualGdrive(fileId) {
		if(checkGdriveFileId(fileId) === false) {
			return;
		}
		var fileIndex = localStorage["file.current"];
		var title = localStorage[fileIndex + ".title"];
		gdrive.downloadMetadata([fileId], function(result) {
			if(result === undefined || result.length === 0) {
				return;
			}
			var file = result[0];
			var fileSyncIndex = SYNC_PROVIDER_GDRIVE + file.id;
			localStorage[fileSyncIndex + ".etag"] = file.etag;
			localStorage[fileIndex + ".sync"] += fileSyncIndex + ";";
			refreshManageSync();
			fileManager.updateFileTitles();
			core.showMessage('"' + title
				+ '" will now be synchronized on Google Drive.');
			// Force synchronization
			synchronizer.addFileForUpload(fileIndex);
			synchronizer.forceSync();
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
				var line = $("<div>").addClass("input-prepend input-append");
				if (fileSyncIndex.indexOf(SYNC_PROVIDER_GDRIVE) === 0) {
					line.append($("<span>").addClass("add-on").html(
						'<i class="icon-gdrive"></i>'));
					line.append($("<input>").prop("type", "text").prop(
						"disabled", true).addClass("span5").val(
						"ID="
							+ fileSyncIndex.substring(SYNC_PROVIDER_GDRIVE.length)));
				}
				line.append($("<a>").addClass("btn").html(
					'<i class="icon-trash"></i>').prop("title",
					"Remove this synchronized location").click(function() {
					fileManager.removeSync(fileSyncIndex);
					fileManager.updateFileTitles();
				}));
				$("#manage-sync-list").append(line);
			})(fileSyncIndex);
		}
	}

	return fileManager;
});
