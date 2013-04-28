define(["jquery", "core", "google-helper", "underscore"], function($, core, googleHelper) {
	
	var gdriveProvider = {
		providerId: PROVIDER_GDRIVE,
		providerName: "Google Drive",
		defaultPublishFormat: "template",
		useSync: false
	};
	
	function createSyncAttributes(id, etag, content, title) {
		var syncAttributes = {};
		syncAttributes.provider = PROVIDER_GDRIVE;
		syncAttributes.id = id;
		syncAttributes.etag = etag;
		syncAttributes.contentCRC = core.crc32(content);
		syncAttributes.titleCRC = core.crc32(title);
		var syncIndex = "sync." + PROVIDER_GDRIVE + "." + id;
		localStorage[syncIndex] = JSON.stringify(syncAttributes);
		return syncIndex;
	}
	
	function importFilesFromIds(ids) {
		googleHelper.downloadMetadata(ids, function(error, result) {
			if(error) {
				return;
			}
			googleHelper.downloadContent(result, function(error, result) {
				if(error) {
					return;
				}
				_.each(result, function(file) {
					var syncIndex = createSyncAttributes(file.id, file.etag, file.content, file.title);
					var fileIndex = core.fileManager.createFile(file.title, file.content, [syncIndex]);
					core.fileManager.selectFile(fileIndex);
					core.showMessage('"' + file.title + '" imported successfully from Google Drive.');
				});
			});
		});
	};

	gdriveProvider.importFiles = function() {
		googleHelper.picker(function(error, ids) {
			if(error || ids.length === 0) {
				return;
			}
			var importIds = [];
			_.each(ids, function(id) {
				var syncIndex = "sync." + PROVIDER_GDRIVE + "." + id;
				var fileIndex = core.fileManager.getFileIndexFromSync(syncIndex);
				if(fileIndex !== undefined) {
					var title = localStorage[fileIndex + ".title"];
					core.showError('"' + title + '" was already imported');
					return;
				}
				importIds.push(id);
			});
			importFilesFromIds(importIds);
		});
	};
	
	gdriveProvider.exportFile = function(event, title, content, callback) {
		googleHelper.upload(undefined, undefined, title, content, undefined, function(error, result) {
			if (error) {
				callback(error);
				return;
			}
			var syncIndex = createSyncAttributes(result.id, result.etag, content, title);
			callback(undefined, syncIndex);
		});
	};

	gdriveProvider.exportManual = function(event, title, content, callback) {
		var id = core.getInputValue($("#input-sync-manual-gdrive-id"), event);
		if(!id) {
			return;
		}
		// Check that file is not synchronized with an other one
		var syncIndex = "sync." + PROVIDER_GDRIVE + "." + id;
		var fileIndex = core.fileManager.getFileIndexFromSync(syncIndex);
		if(fileIndex !== undefined) {
			var existingTitle = localStorage[fileIndex + ".title"];
			core.showError('File ID is already synchronized with "' + existingTitle + '"');
			callback(true);
			return;
		}
		googleHelper.upload(id, undefined, title, content, undefined, function(error, result) {
			if (error) {
				callback(error);
				return;
			}
			var syncIndex = createSyncAttributes(result.id, result.etag, content, title);
			callback(undefined, syncIndex);
		});
	};
	
	gdriveProvider.syncUp = function(uploadContent, uploadContentCRC, uploadTitle, uploadTitleCRC, syncAttributes, callback) {
		var syncContentCRC = syncAttributes.contentCRC;
		var syncTitleCRC = syncAttributes.titleCRC;
		// Skip if CRC has not changed
		if(uploadContentCRC == syncContentCRC && uploadTitleCRC == syncTitleCRC) {
			callback(undefined, false);
			return;
		}
		googleHelper.upload(syncAttributes.id, undefined, uploadTitle, uploadContent, syncAttributes.etag, function(error, result) {
			if(error) {
				callback(error, true);
				return;
			}
			syncAttributes.etag = result.etag;
			syncAttributes.contentCRC = uploadContentCRC;
			syncAttributes.titleCRC = uploadTitleCRC;
			callback(undefined, true);
		});
	};
	
	gdriveProvider.syncDown = function(callback) {
		if (gdriveProvider.useSync === false) {
			callback();
			return;
		}
		var lastChangeId = parseInt(localStorage[PROVIDER_GDRIVE + ".lastChangeId"]);
		googleHelper.checkChanges(lastChangeId, function(error, changes, newChangeId) {
			if (error) {
				callback(error);
				return;
			}
			var interestingChanges = [];
			_.each(changes, function(change) {
				var syncIndex = "sync." + PROVIDER_GDRIVE + "." + change.fileId;
				var serializedAttributes = localStorage[syncIndex];
				if(serializedAttributes === undefined) {
					return;
				}
				// Store syncIndex to avoid 2 times formating
				change.syncIndex = syncIndex;
				// Delete
				if(change.deleted === true) {
					interestingChanges.push(change);
					return;
				}
				// Modify
				var syncAttributes = JSON.parse(serializedAttributes);
				if(syncAttributes.etag != change.file.etag) {
					interestingChanges.push(change);
					// Store syncAttributes to avoid 2 times parsing 
					change.syncAttributes = syncAttributes;
				}
			});
			googleHelper.downloadContent(interestingChanges, function(error, changes) {
				if (error) {
					callback(error);
					return;
				}
				var updateFileTitles = false;
				_.each(changes, function(change) {
					var syncIndex = change.syncIndex;
					var fileIndex = core.fileManager.getFileIndexFromSync(syncIndex);
					// No file corresponding (file may have been deleted locally)
					if(fileIndex === undefined) {
						core.fileManager.removeSync(syncIndex);
						return;
					}
					var localTitle = localStorage[fileIndex + ".title"];
					// File deleted
					if (change.deleted === true) {
						core.fileManager.removeSync(syncIndex);
						updateFileTitles = true;
						core.showMessage('"' + localTitle + '" has been removed from Google Drive.');
						return;
					}
					var syncAttributes = change.syncAttributes;
					var localTitleChanged = syncAttributes.titleCRC != core.crc32(localTitle);
					var localContent = localStorage[fileIndex + ".content"];
					var localContentChanged = syncAttributes.contentCRC != core.crc32(localContent);
					var file = change.file;
					var fileTitleChanged = localTitle != file.title;
					var fileContentChanged = localContent != file.content;
					// Conflict detection
					if ((fileTitleChanged === true && localTitleChanged === true)
						|| (fileContentChanged === true && localContentChanged === true)) {
						core.fileManager.createFile(localTitle + " (backup)", localContent);
						updateFileTitles = true;
						core.showMessage('Conflict detected on "' + localTitle + '". A backup has been created locally.');
					}
					// If file title changed
					if(fileTitleChanged) {
						localStorage[fileIndex + ".title"] = file.title;
						updateFileTitles = true;
						core.showMessage('"' + localTitle + '" has been renamed to "' + file.title + '" on Google Drive.');
					}
					// If file content changed
					if(fileContentChanged) {
						localStorage[fileIndex + ".content"] = file.content;
						core.showMessage('"' + file.title + '" has been updated from Google Drive.');
						if(core.fileManager.isCurrentFileIndex(fileIndex)) {
							updateFileTitles = false; // Done by next function
							core.fileManager.selectFile(); // Refresh editor
						}
					}
					// Update syncAttributes
					syncAttributes.etag = file.etag;
					syncAttributes.contentCRC = core.crc32(file.content);
					syncAttributes.titleCRC = core.crc32(file.title);
					localStorage[syncIndex] = JSON.stringify(syncAttributes);
				});
				if(updateFileTitles) {
					core.fileManager.updateFileTitles();
				}
				localStorage[PROVIDER_GDRIVE + ".lastChangeId"] = newChangeId;
				callback();
			});
		});
	};
	
	gdriveProvider.publish = function(publishAttributes, title, content, callback) {
		googleHelper.upload(
			publishAttributes.fileId,
			undefined,
			publishAttributes.fileName || title,
			content,
			undefined,
			function(error, result) {
				if(error) {
					callback(error);
					return;
				}
				publishAttributes.fileId = result.id;
				callback();
			}
		);
	};

	gdriveProvider.newPublishAttributes = function(event) {
		var publishAttributes = {};
		publishAttributes.fileId = $("#input-publish-gdrive-fileid").val() || undefined;
		publishAttributes.fileName = $("#input-publish-gdrive-filename").val() || undefined;
		if(event.isPropagationStopped()) {
			return undefined;
		}
		return publishAttributes;
	};
	
	core.onReady(function() {
		var state = localStorage[PROVIDER_GDRIVE + ".state"];
		if(state === undefined) {
			return;
		}
		localStorage.removeItem(PROVIDER_GDRIVE + ".state");
		state = JSON.parse(state);
		if (state.action == "create") {
			googleHelper.upload(undefined, state.folderId, GDRIVE_DEFAULT_FILE_TITLE,
				"", undefined, function(error, file) {
				if(error) {
					return;
				}
				var syncIndex = createSyncAttributes(file.id, file.etag, file.content, file.title);
				var fileIndex = core.fileManager.createFile(file.title, file.content, [syncIndex]);
				core.fileManager.selectFile(fileIndex);
				core.showMessage('"' + file.title + '" created successfully on Google Drive.');
			});
		}
		else if (state.action == "open") {
			var importIds = [];
			_.each(state.ids, function(id) {
				var syncIndex = "sync." + PROVIDER_GDRIVE + "." + id;
				var fileIndex = core.fileManager.getFileIndexFromSync(syncIndex);
				if(fileIndex !== undefined) {
					core.fileManager.selectFile(fileIndex);
				}
				else {
					importIds.push(id);
				}
			});
			importFilesFromIds(importIds);
		}
	});

	return gdriveProvider;
});