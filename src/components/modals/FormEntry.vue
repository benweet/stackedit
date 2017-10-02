<template>
  <div class="form-entry">
    <label class="form-entry__label" :for="uid">{{label}}</label>
    <div class="form-entry__field">
      <slot name="field"></slot>
    </div>
    <slot></slot>
  </div>
</template>

<script>
import utils from '../../services/utils';

export default {
  props: ['label'],
  data: () => ({
    uid: utils.uid(),
  }),
  mounted() {
    this.$el.querySelector('input,select').id = this.uid;
  },
};
</script>
