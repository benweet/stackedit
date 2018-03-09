<template>
  <modal-inner aria-label="Export to PDF">
    <div class="modal__content">
      <p>Please choose a template for your <b>PDF export</b>.</p>
      <form-entry label="Template">
        <select class="textfield" slot="field" v-model="selectedTemplate" @keydown.enter="resolve()">
          <option v-for="(template, id) in allTemplates" :key="id" :value="id">
            {{ template.name }}
          </option>
        </select>
        <div class="form-entry__actions">
          <a href="javascript:void(0)" @click="configureTemplates">Configure templates</a>
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
import FileSaver from 'file-saver';
import exportSvc from '../../services/exportSvc';
import sponsorSvc from '../../services/sponsorSvc';
import networkSvc from '../../services/networkSvc';
import googleHelper from '../../services/providers/helpers/googleHelper';
import modalTemplate from './common/modalTemplate';

export default modalTemplate({
  computedLocalSettings: {
    selectedTemplate: 'pdfExportTemplate',
  },
  methods: {
    resolve() {
      this.config.resolve();
      const currentFile = this.$store.getters['file/current'];
      this.$store.dispatch('queue/enqueue', () => Promise.all([
        Promise.resolve().then(() => {
          const sponsorToken = this.$store.getters['workspace/sponsorToken'];
          return sponsorToken && googleHelper.refreshToken(sponsorToken);
        }),
        sponsorSvc.getToken(),
        exportSvc.applyTemplate(
          currentFile.id, this.allTemplates[this.selectedTemplate], true),
      ])
        .then(([sponsorToken, token, html]) => networkSvc.request({
          method: 'POST',
          url: 'pdfExport',
          params: {
            token,
            idToken: sponsorToken && sponsorToken.idToken,
            options: JSON.stringify(this.$store.getters['data/computedSettings'].wkhtmltopdf),
          },
          body: html,
          blob: true,
          timeout: 60000,
        })
        .then((res) => {
          FileSaver.saveAs(res.body, `${currentFile.name}.pdf`);
        }, (err) => {
          if (err.status !== 401) {
            throw err;
          }
          this.$store.dispatch('modal/sponsorOnly');
        }))
        .catch((err) => {
          console.error(err); // eslint-disable-line no-console
          this.$store.dispatch('notification/error', err);
        }));
    },
  },
});
</script>
