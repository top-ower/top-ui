<template>
  <div :class="className" :id="id" :style="{height:height,width:width}" :data="data" />
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
      type: Object
    }
  },
  data() {
    return {
      chart: null,
      isInit: ''
    }
  },
  watch: {
    data: {
      deep: true,
      handler(val) {
        this.initChart()
      }
    }
  },
  mounted() {
    this.chart = echarts.init(this.$el)
    this.initChart()
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            crossStyle: {
              color: '#999'
            }
          }
        },
        grid: {
          top: 40,
          left: 10,
          right: 0,
          bottom: 30,
          containLabel: true
        },
        xAxis: [{
          type: 'category',
          data: this.data.xAxisData,
          axisTick: {
            alignWithLabel: true
          },
          axisLine: {
            lineStyle: {
              color: '#979797'
            }
          }
        }],
        yAxis: [{
            type: 'value',
            name: `${this.data.seriesNameBar}(${this.data.barName})`,
            axisLine: {
              // show: false,
              lineStyle: {
                color: '#979797'
              }
            },
            axisLabel: {
              formatter: `{value}${this.data.barName}`
            },
            min: this.data.min,
            max: this.data.max,
            interval: this.data.interval,
          },
          {
            type: 'value',
            max: this.data.lineMax,
            name: `${this.data.seriesNameLine}(${this.data.lineName})`,
            axisLine: {
              // show: false,
              lineStyle: {
                color: '#979797'
              }
            },
            axisLabel: {
              formatter: `{value}${this.data.lineName}`
            }
          }
        ],
        series: [{
            name: this.data.seriesNameBar,
            type: 'bar',
            barWidth: '35%',
            barMaxWidth: 30,
            barGap: '1%',
            barCategoryGap: '1%',
            itemStyle: {
              color: '#4c84ff'
            },
            data: this.data.seriesDataBar
          },
          {
            name: this.data.seriesNameLine,
            type: 'line',
            yAxisIndex: 1,
            itemStyle: {
              color: '#ff3d73'
            },
            data: this.data.seriesDataLine
          }
        ]
      })
    }
  }
}

</script>
