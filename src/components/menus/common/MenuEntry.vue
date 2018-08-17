<template>
  <a class="menu-entry button flex flex--row flex--align-center" href="javascript:void(0)">
    <div class="menu-entry__icon flex flex--column flex--center">
      <slot name="icon"></slot>
    </div>
    <div class="menu-entry__text flex flex--column">
      <slot></slot>
    </div>
  </a>
</template>

<style lang="scss">
@import '../../../styles/variables.scss';

.menu-entry {
  text-align: left;
  padding: 10px;
  height: auto;
  font-size: 17px;
  line-height: 1.4;
  text-transform: none;
  white-space: normal;

  span {
    display: inline-block;
    font-size: 0.75rem;
    opacity: 0.67;
    line-height: 1.3;

    .menu-entry__label {
      opacity: 1;
    }

    span {
      display: inline;
      opacity: 1;
    }
  }
}

.menu-entry--info {
  padding-top: 3px;
  padding-bottom: 3px;
}

.menu-entry__icon {
  height: 20px;
  width: 20px;
  margin-right: 12px;
  flex: none;
}

.menu-entry__icon--disabled {
  opacity: 0.5;
}

.menu-entry__icon--image {
  border-radius: $border-radius-base;
  overflow: hidden;
}

.hidden-file {
  position: fixed;
  top: -999px;
}

.menu-entry__label {
  float: right;
  font-size: 0.6rem;
  font-weight: 600;
  line-height: 1;
  padding: 0.15em 0.25em;
  background-color: #fff;
  border-radius: 3px;
  opacity: 0.6;
}

.menu-entry__label--warning {
  color: #fff;
  background-color: darken($error-color, 10);
  opacity: 1;
}

.menu-entry__label--count {
  font-size: 0.75rem;
  font-weight: 400;
}

.menu-entry__text {
  width: 100%;
  overflow: hidden;
}
</style>
