define(["jquery", "dropbox-helper"], function($, dropboxHelper) {
	
	// Dependencies
	var core = undefined;
	var fileManager = undefined;
	
	var dropboxProvider = {
		providerType: PROVIDER_TYPE_SYNC_FLAG | PROVIDER_TYPE_PUBLISH_FLAG,
		providerId: PROVIDER_DROPBOX,
		providerName: "Dropbox",
		defaultPublishFormat: "template"
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