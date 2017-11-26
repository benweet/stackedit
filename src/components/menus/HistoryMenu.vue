<template>
  <div class="side-bar__panel side-bar__panel--history">
    <a class="revision button flex flex--row" href="javascript:void(0)" v-for="revision in revisions" :key="revision.id" @click="open(revision)">
      <div class="revision__icon">
        <user-image :user-id="revision.sub"></user-image>
      </div>
      <div class="revision__header flex flex--column">
        <user-name :user-id="revision.sub"></user-name>
        <div class="revision__created">{{revision.created | formatTime}}</div>
      </div>
    </a>
    <div class="flex flex--row flex--end" v-if="showMoreButton">
      <button class="revision__button button" @click="showMore">More</button>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
import googleDriveAppDataProvider from '../../services/providers/googleDriveAppDataProvider';
import MenuEntry from './common/MenuEntry';
import UserImage from '../UserImage';
import UserName from '../UserName';
import EditorClassApplier from '../common/EditorClassApplier';
import PreviewClassApplier from '../common/PreviewClassApplier';
import utils from '../../services/utils';
import editorSvc from '../../services/editorSvc';

let editorClassAppliers = [];
let previewClassAppliers = [];

let cachedFileId;
let revisionsPromise;
let revisionContentPromises;
const pageSize = 50;

export default {
  components: {
    MenuEntry,
    UserImage,
    UserName,
  },
  data: () => ({
    allRevisions: [],
    showCount: pageSize,
  }),
  computed: {
    revisions() {
      return this.allRevisions.slice(0, this.showCount);
    },
    showMoreButton() {
      return this.showCount < this.allRevisions.length;
    },
  },
  methods: {
    ...mapMutations('content', [
      'setRevisionContent',
    ]),
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
          const loginToken = this.$store.getters['data/loginToken'];
          const currentFile = this.$store.getters['file/current'];
          this.$store.dispatch('queue/enqueue',
            () => Promise.resolve()
              .then(() => googleDriveAppDataProvider.getRevisionContent(
                loginToken, currentFile.id, revision.id))
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
        editorSvc.$once('sectionDescWithDiffsList', () => {
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
        });
      }
    },
  },
  created() {
    // Watch file changes
    this.$watch(
      () => this.$store.getters['file/current'].id,
      (id) => {
        this.allRevisions = [];
        if (id) {
          if (id !== cachedFileId) {
            this.setRevisionContent();
            cachedFileId = id;
            revisionContentPromises = {};
            const loginToken = this.$store.getters['data/loginToken'];
            const currentFile = this.$store.getters['file/current'];
            revisionsPromise = new Promise((resolve, reject) => {
              this.$store.dispatch('queue/enqueue',
                () => Promise.resolve()
                  .then(() => googleDriveAppDataProvider.listRevisions(loginToken, currentFile.id))
                  .then((revisions) => {
                    resolve(revisions.sort(
                      (revision1, revision2) => revision2.created - revision1.created));
                  })
                  .catch(reject));
            });
            revisionsPromise.catch(() => {
              cachedFileId = null;
              return [];
            });
          }
          revisionsPromise.then((revisions) => {
            this.allRevisions = revisions;
          });
        }
      }, { immediate: true });

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
  },
};
</script>

<style lang="scss">
@import '../common/variables.scss';

.side-bar__panel--history {
  padding: 5px 5px 50px;
}

.revision {
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

  &:first-child::before {
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

.revision__button {
  font-size: 14px;
  margin-top: 0.5em;
}

.layout--revision {
  .cledit-section *,
  .cl-preview-section * {
    color: rgba(0, 0, 0, 0.15) !important;
  }

  .cledit-section .revision-diff {
    color: $editor-color !important;
  }

  .cl-preview-section .revision-diff {
    color: $body-color !important;
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
