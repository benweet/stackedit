define([
    "jquery",
    "underscore",
    "core",
    "utils",
    "extension-manager",
    "file-system",
    "file-manager",
    "dropbox-provider",
    "gdrive-provider"
], function($, _, core, utils, extensionMgr, fileSystem, fileMgr) {
	
	var synchronizer = {};
	
	// Create a map with providerId: providerModule
	var providerMap = _.chain(
		arguments
	).map(function(argument) {
		return argument && argument.providerId && [argument.providerId, argument];
	}).compact().object().value();
	
	// Retrieve sync locations from localStorage
	_.each(fileSystem, function(fileDesc) {
		_.chain(
			localStorage[fileDesc.fileIndex + ".sync"].split(";")
		).compact().each(function(syncIndex) {
			var syncAttributes = JSON.parse(localStorage[syncIndex]);
			// Store syncIndex
			syncAttributes.syncIndex = syncIndex;
			// Replace provider ID by provider module in attributes
			syncAttributes.provider = providerMap[syncAttributes.provider];
			fileDesc.syncLocations[syncIndex] = syncAttributes;
		});
	});

	// Force the synchronization
	synchronizer.forceSync = function() {
		lastSync = 0;
		synchronizer.sync();
	};
	
	// Recursive function to upload a single file on multiple locations
	var uploadSyncAttributesList = [];
	var uploadContent = undefined;
	var uploadContentCRC = undefined;
	var uploadTitle = undefined;
	var uploadTitleCRC = undefined;
	function locationUp(callback) {
		
		// No more synchronized location for this document
		if (uploadSyncAttributesList.length === 0) {
			fileUp(callback);
			return;
		}
		
		// Dequeue a synchronized location
		var syncAttributes = uploadSyncAttributesList.pop();
		// Use the specified provider to perform the upload
		syncAttributes.provider.syncUp(
			uploadContent,
			uploadContentCRC,
			uploadTitle,
			uploadTitleCRC,
			syncAttributes,
			function(error, uploadFlag) {
				if(uploadFlag === true) {
					// If uploadFlag is true, request another upload cycle
					uploadCycle = true;
				}
				if(error) {
					callback(error);
					return;
				}
				if(uploadFlag) {
					// Update syncAttributes in localStorage
					localStorage[syncIndex] = utils.serializeAttributes(syncAttributes);
				}
				locationUp(callback);
			}
		);
	}

	// Recursive function to upload multiple files
	var uploadFileList = [];
	function fileUp(callback) {
		
		// No more fileDesc to synchronize
		if (uploadFileList.length === 0) {
			syncUp(callback);
			return;
		}
		
		// Dequeue a fileDesc
		var fileDesc = uploadFileList.pop();
		uploadSyncAttributesList = _.values(fileDesc.syncLocations);
		if(uploadSyncAttributesList.length === 0) {
			fileUp(callback);
			return;
		}

		// Get document title/content 
		uploadContent = localStorage[fileDesc.fileIndex + ".content"];
		uploadContentCRC = utils.crc32(uploadContent);
		uploadTitle = fileDesc.title;
		uploadTitleCRC = utils.crc32(uploadTitle);
		locationUp(callback);
	}

	// Entry point for up synchronization (upload changes)
	var uploadCycle = false;
	function syncUp(callback) {
		if(uploadCycle === true) {
			// New upload cycle
			uploadCycle = false;
			uploadFileList = _.values(fileSystem);
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
		
		// Check that provider has files to sync
		if(!fileMgr.hasSync(provider)) {
			providerDown(callback);
			return;
		}
		
		// Perform provider's syncDown
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
		if (syncRunning || lastSync + SYNC_PERIOD > utils.currentTime || core.isOffline) {
			return;
		}
		syncRunning = true;
		extensionMgr.onSyncRunning(true);
		uploadCycle = true;
		lastSync = utils.currentTime;
		
		function isError(error) {
			if(error !== undefined) {
				syncRunning = false;
				extensionMgr.onSyncRunning(false);
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
				extensionMgr.onSyncRunning(false);
				extensionMgr.onSyncSuccess();
			});
		});
	};
	// Run sync function periodically
	if(viewerMode === false) {
		core.addPeriodicCallback(synchronizer.sync);
	}
	
	// Initialize the export dialog
	function initExportDialog(provider) {
		
		// Reset fields
		utils.resetModalInputs();
		
		// Load preferences
		var serializedPreferences = localStorage[provider.providerId + ".exportPreferences"];
		if(serializedPreferences) {
			var exportPreferences = JSON.parse(serializedPreferences);
			_.each(provider.exportPreferencesInputIds, function(inputId) {
				utils.setInputValue("#input-sync-export-" + inputId, exportPreferences[inputId]);
			});
		}
		
		// Open dialog box
		$("#modal-upload-" + provider.providerId).modal();
	}
	
	core.onReady(function() {
		// Init each provider
		_.each(providerMap, function(provider) {
			// Provider's import button
			$(".action-sync-import-" + provider.providerId).click(function(event) {
				provider.importFiles(event);
			});
			// Provider's export action
			$(".action-sync-export-dialog-" + provider.providerId).click(function() {
				initExportDialog(provider);
			});
			$(".action-sync-export-" + provider.providerId).click(function(event) {

				// Perform the provider's export
				var fileDesc = fileMgr.getCurrentFile();
				var title = fileDesc.title;
				var content = localStorage[fileDesc.fileIndex + ".content"];
				provider.exportFile(event, title, content, function(error, syncAttributes) {
					if(error) {
						return;
					}
					fileMgr.addSync(fileDesc, syncAttributes);
				});
				
				// Store input values as preferences for next time we open the export dialog
				var exportPreferences = {};
				_.each(provider.exportPreferencesInputIds, function(inputId) {
					exportPreferences[inputId] = $("#input-sync-export-" + inputId).val();
				});
				localStorage[provider.providerId + ".exportPreferences"] = JSON.stringify(exportPreferences);
			});
			// Provider's manual export button
			$(".action-sync-manual-" + provider.providerId).click(function(event) {
				var fileDesc = fileMgr.getCurrentFile();
				var title = fileDesc.title;
				var content = localStorage[fileDesc.fileIndex + ".content"];
				provider.exportManual(event, title, content, function(error, syncAttributes) {
					if(error) {
						return;
					}
					fileMgr.addSync(fileDesc, syncAttributes);
				});
			});
		});
		
		$(".action-force-sync").click(function() {
			if(!$(this).hasClass("disabled")) {
				synchronizer.forceSync();
			}
		});
	});

	extensionMgr.onSynchronizerCreated(synchronizer);
	return synchronizer;
});
