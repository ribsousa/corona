<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="4" lg="4">
        <StatesCompare
         :stateSeleted="search"
         @compareChange="compareChange"
        >
        </StatesCompare>
        <BrazilChartComponent/>
      </v-col>
      <v-col cols="12" md="8" lg="8">
        <BrazilComponent
          :removeState="removeState"
          @stateChange="stateChange"
        >
        </BrazilComponent>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// @ is an alias to /src
import BrazilComponent from '@/components/brazil/BrazilComponent.vue'
import StatesCompare from '@/components/reports/brazil/StatesCompare'
import BrazilChartComponent from '@/components/reports/brazil/BrazilChartComponent'

export default {
  name: 'Brazil',
  data () {
    return {
      search: null,
      removeState: null
    }
  },

  methods: {
    stateChange (stateChange) {
      this.search = stateChange
    },

    compareChange (compareChange) {
      this.removeState = compareChange
    }
  },

  components: {
    StatesCompare,
    BrazilComponent,
    BrazilChartComponent
  }
}
</script>
