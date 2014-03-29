define([
    'underscore',
    'utils',
    'settings',
    'eventMgr',
    'fileMgr',
    'diff_match_patch_uncompressed',
    'jsondiffpatch',
], function(_, utils, settings, eventMgr, fileMgr, diff_match_patch, jsondiffpatch) {

    function Provider(providerId, providerName) {
        this.providerId = providerId;
        this.providerName = providerName;
        this.isPublishEnabled = true;
    }

    // Parse and check a JSON discussion list
    Provider.prototype.parseDiscussionList = function(discussionListJSON) {
        try {
            var discussionList = JSON.parse(discussionListJSON);
            _.each(discussionList, function(discussion, discussionIndex) {
                if(
                    (discussion.discussionIndex != discussionIndex) ||
                    (!_.isNumber(discussion.selectionStart)) ||
                    (!_.isNumber(discussion.selectionEnd))
                ) {
                    throw 'invalid';
                }
                discussion.commentList.forEach(function(comment) {
                    if(
                        (!_.isString(comment.author)) ||
                        (!_.isString(comment.content))
                    ) {
                        throw 'invalid';
                    }
                });
            });
            return discussionList;
        }
        catch(e) {
        }
    };

    Provider.prototype.serializeContent = function(content, discussionList) {
        if(_.size(discussionList) !== 0) {
            return content + '<!--se_discussion_list:' + discussionList + '-->';
        }
        return content;
    };

    Provider.prototype.parseSerializedContent = function(content) {
        var discussionList = '{}';
        var discussionExtractor = /<!--se_discussion_list:([\s\S]+)-->$/.exec(content);
        if(discussionExtractor && this.parseDiscussionList(discussionExtractor[1])) {
            content = content.substring(0, discussionExtractor.index);
            discussionList = discussionExtractor[1];
        }
        return {
            content: content,
            discussionList: discussionList
        };
    };

    var diffMatchPatch = new diff_match_patch();
    var jsonDiffPatch = jsondiffpatch.create({
        objectHash: function(obj) {
            return JSON.stringify(obj);
        },
        arrays: {
            detectMove: false,
        },
        textDiff: {
            minLength: 9999999
        }
    });

    var merge = settings.conflictMode == 'merge';
    Provider.prototype.syncMerge = function(fileDesc, syncAttributes, remoteContent, remoteTitle, remoteDiscussionListJSON) {
        var lineArray = [];
        var lineHash = {};

        function linesToChars(text) {
            var chars = '';
            var lineArrayLength = lineArray.length;
            text.split('\n').forEach(function(line) {
                if(lineHash.hasOwnProperty(line)) {
                    chars += String.fromCharCode(lineHash[line]);
                } else {
                    chars += String.fromCharCode(lineArrayLength);
                    lineHash[line] = lineArrayLength;
                    lineArray[lineArrayLength++] = line;
                }
            });
            return chars;
        }

        function moveComments(oldTextContent, newTextContent, discussionList) {
            var changes = diffMatchPatch.diff_main(oldTextContent, newTextContent);
            var updateDiscussionList = false;
            var startOffset = 0;
            changes.forEach(function(change) {
                var changeType = change[0];
                var changeText = change[1];
                if(changeType === 0) {
                    startOffset += changeText.length;
                    return;
                }
                var endOffset = startOffset;
                var diffOffset = changeText.length;
                if(changeType === -1) {
                    endOffset += diffOffset;
                    diffOffset = -diffOffset;
                }
                discussionList.forEach(function(discussion) {
                    // selectionEnd
                    if(discussion.selectionEnd >= endOffset) {
                        discussion.selectionEnd += diffOffset;
                        updateDiscussionList = true;
                    }
                    else if(discussion.selectionEnd > startOffset) {
                        discussion.selectionEnd = startOffset;
                        updateDiscussionList = true;
                    }
                    // selectionStart
                    if(discussion.selectionStart >= endOffset) {
                        discussion.selectionStart += diffOffset;
                        updateDiscussionList = true;
                    }
                    else if(discussion.selectionStart > startOffset) {
                        discussion.selectionStart = startOffset;
                        updateDiscussionList = true;
                    }
                });
                startOffset = endOffset;
            });
            return updateDiscussionList;
        }

        var localContent = fileDesc.content;
        var localTitle = fileDesc.title;
        var localDiscussionListJSON = fileDesc.discussionListJSON;

        // Local/Remote CRCs
        var localContentCRC = utils.crc32(localContent);
        var localTitleCRC = utils.crc32(localTitle);
        var localDiscussionListCRC = utils.crc32(localDiscussionListJSON);
        var remoteContentCRC = utils.crc32(remoteContent);
        var remoteTitleCRC = utils.crc32(remoteTitle);
        var remoteDiscussionListCRC = utils.crc32(remoteDiscussionListJSON);

        // Check content
        var contentChanged = localContent != remoteContent;
        var localContentChanged = syncAttributes.contentCRC != localContentCRC;
        var remoteContentChanged = syncAttributes.contentCRC != remoteContentCRC;
        var contentConflict = contentChanged && localContentChanged && remoteContentChanged;

        // Check title
        syncAttributes.titleCRC = syncAttributes.titleCRC || localTitleCRC; // Not synchronized with Dropbox
        var titleChanged = localTitle != remoteTitle;
        var localTitleChanged = syncAttributes.titleCRC != localTitleCRC;
        var remoteTitleChanged = syncAttributes.titleCRC != remoteTitleCRC;
        var titleConflict = titleChanged && localTitleChanged && remoteTitleChanged;

        // Check discussionList
        var discussionListChanged = localDiscussionListJSON != remoteDiscussionListJSON;
        var localDiscussionListChanged = syncAttributes.discussionListCRC != localDiscussionListCRC;
        var remoteDiscussionListChanged = syncAttributes.discussionListCRC != remoteDiscussionListCRC;
        var discussionListConflict = discussionListChanged && localDiscussionListChanged && remoteDiscussionListChanged;

        // Conflict detection
        if(
            (!merge && (contentConflict || titleConflict || discussionListConflict)) ||
            (contentConflict && syncAttributes.content === undefined) ||
            (titleConflict && syncAttributes.title === undefined) ||
            (discussionListConflict && syncAttributes.discussionList === undefined)
        ) {
            fileMgr.createFile(localTitle + " (backup)", localContent, localDiscussionListJSON);
            eventMgr.onMessage('Conflict detected on "' + localTitle + '". A backup has been created locally.');
        }
        else {
            var updateDiscussionList = remoteDiscussionListChanged;
            var localDiscussionList = fileDesc.discussionList;
            var remoteDiscussionList = JSON.parse(remoteDiscussionListJSON);
            var oldDiscussionList;
            var patch, delta;
            if(contentConflict) {
                // Patch content (line mode)
                var oldContentLines = linesToChars(syncAttributes.content);
                var localContentLines = linesToChars(localContent);
                var remoteContentLines = linesToChars(remoteContent);
                patch = diffMatchPatch.patch_make(oldContentLines, localContentLines);
                remoteContentLines = diffMatchPatch.patch_apply(patch, remoteContentLines)[0];
                var newContent = remoteContentLines.split('').map(function(char) {
                    return lineArray[char.charCodeAt(0)];
                }).join('\n');

                // Whether we take the local discussionList into account
                if(localDiscussionListChanged || !remoteDiscussionListChanged) {
                    // Move local discussion according to content patch
                    var localDiscussionArray = _.values(localDiscussionList);
                    fileDesc.newDiscussion && localDiscussionArray.push(fileDesc.newDiscussion);
                    updateDiscussionList |= moveComments(localContent, newContent, localDiscussionArray);
                }

                if(remoteDiscussionListChanged) {
                    // Move remote discussion according to content patch
                    var remoteDiscussionArray = _.values(remoteDiscussionList);
                    moveComments(remoteContent, newContent, remoteDiscussionArray);

                    if(localDiscussionListChanged) {
                        // Patch remote discussionList with local modifications
                        oldDiscussionList = JSON.parse(syncAttributes.discussionList);
                        delta = jsonDiffPatch.diff(oldDiscussionList, localDiscussionList);
                        jsonDiffPatch.patch(remoteDiscussionList, delta);
                    }
                }
                else {
                    remoteDiscussionList = localDiscussionList;
                }
                remoteContent = newContent;
            }
            else if(discussionListConflict) {
                // Patch remote discussionList with local modifications
                oldDiscussionList = JSON.parse(syncAttributes.discussionList);
                delta = jsonDiffPatch.diff(oldDiscussionList, localDiscussionList);
                jsonDiffPatch.patch(remoteDiscussionList, delta);
            }
            if(titleConflict) {
                // Patch title
                patch = diffMatchPatch.patch_make(syncAttributes.title, localTitle);
                remoteTitle = diffMatchPatch.patch_apply(patch, remoteTitle)[0];
            }
        }

        if(titleChanged && remoteTitleChanged) {
            fileDesc.title = remoteTitle;
            eventMgr.onTitleChanged(fileDesc);
            eventMgr.onMessage('"' + localTitle + '" has been renamed to "' + remoteTitle + '" on ' + this.providerName + '.');
        }
        if(contentChanged && remoteContentChanged === true) {
            if(fileMgr.currentFile === fileDesc) {
                document.getElementById('wmd-input').setValueSilently(remoteContent);
            }
            else {
                fileDesc.content = remoteContent;
                eventMgr.onContentChanged(fileDesc, remoteContent);
                eventMgr.onMessage('"' + remoteTitle + '" has been updated from ' + this.providerName + '.');
            }
        }
    };

    return Provider;
});
