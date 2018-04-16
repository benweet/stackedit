<template>
  <modal-inner class="modal__inner-1--about-modal" aria-label="About">
    <div class="modal__content">
      <div class="logo-background"></div>
      <small>v{{version}} — © 2018 Dock5 Software</small>
      <hr>
      StackEdit on <a target="_blank" href="https://github.com/benweet/stackedit/">GitHub</a>
      <br>
      <a target="_blank" href="https://github.com/benweet/stackedit/issues">Issue tracker</a> — <a target="_blank" href="https://github.com/benweet/stackedit/blob/master/CHANGELOG.md">Changelog</a>
      <br>
      <a target="_blank" href="https://chrome.google.com/webstore/detail/iiooodelglhkcpgbajoejffhijaclcdg">Chrome app</a> — <a target="_blank" href="https://chrome.google.com/webstore/detail/ajehldoplanpchfokmeempkekhnhmoha">Chrome extension</a>
      <br>
      StackEdit on <a target="_blank" href="https://twitter.com/stackedit/">Twitter</a>
      <br>
      <a target="_blank" href="https://community.stackedit.io/">Community</a>
      <div class="modal__info">
      For commercial support or custom development, please <a href="mailto:stackedit.project@gmail.com">send us an email</a>.
      </div>
      <h3>FAQ</h3>
      <div class="faq" v-html="faq"></div>
      <hr>
      Licensed under an
      <a target="_blank" href="http://www.apache.org/licenses/LICENSE-2.0">Apache License</a><br>
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
import markdownConversionSvc from '../../services/markdownConversionSvc';
import faq from '../../data/faq.md';

export default {
  components: {
    ModalInner,
  },
  data: () => ({
    version: VERSION,
  }),
  computed: {
    ...mapGetters('modal', [
      'config',
    ]),
    faq() {
      return markdownConversionSvc.defaultConverter.render(faq);
    },
  },
};
</script>

<style lang="scss">
.modal__inner-1--about-modal {
  text-align: center;

  .logo-background {
    height: 75px;
    margin: 0.5rem 0;
  }

  small {
    display: block;
  }

  hr {
    width: 160px;
    max-width: 100%;
    margin: 1.5em auto;
  }
}

.faq {
  font-size: 0.8em;
  line-height: 1.5;
}
</style>
