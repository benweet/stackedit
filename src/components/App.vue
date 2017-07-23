<template>
  <div id="app">
    <layout></layout>
  </div>
</template>

<script>
import Layout from './Layout';

export default {
  components: {
    Layout,
  },
};
</script>

<style lang="scss">
@import 'common/variables.scss';
@import 'common/markdownHighlighting';
@import 'common/prism';
@import 'common/flex';
@import 'common/base';

body {
  background-color: #f3f3f3;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  position: fixed;
  tab-size: 4;
  text-rendering: auto;
}

* {
  box-sizing: border-box;
}

:focus {
  outline: none;
}

.icon {
  * {
    fill: currentColor;
  }
}
</style>
