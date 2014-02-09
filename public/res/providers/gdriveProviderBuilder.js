/*global gapi */
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
    "helpers/googleHelper",
    "text!html/dialogExportGdrive.html",
    "text!html/dialogAutoSyncGdrive.html",
], function($, _, constants, utils, storage, logger, Provider, settings, eventMgr, fileMgr, googleHelper, dialogExportGdriveHTML, dialogAutoSyncGdriveHTML) {
    
    return function(providerId, providerName, accountIndex) {
        var accountId = 'google.gdrive' + accountIndex;
        
        var gdriveProvider = new Provider(providerId, providerName);
        gdriveProvider.defaultPublishFormat = "template";
        gdriveProvider.exportPreferencesInputIds = [
            providerId + "-parentid",
            providerId + "-realtime",
        ];
    
        function createSyncIndex(id) {
            return "sync." + providerId + "." + id;
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
            googleHelper.downloadMetadata(ids, accountId, function(error, result) {
                if(error) {
                    return;
                }
                googleHelper.downloadContent(result, accountId, function(error, result) {
                    if(error) {
                        return;
                    }
                    var fileDescList = [];
                    var fileDesc;
                    _.each(result, function(file) {
                        var syncAttributes = createSyncAttributes(file.id, file.etag, file.content, file.title);
                        syncAttributes.isRealtime = file.isRealtime;
                        var syncLocations = {};
                        syncLocations[syncAttributes.syncIndex] = syncAttributes;
                        fileDesc = fileMgr.createFile(file.title, file.content, syncLocations);
                        fileDescList.push(fileDesc);
                    });
                    if(fileDesc !== undefined) {
                        eventMgr.onSyncImportSuccess(fileDescList, gdriveProvider);
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
                        eventMgr.onError('"' + fileDesc.title + '" was already imported.');
                        return;
                    }
                    importIds.push(doc.id);
                });
                importFilesFromIds(importIds);
            }, 'doc', accountId);
        };
    
        gdriveProvider.exportFile = function(event, title, content, callback) {
            var fileId = utils.getInputTextValue('#input-sync-export-' + providerId + '-fileid');
            if(fileId) {
                // Check that file is not synchronized with another an existing
                // document
                var syncIndex = createSyncIndex(fileId);
                var fileDesc = fileMgr.getFileFromSyncIndex(syncIndex);
                if(fileDesc !== undefined) {
                    eventMgr.onError('File ID is already synchronized with "' + fileDesc.title + '".');
                    callback(true);
                    return;
                }
            }
            var parentId = utils.getInputTextValue('#input-sync-export-' + providerId + '-parentid');
            googleHelper.upload(fileId, parentId, title, content, undefined, undefined, accountId, function(error, result) {
                if(error) {
                    callback(error);
                    return;
                }
                var syncAttributes = createSyncAttributes(result.id, result.etag, content, title);
                callback(undefined, syncAttributes);
            });
        };
    
        gdriveProvider.exportRealtimeFile = function(event, title, content, callback) {
            var parentId = utils.getInputTextValue('#input-sync-export-' + providerId + '-parentid');
            googleHelper.createRealtimeFile(parentId, title, accountId, function(error, result) {
                if(error) {
                    callback(error);
                    return;
                }
                var syncAttributes = createSyncAttributes(result.id, result.etag, content, title);
                callback(undefined, syncAttributes);
            });
        };
    
        gdriveProvider.syncUp = function(uploadContent, uploadContentCRC, uploadTitle, uploadTitleCRC, syncAttributes, callback) {
            // Skip if CRC has not changed
            if(uploadContentCRC == syncAttributes.contentCRC && uploadTitleCRC == syncAttributes.titleCRC) {
                callback(undefined, false);
                return;
            }
            googleHelper.upload(syncAttributes.id, undefined, uploadTitle, uploadContent, undefined, syncAttributes.etag, accountId, function(error, result) {
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
    
        gdriveProvider.syncUpRealtime = function(uploadContent, uploadContentCRC, uploadTitle, uploadTitleCRC, syncAttributes, callback) {
            // Skip if title CRC has not changed
            if(uploadTitleCRC == syncAttributes.titleCRC) {
                callback(undefined, false);
                return;
            }
            googleHelper.rename(syncAttributes.id, uploadTitle, accountId, function(error, result) {
                if(error) {
                    callback(error, true);
                    return;
                }
                syncAttributes.etag = result.etag;
                syncAttributes.titleCRC = uploadTitleCRC;
                callback(undefined, true);
            });
        };
    
        gdriveProvider.syncDown = function(callback) {
            var lastChangeId = parseInt(storage[accountId + ".gdrive.lastChangeId"], 10);
            googleHelper.checkChanges(lastChangeId, accountId, function(error, changes, newChangeId) {
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
                googleHelper.downloadContent(interestingChanges, accountId, function(error, changes) {
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
                            eventMgr.onError('"' + localTitle + '" has been removed from ' + providerName + '.');
                            fileDesc.removeSyncLocation(syncAttributes);
                            eventMgr.onSyncRemoved(fileDesc, syncAttributes);
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
                            eventMgr.onMessage('Conflict detected on "' + localTitle + '". A backup has been created locally.');
                        }
                        // If file title changed
                        if(fileTitleChanged && remoteTitleChanged === true) {
                            fileDesc.title = file.title;
                            eventMgr.onTitleChanged(fileDesc);
                            eventMgr.onMessage('"' + localTitle + '" has been renamed to "' + file.title + '" on ' + providerName + '.');
                        }
                        // If file content changed
                        if(!syncAttributes.isRealtime && fileContentChanged && remoteContentChanged === true) {
                            fileDesc.content = file.content;
                            eventMgr.onContentChanged(fileDesc);
                            eventMgr.onMessage('"' + file.title + '" has been updated from ' + providerName + '.');
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
                    storage[accountId + ".gdrive.lastChangeId"] = newChangeId;
                    callback();
                });
            });
        };
    
        gdriveProvider.publish = function(publishAttributes, frontMatter, title, content, callback) {
            var contentType = publishAttributes.format != "markdown" ? 'text/html' : undefined;
            googleHelper.upload(publishAttributes.id, undefined, publishAttributes.fileName || title, content, contentType, undefined, accountId, function(error, result) {
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
            publishAttributes.id = utils.getInputTextValue('#input-publish-' + providerId + '-fileid');
            publishAttributes.fileName = utils.getInputTextValue('#input-publish-' + providerId + '-filename');
            if(event.isPropagationStopped()) {
                return undefined;
            }
            return publishAttributes;
        };
    
        // Keep a link to the Pagedown editor
        var pagedownEditor;
        var undoExecute;
        var redoExecute;
        var setUndoRedoButtonStates;
        eventMgr.addListener("onPagedownConfigure", function(pagedownEditorParam) {
            pagedownEditor = pagedownEditorParam;
        });
    
        // Keep a link to the ACE editor
        var realtimeContext;
        var aceEditor;
        var isAceUpToDate = true;
        eventMgr.addListener('onAceCreated', function(aceEditorParam) {
            aceEditor = aceEditorParam;
            // Listen to editor's changes
            aceEditor.session.on('change', function() {
                // Update the real time model if any
                realtimeContext && realtimeContext.string && realtimeContext.string.setText(aceEditor.getValue());
            });
        });
    
        // Start realtime synchronization
        var Range = require('ace/range').Range;
        gdriveProvider.startRealtimeSync = function(fileDesc, syncAttributes) {
            var localContext = {};
            realtimeContext = localContext;
            googleHelper.loadRealtime(syncAttributes.id, fileDesc.content, accountId, function(err, doc) {
                if(err || !doc) {
                    return;
                }
    
                // If user just switched to another document or file has just been
                // reselected
                if(localContext.isStopped === true) {
                    doc.close();
                    return;
                }
    
                logger.log("Starting Google Drive realtime synchronization");
                localContext.document = doc;
                var model = doc.getModel();
                var realtimeString = model.getRoot().get('content');
    
                // Saves model content checksum
                function updateContentState() {
                    syncAttributes.contentCRC = utils.crc32(realtimeString.getText());
                    utils.storeAttributes(syncAttributes);
                }
    
                var debouncedRefreshPreview = _.debounce(pagedownEditor.refreshPreview, 100);
    
                // Listen to insert text events
                realtimeString.addEventListener(gapi.drive.realtime.EventType.TEXT_INSERTED, function(e) {
                    if(aceEditor !== undefined && (isAceUpToDate === false || e.isLocal === false)) {
                        // Update ACE editor
                        var position = aceEditor.session.doc.indexToPosition(e.index);
                        aceEditor.session.insert(position, e.text);
                        isAceUpToDate = true;
                    }
                    // If modifications come down from a collaborator
                    if(e.isLocal === false) {
                        logger.log("Google Drive realtime document updated from server");
                        updateContentState();
                        aceEditor === undefined && debouncedRefreshPreview();
                    }
                });
                // Listen to delete text events
                realtimeString.addEventListener(gapi.drive.realtime.EventType.TEXT_DELETED, function(e) {
                    if(aceEditor !== undefined && (isAceUpToDate === false || e.isLocal === false)) {
                        // Update ACE editor
                        var range = (function(posStart, posEnd) {
                            return new Range(posStart.row, posStart.column, posEnd.row, posEnd.column);
                        })(aceEditor.session.doc.indexToPosition(e.index), aceEditor.session.doc.indexToPosition(e.index + e.text.length));
                        aceEditor.session.remove(range);
                        isAceUpToDate = true;
                    }
                    // If modifications come down from a collaborator
                    if(e.isLocal === false) {
                        logger.log("Google Drive realtime document updated from server");
                        updateContentState();
                        aceEditor === undefined && debouncedRefreshPreview();
                    }
                });
                doc.addEventListener(gapi.drive.realtime.EventType.DOCUMENT_SAVE_STATE_CHANGED, function(e) {
                    // Save success event
                    if(e.isPending === false && e.isSaving === false) {
                        logger.log("Google Drive realtime document successfully saved on server");
                        updateContentState();
                    }
                });
    
                // Try to merge offline modifications
                var localContent = fileDesc.content;
                var localContentChanged = syncAttributes.contentCRC != utils.crc32(localContent);
                var remoteContent = realtimeString.getText();
                var remoteContentCRC = utils.crc32(remoteContent);
                var remoteContentChanged = syncAttributes.contentCRC != remoteContentCRC;
                var fileContentChanged = localContent != remoteContent;
                if(fileContentChanged === true && localContentChanged === true) {
                    if(remoteContentChanged === true) {
                        // Conflict detected
                        fileMgr.createFile(fileDesc.title + " (backup)", localContent);
                        eventMgr.onMessage('Conflict detected on "' + fileDesc.title + '". A backup has been created locally.');
                    }
                    else {
                        // Add local modifications if no collaborators change
                        realtimeString.setText(localContent);
                    }
                }
    
                if(aceEditor === undefined) {
                    // Binds model with textarea
                    localContext.binding = gapi.drive.realtime.databinding.bindString(realtimeString, document.getElementById("wmd-input"));
                }
    
                // Update content state according to collaborators changes
                if(remoteContentChanged === true) {
                    logger.log("Google Drive realtime document updated from server");
                    aceEditor !== undefined && aceEditor.setValue(remoteContent, -1);
                    updateContentState();
                    aceEditor === undefined && debouncedRefreshPreview();
                }
    
                if(aceEditor !== undefined) {
                    // Tell ACE to update realtime string on each change
                    localContext.string = realtimeString;
                }
    
                // Save undo/redo buttons default actions
                undoExecute = pagedownEditor.uiManager.buttons.undo.execute;
                redoExecute = pagedownEditor.uiManager.buttons.redo.execute;
                setUndoRedoButtonStates = pagedownEditor.uiManager.setUndoRedoButtonStates;
                
                // Set temporary actions for undo/redo buttons
                pagedownEditor.uiManager.buttons.undo.execute = function() {
                    if(model.canUndo) {
                        // This flag is used to avoid replaying editor's own
                        // modifications (assuming it's synchronous)
                        isAceUpToDate = false;
                        model.undo();
                    }
                };
                pagedownEditor.uiManager.buttons.redo.execute = function() {
                    if(model.canRedo) {
                        // This flag is used to avoid replaying editor's own
                        // modifications (assuming it's synchronous)
                        isAceUpToDate = false;
                        model.redo();
                    }
                };
    
                // Add event handler for model's UndoRedoStateChanged events
                pagedownEditor.uiManager.setUndoRedoButtonStates = function() {
                    setTimeout(function() {
                        pagedownEditor.uiManager.setButtonState(pagedownEditor.uiManager.buttons.undo, model.canUndo);
                        pagedownEditor.uiManager.setButtonState(pagedownEditor.uiManager.buttons.redo, model.canRedo);
                    }, 50);
                };
                pagedownEditor.uiManager.setUndoRedoButtonStates();
                model.addEventListener(gapi.drive.realtime.EventType.UNDO_REDO_STATE_CHANGED, function() {
                    pagedownEditor.uiManager.setUndoRedoButtonStates();
                });
    
            }, function(err) {
                console.error(err);
                if(err.type == "token_refresh_required") {
                    googleHelper.refreshGdriveToken(accountId);
                }
                else if(err.type == "not_found") {
                    eventMgr.onError('"' + fileDesc.title + '" has been removed from ' + providerName + '.');
                    fileDesc.removeSyncLocation(syncAttributes);
                    eventMgr.onSyncRemoved(fileDesc, syncAttributes);
                    gdriveProvider.stopRealtimeSync();
                }
                else if(err.isFatal) {
                    eventMgr.onError('An error has forced real time synchronization to stop.');
                    gdriveProvider.stopRealtimeSync();
                }
            });
        };
    
        // Stop realtime synchronization
        gdriveProvider.stopRealtimeSync = function() {
            logger.log("Stopping Google Drive realtime synchronization");
            if(realtimeContext !== undefined) {
                realtimeContext.isStopped = true;
                realtimeContext.binding && realtimeContext.binding.unbind();
                realtimeContext.document && realtimeContext.document.close();
                realtimeContext = undefined;
            }
    
            if(setUndoRedoButtonStates !== undefined) {
                // Set back original undo/redo actions
                pagedownEditor.uiManager.buttons.undo.execute = undoExecute;
                pagedownEditor.uiManager.buttons.redo.execute = redoExecute;
                pagedownEditor.uiManager.setUndoRedoButtonStates = setUndoRedoButtonStates;
                pagedownEditor.uiManager.setUndoRedoButtonStates();
            }
        };
        
        // Initialize the AutoSync dialog fields
        gdriveProvider.setAutosyncDialogConfig = function() {
            var config = gdriveProvider.autosyncConfig;
            utils.setInputChecked('#input-autosync-' + providerId + '-enabled', config.enabled);
            utils.setInputValue('#input-autosync-' + providerId + '-parentid', config.parentId);
        };
        
        // Retrieve the AutoSync dialog fields
        gdriveProvider.getAutosyncDialogConfig = function() {
            var config = {};
            config.enabled = utils.getInputChecked('#input-autosync-' + providerId + '-enabled');
            config.parentId = utils.getInputTextValue('#input-autosync-' + providerId + '-parentid');
            return config;
        };
        
        // Perform AutoSync
        gdriveProvider.autosyncFile = function(title, content, config, callback) {
            var parentId = config.parentId;
            googleHelper.upload(undefined, parentId, title, content, undefined, undefined, accountId, function(error, result) {
                if(error) {
                    callback(error);
                    return;
                }
                var syncAttributes = createSyncAttributes(result.id, result.etag, content, title);
                callback(undefined, syncAttributes);
            });
        };
        
        // Disable publish on optional multi-account
        gdriveProvider.isPublishEnabled = settings.gdriveMultiAccount > accountIndex;
    
        eventMgr.addListener("onReady", function() {
            // Hide optional multi-account sub-menus
            $('.submenu-sync-' + providerId).toggle(settings.gdriveMultiAccount > accountIndex);

            // Create export dialog
            var modalUploadElt = document.querySelector('.modal-upload-' + providerId);
            modalUploadElt && (modalUploadElt.innerHTML = _.template(dialogExportGdriveHTML, {
                providerId: providerId,
                providerName: providerName
            }));
            
            // Create autosync dialog
            var modalAutosyncElt = document.querySelector('.modal-autosync-' + providerId);
            modalAutosyncElt && (modalAutosyncElt.innerHTML = _.template(dialogAutoSyncGdriveHTML, {
                providerId: providerId,
                providerName: providerName
            }));
            
            // Choose folder button in export modal
            $('.action-export-' + providerId + '-choose-folder').click(function() {
                googleHelper.picker(function(error, docs) {
                    if(error || docs.length === 0) {
                        return;
                    }
                    // Open export dialog
                    $(".modal-upload-" + providerId).modal();
                    // Set parent ID
                    utils.setInputValue('#input-sync-export-' + providerId + '-parentid', docs[0].id);
                }, 'folder', accountId);
            });
    
            // Choose folder button in autosync modal
            $('.action-autosync-' + providerId + '-choose-folder').click(function() {
                googleHelper.picker(function(error, docs) {
                    if(error || docs.length === 0) {
                        return;
                    }
                    // Open export dialog
                    $(".modal-autosync-" + providerId).modal();
                    // Set parent ID
                    utils.setInputValue('#input-autosync-' + providerId + '-parentid', docs[0].id);
                }, 'folder', accountId);
            });
    
            // On export, disable file ID input if realtime is checked
            var $realtimeCheckboxElt = $('#input-sync-export-' + providerId + '-realtime');
            var $fileIdInputElt = $('#input-sync-export-' + providerId + '-fileid');
            $('#input-sync-export-' + providerId + '-realtime').change(function() {
                $fileIdInputElt.prop('disabled', $realtimeCheckboxElt.prop('checked'));
            });
            
            // Skip gdrive action if provider is not enabled in the settings
            if(accountIndex >= settings.gdriveMultiAccount) {
                return;
            }
            var state = utils.retrieveIgnoreError(providerId + ".state");
            var userId = storage[accountId + '.userId'];
            if(state === undefined || (userId && state.userId != userId)) {
                return;
            }
            storage.removeItem(providerId + ".state");
            if(state.action == "create") {
                googleHelper.upload(undefined, state.folderId, constants.GDRIVE_DEFAULT_FILE_TITLE, settings.defaultContent, undefined, undefined, accountId, function(error, file) {
                    if(error) {
                        return;
                    }
                    var syncAttributes = createSyncAttributes(file.id, file.etag, file.content, file.title);
                    var syncLocations = {};
                    syncLocations[syncAttributes.syncIndex] = syncAttributes;
                    var fileDesc = fileMgr.createFile(file.title, file.content, syncLocations);
                    fileMgr.selectFile(fileDesc);
                    eventMgr.onMessage('"' + file.title + '" created successfully on ' + providerName + '.');
                });
            }
            else if(state.action == "open") {
                var importIds = [];
                _.each(state.ids, function(id) {
                    var syncIndex = createSyncIndex(id);
                    var fileDesc = fileMgr.getFileFromSyncIndex(syncIndex);
                    if(fileDesc !== undefined) {
                        fileDesc !== fileMgr.currentFile && fileMgr.selectFile(fileDesc);
                    }
                    else {
                        importIds.push(id);
                    }
                });
                importFilesFromIds(importIds);
            }
        });
    
        return gdriveProvider;
    };
});