import Mousetrap from 'mousetrap';
import store from '../../store';
import editorSvc from '../../services/editorSvc';
import editorEngineSvc from '../../services/editorEngineSvc';
import syncSvc from '../../services/syncSvc';

// Skip shortcuts if modal is open or editor is hidden
Mousetrap.prototype.stopCallback = () => store.getters['modal/config'] || !store.getters['layout/styles'].showEditor;

const pagedownHandler = name => () => {
  editorSvc.pagedownEditor.uiManager.doClick(name);
  return true;
};

const methods = {
  bold: pagedownHandler('bold'),
  italic: pagedownHandler('italic'),
  link: pagedownHandler('link'),
  quote: pagedownHandler('quote'),
  code: pagedownHandler('code'),
  image: pagedownHandler('image'),
  olist: pagedownHandler('olist'),
  ulist: pagedownHandler('ulist'),
  heading: pagedownHandler('heading'),
  hr: pagedownHandler('hr'),
  sync() {
    if (syncSvc.isSyncPossible()) {
      syncSvc.requestSync();
    }
    return true;
  },
  expand(param1, param2) {
    const text = param1 && `${param1}`;
    const replacement = param2 && `${param2}`;
    if (text && replacement) {
      setTimeout(() => {
        const selectionMgr = editorEngineSvc.clEditor.selectionMgr;
        let offset = editorEngineSvc.clEditor.selectionMgr.selectionStart;
        if (offset === selectionMgr.selectionEnd) {
          const range = selectionMgr.createRange(offset - text.length, offset);
          if (`${range}` === text) {
            range.deleteContents();
            range.insertNode(document.createTextNode(replacement));
            offset = (offset - text.length) + replacement.length;
            selectionMgr.setSelectionStartEnd(offset, offset);
            selectionMgr.updateCursorCoordinates(true);
          }
        }
      }, 1);
    }
  },
};

store.watch(
  () => store.getters['data/computedSettings'],
  (computedSettings) => {
    Mousetrap.reset();

    const shortcuts = computedSettings.shortcuts;
    shortcuts.forEach((shortcut) => {
      if (shortcut.keys) {
        const method = shortcut.method || shortcut;
        let params = shortcut.params || [];
        if (!Array.isArray(params)) {
          params = [params];
        }
        if (Object.prototype.hasOwnProperty.call(methods, method)) {
          Mousetrap.bind(`${shortcut.keys}`, () => !methods[method].apply(null, params));
        }
      }
    });
  }, {
    immediate: true,
  });
