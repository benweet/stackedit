import store from '../../store';
import githubHelper from './helpers/githubHelper';
import Provider from './common/Provider';
import utils from '../utils';

export default new Provider({
  id: 'gist',
  getToken(location) {
    return store.getters['data/githubTokens'][location.sub];
  },
  getUrl(location) {
    return `https://gist.github.com/${location.gistId}`;
  },
  getDescription(location) {
    const token = this.getToken(location);
    return `${location.filename} — ${location.gistId} — ${token.name}`;
  },
  async downloadContent(token, syncLocation) {
    const content = await githubHelper.downloadGist({
      ...syncLocation,
      token,
    });
    return Provider.parseContent(content, `${syncLocation.fileId}/content`);
  },
  async uploadContent(token, content, syncLocation) {
    const file = store.state.file.itemMap[syncLocation.fileId];
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
});
