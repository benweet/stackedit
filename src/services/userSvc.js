import store from '../store';
import utils from './utils';

const refreshUserInfoAfter = 60 * 60 * 1000; // 60 minutes

const infoResolversByType = {};
const subPrefixesByType = {};
const typesBySubPrefix = {};

const lastInfosByUserId = {};
const infoPromisedByUserId = {};

const sanitizeUserId = (userId) => {
  const prefix = userId[2] === ':' && userId.slice(0, 2);
  if (typesBySubPrefix[prefix]) {
    return userId;
  }
  return `go:${userId}`;
};

const parseUserId = userId => [typesBySubPrefix[userId.slice(0, 2)], userId.slice(3)];

const refreshUserInfos = () => {
  if (store.state.offline) {
    return;
  }

  Object.entries(lastInfosByUserId)
    .filter(([userId, lastInfo]) => lastInfo === 0 && !infoPromisedByUserId[userId])
    .forEach(async ([userId]) => {
      const [type, sub] = parseUserId(userId);
      const infoResolver = infoResolversByType[type];
      if (infoResolver) {
        try {
          infoPromisedByUserId[userId] = true;
          const userInfo = await infoResolver(sub);
          store.commit('userInfo/setItem', userInfo);
        } finally {
          infoPromisedByUserId[userId] = false;
          lastInfosByUserId[userId] = Date.now();
        }
      }
    });
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
  sanitizeUserId,
  addUserInfo(userInfo) {
    store.commit('userInfo/setItem', userInfo);
    lastInfosByUserId[userInfo.id] = Date.now();
  },
  addUserId(userId) {
    if (userId) {
      const sanitizedUserId = sanitizeUserId(userId);
      const lastInfo = lastInfosByUserId[sanitizedUserId];
      if (lastInfo === undefined) {
        // Try to find a token with this sub to resolve name as soon as possible
        const [type, sub] = parseUserId(sanitizedUserId);
        const token = store.getters['data/tokensByType'][type][sub];
        if (token) {
          store.commit('userInfo/setItem', {
            id: sanitizedUserId,
            name: token.name,
          });
        }
      }

      if (lastInfo === undefined || lastInfo + refreshUserInfoAfter < Date.now()) {
        lastInfosByUserId[sanitizedUserId] = 0;
        refreshUserInfos();
      }
    }
  },
};

// Get user info periodically
utils.setInterval(() => refreshUserInfos(), 60 * 1000);
