<template>
  <v-expand-x-transition>
    <v-card class="mx-auto pa-2 mt-5" flat tile outlined>
      <v-sheet color="transparent" class="mx-auto">
        <MapChart
          :countryData="fillData()"
          highColor="#F44336"
          lowColor="#aaaaaa"
          countryStrokeColor="#909090"
          defaultCountryFillColor="#dadada"
        />
      </v-sheet>
    </v-card>
  </v-expand-x-transition>
</template>

<script>
import MapChart from 'vue-map-chart'
import isoCodes from '../../config/isoCodes.json'

export default {
  data: () => ({
    countriesData: {}
  }),

  computed: {
    countries () {
      return this.$store.state.countries.items.data
    }
  },

  created () {
    this.loadCountries()
  },

  methods: {
    loadCountries () {
      this.loading = true
      this.$store.dispatch('loadCoutries')
        .then(() => {
          this.loading = false
        })
        .catch(error => console.log(error))
        .finally(() => { this.loading = false })
    },

    fillData () {
      this.countries.forEach(country => {
        Object.defineProperty(this.countriesData, this.getIsoCode(country.country), {
          value: this.$options.filters.numeralFormat(country.confirmed),
          writable: true
        })
      })
      return this.countriesData
    },

    getIsoCode (country) {
      const codes = JSON.parse(JSON.stringify(isoCodes))
      const result = codes.filter(code => code.name === country)
      return result[0].iso_code
    }
  },

  components: {
    MapChart
  }
}
</script>
