import Vue from 'vue'
import App from './App.vue'
// import './registerServiceWorker' "@vue/cli-plugin-pwa": "^4.1.0",
import router from './router'
import store from './store'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
