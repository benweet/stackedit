<template>
  <nav class="navigation-bar" :class="{'navigation-bar--editor': styles.showEditor}">
    <div class="navigation-bar__inner navigation-bar__inner--left navigation-bar__inner--button">
      <button class="navigation-bar__button button" @click="toggleExplorer()" v-title="'Toggle explorer'">
        <icon-folder></icon-folder>
      </button>
    </div>
    <div class="navigation-bar__inner navigation-bar__inner--right navigation-bar__inner--button">
      <button class="navigation-bar__button navigation-bar__button--stackedit button" @click="toggleSideBar()" v-title="'Toggle side bar'">
        <icon-provider provider-id="stackedit"></icon-provider>
      </button>
    </div>
    <div class="navigation-bar__inner navigation-bar__inner--right navigation-bar__inner--title flex flex--row">
      <div class="navigation-bar__spinner">
        <div v-if="!offline && showSpinner" class="spinner"></div>
        <icon-sync-off v-if="offline"></icon-sync-off>
      </div>
      <div class="navigation-bar__title navigation-bar__title--fake text-input"></div>
      <div class="navigation-bar__title navigation-bar__title--text text-input" :style="{width: titleWidth + 'px'}">{{title}}</div>
      <input class="navigation-bar__title navigation-bar__title--input text-input" :class="{'navigation-bar__title--focus': titleFocus, 'navigation-bar__title--scrolling': titleScrolling}" :style="{width: titleWidth + 'px'}" @focus="editTitle(true)" @blur="editTitle(false)" @keyup.enter="submitTitle()" @keyup.esc="submitTitle(true)" @mouseenter="titleHover = true" @mouseleave="titleHover = false" v-model="title">
      <div class="flex flex--row" :class="{'navigation-bar__hidden': styles.hideLocations}">
        <a class="navigation-bar__button navigation-bar__button--location button" :class="{'navigation-bar__button--blink': location.id === currentLocation.id}" v-for="location in syncLocations" :key="location.id" :href="location.url" target="_blank" v-title="'Synchronized location'">
          <icon-provider :provider-id="location.providerId"></icon-provider>
        </a>
        <button class="navigation-bar__button navigation-bar__button--sync button" :disabled="!isSyncPossible || isSyncRequested || offline" @click="requestSync" v-title="'Synchronize now'">
          <icon-sync></icon-sync>
        </button>
        <a class="navigation-bar__button navigation-bar__button--location button" :class="{'navigation-bar__button--blink': location.id === currentLocation.id}" v-for="location in publishLocations" :key="location.id" :href="location.url" target="_blank" v-title="'Publish location'">
          <icon-provider :provider-id="location.providerId"></icon-provider>
        </a>
        <button class="navigation-bar__button navigation-bar__button--publish button" :disabled="!publishLocations.length || isPublishRequested || offline" @click="requestPublish"v-title="'Publish now'">
          <icon-upload></icon-upload>
        </button>
      </div>
    </div>
    <div class="navigation-bar__inner navigation-bar__inner--edit-buttons">
      <button class="navigation-bar__button button" @click="undo" v-title="'Undo'" :disabled="!canUndo">
        <icon-undo></icon-undo>
      </button>
      <button class="navigation-bar__button button" @click="redo" v-title="'Redo'" :disabled="!canRedo">
        <icon-redo></icon-redo>
      </button>
      <div class="navigation-bar__spacer"></div>
      <button class="navigation-bar__button button" @click="pagedownClick('bold')" v-title="'Bold'">
        <icon-format-bold></icon-format-bold>
      </button>
      <button class="navigation-bar__button button" @click="pagedownClick('italic')" v-title="'Italic'">
        <icon-format-italic></icon-format-italic>
      </button>
      <button class="navigation-bar__button button" @click="pagedownClick('strikethrough')" v-title="'Strikethrough'">
        <icon-format-strikethrough></icon-format-strikethrough>
      </button>
      <button class="navigation-bar__button button" @click="pagedownClick('heading')" v-title="'Heading'">
        <icon-format-size></icon-format-size>
      </button>
      <button class="navigation-bar__button button" @click="pagedownClick('ulist')" v-title="'Unordered list'">
        <icon-format-list-bulleted></icon-format-list-bulleted>
      </button>
      <button class="navigation-bar__button button" @click="pagedownClick('olist')" v-title="'Ordered list'">
        <icon-format-list-numbers></icon-format-list-numbers>
      </button>
      <button class="navigation-bar__button button" @click="pagedownClick('table')" v-title="'Table'">
        <icon-table></icon-table>
      </button>
      <button class="navigation-bar__button button" @click="pagedownClick('quote')" v-title="'Blockquote'">
        <icon-format-quote-close></icon-format-quote-close>
      </button>
      <button class="navigation-bar__button button" @click="pagedownClick('code')" v-title="'Code'">
        <icon-code-tags></icon-code-tags>
      </button>
      <button class="navigation-bar__button button" @click="pagedownClick('link')" v-title="'Link'">
        <icon-link-variant></icon-link-variant>
      </button>
      <button class="navigation-bar__button button" @click="pagedownClick('image')" v-title="'Image'">
        <icon-file-image></icon-file-image>
      </button>
      <button class="navigation-bar__button button" @click="pagedownClick('hr')" v-title="'Horizontal rule'">
        <icon-format-horizontal-rule></icon-format-horizontal-rule>
      </button>
    </div>
  </nav>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import editorSvc from '../services/editorSvc';
import editorEngineSvc from '../services/editorEngineSvc';
import syncSvc from '../services/syncSvc';
import publishSvc from '../services/publishSvc';
import animationSvc from '../services/animationSvc';
import utils from '../services/utils';

export default {
  data: () => ({
    mounted: false,
    title: '',
    titleFocus: false,
    titleHover: false,
  }),
  computed: {
    ...mapState([
      'offline',
    ]),
    ...mapState('queue', [
      'isSyncRequested',
      'isPublishRequested',
      'currentLocation',
    ]),
    ...mapState('layout', [
      'canUndo',
      'canRedo',
    ]),
    ...mapGetters('layout', [
      'styles',
    ]),
    ...mapGetters('syncLocation', {
      syncLocations: 'current',
    }),
    ...mapGetters('publishLocation', {
      publishLocations: 'current',
    }),
    isSyncPossible() {
      return this.$store.getters['data/loginToken'] ||
        this.$store.getters['syncLocation/current'].length;
    },
    showSpinner() {
      return !this.$store.state.queue.isEmpty;
    },
    titleWidth() {
      if (!this.mounted) {
        return 0;
      }
      this.titleFakeElt.textContent = this.title;
      const width = this.titleFakeElt.getBoundingClientRect().width + 2; // 2px for the caret
      return width < this.styles.titleMaxWidth
        ? width
        : this.styles.titleMaxWidth;
    },
    titleScrolling() {
      const result = this.titleHover && !this.titleFocus;
      if (this.titleInputElt) {
        if (result) {
          const scrollLeft = this.titleInputElt.scrollWidth - this.titleInputElt.offsetWidth;
          animationSvc.animate(this.titleInputElt)
            .scrollLeft(scrollLeft)
            .duration(scrollLeft * 10)
            .easing('inOut')
            .start();
        } else {
          animationSvc.animate(this.titleInputElt)
            .scrollLeft(0)
            .start();
        }
      }
      return result;
    },
  },
  methods: {
    ...mapActions('data', [
      'toggleExplorer',
      'toggleSideBar',
    ]),
    undo() {
      return editorEngineSvc.clEditor.undoMgr.undo();
    },
    redo() {
      return editorEngineSvc.clEditor.undoMgr.redo();
    },
    requestSync() {
      if (this.isSyncPossible && !this.isSyncRequested) {
        syncSvc.requestSync();
      }
    },
    requestPublish() {
      if (this.publishLocations.length && !this.isPublishRequested) {
        publishSvc.requestPublish();
      }
    },
    pagedownClick(name) {
      if (this.$store.getters['content/current'].id &&
        this.$store.getters['layout/styles'].showEditor
      ) {
        editorSvc.pagedownEditor.uiManager.doClick(name);
      }
    },
    editTitle(toggle) {
      this.titleFocus = toggle;
      if (toggle) {
        this.titleInputElt.setSelectionRange(0, this.titleInputElt.value.length);
      } else {
        const title = this.title.trim();
        if (title) {
          this.$store.dispatch('file/patchCurrent', { name: utils.sanitizeName(title) });
        } else {
          this.title = this.$store.getters['file/current'].name;
        }
      }
    },
    submitTitle(reset) {
      if (reset) {
        this.title = '';
      }
      this.titleInputElt.blur();
    },
  },
  created() {
    this.$store.watch(
      () => this.$store.getters['file/current'].name,
      (name) => {
        this.title = name;
      }, { immediate: true });
  },
  mounted() {
    this.titleFakeElt = this.$el.querySelector('.navigation-bar__title--fake');
    this.titleInputElt = this.$el.querySelector('.navigation-bar__title--input');
    this.mounted = true;
  },
};
</script>

<style lang="scss">
@import 'common/variables.scss';

.navigation-bar {
  position: absolute;
  width: 100%;
  height: 100%;
  padding-top: 4px;
  overflow: hidden;
}

.navigation-bar__hidden {
  display: none;
}

.navigation-bar__inner--left {
  float: left;

  &.navigation-bar__inner--button {
    margin-right: 15px;
  }
}

.navigation-bar__inner--right {
  float: right;
}

.navigation-bar__inner--button {
  margin: 0 4px;
}

.navigation-bar__inner--edit-buttons {
  margin-left: 15px;

  .navigation-bar__button,
  .navigation-bar__spacer {
    float: left;
  }
}

.navigation-bar__inner--title * {
  flex: none;
}

$button-size: 36px;

.navigation-bar__button,
.navigation-bar__spacer {
  height: $button-size;
  padding: 0 4px;

  /* prevent from seeing wrapped buttons */
  margin-bottom: 20px;
}

.navigation-bar__button {
  width: $button-size;
  padding: 0 8px;

  .navigation-bar__inner--button & {
    padding: 0 4px;
    width: 38px;

    &.navigation-bar__button--stackedit {
      opacity: 0.85;

      &:active,
      &:focus,
      &:hover {
        opacity: 1;
      }
    }
  }
}

.navigation-bar__title {
  margin: 0 4px;
}

.navigation-bar__title,
.navigation-bar__button {
  display: inline-block;
  color: $navbar-color;
  background-color: transparent;
  font-size: 22px;
}

.navigation-bar__button--sync,
.navigation-bar__button--publish {
  padding: 0 6px;
  margin: 0 5px;
}

.navigation-bar__button[disabled] {
  &,
  &:active,
  &:focus,
  &:hover {
    color: $navbar-color;
  }
}

.navigation-bar__title--input,
.navigation-bar__button {
  &:active,
  &:focus,
  &:hover {
    color: $navbar-hover-color;
    background-color: $navbar-hover-background;
  }
}

.navigation-bar__button--location {
  width: 20px;
  height: 20px;
  border-radius: 10px;
  padding: 2px;
  margin-top: 8px;
  opacity: 0.5;
  background-color: rgba(255, 255, 255, 0.2);

  &:active,
  &:focus,
  &:hover {
    opacity: 1;
    background-color: rgba(255, 255, 255, 0.2);
  }
}

.navigation-bar__button--blink {
  animation: blink 1s linear infinite;
}

.navigation-bar__title--fake {
  position: absolute;
  left: -9999px;
  width: auto;
  white-space: pre-wrap;
}

.navigation-bar__title--text {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  .navigation-bar--editor & {
    display: none;
  }
}

.navigation-bar__title--input,
.navigation-bar__inner--edit-buttons {
  display: none;

  .navigation-bar--editor & {
    display: block;
  }
}

.navigation-bar__button {
  display: none;

  .navigation-bar__inner--button &,
  .navigation-bar--editor & {
    display: inline-block;
  }
}

.navigation-bar__title--input {
  cursor: pointer;

  &.navigation-bar__title--focus {
    cursor: text;
  }
}

$r: 10px;
$d: $r * 2;
$b: $d/10;
$t: 3000ms;

.navigation-bar__spinner {
  width: 24px;
  margin: 7px 0 0 8px;
  color: #b2b2b2;

  .icon {
    width: 24px;
    height: 24px;
    color: transparentize($error-color, 0.5);
  }
}

.spinner {
  width: $d;
  height: $d;
  display: block;
  position: relative;
  border: $b solid currentColor;
  border-radius: 50%;
  margin: 2px;

  &::before,
  &::after {
    content: "";
    position: absolute;
    display: block;
    width: $b;
    background-color: currentColor;
    border-radius: $b * 0.5;
    transform-origin: 50% 0;
  }

  &::before {
    height: $r * 0.35;
    left: $r - $b * 1.5;
    top: 50%;
    animation: spin $t linear infinite;
  }

  &::after {
    height: $r * 0.5;
    left: $r - $b * 1.5;
    top: 50%;
    animation: spin $t/4 linear infinite;
  }
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@keyframes blink {
  50% {
    opacity: 1;
  }
}
</style>
