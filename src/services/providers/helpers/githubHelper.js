import utils from '../../utils';
import networkSvc from '../../networkSvc';
import store from '../../../store';

const clientId = GITHUB_CLIENT_ID;
const getScopes = token => [token.repoFullAccess ? 'repo' : 'public_repo', 'gist'];

const request = (token, options) => networkSvc.request({
  ...options,
  headers: {
    ...options.headers || {},
    Authorization: `token ${token.accessToken}`,
  },
  params: {
    ...options.params || {},
    t: Date.now(), // Prevent from caching
  },
});

export default {
  startOauth2(scopes, sub = null, silent = false) {
    return networkSvc.startOauth2(
      'https://github.com/login/oauth/authorize', {
        client_id: clientId,
        scope: scopes.join(' '),
      }, silent)
      // Exchange code with token
      .then(data => networkSvc.request({
        method: 'GET',
        url: 'oauth2/githubToken',
        params: {
          clientId,
          code: data.code,
        },
      })
        .then(res => res.body))
      // Call the user info endpoint
      .then(accessToken => networkSvc.request({
        method: 'GET',
        url: 'https://api.github.com/user',
        params: {
          access_token: accessToken,
        },
      })
        .then((res) => {
          // Check the returned sub consistency
          if (sub && `${res.body.id}` !== sub) {
            throw new Error('GitHub account ID not expected.');
          }
          // Build token object including scopes and sub
          const token = {
            scopes,
            accessToken,
            name: res.body.name,
            sub: `${res.body.id}`,
            repoFullAccess: scopes.indexOf('repo') !== -1,
          };
          // Add token to githubTokens
          store.dispatch('data/setGithubToken', token);
          return token;
        }));
  },
  addAccount(repoFullAccess = false) {
    return this.startOauth2(getScopes({ repoFullAccess }));
  },
  uploadFile(token, owner, repo, branch, path, content, sha) {
    return request(token, {
      method: 'PUT',
      url: `https://api.github.com/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/contents/${encodeURIComponent(path)}`,
      body: {
        message: 'Uploaded by https://stackedit.io/',
        content: utils.encodeBase64(content),
        sha,
        branch,
      },
    });
  },
  downloadFile(token, owner, repo, branch, path) {
    return request(token, {
      url: `https://api.github.com/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/contents/${encodeURIComponent(path)}`,
      params: { ref: branch },
    })
      .then(res => ({
        sha: res.body.sha,
        content: utils.decodeBase64(res.body.content),
      }));
  },
  uploadGist(token, description, filename, content, isPublic, gistId) {
    return request(token, gistId ? {
      method: 'PATCH',
      url: `https://api.github.com/gists/${gistId}`,
      body: {
        description,
        files: {
          [filename]: {
            content,
          },
        },
      },
    } : {
      method: 'POST',
      url: 'https://api.github.com/gists',
      body: {
        description,
        files: {
          [filename]: {
            content,
          },
        },
        public: isPublic,
      },
    })
      .then(res => res.body);
  },
  downloadGist(token, gistId, filename) {
    return request(token, {
      url: `https://api.github.com/gists/${gistId}`,
    })
      .then((res) => {
        const result = res.body.files[filename];
        if (!result) {
          throw new Error('Gist file not found.');
        }
        return result.content;
      });
  },
};
