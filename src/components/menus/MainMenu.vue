<template>
  <div class="side-bar__panel side-bar__panel--menu">
    <menu-entry v-if="!loginToken" @click.native="signin">
      <icon-login slot="icon"></icon-login>
      <div>Sign in with Google</div>
      <span>Back up and sync all your files, folders and settings.</span>
    </menu-entry>
    <div v-else class="menu-entry flex flex--row flex--align-center">
      <div class="menu-entry__icon menu-entry__icon--image">
        <user-image :user-id="loginToken.sub"></user-image>
      </div>
      <span>Signed in as <b>{{loginToken.name}}</b>.</span>
    </div>
    <hr>
    <menu-entry @click.native="setPanel('sync')">
      <icon-sync slot="icon"></icon-sync>
      <div>Synchronize</div>
      <span>Open, save, collaborate in the Cloud.</span>
    </menu-entry>
    <menu-entry @click.native="setPanel('publish')">
      <icon-upload slot="icon"></icon-upload>
      <div>Publish</div>
      <span>Export your file to the web.</span>
    </menu-entry>
    <hr>
    <menu-entry @click.native="fileProperties">
      <icon-view-list slot="icon"></icon-view-list>
      <div>File properties</div>
      <span>Add metadata and configure extensions.</span>
    </menu-entry>
    <menu-entry @click.native="setPanel('toc')">
      <icon-toc slot="icon"></icon-toc>
      Table of contents
    </menu-entry>
    <menu-entry @click.native="setPanel('help')">
      <icon-help-circle slot="icon"></icon-help-circle>
      Markdown cheat sheet
    </menu-entry>
    <hr>
    <menu-entry @click.native="print">
      <icon-printer slot="icon"></icon-printer>
      Print
    </menu-entry>
    <input class="hidden-file" id="import-disk-file-input" type="file" @change="onImportFile">
    <label class="menu-entry button flex flex--row flex--align-center" for="import-disk-file-input">
      <div class="menu-entry__icon flex flex--column flex--center">
        <icon-content-save></icon-content-save>
      </div>
      <div class="flex flex--column">
        Import from disk
      </div>
    </label>
    <menu-entry @click.native="setPanel('export')">
      <icon-content-save slot="icon"></icon-content-save>
      Export to disk
    </menu-entry>
    <hr>
    <menu-entry @click.native="setPanel('more')">
      More...
    </menu-entry>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import MenuEntry from './common/MenuEntry';
import UserImage from '../UserImage';
import googleHelper from '../../services/providers/helpers/googleHelper';
import syncSvc from '../../services/syncSvc';
import providerUtils from '../../services/providers/providerUtils';

export default {
  components: {
    MenuEntry,
    UserImage,
  },
  computed: {
    ...mapGetters('data', [
      'loginToken',
    ]),
  },
  methods: {
    ...mapActions('data', {
      setPanel: 'setSideBarPanel',
    }),
    signin() {
      return googleHelper.signin()
        .then(
          () => syncSvc.requestSync(),
          () => {}, // Cancel
        );
    },
    onImportFile(evt) {
      const file = evt.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const content = e.target.result;
          if (content.match(/\uFFFD/)) {
            this.$store.dispatch('notification/error', 'File is not readable.');
          } else {
            this.$store.dispatch('createFile', {
              ...providerUtils.parseContent(content),
              name: file.name,
            })
              .then(item => this.$store.commit('file/setCurrentId', item.id));
          }
        };
        reader.readAsText(file);
      }
    },
    fileProperties() {
      return this.$store.dispatch('modal/open', 'fileProperties')
        .catch(() => {}); // Cancel
    },
    print() {
      print();
    },
  },
};
</script>
