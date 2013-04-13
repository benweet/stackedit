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
		refreshManagePublish();
		publisher.notifyCurrentFile();
		
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
		fileDescList = _.chain(localStorage["file.list"].split(";"))
			.compact()
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
		for ( var i = 0; i < fileDescList.length; i++) {
			var fileDesc = fileDescList[i];
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
		}
		synchronizer.useGoogleDrive = useGoogleDrive;
		synchronizer.useDropbox = useDropbox;
	};

	// Remove a synchronized location
	fileManager.removeSync = function(syncIndex) {
		var currentFileIndex = fileManager.getCurrentFileIndex();
		var fileIndex = this.getFileIndexFromSync(syncIndex);
		if(fileIndex !== undefined) {
			localStorage[fileIndex + ".sync"] = localStorage[fileIndex + ".sync"].replace(";"
				+ syncIndex + ";", ";");
			if(fileIndex == currentFileIndex) {
				refreshManageSync();
			}
		}
		// Remove ETAG, version, CRCs (if any) 
		localStorage.removeItem(syncIndex + ".etag");
		localStorage.removeItem(syncIndex + ".version");
		localStorage.removeItem(syncIndex + ".contentCRC");
		localStorage.removeItem(syncIndex + ".titleCRC");
	};
	
	// Look for local file associated to a synchronized location 
	fileManager.getFileIndexFromSync = function(syncIndex) {
		var fileIndexList = localStorage["file.list"].split(";");
		for ( var i = 1; i < fileIndexList.length - 1; i++) {
			var fileIndex = fileIndexList[i];
			var sync = localStorage[fileIndex + ".sync"];
			if (sync.indexOf(";" + syncIndex + ";") !== -1) {
				return fileIndex;
			}
		}
		return undefined;
	};

	// Remove a publish location
	fileManager.removePublish = function(publishIndex) {
		var currentFileIndex = fileManager.getCurrentFileIndex();
		var fileIndex = this.getFileIndexFromPublish(publishIndex);
		if(fileIndex !== undefined) {
			localStorage[fileIndex + ".publish"] = localStorage[fileIndex + ".publish"].replace(";"
				+ publishIndex + ";", ";");
			if(fileIndex == currentFileIndex) {
				refreshManagePublish();
			}
		}
		// Remove publish object
		localStorage.removeItem(publishIndex);
		publisher.notifyCurrentFile();
	};
	
	// Look for local file associated to a publish location 
	fileManager.getFileIndexFromPublish = function(publishIndex) {
		var fileIndexList = localStorage["file.list"].split(";");
		for ( var i = 1; i < fileIndexList.length - 1; i++) {
			var fileIndex = fileIndexList[i];
			var publish = localStorage[fileIndex + ".publish"];
			if (publish.indexOf(";" + publishIndex + ";") !== -1) {
				return fileIndex;
			}
		}
		return undefined;
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
		var syncIndexList = localStorage[fileIndex + ".sync"].split(";");
		$(".msg-no-sync, .msg-sync-list").addClass("hide");
		$("#manage-sync-list .input-append").remove();
		if (syncIndexList.length > 2) {
			$(".msg-sync-list").removeClass("hide");
		} else {
			$(".msg-no-sync").removeClass("hide");
		}
		for ( var i = 1; i < syncIndexList.length - 1; i++) {
			var syncIndex = syncIndexList[i];
			(function(syncIndex) {
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
			})(syncIndex);
		}
	}
	
	function refreshManagePublish() {
		var fileIndex = fileManager.getCurrentFileIndex();
		var publishIndexList = localStorage[fileIndex + ".publish"].split(";");
		$(".msg-no-publish, .msg-publish-list").addClass("hide");
		$("#manage-publish-list .input-append").remove();
		if (publishIndexList.length > 2) {
			$(".msg-publish-list").removeClass("hide");
		} else {
			$(".msg-no-publish").removeClass("hide");
		}
		for ( var i = 1; i < publishIndexList.length - 1; i++) {
			var publishIndex = publishIndexList[i];
			var serializedObject = localStorage[publishIndex];
			(function(publishIndex, publishObject, serializedObject) {
				var line = $("<div>").addClass("input-prepend input-append");
				if (publishObject.provider == PUBLISH_PROVIDER_GITHUB) {
					line.append($("<span>").addClass("add-on").prop("title", "GitHub").html(
					'<i class="icon-github"></i>'));
					line.append($("<input>").prop("type", "text").prop(
						"disabled", true).addClass("span5").val(
							serializedObject));
				}
				else if (publishObject.provider == PUBLISH_PROVIDER_BLOGGER) {
					line.append($("<span>").addClass("add-on").prop("title", "Blogger").html(
					'<i class="icon-blogger"></i>'));
					line.append($("<input>").prop("type", "text").prop(
						"disabled", true).addClass("span5").val(
							serializedObject));
				}
				line.append($("<a>").addClass("btn").html(
				'<i class="icon-trash"></i>').prop("title",
				"Remove this location").click(function() {
					fileManager.removePublish(publishIndex);
				}));
				$("#manage-publish-list").append(line);
			})(publishIndex, JSON.parse(serializedObject), serializedObject.replace(/{|}|"/g, ""));
		}
	}
	
	// Initialize the "New publication" dialog
	var newPublishProvider = undefined;
	function initNewPublish(provider, defaultPublishFormat) {
		defaultPublishFormat = defaultPublishFormat || "markdown";
		newPublishProvider = provider;
		
		// Show/hide controls depending on provider
		$('div[class*=" modal-publish-"]').hide().filter(".modal-publish-" + provider).show();
		
		// Reset fields
		core.resetModalInputs();
		$("input:radio[name=radio-publish-format][value=" + defaultPublishFormat + "]").prop("checked", true);
		
		// Open dialog box
		$("#modal-publish").modal();
	}
	
	// Generate a publishIndex, store a publishObject and associate it to a fileIndex
	function createPublishIndex(publishObject, fileIndex) {
		var publishIndex = undefined;
		do {
			publishIndex = "publish." + core.randomString();
		} while(localStorage[publishIndex] !== undefined);
		localStorage[publishIndex] = JSON.stringify(publishObject);
		localStorage[fileIndex + ".publish"] += publishIndex + ";";
	}
	
	// Create a new publication on GitHub
	function newPublishGithub(event) {
		var publishObject = {};
		publishObject.repository = core.getInputValue($("#input-publish-github-reponame"), event);
		publishObject.branch = core.getInputValue($("#input-publish-github-branch"), event);
		publishObject.path = core.getInputValue($("#input-publish-github-path"), event);
		publishObject.provider = newPublishProvider;
		if(event.isPropagationStopped()) {
			return;
		}
		
		var fileIndex = fileManager.getCurrentFileIndex();
		var title = localStorage[fileIndex + ".title"];
		var content = publisher.getPublishContent(publishObject);
		var commitMsg = core.settings.commitMsg;
		githubHelper.upload(publishObject.repository,
			publishObject.branch, publishObject.path, content, commitMsg,
			function(error) {					
				if(error === undefined) {
					createPublishIndex(publishObject, fileIndex);
					refreshManagePublish();
					publisher.notifyCurrentFile();
					core.showMessage('"' + title
						+ '" will now be published on GitHub.');
				}
		});
	}
	
	// Create a new publication on Blogger
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
			initNewPublish(PUBLISH_PROVIDER_GITHUB);
		});
		$(".action-publish-blogger").click(function() {
			initNewPublish(PUBLISH_PROVIDER_BLOGGER, "html");
		});
		$(".action-process-publish").click(function(e) {
			if(newPublishProvider == PUBLISH_PROVIDER_GITHUB) {
				newPublishGithub(e);
			}
			else if(newPublishProvider == PUBLISH_PROVIDER_BLOGGER) {
				newPublishBlogger(e);
			}
		});
	};

	return fileManager;
});
