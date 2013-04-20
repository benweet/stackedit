define(["jquery", "dropbox-helper"], function($, dropboxHelper) {
	
	// Dependencies
	var core = undefined;
	var fileManager = undefined;
	
	var dropboxProvider = {
		providerId: PROVIDER_DROPBOX,
		providerName: "Dropbox",
		defaultPublishFormat: "template",
		useSync: false
	};
	
	function checkPath(path) {
		if(path === undefined) {
			return undefined;
		}
		if(!path.match(/^[^\\<>:"\|?\*]+$/)) {
			core.showError('"' + path + '" contains invalid characters.');
			return undefined;
		}
		if(path.indexOf("/") !== 0) {
			return "/" + path;
		}
		return path;
	}
	
	function createSyncAttributes(path, versionTag, content) {
		var syncAttributes = {};
		syncAttributes.provider = PROVIDER_DROPBOX;
		syncAttributes.path = path;
		syncAttributes.version = versionTag;
		syncAttributes.contentCRC = core.crc32(content);
		var syncIndex = "sync." + PROVIDER_DROPBOX + "." + encodeURIComponent(file.path.toLowerCase());
		localStorage[syncIndex] = JSON.stringify(syncAttributes);
		return syncIndex;
	}
	
	function importFilesFromPaths(paths) {
		dropboxHelper.downloadMetadata(paths, function(error, result) {
			if(error) {
				return;
			}
			dropboxHelper.downloadContent(result, function(error, result) {
				if(error) {
					return;
				}
				_.each(result, function(file) {
					var syncIndex = createSyncAttributes(file.path, file.versionTag, file.content);
					var fileIndex = fileManager.createFile(file.name, file.content, [syncIndex]);
					fileManager.selectFile(fileIndex);
					core.showMessage('"' + file.name + '" imported successfully from Dropbox.');
				});
			});
		});
	}

	dropboxProvider.importFiles = function() {
		dropboxHelper.picker(function(error, paths) {
			if(error) {
				return;
			}
			var importPaths = [];
			_.each(paths, function(path) {
				var syncIndex = "sync." + PROVIDER_DROPBOX + "." + encodeURIComponent(path.toLowerCase());
				var fileIndex = fileManager.getFileIndexFromSync(syncIndex);
				if(fileIndex !== undefined) {
					var title = localStorage[fileIndex + ".title"];
					core.showError('"' + title + '" was already imported');
					return;
				}
				importPaths.push(path);
			});
			dropboxHelper.importFiles(importPaths);			
		});
	};
	
	function exportFileToPath(path, title, content, callback) {
		path = dropboxHelper.checkPath(path);
		if(path === undefined) {
			callback(true);
			return;
		}
		// Check that file is not synchronized with an other one
		var syncIndex = "sync." + PROVIDER_DROPBOX + "." + encodeURIComponent(path.toLowerCase());
		var fileIndex = fileManager.getFileIndexFromSync(syncIndex);
		if(fileIndex !== undefined) {
			var existingTitle = localStorage[fileIndex + ".title"];
			core.showError('File path is already synchronized with "' + existingTitle + '"');
			callback(true);
			return;
		}
		dropboxHelper.upload(path, content, function(error, result) {
			if (error) {
				callback(error);
				return;
			}
			syncIndex = createSyncAttributes(result.path, result.versionTag, content);
			callback(undefined, syncIndex);
		});
	}
	
	dropboxProvider.exportFile = function(event, title, content, callback) {
		var path = core.getInputValue($("#input-sync-export-dropbox-path"), event);
		exportFileToPath(path);
	};

	dropboxProvider.exportManual = function(event, title, content, callback) {
		var path = core.getInputValue($("#input-sync-manual-dropbox-path"), event);
		exportFileToPath(path);
	};
	
	dropboxProvider.syncUp = function(uploadContent, uploadContentCRC, uploadTitle, uploadTitleCRC, syncAttributes, callback) {
		var syncContentCRC = syncAttributes.contentCRC;
		// Skip if CRC has not changed
		if(uploadContentCRC == syncContentCRC) {
			callback(undefined, false);
			return;
		}
		dropboxHelper.upload(syncAttributes.path, uploadContent, function(error, result) {
			if(error) {
				callback(error, true);
				return;
			}
			syncAttributes.version = result.versionTag;
			syncAttributes.contentCRC = uploadContentCRC;
			callback(undefined, true);
		});
	};
	
	function syncDown(callback) {
		if (dropboxProvider.useSync === false) {
			callback();
			return;
		}
		var lastChangeId = parseInt(localStorage[PROVIDER_DROPBOX + ".lastChangeId"]);
		dropboxHelper.checkChanges(lastChangeId, function(error, changes, newChangeId) {
			if (error) {
				callback(error);
				return;
			}
			var interestingChanges = [];
			_.each(changes, function(change) {
				var syncIndex = "sync." + PROVIDER_DROPBOX + "." + encodeURIComponent(file.path.toLowerCase());
				var serializedAttributes = localStorage[syncIndex];
				if(serializedAttributes === undefined) {
					return;
				}
				// Store syncIndex to avoid 2 times formating
				change.syncIndex = syncIndex;
				// Delete
				if(change.wasRemoved === true) {
					interestingChanges.push(change);
					return;
				}
				// Modify
				var syncAttributes = JSON.parse(serializedAttributes);
				if(syncAttributes.version != change.stat.versionTag) {
					interestingChanges.push(change);
					// Store syncAttributes to avoid 2 times parsing 
					change.syncAttributes = syncAttributes;
				}
			});
			dropboxHelper.downloadContent(changes, function(error, changes) {
				if (error) {
					callback(error);
					return;
				}
				var updateFileTitles = false;
				_.each(changes, function(change) {
					var syncIndex = change.syncIndex;
					var fileIndex = fileManager.getFileIndexFromSync(syncIndex);
					// No file corresponding (file may have been deleted locally)
					if(fileIndex === undefined) {
						fileManager.removeSync(syncIndex);
						return;
					}
					var localTitle = localStorage[fileIndex + ".title"];
					// File deleted
					if (change.wasRemoved === true) {
						fileManager.removeSync(syncIndex);
						updateFileTitles = true;
						core.showMessage('"' + localTitle + '" has been removed from Dropbox.');
						return;
					}
					var syncAttributes = change.syncAttributes;
					var localContent = localStorage[fileIndex + ".content"];
					var localContentChanged = syncAttributes.contentCRC != core.crc32(localContent);
					var file = change.stat;
					var fileContentChanged = localContent != file.content;
					// Conflict detection
					if (fileContentChanged === true && localContentChanged === true) {
						fileManager.createFile(localTitle + " (backup)", localContent);
						updateFileTitles = true;
						core.showMessage('Conflict detected on "' + localTitle + '". A backup has been created locally.');
					}
					// If file content changed
					if(fileContentChanged) {
						localStorage[fileIndex + ".content"] = file.content;
						core.showMessage('"' + localTitle + '" has been updated from Dropbox.');
						if(fileManager.isCurrentFileIndex(fileIndex)) {
							updateFileTitles = false; // Done by next function
							fileManager.selectFile(); // Refresh editor
						}
					}
					// Update syncAttributes
					syncAttributes.version = file.versionTag;
					syncAttributes.contentCRC = core.crc32(file.content);
					localStorage[syncIndex] = JSON.stringify(syncAttributes);
				});
				if(updateFileTitles) {
					fileManager.updateFileTitles();
				}
				localStorage[PROVIDER_DROPBOX + ".lastChangeId"] = newChangeId;
				callback();
			});
		});
	}
	
	dropboxProvider.publish = function(publishAttributes, title, content, callback) {
		var path = checkPath(publishAttributes.path);
		if(path === undefined) {
			callback(true);
			return;
		}
		dropboxHelper.upload(path, content, callback);
	};

	dropboxProvider.newPublishAttributes = function(event) {
		var publishAttributes = {};
		publishAttributes.path = core.getInputValue($("#input-publish-dropbox-path"), event);
		if(event.isPropagationStopped()) {
			return undefined;
		}
		return publishAttributes;
	};

	dropboxProvider.init = function(coreModule, fileManagerModule) {
		core = coreModule;
		fileManager = fileManagerModule;
	};

	return dropboxProvider;
});