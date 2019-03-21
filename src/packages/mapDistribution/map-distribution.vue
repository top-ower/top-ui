<template>
  <div :class="className" :id="id" :style="{height:height,width:width}"></div>
</template>
<script>
import echarts from 'echarts'
import { getRequest } from '../../utils/index'

export default {
  name: 'MapDistribution',
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
    unit: {
      type: String,
      default: '台'
    },
    mapData: {
      type: Array,
    }
  },
  data() {
    return {
      chart: null,
      isInit: '',
    }
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  watch: {
    mapData: {
      deep: true,
      handler(val) {
        this.getJson();
      }
    }
  },
  methods: {
    getJson() {
      return new Promise((resolve, reject) => {
        getRequest({
          url: '../../static/china.json',
          method: 'get',
        }).then(res => {
          echarts.registerMap('china', res);
          this.chart = echarts.init(this.$el);
          this.initChart();
        })
      });
    },
    initChart() {
      const self = this
      this.chart.setOption({
        tooltip: {
          trigger: 'item',
          formatter: function(params) {
            if (!params.name) return;
            return `${params.name } : ${params.value}${self.unit}`;
          }
        },
        visualMap: {
          show: true,
          left: '70px',
          min: 1,
          max: 2500,
          inRange: {
            color: ['#c8d9fe', '#0050ff']
          },
          color: ['#c8d9fe','#0050ff','lightskyblue'],
          text: ['高', '低'], // 文本，默认为数值文本
          calculable: true
        },
        series: [{
          zoom: 1.2,
          name: 'CHN PopEstimates',
          type: 'map',
          roam: false,
          map: 'china',
          itemStyle: {
            normal: { label: { show: true } },
            emphasis: { label: { show: true } }
          },
          // 文本位置修正
          textFixed: {
            Alaska: [20, -20]
          },
          data: this.mapData,
        }]
      });
    }
  },
  mounted() {
    this.getJson();
  }
}

</script>