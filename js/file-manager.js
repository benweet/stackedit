define([
    "jquery",
    "core",
    "utils",
    "extension-manager",
    "synchronizer",
    "publisher",
    "sharing",
    "text!../WELCOME.md",
    "underscore"
], function($, core, utils, extensionManager, synchronizer, publisher, sharing, welcomeContent) {
	
	var fileManager = {};

	// Load file descriptors from localStorage and store in a map
	var fileSystemDescriptor = _.chain(localStorage["file.list"].split(";"))
		.compact()
		.reduce(function(fileSystemDescriptor, fileIndex) {
			var title = localStorage[fileIndex + ".title"];
			var fileDesc = {
				fileIndex : fileIndex,
				title : title,
				syncLocations: {},
				publishLocations: {}
			};
			synchronizer.populateSyncLocations(fileDesc),
			publisher.populatePublishLocations(fileDesc),
			fileSystemDescriptor[fileIndex] = fileDesc;
			return fileSystemDescriptor;
		}, {})
		.value();
	extensionManager.onFileSystemLoaded(fileSystemDescriptor);
	fileManager.getFileList = function() {
		return _.values(fileSystemDescriptor);
	};

	// Defines the current file
	var currentFile = (function() {
		var currentFileIndex = localStorage["file.current"];
		if(currentFileIndex !== undefined) {
			return fileSystemDescriptor[currentFileIndex];
		}
	})();
	fileManager.getCurrentFile = function() {
		return currentFile;
	};
	fileManager.isCurrentFile = function(fileDesc) {
		return fileDesc === currentFile;
	};
	fileManager.setCurrentFile = function(fileDesc) {
		currentFile = fileDesc;
		if(fileDesc === undefined) {
			localStorage.removeItem("file.current");
		}
		else if(fileDesc.fileIndex != TEMPORARY_FILE_INDEX) {
			localStorage["file.current"] = fileDesc.fileIndex;
		}
	};
	
	// Caution: this function recreate the editor (reset undo operations)
	fileManager.selectFile = function(fileDesc) {
		// If no file create one
		if (_.size(fileSystemDescriptor) === 0) {
			fileDesc = fileManager.createFile(WELCOME_DOCUMENT_TITLE, welcomeContent);
		}
		
		if(fileDesc === undefined) {
			// If no file is selected take the last created
			fileDesc = fileSystemDescriptor[_.keys(fileSystemDescriptor)[fileSystemDescriptor.length - 1]];
		}
		fileManager.setCurrentFile(fileDesc);

		// Update the file titles
		fileManager.updateFileTitles();
		publisher.notifyPublish();
		
		// Notify extensions
		extensionManager.onFileSelected(fileDesc);
		
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
			fileManager.saveFile();
		});
	};
	
	fileManager.createFile = function(title, content, syncLocations, isTemporary) {
		content = content !== undefined ? content : core.settings.defaultContent;
		syncLocations = syncLocations || {};
		if (!title) {
			// Create a file title 
			title = DEFAULT_FILE_TITLE;
			var indicator = 2;
			while(_.some(fileSystemDescriptor, function(fileDesc) {
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
			} while(_.has(fileSystemDescriptor, fileIndex));
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
			fileSystemDescriptor[fileIndex] = fileDesc;
			extensionManager.onFileCreated(fileDesc);
		}
		return fileDesc;
	};

	fileManager.deleteFile = function(fileDesc) {
		fileDesc = fileDesc || fileManager.getCurrentFile();
		if(fileManager.isCurrentFile(fileDesc)) {
			// Unset the current fileDesc
			fileManager.setCurrentFile();
		}

		// Remove synchronized locations
		_.each(fileDesc.syncLocations, function(syncAttributes) {
			fileManager.removeSync(syncAttributes, true);
		});
		
		// Remove publish locations
		_.each(fileDesc.publishLocations, function(publishAttributes) {
			fileManager.removePublish(publishAttributes, true);
		});

		// Remove the index from the file list
		var fileIndex = fileDesc.fileIndex;
		localStorage["file.list"] = localStorage["file.list"].replace(";"
			+ fileIndex + ";", ";");
		localStorage.removeItem(fileIndex + ".title");
		localStorage.removeItem(fileIndex + ".content");
		localStorage.removeItem(fileIndex + ".sync");
		localStorage.removeItem(fileIndex + ".publish");
		fileSystemDescriptor.removeItem(fileIndex);
		extensionManager.onFileDeleted(fileDesc);
	};

	// Save current file in localStorage
	fileManager.saveFile = function() {
		var content = $("#wmd-input").val();
		var fileDesc = fileManager.getCurrentFile();
		localStorage[fileDesc.fileIndex + ".content"] = content;
		extensionManager.onFileChanged(fileDesc);
		synchronizer.notifyChange(fileDesc);
	};

	// Add a synchronized location to a file
	fileManager.addSync = function(fileDesc, syncAttributes) {
		localStorage[fileDesc.fileIndex + ".sync"] += syncAttributes.syncIndex + ";";
		fileDesc.syncLocations[syncAttributes.syncIndex] = syncAttributes;
		// addSync is only used for export, not for import
		extensionManager.onSyncExportSuccess(fileDesc, syncAttributes);
	};
	
	// Remove a synchronized location
	fileManager.removeSync = function(syncAttributes, skipExtensions) {
		var fileDesc = fileManager.getFileFromSyncIndex(syncAttributes.syncIndex);
		if(fileDesc !== undefined) {
			localStorage[fileDesc.fileIndex + ".sync"] = localStorage[fileDesc.fileIndex + ".sync"].replace(";"
				+ syncAttributes.syncIndex + ";", ";");
		}
		// Remove sync attributes
		localStorage.removeItem(syncAttributes.syncIndex);
		fileDesc.syncLocations.removeItem(syncIndex);
		if(!skipExtensions) {
			extensionManager.onSyncRemoved(fileDesc, syncAttributes);
		}
	};
	
	// Get the file descriptor associated to a syncIndex
	fileManager.getFileFromSyncIndex = function(syncIndex) {
		return _.find(fileSystemDescriptor, function(fileDesc) {
			return _.has(fileDesc.syncLocations, syncIndex);
		});
	};
	
	// Get syncAttributes from syncIndex
	fileManager.getSyncAttributes = function(syncIndex) {
		var fileDesc = fileManager.getFileFromSyncIndex(syncIndex);
		return fileDesc && fileDesc.syncLocations[syncIndex];
	};
	
	// Returns true if provider has locations to synchronize
	fileManager.hasSync = function(provider) {
		return _.some(fileSystemDescriptor, function(fileDesc) {
			return _.some(fileDesc.syncLocations, function(syncAttributes) {
				syncAttributes.provider == provider.providerId;
			});
		});
	};

	// Add a publishIndex (publish location) to a file
	fileManager.addPublish = function(fileDesc, publishAttributes) {
		localStorage[fileDesc.fileIndex + ".publish"] += publishAttributes.publishIndex + ";";
		fileDesc.publishLocations[publishAttributes.publishIndex] = publishAttributes;
		extensionManager.onNewPublishSuccess(fileDesc, publishAttributes);
	};
	
	// Remove a publishIndex (publish location)
	fileManager.removePublish = function(publishAttributes, skipExtensions) {
		var fileDesc = fileManager.getFileFromPublish(publishAttributes.publishIndex);
		if(fileDesc !== undefined) {
			localStorage[fileDesc.fileIndex + ".publish"] = localStorage[fileDesc.fileIndex + ".publish"].replace(";"
				+ publishAttributes.publishIndex + ";", ";");
			if(fileManager.isCurrentFile(fileDesc)) {
				publisher.notifyPublish();
			}
		}
		// Remove publish attributes
		localStorage.removeItem(publishAttributes.publishIndex);
		fileDesc.publishLocations.removeItem(publishIndex);
		if(!skipExtensions) {
			extensionManager.onPublishRemoved(fileDesc, publishAttributes);
		}
	};
	
	// Get the file descriptor associated to a publishIndex
	fileManager.getFileFromPublish = function(publishIndex) {
		return _.find(fileSystemDescriptor, function(fileDesc) {
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
		fileManager.selectFile();

		$(".action-create-file").click(function() {
			var fileDesc = fileManager.createFile();
			fileManager.selectFile(fileDesc);
			var wmdInput = $("#wmd-input").focus().get(0);
			if(wmdInput.setSelectionRange) {
				wmdInput.setSelectionRange(0, 0);
			}
			$("#file-title").click();
		});
		$(".action-remove-file").click(function() {
			fileManager.deleteFile();
			fileManager.selectFile();
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
			var fileDesc = fileManager.getCurrentFile();
			var fileIndexTitle = fileDesc.fileIndex + ".title";
			if (title) {
				if (title != localStorage[fileIndexTitle]) {
					localStorage[fileIndexTitle] = title;
					fileDesc.title = title;
					fileManager.updateFileTitles();
					synchronizer.notifyChange(fileDesc);
					extensionManager.onTitleChanged(fileDesc);
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
			var title = fileManager.getCurrentFile().title;
			var fileDesc = fileManager.createFile(title, content);
			fileManager.selectFile(fileDesc);
			window.location.href = ".";
		});
		$(".action-download-md").click(function() {
			var content = $("#wmd-input").val();
			var title = fileManager.getCurrentFile().title;
			core.saveFile(content, title + ".md");
		});
		$(".action-download-html").click(function() {
			var content = $("#wmd-preview").html();
			var title = fileManager.getCurrentFile().title;
			core.saveFile(content, title + ".html");
		});		
		$(".action-download-template").click(function() {
			var content = publisher.applyTemplate();
			var title = fileManager.getCurrentFile().title;
			core.saveFile(content, title + ".txt");
		});
		$(".action-welcome-file").click(function() {
			var fileDesc = fileManager.createFile(WELCOME_DOCUMENT_TITLE, welcomeContent);
			fileManager.selectFile(fileDesc);
		});
	});

	core.setFileManager(fileManager);
	extensionManager.onFileManagerCreated(fileManager);
	return fileManager;
});
