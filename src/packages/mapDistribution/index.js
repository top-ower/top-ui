/*
 * @Author: david.deng 
 * @Email: dengfd88@163.com 
 * @Date: 2019-03-19 15:49:13 
 * @Last Modified by:   david.deng 
 * @Last Modified time: 2019-03-21 15:49:13 
 * @Description: File desctiption 
 */
 
import MapDistribution from './map-distribution';

MapDistribution.install = function(Vue) {
  Vue.component(MapDistribution.name, MapDistribution);
};

export default MapDistribution;