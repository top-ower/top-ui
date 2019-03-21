<template>
  <svg :class="svgClass" aria-hidden="true">
    <use :xlink:href="iconName"></use>
  </svg>
</template>

<script>
export default {
  name: 'SvgIcon',
  props: {
    iconClass: {
      type: String,
      required: true
    },
    className: {
      type: String
    }
  },
  computed: {
    iconName() {
      return `#icon-${this.iconClass}`
    },
    svgClass() {
      if (this.className) {
        return 'svg-icon ' + this.className
      } else {
        return 'svg-icon'
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
@import "../theme-chalk/common/variables.scss";
@import "../theme-chalk/common/config.scss";
.svg-icon {
  width: vw(18);
  height: vw(18);
  vertical-align: middle;
  fill: currentColor;
  overflow: hidden;
}
</style>
