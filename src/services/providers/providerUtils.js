import emptyContent from '../../data/emptyContent';
import store from '../../store';
import utils from '../utils';

const dataExtractor = /<!--stackedit_data:([A-Za-z0-9+/=\s]+)-->$/;

export default {
  serializeContent(content) {
    let result = content.text;
    const data = {};
    if (content.properties.length > 1) {
      data.properties = content.properties;
    }
    if (Object.keys(content.discussions).length) {
      data.discussions = content.discussions;
    }
    if (Object.keys(content.comments).length) {
      data.comments = content.comments;
    }
    if (content.history && content.history.length) {
      data.history = content.history;
    }
    if (Object.keys(data).length) {
      const serializedData = utils.encodeBase64(JSON.stringify(data)).replace(/(.{50})/g, '$1\n');
      result += `<!--stackedit_data:\n${serializedData}\n-->`;
    }
    return result;
  },
  parseContent(serializedContent, id) {
    const result = utils.deepCopy(store.state.content.itemMap[id]) || emptyContent(id);
    result.text = utils.sanitizeText(serializedContent);
    result.history = [];
    const extractedData = dataExtractor.exec(serializedContent);
    if (extractedData) {
      try {
        const serializedData = extractedData[1].replace(/\s/g, '');
        const parsedData = JSON.parse(utils.decodeBase64(serializedData));
        result.text = utils.sanitizeText(serializedContent.slice(0, extractedData.index));
        if (parsedData.properties) {
          result.properties = utils.sanitizeText(parsedData.properties);
        }
        if (parsedData.discussions) {
          result.discussions = parsedData.discussions;
        }
        if (parsedData.comments) {
          result.comments = parsedData.comments;
        }
        result.history = parsedData.history || [];
      } catch (e) {
        // Ignore
      }
    }
    return utils.addItemHash(result);
  },
  /**
   * Find and open a file location that fits the criteria
   */
  openFileWithLocation(allLocations, criteria) {
    return allLocations.some((location) => {
      // If every field fits the criteria
      if (Object.entries(criteria).every(([key, value]) => value === location[key])) {
        // Found one location that fits, open it if it exists
        const file = store.state.file.itemMap[location.fileId];
        if (file) {
          store.commit('file/setCurrentId', file.id);
          // If file is in the trash, restore it
          if (file.parentId === 'trash') {
            store.commit('file/patchItem', {
              ...file,
              parentId: null,
            });
          }
          return true;
        }
      }
      return false;
    });
  },
};
