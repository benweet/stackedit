<template>
  <div class="modal" @keydown.esc="onEscape" @keydown.tab="onTab">
    <component v-if="currentModalComponent" :is="currentModalComponent"></component>
    <modal-inner v-else aria-label="Dialog">
      <div class="modal__content" v-html="config.content"></div>
      <div class="modal__button-bar">
        <button class="button" v-if="config.rejectText" @click="config.reject()">{{config.rejectText}}</button>
        <button class="button" v-if="config.resolveText" @click="config.resolve()">{{config.resolveText}}</button>
      </div>
    </modal-inner>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import editorSvc from '../services/editorSvc';
import ModalInner from './modals/common/ModalInner';
import FilePropertiesModal from './modals/FilePropertiesModal';
import SettingsModal from './modals/SettingsModal';
import TemplatesModal from './modals/TemplatesModal';
import AboutModal from './modals/AboutModal';
import HtmlExportModal from './modals/HtmlExportModal';
import PdfExportModal from './modals/PdfExportModal';
import PandocExportModal from './modals/PandocExportModal';
import LinkModal from './modals/LinkModal';
import ImageModal from './modals/ImageModal';
import SyncManagementModal from './modals/SyncManagementModal';
import PublishManagementModal from './modals/PublishManagementModal';
import WorkspaceManagementModal from './modals/WorkspaceManagementModal';
import SponsorModal from './modals/SponsorModal';

// Providers
import GooglePhotoModal from './modals/providers/GooglePhotoModal';
import GoogleDriveAccountModal from './modals/providers/GoogleDriveAccountModal';
import GoogleDriveSaveModal from './modals/providers/GoogleDriveSaveModal';
import GoogleDriveWorkspaceModal from './modals/providers/GoogleDriveWorkspaceModal';
import GoogleDrivePublishModal from './modals/providers/GoogleDrivePublishModal';
import DropboxAccountModal from './modals/providers/DropboxAccountModal';
import DropboxSaveModal from './modals/providers/DropboxSaveModal';
import DropboxPublishModal from './modals/providers/DropboxPublishModal';
import GithubAccountModal from './modals/providers/GithubAccountModal';
import GithubOpenModal from './modals/providers/GithubOpenModal';
import GithubSaveModal from './modals/providers/GithubSaveModal';
import GithubPublishModal from './modals/providers/GithubPublishModal';
import GistSyncModal from './modals/providers/GistSyncModal';
import GistPublishModal from './modals/providers/GistPublishModal';
import WordpressPublishModal from './modals/providers/WordpressPublishModal';
import BloggerPublishModal from './modals/providers/BloggerPublishModal';
import BloggerPagePublishModal from './modals/providers/BloggerPagePublishModal';
import ZendeskAccountModal from './modals/providers/ZendeskAccountModal';
import ZendeskPublishModal from './modals/providers/ZendeskPublishModal';
import CouchdbWorkspaceModal from './modals/providers/CouchdbWorkspaceModal';
import CouchdbCredentialsModal from './modals/providers/CouchdbCredentialsModal';

const getTabbables = container => container.querySelectorAll('a[href], button, .textfield')
  // Filter enabled and visible element
  .cl_filter(el => !el.disabled && el.offsetParent !== null && !el.classList.contains('not-tabbable'));

export default {
  components: {
    ModalInner,
    FilePropertiesModal,
    SettingsModal,
    TemplatesModal,
    AboutModal,
    HtmlExportModal,
    PdfExportModal,
    PandocExportModal,
    LinkModal,
    ImageModal,
    SyncManagementModal,
    PublishManagementModal,
    WorkspaceManagementModal,
    SponsorModal,
    // Providers
    GooglePhotoModal,
    GoogleDriveAccountModal,
    GoogleDriveSaveModal,
    GoogleDriveWorkspaceModal,
    GoogleDrivePublishModal,
    DropboxAccountModal,
    DropboxSaveModal,
    DropboxPublishModal,
    GithubAccountModal,
    GithubOpenModal,
    GithubSaveModal,
    GithubPublishModal,
    GistSyncModal,
    GistPublishModal,
    WordpressPublishModal,
    BloggerPublishModal,
    BloggerPagePublishModal,
    ZendeskAccountModal,
    ZendeskPublishModal,
    CouchdbWorkspaceModal,
    CouchdbCredentialsModal,
  },
  computed: {
    ...mapGetters('modal', [
      'config',
    ]),
    currentModalComponent() {
      if (this.config.type) {
        let componentName = this.config.type[0].toUpperCase();
        componentName += this.config.type.slice(1);
        componentName += 'Modal';
        if (this.$options.components[componentName]) {
          return componentName;
        }
      }
      return null;
    },
  },
  methods: {
    onEscape() {
      this.config.reject();
      editorSvc.clEditor.focus();
    },
    onTab(evt) {
      const tabbables = getTabbables(this.$el);
      const firstTabbable = tabbables[0];
      const lastTabbable = tabbables[tabbables.length - 1];
      if (evt.shiftKey && firstTabbable === evt.target) {
        evt.preventDefault();
        lastTabbable.focus();
      } else if (!evt.shiftKey && lastTabbable === evt.target) {
        evt.preventDefault();
        firstTabbable.focus();
      }
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
        this.config.reject();
      }
    },
  },
  mounted() {
    window.addEventListener('focusin', this.onFocusInOut);
    window.addEventListener('focusout', this.onFocusInOut);
    const tabbables = getTabbables(this.$el);
    tabbables[0].focus();
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
  background-color: rgba(160, 160, 160, 0.5);
  overflow: auto;

  hr {
    margin: 0.5em 0;
  }
}

.modal__inner-1 {
  margin: 0 auto;
  width: 100%;
  min-width: 320px;
  max-width: 480px;
}

.modal__inner-2 {
  margin: 40px 10px 100px;
  background-color: #f8f8f8;
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
    background-image: linear-gradient(to left, #ffd700, #ffd700 23%, #a5c700 27%, #a5c700 48%, #ff8a00 52%, #ff8a00 73%, #66aefd 77%);
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    height: $border-radius-base;
    width: 100%;
    background-image: linear-gradient(to right, #ffd700, #ffd700 23%, #a5c700 27%, #a5c700 48%, #ff8a00 52%, #ff8a00 73%, #66aefd 77%);
  }
}

.modal__content > :first-child,
.modal__content > .modal__image:first-child + * {
  margin-top: 0;
}

.modal__image {
  float: left;
  width: 64px;
  height: 64px;
  margin: 1.5em 1.5em 0.5em 0;

  & + *::after {
    content: '';
    display: block;
    clear: both;
  }
}

.modal__title {
  font-weight: bold;
  font-size: 1.5rem;
  line-height: 1.4;
  margin-top: 2.5rem;
}

.modal__sub-title {
  opacity: 0.5;
  font-size: 0.75rem;
  margin-bottom: 1.5rem;
}

.modal__error {
  color: #de2c00;
}

.modal__info {
  background-color: $info-bg;
  border-radius: $border-radius-base;
  margin: 1.2em 0;
  padding: 0.75em 1.25em;
  font-size: 0.95em;
  line-height: 1.6;

  pre {
    line-height: 1.5;
  }
}

.modal__button-bar {
  margin-top: 1.75rem;
  text-align: right;
}

.form-entry {
  margin: 1em 0;
}

.form-entry__label {
  display: block;
  font-size: 0.9rem;
  color: #a0a0a0;

  .form-entry--focused & {
    color: darken($link-color, 10%);
  }

  .form-entry--error & {
    color: darken($error-color, 10%);
  }
}

.form-entry__label-info {
  font-size: 0.75rem;
}

.form-entry__field {
  border: 1px solid #d8d8d8;
  border-radius: $border-radius-base;
  position: relative;
  overflow: hidden;

  .form-entry--focused & {
    border-color: $link-color;
  }

  .form-entry--error & {
    border-color: $error-color;
  }
}

.form-entry__actions {
  text-align: right;
  margin: 0.25em;
}

.form-entry__button {
  width: 38px;
  height: 38px;
  padding: 6px;
  display: inline-block;
  background-color: transparent;
  opacity: 0.75;

  &:active,
  &:focus,
  &:hover {
    opacity: 1;
    background-color: rgba(0, 0, 0, 0.1);
  }
}

.form-entry__radio,
.form-entry__checkbox {
  margin: 0.25em 1em;

  input {
    margin-right: 0.25em;
  }
}

.form-entry__info {
  font-size: 0.75em;
  opacity: 0.5;
  line-height: 1.4;
  margin: 0.25em 0;
}

.tabs {
  border-bottom: 1px solid $hr-color;
  margin: 1em 0 2em;

  &::after {
    content: '';
    display: block;
    clear: both;
  }
}

.tabs__tab {
  width: 50%;
  float: left;
  text-align: center;
  line-height: 1.4;
  font-weight: 400;
  font-size: 1.1em;
}

.tabs__tab > a {
  width: 100%;
  text-decoration: none;
  padding: 0.67em 0.33em;
  cursor: pointer;
  border-bottom: 2px solid transparent;
  border-top-left-radius: $border-radius-base;
  border-top-right-radius: $border-radius-base;
  color: $link-color;

  &:hover,
  &:focus {
    background-color: rgba(0, 0, 0, 0.05);
  }
}

.tabs__tab--active > a {
  border-bottom: 2px solid $link-color;
  color: inherit;
}
</style>
