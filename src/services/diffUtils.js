import DiffMatchPatch from 'diff-match-patch';
import utils from './utils';

const diffMatchPatch = new DiffMatchPatch();
diffMatchPatch.Match_Distance = 10000;

function makePatchableText(content, markerKeys, markerIdxMap) {
  if (!content || !content.discussions) {
    return null;
  }
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

    addMarker('start');
    addMarker('end');
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
  if (objectMap == null) {
    return objectMap;
  }
  const result = {};
  Object.keys(objectMap).forEach((id) => {
    result[id] = {
      text: objectMap[id].text,
    };
  });
  return result;
}

function restoreDiscussionOffsets(content, markerKeys) {
  if (markerKeys.length) {
    // Go through markers
    let count = 0;
    content.text = content.text.replace(
      new RegExp(`[\ue000-${String.fromCharCode((0xe000 + markerKeys.length) - 1)}]`, 'g'),
      (match, offset) => {
        const idx = match.charCodeAt(0) - 0xe000;
        const markerKey = markerKeys[idx];
        const discussion = content.discussions[markerKey.id];
        if (discussion) {
          discussion[markerKey.offsetName] = offset - count;
        }
        count += 1;
        return '';
      },
    );
    // Sanitize offsets
    Object.keys(content.discussions).forEach((discussionId) => {
      const discussion = content.discussions[discussionId];
      if (discussion.start === undefined) {
        discussion.start = discussion.end || 0;
      }
      if (discussion.end === undefined || discussion.end < discussion.start) {
        discussion.end = discussion.start;
      }
    });
  }
}

function mergeText(serverText, clientText, lastMergedText) {
  const serverClientDiffs = diffMatchPatch.diff_main(serverText, clientText);
  diffMatchPatch.diff_cleanupSemantic(serverClientDiffs);
  // Fusion text is a mix of both server and client contents
  const fusionText = serverClientDiffs.map(diff => diff[1]).join('');
  if (!lastMergedText) {
    return fusionText;
  }
  // Let's try to find out what text has to be removed from fusion
  const intersectionText = serverClientDiffs
    // Keep only equalities
    .filter(diff => diff[0] === DiffMatchPatch.DIFF_EQUAL)
    .map(diff => diff[1]).join('');
  const lastMergedTextDiffs = diffMatchPatch.diff_main(lastMergedText, intersectionText)
    // Keep only equalities and deletions
    .filter(diff => diff[0] !== DiffMatchPatch.DIFF_INSERT);
  diffMatchPatch.diff_cleanupSemantic(lastMergedTextDiffs);
  // Make a patch with deletions only
  const patches = diffMatchPatch.patch_make(lastMergedText, lastMergedTextDiffs);
  // Apply patch to fusion text
  return diffMatchPatch.patch_apply(patches, fusionText)[0];
}

function mergeValues(serverValue, clientValue, lastMergedValue) {
  if (!lastMergedValue) {
    return serverValue || clientValue; // Take the server value in priority
  }
  const newSerializedValue = utils.serializeObject(clientValue);
  const serverSerializedValue = utils.serializeObject(serverValue);
  if (newSerializedValue === serverSerializedValue) {
    return serverValue; // no conflict
  }
  const oldSerializedValue = utils.serializeObject(lastMergedValue);
  if (oldSerializedValue !== newSerializedValue && !serverValue) {
    return clientValue; // Removed on server but changed on client
  }
  if (oldSerializedValue !== serverSerializedValue && !clientValue) {
    return serverValue; // Removed on client but changed on server
  }
  if (oldSerializedValue !== newSerializedValue && oldSerializedValue === serverSerializedValue) {
    return clientValue; // Take the client value
  }
  return serverValue; // Take the server value
}

function mergeObjects(serverObject, clientObject, lastMergedObject = {}) {
  const mergedObject = {};
  Object.keys({
    ...clientObject,
    ...serverObject,
  }).forEach((key) => {
    const mergedValue = mergeValues(serverObject[key], clientObject[key], lastMergedObject[key]);
    if (mergedValue != null) {
      mergedObject[key] = mergedValue;
    }
  });
  return utils.deepCopy(mergedObject);
}

function mergeContent(serverContent, clientContent, lastMergedContent = {}) {
  const markerKeys = [];
  const markerIdxMap = Object.create(null);
  const lastMergedText = makePatchableText(lastMergedContent, markerKeys, markerIdxMap);
  const serverText = makePatchableText(serverContent, markerKeys, markerIdxMap);
  const clientText = makePatchableText(clientContent, markerKeys, markerIdxMap);
  const isServerTextChanges = lastMergedText !== serverText;
  const isClientTextChanges = lastMergedText !== clientText;
  const isTextSynchronized = serverText === clientText;
  let text = clientText;
  if (!isTextSynchronized && isServerTextChanges) {
    text = serverText;
    if (isClientTextChanges) {
      text = mergeText(serverText, clientText, lastMergedText);
    }
  }

  const result = {
    text,
    properties: mergeValues(
      serverContent.properties,
      clientContent.properties,
      lastMergedContent.properties,
    ),
    discussions: mergeObjects(
      stripDiscussionOffsets(serverContent.discussions),
      stripDiscussionOffsets(clientContent.discussions),
      stripDiscussionOffsets(lastMergedContent.discussions),
    ),
    comments: mergeObjects(
      serverContent.comments,
      clientContent.comments,
      lastMergedContent.comments,
    ),
  };
  restoreDiscussionOffsets(result, markerKeys);
  return result;
}

export default {
  makePatchableText,
  restoreDiscussionOffsets,
  mergeObjects,
  mergeContent,
};
