<template>
  <modal-inner class="modal__inner-1--about-modal" aria-label="About">
    <div class="modal__content">
      <div class="logo-background"></div>
      <div class="app-version">v{{version}} — © 2018 Benoit Schweblin</div>
      <hr>
      <a target="_blank" href="https://github.com/benweet/stackedit/">GitHub repo</a> —
      <a target="_blank" href="https://github.com/benweet/stackedit/issues">issue tracker</a>
      <br>
      <a target="_blank" href="https://chrome.google.com/webstore/detail/stackedit/iiooodelglhkcpgbajoejffhijaclcdg">Chrome app</a> — thanks for your review!
      <br>
      StackEdit on <a target="_blank" href="https://twitter.com/stackedit/">Twitter</a>
      <hr>
      Licensed under an
      <a target="_blank" href="http://www.apache.org/licenses/LICENSE-2.0">Apache License</a>
      <br>
      <a target="_blank" href="privacy_policy.html">Privacy Policy</a>
    </div>
    <div class="modal__button-bar">
      <button class="button" @click="config.resolve()">Close</button>
    </div>
  </modal-inner>
</template>

<script>
import { mapGetters } from 'vuex';
import ModalInner from './common/ModalInner';

export default {
  components: {
    ModalInner,
  },
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
    margin: 0.5rem 0;
  }

  .app-version {
    font-size: 0.8em;
  }

  hr {
    width: 160px;
    max-width: 100%;
    margin: 1.5em auto;
  }
}
</style>
