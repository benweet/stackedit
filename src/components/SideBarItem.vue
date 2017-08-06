<template>
  <div class="side-bar-item button flex flex--row flex--align-center">
    <div class="side-bar-item__icon flex flex--column flex--center">
      <slot name="icon"></slot>
    </div>
    <div class="flex flex--column">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="scss">
.side-bar-item {
  text-align: left;
  padding: 10px 12px;
  height: auto;
  margin: 5px;

  span {
    display: inline-block;
    font-size: 0.75em;
    opacity: 0.5;
    white-space: normal;
    line-height: 1.4;
  }
}

.side-bar-item__icon {
  height: 20px;
  width: 20px;
  margin-right: 12px;
  -webkit-flex: none;
  flex: none;
}
</style>
