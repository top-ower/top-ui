<template>
  <div :class="className" :id="id" :style="{height:height,width:width}" />
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
      let index = -1
      const th = this
      this.chart.setOption({
        tooltip: {
          trigger: 'item',
          formatter: function(params, ticket, callback) {
            return `${params.seriesName} <br/> ${params.name}：${params.value} ${th.data.unit ? th.data.unit : ''} (${params.percent}%)`
          }
        },
        color: this.data.color,
        legend: {
          orient: this.data && this.data.orient ? this.data.orient :'vertical',
          x: 'left',
          top: this.data && this.data.top ? this.data.top : '35%',
          left: this.data && this.data.left ? this.data.left :'45%',
          bottom: this.data && this.data.bottom ? this.data.bottom : 'auto',
          formatter: function(name) {
            index++
            index >= th.data.seriesData.length ? index = 0 : index = index
            return name + '  ' + (th.data.seriesData[index] && th.data.seriesData[index].value + th.data.legendType)
          },
          textStyle: {
            color: '#323232',
            fontSize: 12,
            padding: [2, 0, 2, 6]
          }
        },
        series: [{
          name: this.data.name,
          type: 'pie',
          center: this.data && this.data.center ? this.data.center : ['20%', '60%'],
          radius: this.data && this.data.radius ? this.data.radius : ['50%', '70%'],
          avoidLabelOverlap: false,
          label: {
            normal: {
              show: false,
              position: 'center'
            },
            emphasis: {
              show: true,
              textStyle: {
                fontSize: '12',
                fontWeight: 'bold'
              }
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          data: this.data.seriesData
        }]
      })
    }
  }
}

</script>
