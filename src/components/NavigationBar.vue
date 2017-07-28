<template>
  <div class="navigation-bar" v-bind:class="{'navigation-bar--editor': showEditor}">
    <div class="navigation-bar__inner navigation-bar__inner--right flex flex--row">
      <div class="navigation-bar__spinner">
        <div class="spinner"></div>
      </div>
      <div class="navigation-bar__title navigation-bar__title--text text-input" v-bind:style="{maxWidth: titleMaxWidth + 'px'}"></div>
      <input class="navigation-bar__title navigation-bar__title--input text-input" v-bind:class="{'navigation-bar__title--focus': titleFocus, 'navigation-bar__title--scrolling': titleScrolling}" v-bind:style="{maxWidth: titleMaxWidth + 'px'}" @focus="editTitle(true)" @blur="editTitle(false)" @keyup.enter="submitTitle()" @keyup.esc="submitTitle(true)" v-model.lazy.trim="title">
    </div>
    <div class="navigation-bar__inner navigation-bar__inner--left">
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
import { mapState } from 'vuex';
import editorSvc from '../services/editorSvc';
import animationSvc from '../services/animationSvc';

export default {
  data: () => ({
    titleFocus: false,
    titleHover: false,
  }),
  computed: {
    ...mapState('layout', {
      showEditor: 'showEditor',
      titleMaxWidth: 'titleMaxWidth',
    }),
    title: {
      get() {
        return this.$store.getters['files/current'].name;
      },
      set(name) {
        this.$store.dispatch('files/patchCurrent', { name });
      },
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
    pagedownClick(name) {
      editorSvc.pagedownEditor.uiManager.doClick(name);
    },
    editTitle(toggle) {
      this.titleFocus = toggle;
      if (toggle) {
        this.titleInputElt.setSelectionRange(0, this.titleInputElt.value.length);
      }
    },
    submitTitle(reset) {
      if (reset) {
        this.titleInputElt.value = '';
      }
      this.titleInputElt.blur();
    },
  },
  mounted() {
    this.titleInputElt = this.$el.querySelector('.navigation-bar__title--input');
    const titleTextElt = this.$el.querySelector('.navigation-bar__title--text');

    const adjustWidth = () => {
      titleTextElt.textContent = this.titleInputElt.value;
      const width = titleTextElt.getBoundingClientRect().width + 1; // 1px for the caret
      this.titleInputElt.style.width = `${width}px`;
    };

    this.titleInputElt.addEventListener('keyup', adjustWidth);
    this.titleInputElt.addEventListener('input', adjustWidth);
    this.$store.watch(
      () => this.$store.getters['files/current'].name,
      adjustWidth, {
        immediate: true,
      });

    this.titleInputElt.addEventListener('mouseenter', () => {
      this.titleHover = true;
    });
    this.titleInputElt.addEventListener('mouseleave', () => {
      this.titleHover = false;
    });
  },
};
</script>

<style lang="scss">
@import 'common/variables.scss';

.navigation-bar {
  position: absolute;
  width: 100%;
  height: 100%;
  padding: 4px 15px 0;
  overflow: hidden;
}

.navigation-bar__inner--right {
  float: right;
}

.navigation-bar__button {
  display: inline-block;
  width: 34px;
  padding: 6px;
}

.navigation-bar__title,
.navigation-bar__button {
  display: inline-block;
  color: $navbar-color;
  background-color: transparent;
  font-weight: 400;
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

.navigation-bar__title--text {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.navigation-bar__title--input,
.navigation-bar__inner--left {
  display: none;
}

.navigation-bar--editor {
  .navigation-bar__title--text {
    position: absolute;
    left: -9999px;
    width: auto;
  }

  .navigation-bar__title--input,
  .navigation-bar__inner--left {
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
  margin: 10px 5px 0;
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
