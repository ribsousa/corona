<template>
    <v-sheet>
        <v-card
            flat
            tile
            outlined
            class="mx-auto"
        >
        <v-carousel
                vertical
                hide-delimiters
                hide-delimiter-background
                height="225"
                light
                cycle
            >
        <v-carousel-item v-for="state in states" :key="state.uid">
            <v-toolbar tile flat>
            <v-spacer></v-spacer>
            <v-btn tile text class="ml-3">
                <v-avatar tile left width="28" min-width="20" height="20">
                <v-img
                    :src="`${baseUrl}${flagsPath}${state.uf}.png`"
                >
                </v-img>
                </v-avatar>
                <span class="ml-3">{{state.state}}</span>
            </v-btn>
            <v-spacer></v-spacer>
            </v-toolbar>
                <v-sheet
                    color=""
                    height="100%"
                    tile
                    >
                    <v-row
                        class="fill-height"
                        align="center"
                        justify="center"
                    >
                        <div class="text-center">
                        <v-btn text small tile class="mb-1">
                            <v-icon left color="purple">mdi-virus</v-icon>
                            Confirmed Cases
                        </v-btn>
                        <v-divider/>
                        <v-toolbar dense tile flat>
                            <span class="subtitle-2">
                            {{ country.confirmed | numeralFormat() }}
                            </span>
                            <v-divider vertical class="mx-5"/>
                            <span class="subtitle-2">
                            {{ state.cases | numeralFormat() }}
                            ({{ percentage(state.cases, country.confirmed) | numeralFormat('0.00%') }})
                            </span>
                        </v-toolbar>
                        </div>
                    </v-row>
                </v-sheet>
                </v-carousel-item>
            </v-carousel>
        </v-card>
    </v-sheet>
</template>

<script>
import { FLAGS_PATH } from '@/config/configs'

export default {
  data: () => ({
    flagsPath: FLAGS_PATH,
    baseUrl: process.env.BASE_URL,
    loading: false
  }),

  created () {
    this.loadStates()
  },

  computed: {
    states () {
      return this.$store.state.brazil.items.data
    }
  },

  methods: {
    loadStates () {
    this.loading = true
    this.$store.dispatch('loadStates')
      .then(() => {
        this.loading = false
      })
      .catch(error => console.log(error))
      .finally(() => { this.loading = false })
    },

    percentage: (percentage, valor) => (percentage / (valor * 100)) * 100
  }
}
</script>