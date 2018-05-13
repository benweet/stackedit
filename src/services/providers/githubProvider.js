import store from '../../store';
import githubHelper from './helpers/githubHelper';
import Provider from './common/Provider';
import utils from '../utils';
import fileSvc from '../fileSvc';

const savedSha = {};

export default new Provider({
  id: 'github',
  getToken(location) {
    return store.getters['data/githubTokens'][location.sub];
  },
  getUrl(location) {
    return `https://github.com/${encodeURIComponent(location.owner)}/${encodeURIComponent(location.repo)}/blob/${encodeURIComponent(location.branch)}/${encodeURIComponent(location.path)}`;
  },
  getDescription(location) {
    const token = this.getToken(location);
    return `${location.path} — ${location.owner}/${location.repo} — ${token.name}`;
  },
  async downloadContent(token, syncLocation) {
    try {
      const { sha, content } = await githubHelper.downloadFile({
        ...syncLocation,
        token,
      });
      savedSha[syncLocation.id] = sha;
      return Provider.parseContent(content, `${syncLocation.fileId}/content`);
    } catch (e) {
      // Ignore error, upload is going to fail anyway
      return null;
    }
  },
  async uploadContent(token, content, syncLocation) {
    if (!savedSha[syncLocation.id]) {
      await this.downloadContent(token, syncLocation); // Get the last sha
    }
    const sha = savedSha[syncLocation.id];
    delete savedSha[syncLocation.id];
    await githubHelper.uploadFile({
      ...syncLocation,
      token,
      content: Provider.serializeContent(content),
      sha,
    });
    return syncLocation;
  },
  async publish(token, html, metadata, publishLocation) {
    await this.downloadContent(token, publishLocation); // Get the last sha
    const sha = savedSha[publishLocation.id];
    delete savedSha[publishLocation.id];
    await githubHelper.uploadFile({
      ...publishLocation,
      token,
      content: html,
      sha,
    });
    return publishLocation;
  },
  async openFile(token, syncLocation) {
    // Check if the file exists and open it
    if (!Provider.openFileWithLocation(store.getters['syncLocation/items'], syncLocation)) {
      // Download content from GitHub
      let content;
      try {
        content = await this.downloadContent(token, syncLocation);
      } catch (e) {
        store.dispatch('notification/error', `Could not open file ${syncLocation.path}.`);
        return;
      }

      // Create the file
      let name = syncLocation.path;
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
      store.dispatch('notification/info', `${store.getters['file/current'].name} was imported from GitHub.`);
    }
  },
  parseRepoUrl(url) {
    const parsedRepo = url && url.match(/([^/:]+)\/([^/]+?)(?:\.git|\/)?$/);
    return parsedRepo && {
      owner: parsedRepo[1],
      repo: parsedRepo[2],
    };
  },
  makeLocation(token, owner, repo, branch, path) {
    return {
      providerId: this.id,
      sub: token.sub,
      owner,
      repo,
      branch,
      path,
    };
  },
});
