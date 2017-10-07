<template>
  <div class="modal__inner-1" role="dialog" aria-label="Publish to Dropbox">
    <div class="modal__inner-2">
      <div class="modal__image">
        <icon-provider provider-id="dropbox"></icon-provider>
      </div>
      <p>This will publish <b>{{currentFileName}}</b> to your <b>Dropbox</b>.</p>
      <form-entry label="File path" error="path">
        <input slot="field" class="textfield" type="text" v-model.trim="path" @keyup.enter="resolve()">
        <div class="form-entry__info">
          <b>Example:</b> {{config.token.fullAccess ? '' : '/Applications/StackEdit (restricted)'}}/path/to/My Document.html<br>
          If the file exists, it will be replaced.
        </div>
      </form-entry>
      <form-entry label="Template">
        <select slot="field" class="textfield" v-model="selectedTemplate" @keyup.enter="resolve()">
          <option v-for="(template, id) in allTemplates" :key="id" :value="id">
            {{ template.name }}
          </option>
        </select>
        <div class="form-entry__actions">
          <a href="javascript:void(0)" @click="configureTemplates">Configure templates</a>
        </div>
      </form-entry>
      <div class="modal__button-bar">
        <button class="button" @click="config.reject()">Cancel</button>
        <button class="button" @click="resolve()">Ok</button>
      </div>
    </div>
  </div>
</template>

<script>
import dropboxProvider from '../../services/providers/dropboxProvider';
import modalTemplate from './modalTemplate';

export default modalTemplate({
  data: () => ({
    path: '',
  }),
  computedLocalSettings: {
    selectedTemplate: 'dropboxPublishTemplate',
  },
  created() {
    this.path = `/${this.currentFileName}.html`;
  },
  methods: {
    resolve() {
      if (!dropboxProvider.checkPath(this.path)) {
        this.setError('path');
      } else {
        // Return new location
        const location = dropboxProvider.makeLocation(this.config.token, this.path);
        location.templateId = this.selectedTemplate;
        this.config.resolve(location);
      }
    },
  },
});
</script>
