<template>
  <div class="navigation-bar" :class="{'navigation-bar--editor': styles.showEditor}">
    <div class="navigation-bar__inner navigation-bar__inner--left navigation-bar__inner--button">
      <button class="navigation-bar__button button" @click="toggleExplorer()">
        <icon-folder-multiple></icon-folder-multiple>
      </button>
    </div>
    <div class="navigation-bar__inner navigation-bar__inner--right navigation-bar__inner--button">
      <button class="navigation-bar__button button" @click="toggleSideBar()">
        <icon-menu></icon-menu>
      </button>
    </div>
    <div class="navigation-bar__inner navigation-bar__inner--right flex flex--row">
      <div class="navigation-bar__spinner">
        <div class="spinner"></div>
      </div>
      <div class="navigation-bar__title navigation-bar__title--fake text-input"></div>
      <div class="navigation-bar__title navigation-bar__title--text text-input" v-bind:style="{maxWidth: styles.titleMaxWidth + 'px'}">{{title}}</div>
      <input class="navigation-bar__title navigation-bar__title--input text-input" :class="{'navigation-bar__title--focus': titleFocus, 'navigation-bar__title--scrolling': titleScrolling}" v-bind:style="{width: titleWidth + 'px'}" @focus="editTitle(true)" @blur="editTitle(false)" @keyup.enter="submitTitle()" @keyup.esc="submitTitle(true)" v-on:mouseenter="titleHover = true" v-on:mouseleave="titleHover = false" v-model="title">
    </div>
    <div class="navigation-bar__inner navigation-bar__inner--edit-buttons">
      <button class="navigation-bar__button button" @click="pagedownClick('bold')">
        <icon-format-bold></icon-format-bold>
      </button>
      <button class="navigation-bar__button button" @click="pagedownClick('italic')">
        <icon-format-italic></icon-format-italic>
      </button>
      <button class="navigation-bar__button button" @click="pagedownClick('strikethrough')">
        <icon-format-strikethrough></icon-format-strikethrough>
      </button>
      <button class="navigation-bar__button button" @click="pagedownClick('heading')">
        <icon-format-size></icon-format-size>
      </button>
      <button class="navigation-bar__button button" @click="pagedownClick('ulist')">
        <icon-format-list-bulleted></icon-format-list-bulleted>
      </button>
      <button class="navigation-bar__button button" @click="pagedownClick('olist')">
        <icon-format-list-numbers></icon-format-list-numbers>
      </button>
      <button class="navigation-bar__button button" @click="pagedownClick('table')">
        <icon-table></icon-table>
      </button>
      <button class="navigation-bar__button button" @click="pagedownClick('quote')">
        <icon-format-quote-close></icon-format-quote-close>
      </button>
      <button class="navigation-bar__button button" @click="pagedownClick('code')">
        <icon-code-braces></icon-code-braces>
      </button>
      <button class="navigation-bar__button button" @click="pagedownClick('link')">
        <icon-link-variant></icon-link-variant>
      </button>
      <button class="navigation-bar__button button" @click="pagedownClick('image')">
        <icon-file-image></icon-file-image>
      </button>
      <button class="navigation-bar__button button" @click="pagedownClick('hr')">
        <icon-format-horizontal-rule></icon-format-horizontal-rule>
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import editorSvc from '../services/editorSvc';
import animationSvc from '../services/animationSvc';

export default {
  data: () => ({
    mounted: false,
    title: '',
    titleFocus: false,
    titleHover: false,
  }),
  computed: {
    ...mapGetters('layout', [
      'styles',
    ]),
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
    pagedownClick(name) {
      editorSvc.pagedownEditor.uiManager.doClick(name);
    },
    editTitle(toggle) {
      this.titleFocus = toggle;
      if (toggle) {
        this.titleInputElt.setSelectionRange(0, this.titleInputElt.value.length);
      } else {
        const title = this.title.trim();
        if (title) {
          this.$store.dispatch('files/patchCurrent', { name: title.slice(0, 250) });
        } else {
          this.title = this.$store.getters['files/current'].name;
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
      () => this.$store.getters['files/current'].name,
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
}

.navigation-bar__button {
  width: 34px;
  padding: 6px;

  /* prevent from seeing wrapped buttons */
  margin-bottom: 20px;

  .navigation-bar__inner--button & {
    padding: 7px;
    width: 38px;
  }
}

.navigation-bar__title,
.navigation-bar__button {
  display: inline-block;
  color: $navbar-color;
  background-color: transparent;
  font-size: 22px;
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
.navigation-bar__inner--edit-buttons,
.navigation-bar__inner--button {
  display: none;

  .navigation-bar--editor & {
    display: block;
  }
}

.navigation-bar__title--input {
  cursor: pointer;

  &.navigation-bar__title--focus {
    cursor: text;
  }
}

.navigation-bar__spinner {
  margin: 10px 5px 0 15px;
  color: rgba(255, 255, 255, 0.33);
}

$r: 9px;
$d: $r * 2;
$b: $d/10;
$t: 1500ms;

.spinner {
  width: $d;
  height: $d;
  display: block;
  position: relative;
  border: $b solid currentColor;
  border-radius: 50%;

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
    height: $r * 0.5;
    left: $r - $b * 1.5;
    top: 50%;
    animation: spin $t linear infinite;
  }
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
