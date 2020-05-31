<template>
  <v-card
    class="mx-auto"
    outlined
    tile
    flat
  >
    <v-toolbar flat color="white">
      <v-autocomplete
          :loading="loading"
          :items="countries"
          id="country"
          color="indigo lighten-1"
          item-text="country"
          label="Change country"
          v-model="selectedCountry"
          append-icon="mdi-search"
          @change="getCountry()"
          return-object
          class="mt-8"
          solo
      >
        <template v-slot:selection="{ attrs, item, select, selected }">
            <v-chip
            v-bind="attrs"
            :input-value="selected"
            close
            @click="select"
            @click:close="resetCountry()"
            >
            <v-avatar left>
                <v-img :src="`${baseUrl}${flagsPath}/countries/${getCode(item.country)}.png`"></v-img>
            </v-avatar>
            <strong>{{ item.country == 'US' ? 'United States' : item.country }}</strong>&nbsp;
            </v-chip>
        </template>
        <template v-slot:item="data">
            <v-list-item-avatar>
            <v-avatar size="24">
                <v-img :src="`${baseUrl}${flagsPath}/countries/${getCode(data.item.country)}.png`"></v-img>
            </v-avatar>
            </v-list-item-avatar>
            <v-list-item-content>
                <v-list-item-title v-html="data.item.country"></v-list-item-title>
            </v-list-item-content>
        </template>
      </v-autocomplete>
    </v-toolbar>
    <v-list-item three-line v-if="selectedCountry.country">
      <v-list-item-content>
          <div class="overline mb-4">{{country.country}}</div>
          <v-divider/>
          <v-list-item-subtitle>
              <v-icon left color="orange">mdi-virus-outline</v-icon>
              <span>Confirmed: </span>
              <span class="caption font-weight-bold">
                  {{country.confirmed | numeralFormat(country.confirmed >= 1000 ? 'O.O a' : null)}}
              </span>
          </v-list-item-subtitle>
          <v-divider/>
          <v-list-item-subtitle>
              <v-icon left color="green">mdi-heart-pulse</v-icon>
              <span>Recovered: </span>
              <span class="caption font-weight-bold">
                  {{country.recovered | numeralFormat(country.recovered >= 1000 ? 'O.O a' : null)}}
              </span>
          </v-list-item-subtitle>
          <v-divider/>
          <v-list-item-subtitle>
              <v-icon left color="red">mdi-heart-off</v-icon>
              <span>Deaths: </span>
              <span class="caption font-weight-bold">
                  {{country.deaths | numeralFormat(country.deaths >= 1000 ? 'O.O a' : null)}}
              </span>
          </v-list-item-subtitle>
          <v-divider/>
          <v-list-item-subtitle>
              <v-icon left color="purple">mdi-skull-crossbones</v-icon>
              <span>Lethality: </span>
                <span class="caption font-weight-bold">
                  {{percentage(country.deaths, country.confirmed) | numeralFormat('0.00%')}}
                </span>
          </v-list-item-subtitle>
          <v-divider/>
      </v-list-item-content>
      <v-list-item-avatar
          tile
          size="auto"
      >
        <v-img
            :src="`${baseUrl}${flagsPath}countries/${getCode(country.country)}.png`"
            width="40"
        >
        </v-img>
      </v-list-item-avatar>
      </v-list-item>
      <v-card-actions>
        <v-btn
        icon
        :loading="loading"
        color="green acent-2"
        @click="updateCountry(selectedCountry.country)"
      >
        <v-icon>mdi-update</v-icon>
        </v-btn>
        <span class="overline">Updated {{ country.updated_at | moment("from", "now") }}</span>
    </v-card-actions>
  </v-card>
</template>

<script>
import { FLAGS_PATH, API_LOCATION } from '@/config/configs'
import isoCodes from '../../config/isoCodes.json'
import axios from 'axios'

export default {
  data: () => ({
    flagsPath: FLAGS_PATH,
    baseUrl: process.env.BASE_URL,
    apiLocation: API_LOCATION,
    loading: false,
    country: {},
    location: {},
    selectedCountry: {}
  }),

  created () {
    this.loadCountries()
    this.loadLocation()
  },

  computed: {
    states () {
      return this.$store.state.brazil.items.data
    },

    countries () {
      return this.$store.state.countries.items.data
    },

    worldNow () {
      return this.$store.getters.worldNow
    }
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

    getCountry () {
      this.loading = true
      this.country = this.selectedCountry
      this.loading = false
    },

    updateCountry (name = null) {
      const country = name ? name.toLowerCase() : 'brazil'
      this.refreshing = true
      this.$store.dispatch('getCountry', country)
        .then((response) => {
          this.loading = false
          this.country = response.data
          this.selectedCountry = response.data
        })
        .catch(error => console.log(error))
        .finally(() => { this.refreshing = false })
    },

    getCode (country) {
      const countryName = country != null ? country : this.country.country
      const codes = JSON.parse(JSON.stringify(isoCodes))
      const result = codes.filter(code => code.name === countryName)
      return result[0].iso_code
    },

    getCountryByCode (code) {
      const codes = JSON.parse(JSON.stringify(isoCodes))
      const result = codes.filter(iso => iso.iso_code === code)
      return result[0].name
    },

    loadLocation () {
      this.getLocalStorage()
      this.getLocation()
      const country = this.getCountryByCode(this.location.country)
      this.updateCountry(country)
      this.getCountry()
    },

    getLocation () {
      if (!this.location) {
        axios.get(`${API_LOCATION}`)
          .then(response => {
            this.location = response.data
            this.addLocalStorage()
          })
          .catch(error => console.log(error))
          .finally()
      }
    },

    getLocalStorage () {
      const location = JSON.parse(localStorage.getItem('location'))
      this.location = location
    },

    addLocalStorage () {
      if (this.location) {
        const location = JSON.stringify(this.location)
        localStorage.setItem('location', location)
      }
    },

    resetCountry () {
      this.loadLocation()
    },

    percentage: (percentage, valor) => (percentage / (valor * 100)) * 100
  }
}
</script>
