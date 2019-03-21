<template>
  <div :class="className" :id="id" :style="{height:height,width:width}" />
</template>
<script>
import echarts from 'echarts'

export default {
  name: 'BarChart',
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
    barData: {
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
    barData: {
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
      const self = this
      let defaultOption = {
        grid: {
          top: 40,
          left: 10,
          right: 0,
          bottom: 30,
          containLabel: true
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'line' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        xAxis: [{
          type: 'category',
          data: this.barData.xAxisData,
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
          min: this.barData.min,
          max: this.barData.max,
          interval: this.barData.interval,
          name: `${this.barData.seriesNameBar}`,
          axisLine: {
            lineStyle: {
              color: '#979797'
            }
          },
          axisLabel: {
            margin: 15,
            textStyle: {
              fontSize: 14
            },
            formatter: `{value}${this.barData.barName}`
          },
          splitLine: {
            lineStyle: {
              color: '#979797'
            }
          }
        }],
        series: [{
          name: this.barData.seriesNameBar,
          type: 'bar',
          barWidth: '35%',
          barMaxWidth: 30,
          barGap: '1%',
          barCategoryGap: '1%',
          itemStyle: {
            color: '#4c84ff'
          },
          data: this.barData.seriesData
        }]
      }
      // defaultOption = this.initTooltipFormatter(defaultOption, this.barData.tooltips)
      this.chart.setOption(defaultOption)
    },
    /* 自定义显示提示(默认不自定义提示)*/
    initTooltipFormatter(defaultOption, tooltips) {
      if (!tooltips) {
        return defaultOption
      }
      defaultOption.tooltip.formatter = function(params) {
        const dataIndex = params[0].dataIndex
        const content = tooltips[dataIndex] && tooltips[dataIndex].split(',').join('<br/>')
        return content
      }
      return defaultOption
    }
  }
}

</script>
