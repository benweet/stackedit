import DiffMatchPatch from 'diff-match-patch';
import cledit from '../libs/cledit';
import utils from './utils';
import diffUtils from './diffUtils';
import store from '../store';

let clEditor;
const newDiscussionMarker0 = new cledit.Marker(0);
const newDiscussionMarker1 = new cledit.Marker(0, true);
let markerKeys;
let markerIdxMap;
let previousPatchableText;
let currentPatchableText;
let discussionMarkers;
let isChangePatch;
let contentId;

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

function syncDiscussionMarkers(content, writeOffsets) {
  Object.keys(discussionMarkers).forEach((markerKey) => {
    const marker = discussionMarkers[markerKey];
    // Remove marker if discussion was removed
    const discussion = content.discussions[marker.discussionId];
    if (!discussion || discussion[marker.offsetName] === undefined) {
      clEditor.removeMarker(marker);
      delete discussionMarkers[markerKey];
    }
  });

  Object.keys(content.discussions).forEach((discussionId) => {
    const discussion = content.discussions[discussionId];
    getDiscussionMarkers(discussion, discussionId, writeOffsets
      ? (marker) => {
        discussion[marker.offsetName] = marker.offset;
      }
      : (marker) => {
        marker.offset = discussion[marker.offsetName];
      });
  });
}

function removeDiscussionMarkers() {
  Object.keys(discussionMarkers).forEach((markerKey) => {
    const marker = discussionMarkers[markerKey];
    clEditor.removeMarker(marker);
    delete discussionMarkers[markerKey];
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
  createClEditor(editorElt) {
    this.clEditor = cledit(editorElt, editorElt.parentNode);
    clEditor = this.clEditor;
    markerKeys = [];
    markerIdxMap = Object.create(null);
    discussionMarkers = {};
    clEditor.on('contentChanged', (text) => {
      const oldContent = store.getters['content/current'];
      const newContent = {
        ...oldContent,
        discussions: utils.deepCopy(oldContent.discussions),
        text,
      };
      syncDiscussionMarkers(newContent, true);
      if (!isChangePatch) {
        previousPatchableText = currentPatchableText;
        currentPatchableText = diffUtils.makePatchableText(newContent, markerKeys, markerIdxMap);
      } else {
        // Take a chance to restore discussion offsets on undo/redo
        diffUtils.restoreDiscussionOffsets(newContent, markerKeys);
        syncDiscussionMarkers(newContent, false);
      }
      store.dispatch('content/patchCurrent', newContent);
      isChangePatch = false;
    });
    clEditor.addMarker(newDiscussionMarker0);
    clEditor.addMarker(newDiscussionMarker1);
  },
  initClEditor(opts) {
    const content = store.getters['content/current'];
    if (content) {
      const options = Object.assign({}, opts);

      if (contentId !== content.id) {
        contentId = content.id;
        currentPatchableText = diffUtils.makePatchableText(content, markerKeys, markerIdxMap);
        previousPatchableText = currentPatchableText;
        syncDiscussionMarkers(content, false);
        const contentState = store.getters['contentState/current'];
        options.content = content.text;
        options.selectionStart = contentState.selectionStart;
        options.selectionEnd = contentState.selectionEnd;
      }

      options.patchHandler = {
        makePatches,
        applyPatches,
        reversePatches,
      };
      clEditor.init(options);
    }
  },
  applyContent() {
    if (clEditor) {
      const content = store.getters['content/current'];
      if (clEditor.setContent(content.text, true).range) {
        // Marker will be recreated on contentChange
        removeDiscussionMarkers();
      } else {
        syncDiscussionMarkers(content, false);
      }
    }
  },
};
