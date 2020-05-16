import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import en from 'vuetify/es5/locale/en'
import pt from 'vuetify/es5/locale/pt'

Vue.use(Vuetify)

// Your own translation file
// import sv from './i18n/vuetify/sv'

export default new Vuetify({
  lang: {
    locales: { en, pt },
    current: 'en'
  }
})
