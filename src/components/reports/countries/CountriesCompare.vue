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
            small
            @click="select"
            @click:close="remove(item)"
          >
            <strong>{{ item.country }}</strong>&nbsp;
          </v-chip>
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
import CompareShartComponent from './CompareShartComponent'

export default {
  data: () => ({
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
    }
  },

  components: {
    CompareShartComponent
  }
}
</script>

<style lang="sass" scoped>
</style>
