import Vue from 'vue'
import Vuex from 'vuex'

import brazil from './modules/brazil/brazil'
import countries from './modules/countries/countries'
import location from './modules/location/location'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    brazil,
    countries,
    location
  }
})
