<template>
  <modal-inner aria-label="Publish to WordPress">
    <div class="modal__content">
      <div class="modal__image">
        <icon-provider provider-id="wordpress"></icon-provider>
      </div>
      <p>Publish <b>{{currentFileName}}</b> to your <b>WordPress</b> site.</p>
      <form-entry label="Site domain" error="domain">
        <input slot="field" class="textfield" type="text" v-model.trim="domain" @keydown.enter="resolve()">
        <div class="form-entry__info">
          <b>Example:</b> example.wordpress.com<br>
          <b>Note:</b> Jetpack is required for self-hosted sites.
        </div>
      </form-entry>
      <form-entry label="Existing post ID" info="optional">
        <input slot="field" class="textfield" type="text" v-model.trim="postId" @keydown.enter="resolve()">
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
        <b>ProTip:</b> You can provide values for <code>title</code>, <code>tags</code>,
        <code>categories</code>, <code>excerpt</code>, <code>author</code>, <code>featuredImage</code>,
        <code>status</code> and <code>date</code> in the <a href="javascript:void(0)" @click="openFileProperties">file properties</a>.
      </div>
    </div>
    <div class="modal__button-bar">
      <button class="button" @click="config.reject()">Cancel</button>
      <button class="button button--resolve" @click="resolve()">Ok</button>
    </div>
  </modal-inner>
</template>

<script>
import wordpressProvider from '../../../services/providers/wordpressProvider';
import modalTemplate from '../common/modalTemplate';

export default modalTemplate({
  data: () => ({
    postId: '',
  }),
  computedLocalSettings: {
    domain: 'wordpressDomain',
    selectedTemplate: 'wordpressPublishTemplate',
  },
  methods: {
    resolve() {
      if (!this.domain) {
        this.setError('domain');
      } else {
        // Return new location
        const location = wordpressProvider.makeLocation(
          this.config.token,
          this.domain,
          this.postId,
        );
        location.templateId = this.selectedTemplate;
        this.config.resolve(location);
      }
    },
  },
});
</script>
