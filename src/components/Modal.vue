<template>
  <div class="modal" v-if="config" @keydown.esc.stop="onEscape" @keydown.tab="onTab" @focusin="onFocusInOut" @focusout="onFocusInOut">
    <div class="modal__sponsor-banner" v-if="!isSponsor">
      StackEdit is <a class="not-tabbable" target="_blank" href="https://github.com/benweet/stackedit/">open source</a>, please consider
      <a class="not-tabbable" href="javascript:void(0)" @click="sponsor">sponsoring</a> for just $5.
    </div>
    <component v-if="currentModalComponent" :is="currentModalComponent"></component>
    <modal-inner v-else aria-label="Dialog">
      <div class="modal__content" v-html="simpleModal.contentHtml(config)"></div>
      <div class="modal__button-bar">
        <button class="button" v-if="simpleModal.rejectText" @click="config.reject()">{{simpleModal.rejectText}}</button>
        <button class="button button--resolve" v-if="simpleModal.resolveText" @click="config.resolve()">{{simpleModal.resolveText}}</button>
      </div>
    </modal-inner>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import simpleModals from '../data/simpleModals';
import editorSvc from '../services/editorSvc';
import syncSvc from '../services/syncSvc';
import googleHelper from '../services/providers/helpers/googleHelper';
import store from '../store';

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
import AccountManagementModal from './modals/AccountManagementModal';
import BadgeManagementModal from './modals/BadgeManagementModal';
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
import GithubWorkspaceModal from './modals/providers/GithubWorkspaceModal';
import GithubPublishModal from './modals/providers/GithubPublishModal';
import GistSyncModal from './modals/providers/GistSyncModal';
import GistPublishModal from './modals/providers/GistPublishModal';
import GitlabAccountModal from './modals/providers/GitlabAccountModal';
import GitlabOpenModal from './modals/providers/GitlabOpenModal';
import GitlabPublishModal from './modals/providers/GitlabPublishModal';
import GitlabSaveModal from './modals/providers/GitlabSaveModal';
import GitlabWorkspaceModal from './modals/providers/GitlabWorkspaceModal';
import WordpressPublishModal from './modals/providers/WordpressPublishModal';
import BloggerPublishModal from './modals/providers/BloggerPublishModal';
import BloggerPagePublishModal from './modals/providers/BloggerPagePublishModal';
import ZendeskAccountModal from './modals/providers/ZendeskAccountModal';
import ZendeskPublishModal from './modals/providers/ZendeskPublishModal';
import CouchdbWorkspaceModal from './modals/providers/CouchdbWorkspaceModal';
import CouchdbCredentialsModal from './modals/providers/CouchdbCredentialsModal';

const getTabbables = container => container.querySelectorAll('a[href], button, .textfield, input[type=checkbox]')
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
    AccountManagementModal,
    BadgeManagementModal,
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
    GithubWorkspaceModal,
    GithubPublishModal,
    GistSyncModal,
    GistPublishModal,
    GitlabAccountModal,
    GitlabOpenModal,
    GitlabPublishModal,
    GitlabSaveModal,
    GitlabWorkspaceModal,
    WordpressPublishModal,
    BloggerPublishModal,
    BloggerPagePublishModal,
    ZendeskAccountModal,
    ZendeskPublishModal,
    CouchdbWorkspaceModal,
    CouchdbCredentialsModal,
  },
  computed: {
    ...mapGetters([
      'isSponsor',
    ]),
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
    simpleModal() {
      return simpleModals[this.config.type] || {};
    },
  },
  methods: {
    async sponsor() {
      try {
        if (!store.getters['workspace/sponsorToken']) {
          // User has to sign in
          await store.dispatch('modal/open', 'signInForSponsorship');
          await googleHelper.signin();
          syncSvc.requestSync();
        }
        if (!store.getters.isSponsor) {
          await store.dispatch('modal/open', 'sponsor');
        }
      } catch (e) { /* cancel */ }
    },
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
      const { parentNode } = evt.target;
      if (parentNode && parentNode.parentNode) {
        // Focus effect
        if (parentNode.classList.contains('form-entry__field')
          && parentNode.parentNode.classList.contains('form-entry')) {
          parentNode.parentNode.classList.toggle(
            'form-entry--focused',
            evt.type === 'focusin',
          );
        }
      }
    },
  },
  mounted() {
    this.$watch(
      () => this.config,
      (isOpen) => {
        if (isOpen) {
          const tabbables = getTabbables(this.$el);
          if (tabbables[0]) {
            tabbables[0].focus();
          }
        }
      },
      { immediate: true },
    );
  },
};
</script>

<style lang="scss">
@import '../styles/variables.scss';

.modal {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(160, 160, 160, 0.5);
  overflow: auto;

  p {
    line-height: 1.5;
  }
}

.modal__sponsor-banner {
  position: fixed;
  z-index: 1;
  width: 100%;
  color: darken($error-color, 10%);
  background-color: transparentize(lighten($error-color, 33%), 0.075);
  font-size: 0.9em;
  line-height: 1.33;
  text-align: center;
  padding: 0.25em 1em;
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
  padding: 50px 50px 40px;
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
  width: 60px;
  height: 60px;
  margin: 1.5em 1.2em 0.5em 0;

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
  opacity: 0.6;
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

.modal__info--multiline {
  padding-top: 0.1em;
  padding-bottom: 0.1em;
}

.modal__button-bar {
  margin-top: 2rem;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
}

.form-entry {
  margin: 1em 0;
}

.form-entry__label {
  display: block;
  font-size: 0.9rem;
  color: #808080;

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
  border: 1px solid #b0b0b0;
  border-radius: $border-radius-base;
  position: relative;
  overflow: hidden;

  .form-entry--focused & {
    border-color: $link-color;
    box-shadow: 0 0 0 2.5px transparentize($link-color, 0.67);
  }

  .form-entry--error & {
    border-color: $error-color;
    box-shadow: 0 0 0 2.5px transparentize($error-color, 0.67);
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
  opacity: 0.67;
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
