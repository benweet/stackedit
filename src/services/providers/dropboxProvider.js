import store from '../../store';
import dropboxHelper from './helpers/dropboxHelper';
import providerUtils from './providerUtils';
import providerRegistry from './providerRegistry';
import utils from '../utils';

const makePathAbsolute = (token, path) => {
  if (!token.fullAccess) {
    return `/Applications/StackEdit (restricted)${path}`;
  }
  return path;
};
const makePathRelative = (token, path) => {
  if (!token.fullAccess) {
    return path.replace(/^\/Applications\/StackEdit \(restricted\)/, '');
  }
  return path;
};

export default providerRegistry.register({
  id: 'dropbox',
  getToken(location) {
    return store.getters['data/dropboxTokens'][location.sub];
  },
  getUrl(location) {
    const pathComponents = location.path.split('/').map(encodeURIComponent);
    const filename = pathComponents.pop();
    return `https://www.dropbox.com/home${pathComponents.join('/')}?preview=${filename}`;
  },
  getDescription(location) {
    const token = this.getToken(location);
    return `${location.path} — ${location.dropboxFileId} — ${token.name}`;
  },
  checkPath(path) {
    return path && path.match(/^\/[^\\<>:"|?*]+$/);
  },
  downloadContent(token, syncLocation) {
    return dropboxHelper.downloadFile(
      token,
      makePathRelative(token, syncLocation.path),
      syncLocation.dropboxFileId,
    )
      .then(({ content }) => providerUtils.parseContent(content, syncLocation));
  },
  uploadContent(token, content, syncLocation) {
    return dropboxHelper.uploadFile(
      token,
      makePathRelative(token, syncLocation.path),
      providerUtils.serializeContent(content),
      syncLocation.dropboxFileId,
    )
      .then(dropboxFile => ({
        ...syncLocation,
        path: makePathAbsolute(token, dropboxFile.path_display),
        dropboxFileId: dropboxFile.id,
      }));
  },
  publish(token, html, metadata, publishLocation) {
    return dropboxHelper.uploadFile(
      token,
      publishLocation.path,
      html,
      publishLocation.dropboxFileId,
    )
      .then(dropboxFile => ({
        ...publishLocation,
        path: makePathAbsolute(token, dropboxFile.path_display),
        dropboxFileId: dropboxFile.id,
      }));
  },
  openFiles(token, paths) {
    const openOneFile = () => {
      const path = paths.pop();
      if (!path) {
        return null;
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
