/* jshint -W084, -W099 */
define([
    'jquery',
    'underscore',
    'settings',
    'eventMgr',
    'prism-core',
    'crel',
    'libs/prism-markdown'
], function ($, _, settings, eventMgr, Prism, crel) {

    String.prototype.splice = function (i, remove, add) {
        remove = +remove || 0;
        add = add || '';
        return this.slice(0, i) + add + this.slice(i + remove);
    };

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

    var previousTextContent;
    function onInputContentChange() {
        selectionStart = inputElt.selectionStart;
        selectionEnd = inputElt.selectionEnd;
        var currentTextContent = inputElt.textContent;
        if(fileChanged === false) {
            fileDesc.editorStart = selectionStart;
            fileDesc.editorEnd = selectionEnd;
            if(currentTextContent == previousTextContent) {
                return;
            }
            if(!/\n$/.test(currentTextContent)) {
                currentTextContent += '\n';
            }
            fileDesc.content = currentTextContent;
            eventMgr.onContentChanged(fileDesc);
        }
        else {
            if(!/\n$/.test(currentTextContent)) {
                currentTextContent += '\n';
                fileDesc.content = currentTextContent;
            }
            eventMgr.onFileOpen(fileDesc);
            previewElt.scrollTop = fileDesc.previewScrollTop;
            selectionStart = fileDesc.editorStart;
            selectionEnd = fileDesc.editorEnd;
            scrollTop = fileDesc.editorScrollTop;
            inputElt.scrollTop = scrollTop;
            fileChanged = false;
        }
        previousTextContent = currentTextContent;
    }

    function adjustCursorPosition() {
        inputElt && setTimeout(function() {
            selectionStart = inputElt.selectionStart;
            selectionEnd = inputElt.selectionEnd;

            var backwards = false;
            var selection = window.getSelection();
            if (!selection.isCollapsed) {
                var range = document.createRange();
                range.setStart(selection.anchorNode, selection.anchorOffset);
                range.setEnd(selection.focusNode, selection.focusOffset);
                backwards = range.collapsed;
                range.detach();
            }

            var selectionRange = selection.getRangeAt(0);
            var container = backwards ? selectionRange.startContainer : selectionRange.endContainer;
            var cursorY;
            if(container.textContent == '\n') {
                cursorY = container.parentNode.offsetTop + container.parentNode.offsetHeight / 2 - inputElt.scrollTop;
            }
            else {
                var cursorOffset = backwards ? selectionStart : selectionEnd;
                var selectedChar = inputElt.textContent[cursorOffset];
                if(selectedChar === undefined || selectedChar == '\n') {
                    selectionRange = createRange(cursorOffset - 1, cursorOffset);
                }
                else {
                    selectionRange = createRange(cursorOffset, cursorOffset + 1);
                }
                var selectionRect = selectionRange.getBoundingClientRect();
                cursorY = selectionRect.top + selectionRect.height / 2 - inputElt.offsetTop;
                selectionRange.detach();
            }

            var adjust = inputElt.offsetHeight / 2;
            if(adjust > 130) {
                adjust = 130;
            }
            var cursorMinY = adjust;
            var cursorMaxY = inputElt.offsetHeight - adjust;
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
        editor.$contentElt = $(editor.contentElt);
        inputElt.appendChild(editor.contentElt);

        $(inputElt).scroll(function() {
            scrollTop = this.scrollTop;
            if(fileChanged === false) {
                fileDesc.editorScrollTop = scrollTop;
            }
        }).bind("keyup mouseup", onInputContentChange);
        $(previewElt).scroll(function() {
            if(fileChanged === false) {
                fileDesc.previewScrollTop = previewElt.scrollTop;
            }
        });

        inputElt.focus = function() {
            editor.$contentElt.focus();
            this.setSelectionRange(selectionStart, selectionEnd);
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

                var range = createRange(startIndex, endIndex);
                range.deleteContents();
                range.insertNode(document.createTextNode(replacementText));
                onInputContentChange();
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
                        return 0;
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
                    return 0;
                }
            },
            set: function (value) {
                inputElt.setSelectionRange(value, selectionEnd);
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
                    return 0;
                }
            },
            set: function (value) {
                inputElt.setSelectionRange(selectionStart, value);
            },

            enumerable: true,
            configurable: true
        });

        inputElt.setSelectionRange = function (ss, se) {
            selectionStart = ss;
            selectionEnd = se;
            var range = createRange(ss, se);

            var selection = window.getSelection();
            selection.removeAllRanges();
            selection.addRange(range);
        };

        var clearNewline = false;
        editor.$contentElt.on('keydown', function (evt) {
            var cmdOrCtrl = evt.metaKey || evt.ctrlKey;

            if(!cmdOrCtrl && !event.altKey && !(event.shiftKey && evt.keyCode === 16)) {
                adjustCursorPosition();
            }

            switch (evt.keyCode) {
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
            case 191:
                if (cmdOrCtrl && !evt.altKey) {
                    action('comment', {
                        lang: this.id
                    });
                    evt.preventDefault();
                }
                break;
            }
            if(evt.keyCode !== 13) {
                clearNewline = false;
            }
        });

        editor.$contentElt.on('paste', function () {
            pagedownEditor.undoManager.setMode("paste");
            setTimeout(function() {
                onInputContentChange();
            }, 0);
        });

        editor.$contentElt.on('cut', function () {
            pagedownEditor.undoManager.setMode("cut");
            setTimeout(function() {
                onInputContentChange();
            }, 0);
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
            inputElt.setSelectionRange(state.ss, state.se);
            $inputElt.trigger('input');
        };

        var actions = {
            indent: function (state, options) {
                var lf = state.before.lastIndexOf('\n') + 1;

                pagedownEditor.undoManager.setMode("typing");

                if (options.inverse) {
                    if (/\s/.test(state.before.charAt(lf))) {
                        state.before = state.before.splice(lf, 1);

                        state.ss--;
                        state.se--;
                    }

                    state.selection = state.selection.replace(/^[ \t]/gm, '');
                } else if (state.selection) {
                    state.before = state.before.splice(lf, 0, '\t');
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
                !section.highlightedContent.parentNode) {
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
                // Check also the content of the node since new lines can be added just at the beggining
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
        selectionStart = inputElt.selectionStart;
        selectionEnd = inputElt.selectionEnd;
        var newSectionEltList = document.createDocumentFragment();
        modifiedSections.forEach(function(section) {
            highlight(section);
            newSectionEltList.appendChild(section.highlightedContent);
        });
        if(fileChanged === true) {
            editor.contentElt.innerHTML = '';
            editor.contentElt.appendChild(newSectionEltList);
            inputElt.setSelectionRange(selectionStart, selectionEnd);
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

            inputElt.setSelectionRange(selectionStart, selectionEnd);

            // Remove textNodes created outside sections
            var childNode = editor.contentElt.firstChild;
            while(childNode) {
                var nextNode = childNode.nextSibling;
                if(childNode.nodeType == 3) {
                    editor.contentElt.removeChild(childNode);
                }
                childNode = nextNode;
            }
        }
    }

    function highlight(section) {
        var text = section.text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/\u00a0/g, ' ');
        text = Prism.highlight(text, Prism.languages.md);
        var frontMatter = section.textWithFrontMatter.substring(0, section.textWithFrontMatter.length-section.text.length);
        if(frontMatter.length) {
            // Custom front matter highlighting
            frontMatter = frontMatter.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/\u00a0/g, ' ');
            frontMatter = frontMatter.replace(/\n/g, '<span class="token lf">\n</span>');
            text = '<span class="token md">' + frontMatter + '</span>' + text;
        }
        var sectionElt = crel('span', {
            id: 'wmd-input-section-' + section.id,
            class: 'wmd-input-section'
        });
        sectionElt.innerHTML = text;
        section.highlightedContent = sectionElt;
    }


    function createRange(ss, se) {
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

        var range = document.createRange(),
            offset = findOffset(ss);

        range.setStart(offset.element, offset.offset);

        if (se && se != ss) {
            offset = findOffset(se);
        }

        range.setEnd(offset.element, offset.offset);
        return range;
    }

    return editor;
});
