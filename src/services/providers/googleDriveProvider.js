import store from '../../store';
import googleHelper from './helpers/googleHelper';
import providerUtils from './providerUtils';
import providerRegistry from './providerRegistry';
import utils from '../utils';

export default providerRegistry.register({
  id: 'googleDrive',
  getToken(location) {
    const token = store.getters['data/googleTokens'][location.sub];
    return token && token.isDrive ? token : null;
  },
  getUrl(location) {
    return `https://docs.google.com/file/d/${location.driveFileId}/edit`;
  },
  getDescription(location) {
    const token = this.getToken(location);
    return `${location.driveFileId} — ${token.name}`;
  },
  downloadContent(token, syncLocation) {
    return googleHelper.downloadFile(token, syncLocation.driveFileId)
      .then(content => providerUtils.parseContent(content, syncLocation));
  },
  uploadContent(token, content, syncLocation, ifNotTooLate) {
    const file = store.state.file.itemMap[syncLocation.fileId];
    const name = utils.sanitizeName(file && file.name);
    const parents = [];
    if (syncLocation.driveParentId) {
      parents.push(syncLocation.driveParentId);
    }
    return googleHelper.uploadFile(
      token,
      name,
      parents,
      undefined,
      providerUtils.serializeContent(content),
      undefined,
      syncLocation.driveFileId,
      ifNotTooLate,
    )
      .then(driveFile => ({
        ...syncLocation,
        driveFileId: driveFile.id,
      }));
  },
  publish(token, html, metadata, publishLocation) {
    return googleHelper.uploadFile(
      token,
      metadata.title,
      [],
      undefined,
      html,
      publishLocation.templateId ? 'text/html' : undefined,
      publishLocation.driveFileId,
    )
      .then(driveFile => ({
        ...publishLocation,
        driveFileId: driveFile.id,
      }));
  },
  openFiles(token, driveFiles) {
    const openOneFile = () => {
      const driveFile = driveFiles.pop();
      if (!driveFile) {
        return null;
      }
      if (providerUtils.openFileWithLocation(store.getters['syncLocation/items'], {
        providerId: this.id,
        driveFileId: driveFile.id,
      })) {
        // File exists and has just been opened. Next...
        return openOneFile();
      }
      // Download content from Google Drive and create the file
      const syncLocation = {
        driveFileId: driveFile.id,
        providerId: this.id,
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
            name: utils.sanitizeName(driveFile.name),
            parentId: store.getters['file/current'].parentId,
          });
          store.commit('syncLocation/setItem', {
            ...syncLocation,
            id: utils.uid(),
            fileId: id,
          });
          store.commit('file/setCurrentId', id);
          store.dispatch('notification/info', `${store.getters['file/current'].name} was imported from Google Drive.`);
        }, () => {
          store.dispatch('notification/error', `Could not open file ${driveFile.id}.`);
        })
        .then(() => openOneFile());
    };
    return Promise.resolve()
      .then(() => openOneFile());
  },
  makeLocation(token, fileId, folderId) {
    const location = {
      providerId: this.id,
      sub: token.sub,
    };
    if (fileId) {
      location.driveFileId = fileId;
    }
    if (folderId) {
      location.driveParentId = folderId;
    }
    return location;
  },
});
