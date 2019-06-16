<template>
  <div class="icon-provider" :class="'icon-provider--' + classState">
    <icon-sync-off v-if="!classState"></icon-sync-off>
  </div>
</template>

<script>
export default {
  props: ['providerId'],
  computed: {
    classState() {
      switch (this.providerId) {
        case 'googleDrive':
        case 'googleDriveAppData':
        case 'googleDriveWorkspace':
          return 'google-drive';
        case 'googlePhotos':
          return 'google-photos';
        case 'githubWorkspace':
          return 'github';
        case 'gist':
          return 'github';
        case 'gitlabWorkspace':
          return 'gitlab';
        case 'bloggerPage':
          return 'blogger';
        case 'couchdbWorkspace':
          return 'couchdb';
        default:
          return this.providerId;
      }
    },
  },
};
</script>

<style lang="scss">
.icon-provider {
  width: 100%;
  height: 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
}

.icon-provider--stackedit {
  background-image: url(../assets/iconStackedit.svg);
}

.icon-provider--google-drive {
  background-image: url(../assets/iconGoogleDrive.svg);
}

.icon-provider--google-photos {
  background-image: url(../assets/iconGooglePhotos.svg);
}

.icon-provider--github {
  background-image: url(../assets/iconGithub.svg);
}

.icon-provider--gitlab {
  background-image: url(../assets/iconGitlab.svg);
}

.icon-provider--google {
  background-image: url(../assets/iconGoogle.svg);
}

.icon-provider--dropbox {
  background-image: url(../assets/iconDropbox.svg);
}

.icon-provider--wordpress {
  background-image: url(../assets/iconWordpress.svg);
}

.icon-provider--blogger {
  background-image: url(../assets/iconBlogger.svg);
}

.icon-provider--zendesk {
  background-image: url(../assets/iconZendesk.svg);
}

.icon-provider--couchdb {
  background-image: url(../assets/iconCouchdb.svg);
}
</style>
