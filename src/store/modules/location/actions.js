
import axios from 'axios'
import { API_LOCATION } from '@/config/configs'

export default {
  loadLocation (context) {
    axios.get(`${API_LOCATION}`)
      .then(response => context.commit('LOAD_LOCATION', response.data))
      .catch(error => console.log(error))
      .finally()
  }
}
