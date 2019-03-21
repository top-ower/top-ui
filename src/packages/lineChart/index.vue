<template>
  <div :class="className" :id="id" :style="{height:height,width:width}" :data="data"></div>
</template>
<script>
import echarts from 'echarts'

export default {
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    id: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '200px'
    },
    height: {
      type: String,
      default: '200px'
    },
    data: {
      type: Object,
    }
  },
  data() {
    return {
      chart: null,
      isInit: '',
    }
  },
  mounted() {
    this.chart = echarts.init(this.$el);
    this.initChart();
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  watch: {
    data: {
      deep: true,
      handler(val) {
        this.initChart();
      }
    }
  },
  methods: {
    initChart() {
      this.chart.setOption({
        backgroundColor: 'transparent',
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            lineStyle: {
              color: '#e6e8e5'
            }
          },
          formatter: function(params){
            return `${params[0].axisValue}<br>当前值：${params[0].value}`
          }
        },
        color: ['#ffd633'],
        // legend: {
        //   top: 20,
        //   icon: 'rect',
        //   itemWidth: 14,
        //   itemHeight: 5,
        //   itemGap: 13,
        //   data: this.data.yName,
        //   top: 0,
        //   left: 80,
        //   textStyle: {
        //     fontSize: 14,
        //     color: '#787878'
        //   }
        // },
        grid: {
          top: 35,
          left: 0,
          right: 20,
          bottom: 25,
          containLabel: true
        },
        xAxis: {
          type: 'category',
          axisLine: {
            lineStyle: {
              color: '#e1e2e'
            }
          },
          data: this.data.time
        },
        yAxis: {
          type: 'value',
          axisLine: {
            // show: false,
            lineStyle: {
              color: '#e1e2e'
            }
          },
          axisLabel: {
            margin: 15,
            textStyle: {
              fontSize: 14
            }
          },
          splitLine: {
            lineStyle: {
              color: '#e6e8e5'
            }
          }
        },
        series: [{
          data: this.data.value,
          type: 'line'
        }]
      })
    }
  }
}

</script>
