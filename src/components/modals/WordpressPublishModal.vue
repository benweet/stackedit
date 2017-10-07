<template>
  <div class="modal__inner-1" role="dialog" aria-label="Publish to WordPress">
    <div class="modal__inner-2">
      <div class="modal__image">
        <icon-provider provider-id="wordpress"></icon-provider>
      </div>
      <p>This will publish <b>{{currentFileName}}</b> to your <b>WordPress</b> site.</p>
      <form-entry label="Site domain" error="domain">
        <input slot="field" class="textfield" type="text" v-model.trim="domain" @keyup.enter="resolve()">
        <div class="form-entry__info">
          <b>Example:</b> example.wordpress.com<br>
          <b>Jetpack plugin</b> is required for self-hosted sites.
        </div>
      </form-entry>
      <form-entry label="Existing post ID (optional)">
        <input slot="field" class="textfield" type="text" v-model.trim="postId" @keyup.enter="resolve()">
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
      <div class="modal__info">
        <b>ProTip:</b> You can provide values for <code>title</code>, <code>tags</code>,
        <code>categories</code>, <code>excerpt</code>, <code>author</code>, <code>featuredImage</code>,
        <code>status</code> and <code>date</code> in the <a href="javascript:void(0)" @click="openFileProperties">file properties</a>.
      </div>
      <div class="modal__button-bar">
        <button class="button" @click="config.reject()">Cancel</button>
        <button class="button" @click="resolve()">Ok</button>
      </div>
    </div>
  </div>
</template>

<script>
import wordpressProvider from '../../services/providers/wordpressProvider';
import modalTemplate from './modalTemplate';

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
          this.config.token, this.domain, this.postId);
        location.templateId = this.selectedTemplate;
        this.config.resolve(location);
      }
    },
  },
});
</script>
