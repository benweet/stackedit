define(["jquery", "core", "dropbox-provider", "gdrive-provider", "underscore"], function($, core) {
	var synchronizer = {};
	
	// Create a map with providerId: providerObject
	var providerMap = _.chain(arguments)
		.map(function(argument) {
			return argument && argument.providerId && [argument.providerId, argument];
		}).compact().object().value();

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
	// Run updateSyncButton on online/offline event
	core.addOfflineListener(synchronizer.updateSyncButton);

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
		var syncIndex = uploadFileSyncIndexList.pop();
		var syncAttributes = JSON.parse(localStorage[syncIndex]);
		// Use the specified provider to perform the upload
		providerMap[syncAttributes.provider].syncUp(
			uploadContent,
			uploadContentCRC,
			uploadTitle,
			uploadTitleCRC,
			syncAttributes,
			function(error, uploadFlag) {
				if(uploadFlag === true) {
					// If uploadFlag is true, request another upload cycle
					uploadCycle = true;
					// When page is refreshed, this flag is false but should be true here
					uploadPending = true;
				}
				if(error) {
					callback(error);
					return;
				}
				if(uploadFlag) {
					// Update syncAttributes in localStorage
					localStorage[syncIndex] = JSON.stringify(syncAttributes);
				}
				locationUp(callback);
			}
		);
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
		if(fileSyncIndexes.length === 1) {
			fileUp(callback);
			return;
		}

		// Get document title/content 
		uploadContent = localStorage[fileIndex + ".content"];
		uploadContentCRC = core.crc32(uploadContent);
		uploadTitle = localStorage[fileIndex + ".title"];
		uploadTitleCRC = core.crc32(uploadTitle);

		// Parse the list of synchronized locations associated to the document
		uploadFileSyncIndexList = _.compact(fileSyncIndexes.split(";"));
		locationUp(callback);
	}

	// Entry point for up synchronization (upload changes)
	var uploadCycle = false;
	function syncUp(callback) {
		if(uploadCycle === true) {
			// New upload cycle
			uploadCycle = false;
			uploadFileIndexList = _.compact(localStorage["file.list"].split(";"));
			fileUp(callback);
		}
		else {
			callback();
		} 
	}

	// Recursive function to download changes from multiple providers
	var providerList = [];
	function providerDown(callback) {
		if(providerList.length === 0) {
			callback();
			return;
		}
		var provider = providerList.pop();
		provider.syncDown(function(error) {
			if(error) {
				callback(error);
				return;
			}
			providerDown(callback);
		});
	}
	
	// Entry point for down synchronization (download changes)
	function syncDown(callback) {
		providerList = _.values(providerMap);
		providerDown(callback);
	};
	
	// Main entry point for synchronization
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
				console.error(error);
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
	// Run sync function periodically
	core.addPeriodicCallback(synchronizer.sync);
	
	// Used to populate the "Manage synchronization" dialog
	var lineTemplate = ['<div class="input-prepend input-append">',
		'<span class="add-on" title="<%= provider.providerName %>">',
		'<i class="icon-<%= provider.providerId %>"></i></span>',
		'<input class="span5" type="text" value="<%= syncDesc %>" disabled />',
		'</div>'].join("");
	var removeButtonTemplate = '<a class="btn" title="Remove this location"><i class="icon-trash"></i></a>';
	synchronizer.refreshManageSync = function() {
		var fileIndex = core.fileManager.getCurrentFileIndex();
		var syncIndexList = _.compact(localStorage[fileIndex + ".sync"].split(";"));
		$(".msg-no-sync, .msg-sync-list").addClass("hide");
		$("#manage-sync-list .input-append").remove();
		if (syncIndexList.length > 0) {
			$(".msg-sync-list").removeClass("hide");
		} else {
			$(".msg-no-sync").removeClass("hide");
		}
		_.each(syncIndexList, function(syncIndex) {
			var syncAttributes = JSON.parse(localStorage[syncIndex]);
			var syncDesc = syncAttributes.id || syncAttributes.path;
			lineElement = $(_.template(lineTemplate, {
				provider: providerMap[syncAttributes.provider],
				syncDesc: syncDesc
			}));
			lineElement.append($(removeButtonTemplate).click(function() {
				core.fileManager.removeSync(syncIndex);
				core.fileManager.updateFileTitles();
			}));
			$("#manage-sync-list").append(lineElement);
		});
	};
	
	// Used to enable/disable provider synchronization
	synchronizer.resetSyncFlags = function() {
		_.each(providerMap, function(provider) {
			provider.useSync = false;
		});		
	};
	synchronizer.getSyncAttributesFromFile = function(fileIndex) {
		var syncIndexList = _.compact(localStorage[fileIndex + ".sync"].split(";"));
		var attributesList = [];
		_.each(syncIndexList, function(syncIndex) {
			var syncAttributes = JSON.parse(localStorage[syncIndex]);
			attributesList.push(syncAttributes);
			providerMap[syncAttributes.provider].useSync = true;
		});
		return attributesList;
	};
	
	core.onReady(function() {
		// Init each provider
		_.each(providerMap, function(provider) {
			// Provider's import button
			$(".action-sync-import-" + provider.providerId).click(function(event) {
				provider.importFiles(event);
			});
			// Provider's export button
			$(".action-sync-export-" + provider.providerId).click(function(event) {
				var fileIndex = core.fileManager.getCurrentFileIndex();
				var title = localStorage[fileIndex + ".title"];
				var content = localStorage[fileIndex + ".content"];
				provider.exportFile(event, title, content, function(error, syncIndex) {
					if(error) {
						return;
					}
					localStorage[fileIndex + ".sync"] += syncIndex + ";";
					synchronizer.refreshManageSync();
					core.fileManager.updateFileTitles();
					core.showMessage('"' + title
						+ '" will now be synchronized on ' + provider.providerName + '.');
				});
			});
			// Provider's manual sync button
			$(".action-sync-manual-" + provider.providerId).click(function(event) {
				var fileIndex = core.fileManager.getCurrentFileIndex();
				var title = localStorage[fileIndex + ".title"];
				var content = localStorage[fileIndex + ".content"];
				provider.exportManual(event, title, content, function(error, syncIndex) {
					if(error) {
						return;
					}
					localStorage[fileIndex + ".sync"] += syncIndex + ";";
					synchronizer.refreshManageSync();
					core.fileManager.updateFileTitles();
					core.showMessage('"' + title
						+ '" will now be synchronized on ' + provider.providerName + '.');
				});
			});
		});
		
		synchronizer.updateSyncButton();
		$(".action-force-sync").click(function() {
			if(!$(this).hasClass("disabled")) {
				synchronizer.forceSync();
			}
		});
	});

	return synchronizer;
});
