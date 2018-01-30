import store from '../../store';
import githubHelper from './helpers/githubHelper';
import providerUtils from './providerUtils';
import providerRegistry from './providerRegistry';
import utils from '../utils';

export default providerRegistry.register({
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
  downloadContent(token, syncLocation) {
    return githubHelper.downloadGist(token, syncLocation.gistId, syncLocation.filename)
      .then(content => providerUtils.parseContent(content, `${syncLocation.fileId}/content`));
  },
  uploadContent(token, content, syncLocation) {
    const file = store.state.file.itemMap[syncLocation.fileId];
    const description = utils.sanitizeName(file && file.name);
    return githubHelper.uploadGist(
      token,
      description,
      syncLocation.filename,
      providerUtils.serializeContent(content),
      syncLocation.isPublic,
      syncLocation.gistId,
    )
      .then(gist => ({
        ...syncLocation,
        gistId: gist.id,
      }));
  },
  publish(token, html, metadata, publishLocation) {
    return githubHelper.uploadGist(
      token,
      metadata.title,
      publishLocation.filename,
      html,
      publishLocation.isPublic,
      publishLocation.gistId,
    )
      .then(gist => ({
        ...publishLocation,
        gistId: gist.id,
      }));
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
