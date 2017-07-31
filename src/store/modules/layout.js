const editorMinWidth = 280;
const minPadding = 20;
const navigationBarSpaceWidth = 30;
const navigationBarLeftWidth = 570;
const maxTitleMaxWidth = 800;
const minTitleMaxWidth = 200;

const setter = propertyName => (state, value) => {
  state[propertyName] = value;
};

const toggler = propertyName => (state, value) => {
  state[propertyName] = value === undefined ? !state[propertyName] : value;
};

export default {
  namespaced: true,
  state: {
    constants: {
      explorerWidth: 250,
      sideBarWidth: 280,
      navigationBarHeight: 44,
      buttonBarWidth: 30,
      statusBarHeight: 20,
    },
    // Configuration
    showNavigationBar: true,
    showEditor: true,
    showSidePreview: true,
    showStatusBar: true,
    showSideBar: false,
    showExplorer: true,
    editorWidthFactor: 1,
    fontSizeFactor: 1,
    // Styles
    bodyWidth: 0,
    bodyHeight: 0,
  },
  mutations: {
    toggleNavigationBar: toggler('showNavigationBar'),
    toggleEditor: toggler('showEditor'),
    toggleSidePreview: toggler('showSidePreview'),
    toggleStatusBar: toggler('showStatusBar'),
    toggleSideBar: toggler('showSideBar'),
    toggleExplorer: toggler('showExplorer'),
    setEditorWidthFactor: setter('editorWidthFactor'),
    setFontSizeFactor: setter('fontSizeFactor'),
    updateBodySize: (state) => {
      state.bodyWidth = document.body.clientWidth;
      state.bodyHeight = document.body.clientHeight;
    },
  },
  getters: {
    styles: (state) => {
      const styles = {
        showNavigationBar: !state.showEditor || state.showNavigationBar,
        showStatusBar: state.showStatusBar,
        showEditor: state.showEditor,
        showSidePreview: state.showSidePreview && state.showEditor,
        showPreview: state.showSidePreview || !state.showEditor,
        showSideBar: state.showSideBar,
        showExplorer: state.showExplorer,
      };

      function computeStyles() {
        styles.innerHeight = state.bodyHeight;
        if (styles.showNavigationBar) {
          styles.innerHeight -= state.constants.navigationBarHeight;
        }
        if (styles.showStatusBar) {
          styles.innerHeight -= state.constants.statusBarHeight;
        }

        styles.innerWidth = state.bodyWidth;
        if (styles.showSideBar) {
          styles.innerWidth -= state.constants.sideBarWidth;
        }
        if (styles.showExplorer) {
          styles.innerWidth -= state.constants.explorerWidth;
        }

        let doublePanelWidth = styles.innerWidth - state.constants.buttonBarWidth;
        if (doublePanelWidth < editorMinWidth) {
          if (styles.showSideBar) {
            styles.showSideBar = false;
            computeStyles();
            return;
          }
          if (styles.showExplorer) {
            styles.showExplorer = false;
            computeStyles();
            return;
          }
          doublePanelWidth = editorMinWidth;
        }

        if (styles.showSidePreview && doublePanelWidth / 2 < editorMinWidth) {
          styles.showSidePreview = false;
          computeStyles();
          return;
        }

        styles.fontSize = 18;
        styles.textWidth = 990;
        if (doublePanelWidth < 1120) {
          styles.fontSize -= 1;
          styles.textWidth = 910;
        }
        if (doublePanelWidth < 1040) {
          styles.textWidth = 830;
        }
        styles.textWidth *= state.editorWidthFactor;
        if (doublePanelWidth < styles.textWidth) {
          styles.textWidth = doublePanelWidth;
        }
        if (styles.textWidth < 640) {
          styles.fontSize -= 1;
        }
        styles.fontSize *= state.fontSizeFactor;

        const panelWidth = doublePanelWidth / 2;
        styles.previewWidth = styles.showSidePreview ?
          panelWidth :
          styles.innerWidth;
        styles.previewPadding = Math.max((styles.previewWidth - styles.textWidth) / 2, minPadding);
        styles.editorWidth = styles.showSidePreview ?
          panelWidth :
          doublePanelWidth;
        styles.editorPadding = Math.max((styles.editorWidth - styles.textWidth) / 2, minPadding);

        styles.titleMaxWidth = styles.innerWidth - navigationBarSpaceWidth;
        if (styles.showEditor) {
          styles.titleMaxWidth -= navigationBarLeftWidth;
        }
        styles.titleMaxWidth = Math.min(styles.titleMaxWidth, maxTitleMaxWidth);
        styles.titleMaxWidth = Math.max(styles.titleMaxWidth, minTitleMaxWidth);
      }

      computeStyles();
      return styles;
    },
  },
};
