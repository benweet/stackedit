import networkSvc from '../../networkSvc';
import utils from '../../utils';
import store from '../../../store';
import userSvc from '../../userSvc';

const request = async (token, options = {}) => {
  const baseUrl = `${token.dbUrl}/`;
  const getLastToken = () => store.getters['data/couchdbTokensBySub'][token.sub];

  const assertUnauthorized = (err) => {
    if (err.status !== 401) {
      throw err;
    }
  };

  const onUnauthorized = async () => {
    try {
      const { name, password } = getLastToken();
      await networkSvc.request({
        method: 'POST',
        url: utils.resolveUrl(baseUrl, '../_session'),
        withCredentials: true,
        body: {
          name,
          password,
        },
      });
    } catch (err) {
      assertUnauthorized(err);
      await store.dispatch('modal/open', {
        type: 'couchdbCredentials',
        token: getLastToken(),
      });
      await onUnauthorized();
    }
  };

  const config = {
    ...options,
    headers: {
      Accept: 'application/json',
      ...options.headers || {},
    },
    url: utils.resolveUrl(baseUrl, options.path || '.'),
    withCredentials: true,
  };

  try {
    let res;
    try {
      res = await networkSvc.request(config);
    } catch (err) {
      assertUnauthorized(err);
      await onUnauthorized();
      res = await networkSvc.request(config);
    }
    return res.body;
  } catch (err) {
    if (err.status === 409) {
      throw new Error('TOO_LATE');
    }
    throw err;
  }
};

export default {

  /**
   * http://docs.couchdb.org/en/2.1.1/api/database/common.html#db
   */
  getDb(token) {
    return request(token);
  },

  /**
   * http://docs.couchdb.org/en/2.1.1/api/database/changes.html#db-changes
   */
  async getChanges(token, lastSeq) {
    const result = {
      changes: [],
      lastSeq,
    };

    const getPage = async () => {
      const body = await request(token, {
        method: 'GET',
        path: '_changes',
        params: {
          since: result.lastSeq || 0,
          include_docs: true,
          limit: 1000,
        },
      });
      result.changes = [...result.changes, ...body.results];
      result.lastSeq = body.last_seq;
      if (body.pending) {
        return getPage();
      }
      return result;
    };

    return getPage();
  },

  /**
   * http://docs.couchdb.org/en/2.1.1/api/database/common.html#post--db
   * http://docs.couchdb.org/en/2.1.1/api/document/common.html#put--db-docid
   */
  async uploadDocument({
    token,
    item,
    data = null,
    dataType = null,
    documentId = null,
    rev = null,
  }) {
    const options = {
      method: 'POST',
      body: { item, time: Date.now() },
    };
    const userId = userSvc.getCurrentUserId();
    if (userId) {
      options.body.sub = userId;
    }
    if (documentId) {
      options.method = 'PUT';
      options.path = documentId;
      options.body._rev = rev; // eslint-disable-line no-underscore-dangle
    }
    if (data) {
      options.body._attachments = { // eslint-disable-line no-underscore-dangle
        data: {
          content_type: dataType,
          data: utils.encodeBase64(data),
        },
      };
    }
    return request(token, options);
  },

  /**
   * http://docs.couchdb.org/en/2.1.1/api/document/common.html#delete--db-docid
   */
  async removeDocument(token, documentId, rev) {
    if (!documentId) {
      // Prevent from deleting the whole database
      throw new Error('Missing document ID');
    }

    return request(token, {
      method: 'DELETE',
      path: documentId,
      params: { rev },
    });
  },

  /**
   * http://docs.couchdb.org/en/2.1.1/api/document/common.html#get--db-docid
   */
  async retrieveDocument(token, documentId, rev) {
    return request(token, {
      path: documentId,
      params: { rev },
    });
  },

  /**
   * http://docs.couchdb.org/en/2.1.1/api/document/common.html#get--db-docid
   */
  async retrieveDocumentWithAttachments(token, documentId, rev) {
    const body = await request(token, {
      path: documentId,
      params: { attachments: true, rev },
    });
    body.attachments = {};
    // eslint-disable-next-line no-underscore-dangle
    Object.entries(body._attachments).forEach(([name, attachment]) => {
      body.attachments[name] = utils.decodeBase64(attachment.data);
    });
    return body;
  },

  /**
   * http://docs.couchdb.org/en/2.1.1/api/document/common.html#get--db-docid
   */
  async retrieveDocumentWithRevisions(token, documentId) {
    return request(token, {
      path: documentId,
      params: {
        revs_info: true,
      },
    });
  },
};
