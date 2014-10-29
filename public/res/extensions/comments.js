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

	var comments = new Extension("comments", 'Comments', false, true);

	var commentTmpl = [
		'<div class="comment-block<%= reply ? \' reply\' : \'\' %>">',
		'    <div class="comment-author"><i class="icon-comment"></i> <%= author %></div>',
		'    <div class="comment-content"><%= content %></div>',
		'</div>'
	].join('');
	var popoverTitleTmpl = [
		'<span class="clearfix">',
		'    <a href="#" class="action-remove-discussion pull-right">',
		'        <i class="icon-trash"></i>',
		'    </a>',
		'    “<%- title %>”',
		'</span>'
	].join('');

	var eventMgr;
	comments.onEventMgrCreated = function(eventMgrParam) {
		eventMgr = eventMgrParam;
	};

	var editor;
	var selectionMgr;
	comments.onEditorCreated = function(editorParam) {
		editor = editorParam;
		selectionMgr = editor.selectionMgr;
	};

	var yList = [];

	function setCommentEltCoordinates(commentElt, y, isNew) {
		y = Math.round(y);
		var yListIndex = y - 21;
		// Avoid overlap of comment icons
		while(yListIndex < y + 22) {
			if(yList[yListIndex]) {
				y = yListIndex + 22;
			}
			yListIndex++;
		}
		!isNew && (yList[y] = 1);
		var yOffset = -8;
		if(commentElt.className.indexOf(' icon-split') !== -1) {
			yOffset = -12;
		}
		var top = y + yOffset;
		commentElt.style.top = top + 'px';
		commentElt.style.right = '12px';
	}

	var inputElt;
	var marginElt;
	var newCommentElt = crel('a', {
		class: 'discussion icon-comment new'
	});
	var newCommentEltY;

	function Context(commentElt, fileDesc) {
		this.commentElt = commentElt;
		this.$commentElt = $(commentElt).addClass('active');
		this.fileDesc = fileDesc;
		this.discussionIndex = commentElt.discussionIndex;
	}

	Context.prototype.getDiscussion = function() {
		if(!this.discussionIndex) {
			return this.fileDesc.newDiscussion;
		}
		return this.fileDesc.discussionList[this.discussionIndex];
	};
	Context.prototype.getPopoverElt = function() {
		return document.querySelector('.comments-popover .popover:last-child');
	};
	var currentContext;

	function movePopover(commentElt) {
		// Move popover in the margin
		var popoverElt = currentContext.getPopoverElt();
		var left = 0;
		if(popoverElt.offsetWidth < marginElt.offsetWidth - 10) {
			left = marginElt.offsetWidth - 10 - popoverElt.offsetWidth;
		}
		popoverElt.style.left = left + 'px';
		popoverElt.querySelector('.arrow').style.left = (marginElt.offsetWidth - parseInt(commentElt.style.right) - commentElt.offsetWidth / 2 - left) + 'px';
		var popoverTopOffset = window.innerHeight - currentContext.hr.getBoundingClientRect().top;
		if(popoverTopOffset < 0) {
			popoverElt.style.top = (parseInt(popoverElt.style.top) + popoverTopOffset) + 'px';
		}
	}

	var cssApplier;
	var currentFileDesc;
	var refreshTimeoutId;
	var commentEltMap = {};
	var sortedCommentEltList = [];
	var someReplies = false;
	var $openDiscussionElt;
	var $openDiscussionIconElt;
	var refreshDiscussions = _.debounce(function() {
		if(currentFileDesc === undefined) {
			return;
		}
		someReplies = false;
		sortedCommentEltList = [];
		var author = storage['author.name'];
		yList = [];
		var discussionList = _.sortBy(currentFileDesc.discussionList, function(discussion) {
			return discussion.selectionEnd;
		});

		function refreshOne() {
			var coordinates;
			if(discussionList.length === 0) {
				// Remove outdated commentElt
				_.filter(commentEltMap, function(commentElt, discussionIndex) {
					return !_.has(currentFileDesc.discussionList, discussionIndex);
				}).forEach(function(commentElt) {
					marginElt.removeChild(commentElt);
					delete commentEltMap[commentElt.discussionIndex];
				});
				// Move newCommentElt
				setCommentEltCoordinates(newCommentElt, newCommentEltY, true);
				if(currentContext && !currentContext.discussionIndex) {
					inputElt.scrollTop += parseInt(newCommentElt.style.top) - inputElt.scrollTop - inputElt.offsetHeight * 3 / 4;
					movePopover(newCommentElt);
				}
				sortedCommentEltList = _.sortBy(commentEltMap, function(commentElt) {
					return commentElt.selectionEnd;
				});
				$openDiscussionElt.toggleClass('some', sortedCommentEltList.length !== 0);
				$openDiscussionElt.toggleClass('replied', someReplies);
				$openDiscussionIconElt.toggleClass('icon-chat', sortedCommentEltList.length !== 0);
				return;
			}
			var discussion = discussionList.shift();
			var commentElt = commentEltMap[discussion.discussionIndex];
			if(!commentElt) {
				commentElt = crel('a');
			}
			var className = 'discussion';
			var isReplied = !discussion.commentList || !author || _.last(discussion.commentList).author != author;
			isReplied && (someReplies = true);
			if(discussion.type == 'conflict') {
				className += ' icon-split';
			}
			else {
				className += ' icon-comment';
			}
			className += isReplied ? ' replied' : ' added';
			commentElt.className = className;
			commentElt.discussionIndex = discussion.discussionIndex;
			commentElt.selectionEnd = discussion.selectionEnd;
			coordinates = selectionMgr.getCoordinates(discussion.selectionEnd);
			setCommentEltCoordinates(commentElt, coordinates.y);

			marginElt.appendChild(commentElt);
			commentEltMap[discussion.discussionIndex] = commentElt;

			if(currentContext && currentContext.getDiscussion() === discussion) {
				inputElt.scrollTop += parseInt(commentElt.style.top) - inputElt.scrollTop - inputElt.offsetHeight * 3 / 4;
				movePopover(commentElt);
			}
			refreshTimeoutId = setTimeout(refreshOne, 5);
		}

		clearTimeout(refreshTimeoutId);
		refreshTimeoutId = setTimeout(refreshOne, 5);
	}, 50);
	comments.onLayoutResize = refreshDiscussions;

	comments.onFileOpen = function(fileDesc) {
		currentFileDesc = fileDesc;
		refreshDiscussions();
	};

	comments.onContentChanged = function(fileDesc) {
		currentFileDesc === fileDesc && refreshDiscussions();
	};

	comments.onCursorCoordinates = function(x, y) {
		newCommentEltY = y;
		setCommentEltCoordinates(newCommentElt, y, true);
	};

	comments.onCommentsChanged = function(fileDesc) {
		if(currentFileDesc !== fileDesc) {
			return;
		}
		if(currentContext !== undefined) {
			// Refresh conversation if popover is open
			var context = currentContext;
			if(context.discussionIndex) {
				context.getPopoverElt().querySelector('.discussion-comment-list').innerHTML = getDiscussionComments();
			}
			try {
				cssApplier.undoToRange(context.rangyRange);
			}
			catch(e) {
			}
			var discussion = context.getDiscussion();
			context.selectionRange = selectionMgr.createRange(discussion.selectionStart, discussion.selectionEnd);

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

	comments.onEditorPopover = function() {
		closeCurrentPopover();
	};

	comments.onDiscussionCreated = function(fileDesc) {
		currentFileDesc === fileDesc && refreshDiscussions();
	};

	comments.onDiscussionRemoved = function(fileDesc, discussion) {
		if(currentFileDesc === fileDesc) {
			// Close popover if the discussion has been removed
			if(currentContext !== undefined && currentContext.discussionIndex == discussion.discussionIndex) {
				closeCurrentPopover();
			}
			refreshDiscussions();
		}
	};

	function getDiscussionComments() {
		var discussion = currentContext.getDiscussion();
		var author = storage['author.name'];
		var result = [];
		if(discussion.commentList) {
			result = discussion.commentList.map(function(comment) {
				var commentAuthor = comment.author || 'Anonymous';
				return _.template(commentTmpl, {
					author: commentAuthor,
					content: comment.content,
					reply: comment.author != author
				});
			});
		}
		if(discussion.type == 'conflict') {
			result.unshift(_.template(commentTmpl, {
				author: 'StackEdit',
				content: 'Conflicting changes have been detected.',
				reply: true
			}));
		}
		return result.join('');
	}

	comments.onReady = function() {
		cssApplier = rangy.createCssClassApplier('comment-highlight', {
			normalize: false
		});
		var previousContent = '';

		inputElt = document.getElementById('wmd-input');
		marginElt = document.querySelector('#wmd-input > .editor-margin');
		marginElt.appendChild(newCommentElt);
		var $popoverContainer = $(crel('div', {
			class: 'comments-popover'
		}));
		$(document.body).append($popoverContainer).on('click', function(evt) {
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
				var discussion = currentContext.getDiscussion();
				var titleLength = discussion.selectionEnd - discussion.selectionStart;
				var title = editor.getValue().substr(discussion.selectionStart, titleLength > 20 ? 20 : titleLength);
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
			selector: '#wmd-input > .editor-margin > .discussion'
		});
		$(marginElt).on('show.bs.popover', function(evt) {
			eventMgr.onEditorPopover();
			var context = new Context(evt.target, currentFileDesc);
			currentContext = context;

			// If it's not an existing discussion
			var discussion = context.getDiscussion();
			if(!discussion) {
				// Get selected text
				var selectionStart = Math.min(selectionMgr.selectionStart, selectionMgr.selectionEnd);
				var selectionEnd = Math.max(selectionMgr.selectionStart, selectionMgr.selectionEnd);
				if(selectionStart === selectionEnd) {
					var offset = selectionMgr.getClosestWordOffset(selectionStart);
					selectionStart = offset.start;
					selectionEnd = offset.end;
				}
				discussion = {
					selectionStart: selectionStart,
					selectionEnd: selectionEnd,
					commentList: []
				};
				currentFileDesc.newDiscussion = discussion;
			}
			context.selectionRange = selectionMgr.createRange(discussion.selectionStart, discussion.selectionEnd);
			inputElt.scrollTop += parseInt(evt.target.style.top) - inputElt.scrollTop - inputElt.offsetHeight * 3 / 4;

		}).on('shown.bs.popover', function(evt) {
			var context = currentContext;
			var popoverElt = context.getPopoverElt();
			context.$authorInputElt = $(popoverElt.querySelector('.input-comment-author')).val(storage['author.name']);
			context.$contentInputElt = $(popoverElt.querySelector('.input-comment-content'));
			context.hr = popoverElt.querySelector('hr');
			movePopover(context.commentElt);

			// Scroll to the bottom of the discussion
			popoverElt.querySelector('.scrollport').scrollTop = 9999999;

			var $addButton = $(popoverElt.querySelector('.action-add-comment'));
			$().add(context.$contentInputElt).add(context.$authorInputElt).keydown(function(evt) {
				if(evt.which === 13) {
					// Enter key
					evt.preventDefault();
					$addButton.click();
				}
			});
			$addButton.click(function(evt) {
				var author = utils.getInputTextValue(context.$authorInputElt);
				var content = utils.getInputTextValue(context.$contentInputElt, evt);
				if(evt.isPropagationStopped()) {
					return;
				}

				var discussion = context.getDiscussion();
				context.$contentInputElt.val('');
				closeCurrentPopover();

				discussion.commentList = discussion.commentList || [];
				discussion.commentList.push({
					author: author,
					content: content
				});
				var discussionList = context.fileDesc.discussionList || {};
				if(!discussion.discussionIndex) {
					// Create discussion index
					var discussionIndex;
					do {
						discussionIndex = utils.id();
					} while(_.has(discussionList, discussionIndex));
					discussion.discussionIndex = discussionIndex;
					discussionList[discussionIndex] = discussion;
					context.fileDesc.discussionList = discussionList; // Write discussionList in localStorage
					eventMgr.onDiscussionCreated(context.fileDesc, discussion);
				}
				else {
					context.fileDesc.discussionList = discussionList; // Write discussionList in localStorage
					eventMgr.onCommentsChanged(context.fileDesc);
				}
				inputElt.focus();
			});

			var $removeButton = $(popoverElt.querySelector('.action-remove-discussion'));
			if(evt.target.discussionIndex) {
				// If it's an existing discussion
				$removeButton.click(function() {
					closeCurrentPopover();
					var discussion = context.getDiscussion();
					delete context.fileDesc.discussionList[discussion.discussionIndex];
					context.fileDesc.discussionList = context.fileDesc.discussionList; // Write discussionList in localStorage
					eventMgr.onDiscussionRemoved(context.fileDesc, discussion);
					inputElt.focus();
				});
			}
			else {
				// Otherwise hide the remove button
				$removeButton.hide();
			}

			// Highlight selected text
			context.rangyRange = rangy.createRange();
			context.rangyRange.setStart(context.selectionRange.startContainer, context.selectionRange.startOffset);
			context.rangyRange.setEnd(context.selectionRange.endContainer, context.selectionRange.endOffset);
			setTimeout(function() { // Delay this because not refreshed properly
				if(currentContext === context) {
					cssApplier.applyToRange(context.rangyRange);
				}
			}, 50);

			// Focus on textarea
			context.$contentInputElt.focus().val(previousContent);
		}).on('hide.bs.popover', function() {
			if(!currentContext) {
				return;
			}
			currentContext.$commentElt.removeClass('active');

			// Save content and author for later
			previousContent = currentContext.$contentInputElt.val();
			storage['author.name'] = currentContext.$authorInputElt.val();

			// Remove highlight
			try {
				cssApplier.undoToRange(currentContext.rangyRange);
			}
			catch(e) {
			}
			currentContext = undefined;
			delete currentFileDesc.newDiscussion;
		});

		// Prevent from closing on click inside the popover
		$popoverContainer.on('click', '.popover', function(evt) {
			evt.stopPropagation();
		});

		var $newCommentElt = $(newCommentElt);
		$openDiscussionElt = $('.button-open-discussion').click(function(evt) {
			var $commentElt = $newCommentElt;
			if(currentContext) {
				if(!currentContext.discussionIndex) {
					$commentElt = $(_.first(sortedCommentEltList));
				}
				else {
					var curentIndex = -1;
					sortedCommentEltList.some(function(elt, index) {
						if(elt === currentContext.commentElt) {
							curentIndex = index;
							return true;
						}
					});
					$commentElt = $(sortedCommentEltList[(curentIndex + 1)]);
				}
			}
			else if(selectionMgr.selectionStart === selectionMgr.selectionEnd && sortedCommentEltList.length) {
				$commentElt = $(_.first(sortedCommentEltList));
			}
			if($commentElt.length === 0) {
				// Close the popover properly
				closeCurrentPopover();
				editor.focus();
				editor.adjustCursorPosition(true);
			}
			else {
				$commentElt.click();
			}
			evt.stopPropagation();
		});
		$openDiscussionIconElt = $openDiscussionElt.find('i');
	};

	return comments;
});
