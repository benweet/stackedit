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
    Provider.prototype.merge = function(localContent, remoteContent, localTitle, remoteTitle, localDiscussionList, remoteDiscussionList, syncAttributes) {

        // Local/Remote CRCs
        var localContentCRC = utils.crc32(localContent);
        var localTitleCRC = utils.crc32(localTitle);
        var localDiscussionListCRC = utils.crc32(localDiscussionList);
        var remoteContentCRC = utils.crc32(remoteContent);
        var remoteTitleCRC = utils.crc32(remoteTitle);
        var remoteDiscussionListCRC = utils.crc32(remoteDiscussionList);

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
        var discussionListChanged = localDiscussionList != remoteDiscussionList;
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
            fileMgr.createFile(localTitle + " (backup)", localContent);
            eventMgr.onMessage('Conflict detected on "' + localTitle + '". A backup has been created locally.');
        }
        else {
            if(contentConflict === true) {
                var patch = diffMatchPatch.patch_make(syncAttributes.content, localContent);
            }
        }

    };

    return Provider;
});
