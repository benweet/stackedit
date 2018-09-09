import constants from '../../../data/constants';
import utils from '../../utils';
import networkSvc from '../../networkSvc';
import store from '../../../store';

const clientId = GITLAB_CLIENT_ID;
const getScopes = token => (token.repoFullAccess ? ['api'] : ['read_repository', 'read_user']);

const request = (token, options) => networkSvc.request({
  ...options,
  headers: {
    ...options.headers || {},
    Authorization: `Bearer ${token.accessToken}`,
  },
  params: {
    ...options.params || {},
    t: Date.now(), // Prevent from caching
  },
});

const repoRequest = (token, owner, repo, options) => request(token, {
  ...options,
  url: `https://gitlab.com/api/v4/projects/${encodeURIComponent(owner)}%2f${encodeURIComponent(repo)}/repository/${options.url}`,
})
  .then(res => res.body);

const getCommitMessage = (name, path) => {
  const message = store.getters['data/computedSettings'].github[name];
  return message.replace(/{{path}}/g, path);
};

export default {

  /**
   * https://docs.gitlab.com/ee/api/oauth2.html
   */

  async startOauth2(scopes, sub = null, silent = false) {
    const { code } = await networkSvc.startOauth2(
      'https://gitlab.com/oauth/authorize',
      {
        redirect_uri: constants.oauth2RedirectUri,
        response_type: 'code',
        client_id: clientId,
        scope: scopes.join(' '),
      },
      silent,
    );

    // Exchange code with token
    const accessToken = (await networkSvc.request({
      method: 'GET',
      url: 'oauth2/gitlabToken',
      params: {
        redirectUri: constants.oauth2RedirectUri,
        clientId,
        code,
      },
    })).body;

    // Call the user info endpoint
    const user = (await networkSvc.request({
      method: 'GET',
      url: 'https://gitlab.com/api/v4/user',
      params: {
        access_token: accessToken,
      },
    })).body;

    // Check the returned sub consistency
    if (sub && `${user.id}` !== sub) {
      throw new Error('GitLab account ID not expected.');
    }

    // Build token object including scopes and sub
    const token = {
      scopes,
      accessToken,
      name: user.name,
      sub: `${user.id}`,
      repoFullAccess: scopes.indexOf('api') !== -1,
    };

    // Add token to gitlab tokens
    store.dispatch('data/addGitlabToken', token);
    return token;
  },
  async addAccount(repoFullAccess = false) {
    return this.startOauth2(getScopes({ repoFullAccess }));
  },

  /**
   * https://docs.gitlab.com/ee/api/users.html#single-user
   */
  async getUser(userId) {
    const user = (await networkSvc.request({
      url: `https://gitlab.com/api/v4/users/${userId}`,
      params: {
        t: Date.now(), // Prevent from caching
      },
    })).body;

    // Add user info to the store
    store.commit('userInfo/addItem', {
      id: `gh:${user.id}`,
      name: user.name,
      imageUrl: user.avatar_url || '',
    });

    return user;
  },

  /**
   * https://docs.gitlab.com/ee/api/repositories.html#list-repository-tree
   */
  async getTree({
    token,
    owner,
    repo,
    branch,
  }) {
    const tree = await repoRequest(token, owner, repo, {
      url: `tree?ref=${encodeURIComponent(branch)}`,
    });

    return tree;
  },

  /**
   * https://docs.gitlab.com/ee/api/commits.html#list-repository-commits
   */
  async getCommits({
    token,
    owner,
    repo,
    branch,
    path,
  }) {
    return repoRequest(token, owner, repo, {
      url: 'commits',
      ref: branch,
      params: { path },
    });
  },

  /**
   * https://docs.gitlab.com/ee/api/repository_files.html#create-new-file-in-repository
   */
  async uploadFile({
    token,
    owner,
    repo,
    branch,
    path,
    content,
    lastCommitId,
  }) {
    return repoRequest(token, owner, repo, {
      method: lastCommitId ? 'PUT' : 'POST',
      url: `files/${encodeURIComponent(path)}`,
      body: {
        commit_message: getCommitMessage(lastCommitId ? 'updateFileMessage' : 'createFileMessage', path),
        content: utils.encodeBase64(content),
        encoding: 'base64',
        last_commit_id: lastCommitId,
        branch,
      },
    });
  },

  /**
   * https://docs.gitlab.com/ee/api/repository_files.html#delete-existing-file-in-repository
   */
  async removeFile({
    token,
    owner,
    repo,
    branch,
    path,
    lastCommitId,
  }) {
    return repoRequest(token, owner, repo, {
      method: 'DELETE',
      url: `files/${encodeURIComponent(path)}`,
      body: {
        commit_message: getCommitMessage('deleteFileMessage', path),
        last_commit_id: lastCommitId,
        branch,
      },
    });
  },

  /**
   * https://docs.gitlab.com/ee/api/repository_files.html#get-file-from-repository
   */
  async downloadFile({
    token,
    owner,
    repo,
    branch,
    path,
  }) {
    const { last_commit_id: lastCommitId, content } = await repoRequest(token, owner, repo, {
      url: `files/${encodeURIComponent(path)}`,
      params: { ref: branch },
    });
    return {
      lastCommitId,
      data: utils.decodeBase64(content),
    };
  },
};
