<template>
  <div>
    <v-skeleton-loader
      :loading="loading"
      :transition="transition"
      type="table"
      class="ma-auto"
    >
      <v-card outlined tile class="pl-2 pr-2">
          <v-card-title class="overline">
            <v-icon left>mdi-earth</v-icon> World Coutries
          </v-card-title>
          <v-data-table
            :headers="headers"
            :items="countries"
            :search="search"
            item-key="country"
            :loading="loading"
            @click:row="handleClick"
            single-select
          >
            <template v-slot:top>
              <v-toolbar flat color="white">
                <v-toolbar-title>
                  <v-tooltip bottom color="green lighten-1">
                    <template v-slot:activator="{ on }">
                      <v-btn
                        icon
                        color="green lighten-1"
                        :loading="loading"
                        @click="updateCountries()"
                        v-on="on"
                      >
                        <v-icon>mdi-refresh</v-icon>
                      </v-btn>
                    </template>
                    <span>Refresh</span>
                  </v-tooltip>
                </v-toolbar-title>
                <v-divider
                  class="mx-2"
                  inset
                  vertical
                ></v-divider>
                <v-spacer></v-spacer>
                <v-autocomplete
                  :items="countries"
                  id="country"
                  color="indigo lighten-1"
                  item-text="country"
                  label="Filter"
                  v-model="search"
                  append-icon="mdi-filter"
                  @change="countryChange()"
                  return-object
                >
                <template v-slot:selection="{ attrs, item, select, selected }">
                    <v-chip
                      v-bind="attrs"
                      :input-value="selected"
                      close
                      small
                      @click="select"
                      @click:close="search = '', countryChange()"
                    >
                      <v-avatar left>
                        <v-img :src="`${baseUrl}${flagsPath}/countries/${getIsoCode(item.country)}.png`"></v-img>
                      </v-avatar>
                      <strong>{{ item.country }}</strong>&nbsp;
                    </v-chip>
                  </template>
                  <template v-slot:item="data">
                    <v-list-item-avatar>
                      <v-avatar size="24">
                        <v-img :src="`${baseUrl}${flagsPath}/countries/${getIsoCode(data.item.country)}.png`"></v-img>
                      </v-avatar>
                    </v-list-item-avatar>
                    <v-list-item-content>
                        <v-list-item-title v-html="data.item.country"></v-list-item-title>
                    </v-list-item-content>
                  </template>
                </v-autocomplete>
              </v-toolbar>
            </template>
            <template v-slot:item.flag="{ item }">
              <v-avatar class="state-flag" tile color="grey lighten-2" width="28" min-width="20" height="20">
                <v-img
                  :src="`${baseUrl}${flagsPath}/countries/${getIsoCode(item.country)}.png`"
                  lazy-src=""
                  >
                    <template v-slot:placeholder>
                      <v-row
                        class="fill-height ma-0"
                        align="center"
                        justify="center"
                      >
                        <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                      </v-row>
                    </template>
                </v-img>
              </v-avatar>
            </template>
            <template v-slot:item.cases="{ item }">
              {{ item.cases | numeralFormat() }}
            </template>
            <template v-slot:item.confirmed="{ item }">
              {{ item.confirmed | numeralFormat() }}
            </template>
            <template v-slot:item.deaths="{ item }">
              {{ item.deaths | numeralFormat() }}
            </template>
            <template v-slot:item.recovered="{ item }">
              {{ item.recovered | numeralFormat() }}
            </template>
            <template v-slot:item.updated_at="{ item }">
              {{ item.updated_at | moment("from", "now") }}
            </template>
          </v-data-table>
      </v-card>
    </v-skeleton-loader>

    <BottomCountryComponent :sheetShow="sheet" :countrySelected="countrySelected"/>
  </div>
</template>

<script>
import { FLAGS_PATH } from '@/config/configs'
import isoCodes from '../../config/isoCodes.json'
import BottomCountryComponent from './BottomCountryComponent'

export default {
  data () {
    return {
      flagsPath: FLAGS_PATH,
      baseUrl: process.env.BASE_URL,
      loading: true,
      transition: 'scroll-y-transition',
      search: null,
      headers: [
        { text: '', align: 'start', value: 'flag' },
        { text: 'Country', value: 'country' },
        { text: 'Cases', value: 'cases', filterable: false },
        { text: 'Confirmed', value: 'confirmed', filterable: false },
        { text: 'Deaths', value: 'deaths', filterable: false },
        { text: 'Recovered', value: 'recovered', filterable: false },
        { text: 'Last update', value: 'updated_at', filterable: false }
      ],
      countrySelected: {},
      sheet: false
    }
  },

  props: {
    removeCountry: {
      type: Array,
      default: null
    }
  },

  watch: {
    removeCountry (value) {
      if (this.search) {
        const country = value.filter(item => item.country === this.search)
        if (country.length) {
          this.search = ''
          this.countryChange()
        }
      }
    }
  },

  created () {
    this.loadCountries()
    this.getIsoCode('Diamond Princess')
  },

  computed: {
    countries () {
      return this.$store.state.countries.items.data
    },
    HighestDeaths () {
      return this.$store.getters.HighestDeaths
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

    updateCountries () {
      this.loading = true
      this.$store.dispatch('loadCoutries')
        .then(() => {
          this.loading = false
          this.$snotify.success('Countries updated', 'Success!')
        })
        .catch(error => console.log(error))
        .finally(() => {
          this.loading = false
        })
    },

    countryChange () {
      const country = this.search ? this.search : {}
      this.search = this.search.country
      this.$emit('countryChange', country)
    },

    getIsoCode (country) {
      const codes = JSON.parse(JSON.stringify(isoCodes))
      const result = codes.filter(code => code.name === country)
      return result[0].iso_code
    },

    handleClick (value, row) {
      row.select()
      this.countrySelected = value
      this.sheet = !this.sheet
    },

    percentage: (percentage, valor) => (percentage / (valor * 100)) * 100
  },

  components: {
    BottomCountryComponent
  }
}
</script>

<style lang="sass" scoped>
</style>
