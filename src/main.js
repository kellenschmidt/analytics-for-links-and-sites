import '@babel/polyfill'
import Vue from 'vue'
import './plugins/vuetify'
import './plugins/google-maps'
import './plugins/fontawesome'
import './plugins/moment'
import './plugins/echarts'
import router from './plugins/router'
import App from './App.vue'
import { createProvider } from './plugins/vue-apollo'

Vue.config.productionTip = false

new Vue({
  router,
  provide: createProvider().provide(),
  render: h => h(App)
}).$mount('#app')
