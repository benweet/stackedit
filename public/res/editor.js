/* jshint -W084, -W099 */
// Credit to http://dabblet.com/
define([
	'jquery',
	'underscore',
	'utils',
	'settings',
	'eventMgr',
	'prism-core',
	'diff_match_patch_uncompressed',
	'jsondiffpatch',
	'crel',
	'rangy',
	'MutationObservers',
	'libs/prism-markdown'
], function($, _, utils, settings, eventMgr, Prism, diff_match_patch, jsondiffpatch, crel, rangy) {

	var editor = {};
	var scrollTop = 0;
	var inputElt;
	var $inputElt;
	var contentElt;
	var $contentElt;
	var marginElt;
	var $marginElt;
	var previewElt;
	var pagedownEditor;
	var trailingLfNode;

	var refreshPreviewLater = (function() {
		var elapsedTime = 0;
		var timeoutId;
		var refreshPreview = function() {
			var startTime = Date.now();
			pagedownEditor.refreshPreview();
			elapsedTime = Date.now() - startTime;
		};
		if(settings.lazyRendering === true) {
			return _.debounce(refreshPreview, 500);
		}
		return function() {
			clearTimeout(timeoutId);
			timeoutId = setTimeout(refreshPreview, elapsedTime < 2000 ? elapsedTime : 2000);
		};
	})();
	eventMgr.addListener('onPagedownConfigure', function(pagedownEditorParam) {
		pagedownEditor = pagedownEditorParam;
	});

	var isComposing = 0;
	eventMgr.addListener('onSectionsCreated', function(newSectionList) {
		if(!isComposing) {
			updateSectionList(newSectionList);
			highlightSections();
		}
		if(fileChanged === true) {
			// Refresh preview synchronously
			pagedownEditor.refreshPreview();
		}
		else {
			refreshPreviewLater();
		}
	});

	var fileChanged = true;
	var fileDesc;
	eventMgr.addListener('onFileSelected', function(selectedFileDesc) {
		fileChanged = true;
		fileDesc = selectedFileDesc;
	});

	// Used to detect editor changes
	function Watcher() {
		this.isWatching = false;
		var contentObserver;
		this.startWatching = function() {
			this.isWatching = true;
			contentObserver = contentObserver || new MutationObserver(checkContentChange);
			contentObserver.observe(contentElt, {
				childList: true,
				subtree: true,
				characterData: true
			});
		};
		this.stopWatching = function() {
			contentObserver.disconnect();
			this.isWatching = false;
		};
		this.noWatch = function(cb) {
			if(this.isWatching === true) {
				this.stopWatching();
				cb();
				this.startWatching();
			}
			else {
				cb();
			}
		};
	}

	var watcher = new Watcher();
	editor.watcher = watcher;

	var diffMatchPatch = new diff_match_patch();
	var jsonDiffPatch = jsondiffpatch.create({
		objectHash: function(obj) {
			return JSON.stringify(obj);
		},
		arrays: {
			detectMove: false
		},
		textDiff: {
			minLength: 9999999
		}
	});

	function SelectionMgr() {
		var self = this;
		var lastSelectionStart = 0, lastSelectionEnd = 0;
		this.selectionStart = 0;
		this.selectionEnd = 0;
		this.cursorY = 0;
		this.adjustTop = 0;
		this.adjustBottom = 0;
		this.findOffsets = function(offsetList) {
			var result = [];
			if(!offsetList.length) {
				return result;
			}
			var offset = offsetList.shift();
			var walker = document.createTreeWalker(contentElt, 4, null, false);
			var text = '';
			var walkerOffset = 0;
			while(walker.nextNode()) {
				text = walker.currentNode.nodeValue || '';
				var newWalkerOffset = walkerOffset + text.length;
				while(newWalkerOffset > offset) {
					result.push({
						container: walker.currentNode,
						offsetInContainer: offset - walkerOffset,
						offset: offset
					});
					if(!offsetList.length) {
						return result;
					}
					offset = offsetList.shift();
				}
				walkerOffset = newWalkerOffset;
			}
			do {
				result.push({
					container: walker.currentNode,
					offsetInContainer: text.length,
					offset: offset
				});
				offset = offsetList.shift();
			}
			while(offset);
			return result;
		};
		this.createRange = function(start, end) {
			start = start < 0 ? 0 : start;
			end = end < 0 ? 0 : end;
			var range = document.createRange();
			var offsetList = [], startIndex, endIndex;
			if(_.isNumber(start)) {
				offsetList.push(start);
				startIndex = offsetList.length - 1;
			}
			if(_.isNumber(end)) {
				offsetList.push(end);
				endIndex = offsetList.length - 1;
			}
			offsetList = this.findOffsets(offsetList);
			var startOffset = _.isObject(start) ? start : offsetList[startIndex];
			range.setStart(startOffset.container, startOffset.offsetInContainer);
			var endOffset = startOffset;
			if(end && end != start) {
				endOffset = _.isObject(end) ? end : offsetList[endIndex];
			}
			range.setEnd(endOffset.container, endOffset.offsetInContainer);
			return range;
		};
		var adjustScroll;
		var debouncedUpdateCursorCoordinates = utils.debounce(function() {
			$inputElt.toggleClass('has-selection', this.selectionStart !== this.selectionEnd);
			var coordinates = this.getCoordinates(this.selectionEnd, this.selectionEndContainer, this.selectionEndOffset);
			if(this.cursorY !== coordinates.y) {
				this.cursorY = coordinates.y;
				eventMgr.onCursorCoordinates(coordinates.x, coordinates.y);
			}
			if(adjustScroll) {
				var adjustTop, adjustBottom;
				adjustTop = adjustBottom = inputElt.offsetHeight / 2 * settings.cursorFocusRatio;
				adjustTop = this.adjustTop || adjustTop;
				adjustBottom = this.adjustBottom || adjustTop;
				if(adjustTop && adjustBottom) {
					var cursorMinY = inputElt.scrollTop + adjustTop;
					var cursorMaxY = inputElt.scrollTop + inputElt.offsetHeight - adjustBottom;
					if(selectionMgr.cursorY < cursorMinY) {
						inputElt.scrollTop += selectionMgr.cursorY - cursorMinY;
					}
					else if(selectionMgr.cursorY > cursorMaxY) {
						inputElt.scrollTop += selectionMgr.cursorY - cursorMaxY;
					}
				}
			}
			adjustScroll = false;
		}, this);
		this.updateCursorCoordinates = function(adjustScrollParam) {
			adjustScroll = adjustScroll || adjustScrollParam;
			debouncedUpdateCursorCoordinates();
		};
		this.updateSelectionRange = function() {
			var min = Math.min(this.selectionStart, this.selectionEnd);
			var max = Math.max(this.selectionStart, this.selectionEnd);
			var range = this.createRange(min, max);
			var selection = rangy.getSelection();
			selection.removeAllRanges();
			selection.addRange(range, this.selectionStart > this.selectionEnd);
		};
		var saveLastSelection = _.debounce(function() {
			lastSelectionStart = self.selectionStart;
			lastSelectionEnd = self.selectionEnd;
		}, 50);
		this.setSelectionStartEnd = function(start, end) {
			if(start === undefined) {
				start = this.selectionStart;
			}
			if(start < 0) {
				start = 0;
			}
			if(end === undefined) {
				end = this.selectionEnd;
			}
			if(end < 0) {
				end = 0;
			}
			this.selectionStart = start;
			this.selectionEnd = end;
			fileDesc.editorStart = start;
			fileDesc.editorEnd = end;
			saveLastSelection();
		};
		this.saveSelectionState = (function() {
			function save() {
				if(fileChanged === false) {
					var selectionStart = self.selectionStart;
					var selectionEnd = self.selectionEnd;
					var selection = rangy.getSelection();
					if(selection.rangeCount > 0) {
						var selectionRange = selection.getRangeAt(0);
						var node = selectionRange.startContainer;
						if((contentElt.compareDocumentPosition(node) & Node.DOCUMENT_POSITION_CONTAINED_BY) || contentElt === node) {
							var offset = selectionRange.startOffset;
							if(node.hasChildNodes() && offset > 0) {
								node = node.childNodes[offset - 1];
								offset = node.textContent.length;
							}
							var container = node;
							while(node != contentElt) {
								while(node = node.previousSibling) {
									if(node.textContent) {
										offset += node.textContent.length;
									}
								}
								node = container = container.parentNode;
							}

							if(selection.isBackwards()) {
								selectionStart = offset + selectionRange.toString().length;
								selectionEnd = offset;
							}
							else {
								selectionStart = offset;
								selectionEnd = offset + selectionRange.toString().length;
							}

							if(selectionStart === selectionEnd && selectionRange.startContainer.textContent == '\n' && selectionRange.startOffset == 1) {
								// In IE if end of line is selected, offset is wrong
								// Also, in Firefox cursor can be after the trailingLfNode
								selectionStart = --selectionEnd;
								self.setSelectionStartEnd(selectionStart, selectionEnd);
								self.updateSelectionRange();
							}
						}
					}
					self.setSelectionStartEnd(selectionStart, selectionEnd);
				}
				undoMgr.saveSelectionState();
			}

			var nextTickAdjustScroll = false;
			var debouncedSave = utils.debounce(function() {
				save();
				self.updateCursorCoordinates(nextTickAdjustScroll);
				// In some cases we have to wait a little bit more to see the selection change (Cmd+A on Chrome/OSX)
				longerDebouncedSave();
			});
			var longerDebouncedSave = utils.debounce(function() {
				save();
				if(lastSelectionStart === self.selectionStart && lastSelectionEnd === self.selectionEnd) {
					nextTickAdjustScroll = false;
				}
				self.updateCursorCoordinates(nextTickAdjustScroll);
				nextTickAdjustScroll = false;
			}, 10);

			return function(debounced, adjustScroll, forceAdjustScroll) {
				if(forceAdjustScroll) {
					lastSelectionStart = undefined;
					lastSelectionEnd = undefined;
				}
				if(debounced) {
					nextTickAdjustScroll = nextTickAdjustScroll || adjustScroll;
					return debouncedSave();
				}
				else {
					save();
				}
			};
		})();
		this.getSelectedText = function() {
			var min = Math.min(this.selectionStart, this.selectionEnd);
			var max = Math.max(this.selectionStart, this.selectionEnd);
			return textContent.substring(min, max);
		};
		this.getCoordinates = function(inputOffset, container, offsetInContainer) {
			if(!container) {
				var offset = this.findOffsets([inputOffset])[0];
				container = offset.container;
				offsetInContainer = offset.offsetInContainer;
			}
			var x = 0;
			var y = 0;
			if(container.textContent == '\n') {
				y = container.parentNode.offsetTop + container.parentNode.offsetHeight / 2;
			}
			else {
				var selectedChar = textContent[inputOffset];
				var startOffset = {
					container: container,
					offsetInContainer: offsetInContainer,
					offset: inputOffset
				};
				var endOffset = {
					container: container,
					offsetInContainer: offsetInContainer,
					offset: inputOffset
				};
				if(inputOffset > 0 && (selectedChar === undefined || selectedChar == '\n')) {
					if(startOffset.offset === 0) {
						// Need to calculate offset-1
						startOffset = inputOffset - 1;
					}
					else {
						startOffset.offsetInContainer -= 1;
					}
				}
				else {
					if(endOffset.offset === container.textContent.length) {
						// Need to calculate offset+1
						endOffset = inputOffset + 1;
					}
					else {
						endOffset.offsetInContainer += 1;
					}
				}
				var selectionRange = this.createRange(startOffset, endOffset);
				var selectionRect = selectionRange.getBoundingClientRect();
				y = selectionRect.top + selectionRect.height / 2 - inputElt.getBoundingClientRect().top + inputElt.scrollTop;
			}
			return {
				x: x,
				y: y
			};
		};
		this.getClosestWordOffset = function(offset) {
			var offsetStart = 0;
			var offsetEnd = 0;
			var nextOffset = 0;
			textContent.split(/\s/).some(function(word) {
				if(word) {
					offsetStart = nextOffset;
					offsetEnd = nextOffset + word.length;
					if(offsetEnd > offset) {
						return true;
					}
				}
				nextOffset += word.length + 1;
			});
			return {
				start: offsetStart,
				end: offsetEnd
			};
		};
	}

	var selectionMgr = new SelectionMgr();
	editor.selectionMgr = selectionMgr;
	$(document).on('selectionchange', '.editor-content', _.bind(selectionMgr.saveSelectionState, selectionMgr, true, false));

	function adjustCursorPosition(force) {
		if(inputElt === undefined) {
			return;
		}
		selectionMgr.saveSelectionState(true, true, force);
	}

	editor.adjustCursorPosition = adjustCursorPosition;

	var textContent;

	function setValue(value) {
		var startOffset = diffMatchPatch.diff_commonPrefix(textContent, value);
		if(startOffset === textContent.length) {
			startOffset--;
		}
		var endOffset = Math.min(
			diffMatchPatch.diff_commonSuffix(textContent, value),
				textContent.length - startOffset,
				value.length - startOffset
		);
		var replacement = value.substring(startOffset, value.length - endOffset);
		var range = selectionMgr.createRange(startOffset, textContent.length - endOffset);
		range.deleteContents();
		range.insertNode(document.createTextNode(replacement));
		return {
			start: startOffset,
			end: value.length - endOffset
		};
	}

	editor.setValue = setValue;

	function replace(selectionStart, selectionEnd, replacement) {
		undoMgr.currentMode = undoMgr.currentMode || 'replace';
		var range = selectionMgr.createRange(
			Math.min(selectionStart, selectionEnd),
			Math.max(selectionStart, selectionEnd)
		);
		if('' + range != replacement) {
			range.deleteContents();
			range.insertNode(document.createTextNode(replacement));
		}
		var endOffset = selectionStart + replacement.length;
		selectionMgr.setSelectionStartEnd(endOffset, endOffset);
		selectionMgr.updateSelectionRange();
		selectionMgr.updateCursorCoordinates(true);
	}

	editor.replace = replace;

	function replaceAll(search, replacement) {
		undoMgr.currentMode = undoMgr.currentMode || 'replace';
		var value = textContent.replace(search, replacement);
		if(value != textContent) {
			var offset = editor.setValue(value);
			selectionMgr.setSelectionStartEnd(offset.end, offset.end);
			selectionMgr.updateSelectionRange();
			selectionMgr.updateCursorCoordinates(true);
		}
	}

	editor.replaceAll = replaceAll;

	function replacePreviousText(text, replacement) {
		var offset = selectionMgr.selectionStart;
		if(offset !== selectionMgr.selectionEnd) {
			return false;
		}
		var range = selectionMgr.createRange(offset - text.length, offset);
		if('' + range != text) {
			return false;
		}
		range.deleteContents();
		range.insertNode(document.createTextNode(replacement));
		offset = offset - text.length + replacement.length;
		selectionMgr.setSelectionStartEnd(offset, offset);
		selectionMgr.updateSelectionRange();
		selectionMgr.updateCursorCoordinates(true);
		return true;
	}

	editor.replacePreviousText = replacePreviousText;

	function setValueNoWatch(value) {
		setValue(value);
		textContent = value;
	}

	editor.setValueNoWatch = setValueNoWatch;

	function getValue() {
		return textContent;
	}

	editor.getValue = getValue;

	function focus() {
		$contentElt.focus();
		selectionMgr.updateSelectionRange();
		inputElt.scrollTop = scrollTop;
	}

	editor.focus = focus;

	function UndoMgr() {
		var undoStack = [];
		var redoStack = [];
		var lastTime;
		var lastMode;
		var currentState;
		var selectionStartBefore;
		var selectionEndBefore;
		this.setCommandMode = function() {
			this.currentMode = 'command';
		};
		this.setMode = function() {
		}; // For compatibility with PageDown
		this.onButtonStateChange = function() {
		}; // To be overridden by PageDown
		this.saveState = utils.debounce(function() {
			redoStack = [];
			var currentTime = Date.now();
			if(this.currentMode == 'comment' ||
				this.currentMode == 'replace' ||
				lastMode == 'newlines' ||
				this.currentMode != lastMode ||
				currentTime - lastTime > 1000) {
				undoStack.push(currentState);
				// Limit the size of the stack
				while(undoStack.length > 100) {
					undoStack.shift();
				}
			}
			else {
				// Restore selectionBefore that has potentially been modified by saveSelectionState
				selectionStartBefore = currentState.selectionStartBefore;
				selectionEndBefore = currentState.selectionEndBefore;
			}
			currentState = {
				selectionStartBefore: selectionStartBefore,
				selectionEndBefore: selectionEndBefore,
				selectionStartAfter: selectionMgr.selectionStart,
				selectionEndAfter: selectionMgr.selectionEnd,
				content: textContent,
				discussionListJSON: fileDesc.discussionListJSON
			};
			lastTime = currentTime;
			lastMode = this.currentMode;
			this.currentMode = undefined;
			this.onButtonStateChange();
		}, this);
		this.saveSelectionState = _.debounce(function() {
			// Should happen just after saveState
			if(this.currentMode === undefined) {
				selectionStartBefore = selectionMgr.selectionStart;
				selectionEndBefore = selectionMgr.selectionEnd;
			}
		}, 50);
		this.canUndo = function() {
			return undoStack.length;
		};
		this.canRedo = function() {
			return redoStack.length;
		};
		function restoreState(state, selectionStart, selectionEnd) {
			// Update editor
			watcher.noWatch(function() {
				if(textContent != state.content) {
					setValueNoWatch(state.content);
					fileDesc.content = state.content;
					eventMgr.onContentChanged(fileDesc, state.content);
				}
				selectionMgr.setSelectionStartEnd(selectionStart, selectionEnd);
				selectionMgr.updateSelectionRange();
				selectionMgr.updateCursorCoordinates(true);
				var discussionListJSON = fileDesc.discussionListJSON;
				if(discussionListJSON != state.discussionListJSON) {
					var oldDiscussionList = fileDesc.discussionList;
					fileDesc.discussionListJSON = state.discussionListJSON;
					var newDiscussionList = fileDesc.discussionList;
					var diff = jsonDiffPatch.diff(oldDiscussionList, newDiscussionList);
					var commentsChanged = false;
					_.each(diff, function(discussionDiff, discussionIndex) {
						if(!_.isArray(discussionDiff)) {
							commentsChanged = true;
						}
						else if(discussionDiff.length === 1) {
							eventMgr.onDiscussionCreated(fileDesc, newDiscussionList[discussionIndex]);
						}
						else {
							eventMgr.onDiscussionRemoved(fileDesc, oldDiscussionList[discussionIndex]);
						}
					});
					commentsChanged && eventMgr.onCommentsChanged(fileDesc);
				}
			});

			selectionStartBefore = selectionStart;
			selectionEndBefore = selectionEnd;
			currentState = state;
			this.currentMode = undefined;
			lastMode = undefined;
			this.onButtonStateChange();
			adjustCursorPosition();
		}

		this.undo = function() {
			var state = undoStack.pop();
			if(!state) {
				return;
			}
			redoStack.push(currentState);
			restoreState.call(this, state, currentState.selectionStartBefore, currentState.selectionEndBefore);
		};
		this.redo = function() {
			var state = redoStack.pop();
			if(!state) {
				return;
			}
			undoStack.push(currentState);
			restoreState.call(this, state, state.selectionStartAfter, state.selectionEndAfter);
		};
		this.init = function() {
			var content = fileDesc.content;
			undoStack = [];
			redoStack = [];
			lastTime = 0;
			currentState = {
				selectionStartAfter: fileDesc.selectionStart,
				selectionEndAfter: fileDesc.selectionEnd,
				content: content,
				discussionListJSON: fileDesc.discussionListJSON
			};
			this.currentMode = undefined;
			lastMode = undefined;
			contentElt.textContent = content;
			// Force this since the content could be the same
			checkContentChange();
		};
	}

	var undoMgr = new UndoMgr();
	editor.undoMgr = undoMgr;

	function onComment() {
		if(watcher.isWatching === true) {
			undoMgr.currentMode = undoMgr.currentMode || 'comment';
			undoMgr.saveState();
		}
	}

	eventMgr.addListener('onDiscussionCreated', onComment);
	eventMgr.addListener('onDiscussionRemoved', onComment);
	eventMgr.addListener('onCommentsChanged', onComment);

	var triggerSpellCheck = _.debounce(function() {
		var selection = window.getSelection();
		if(!selectionMgr.hasFocus || isComposing || selectionMgr.selectionStart !== selectionMgr.selectionEnd || !selection.modify) {
			return;
		}
		// Hack for Chrome to trigger the spell checker
		if(selectionMgr.selectionStart) {
			selection.modify("move", "backward", "character");
			selection.modify("move", "forward", "character");
		}
		else {
			selection.modify("move", "forward", "character");
			selection.modify("move", "backward", "character");
		}
	}, 10);

	function checkContentChange() {
		var newTextContent = inputElt.textContent;
		if(contentElt.lastChild === trailingLfNode && trailingLfNode.textContent.slice(-1) == '\n') {
			newTextContent = newTextContent.slice(0, -1);
		}
		newTextContent = newTextContent.replace(/\r\n?/g, '\n'); // Mac/DOS to Unix

		if(fileChanged === false) {
			if(newTextContent == textContent) {
				// User has removed the empty section
				if(contentElt.children.length === 0) {
					contentElt.innerHTML = '';
					sectionList.forEach(function(section) {
						contentElt.appendChild(section.elt);
					});
					addTrailingLfNode();
				}
				return;
			}
			undoMgr.currentMode = undoMgr.currentMode || 'typing';
			var discussionList = _.values(fileDesc.discussionList);
			fileDesc.newDiscussion && discussionList.push(fileDesc.newDiscussion);
			var updateDiscussionList = adjustCommentOffsets(textContent, newTextContent, discussionList);
			textContent = newTextContent;
			if(updateDiscussionList === true) {
				fileDesc.discussionList = fileDesc.discussionList; // Write discussionList in localStorage
			}
			fileDesc.content = textContent;
			selectionMgr.saveSelectionState();
			eventMgr.onContentChanged(fileDesc, textContent);
			updateDiscussionList && eventMgr.onCommentsChanged(fileDesc);
			undoMgr.saveState();
			triggerSpellCheck();
		}
		else {
			textContent = newTextContent;
			fileDesc.content = textContent;
			selectionMgr.setSelectionStartEnd(fileDesc.editorStart, fileDesc.editorEnd);
			selectionMgr.updateSelectionRange();
			selectionMgr.updateCursorCoordinates();
			undoMgr.saveSelectionState();
			eventMgr.onFileOpen(fileDesc, textContent);
			previewElt.scrollTop = fileDesc.previewScrollTop;
			scrollTop = fileDesc.editorScrollTop;
			inputElt.scrollTop = scrollTop;
			fileChanged = false;
		}
	}

	function adjustCommentOffsets(oldTextContent, newTextContent, discussionList) {
		if(!discussionList.length) {
			return;
		}
		var changes = diffMatchPatch.diff_main(oldTextContent, newTextContent);
		var changed = false;
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
				if(discussion.selectionEnd > endOffset) {
					discussion.selectionEnd += diffOffset;
					discussion.discussionIndex && (changed = true);
				}
				else if(discussion.selectionEnd > startOffset) {
					discussion.selectionEnd = startOffset;
					discussion.discussionIndex && (changed = true);
				}
				// selectionStart
				if(discussion.selectionStart >= endOffset) {
					discussion.selectionStart += diffOffset;
					discussion.discussionIndex && (changed = true);
				}
				else if(discussion.selectionStart > startOffset) {
					discussion.selectionStart = startOffset;
					discussion.discussionIndex && (changed = true);
				}
			});
			if(changeType === 1) {
				startOffset += changeText.length;
			}
		});
		return changed;
	}

	editor.adjustCommentOffsets = adjustCommentOffsets;

	editor.init = function() {
		inputElt = document.getElementById('wmd-input');
		$inputElt = $(inputElt);
		contentElt = inputElt.querySelector('.editor-content');
		$contentElt = $(contentElt);
		marginElt = inputElt.querySelector('.editor-margin');
		$marginElt = $(marginElt);
		previewElt = document.querySelector('.preview-container');

		$inputElt.addClass(settings.editorFontClass);

		watcher.startWatching();

		$(inputElt).scroll(function() {
			scrollTop = inputElt.scrollTop;
			if(fileChanged === false) {
				fileDesc.editorScrollTop = scrollTop;
			}
		});
		$(previewElt).scroll(function() {
			if(fileChanged === false) {
				fileDesc.previewScrollTop = previewElt.scrollTop;
			}
		});

		// See https://gist.github.com/shimondoodkin/1081133
		if(/AppleWebKit\/([\d.]+)/.exec(navigator.userAgent)) {
			var $editableFix = $('<input style="width:1px;height:1px;border:none;margin:0;padding:0;" tabIndex="-1">').appendTo('html');
			$contentElt.blur(function() {
				$editableFix[0].setSelectionRange(0, 0);
				$editableFix.blur();
			});
		}

		inputElt.focus = focus;
		inputElt.adjustCursorPosition = adjustCursorPosition;

		Object.defineProperty(inputElt, 'value', {
			get: function() {
				return textContent;
			},
			set: setValue
		});

		Object.defineProperty(inputElt, 'selectionStart', {
			get: function() {
				return Math.min(selectionMgr.selectionStart, selectionMgr.selectionEnd);
			},
			set: function(value) {
				selectionMgr.setSelectionStartEnd(value);
				selectionMgr.updateSelectionRange();
				selectionMgr.updateCursorCoordinates();
			},

			enumerable: true,
			configurable: true
		});

		Object.defineProperty(inputElt, 'selectionEnd', {
			get: function() {
				return Math.max(selectionMgr.selectionStart, selectionMgr.selectionEnd);
			},
			set: function(value) {
				selectionMgr.setSelectionStartEnd(undefined, value);
				selectionMgr.updateSelectionRange();
				selectionMgr.updateCursorCoordinates();
			},

			enumerable: true,
			configurable: true
		});

		var clearNewline = false;
		$contentElt
			.on('keydown', function(evt) {
				if(
					evt.which === 17 || // Ctrl
					evt.which === 91 || // Cmd
					evt.which === 18 || // Alt
					evt.which === 16 // Shift
					) {
					return;
				}
				selectionMgr.saveSelectionState();
				adjustCursorPosition();

				var cmdOrCtrl = evt.metaKey || evt.ctrlKey;

				switch(evt.which) {
					case 9: // Tab
						if(!cmdOrCtrl) {
							action('indent', {
								inverse: evt.shiftKey
							});
							evt.preventDefault();
						}
						break;
					case 13:
						action('newline');
						evt.preventDefault();
						break;
				}
				if(evt.which !== 13) {
					clearNewline = false;
				}
			})
			.on('compositionstart', function() {
				isComposing++;
			})
			.on('compositionend', function() {
				setTimeout(function() {
					isComposing--;
				}, 0);
			})
			.on('mouseup', _.bind(selectionMgr.saveSelectionState, selectionMgr, true, false))
			.on('paste', function(evt) {
				undoMgr.currentMode = 'paste';
				evt.preventDefault();
				var data, clipboardData = (evt.originalEvent || evt).clipboardData;
				if(clipboardData) {
					data = clipboardData.getData('text/plain');
				}
				else {
					clipboardData = window.clipboardData;
					data = clipboardData && clipboardData.getData('Text');
				}
				if(!data) {
					return;
				}
				replace(selectionMgr.selectionStart, selectionMgr.selectionEnd, data);
				adjustCursorPosition();
			})
			.on('cut', function() {
				undoMgr.currentMode = 'cut';
				adjustCursorPosition();
			})
			.on('focus', function() {
				selectionMgr.hasFocus = true;
			})
			.on('blur', function() {
				selectionMgr.hasFocus = false;
			});

		var action = function(action, options) {
			var textContent = getValue();
			var min = Math.min(selectionMgr.selectionStart, selectionMgr.selectionEnd);
			var max = Math.max(selectionMgr.selectionStart, selectionMgr.selectionEnd);
			var state = {
				selectionStart: min,
				selectionEnd: max,
				before: textContent.slice(0, min),
				after: textContent.slice(max),
				selection: textContent.slice(min, max)
			};

			actions[action](state, options || {});
			setValue(state.before + state.selection + state.after);
			selectionMgr.setSelectionStartEnd(state.selectionStart, state.selectionEnd);
			selectionMgr.updateSelectionRange();
		};

		var indentRegex = /^ {0,3}>[ ]*|^[ \t]*(?:[*+\-]|(\d+)\.)[ \t]|^\s+/;
		var actions = {
			indent: function(state, options) {
				function strSplice(str, i, remove, add) {
					remove = +remove || 0;
					add = add || '';
					return str.slice(0, i) + add + str.slice(i + remove);
				}

				var lf = state.before.lastIndexOf('\n') + 1;
				if(options.inverse) {
					if(/\s/.test(state.before.charAt(lf))) {
						state.before = strSplice(state.before, lf, 1);

						state.selectionStart--;
						state.selectionEnd--;
					}
					state.selection = state.selection.replace(/^[ \t]/gm, '');
				} else {
					var previousLine = state.before.slice(lf);
					if(state.selection || previousLine.match(indentRegex)) {
						state.before = strSplice(state.before, lf, 0, '\t');
						state.selection = state.selection.replace(/\r?\n(?=[\s\S])/g, '\n\t');
						state.selectionStart++;
						state.selectionEnd++;
					} else {
						state.before += '\t';
						state.selectionStart++;
						state.selectionEnd++;
						return;
					}
				}

				state.selectionEnd = state.selectionStart + state.selection.length;
			},

			newline: function(state) {
				var lf = state.before.lastIndexOf('\n') + 1;
				if(clearNewline) {
					state.before = state.before.substring(0, lf);
					state.selection = '';
					state.selectionStart = lf;
					state.selectionEnd = lf;
					clearNewline = false;
					return;
				}
				clearNewline = false;
				var previousLine = state.before.slice(lf);
				var indentMatch = previousLine.match(indentRegex);
				var indent = (indentMatch || [''])[0];
				if(indentMatch && indentMatch[1]) {
					var number = parseInt(indentMatch[1], 10);
					indent = indent.replace(/\d+/, number + 1);
				}
				if(indent.length) {
					clearNewline = true;
				}

				undoMgr.currentMode = 'newlines';

				state.before += '\n' + indent;
				state.selection = '';
				state.selectionStart += indent.length + 1;
				state.selectionEnd = state.selectionStart;
			}
		};
	};

	var sectionList = [];
	var sectionsToRemove = [];
	var modifiedSections = [];
	var insertBeforeSection;

	function updateSectionList(newSectionList) {

		modifiedSections = [];
		sectionsToRemove = [];
		insertBeforeSection = undefined;

		// Render everything if file changed
		if(fileChanged === true) {
			sectionsToRemove = sectionList;
			sectionList = newSectionList;
			modifiedSections = newSectionList;
			return;
		}

		// Find modified section starting from top
		var leftIndex = sectionList.length;
		_.some(sectionList, function(section, index) {
			var newSection = newSectionList[index];
			if(index >= newSectionList.length ||
				// Check modified
				section.textWithFrontMatter != newSection.textWithFrontMatter ||
				// Check that section has not been detached or moved
				section.elt.parentNode !== contentElt ||
				// Check also the content since nodes can be injected in sections via copy/paste
				section.elt.textContent != newSection.textWithFrontMatter) {
				leftIndex = index;
				return true;
			}
		});

		// Find modified section starting from bottom
		var rightIndex = -sectionList.length;
		_.some(sectionList.slice().reverse(), function(section, index) {
			var newSection = newSectionList[newSectionList.length - index - 1];
			if(index >= newSectionList.length ||
				// Check modified
				section.textWithFrontMatter != newSection.textWithFrontMatter ||
				// Check that section has not been detached or moved
				section.elt.parentNode !== contentElt ||
				// Check also the content since nodes can be injected in sections via copy/paste
				section.elt.textContent != newSection.textWithFrontMatter) {
				rightIndex = -index;
				return true;
			}
		});

		if(leftIndex - rightIndex > sectionList.length) {
			// Prevent overlap
			rightIndex = leftIndex - sectionList.length;
		}

		// Create an array composed of left unmodified, modified, right
		// unmodified sections
		var leftSections = sectionList.slice(0, leftIndex);
		modifiedSections = newSectionList.slice(leftIndex, newSectionList.length + rightIndex);
		var rightSections = sectionList.slice(sectionList.length + rightIndex, sectionList.length);
		insertBeforeSection = _.first(rightSections);
		sectionsToRemove = sectionList.slice(leftIndex, sectionList.length + rightIndex);
		sectionList = leftSections.concat(modifiedSections).concat(rightSections);
	}

	function highlightSections() {
		var newSectionEltList = document.createDocumentFragment();
		modifiedSections.forEach(function(section) {
			highlight(section);
			newSectionEltList.appendChild(section.elt);
		});
		watcher.noWatch(function() {
			if(fileChanged === true) {
				contentElt.innerHTML = '';
				contentElt.appendChild(newSectionEltList);
			}
			else {
				// Remove outdated sections
				sectionsToRemove.forEach(function(section) {
					// section may be already removed
					section.elt.parentNode === contentElt && contentElt.removeChild(section.elt);
					// To detect sections that come back with built-in undo
					section.elt.generated = false;
				});

				if(insertBeforeSection !== undefined) {
					contentElt.insertBefore(newSectionEltList, insertBeforeSection.elt);
				}
				else {
					contentElt.appendChild(newSectionEltList);
				}

				// Remove unauthorized nodes (text nodes outside of sections or duplicated sections via copy/paste)
				var childNode = contentElt.firstChild;
				while(childNode) {
					var nextNode = childNode.nextSibling;
					if(!childNode.generated) {
						contentElt.removeChild(childNode);
					}
					childNode = nextNode;
				}
			}
			addTrailingLfNode();
			selectionMgr.updateSelectionRange();
			selectionMgr.updateCursorCoordinates();
		});
	}

	function addTrailingLfNode() {
		trailingLfNode = crel('span', {
			class: 'token lf'
		});
		trailingLfNode.textContent = '\n';
		contentElt.appendChild(trailingLfNode);
	}

	var escape = (function() {
		var entityMap = {
			"&": "&amp;",
			"<": "&lt;",
			"\u00a0": ' '
		};
		return function(str) {
			return str.replace(/[&<\u00a0]/g, function(s) {
				return entityMap[s];
			});
		};
	})();

	function highlight(section) {
		var text = escape(section.text);
		if(!window.viewerMode) {
			text = Prism.highlight(text, Prism.languages.md);
		}
		var frontMatter = section.textWithFrontMatter.substring(0, section.textWithFrontMatter.length - section.text.length);
		if(frontMatter.length) {
			// Front matter highlighting
			frontMatter = escape(frontMatter);
			frontMatter = frontMatter.replace(/\n/g, '<span class="token lf">\n</span>');
			text = '<span class="token md">' + frontMatter + '</span>' + text;
		}
		var sectionElt = crel('span', {
			id: 'wmd-input-section-' + section.id,
			class: 'wmd-input-section'
		});
		sectionElt.generated = true;
		sectionElt.innerHTML = text;
		section.elt = sectionElt;
	}

	eventMgr.onEditorCreated(editor);
	return editor;
});
