import store from '../../store';
import dropboxHelper from './helpers/dropboxHelper';
import Provider from './common/Provider';
import utils from '../utils';
import fileSvc from '../fileSvc';

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

export default new Provider({
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
  async downloadContent(token, syncLocation) {
    const { content } = await dropboxHelper.downloadFile({
      token,
      path: makePathRelative(token, syncLocation.path),
      fileId: syncLocation.dropboxFileId,
    });
    return Provider.parseContent(content, `${syncLocation.fileId}/content`);
  },
  async uploadContent(token, content, syncLocation) {
    const dropboxFile = await dropboxHelper.uploadFile({
      token,
      path: makePathRelative(token, syncLocation.path),
      content: Provider.serializeContent(content),
      fileId: syncLocation.dropboxFileId,
    });
    return {
      ...syncLocation,
      path: makePathAbsolute(token, dropboxFile.path_display),
      dropboxFileId: dropboxFile.id,
    };
  },
  async publish(token, html, metadata, publishLocation) {
    const dropboxFile = await dropboxHelper.uploadFile({
      token,
      path: publishLocation.path,
      content: html,
      fileId: publishLocation.dropboxFileId,
    });
    return {
      ...publishLocation,
      path: makePathAbsolute(token, dropboxFile.path_display),
      dropboxFileId: dropboxFile.id,
    };
  },
  async openFiles(token, paths) {
    await utils.awaitSequence(paths, async (path) => {
      // Check if the file exists and open it
      if (!Provider.openFileWithLocation(store.getters['syncLocation/items'], {
        providerId: this.id,
        path,
      })) {
        // Download content from Dropbox
        const syncLocation = {
          path,
          providerId: this.id,
          sub: token.sub,
        };
        let content;
        try {
          content = await this.downloadContent(token, syncLocation);
        } catch (e) {
          store.dispatch('notification/error', `Could not open file ${path}.`);
          return;
        }

        // Create the file
        let name = path;
        const slashPos = name.lastIndexOf('/');
        if (slashPos > -1 && slashPos < name.length - 1) {
          name = name.slice(slashPos + 1);
        }
        const dotPos = name.lastIndexOf('.');
        if (dotPos > 0 && slashPos < name.length) {
          name = name.slice(0, dotPos);
        }
        const item = await fileSvc.createFile({
          name,
          parentId: store.getters['file/current'].parentId,
          text: content.text,
          properties: content.properties,
          discussions: content.discussions,
          comments: content.comments,
        }, true);
        store.commit('file/setCurrentId', item.id);
        store.commit('syncLocation/setItem', {
          ...syncLocation,
          id: utils.uid(),
          fileId: item.id,
        });
        store.dispatch('notification/info', `${store.getters['file/current'].name} was imported from Dropbox.`);
      }
    });
  },
  makeLocation(token, path) {
    return {
      providerId: this.id,
      sub: token.sub,
      path,
    };
  },
});
