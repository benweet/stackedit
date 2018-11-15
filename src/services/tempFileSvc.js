import cledit from './editor/cledit';
import store from '../store';
import utils from './utils';
import editorSvc from './editorSvc';
import workspaceSvc from './workspaceSvc';

const {
  origin,
  fileName,
  contentText,
  contentProperties,
} = utils.queryParams;
const isLight = origin && window.parent;

export default {
  setReady() {
    if (isLight) {
      // Wait for the editor to init
      setTimeout(() => window.parent.postMessage({ type: 'ready' }, origin), 1);
    }
  },
  closed: false,
  close() {
    if (isLight) {
      if (!this.closed) {
        window.parent.postMessage({ type: 'close' }, origin);
      }
      this.closed = true;
    }
  },
  async init() {
    if (!isLight) {
      return;
    }
    store.commit('setLight', true);

    const file = await workspaceSvc.createFile({
      name: fileName || utils.getHostname(origin),
      text: contentText || '\n',
      properties: contentProperties,
      parentId: 'temp',
    }, true);

    // Sanitize file creations
    const lastCreated = {};
    const fileItemsById = store.state.file.itemsById;
    Object.entries(store.getters['data/lastCreated']).forEach(([id, value]) => {
      if (fileItemsById[id] && fileItemsById[id].parentId === 'temp') {
        lastCreated[id] = value;
      }
    });

    // Track file creation from other site
    lastCreated[file.id] = {
      created: Date.now(),
    };

    // Keep only the last 10 temp files created by other sites
    Object.entries(lastCreated)
      .sort(([, value1], [, value2]) => value2.created - value1.created)
      .splice(10)
      .forEach(([id]) => {
        delete lastCreated[id];
        workspaceSvc.deleteFile(id);
      });

    // Store file creations and open the file
    store.dispatch('data/setLastCreated', lastCreated);
    store.commit('file/setCurrentId', file.id);

    const onChange = cledit.Utils.debounce(() => {
      const currentFile = store.getters['file/current'];
      if (currentFile.id !== file.id) {
        // Close editor if file has changed for some reason
        this.close();
      } else if (!this.closed && editorSvc.previewCtx.html != null) {
        const content = store.getters['content/current'];
        const properties = utils.computeProperties(content.properties);
        window.parent.postMessage({
          type: 'fileChange',
          payload: {
            id: file.id,
            name: currentFile.name,
            content: {
              text: content.text.slice(0, -1), // Remove trailing LF
              properties,
              yamlProperties: content.properties,
              html: editorSvc.previewCtx.html,
            },
          },
        }, origin);
      }
    }, 25);

    // Watch preview refresh and file name changes
    editorSvc.$on('previewCtx', onChange);
    store.watch(() => store.getters['file/current'].name, onChange);
  },
};
