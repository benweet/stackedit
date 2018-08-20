import cledit from './cleditCore';

function SelectionMgr(editor) {
  const { debounce } = cledit.Utils;
  const contentElt = editor.$contentElt;
  const scrollElt = editor.$scrollElt;
  cledit.Utils.createEventHooks(this);

  let lastSelectionStart = 0;
  let lastSelectionEnd = 0;
  this.selectionStart = 0;
  this.selectionEnd = 0;
  this.cursorCoordinates = {};

  this.findContainer = (offset) => {
    const result = cledit.Utils.findContainer(contentElt, offset);
    if (result.container.nodeValue === '\n') {
      const hdLfElt = result.container.parentNode;
      if (hdLfElt.className === 'hd-lf' && hdLfElt.previousSibling && hdLfElt.previousSibling.tagName === 'BR') {
        result.container = hdLfElt.parentNode;
        result.offsetInContainer = Array.prototype.indexOf.call(
          result.container.childNodes,
          result.offsetInContainer === 0 ? hdLfElt.previousSibling : hdLfElt,
        );
      }
    }
    return result;
  };

  this.createRange = (start, end) => {
    const range = document.createRange();
    const startContainer = typeof start === 'number'
      ? this.findContainer(start < 0 ? 0 : start)
      : start;
    let endContainer = startContainer;
    if (start !== end) {
      endContainer = typeof end === 'number'
        ? this.findContainer(end < 0 ? 0 : end)
        : end;
    }
    range.setStart(startContainer.container, startContainer.offsetInContainer);
    range.setEnd(endContainer.container, endContainer.offsetInContainer);
    return range;
  };

  let adjustScroll;
  const debouncedUpdateCursorCoordinates = debounce(() => {
    const coordinates = this.getCoordinates(
      this.selectionEnd,
      this.selectionEndContainer,
      this.selectionEndOffset,
    );
    if (this.cursorCoordinates.top !== coordinates.top ||
      this.cursorCoordinates.height !== coordinates.height ||
      this.cursorCoordinates.left !== coordinates.left
    ) {
      this.cursorCoordinates = coordinates;
      this.$trigger('cursorCoordinatesChanged', coordinates);
    }
    if (adjustScroll) {
      let scrollEltHeight = scrollElt.clientHeight;
      if (typeof adjustScroll === 'number') {
        scrollEltHeight -= adjustScroll;
      }
      const adjustment = (scrollEltHeight / 2) * editor.options.getCursorFocusRatio();
      let cursorTop = this.cursorCoordinates.top + (this.cursorCoordinates.height / 2);
      // Adjust cursorTop with contentElt position relative to scrollElt
      cursorTop += (contentElt.getBoundingClientRect().top - scrollElt.getBoundingClientRect().top)
        + scrollElt.scrollTop;
      const minScrollTop = cursorTop - adjustment;
      const maxScrollTop = (cursorTop + adjustment) - scrollEltHeight;
      if (scrollElt.scrollTop > minScrollTop) {
        scrollElt.scrollTop = minScrollTop;
      } else if (scrollElt.scrollTop < maxScrollTop) {
        scrollElt.scrollTop = maxScrollTop;
      }
    }
    adjustScroll = false;
  });

  this.updateCursorCoordinates = (adjustScrollParam) => {
    adjustScroll = adjustScroll || adjustScrollParam;
    debouncedUpdateCursorCoordinates();
  };

  let oldSelectionRange;

  const checkSelection = (selectionRange) => {
    if (!oldSelectionRange ||
      oldSelectionRange.startContainer !== selectionRange.startContainer ||
      oldSelectionRange.startOffset !== selectionRange.startOffset ||
      oldSelectionRange.endContainer !== selectionRange.endContainer ||
      oldSelectionRange.endOffset !== selectionRange.endOffset
    ) {
      oldSelectionRange = selectionRange;
      this.$trigger('selectionChanged', this.selectionStart, this.selectionEnd, selectionRange);
      return true;
    }
    return false;
  };

  this.hasFocus = () => contentElt === document.activeElement;

  this.restoreSelection = () => {
    const min = Math.min(this.selectionStart, this.selectionEnd);
    const max = Math.max(this.selectionStart, this.selectionEnd);
    const selectionRange = this.createRange(min, max);
    if (!document.contains(selectionRange.commonAncestorContainer)) {
      return null;
    }
    const selection = window.getSelection();
    selection.removeAllRanges();
    const isBackward = this.selectionStart > this.selectionEnd;
    if (isBackward && selection.extend) {
      const beginRange = selectionRange.cloneRange();
      beginRange.collapse(false);
      selection.addRange(beginRange);
      selection.extend(selectionRange.startContainer, selectionRange.startOffset);
    } else {
      selection.addRange(selectionRange);
    }
    checkSelection(selectionRange);
    return selectionRange;
  };

  const saveLastSelection = debounce(() => {
    lastSelectionStart = this.selectionStart;
    lastSelectionEnd = this.selectionEnd;
  }, 50);

  const setSelection = (start = this.selectionStart, end = this.selectionEnd) => {
    this.selectionStart = start < 0 ? 0 : start;
    this.selectionEnd = end < 0 ? 0 : end;
    saveLastSelection();
  };

  this.setSelectionStartEnd = (start, end, restoreSelection = true) => {
    setSelection(start, end);
    if (restoreSelection && this.hasFocus()) {
      return this.restoreSelection();
    }
    return null;
  };

  this.saveSelectionState = (() => {
    // Credit: https://github.com/timdown/rangy
    function arrayContains(arr, val) {
      let i = arr.length;
      while (i) {
        i -= 1;
        if (arr[i] === val) {
          return true;
        }
      }
      return false;
    }

    function getClosestAncestorIn(node, ancestor, selfIsAncestor) {
      let p;
      let n = selfIsAncestor ? node : node.parentNode;
      while (n) {
        p = n.parentNode;
        if (p === ancestor) {
          return n;
        }
        n = p;
      }
      return null;
    }

    function getNodeIndex(node) {
      let i = 0;
      let { previousSibling } = node;
      while (previousSibling) {
        i += 1;
        ({ previousSibling } = previousSibling);
      }
      return i;
    }

    function getCommonAncestor(node1, node2) {
      const ancestors = [];
      let n;
      for (n = node1; n; n = n.parentNode) {
        ancestors.push(n);
      }

      for (n = node2; n; n = n.parentNode) {
        if (arrayContains(ancestors, n)) {
          return n;
        }
      }

      return null;
    }

    function comparePoints(nodeA, offsetA, nodeB, offsetB) {
      // See http://www.w3.org/TR/DOM-Level-2-Traversal-Range/ranges.html#Level-2-Range-Comparing
      let n;
      if (nodeA === nodeB) {
        // Case 1: nodes are the same
        if (offsetA === offsetB) {
          return 0;
        }
        return offsetA < offsetB ? -1 : 1;
      }
      let nodeC = getClosestAncestorIn(nodeB, nodeA, true);
      if (nodeC) {
        // Case 2: node C (container B or an ancestor) is a child node of A
        return offsetA <= getNodeIndex(nodeC) ? -1 : 1;
      }
      nodeC = getClosestAncestorIn(nodeA, nodeB, true);
      if (nodeC) {
        // Case 3: node C (container A or an ancestor) is a child node of B
        return getNodeIndex(nodeC) < offsetB ? -1 : 1;
      }
      const root = getCommonAncestor(nodeA, nodeB);
      if (!root) {
        throw new Error('comparePoints error: nodes have no common ancestor');
      }

      // Case 4: containers are siblings or descendants of siblings
      const childA = (nodeA === root) ? root : getClosestAncestorIn(nodeA, root, true);
      const childB = (nodeB === root) ? root : getClosestAncestorIn(nodeB, root, true);

      if (childA === childB) {
        // This shouldn't be possible
        throw module.createError('comparePoints got to case 4 and childA and childB are the same!');
      }
      n = root.firstChild;
      while (n) {
        if (n === childA) {
          return -1;
        } else if (n === childB) {
          return 1;
        }
        n = n.nextSibling;
      }
      return 0;
    }

    const save = () => {
      let result;
      if (this.hasFocus()) {
        let { selectionStart } = this;
        let { selectionEnd } = this;
        const selection = window.getSelection();
        if (selection.rangeCount > 0) {
          const selectionRange = selection.getRangeAt(0);
          let node = selectionRange.startContainer;
          // eslint-disable-next-line no-bitwise
          if ((contentElt.compareDocumentPosition(node)
            & window.Node.DOCUMENT_POSITION_CONTAINED_BY)
            || contentElt === node
          ) {
            let offset = selectionRange.startOffset;
            if (node.firstChild && offset > 0) {
              node = node.childNodes[offset - 1];
              offset = node.textContent.length;
            }
            let container = node;
            while (node !== contentElt) {
              node = node.previousSibling;
              while (node) {
                offset += (node.textContent || '').length;
                node = node.previousSibling;
              }
              node = container.parentNode;
              container = node;
            }
            let selectionText = `${selectionRange}`;
            // Fix end of line when only br is selected
            const brElt = selectionRange.endContainer.firstChild;
            if (brElt && brElt.tagName === 'BR' && selectionRange.endOffset === 1) {
              selectionText += '\n';
            }
            if (comparePoints(
              selection.anchorNode,
              selection.anchorOffset,
              selection.focusNode,
              selection.focusOffset,
            ) === 1) {
              selectionStart = offset + selectionText.length;
              selectionEnd = offset;
            } else {
              selectionStart = offset;
              selectionEnd = offset + selectionText.length;
            }

            if (selectionStart === selectionEnd && selectionStart === editor.getContent().length) {
              // If cursor is after the trailingNode
              selectionEnd -= 1;
              selectionStart = selectionEnd;
              result = this.setSelectionStartEnd(selectionStart, selectionEnd);
            } else {
              setSelection(selectionStart, selectionEnd);
              result = checkSelection(selectionRange);
              // selectionRange doesn't change when selection is at the start of a section
              result = result || lastSelectionStart !== this.selectionStart;
            }
          }
        }
      }
      return result;
    };

    const saveCheckChange = () => save() && (
      lastSelectionStart !== this.selectionStart || lastSelectionEnd !== this.selectionEnd);

    let nextTickAdjustScroll = false;
    const longerDebouncedSave = debounce(() => {
      this.updateCursorCoordinates(saveCheckChange() && nextTickAdjustScroll);
      nextTickAdjustScroll = false;
    }, 10);
    const debouncedSave = debounce(() => {
      this.updateCursorCoordinates(saveCheckChange() && nextTickAdjustScroll);
      // In some cases we have to wait a little longer to see the
      // selection change (Cmd+A on Chrome OSX)
      longerDebouncedSave();
    });

    return (debounced, adjustScrollParam, forceAdjustScroll) => {
      if (forceAdjustScroll) {
        lastSelectionStart = undefined;
        lastSelectionEnd = undefined;
      }
      if (debounced) {
        nextTickAdjustScroll = nextTickAdjustScroll || adjustScrollParam;
        debouncedSave();
      } else {
        save();
      }
    };
  })();

  this.getSelectedText = () => {
    const min = Math.min(this.selectionStart, this.selectionEnd);
    const max = Math.max(this.selectionStart, this.selectionEnd);
    return editor.getContent().substring(min, max);
  };

  this.getCoordinates = (inputOffset, containerParam, offsetInContainerParam) => {
    let container = containerParam;
    let offsetInContainer = offsetInContainerParam;
    if (!container) {
      const offset = this.findContainer(inputOffset);
      ({ container } = offset);
      ({ offsetInContainer } = offset);
    }
    let containerElt = container;
    if (!containerElt.hasChildNodes() && container.parentNode) {
      containerElt = container.parentNode;
    }
    let isInvisible = false;
    while (!containerElt.offsetHeight) {
      isInvisible = true;
      if (containerElt.previousSibling) {
        containerElt = containerElt.previousSibling;
      } else {
        containerElt = containerElt.parentNode;
        if (!containerElt) {
          return {
            top: 0,
            height: 0,
            left: 0,
          };
        }
      }
    }
    let rect;
    let left = 'left';
    if (isInvisible || container.textContent === '\n') {
      rect = containerElt.getBoundingClientRect();
    } else {
      const selectedChar = editor.getContent()[inputOffset];
      let startOffset = {
        container,
        offsetInContainer,
      };
      let endOffset = {
        container,
        offsetInContainer,
      };
      if (inputOffset > 0 && (selectedChar === undefined || selectedChar === '\n')) {
        left = 'right';
        if (startOffset.offsetInContainer === 0) {
          // Need to calculate offset-1
          startOffset = inputOffset - 1;
        } else {
          startOffset.offsetInContainer -= 1;
        }
      } else if (endOffset.offsetInContainer === container.textContent.length) {
        // Need to calculate offset+1
        endOffset = inputOffset + 1;
      } else {
        endOffset.offsetInContainer += 1;
      }
      const range = this.createRange(startOffset, endOffset);
      rect = range.getBoundingClientRect();
    }
    const contentRect = contentElt.getBoundingClientRect();
    return {
      top: Math.round((rect.top - contentRect.top) + contentElt.scrollTop),
      height: Math.round(rect.height),
      left: Math.round((rect[left] - contentRect.left) + contentElt.scrollLeft),
    };
  };

  this.getClosestWordOffset = (offset) => {
    let offsetStart = 0;
    let offsetEnd = 0;
    let nextOffset = 0;
    editor.getContent().split(/\s/).cl_some((word) => {
      if (word) {
        offsetStart = nextOffset;
        offsetEnd = nextOffset + word.length;
        if (offsetEnd > offset) {
          return true;
        }
      }
      nextOffset += word.length + 1;
      return false;
    });
    return {
      start: offsetStart,
      end: offsetEnd,
    };
  };
}

cledit.SelectionMgr = SelectionMgr;
