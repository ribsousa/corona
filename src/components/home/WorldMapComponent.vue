<template>
  <v-expand-x-transition>
    <v-card class="mx-auto mt-5" flat tile outlined>
      <v-toolbar
        dense
        floating
        flat
        tile
      >
        <v-select
          v-model="select"
          :items="items"
          item-text="option"
          item-value="ption"
          append-icon="mdi-filter-variant"
          return-object
          solo
          class="mt-12"
          @change="fillData()"
        >
          <template v-slot:selection="{ attrs, item, select, selected }">
              <v-chip
              v-bind="attrs"
              :input-value="selected"
              close
              close-icon="mdi-checkbox-marked-circle-outline"
              @click="select"
              @click:close="resetCountry()"
              >
              <v-avatar left>
                <v-icon :color="item.color">mdi-{{item.icon}}</v-icon>
              </v-avatar>
              <strong>{{item.option}}</strong>&nbsp;
              </v-chip>
          </template>
          <template v-slot:item="data">
              <v-list-item-avatar>
                <v-avatar left>
                  <v-icon :color="data.item.color">mdi-{{data.item.icon}}</v-icon>
                </v-avatar>
              </v-list-item-avatar>
              <v-list-item-content>
                  <v-list-item-title v-html="data.item.option"></v-list-item-title>
              </v-list-item-content>
          </template>
        </v-select>
      </v-toolbar>
      <v-card-text>
        <v-sheet elevation="2" :color="select.color">
        <MapChart
          :countryData="fillData()"
          highColor="#F44336"
          lowColor="#aaaaaa"
          countryStrokeColor="#909090"
          defaultCountryFillColor="#dadada"
        />
        </v-sheet>
      </v-card-text>
      <v-card-actions>
        <v-btn
        icon
        :color="select.color"
        :to="{name: 'world'}"
      >
        <v-icon>mdi-earth</v-icon>
        </v-btn>
        <span class="overline">{{ select.option }} in the World</span>
    </v-card-actions>
    </v-card>
  </v-expand-x-transition>
</template>

<script>
import MapChart from 'vue-map-chart'
import isoCodes from '../../config/isoCodes.json'

export default {
  data: () => ({
    countriesData: {},
    select: { option: 'Lethality', icon: 'skull-crossbones', color: '#9C27B0' },
    items: [
      { option: 'Confirmed', icon: 'virus-outline', color: '#FF9800' },
      { option: 'Recovered', icon: 'heart-pulse', color: '#4CAF50' },
      { option: 'Deaths', icon: 'heart-off', color: '#F44336' },
      { option: 'Lethality', icon: 'skull-crossbones', color: '#9C27B0' }
    ]
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
      const option = this.select.option.toLowerCase()
      this.countries.forEach(country => {
        if (option === 'lethality') {
          Object.defineProperty(this.countriesData, this.getIsoCode(country.country), {
            value: this.$options.filters.numeralFormat(this.percentage(country.deaths, country.confirmed), '0.00%'),
            writable: true
          })
        } else {
          Object.defineProperty(this.countriesData, this.getIsoCode(country.country), {
            value: this.$options.filters.numeralFormat(country[option]),
            writable: true
          })
        }
      })
      return this.countriesData
    },

    getIsoCode (country) {
      const codes = JSON.parse(JSON.stringify(isoCodes))
      const result = codes.filter(code => code.name === country)
      return result[0].iso_code
    },

    percentage: (percentage, valor) => (percentage / (valor * 100)) * 100
  },

  components: {
    MapChart
  }
}
</script>
