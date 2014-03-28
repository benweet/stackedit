define([
    "underscore",
    "utils",
    "storage",
    "settings",
    "classes/Provider",
    "eventMgr",
    "fileMgr",
    "helpers/dropboxHelper"
], function(_, utils, storage, settings, Provider, eventMgr, fileMgr, dropboxHelper) {

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
                    var parsingResult = dropboxProvider.parseSerializedContent(file.content);
                    var fileDesc = fileMgr.createFile(file.name, parsingResult.content, parsingResult.discussionList, syncLocations);
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
                    return eventMgr.onError('"' + fileDesc.title + '" was already imported.');
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
            return callback(true);
        }
        // Check that file is not synchronized with another one
        var syncIndex = createSyncIndex(path);
        var fileDesc = fileMgr.getFileFromSyncIndex(syncIndex);
        if(fileDesc !== undefined) {
            var existingTitle = fileDesc.title;
            eventMgr.onError('File path is already synchronized with "' + existingTitle + '".');
            return callback(true);
        }
        dropboxHelper.upload(path, content, function(error, result) {
            if(error) {
                return callback(error);
            }
            var syncAttributes = createSyncAttributes(result.path, result.versionTag, content);
            callback(undefined, syncAttributes);
        });
    };

    var merge = settings.conflictMode == 'merge';
    dropboxProvider.syncUp = function(content, contentCRC, title, titleCRC, discussionList, discussionListCRC, syncAttributes, callback) {
        if(
            (syncAttributes.contentCRC == contentCRC) && // Content CRC hasn't changed
            (syncAttributes.discussionListCRC == discussionListCRC) // Discussion list CRC hasn't changed
        ) {
            return callback(undefined, false);
        }
        var uploadedContent = dropboxProvider.serializeContent(content, discussionList);
        dropboxHelper.upload(syncAttributes.path, uploadedContent, function(error, result) {
            if(error) {
                return callback(error, true);
            }
            syncAttributes.version = result.versionTag;
            if(merge === true) {
                // Need to store the whole content for merge
                syncAttributes.content = content;
                syncAttributes.discussionList = discussionList;
            }
            syncAttributes.contentCRC = contentCRC;
            syncAttributes.discussionListCRC = discussionListCRC;

            callback(undefined, true);
        });
    };

    dropboxProvider.syncDown = function(callback) {
        var lastChangeId = storage[PROVIDER_DROPBOX + ".lastChangeId"];
        dropboxHelper.checkChanges(lastChangeId, function(error, changes, newChangeId) {
            if(error) {
                return callback(error);
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
                    // No file corresponding (file may have been deleted locally)
                    if(fileDesc === undefined) {
                        return;
                    }
                    var localTitle = fileDesc.title;
                    // File deleted
                    if(change.wasRemoved === true) {
                        eventMgr.onError('"' + localTitle + '" has been removed from Dropbox.');
                        fileDesc.removeSyncLocation(syncAttributes);
                        return eventMgr.onSyncRemoved(fileDesc, syncAttributes);
                    }
                    var localContent = fileDesc.content;
                    var localContentChanged = syncAttributes.contentCRC != utils.crc32(localContent);
                    var localDiscussionList = fileDesc.discussionListJSON;
                    var localDiscussionListChanged = syncAttributes.discussionListCRC != utils.crc32(localDiscussionList);
                    var file = change.stat;
                    var parsingResult = dropboxProvider.parseSerializedContent(file.content);
                    var remoteContent = parsingResult.content;
                    var remoteDiscussionList = parsingResult.discussionList;
                    var remoteContentCRC = utils.crc32(remoteContent);
                    var remoteContentChanged = syncAttributes.contentCRC != remoteContentCRC;
                    var remoteDiscussionListCRC = utils.crc32(remoteDiscussionList);
                    var remoteDiscussionListChanged = syncAttributes.discussionListCRC != remoteDiscussionListCRC;
                    var fileContentChanged = localContent != remoteContent;
                    var fileDiscussionListChanged = localDiscussionList != remoteDiscussionList;
                    // Conflict detection
                    if(fileContentChanged === true && localContentChanged === true && remoteContentChanged === true) {
                        fileMgr.createFile(localTitle + " (backup)", localContent);
                        eventMgr.onMessage('Conflict detected on "' + localTitle + '". A backup has been created locally.');
                    }
                    // If file content changed
                    if(fileContentChanged && remoteContentChanged === true) {
                        fileDesc.content = file.content;
                        eventMgr.onContentChanged(fileDesc, file.content);
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
            return callback(true);
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
