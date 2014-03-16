define(['jquery'], function($) {
    function PreEditor(preElt) {
        this.selectionStart = 0;
        this.selectionEnd = 0;
        this.scrollTop = 0;
        this.$preContentElt = $('<div contenteditable class="pre-content">');
        
        preElt.appendChild(this.$preContentElt[0]);
        
        preElt.focus = function() {
            this.$preContentElt.focus();
            this.setSelectionRange(this.selectionStart, this.selectionEnd);
            preElt.scrollTop = this.scrollTop;
        };
        this.$preContentElt.focus(function() {
            preElt.focused = true;
        });
        this.$preContentElt.blur(function() {
            preElt.focused = false;
        });
        Object.defineProperty(preElt, 'value', {
            get: function() {
                return this.$preContentElt.text();
            },
            set: function(value) {
                this.$preContentElt.text(value);
            }
        });

        Object.defineProperty(preElt, 'value', {
            get: function() {
                return this.$preContentElt.text();
            },
            set: function(value) {
                this.$preContentElt.text(value);
            }
        });
        Object.defineProperty(preElt, 'selectionStart', {
            get: function() {
                var selection = window.getSelection();

                if(selection.rangeCount) {
                    var range = selection.getRangeAt(0),
                        element = range.startContainer,
                        container = element,
                        offset = range.startOffset;

                    if(!(this.compareDocumentPosition(element) & 0x10)) {
                        return 0;
                    }

                    do {
                        while(element = element.previousSibling) {
                            if(element.textContent) {
                                offset += element.textContent.length;
                            }
                        }

                        element = container = container.parentNode;
                    } while(element && element != this);

                    return offset;
                }
                else {
                    return 0;
                }
            },
            set: function(value) {
                preElt.setSelectionRange(value, this.selectionEnd);
            },

            enumerable: true,
            configurable: true
        });

        Object.defineProperty(preElt, 'selectionEnd', {
            get: function() {
                var selection = window.getSelection();

                if(selection.rangeCount) {
                    return this.selectionStart + (selection.getRangeAt(0) + '').length;
                }
                else {
                    return 0;
                }
            },
            set: function(value) {
                preElt.setSelectionRange(this.selectionStart, value);
            },

            enumerable: true,
            configurable: true
        });

        preElt.setSelectionRange = function(ss, se) {
            this.selectionStart = ss;
            this.selectionEnd = se;
            function findOffset(root, ss) {
                if(!root) {
                    return null;
                }

                var offset = 0,
                    element = root,
                    container;

                do {
                    container = element;
                    element = element.firstChild;

                    if(element) {
                        do {
                            var len = element.textContent.length;

                            if(offset <= ss && offset + len > ss) {
                                break;
                            }

                            offset += len;
                        } while(element = element.nextSibling);
                    }

                    if(!element) {
                        // It's the container's lastChild
                        break;
                    }
                } while(element && element.hasChildNodes() && element.nodeType != 3);

                if(element) {
                    return {
                        element: element,
                        offset: ss - offset
                    };
                }
                else if(container) {
                    element = container;

                    while(element && element.lastChild) {
                        element = element.lastChild;
                    }

                    if(element.nodeType === 3) {
                        return {
                            element: element,
                            offset: element.textContent.length
                        };
                    }
                    else {
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

            var range = document.createRange(),
                offset = findOffset(this, ss);

            range.setStart(offset.element, offset.offset);

            if(se && se != ss) {
                offset = findOffset(this, se);	
            }

            range.setEnd(offset.element, offset.offset);

            var selection = window.getSelection();
            selection.removeAllRanges();
            selection.addRange(range);
        };
        
    }
    
            
    return PreEditor;
});