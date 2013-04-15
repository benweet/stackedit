define(["jquery", "google-helper", "dropbox-helper", "github-helper", "synchronizer", "publisher", "underscore"],
	function($, googleHelper, dropboxHelper, githubHelper, synchronizer, publisher) {

	var fileManager = {};

	// Dependencies
	var core = undefined;
	
	// Defines the current file
	var currentFileIndex = localStorage["file.current"];
	fileManager.getCurrentFileIndex = function() {
		return currentFileIndex;
	};
	fileManager.isCurrentFileIndex = function(fileIndex) {
		return fileIndex == currentFileIndex;
	};
	fileManager.setCurrentFileIndex = function(fileIndex) {
		currentFileIndex = fileIndex;
		// Sanity check since we are going to modify current file in localStorage
		core.checkWindowUnique();
		if(fileIndex === undefined) {
			localStorage.removeItem("file.current");
		}
		else {
			localStorage["file.current"] = fileIndex;
		}
	};
	
	// Caution: this function recreate the editor (reset undo operations)
	var fileDescList = [];
	fileManager.selectFile = function(fileIndex) {
		// If no file create one
		if (localStorage["file.list"].length === 1) {
			fileIndex = this.createFile();
		}
		
		if(fileIndex !== undefined) {
			fileManager.setCurrentFileIndex(fileIndex);
		}

		// Update the file titles
		fileManager.updateFileTitles();
		refreshManageSync();
		publisher.notifyPublish();
		
		// Recreate the editor
		fileIndex = fileManager.getCurrentFileIndex();
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
			var indicator = 2;
			while(_.some(fileDescList, function(fileDesc) {
				return fileDesc.title == title;
			})) {
				title = DEFAULT_FILE_TITLE + indicator++;
			}
		}
		
		// Generate a unique fileIndex
		var fileIndex = undefined;
		do {
			fileIndex = "file." + core.randomString();
		} while(_.has(localStorage, fileIndex + ".title"));
		
		// Create the file in the localStorage
		localStorage[fileIndex + ".content"] = content;
		localStorage[fileIndex + ".title"] = title;
		var sync = _.reduce(syncIndexes, function(sync, syncIndex) {
			return sync + syncIndex + ";";
		}, ";");
		localStorage[fileIndex + ".sync"] = sync;
		localStorage[fileIndex + ".publish"] = ";";
		localStorage["file.list"] += fileIndex + ";";
		return fileIndex;
	};

	fileManager.deleteFile = function(fileIndex) {
		fileIndex = fileIndex || fileManager.getCurrentFileIndex();
		if(fileManager.isCurrentFileIndex(fileIndex)) {
			// Unset the current fileIndex
			fileManager.setCurrentFileIndex();
		}

		// Remove synchronized locations
		var syncIndexList = _.compact(localStorage[fileIndex + ".sync"].split(";"));
		localStorage.removeItem(fileIndex + ".sync");
		_.each(syncIndexList, function(syncIndex) {
			fileManager.removeSync(syncIndex);
		});
		
		// Remove publish locations
		var publishIndexList = _.compact(localStorage[fileIndex + ".publish"].split(";"));
		localStorage.removeItem(fileIndex + ".publish");
		_.each(publishIndexList, function(publishIndex) {
			fileManager.removePublish(publishIndex);
		});

		localStorage["file.list"] = localStorage["file.list"].replace(";"
			+ fileIndex + ";", ";");
		localStorage.removeItem(fileIndex + ".title");
		localStorage.removeItem(fileIndex + ".content");
	};

	fileManager.saveFile = function() {
		var content = $("#wmd-input").val();
		var fileIndex = fileManager.getCurrentFileIndex();
		localStorage[fileIndex + ".content"] = content;
		synchronizer.notifyChange(fileIndex);
	};
	
	fileManager.updateFileTitles = function() {
		$("#file-selector").empty();
		fileDescList = _.chain(localStorage["file.list"].split(";")).compact()
			.reduce(function(fileDescList, fileIndex) {
				var title = localStorage[fileIndex + ".title"];
				fileDescList.push({ index : fileIndex, title : title });
				return fileDescList;
			}, [])
			.sortBy(function(fileDesc) {
				return fileDesc.title.toLowerCase();
			}).value();

		var fileIndex = fileManager.getCurrentFileIndex();
		// If no default file take first one
		if (fileIndex === undefined) {
			fileIndex = fileDescList[0].index;
			fileManager.setCurrentFileIndex(fileIndex);
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
		_.each(fileDescList, function(fileDesc) {
			var a = $("<a>").html(composeTitle(fileDesc.index));
			var li = $("<li>").append(a);
			if (fileDesc.index == fileIndex) {
				li.addClass("disabled");
			} else {
				a.prop("href", "#").click((function(fileIndex) {
					return function() {
						fileManager.selectFile(fileIndex);
					};
				})(fileDesc.index));
			}
			$("#file-selector").append(li);			
		});
		synchronizer.useGoogleDrive = useGoogleDrive;
		synchronizer.useDropbox = useDropbox;
	};

	// Remove a syncIndex (synchronized location)
	fileManager.removeSync = function(syncIndex) {
		var fileIndex = fileManager.getFileIndexFromSync(syncIndex);
		if(fileIndex !== undefined) {
			localStorage[fileIndex + ".sync"] = localStorage[fileIndex + ".sync"].replace(";"
				+ syncIndex + ";", ";");
			if(fileManager.isCurrentFileIndex(fileIndex)) {
				refreshManageSync();
			}
		}
		// Remove ETAG, version, CRCs (if any) 
		localStorage.removeItem(syncIndex + ".etag");
		localStorage.removeItem(syncIndex + ".version");
		localStorage.removeItem(syncIndex + ".contentCRC");
		localStorage.removeItem(syncIndex + ".titleCRC");
	};
	
	// Get the fileIndex associated to a syncIndex
	fileManager.getFileIndexFromSync = function(syncIndex) {
		return _.chain(localStorage["file.list"].split(";")).compact()
			.find(function(fileIndex) {
				var sync = localStorage[fileIndex + ".sync"];
				return sync.indexOf(";" + syncIndex + ";") !== -1;
			}).value();
	};

	// Remove a publishIndex (publish location)
	fileManager.removePublish = function(publishIndex) {
		var fileIndex = fileManager.getFileIndexFromPublish(publishIndex);
		if(fileIndex !== undefined) {
			localStorage[fileIndex + ".publish"] = localStorage[fileIndex + ".publish"].replace(";"
				+ publishIndex + ";", ";");
			if(fileManager.isCurrentFileIndex(fileIndex)) {
				publisher.notifyPublish();
			}
		}
		// Remove publish object
		localStorage.removeItem(publishIndex);
	};
	
	// Get the fileIndex associated to a publishIndex
	fileManager.getFileIndexFromPublish = function(publishIndex) {
		return _.chain(localStorage["file.list"].split(";")).compact()
			.find(function(fileIndex) {
				var sync = localStorage[fileIndex + ".publish"];
				return sync.indexOf(";" + publishIndex + ";") !== -1;
			}).value();
	};
	
	function uploadGdrive(fileId, folderId) {
		var fileIndex = fileManager.getCurrentFileIndex();
		var content = localStorage[fileIndex + ".content"];
		var title = localStorage[fileIndex + ".title"];
		googleHelper.upload(fileId, folderId, title, content, function(syncIndex) {
			if (syncIndex === undefined) {
				return;
			}
			var contentCRC = core.crc32(content);
			localStorage[syncIndex + ".contentCRC"] = contentCRC;
			var titleCRC = core.crc32(title);
			localStorage[syncIndex + ".titleCRC"] = titleCRC;
			localStorage[fileIndex + ".sync"] += syncIndex + ";";
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
		var syncIndex = SYNC_PROVIDER_GDRIVE + fileId;
		var fileIndex = fileManager.getFileIndexFromSync(syncIndex);
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
			var syncIndex = SYNC_PROVIDER_GDRIVE + fileId;
			var fileIndex = fileManager.getFileIndexFromSync(syncIndex);
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
		var syncIndex = SYNC_PROVIDER_DROPBOX + encodeURIComponent(path.toLowerCase());
		var fileIndex = fileManager.getFileIndexFromSync(syncIndex);
		if(fileIndex !== undefined) {
			var title = localStorage[fileIndex + ".title"];
			core.showError('Path "' + path + '" is already synchronized with "' + title + '"');
			return;
		}
		var fileIndex = fileManager.getCurrentFileIndex();
		var content = localStorage[fileIndex + ".content"];
		var title = localStorage[fileIndex + ".title"];
		dropboxHelper.upload(path, content, function(syncIndex) {
			if (syncIndex === undefined) {
				return;
			}
			var contentCRC = core.crc32(content);
			localStorage[syncIndex + ".contentCRC"] = contentCRC;
			localStorage[fileIndex + ".sync"] += syncIndex + ";";
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
			var syncIndex = SYNC_PROVIDER_DROPBOX + encodeURIComponent(filePath.toLowerCase());
			var fileIndex = fileManager.getFileIndexFromSync(syncIndex);
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
		var fileIndex = fileManager.getCurrentFileIndex();
		var syncIndexList = _.compact(localStorage[fileIndex + ".sync"].split(";"));
		$(".msg-no-sync, .msg-sync-list").addClass("hide");
		$("#manage-sync-list .input-append").remove();
		if (syncIndexList.length > 0) {
			$(".msg-sync-list").removeClass("hide");
		} else {
			$(".msg-no-sync").removeClass("hide");
		}
		_.each(syncIndexList, function(syncIndex) {
			var line = $("<div>").addClass("input-prepend input-append");
			if (syncIndex.indexOf(SYNC_PROVIDER_GDRIVE) === 0) {
				line.append($("<span>").addClass("add-on").prop("title", "Google Drive").html(
					'<i class="icon-gdrive"></i>'));
				line.append($("<input>").prop("type", "text").prop(
					"disabled", true).addClass("span5").val(
					syncIndex.substring(SYNC_PROVIDER_GDRIVE.length)));
			}
			else if (syncIndex.indexOf(SYNC_PROVIDER_DROPBOX) === 0) {
				line.append($("<span>").addClass("add-on").prop("title", "Dropbox").html(
				'<i class="icon-dropbox"></i>'));
				line.append($("<input>").prop("type", "text").prop(
					"disabled", true).addClass("span5").val(
						decodeURIComponent(syncIndex.substring(SYNC_PROVIDER_DROPBOX.length))));
			}
			line.append($("<a>").addClass("btn").html(
				'<i class="icon-trash"></i>').prop("title",
				"Remove this location").click(function() {
				fileManager.removeSync(syncIndex);
				fileManager.updateFileTitles();
			}));
			$("#manage-sync-list").append(line);
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
				var fileIndexTitle = fileManager.getCurrentFileIndex() + ".title";
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
		$(".action-download-template").click(
			function() {
				var content = publisher.applyTemplate();
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
	};

	return fileManager;
});
