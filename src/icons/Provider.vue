<template>
  <div class="icon-provider" :class="['icon-provider--' + providerId]">
  </div>
</template>

<script>
export default {
  props: ['providerId'],
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

.icon-provider--googleDrive {
  background-image: url(../assets/iconGoogleDrive.svg);
}

.icon-provider--googlePhotos {
  background-image: url(../assets/iconGooglePhotos.svg);
}

.icon-provider--github,
.icon-provider--gist {
  background-image: url(../assets/iconGithub.svg);
}

.icon-provider--dropbox,
.icon-provider--dropboxRestricted {
  background-image: url(../assets/iconDropbox.svg);
}

.icon-provider--wordpress {
  background-image: url(../assets/iconWordpress.svg);
}

.icon-provider--blogger,
.icon-provider--bloggerPage {
  background-image: url(../assets/iconBlogger.svg);
}

.icon-provider--zendesk {
  background-image: url(../assets/iconZendesk.svg);
}
</style>
