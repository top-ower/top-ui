<template>
  <div class="container">
    <div :class="className" :id="id" :style="{height:height,width:width}" :keyIndxe="keyIndxe">
    </div>
    <div class="button-group">
      <button id="up-btn" type="button" class="button" @click="goBack()">返回上一层</button>
    </div>
  </div>
</template>
<script>
window.infoWins = []
window.vLayers = []
window.go2Adcode = function(event, code, index) {
  event.stopPropagation();
  infoWins[index].close();
  vLayers[index].goto(code);
}

import echarts from 'echarts'
import request from '@/utils/request'
import axios from 'axios'

export default {
  props: {
    className: {
      type: String,
      default: 'container'
    },
    id: {
      type: String,
      default: 'container'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '100%'
    },
    zoom: {
      type: Number,
      default: 4,
    },
    mapData: {
      type: String,
    },
    keyIndxe: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      chart: null,
      isInit: '',
      infoWins: [],
      vLayers: [],
    }
  },
  watch: {
    mapData: {
      deep: true,
      handler(val) {
        this.initAmap();
      }
    }
  },
  methods: {
    initAmap() {
      let self = this
      let locaMap = Loca.create(self.id, {
        // mapStyle: 'amap://styles/twilight',
        // features: ['bg', 'road'],
        center: [107.4976, 32.1697],
        zoom: self.zoom
      })

      locaMap.on('mapload', function() {
        self.infoWins[self.keyIndxe] = new AMap.InfoWindow({
          closeWhenClickMap: true
        });
        infoWins[self.keyIndxe] = self.infoWins[self.keyIndxe]
      })

      this.vLayers[self.keyIndxe] = Loca.visualLayer({
        fitView: true,
        eventSupport: true,
        drillDown: false,
        container: locaMap,
        type: 'heatmap',
        shape: 'district'
      })
      vLayers[self.keyIndxe] = this.vLayers[self.keyIndxe]

      this.vLayers[self.keyIndxe].on('click', function(ev) {
        let originalEv = ev.originalEvent
        let amap = locaMap.getMap()
        let lnglat = amap.containerToLngLat(new AMap.Pixel(originalEv.layerX, originalEv.layerY))
        let feature = ev.feature
        let value = ev.value
        let property = feature.subFeature.properties
        // console.log(ev);
        self.infoWins[self.keyIndxe].open(amap, lnglat)
        let content = [
          '区域: ' + property.name,
          '<br>',
          '数量: ' + value,
          '<br>',
          property.childrenNum ? '<button onclick="go2Adcode(event, ' + property.adcode + ', ' + self.keyIndxe + ')">查看</button>' : ''
        ];
        self.infoWins[self.keyIndxe].setContent(content.join(''));
      });

      // console.log(this.mapData)
      this.vLayers[this.keyIndxe].setData(this.mapData, {
        type: 'csv',
        lnglat: '经纬度',
        // lnglat: 'center',
      });
      this.vLayers[this.keyIndxe].setOptions({
        mode: 'count',
        gradient: ['rgba(0, 80, 255,0)', 'rgba(0, 80, 255,0.2)', 'rgba(0, 80, 255,0.3)', 'rgba(0, 80, 255,0.4)', 'rgba(0, 80, 255,0.5)', 'rgba(0, 80, 255,0.6)', 'rgba(0, 80, 255,0.7)', 'rgba(0, 80, 255,0.8)', ],
      });
      this.vLayers[this.keyIndxe].render();
    },
    goBack() {
      console.log(this.vLayers[this.keyIndxe].goto)
      this.vLayers[this.keyIndxe].goto(-1)
      this.infoWins[this.keyIndxe].close()
    }
  },
  mounted() {
    this.initAmap();
  },
}

</script>
<style>
.container.amap-container {
  position: absolute !important;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
}

.button-group {
  position: absolute;
  bottom: 20px;
  right: 20px;
  font-size: 12px;
  padding: 10px;
}

.button-group .button {
  height: 28px;
  line-height: 28px;
  background-color: #0D9BF2;
  color: #FFF;
  border: 0;
  outline: none;
  padding-left: 5px;
  padding-right: 5px;
  border-radius: 3px;
  margin-bottom: 4px;
  cursor: pointer;
}

.button-group .inputtext {
  height: 26px;
  line-height: 26px;
  border: 1px;
  outline: none;
  padding-left: 5px;
  padding-right: 5px;
  border-radius: 3px;
  margin-bottom: 4px;
  cursor: pointer;
}


#tip {
  background-color: #fff;
  padding-left: 10px;
  padding-right: 10px;
  position: absolute;
  font-size: 12px;
  right: 10px;
  top: 20px;
  border-radius: 3px;
  border: 1px solid #ccc;
  line-height: 30px;
}

.amap-info-content {
  font-size: 12px;
}

#myPageTop {
  position: absolute;
  top: 5px;
  right: 10px;
  background: #fff none repeat scroll 0 0;
  border: 1px solid #ccc;
  margin: 10px auto;
  padding: 6px;
  font-family: "Microsoft Yahei", "微软雅黑", "Pinghei";
  font-size: 14px;
}

#myPageTop label {
  margin: 0 20px 0 0;
  color: #666666;
  font-weight: normal;
}

#myPageTop input {
  width: 170px;
}

#myPageTop .column2 {
  padding-left: 25px;
}

</style>
