<template>
  <div class="empty-view" v-if="show" :style="{height:height,width:width}">
    <div class="view" :style="{top: top}" :class="{'view-show': show, '': !show}">
      <img v-if="img" :src="img" />
      <div class="tips"> {{emptyTip}}</div>
    </div>
  </div>
</template>
<script>
import emptyDefaultImg from '@/assets/images/empty_default.png'
export default {
  name: 'view-empty',
  props: {
    show: {
      type: Boolean,
      default: false
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '100%'
    },
    top: {
      type: String,
      default: '50%'
    },
    img: {
      type: String,
      default: emptyDefaultImg
    },
    emptyTip: {
      type: String,
      default: '暂无数据~'
    }
  }
}

</script>
<style rel="stylesheet/scss" lang="scss">
@import "../../styles/variables.scss";
@import "../../styles/config.scss";
.empty-view{
  position: relative;
  .view {
    display: none;
    transition: display 0.58s;
    transition-delay: -1s;
    position: absolute;
    left: 50%;
    min-width: vw(200);
    text-align: center;
    -webkit-transform: translate(-50%,-50%);
    -ms-transform: translate(-50%,-50%);
    transform: translate(-50%,-50%);
    z-index: 99;
    img {
      min-width: vw(168);
      width: auto;
      height: auto;
    }
    .tips {
      margin-top: vw(20);
      padding-bottom: vw(30);
      font-size: vw(14);
      color: $empty-color;
    }
  }
  .view-show {
    display: block;
  }
}
</style>
