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
  downloadContent(token, syncLocation) {
    return githubHelper.downloadFile(
      token, syncLocation.owner, syncLocation.repo, syncLocation.branch, syncLocation.path,
    )
      .then(({ sha, content }) => {
        savedSha[syncLocation.id] = sha;
        return Provider.parseContent(content, `${syncLocation.fileId}/content`);
      })
      .catch(() => null); // Ignore error, upload is going to fail anyway
  },
  uploadContent(token, content, syncLocation) {
    let result = Promise.resolve();
    if (!savedSha[syncLocation.id]) {
      result = this.downloadContent(token, syncLocation); // Get the last sha
    }
    return result
      .then(() => {
        const sha = savedSha[syncLocation.id];
        delete savedSha[syncLocation.id];
        return githubHelper.uploadFile(
          token,
          syncLocation.owner,
          syncLocation.repo,
          syncLocation.branch,
          syncLocation.path,
          Provider.serializeContent(content),
          sha,
        );
      })
      .then(() => syncLocation);
  },
  publish(token, html, metadata, publishLocation) {
    return this.downloadContent(token, publishLocation) // Get the last sha
      .then(() => {
        const sha = savedSha[publishLocation.id];
        delete savedSha[publishLocation.id];
        return githubHelper.uploadFile(
          token,
          publishLocation.owner,
          publishLocation.repo,
          publishLocation.branch,
          publishLocation.path,
          html,
          sha,
        );
      })
      .then(() => publishLocation);
  },
  openFile(token, syncLocation) {
    return Promise.resolve()
      .then(() => {
        if (Provider.openFileWithLocation(store.getters['syncLocation/items'], syncLocation)) {
          // File exists and has just been opened. Next...
          return null;
        }
        // Download content from GitHub and create the file
        return this.downloadContent(token, syncLocation)
          .then((content) => {
            let name = syncLocation.path;
            const slashPos = name.lastIndexOf('/');
            if (slashPos > -1 && slashPos < name.length - 1) {
              name = name.slice(slashPos + 1);
            }
            const dotPos = name.lastIndexOf('.');
            if (dotPos > 0 && slashPos < name.length) {
              name = name.slice(0, dotPos);
            }
            return fileSvc.createFile({
              name,
              parentId: store.getters['file/current'].parentId,
              text: content.text,
              properties: content.properties,
              discussions: content.discussions,
              comments: content.comments,
            }, true);
          })
          .then((item) => {
            store.commit('file/setCurrentId', item.id);
            store.commit('syncLocation/setItem', {
              ...syncLocation,
              id: utils.uid(),
              fileId: item.id,
            });
            store.dispatch('notification/info', `${store.getters['file/current'].name} was imported from GitHub.`);
          })
          .catch(() => {
            store.dispatch('notification/error', `Could not open file ${syncLocation.path}.`);
          });
      });
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
