import store from '../../store';
import githubHelper from './helpers/githubHelper';
import providerUtils from './providerUtils';
import providerRegistry from './providerRegistry';

const savedSha = {};

export default providerRegistry.register({
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
  downloadContent(token, location) {
    return githubHelper.downloadFile(
      token, location.owner, location.repo, location.branch, location.path,
    )
      .then(({ sha, content }) => {
        savedSha[location.id] = sha;
        return providerUtils.parseContent(content);
      })
      .catch(() => null); // Ignore error, without the sha upload is going to fail anyway
  },
  uploadContent(token, content, location) {
    const sha = savedSha[location.id];
    delete savedSha[location.id];
    return githubHelper.uploadFile(
      token,
      location.owner,
      location.repo,
      location.branch,
      location.path,
      providerUtils.serializeContent(content),
      sha,
    )
      .then(() => location);
  },
  publish(token, html, metadata, location) {
    return this.downloadContent(token, location) // Get the last sha
      .then(() => {
        const sha = savedSha[location.id];
        delete savedSha[location.id];
        return githubHelper.uploadFile(
          token,
          location.owner,
          location.repo,
          location.branch,
          location.path,
          html,
          sha,
        );
      })
      .then(() => location);
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
