define(["jquery", "google-helper", "dropbox-helper"], function($, googleHelper, dropboxHelper) {
	var synchronizer = {};
	
	// Dependencies
	var core = undefined;
	var fileManager = undefined;

	// Used to know the providers we are connected to 
	synchronizer.useGoogleDrive = false;
	synchronizer.useDropbox = false;
	
	// Used to know if user can force synchronization
	var uploadPending = false;
	
	// Allows external modules to update uploadPending flag
	synchronizer.notifyChange = function(fileIndex) {
		// Check that file has synchronized locations
		if(localStorage[fileIndex + ".sync"].length !== 1) {
			uploadPending = true;
			synchronizer.updateSyncButton();
		}
	};
	
	// Used to enable/disable the synchronization button
	synchronizer.updateSyncButton = function() {
		if(syncRunning === true || uploadPending === false || core.isOffline) {
			$(".action-force-sync").addClass("disabled");
		}
		else {
			$(".action-force-sync").removeClass("disabled");
		}
	};

	// Force the synchronization
	synchronizer.forceSync = function() {
		lastSync = 0;
		synchronizer.sync();
	};
	
	// Recursive function to upload a single file on multiple locations
	var uploadFileSyncIndexList = [];
	var uploadContent = undefined;
	var uploadContentCRC = undefined;
	var uploadTitle = undefined;
	var uploadTitleCRC = undefined;
	function locationUp(callback) {
		
		// No more synchronized location for this document
		if (uploadFileSyncIndexList.length === 0) {
			fileUp(callback);
			return;
		}
		
		// Dequeue a synchronized location
		var fileSyncIndex = uploadFileSyncIndexList.pop();
		if(!fileSyncIndex) {
			locationUp(callback);
			return;
		}

		// Skip if CRC has not changed
		var syncContentCRC = localStorage[fileSyncIndex + ".contentCRC"];
		var syncTitleCRC = localStorage[fileSyncIndex + ".titleCRC"];
		if(uploadContentCRC == syncContentCRC && (syncTitleCRC === undefined || uploadTitleCRC == syncTitleCRC)) {
			locationUp(callback);
			return;
		}
		
		// If upload is going to run, go for an other upload cycle at the end
		uploadCycle = true;
		// When page is refreshed, this flag is false but should be true here
		uploadPending = true;

		// Try to find the provider
		if (fileSyncIndex.indexOf(SYNC_PROVIDER_GDRIVE) === 0) {
			var id = fileSyncIndex.substring(SYNC_PROVIDER_GDRIVE.length);
			googleHelper.upload(id, undefined, uploadTitle, uploadContent, function(result) {
				if (result !== undefined) {
					localStorage[fileSyncIndex + ".contentCRC"] = uploadContentCRC;
					localStorage[fileSyncIndex + ".titleCRC"] = uploadTitleCRC;
					locationUp(callback);
					return;
				}
				
				// If error we abort the synchronization (retry later)
				callback("abort");
				return;
			});
		} else if (fileSyncIndex.indexOf(SYNC_PROVIDER_DROPBOX) === 0) {
			var path = fileSyncIndex.substring(SYNC_PROVIDER_DROPBOX.length);
			path = decodeURIComponent(path);
			dropboxHelper.upload(path, uploadContent, function(result) {
				if (result !== undefined) {
					localStorage[fileSyncIndex + ".contentCRC"] = uploadContentCRC;
					locationUp(callback);
					return;
				}
				
				// If error we abort the synchronization (retry later)
				callback("abort");
				return;
			});
		} else {
			// This should never happen
			console.error("Invalid fileSyncIndex: " + fileSyncIndex);
			callback("error");
		}
	}

	// Recursive function to upload multiple files
	var uploadFileIndexList = [];
	function fileUp(callback) {
		
		// No more fileIndex to synchronize
		if (uploadFileIndexList.length === 0) {
			syncUp(callback);
			return;
		}
		
		// Dequeue a fileIndex
		var fileIndex = uploadFileIndexList.pop();
		var fileSyncIndexes = localStorage[fileIndex + ".sync"];
		if(!fileIndex || fileSyncIndexes.length === 1) {
			fileUp(callback);
			return;
		}

		// Get document title/content 
		uploadContent = localStorage[fileIndex + ".content"];
		uploadContentCRC = core.crc32(uploadContent);
		uploadTitle = localStorage[fileIndex + ".title"];
		uploadTitleCRC = core.crc32(uploadTitle);

		// Parse the list of synchronized locations associated to the document
		uploadFileSyncIndexList = fileSyncIndexes.split(";");
		locationUp(callback);
	}

	// Used to upload document changes from local storage
	var uploadCycle = false;
	function syncUp(callback) {
		if(uploadCycle === true) {
			// New upload cycle
			uploadCycle = false;
			uploadFileIndexList = localStorage["file.list"].split(";");
			fileUp(callback);
		}
		else {
			callback();
		} 
	}

	// Used to download file changes from Google Drive
	function syncDownGdrive(callback) {
		if (synchronizer.useGoogleDrive === false) {
			callback();
			return;
		}
		var lastChangeId = parseInt(localStorage[SYNC_PROVIDER_GDRIVE
			+ "lastChangeId"]);
		googleHelper.checkUpdates(lastChangeId, function(changes, newChangeId) {
			if (changes === undefined) {
				callback("error");
				return;
			}
			googleHelper.downloadContent(changes, function(changes) {
				if (changes === undefined) {
					callback("error");
					return;
				}
				var updateFileTitles = false;
				for ( var i = 0; i < changes.length; i++) {
					var change = changes[i];
					var fileSyncIndex = SYNC_PROVIDER_GDRIVE + change.fileId;
					var fileIndex = fileManager.getFileIndexFromSync(fileSyncIndex);
					// No file corresponding (file may have been deleted locally)
					if(fileIndex === undefined) {
						fileManager.removeSync(fileSyncIndex);
						continue;
					}
					var localTitle = localStorage[fileIndex + ".title"];
					// File deleted
					if (change.deleted === true) {
						fileManager.removeSync(fileSyncIndex);
						updateFileTitles = true;
						core.showMessage('"' + localTitle + '" has been removed from Google Drive.');
						continue;
					}
					var localTitleChanged = localStorage[fileSyncIndex + ".titleCRC"] != core.crc32(localTitle);
					var localContent = localStorage[fileIndex + ".content"];
					var localContentChanged = localStorage[fileSyncIndex + ".contentCRC"] != core.crc32(localContent);
					var file = change.file;
					var fileTitleChanged = localTitle != file.title;
					var fileContentChanged = localContent != file.content;
					// Conflict detection
					if ((fileTitleChanged === true && localTitleChanged === true)
						|| (fileContentChanged === true && localContentChanged === true)) {
						fileManager.createFile(localTitle + " (backup)", localContent);
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
						if(fileManager.isCurrentFileIndex(fileIndex)) {
							updateFileTitles = false; // Done by next function
							fileManager.selectFile(); // Refresh editor
						}
					}
					// Update file etag and CRCs
					localStorage[fileSyncIndex + ".etag"] = file.etag;
					localStorage[fileSyncIndex + ".contentCRC"] = core.crc32(file.content);
					localStorage[fileSyncIndex + ".titleCRC"] = core.crc32(file.title);
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

	// Used to download file changes from Dropbox
	function syncDownDropbox(callback) {
		if (synchronizer.useDropbox === false) {
			callback();
			return;
		}
		var lastChangeId = localStorage[SYNC_PROVIDER_DROPBOX + "lastChangeId"];
		dropboxHelper.checkUpdates(lastChangeId, function(changes, newChangeId) {
			if (changes === undefined) {
				callback("error");
				return;
			}
			dropboxHelper.downloadContent(changes, function(changes) {
				if (changes === undefined) {
					callback("error");
					return;
				}
				var updateFileTitles = false;
				for ( var i = 0; i < changes.length; i++) {
					var change = changes[i];
					var fileSyncIndex = SYNC_PROVIDER_DROPBOX + encodeURIComponent(change.path.toLowerCase());
					var fileIndex = fileManager.getFileIndexFromSync(fileSyncIndex);
					// No file corresponding (file may have been deleted locally)
					if(fileIndex === undefined) {
						fileManager.removeSync(fileSyncIndex);
						continue;
					}
					var localTitle = localStorage[fileIndex + ".title"];
					// File deleted
					if (change.wasRemoved === true) {
						fileManager.removeSync(fileSyncIndex);
						updateFileTitles = true;
						core.showMessage('"' + localTitle + '" has been removed from Dropbox.');
						continue;
					}
					var localContent = localStorage[fileIndex + ".content"];
					var localContentChanged = localStorage[fileSyncIndex + ".contentCRC"] != core.crc32(localContent);
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
					// Update file version and CRC
					localStorage[fileSyncIndex + ".version"] = file.versionTag;
					localStorage[fileSyncIndex + ".contentCRC"] = core.crc32(file.content);
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
		uploadCycle = true;
		lastSync = core.currentTime;
		synchronizer.updateSyncButton();
		
		function isError(error) {
			if(error !== undefined) {
				syncRunning = false;
				synchronizer.updateSyncButton();
				return true;
			}
			return false;
		}

		syncDown(function(error) {
			if(isError(error)) {
				return;
			}
			syncUp(function(error) {
				if(isError(error)) {
					return;
				}
				syncRunning = false;
				uploadPending = false;
			});
		});
	};
	
	synchronizer.init = function(coreModule, fileManagerModule) {
		core = coreModule;
		fileManager = fileManagerModule;
		
		synchronizer.updateSyncButton();
		$(".action-force-sync").click(function() {
			if(!$(this).hasClass("disabled")) {
				synchronizer.forceSync();
			}
		});
	};

	return synchronizer;
});
