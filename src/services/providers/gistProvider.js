import store from '../../store';
import githubHelper from './helpers/githubHelper';
import providerUtils from './providerUtils';
import providerRegistry from './providerRegistry';

const defaultDescription = 'Untitled';

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
  downloadContent(token, location) {
    return githubHelper.downloadGist(token, location.gistId, location.filename)
      .then(content => providerUtils.parseContent(content));
  },
  uploadContent(token, content, location) {
    const file = store.state.file.itemMap[location.fileId];
    const description = (file && file.name) || defaultDescription;
    return githubHelper.uploadGist(
      token,
      description,
      location.filename,
      providerUtils.serializeContent(content),
      location.isPublic,
      location.gistId,
    )
      .then(gist => ({
        ...location,
        gistId: gist.id,
      }));
  },
  publish(token, html, metadata, location) {
    return githubHelper.uploadGist(
      token,
      metadata.title,
      location.filename,
      html,
      location.isPublic,
      location.gistId,
    )
      .then(gist => ({
        ...location,
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
