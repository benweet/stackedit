define(["jquery", "google-helper", "underscore"], function($, googleHelper) {
	
	// Dependencies
	var core = undefined;
	var fileManager = undefined;
	
	var gdriveProvider = {
		providerType: PROVIDER_TYPE_SYNC_FLAG | PROVIDER_TYPE_PUBLISH_FLAG,
		providerId: PROVIDER_GDRIVE,
		providerName: "Gdrive",
		defaultPublishFormat: "template"
	};
	
	function createSyncAttributes(id, etag, content, title) {
		var syncAttributes = {};
		syncAttributes.provider = PROVIDER_GDRIVE;
		syncAttributes.id = id;
		syncAttributes.etag = etag;
		syncAttributes.contentCRC = core.crc32(content);
		syncAttributes.titleCRC = core.crc32(title);
		var syncIndex = "sync." + PROVIDER_GDRIVE + "." + file.id;
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
					var fileIndex = fileManager.createFile(file.title, file.content, [syncIndex]);
					fileManager.selectFile(fileIndex);
					core.showMessage('"' + file.title + '" imported successfully from Google Drive.');
				});
			});
		});
	};

	gdriveProvider.importFiles = function() {
		googleHelper.picker(function(error, ids) {
			if(ids === undefined) {
				return;
			}
			var importIds = [];
			_.each(ids, function(id) {
				var syncIndex = "sync." + PROVIDER_GDRIVE + "." + id;
				var fileIndex = fileManager.getFileIndexFromSync(syncIndex);
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
		googleHelper.upload(undefined, undefined, title, content, function(error, result) {
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
		var fileIndex = fileManager.getFileIndexFromSync(syncIndex);
		if(fileIndex !== undefined) {
			var existingTitle = localStorage[fileIndex + ".title"];
			core.showError('File ID is already synchronized with "' + existingTitle + '"');
			callback(true);
			return;
		}
		googleHelper.upload(id, undefined, title, content, function(error, result) {
			if (error) {
				callback(error);
				return;
			}
			var syncIndex = createSyncAttributes(result.id, result.etag, content, title);
			callback(undefined, syncIndex);
		});
	};
	
	gdriveProvider.publish = function(publishAttributes, title, content, callback) {
		googleHelper.upload(publishAttributes.fileId, undefined, title, content, callback);
	};

	gdriveProvider.newPublishAttributes = function(event) {
		var publishAttributes = {};
		publishAttributes.fileId = $("#input-publish-gdrive-fileid").val() || undefined;
		if(event.isPropagationStopped()) {
			return undefined;
		}
		return publishAttributes;
	};
	
	gdriveProvider.init = function(coreModule, fileManagerModule) {
		core = coreModule;
		fileManager = fileManagerModule;
		
		var state = localStorage["sync.gdrive.state"];
		if(state === undefined) {
			return;
		}
		localStorage.removeItem("sync.gdrive.state");
		state = JSON.parse(state);
		if (state.action == "create") {
			googleHelper.upload(undefined, state.folderId, GDRIVE_DEFAULT_FILE_TITLE,
				"", function(error, file) {
				if(error) {
					return;
				}
				var syncIndex = createSyncAttributes(file.id, file.etag, file.content, file.title);
				var fileIndex = fileManager.createFile(file.title, file.content, [syncIndex]);
				fileManager.selectFile(fileIndex);
				core.showMessage('"' + file.title + '" created successfully on Google Drive.');
			});
		}
		else if (state.action == "open") {
			var importIds = [];
			_.each(state.ids, function(id) {
				var syncIndex = "sync." + PROVIDER_GDRIVE + "." + id;
				var fileIndex = fileManager.getFileIndexFromSync(syncIndex);
				if(fileIndex !== undefined) {
					fileManager.selectFile(fileIndex);
				}
				else {
					importIds.push(id);
				}
			});
			importFilesFromIds(importIds);
		}
	};

	return gdriveProvider;
});