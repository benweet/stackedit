define([
    "jquery",
    "underscore",
    "utils",
    "storage",
    "crel",
    "rangy",
    "classes/Extension",
    "text!html/commentsPopoverContent.html",
    "bootstrap"
], function($, _, utils, storage, crel, rangy, Extension, commentsPopoverContentHTML) {

    var comments = new Extension("comments", 'Comments');

    var commentTmpl = [
        '<div class="comment-block">',
        '    <div class="comment-author"><%= author %></div>',
        '    <div class="comment-content"><%= content %></div>',
        '</div>',
    ].join('');
    var popoverTitleTmpl = [
        '<span class="clearfix">',
        '    <a href="#" class="action-remove-discussion pull-right">',
        '        <i class="icon-trash"></i>',
        '    </a>',
        '    <%- title %>',
        '</span>',
    ].join('');

    var eventMgr;
    comments.onEventMgrCreated = function(eventMgrParam) {
        eventMgr = eventMgrParam;
    };

    var offsetMap = {};
    function setCommentEltCoordinates(commentElt, y) {
        var lineIndex = Math.round(y / 10);
        var top = (y - 8) + 'px';
        var right = ((offsetMap[lineIndex] || 0) * 25 + 10) + 'px';
        commentElt.style.top = top;
        commentElt.style.right = right;
        return lineIndex;
    }

    var inputElt;
    var marginElt;
    var commentEltList = [];
    var newCommentElt = crel('a', {
        class: 'icon-comment new'
    });
    var cursorY;
    comments.onCursorCoordinates = function(x, y) {
        cursorY = y;
        setCommentEltCoordinates(newCommentElt, cursorY);
    };

    var currentContext;
    function movePopover(commentElt) {
        // Move popover in the margin
        var context = currentContext;
        context.popoverElt = document.querySelector('.comments-popover .popover:last-child');
        var left = 0;
        if(context.popoverElt.offsetWidth < marginElt.offsetWidth - 10) {
            left = marginElt.offsetWidth - 10 - context.popoverElt.offsetWidth;
        }
        context.popoverElt.style.left = left + 'px';
        context.popoverElt.querySelector('.arrow').style.left = (marginElt.offsetWidth - parseInt(commentElt.style.right) - commentElt.offsetWidth / 2 - left) + 'px';
    }

    var cssApplier;
    var currentFileDesc;
    var refreshDiscussions = _.debounce(function() {
        if(currentFileDesc === undefined) {
            return;
        }

        var author = storage['author.name'];
        commentEltList.forEach(function(commentElt) {
            marginElt.removeChild(commentElt);
        });
        commentEltList = [];
        offsetMap = {};
        _.each(currentFileDesc.discussionList, function(discussion) {
            var isReplied = _.last(discussion.commentList).author != author;
            var commentElt = crel('a', {
                class: 'icon-comment' + (isReplied ? ' replied' : ' added')
            });
            commentElt.discussionIndex = discussion.discussionIndex;
            var coordinates = inputElt.getOffsetCoordinates(discussion.selectionEnd);
            var lineIndex = setCommentEltCoordinates(commentElt, coordinates.y);
            offsetMap[lineIndex] = (offsetMap[lineIndex] || 0) + 1;
            marginElt.appendChild(commentElt);
            commentEltList.push(commentElt);

            if(currentContext && currentContext.discussion == discussion) {
                inputElt.scrollTop += parseInt(commentElt.style.top) - inputElt.scrollTop - inputElt.offsetHeight * 3 / 4;
                movePopover(commentElt);
            }
        });

        // Move newCommentElt
        setCommentEltCoordinates(newCommentElt, cursorY);
        if(currentContext && !currentContext.discussion.discussionIndex) {
            inputElt.scrollTop += parseInt(newCommentElt.style.top) - inputElt.scrollTop - inputElt.offsetHeight * 3 / 4;
            movePopover(newCommentElt);
        }
    }, 50);

    comments.onFileOpen = function(fileDesc) {
        currentFileDesc = fileDesc;
        refreshDiscussions();
    };

    comments.onContentChanged = function(fileDesc, content) {
        currentFileDesc === fileDesc && refreshDiscussions();
    };

    comments.onCommentsChanged = function(fileDesc) {
        if(currentFileDesc !== fileDesc) {
            return;
        }
        if(currentContext !== undefined) {
            // Refresh conversation if popover is open
            var context = currentContext;
            if(context.discussion.discussionIndex) {
                context.discussion = currentFileDesc.discussionList[context.discussion.discussionIndex];
                context.popoverElt.querySelector('.discussion-comment-list').innerHTML = getDiscussionComments();
            }
            try {
                cssApplier.undoToRange(context.rangyRange);
            }
            catch(e) {}
            context.selectionRange = inputElt.createRange(context.discussion.selectionStart, context.discussion.selectionEnd);

            // Highlight selected text
            context.rangyRange = rangy.createRange();
            context.rangyRange.setStart(context.selectionRange.startContainer, context.selectionRange.startOffset);
            context.rangyRange.setEnd(context.selectionRange.endContainer, context.selectionRange.endOffset);
            setTimeout(function() { // Need to delay this because it's not refreshed properly
                if(currentContext === context) {
                    cssApplier.applyToRange(context.rangyRange);
                }
            }, 50);
        }
        refreshDiscussions();
    };

    function closeCurrentPopover() {
        currentContext && currentContext.$commentElt.popover('toggle').popover('destroy');
    }

    comments.onDiscussionCreated = function(fileDesc) {
        currentFileDesc === fileDesc && refreshDiscussions();
    };

    comments.onDiscussionRemoved = function(fileDesc, discussion) {
        if(currentFileDesc === fileDesc) {
            // Close popover if the discussion has removed
            if(currentContext !== undefined && currentContext.discussion.discussionIndex == discussion.discussionIndex) {
                closeCurrentPopover();
            }
            refreshDiscussions();
        }
    };

    comments.onLayoutResize = function() {
        refreshDiscussions();
    };

    function getDiscussionComments() {
        return currentContext.discussion.commentList.map(function(comment) {
            return _.template(commentTmpl, {
                author: comment.author || 'Anonymous',
                content: comment.content
            });
        }).join('');
    }

    comments.onReady = function() {
        cssApplier = rangy.createCssClassApplier("comment-highlight", {
            normalize: false
        });
        var previousContent = '';

        inputElt = document.getElementById('wmd-input');
        marginElt = document.querySelector('#wmd-input > .editor-margin');
        marginElt.appendChild(newCommentElt);
        $(document.body).append(crel('div', {
            class: 'comments-popover'
        })).on('click', function(evt) {
            // Close on click outside the popover
            if(currentContext && currentContext.$commentElt[0] !== evt.target) {
                closeCurrentPopover();
            }
        }).popover({
            placement: 'auto top',
            container: '.comments-popover',
            html: true,
            title: function() {
                if(!currentContext) {
                    return true;
                }
                var titleLength = currentContext.discussion.selectionEnd - currentContext.discussion.selectionStart;
                var title = inputElt.textContent.substr(currentContext.discussion.selectionStart, titleLength > 20 ? 20 : titleLength);
                if(titleLength > 20) {
                    title += '...';
                }
                return _.template(popoverTitleTmpl, {
                    title: title
                });
            },
            content: function() {
                var content = _.template(commentsPopoverContentHTML, {
                    commentList: getDiscussionComments()
                });
                return content;
            },
            selector: '#wmd-input > .editor-margin > .icon-comment'
        }).on('show.bs.popover', '#wmd-input > .editor-margin', function(evt) {
            closeCurrentPopover();
            var context = {
                $commentElt: $(evt.target).addClass('active'),
                fileDesc: currentFileDesc
            };
            currentContext = context;
            inputElt.scrollTop += parseInt(evt.target.style.top) - inputElt.scrollTop - inputElt.offsetHeight * 3 / 4;

            // If it's an existing discussion
            if(evt.target.discussionIndex) {
                context.discussion = currentFileDesc.discussionList[evt.target.discussionIndex];
                context.selectionRange = inputElt.createRange(context.discussion.selectionStart, context.discussion.selectionEnd);
                return;
            }

            // Get selected text
            var selectionStart = inputElt.selectionStart;
            var selectionEnd = inputElt.selectionEnd;
            if(selectionStart === selectionEnd) {
                var after = inputElt.textContent.substring(selectionStart);
                var match = /\S+/.exec(after);
                if(match) {
                    selectionStart += match.index;
                    if(match.index === 0) {
                        while(selectionStart && /\S/.test(inputElt.textContent[selectionStart - 1])) {
                            selectionStart--;
                        }
                    }
                    selectionEnd += match.index + match[0].length;
                }
            }
            context.selectionRange = inputElt.createRange(selectionStart, selectionEnd);
            context.discussion = {
                selectionStart: selectionStart,
                selectionEnd: selectionEnd,
                commentList: []
            };
            currentFileDesc.newDiscussion = context.discussion;
        }).on('shown.bs.popover', '#wmd-input > .editor-margin', function(evt) {
            var context = currentContext;
            context.popoverElt = document.querySelector('.comments-popover .popover:last-child');
            movePopover(evt.target);

            // Scroll to the bottom of the discussion
            context.popoverElt.querySelector('.popover-content').scrollTop = 9999999;

            context.$authorInputElt = $(context.popoverElt.querySelector('.input-comment-author')).val(storage['author.name']);
            context.$contentInputElt = $(context.popoverElt.querySelector('.input-comment-content'));
            var $addButton = $(context.popoverElt.querySelector('.action-add-comment'));
            context.$contentInputElt.keydown(function(evt) {
                // Enter key
                switch(evt.which) {
                case 13:
                    evt.preventDefault();
                    $addButton.click();
                    return;
                case 27:
                    evt.preventDefault();
                    closeCurrentPopover();
                    inputElt.focus();
                    return;
                }
            });
            $addButton.click(function(evt) {
                var author = utils.getInputTextValue(context.$authorInputElt);
                var content = utils.getInputTextValue(context.$contentInputElt, evt);
                if(evt.isPropagationStopped()) {
                    return;
                }

                context.$contentInputElt.val('');
                closeCurrentPopover();

                context.discussion.commentList.push({
                    author: author,
                    content: content
                });
                var discussionList = context.fileDesc.discussionList || {};
                if(!context.discussion.discussionIndex) {
                    // Create discussion index
                    var discussionIndex;
                    do {
                        discussionIndex = utils.randomString();
                    } while(_.has(discussionList, discussionIndex));
                    context.discussion.discussionIndex = discussionIndex;
                    discussionList[discussionIndex] = context.discussion;
                    context.fileDesc.discussionList = discussionList; // Write discussionList in localStorage
                    eventMgr.onDiscussionCreated(context.fileDesc, context.discussion);
                }
                else {
                    context.fileDesc.discussionList = discussionList; // Write discussionList in localStorage
                    eventMgr.onCommentsChanged(context.fileDesc);
                }
                inputElt.focus();
            });

            var $removeButton = $(context.popoverElt.querySelector('.action-remove-discussion'));
            if(evt.target.discussionIndex) {
                // If it's an existing discussion
                var $removeCancelButton = $(context.popoverElt.querySelector('.action-remove-discussion-cancel'));
                var $removeConfirmButton = $(context.popoverElt.querySelector('.action-remove-discussion-confirm'));
                $removeButton.click(function() {
                    $(context.popoverElt.querySelector('.new-comment-block')).addClass('hide');
                    $(context.popoverElt.querySelector('.remove-discussion-confirm')).removeClass('hide');
                    context.popoverElt.querySelector('.popover-content').scrollTop = 9999999;
                });
                $removeCancelButton.click(function() {
                    $(context.popoverElt.querySelector('.new-comment-block')).removeClass('hide');
                    $(context.popoverElt.querySelector('.remove-discussion-confirm')).addClass('hide');
                    context.popoverElt.querySelector('.popover-content').scrollTop = 9999999;
                    context.$contentInputElt.focus();
                });
                $removeConfirmButton.click(function() {
                    closeCurrentPopover();
                    delete context.fileDesc.discussionList[context.discussion.discussionIndex];
                    context.fileDesc.discussionList = context.fileDesc.discussionList; // Write discussionList in localStorage
                    eventMgr.onCommentsChanged(context.fileDesc);
                    inputElt.focus();
                });
            }
            else {
                // Otherwise hide the remove button
                $removeButton.hide();
            }

            // Prevent from closing on click inside the popover
            $(context.popoverElt).on('click', function(evt) {
                evt.stopPropagation();
            });

            // Highlight selected text
            context.rangyRange = rangy.createRange();
            context.rangyRange.setStart(context.selectionRange.startContainer, context.selectionRange.startOffset);
            context.rangyRange.setEnd(context.selectionRange.endContainer, context.selectionRange.endOffset);
            setTimeout(function() { // Need to delay this because it's not refreshed properly
                if(currentContext === context) {
                    cssApplier.applyToRange(context.rangyRange);
                }
            }, 50);

            // Focus on textarea
            context.$contentInputElt.focus().val(previousContent);
        }).on('hide.bs.popover', '#wmd-input > .editor-margin', function(evt) {
            if(!currentContext) {
                return;
            }
            currentContext.$commentElt.removeClass('active');

            // Save content and author for later
            previousContent = currentContext.$contentInputElt.val();
            storage['author.name'] = currentContext.$authorInputElt.val();

            // Remove highlight
            cssApplier.undoToRange(currentContext.rangyRange);
            currentContext = undefined;
            delete currentFileDesc.newDiscussion;
        });
    };

    return comments;
});
