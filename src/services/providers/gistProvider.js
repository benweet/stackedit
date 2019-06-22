import store from '../../store';
import githubHelper from './helpers/githubHelper';
import Provider from './common/Provider';
import utils from '../utils';
import userSvc from '../userSvc';

export default new Provider({
  id: 'gist',
  name: 'Gist',
  getToken({ sub }) {
    return store.getters['data/githubTokensBySub'][sub];
  },
  getLocationUrl({ gistId }) {
    return `https://gist.github.com/${gistId}`;
  },
  getLocationDescription({ filename }) {
    return filename;
  },
  async downloadContent(token, syncLocation) {
    const content = await githubHelper.downloadGist({
      ...syncLocation,
      token,
    });
    return Provider.parseContent(content, `${syncLocation.fileId}/content`);
  },
  async uploadContent(token, content, syncLocation) {
    const file = store.state.file.itemsById[syncLocation.fileId];
    const description = utils.sanitizeName(file && file.name);
    const gist = await githubHelper.uploadGist({
      ...syncLocation,
      token,
      description,
      content: Provider.serializeContent(content),
    });
    return {
      ...syncLocation,
      gistId: gist.id,
    };
  },
  async publish(token, html, metadata, publishLocation) {
    const gist = await githubHelper.uploadGist({
      ...publishLocation,
      token,
      description: metadata.title,
      content: html,
    });
    return {
      ...publishLocation,
      gistId: gist.id,
    };
  },
  makeLocation(token, filename, isPublic, gistId) {
    return {
      providerId: this.id,
      sub: token.sub,
      filename,
      isPublic,
      gistId,
    };
  },
  async listFileRevisions({ token, syncLocation }) {
    const entries = await githubHelper.getGistCommits({
      ...syncLocation,
      token,
    });

    return entries.map((entry) => {
      const sub = `${githubHelper.subPrefix}:${entry.user.id}`;
      userSvc.addUserInfo({ id: sub, name: entry.user.login, imageUrl: entry.user.avatar_url });
      return {
        sub,
        id: entry.version,
        created: new Date(entry.committed_at).getTime(),
      };
    });
  },
  async loadFileRevision() {
    // Revision are already loaded
    return false;
  },
  async getFileRevisionContent({
    token,
    contentId,
    syncLocation,
    revisionId,
  }) {
    const data = await githubHelper.downloadGistRevision({
      ...syncLocation,
      token,
      sha: revisionId,
    });
    return Provider.parseContent(data, contentId);
  },
});
