import store from '../../store';
import dropboxHelper from './helpers/dropboxHelper';
import providerUtils from './providerUtils';
import providerRegistry from './providerRegistry';
import utils from '../utils';

const restrictedFolder = '/Applications/StackEdit (restricted)';
const restrictedFolderRegexp = /^\/Applications\/StackEdit \(restricted\)/;

export default providerRegistry.register({
  id: 'dropbox',
  fullAccess: true,
  getToken(location) {
    const token = store.getters['data/dropboxTokens'][location.sub];
    if (token && !!token.fullAccess === this.fullAccess) {
      return token;
    }
    return null;
  },
  getUrl(location) {
    const pathComponents = location.path.split('/').map(encodeURIComponent);
    const filename = pathComponents.pop();
    let baseUrl = 'https://www.dropbox.com/home';
    if (!this.fullAccess) {
      baseUrl += encodeURIComponent(restrictedFolder);
    }
    return `${baseUrl}${pathComponents.join('/')}?preview=${filename}`;
  },
  getDescription(location) {
    const token = this.getToken(location);
    if (this.fullAccess) {
      return `${location.path} — ${token.name}`;
    }
    return `${location.path} — ${token.name} (restricted)`;
  },
  checkPath(path) {
    return path && path.match(/^\/[^\\<>:"|?*]+$/);
  },
  downloadContent(token, location) {
    return dropboxHelper.downloadFile(token, location.path, location.dropboxFileId)
      .then(({ content }) => providerUtils.parseContent(content));
  },
  uploadContent(token, content, location) {
    return dropboxHelper.uploadFile(
      token,
      location.path,
      providerUtils.serializeContent(content),
      location.dropboxFileId,
    )
      .then(dropboxFile => ({
        ...location,
        path: dropboxFile.path_display,
        dropboxFileId: dropboxFile.id,
      }));
  },
  publish(token, html, metadata, location) {
    return dropboxHelper.uploadFile(
      token,
      location.path,
      html,
      location.dropboxFileId,
    )
      .then(dropboxFile => ({
        ...location,
        path: dropboxFile.path_display,
        dropboxFileId: dropboxFile.id,
      }));
  },
  openFiles(token, paths) {
    const openOneFile = () => {
      let path = paths.pop();
      if (!path) {
        return null;
      }
      if (!token.fullAccess) {
        path = path.replace(restrictedFolderRegexp, '');
      }
      let syncLocation;
      // Try to find an existing sync location
      store.getters['syncLocation/items'].some((existingSyncLocation) => {
        if (existingSyncLocation.providerId === this.id &&
          existingSyncLocation.path === path
        ) {
          syncLocation = existingSyncLocation;
        }
        return syncLocation;
      });
      if (syncLocation) {
        // Sync location already exists, just open the file
        store.commit('file/setCurrentId', syncLocation.fileId);
        return openOneFile();
      }
      // Sync location does not exist, download content from Dropbox and create the file
      syncLocation = {
        path,
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
          let name = path;
          const slashPos = name.lastIndexOf('/');
          if (slashPos > -1 && slashPos < name.length - 1) {
            name = name.slice(slashPos + 1);
          }
          const dotPos = name.lastIndexOf('.');
          if (dotPos > 0 && slashPos < name.length) {
            name = name.slice(0, dotPos);
          }
          store.commit('file/setItem', {
            id,
            name: name.slice(0, 250),
            parentId: store.getters['file/current'].parentId,
          });
          store.commit('syncLocation/setItem', {
            ...syncLocation,
            id: utils.uid(),
            fileId: id,
          });
          store.commit('file/setCurrentId', id);
          store.dispatch('notification/info', `${store.getters['file/current'].name} was imported from Dropbox.`);
        }, () => {
          store.dispatch('notification/error', `Could not open file ${path}.`);
        })
        .then(() => openOneFile());
    };
    return Promise.resolve()
      .then(() => openOneFile());
  },
  makeLocation(token, path) {
    return {
      providerId: this.id,
      sub: token.sub,
      path,
    };
  },
});
