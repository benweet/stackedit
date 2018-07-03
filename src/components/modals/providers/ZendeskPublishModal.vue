<template>
  <modal-inner aria-label="Publish to Zendesk">
    <div class="modal__content">
      <div class="modal__image">
        <icon-provider provider-id="zendesk"></icon-provider>
      </div>
      <p>Publish <b>{{currentFileName}}</b> to your <b>Zendesk Help Center</b>.</p>
      <form-entry label="Section ID" error="sectionId">
        <input slot="field" class="textfield" type="text" v-model.trim="sectionId" @keydown.enter="resolve()">
        <div class="form-entry__info">
          https://example.zendesk.com/hc/en-us/sections/<b>21857469</b>-Section-name
        </div>
      </form-entry>
      <form-entry label="Existing article ID" info="optional">
        <input slot="field" class="textfield" type="text" v-model.trim="articleId" @keydown.enter="resolve()">
      </form-entry>
      <form-entry label="Locale" info="optional">
        <input slot="field" class="textfield" type="text" v-model.trim="locale" @keydown.enter="resolve()">
        <div class="form-entry__info">
          <b>Default:</b> en-us
        </div>
      </form-entry>
      <form-entry label="Template">
        <select slot="field" class="textfield" v-model="selectedTemplate" @keydown.enter="resolve()">
          <option v-for="(template, id) in allTemplatesById" :key="id" :value="id">
            {{ template.name }}
          </option>
        </select>
        <div class="form-entry__actions">
          <a href="javascript:void(0)" @click="configureTemplates">Configure templates</a>
        </div>
      </form-entry>
      <div class="modal__info">
        <b>ProTip:</b> You can provide values for <code>title</code>, <code>tags</code> and
        <code>status</code> in the <a href="javascript:void(0)" @click="openFileProperties">file properties</a>.
      </div>
    </div>
    <div class="modal__button-bar">
      <button class="button" @click="config.reject()">Cancel</button>
      <button class="button button--resolve" @click="resolve()">Ok</button>
    </div>
  </modal-inner>
</template>

<script>
import zendeskProvider from '../../../services/providers/zendeskProvider';
import modalTemplate from '../common/modalTemplate';

export default modalTemplate({
  data: () => ({
    articleId: '',
  }),
  computedLocalSettings: {
    sectionId: 'zendescPublishSectionId',
    locale: 'zendescPublishLocale',
    selectedTemplate: 'zendeskPublishTemplate',
  },
  methods: {
    resolve() {
      if (!this.sectionId && !this.articleId) {
        this.setError('sectionId');
      } else {
        // Return new location
        const location = zendeskProvider.makeLocation(
          this.config.token,
          this.sectionId,
          this.locale || 'en-us',
          this.articleId,
        );
        location.templateId = this.selectedTemplate;
        this.config.resolve(location);
      }
    },
  },
});
</script>
