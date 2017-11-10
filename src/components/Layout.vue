<template>
  <div class="layout">
    <div class="layout__panel flex flex--row" :class="{'flex--end': styles.showSideBar}">
      <div class="layout__panel layout__panel--explorer" v-show="styles.showExplorer" :aria-hidden="!styles.showExplorer" :style="{ width: styles.layoutOverflow ? '100%' : constants.explorerWidth + 'px' }">
        <explorer></explorer>
      </div>
      <div class="layout__panel flex flex--column" :style="{ width: styles.innerWidth + 'px' }">
        <div class="layout__panel layout__panel--navigation-bar" v-show="styles.showNavigationBar" :style="{ height: constants.navigationBarHeight + 'px' }">
          <navigation-bar></navigation-bar>
        </div>
        <div class="layout__panel flex flex--row" :style="{ height: styles.innerHeight + 'px' }">
          <div class="layout__panel layout__panel--editor" v-show="styles.showEditor" :style="{ width: (styles.editorWidth + styles.editorGutterWidth) + 'px', fontSize: styles.fontSize + 'px' }">
            <div class="gutter" v-if="styles.editorGutterWidth" :style="{left: styles.editorGutterLeft + 'px'}">
              <div class="gutter__background"></div>
            </div>
            <editor></editor>
            <div v-if="showFindReplace" class="layout__panel layout__panel--find-replace">
              <find-replace></find-replace>
            </div>
          </div>
          <div class="layout__panel layout__panel--button-bar" v-show="styles.showEditor" :style="{ width: constants.buttonBarWidth + 'px' }">
            <button-bar></button-bar>
          </div>
          <div class="layout__panel layout__panel--preview" v-show="styles.showPreview" :style="{ width: (styles.previewWidth + styles.previewGutterWidth) + 'px', fontSize: styles.fontSize + 'px' }">
            <div class="gutter" v-if="styles.previewGutterWidth" :style="{left: styles.previewGutterLeft + 'px'}">
              <div class="gutter__background"></div>
            </div>
            <preview></preview>
          </div>
        </div>
        <div class="layout__panel layout__panel--status-bar" v-show="styles.showStatusBar" :style="{ height: constants.statusBarHeight + 'px' }">
          <status-bar></status-bar>
        </div>
      </div>
      <div class="layout__panel layout__panel--side-bar" v-show="styles.showSideBar" :style="{ width: styles.layoutOverflow ? '100%' : constants.sideBarWidth + 'px' }">
        <side-bar></side-bar>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import NavigationBar from './NavigationBar';
import ButtonBar from './ButtonBar';
import StatusBar from './StatusBar';
import Explorer from './Explorer';
import SideBar from './SideBar';
import Editor from './Editor';
import Preview from './Preview';
import FindReplace from './FindReplace';
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
    FindReplace,
  },
  computed: {
    ...mapGetters('layout', [
      'constants',
      'styles',
    ]),
    showFindReplace() {
      return !!this.$store.state.findReplace.type;
    },
  },
  methods: {
    ...mapActions('layout', [
      'updateBodySize',
    ]),
    saveSelection: () => editorSvc.saveSelection(true),
  },
  created() {
    this.updateBodySize();
    window.addEventListener('resize', this.updateBodySize);
    window.addEventListener('keyup', this.saveSelection);
    window.addEventListener('mouseup', this.saveSelection);
    window.addEventListener('focusin', this.saveSelection);
    window.addEventListener('contextmenu', this.saveSelection);
  },
  mounted() {
    const editorElt = this.$el.querySelector('.editor__inner');
    const previewElt = this.$el.querySelector('.preview__inner-2');
    const tocElt = this.$el.querySelector('.toc__inner');
    editorSvc.init(editorElt, previewElt, tocElt);

    // Focus on the editor every time reader mode is disabled
    this.$watch(() => this.styles.showEditor,
      showEditor => showEditor && editorSvc.clEditor.focus());
  },
  destroyed() {
    window.removeEventListener('resize', this.updateStyle);
    window.removeEventListener('keyup', this.saveSelection);
    window.removeEventListener('mouseup', this.saveSelection);
    window.removeEventListener('focusin', this.saveSelection);
    window.removeEventListener('contextmenu', this.saveSelection);
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
  flex: none;
  overflow: hidden;
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

.layout__panel--button-bar,
.layout__panel--preview {
  background-color: #f3f3f3;
}

.layout__panel--explorer,
.layout__panel--side-bar {
  background-color: #dadada;
}

.layout__panel--find-replace {
  background-color: #e6e6e6;
  position: absolute;
  left: 0;
  bottom: 0;
  width: 300px;
  height: auto;
  border-top-right-radius: $border-radius-base;
}

.gutter__background {
  position: absolute;
  width: 9999px;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.05);
  right: 0;
}
</style>
