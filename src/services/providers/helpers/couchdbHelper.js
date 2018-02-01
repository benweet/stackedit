import networkSvc from '../../networkSvc';
import utils from '../../utils';
import store from '../../../store';

const request = (token, options = {}) => {
  const baseUrl = `${token.dbUrl}/`;
  const getLastToken = () => store.getters['data/couchdbTokens'][token.sub];

  const ifUnauthorized = cb => (err) => {
    if (err.status !== 401) {
      throw err;
    }
    return cb(err);
  };

  const onUnauthorized = () => networkSvc.request({
    method: 'POST',
    url: utils.resolveUrl(baseUrl, '../_session'),
    withCredentials: true,
    body: {
      name: getLastToken().name,
      password: getLastToken().password,
    },
  })
    .catch(ifUnauthorized(() => store.dispatch('modal/open', {
      type: 'couchdbCredentials',
      token: getLastToken(),
    })
      .then(onUnauthorized)));

  const config = {
    ...options,
    headers: {
      Accept: 'application/json',
      ...options.headers || {},
    },
    url: utils.resolveUrl(baseUrl, options.path || '.'),
    withCredentials: true,
  };

  return networkSvc.request(config)
    .catch(ifUnauthorized(() => onUnauthorized()
      .then(() => networkSvc.request(config))))
    .then(res => res.body)
    .catch((err) => {
      if (err.status === 409) {
        throw new Error('TOO_LATE');
      }
      throw err;
    });
};

export default {
  getDb(token) {
    return request(token);
  },
  getChanges(token, lastSeq) {
    const result = {
      changes: [],
    };

    const getPage = (since = 0) => request(token, {
      method: 'GET',
      path: '_changes',
      params: {
        since,
        include_docs: true,
        limit: 1000,
      },
    })
      .then((body) => {
        result.changes = result.changes.concat(body.results);
        if (body.pending) {
          return getPage(body.last_seq);
        }
        result.lastSeq = body.last_seq;
        return result;
      });

    return getPage(lastSeq);
  },
  uploadDocument(
    token,
    item,
    data = null,
    dataType = null,
    documentId = null,
    rev = null,
  ) {
    const options = {
      method: 'POST',
      body: { item, time: Date.now() },
    };
    const loginToken = store.getters['workspace/loginToken'];
    if (loginToken) {
      options.body.sub = loginToken.sub;
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
  removeDocument(token, documentId, rev) {
    return request(token, {
      method: 'DELETE',
      path: documentId,
      params: { rev },
    });
  },
  retrieveDocument(token, documentId, rev) {
    return request(token, {
      path: documentId,
      params: { rev },
    });
  },
  retrieveDocumentWithAttachments(token, documentId, rev) {
    return request(token, {
      path: documentId,
      params: { attachments: true, rev },
    })
      .then((body) => {
        body.attachments = {};
        // eslint-disable-next-line no-underscore-dangle
        Object.entries(body._attachments).forEach(([name, attachment]) => {
          body.attachments[name] = utils.decodeBase64(attachment.data);
        });
        return body;
      });
  },
  retrieveDocumentWithRevisions(token, documentId) {
    return request(token, {
      path: documentId,
      params: {
        revs_info: true,
      },
    });
  },
};
