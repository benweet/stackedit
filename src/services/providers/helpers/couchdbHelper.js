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
    url: utils.resolveUrl(baseUrl, options.path || '.'),
    withCredentials: true,
  };

  return networkSvc.request(config)
    .catch(ifUnauthorized(() => onUnauthorized()
      .then(() => networkSvc.request(config))));
};

export default {
  getDb(token) {
    return request(token)
      .then(res => res.body);
  },
  getChanges() {

  },
};
