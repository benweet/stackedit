import utils from '../../utils';
import networkSvc from '../../networkSvc';
import store from '../../../store';
import userSvc from '../../userSvc';
import badgeSvc from '../../badgeSvc';

const request = ({ accessToken, serverUrl }, options) => networkSvc.request({
  ...options,
  url: `${serverUrl}/api/v4/${options.url}`,
  headers: {
    ...options.headers || {},
    Authorization: `Bearer ${accessToken}`,
  },
})
  .then(res => res.body);

const getCommitMessage = (name, path) => {
  const message = store.getters['data/computedSettings'].git[name];
  return message.replace(/{{path}}/g, path);
};

/**
 * https://docs.gitlab.com/ee/api/users.html#for-user
 */
const subPrefix = 'gl';
userSvc.setInfoResolver('gitlab', subPrefix, async (sub) => {
  try {
    const [, serverUrl, id] = sub.match(/^(.+)\/([^/]+)$/);
    const user = (await networkSvc.request({
      url: `${serverUrl}/api/v4/users/${id}`,
    })).body;
    const uniqueSub = `${serverUrl}/${user.id}`;

    return {
      id: `${subPrefix}:${uniqueSub}`,
      name: user.username,
      imageUrl: user.avatar_url || '',
    };
  } catch (err) {
    if (err.status !== 404) {
      throw new Error('RETRY');
    }
    throw err;
  }
});

export default {
  subPrefix,

  /**
   * https://docs.gitlab.com/ee/api/oauth2.html
   */
  async startOauth2(serverUrl, applicationId, sub = null, silent = false) {
    // Get an OAuth2 code
    const { accessToken } = await networkSvc.startOauth2(
      `${serverUrl}/oauth/authorize`,
      {
        client_id: applicationId,
        response_type: 'token',
        scope: 'api',
      },
      silent,
    );

    // Call the user info endpoint
    const user = await request({ accessToken, serverUrl }, {
      url: 'user',
    });
    const uniqueSub = `${serverUrl}/${user.id}`;
    userSvc.addUserInfo({
      id: `${subPrefix}:${uniqueSub}`,
      name: user.username,
      imageUrl: user.avatar_url || '',
    });

    // Check the returned sub consistency
    if (sub && uniqueSub !== sub) {
      throw new Error('GitLab account ID not expected.');
    }

    // Build token object including scopes and sub
    const token = {
      accessToken,
      name: user.username,
      serverUrl,
      sub: uniqueSub,
    };

    // Add token to gitlab tokens
    store.dispatch('data/addGitlabToken', token);
    return token;
  },
  async addAccount(serverUrl, applicationId, sub = null) {
    const token = await this.startOauth2(serverUrl, applicationId, sub);
    badgeSvc.addBadge('addGitLabAccount');
    return token;
  },

  /**
   * https://docs.gitlab.com/ee/api/projects.html#get-single-project
   */
  async getProjectId(token, { projectPath, projectId }) {
    if (projectId) {
      return projectId;
    }

    const project = await request(token, {
      url: `projects/${encodeURIComponent(projectPath)}`,
    });
    return project.id;
  },

  /**
   * https://docs.gitlab.com/ee/api/repositories.html#list-repository-tree
   */
  async getTree({
    token,
    projectId,
    branch,
  }) {
    return request(token, {
      url: `projects/${encodeURIComponent(projectId)}/repository/tree`,
      params: {
        ref: branch,
        recursive: true,
        per_page: 9999,
      },
    });
  },

  /**
   * https://docs.gitlab.com/ee/api/commits.html#list-repository-commits
   */
  async getCommits({
    token,
    projectId,
    branch,
    path,
  }) {
    return request(token, {
      url: `projects/${encodeURIComponent(projectId)}/repository/commits`,
      params: {
        ref_name: branch,
        path,
      },
    });
  },

  /**
   * https://docs.gitlab.com/ee/api/repository_files.html#create-new-file-in-repository
   * https://docs.gitlab.com/ee/api/repository_files.html#update-existing-file-in-repository
   */
  async uploadFile({
    token,
    projectId,
    branch,
    path,
    content,
    sha,
  }) {
    return request(token, {
      method: sha ? 'PUT' : 'POST',
      url: `projects/${encodeURIComponent(projectId)}/repository/files/${encodeURIComponent(path)}`,
      body: {
        commit_message: getCommitMessage(sha ? 'updateFileMessage' : 'createFileMessage', path),
        content,
        last_commit_id: sha,
        branch,
      },
    });
  },

  /**
   * https://docs.gitlab.com/ee/api/repository_files.html#delete-existing-file-in-repository
   */
  async removeFile({
    token,
    projectId,
    branch,
    path,
    sha,
  }) {
    return request(token, {
      method: 'DELETE',
      url: `projects/${encodeURIComponent(projectId)}/repository/files/${encodeURIComponent(path)}`,
      body: {
        commit_message: getCommitMessage('deleteFileMessage', path),
        last_commit_id: sha,
        branch,
      },
    });
  },

  /**
   * https://docs.gitlab.com/ee/api/repository_files.html#get-file-from-repository
   */
  async downloadFile({
    token,
    projectId,
    branch,
    path,
  }) {
    const res = await request(token, {
      url: `projects/${encodeURIComponent(projectId)}/repository/files/${encodeURIComponent(path)}`,
      params: { ref: branch },
    });
    return {
      sha: res.last_commit_id,
      data: utils.decodeBase64(res.content),
    };
  },
};
