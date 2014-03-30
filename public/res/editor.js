/* jshint -W084, -W099 */
define([
    'jquery',
    'underscore',
    'settings',
    'eventMgr',
    'prism-core',
    'diff_match_patch_uncompressed',
    'jsondiffpatch',
    'crel',
    'MutationObservers',
    'libs/prism-markdown'
], function ($, _, settings, eventMgr, Prism, diff_match_patch, jsondiffpatch, crel) {

    function strSplice(str, i, remove, add) {
        remove = +remove || 0;
        add = add || '';
        return str.slice(0, i) + add + str.slice(i + remove);
    }

    var editor = {};
    var selectionStart = 0;
    var selectionEnd = 0;
    var scrollTop = 0;
    var inputElt;
    var $inputElt;
    var previewElt;
    var pagedownEditor;
    var refreshPreviewLater = (function() {
        var elapsedTime = 0;
        var refreshPreview = function() {
            var startTime = Date.now();
            pagedownEditor.refreshPreview();
            elapsedTime = Date.now() - startTime;
        };
        if(settings.lazyRendering === true) {
            return _.debounce(refreshPreview, 500);
        }
        return function() {
            setTimeout(refreshPreview, elapsedTime < 2000 ? elapsedTime : 2000);
        };
    })();
    eventMgr.addListener('onPagedownConfigure', function(editor) {
        pagedownEditor = editor;
    });

    eventMgr.addListener('onSectionsCreated', function(newSectionList) {
        updateSectionList(newSectionList);
        highlightSections();
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

    // Watcher used to detect editor changes
    function Watcher() {
        this.isWatching = false;
        var contentObserver;
        this.startWatching = function() {
            this.isWatching = true;
            contentObserver = contentObserver || new MutationObserver(checkContentChange);
            contentObserver.observe(editor.contentElt, {
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

    function setValue(value) {
        var startOffset = diffMatchPatch.diff_commonPrefix(previousTextContent, value);
        var endOffset = Math.min(
            diffMatchPatch.diff_commonSuffix(previousTextContent, value),
            previousTextContent.length - startOffset,
            value.length - startOffset
        );
        var replacement = value.substring(startOffset, value.length - endOffset);
        var range = createRange(startOffset, previousTextContent.length - endOffset);
        range.deleteContents();
        range.insertNode(document.createTextNode(replacement));
    }

    function setValueNoWatch(value) {
        setValue(value);
        previousTextContent = value;
    }
    editor.setValueNoWatch = setValueNoWatch;

    function setSelectionStartEnd(start, end) {
        selectionStart = start;
        selectionEnd = end;
        fileDesc.editorStart = selectionStart;
        fileDesc.editorEnd = selectionEnd;
        var range = createRange(start, end);
        var selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
    }

    function createRange(start, end) {
        var range = document.createRange();
        var offset = _.isObject(start) ? start : findOffset(start);
        range.setStart(offset.element, offset.offset);
        if (end && end != start) {
            offset = _.isObject(end) ? end : findOffset(end);
        }
        range.setEnd(offset.element, offset.offset);
        return range;
    }

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

    var previousTextContent;
    function UndoManager() {
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
        this.setMode = function() {}; // For compatibility with PageDown
        this.onButtonStateChange = function() {}; // To be overridden by PageDown
        this.saveState = function() {
            redoStack = [];
            var currentTime = Date.now();
            if(this.currentMode == 'comment' || (this.currentMode != lastMode && lastMode != 'newlines') || currentTime - lastTime > 1000) {
                undoStack.push(currentState);
                // Limit the size of the stack
                if(undoStack.length === 100) {
                    undoStack.shift();
                }
            }
            else {
                selectionStartBefore = currentState.selectionStartBefore;
                selectionEndBefore = currentState.selectionEndBefore;
            }
            currentState = {
                selectionStartBefore: selectionStartBefore,
                selectionEndBefore: selectionEndBefore,
                selectionStartAfter: selectionStart,
                selectionEndAfter: selectionEnd,
                content: previousTextContent,
                discussionListJSON: fileDesc.discussionListJSON
            };
            lastTime = currentTime;
            lastMode = this.currentMode;
            this.currentMode = undefined;
            this.onButtonStateChange();
        };
        this.saveSelectionState = _.debounce(function() {
            if(this.currentMode === undefined) {
                selectionStartBefore = selectionStart;
                selectionEndBefore = selectionEnd;
            }
        }, 10);
        this.canUndo = function() {
            return undoStack.length;
        };
        this.canRedo = function() {
            return redoStack.length;
        };
        var self = this;
        function restoreState(state, selectionStart, selectionEnd) {
            // Update editor
            watcher.noWatch(function() {
                if(previousTextContent != state.content) {
                    setValueNoWatch(state.content);
                    fileDesc.content = state.content;
                    eventMgr.onContentChanged(fileDesc, state.content);
                }
                setSelectionStartEnd(selectionStart, selectionEnd);
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
            self.currentMode = undefined;
            lastMode = undefined;
            self.onButtonStateChange();
            adjustCursorPosition();
        }
        this.undo = function() {
            var state = undoStack.pop();
            if(!state) {
                return;
            }
            redoStack.push(currentState);
            restoreState(state, currentState.selectionStartBefore, currentState.selectionEndBefore);
        };
        this.redo = function() {
            var state = redoStack.pop();
            if(!state) {
                return;
            }
            undoStack.push(currentState);
            restoreState(state, state.selectionStartAfter, state.selectionEndAfter);
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
            editor.contentElt.textContent = content;
        };
    }
    var undoManager = new UndoManager();
    editor.undoManager = undoManager;

    function onComment() {
        if(watcher.isWatching === true) {
            undoManager.currentMode = 'comment';
            undoManager.saveState();
        }
    }
    eventMgr.addListener('onDiscussionCreated', onComment);
    eventMgr.addListener('onDiscussionRemoved', onComment);
    eventMgr.addListener('onCommentsChanged', onComment);

    function saveSelectionState() {
        if(fileChanged === false) {
            var selection = window.getSelection();
            if (selection.rangeCount > 0) {
                var range = selection.getRangeAt(0);
                var element = range.startContainer;

                if ((inputElt.compareDocumentPosition(element) & 0x10)) {
                    var container = element;
                    var offset = range.startOffset;
                    do {
                        while (element = element.previousSibling) {
                            if (element.textContent) {
                                offset += element.textContent.length;
                            }
                        }

                        element = container = container.parentNode;
                    } while (element && element != inputElt);
                    selectionStart = offset;
                    selectionEnd = offset + (range + '').length;
                }
            }
            fileDesc.editorStart = selectionStart;
            fileDesc.editorEnd = selectionEnd;
        }
        undoManager.saveSelectionState();
    }

    function checkContentChange() {
        saveSelectionState();
        var currentTextContent = inputElt.textContent;
        if(fileChanged === false) {
            if(currentTextContent == previousTextContent) {
                return;
            }
            if(!/\n$/.test(currentTextContent)) {
                currentTextContent += '\n';
            }
            undoManager.currentMode = undoManager.currentMode || 'typing';
            var changes = diffMatchPatch.diff_main(previousTextContent, currentTextContent);
            // Move comments according to changes
            var updateDiscussionList = false;
            var startOffset = 0;
            var discussionList = _.values(fileDesc.discussionList);
            fileDesc.newDiscussion && discussionList.push(fileDesc.newDiscussion);
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
            if(updateDiscussionList === true) {
                fileDesc.discussionList = fileDesc.discussionList; // Write discussionList in localStorage
            }
            fileDesc.content = currentTextContent;
            eventMgr.onContentChanged(fileDesc, currentTextContent);
            updateDiscussionList && eventMgr.onCommentsChanged(fileDesc);
            previousTextContent = currentTextContent;
            undoManager.saveState();
        }
        else {
            if(!/\n$/.test(currentTextContent)) {
                currentTextContent += '\n';
                fileDesc.content = currentTextContent;
            }
            selectionStart = fileDesc.editorStart;
            selectionEnd = fileDesc.editorEnd;
            eventMgr.onFileOpen(fileDesc, currentTextContent);
            previewElt.scrollTop = fileDesc.previewScrollTop;
            scrollTop = fileDesc.editorScrollTop;
            inputElt.scrollTop = scrollTop;
            previousTextContent = currentTextContent;
            fileChanged = false;
        }
    }

    function findOffset(offset) {
        var walker = document.createTreeWalker(editor.contentElt, 4);
        while(walker.nextNode()) {
            var text = walker.currentNode.nodeValue || '';
            if (text.length > offset) {
                return {
                    element: walker.currentNode,
                    offset: offset
                };
            }
            offset -= text.length;
        }
        return {
            element: editor.contentElt,
            offset: 0,
            error: true
        };
    }

    function getCoordinates(inputOffset, element, offset) {
        var x = 0;
        var y = 0;
        if(element.textContent == '\n') {
            y = element.parentNode.offsetTop + element.parentNode.offsetHeight / 2;
        }
        else {
            var selectedChar = inputElt.textContent[inputOffset];
            var selectionRange;
            if(selectedChar === undefined || selectedChar == '\n') {
                selectionRange = createRange(inputOffset - 1, {
                    element: element,
                    offset: offset
                });
            }
            else {
                selectionRange = createRange({
                    element: element,
                    offset: offset
                }, inputOffset + 1);
            }
            var selectionRect = selectionRange.getBoundingClientRect();
            y = selectionRect.top + selectionRect.height / 2 - inputElt.offsetTop + inputElt.scrollTop;
            selectionRange.detach();
        }
        return {
            x: x,
            y: y
        };

    }

    var cursorY = 0;
    var isBackwardSelection = false;
    function updateCursorCoordinates() {
        saveSelectionState();
        $inputElt.toggleClass('has-selection', selectionStart !== selectionEnd);

        var element;
        var offset;
        var inputOffset;
        if(inputElt.focused) {
            isBackwardSelection = false;
            var selection = window.getSelection();
            if(!selection.rangeCount) {
                return;
            }
            if (!selection.isCollapsed) {
                var range = document.createRange();
                range.setStart(selection.anchorNode, selection.anchorOffset);
                range.setEnd(selection.focusNode, selection.focusOffset);
                isBackwardSelection = range.collapsed;
                range.detach();
            }
            var selectionRange = selection.getRangeAt(0);
            element = isBackwardSelection ? selectionRange.startContainer : selectionRange.endContainer;
            offset = isBackwardSelection ? selectionRange.startOffset : selectionRange.endOffset;
            inputOffset = isBackwardSelection ? selectionStart : selectionEnd;
        }
        else {
            inputOffset = isBackwardSelection ? selectionStart : selectionEnd;
            var elementOffset = findOffset(inputOffset);
            element = elementOffset.element;
            offset = elementOffset.offset;
        }
        var coordinates = getCoordinates(inputOffset, element, offset);
        cursorY = coordinates.y;
        eventMgr.onCursorCoordinates(coordinates.x, coordinates.y);
    }

    var adjustCursorPosition = _.debounce(function() {
        if(inputElt === undefined) {
            return;
        }
        updateCursorCoordinates();

        var adjust = inputElt.offsetHeight / 2;
        if(adjust > 130) {
            adjust = 130;
        }
        var cursorMinY = inputElt.scrollTop + adjust;
        var cursorMaxY = inputElt.scrollTop + inputElt.offsetHeight - adjust;
        if(cursorY < cursorMinY) {
            inputElt.scrollTop += cursorY - cursorMinY;
        }
        else if(cursorY > cursorMaxY) {
            inputElt.scrollTop += cursorY - cursorMaxY;
        }
    }, 0);
    eventMgr.addListener('onLayoutResize', adjustCursorPosition);

    editor.init = function(elt1, elt2) {
        inputElt = elt1;
        $inputElt = $(inputElt);
        previewElt = elt2;

        editor.contentElt = crel('div', {
            class: 'editor-content',
            contenteditable: true
        });
        inputElt.appendChild(editor.contentElt);
        editor.$contentElt = $(editor.contentElt);

        editor.marginElt = crel('div', {
            class: 'editor-margin'
        });
        inputElt.appendChild(editor.marginElt);
        editor.$marginElt = $(editor.marginElt);

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

        inputElt.focus = function() {
            editor.$contentElt.focus();
            setSelectionStartEnd(selectionStart, selectionEnd);
            inputElt.scrollTop = scrollTop;
        };
        editor.$contentElt.focus(function() {
            inputElt.focused = true;
        });
        editor.$contentElt.blur(function() {
            inputElt.focused = false;
        });

        Object.defineProperty(inputElt, 'value', {
            get: function () {
                return this.textContent;
            },
            set: setValue
        });

        Object.defineProperty(inputElt, 'selectionStart', {
            get: function () {
                return selectionStart;
            },
            set: function (value) {
                setSelectionStartEnd(value, selectionEnd);
            },

            enumerable: true,
            configurable: true
        });

        Object.defineProperty(inputElt, 'selectionEnd', {
            get: function () {
                return selectionEnd;
            },
            set: function (value) {
                setSelectionStartEnd(selectionStart, value);
            },

            enumerable: true,
            configurable: true
        });

        inputElt.setSelectionStartEnd = setSelectionStartEnd;
        inputElt.createRange = createRange;
        inputElt.getOffsetCoordinates = function(ss) {
            var offset = findOffset(ss);
            return getCoordinates(ss, offset.element, offset.offset);
        };

        var clearNewline = false;
        editor.$contentElt.on('keydown', function (evt) {
            if(
                evt.which === 17 || // Ctrl
                evt.which === 91 || // Cmd
                evt.which === 18 || // Alt
                evt.which === 16 // Shift
            ) {
                return;
            }
            saveSelectionState();

            var cmdOrCtrl = evt.metaKey || evt.ctrlKey;
            if(!cmdOrCtrl) {
                adjustCursorPosition();
            }

            switch (evt.which) {
            case 9: // Tab
                if (!cmdOrCtrl) {
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
        .on('mouseup', function() {
            setTimeout(function() {
                updateCursorCoordinates();
            }, 0);
        })
        .on('paste', function () {
            undoManager.currentMode = 'paste';
            adjustCursorPosition();
        })
        .on('cut', function () {
            undoManager.currentMode = 'cut';
            adjustCursorPosition();
        });

        var action = function (action, options) {
            options = options || {};

            var text = inputElt.value,
                ss = options.start || selectionStart,
                se = options.end || selectionEnd,
                state = {
                    ss: ss,
                    se: se,
                    before: text.slice(0, ss),
                    after: text.slice(se),
                    selection: text.slice(ss, se)
                };

            actions[action](state, options);
            inputElt.value = state.before + state.selection + state.after;
            setSelectionStartEnd(state.ss, state.se);
            $inputElt.trigger('input');
        };

        var actions = {
            indent: function (state, options) {
                var lf = state.before.lastIndexOf('\n') + 1;

                if (options.inverse) {
                    if (/\s/.test(state.before.charAt(lf))) {
                        state.before = strSplice(state.before, lf, 1);

                        state.ss--;
                        state.se--;
                    }

                    state.selection = state.selection.replace(/^[ \t]/gm, '');
                } else if (state.selection) {
                    state.before = strSplice(state.before, lf, 0, '\t');
                    state.selection = state.selection.replace(/\r?\n(?=[\s\S])/g, '\n\t');

                    state.ss++;
                    state.se++;
                } else {
                    state.before += '\t';

                    state.ss++;
                    state.se++;

                    return;
                }

                state.se = state.ss + state.selection.length;
            },

            newline: function (state) {
                var lf = state.before.lastIndexOf('\n') + 1;
                if(clearNewline) {
                    state.before = state.before.substring(0, lf);
                    state.selection = '';
                    state.ss = lf;
                    state.se = lf;
                    clearNewline = false;
                    return;
                }
                clearNewline = false;
                var previousLine = state.before.slice(lf);
                var indentMatch = previousLine.match(/^ {0,3}>[ ]*|^[ \t]*(?:[*+\-]|(\d+)\.)[ \t]|^\s+/);
                var indent = (indentMatch || [''])[0];
                if(indentMatch && indentMatch[1]) {
                    var number = parseInt(indentMatch[1], 10);
                    indent = indent.replace(/\d+/, number + 1);
                }
                if(indent.length) {
                    clearNewline = true;
                }

                undoManager.currentMode = 'newlines';

                state.before += '\n' + indent;
                state.selection = '';
                state.ss += indent.length + 1;
                state.se = state.ss;
            },
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
                section.elt.parentNode !== editor.contentElt ||
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
                section.elt.parentNode !== editor.contentElt ||
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
                editor.contentElt.innerHTML = '';
                editor.contentElt.appendChild(newSectionEltList);
                setSelectionStartEnd(selectionStart, selectionEnd);
            }
            else {
                // Remove outdated sections
                sectionsToRemove.forEach(function(section) {
                    // section can be already removed
                    section.elt.parentNode === editor.contentElt && editor.contentElt.removeChild(section.elt);
                });

                if(insertBeforeSection !== undefined) {
                    editor.contentElt.insertBefore(newSectionEltList, insertBeforeSection.elt);
                }
                else {
                    editor.contentElt.appendChild(newSectionEltList);
                }

                // Remove unauthorized nodes (text nodes outside of sections or duplicated sections via copy/paste)
                var childNode = editor.contentElt.firstChild;
                while(childNode) {
                    var nextNode = childNode.nextSibling;
                    if(!childNode.generated) {
                        editor.contentElt.removeChild(childNode);
                    }
                    childNode = nextNode;
                }

                setSelectionStartEnd(selectionStart, selectionEnd);
            }
        });
    }

    function highlight(section) {
        var text = section.text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/\u00a0/g, ' ');
        text = Prism.highlight(text, Prism.languages.md);
        var frontMatter = section.textWithFrontMatter.substring(0, section.textWithFrontMatter.length - section.text.length);
        if(frontMatter.length) {
            // Front matter highlighting
            frontMatter = frontMatter.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/\u00a0/g, ' ');
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

    return editor;
});
