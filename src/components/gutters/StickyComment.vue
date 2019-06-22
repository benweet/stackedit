<template>
  <div class="sticky-comment" :style="{width: constants.gutterWidth + 'px', top: top + 'px'}">
    <comment v-if="currentDiscussionLastComment" :comment="currentDiscussionLastComment"></comment>
    <new-comment v-if="isCommenting"></new-comment>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import Comment from './Comment';
import NewComment from './NewComment';

export default {
  components: {
    Comment,
    NewComment,
  },
  data: () => ({
    top: 0,
  }),
  computed: {
    ...mapGetters('layout', [
      'constants',
    ]),
    ...mapState('discussion', [
      'isCommenting',
    ]),
    ...mapGetters('discussion', [
      'currentDiscussionLastComment',
    ]),
  },
};
</script>

<style lang="scss">
@import '../../styles/variables.scss';

.sticky-comment {
  position: absolute;
  right: 0;
  font-size: 15px;
  padding-top: 10px;

  .current-discussion & {
    width: auto !important;
  }
}
</style>
