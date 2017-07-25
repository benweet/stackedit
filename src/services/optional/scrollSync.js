import store from '../../store';
import constants from '../constants';
import animationSvc from '../animationSvc';
import editorSvc from '../editorSvc';

let editorScrollerElt;
let previewScrollerElt;
let previewElt;
let editorFinishTimeoutId;
let previewFinishTimeoutId;
let skipAnimation;
let isScrollEditor;
let isScrollPreview;
let isEditorMoving;
let isPreviewMoving;
let sectionDescList;

let throttleTimeoutId;
let throttleLastTime = 0;

function throttle(func, wait) {
  clearTimeout(throttleTimeoutId);
  const currentTime = Date.now();
  const localWait = (wait + throttleLastTime) - currentTime;
  if (localWait < 1) {
    throttleLastTime = currentTime;
    func();
  } else {
    throttleTimeoutId = setTimeout(() => {
      throttleLastTime = Date.now();
      func();
    }, localWait);
  }
}

const doScrollSync = () => {
  const localSkipAnimation = skipAnimation
    || !store.state.layout.showSidePreview
    || !store.state.layout.showEditor;
  skipAnimation = false;
  if (!store.state.editor.scrollSync || !sectionDescList || sectionDescList.length === 0) {
    return;
  }
  let editorScrollTop = editorScrollerElt.scrollTop;
  if (editorScrollTop < 0) {
    editorScrollTop = 0;
  }
  let previewScrollTop = previewScrollerElt.scrollTop;
  let scrollTo;
  if (isScrollEditor) {
    // Scroll the preview
    isScrollEditor = false;
    editorScrollTop += constants.scrollOffset;
    sectionDescList.some((sectionDesc) => {
      if (editorScrollTop > sectionDesc.editorDimension.endOffset) {
        return false;
      }
      const posInSection = (editorScrollTop - sectionDesc.editorDimension.startOffset)
        / (sectionDesc.editorDimension.height || 1);
      scrollTo = (sectionDesc.previewDimension.startOffset
        + (sectionDesc.previewDimension.height * posInSection)) - constants.scrollOffset;
      return true;
    });
    scrollTo = Math.min(
      scrollTo,
      previewScrollerElt.scrollHeight - previewScrollerElt.offsetHeight,
    );

    throttle(() => {
      clearTimeout(previewFinishTimeoutId);
      animationSvc.animate(previewScrollerElt)
        .scrollTop(scrollTo)
        .duration(!localSkipAnimation && 100)
        .start(() => {
          previewFinishTimeoutId = setTimeout(() => {
            isPreviewMoving = false;
          }, 100);
        }, () => {
          isPreviewMoving = true;
        });
    }, localSkipAnimation ? 500 : 50);
  } else if (!store.state.layout.showEditor || isScrollPreview) {
    // Scroll the editor
    isScrollPreview = false;
    previewScrollTop += constants.scrollOffset;
    sectionDescList.some((sectionDesc) => {
      if (previewScrollTop > sectionDesc.previewDimension.endOffset) {
        return false;
      }
      const posInSection = (previewScrollTop - sectionDesc.previewDimension.startOffset)
        / (sectionDesc.previewDimension.height || 1);
      scrollTo = (sectionDesc.editorDimension.startOffset
        + (sectionDesc.editorDimension.height * posInSection)) - constants.scrollOffset;
      return true;
    });
    scrollTo = Math.min(
      scrollTo,
      editorScrollerElt.scrollHeight - editorScrollerElt.offsetHeight,
    );

    throttle(() => {
      clearTimeout(editorFinishTimeoutId);
      animationSvc.animate(editorScrollerElt)
        .scrollTop(scrollTo)
        .duration(!localSkipAnimation && 100)
        .start(() => {
          editorFinishTimeoutId = setTimeout(() => {
            isEditorMoving = false;
          }, 100);
        }, () => {
          isEditorMoving = true;
        });
    }, localSkipAnimation ? 500 : 50);
  }
};

let isPreviewRefreshing;
let timeoutId;

const forceScrollSync = () => {
  if (!isPreviewRefreshing) {
    doScrollSync(!store.state.layout.showSidePreview);
  }
};
store.watch(state => state.editor.scrollSync, forceScrollSync);

editorSvc.$on('inited', () => {
  editorScrollerElt = editorSvc.editorElt.parentNode;
  previewScrollerElt = editorSvc.previewElt.parentNode;
  previewElt = editorSvc.previewElt;

  editorScrollerElt.addEventListener('scroll', () => {
    if (isEditorMoving) {
      return;
    }
    isScrollEditor = true;
    isScrollPreview = false;
    doScrollSync(!store.state.layout.showSidePreview);
  });

  previewScrollerElt.addEventListener('scroll', () => {
    if (isPreviewMoving || isPreviewRefreshing) {
      return;
    }
    isScrollPreview = true;
    isScrollEditor = false;
    doScrollSync(!store.state.layout.showSidePreview);
  });
});

editorSvc.$on('sectionList', () => {
  clearTimeout(timeoutId);
  isPreviewRefreshing = true;
  sectionDescList = undefined;
});

editorSvc.$on('conversionCtx', () => {
  // Set the preview height to prevent scrollbar from jumping
  previewElt.style.height = `${previewElt.offsetHeight}px`;
});

editorSvc.$on('previewText', () => {
  // Remove height property once the preview as been refreshed
  previewElt.style.removeProperty('height');
  // Assume the user is writing in the editor
  isScrollEditor = store.state.layout.showEditor;
  // A preview scrolling event can occur if height is smaller
  timeoutId = setTimeout(() => {
    isPreviewRefreshing = false;
  }, 100);
});

store.watch(state => state.layout.showSidePreview,
  (showSidePreview) => {
    if (showSidePreview) {
      isScrollEditor = true;
      isScrollPreview = false;
      skipAnimation = true;
    }
  });

editorSvc.$on('sectionDescMeasuredList', (sectionDescMeasuredList) => {
  sectionDescList = sectionDescMeasuredList;
  forceScrollSync();
});
