define(["jquery", "google-helper", "dropbox-helper", "synchronizer", "publisher"],
	function($, googleHelper, dropboxHelper, synchronizer, publisher) {

	var fileManager = {};

	// Dependencies
	var core = undefined;
	
	// Caution: this function recreate the editor (reset undo operations)
	var fileDescList = [];
	fileManager.selectFile = function(fileIndex) {
		// If no file create one
		if (localStorage["file.list"].length === 1) {
			fileIndex = this.createFile();
		}
		
		if(fileIndex !== undefined) {
			// Since we are going to modify current file
			core.checkWindowUnique();
			localStorage["file.current"] = fileIndex;
		}

		// Update the file titles
		fileManager.updateFileTitles();
		refreshManageSync();
		publisher.notifyCurrentFile(localStorage["file.current"]);
		
		// Recreate the editor
		fileIndex = localStorage["file.current"];
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
		localStorage[fileIndex + ".publish"] = ";";
		localStorage["file.counter"] = fileCounter + 1;
		localStorage["file.list"] += fileIndex + ";";
		return fileIndex;
	};

	fileManager.deleteFile = function(fileIndex) {
		var fileIndexCurrent = localStorage["file.current"];
		fileIndex = fileIndex || fileIndexCurrent;
		if(fileIndex == fileIndexCurrent) {
			// Since we are going to modify current file
			core.checkWindowUnique();
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
		synchronizer.notifyChange(fileIndex);
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
			// Since we are going to modify current file
			core.checkWindowUnique();
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
						// Since we are going to modify current file
						core.checkWindowUnique();
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
		// Remove ETAG, version, CRCs (if any) 
		localStorage.removeItem(fileSyncIndex + ".etag");
		localStorage.removeItem(fileSyncIndex + ".version");
		localStorage.removeItem(fileSyncIndex + ".contentCRC");
		localStorage.removeItem(fileSyncIndex + ".titleCRC");
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

	function uploadGdrive(fileId, folderId) {
		var fileIndex = localStorage["file.current"];
		var content = localStorage[fileIndex + ".content"];
		var title = localStorage[fileIndex + ".title"];
		googleHelper.upload(fileId, folderId, title, content, function(fileSyncIndex) {
			if (fileSyncIndex === undefined) {
				return;
			}
			var contentCRC = core.crc32(content);
			localStorage[fileSyncIndex + ".contentCRC"] = contentCRC;
			var titleCRC = core.crc32(title);
			localStorage[fileSyncIndex + ".titleCRC"] = titleCRC;
			localStorage[fileIndex + ".sync"] += fileSyncIndex + ";";
			refreshManageSync();
			fileManager.updateFileTitles();
			core.showMessage('"' + title
				+ '" will now be synchronized on Google Drive.');
		});
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
		uploadGdrive(fileId);
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
		googleHelper.importFiles(importIds);
	}
	
	function manualDropbox(path) {
		if(!path) {
			return;
		}
		path = dropboxHelper.checkPath(path);
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
		dropboxHelper.upload(path, content, function(fileSyncIndex) {
			if (fileSyncIndex === undefined) {
				return;
			}
			var contentCRC = core.crc32(content);
			localStorage[fileSyncIndex + ".contentCRC"] = contentCRC;
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
		dropboxHelper.importFiles(importPaths);
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
	
	
	// Initialize the "New publication" dialog
	var newPublishProvider = undefined;
	function initNewPublish(provider, defaultPublishFormat) {
		defaultPublishFormat = defaultPublishFormat || "markdown";
		newPublishProvider = provider;
		
		// Show/hide controls depending on provider
		$('div[class*=" control-publish-"]').hide().filter(".control-publish-" + provider).show();
		
		// Reset fields
		core.resetModalInputs();
		$("input:radio[name=radio-publish-format][value=" + defaultPublishFormat + "]").prop("checked", true);
		
		// Open dialog box
		$("#modal-publish").modal();
	}
	
	// Create a new publication
	function newPublishBlogger(event) {
		var blogUrl = core.getInputValue($("#input-publish-blogger-url"), event);
		if(event.isPropagationStopped()) {
			return;
		}
		
		googleHelper.getBlogByUrl(blogUrl, function(blog) {
			console.log(blog);
		});
		
	}

	fileManager.init = function(coreModule) {
		core = coreModule;
		
		fileManager.selectFile();

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
		
		// Synchronize actions
		$(".action-upload-gdrive-root").click(function() {
			uploadGdrive();
		});
		$(".action-upload-gdrive-select").click(function() {
			// This action is not available because picker does not support
			// folder selection
			googleHelper.picker(function(ids) {
				if(ids !== undefined && ids.length !== 0) {
					uploadGdrive(undefined, ids[0]);
				}
			}, true);
		});
		$(".action-download-gdrive").click(function() {
			googleHelper.picker(importGdrive);
		});
		$(".action-manual-gdrive").click(function(event) {
			var fileId = core.getInputValue($("#manual-gdrive-fileid"), event);
			manualGdrive(fileId);
		});
		$(".action-download-dropbox").click(function() {
			dropboxHelper.picker(importDropbox);
		});
		$(".action-upload-dropbox").click(function(event) {
			var path = core.getInputValue($("#upload-dropbox-path"), event);
			manualDropbox(path);
		});
		$(".action-manual-dropbox").click(function(event) {
			var path = core.getInputValue($("#manual-dropbox-path"), event);
			manualDropbox(path);
		});
		
		// Publish actions
		$(".action-publish-github").click(function() {
			initNewPublish("github");
		});
		$(".action-publish-blogger").click(function() {
			initNewPublish("blogger", "html");
		});
		$(".action-process-publish").click(function(e) {
			if(newPublishProvider == "blogger") {
				newPublishBlogger(e);
			}
		});
	};

	return fileManager;
});
