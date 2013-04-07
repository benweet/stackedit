define(["jquery", "core", "gdrive", "dropbox"], function($, core, gdrive, dropbox) {
	var synchronizer = {};
	
	// Dependencies
	var fileManager = undefined;

	// Used to know the providers we are connected to 
	synchronizer.useGoogleDrive = false;
	synchronizer.useDropbox = false;
	
	var onSyncBegin = undefined;
	var onSyncEnd = undefined;
	var onQueueChanged = undefined;

	// A synchronization queue containing fileIndex that has to be synchronized
	var syncUpQueue = undefined;
	
	synchronizer.init = function(fileManagerModule, options) {
		fileManager = fileManagerModule;
		onSyncBegin = options.onSyncBegin || core.doNothing;
		onSyncEnd = options.onSyncEnd || core.doNothing;
		onQueueChanged = options.onQueueChanged || core.doNothing;
		
		syncUpQueue = ";";
		// Load the queue from localStorage in case a previous synchronization
		// was aborted
		if (localStorage["sync.queue"]) {
			syncUpQueue = localStorage["sync.queue"];
			onQueueChanged();
		}
		if (localStorage["sync.current"]) {
			this.addFileForUpload(localStorage["sync.current"]);
		}
	};

	// Add a file to the synchronization queue
	synchronizer.addFileForUpload = function(fileIndex) {
		// Check that file has synchronized locations
		if(localStorage[fileIndex + ".sync"].length === 1) {
			return;
		}
		// Check that file is not in the queue
		if (syncUpQueue.indexOf(";" + fileIndex + ";") !== -1) {
			return;
		}
		syncUpQueue += fileIndex + ";";
		localStorage["sync.queue"] = syncUpQueue;
		onQueueChanged();
	};

	// Recursive function to upload a single file on multiple locations
	function fileUp(fileSyncIndexList, content, title, callback) {
		if (fileSyncIndexList.length === 0) {
			localStorage.removeItem("sync.current");
			// run the next file synchronization
			syncUp(callback);
			return;
		}
		var fileSyncIndex = fileSyncIndexList.pop();

		// Try to find the provider
		if (fileSyncIndex.indexOf(SYNC_PROVIDER_GDRIVE) === 0) {
			var id = fileSyncIndex.substring(SYNC_PROVIDER_GDRIVE.length);
			gdrive.upload(id, undefined, title, content, function(result) {
				if (result !== undefined) {
					fileUp(fileSyncIndexList, content, title, callback);
					return;
				}
				// If error we put the fileIndex back in the queue
				synchronizer.addFileForUpload(localStorage["sync.current"]);
				localStorage.removeItem("sync.current");
				callback();
				return;
			});
		} else if (fileSyncIndex.indexOf(SYNC_PROVIDER_DROPBOX) === 0) {
			var path = fileSyncIndex.substring(SYNC_PROVIDER_DROPBOX.length);
			path = decodeURIComponent(path);
			dropbox.upload(path, content, function(result) {
				if (result !== undefined) {
					fileUp(fileSyncIndexList, content, title, callback);
					return;
				}
				// If error we put the fileIndex back in the queue
				synchronizer.addFileForUpload(localStorage["sync.current"]);
				localStorage.removeItem("sync.current");
				callback();
				return;
			});
		} else {
			fileUp(fileSyncIndexList, content, title, callback);
		}
	}

	function syncUp(callback) {
		// If nothing to synchronize
		if (syncUpQueue.length === 1) {
			callback();
			return;
		}

		// Dequeue the fileIndex
		var separatorPos = syncUpQueue.indexOf(";", 1);
		var fileIndex = syncUpQueue.substring(1, separatorPos);
		localStorage["sync.current"] = fileIndex;
		syncUpQueue = syncUpQueue.substring(separatorPos);
		localStorage["sync.queue"] = syncUpQueue;
		onQueueChanged();

		var content = localStorage[fileIndex + ".content"];
		var title = localStorage[fileIndex + ".title"];

		// Parse the list of synchronized locations associated to the file
		var fileSyncIndexList = localStorage[fileIndex + ".sync"].split(";");
		fileUp(fileSyncIndexList, content, title, callback);
	};

	function syncDownGdrive(callback) {
		if (synchronizer.useGoogleDrive === false) {
			callback();
			return;
		}
		var lastChangeId = parseInt(localStorage[SYNC_PROVIDER_GDRIVE
			+ "lastChangeId"]);
		gdrive.checkUpdates(lastChangeId, function(changes, newChangeId) {
			if (changes === undefined) {
				callback();
				return;
			}
			gdrive.downloadContent(changes, function(changes) {
				if (changes === undefined) {
					callback();
					return;
				}
				var updateFileTitles = false;
				for ( var i = 0; i < changes.length; i++) {
					var change = changes[i];
					var fileSyncIndex = SYNC_PROVIDER_GDRIVE + change.fileId;
					var fileIndex = fileManager.getFileIndexFromSync(fileSyncIndex);
					// No file corresponding (this should never happen...)
					if(fileIndex === undefined) {
						// We can remove the stored etag
						localStorage.removeItem(fileSyncIndex + ".etag");
						continue;
					}
					var title = localStorage[fileIndex + ".title"];
					// File deleted
					if (change.deleted === true) {
						fileManager.removeSync(fileSyncIndex);
						updateFileTitles = true;
						core.showMessage('"' + title + '" has been removed from Google Drive.');
						continue;
					}
					var content = localStorage[fileIndex + ".content"];
					var file = change.file;
					var titleChanged = title != file.title;
					var contentChanged = content != file.content;
					// If file is in the upload queue we have a conflict
					if ((titleChanged || contentChanged) && syncUpQueue.indexOf(";" + fileIndex + ";") !== -1) {
						fileManager.createFile(title + " (backup)", content);
						updateFileTitles = true;
						core.showMessage('Conflict detected on "' + title + '". A backup has been created locally.');
					}
					// If file title changed
					if(titleChanged) {
						localStorage[fileIndex + ".title"] = file.title;
						updateFileTitles = true;
						core.showMessage('"' + title + '" has been renamed to "' + file.title + '" on Google Drive.');
					}
					// If file content changed
					if(contentChanged) {
						localStorage[fileIndex + ".content"] = file.content;
						core.showMessage('"' + file.title + '" has been updated from Google Drive.');
						if(fileIndex == localStorage["file.current"]) {
							updateFileTitles = false; // Done by next function
							fileManager.selectFile(); // Refresh editor
						}
					}
					// Update file etag
					localStorage[fileSyncIndex + ".etag"] = file.etag;
					// Synchronize file to others locations
					synchronizer.addFileForUpload(fileIndex);
				}
				if(updateFileTitles) {
					fileManager.updateFileTitles();
				}
				localStorage[SYNC_PROVIDER_GDRIVE
				 			+ "lastChangeId"] = newChangeId;
				callback();
			});
		});
	}

	function syncDownDropbox(callback) {
		if (synchronizer.useDropbox === false) {
			callback();
			return;
		}
		var lastChangeId = localStorage[SYNC_PROVIDER_DROPBOX + "lastChangeId"];
		dropbox.checkUpdates(lastChangeId, function(changes, newChangeId) {
			if (changes === undefined) {
				callback();
				return;
			}
			dropbox.downloadContent(changes, function(changes) {
				if (changes === undefined) {
					callback();
					return;
				}
				var updateFileTitles = false;
				for ( var i = 0; i < changes.length; i++) {
					var change = changes[i];
					var fileSyncIndex = SYNC_PROVIDER_DROPBOX + encodeURIComponent(change.path.toLowerCase());
					var fileIndex = fileManager.getFileIndexFromSync(fileSyncIndex);
					// No file corresponding (this should never happen...)
					if(fileIndex === undefined) {
						// We can remove the stored version
						localStorage.removeItem(fileSyncIndex + ".version");
						continue;
					}
					var title = localStorage[fileIndex + ".title"];
					// File deleted
					if (change.wasRemoved === true) {
						fileManager.removeSync(fileSyncIndex);
						updateFileTitles = true;
						core.showMessage('"' + title + '" has been removed from Dropbox.');
						continue;
					}
					var content = localStorage[fileIndex + ".content"];
					var file = change.stat;
					var contentChanged = content != file.content;
					// If file is in the upload queue we have a conflict
					if (contentChanged && syncUpQueue.indexOf(";" + fileIndex + ";") !== -1) {
						fileManager.createFile(title + " (backup)", content);
						updateFileTitles = true;
						core.showMessage('Conflict detected on "' + title + '". A backup has been created locally.');
					}
					// If file content changed
					if(contentChanged) {
						localStorage[fileIndex + ".content"] = file.content;
						core.showMessage('"' + title + '" has been updated from Dropbox.');
						if(fileIndex == localStorage["file.current"]) {
							updateFileTitles = false; // Done by next function
							fileManager.selectFile(); // Refresh editor
						}
					}
					// Update file version
					localStorage[fileSyncIndex + ".version"] = file.versionTag;
					// Synchronize file to others locations
					synchronizer.addFileForUpload(fileIndex);
				}
				if(updateFileTitles) {
					fileManager.updateFileTitles();
				}
				localStorage[SYNC_PROVIDER_DROPBOX
				             + "lastChangeId"] = newChangeId;
				callback();
			});
		});
	}
	
	function syncDown(callback) {
		syncDownGdrive(function() {
			syncDownDropbox(callback);
		});
	};
		
	var syncRunning = false;
	var lastSync = 0;
	synchronizer.sync = function() {
		// If sync is already running or timeout is not reached or offline
		if (syncRunning || lastSync + SYNC_PERIOD > core.currentTime || core.isOffline) {
			return;
		}
		syncRunning = true;
		lastSync = core.currentTime;
		onSyncBegin();

		syncDown(function() {
			syncUp(function() {
				syncRunning = false;
				onSyncEnd();
			});
		});
	};
	
	synchronizer.forceSync = function() {
		lastSync = 0;
		this.sync();
	};
	
	synchronizer.isRunning = function() {
		return syncRunning;
	};

	synchronizer.isQueueEmpty = function() {
		return syncUpQueue.length === 1;
	};
	
	return synchronizer;
});
