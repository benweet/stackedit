<template>
  <div class="form-entry" :error="error">
    <label class="form-entry__label" :for="uid">{{label}}<span class="form-entry__label-info" v-if="info"> &mdash; {{info}}</span></label>
    <div class="form-entry__field">
      <slot name="field"></slot>
    </div>
    <slot></slot>
  </div>
</template>

<script>
import utils from '../../../services/utils';

export default {
  props: ['label', 'info', 'error'],
  data: () => ({
    uid: utils.uid(),
  }),
  mounted() {
    this.$el.querySelector('input,select').id = this.uid;
  },
};
</script>
