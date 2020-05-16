
import axios from 'axios'
import { API_URL } from '@/config/configs'

const RESOURCE = 'countries'

export default {

  loadCountry (context, country) {
    return new Promise((resolve, reject) => {
      axios.get(`${API_URL}${country}`)
        .then(response => resolve(response.data))
        .catch(error => reject(error))
        .finally()
    })
  },

  loadCoutries (context) {
    axios.get(`${API_URL}${RESOURCE}`)
      .then(response => {
        context.commit('LOAD_COUNTRIES', response.data)
      })
      .catch(error => console.log(error))
  }
}
