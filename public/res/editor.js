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
    function onInputChange() {
        selectionStart = inputElt.selectionStart;
        selectionEnd = inputElt.selectionEnd;
        var currentTextContent = inputElt.textContent;
        if(!/\n$/.test(currentTextContent)) {
            currentTextContent += '\n';
        }
        if(fileChanged === false) {
            fileDesc.editorStart = selectionStart;
            fileDesc.editorEnd = selectionEnd;
            if(currentTextContent == previousTextContent) {
                return;
            }
            fileDesc.content = currentTextContent;
            eventMgr.onContentChanged(fileDesc);
        }
        else {
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
    
    editor.init = function(elt1, elt2) {
        inputElt = elt1;
        previewElt = elt2;
        editor.contentElt = crel('div', {
            class: 'pre-content',
            contenteditable: true
        });
        editor.$contentElt = $(editor.contentElt);
        inputElt.appendChild(editor.contentElt);
        
        $(inputElt).scroll(function() {
            scrollTop = this.scrollTop;
            if(fileChanged === false) {
                fileDesc.editorScrollTop = scrollTop;
            }
        }).bind("keyup mouseup", onInputChange);
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

                var range = createRange(inputElt, startIndex, endIndex);
                range.deleteContents();
                range.insertNode(document.createTextNode(replacementText));
                onInputChange();
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

        function findOffset(root, ss) {
            if (!root) {
                return null;
            }

            var offset = 0,
                element = root,
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
                element: root,
                offset: 0,
                error: true
            };
        }

        function createRange(root, ss, se) {
            var range = document.createRange(),
                offset = findOffset(root, ss);

            range.setStart(offset.element, offset.offset);

            if (se && se != ss) {
                offset = findOffset(root, se);
            }

            range.setEnd(offset.element, offset.offset);
            return range;
        }

        inputElt.setSelectionRange = function (ss, se) {
            selectionStart = ss;
            selectionEnd = se;
            var range = createRange(editor.contentElt, ss, se);

            var selection = window.getSelection();
            selection.removeAllRanges();
            selection.addRange(range);
        };

        editor.$contentElt.on('keydown', function (evt) {
            var cmdOrCtrl = evt.metaKey || evt.ctrlKey;

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
        });

        editor.$contentElt.on('paste', function () {
            pagedownEditor.undoManager.setMode("paste");
            setTimeout(function() {
                onInputChange();
            }, 0);
        });
        
        editor.$contentElt.on('cut', function () {
            pagedownEditor.undoManager.setMode("cut");
            setTimeout(function() {
                onInputChange();
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

            inputElt.dispatchEvent(new window.Event('input'));
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
                var indent = (state.before.slice(lf).match(/^\s+/) || [''])[0];

                pagedownEditor.undoManager.setMode("newlines");

                state.before += '\n'// + indent;

                state.selection = '';

                state.ss += indent.length + 1;
                state.se = state.ss;
            },

            comment: function (state) {
                var textAction;
                var open = '<!--',
                    close = '-->';

                var start = state.before.lastIndexOf(open),
                    end = state.after.indexOf(close),
                    closeBefore = state.before.lastIndexOf(close),
                    openAfter = state.after.indexOf(start);

                pagedownEditor.undoManager.setMode("typing");

                if (start > -1 && end > -1 && (start > closeBefore || closeBefore === -1) && (end < openAfter || openAfter === -1)) {
                    // Uncomment
                    state.before = state.before.splice(start, open.length);
                    state.after = state.after.splice(end, close.length);

                    textAction = [{
                        add: '',
                        del: open,
                        start: start
                    }, {
                        add: '',
                        del: close,
                        start: state.before.length + state.selection.length + end
                    }];

                    state.ss -= open.length;
                    state.se -= open.length;

                    return textAction;
                } else {
                    // Comment
                    if (state.selection) {
                        // Comment selection
                        state.selection = open + state.selection + close;

                        textAction = [{
                            add: open,
                            del: '',
                            start: state.ss
                        }, {
                            add: close,
                            del: '',
                            start: open.length + state.se
                        }];
                    } else {
                        // Comment whole line
                        start = state.before.lastIndexOf('\n') + 1;
                        end = state.after.indexOf('\n');

                        if (end === -1) {
                            end = state.after.length;
                        }

                        while (/\s/.test(state.before.charAt(start))) {
                            start++;
                        }

                        state.before = state.before.splice(start, 0, open);

                        state.after = state.after.splice(end, 0, close);

                        textAction = [{
                            add: open,
                            del: '',
                            start: start
                        }, {
                            add: close,
                            del: '',
                            start: state.before.length + end
                        }];
                    }

                    state.ss += open.length;
                    state.se += open.length;

                    return textAction;
                }
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
            if(index >= newSectionList.length || section.text != newSectionList[index].text) {
                leftIndex = index;
                return true;
            }
        });
        
        // Find modified section starting from bottom
        var rightIndex = -sectionList.length;
        _.some(sectionList.slice().reverse(), function(section, index) {
            var newSectionText = newSectionList[newSectionList.length - index - 1].text;
            // Check also the content of the node since new lines can be added just at the beggining
            if(index >= newSectionList.length || section.text != newSectionText || section.highlightedContent.textContent != newSectionText) {
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
            
            //var dummyTextNode = document.createTextNode('\n');
            //editor.contentElt.appendChild(dummyTextNode);
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
/*
    function asyncHighlightSections() {
        var startTime = Date.now();
        var deferredList = [];
        modifiedSections.forEach(function(section) {
            var deferred = $.Deferred();
            setTimeout(function() {
                highlight(section);
                deferred.resolve();
            }, 0);
            deferredList.push(deferred);
        });
        $.when.apply($, deferredList).then(function() {
            var text = _.reduce(sectionList, function(text, section) {
                return text + section.text;
            }, '');
            
            // Check that the editor has the actual value
            if(inputElt.textContent == text) {
                selectionStart = inputElt.selectionStart;
                selectionEnd = inputElt.selectionEnd;
                
                var newSectionEltList = document.createDocumentFragment();
                modifiedSections.forEach(function(section) {
                    newSectionEltList.appendChild(section.highlightedContent);
                });
                
                if(insertBeforeSection !== undefined) {
                    var insertBeforeElt = document.getElementById("wmd-input-section-" + insertBeforeSection.id);
                    editor.$contentElt[0].insertBefore(newSectionEltList, insertBeforeElt);
                }
                else {
                    editor.$contentElt[0].appendChild(newSectionEltList);
                }
                
                inputElt.setSelectionRange(selectionStart, selectionEnd);
                elapsedTime = Date.now() - startTime;
            }
        });
    }
*/
    function highlight(section) {
        var text = section.text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/\u00a0/g, ' ');
        var sectionElt = crel('span', {
            id: 'wmd-input-section-' + section.id,
            class: 'wmd-input-section'
        });
        sectionElt.innerHTML = Prism.highlight(text, Prism.languages.md);
        section.highlightedContent = sectionElt;
    }

    return editor;
});