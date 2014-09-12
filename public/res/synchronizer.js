define([
	"jquery",
	"underscore",
	"utils",
	"storage",
	"eventMgr",
	"fileSystem",
	"fileMgr",
	"classes/Provider",
	"providers/dropboxProvider",
	"providers/couchdbProvider",
	"providers/gdriveProvider",
	"providers/gdrivesecProvider",
	"providers/gdriveterProvider"
], function($, _, utils, storage, eventMgr, fileSystem, fileMgr, Provider) {

	var synchronizer = {};

	// Create a map with providerId: providerModule
	var providerMap = _.chain(arguments).map(function(argument) {
		return argument instanceof Provider && [
			argument.providerId,
			argument
		];
	}).compact().object().value();

	// Retrieve sync locations from storage
	(function() {
		var syncIndexMap = {};
		_.each(fileSystem, function(fileDesc) {
			utils.retrieveIndexArray(fileDesc.fileIndex + ".sync").forEach(function(syncIndex) {
				try {
					var syncAttributes = JSON.parse(storage[syncIndex]);
					// Store syncIndex
					syncAttributes.syncIndex = syncIndex;
					// Replace provider ID by provider module in attributes
					var provider = providerMap[syncAttributes.provider];
					if(!provider) {
						throw new Error("Invalid provider ID: " + syncAttributes.provider);
					}
					syncAttributes.provider = provider;
					fileDesc.syncLocations[syncIndex] = syncAttributes;
					syncIndexMap[syncIndex] = syncAttributes;
				}
				catch(e) {
					// storage can be corrupted
					eventMgr.onError(e);
					// Remove sync location
					utils.removeIndexFromArray(fileDesc.fileIndex + ".sync", syncIndex);
				}
			});
		});

		// Clean fields from deleted files in local storage
		Object.keys(storage).forEach(function(key) {
			var match = key.match(/sync\.\S+/);
			if(match && !syncIndexMap.hasOwnProperty(match[0])) {
				storage.removeItem(key);
			}
		});
	})();

	// AutoSync configuration
	_.each(providerMap, function(provider) {
		provider.autosyncConfig = utils.retrieveIgnoreError(provider.providerId + ".autosyncConfig") || {};
	});

	// Returns true if at least one file has synchronized location
	synchronizer.hasSync = function(provider) {
		return _.some(fileSystem, function(fileDesc) {
			return _.some(fileDesc.syncLocations, function(syncAttributes) {
				return provider === undefined || syncAttributes.provider === provider;
			});
		});
	};

	/***************************************************************************
	 * Synchronization
	 **************************************************************************/

	// Entry point for up synchronization (upload changes)
	var uploadCycle = false;

	function syncUp(callback) {
		var uploadFileList = [];

		// Recursive function to upload multiple files
		function fileUp() {
			// No more fileDesc to synchronize
			if(uploadFileList.length === 0) {
				return syncUp(callback);
			}

			// Dequeue a fileDesc to synchronize
			var fileDesc = uploadFileList.pop();
			var uploadSyncAttributesList = _.values(fileDesc.syncLocations);
			if(uploadSyncAttributesList.length === 0) {
				return fileUp();
			}

			// Here we are freezing the data to make sure it's uploaded consistently
			var uploadContent = fileDesc.content;
			var uploadContentCRC = utils.crc32(uploadContent);
			var uploadTitle = fileDesc.title;
			var uploadTitleCRC = utils.crc32(uploadTitle);
			var uploadDiscussionList = fileDesc.discussionListJSON;
			var uploadDiscussionListCRC = utils.crc32(uploadDiscussionList);
			var uploadFrontMatter = fileDesc.frontMatter;

			// Recursive function to upload a single file on multiple locations
			function locationUp() {

				// No more synchronized location for this document
				if(uploadSyncAttributesList.length === 0) {
					return fileUp();
				}

				// Dequeue a synchronized location
				var syncAttributes = uploadSyncAttributesList.pop();

				syncAttributes.provider.syncUp(
					uploadContent,
					uploadContentCRC,
					uploadTitle,
					uploadTitleCRC,
					uploadDiscussionList,
					uploadDiscussionListCRC,
					uploadFrontMatter,
					syncAttributes,
					function(error, uploadFlag) {
						if(uploadFlag === true) {
							// If uploadFlag is true, request another upload cycle
							uploadCycle = true;
						}
						if(error) {
							return callback(error);
						}
						if(uploadFlag) {
							// Update syncAttributes in storage
							utils.storeAttributes(syncAttributes);
						}
						locationUp();
					}
				);
			}

			locationUp();
		}

		if(uploadCycle === true) {
			// New upload cycle
			uploadCycle = false;
			uploadFileList = _.values(fileSystem);
			fileUp();
		}
		else {
			callback();
		}
	}

	// Entry point for down synchronization (download changes)
	function syncDown(callback) {
		var providerList = _.values(providerMap);

		// Recursive function to download changes from multiple providers
		function providerDown() {
			if(providerList.length === 0) {
				return callback();
			}
			var provider = providerList.pop();

			// Check that provider has files to sync
			if(!synchronizer.hasSync(provider)) {
				return providerDown();
			}

			// Perform provider's syncDown
			provider.syncDown(function(error) {
				if(error) {
					return callback(error);
				}
				providerDown();
			});
		}

		providerDown();
	}

	// Entry point for the autosync feature
	function autosyncAll(callback) {
		var autosyncFileList = _.filter(fileSystem, function(fileDesc) {
			return _.size(fileDesc.syncLocations) === 0;
		});

		// Recursive function to autosync multiple files
		function fileAutosync() {
			// No more fileDesc to synchronize
			if(autosyncFileList.length === 0) {
				return callback();
			}
			var fileDesc = autosyncFileList.pop();

			var providerList = _.filter(providerMap, function(provider) {
				return provider.autosyncConfig.mode == 'all';
			});

			function providerAutosync() {
				// No more provider
				if(providerList.length === 0) {
					return fileAutosync();
				}
				var provider = providerList.pop();

				provider.autosyncFile(fileDesc.title, fileDesc.content, fileDesc.discussionListJSON, provider.autosyncConfig, function(error, syncAttributes) {
					if(error) {
						return callback(error);
					}
					fileDesc.addSyncLocation(syncAttributes);
					eventMgr.onSyncExportSuccess(fileDesc, syncAttributes);
					providerAutosync();
				});
			}

			providerAutosync();
		}

		fileAutosync();
	}

	// Listen to offline status changes
	var isOffline = false;
	eventMgr.addListener("onOfflineChanged", function(isOfflineParam) {
		isOffline = isOfflineParam;
	});

	// Main entry point for synchronization
	var syncRunning = false;
	synchronizer.sync = function() {
		// If sync is already running or offline
		if(syncRunning === true || isOffline === true) {
			return false;
		}
		syncRunning = true;
		eventMgr.onSyncRunning(true);
		uploadCycle = true;

		function isError(error) {
			if(error !== undefined) {
				syncRunning = false;
				eventMgr.onSyncRunning(false);
				return true;
			}
			return false;
		}

		autosyncAll(function(error) {
			if(isError(error)) {
				return;
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
					eventMgr.onSyncRunning(false);
					eventMgr.onSyncSuccess();
				});
			});
		});
		return true;
	};

	/***************************************************************************
	 * Initialize module
	 **************************************************************************/

	function loadPreferences(provider, action) {
		utils.resetModalInputs();
		var preferences = utils.retrieveIgnoreError(provider.providerId + '.' + action + 'Preferences');
		if(preferences) {
			_.each(provider[action + 'PreferencesInputIds'], function(inputId) {
				var exportPreferenceValue = preferences[inputId];
				var setValue = utils.setInputValue;
				if(_.isBoolean(exportPreferenceValue)) {
					setValue = utils.setInputChecked;
				}
				setValue('#input-sync-' + action + '-' + inputId, exportPreferenceValue);
			});
		}
	}

	// Initialize the import dialog
	function initImportDialog(provider) {
		loadPreferences(provider, 'import');
		$(".modal-download-" + provider.providerId).modal();
	}

	// Initialize the export dialog
	function initExportDialog(provider) {
		loadPreferences(provider, 'export');
		$(".modal-upload-" + provider.providerId).modal();
	}

	eventMgr.addListener("onFileCreated", function(fileDesc) {
		if(_.size(fileDesc.syncLocations) === 0) {
			_.each(providerMap, function(provider) {
				if(provider.autosyncConfig.mode != 'new') {
					return;
				}
				provider.autosyncFile(fileDesc.title, fileDesc.content, fileDesc.discussionListJSON, provider.autosyncConfig, function(error, syncAttributes) {
					if(error) {
						return;
					}
					fileDesc.addSyncLocation(syncAttributes);
					eventMgr.onSyncExportSuccess(fileDesc, syncAttributes);
				});
			});
		}
	});

	eventMgr.addListener("onReady", function() {
		// Init each provider
		_.each(providerMap, function(provider) {
			// Provider's import button
			$(".action-sync-import-" + provider.providerId).click(function(event) {
				provider.importFiles(event);

				// Store input values as preferences for next time we open the
				// import dialog
				var importPreferences = {};
				_.each(provider.importPreferencesInputIds, function(inputId) {
					var inputElt = document.getElementById("input-sync-import-" + inputId);
					if(inputElt.type == 'checkbox') {
						importPreferences[inputId] = inputElt.checked;
					}
					else {
						importPreferences[inputId] = inputElt.value;
					}
				});
				storage[provider.providerId + ".importPreferences"] = JSON.stringify(importPreferences);
			});
			// Provider's import dialog action
			$(".action-sync-import-dialog-" + provider.providerId).click(function() {
				initImportDialog(provider);
			});
			// Provider's export dialog action
			$(".action-sync-export-dialog-" + provider.providerId).click(function() {
				initExportDialog(provider);
			});
			// Provider's autosync action
			$(".action-autosync-dialog-" + provider.providerId).click(function() {
				// Reset fields
				utils.resetModalInputs();
				// Load config
				provider.setAutosyncDialogConfig(provider);
				// Open dialog
				$(".modal-autosync-" + provider.providerId).modal();
			});
			$(".action-sync-export-" + provider.providerId).click(function(event) {
				var fileDesc = fileMgr.currentFile;

				provider.exportFile(event, fileDesc.title, fileDesc.content, fileDesc.discussionListJSON, fileDesc.frontMatter, function(error, syncAttributes) {
					if(error) {
						return;
					}
					fileDesc.addSyncLocation(syncAttributes);
					eventMgr.onSyncExportSuccess(fileDesc, syncAttributes);
				});

				// Store input values as preferences for next time we open the
				// export dialog
				var exportPreferences = {};
				_.each(provider.exportPreferencesInputIds, function(inputId) {
					var inputElt = document.getElementById("input-sync-export-" + inputId);
					if(inputElt.type == 'checkbox') {
						exportPreferences[inputId] = inputElt.checked;
					}
					else {
						exportPreferences[inputId] = inputElt.value;
					}
				});
				storage[provider.providerId + ".exportPreferences"] = JSON.stringify(exportPreferences);
			});
			$(".action-autosync-" + provider.providerId).click(function(event) {
				var config = provider.getAutosyncDialogConfig(event);
				if(config !== undefined) {
					storage[provider.providerId + ".autosyncConfig"] = JSON.stringify(config);
					provider.autosyncConfig = config;
				}
			});
		});
	});

	eventMgr.onSynchronizerCreated(synchronizer);
	return synchronizer;
});
