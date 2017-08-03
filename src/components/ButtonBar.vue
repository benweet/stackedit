<template>
  <div class="button-bar">
    <div class="button-bar__inner button-bar__inner--top">
      <div class="button-bar__button" :class="{ 'button-bar__button--on': localSettings.showNavigationBar }" @click="toggleNavigationBar()">
        <icon-navigation-bar></icon-navigation-bar>
      </div>
      <div class="button-bar__button" :class="{ 'button-bar__button--on': localSettings.showSidePreview }" @click="toggleSidePreview()">
        <icon-side-preview></icon-side-preview>
      </div>
      <div class="button-bar__button" @click="toggleEditor(false)">
        <icon-eye></icon-eye>
      </div>
    </div>
    <div class="button-bar__inner button-bar__inner--bottom">
      <div class="button-bar__button" :class="{ 'button-bar__button--on': localSettings.focusMode }" @click="toggleFocusMode()">
        <icon-target></icon-target>
      </div>
      <div class="button-bar__button" :class="{ 'button-bar__button--on': localSettings.showStatusBar }" @click="toggleStatusBar()">
        <icon-status-bar></icon-status-bar>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  computed: mapGetters('data', [
    'localSettings',
  ]),
  methods: mapActions('data', [
    'toggleNavigationBar',
    'toggleEditor',
    'toggleSidePreview',
    'toggleStatusBar',
    'toggleFocusMode',
  ]),
};
</script>


<style lang="scss">
.button-bar {
  position: absolute;
  width: 100%;
  height: 100%;
}

.button-bar__inner {
  position: absolute;
}

.button-bar__inner--bottom {
  bottom: 0;
}

.button-bar__button {
  cursor: pointer;
  color: rgba(0, 0, 0, 0.2);
  width: 26px;
  height: 26px;
  padding: 2px;
  margin: 3px 0;

  &:hover {
    color: rgba(0, 0, 0, 0.4);
  }
}

.button-bar__button--on {
  color: rgba(0, 0, 0, 0.4);
}
</style>
