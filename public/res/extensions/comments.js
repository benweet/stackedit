define([
    "jquery",
    "underscore",
    "utils",
    "crel",
    "rangy",
    "classes/Extension",
    "text!html/commentsPopoverContent.html",
    "bootstrap"
], function($, _, utils, crel, rangy, Extension, commentsPopoverContentHTML) {

    var comments = new Extension("comments", 'Comments');

    var offsetMap = {};
    function setCommentEltCoordinates(commentElt, y) {
        var lineIndex = Math.round(y/10);
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

    var fileDesc;
    comments.onFileSelected = function(selectedFileDesc) {
        fileDesc = selectedFileDesc;
        refreshDiscussions();
    };

    var openedPopover;
    comments.onLayoutResize = function() {
        openedPopover && openedPopover.popover('toggle').popover('destroy');
        refreshDiscussions();
    };

    var refreshId;
    function refreshDiscussions() {
        clearTimeout(refreshId);
        commentEltList.forEach(function(commentElt) {
            marginElt.removeChild(commentElt);
        });
        commentEltList = [];
        offsetMap = {};
        var discussionList = _.map(fileDesc.discussionList, _.identity);
        function refreshOne() {
            if(discussionList.length === 0) {
                return;
            }
            var discussion = discussionList.pop();
            var commentElt = crel('a', {
                class: 'icon-comment'
            });
            commentElt.discussion = discussion;
            var coordinates = inputElt.getOffsetCoordinates(discussion.selectionEnd);
            var lineIndex = setCommentEltCoordinates(commentElt, coordinates.y);
            offsetMap[lineIndex] = (offsetMap[lineIndex] || 0) + 1;
            marginElt.appendChild(commentElt);
            commentEltList.push(commentElt);

            // Replace newCommentElt
            setCommentEltCoordinates(newCommentElt, cursorY);

            refreshId = setTimeout(refreshOne, 0);
        }
        refreshId = setTimeout(refreshOne, 50);
    }

    comments.onReady = function() {
        var cssApplier = rangy.createCssClassApplier("comment-highlight", {
            normalize: false
        });
        var selectionRange;
        var rangyRange;
        var currentDiscussion;

        inputElt = document.getElementById('wmd-input');
        marginElt = document.querySelector('#wmd-input > .editor-margin');
        marginElt.appendChild(newCommentElt);
        $(document.body).append(crel('div', {
            class: 'comments-popover'
        })).popover({
            placement: 'auto top',
            container: '.comments-popover',
            html: true,
            title: function() {
                if(!currentDiscussion) {
                    return '...';
                }
                var titleLength = currentDiscussion.selectionEnd - currentDiscussion.selectionStart;
                var title = inputElt.textContent.substr(currentDiscussion.selectionStart, titleLength > 20 ? 20 : titleLength);
                if(titleLength > 20) {
                    title += '...';
                }
                return title.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/\u00a0/g, ' ');
            },
            content: function() {
                var content = _.template(commentsPopoverContentHTML, {
                });
                return content;
            },
            selector: '#wmd-input > .editor-margin > .icon-comment'
        }).on('show.bs.popover', '#wmd-input > .editor-margin', function(evt) {
            $(evt.target).addClass('active');
            inputElt.scrollTop += parseInt(evt.target.style.top) - inputElt.scrollTop - inputElt.offsetHeight * 3 / 4;

            // If it's an existing discussion
            if(evt.target.discussion) {
                currentDiscussion = evt.target.discussion;
                selectionRange = inputElt.createRange(currentDiscussion.selectionStart, currentDiscussion.selectionEnd);
                return;
            }

            // Get selected text
            var inputSelection = inputElt.getSelectionStartEnd();
            var selectionStart = inputSelection.selectionStart;
            var selectionEnd = inputSelection.selectionEnd;
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
            selectionRange = inputElt.createRange(selectionStart, selectionEnd);
            currentDiscussion = {
                selectionStart: selectionStart,
                selectionEnd: selectionEnd,
                commentList: []
            };
        }).on('shown.bs.popover', '#wmd-input > .editor-margin', function(evt) {

            // Move the popover in the margin
            var popoverElt = document.querySelector('.comments-popover .popover:last-child');
            var left = -10;
            if(popoverElt.offsetWidth < marginElt.offsetWidth) {
                left = marginElt.offsetWidth - popoverElt.offsetWidth - 10;
            }
            popoverElt.style.left = left + 'px';
            popoverElt.querySelector('.arrow').style.left = (marginElt.offsetWidth - parseInt(evt.target.style.right) - evt.target.offsetWidth / 2 - left) + 'px';

            var $textarea = $(popoverElt.querySelector('.input-comment-content'));
            var $addButton = $(popoverElt.querySelector('.action-add-comment'));
            $textarea.keydown(function(evt) {
                // Enter key
                switch(evt.which) {
                case 13:
                    evt.preventDefault();
                    $addButton.click();
                    return;
                case 27:
                    evt.preventDefault();
                    openedPopover && openedPopover.popover('toggle').popover('destroy');
                    inputElt.focus();
                    return;
                }
            });
            $addButton.click(function(evt) {
                var author = utils.getInputTextValue(popoverElt.querySelector('.input-comment-author'));
                var content = utils.getInputTextValue($textarea, evt);
                if(evt.isPropagationStopped()) {
                    return;
                }

                var discussionList = fileDesc.discussionList || {};
                if(!currentDiscussion.discussionIndex) {
                    // Create discussion index
                    var discussionIndex;
                    do {
                        discussionIndex = utils.randomString();
                    } while(_.has(discussionList, discussionIndex));
                    currentDiscussion.discussionIndex = discussionIndex;
                    discussionList[discussionIndex] = currentDiscussion;
                }
                currentDiscussion.commentList.push({
                    author: author,
                    content: content
                });
                fileDesc.discussionList = discussionList;
                openedPopover.popover('toggle').popover('destroy');
                refreshDiscussions();
                inputElt.focus();
            });

            // Prevent from closing on click inside the popover
            $(popoverElt).on('click', function(evt) {
                evt.stopPropagation();
            });
            setTimeout(function() {
                openedPopover = $(evt.target);

                // Highlight selected text
                rangyRange = rangy.createRange();
                rangyRange.setStart(selectionRange.startContainer, selectionRange.startOffset);
                rangyRange.setEnd(selectionRange.endContainer, selectionRange.endOffset);
                cssApplier.applyToRange(rangyRange);

                // Focus on textarea
                $textarea.focus();
            }, 10);
        }).on('hide.bs.popover', '#wmd-input > .editor-margin', function(evt) {
            $(evt.target).removeClass('active');

            // Remove highlight
            rangyRange && cssApplier.undoToRange(rangyRange);
            openedPopover = undefined;
            rangyRange = undefined;
            currentDiscussion = undefined;
        }).on('click', function() {
            // Close on click outside the popover
            openedPopover && openedPopover.popover('toggle').popover('destroy');
        });
    };

    return comments;
});
