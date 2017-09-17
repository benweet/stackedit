import store from '../../store';
import googleHelper from './helpers/googleHelper';
import providerUtils from './providerUtils';
import utils from '../utils';

const defaultFilename = 'Untitled';

export default {
  downloadContent(token, syncLocation) {
    return googleHelper.downloadFile(token, syncLocation.driveFileId)
      .then(content => providerUtils.parseContent(content));
  },
  uploadContent(token, item, syncLocation, ifNotTooLate) {
    const file = store.state.file.itemMap[syncLocation.fileId];
    const name = (file && file.name) || defaultFilename;
    const parents = [];
    if (syncLocation.driveParentId) {
      parents.push(syncLocation.driveParentId);
    }
    return googleHelper.saveFile(
      token,
      name,
      parents,
      providerUtils.serializeContent(item),
      syncLocation && syncLocation.driveFileId,
      ifNotTooLate,
    )
      .then(driveFile => ({
        ...syncLocation,
        driveFileId: driveFile.id,
      }));
  },
  openFiles(token, files) {
    const openOneFile = () => {
      const file = files.pop();
      if (!file) {
        return null;
      }
      let syncLocation;
      // Try to find an existing sync location
      store.getters['syncLocation/items'].some((existingSyncLocation) => {
        if (existingSyncLocation.driveFileId === file.id) {
          syncLocation = existingSyncLocation;
        }
        return syncLocation;
      });
      if (syncLocation) {
        // Sync location already exists, just open the file
        this.$store.commit('file/setCurrentId', syncLocation.fileId);
        return openOneFile();
      }
      // Sync location does not exist, download content from Google Drive and create the file
      syncLocation = {
        driveFileId: file.id,
        provider: 'googleDrive',
        sub: token.sub,
      };
      return this.downloadContent(token, syncLocation)
        .then((content) => {
          const id = utils.uid();
          delete content.history;
          store.commit('content/setItem', {
            ...content,
            id: `${id}/content`,
          });
          store.commit('file/setItem', {
            id,
            name: (file.name || defaultFilename).slice(0, 250),
            parentId: store.getters['file/current'].parentId,
          });
          store.commit('syncLocation/setItem', {
            ...syncLocation,
            id: utils.uid(),
            fileId: id,
          });
          store.commit('file/setCurrentId', id);
        }, () => {
          console.error(`Could not open file ${file.id}.`);
        })
        .then(() => openOneFile());
    };
    return Promise.resolve()
      .then(() => openOneFile());
  },
};
