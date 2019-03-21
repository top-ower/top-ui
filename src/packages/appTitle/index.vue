<template>
  <div class="appTitle">
    <span class="pstLabel"/>
    <span class="pstName">{{ titleName }}</span>
  </div>
</template>
<script>
export default {
  name: 'AppTitle',
  props: {
    titleName: {
      type: String
    }
  },
  methods: {
    goUrl(url) {
      this.$emit('parentGoUrl')
    }
  }
}

</script>
<style rel="stylesheet/scss" lang="scss">
@import "../../styles/variables.scss";
@import '../../styles/config.scss';

.appTitle {
  line-height: vw(25);
  .pstLabel {
    display: inline-block;
    width: vw(4);
    height: vw(15);
    background-color: $primary-font-color;
        vertical-align: middle;
  }

  .pstName {
    font-size: vw(16);
    color: $color-323232;
        vertical-align: middle;
  }
}

</style>
