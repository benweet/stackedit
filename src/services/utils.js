import yaml from 'js-yaml';
import defaultProperties from '../data/defaultFileProperties.yml';

const workspaceId = 'main';
const origin = `${location.protocol}//${location.host}`;

// For uid()
const uidLength = 16;
const crypto = window.crypto || window.msCrypto;
const alphabet = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const radix = alphabet.length;
const array = new Uint32Array(uidLength);

// For isUserActive
const inactiveAfter = 2 * 60 * 1000; // 2 minutes
let lastActivity;
const setLastActivity = () => {
  lastActivity = Date.now();
};
window.document.addEventListener('mousedown', setLastActivity);
window.document.addEventListener('keydown', setLastActivity);
window.document.addEventListener('touchstart', setLastActivity);

// For isWindowFocused
let lastFocus;
const lastFocusKey = `${workspaceId}/lastWindowFocus`;
const setLastFocus = () => {
  lastFocus = Date.now();
  localStorage[lastFocusKey] = lastFocus;
  setLastActivity();
};
setLastFocus();
window.addEventListener('focus', setLastFocus);

// For addQueryParams()
const urlParser = window.document.createElement('a');

export default {
  workspaceId,
  origin,
  oauth2RedirectUri: `${origin}/oauth2/callback`,
  types: [
    'contentState',
    'syncedContent',
    'content',
    'file',
    'folder',
    'syncLocation',
    'publishLocation',
    'data',
  ],
  deepCopy(obj) {
    return obj == null ? obj : JSON.parse(JSON.stringify(obj));
  },
  serializeObject(obj) {
    return obj === undefined ? obj : JSON.stringify(obj, (key, value) => {
      if (Object.prototype.toString.call(value) !== '[object Object]') {
        return value;
      }
      // Sort keys to have a predictable result
      return Object.keys(value).sort().reduce((sorted, valueKey) => {
        sorted[valueKey] = value[valueKey];
        return sorted;
      }, {});
    });
  },
  uid() {
    crypto.getRandomValues(array);
    return array.cl_map(value => alphabet[value % radix]).join('');
  },
  hash(str) {
    let hash = 0;
    if (!str) return hash;
    for (let i = 0; i < str.length; i += 1) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char; // eslint-disable-line no-bitwise
      hash |= 0; // eslint-disable-line no-bitwise
    }
    return hash;
  },
  encodeBase64(str) {
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
      (match, p1) => String.fromCharCode(`0x${p1}`)));
  },
  decodeBase64(str) {
    return decodeURIComponent(atob(str).split('').map(
      c => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`).join(''));
  },
  computeProperties(yamlProperties) {
    const customProperties = yaml.safeLoad(yamlProperties);
    const properties = yaml.safeLoad(defaultProperties);
    const override = (obj, opt) => {
      const objType = Object.prototype.toString.call(obj);
      const optType = Object.prototype.toString.call(opt);
      if (objType !== optType) {
        return obj;
      } else if (objType !== '[object Object]') {
        return opt === undefined ? obj : opt;
      }
      Object.keys({
        ...obj,
        ...opt,
      }).forEach((key) => {
        obj[key] = override(obj[key], opt[key]);
      });
      return obj;
    };
    return override(properties, customProperties);
  },
  randomize(value) {
    return Math.floor((1 + (Math.random() * 0.2)) * value);
  },
  setInterval(func, interval) {
    return setInterval(() => func(), this.randomize(interval));
  },
  isWindowFocused() {
    return parseInt(localStorage[lastFocusKey], 10) === lastFocus;
  },
  isUserActive() {
    return lastActivity > Date.now() - inactiveAfter && this.isWindowFocused();
  },
  addQueryParams(url = '', params = {}) {
    const keys = Object.keys(params).filter(key => params[key] != null);
    if (!keys.length) {
      return url;
    }
    urlParser.href = url;
    if (urlParser.search) {
      urlParser.search += '&';
    } else {
      urlParser.search = '?';
    }
    urlParser.search += keys.map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`).join('&');
    return urlParser.href;
  },
};
