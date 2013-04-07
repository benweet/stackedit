define(["jquery", "core", "gdrive", "dropbox", "synchronizer", "async-runner"],
	function($, core, gdrive, dropbox, synchronizer, asyncTaskRunner) {

	var fileManager = {};

	fileManager.init = function() {
		gdrive.init(fileManager);
		dropbox.init(fileManager);
		
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
		$(".action-upload-gdrive-root").click(function() {
			uploadGdrive();
		});
		$(".action-upload-gdrive-select").click(function() {
			// This action is not available because picker does not support
			// folder selection yet
			gdrive.picker(function(ids) {
				if(ids !== undefined && ids.length !== 0) {
					uploadGdrive(ids[0]);
				}
			}, true);
		});
		$(".action-download-gdrive").click(function() {
			gdrive.picker(importGdrive);
		});
		$(".action-manual-gdrive").click(function(event) {
			var fileId = core.getInputValue($("#manual-gdrive-fileid"), event);
			manualGdrive(fileId);
		});
		$(".action-download-dropbox").click(function() {
			dropbox.picker(importDropbox);
		});
		$(".action-upload-dropbox").click(function(event) {
			var path = core.getInputValue($("#upload-dropbox-path"), event);
			manualDropbox(path);
		});
		$(".action-manual-dropbox").click(function(event) {
			var path = core.getInputValue($("#manual-dropbox-path"), event);
			manualDropbox(path);
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

		// Update the file titles
		this.updateFileTitles();
		refreshManageSync();
		
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
		var useDropbox = false;
		function composeTitle(fileIndex) {
			var result = " " + localStorage[fileIndex + ".title"];
			var sync = localStorage[fileIndex + ".sync"];
			if (sync.indexOf(";" + SYNC_PROVIDER_DROPBOX) !== -1) {
				useDropbox = true;
				result = '<i class="icon-dropbox"></i>' + result;
			}
			if (sync.indexOf(";" + SYNC_PROVIDER_GDRIVE) !== -1) {
				useGoogleDrive = true;
				result = '<i class="icon-gdrive"></i>' + result;
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
		synchronizer.useDropbox = useDropbox;
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
		// Remove Google Drive etag
		localStorage.removeItem(fileSyncIndex + ".etag");
		// Remove Dropbox version
		localStorage.removeItem(fileSyncIndex + ".version");
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

	function uploadGdrive(folderId) {
		var fileIndex = localStorage["file.current"];
		var content = localStorage[fileIndex + ".content"];
		var title = localStorage[fileIndex + ".title"];
		gdrive.upload(undefined, folderId, title, content, function(fileSyncIndex) {
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
	
	function importGdrive(ids) {
		if(ids === undefined) {
			return;
		}
		var importIds = [];
		for(var i=0; i<ids.length; i++) {
			var fileId = ids[i];
			var fileSyncIndex = SYNC_PROVIDER_GDRIVE + fileId;
			var fileIndex = fileManager.getFileIndexFromSync(fileSyncIndex);
			if(fileIndex !== undefined) {
				var title = localStorage[fileIndex + ".title"];
				core.showError('"' + title + '" was already imported');
				continue;
			}
			importIds.push(fileId);
		}
		gdrive.importFiles(importIds);
	}
	
	function manualGdrive(fileId) {
		if(!fileId) {
			return;
		}
		// Check that file is not synchronized with an other one
		var fileSyncIndex = SYNC_PROVIDER_GDRIVE + fileId;
		var fileIndex = fileManager.getFileIndexFromSync(fileSyncIndex);
		if(fileIndex !== undefined) {
			var title = localStorage[fileIndex + ".title"];
			core.showError('File ID is already synchronized with "' + title + '"');
			return;
		}
		var fileIndex = localStorage["file.current"];
		var title = localStorage[fileIndex + ".title"];
		gdrive.downloadMetadata([fileId], function(result) {
			if(result === undefined || result.length === 0) {
				return;
			}
			localStorage[fileSyncIndex + ".etag"] = result[0].etag;
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
	
	function manualDropbox(path) {
		if(!path) {
			return;
		}
		path = dropbox.checkPath(path);
		if(path === undefined) {
			return;
		}
		// Check that file is not synchronized with an other one
		var fileSyncIndex = SYNC_PROVIDER_DROPBOX + encodeURIComponent(path.toLowerCase());
		var fileIndex = fileManager.getFileIndexFromSync(fileSyncIndex);
		if(fileIndex !== undefined) {
			var title = localStorage[fileIndex + ".title"];
			core.showError('Path "' + path + '" is already synchronized with "' + title + '"');
			return;
		}
		var fileIndex = localStorage["file.current"];
		var content = localStorage[fileIndex + ".content"];
		var title = localStorage[fileIndex + ".title"];
		dropbox.upload(path, content, function(fileSyncIndex) {
			if (fileSyncIndex === undefined) {
				return;
			}
			localStorage[fileIndex + ".sync"] += fileSyncIndex + ";";
			refreshManageSync();
			fileManager.updateFileTitles();
			core.showMessage('"' + title
				+ '" will now be synchronized on Dropbox.');
		});
	}
	
	function importDropbox(paths) {
		if(paths === undefined) {
			return;
		}
		var importPaths = [];
		for(var i=0; i<paths.length; i++) {
			var filePath = paths[i];
			var fileSyncIndex = SYNC_PROVIDER_DROPBOX + encodeURIComponent(filePath.toLowerCase());
			var fileIndex = fileManager.getFileIndexFromSync(fileSyncIndex);
			if(fileIndex !== undefined) {
				var title = localStorage[fileIndex + ".title"];
				core.showError('"' + title + '" was already imported');
				continue;
			}
			importPaths.push(filePath);
		}
		dropbox.importFiles(importPaths);
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
						fileSyncIndex.substring(SYNC_PROVIDER_GDRIVE.length)));
				}
				if (fileSyncIndex.indexOf(SYNC_PROVIDER_DROPBOX) === 0) {
					line.append($("<span>").addClass("add-on").html(
					'<i class="icon-dropbox"></i>'));
					line.append($("<input>").prop("type", "text").prop(
						"disabled", true).addClass("span5").val(
							decodeURIComponent(fileSyncIndex.substring(SYNC_PROVIDER_DROPBOX.length))));
				}
				line.append($("<a>").addClass("btn").html(
					'<i class="icon-trash"></i>').prop("title",
					"Remove this location").click(function() {
					fileManager.removeSync(fileSyncIndex);
					fileManager.updateFileTitles();
				}));
				$("#manage-sync-list").append(line);
			})(fileSyncIndex);
		}
	}

	return fileManager;
});
