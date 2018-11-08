import providerRegistry from './providerRegistry';
import emptyContent from '../../../data/empties/emptyContent';
import utils from '../../utils';
import store from '../../../store';
import workspaceSvc from '../../workspaceSvc';

const dataExtractor = /<!--stackedit_data:([A-Za-z0-9+/=\s]+)-->\s*$/;

export default class Provider {
  prepareChanges = changes => changes
  onChangesApplied = () => {}

  constructor(props) {
    Object.assign(this, props);
    providerRegistry.register(this);
  }

  /**
   * Serialize content in a self contain Markdown compatible format
   */
  static serializeContent(content) {
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
  }

  /**
   * Parse content serialized with serializeContent()
   */
  static parseContent(serializedContent, id) {
    let text = serializedContent;
    const extractedData = dataExtractor.exec(serializedContent);
    let result;
    if (!extractedData) {
      // In case stackedit's data has been manually removed, try to restore them
      result = utils.deepCopy(store.state.content.itemsById[id]) || emptyContent(id);
    } else {
      result = emptyContent(id);
      try {
        const serializedData = extractedData[1].replace(/\s/g, '');
        const parsedData = JSON.parse(utils.decodeBase64(serializedData));
        text = text.slice(0, extractedData.index);
        if (parsedData.properties) {
          result.properties = utils.sanitizeText(parsedData.properties);
        }
        if (parsedData.discussions) {
          result.discussions = parsedData.discussions;
        }
        if (parsedData.comments) {
          result.comments = parsedData.comments;
        }
        result.history = parsedData.history;
      } catch (e) {
        // Ignore
      }
    }
    result.text = utils.sanitizeText(text);
    if (!result.history) {
      result.history = [];
    }
    return utils.addItemHash(result);
  }

  /**
   * Find and open a file with location that meets the criteria
   */
  static openFileWithLocation(criteria) {
    const location = utils.search(store.getters['syncLocation/items'], criteria);
    if (location) {
      // Found one, open it if it exists
      const item = store.state.file.itemsById[location.fileId];
      if (item) {
        store.commit('file/setCurrentId', item.id);
        // If file is in the trash, restore it
        if (item.parentId === 'trash') {
          workspaceSvc.setOrPatchItem({
            ...item,
            parentId: null,
          });
        }
        return true;
      }
    }
    return false;
  }
}
