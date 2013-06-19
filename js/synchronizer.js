define([
    "jquery",
    "underscore",
    "core",
    "utils",
    "extensionMgr",
    "fileSystem",
    "fileMgr",
    "providers/dropboxProvider",
    "providers/gdriveProvider"
], function($, _, core, utils, extensionMgr, fileSystem, fileMgr) {

    var synchronizer = {};

    // Create a map with providerId: providerModule
    var providerMap = _.chain(arguments).map(function(argument) {
        return argument && argument.providerId && [
            argument.providerId,
            argument
        ];
    }).compact().object().value();

    // Retrieve sync locations from localStorage
    _.each(fileSystem, function(fileDesc) {
        _.each(utils.retrieveIndexArray(fileDesc.fileIndex + ".sync"), function(syncIndex) {
            try {
                var syncAttributes = JSON.parse(localStorage[syncIndex]);
                // Store syncIndex
                syncAttributes.syncIndex = syncIndex;
                // Replace provider ID by provider module in attributes
                var provider = providerMap[syncAttributes.provider];
                if(!provider) {
                    throw new Error("Invalid provider ID: " + syncAttributes.provider);
                }
                syncAttributes.provider = provider;
                fileDesc.syncLocations[syncIndex] = syncAttributes;
            }
            catch(e) {
                // localStorage can be corrupted
                extensionMgr.onError(e);
                // Remove sync location
                utils.removeIndexFromArray(fileDesc.fileIndex + ".sync", syncIndex);
                localStorage.removeItem(syncIndex);
            }
        });
    });

    // Recursive function to upload a single file on multiple locations
    var uploadSyncAttributesList = [];
    var uploadContent = undefined;
    var uploadContentCRC = undefined;
    var uploadTitle = undefined;
    var uploadTitleCRC = undefined;
    function locationUp(callback) {

        // No more synchronized location for this document
        if(uploadSyncAttributesList.length === 0) {
            fileUp(callback);
            return;
        }

        // Dequeue a synchronized location
        var syncAttributes = uploadSyncAttributesList.pop();

        // Use the specified provider to perform the upload
        syncAttributes.provider.syncUp(uploadContent, uploadContentCRC, uploadTitle, uploadTitleCRC, syncAttributes, function(error, uploadFlag) {
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
                utils.storeAttributes(syncAttributes);
            }
            locationUp(callback);
        });
    }

    // Recursive function to upload multiple files
    var uploadFileList = [];
    function fileUp(callback) {

        // No more fileDesc to synchronize
        if(uploadFileList.length === 0) {
            syncUp(callback);
            return;
        }

        // Dequeue a fileDesc to synchronize
        var fileDesc = uploadFileList.pop();
        uploadSyncAttributesList = _.values(fileDesc.syncLocations);
        if(uploadSyncAttributesList.length === 0) {
            fileUp(callback);
            return;
        }

        // Get document title/content
        uploadContent = fileDesc.content;
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
    }

    // Main entry point for synchronization
    var syncRunning = false;
    synchronizer.sync = function() {
        // If sync is already running or offline
        if(syncRunning || core.isOffline) {
            return false;
        }
        syncRunning = true;
        extensionMgr.onSyncRunning(true);
        uploadCycle = true;

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
        return true;
    };

    // Initialize the export dialog
    function initExportDialog(provider) {

        // Reset fields
        utils.resetModalInputs();

        // Load preferences
        var exportPreferences = utils.retrieveIgnoreError(provider.providerId + ".exportPreferences");
        if(exportPreferences) {
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
                var fileDesc = fileMgr.currentFile;
                provider.exportFile(event, fileDesc.title, fileDesc.content, function(error, syncAttributes) {
                    if(error) {
                        return;
                    }
                    fileDesc.addSyncLocation(syncAttributes);
                    extensionMgr.onSyncExportSuccess(fileDesc, syncAttributes);
                });

                // Store input values as preferences for next time we open the
                // export dialog
                var exportPreferences = {};
                _.each(provider.exportPreferencesInputIds, function(inputId) {
                    exportPreferences[inputId] = $("#input-sync-export-" + inputId).val();
                });
                localStorage[provider.providerId + ".exportPreferences"] = JSON.stringify(exportPreferences);
            });
            // Provider's manual export button
            $(".action-sync-manual-" + provider.providerId).click(function(event) {
                var fileDesc = fileMgr.currentFile;
                provider.exportManual(event, fileDesc.title, fileDesc.content, function(error, syncAttributes) {
                    if(error) {
                        return;
                    }
                    fileDesc.addSyncLocation(syncAttributes);
                    extensionMgr.onSyncExportSuccess(fileDesc, syncAttributes);
                });
            });
        });
    });

    extensionMgr.onSynchronizerCreated(synchronizer);
    return synchronizer;
});
