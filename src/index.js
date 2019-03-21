import BarChart from './packages/barChart/index.js';
import GaugeChart from './packages/gaugeChart/index.js';
import LineBarChart from './packages/lineBarChart/index.js';
import LineChart from './packages/lineChart/index.js';
import PieChart from './packages/pieChart/index.js';
import SvgIcon from './packages/svgIcon/index.js';
import MapDistribution from './packages/mapDistribution/index.js';

const components = [
  BarChart,
  GaugeChart,
  LineBarChart,
  LineChart,
  PieChart,
  SvgIcon,
  MapDistribution,
]

const install = function(Vue, opts = {}) {
  components.map(component => {
    Vue.component(component.name, component);
  })
}

/* 支持使用标签的方式引入 */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default {
  install,
  BarChart,
  GaugeChart,
  LineBarChart,
  LineChart,
  PieChart,
  SvgIcon,
  MapDistribution,
}