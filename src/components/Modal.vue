<template>
  <div class="modal" @keyup.esc="onEscape">
    <file-properties-modal v-if="config.type === 'fileProperties'"></file-properties-modal>
    <settings-modal v-else-if="config.type === 'settings'"></settings-modal>
    <templates-modal v-else-if="config.type === 'templates'"></templates-modal>
    <link-modal v-else-if="config.type === 'link'"></link-modal>
    <image-modal v-else-if="config.type === 'image'"></image-modal>
    <google-photo-modal v-else-if="config.type === 'googlePhoto'"></google-photo-modal>
    <html-export-modal v-else-if="config.type === 'htmlExport'"></html-export-modal>
    <div v-else class="modal__inner-1">
      <div class="modal__inner-2">
        <div class="modal__content" v-html="config.content"></div>
        <div class="modal__button-bar">
          <button v-if="config.rejectText" class="button" @click="config.reject()">{{config.rejectText}}</button>
          <button v-if="config.resolveText" class="button" @click="config.resolve()">{{config.resolveText}}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import FilePropertiesModal from './FilePropertiesModal';
import SettingsModal from './SettingsModal';
import TemplatesModal from './TemplatesModal';
import LinkModal from './LinkModal';
import ImageModal from './ImageModal';
import GooglePhotoModal from './GooglePhotoModal';
import HtmlExportModal from './HtmlExportModal';
import editorEngineSvc from '../services/editorEngineSvc';

export default {
  components: {
    FilePropertiesModal,
    SettingsModal,
    TemplatesModal,
    LinkModal,
    ImageModal,
    GooglePhotoModal,
    HtmlExportModal,
  },
  computed: mapState('modal', [
    'config',
  ]),
  methods: {
    ...mapMutations('modal', [
      'setConfig',
    ]),
    onEscape() {
      this.setConfig();
      editorEngineSvc.clEditor.focus();
    },
    onFocusInOut(evt) {
      const isFocusIn = evt.type === 'focusin';
      if (evt.target.parentNode && evt.target.parentNode.parentNode) {
        // Focus effect
        if (evt.target.parentNode.classList.contains('form-entry__field') &&
          evt.target.parentNode.parentNode.classList.contains('form-entry')) {
          evt.target.parentNode.parentNode.classList.toggle('form-entry--focused', isFocusIn);
        }
      }
      if (isFocusIn && this.config) {
        const modalInner = this.$el.querySelector('.modal__inner-2');
        let target = evt.target;
        while (target) {
          if (target === modalInner) {
            return;
          }
          target = target.parentNode;
        }
        this.setConfig();
      }
    },
  },
  mounted() {
    window.addEventListener('focusin', this.onFocusInOut);
    window.addEventListener('focusout', this.onFocusInOut);
    const eltToFocus = this.$el.querySelector('input.text-input')
      || this.$el.querySelector('.textfield')
      || this.$el.querySelector('button.button');
    if (eltToFocus) {
      eltToFocus.focus();
    }
  },
  destroyed() {
    window.removeEventListener('focusin', this.onFocusInOut);
    window.removeEventListener('focusout', this.onFocusInOut);
  },
};
</script>

<style lang="scss">
@import 'common/variables.scss';

.modal {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(180, 180, 180, 0.75);
  overflow: auto;
}

.modal__inner-1 {
  margin: 0 auto;
  display: table;
  width: 100%;
  min-width: 320px;
  max-width: 500px;
}

.modal__inner-2 {
  margin: 50px 10px 100px;
  background-color: #fff;
  padding: 40px 50px 30px;
  border-radius: $border-radius-base;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: $border-radius-base;
    width: 100%;
    background-image: linear-gradient(to left, #ffe600, #ffe600 25%, #bbd500 25%, #bbd500 50%, #ff8a00 50%, #ff8a00 75%, #75b7fd 75%);
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    height: $border-radius-base;
    width: 100%;
    background-image: linear-gradient(to right, #ffe600, #ffe600 25%, #bbd500 25%, #bbd500 50%, #ff8a00 50%, #ff8a00 75%, #75b7fd 75%);
  }
}

.modal__content :first-child {
  margin-top: 0;
}

.modal__error {
  color: #de2c00;
}

.modal__button-bar {
  margin-top: 1.75rem;
  text-align: right;

  .button {
    margin-left: 5px;
  }
}
</style>
