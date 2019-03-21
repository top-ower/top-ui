<template>
  <div :class="className" :id="id" :style="{height:height,width:width}"></div>
</template>
<script>
import echarts from 'echarts'

export default {
  name: 'GaugeChart',
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
      type: Array,
    }
  },
  data() {
    return {
      chart: null,
      isInit: '',
    }
  },
  mounted() {
    this.chart = echarts.init(this.$el)
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
    initChart(chartData) {
      
      this.chart.setOption({
        tooltip: {
          formatter: "{a} <br/>{b} : {c}"
        },
        // toolbox: {
        //   feature: {
        //     restore: {},
        //     saveAsImage: {}
        //   }
        // },
        series: [{
          name: this.data[0].title,
          type: 'gauge',
          min: 0,
          max: this.data[0].maxValue,
          splitNumber: 5,
          axisLine: { // 坐标轴线
            lineStyle: { // 属性lineStyle控制线条样式
              width: 12,
              color: [
                [0.2, '#66d6dd'],
                [0.80, '#07cefe'],
                [1, '#fa8564']
              ],
            }
          },
          splitLine: { // 分隔线
            length: 12, // 属性length控制线长
            lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
              width: 3,
              color: '#fff',
              shadowColor: '#fff', //默认透明
              // shadowBlur: 10
            }
          },
          title: {
            textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
              fontWeight: 'bolder',
              fontSize: 14,
              fontStyle: 'italic',
              color: '#787878',
              shadowColor: '#fff', //默认透明
              shadowBlur: 10
            }
          },
          detail: {
            // backgroundColor: 'rgba(30,144,255,0.8)',
            borderWidth: 1,
            borderColor: '#fff',
            shadowColor: '#fff', //默认透明
            shadowBlur: 5,
            offsetCenter: [0, '65%'], // x, y，单位px
            textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
              fontSize: 26,
              fontWeight: 'bolder',
              color: '#282828'
            }
          },
          data: this.data
          // data: [{ value: 50, name: '完成率' }]
        }, ]
      })
    }
  }
}

</script>
