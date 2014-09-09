define([
    'underscore',
    'utils',
    'settings',
    'eventMgr',
    'fileMgr',
    'editor',
    'diff_match_patch_uncompressed',
    'jsondiffpatch'
], function(_, utils, settings, eventMgr, fileMgr, editor, diff_match_patch, jsondiffpatch) {

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
                discussion.commentList && discussion.commentList.forEach(function(comment) {
                    if(
                        (!(!comment.author || _.isString(comment.author))) ||
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
        if(discussionList.length > 2) { // Serialized JSON
            return content + '<!--se_discussion_list:' + discussionList + '-->';
        }
        return content;
    };

    Provider.prototype.parseContent = function(content) {
        var discussionList;
        var discussionListJSON = '{}';
        var discussionExtractor = /<!--se_discussion_list:([\s\S]+)-->$/.exec(content);
        if(discussionExtractor && (discussionList = this.parseDiscussionList(discussionExtractor[1]))) {
            content = content.substring(0, discussionExtractor.index);
            discussionListJSON = discussionExtractor[1];
        }
        return {
            content: content,
            discussionList: discussionList || {},
            discussionListJSON: discussionListJSON
        };
    };

    var diffMatchPatch = new diff_match_patch();
    diffMatchPatch.Match_Threshold = 0;
    diffMatchPatch.Patch_DeleteThreshold = 0;
    var jsonDiffPatch = jsondiffpatch.create({
        objectHash: function(obj) {
            return JSON.stringify(obj);
        },
        textDiff: {
            minLength: 9999999
        }
    });

    var merge = settings.conflictMode == 'merge';
    Provider.prototype.syncMerge = function(fileDesc, syncAttributes, remoteContent, remoteTitle, remoteDiscussionList, remoteDiscussionListJSON) {

        function cleanupDiffs(diffs) {
            var result = [];
            var removeDiff = [-1, ''];
            var addDiff = [1, ''];
            var distance = 20;
            function pushDiff() {
                if(!removeDiff[1] && !addDiff[1]) {
                    return;
                }
                if(!removeDiff[1] || !addDiff[1]) {
                    result.push([0, removeDiff[1] + addDiff[1]]);
                }
                else {
                    removeDiff[1] = '⧸⧸' + removeDiff[1] + '⧸⧸';
                    addDiff[1] += '⧸⧸';
                    result.push(removeDiff);
                    result.push(addDiff);
                }
                removeDiff = [-1, ''];
                addDiff = [1, ''];
            }
            diffs.forEach(function(diff, index) {
                function firstOrLast() {
                    return index === 0 || index === diffs.length - 1;
                }
                var diffType = diff[0];
                var diffText = diff[1];
                if(diffType === 0) {
                    if(firstOrLast() || diffText.length > distance) {
                        if(removeDiff[1] || addDiff[1]) {
                            var match = /\s/.exec(diffText);
                            if(match) {
                                var prefixOffset = match.index;
                                var prefix = diffText.substring(0, prefixOffset);
                                diffText = diffText.substring(prefixOffset);
                                removeDiff[1] += prefix;
                                addDiff[1] += prefix;
                            }
                        }
                        if(diffText) {
                            var suffixOffset = diffText.length;
                            while(suffixOffset && /\S/.test(diffText[suffixOffset - 1])) {
                                suffixOffset--;
                            }
                            var suffix = diffText.substring(suffixOffset);
                            diffText = diffText.substring(0, suffixOffset);
                            if(firstOrLast() || diffText.length > distance) {
                                pushDiff();
                                result.push([0, diffText]);
                            }
                            else {
                                removeDiff[1] += diffText;
                                addDiff[1] += diffText;
                            }
                            removeDiff[1] += suffix;
                            addDiff[1] += suffix;
                        }
                    }
                    else {
                        removeDiff[1] += diffText;
                        addDiff[1] += diffText;
                    }
                }
                else if(diffType === -1) {
                    removeDiff[1] += diffText;
                }
                else if(diffType === 1) {
                    addDiff[1] += diffText;
                }
            });
            if(removeDiff[1] == addDiff[1]) {
                result.push([0, addDiff[1]]);
            }
            else {
                pushDiff();
            }
            return result;
        }

        var localContent = fileDesc.content;
        var localTitle = fileDesc.title;
        var localDiscussionListJSON = fileDesc.discussionListJSON;
        var localDiscussionList = fileDesc.discussionList;

        // Local/Remote CRCs
        var localContentCRC = utils.crc32(localContent);
        var localTitleCRC = utils.crc32(localTitle);
        var localDiscussionListCRC = utils.crc32(localDiscussionListJSON);
        var remoteContentCRC = utils.crc32(remoteContent);
        var remoteTitleCRC = utils.crc32(remoteTitle);
        var remoteDiscussionListCRC = utils.crc32(remoteDiscussionListJSON);

        // Check content
        var localContentChanged = syncAttributes.contentCRC != localContentCRC;
        var remoteContentChanged = syncAttributes.contentCRC != remoteContentCRC;
        var contentChanged = localContent != remoteContent && remoteContentChanged;
        var contentConflict = contentChanged && localContentChanged;

        // Check title
        syncAttributes.titleCRC = syncAttributes.titleCRC || localTitleCRC; // Not synchronized with Dropbox
        var localTitleChanged = syncAttributes.titleCRC != localTitleCRC;
        var remoteTitleChanged = syncAttributes.titleCRC != remoteTitleCRC;
        var titleChanged = localTitle != remoteTitle && remoteTitleChanged;
        var titleConflict = titleChanged && localTitleChanged;

        // Check discussionList
        var localDiscussionListChanged = syncAttributes.discussionListCRC != localDiscussionListCRC;
        var remoteDiscussionListChanged = syncAttributes.discussionListCRC != remoteDiscussionListCRC;
        var discussionListChanged = localDiscussionListJSON != remoteDiscussionListJSON && remoteDiscussionListChanged;
        var discussionListConflict = discussionListChanged && localDiscussionListChanged;

        var conflictList = [];
        var newContent = remoteContent;
        var newTitle = remoteTitle;
        var newDiscussionList = remoteDiscussionList;
        var adjustLocalDiscussionList = false;
        var adjustRemoteDiscussionList = false;
        var mergeDiscussionList = false;
        var diffs, patch;
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
            if(contentConflict) {
                // Patch content
                var oldContent = syncAttributes.content;
                diffs = diffMatchPatch.diff_main(oldContent, localContent);
                diffMatchPatch.diff_cleanupSemantic(diffs);
                patch = diffMatchPatch.patch_make(oldContent, diffs);
                var patchResult = diffMatchPatch.patch_apply(patch, remoteContent);
                newContent = patchResult[0];
                if(!patchResult[1].every(_.identity)) {
                    // Remaining conflicts
                    diffs = diffMatchPatch.diff_main(localContent, newContent);
                    diffs = cleanupDiffs(diffs);

                    newContent = '';
                    var conflict;
                    diffs.forEach(function(diff) {
                        var diffType = diff[0];
                        var diffText = diff[1];
                        if(diffType !== 0 && !conflict) {
                            conflict = {
                                selectionStart: newContent.length,
                                type: 'conflict'
                            };
                        }
                        else if(diffType === 0 && conflict) {
                            conflict.selectionEnd = newContent.length;
                            conflictList.push(conflict);
                            conflict = undefined;
                        }
                        newContent += diffText;
                    });
                    if(conflict) {
                        conflict.selectionEnd = newContent.length;
                        conflictList.push(conflict);
                    }
                }
            }

            if(contentChanged) {
                if(localDiscussionListChanged) {
                    adjustLocalDiscussionList = true;
                }
                if(remoteDiscussionListChanged) {
                    adjustRemoteDiscussionList = true;
                }
                else {
                    adjustLocalDiscussionList = true;
                    newDiscussionList = localDiscussionList;
                }
            }

            if(discussionListConflict) {
                mergeDiscussionList = true;
            }

            if(titleConflict) {
                // Patch title
                patch = diffMatchPatch.patch_make(syncAttributes.title, localTitle);
                newTitle = diffMatchPatch.patch_apply(patch, remoteTitle)[0];
            }
        }

        // Adjust local discussions offsets
        var editorSelection;
        if(contentChanged) {
            var localDiscussionArray = [];
            // Adjust editor's cursor position and local discussions at the same time
            if(fileMgr.currentFile === fileDesc) {
                editorSelection = {
                    selectionStart: editor.selectionMgr.selectionStart,
                    selectionEnd: editor.selectionMgr.selectionEnd
                };
                localDiscussionArray.push(editorSelection);
                fileDesc.newDiscussion && localDiscussionArray.push(fileDesc.newDiscussion);
            }
            if(adjustLocalDiscussionList) {
                localDiscussionArray = localDiscussionArray.concat(_.values(localDiscussionList));
            }
            discussionListChanged |= editor.adjustCommentOffsets(localContent, newContent, localDiscussionArray);
        }

        // Adjust remote discussions offsets
        if(adjustRemoteDiscussionList) {
            var remoteDiscussionArray = _.values(remoteDiscussionList);
            editor.adjustCommentOffsets(remoteContent, newContent, remoteDiscussionArray);
        }

        // Patch remote discussionList with local modifications
        if(mergeDiscussionList) {
            var oldDiscussionList = JSON.parse(syncAttributes.discussionList);
            diffs = jsonDiffPatch.diff(oldDiscussionList, localDiscussionList);
            jsonDiffPatch.patch(remoteDiscussionList, diffs);
            _.each(remoteDiscussionList, function(discussion, discussionIndex) {
                if(!discussion) {
                    delete remoteDiscussionList[discussionIndex];
                }
            });
        }

        if(conflictList.length) {
            discussionListChanged = true;
            // Add conflicts to discussionList
            conflictList.forEach(function(conflict) {
                // Create discussion index
                var discussionIndex;
                do {
                    discussionIndex = utils.id();
                } while(_.has(newDiscussionList, discussionIndex));
                conflict.discussionIndex = discussionIndex;
                newDiscussionList[discussionIndex] = conflict;
            });
        }

        if(titleChanged) {
            fileDesc.title = newTitle;
            eventMgr.onTitleChanged(fileDesc);
            eventMgr.onMessage('"' + localTitle + '" has been renamed to "' + newTitle + '" on ' + this.providerName + '.');
        }

        if(contentChanged || discussionListChanged) {
            editor.watcher.noWatch(_.bind(function() {
                if(contentChanged) {
                    if(fileMgr.currentFile === fileDesc) {
                        editor.setValueNoWatch(newContent);
                        editorSelection && editor.selectionMgr.setSelectionStartEnd(
                            editorSelection.selectionStart,
                            editorSelection.selectionEnd
                        );
                    }
                    fileDesc.content = newContent;
                    eventMgr.onContentChanged(fileDesc, newContent);
                }
                if(discussionListChanged) {
                    fileDesc.discussionList = newDiscussionList;
                    var diff = jsonDiffPatch.diff(localDiscussionList, newDiscussionList);
                    var commentsChanged = false;
                    _.each(diff, function(discussionDiff, discussionIndex) {
                        if(!_.isArray(discussionDiff)) {
                            commentsChanged = true;
                        }
                        else if(discussionDiff.length === 1) {
                            eventMgr.onDiscussionCreated(fileDesc, newDiscussionList[discussionIndex]);
                        }
                        else {
                            eventMgr.onDiscussionRemoved(fileDesc, localDiscussionList[discussionIndex]);
                        }
                    });
                    commentsChanged && eventMgr.onCommentsChanged(fileDesc);
                }
                editor.undoMgr.currentMode = 'sync';
                editor.undoMgr.saveState();
                eventMgr.onMessage('"' + remoteTitle + '" has been updated from ' + this.providerName + '.');
                if(conflictList.length) {
                    eventMgr.onMessage('"' + remoteTitle + '" has conflicts that you have to review.');
                }
            }, this));
        }

        // Return remote CRCs
        return {
            contentCRC: remoteContentCRC,
            titleCRC: remoteTitleCRC,
            discussionListCRC: remoteDiscussionListCRC
        };
    };

    return Provider;
});
