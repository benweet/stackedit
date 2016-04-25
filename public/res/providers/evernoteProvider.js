define([
	"underscore",
	"jquery",
	"utils",
	"settings",
	"classes/Provider",
	"eventMgr",
	"fileMgr",
	"helpers/evernoteHelper"
], function(_, $, utils, settings, Provider, eventMgr, fileMgr, evernoteHelper) {

	var PROVIDER_EVERNOTE = "evernote";

	var evernoteProvider = new Provider(PROVIDER_EVERNOTE, "Evernote");

	// evernoteProvider.getSyncLocationLink = function(attributes) {
	//   return "http://sandbox.evernote.com/Home.action";
	// };

	function createSyncIndex(guid) {
		return "sync." + PROVIDER_EVERNOTE + "." + guid;
	}

	var merge = (settings.conflictMode === 'merge');

	eventMgr.addListener("onReady", function() {
		$(".action-pick-files-evernote").click(onPickFilesClicked);
	});

	function createSyncAttributes(guid, content, title, discussionListJSON) {
		discussionListJSON = discussionListJSON || '{}';
		var syncAttributes = {};
		syncAttributes.provider = evernoteProvider;
		syncAttributes.guid = guid;
		syncAttributes.contentCRC = utils.crc32(content);
		syncAttributes.titleCRC = utils.crc32(title);
		syncAttributes.discussionListCRC = utils.crc32(discussionListJSON);
		syncAttributes.syncIndex = createSyncIndex(guid);
		if(merge === true) {
			// Need to store the whole content for merge
			syncAttributes.content = content;
			syncAttributes.title = title;
			syncAttributes.discussionList = discussionListJSON;
		}
		return syncAttributes;
	}

	evernoteProvider.importFiles = function() {
		evernoteHelper.getNotesMetadata(function(error, notes) {
			if(error || notes.length === 0) {
				return;
			}
			var pickerTable = $(".modal-picker-evernote .picker-table-evernote");
			pickerTable.empty();
			_.each(notes, function(note) {
				var guid = note.guid;
				var syncIndex = createSyncIndex(guid);
				var fileDesc = fileMgr.getFileFromSyncIndex(syncIndex);
				if(fileDesc === undefined) {
					var checkbox = $('<tr><td><input type="checkbox" value="' + guid + '" />' + note.title + '</td></tr>');
					pickerTable.append(checkbox);
				}
			});
			if (pickerTable.find("input:checkbox").length === 0) {
				eventMgr.onError("There is no note of sync enable.");
			} else {
				$(".modal-picker-evernote").modal();
			}
		});
	};

	function onPickFilesClicked() {
		var checkboxes = $(".modal-picker-evernote .picker-table-evernote input:checkbox");
		var importGuids = [];
		checkboxes.each(function() {
			var checkbox = $(this);
			if (checkbox.prop("checked")) {
				var guid = checkbox.val();
				// It's redundant to check already syncing
				var syncIndex = createSyncIndex(guid);
				var fileDesc = fileMgr.getFileFromSyncIndex(syncIndex);
				if(fileDesc !== undefined) {
					return eventMgr.onError('"' + fileDesc.title + '" is already in your local documents.');
				}
				importGuids.push(guid);
			}
		});
		if (importGuids.length !== 0) {
			importFilesFromGuids(importGuids);
		}
	}

	function importFilesFromGuids(guids) {
		evernoteHelper.downloadNotes(guids, function(error, notes) {
			if (error) {
				return;
			}
			var fileDescList = [];
			_.each(notes, function(note) {
				var parsedContent = evernoteProvider.parseContent(note.content);
				var syncAttributes = createSyncAttributes(note.guid, note.content, note.title, parsedContent.discussionListJSON);
				var syncLocations = {};
				syncLocations[syncAttributes.syncIndex] = syncAttributes;
				var fileDesc = fileMgr.createFile(note.title, parsedContent.content, parsedContent.discussionListJSON, syncLocations);
				fileMgr.selectFile(fileDesc);
				fileDescList.push(fileDesc);
			});
			if (fileDescList.length !== 0) {
				eventMgr.onSyncImportSuccess(fileDescList, evernoteProvider);
			}
		});
	}

	evernoteProvider.exportFile = function(event, title, content, discussionListJSON, frontMatter, callback) {
		var data = evernoteProvider.serializeContent(content, discussionListJSON);
		evernoteHelper.upload(undefined, title, data, function(error, result) {
			if(error) {
				return callback(error);
			}
			var syncAttributes = createSyncAttributes(result.guid, content, title, discussionListJSON);
			callback(undefined, syncAttributes);
		});
	};

	evernoteProvider.syncUp = function(content, contentCRC, title, titleCRC, discussionList, discussionListCRC, frontMatter, syncAttributes, callback) {
		if(
			(syncAttributes.contentCRC === contentCRC) && // Content CRC hasn't changed
			(syncAttributes.titleCRC === titleCRC) && // Title CRC hasn't changed
			(syncAttributes.discussionListCRC === discussionListCRC) // Discussion list CRC hasn't changed
		) {
			return callback(undefined, false);
		}
		var data = evernoteProvider.serializeContent(content, discussionList);
		evernoteHelper.upload(syncAttributes.guid, title, data, function(error, result) {
			if(error) {
				return callback(error, true);
			}
			if (result.deleted) {
				var syncIndex = createSyncIndex(result.guid);
				var fileDesc = fileMgr.getFileFromSyncIndex(syncIndex);
				if (fileDesc !== undefined) {
					eventMgr.onError('"' + fileDesc.title + '" has been removed from Evernote.');
					fileDesc.removeSyncLocation(syncAttributes);
					eventMgr.onSyncRemoved(fileDesc, syncAttributes);
				}
				return callback(undefined, true);
			}
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

	evernoteProvider.syncDown = function(callback) {
		// The content can't be modified in evernote,
		// so we don't have to check it.
		// TODO Check whether title is chenged
		return callback();
	};

	return evernoteProvider;
});
