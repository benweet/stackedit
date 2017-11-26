import googleHelper from './providers/helpers/googleHelper';
import store from '../store';

const promised = {};

export default {
  getInfo(userId) {
    if (!promised[userId]) {
      // Try to find a token with this sub
      const token = store.getters['data/googleTokens'][userId];
      if (token) {
        store.commit('userInfo/addItem', {
          id: userId,
          name: token.name,
        });
      }

      // Get user info from Google
      if (!store.state.offline) {
        promised[userId] = true;
        googleHelper.getUser(userId)
          .catch((err) => {
            if (err.status !== 404) {
              promised[userId] = false;
            }
          });
      }
    }
  },
};
