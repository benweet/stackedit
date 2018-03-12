import cledit from './cledit';
import store from '../store';
import utils from './utils';
import editorSvc from './editorSvc';

const origin = utils.queryParams.origin;
const existingFileId = utils.queryParams.fileId;
const fileName = utils.queryParams.fileName;
const contentText = utils.queryParams.contentText;
const contentProperties = utils.queryParams.contentProperties;

export default {
  close() {
    if (origin && window.parent) {
      window.parent.postMessage({ type: 'close' }, origin);
    }
  },
  init() {
    if (!origin || !window.parent) {
      return Promise.resolve();
    }

    store.commit('setLight', true);
    return Promise.resolve()
      .then(() => {
        const file = store.state.file.itemMap[existingFileId];
        if (file) {
          // If file exists, check that the origin site has created it
          const fileCreation = store.getters['data/fileCreations'][file.id];
          if (fileCreation && fileCreation.origin === origin) {
            return file;
          }
        }

        // Create a new temp file
        return store.dispatch('createFile', {
          name: fileName,
          text: contentText,
          properties: contentProperties,
          parentId: 'temp',
        });
      })
      .then((file) => {
        const fileItemMap = store.state.file.itemMap;

        // Sanitize file creations
        const fileCreations = {};
        Object.entries(store.getters['data/fileCreations']).forEach(([id, fileCreation]) => {
          if (fileItemMap[id]) {
            fileCreations[id] = fileCreation;
          }
        });

        // Track file creation from the origin site
        fileCreations[file.id] = {
          created: Date.now(),
          origin,
        };

        // List temp files
        const tempFileCreations = [];
        Object.entries(fileCreations).forEach(([id, fileCreation]) => {
          if (fileItemMap[id].parentId === 'temp') {
            tempFileCreations.push({
              id,
              created: fileCreation.created,
            });
          }
        });

        // Keep only the last 10 temp files
        tempFileCreations
          .sort((fileCreation1, fileCreation2) => fileCreation2.created - fileCreation1.created)
          .splice(10)
          .forEach((fileCreation) => {
            delete fileCreations[fileCreation.id];
            store.dispatch('deleteFile', fileCreation.id);
          });

        // Store file creations and open the file
        store.dispatch('data/setFileCreations', fileCreations);
        store.commit('file/setCurrentId', file.id);

        const onChange = cledit.Utils.debounce(() => {
          const currentFile = store.getters['file/current'];
          if (currentFile.id !== file.id) {
            // Close editor if file has changed for some reason
            this.close();
          } else if (editorSvc.previewCtx.html != null) {
            const content = store.getters['content/current'];
            const properties = utils.computeProperties(content.properties);
            window.parent.postMessage({
              type: 'fileChange',
              file: {
                id: file.id,
                name: currentFile.name,
                content: {
                  text: content.text,
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
        store.$watch(() => store.getters['file/current'].name, onChange);
      });
  },
};
