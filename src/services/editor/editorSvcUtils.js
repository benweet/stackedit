import DiffMatchPatch from 'diff-match-patch';
import cledit from './cledit';
import animationSvc from '../animationSvc';
import store from '../../store';

const diffMatchPatch = new DiffMatchPatch();

export default {
  /**
   * Get an object describing the position of the scroll bar in the file.
   */
  getScrollPosition(elt = store.getters['layout/styles'].showEditor
    ? this.editorElt : this.previewElt) {
    const dimensionKey = elt === this.editorElt
      ? 'editorDimension'
      : 'previewDimension';
    const { scrollTop } = elt.parentNode;
    let result;
    if (this.previewCtxMeasured) {
      this.previewCtxMeasured.sectionDescList.some((sectionDesc, sectionIdx) => {
        if (scrollTop >= sectionDesc[dimensionKey].endOffset) {
          return false;
        }
        const posInSection = (scrollTop - sectionDesc[dimensionKey].startOffset) /
          (sectionDesc[dimensionKey].height || 1);
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
    const { scrollPosition } = store.getters['contentState/current'];
    if (scrollPosition && this.previewCtxMeasured) {
      const sectionDesc = this.previewCtxMeasured.sectionDescList[scrollPosition.sectionIdx];
      if (sectionDesc) {
        const editorScrollTop = sectionDesc.editorDimension.startOffset +
          (sectionDesc.editorDimension.height * scrollPosition.posInSection);
        this.editorElt.parentNode.scrollTop = Math.floor(editorScrollTop);
        const previewScrollTop = sectionDesc.previewDimension.startOffset +
          (sectionDesc.previewDimension.height * scrollPosition.posInSection);
        this.previewElt.parentNode.scrollTop = Math.floor(previewScrollTop);
      }
    }
  },

  /**
   * Get the offset in the preview corresponding to the offset of the markdown in the editor
   */
  getPreviewOffset(
    editorOffset,
    sectionDescList = (this.previewCtxWithDiffs || {}).sectionDescList,
  ) {
    if (!sectionDescList) {
      return null;
    }
    let offset = editorOffset;
    let previewOffset = 0;
    sectionDescList.some((sectionDesc) => {
      if (!sectionDesc.textToPreviewDiffs) {
        previewOffset = null;
        return true;
      }
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
  getEditorOffset(
    previewOffset,
    sectionDescList = (this.previewCtxWithDiffs || {}).sectionDescList,
  ) {
    if (!sectionDescList) {
      return null;
    }
    let offset = previewOffset;
    let editorOffset = 0;
    sectionDescList.some((sectionDesc) => {
      if (!sectionDesc.textToPreviewDiffs) {
        editorOffset = null;
        return true;
      }
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
