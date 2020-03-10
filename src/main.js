import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import 'common/styles/index.scss'
import FastClick from 'fastclick'
import VueLazyload from 'vue-lazyload'

FastClick.attach(document.body)
Vue.use(VueLazyload, {
  loading: require('common/image/default.png')
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
