<template>
  <div :class="className" :id="id" :style="{height:height,width:width}"></div>
</template>
<script>
// import echarts from 'echarts'
import axios from 'axios'
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
    mapData: {
      type: Object,
    },
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
        this.inntEchats2();
      }
    }
  },
  methods: {
    inntEchats2() {
      let chart_1 = null
      let self = this
      // console.log(chinaMainCity)
      requires.config({
        paths: {
          echarts: 'static/echats2.x/echarts/js'
        }
      });
      requires(
        [
          'echarts',
          'echarts/chart/map',
        ],
        function(ec) {
          console.log(ec)
          chart_1 = ec.init(document.getElementById(self.id))
          var option_1 = {
            tooltip: {
              trigger: 'item',
              // formatter: '{b}',
              formatter: function(params, ticket, callback) {
                // console.log(params)
                return !isNaN(params.data.value)? `${params.data.name}: ${ params.data.value}${self.mapData.unit}` : params.data.name
              }
            },
            dataRange: {
              show: false,
              orient: 'horizontal',
              min: self.mapData.min,
              max: self.mapData.max,
              inRange: {
                color: ['rgba(76,132,255,0.2)', 'rgba(76,132,255,0.3)', 'rgba(76,132,255,0.4)', 'rgba(76,132,255,0.5)', 'rgba(76,132,255,0.6)', 'rgba(76,132,255,0.7)', 'rgba(76,132,255,0.8)'],
              },
              text: ['High', 'Low'], // 文本，默认为数值文本
              splitNumber: 0
            },
            series: [{
              zoom: 1.2,
              type: 'map',
              roam: true,
              map: 'china',
              itemStyle: {
                normal: { label: { show: true } },
                emphasis: { label: { show: true } }
              },
              // 文本位置修正
              textFixed: {
                Alaska: [20, -20]
              },
              data: self.mapData.list,
            }],
            animation: false
          };
          console.log(self.mapData.list)
          chart_1.setOption(option_1, true);
          chart_1.on('click', function(param) {
            // console.log(param)
            let selectedProvince = param && param.data.name
            let areaCode = param && param.data.areaCode
            if(!areaCode) return
            self.$emit('mapDetail', {type: self.mapData.type, province: selectedProvince, areaCode: areaCode})
          })
        }
      )
    }
  },
  mounted() {
    // this.getJson()
    this.inntEchats2()
  },
}

</script>
