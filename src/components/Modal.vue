<template>
  <div class="modal" @keyup.esc="onEscape">
    <file-properties-modal v-if="config.type === 'fileProperties'"></file-properties-modal>
    <settings-modal v-else-if="config.type === 'settings'"></settings-modal>
    <templates-modal v-else-if="config.type === 'templates'"></templates-modal>
    <about-modal v-else-if="config.type === 'about'"></about-modal>
    <html-export-modal v-else-if="config.type === 'htmlExport'"></html-export-modal>
    <link-modal v-else-if="config.type === 'link'"></link-modal>
    <image-modal v-else-if="config.type === 'image'"></image-modal>
    <google-photo-modal v-else-if="config.type === 'googlePhoto'"></google-photo-modal>
    <sync-management-modal v-else-if="config.type === 'syncManagement'"></sync-management-modal>
    <publish-management-modal v-else-if="config.type === 'publishManagement'"></publish-management-modal>
    <google-drive-sync-modal v-else-if="config.type === 'googleDriveSync'"></google-drive-sync-modal>
    <google-drive-publish-modal v-else-if="config.type === 'googleDrivePublish'"></google-drive-publish-modal>
    <dropbox-account-modal v-else-if="config.type === 'dropboxAccount'"></dropbox-account-modal>
    <dropbox-sync-modal v-else-if="config.type === 'dropboxSync'"></dropbox-sync-modal>
    <dropbox-publish-modal v-else-if="config.type === 'dropboxPublish'"></dropbox-publish-modal>
    <github-account-modal v-else-if="config.type === 'githubAccount'"></github-account-modal>
    <github-sync-modal v-else-if="config.type === 'githubSync'"></github-sync-modal>
    <github-publish-modal v-else-if="config.type === 'githubPublish'"></github-publish-modal>
    <gist-sync-modal v-else-if="config.type === 'gistSync'"></gist-sync-modal>
    <gist-publish-modal v-else-if="config.type === 'gistPublish'"></gist-publish-modal>
    <wordpress-publish-modal v-else-if="config.type === 'wordpressPublish'"></wordpress-publish-modal>
    <blogger-publish-modal v-else-if="config.type === 'bloggerPublish'"></blogger-publish-modal>
    <blogger-page-publish-modal v-else-if="config.type === 'bloggerPagePublish'"></blogger-page-publish-modal>
    <zendesk-account-modal v-else-if="config.type === 'zendeskAccount'"></zendesk-account-modal>
    <zendesk-publish-modal v-else-if="config.type === 'zendeskPublish'"></zendesk-publish-modal>
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
import { mapGetters } from 'vuex';
import editorEngineSvc from '../services/editorEngineSvc';
import FilePropertiesModal from './modals/FilePropertiesModal';
import SettingsModal from './modals/SettingsModal';
import TemplatesModal from './modals/TemplatesModal';
import AboutModal from './modals/AboutModal';
import HtmlExportModal from './modals/HtmlExportModal';
import LinkModal from './modals/LinkModal';
import ImageModal from './modals/ImageModal';
import GooglePhotoModal from './modals/GooglePhotoModal';
import SyncManagementModal from './modals/SyncManagementModal';
import PublishManagementModal from './modals/PublishManagementModal';
import GoogleDriveSyncModal from './modals/GoogleDriveSyncModal';
import GoogleDrivePublishModal from './modals/GoogleDrivePublishModal';
import DropboxAccountModal from './modals/DropboxAccountModal';
import DropboxSyncModal from './modals/DropboxSyncModal';
import DropboxPublishModal from './modals/DropboxPublishModal';
import GithubAccountModal from './modals/GithubAccountModal';
import GithubSyncModal from './modals/GithubSyncModal';
import GithubPublishModal from './modals/GithubPublishModal';
import GistSyncModal from './modals/GistSyncModal';
import GistPublishModal from './modals/GistPublishModal';
import WordpressPublishModal from './modals/WordpressPublishModal';
import BloggerPublishModal from './modals/BloggerPublishModal';
import BloggerPagePublishModal from './modals/BloggerPagePublishModal';
import ZendeskAccountModal from './modals/ZendeskAccountModal';
import ZendeskPublishModal from './modals/ZendeskPublishModal';

export default {
  components: {
    FilePropertiesModal,
    SettingsModal,
    TemplatesModal,
    AboutModal,
    HtmlExportModal,
    LinkModal,
    ImageModal,
    GooglePhotoModal,
    SyncManagementModal,
    PublishManagementModal,
    GoogleDriveSyncModal,
    GoogleDrivePublishModal,
    DropboxAccountModal,
    DropboxSyncModal,
    DropboxPublishModal,
    GithubAccountModal,
    GithubSyncModal,
    GithubPublishModal,
    GistSyncModal,
    GistPublishModal,
    WordpressPublishModal,
    BloggerPublishModal,
    BloggerPagePublishModal,
    ZendeskAccountModal,
    ZendeskPublishModal,
  },
  computed: mapGetters('modal', [
    'config',
  ]),
  methods: {
    onEscape() {
      this.config.reject();
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
        this.config.reject();
      }
    },
  },
  mounted() {
    window.addEventListener('focusin', this.onFocusInOut);
    window.addEventListener('focusout', this.onFocusInOut);
    const eltToFocus = this.$el.querySelector('input.text-input')
      || this.$el.querySelector('.textfield')
      || this.$el.querySelector('.button');
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

.modal__error {
  color: #de2c00;
}

.modal__tip {
  background-color: transparentize(#ffd600, 0.85);
  border-radius: $border-radius-base;
  margin: 1.2em 0;
  padding: 0.75em 1.25em;
}

.modal__button-bar {
  margin-top: 1.75rem;
  text-align: right;

  .button {
    margin-left: 5px;
  }
}
</style>
