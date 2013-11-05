define([
    "underscore",
    "utils",
    "storage",
    "classes/Provider",
    "eventMgr",
    "fileMgr",
    "helpers/dropboxHelper"
], function(_, utils, storage, Provider, eventMgr, fileMgr, dropboxHelper) {

    var PROVIDER_DROPBOX = "dropbox";

    var dropboxProvider = new Provider(PROVIDER_DROPBOX, "Dropbox");
    dropboxProvider.defaultPublishFormat = "template";

    function checkPath(path) {
        if(path === undefined) {
            return undefined;
        }
        if(!path.match(/^[^\\<>:"\|?\*]+$/)) {
            eventMgr.onError('"' + path + '" contains invalid characters.');
            return undefined;
        }
        if(path.indexOf("/") !== 0) {
            return "/" + path;
        }
        return path;
    }

    function createSyncIndex(path) {
        return "sync." + PROVIDER_DROPBOX + "." + encodeURIComponent(path.toLowerCase());
    }

    function createSyncAttributes(path, versionTag, content) {
        var syncAttributes = {};
        syncAttributes.provider = dropboxProvider;
        syncAttributes.path = path;
        syncAttributes.version = versionTag;
        syncAttributes.contentCRC = utils.crc32(content);
        syncAttributes.syncIndex = createSyncIndex(path);
        return syncAttributes;
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
                var fileDescList = [];
                _.each(result, function(file) {
                    var syncAttributes = createSyncAttributes(file.path, file.versionTag, file.content);
                    var syncLocations = {};
                    syncLocations[syncAttributes.syncIndex] = syncAttributes;
                    var fileDesc = fileMgr.createFile(file.name, file.content, syncLocations);
                    fileMgr.selectFile(fileDesc);
                    fileDescList.push(fileDesc);
                });
                if(fileDescList.length !== 0) {
                    eventMgr.onSyncImportSuccess(fileDescList, dropboxProvider);
                }
            });
        });
    }

    dropboxProvider.importFiles = function() {
        dropboxHelper.picker(function(error, paths) {
            if(error || paths.length === 0) {
                return;
            }
            var importPaths = [];
            _.each(paths, function(path) {
                var syncIndex = createSyncIndex(path);
                var fileDesc = fileMgr.getFileFromSyncIndex(syncIndex);
                if(fileDesc !== undefined) {
                    eventMgr.onError('"' + fileDesc.title + '" was already imported.');
                    return;
                }
                importPaths.push(path);
            });
            importFilesFromPaths(importPaths);
        });
    };

    dropboxProvider.exportFile = function(event, title, content, callback) {
        var path = utils.getInputTextValue("#input-sync-export-dropbox-path", event);
        path = checkPath(path);
        if(path === undefined) {
            callback(true);
            return;
        }
        // Check that file is not synchronized with another one
        var syncIndex = createSyncIndex(path);
        var fileDesc = fileMgr.getFileFromSyncIndex(syncIndex);
        if(fileDesc !== undefined) {
            var existingTitle = fileDesc.title;
            eventMgr.onError('File path is already synchronized with "' + existingTitle + '".');
            callback(true);
            return;
        }
        dropboxHelper.upload(path, content, function(error, result) {
            if(error) {
                callback(error);
                return;
            }
            var syncAttributes = createSyncAttributes(result.path, result.versionTag, content);
            callback(undefined, syncAttributes);
        });
    };

    dropboxProvider.syncUp = function(uploadContent, uploadContentCRC, uploadTitle, uploadTitleCRC, syncAttributes, callback) {
        var syncContentCRC = syncAttributes.contentCRC;
        // Skip if CRC has not changed
        if(uploadContentCRC == syncContentCRC) {
            callback(undefined, false);
            return;
        }
        dropboxHelper.upload(syncAttributes.path, uploadContent, function(error, result) {
            if(error) {
                callback(error, true);
                return;
            }
            syncAttributes.version = result.versionTag;
            syncAttributes.contentCRC = uploadContentCRC;
            callback(undefined, true);
        });
    };

    dropboxProvider.syncDown = function(callback) {
        var lastChangeId = storage[PROVIDER_DROPBOX + ".lastChangeId"];
        dropboxHelper.checkChanges(lastChangeId, function(error, changes, newChangeId) {
            if(error) {
                callback(error);
                return;
            }
            var interestingChanges = [];
            _.each(changes, function(change) {
                var syncIndex = createSyncIndex(change.path);
                var syncAttributes = fileMgr.getSyncAttributes(syncIndex);
                if(syncAttributes === undefined) {
                    return;
                }
                // Store syncAttributes to avoid 2 times searching
                change.syncAttributes = syncAttributes;
                // Delete
                if(change.wasRemoved === true) {
                    interestingChanges.push(change);
                    return;
                }
                // Modify
                if(syncAttributes.version != change.stat.versionTag) {
                    interestingChanges.push(change);
                }
            });
            dropboxHelper.downloadContent(interestingChanges, function(error, changes) {
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
                    if(change.wasRemoved === true) {
                        eventMgr.onError('"' + localTitle + '" has been removed from Dropbox.');
                        fileDesc.removeSyncLocation(syncAttributes);
                        eventMgr.onSyncRemoved(fileDesc, syncAttributes);
                        return;
                    }
                    var localContent = fileDesc.content;
                    var localContentChanged = syncAttributes.contentCRC != utils.crc32(localContent);
                    var file = change.stat;
                    var remoteContentCRC = utils.crc32(file.content);
                    var remoteContentChanged = syncAttributes.contentCRC != remoteContentCRC;
                    var fileContentChanged = localContent != file.content;
                    // Conflict detection
                    if(fileContentChanged === true && localContentChanged === true && remoteContentChanged === true) {
                        fileMgr.createFile(localTitle + " (backup)", localContent);
                        eventMgr.onMessage('Conflict detected on "' + localTitle + '". A backup has been created locally.');
                    }
                    // If file content changed
                    if(fileContentChanged && remoteContentChanged === true) {
                        fileDesc.content = file.content;
                        eventMgr.onContentChanged(fileDesc);
                        eventMgr.onMessage('"' + localTitle + '" has been updated from Dropbox.');
                        if(fileMgr.currentFile === fileDesc) {
                            fileMgr.selectFile(); // Refresh editor
                        }
                    }
                    // Update syncAttributes
                    syncAttributes.version = file.versionTag;
                    syncAttributes.contentCRC = remoteContentCRC;
                    utils.storeAttributes(syncAttributes);
                });
                storage[PROVIDER_DROPBOX + ".lastChangeId"] = newChangeId;
                callback();
            });
        });
    };

    dropboxProvider.publish = function(publishAttributes, frontMatter, title, content, callback) {
        var path = checkPath(publishAttributes.path);
        if(path === undefined) {
            callback(true);
            return;
        }
        dropboxHelper.upload(path, content, callback);
    };

    dropboxProvider.newPublishAttributes = function(event) {
        var publishAttributes = {};
        publishAttributes.path = utils.getInputTextValue("#input-publish-dropbox-path", event);
        if(event.isPropagationStopped()) {
            return undefined;
        }
        return publishAttributes;
    };

    return dropboxProvider;
});