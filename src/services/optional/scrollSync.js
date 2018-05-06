import store from '../../store';
import animationSvc from '../animationSvc';
import editorSvc from '../editorSvc';

let editorScrollerElt;
let previewScrollerElt;
let editorFinishTimeoutId;
let previewFinishTimeoutId;
let skipAnimation;
let isScrollEditor;
let isScrollPreview;
let isEditorMoving;
let isPreviewMoving;
let sectionDescList = [];

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
  const localSkipAnimation = skipAnimation || !store.getters['layout/styles'].showSidePreview;
  skipAnimation = false;
  if (!store.getters['data/layoutSettings'].scrollSync || sectionDescList.length === 0) {
    return;
  }
  let editorScrollTop = editorScrollerElt.scrollTop;
  if (editorScrollTop < 0) {
    editorScrollTop = 0;
  }
  const previewScrollTop = previewScrollerElt.scrollTop;
  let scrollTo;
  if (isScrollEditor) {
    // Scroll the preview
    isScrollEditor = false;
    sectionDescList.some((sectionDesc) => {
      if (editorScrollTop > sectionDesc.editorDimension.endOffset) {
        return false;
      }
      const posInSection = (editorScrollTop - sectionDesc.editorDimension.startOffset)
        / (sectionDesc.editorDimension.height || 1);
      scrollTo = (sectionDesc.previewDimension.startOffset
        + (sectionDesc.previewDimension.height * posInSection));
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
  } else if (!store.getters['layout/styles'].showEditor || isScrollPreview) {
    // Scroll the editor
    isScrollPreview = false;
    sectionDescList.some((sectionDesc) => {
      if (previewScrollTop > sectionDesc.previewDimension.endOffset) {
        return false;
      }
      const posInSection = (previewScrollTop - sectionDesc.previewDimension.startOffset)
        / (sectionDesc.previewDimension.height || 1);
      scrollTo = (sectionDesc.editorDimension.startOffset
        + (sectionDesc.editorDimension.height * posInSection));
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
    doScrollSync();
  }
};
store.watch(() => store.getters['data/layoutSettings'].scrollSync, forceScrollSync);

editorSvc.$on('inited', () => {
  editorScrollerElt = editorSvc.editorElt.parentNode;
  previewScrollerElt = editorSvc.previewElt.parentNode;

  editorScrollerElt.addEventListener('scroll', () => {
    if (isEditorMoving) {
      return;
    }
    isScrollEditor = true;
    isScrollPreview = false;
    doScrollSync();
  });

  previewScrollerElt.addEventListener('scroll', () => {
    if (isPreviewMoving || isPreviewRefreshing) {
      return;
    }
    isScrollPreview = true;
    isScrollEditor = false;
    doScrollSync();
  });
});

editorSvc.$on('sectionList', () => {
  clearTimeout(timeoutId);
  isPreviewRefreshing = true;
  sectionDescList = [];
});

editorSvc.$on('previewCtx', () => {
  // Assume the user is writing in the editor
  isScrollEditor = store.getters['layout/styles'].showEditor;
  // A preview scrolling event can occur if height is smaller
  timeoutId = setTimeout(() => {
    isPreviewRefreshing = false;
  }, 100);
});

store.watch(
  () => store.getters['layout/styles'].showEditor,
  (showEditor) => {
    isScrollEditor = showEditor;
    isScrollPreview = !showEditor;
    skipAnimation = true;
  },
);

store.watch(
  () => store.getters['file/current'].id,
  () => {
    skipAnimation = true;
  },
);

editorSvc.$on('previewCtxMeasured', (previewCtxMeasured) => {
  if (previewCtxMeasured) {
    ({ sectionDescList } = previewCtxMeasured);
    forceScrollSync();
  }
});
