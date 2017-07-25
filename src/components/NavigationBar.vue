<template>
  <div class="navigation-bar">
    <div class="navigation-bar__title-mirror button" v-bind:style="{ maxWidth: titleMaxWidth + 'px' }"></div>
    <div class="navigation-bar__inner navigation-bar__inner--right">
      <button v-if="!editingTitle" v-on:click="editingTitle = true" v-bind:style="{ width: titleWidth + 'px' }" class="navigation-bar__title button">{{title}}</button>
      <input v-if="editingTitle" v-on:blur="editingTitle = false" v-model.lazy.trim="title" v-focus v-autosize @keyup.enter="editingTitle = false" @keyup.esc="resetTitle" type="text" class="navigation-bar__title navigation-bar__title--input text-input">
    </div>
    <div class="navigation-bar__inner navigation-bar__inner--left" v-if="showEditor">
      <button class="navigation-bar__button button" v-on:click="pagedownClick('bold')">
        <icon-format-bold></icon-format-bold>
      </button>
      <button class="navigation-bar__button button" v-on:click="pagedownClick('italic')">
        <icon-format-italic></icon-format-italic>
      </button>
      <button class="navigation-bar__button button" v-on:click="pagedownClick('strikethrough')">
        <icon-format-strikethrough></icon-format-strikethrough>
      </button>
      <button class="navigation-bar__button button" v-on:click="pagedownClick('heading')">
        <icon-format-size></icon-format-size>
      </button>
      <button class="navigation-bar__button button" v-on:click="pagedownClick('ulist')">
        <icon-format-list-bulleted></icon-format-list-bulleted>
      </button>
      <button class="navigation-bar__button button" v-on:click="pagedownClick('olist')">
        <icon-format-list-numbers></icon-format-list-numbers>
      </button>
      <button class="navigation-bar__button button" v-on:click="pagedownClick('table')">
        <icon-table></icon-table>
      </button>
      <button class="navigation-bar__button button" v-on:click="pagedownClick('quote')">
        <icon-format-quote-close></icon-format-quote-close>
      </button>
      <button class="navigation-bar__button button" v-on:click="pagedownClick('code')">
        <icon-code-braces></icon-code-braces>
      </button>
      <button class="navigation-bar__button button" v-on:click="pagedownClick('link')">
        <icon-link-variant></icon-link-variant>
      </button>
      <button class="navigation-bar__button button" v-on:click="pagedownClick('image')">
        <icon-file-image></icon-file-image>
      </button>
      <button class="navigation-bar__button button" v-on:click="pagedownClick('hr')">
        <icon-format-horizontal-rule></icon-format-horizontal-rule>
      </button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import editorSvc from '../services/editorSvc';

let titleMirrorElt;

export default {
  directives: {
    focus: {
      inserted(elt) {
        elt.focus();
        elt.select();
      },
    },
    autosize: {
      inserted(elt) {
        function adjustWidth() {
          titleMirrorElt.textContent = elt.value;
          const width = titleMirrorElt.getBoundingClientRect().width + 1; // 1px for the caret
          elt.style.width = `${width}px`;
        }

        adjustWidth();
        elt.addEventListener('keyup', adjustWidth);
        elt.addEventListener('input', adjustWidth);
      },
    },
  },
  data: () => ({
    editingTitle: null,
    isMounted: false,
  }),
  computed: {
    ...mapState('layout', {
      showEditor: 'showEditor',
      titleMaxWidth: 'titleMaxWidth',
    }),
    title: {
      get() {
        return this.$store.state.files.currentFile.name;
      },
      set(value) {
        this.$store.commit('files/setCurrentFileName', value);
      },
    },
    titleWidth() {
      if (!this.isMounted) {
        return 0;
      }
      titleMirrorElt.textContent = this.$store.state.files.currentFile.name;
      return titleMirrorElt.getBoundingClientRect().width + 1; // 1px for the caret
    },
  },
  methods: {
    pagedownClick(name) {
      editorSvc.pagedownEditor.uiManager.doClick(name);
    },
    resetTitle(event) {
      event.target.value = '';
      this.editingTitle = false;
    },
  },
  mounted() {
    titleMirrorElt = this.$el.querySelector('.navigation-bar__title-mirror');
    this.isMounted = true;
  },
};
</script>

<style lang="scss">
.navigation-bar {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #2c2c2c;
  padding: 4px 15px 0;
  overflow: hidden;
}

.navigation-bar__inner--left {
  float: left;
}

.navigation-bar__inner--right {
  float: right;
}

$navbar-button-color: rgba(255, 255, 255, 0.67);
$navbar-button-hover-background: #484848;

.navigation-bar__button {
  display: inline-block;
  width: 34px;
  padding: 6px 5px;
}

.navigation-bar__title,
.navigation-bar__title-mirror,
.navigation-bar__button {
  display: inline-block;
  color: $navbar-button-color;
  background-color: transparent;
  font-weight: 400;

  &:active,
  &:focus,
  &:hover {
    color: #fff;
    background-color: $navbar-button-hover-background;
  }
}

.navigation-bar__title-mirror {
  position: absolute;
  left: -9999px;
  width: auto;
}
</style>
