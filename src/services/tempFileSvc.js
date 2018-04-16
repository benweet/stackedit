import cledit from './cledit';
import store from '../store';
import utils from './utils';
import editorSvc from './editorSvc';

const origin = utils.queryParams.origin;
const fileName = utils.queryParams.fileName;
const contentText = utils.queryParams.contentText;
const contentProperties = utils.queryParams.contentProperties;

export default {
  setReady() {
    if (origin && window.parent) {
      // Wait for the editor to init
      setTimeout(() => window.parent.postMessage({ type: 'ready' }, origin), 1);
    }
  },
  closed: false,
  close() {
    if (!this.closed && origin && window.parent) {
      window.parent.postMessage({ type: 'close' }, origin);
    }
    this.closed = true;
  },
  init() {
    if (!origin || !window.parent) {
      return Promise.resolve();
    }

    store.commit('setLight', true);

    return store.dispatch('createFile', {
      name: fileName || utils.getHostname(origin),
      text: contentText || '\n',
      properties: contentProperties,
      parentId: 'temp',
    })
      .then((file) => {
        const fileItemMap = store.state.file.itemMap;

        // Sanitize file creations
        const lastCreated = {};
        Object.entries(store.getters['data/lastCreated']).forEach(([id, createdOn]) => {
          if (fileItemMap[id] && fileItemMap[id].parentId === 'temp') {
            lastCreated[id] = createdOn;
          }
        });

        // Track file creation from other site
        lastCreated[file.id] = {
          created: Date.now(),
        };

        // Keep only the last 10 temp files created by other sites
        Object.entries(lastCreated)
          .sort(([, createdOn1], [, createdOn2]) => createdOn2 - createdOn1)
          .splice(10)
          .forEach(([id]) => {
            delete lastCreated[id];
            store.dispatch('deleteFile', id);
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
      });
  },
};
