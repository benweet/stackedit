<template>
  <div class="modal__inner-1 modal__inner-1--google-drive-sync">
    <div class="modal__inner-2">
      <div class="modal__image">
        <icon-provider provider-id="blogger"></icon-provider>
      </div>
      <p>This will publish <b>{{currentFileName}}</b> to your <b>Blogger</b> site.</p>
      <div class="form-entry">
        <label class="form-entry__label" for="blogUrl">Blog URL</label>
        <div class="form-entry__field">
          <input id="blogUrl" type="text" class="textfield" v-model="blogUrl" @keyup.enter="resolve()">
        </div>
        <div class="form-entry__info">
          <b>Example:</b> http://example.blogger.com/
        </div>
      </div>
      <div class="form-entry">
        <label class="form-entry__label" for="fileId">Existing post ID (optional)</label>
        <div class="form-entry__field">
          <input id="fileId" type="text" class="textfield" v-model="postId" @keyup.enter="resolve()">
        </div>
      </div>
      <div class="form-entry">
        <label class="form-entry__label" for="template">Template</label>
        <div class="form-entry__field">
          <select class="textfield" id="template" v-model="selectedTemplate" @keyup.enter="resolve()">
            <option v-for="(template, id) in allTemplates" :key="id" v-bind:value="id">
              {{ template.name }}
            </option>
          </select>
        </div>
        <div class="form-entry__actions">
          <a href="javascript:void(0)" @click="configureTemplates">Configure templates</a>
        </div>
      </div>
      <div class="modal__tip">
        <b>Tip:</b> You can provide values for <code>title</code>, <code>tags</code>,
        <code>status</code> and <code>date</code> in the <b>file properties</b>.
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
import bloggerProvider from '../../services/providers/bloggerProvider';
import store from '../../store';

const computedLocalSetting = id => ({
  get() {
    return store.getters['data/localSettings'][id];
  },
  set(value) {
    store.dispatch('data/patchLocalSettings', {
      [id]: value,
    });
  },
});

export default {
  data: () => ({
    postId: '',
  }),
  computed: {
    ...mapGetters('modal', [
      'config',
    ]),
    currentFileName() {
      return this.$store.getters['file/current'].name;
    },
    ...mapGetters('data', [
      'allTemplates',
    ]),
    blogUrl: computedLocalSetting('bloggerBlogUrl'),
    selectedTemplate: computedLocalSetting('bloggerPublishTemplate'),
  },
  methods: {
    configureTemplates() {
      this.$store.dispatch('modal/open', {
        type: 'templates',
        selectedId: this.selectedTemplate,
      })
        .then(({ templates, selectedId }) => {
          this.$store.dispatch('data/setTemplates', templates);
          this.$store.dispatch('data/patchLocalSettings', {
            bloggerPublishTemplate: selectedId,
          });
        });
    },
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
};
</script>
