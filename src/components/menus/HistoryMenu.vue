<template>
  <div class="history side-bar__panel side-bar__panel--menu">
    <div class="side-bar__info">
      <p v-if="syncLocations.length > 1">
        <select slot="field" class="textfield" v-model="syncLocationId" @keydown.enter="resolve()">
          <option v-for="location in syncLocations" :key="location.id" :value="location.id">
            {{ location.description }}
          </option>
        </select>
      </p>
      <p v-if="!historyContext">Synchronize <b>{{currentFileName}}</b> to enable revision history or <a href="javascript:void(0)" @click="signin">sign in with Google</a> to synchronize your main workspace.</p>
      <p v-else-if="loading">Loading history…</p>
      <p v-else-if="!revisionsWithSpacer.length"><b>{{currentFileName}}</b> has no history.</p>
      <div class="menu-entry menu-entry--info flex flex--row flex--align-center" v-else>
        <div class="menu-entry__icon menu-entry__icon--image">
          <icon-provider :provider-id="syncLocation.providerId"></icon-provider>
        </div>
        <span v-if="syncLocation.url">
          The following revisions are stored in <a :href="syncLocation.url" target="_blank">{{ syncLocationProviderName }}</a>.
        </span>
        <span v-else>
          The following revisions are stored in {{ syncLocationProviderName }}.
        </span>
      </div>
    </div>
    <div>
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
    </div>
    <div class="history__spacer history__spacer--last" v-if="revisions.length"></div>
    <div class="flex flex--row flex--end" v-if="showMoreButton">
      <button class="history__button button" @click="showMore">More</button>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex';
import providerRegistry from '../../services/providers/common/providerRegistry';
import MenuEntry from './common/MenuEntry';
import UserImage from '../UserImage';
import UserName from '../UserName';
import EditorClassApplier from '../common/EditorClassApplier';
import PreviewClassApplier from '../common/PreviewClassApplier';
import utils from '../../services/utils';
import googleHelper from '../../services/providers/helpers/googleHelper';
import syncSvc from '../../services/syncSvc';
import store from '../../store';
import badgeSvc from '../../services/badgeSvc';

let editorClassAppliers = [];
let previewClassAppliers = [];

let cachedHistoryContextHash;
let revisionsPromise;
let revisionContentPromises;
const pageSize = 30;
const spacerThreshold = 6 * 60 * 60 * 1000; // 6h

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
    syncLocationId: null,
  }),
  computed: {
    ...mapGetters('data', [
      'syncDataByItemId',
    ]),
    ...mapGetters('syncLocation', {
      syncLocations: 'currentWithWorkspaceSyncLocation',
    }),
    ...mapState('content', [
      'revisionContent',
    ]),
    syncLocation() {
      return utils.someResult(this.syncLocations, (syncLocation) => {
        if (syncLocation.id === this.syncLocationId) {
          return syncLocation;
        }
        return null;
      });
    },
    syncLocationProviderName() {
      if (!this.syncLocation) {
        return null;
      }
      return providerRegistry.providersById[this.syncLocation.providerId].name;
    },
    currentFileName() {
      return store.getters['file/current'].name;
    },
    historyContext() {
      const { syncLocation } = this;
      if (syncLocation) {
        const provider = providerRegistry.providersById[syncLocation.providerId];
        const token = provider.getToken(syncLocation);
        const fileId = store.getters['file/current'].id;
        const contentId = `${fileId}/content`;
        const historyContext = {
          token,
          fileId,
          contentId,
          syncLocation: this.syncLocation,
        };
        if (syncLocation.id !== 'main') {
          return historyContext;
        }

        // Add syncData for workspace sync location
        const { syncDataByItemId } = this;
        const fileSyncData = syncDataByItemId[fileId];
        const contentSyncData = syncDataByItemId[contentId];
        if (fileSyncData && contentSyncData) {
          return {
            ...historyContext,
            fileSyncDataId: fileSyncData.id,
            contentSyncDataId: contentSyncData.id,
          };
        }
      }
      return null;
    },
    historyContextHash() {
      return utils.serializeObject(this.historyContext);
    },
    revisions() {
      return this.allRevisions.slice()
        .sort((revision1, revision2) => revision2.created - revision1.created)
        .slice(0, this.showCount);
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
  },
  methods: {
    ...mapMutations('content', [
      'setRevisionContent',
    ]),
    async signin() {
      try {
        await googleHelper.signin();
        syncSvc.requestSync();
      } catch (e) {
        // Cancel
      }
    },
    close() {
      store.dispatch('data/setSideBarPanel', 'menu');
    },
    showMore() {
      this.showCount += pageSize;
    },
    open(revision) {
      let revisionContentPromise = revisionContentPromises[revision.id];
      if (!revisionContentPromise) {
        const historyContext = utils.deepCopy(this.historyContext);
        if (historyContext) {
          const provider = providerRegistry.providersById[this.syncLocation.providerId];
          revisionContentPromise = new Promise((resolve, reject) => store.dispatch(
            'queue/enqueue',
            () => provider.getFileRevisionContent({
              ...historyContext,
              revisionId: revision.id,
            })
              .then(resolve, reject),
          ));
          revisionContentPromises[revision.id] = revisionContentPromise;
          revisionContentPromise.catch((err) => {
            store.dispatch('notification/error', err);
            revisionContentPromises[revision.id] = null;
          });
        }
      }
      if (revisionContentPromise) {
        revisionContentPromise.then(revisionContent =>
          store.dispatch('content/setRevisionContent', revisionContent));
      }
    },
    refreshHighlighters() {
      const { revisionContent } = this;
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
              [`revision-diff--${utils.uid()}`, ...classes],
              offsets,
            ));
            previewClassAppliers.push(new PreviewClassApplier(
              [`revision-diff--${utils.uid()}`, ...classes],
              offsets,
            ));
          }
          offset += text.length;
        });
      }
    },
  },
  watch: {
    // Fix syncLocationId
    syncLocation: {
      immediate: true,
      handler(value) {
        const firstSyncLocation = this.syncLocations[0];
        if (firstSyncLocation) {
          if (!value) {
            this.syncLocationId = firstSyncLocation.id;
          } else if (value.id !== firstSyncLocation.id) {
            badgeSvc.addBadge('chooseHistory');
          }
        }
      },
    },
    // Load revision list on context changes
    historyContextHash: {
      immediate: true,
      handler() {
        this.allRevisions = [];
        const historyContext = utils.deepCopy(this.historyContext);
        if (historyContext) {
          if (this.historyContextHash !== cachedHistoryContextHash) {
            this.setRevisionContent();
            cachedHistoryContextHash = this.historyContextHash;
            revisionContentPromises = {};
            const provider = providerRegistry.providersById[this.syncLocation.providerId];
            revisionsPromise = new Promise((resolve, reject) => store.dispatch(
              'queue/enqueue',
              () => provider
                .listFileRevisions(historyContext)
                .then(resolve, reject),
            ))
              .catch((err) => {
                store.dispatch('notification/error', err);
                cachedHistoryContextHash = null;
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
      },
    },
    // Load each revision on revision list changes
    revisions(revisions) {
      const { historyContext } = this;
      if (historyContext) {
        store.dispatch(
          'queue/enqueue',
          () => utils.awaitSequence(revisions, async (revision) => {
            // Make sure revisions and historyContext haven't changed
            if (!this.destroyed
              && this.revisions === revisions
              && this.historyContext === historyContext
            ) {
              const provider = providerRegistry.providersById[this.syncLocation.providerId];
              await provider.loadFileRevision({
                ...historyContext,
                revision,
              });
            }
          }),
        );
      }
    },
    // Refresh highlighters on open/close revision
    revisionContent: {
      immediate: true,
      handler() {
        this.refreshHighlighters();
      },
    },
  },
  created() {
    // Close revision on escape
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
@import '../../styles/variables.scss';

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
    left: 19px;
    border-left: 2px dotted $hr-color;
  }
}

.history__spacer--last {
  height: 20px;
}

.revision__button {
  text-align: left;
  padding: 10px;
  height: auto;
  text-transform: none;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    height: 100%;
    top: 0;
    left: 19px;
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
  line-height: 1.33;
}

.revision__created {
  font-size: 0.75em;
  opacity: 0.6;
}

.layout--revision {
  .cledit-section *,
  .cl-preview-section * {
    color: transparentize($editor-color-light, 0.5) !important;

    .app--dark & {
      color: transparentize($editor-color-dark, 0.5) !important;
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
