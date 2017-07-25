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

button,
input,
select,
textarea {
  font-family: inherit;
  font-size: inherit;
  line-height: inherit;
}

.text-input {
  display: block;
  width: 100%;
  height: 36px;
  padding: 3px 12px;
  font-size: 22px;
  line-height: 1.5;
  color: inherit;
  background-color: #fff;
  background-image: none;
  border: 0;
  border-radius: $border-radius-base;
}

.button {
  color: #333;
  background-color: transparent;
  display: inline-block;
  height: 36px;
  padding: 3px 12px;
  margin-bottom: 0;
  font-size: 22px;
  font-weight: 400;
  line-height: 1.4;
  overflow: hidden;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  -ms-touch-action: manipulation;
  touch-action: manipulation;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  background-image: none;
  border: 0;
  border-radius: $border-radius-base;

  &:focus {
    color: #333;
    background-color: transparent;

    &:active,
    & {
      outline: 0;
    }
  }
}
</style>
