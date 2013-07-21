define([
    "underscore",
    "core",
    "utils",
    "classes/Provider",
    "settings",
    "extensionMgr",
    "fileMgr",
    "helpers/googleHelper"
], function(_, core, utils, Provider, settings, extensionMgr, fileMgr, googleHelper) {

    var PROVIDER_GDRIVE = "gdrive";

    var gdriveProvider = new Provider(PROVIDER_GDRIVE, "Google Drive");
    gdriveProvider.defaultPublishFormat = "template";
    gdriveProvider.exportPreferencesInputIds = [
        "gdrive-parentid"
    ];

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
                var fileDesc = undefined;
                _.each(result, function(file) {
                    var syncAttributes = createSyncAttributes(file.id, file.etag, file.content, file.title);
                    syncAttributes.isRealtime = file.isRealtime;
                    var syncLocations = {};
                    syncLocations[syncAttributes.syncIndex] = syncAttributes;
                    fileDesc = fileMgr.createFile(file.title, file.content, syncLocations);
                    fileDescList.push(fileDesc);
                });
                if(fileDesc !== undefined) {
                    extensionMgr.onSyncImportSuccess(fileDescList, gdriveProvider);
                    fileMgr.selectFile(fileDesc);
                }
            });
        });
    }

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

    gdriveProvider.exportRealtimeFile = function(event, title, content, callback) {
        var parentId = utils.getInputTextValue("#input-sync-export-gdrive-parentid");
        googleHelper.createRealtimeFile(parentId, title, function(error, result) {
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
                        fileDesc.removeSyncLocation(syncAttributes);
                        extensionMgr.onSyncRemoved(fileDesc, syncAttributes);
                        if(syncAttributes.isRealtime === true && fileMgr.currentFile === fileDesc) {
                            gdriveProvider.stopRealtimeSync();
                        }
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
                    if((fileTitleChanged === true && localTitleChanged === true && remoteTitleChanged === true) || (!syncAttributes.isRealtime && fileContentChanged === true && localContentChanged === true && remoteContentChanged === true)) {
                        fileMgr.createFile(localTitle + " (backup)", localContent);
                        extensionMgr.onMessage('Conflict detected on "' + localTitle + '". A backup has been created locally.');
                    }
                    // If file title changed
                    if(fileTitleChanged && remoteTitleChanged === true) {
                        fileDesc.title = file.title;
                        extensionMgr.onTitleChanged(fileDesc);
                        extensionMgr.onMessage('"' + localTitle + '" has been renamed to "' + file.title + '" on Google Drive.');
                    }
                    // If file content changed
                    if(!syncAttributes.isRealtime && fileContentChanged && remoteContentChanged === true) {
                        fileDesc.content = file.content;
                        extensionMgr.onContentChanged(fileDesc);
                        extensionMgr.onMessage('"' + file.title + '" has been updated from Google Drive.');
                        if(fileMgr.currentFile === fileDesc) {
                            fileMgr.selectFile(); // Refresh editor
                        }
                    }
                    // Update syncAttributes
                    syncAttributes.etag = file.etag;
                    if(!syncAttributes.isRealtime) {
                        syncAttributes.contentCRC = remoteContentCRC;
                    }
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

    // Keep a link to the pagedown editor
    var editor = undefined;
    extensionMgr.addHookCallback("onEditorConfigure", function(editorParam) {
        editor = editorParam;
    });

    // Start realtime synchronization
    var realtimeDocument = undefined;
    var realtimeBinding = undefined;
    var undoExecute = undefined;
    var redoExecute = undefined;
    gdriveProvider.startRealtimeSync = function(fileDesc, syncAttributes) {
        googleHelper.loadRealtime(syncAttributes.id, fileDesc.content, function(err, doc) {
            if(err || !doc) {
                return;
            }
            
            // If user just switched to another document
            if(fileMgr.currentFile !== fileDesc) {
                doc.close();
                return;
            }
            
            logger.log("Starting Google Drive realtime synchronization");
            realtimeDocument = doc;
            var model = realtimeDocument.getModel();
            var string = model.getRoot().get('content');

            // Saves model content checksum
            function updateContentState() {
                syncAttributes.contentCRC = utils.crc32(string.getText());
                utils.storeAttributes(syncAttributes);
            }

            var debouncedRefreshPreview = _.debounce(editor.refreshPreview, 100);
            // Called when a modification has been detected
            function contentChangeListener(e) {
                // If modification comes down from a collaborator
                if(e.isLocal === false) {
                    logger.log("Google Drive realtime document updated from server");
                    updateContentState();
                    debouncedRefreshPreview();
                }
            }
            // Listen to text changed events
            string.addEventListener(gapi.drive.realtime.EventType.TEXT_INSERTED, contentChangeListener);
            string.addEventListener(gapi.drive.realtime.EventType.TEXT_DELETED, contentChangeListener);
            realtimeDocument.addEventListener(gapi.drive.realtime.EventType.DOCUMENT_SAVE_STATE_CHANGED, function(e) {
                // Save success event
                if(e.isPending === false && e.isSaving === false) {
                    logger.log("Google Drive realtime document successfully saved on server");
                    updateContentState();
                }
            });

            // Try to merge offline modifications
            var localContent = fileDesc.content;
            var localContentChanged = syncAttributes.contentCRC != utils.crc32(localContent);
            var remoteContent = string.getText();
            var remoteContentCRC = utils.crc32(remoteContent);
            var remoteContentChanged = syncAttributes.contentCRC != remoteContentCRC;
            var fileContentChanged = localContent != remoteContent;
            if(fileContentChanged === true && localContentChanged === true) {
                if(remoteContentChanged === true) {
                    // Conflict detected
                    fileMgr.createFile(fileDesc.title + " (backup)", localContent);
                    extensionMgr.onMessage('Conflict detected on "' + fileDesc.title + '". A backup has been created locally.');
                }
                else {
                    // Add local modifications if no collaborators change
                    string.setText(localContent);
                }
            }

            // Binds model with textarea
            realtimeBinding = gapi.drive.realtime.databinding.bindString(string, $("#wmd-input")[0]);

            // Update content state according to collaborators changes
            if(remoteContentChanged === true) {
                logger.log("Google Drive realtime document updated from server");
                updateContentState();
                debouncedRefreshPreview();
            }

            // Save undo/redo buttons actions
            undoExecute = editor.uiManager.buttons.undo.execute;
            redoExecute = editor.uiManager.buttons.redo.execute;

            // Set new actions for undo/redo buttons
            editor.uiManager.buttons.undo.execute = function() {
                model.canUndo && model.undo();
            };
            editor.uiManager.buttons.redo.execute = function() {
                model.canRedo && model.redo();
            };

            // Add event handler for model's UndoRedoStateChanged events
            function setUndoRedoState() {
                editor.uiManager.setButtonState(editor.uiManager.buttons.undo, model.canUndo);
                editor.uiManager.setButtonState(editor.uiManager.buttons.redo, model.canRedo);
            }
            model.addEventListener(gapi.drive.realtime.EventType.UNDO_REDO_STATE_CHANGED, setUndoRedoState);
            setUndoRedoState();
            
        }, function(err) {
            console.error(err);
            if(err.type == "token_refresh_required") {
                googleHelper.forceAuthenticate();
            }
            else if(err.type == "not_found") {
                extensionMgr.onError('"' + fileDesc.title + '" has been removed from Google Drive.');
                fileDesc.removeSyncLocation(syncAttributes);
                extensionMgr.onSyncRemoved(fileDesc, syncAttributes);
                gdriveProvider.stopRealtimeSync();
            }
            else if(err.isFatal) {
                extensionMgr.onError('An error has forced real time synchronization to stop.');
                gdriveProvider.stopRealtimeSync();
            }
        });
    };

    // Stop realtime synchronization
    gdriveProvider.stopRealtimeSync = function() {
        logger.log("Stopping Google Drive realtime synchronization");
        if(realtimeBinding !== undefined) {
            realtimeBinding.unbind();
            realtimeBinding = undefined;
        }
        if(realtimeDocument !== undefined) {
            realtimeDocument.close();
            realtimeDocument = undefined;
        }

        // Set back original undo/redo actions
        editor.uiManager.buttons.undo.execute = undoExecute;
        editor.uiManager.buttons.redo.execute = redoExecute;
        editor.uiManager.setUndoRedoButtonStates();
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
                var fileDesc = fileMgr.createFile(file.title, file.content, syncLocations);
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