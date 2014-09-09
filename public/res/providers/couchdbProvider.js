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
	"fileSystem",
	"editor",
	"helpers/couchdbHelper"
], function($, _, constants, utils, storage, logger, Provider, settings, eventMgr, fileMgr, fileSystem, editor, couchdbHelper) {

	var PROVIDER_COUCHDB = "couchdb";

	var couchdbProvider = new Provider(PROVIDER_COUCHDB, "CouchDB");

	function createSyncIndex(id) {
		return "sync." + PROVIDER_COUCHDB + "." + id;
	}

	var merge = settings.conflictMode == 'merge';

	function createSyncAttributes(id, rev, content, title, discussionListJSON) {
		discussionListJSON = discussionListJSON || '{}';
		var syncAttributes = {};
		syncAttributes.provider = couchdbProvider;
		syncAttributes.id = id;
		syncAttributes.rev = rev;
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
		couchdbHelper.downloadContent(ids.map(function(id) {
			return {
				_id: id
			};
		}), function(error, result) {
			if(error) {
				return;
			}
			var fileDescList = [];
			var fileDesc;
			_.each(result, function(file) {
				var content = utils.decodeBase64(file._attachments.content.data);
				var parsedContent = couchdbProvider.parseContent(content);
				var syncLocations;
				var syncAttributes = createSyncAttributes(file._id, file._rev, parsedContent.content, file.title, parsedContent.discussionListJSON);
				syncLocations = {};
				syncLocations[syncAttributes.syncIndex] = syncAttributes;
				fileDesc = fileMgr.createFile(file.title, parsedContent.content, parsedContent.discussionListJSON, syncLocations);
				fileDescList.push(fileDesc);
			});
			if(fileDesc !== undefined) {
				eventMgr.onSyncImportSuccess(fileDescList, couchdbProvider);
				fileMgr.selectFile(fileDesc);
			}
		});
	}

	couchdbProvider.importFiles = function() {
		var tag = $('#select-sync-import-couchdb-tag').val();
		if(!tag) {
			var ids = _.chain(($('#input-sync-import-couchdb-documentid').val() || '').split(/\s+/))
				.compact()
				.unique()
				.value();
			var importIds = [];
			_.each(ids, function(id) {
				var syncIndex = createSyncIndex(id);
				var fileDesc = fileMgr.getFileFromSyncIndex(syncIndex);
				if(fileDesc !== undefined) {
					return eventMgr.onError('"' + fileDesc.title + '" is already in your local documents.');
				}
				importIds.push(id);
			});
			importFilesFromIds(importIds);
		}
	};

	couchdbProvider.exportFile = function(event, title, content, discussionListJSON, frontMatter, callback) {
		var data = couchdbProvider.serializeContent(content, discussionListJSON);
		var tags = frontMatter && frontMatter.tags;
		couchdbHelper.uploadDocument(undefined, title, data, tags, undefined, function(error, result) {
			if(error) {
				return callback(error);
			}
			var syncAttributes = createSyncAttributes(result.id, result.rev, content, title, discussionListJSON);
			callback(undefined, syncAttributes);
		});
	};

	couchdbProvider.syncUp = function(content, contentCRC, title, titleCRC, discussionList, discussionListCRC, frontMatter, syncAttributes, callback) {
		if(
			(syncAttributes.contentCRC == contentCRC) && // Content CRC hasn't changed
			(syncAttributes.titleCRC == titleCRC) && // Title CRC hasn't changed
			(syncAttributes.discussionListCRC == discussionListCRC) // Discussion list CRC hasn't changed
			) {
			return callback(undefined, false);
		}

		var data = couchdbProvider.serializeContent(content, discussionList);
		var tags = frontMatter && frontMatter.tags;
		couchdbHelper.uploadDocument(syncAttributes.id, title, data, tags, syncAttributes.rev, function(error, result) {
			if(error) {
				return callback(error, true);
			}
			syncAttributes.rev = result.rev;
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

	couchdbProvider.syncDown = function(callback) {
		var lastChangeId = parseInt(storage[PROVIDER_COUCHDB + ".lastChangeId"], 10);
		var syncLocations = {};
		_.each(fileSystem, function(fileDesc) {
			_.each(fileDesc.syncLocations, function(syncAttributes) {
				syncAttributes.provider === couchdbProvider && (syncLocations[syncAttributes.id] = syncAttributes);
			});
		});
		couchdbHelper.checkChanges(lastChangeId, syncLocations, function(error, changes, newChangeId) {
			if(error) {
				return callback(error);
			}
			var interestingChanges = [];
			_.each(changes, function(change) {
				var syncIndex = createSyncIndex(change._id);
				var fileDesc = fileMgr.getFileFromSyncIndex(syncIndex);
				var syncAttributes = fileDesc && fileDesc.syncLocations[syncIndex];
				if(!syncAttributes) {
					return;
				}
				// Store fileDesc and syncAttributes references to avoid 2 times search
				change.fileDesc = fileDesc;
				change.syncAttributes = syncAttributes;
				interestingChanges.push(change);
			});
			couchdbHelper.downloadContent(interestingChanges, function(error, changes) {
				if(error) {
					return callback(error);
				}
				function mergeChange() {
					if(changes.length === 0) {
						storage[PROVIDER_COUCHDB + ".lastChangeId"] = newChangeId;
						return callback();
					}
					var change = changes.pop();
					var fileDesc = change.fileDesc;
					var syncAttributes = change.syncAttributes;
					// File deleted
					if(change.deleted === true) {
						eventMgr.onError('"' + fileDesc.title + '" has been removed from CouchDB.');
						fileDesc.removeSyncLocation(syncAttributes);
						return eventMgr.onSyncRemoved(fileDesc, syncAttributes);
					}
					var file = change;
					var content = utils.decodeBase64(file._attachments.content.data);
					var parsedContent = couchdbProvider.parseContent(content);
					var remoteContent = parsedContent.content;
					var remoteTitle = file.title;
					var remoteDiscussionListJSON = parsedContent.discussionListJSON;
					var remoteDiscussionList = parsedContent.discussionList;
					var remoteCRC = couchdbProvider.syncMerge(fileDesc, syncAttributes, remoteContent, remoteTitle, remoteDiscussionList, remoteDiscussionListJSON);

					// Update syncAttributes
					syncAttributes.rev = file._rev;
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

	var documentEltTmpl = [
		'<a href="#" class="list-group-item document clearfix" data-document-id="<%= document._id %>">',
		'<div class="date pull-right"><%= date %></div></div>',
		'<div class="name"><i class="icon-provider-couchdb"></i> ',
		'<%= document.title %></div>',
		'</a>'
	].join('');


	eventMgr.addListener("onReady", function() {
		var modalElt = document.querySelector('.modal-download-couchdb');
		var $documentListElt = $(modalElt.querySelector('.list-group.document-list'));
		var $selectedDocumentListElt = $(modalElt.querySelector('.selected-document-list'));
		var $pleaseWaitElt = $(modalElt.querySelector('.please-wait'));
		var $moreDocumentsElt = $(modalElt.querySelector('.more-documents'));
		var documentMap, lastDocument;
		var selectedDocuments, $selectedElts;
		function doSelect() {
			$selectedElts = $documentListElt.children('.active').clone();
			selectedDocuments = [];
			$selectedElts.each(function() {
				selectedDocuments.push(documentMap[$(this).data('documentId')]);
			});
			$selectedDocumentListElt.empty().append($selectedElts);
			$(modalElt.querySelectorAll('.action-delete-items')).parent().toggleClass('disabled', selectedDocuments.length === 0);
		}
		function clear() {
			documentMap = {};
			lastDocument = undefined;
			$documentListElt.empty();
			doSelect();
		}
		clear();
		function deleteMode(enabled) {
			$(modalElt.querySelectorAll('.confirm-delete')).toggleClass('hide', !enabled);
			$(modalElt.querySelectorAll('.document-list')).toggleClass('hide', enabled);
		}
		function updateDocumentList() {
			$pleaseWaitElt.removeClass('hide');
			$moreDocumentsElt.addClass('hide');
			couchdbHelper.listDocuments(undefined, lastDocument && lastDocument.updated, function(err, result) {
				if(err) {
					return;
				}
				$pleaseWaitElt.addClass('hide');
				if(result.length === 3) {
					$moreDocumentsElt.removeClass('hide');
					lastDocument = result.pop();
				}
				var documentListHtml = _.reduce(result, function(result, document) {
					documentMap[document._id] = document;
					return result + _.template(documentEltTmpl, {
						document: document,
						date: utils.formatDate(document.updated)
					});
				}, '');

				$documentListElt.append(documentListHtml);
			});
			deleteMode(false);
		}
		$(modalElt)
			.on('show.bs.modal', updateDocumentList)
			.on('hidden.bs.modal', clear)
			.on('click', '.document-list .document', function() {
				$(this).toggleClass('active');
				doSelect();
			})
			.on('click', '.more-documents', updateDocumentList)
			.on('click', '.action-unselect-all', function() {
				$documentListElt.children().removeClass('active');
				doSelect();
			})
			.on('click', '.action-delete-items', function() {
				doSelect();
				if($selectedElts.length) {
					deleteMode(true);
				}
			})
			.on('click', '.action-delete-items-confirm', function() {
				couchdbHelper.deleteDocuments(selectedDocuments);
				clear();
				updateDocumentList();
			})
			.on('click', '.action-cancel', function() {
				deleteMode(false);
			});
	});

	return couchdbProvider;
});
