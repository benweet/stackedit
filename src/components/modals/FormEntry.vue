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

<style lang="scss">
@import '../common/variables.scss';

.form-entry {
  margin: 1em 0;
}

.form-entry__label {
  display: block;
  font-size: 0.9rem;
  color: #a0a0a0;

  .form-entry--focused & {
    color: darken($link-color, 10%);
  }
}

.form-entry__field {
  border: 1px solid #d8d8d8;
  border-radius: $border-radius-base;
  position: relative;
  overflow: hidden;

  .form-entry--focused & {
    border-color: $link-color;
  }
}

.form-entry__actions {
  text-align: right;
  margin: 0.25em;
}

.form-entry__button {
  width: 38px;
  height: 38px;
  padding: 6px;
  display: inline-block;
  background-color: transparent;
  opacity: 0.75;

  &:active,
  &:focus,
  &:hover {
    opacity: 1;
    background-color: rgba(0, 0, 0, 0.1);
  }
}

.form-entry__radio,
.form-entry__checkbox {
  margin: 0.25em 1em;

  input {
    margin-right: 0.25em;
  }
}

.form-entry__info {
  font-size: 0.75em;
  opacity: 0.5;
  line-height: 1.4;
  margin: 0.25em 0;
}
</style>
