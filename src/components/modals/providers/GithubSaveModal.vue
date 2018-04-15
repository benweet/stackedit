<template>
  <modal-inner aria-label="Synchronize with GitHub">
    <div class="modal__content">
      <div class="modal__image">
        <icon-provider provider-id="github"></icon-provider>
      </div>
      <p>This will save <b>{{currentFileName}}</b> to your <b>GitHub</b> repository and keep it synchronized.</p>
      <form-entry label="Repository URL" error="repoUrl">
        <input slot="field" class="textfield" type="text" v-model.trim="repoUrl" @keydown.enter="resolve()">
        <div class="form-entry__info">
          <b>Example:</b> https://github.com/benweet/stackedit
        </div>
      </form-entry>
      <form-entry label="Branch" info="optional">
        <input slot="field" class="textfield" type="text" v-model.trim="branch" @keydown.enter="resolve()">
        <div class="form-entry__info">
          If not provided, the <code>master</code> branch will be used.
        </div>
      </form-entry>
      <form-entry label="File path" error="path">
        <input slot="field" class="textfield" type="text" v-model.trim="path" @keydown.enter="resolve()">
        <div class="form-entry__info">
          <b>Example:</b> docs/README.md<br>
          If the file exists, it will be replaced.
        </div>
      </form-entry>
    </div>
    <div class="modal__button-bar">
      <button class="button" @click="config.reject()">Cancel</button>
      <button class="button" @click="resolve()">Ok</button>
    </div>
  </modal-inner>
</template>

<script>
import githubProvider from '../../../services/providers/githubProvider';
import modalTemplate from '../common/modalTemplate';

export default modalTemplate({
  data: () => ({
    branch: '',
    path: '',
  }),
  computedLocalSettings: {
    repoUrl: 'githubRepoUrl',
  },
  created() {
    this.path = `${this.currentFileName}.md`;
  },
  methods: {
    resolve() {
      if (!this.repoUrl) {
        this.setError('repoUrl');
      }
      if (!this.path) {
        this.setError('path');
      }
      if (this.repoUrl && this.path) {
        const parsedRepo = githubProvider.parseRepoUrl(this.repoUrl);
        if (!parsedRepo) {
          this.setError('repoUrl');
        } else {
          // Return new location
          const location = githubProvider.makeLocation(
            this.config.token, parsedRepo.owner, parsedRepo.repo, this.branch || 'master', this.path);
          this.config.resolve(location);
        }
      }
    },
  },
});
</script>
