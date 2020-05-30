<template>
  <v-card
    tile
    outlined
  >
    <v-card-title class="overline">
      <v-icon left color="warning">mdi-select-compare</v-icon>
      select to compare
    </v-card-title>
    <v-card-text>
      <v-autocomplete
        ref='selectCountry'
        chips
        solo
        multiple
        clearable
        return-object
        hide-selected
        :items="countries"
        :loading="loading"
        id="country1"
        color="orange"
        item-text="country"
        label="Countries"
        v-model="SelectedCountries"
        append-icon="mdi-plus-circle-multiple-outline"
        clear-icon="mdi-close-circle-multiple-outline"
        @change="loadCountry()"
        @click:clear="clearCountries()"
        @click:close="loadCountry()"
      >
        <template v-slot:selection="{ attrs, item, select, selected }">
          <v-chip
            v-bind="attrs"
            :input-value="selected"
            close
            @click="select"
            @click:close="remove(item)"
          >
            <v-avatar left>
              <v-img :src="`${baseUrl}${flagsPath}/countries/${getIsoCode(item.country)}.png`"></v-img>
            </v-avatar>
            <strong>{{ getIsoCode(item.country) }}</strong>&nbsp;
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
      <CompareShartComponent
        v-if="country.length"
        :country="country"
      >
      </CompareShartComponent>
    </v-card-text>
  </v-card>
</template>

<script>
import { FLAGS_PATH } from '@/config/configs'
import isoCodes from '../../../config/isoCodes.json'
import CompareShartComponent from './CompareShartComponent'

export default {
  data: () => ({
    flagsPath: FLAGS_PATH,
    baseUrl: process.env.BASE_URL,
    SelectedCountries: [],
    loading: false,
    country: []
  }),

  props: {
    countrySeleted: {
      type: Object,
      default: null
    }
  },

  watch: {
    countrySeleted (value) {
      this.country = []
      this.SelectedCountries = value.country ? [value] : []
      if (value.country) {
        this.loadCountry()
      } else {
        this.addCountryLocalStorage()
      }
    }
  },

  computed: {
    computedDateFormatted () {
      return this.formatDate(this.date)
    },

    countries () {
      return this.$store.state.countries.items.data
    }
  },

  mounted () {
    this.loadCountryLocalStorage()
  },

  methods: {
    loadCountry () {
      this.country = []
      if (this.SelectedCountries.length) {
        this.loading = true
        this.SelectedCountries.forEach(country => this.country.push(country))
        this.loading = false
        this.addCountryLocalStorage()
      } else {
        this.country = []
      }
    },

    remove (item) {
      this.SelectedCountries = this.SelectedCountries.filter(country => country.country !== item.country)
      this.$refs.selectCountry.blur()
      this.loadCountry()
      this.addCountryLocalStorage()
      this.compareChange([item])
    },

    addCountryLocalStorage () {
      if (this.SelectedCountries) {
        const countries = JSON.stringify(this.SelectedCountries)
        localStorage.setItem('SelectedCountries', countries)
      }
    },

    loadCountryLocalStorage () {
      const countries = JSON.parse(localStorage.getItem('SelectedCountries'))
      if (countries && countries.length) {
        this.SelectedCountries = countries
        this.loadCountry()
      }
    },

    clearCountries () {
      this.compareChange(this.country)
      this.country = []
    },

    compareChange (country) {
      this.$emit('compareChange', country)
    },

    getIsoCode (country) {
      const codes = JSON.parse(JSON.stringify(isoCodes))
      const result = codes.filter(code => code.name === country)
      return result[0].iso_code
    }
  },

  components: {
    CompareShartComponent
  }
}
</script>

<style lang="sass" scoped>
</style>
