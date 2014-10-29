define([
	"jquery",
	"underscore",
	"crel",
	"alertify",
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
], function($, _, crel, alertify, constants, utils, storage, logger, Provider, settings, eventMgr, fileMgr, fileSystem, editor, couchdbHelper) {

	var PROVIDER_COUCHDB = "couchdb";

	var couchdbProvider = new Provider(PROVIDER_COUCHDB, "CouchDB");
	couchdbProvider.importPreferencesInputIds = [
		PROVIDER_COUCHDB + "-tag"
	];
	couchdbProvider.editorSharingAttributes = [
		"id"
	];

	couchdbProvider.getSyncLocationLink = function(attributes) {
		return [
			settings.couchdbUrl,
			'/',
			attributes.id,
			'/content'
		].join('');
	};

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

	function importFilesFromIds(ids, cb) {
		var importIds = [];
		_.each(ids, function(id) {
			var syncIndex = createSyncIndex(id);
			var fileDesc = fileMgr.getFileFromSyncIndex(syncIndex);
			if(fileDesc !== undefined) {
				return eventMgr.onError('"' + fileDesc.title + '" is already in your local documents.');
			}
			importIds.push(id);
		});
		if(ids.length === 0) {
			return cb && cb();
		}
		couchdbHelper.downloadContent(importIds.map(function(id) {
			return {
				_id: id
			};
		}), function(error, result) {
			if(error) {
				return cb && cb(error);
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
			cb && cb();
		});
	}

	var $documentIdsElt;
	couchdbProvider.importFiles = function() {
		var tag = $('#select-sync-import-couchdb-tag').val();
		if(!tag) {
			var ids = _.chain(($documentIdsElt.val() || '').split(/\s+/))
				.compact()
				.unique()
				.value();
			importFilesFromIds(ids);
		}
	};

	function getTags(frontMatter, title) {
		var tags = frontMatter && frontMatter.tags;
		var match = title.match(/^\s*\[(.*?)\]/);
		if(match) {
			tags = match[1];
		}
		return tags;
	}

	couchdbProvider.exportFile = function(event, title, content, discussionListJSON, frontMatter, callback) {
		var data = couchdbProvider.serializeContent(content, discussionListJSON);
		var tags = getTags(frontMatter, title);
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
		var tags = getTags(frontMatter, title);
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

	couchdbProvider.importPrivate = function(importParameters, callback) {
		importFilesFromIds([importParameters.id], callback);
	};

	eventMgr.addListener("onReady", function() {
		if(constants.COUCHDB_URL == settings.couchdbUrl) {
			$('.msg-default-couchdb').removeClass('hide');
		}
		var documentEltTmpl = [
			'<a href="#" class="list-group-item document clearfix" data-document-id="<%= document._id %>">',
			'<div class="date pull-right"><%= date %></div></div>',
			'<div class="name"><i class="icon-file"></i> ',
			'<%= document.title %></div>',
			'</a>'
		].join('');

		$documentIdsElt = $('#input-sync-import-couchdb-documentid');
		var modalElt = document.querySelector('.modal-download-couchdb');
		var $documentListElt = $(modalElt.querySelector('.document-list'));
		var $selectedDocumentListElt = $(modalElt.querySelector('.selected-document-list'));
		var $pleaseWaitElt = $(modalElt.querySelector('.please-wait'));
		var $noDocumentElt = $(modalElt.querySelector('.no-document'));
		var $moreDocumentsElt = $(modalElt.querySelector('.more-documents'));
		var documentMap, lastDocument;
		var selectedDocuments, $selectedElts;
		function doSelect() {
			$selectedElts = $documentListElt.children('.active').clone();
			selectedDocuments = [];
			var selectedDocumentIds = [];
			$selectedElts.each(function() {
				var documentId = $(this).data('documentId');
				selectedDocumentIds.push(documentId);
				selectedDocuments.push(documentMap[documentId]);
			});
			$documentIdsElt.val(selectedDocumentIds.join(' '));
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
		function setMode(mode) {
			$(modalElt.querySelectorAll('.list-mode')).toggleClass('hide', mode != 'list');
			$(modalElt.querySelectorAll('.delete-mode')).toggleClass('hide', mode != 'delete');
			$(modalElt.querySelectorAll('.byid-mode')).toggleClass('hide', mode != 'byid');
		}

		var updateDocumentList = _.debounce(function() {
			$pleaseWaitElt.removeClass('hide');
			$noDocumentElt.addClass('hide');
			$moreDocumentsElt.addClass('hide');
			couchdbHelper.listDocuments($selectTagElt.val(), lastDocument && lastDocument.updated, function(err, result) {
				$pleaseWaitElt.addClass('hide');
				if(err) {
					$moreDocumentsElt.removeClass('hide');
					return;
				}
				if(result.length === constants.COUCHDB_PAGE_SIZE) {
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
				if($documentListElt.children().length === 0) {
					$noDocumentElt.removeClass('hide');
				}
			});
			setMode('list');
		}, 10, true);

		var tagList = utils.retrieveIgnoreError(PROVIDER_COUCHDB + '.tagList') || [];
		var $selectTagElt = $('#input-sync-import-couchdb-tag')
			.on('change', function() {
				clear();
				updateDocumentList();
			});
		function updateTagList() {
			$selectTagElt.empty().append(crel('option', {
				value: ''
			}, 'none'));
			_.sortBy(tagList, function(tag) {
				return tag.toLowerCase();
			}).forEach(function(tag) {
				$selectTagElt.append(crel('option', {
					value: tag
				}, tag));
			});
		}
		updateTagList();
		$(modalElt)
			.on('show.bs.modal', function() {
				clear();
				updateDocumentList();
			})
			.on('click', '.document-list .document', function() {
				$(this).toggleClass('active');
				doSelect();
			})
			.on('click', '.more-documents', updateDocumentList)
			.on('click', '.action-unselect-all', function() {
				$documentListElt.children().removeClass('active');
				doSelect();
			})
			.on('click', '.action-byid-mode', function() {
				setMode('byid');
			})
			.on('click', '.action-add-tag', function() {
				alertify.prompt("Enter a tag (case sensitive):", function (e, tag) {
					if(!e || !tag) {
						return;
					}
					tagList.push(tag);
					tagList = _.chain(tagList)
						.sortBy(function(tag) {
							return tag.toLowerCase();
						})
						.unique(true)
						.value();
					storage[PROVIDER_COUCHDB + '.tagList'] = JSON.stringify(tagList);
					updateTagList();
					$selectTagElt.val(tag).change();
				}, "Tag");
			})
			.on('click', '.action-remove-tag', function() {
				var tag = $selectTagElt.val();
				tag && alertify.confirm('You are removing <b>' + $selectTagElt.val() + '</b> from your list of filters.', function (e) {
					if(e) {
						tagList = _.without(tagList, tag);
						storage[PROVIDER_COUCHDB + '.tagList'] = JSON.stringify(tagList);
						updateTagList();
						$selectTagElt.val('').change();
					}
				});
			})
			.on('click', '.action-delete-items', function() {
				if($selectedElts.length) {
					setMode('delete');
				}
			})
			.on('click', '.action-delete-items-confirm', function() {
				couchdbHelper.deleteDocuments(selectedDocuments);
				clear();
				updateDocumentList();
			})
			.on('click', '.action-cancel', function() {
				setMode('list');
			});
	});

	return couchdbProvider;
});
