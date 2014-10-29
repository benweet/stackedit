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
	"helpers/googleHelper",
	"text!html/dialogExportGdrive.html",
	"text!html/dialogAutoSyncGdrive.html"
], function($, _, constants, utils, storage, logger, Provider, settings, eventMgr, fileMgr, editor, googleHelper, dialogExportGdriveHTML, dialogAutoSyncGdriveHTML) {

	return function(providerId, providerName, accountIndex) {
		var accountId = 'google.gdrive' + accountIndex;

		var gdriveProvider = new Provider(providerId, providerName);
		gdriveProvider.defaultPublishFormat = "template";
		gdriveProvider.exportPreferencesInputIds = [
			providerId + "-parentid"
		];

		gdriveProvider.getSyncLocationLink = gdriveProvider.getPublishLocationLink = function(attributes) {
			var authuser = googleHelper.getAuthorizationMgr(accountId).getAuthUser();
			return [
				'https://docs.google.com/file/d/',
				attributes.id,
				'/edit',
				authuser ? '?authuser=' + authuser : ''
			].join('');
		};

		function createSyncIndex(id) {
			return "sync." + providerId + "." + id;
		}

		var merge = settings.conflictMode == 'merge';

		function createSyncAttributes(id, etag, content, title, discussionListJSON) {
			discussionListJSON = discussionListJSON || '{}';
			var syncAttributes = {};
			syncAttributes.provider = gdriveProvider;
			syncAttributes.id = id;
			syncAttributes.etag = etag;
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

		function importFilesFromIds(ids, cb) {
			googleHelper.downloadMetadata(ids, accountId, function(error, result) {
				if(error) {
					return cb && cb(error);
				}
				googleHelper.downloadContent(result, accountId, function(error, result) {
					if(error) {
						return cb && cb(error);
					}
					var fileDescList = [];
					var fileDesc;
					_.each(result, function(file) {
						var parsedContent = gdriveProvider.parseContent(file.content);
						var syncLocations;
						if(file.isRealtime) {
							eventMgr.onError('Real time synchronization is not supported anymore. Please use standard synchronization.');
						}
						else {
							var syncAttributes = createSyncAttributes(file.id, file.etag, parsedContent.content, file.title, parsedContent.discussionListJSON);
							syncLocations = {};
							syncLocations[syncAttributes.syncIndex] = syncAttributes;
						}
						fileDesc = fileMgr.createFile(file.title, parsedContent.content, parsedContent.discussionListJSON, syncLocations);
						fileDescList.push(fileDesc);
					});
					if(fileDesc !== undefined) {
						eventMgr.onSyncImportSuccess(fileDescList, gdriveProvider);
						fileMgr.selectFile(fileDesc);
					}
					cb && cb();
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
						return eventMgr.onError('"' + fileDesc.title + '" is already in your local documents.');
					}
					importIds.push(doc.id);
				});
				importFilesFromIds(importIds);
			}, 'doc', accountId);
		};

		gdriveProvider.exportFile = function(event, title, content, discussionListJSON, frontMatter, callback) {
			var fileId = utils.getInputTextValue('#input-sync-export-' + providerId + '-fileid');
			if(fileId) {
				// Check that file is not synchronized with another an existing
				// document
				var syncIndex = createSyncIndex(fileId);
				var fileDesc = fileMgr.getFileFromSyncIndex(syncIndex);
				if(fileDesc !== undefined) {
					eventMgr.onError('File ID is already synchronized with "' + fileDesc.title + '".');
					return callback(true);
				}
			}
			var parentId = utils.getInputTextValue('#input-sync-export-' + providerId + '-parentid');
			var data = gdriveProvider.serializeContent(content, discussionListJSON);
			googleHelper.upload(fileId, parentId, title, data, undefined, undefined, accountId, function(error, result) {
				if(error) {
					return callback(error);
				}
				var syncAttributes = createSyncAttributes(result.id, result.etag, content, title, discussionListJSON);
				callback(undefined, syncAttributes);
			});
		};

		gdriveProvider.syncUp = function(content, contentCRC, title, titleCRC, discussionList, discussionListCRC, frontMatter, syncAttributes, callback) {
			if(
				(syncAttributes.contentCRC == contentCRC) && // Content CRC hasn't changed
				(syncAttributes.titleCRC == titleCRC) && // Title CRC hasn't changed
				(syncAttributes.discussionListCRC == discussionListCRC) // Discussion list CRC hasn't changed
				) {
				return callback(undefined, false);
			}

			if(syncAttributes.isRealtime) {
				var fileDesc = fileMgr.getFileFromSyncIndex(syncAttributes.syncIndex);
				fileDesc.removeSyncLocation(syncAttributes);
				eventMgr.onSyncRemoved(fileDesc, syncAttributes);
				return eventMgr.onError('Real time synchronization is not supported anymore. Please use standard synchronization.');
			}

			var data = gdriveProvider.serializeContent(content, discussionList);
			googleHelper.upload(syncAttributes.id, undefined, title, data, undefined, syncAttributes.etag, accountId, function(error, result) {
				if(error) {
					return callback(error, true);
				}
				syncAttributes.etag = result.etag;
				// Remove this deprecated flag if any
				delete syncAttributes.isRealtime;
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

		gdriveProvider.syncDown = function(callback) {
			var lastChangeId = parseInt(storage[accountId + ".gdrive.lastChangeId"], 10);
			googleHelper.checkChanges(lastChangeId, accountId, function(error, changes, newChangeId) {
				if(error) {
					return callback(error);
				}
				var interestingChanges = [];
				_.each(changes, function(change) {
					var syncIndex = createSyncIndex(change.fileId);
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
					if(syncAttributes.etag != change.file.etag) {
						interestingChanges.push(change);
					}
				});
				googleHelper.downloadContent(interestingChanges, accountId, function(error, changes) {
					if(error) {
						callback(error);
						return;
					}
					function mergeChange() {
						if(changes.length === 0) {
							storage[accountId + ".gdrive.lastChangeId"] = newChangeId;
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
						var file = change.file;
						var parsedContent = gdriveProvider.parseContent(file.content);
						var remoteContent = parsedContent.content;
						var remoteTitle = file.title;
						var remoteDiscussionListJSON = parsedContent.discussionListJSON;
						var remoteDiscussionList = parsedContent.discussionList;
						var remoteCRC = gdriveProvider.syncMerge(fileDesc, syncAttributes, remoteContent, remoteTitle, remoteDiscussionList, remoteDiscussionListJSON);

						// Update syncAttributes
						syncAttributes.etag = file.etag;
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

		// Initialize the AutoSync dialog fields
		gdriveProvider.setAutosyncDialogConfig = function() {
			var config = gdriveProvider.autosyncConfig;
			utils.setInputRadio('radio-autosync-' + providerId + '-mode', config.mode || 'off');
			utils.setInputValue('#input-autosync-' + providerId + '-parentid', config.parentId);
		};

		// Retrieve the AutoSync dialog fields
		gdriveProvider.getAutosyncDialogConfig = function() {
			var config = {};
			config.mode = utils.getInputRadio('radio-autosync-' + providerId + '-mode');
			config.parentId = utils.getInputTextValue('#input-autosync-' + providerId + '-parentid');
			return config;
		};

		// Perform AutoSync
		gdriveProvider.autosyncFile = function(title, content, discussionListJSON, config, callback) {
			var parentId = config.parentId;
			googleHelper.upload(undefined, parentId, title, content, undefined, undefined, accountId, function(error, result) {
				if(error) {
					callback(error);
					return;
				}
				var syncAttributes = createSyncAttributes(result.id, result.etag, content, title, discussionListJSON);
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

			$('.action-remove-google-drive-state').click(function() {
				storage.removeItem('gdrive.state');
			});

			// Skip gdrive action if provider is not enabled in the settings
			if(accountIndex >= settings.gdriveMultiAccount) {
				return;
			}
			var state = utils.retrieveIgnoreError('gdrive.state');
			var userId = storage[accountId + '.userId'];
			if(state === undefined) {
				return;
			}
			if(userId && state.userId != userId) {
				if(accountIndex === settings.gdriveMultiAccount - 1) {
					if(settings.gdriveMultiAccount === 3) {
						eventMgr.onError('None of your 3 Google Drive accounts is able to perform this request.');
						storage.removeItem('gdrive.state');
					}
					else {
						$(".modal-add-google-drive-account").modal();
					}
				}
				return;
			}

			storage.removeItem('gdrive.state');
			if(state.action == "create") {
				googleHelper.upload(undefined, state.folderId, constants.GDRIVE_DEFAULT_FILE_TITLE, settings.defaultContent, undefined, undefined, accountId, utils.lockUI(function(error, file) {
					if(error) {
						return;
					}
					var syncAttributes = createSyncAttributes(file.id, file.etag, file.content, file.title);
					var syncLocations = {};
					syncLocations[syncAttributes.syncIndex] = syncAttributes;
					var fileDesc = fileMgr.createFile(file.title, file.content, undefined, syncLocations);
					fileMgr.selectFile(fileDesc);
					eventMgr.onMessage('"' + file.title + '" created successfully on ' + providerName + '.');
				}));
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
				importFilesFromIds(importIds, utils.lockUI());
			}
		});

		return gdriveProvider;
	};
});
