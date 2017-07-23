<template>
  <div class="navigation-bar">
    <div class="navigation-bar__button" v-on:click="pagedownClick('bold')">
      <icon-format-bold></icon-format-bold>
    </div>
    <div class="navigation-bar__button" v-on:click="pagedownClick('italic')">
      <icon-format-italic></icon-format-italic>
    </div>
    <div class="navigation-bar__button" v-on:click="pagedownClick('strikethrough')">
      <icon-format-strikethrough></icon-format-strikethrough>
    </div>
    <div class="navigation-bar__button" v-on:click="pagedownClick('heading')">
      <icon-format-size></icon-format-size>
    </div>
    <div class="navigation-bar__button" v-on:click="pagedownClick('hr')">
      <icon-format-horizontal-rule></icon-format-horizontal-rule>
    </div>
    <div class="navigation-bar__button" v-on:click="pagedownClick('ulist')">
      <icon-format-list-bulleted></icon-format-list-bulleted>
    </div>
    <div class="navigation-bar__button" v-on:click="pagedownClick('olist')">
      <icon-format-list-numbers></icon-format-list-numbers>
    </div>
    <div class="navigation-bar__button" v-on:click="pagedownClick('table')">
      <icon-table></icon-table>
    </div>
    <div class="navigation-bar__button" v-on:click="pagedownClick('quote')">
      <icon-format-quote-close></icon-format-quote-close>
    </div>
    <div class="navigation-bar__button" v-on:click="pagedownClick('code')">
      <icon-code-braces></icon-code-braces>
    </div>
    <div class="navigation-bar__button" v-on:click="pagedownClick('link')">
      <icon-link-variant></icon-link-variant>
    </div>
    <div class="navigation-bar__button" v-on:click="pagedownClick('image')">
      <icon-file-image></icon-file-image>
    </div>
  </div>
</template>

<script>
import editorSvc from '../services/editorSvc';

export default {
  methods: {
    pagedownClick(name) {
      editorSvc.pagedownEditor.uiManager.doClick(name);
    },
  },
};
</script>

<style lang="scss">
.navigation-bar {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #2c2c2c;
  padding: 5px 15px 0;
}

.navigation-bar__button {
  display: inline-block;
  cursor: pointer;
  color: rgba(255, 255, 255, 0.67);
  width: 34px;
  height: 34px;
  padding: 4px;
  border-radius: 3px;

  &:hover {
    color: #fff;
  }
}
</style>
