<template>
  <div id="app">
    <p> {{ msg }} </p>
    <!-- 柱状图 -->
    <div class="item-container">
      <bar-chart :id="'barChart'" :barData="barData" height="500px" width="100%"></bar-chart>
    </div>
    <div class="item-container">
      <bar-chart :id="'barChart'" :barData="barData" height="500px" width="100%"></bar-chart>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      msg: '欢迎使用top-UI',
      barData: {
        barName: '台',
        seriesNameBar: '数量',
        seriesNameLine: '.',
        xAxisData: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        seriesData: [10, 52, 200, 334, 390, 330, 220],
        min: 10,
        max: 330,
        interval: 330 / 4 <= 1 ? 1 : parseInt(330 / 4),
      }
    }
  },
  methods: {
   
  },
  watch: {
  }
}
</script>

<style lang="scss">
  .item-container {
    margin-top: 20px;
  }
</style>
