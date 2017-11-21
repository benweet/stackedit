import DiffMatchPatch from 'diff-match-patch';
import cledit from '../libs/cledit';
import utils from './utils';
import diffUtils from './diffUtils';
import store from '../store';
import EditorClassApplier from '../components/common/EditorClassApplier';
import PreviewClassApplier from '../components/common/PreviewClassApplier';

let clEditor;
// let discussionIds = {};
let discussionMarkers = {};
let markerKeys;
let markerIdxMap;
let previousPatchableText;
let currentPatchableText;
let isChangePatch;
let contentId;
let editorClassAppliers = {};
let previewClassAppliers = {};

function getDiscussionMarkers(discussion, discussionId, onMarker) {
  const getMarker = (offsetName) => {
    const markerKey = `${discussionId}:${offsetName}`;
    let marker = discussionMarkers[markerKey];
    if (!marker) {
      marker = new cledit.Marker(discussion[offsetName], offsetName === 'end');
      marker.discussionId = discussionId;
      marker.offsetName = offsetName;
      clEditor.addMarker(marker);
      discussionMarkers[markerKey] = marker;
    }
    onMarker(marker);
  };
  getMarker('start');
  getMarker('end');
}

function syncDiscussionMarkers(content, writeOffsets) {
  const discussions = {
    ...content.discussions,
  };
  const newDiscussion = store.getters['discussion/newDiscussion'];
  if (newDiscussion) {
    discussions[store.state.discussion.newDiscussionId] = {
      ...newDiscussion,
    };
  }
  Object.keys(discussionMarkers).forEach((markerKey) => {
    const marker = discussionMarkers[markerKey];
    // Remove marker if discussion was removed
    const discussion = discussions[marker.discussionId];
    if (!discussion) {
      clEditor.removeMarker(marker);
      delete discussionMarkers[markerKey];
    }
  });

  Object.keys(discussions).forEach((discussionId) => {
    const discussion = discussions[discussionId];
    getDiscussionMarkers(discussion, discussionId, writeOffsets
      ? (marker) => {
        discussion[marker.offsetName] = marker.offset;
      }
      : (marker) => {
        marker.offset = discussion[marker.offsetName];
      });
  });

  if (writeOffsets && newDiscussion) {
    store.commit('discussion/patchNewDiscussion',
      discussions[store.state.discussion.newDiscussionId]);
  }
}

function removeDiscussionMarkers() {
  Object.keys(discussionMarkers).forEach((markerKey) => {
    clEditor.removeMarker(discussionMarkers[markerKey]);
  });
  discussionMarkers = {};
  markerKeys = [];
  markerIdxMap = Object.create(null);
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
  createClEditor(editorElt) {
    this.clEditor = cledit(editorElt, editorElt.parentNode);
    clEditor = this.clEditor;
    clEditor.on('contentChanged', (text) => {
      const oldContent = store.getters['content/current'];
      const newContent = {
        ...utils.deepCopy(oldContent),
        text: utils.sanitizeText(text),
      };
      syncDiscussionMarkers(newContent, true);
      if (!isChangePatch) {
        previousPatchableText = currentPatchableText;
        currentPatchableText = diffUtils.makePatchableText(newContent, markerKeys, markerIdxMap);
      } else {
        // Take a chance to restore discussion offsets on undo/redo
        newContent.text = currentPatchableText;
        diffUtils.restoreDiscussionOffsets(newContent, markerKeys);
        syncDiscussionMarkers(newContent, false);
      }
      store.dispatch('content/patchCurrent', newContent);
      isChangePatch = false;
    });
    clEditor.on('focus', () => store.commit('discussion/setNewCommentFocus', false));

    // Track new discussions (not sure it's a good idea)
    // store.watch(
    //   () => store.getters['content/current'].discussions,
    //   (discussions) => {
    //     const oldDiscussionIds = discussionIds;
    //     discussionIds = {};
    //     let hasNewDiscussion = false;
    //     Object.keys(discussions).forEach((discussionId) => {
    //       discussionIds[discussionId] = true;
    //       if (!oldDiscussionIds[discussionId]) {
    //         hasNewDiscussion = true;
    //       }
    //     });
    //     if (hasNewDiscussion) {
    //       const content = store.getters['content/current'];
    //       currentPatchableText = diffUtils.makePatchableText(content, markerKeys, markerIdxMap);
    //     }
    //   });
  },
  initClEditorInternal(opts) {
    const content = store.getters['content/current'];
    if (content) {
      removeDiscussionMarkers(); // Markers will be recreated on contentChanged
      const contentState = store.getters['contentState/current'];
      const options = Object.assign({
        selectionStart: contentState.selectionStart,
        selectionEnd: contentState.selectionEnd,
        patchHandler: {
          makePatches,
          applyPatches,
          reversePatches,
        },
      }, opts);

      if (contentId !== content.id) {
        contentId = content.id;
        currentPatchableText = diffUtils.makePatchableText(content, markerKeys, markerIdxMap);
        previousPatchableText = currentPatchableText;
        syncDiscussionMarkers(content, false);
        options.content = content.text;
      }

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
  getTrimmedSelection() {
    const selectionMgr = clEditor.selectionMgr;
    let start = Math.min(selectionMgr.selectionStart, selectionMgr.selectionEnd);
    let end = Math.max(selectionMgr.selectionStart, selectionMgr.selectionEnd);
    const text = clEditor.getContent();
    while ((text[start] || '').match(/\s/)) {
      start += 1;
    }
    while ((text[end - 1] || '').match(/\s/)) {
      end -= 1;
    }
    return start < end && { start, end };
  },
  initHighlighters() {
    store.watch(
      () => store.getters['discussion/newDiscussion'],
      () => syncDiscussionMarkers(store.getters['content/current'], false),
    );

    store.watch(
      () => store.getters['discussion/currentFileDiscussions'],
      (discussions) => {
        // Editor class appliers
        const oldEditorClassAppliers = editorClassAppliers;
        editorClassAppliers = {};
        Object.keys(discussions).forEach((discussionId) => {
          const classApplier = oldEditorClassAppliers[discussionId] || new EditorClassApplier(
            () => {
              const classes = [`discussion-editor-highlighting--${discussionId}`, 'discussion-editor-highlighting'];
              if (store.state.discussion.currentDiscussionId === discussionId) {
                classes.push('discussion-editor-highlighting--selected');
              }
              return classes;
            },
            () => {
              const startMarker = discussionMarkers[`${discussionId}:start`];
              const endMarker = discussionMarkers[`${discussionId}:end`];
              return startMarker && endMarker && {
                start: startMarker.offset,
                end: endMarker.offset,
              };
            }, { discussionId });
          editorClassAppliers[discussionId] = classApplier;
        });
        Object.keys(oldEditorClassAppliers).forEach((discussionId) => {
          if (!editorClassAppliers[discussionId]) {
            oldEditorClassAppliers[discussionId].stop();
          }
        });

        // Preview class appliers
        const oldPreviewClassAppliers = previewClassAppliers;
        previewClassAppliers = {};
        Object.keys(discussions).forEach((discussionId) => {
          const classApplier = oldPreviewClassAppliers[discussionId] || new PreviewClassApplier(
            () => {
              const classes = [`discussion-preview-highlighting--${discussionId}`, 'discussion-preview-highlighting'];
              if (store.state.discussion.currentDiscussionId === discussionId) {
                classes.push('discussion-preview-highlighting--selected');
              }
              return classes;
            },
            () => {
              const startMarker = discussionMarkers[`${discussionId}:start`];
              const endMarker = discussionMarkers[`${discussionId}:end`];
              return startMarker && endMarker && {
                start: this.getPreviewOffset(startMarker.offset),
                end: this.getPreviewOffset(endMarker.offset),
              };
            }, { discussionId });
          previewClassAppliers[discussionId] = classApplier;
        });
        Object.keys(oldPreviewClassAppliers).forEach((discussionId) => {
          if (!previewClassAppliers[discussionId]) {
            oldPreviewClassAppliers[discussionId].stop();
          }
        });
      },
    );
  },
};

