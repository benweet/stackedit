import DiffMatchPatch from 'diff-match-patch';
import moduleTemplate from './moduleTemplate';
import empty from '../data/emptyContent';
import utils from '../services/utils';
import cledit from '../services/cledit';

const diffMatchPatch = new DiffMatchPatch();

const module = moduleTemplate(empty);

module.state = {
  ...module.state,
  revisionContent: null,
};

module.mutations = {
  ...module.mutations,
  setRevisionContent: (state, value) => {
    if (value) {
      state.revisionContent = {
        ...empty(),
        ...value,
        id: utils.uid(),
        hash: Date.now(),
      };
    } else {
      state.revisionContent = null;
    }
  },
};

module.getters = {
  ...module.getters,
  current: (state, getters, rootState, rootGetters) => {
    if (state.revisionContent) {
      return state.revisionContent;
    }
    return state.itemMap[`${rootGetters['file/current'].id}/content`] || empty();
  },
  currentChangeTrigger: (state, getters) => {
    const current = getters.current;
    return utils.serializeObject([
      current.id,
      current.text,
      current.hash,
    ]);
  },
  currentProperties: (state, getters) => utils.computeProperties(getters.current.properties),
  isCurrentEditable: (state, getters, rootState, rootGetters) =>
    !state.revisionContent &&
    getters.current.id &&
    rootGetters['layout/styles'].showEditor,
};

module.actions = {
  ...module.actions,
  patchCurrent({ state, getters, commit }, value) {
    const id = getters.current.id;
    if (id && !state.revisionContent) {
      commit('patchItem', {
        ...value,
        id,
      });
    }
  },
  setRevisionContent({ state, rootGetters, commit }, value) {
    const currentFile = rootGetters['file/current'];
    const currentContent = state.itemMap[`${currentFile.id}/content`];
    if (currentContent) {
      const diffs = diffMatchPatch.diff_main(currentContent.text, value.text);
      diffMatchPatch.diff_cleanupSemantic(diffs);
      commit('setRevisionContent', {
        text: diffs.map(([, text]) => text).join(''),
        diffs,
        originalText: value.text,
      });
    }
  },
  restoreRevision({ state, getters, commit, dispatch }) {
    const revisionContent = state.revisionContent;
    if (revisionContent) {
      dispatch('modal/fileRestoration', null, { root: true })
        .then(() => {
          // Close revision
          commit('setRevisionContent');
          const currentContent = utils.deepCopy(getters.current);
          if (currentContent) {
            // Restore text and move discussions
            const diffs = diffMatchPatch.diff_main(
              currentContent.text, revisionContent.originalText);
            diffMatchPatch.diff_cleanupSemantic(diffs);
            Object.entries(currentContent.discussions).forEach(([, discussion]) => {
              const adjustOffset = (offsetName) => {
                const marker = new cledit.Marker(discussion[offsetName], offsetName === 'end');
                marker.adjustOffset(diffs);
                discussion[offsetName] = marker.offset;
              };
              adjustOffset('start');
              adjustOffset('end');
            });
            dispatch('patchCurrent', {
              ...currentContent,
              text: revisionContent.originalText,
            });
          }
        });
    }
  },
};

export default module;
