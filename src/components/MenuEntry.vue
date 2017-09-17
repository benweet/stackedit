<template>
  <a href="javascript:void(0)" class="menu-entry button flex flex--row flex--align-center">
    <div class="menu-entry__icon flex flex--column flex--center">
      <slot name="icon"></slot>
    </div>
    <div class="flex flex--column">
      <slot></slot>
    </div>
  </a>
</template>

<style lang="scss">
.menu-entry {
  text-align: left;
  padding: 10px;
  height: auto;

  span {
    display: inline-block;
    font-size: 0.75em;
    opacity: 0.5;
    white-space: normal;
    line-height: 1.4;
  }
}

.menu-entry__icon {
  height: 20px;
  width: 20px;
  margin-right: 12px;
  -webkit-flex: none;
  flex: none;
}
</style>
