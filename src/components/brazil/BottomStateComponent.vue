<template>
  <v-bottom-sheet
    v-model="sheet"
    hide-overlay
    inset
  >
    <v-sheet height="233" class="pa-5">
      <v-card
        flat
        tile
        outlined
        class="mx-auto"
      >
        <v-toolbar tile flat>
          <v-spacer></v-spacer>
          <v-btn text tile>
            {{country.country}}
            <country-flag country='br'/>
          </v-btn>

          <v-tooltip bottom color="orange lighten-1">
            <template v-slot:activator="{ on }">
              <v-btn
                icon
                outlined
                color="orange"
                :loading="loading"
                @click="sheet = !sheet"
                v-on="on"
              >
              <v-icon>mdi-window-close</v-icon>
              </v-btn>
            </template>
            <span>Close</span>
          </v-tooltip>

          <v-btn tile text class="ml-3">
            <v-avatar tile left width="28" min-width="20" height="20">
              <v-img
                :src="`${baseUrl}${flagsPath}${stateSelected.uf}.png`"
              >
              </v-img>
            </v-avatar>
            <span class="ml-3">{{stateSelected.state}}</span>
          </v-btn>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-carousel
          vertical
          vertical-delimiters
          hide-delimiter-background
          height="130"
          light
          cycle
        >
          <v-carousel-item>
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
                    <v-icon left color="purple">mdi-virus-outline</v-icon>
                    Confirmed Cases
                  </v-btn>
                  <v-divider/>
                  <v-toolbar dense tile flat>
                    <span class="subtitle-2">
                      {{ country.confirmed | numeralFormat() }}
                    </span>
                    <v-divider vertical class="mx-5"/>
                    <span class="subtitle-2">
                      {{ stateSelected.cases | numeralFormat() }}
                      ({{ percentage(stateSelected.cases, country.confirmed) | numeralFormat('0.00%') }})
                    </span>
                  </v-toolbar>
                </div>
              </v-row>
            </v-sheet>
          </v-carousel-item>
          <v-carousel-item>
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
                    <v-icon left color="red">mdi-heart-off</v-icon>
                    Confirmed Deaths
                  </v-btn>
                  <v-divider/>
                  <v-toolbar dense tile flat>
                    <span class="subtitle-2">
                      {{ country.deaths | numeralFormat() }}
                    </span>
                    <v-divider vertical class="mx-5"/>
                    <span class="subtitle-2">
                      {{ stateSelected.deaths | numeralFormat() }}
                      ({{ percentage(stateSelected.deaths, country.confirmed) | numeralFormat('0.00%') }})
                    </span>
                  </v-toolbar>
                </div>
              </v-row>
            </v-sheet>
          </v-carousel-item>
          <v-carousel-item>
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
                     <v-icon left color="black">mdi-skull-crossbones</v-icon>
                    Lethality Rate
                  </v-btn>
                  <v-divider/>
                  <v-toolbar dense tile flat>
                    <span class="subtitle-2">
                      {{ percentage(country.deaths, country.confirmed)  | numeralFormat('0.00%') }}
                    </span>
                    <v-divider vertical class="mx-5"/>
                    <span class="subtitle-2">
                      {{ percentage(stateSelected.deaths, stateSelected.cases) | numeralFormat('0.00%') }}
                      ({{ percentage(stateSelected.deaths, country.confirmed) | numeralFormat('0.00%') }})
                    </span>
                  </v-toolbar>
                </div>
              </v-row>
            </v-sheet>
          </v-carousel-item>
        </v-carousel>
      </v-card>
    </v-sheet>
  </v-bottom-sheet>
</template>

<script>
import { FLAGS_PATH } from '@/config/configs'

export default {
  data: () => ({
    flagsPath: FLAGS_PATH,
    baseUrl: process.env.BASE_URL,
    country: {},
    sheet: false,
    loading: false
  }),

  props: {
    sheetShow: {
      type: Boolean,
      default: false
    },

    stateSelected: {
      type: Object,
      default: null
    }
  },

  watch: {
    sheetShow (value) {
      this.sheet = !this.sheet
    }
  },

  created () {
    this.getCountry()
  },

  methods: {
    getCountry (name = null) {
      const country = name ? name.toLowerCase() : 'brazil'
      this.loading = true
      this.$store.dispatch('getCountry', country)
        .then((response) => {
          this.loading = false
          this.country = response.data
        })
        .catch(error => console.log(error))
        .finally(() => { this.loading = false })
    },

    percentage: (percentage, valor) => (percentage / (valor * 100)) * 100
  }
}
</script>
