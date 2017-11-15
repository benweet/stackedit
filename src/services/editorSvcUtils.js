import DiffMatchPatch from 'diff-match-patch';
import cledit from '../libs/cledit';
import animationSvc from './animationSvc';
import store from '../store';

const diffMatchPatch = new DiffMatchPatch();

export default {
  /**
   * Get element and dimension that handles scrolling.
   */
  getObjectToScroll() {
    let elt = this.editorElt.parentNode;
    let dimensionKey = 'editorDimension';
    if (!store.getters['layout/styles'].showEditor) {
      elt = this.previewElt.parentNode;
      dimensionKey = 'previewDimension';
    }
    return {
      elt,
      dimensionKey,
    };
  },

  /**
   * Get an object describing the position of the scroll bar in the file.
   */
  getScrollPosition() {
    const objToScroll = this.getObjectToScroll();
    const scrollTop = objToScroll.elt.scrollTop;
    let result;
    if (this.sectionDescMeasuredList) {
      this.sectionDescMeasuredList.some((sectionDesc, sectionIdx) => {
        if (scrollTop >= sectionDesc[objToScroll.dimensionKey].endOffset) {
          return false;
        }
        const posInSection = (scrollTop - sectionDesc[objToScroll.dimensionKey].startOffset) /
          (sectionDesc[objToScroll.dimensionKey].height || 1);
        result = {
          sectionIdx,
          posInSection,
        };
        return true;
      });
    }
    return result;
  },

  /**
   * Restore the scroll position from the current file content state.
   */
  restoreScrollPosition() {
    const scrollPosition = store.getters['contentState/current'].scrollPosition;
    if (scrollPosition && this.sectionDescMeasuredList) {
      const objectToScroll = this.getObjectToScroll();
      const sectionDesc = this.sectionDescMeasuredList[scrollPosition.sectionIdx];
      if (sectionDesc) {
        const scrollTop = sectionDesc[objectToScroll.dimensionKey].startOffset +
          (sectionDesc[objectToScroll.dimensionKey].height * scrollPosition.posInSection);
        objectToScroll.elt.scrollTop = Math.floor(scrollTop);
      }
    }
  },

  /**
   * Get the offset in the preview corresponding to the offset of the markdown in the editor
   */
  getPreviewOffset(editorOffset) {
    if (!this.sectionDescWithDiffsList) {
      return null;
    }
    let offset = editorOffset;
    let previewOffset = 0;
    this.sectionDescWithDiffsList.some((sectionDesc) => {
      if (sectionDesc.section.text.length >= offset) {
        previewOffset += diffMatchPatch.diff_xIndex(sectionDesc.textToPreviewDiffs, offset);
        return true;
      }
      offset -= sectionDesc.section.text.length;
      previewOffset += sectionDesc.previewText.length;
      return false;
    });
    return previewOffset;
  },

  /**
   * Get the offset of the markdown in the editor corresponding to the offset in the preview
   */
  getEditorOffset(previewOffset) {
    if (!this.sectionDescWithDiffsList) {
      return null;
    }
    let offset = previewOffset;
    let editorOffset = 0;
    this.sectionDescWithDiffsList.some((sectionDesc) => {
      if (sectionDesc.previewText.length >= offset) {
        const previewToTextDiffs = sectionDesc.textToPreviewDiffs
          .map(diff => [-diff[0], diff[1]]);
        editorOffset += diffMatchPatch.diff_xIndex(previewToTextDiffs, offset);
        return true;
      }
      offset -= sectionDesc.previewText.length;
      editorOffset += sectionDesc.section.text.length;
      return false;
    });
    return editorOffset;
  },

  /**
   * Get the coordinates of an offset in the preview
   */
  getPreviewOffsetCoordinates(offset) {
    const start = cledit.Utils.findContainer(this.previewElt, offset && offset - 1);
    const end = cledit.Utils.findContainer(this.previewElt, offset || offset + 1);
    const range = document.createRange();
    range.setStart(start.container, start.offsetInContainer);
    range.setEnd(end.container, end.offsetInContainer);
    const rect = range.getBoundingClientRect();
    const contentRect = this.previewElt.getBoundingClientRect();
    return {
      top: Math.round((rect.top - contentRect.top) + this.previewElt.scrollTop),
      height: Math.round(rect.height),
      left: Math.round((rect.right - contentRect.left) + this.previewElt.scrollLeft),
    };
  },

  /**
   * Scroll the preview (or the editor if preview is hidden) to the specified anchor
   */
  scrollToAnchor(anchor) {
    let scrollTop = 0;
    const scrollerElt = this.previewElt.parentNode;
    const elt = document.getElementById(anchor);
    if (elt) {
      scrollTop = elt.offsetTop;
    }
    const maxScrollTop = scrollerElt.scrollHeight - scrollerElt.offsetHeight;
    if (scrollTop < 0) {
      scrollTop = 0;
    } else if (scrollTop > maxScrollTop) {
      scrollTop = maxScrollTop;
    }
    animationSvc.animate(scrollerElt)
      .scrollTop(scrollTop)
      .duration(360)
      .start();
  },
};
