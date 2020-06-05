import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import CountryFlag from 'vue-country-flag'
import VueNumerals from 'vue-numerals'
import Snotify, { SnotifyPosition } from 'vue-snotify'
import VuePwaInstallPlugin from 'vue-pwa-install'

import 'vue-snotify/styles/dark.css'

Vue.config.productionTip = false
Vue.use(VuePwaInstallPlugin)

Vue.use(Snotify, {
  toast: {
    showProgressBar: true,
    position: SnotifyPosition.centerBottom
  }
})

Vue.use(VueNumerals, {
  locale: 'pt-br'
})

Vue.use(require('vue-moment'))
Vue.component('country-flag', CountryFlag)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')

store.dispatch('loadCoutries')
