define([
    "jquery",
    "underscore",
    "core",
    "utils",
    "settings",
    "extension-manager",
    "file-system",
    "lib/text!../WELCOME.md"
], function($, _, core, utils, settings, extensionMgr, fileSystem, welcomeContent) {
	
	var fileMgr = {};

	// Defines the current file
	var currentFile = (function() {
		var fileIndex = localStorage["file.current"];
		if(fileIndex !== undefined) {
			return fileSystem[fileIndex];
		}
	})();
	fileMgr.getCurrentFile = function() {
		return currentFile;
	};
	fileMgr.isCurrentFile = function(fileDesc) {
		return fileDesc === currentFile;
	};
	fileMgr.setCurrentFile = function(fileDesc) {
		currentFile = fileDesc;
		if(fileDesc === undefined) {
			localStorage.removeItem("file.current");
		}
		else if(fileDesc.fileIndex != TEMPORARY_FILE_INDEX) {
			localStorage["file.current"] = fileDesc.fileIndex;
		}
	};
	
	// Caution: this function recreate the editor (reset undo operations)
	fileMgr.selectFile = function(fileDesc) {
		fileDesc = fileDesc || fileMgr.getCurrentFile();
		
		if(fileDesc === undefined) {
			var fileSystemSize = _.size(fileSystem);
			// If fileSystem empty create one file
			if (fileSystemSize === 0) {
				fileDesc = fileMgr.createFile(WELCOME_DOCUMENT_TITLE, welcomeContent);
			}			
			// If no file is selected take the last created
			else {
				fileDesc = fileSystem[_.keys(fileSystem)[fileSystemSize - 1]];
			}
		}
		fileMgr.setCurrentFile(fileDesc);

		// Notify extensions
		extensionMgr.onFileSelected(fileDesc);
		
		// Hide the viewer pencil button
		if(fileDesc.fileIndex == TEMPORARY_FILE_INDEX) {
			$(".action-edit-document").removeClass("hide");
		}
		else {
			$(".action-edit-document").addClass("hide");
		}
		
		// Recreate the editor
		$("#wmd-input").val(localStorage[fileDesc.fileIndex + ".content"]);
		core.createEditor(function() {
			// Callback to save content when textarea changes
			fileMgr.saveFile();
		});
	};
	
	fileMgr.createFile = function(title, content, syncLocations, isTemporary) {
		content = content !== undefined ? content : settings.defaultContent;
		syncLocations = syncLocations || {};
		if (!title) {
			// Create a file title 
			title = DEFAULT_FILE_TITLE;
			var indicator = 2;
			while(_.some(fileSystem, function(fileDesc) {
				return fileDesc.title == title;
			})) {
				title = DEFAULT_FILE_TITLE + indicator++;
			}
		}
		
		// Generate a unique fileIndex
		var fileIndex = TEMPORARY_FILE_INDEX;
		if(!isTemporary) {
			do {
				fileIndex = "file." + utils.randomString();
			} while(_.has(fileSystem, fileIndex));
		}
		
		// Create the file in the localStorage
		localStorage[fileIndex + ".content"] = content;
		localStorage[fileIndex + ".title"] = title;
		// Store syncIndexes associated to the file
		var sync = _.reduce(syncLocations, function(sync, syncAttributes, syncIndex) {
			return sync + syncIndex + ";";
		}, ";");
		localStorage[fileIndex + ".sync"] = sync;
		// Store publishIndexes associated to the file
		localStorage[fileIndex + ".publish"] = ";";
		
		// Create the file descriptor
		var fileDesc = {
			fileIndex : fileIndex,
			title : title,
			syncLocations: syncLocations,
			publishLocations: {}
		};
		
		// Add the index to the file list
		if(!isTemporary) {
			localStorage["file.list"] += fileIndex + ";";
			fileSystem[fileIndex] = fileDesc;
			extensionMgr.onFileCreated(fileDesc);
		}
		return fileDesc;
	};

	fileMgr.deleteFile = function(fileDesc) {
		fileDesc = fileDesc || fileMgr.getCurrentFile();
		if(fileMgr.isCurrentFile(fileDesc)) {
			// Unset the current fileDesc
			fileMgr.setCurrentFile();
		}

		// Remove synchronized locations
		_.each(fileDesc.syncLocations, function(syncAttributes) {
			fileMgr.removeSync(syncAttributes, true);
		});
		
		// Remove publish locations
		_.each(fileDesc.publishLocations, function(publishAttributes) {
			fileMgr.removePublish(publishAttributes, true);
		});

		// Remove the index from the file list
		var fileIndex = fileDesc.fileIndex;
		localStorage["file.list"] = localStorage["file.list"].replace(";"
			+ fileIndex + ";", ";");
		localStorage.removeItem(fileIndex + ".title");
		localStorage.removeItem(fileIndex + ".content");
		localStorage.removeItem(fileIndex + ".sync");
		localStorage.removeItem(fileIndex + ".publish");
		fileSystem.removeItem(fileIndex);
		extensionMgr.onFileDeleted(fileDesc);
	};

	// Save current file in localStorage
	fileMgr.saveFile = function() {
		var content = $("#wmd-input").val();
		var fileDesc = fileMgr.getCurrentFile();
		localStorage[fileDesc.fileIndex + ".content"] = content;
		extensionMgr.onFileChanged(fileDesc);
	};

	// Add a synchronized location to a file
	fileMgr.addSync = function(fileDesc, syncAttributes) {
		localStorage[fileDesc.fileIndex + ".sync"] += syncAttributes.syncIndex + ";";
		fileDesc.syncLocations[syncAttributes.syncIndex] = syncAttributes;
		// addSync is only used for export, not for import
		extensionMgr.onSyncExportSuccess(fileDesc, syncAttributes);
	};
	
	// Remove a synchronized location
	fileMgr.removeSync = function(syncAttributes, skipExtensions) {
		var fileDesc = fileMgr.getFileFromSyncIndex(syncAttributes.syncIndex);
		if(fileDesc !== undefined) {
			localStorage[fileDesc.fileIndex + ".sync"] = localStorage[fileDesc.fileIndex + ".sync"].replace(";"
				+ syncAttributes.syncIndex + ";", ";");
		}
		// Remove sync attributes
		localStorage.removeItem(syncAttributes.syncIndex);
		fileDesc.syncLocations.removeItem(syncIndex);
		if(!skipExtensions) {
			extensionMgr.onSyncRemoved(fileDesc, syncAttributes);
		}
	};
	
	// Get the file descriptor associated to a syncIndex
	fileMgr.getFileFromSyncIndex = function(syncIndex) {
		return _.find(fileSystem, function(fileDesc) {
			return _.has(fileDesc.syncLocations, syncIndex);
		});
	};
	
	// Get syncAttributes from syncIndex
	fileMgr.getSyncAttributes = function(syncIndex) {
		var fileDesc = fileMgr.getFileFromSyncIndex(syncIndex);
		return fileDesc && fileDesc.syncLocations[syncIndex];
	};
	
	// Returns true if provider has locations to synchronize
	fileMgr.hasSync = function(provider) {
		return _.some(fileSystem, function(fileDesc) {
			return _.some(fileDesc.syncLocations, function(syncAttributes) {
				return syncAttributes.provider === provider;
			});
		});
	};

	// Add a publishIndex (publish location) to a file
	fileMgr.addPublish = function(fileDesc, publishAttributes) {
		localStorage[fileDesc.fileIndex + ".publish"] += publishAttributes.publishIndex + ";";
		fileDesc.publishLocations[publishAttributes.publishIndex] = publishAttributes;
		extensionMgr.onNewPublishSuccess(fileDesc, publishAttributes);
	};
	
	// Remove a publishIndex (publish location)
	fileMgr.removePublish = function(publishAttributes, skipExtensions) {
		var fileDesc = fileMgr.getFileFromPublish(publishAttributes.publishIndex);
		if(fileDesc !== undefined) {
			localStorage[fileDesc.fileIndex + ".publish"] = localStorage[fileDesc.fileIndex + ".publish"].replace(";"
				+ publishAttributes.publishIndex + ";", ";");
		}
		// Remove publish attributes
		localStorage.removeItem(publishAttributes.publishIndex);
		fileDesc.publishLocations.removeItem(publishIndex);
		if(!skipExtensions) {
			extensionMgr.onPublishRemoved(fileDesc, publishAttributes);
		}
	};
	
	// Get the file descriptor associated to a publishIndex
	fileMgr.getFileFromPublish = function(publishIndex) {
		return _.find(fileSystem, function(fileDesc) {
			return _.has(fileDesc.publishLocations, publishIndex);
		});
	};
	
	// Filter for search input in file selector
	function filterFileSelector(filter) {
		var liList = $("#file-selector li:not(.stick)");
		liList.show();
		if(filter) {
			var words = filter.toLowerCase().split(/\s+/);
			liList.each(function() {
				var fileTitle = $(this).text().toLowerCase();
				if(_.some(words, function(word) {
					return fileTitle.indexOf(word) === -1;
				})) {
					$(this).hide();
				}
			});
		}
	}
	
	core.onReady(function() {
		
		fileMgr.selectFile();

		$(".action-create-file").click(function() {
			var fileDesc = fileMgr.createFile();
			fileMgr.selectFile(fileDesc);
			var wmdInput = $("#wmd-input").focus().get(0);
			if(wmdInput.setSelectionRange) {
				wmdInput.setSelectionRange(0, 0);
			}
			$("#file-title").click();
		});
		$(".action-remove-file").click(function() {
			fileMgr.deleteFile();
			fileMgr.selectFile();
		});
		$("#file-title").click(function() {
			if(viewerMode === true) {
				return;
			}
			$(this).hide();
			var fileTitleInput = $("#file-title-input").show();
			_.defer(function() {
				fileTitleInput.focus().get(0).select();
			});
		});
		function applyTitle(input) {
			input.hide();
			$("#file-title").show();
			var title = $.trim(input.val());
			var fileDesc = fileMgr.getCurrentFile();
			var fileIndexTitle = fileDesc.fileIndex + ".title";
			if (title) {
				if (title != localStorage[fileIndexTitle]) {
					localStorage[fileIndexTitle] = title;
					fileDesc.title = title;
					extensionMgr.onTitleChanged(fileDesc);
				}
			}
			input.val(localStorage[fileIndexTitle]);
			$("#wmd-input").focus();
		}
		$("#file-title-input").blur(function() {
			applyTitle($(this));
		}).keyup(function(e) {
			if (e.keyCode == 13) {
				applyTitle($(this));
			}
			if (e.keyCode == 27) {
				$(this).val("");
				applyTitle($(this));
			}
		});
		$(".action-open-file").click(function() {
			filterFileSelector();
			_.defer(function() {
				$("#file-search").val("").focus();
			});
		});
		$("#file-search").keyup(function() {
			filterFileSelector($(this).val());
		}).click(function(event) {
			event.stopPropagation();
		});
		$(".action-open-stackedit").click(function() {
			window.location.href = ".";
		});
		$(".action-edit-document").click(function() {
			var content = $("#wmd-input").val();
			var title = fileMgr.getCurrentFile().title;
			var fileDesc = fileMgr.createFile(title, content);
			fileMgr.selectFile(fileDesc);
			window.location.href = ".";
		});
		$(".action-welcome-file").click(function() {
			var fileDesc = fileMgr.createFile(WELCOME_DOCUMENT_TITLE, welcomeContent);
			fileMgr.selectFile(fileDesc);
		});
	});

	extensionMgr.onFileMgrCreated(fileMgr);
	return fileMgr;
});
