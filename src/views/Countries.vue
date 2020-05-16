<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="4" lg="4">
        <CountriesCompare
         :countrySeleted="search"
         @compareChange="compareChange"
        >
        </CountriesCompare>
        <HighestDeathsComponent/>
        <DeathsChartComponent/>
      </v-col>
      <v-col cols="12" md="8" lg="8">
        <CountriesComponent
         :removeCountry="removeCountry"
         @countryChange="countryChange"
        >
        </CountriesComponent>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// @ is an alias to /src
import CountriesComponent from '@/components/countries/CountriesComponent.vue'
import HighestDeathsComponent from '@/components/countries/HighestDeathsComponent'
import DeathsChartComponent from '@/components/reports/DeathsChartComponent'
import CountriesCompare from '@/components/reports/countries/CountriesCompare'

export default {
  name: 'Home',
  data () {
    return {
      search: null,
      removeCountry: null
    }
  },

  methods: {
    countryChange (countryChange) {
      this.search = countryChange
    },

    compareChange (compareChange) {
      this.removeCountry = compareChange
    }
  },

  components: {
    CountriesComponent,
    HighestDeathsComponent,
    DeathsChartComponent,
    CountriesCompare
  }
}
</script>
