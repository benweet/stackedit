<template>
  <div class="layout">
    <div class="layout__panel flex flex--row">
      <div class="layout__panel layout__panel--explorer" v-show="showExplorer" :style="{ width: explorerWidth + 'px' }">
        <explorer></explorer>
      </div>
      <div class="layout__panel flex flex--column" :style="{ width: innerWidth + 'px' }">
        <div class="layout__panel layout__panel--navigation-bar" v-show="showNavigationBar || !showEditor" :style="{ height: navigationBarHeight + 'px' }">
          <navigation-bar></navigation-bar>
        </div>
        <div class="layout__panel flex flex--row" :style="{ height: innerHeight + 'px' }">
          <div class="layout__panel layout__panel--editor" v-show="showEditor" :style="{ width: editorWidth + 'px', 'font-size': fontSize + 'px' }">
            <editor></editor>
          </div>
          <div class="layout__panel layout__panel--button-bar" v-show="showEditor" :style="{ width: buttonBarWidth + 'px' }">
            <button-bar></button-bar>
          </div>
          <div class="layout__panel layout__panel--preview" v-show="showSidePreview || !showEditor" :style="{ width: previewWidth + 'px', 'font-size': fontSize + 'px' }">
            <preview></preview>
          </div>
        </div>
        <div class="layout__panel layout__panel--status-bar" v-show="showStatusBar" :style="{ height: statusBarHeight + 'px' }">
          <status-bar></status-bar>
        </div>
      </div>
      <div class="layout__panel layout__panel--side-bar" v-show="showSideBar" :style="{ width: sideBarWidth + 'px' }">
        <side-bar></side-bar>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import NavigationBar from './NavigationBar';
import ButtonBar from './ButtonBar';
import StatusBar from './StatusBar';
import Explorer from './Explorer';
import SideBar from './SideBar';
import Editor from './Editor';
import Preview from './Preview';
import editorSvc from '../services/editorSvc';
import constants from '../services/constants';

export default {
  components: {
    NavigationBar,
    ButtonBar,
    StatusBar,
    Explorer,
    SideBar,
    Editor,
    Preview,
  },
  computed: mapState('layout', {
    explorerWidth: 'explorerWidth',
    sideBarWidth: 'sideBarWidth',
    navigationBarHeight: 'navigationBarHeight',
    buttonBarWidth: 'buttonBarWidth',
    statusBarHeight: 'statusBarHeight',
    showEditor: 'showEditor',
    showSidePreview: 'showSidePreview',
    showNavigationBar: 'showNavigationBar',
    showStatusBar: 'showStatusBar',
    showSideBar: 'showSideBar',
    showExplorer: 'showExplorer',
    fontSize: 'fontSize',
    innerWidth: 'innerWidth',
    innerHeight: 'innerHeight',
    previewWidth: 'previewWidth',
    editorWidth: 'editorWidth',
  }),
  methods: {
    ...mapActions('layout', [
      'updateStyle',
    ]),
    saveSelection: () => editorSvc.saveSelection(true),
  },
  created() {
    this.updateStyle();
    window.addEventListener('resize', this.updateStyle);
    window.addEventListener('keyup', this.saveSelection);
    window.addEventListener('mouseup', this.saveSelection);
    window.addEventListener('contextmenu', this.saveSelection);
  },
  mounted() {
    const editorElt = this.$el.querySelector('.editor__inner');
    const previewElt = this.$el.querySelector('.preview__inner');
    const tocElt = this.$el.querySelector('.toc__inner');
    editorSvc.init(editorElt, previewElt, tocElt);

    // TOC click behaviour
    let isMousedown;
    function onClick(e) {
      if (!isMousedown) {
        return;
      }
      e.preventDefault();
      const y = e.clientY - tocElt.getBoundingClientRect().top;

      this.$store.state.sectionDescList.some((sectionDesc) => {
        if (y >= sectionDesc.tocDimension.endOffset) {
          return false;
        }
        const posInSection = (y - sectionDesc.tocDimension.startOffset)
          / (sectionDesc.tocDimension.height || 1);
        const editorScrollTop = sectionDesc.editorDimension.startOffset
          + (sectionDesc.editorDimension.height * posInSection);
        editorElt.parentNode.scrollTop = editorScrollTop - constants.scrollOffset;
        const previewScrollTop = sectionDesc.previewDimension.startOffset
          + (sectionDesc.previewDimension.height * posInSection);
        previewElt.parentNode.scrollTop = previewScrollTop - constants.scrollOffset;
        return true;
      });
    }

    tocElt.addEventListener('mouseup', () => {
      isMousedown = false;
    });
    tocElt.addEventListener('mouseleave', () => {
      isMousedown = false;
    });
    tocElt.addEventListener('mousedown', (e) => {
      isMousedown = e.which === 1;
      onClick(e);
    });
    tocElt.addEventListener('mousemove', (e) => {
      onClick(e);
    });
  },
  destroyed() {
    window.removeEventListener('resize', this.updateStyle);
  },
};
</script>

<style lang="scss">
.layout {
  position: absolute;
  width: 100%;
  height: 100%;
}

.layout__panel {
  position: relative;
  width: 100%;
  height: 100%;
  -webkit-flex: none;
  flex: none;
}

.layout__panel--navigation-bar {
  background-color: #2c2c2c;
}

.layout__panel--status-bar {
  background-color: #007acc;
}

.layout__panel--editor {
  background-color: #fff;
}

.layout__panel--explorer {
  background-color: #ddd;
}

.layout__panel--button-bar,
.layout__panel--status-bar,
.layout__panel--side-bar,
.layout__panel--navigation-bar {
  .app--loading & > * {
    opacity: 0.5;

    /* Hack to disable mouse focus */
    pointer-events: none;
  }
}
</style>
