// import { numeral } from 'vue-numerals'

export default {
  worldNow: state => {
    const countries = state.items.data
    const total = { cases: 0, confirmed: 0, deaths: 0, recovered: 0 }
    countries.forEach(country => {
      total.cases += country.cases
      total.confirmed += country.confirmed
      total.deaths += country.deaths
      total.recovered += country.recovered
    })
    return total
  },

  HighestDeaths: state => {
    const countries = state.items.data
    let countryFewerDeaths = {}
    let deaths = null
    countries.forEach(country => {
      if (country.deaths > deaths) {
        countryFewerDeaths = country
        deaths = country.deaths
      }
    })
    return countryFewerDeaths
  },

  fewerDeaths: state => {
    const countries = state.items.data
    let countryFewerDeaths = {}
    let deaths = null
    let count = 0
    countries.forEach(country => {
      if (count === 0) {
        countryFewerDeaths = country
        deaths = country.deaths
      }
      if (country.deaths < deaths) {
        countryFewerDeaths = country
        deaths = country.deaths
      }
      count++
    })
    return countryFewerDeaths
  },

  chartData: state => {
    const countries = state.items.data
    const dataSets = []
    let cases = 0
    let confirmed = 0
    let recovered = 0
    let deaths = 0
    countries.forEach(country => {
      cases += country.cases
      confirmed += country.confirmed
      recovered += country.recovered
      deaths += country.deaths
    })
    dataSets.push(cases, confirmed, recovered, deaths)
    const chartdata = {
      labels: ['Cases', 'Confirmed', 'Recovered', 'Deaths'],
      datasets: [
        {
          label: 'World',
          data: dataSets,
          backgroundColor: [
            'rgba(255, 206, 86, 0.5)',
            'rgba(153, 102, 255, 0.5)',
            'rgba(75, 192, 192, 0.5)',
            'rgba(255, 99, 132, 0.5)'
          ],
          borderColor: [
            'rgba(255, 206, 86, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(255, 99, 132, 1)'
          ],
          borderWidth: 1
        }
      ]
    }
    return chartdata
  }
}
