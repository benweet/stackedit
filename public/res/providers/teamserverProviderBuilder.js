define([
    "jquery",
    "underscore",
    "constants",
    "utils",
    "storage",
    "logger",
    "classes/Provider",
    "settings",
    "eventMgr",
    "fileMgr",
    "editor",
    "helpers/teamserverHelper"
], function($, _, constants, utils, storage, logger, Provider, settings, eventMgr, fileMgr, editor, teamserverHelper) {

    return function(providerId, providerName) {
        var repo = 'test';

        var teamserverProvider = new Provider(providerId, providerName);

        function createSyncIndex(id) {
            return "sync." + providerId + "." + id;
        }

        var merge = settings.conflictMode == 'merge';
        function createSyncAttributes(id, sha, content, title, discussionListJSON) {
            discussionListJSON = discussionListJSON || '{}';
            var syncAttributes = {};
            syncAttributes.provider = teamserverProvider;
            syncAttributes.id = id;
            syncAttributes.sha = sha;
            syncAttributes.contentCRC = utils.crc32(content);
            syncAttributes.titleCRC = utils.crc32(title);
            syncAttributes.discussionListCRC = utils.crc32(discussionListJSON);
            syncAttributes.syncIndex = createSyncIndex(id);
            if(merge === true) {
                // Need to store the whole content for merge
                syncAttributes.content = content;
                syncAttributes.title = title;
                syncAttributes.discussionList = discussionListJSON;
            }
            return syncAttributes;
        }

        function importFilesFromIds(ids) {
            teamserverHelper.download(repo, ids, function(error, result) {
                if(error) {
                    return;
                }
                var fileDescList = [];
                var fileDesc;
                _.each(result, function(file) {
                    var parsedContent = teamserverProvider.parseContent(file.content);
                    var syncLocations;
                    var syncAttributes = createSyncAttributes(file.id, file.sha, parsedContent.content, file.title, parsedContent.discussionListJSON);
                    syncLocations = {};
                    syncLocations[syncAttributes.syncIndex] = syncAttributes;
                    fileDesc = fileMgr.createFile(file.title, parsedContent.content, parsedContent.discussionListJSON, syncLocations);
                    fileDescList.push(fileDesc);
                });
                if(fileDesc !== undefined) {
                    eventMgr.onSyncImportSuccess(fileDescList, teamserverProvider);
                    fileMgr.selectFile(fileDesc);
                }
            });
        }

        teamserverProvider.importFiles = function() {
            teamserverHelper.picker(repo, function(error, docs) {
                if(error || docs.length === 0) {
                    return;
                }
                var importIds = [];
                _.each(docs, function(doc) {
                    var syncIndex = createSyncIndex(doc.id);
                    var fileDesc = fileMgr.getFileFromSyncIndex(syncIndex);
                    if(fileDesc !== undefined) {
                        eventMgr.onError('"' + fileDesc.title + '" was already imported.');
                        return;
                    }
                    importIds.push(doc.id);
                });
                importFilesFromIds(importIds);
            });
        };

        teamserverProvider.exportFile = function(event, title, content, discussionListJSON, callback) {
            var data = teamserverProvider.serializeContent(content, discussionListJSON);
            teamserverHelper.upload(repo, undefined, title, data, function(error, result) {
                if(error) {
                    return callback(error);
                }
                var syncAttributes = createSyncAttributes(result.id, result.sha, content, title, discussionListJSON);
                callback(undefined, syncAttributes);
            });
        };

        teamserverProvider.syncUp = function(content, contentCRC, title, titleCRC, discussionList, discussionListCRC, syncAttributes, callback) {
            if(
                (syncAttributes.contentCRC == contentCRC) && // Content CRC hasn't changed
                (syncAttributes.titleCRC == titleCRC) && // Title CRC hasn't changed
                (syncAttributes.discussionListCRC == discussionListCRC) // Discussion list CRC hasn't changed
            ) {
                return callback(undefined, false);
            }

            var data = teamserverProvider.serializeContent(content, discussionList);
            teamserverHelper.upload(repo, syncAttributes.id, title, data, function(error, result) {
                if(error) {
                    callback(error, true);
                    return;
                }
                syncAttributes.etag = result.etag;
                if(merge === true) {
                    // Need to store the whole content for merge
                    syncAttributes.content = content;
                    syncAttributes.title = title;
                    syncAttributes.discussionList = discussionList;
                }
                syncAttributes.contentCRC = contentCRC;
                syncAttributes.titleCRC = titleCRC;
                syncAttributes.discussionListCRC = discussionListCRC;
                callback(undefined, true);
            });
        };

        teamserverProvider.syncDown = function(callback) {
            var lastChangeId = parseInt(storage["teamserver.lastChangeId"], 10);
            teamserverHelper.checkChanges(repo, lastChangeId, function(error, changes, newChangeId) {
                if(error) {
                    return callback(error);
                }
                var interestingChanges = [];
                _.each(changes, function(change, id) {
                    var syncIndex = createSyncIndex(id);
                    var fileDesc = fileMgr.getFileFromSyncIndex(syncIndex);
                    var syncAttributes = fileDesc && fileDesc.syncLocations[syncIndex];
                    if(!syncAttributes) {
                        return;
                    }
                    // Store fileDesc and syncAttributes references to avoid 2 times search
                    change.fileDesc = fileDesc;
                    change.syncAttributes = syncAttributes;
                    // Delete
                    if(change.deleted === true) {
                        interestingChanges.push(change);
                        return;
                    }
                    // Modify
                    if(syncAttributes.sha != change.sha) {
                        interestingChanges.push(change);
                    }
                });
                teamserverHelper.download(repo, interestingChanges, function(error, changes) {
                    if(error) {
                        return callback(error);
                    }
                    function mergeChange() {
                        if(changes.length === 0) {
                            storage["teamserver.lastChangeId"] = newChangeId;
                            return callback();
                        }
                        var change = changes.pop();
                        var fileDesc = change.fileDesc;
                        var syncAttributes = change.syncAttributes;
                        // File deleted
                        if(change.deleted === true) {
                            eventMgr.onError('"' + fileDesc.title + '" has been removed from ' + providerName + '.');
                            fileDesc.removeSyncLocation(syncAttributes);
                            return eventMgr.onSyncRemoved(fileDesc, syncAttributes);
                        }
                        var parsedContent = teamserverProvider.parseContent(change.content);
                        var remoteContent = parsedContent.content;
                        var remoteTitle = change.title;
                        var remoteDiscussionListJSON = parsedContent.discussionListJSON;
                        var remoteDiscussionList = parsedContent.discussionList;
                        var remoteCRC = teamserverProvider.syncMerge(fileDesc, syncAttributes, remoteContent, remoteTitle, remoteDiscussionList, remoteDiscussionListJSON);

                        // Update syncAttributes
                        syncAttributes.sha = change.sha;
                        if(merge === true) {
                            // Need to store the whole content for merge
                            syncAttributes.content = remoteContent;
                            syncAttributes.title = remoteTitle;
                            syncAttributes.discussionList = remoteDiscussionListJSON;
                        }
                        syncAttributes.contentCRC = remoteCRC.contentCRC;
                        syncAttributes.titleCRC = remoteCRC.titleCRC;
                        syncAttributes.discussionListCRC = remoteCRC.discussionListCRC;
                        utils.storeAttributes(syncAttributes);
                        setTimeout(mergeChange, 5);
                    }
                    setTimeout(mergeChange, 5);
                });
            });
        };

        return teamserverProvider;
    };
});
