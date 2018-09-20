import store from '../store';

const infoPromisesByUserId = {};
const infoResolversByType = {};
const subPrefixesByType = {};
const typesBySubPrefix = {};

const parseUserId = (userId) => {
  const prefix = userId[2] === ':' && userId.slice(0, 2);
  const type = typesBySubPrefix[prefix];
  return type ? [type, userId.slice(3)] : ['google', userId];
};


export default {
  setInfoResolver(type, subPrefix, resolver) {
    infoResolversByType[type] = resolver;
    subPrefixesByType[type] = subPrefix;
    typesBySubPrefix[subPrefix] = type;
  },
  getCurrentUserId() {
    const loginToken = store.getters['workspace/loginToken'];
    if (!loginToken) {
      return null;
    }
    const loginType = store.getters['workspace/loginType'];
    const prefix = subPrefixesByType[loginType];
    return prefix ? `${prefix}:${loginToken.sub}` : loginToken.sub;
  },
  addInfo(info) {
    infoPromisesByUserId[info.id] = Promise.resolve(info);
    store.commit('userInfo/addItem', info);
  },
  async getInfo(userId) {
    if (!userId) {
      return {};
    }

    let infoPromise = infoPromisesByUserId[userId];
    if (infoPromise) {
      return infoPromise;
    }

    const [type, sub] = parseUserId(userId);

    // Try to find a token with this sub to resolve name as soon as possible
    const token = store.getters['data/tokensByType'][type][sub];
    if (token) {
      store.commit('userInfo/addItem', {
        id: userId,
        name: token.name,
      });
    }

    if (store.state.offline) {
      return {};
    }

    // Get user info from helper
    infoPromise = new Promise(async (resolve) => {
      const infoResolver = infoResolversByType[type];
      if (infoResolver) {
        try {
          const userInfo = await infoResolver(sub);
          this.addInfo(userInfo);
          resolve(userInfo);
        } catch (err) {
          if (err && err.message === 'RETRY') {
            infoPromisesByUserId[userId] = null;
          }
          resolve({});
        }
      }
    });

    infoPromisesByUserId[userId] = infoPromise;
    return infoPromise;
  },
};
