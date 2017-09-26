<template>
  <div class="modal__inner-1">
    <div class="modal__inner-2">
      <div class="modal__image">
        <icon-provider provider-id="blogger"></icon-provider>
      </div>
      <p>This will publish <b>{{currentFileName}}</b> to your <b>Blogger</b> site.</p>
      <form-entry label="Blog URL">
        <input slot="field" class="textfield" type="text" v-model.trim="blogUrl" @keyup.enter="resolve()">
        <div class="form-entry__info">
          <b>Example:</b> http://example.blogger.com/
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
      <div class="modal__tip">
        <b>ProTip:</b> You can provide values for <code>title</code>, <code>tags</code>,
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
import bloggerProvider from '../../services/providers/bloggerProvider';
import modalTemplate from './modalTemplate';

export default modalTemplate({
  data: () => ({
    postId: '',
  }),
  computedLocalSettings: {
    blogUrl: 'bloggerBlogUrl',
    selectedTemplate: 'bloggerPublishTemplate',
  },
  methods: {
    resolve() {
      if (this.blogUrl) {
        // Return new location
        const location = bloggerProvider.makeLocation(
          this.config.token, this.blogUrl, this.postId);
        location.templateId = this.selectedTemplate;
        this.config.resolve(location);
      }
    },
  },
});
</script>
