import DiffMatchPatch from 'diff-match-patch';
import cledit from '../cledit/cledit';
import clDiffUtils from '../cledit/cldiffutils';
import store from '../store';

let clEditor;
const newDiscussionMarker0 = new cledit.Marker(0);
const newDiscussionMarker1 = new cledit.Marker(0, true);
let markerKeys;
let markerIdxMap;
let previousPatchableText;
let currentPatchableText;
let discussionMarkers;
let content;
let isChangePatch;

function getDiscussionMarkers(discussion, discussionId, onMarker) {
  function getMarker(offsetName) {
    const markerOffset = discussion[offsetName];
    const markerKey = discussionId + offsetName;
    let marker = discussionMarkers[markerKey];
    if (markerOffset !== undefined) {
      if (!marker) {
        marker = new cledit.Marker(markerOffset, offsetName === 'offset1');
        marker.discussionId = discussionId;
        marker.offsetName = offsetName;
        clEditor.addMarker(marker);
        discussionMarkers[markerKey] = marker;
      }
      onMarker(marker);
    }
  }
  getMarker('offset0');
  getMarker('offset1');
}

function syncDiscussionMarkers() {
  Object.keys(discussionMarkers)
    .forEach((markerKey) => {
      const marker = discussionMarkers[markerKey];
      // Remove marker if discussion was removed
      const discussion = content.discussions[marker.discussionId];
      if (!discussion || discussion[marker.offsetName] === undefined) {
        clEditor.removeMarker(marker);
        delete discussionMarkers[markerKey];
      }
    });

  Object.keys(content.discussions)
    .forEach((discussionId) => {
      const discussion = content.discussions[discussionId];
      getDiscussionMarkers(discussion, discussionId, (marker) => {
        discussion[marker.offsetName] = marker.offset;
      });
    });
}

const diffMatchPatch = new DiffMatchPatch();

function makePatches() {
  const diffs = diffMatchPatch.diff_main(previousPatchableText, currentPatchableText);
  return diffMatchPatch.patch_make(previousPatchableText, diffs);
}

function applyPatches(patches) {
  const newPatchableText = diffMatchPatch.patch_apply(patches, currentPatchableText)[0];
  let result = newPatchableText;
  if (markerKeys.length) {
    // Strip text markers
    result = result.replace(new RegExp(`[\ue000-${String.fromCharCode((0xe000 + markerKeys.length) - 1)}]`, 'g'), '');
  }
  // Expect a `contentChanged` event
  if (result !== clEditor.getContent()) {
    previousPatchableText = currentPatchableText;
    currentPatchableText = newPatchableText;
    isChangePatch = true;
  }
  return result;
}

function reversePatches(patches) {
  const result = diffMatchPatch.patch_deepCopy(patches).reverse();
  result.forEach((patch) => {
    patch.diffs.forEach((diff) => {
      diff[0] = -diff[0];
    });
  });
  return result;
}

export default {
  clEditor: null,
  lastChange: 0,
  lastExternalChange: 0,
  createClEditor(editorElt) {
    this.clEditor = cledit(editorElt, editorElt.parentNode);
    clEditor = this.clEditor;
    markerKeys = [];
    markerIdxMap = Object.create(null);
    discussionMarkers = {};
    clEditor.on('contentChanged', (text) => {
      store.commit('files/setCurrentFileContentText', text);
      syncDiscussionMarkers();
      if (!isChangePatch) {
        previousPatchableText = currentPatchableText;
        currentPatchableText = clDiffUtils.makePatchableText(content, markerKeys, markerIdxMap);
      } else {
        // Take a chance to restore discussion offsets on undo/redo
        content.text = currentPatchableText;
        clDiffUtils.restoreDiscussionOffsets(content, markerKeys);
        content.discussions.cl_each((discussion, discussionId) => {
          getDiscussionMarkers(discussion, discussionId, (marker) => {
            marker.offset = discussion[marker.offsetName];
          });
        });
      }
      isChangePatch = false;
      this.lastChange = Date.now();
    });
    clEditor.addMarker(newDiscussionMarker0);
    clEditor.addMarker(newDiscussionMarker1);
  },
  initClEditor(opts, reinit) {
    if (store.state.files.currentFile.content) {
      const options = Object.assign({}, opts);

      if (content !== store.state.files.currentFile.content) {
        content = store.state.files.currentFile.content;
        currentPatchableText = clDiffUtils.makePatchableText(content, markerKeys, markerIdxMap);
        previousPatchableText = currentPatchableText;
        syncDiscussionMarkers();
      }

      if (reinit) {
        options.content = content.text;
        options.selectionStart = content.state.selectionStart;
        options.selectionEnd = content.state.selectionEnd;
      }

      options.patchHandler = {
        makePatches,
        applyPatches: patches => applyPatches(patches),
        reversePatches,
      };
      clEditor.init(options);
    }
  },
  applyContent(isExternal) {
    if (!clEditor) {
      return null;
    }
    if (isExternal) {
      this.lastExternalChange = Date.now();
    }
    syncDiscussionMarkers();
    return clEditor.setContent(content.text, isExternal);
  },
};
