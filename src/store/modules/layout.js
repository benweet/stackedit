const navigationBarHeight = 44;
const sideBarWidth = 280;
const editorMinWidth = 280;
const buttonBarWidth = 30;
const statusBarHeight = 20;
const outOfScreenMargin = 50;
const minPadding = 20;
const navigationBarLeftWidth = 500;
const titleMaxMaxWidth = 500;
const titleMinMaxWidth = 200;

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
    // Configuration
    showNavigationBar: true,
    showEditor: true,
    showSidePreview: true,
    showSideBar: false,
    showStatusBar: true,
    editorWidthFactor: 1,
    fontSizeFactor: 1,
    // Style
    fontSize: 0,
    inner1Y: 0,
    inner1Height: 0,
    inner2Height: 0,
    inner3X: 0,
    inner3Width: 0,
    navigationBarY: 0,
    sideBarX: 0,
    statusBarY: 0,
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
    setShowSideBar: setter('showSideBar'),
    setShowStatusBar: setter('showStatusBar'),
    setEditorWidthFactor: setter('editorWidthFactor'),
    setFontSizeFactor: setter('fontSizeFactor'),
    setFontSize: setter('fontSize'),
    setInner1Y: setter('inner1Y'),
    setInner1Height: setter('inner1Height'),
    setInner2Height: setter('inner2Height'),
    setInner3X: setter('inner3X'),
    setInner3Width: setter('inner3Width'),
    setNavigationBarY: setter('navigationBarY'),
    setSideBarX: setter('sideBarX'),
    setStatusBarY: setter('statusBarY'),
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
    toggleSideBar: toggler('showSideBar', 'setShowSideBar'),
    toggleStatusBar: toggler('showStatusBar', 'setShowStatusBar'),
    updateStyle({ state, commit, dispatch }) {
      const bodyWidth = document.body.clientWidth;
      const bodyHeight = document.body.clientHeight;

      const showNavigationBar = !state.showEditor || state.showNavigationBar;
      const inner1Y = showNavigationBar
        ? navigationBarHeight
        : 0;
      const inner1Height = bodyHeight - inner1Y;
      const inner2Height = state.showStatusBar
        ? inner1Height - statusBarHeight
        : inner1Height;
      const navigationBarY = showNavigationBar
        ? 0
        : -navigationBarHeight - outOfScreenMargin;
      const sideBarX = state.showSideBar
        ? bodyWidth - sideBarWidth
        : bodyWidth + outOfScreenMargin;
      const statusBarY = state.showStatusBar
        ? inner2Height
        : inner2Height + outOfScreenMargin;

      let doublePanelWidth = bodyWidth - buttonBarWidth;
      if (state.showSideBar) {
        doublePanelWidth -= sideBarWidth;
      }
      if (doublePanelWidth < editorMinWidth) {
        doublePanelWidth = editorMinWidth;
      }
      const splitPanel = state.showEditor && state.showSidePreview;
      if (splitPanel && doublePanelWidth / 2 < editorMinWidth) {
        dispatch('toggleSidePreview', false);
        return;
      }
      if (state.showSideBar && bodyWidth < editorMinWidth + sideBarWidth) {
        dispatch('toggleSideBar', false);
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
      let inner3X = panelWidth;
      if (!splitPanel) {
        inner3X = state.showEditor
          ? doublePanelWidth
          : -buttonBarWidth;
      }
      const inner3Width = splitPanel
        ? panelWidth + buttonBarWidth
        : doublePanelWidth + buttonBarWidth;

      const previewWidth = splitPanel
        ? panelWidth
        : bodyWidth;
      let previewPadding = (previewWidth - textWidth) / 2;
      if (previewPadding < minPadding) {
        previewPadding = minPadding;
      }
      const editorWidth = splitPanel
        ? panelWidth
        : doublePanelWidth;
      let editorPadding = (editorWidth - textWidth) / 2;
      if (editorPadding < minPadding) {
        editorPadding = minPadding;
      }

      let titleMaxWidth = bodyWidth;
      if (state.showEditor) {
        titleMaxWidth -= navigationBarLeftWidth;
      }
      titleMaxWidth = Math.min(titleMaxWidth, titleMaxMaxWidth);
      titleMaxWidth = Math.max(titleMaxWidth, titleMinMaxWidth);

      commit('setFontSize', fontSize);
      commit('setInner1Y', inner1Y);
      commit('setInner1Height', inner1Height);
      commit('setInner2Height', inner2Height);
      commit('setInner3X', inner3X);
      commit('setInner3Width', inner3Width);
      commit('setNavigationBarY', navigationBarY);
      commit('setSideBarX', sideBarX);
      commit('setStatusBarY', statusBarY);
      commit('setPreviewWidth', previewWidth);
      commit('setPreviewPadding', previewPadding);
      commit('setEditorWidth', editorWidth);
      commit('setEditorPadding', editorPadding);
      commit('setTitleMaxWidth', titleMaxWidth);
    },
  },
};
