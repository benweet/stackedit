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
		this.selectionStart = 0;
		this.selectionEnd = 0;
		this.cursorY = 0;
		this.findOffset = function(offset) {
			var walker = document.createTreeWalker(contentElt, 4, null, false);
			var text = '';
			while(walker.nextNode()) {
				text = walker.currentNode.nodeValue || '';
				if(text.length > offset) {
					return {
						container: walker.currentNode,
						offset: offset
					};
				}
				offset -= text.length;
			}
			return {
				container: walker.currentNode,
				offset: text.length
			};
		};
		this.createRange = function(start, end) {
			start = start < 0 ? 0 : start;
			end = end < 0 ? 0 : end;
			var range = document.createRange();
			var offset = _.isObject(start) ? start : this.findOffset(start);
			range.setStart(offset.container, offset.offset);
			if(end && end != start) {
				offset = _.isObject(end) ? end : this.findOffset(end);
			}
			range.setEnd(offset.container, offset.offset);
			return range;
		};
		var adjustScroll;
		var debouncedUpdateCursorCoordinates = utils.debounce(function() {
			$inputElt.toggleClass('has-selection', this.selectionStart !== this.selectionEnd);
			var coordinates = this.getCoordinates(this.selectionEnd, this.selectionEndContainer, this.selectionEndOffset);
			if(this.cursorY !== coordinates.y) {
				this.cursorY = coordinates.y;
				eventMgr.onCursorCoordinates(coordinates.x, coordinates.y);
				if(adjustScroll && settings.cursorFocusRatio) {
					var adjust = inputElt.offsetHeight / 2 * settings.cursorFocusRatio;
					var cursorMinY = inputElt.scrollTop + adjust;
					var cursorMaxY = inputElt.scrollTop + inputElt.offsetHeight - adjust;
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
			selection.detach();
            range.detach();
		};
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
		};
		this.saveSelectionState = (function() {
			function save() {
				if(fileChanged === false) {
					var selectionStart = self.selectionStart;
					var selectionEnd = self.selectionEnd;
					var range;
					var selection = rangy.getSelection();
					if(selection.rangeCount > 0) {
						var selectionRange = selection.getRangeAt(0);
						var element = selectionRange.startContainer;
						if((contentElt.compareDocumentPosition(element) & 0x10)) {
							range = selectionRange;
							var container = element;
							var offset = range.startOffset;
							do {
								while(element = element.previousSibling) {
									if(element.textContent) {
										offset += element.textContent.length;
									}
								}
								element = container = container.parentNode;
							} while(element && element != inputElt);

							if(selection.isBackwards()) {
								selectionStart = offset + (range + '').length;
								selectionEnd = offset;
							}
							else {
								selectionStart = offset;
								selectionEnd = offset + (range + '').length;
							}
						}
                        selectionRange.detach();
					}
					selection.detach();
					self.setSelectionStartEnd(selectionStart, selectionEnd);
				}
				undoMgr.saveSelectionState();
			}
			var nextTickAdjustScroll = false;
			var debouncedSave = utils.debounce(function() {
				save();
				self.updateCursorCoordinates(nextTickAdjustScroll);
				nextTickAdjustScroll = false;
			});

			return function(debounced, adjustScroll) {
				if(debounced) {
					nextTickAdjustScroll = nextTickAdjustScroll || adjustScroll;
					return debouncedSave();
				}
				else {
					save();
				}
			};
		})();
		this.getCoordinates = function(inputOffset, container, offset) {
			if(!container) {
				offset = this.findOffset(inputOffset);
				container = offset.container;
				offset = offset.offset;
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
					offset: offset
				};
				var endOffset = {
					container: container,
					offset: offset
				};
				if(inputOffset > 0 && (selectedChar === undefined || selectedChar == '\n')) {
					if(startOffset.offset === 0) {
						startOffset = inputOffset - 1;
					}
					else {
						startOffset.offset -= 1;
					}
				}
				else {
					if(endOffset.offset === container.textContent.length) {
						endOffset = inputOffset + 1;
					}
					else {
						endOffset.offset += 1;
					}
				}
				var selectionRange = this.createRange(startOffset, endOffset);
				var selectionRect = selectionRange.getBoundingClientRect();
				y = selectionRect.top + selectionRect.height / 2 - inputElt.getBoundingClientRect().top + inputElt.scrollTop;
				selectionRange.detach();
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

	function adjustCursorPosition() {
		if(inputElt === undefined) {
			return;
		}
		selectionMgr.saveSelectionState(true, true);
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
        range.detach();
	}

	editor.setValue = setValue;

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
        range.detach();
		offset = offset - text.length + replacement.length;
		selectionMgr.setSelectionStartEnd(offset, offset);
		selectionMgr.updateSelectionRange();
		selectionMgr.updateCursorCoordinates();
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
			if(this.currentMode == 'comment' || lastMode == 'newlines' || this.currentMode != lastMode || currentTime - lastTime > 1000) {
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
			if(this.currentMode === undefined) {
				selectionStartBefore = selectionMgr.selectionStart;
				selectionEndBefore = selectionMgr.selectionEnd;
			}
		}, 10);
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
				selectionMgr.updateCursorCoordinates();
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

	var trailingLfNode;

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
			.on('paste', function() {
				undoMgr.currentMode = 'paste';
				adjustCursorPosition();
			})
			.on('cut', function() {
				undoMgr.currentMode = 'cut';
				adjustCursorPosition();
			});

		var action = function(action, options) {
			options = options || {};

			var textContent = getValue();
			var selectionStart = options.start || selectionMgr.selectionStart;
			var selectionEnd = options.end || selectionMgr.selectionEnd;
			var state = {
				selectionStart: selectionStart,
				selectionEnd: selectionEnd,
				before: textContent.slice(0, selectionStart),
				after: textContent.slice(selectionEnd),
				selection: textContent.slice(selectionStart, selectionEnd)
			};

			actions[action](state, options);
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
					// section can be already removed
					section.elt.parentNode === contentElt && contentElt.removeChild(section.elt);
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
