import Vue from 'vue'
import App from './App.vue'
import router from './router'
import '@/config/bugsnag'
import 'normalize.css'
import '@/assets/styles/fonts.scss'
import '@/assets/styles/common.scss'
import i18n from '@/i18n'

Vue.config.productionTip = false

new Vue({
  router,
  i18n,
  render: h => h(App)
}).$mount('#app')
