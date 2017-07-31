import localDbSvc from './localDbSvc';
import store from '../store';
import welcomeFile from '../data/welcomeFile.md';
import utils from './utils';

const ifNoId = cb => (obj) => {
  if (obj.id) {
    return obj;
  }
  return cb();
};

// Load the DB on boot
localDbSvc.sync()
  // Watch file changing
  .then(() => store.watch(
    () => store.getters['files/current'].id,
    () => Promise.resolve(store.getters['files/current'])
      // If current file has no ID, get the most recent file
      .then(ifNoId(() => store.getters['files/mostRecent']))
      // If still no ID, create a new file
      .then(ifNoId(() => {
        const contentId = utils.uid();
        store.commit('contents/setItem', {
          id: contentId,
          text: welcomeFile,
        });
        const fileId = utils.uid();
        store.commit('files/setItem', {
          id: fileId,
          name: 'Welcome file',
          contentId,
        });
        return store.state.files.itemMap[fileId];
      }))
      .then((currentFile) => {
        store.commit('files/setCurrentId', currentFile.id);
        store.dispatch('files/patchCurrent', {}); // Update `updated` field to make it the mostRecent
      }),
    {
      immediate: true,
    }));

utils.setInterval(() => localDbSvc.sync(), 1200);
