<template>
  <v-card
    outlined
    tile
  >
    <v-sheet
      tile
      class="v-sheet--offset mx-auto"
      elevation="0"
      max-width="calc(100% - 32px)"
    >
      <v-sparkline
        gradient-direction="right"
        :gradient="['#f72047', '#ffd200', '#1feaea']"
        auto-draw
        :labels="labels"
        :value="value"
        color="black"
        line-width="3"
        padding="16"
        label-size="11"
      >
        <template v-slot:label="item">
            {{ item.value }}
        </template>
      </v-sparkline>
    </v-sheet>

    <v-card-text>
      <v-icon
        left
        color="gray"
        size="20"
      >
        mdi-earth
      </v-icon>
      <span class="caption grey--text font-weight-light">World Graphic Covid19</span>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  data () {
    return {
      labels: [
        'Cases',
        'Confirmed',
        'Recovered',
        'Deaths'
      ],
      value: [],
      total: {
        cases: 0,
        confirmed: 0,
        deaths: 0,
        recovered: 0
      }
    }
  },
  mounted () {
    this.loadCountries()
    this.getTotal()
    this.getValues()
  },
  computed: {
    countries () {
      return this.$store.state.countries.items.data
    }
  },
  methods: {
    loadCountries () {
      this.$store.dispatch('loadCoutries')
    },
    getValues () {
      this.value.push(this.total.cases)
      this.value.push(this.total.confirmed)
      this.value.push(this.total.recovered)
      this.value.push(this.total.deaths)
    },
    getTotal () {
      const countries = this.$store.state.countries.items.data
      countries.forEach(country => {
        this.total.cases += country.cases
        this.total.confirmed += country.confirmed
        this.total.deaths += country.deaths
        this.total.recovered += country.recovered
      })
    }
  }
}
</script>
