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

    var refreshId;
    var currentFileDesc;
    function refreshDiscussions() {
        if(currentFileDesc === undefined) {
            return;
        }
        var author = storage['author.name'];
        clearTimeout(refreshId);
        commentEltList.forEach(function(commentElt) {
            marginElt.removeChild(commentElt);
        });
        commentEltList = [];
        offsetMap = {};
        var discussionList = _.map(currentFileDesc.discussionList, _.identity);
        function refreshOne() {
            var discussion;
            do {
                if(discussionList.length === 0) {
                    return;
                }
                discussion = discussionList.pop();
            } while(discussion.isRemoved);
            var commentElt = crel('a', {
                class: 'icon-comment'
            });
            commentElt.discussion = discussion;
            var coordinates = inputElt.getOffsetCoordinates(discussion.selectionEnd);
            var lineIndex = setCommentEltCoordinates(commentElt, coordinates.y);
            offsetMap[lineIndex] = (offsetMap[lineIndex] || 0) + 1;
            marginElt.appendChild(commentElt);
            commentEltList.push(commentElt);

            // Move newCommentElt
            setCommentEltCoordinates(newCommentElt, cursorY);

            // Apply class later for fade effect
            commentElt.offsetWidth; // Refresh
            var isReplied = _.last(discussion.commentList).author != author;
            commentElt.className += isReplied ? ' replied' : ' added';
            refreshId = setTimeout(refreshOne, 50);
        }
        refreshId = setTimeout(refreshOne, 50);
    }
    var debouncedRefreshDiscussions = _.debounce(refreshDiscussions, 2000);

    comments.onFileOpen = function(fileDesc) {
        currentFileDesc = fileDesc;
        refreshDiscussions();
    };

    comments.onContentChanged = function(fileDesc, content) {
        currentFileDesc === fileDesc && debouncedRefreshDiscussions();
    };

    var currentContext;
    function closeCurrentPopover() {
        currentContext && currentContext.$commentElt.popover('toggle').popover('destroy');
    }
    comments.onLayoutResize = function() {
        closeCurrentPopover();
        refreshDiscussions();
    };

    comments.onDiscussionCreated = function() {
        refreshDiscussions();
    };

    comments.onDiscussionRemoved = function() {
        refreshDiscussions();
    };

    comments.onCommentAdded = function() {
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
        var cssApplier = rangy.createCssClassApplier("comment-highlight", {
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
                title = title.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/\u00a0/g, ' ');
                return '<a href="#" class="action-remove-discussion pull-right"><i class="icon-trash"></i></a>' + title;
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
                $commentElt: $(evt.target).addClass('active')
            };
            currentContext = context;
            inputElt.scrollTop += parseInt(evt.target.style.top) - inputElt.scrollTop - inputElt.offsetHeight * 3 / 4;

            // If it's an existing discussion
            if(evt.target.discussion) {
                context.discussion = evt.target.discussion;
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
        }).on('shown.bs.popover', '#wmd-input > .editor-margin', function(evt) {
            // Move the popover in the margin
            var context = currentContext;
            context.popoverElt = document.querySelector('.comments-popover .popover:last-child');
            var left = -5;
            if(context.popoverElt.offsetWidth < marginElt.offsetWidth - 5) {
                left = marginElt.offsetWidth - 10 - context.popoverElt.offsetWidth;
            }
            context.popoverElt.style.left = left + 'px';
            context.popoverElt.querySelector('.arrow').style.left = (marginElt.offsetWidth - parseInt(evt.target.style.right) - evt.target.offsetWidth / 2 - left) + 'px';

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

                var discussionList = currentFileDesc.discussionList || {};
                var isNew = false;
                if(!context.discussion.discussionIndex) {
                    isNew = true;
                    // Create discussion index
                    var discussionIndex;
                    do {
                        discussionIndex = utils.randomString();
                    } while(_.has(discussionList, discussionIndex));
                    context.discussion.discussionIndex = discussionIndex;
                    discussionList[discussionIndex] = context.discussion;
                }
                context.discussion.commentList.push({
                    author: author,
                    content: content
                });
                currentFileDesc.discussionList = discussionList; // Write discussionList in localStorage
                isNew ?
                    eventMgr.onDiscussionCreated(currentFileDesc, context.discussion) :
                    eventMgr.onCommentAdded(currentFileDesc, context.discussion);
                inputElt.focus();
            });

            var $removeButton = $(context.popoverElt.querySelector('.action-remove-discussion'));
            if(evt.target.discussion) {
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
                    context.discussion.isRemoved = true;
                    delete context.discussion.selectionStart;
                    delete context.discussion.selectionEnd;
                    delete context.discussion.commentList;
                    currentFileDesc.discussionList = currentFileDesc.discussionList; // Write discussionList in localStorage
                    eventMgr.onDiscussionRemoved(currentFileDesc, context.discussion);
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
        });
    };

    return comments;
});
