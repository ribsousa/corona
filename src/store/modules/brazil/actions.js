
import axios from 'axios'
import { API_URL } from '@/config/configs'

const RESOURCE = 'brazil/uf/'

export default {

  getCountry (context, country) {
    return new Promise((resolve, reject) => {
      axios.get(`${API_URL}${country}`)
        .then(response => resolve(response.data))
        .catch(error => reject(error))
        .finally()
    })
  },

  loadState (context, uf) {
    return new Promise((resolve, reject) => {
      axios.get(`${API_URL}${RESOURCE}${uf}`)
        .then(response => resolve(response.data))
        .catch(error => reject(error))
        .finally()
    })
  },

  loadStates (context) {
    axios.get(`${API_URL}`)
      .then(response => {
        context.commit('LOAD_STATES', response.data)
      })
      .catch(error => console.log(error))
  }
}
