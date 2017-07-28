const editorMinWidth = 280;
const minPadding = 20;
const navigationBarSpaceWidth = 30;
const navigationBarLeftWidth = 570;
const maxTitleMaxWidth = 800;
const minTitleMaxWidth = 200;

const setter = propertyName => (state, value) => {
  state[propertyName] = value;
};

const toggler = (propertyName, setterName) => ({ state, commit, dispatch }, show) => {
  commit(setterName, show === undefined ? !state[propertyName] : show);
  dispatch('updateStyle');
};

export default {
  namespaced: true,
  state: {
    // Constants
    explorerWidth: 280,
    sideBarWidth: 280,
    navigationBarHeight: 44,
    buttonBarWidth: 30,
    statusBarHeight: 20,
    // Configuration
    showNavigationBar: true,
    showEditor: true,
    showSidePreview: true,
    showStatusBar: true,
    showSideBar: false,
    showExplorer: false,
    editorWidthFactor: 1,
    fontSizeFactor: 1,
    // Style
    fontSize: 0,
    innerWidth: 0,
    innerHeight: 0,
    editorWidth: 0,
    editorPadding: 0,
    previewWidth: 0,
    previewPadding: 0,
    titleMaxWidth: 0,
  },
  mutations: {
    setShowNavigationBar: setter('showNavigationBar'),
    setShowEditor: setter('showEditor'),
    setShowSidePreview: setter('showSidePreview'),
    setShowStatusBar: setter('showStatusBar'),
    setShowSideBar: setter('showSideBar'),
    setShowExplorer: setter('showExplorer'),
    setEditorWidthFactor: setter('editorWidthFactor'),
    setFontSizeFactor: setter('fontSizeFactor'),
    setFontSize: setter('fontSize'),
    setInnerWidth: setter('innerWidth'),
    setInnerHeight: setter('innerHeight'),
    setEditorWidth: setter('editorWidth'),
    setEditorPadding: setter('editorPadding'),
    setPreviewWidth: setter('previewWidth'),
    setPreviewPadding: setter('previewPadding'),
    setTitleMaxWidth: setter('titleMaxWidth'),
  },
  actions: {
    toggleNavigationBar: toggler('showNavigationBar', 'setShowNavigationBar'),
    toggleEditor: toggler('showEditor', 'setShowEditor'),
    toggleSidePreview: toggler('showSidePreview', 'setShowSidePreview'),
    toggleStatusBar: toggler('showStatusBar', 'setShowStatusBar'),
    toggleSideBar: toggler('showSideBar', 'setShowSideBar'),
    toggleExplorer: toggler('showExplorer', 'setShowExplorer'),
    updateStyle({ state, commit, dispatch }) {
      const bodyWidth = document.body.clientWidth;
      const bodyHeight = document.body.clientHeight;

      const showNavigationBar = !state.showEditor || state.showNavigationBar;
      let innerHeight = bodyHeight;
      if (showNavigationBar) {
        innerHeight -= state.navigationBarHeight;
      }
      if (state.showStatusBar) {
        innerHeight -= state.statusBarHeight;
      }

      let innerWidth = bodyWidth;
      if (state.showSideBar) {
        innerWidth -= state.sideBarWidth;
      }
      if (state.showExplorer) {
        innerWidth -= state.explorerWidth;
      }
      let doublePanelWidth = innerWidth - state.buttonBarWidth;
      if (doublePanelWidth < editorMinWidth) {
        if (state.showSideBar) {
          dispatch('toggleSideBar', false);
          return;
        }
        if (state.showExplorer) {
          dispatch('toggleExplorer', false);
          return;
        }
        doublePanelWidth = editorMinWidth;
      }
      const splitPanel = state.showEditor && state.showSidePreview;
      if (splitPanel && doublePanelWidth / 2 < editorMinWidth) {
        dispatch('toggleSidePreview', false);
        return;
      }

      let fontSize = 18;
      let textWidth = 990;
      if (doublePanelWidth < 1120) {
        fontSize -= 1;
        textWidth = 910;
      }
      if (doublePanelWidth < 1040) {
        textWidth = 830;
      }
      if (textWidth < 640) {
        fontSize -= 1;
      }
      textWidth *= state.editorWidthFactor;
      fontSize *= state.fontSizeFactor;

      const panelWidth = doublePanelWidth / 2;
      const previewWidth = splitPanel ?
        panelWidth :
        innerWidth;
      let previewPadding = (previewWidth - textWidth) / 2;
      if (previewPadding < minPadding) {
        previewPadding = minPadding;
      }
      const editorWidth = splitPanel ?
        panelWidth :
        doublePanelWidth;
      let editorPadding = (editorWidth - textWidth) / 2;
      if (editorPadding < minPadding) {
        editorPadding = minPadding;
      }

      let titleMaxWidth = innerWidth - navigationBarSpaceWidth;
      if (state.showEditor) {
        titleMaxWidth -= navigationBarLeftWidth;
      }
      titleMaxWidth = Math.min(titleMaxWidth, maxTitleMaxWidth);
      titleMaxWidth = Math.max(titleMaxWidth, minTitleMaxWidth);

      commit('setFontSize', fontSize);
      commit('setInnerWidth', innerWidth);
      commit('setInnerHeight', innerHeight);
      commit('setPreviewWidth', previewWidth);
      commit('setPreviewPadding', previewPadding);
      commit('setEditorWidth', editorWidth);
      commit('setEditorPadding', editorPadding);
      commit('setTitleMaxWidth', titleMaxWidth);
    },
  },
};
