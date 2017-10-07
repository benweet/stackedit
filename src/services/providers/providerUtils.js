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
  parseContent(serializedContent, syncLocation) {
    const result = utils.deepCopy(store.state.content.itemMap[`${syncLocation.fileId}/content`]) || emptyContent();
    result.text = serializedContent;
    result.history = [];
    const extractedData = dataExtractor.exec(serializedContent);
    if (extractedData) {
      try {
        const serializedData = extractedData[1].replace(/\s/g, '');
        Object.assign(result, JSON.parse(utils.decodeBase64(serializedData)));
        result.text = serializedContent.slice(0, extractedData.index);
      } catch (e) {
        // Ignore
      }
    }
    result.hash = utils.hash(utils.serializeObject({
      ...result,
      hash: undefined,
    }));
    return result;
  },
};
