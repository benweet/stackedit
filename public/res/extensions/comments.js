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

    var inputElt;
    var marginElt;
    var newCommentElt = crel('a', {
        class: 'icon-comment new'
    });
    comments.onCursorCoordinates = function(cursorX, cursorY) {
        var top = (cursorY - 8) + 'px';
        var right = 10 + 'px';
        newCommentElt.style.top = top;
        newCommentElt.style.right = right;
    };

    var fileDesc;
    comments.onFileSelected = function(selectedFileDesc) {
        fileDesc = selectedFileDesc;
    };

    comments.onReady = function() {
        var cssApplier = rangy.createCssClassApplier("comment-highlight", {
            normalize: false
        });
        var openedPopover;
        var selectionRange;
        var rangyRange;
        var currentDiscussion;

        inputElt = document.getElementById('wmd-input');
        marginElt = document.querySelector('#wmd-input > .editor-margin');
        marginElt.appendChild(newCommentElt);
        $(document.body).append($('<div class="comments-popover">')).popover({
            placement: 'auto top',
            container: '.comments-popover',
            html: true,
            title: function() {
                if(!currentDiscussion) {
                    return '...';
                }
                var titleLength = currentDiscussion.selectionEnd - currentDiscussion.selectionStart;
                var title = fileDesc.content.substr(currentDiscussion.selectionStart, titleLength > 18 ? 18 : titleLength);
                if(titleLength > 18) {
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
            inputElt.scrollTop += parseInt(evt.target.style.top) - inputElt.scrollTop - inputElt.offsetHeight * 2/3;

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
                        while(selectionStart && /\S/.test(inputElt.textContent[selectionStart-1])) {
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
                comments: []
            };
        }).on('shown.bs.popover', '#wmd-input > .editor-margin', function(evt) {

            // Move the popover in the margin
            var popoverElt = document.querySelector('.comments-popover .popover');
            var left = -10;
            if(popoverElt.offsetWidth < marginElt.offsetWidth) {
                left = marginElt.offsetWidth - popoverElt.offsetWidth - 10;
            }
            popoverElt.style.left = left + 'px';
            popoverElt.querySelector('.arrow').style.left = (marginElt.offsetWidth - parseInt(evt.target.style.right) - evt.target.offsetWidth/2 - left) + 'px';

            var textarea = popoverElt.querySelector('.input-comment-content');
            $(popoverElt.querySelector('.action-add-comment')).click(function(evt) {
                var author = utils.getInputTextValue(popoverElt.querySelector('.input-comment-author'));
                var content = utils.getInputTextValue(textarea, evt);
                if(evt.isPropagationStopped()) {
                    return;
                }

                var fileDiscussions = fileDesc.discussions || {};
                if(!currentDiscussion.discussionIndex) {
                    do {
                        currentDiscussion.discussionIndex = utils.randomString();
                    } while(_.has(fileDiscussions, currentDiscussion.discussionIndex));
                }
                currentDiscussion.push({
                    author: author,
                    content: content
                });
                openedPopover.popover('toggle').popover('destroy');
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
                textarea.focus();
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
