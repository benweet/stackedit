<template>
  <div class="history side-bar__panel">
    <div class="side-bar__info" v-if="!syncToken">
      <p>You have to <a href="javascript:void(0)" @click="signin">sign in with Google</a> to enable revision history.</p>
      <p><b>Note:</b> This will sync your main workspace.</p>
    </div>
    <div class="side-bar__info" v-if="loading">
      <p>Loading history…</p>
    </div>
    <div class="side-bar__info" v-else-if="!revisionsWithSpacer.length">
      <p><b>{{currentFileName}}</b> has no history.</p>
    </div>
    <div class="revision" v-for="revision in revisionsWithSpacer" :key="revision.id">
      <div class="history__spacer" v-if="revision.spacer"></div>
      <a class="revision__button button flex flex--row" href="javascript:void(0)" @click="open(revision)">
        <div class="revision__icon">
          <user-image :user-id="revision.sub"></user-image>
        </div>
        <div class="revision__header flex flex--column">
          <user-name :user-id="revision.sub"></user-name>
          <div class="revision__created">{{revision.created | formatTime}}</div>
        </div>
      </a>
    </div>
    <div class="history__spacer history__spacer--last" v-if="revisions.length"></div>
    <div class="flex flex--row flex--end" v-if="showMoreButton">
      <button class="history__button button" @click="showMore">More</button>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex';
import providerRegistry from '../../services/providers/providerRegistry';
import MenuEntry from './common/MenuEntry';
import UserImage from '../UserImage';
import UserName from '../UserName';
import EditorClassApplier from '../common/EditorClassApplier';
import PreviewClassApplier from '../common/PreviewClassApplier';
import utils from '../../services/utils';
import googleHelper from '../../services/providers/helpers/googleHelper';
import syncSvc from '../../services/syncSvc';

let editorClassAppliers = [];
let previewClassAppliers = [];

let cachedFileId;
let revisionsPromise;
let revisionContentPromises;
const pageSize = 30;
const spacerThreshold = 12 * 60 * 60 * 1000; // 12h

export default {
  components: {
    MenuEntry,
    UserImage,
    UserName,
  },
  data: () => ({
    allRevisions: [],
    loading: false,
    showCount: pageSize,
  }),
  computed: {
    ...mapGetters('workspace', [
      'syncToken',
    ]),
    currentFileName() {
      return this.$store.getters['file/current'].name;
    },
    revisions() {
      return this.allRevisions.slice(0, this.showCount);
    },
    revisionsWithSpacer() {
      let previousCreated = 0;
      return this.revisions.map((revision) => {
        const revisionWithSpacer = {
          ...revision,
          spacer: revision.created + spacerThreshold < previousCreated,
        };
        previousCreated = revision.created;
        return revisionWithSpacer;
      });
    },
    showMoreButton() {
      return this.showCount < this.allRevisions.length;
    },
    refreshTrigger() {
      return utils.serializeObject([
        this.$store.getters['file/current'].id,
        this.syncToken,
      ]);
    },
  },
  methods: {
    ...mapMutations('content', [
      'setRevisionContent',
    ]),
    signin() {
      return googleHelper.signin()
        .then(
          () => syncSvc.requestSync(),
          () => {}, // Cancel
        );
    },
    close() {
      this.$store.dispatch('data/setSideBarPanel', 'menu');
    },
    showMore() {
      this.showCount += pageSize;
    },
    open(revision) {
      let revisionContentPromise = revisionContentPromises[revision.id];
      if (!revisionContentPromise) {
        revisionContentPromise = new Promise((resolve, reject) => {
          const syncToken = this.syncToken;
          const currentFile = this.$store.getters['file/current'];
          this.$store.dispatch('queue/enqueue',
            () => Promise.resolve()
              .then(() => this.workspaceProvider.getRevisionContent(
                syncToken, currentFile.id, revision.id))
              .then(resolve, reject));
        });
        revisionContentPromises[revision.id] = revisionContentPromise;
        revisionContentPromise.catch(() => {
          revisionContentPromises[revision.id] = null;
        });
      }
      revisionContentPromise.then(revisionContent =>
        this.$store.dispatch('content/setRevisionContent', revisionContent));
    },
    refreshHighlighters() {
      const revisionContent = this.$store.state.content.revisionContent;
      editorClassAppliers.forEach(editorClassApplier => editorClassApplier.stop());
      editorClassAppliers = [];
      previewClassAppliers.forEach(previewClassApplier => previewClassApplier.stop());
      previewClassAppliers = [];
      if (revisionContent) {
        let offset = 0;
        revisionContent.diffs.forEach(([type, text]) => {
          if (type) {
            const classes = ['revision-diff', `revision-diff--${type > 0 ? 'insert' : 'delete'}`];
            const offsets = {
              start: offset,
              end: offset + text.length,
            };
            editorClassAppliers.push(new EditorClassApplier(
              [`revision-diff--${utils.uid()}`, ...classes], offsets));
            previewClassAppliers.push(new PreviewClassApplier(
              [`revision-diff--${utils.uid()}`, ...classes], offsets));
          }
          offset += text.length;
        });
      }
    },
  },
  created() {
    // Find the workspace provider
    const workspace = this.$store.getters['workspace/currentWorkspace'];
    this.workspaceProvider = providerRegistry.providers[workspace.providerId];

    // Watch file changes
    this.$watch(
      () => this.refreshTrigger,
      () => {
        this.allRevisions = [];
        const id = this.$store.getters['file/current'].id;
        const syncToken = this.syncToken;
        if (id && syncToken) {
          if (id !== cachedFileId) {
            this.setRevisionContent();
            cachedFileId = id;
            revisionContentPromises = {};
            const currentFile = this.$store.getters['file/current'];
            revisionsPromise = new Promise((resolve, reject) => {
              this.$store.dispatch('queue/enqueue',
                () => Promise.resolve()
                  .then(() => this.workspaceProvider.listRevisions(syncToken, currentFile.id))
                  .then(resolve, reject));
            })
              .catch(() => {
                cachedFileId = null;
                return [];
              });
          }
          if (revisionsPromise) {
            this.loading = true;
            revisionsPromise.then((revisions) => {
              this.loading = false;
              this.allRevisions = revisions;
            });
          }
        }
      }, { immediate: true });

    const loadOne = () => {
      if (!this.destroyed) {
        this.$store.dispatch('queue/enqueue',
          () => {
            let loadPromise;
            this.revisions.some((revision) => {
              if (!revision.created) {
                const syncToken = this.syncToken;
                const currentFile = this.$store.getters['file/current'];
                loadPromise = this.workspaceProvider
                  .loadRevision(syncToken, currentFile.id, revision)
                  .then(() => loadOne());
              }
              return loadPromise;
            });
            return loadPromise;
          });
      }
    };

    this.$watch(
      () => this.revisions,
      () => loadOne(),
      { immediate: true });

    // Watch diffs changes
    this.$watch(
      () => this.$store.state.content.revisionContent,
      () => this.refreshHighlighters());

    // Close revision
    this.onKeyup = (evt) => {
      if (evt.which === 27) {
        // Esc key
        this.setRevisionContent();
      }
    };
    window.addEventListener('keyup', this.onKeyup);
  },
  destroyed() {
    // Close revision
    this.setRevisionContent();
    // Remove highlighters
    this.refreshHighlighters();
    // Remove event listener
    window.removeEventListener('keyup', this.onKeyup);
    // Cancel loading revisions
    this.destroyed = true;
  },
};
</script>

<style lang="scss">
@import '../common/variables.scss';

.history {
  padding: 5px 5px 50px;
}

.history__button {
  font-size: 14px;
  margin-top: 0.5em;
}

.history__spacer {
  position: relative;
  height: 40px;

  &::before {
    content: '';
    position: absolute;
    height: 100%;
    top: 0;
    left: 24px;
    border-left: 2px dotted $hr-color;
  }
}

.history__spacer--last {
  height: 20px;
}

.revision__button {
  text-align: left;
  padding: 15px;
  height: auto;
  text-transform: none;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    height: 100%;
    top: 0;
    left: 24px;
    border-left: 2px solid $hr-color;
  }

  &:active,
  &:focus,
  &:hover {
    &::before {
      display: none;
    }
  }

  .revision:first-child &::before {
    height: 67%;
    top: 33%;
  }
}

.revision__icon {
  height: 20px;
  width: 20px;
  margin-right: 12px;
  flex: none;
  border-radius: $border-radius-base;
  overflow: hidden;
  position: relative;
}

.revision__header {
  font-size: 15px;
  width: 100%;
}

.revision__created {
  font-size: 0.75em;
  opacity: 0.5;
}

.layout--revision {
  .cledit-section *,
  .cl-preview-section * {
    color: transparentize($editor-color-light, 0.67) !important;

    .app--dark & {
      color: transparentize($editor-color-dark, 0.67) !important;
    }
  }

  .cledit-section .revision-diff {
    color: $editor-color-light !important;

    .app--dark & {
      color: $editor-color-dark !important;
    }
  }

  .cl-preview-section .revision-diff {
    color: $body-color-light !important;

    .app--dark & {
      color: $body-color-dark !important;
    }
  }

  .revision-diff {
    padding: 0.25em 0;

    &.revision-diff--insert {
      background-color: mix(#fff, $selection-highlighting-color, 60%);
    }

    &.revision-diff--delete {
      background-color: mix(#fff, $error-color, 60%);
      text-decoration: line-through;
    }
  }
}
</style>
