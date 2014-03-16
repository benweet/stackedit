/* jshint -W084, -W099 */
define([
    'jquery',
    'eventMgr',
    'prism-core',
    'libs/prism-markdown'
], function ($, eventMgr, Prism) {

    var undoManager;
    eventMgr.addListener('onPagedownConfigure', function (pagedownEditor) {
        // Undo manager does exist at the moment
        setTimeout(function () {
            undoManager = pagedownEditor.undoManager;
        }, 0);
    });

    String.prototype.splice = function (i, remove, add) {
        remove = +remove || 0;
        add = add || '';

        return this.slice(0, i) + add + this.slice(i + remove);
    };

    function PreEditor(preElt) {
        var preEditor = this;
        preEditor.selectionStart = 0;
        preEditor.selectionEnd = 0;
        preEditor.scrollTop = 0;
        preEditor.$preContentElt = $('<div contenteditable class="pre-content language-md">');

        preElt.appendChild(preEditor.$preContentElt[0]);
        preEditor.highlight = function () {
            setTimeout(function () {
                preEditor.selectionStart = preElt.selectionStart;
                preEditor.selectionEnd = preElt.selectionEnd;
                var startDate = Date.now();
                Prism.highlightElement(preEditor.$preContentElt[0], false, function () {
                    console.log(Date.now() - startDate);
                    preElt.setSelectionRange(preEditor.selectionStart, preEditor.selectionEnd);
                });
            }, 0);
        };

        preElt.focus = function () {
            preEditor.$preContentElt.focus();
            this.setSelectionRange(preEditor.selectionStart, preEditor.selectionEnd);
            preElt.scrollTop = preEditor.scrollTop;
        };
        preEditor.$preContentElt.focus(function () {
            preElt.focused = true;
        });
        preEditor.$preContentElt.blur(function () {
            preElt.focused = false;
        });
        Object.defineProperty(preElt, 'value', {
            get: function () {
                return this.textContent;
            },
            set: function (value) {
                //return preEditor.$preContentElt.text(value);
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
                if (startIndex === startIndexMax) {
                    return preEditor.$preContentElt.text(value);
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

                var range = createRange(preElt, startIndex, endIndex);
                range.deleteContents();
                range.insertNode(document.createTextNode(replacementText));
            }
        });
        Object.defineProperty(preElt, 'selectionStart', {
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
                preElt.setSelectionRange(value, preEditor.selectionEnd);
            },

            enumerable: true,
            configurable: true
        });

        Object.defineProperty(preElt, 'selectionEnd', {
            get: function () {
                var selection = window.getSelection();

                if (selection.rangeCount) {
                    return this.selectionStart + (selection.getRangeAt(0) + '').length;
                } else {
                    return 0;
                }
            },
            set: function (value) {
                preElt.setSelectionRange(preEditor.selectionStart, value);
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

        preElt.setSelectionRange = function (ss, se) {
            preEditor.selectionStart = ss;
            preEditor.selectionEnd = se;
            var range = createRange(this, ss, se);

            var selection = window.getSelection();
            selection.removeAllRanges();
            selection.addRange(range);
        };

        var action = function (action, options) {
            options = options || {};

            var text = preElt.value,
                ss = options.start || preEditor.selectionStart,
                se = options.end || preEditor.selectionEnd,
                state = {
                    ss: ss,
                    se: se,
                    before: text.slice(0, ss),
                    after: text.slice(se),
                    selection: text.slice(ss, se)
                };

            actions[action](state, options);

            preElt.value = state.before + state.selection + state.after;

            preElt.setSelectionRange(state.ss, state.se);

            preElt.dispatchEvent(new window.Event('input'));
        };

        var actions = {
            indent: function (state, options) {
                var lf = state.before.lastIndexOf('\n') + 1;

                undoManager && undoManager.setMode("typing");

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

                undoManager && undoManager.setMode("newlines");

                state.before += '\n' + indent;

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

                undoManager && undoManager.setMode("typing");

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

        preEditor.$preContentElt.on('keydown', function (evt) {
            var cmdOrCtrl = evt.metaKey || evt.ctrlKey;

            switch (evt.keyCode) {
            case 9: // Tab
                if (!cmdOrCtrl) {
                    action('indent', {
                        inverse: evt.shiftKey
                    });
                    return false;
                }
                break;
            case 13:
                action('newline');
                return false;
            case 191:
                if (cmdOrCtrl && !evt.altKey) {
                    action('comment', {
                        lang: this.id
                    });
                    return false;
                }

                break;
            }
        });

    }

    return PreEditor;
});