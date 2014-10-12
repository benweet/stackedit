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

	dropboxProvider.getSyncLocationLink = dropboxProvider.getPublishLocationLink = function(attributes) {
		var pathComponents = attributes.path.split('/').map(encodeURIComponent);
		var filename = pathComponents.pop();
		return [
			'https://www.dropbox.com/home',
			pathComponents.join('/'),
			'?select=',
			filename
		].join('');
	};

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

    var merge = settings.conflictMode == 'merge';
    function createSyncAttributes(path, versionTag, content, discussionListJSON) {
        discussionListJSON = discussionListJSON || '{}';
        var syncAttributes = {};
        syncAttributes.provider = dropboxProvider;
        syncAttributes.path = path;
        syncAttributes.version = versionTag;
        syncAttributes.contentCRC = utils.crc32(content);
        syncAttributes.discussionListCRC = utils.crc32(discussionListJSON);
        syncAttributes.syncIndex = createSyncIndex(path);
        if(merge === true) {
            // Need to store the whole content for merge
            syncAttributes.content = content;
            syncAttributes.discussionList = discussionListJSON;
        }
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
                    var parsedContent = dropboxProvider.parseContent(file.content);
                    var syncAttributes = createSyncAttributes(file.path, file.versionTag, parsedContent.content, parsedContent.discussionListJSON);
                    var syncLocations = {};
                    syncLocations[syncAttributes.syncIndex] = syncAttributes;
                    var fileDesc = fileMgr.createFile(file.name, parsedContent.content, parsedContent.discussionListJSON, syncLocations);
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
                    return eventMgr.onError('"' + fileDesc.title + '" is already in your local documents.');
                }
                importPaths.push(path);
            });
            importFilesFromPaths(importPaths);
        });
    };

    dropboxProvider.exportFile = function(event, title, content, discussionListJSON, frontMatter, callback) {
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
        var data = dropboxProvider.serializeContent(content, discussionListJSON);
        dropboxHelper.upload(path, data, function(error, result) {
            if(error) {
                return callback(error);
            }
            var syncAttributes = createSyncAttributes(result.path, result.versionTag, content, discussionListJSON);
            callback(undefined, syncAttributes);
        });
    };

    dropboxProvider.syncUp = function(content, contentCRC, title, titleCRC, discussionList, discussionListCRC, frontMatter, syncAttributes, callback) {
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
            syncAttributes.titleCRC = titleCRC; // Not synchronized but has to be there for syncMerge
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
                var fileDesc = fileMgr.getFileFromSyncIndex(syncIndex);
                var syncAttributes = fileDesc && fileDesc.syncLocations[syncIndex];
                if(!syncAttributes) {
                    return;
                }
                // Store fileDesc and syncAttributes references to avoid 2 times search
                change.fileDesc = fileDesc;
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
                function mergeChange() {
                    if(changes.length === 0) {
                        storage[PROVIDER_DROPBOX + ".lastChangeId"] = newChangeId;
                        return callback();
                    }
                    var change = changes.pop();
                    var fileDesc = change.fileDesc;
                    var syncAttributes = change.syncAttributes;
                    // File deleted
                    if(change.wasRemoved === true) {
                        eventMgr.onError('"' + fileDesc.title + '" has been removed from Dropbox.');
                        fileDesc.removeSyncLocation(syncAttributes);
                        return eventMgr.onSyncRemoved(fileDesc, syncAttributes);
                    }
                    var file = change.stat;
                    var parsedContent = dropboxProvider.parseContent(file.content);
                    var remoteContent = parsedContent.content;
                    var remoteDiscussionListJSON = parsedContent.discussionListJSON;
                    var remoteDiscussionList = parsedContent.discussionList;
                    var remoteCRC = dropboxProvider.syncMerge(fileDesc, syncAttributes, remoteContent, fileDesc.title, remoteDiscussionList, remoteDiscussionListJSON);
                    // Update syncAttributes
                    syncAttributes.version = file.versionTag;
                    if(merge === true) {
                        // Need to store the whole content for merge
                        syncAttributes.content = remoteContent;
                        syncAttributes.discussionList = remoteDiscussionList;
                    }
                    syncAttributes.contentCRC = remoteCRC.contentCRC;
                    syncAttributes.discussionListCRC = remoteCRC.discussionListCRC;
                    utils.storeAttributes(syncAttributes);
                    setTimeout(mergeChange, 5);
                }
                setTimeout(mergeChange, 5);
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
