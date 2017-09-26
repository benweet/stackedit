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
  downloadContent(token, syncLocation) {
    return githubHelper.downloadFile(
      token, syncLocation.owner, syncLocation.repo, syncLocation.branch, syncLocation.path,
    )
      .then(({ sha, content }) => {
        savedSha[syncLocation.id] = sha;
        return providerUtils.parseContent(content, syncLocation);
      })
      .catch(() => null); // Ignore error, without the sha upload is going to fail anyway
  },
  uploadContent(token, content, syncLocation) {
    const sha = savedSha[syncLocation.id];
    delete savedSha[syncLocation.id];
    return githubHelper.uploadFile(
      token,
      syncLocation.owner,
      syncLocation.repo,
      syncLocation.branch,
      syncLocation.path,
      providerUtils.serializeContent(content),
      sha,
    )
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
