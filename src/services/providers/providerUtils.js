import emptyContent from '../../data/emptyContent';

const dataExtractor = /<!--stackedit_data:([A-Za-z0-9+/=\s]+)-->$/;

// https://developer.mozilla.org/en/docs/Web/API/WindowBase64/Base64_encoding_and_decoding
const b64Encode = str => btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
  (match, p1) => String.fromCharCode(`0x${p1}`)));
const b64Decode = str => decodeURIComponent(atob(str).split('').map(
  c => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`).join(''));

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
      const serializedData = b64Encode(JSON.stringify(data)).replace(/(.{50})/g, '$1\n');
      result += `<!--stackedit_data:\n${serializedData}\n-->`;
    }
    return result;
  },
  parseContent(serializedContent) {
    const result = emptyContent();
    result.text = serializedContent;
    result.history = [];
    const extractedData = dataExtractor.exec(serializedContent);
    if (extractedData) {
      try {
        const serializedData = extractedData[1].replace(/\s/g, '');
        Object.assign(result, JSON.parse(b64Decode(serializedData)));
        result.text = serializedContent.slice(0, extractedData.index);
      } catch (e) {
        // Ignore
      }
    }
    return result;
  },
};
