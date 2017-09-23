import Mousetrap from 'mousetrap';
import store from '../../store';
import editorSvc from '../../services/editorSvc';
import syncSvc from '../../services/syncSvc';

// Skip shortcuts if modal is open or editor is hidden
Mousetrap.prototype.stopCallback = () => store.getters['modal/config'] || !store.getters['layout/styles'].showEditor;

const pagedownHandler = name => () => editorSvc.pagedownEditor.uiManager.doClick(name);

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
  sync: () => syncSvc.isSyncPossible() && syncSvc.requestSync(),
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
          Mousetrap.bind(shortcut.keys.toString(), () => {
            methods[method].apply(null, params);
            return false; // preventDefault
          });
        }
      }
    });
  }, {
    immediate: true,
  });
