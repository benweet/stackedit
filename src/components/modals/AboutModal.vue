<template>
  <div class="modal__inner-1 modal__inner-1--about-modal">
    <div class="modal__inner-2">
      <div class="logo-background"></div>
      <div class="app-version">v{{version}} — © 2017 Benoit Schweblin</div>
      <hr>
      <a target="_blank" href="https://github.com/benweet/stackedit/">StackEdit on GitHub</a> /
      <a target="_blank" href="https://github.com/benweet/stackedit/issues">issue tracker</a>
      <br>
      <a target="_blank" href="https://chrome.google.com/webstore/detail/stackedit/iiooodelglhkcpgbajoejffhijaclcdg">Chrome app</a> — thanks for your review!
      <br>
      <a target="_blank" href="https://twitter.com/stackedit/">StackEdit on Twitter</a>
      <hr>
      <a target="_blank" href="privacy_policy.html">Privacy Policy</a>
      <div class="modal__button-bar">
        <button class="button" @click="config.resolve()">Close</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data: () => ({
    version: VERSION,
  }),
  computed: mapGetters('modal', [
    'config',
  ]),
};
</script>

<style lang="scss">
.modal__inner-1--about-modal {
  text-align: center;

  .logo-background {
    height: 75px;
    margin-bottom: 0.5rem;
  }

  .app-version {
    font-size: 0.75em;
  }

  hr {
    width: 160px;
    max-width: 100%;
    margin: 1.5em auto;
  }
}
</style>
