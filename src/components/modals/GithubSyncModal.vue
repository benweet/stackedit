<template>
  <div class="modal__inner-1 modal__inner-1--google-drive-sync">
    <div class="modal__inner-2">
      <div class="modal__image">
        <icon-provider provider-id="github"></icon-provider>
      </div>
      <p>This will save <b>{{currentFileName}}</b> to your <b>GitHub</b> repository and keep it synchronized.</p>
      <div class="form-entry">
        <label class="form-entry__label" for="repo">Repository URL</label>
        <div class="form-entry__field">
          <input id="repo" type="text" class="textfield" v-model.trim="repoUrl" @keyup.enter="resolve()">
        </div>
        <div class="form-entry__info">
          <b>Example:</b> https://github.com/benweet/stackedit
        </div>
      </div>
      <div class="form-entry">
        <label class="form-entry__label" for="branch">Branch (optional)</label>
        <div class="form-entry__field">
          <input id="branch" type="text" class="textfield" v-model.trim="branch" @keyup.enter="resolve()">
        </div>
        <div class="form-entry__info">
          If not provided, the master branch will be used.
        </div>
      </div>
      <div class="form-entry">
        <label class="form-entry__label" for="path">File path</label>
        <div class="form-entry__field">
          <input id="path" type="text" class="textfield" v-model.trim="path" @keyup.enter="resolve()">
        </div>
        <div class="form-entry__info">
          <b>Example:</b> docs/README.md<br>
          If the file exists, it will be replaced.
        </div>
      </div>
      <div class="modal__button-bar">
        <button class="button" @click="config.reject()">Cancel</button>
        <button class="button" @click="resolve()">Ok</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import githubProvider from '../../services/providers/githubProvider';

export default {
  data: () => ({
    branch: '',
    path: '',
  }),
  computed: {
    ...mapGetters('modal', [
      'config',
    ]),
    currentFileName() {
      return this.$store.getters['file/current'].name;
    },
    repoUrl: {
      get() {
        return this.$store.getters['data/localSettings'].githubRepoUrl;
      },
      set(value) {
        this.$store.dispatch('data/patchLocalSettings', {
          githubRepoUrl: value,
        });
      },
    },
  },
  created() {
    this.path = `${this.currentFileName}.md`;
  },
  methods: {
    resolve() {
      if (this.repoUrl && this.path) {
        const parsedRepo = this.repoUrl.match(/[/:]?([^/:]+)\/([^/]+?)(?:\.git)?$/);
        if (parsedRepo) {
          // Return new location
          const location = githubProvider.makeLocation(
            this.config.token, parsedRepo[1], parsedRepo[2], this.branch || 'master', this.path);
          this.config.resolve(location);
        }
      }
    },
  },
};
</script>
