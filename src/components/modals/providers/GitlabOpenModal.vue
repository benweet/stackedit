<template>
  <modal-inner aria-label="Synchronize with GitLab">
    <div class="modal__content">
      <div class="modal__image">
        <icon-provider provider-id="gitlab"></icon-provider>
      </div>
      <p>Open a file from your <b>GitLab</b> repository and keep it synced.</p>
      <form-entry label="Repository URL" error="repoUrl">
        <input slot="field" class="textfield" type="text" v-model.trim="repoUrl" @keydown.enter="resolve()">
        <div class="form-entry__info">
          <b>Example:</b> https://gitlab.com/benweet/stackedit
        </div>
      </form-entry>
      <form-entry label="File path" error="path">
        <input slot="field" class="textfield" type="text" v-model.trim="path" @keydown.enter="resolve()">
        <div class="form-entry__info">
          <b>Example:</b> path/to/README.md
        </div>
      </form-entry>
      <form-entry label="Branch" info="optional">
        <input slot="field" class="textfield" type="text" v-model.trim="branch" @keydown.enter="resolve()">
        <div class="form-entry__info">
          If not supplied, the <code>master</code> branch will be used.
        </div>
      </form-entry>
    </div>
    <div class="modal__button-bar">
      <button class="button" @click="config.reject()">Cancel</button>
      <button class="button button--resolve" @click="resolve()">Ok</button>
    </div>
  </modal-inner>
</template>

<script>
import gitlabProvider from '../../../services/providers/gitlabProvider';
import modalTemplate from '../common/modalTemplate';
import utils from '../../../services/utils';

export default modalTemplate({
  data: () => ({
    branch: '',
    path: '',
  }),
  computedLocalSettings: {
    repoUrl: 'gitlabRepoUrl',
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
        const parsedRepo = utils.parseGithubRepoUrl(this.repoUrl);
        global.console.log(parsedRepo);
        if (!parsedRepo) {
          this.setError('repoUrl');
        } else {
          // Return new location
          const location = gitlabProvider.makeLocation(
            this.config.token,
            parsedRepo.owner,
            parsedRepo.repo,
            this.branch || 'master',
            this.path,
          );
          global.console.log(location);
          this.config.resolve(location);
        }
      }
    },
  },
});
</script>
