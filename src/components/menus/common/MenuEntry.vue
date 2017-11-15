<template>
  <a href="javascript:void(0)" class="menu-entry button flex flex--row flex--align-center">
    <div class="menu-entry__icon flex flex--column flex--center">
      <slot name="icon"></slot>
    </div>
    <div class="menu-entry__text flex flex--column">
      <slot></slot>
    </div>
  </a>
</template>

<style lang="scss">
@import '../../common/variables.scss';

.menu-entry {
  text-align: left;
  padding: 10px;
  height: auto;
  font-size: 17px;
  text-transform: none;

  div div {
    text-decoration: underline;
    text-decoration-skip: ink;

    &.menu-entry__sponsor {
      text-decoration: none;
    }
  }

  span {
    display: inline-block;
    font-size: 0.75rem;
    opacity: 0.5;
    white-space: normal;
  }
}

.menu-entry__icon {
  height: 20px;
  width: 20px;
  margin-right: 12px;
  flex: none;
}

.menu-entry__icon--image {
  border-radius: $border-radius-base;
  overflow: hidden;
}

.hidden-file {
  position: fixed;
  top: -999px;
}

.menu-entry__sponsor {
  float: right;
  font-size: 0.6rem;
  font-weight: 600;
  padding: 0.05em 0.25em;
  background-color: darken($error-color, 10);
  border-radius: 3px;
  color: #fff;
}

.menu-entry__text {
  width: 100%;
}
</style>
