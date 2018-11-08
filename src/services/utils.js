import yaml from 'js-yaml';
import '../libs/clunderscore';
import presets from '../data/presets';
import constants from '../data/constants';

// For utils.uid()
const uidLength = 16;
const crypto = window.crypto || window.msCrypto;
const alphabet = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const radix = alphabet.length;
const array = new Uint32Array(uidLength);

// For utils.parseQueryParams()
const parseQueryParams = (params) => {
  const result = {};
  params.split('&').forEach((param) => {
    const [key, value] = param.split('=').map(decodeURIComponent);
    if (key && value != null) {
      result[key] = value;
    }
  });
  return result;
};

// For utils.setQueryParams()
const filterParams = (params = {}) => {
  const result = {};
  Object.entries(params).forEach(([key, value]) => {
    if (key && value != null) {
      result[key] = value;
    }
  });
  return result;
};

// For utils.computeProperties()
const deepOverride = (obj, opt) => {
  if (obj === undefined) {
    return opt;
  }
  const objType = Object.prototype.toString.call(obj);
  const optType = Object.prototype.toString.call(opt);
  if (objType !== optType) {
    return obj;
  }
  if (objType !== '[object Object]') {
    return opt === undefined ? obj : opt;
  }
  Object.keys({
    ...obj,
    ...opt,
  }).forEach((key) => {
    obj[key] = deepOverride(obj[key], opt[key]);
  });
  return obj;
};

// For utils.addQueryParams()
const urlParser = document.createElement('a');

const deepCopy = (obj) => {
  if (obj == null) {
    return obj;
  }
  return JSON.parse(JSON.stringify(obj));
};

// Compute presets
const computedPresets = {};
Object.keys(presets).forEach((key) => {
  let preset = deepCopy(presets[key][0]);
  if (presets[key][1]) {
    preset = deepOverride(preset, presets[key][1]);
  }
  computedPresets[key] = preset;
});

export default {
  computedPresets,
  queryParams: parseQueryParams(window.location.hash.slice(1)),
  setQueryParams(params = {}) {
    this.queryParams = filterParams(params);
    const serializedParams = Object.entries(this.queryParams).map(([key, value]) =>
      `${encodeURIComponent(key)}=${encodeURIComponent(value)}`).join('&');
    const hash = `#${serializedParams}`;
    if (window.location.hash !== hash) {
      window.location.replace(hash);
    }
  },
  sanitizeText(text) {
    const result = `${text || ''}`.slice(0, constants.textMaxLength);
    // last char must be a `\n`.
    return `${result}\n`.replace(/\n\n$/, '\n');
  },
  sanitizeName(name) {
    return `${name || ''}`
      // Keep only 250 characters
      .slice(0, 250) || constants.defaultName;
  },
  sanitizeFilename(name) {
    return this.sanitizeName(`${name || ''}`
      // Replace `/`, control characters and other kind of spaces with a space
      .replace(/[/\x00-\x1F\x7f-\xa0\s]+/g, ' ') // eslint-disable-line no-control-regex
      .trim()) || constants.defaultName;
  },
  deepCopy,
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
  search(items, criteria) {
    let result;
    items.some((item) => {
      // If every field fits the criteria
      if (Object.entries(criteria).every(([key, value]) => value === item[key])) {
        result = item;
      }
      return result;
    });
    return result;
  },
  uid() {
    crypto.getRandomValues(array);
    return array.cl_map(value => alphabet[value % radix]).join('');
  },
  hash(str) {
    // https://stackoverflow.com/a/7616484/1333165
    let hash = 0;
    if (!str) return hash;
    for (let i = 0; i < str.length; i += 1) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char; // eslint-disable-line no-bitwise
      hash |= 0; // eslint-disable-line no-bitwise
    }
    return hash;
  },
  getItemHash(item) {
    return this.hash(this.serializeObject({
      ...item,
      // These properties must not be part of the hash
      id: undefined,
      hash: undefined,
      history: undefined,
    }));
  },
  addItemHash(item) {
    return {
      ...item,
      hash: this.getItemHash(item),
    };
  },
  makeWorkspaceId(params) {
    return Math.abs(this.hash(this.serializeObject(params))).toString(36);
  },
  getDbName(workspaceId) {
    let dbName = 'stackedit-db';
    if (workspaceId !== 'main') {
      dbName += `-${workspaceId}`;
    }
    return dbName;
  },
  encodeBase64(str, urlSafe = false) {
    const uriEncodedStr = encodeURIComponent(str);
    const utf8Str = uriEncodedStr.replace(
      /%([0-9A-F]{2})/g,
      (match, p1) => String.fromCharCode(`0x${p1}`),
    );
    const result = btoa(utf8Str);
    if (!urlSafe) {
      return result;
    }
    return result
      .replace(/\//g, '_') // Replace `/` with `_`
      .replace(/\+/g, '-') // Replace `+` with `-`
      .replace(/=+$/, ''); // Remove trailing `=`
  },
  decodeBase64(str) {
    // In case of URL safe base64
    const sanitizedStr = str.replace(/_/g, '/').replace(/-/g, '+');
    const utf8Str = atob(sanitizedStr);
    const uriEncodedStr = utf8Str
      .split('')
      .map(c => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
      .join('');
    return decodeURIComponent(uriEncodedStr);
  },
  computeProperties(yamlProperties) {
    let properties = {};
    try {
      properties = yaml.safeLoad(yamlProperties) || {};
    } catch (e) {
      // Ignore
    }
    const extensions = properties.extensions || {};
    const computedPreset = deepCopy(computedPresets[extensions.preset] || computedPresets.default);
    const computedExtensions = deepOverride(computedPreset, properties.extensions);
    computedExtensions.preset = extensions.preset;
    properties.extensions = computedExtensions;
    return properties;
  },
  randomize(value) {
    return Math.floor((1 + (Math.random() * 0.2)) * value);
  },
  setInterval(func, interval) {
    return setInterval(() => func(), this.randomize(interval));
  },
  async awaitSequence(values, asyncFunc) {
    const results = [];
    const valuesLeft = values.slice().reverse();
    const runWithNextValue = async () => {
      if (!valuesLeft.length) {
        return results;
      }
      results.push(await asyncFunc(valuesLeft.pop()));
      return runWithNextValue();
    };
    return runWithNextValue();
  },
  async awaitSome(asyncFunc) {
    if (await asyncFunc()) {
      return this.awaitSome(asyncFunc);
    }
    return null;
  },
  someResult(values, func) {
    let result;
    values.some((value) => {
      result = func(value);
      return result;
    });
    return result;
  },
  parseQueryParams,
  addQueryParams(url = '', params = {}, hash = false) {
    const keys = Object.keys(params).filter(key => params[key] != null);
    urlParser.href = url;
    if (!keys.length) {
      return urlParser.href;
    }
    const serializedParams = keys.map(key =>
      `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`).join('&');
    if (hash) {
      if (urlParser.hash) {
        urlParser.hash += '&';
      } else {
        urlParser.hash = '#';
      }
      urlParser.hash += serializedParams;
    } else {
      if (urlParser.search) {
        urlParser.search += '&';
      } else {
        urlParser.search = '?';
      }
      urlParser.search += serializedParams;
    }
    return urlParser.href;
  },
  resolveUrl(baseUrl, path) {
    const oldBaseElt = document.getElementsByTagName('base')[0];
    const oldHref = oldBaseElt && oldBaseElt.href;
    const newBaseElt = oldBaseElt || document.head.appendChild(document.createElement('base'));
    newBaseElt.href = baseUrl;
    urlParser.href = path;
    const result = urlParser.href;
    if (oldBaseElt) {
      oldBaseElt.href = oldHref;
    } else {
      document.head.removeChild(newBaseElt);
    }
    return result;
  },
  getHostname(url) {
    urlParser.href = url;
    return urlParser.hostname;
  },
  encodeUrlPath(path) {
    return path ? path.split('/').map(encodeURIComponent).join('/') : '';
  },
  parseGithubRepoUrl(url) {
    const parsedRepo = url && url.match(/([^/:]+)\/([^/]+?)(?:\.git|\/)?$/);
    return parsedRepo && {
      owner: parsedRepo[1],
      repo: parsedRepo[2],
    };
  },
  parseGitlabProjectPath(url) {
    const parsedProject = url && url.match(/^https:\/\/[^/]+\/(.+?)(?:\.git|\/)?$/);
    return parsedProject && parsedProject[1];
  },
  createHiddenIframe(url) {
    const iframeElt = document.createElement('iframe');
    iframeElt.style.position = 'absolute';
    iframeElt.style.left = '-99px';
    iframeElt.style.width = '1px';
    iframeElt.style.height = '1px';
    iframeElt.src = url;
    return iframeElt;
  },
  wrapRange(range, eltProperties) {
    const rangeLength = `${range}`.length;
    let wrappedLength = 0;
    const treeWalker = document
      .createTreeWalker(range.commonAncestorContainer, NodeFilter.SHOW_TEXT);
    let { startOffset } = range;
    treeWalker.currentNode = range.startContainer;
    if (treeWalker.currentNode.nodeType === Node.TEXT_NODE || treeWalker.nextNode()) {
      do {
        if (treeWalker.currentNode.nodeValue !== '\n') {
          if (treeWalker.currentNode === range.endContainer &&
            range.endOffset < treeWalker.currentNode.nodeValue.length
          ) {
            treeWalker.currentNode.splitText(range.endOffset);
          }
          if (startOffset) {
            treeWalker.currentNode = treeWalker.currentNode.splitText(startOffset);
            startOffset = 0;
          }
          const elt = document.createElement('span');
          Object.entries(eltProperties).forEach(([key, value]) => {
            elt[key] = value;
          });
          treeWalker.currentNode.parentNode.insertBefore(elt, treeWalker.currentNode);
          elt.appendChild(treeWalker.currentNode);
        }
        wrappedLength += treeWalker.currentNode.nodeValue.length;
        if (wrappedLength >= rangeLength) {
          break;
        }
      }
      while (treeWalker.nextNode());
    }
  },
  unwrapRange(eltCollection) {
    Array.prototype.slice.call(eltCollection).forEach((elt) => {
      // Loop in case another wrapper has been added inside
      for (let child = elt.firstChild; child; child = elt.firstChild) {
        if (child.nodeType === 3) {
          if (elt.previousSibling && elt.previousSibling.nodeType === 3) {
            child.nodeValue = elt.previousSibling.nodeValue + child.nodeValue;
            elt.parentNode.removeChild(elt.previousSibling);
          }
          if (!child.nextSibling && elt.nextSibling && elt.nextSibling.nodeType === 3) {
            child.nodeValue += elt.nextSibling.nodeValue;
            elt.parentNode.removeChild(elt.nextSibling);
          }
        }
        elt.parentNode.insertBefore(child, elt);
      }
      elt.parentNode.removeChild(elt);
    });
  },
};
