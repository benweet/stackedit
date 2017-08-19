import store from '../../store';
import googleHelper from '../helpers/googleHelper';

export default {
  downloadContent(token, fileId) {
    const syncData = store.getters['data/syncDataByItemId'][`${fileId}/content`];
    return googleHelper.downloadAppDataFile(token, syncData.id)
      .then((content) => {
        if (content.updated !== syncData.updated) {
          store.dispatch('data/setSyncData', {
            ...store.getters['data/syncData'],
            [syncData.id]: {
              ...syncData,
              updated: content.updated,
            },
          });
        }
        return {
          history: [],
          ...content,
        };
      });
  },
};
