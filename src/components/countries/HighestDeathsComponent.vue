<template>
  <v-skeleton-loader
    :loading="loading"
    :transition="transition"
    height="auto"
    type="list-item-avatar"
    class="mt-5"
  >
    <v-card
      class="mt-5"
      outlined
      tile
    >
      <v-list-item four-line>
        <v-list-item-content>
          <div class="overline mb-4">
              <span class="red--text" v-if="HighestDeaths.country == 'US'">Highest number of deaths</span>
              <span v-else>{{ HighestDeaths.country}}</span>
          </div>
          <v-list-item-title class="headline overline mb-1">United States</v-list-item-title>
        </v-list-item-content>

        <v-list-item-avatar
          tile
          size="auto"
        >
          <country-flag v-if="HighestDeaths.country == 'US'" country='us' size='big'/>
        </v-list-item-avatar>
      </v-list-item>
      <v-list-item>
        <v-list-item-content>
            <v-divider></v-divider>
            <div class="caption">
                <v-icon left>mdi-virus-outline</v-icon>
                Cases: <strong>{{ HighestDeaths.cases | numeralFormat('0.00 a') }}</strong>
            </div>
            <v-divider></v-divider>
            <div class="caption mt-1">
                <v-icon left>mdi-account-multiple-check-outline</v-icon>
                Confirmed: <strong>{{ HighestDeaths.confirmed | numeralFormat('O.O a') }}</strong>
            </div>
            <v-divider></v-divider>
            <div class="caption mt-1">
                <v-icon left>mdi-heart-pulse</v-icon>
                Recovered: <strong>{{ HighestDeaths.recovered | numeralFormat('O.O a') }}</strong>
                </div>
            <v-divider></v-divider>
            <div class="caption mt-1">
                <v-icon left>mdi-heart-off</v-icon>
                Deaths: <strong>{{ HighestDeaths.deaths | numeralFormat('O.O a') }}</strong>
            </div>
            <v-divider></v-divider>
        </v-list-item-content>
      </v-list-item>
      <v-card-actions>
        <v-btn
          icon
          :loading="loading"
          color="green acent-2"
          @click="loadCountries()"
        >
          <v-icon>mdi-update</v-icon>
        </v-btn>
        <span class="overline">Updated {{ HighestDeaths.updated_at | moment("from", "now") }}</span>
      </v-card-actions>
    </v-card>
  </v-skeleton-loader>
</template>
<script>
export default {
  data () {
    return {
      loading: true,
      transition: 'scale-transition'
    }
  },
  created () {
    this.loadCountries()
  },
  computed: {
    countries () {
      return this.$store.state.countries.items.data
    },
    HighestDeaths () {
      return this.$store.getters.HighestDeaths
    }
  },
  methods: {
    loadCountries () {
      this.$store.dispatch('loadCoutries')
        .then(() => { this.loading = false })
        .catch(error => console.log(error))
    }
  }
}
</script>

<style lang="sass" scoped>
</style>
