<template>
  <div class="layout">
    <div class="layout__panel layout__panel--inner-1" :style="{ top: inner1Y + 'px', height: inner1Height + 'px' }">
      <div class="layout__panel layout__panel--inner-2" :style="{ height: inner2Height + 'px' }">
        <div class="layout__panel layout__panel--inner-3" :style="{ left: inner3X + 'px', width: inner3Width + 'px' }">
          <div class="layout__panel layout__panel--button-bar">
            <button-bar></button-bar>
          </div>
          <div class="layout__panel layout__panel--preview" v-show="showSidePreview || !showEditor" :style="{ width: previewWidth + 'px', 'font-size': fontSize + 'px' }">
            <preview></preview>
          </div>
        </div>
        <div class="layout__panel layout__panel--editor" v-show="showEditor" :style="{ width: editorWidth + 'px', 'font-size': fontSize + 'px' }">
          <editor></editor>
        </div>
      </div>
      <div class="layout__panel layout__panel--status-bar" :style="{ top: statusBarY + 'px' }">
        <status-bar></status-bar>
      </div>
    </div>
    <div class="layout__panel layout__panel--navigation-bar" :style="{ top: navigationBarY + 'px' }">
      <navigation-bar></navigation-bar>
    </div>
    <div class="layout__panel layout__panel--side-bar" :style="{ left: sideBarX + 'px' }">
      <side-bar></side-bar>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import NavigationBar from './NavigationBar';
import SideBar from './SideBar';
import ButtonBar from './ButtonBar';
import StatusBar from './StatusBar';
import Editor from './Editor';
import Preview from './Preview';
import editorSvc from '../services/editorSvc';
import constants from '../services/constants';

export default {
  components: {
    NavigationBar,
    SideBar,
    ButtonBar,
    StatusBar,
    Editor,
    Preview,
  },
  computed: mapState('layout', {
    showEditor: 'showEditor',
    showSidePreview: 'showSidePreview',
    fontSize: 'fontSize',
    inner1Y: 'inner1Y',
    inner1Height: 'inner1Height',
    inner2Height: 'inner2Height',
    inner3X: 'inner3X',
    inner3Width: 'inner3Width',
    navigationBarY: 'navigationBarY',
    sideBarX: 'sideBarX',
    statusBarY: 'statusBarY',
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
.layout__panel {
  position: absolute;
  width: 100%;
  height: 100%;
}

.layout__panel--inner-1 {
  right: 0;
}

.layout__panel--button-bar {
  /* buttonBarWidth */
  width: 30px;
}

.layout__panel--preview {
  /* buttonBarWidth */
  left: 30px;
}

.layout__panel--status-bar {
  /* statusBarHeight */
  height: 20px;
  background-color: #007acc;
}

.layout__panel--side-bar {
  /* sideBarWidth */
  width: 280px;
}

.layout__panel--navigation-bar {
  /* navigationBarHeight */
  height: 44px;
  background-color: #2c2c2c;
}

.layout__panel--button-bar,
.layout__panel--status-bar,
.layout__panel--side-bar,
.layout__panel--navigation-bar {
  .app--loading & > * {
    display: none !important;
  }
}
</style>
