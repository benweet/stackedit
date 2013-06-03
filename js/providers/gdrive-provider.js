define([
    "underscore",
    "core",
    "utils",
    "settings",
    "extension-manager",
    "file-manager",
    "helpers/google-helper"
], function(_, core, utils, settings, extensionMgr, fileMgr, googleHelper) {

    var PROVIDER_GDRIVE = "gdrive";

    var gdriveProvider = {
        providerId: PROVIDER_GDRIVE,
        providerName: "Google Drive",
        defaultPublishFormat: "template",
        exportPreferencesInputIds: [
            "gdrive-parentid"
        ]
    };

    function createSyncIndex(id) {
        return "sync." + PROVIDER_GDRIVE + "." + id;
    }

    function createSyncAttributes(id, etag, content, title) {
        var syncAttributes = {};
        syncAttributes.provider = gdriveProvider;
        syncAttributes.id = id;
        syncAttributes.etag = etag;
        syncAttributes.contentCRC = utils.crc32(content);
        syncAttributes.titleCRC = utils.crc32(title);
        syncAttributes.syncIndex = createSyncIndex(id);
        utils.storeAttributes(syncAttributes);
        return syncAttributes;
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
                var fileDescList = [];
                _.each(result, function(file) {
                    var syncAttributes = createSyncAttributes(file.id, file.etag, file.content, file.title);
                    var syncLocations = {};
                    syncLocations[syncAttributes.syncIndex] = syncAttributes;
                    var fileDesc = fileMgr.createFile(file.title, file.content, syncLocations);
                    fileMgr.selectFile(fileDesc);
                    fileDescList.push(fileDesc);
                });
                if(fileDescList.length !== 0) {
                    extensionMgr.onSyncImportSuccess(fileDescList, gdriveProvider);
                }
            });
        });
    }
    ;

    gdriveProvider.importFiles = function() {
        googleHelper.picker(function(error, docs) {
            if(error || docs.length === 0) {
                return;
            }
            var importIds = [];
            _.each(docs, function(doc) {
                var syncIndex = createSyncIndex(doc.id);
                var fileDesc = fileMgr.getFileFromSyncIndex(syncIndex);
                if(fileDesc !== undefined) {
                    extensionMgr.onError('"' + fileDesc.title + '" was already imported.');
                    return;
                }
                importIds.push(doc.id);
            });
            importFilesFromIds(importIds);
        });
    };

    gdriveProvider.exportFile = function(event, title, content, callback) {
        var parentId = utils.getInputTextValue("#input-sync-export-gdrive-parentid");
        googleHelper.upload(undefined, parentId, title, content, undefined, function(error, result) {
            if(error) {
                callback(error);
                return;
            }
            var syncAttributes = createSyncAttributes(result.id, result.etag, content, title);
            callback(undefined, syncAttributes);
        });
    };

    gdriveProvider.exportManual = function(event, title, content, callback) {
        var id = utils.getInputTextValue("#input-sync-manual-gdrive-id", event);
        if(!id) {
            return;
        }
        // Check that file is not synchronized with another an existing document
        var syncIndex = createSyncIndex(id);
        var fileDesc = fileMgr.getFileFromSyncIndex(syncIndex);
        if(fileDesc !== undefined) {
            extensionMgr.onError('File ID is already synchronized with "' + fileDesc.title + '".');
            callback(true);
            return;
        }
        googleHelper.upload(id, undefined, title, content, undefined, function(error, result) {
            if(error) {
                callback(error);
                return;
            }
            var syncAttributes = createSyncAttributes(result.id, result.etag, content, title);
            callback(undefined, syncAttributes);
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
        var lastChangeId = parseInt(localStorage[PROVIDER_GDRIVE + ".lastChangeId"]);
        googleHelper.checkChanges(lastChangeId, function(error, changes, newChangeId) {
            if(error) {
                callback(error);
                return;
            }
            var interestingChanges = [];
            _.each(changes, function(change) {
                var syncIndex = createSyncIndex(change.fileId);
                var syncAttributes = fileMgr.getSyncAttributes(syncIndex);
                if(syncAttributes === undefined) {
                    return;
                }
                // Store syncAttributes to avoid 2 times searching
                change.syncAttributes = syncAttributes;
                // Delete
                if(change.deleted === true) {
                    interestingChanges.push(change);
                    return;
                }
                // Modify
                if(syncAttributes.etag != change.file.etag) {
                    interestingChanges.push(change);
                }
            });
            googleHelper.downloadContent(interestingChanges, function(error, changes) {
                if(error) {
                    callback(error);
                    return;
                }
                _.each(changes, function(change) {
                    var syncAttributes = change.syncAttributes;
                    var syncIndex = syncAttributes.syncIndex;
                    var fileDesc = fileMgr.getFileFromSyncIndex(syncIndex);
                    // No file corresponding (file may have been deleted
                    // locally)
                    if(fileDesc === undefined) {
                        return;
                    }
                    var localTitle = fileDesc.title;
                    // File deleted
                    if(change.deleted === true) {
                        extensionMgr.onError('"' + localTitle + '" has been removed from Google Drive.');
                        fileMgr.removeSync(syncAttributes);
                        return;
                    }
                    var localTitleChanged = syncAttributes.titleCRC != utils.crc32(localTitle);
                    var localContent = fileDesc.content;
                    var localContentChanged = syncAttributes.contentCRC != utils.crc32(localContent);
                    var file = change.file;
                    var remoteTitleCRC = utils.crc32(file.title);
                    var remoteTitleChanged = syncAttributes.titleCRC != remoteTitleCRC;
                    var fileTitleChanged = localTitle != file.title;
                    var remoteContentCRC = utils.crc32(file.content);
                    var remoteContentChanged = syncAttributes.contentCRC != remoteContentCRC;
                    var fileContentChanged = localContent != file.content;
                    // Conflict detection
                    if((fileTitleChanged === true && localTitleChanged === true && remoteTitleChanged === true) || (fileContentChanged === true && localContentChanged === true && remoteContentChanged === true)) {
                        fileMgr.createFile(localTitle + " (backup)", localContent);
                        extensionMgr.onMessage('Conflict detected on "' + localTitle + '". A backup has been created locally.');
                    }
                    // If file title changed
                    if(fileTitleChanged && remoteTitleChanged === true) {
                        fileDesc.title = file.title;
                        extensionMgr.onMessage('"' + localTitle + '" has been renamed to "' + file.title + '" on Google Drive.');
                    }
                    // If file content changed
                    if(fileContentChanged && remoteContentChanged === true) {
                        fileDesc.content = file.content;
                        extensionMgr.onMessage('"' + file.title + '" has been updated from Google Drive.');
                        if(fileMgr.isCurrentFile(fileDesc)) {
                            fileMgr.selectFile(); // Refresh editor
                        }
                    }
                    // Update syncAttributes
                    syncAttributes.etag = file.etag;
                    syncAttributes.contentCRC = remoteContentCRC;
                    syncAttributes.titleCRC = remoteTitleCRC;
                    utils.storeAttributes(syncAttributes);
                });
                localStorage[PROVIDER_GDRIVE + ".lastChangeId"] = newChangeId;
                callback();
            });
        });
    };

    gdriveProvider.publish = function(publishAttributes, title, content, callback) {
        googleHelper.upload(publishAttributes.id, undefined, publishAttributes.fileName || title, content, undefined, function(error, result) {
            if(error) {
                callback(error);
                return;
            }
            publishAttributes.id = result.id;
            callback();
        });
    };

    gdriveProvider.newPublishAttributes = function(event) {
        var publishAttributes = {};
        publishAttributes.id = utils.getInputTextValue("#input-publish-gdrive-fileid");
        publishAttributes.fileName = utils.getInputTextValue("#input-publish-gdrive-filename");
        if(event.isPropagationStopped()) {
            return undefined;
        }
        return publishAttributes;
    };

    core.onReady(function() {
        var state = utils.retrieveIgnoreError(PROVIDER_GDRIVE + ".state");
        if(state === undefined) {
            return;
        }
        localStorage.removeItem(PROVIDER_GDRIVE + ".state");
        if(state.action == "create") {
            googleHelper.upload(undefined, state.folderId, GDRIVE_DEFAULT_FILE_TITLE, settings.defaultContent, undefined, function(error, file) {
                if(error) {
                    return;
                }
                var syncAttributes = createSyncAttributes(file.id, file.etag, file.content, file.title);
                var syncLocations = {};
                syncLocations[syncAttributes.syncIndex] = syncAttributes;
                var fileDesc = fileMgr.createFile(file.title, file.content, syncAttributes);
                fileMgr.selectFile(fileDesc);
                extensionMgr.onMessage('"' + file.title + '" created successfully on Google Drive.');
            });
        }
        else if(state.action == "open") {
            var importIds = [];
            _.each(state.ids, function(id) {
                var syncIndex = createSyncIndex(id);
                var fileDesc = fileMgr.getFileFromSyncIndex(syncIndex);
                if(fileDesc !== undefined) {
                    fileMgr.selectFile(fileDesc);
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