<template>
  <div :class="className" :id="id" :style="{height:height,width:width}"></div>
</template>
<script>
// import echarts from 'echarts'
import axios from 'axios'
export default {
  props: {
    mapData: {
      type: Object,
    },
    className: {
      type: String,
      default: 'childrenId'
    },
    id: {
      type: String,
      default: 'childrenId'
    },
    width: {
      type: String,
      default: '200px'
    },
    height: {
      type: String,
      default: '200px'
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
      let chart_2 = null
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
          chart_2 = ec.init(document.getElementById(self.id))
          // axios.get(process.env.PUPPY + '/public/mapJson/china.json')
          //   .then(res => {
          //     console.log(res);
          //   })
          let option_2 = {
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
              min: 0,
              max: 300,
              inRange: {
                color: ['rgba(76,132,255,0.2)', 'rgba(76,132,255,0.3)', 'rgba(76,132,255,0.4)', 'rgba(76,132,255,0.5)', 'rgba(76,132,255,0.6)', 'rgba(76,132,255,0.7)', 'rgba(76,132,255,0.8)'],
              },
              text: ['High', 'Low'], // 文本，默认为数值文本
              splitNumber: 0
            },

            series: [{
              name: '随机数据',
              type: 'map',
              mapType: self.mapData.selectedProvince,
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
          };
          chart_2.setOption(option_2, true);

        }
      )
    }
  },
  mounted() {
    this.inntEchats2()
  },
}

</script>
