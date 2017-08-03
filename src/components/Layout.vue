<template>
  <div class="layout">
    <div class="layout__panel flex flex--row">
      <div class="layout__panel layout__panel--explorer" v-show="styles.showExplorer" :style="{ width: constants.explorerWidth + 'px' }">
        <explorer></explorer>
      </div>
      <div class="layout__panel flex flex--column" :style="{ width: styles.innerWidth + 'px' }">
        <div class="layout__panel layout__panel--navigation-bar" v-show="styles.showNavigationBar" :style="{ height: constants.navigationBarHeight + 'px' }">
          <navigation-bar></navigation-bar>
        </div>
        <div class="layout__panel flex flex--row" :style="{ height: styles.innerHeight + 'px' }">
          <div class="layout__panel layout__panel--editor" v-show="styles.showEditor" :style="{ width: styles.editorWidth + 'px', 'font-size': styles.fontSize + 'px' }">
            <editor></editor>
          </div>
          <div class="layout__panel layout__panel--button-bar" v-show="styles.showEditor" :style="{ width: constants.buttonBarWidth + 'px' }">
            <button-bar></button-bar>
          </div>
          <div class="layout__panel layout__panel--preview" v-show="styles.showPreview" :style="{ width: styles.previewWidth + 'px', 'font-size': styles.fontSize + 'px' }">
            <preview></preview>
          </div>
        </div>
        <div class="layout__panel layout__panel--status-bar" v-show="styles.showStatusBar" :style="{ height: constants.statusBarHeight + 'px' }">
          <status-bar></status-bar>
        </div>
      </div>
      <div class="layout__panel layout__panel--side-bar" v-show="styles.showSideBar" :style="{ width: constants.sideBarWidth + 'px' }">
        <side-bar></side-bar>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex';
import NavigationBar from './NavigationBar';
import ButtonBar from './ButtonBar';
import StatusBar from './StatusBar';
import Explorer from './Explorer';
import SideBar from './SideBar';
import Editor from './Editor';
import Preview from './Preview';
import editorSvc from '../services/editorSvc';

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
  computed: {
    ...mapState('layout', [
      'constants',
    ]),
    ...mapGetters('layout', [
      'styles',
    ]),
  },
  methods: {
    ...mapMutations('layout', [
      'updateBodySize',
    ]),
    saveSelection: () => editorSvc.saveSelection(true),
  },
  created() {
    this.updateBodySize();
    window.addEventListener('resize', this.updateBodySize);
    window.addEventListener('keyup', this.saveSelection);
    window.addEventListener('mouseup', this.saveSelection);
    window.addEventListener('contextmenu', this.saveSelection);
  },
  mounted() {
    const editorElt = this.$el.querySelector('.editor__inner');
    const previewElt = this.$el.querySelector('.preview__inner-2');
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

      editorSvc.sectionDescList.some((sectionDesc) => {
        if (y >= sectionDesc.tocDimension.endOffset) {
          return false;
        }
        const posInSection = (y - sectionDesc.tocDimension.startOffset)
          / (sectionDesc.tocDimension.height || 1);
        const editorScrollTop = sectionDesc.editorDimension.startOffset
          + (sectionDesc.editorDimension.height * posInSection);
        editorElt.parentNode.scrollTop = editorScrollTop;
        const previewScrollTop = sectionDesc.previewDimension.startOffset
          + (sectionDesc.previewDimension.height * posInSection);
        previewElt.parentNode.scrollTop = previewScrollTop;
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
@import 'common/variables.scss';

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
  background-color: #dadada;
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
