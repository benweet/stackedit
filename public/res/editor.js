/* jshint -W084, -W099 */
define([
    'jquery',
    'underscore',
    'settings',
    'eventMgr',
    'prism-core',
    'crel',
    'MutationObservers',
    'libs/prism-markdown'
], function ($, _, settings, eventMgr, Prism, crel) {

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

    function saveEditorState() {
        if(!inputElt.focused) {
            return;
        }
        selectionStart = inputElt.selectionStart;
        selectionEnd = inputElt.selectionEnd;
        scrollTop = inputElt.scrollTop;
        if(fileChanged === false) {
            fileDesc.editorStart = selectionStart;
            fileDesc.editorEnd = selectionEnd;
            fileDesc.editorScrollTop = scrollTop;
        }
    }

    var previousTextContent;
    function checkContentChange() {
        saveEditorState();
        var currentTextContent = inputElt.textContent;
        if(fileChanged === false) {
            if(currentTextContent == previousTextContent) {
                return;
            }
            if(!/\n$/.test(currentTextContent)) {
                currentTextContent += '\n';
            }
            fileDesc.content = currentTextContent;
            eventMgr.onContentChanged(fileDesc, currentTextContent);
        }
        else {
            if(!/\n$/.test(currentTextContent)) {
                currentTextContent += '\n';
                fileDesc.content = currentTextContent;
            }
            eventMgr.onFileOpen(fileDesc, currentTextContent);
            previewElt.scrollTop = fileDesc.previewScrollTop;
            selectionStart = fileDesc.editorStart;
            selectionEnd = fileDesc.editorEnd;
            scrollTop = fileDesc.editorScrollTop;
            inputElt.scrollTop = scrollTop;
            fileChanged = false;
        }
        previousTextContent = currentTextContent;
    }

    function findOffset(ss) {
        var offset = 0,
            element = editor.contentElt,
            container;

        do {
            container = element;
            element = element.firstChild;

            if (element) {
                do {
                    var len = element.textContent.length;

                    if (offset <= ss && offset + len > ss) {
                        break;
                    }

                    offset += len;
                } while (element = element.nextSibling);
            }

            if (!element) {
                // It's the container's lastChild
                break;
            }
        } while (element && element.hasChildNodes() && element.nodeType != 3);

        if (element) {
            return {
                element: element,
                offset: ss - offset
            };
        } else if (container) {
            element = container;

            while (element && element.lastChild) {
                element = element.lastChild;
            }

            if (element.nodeType === 3) {
                return {
                    element: element,
                    offset: element.textContent.length
                };
            } else {
                return {
                    element: element,
                    offset: 0
                };
            }
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
                selectionRange = inputElt.createRange(inputOffset - 1, {
                    element: element,
                    offset: offset
                });
            }
            else {
                selectionRange = inputElt.createRange({
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
        saveEditorState();
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

    function adjustCursorPosition() {
        inputElt && setTimeout(function() {
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
    }
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

        var observer = new MutationObserver(checkContentChange);
        observer.observe(editor.contentElt, {
            childList: true,
            subtree: true,
            characterData: true
        });

        $(inputElt).scroll(saveEditorState);
        $(previewElt).scroll(function() {
            if(fileChanged === false) {
                fileDesc.previewScrollTop = previewElt.scrollTop;
            }
        });

        inputElt.focus = function() {
            editor.$contentElt.focus();
            this.setSelectionStartEnd(selectionStart, selectionEnd);
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
            set: function (value) {
                var currentValue = this.textContent;

                // Find the first modified char
                var startIndex = 0;
                var startIndexMax = Math.min(currentValue.length, value.length);
                while (startIndex < startIndexMax) {
                    if (currentValue.charCodeAt(startIndex) !== value.charCodeAt(startIndex)) {
                        break;
                    }
                    startIndex++;
                }
                // Find the last modified char
                var endIndex = 1;
                var endIndexMax = Math.min(currentValue.length - startIndex, value.length - startIndex);
                while (endIndex <= endIndexMax) {
                    if (currentValue.charCodeAt(currentValue.length - endIndex) !== value.charCodeAt(value.length - endIndex)) {
                        break;
                    }
                    endIndex++;
                }

                var replacementText = value.substring(startIndex, value.length - endIndex + 1);
                endIndex = currentValue.length - endIndex + 1;

                var range = inputElt.createRange(startIndex, endIndex);
                range.deleteContents();
                range.insertNode(document.createTextNode(replacementText));
            }
        });

        Object.defineProperty(inputElt, 'selectionStart', {
            get: function () {
                var selection = window.getSelection();

                if (selection.rangeCount) {
                    var range = selection.getRangeAt(0),
                        element = range.startContainer,
                        container = element,
                        offset = range.startOffset;

                    if (!(this.compareDocumentPosition(element) & 0x10)) {
                        return selectionStart;
                    }

                    do {
                        while (element = element.previousSibling) {
                            if (element.textContent) {
                                offset += element.textContent.length;
                            }
                        }

                        element = container = container.parentNode;
                    } while (element && element != this);

                    return offset;
                } else {
                    return selectionStart;
                }
            },
            set: function (value) {
                inputElt.setSelectionStartEnd(value, selectionEnd);
            },

            enumerable: true,
            configurable: true
        });

        Object.defineProperty(inputElt, 'selectionEnd', {
            get: function () {
                var selection = window.getSelection();

                if (selection.rangeCount) {
                    return this.selectionStart + (selection.getRangeAt(0) + '').length;
                } else {
                    return selectionEnd;
                }
            },
            set: function (value) {
                inputElt.setSelectionStartEnd(selectionStart, value);
            },

            enumerable: true,
            configurable: true
        });

        inputElt.setSelectionStartEnd = function (ss, se) {
            selectionStart = ss;
            selectionEnd = se;
            var range = inputElt.createRange(ss, se);

            var selection = window.getSelection();
            selection.removeAllRanges();
            selection.addRange(range);
        };

        inputElt.getSelectionStartEnd = function () {
            return {
                selectionStart: selectionStart,
                selectionEnd: selectionEnd
            };
        };

        inputElt.createRange = function(ss, se) {

            var range = document.createRange(),
                offset = _.isObject(ss) ? ss : findOffset(ss);

            range.setStart(offset.element, offset.offset);

            if (se && se != ss) {
                offset = _.isObject(se) ? se : findOffset(se);
            }

            range.setEnd(offset.element, offset.offset);
            return range;
        };

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
            saveEditorState();
            adjustCursorPosition();

            var cmdOrCtrl = evt.metaKey || evt.ctrlKey;

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
            pagedownEditor.undoManager.setMode("paste");
            adjustCursorPosition();
        })
        .on('cut', function () {
            pagedownEditor.undoManager.setMode("cut");
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
            inputElt.setSelectionStartEnd(state.ss, state.se);
            $inputElt.trigger('input');
        };

        var actions = {
            indent: function (state, options) {
                var lf = state.before.lastIndexOf('\n') + 1;

                pagedownEditor.undoManager.setMode("typing");

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

                pagedownEditor.undoManager.setMode("newlines");

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
                // Check that section has not been detached from the DOM with backspace
                !section.highlightedContent.parentNode ||
                // Check also the content since nodes can be injected in sections via copy/paste
                section.highlightedContent.textContent != newSection.textWithFrontMatter) {
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
                // Check that section has not been detached from the DOM with backspace
                !section.highlightedContent.parentNode ||
                // Check also the content since nodes can be injected in sections via copy/paste
                section.highlightedContent.textContent != newSection.textWithFrontMatter) {
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
            newSectionEltList.appendChild(section.highlightedContent);
        });
        if(fileChanged === true) {
            editor.contentElt.innerHTML = '';
            editor.contentElt.appendChild(newSectionEltList);
            inputElt.setSelectionStartEnd(selectionStart, selectionEnd);
        }
        else {
            // Remove outdated sections
            sectionsToRemove.forEach(function(section) {
                var sectionElt = document.getElementById("wmd-input-section-" + section.id);
                // section can be already removed
                sectionElt && editor.contentElt.removeChild(sectionElt);
            });

            if(insertBeforeSection !== undefined) {
                var insertBeforeElt = document.getElementById("wmd-input-section-" + insertBeforeSection.id);
                editor.contentElt.insertBefore(newSectionEltList, insertBeforeElt);
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

            inputElt.setSelectionStartEnd(selectionStart, selectionEnd);
        }
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
        section.highlightedContent = sectionElt;
    }

    return editor;
});
