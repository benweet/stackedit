import DiffMatchPatch from 'diff-match-patch';
import utils from './utils';

const diffMatchPatch = new DiffMatchPatch();
const diffMatchPatchStrict = new DiffMatchPatch();
diffMatchPatchStrict.Match_Threshold = 0;
diffMatchPatchStrict.Patch_DeleteThreshold = 0;
const diffMatchPatchPermissive = new DiffMatchPatch();
diffMatchPatchPermissive.Match_Distance = 999999999;

function makePatchableText(content, markerKeys, markerIdxMap) {
  const markers = [];
  // Sort keys to have predictable marker positions in case of same offset
  const discussionKeys = Object.keys(content.discussions).sort();
  discussionKeys.forEach((discussionId) => {
    const discussion = content.discussions[discussionId];

    function addMarker(offsetName) {
      const markerKey = discussionId + offsetName;
      if (discussion[offsetName] !== undefined) {
        let idx = markerIdxMap[markerKey];
        if (idx === undefined) {
          idx = markerKeys.length;
          markerIdxMap[markerKey] = idx;
          markerKeys.push({
            id: discussionId,
            offsetName,
          });
        }
        markers.push({
          idx,
          offset: discussion[offsetName],
        });
      }
    }

    if (discussion.offset0 === discussion.offset1) {
      // Remove discussion offsets if markers are at the same position
      discussion.offset0 = undefined;
      discussion.offset1 = undefined;
    } else {
      addMarker('offset0');
      addMarker('offset1');
    }
  });

  let lastOffset = 0;
  let result = '';
  markers
    .sort((marker1, marker2) => marker1.offset - marker2.offset)
    .forEach((marker) => {
      result +=
        content.text.slice(lastOffset, marker.offset) +
        String.fromCharCode(0xe000 + marker.idx); // Use a character from the private use area
      lastOffset = marker.offset;
    });
  return result + content.text.slice(lastOffset);
}

function stripDiscussionOffsets(objectMap) {
  const result = {};
  Object.keys(objectMap).forEach((id) => {
    result[id] = {
      text: objectMap[id].text,
    };
  });
  return result;
}

function restoreDiscussionOffsets(content, markerKeys) {
  const len = content.text.length;
  const maxIdx = markerKeys.length;
  for (let i = 0; i < len; i += 1) {
    const idx = content.text.charCodeAt(i) - 0xe000;
    if (idx >= 0 && idx < maxIdx) {
      const markerKey = markerKeys[idx];
      content.text = content.text.slice(0, i) + content.text.slice(i + 1);
      const discussion = content.discussions[markerKey.id];
      if (discussion) {
        discussion[markerKey.offsetName] = i;
      }
      // We just removed the current character, we may have multiple markers with same offset
      i -= 1;
    }
  }
}

function serializeObject(obj) {
  if (!obj) {
    return obj;
  }
  return JSON.stringify(obj, (key, value) => {
    if (Object.prototype.toString.call(value) !== '[object Object]') {
      return value;
    }
    return Object.keys(value).sort().reduce((sorted, valueKey) => {
      sorted[valueKey] = value[valueKey];
      return sorted;
    }, {});
  });
}

function mergeText(oldText, newText, serverText) {
  let diffs = diffMatchPatch.diff_main(oldText, newText);
  diffMatchPatch.diff_cleanupSemantic(diffs);
  const patches = diffMatchPatch.patch_make(oldText, diffs);
  const patchResult = diffMatchPatch.patch_apply(patches, serverText);
  if (!patchResult[1].some(changeApplied => !changeApplied)) {
    return patchResult[0];
  }

  diffs = diffMatchPatchStrict.diff_main(patchResult[0], newText);
  diffMatchPatch.diff_cleanupSemantic(diffs);
  return diffs.map(diff => diff[1]).join('');
}

function quickPatch(oldStr, newStr, destStr, strict) {
  const dmp = strict ? diffMatchPatchStrict : diffMatchPatch;
  const diffs = dmp.diff_main(oldStr, newStr);
  const patches = dmp.patch_make(oldStr, diffs);
  const patchResult = dmp.patch_apply(patches, destStr);
  return patchResult[0];
}

function mergeValue(oldValue, newValue, serverValue) {
  if (!oldValue) {
    return serverValue; // There might be conflict, keep the server value
  }
  const newSerializedValue = serializeObject(newValue);
  const serverSerializedValue = serializeObject(serverValue);
  if (newSerializedValue === serverSerializedValue) {
    return serverValue; // no conflict
  }
  const oldSerializedValue = serializeObject(oldValue);
  if (oldSerializedValue !== newSerializedValue && !serverValue) {
    return newValue; // Removed on server but changed on client
  }
  if (oldSerializedValue !== serverSerializedValue && !newValue) {
    return serverValue; // Removed on client but changed on server
  }
  if (oldSerializedValue !== newSerializedValue && oldSerializedValue === serverSerializedValue) {
    return newValue; // Take the client value
  }
  return serverValue; // Take the server value otherwise
}

function mergeObjects(oldObject, newObject, serverObject) {
  const mergedObject = {};
  Object.keys({
    ...newObject,
    ...serverObject,
  }).forEach((key) => {
    const mergedValue = mergeValue(oldObject[key], newObject[key], serverObject[key]);
    if (mergedValue != null) {
      mergedObject[key] = mergedValue;
    }
  });
  return utils.deepCopy(mergedObject);
}

function mergeContent(oldContent, newContent, serverContent) {
  const markerKeys = [];
  const markerIdxMap = Object.create(null);
  const oldText = makePatchableText(oldContent, markerKeys, markerIdxMap);
  const serverText = makePatchableText(serverContent, markerKeys, markerIdxMap);
  const localText = makePatchableText(newContent, markerKeys, markerIdxMap);
  const isServerTextChanges = oldText !== serverText;
  const isTextSynchronized = serverText === localText;

  const result = {
    text: isTextSynchronized || !isServerTextChanges
      ? localText
      : mergeText(oldText, serverText, localText),
    properties: mergeValue(
      oldContent.properties,
      newContent.properties,
      serverContent.properties,
    ),
    discussions: mergeObjects(
      stripDiscussionOffsets(oldContent.discussions),
      stripDiscussionOffsets(newContent.discussions),
      stripDiscussionOffsets(serverContent.discussions),
    ),
    comments: mergeObjects(
      oldContent.comments,
      newContent.comments,
      serverContent.comments,
    ),
  };
  restoreDiscussionOffsets(result, markerKeys);
  return result
}

export default {
  serializeObject,
  makePatchableText,
  restoreDiscussionOffsets,
  applyContentChanges,
  getTextPatches,
  getObjectPatches,
  quickPatch,
  mergeObjects,
  mergeContent,
};
