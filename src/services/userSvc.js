import googleHelper from './providers/helpers/googleHelper';
import githubHelper from './providers/helpers/githubHelper';
import store from '../store';
import dropboxHelper from './providers/helpers/dropboxHelper';
import constants from '../data/constants';

const promised = {};

const parseUserId = (userId) => {
  const prefix = userId[2] === ':' && userId.slice(0, 2);
  const type = prefix && constants.userIdPrefixes[prefix];
  return type ? [type, userId.slice(3)] : ['google', userId];
};

export default {
  addInfo({ id, name, imageUrl }) {
    promised[id] = true;
    store.commit('userInfo/addItem', { id, name, imageUrl });
  },
  async getInfo(userId) {
    if (userId && !promised[userId]) {
      const [type, sub] = parseUserId(userId);

      // Try to find a token with this sub
      const token = store.getters[`data/${type}TokensBySub`][sub];
      if (token) {
        store.commit('userInfo/addItem', {
          id: userId,
          name: token.name,
        });
      }

      // Get user info from provider
      if (!store.state.offline) {
        promised[userId] = true;
        switch (type) {
          case 'dropbox': {
            const dropboxToken = Object.values(store.getters['data/dropboxTokensBySub'])[0];
            try {
              await dropboxHelper.getAccount(dropboxToken, sub);
            } catch (err) {
              if (!token || err.status !== 404) {
                promised[userId] = false;
              }
            }
            break;
          }
          case 'github':
            try {
              await githubHelper.getUser(sub);
            } catch (err) {
              if (err.status !== 404) {
                promised[userId] = false;
              }
            }
            break;
          case 'google':
          default:
            try {
              await googleHelper.getUser(sub);
            } catch (err) {
              if (err.status !== 404) {
                promised[userId] = false;
              }
            }
        }
      }
    }
  },
};
