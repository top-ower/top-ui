import Vue from 'vue'
import App from './App.vue'

import TopUI from './index.js'
Vue.use(TopUI)

new Vue({
  el: '#app',
  render: h => h(App)
})
