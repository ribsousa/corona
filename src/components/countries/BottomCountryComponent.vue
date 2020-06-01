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
            Global
            <country-flag country='un'/>
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
            <v-avatar tile left width="28" min-width="20" height="20" color="grey lighten-2">
              <v-img
                :src="`${baseUrl}${flagsPath}/countries/${getIsoCode(countrySelected.country)}.png`"
              >
              </v-img>
            </v-avatar>
            <span class="ml-3">{{countrySelected.country}}</span>
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
                      {{ worldNow.confirmed | numeralFormat() }}
                    </span>
                    <v-divider vertical class="mx-5"/>
                    <span class="subtitle-2">
                      {{ countrySelected.confirmed | numeralFormat() }}
                      ({{ percentage(countrySelected.confirmed, worldNow.confirmed) | numeralFormat('0.00%') }})
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
                    <v-icon left color="green">mdi-heart-pulse</v-icon>
                    Recovered Cases
                  </v-btn>
                  <v-divider/>
                  <v-toolbar dense tile flat>
                    <span class="subtitle-2">
                      {{ worldNow.recovered | numeralFormat() }}
                    </span>
                    <v-divider vertical class="mx-5"/>
                    <span class="subtitle-2">
                      {{ countrySelected.recovered | numeralFormat() }}
                      ({{ percentage(countrySelected.recovered, worldNow.recovered) | numeralFormat('0.00%') }})
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
                      {{ worldNow.deaths | numeralFormat() }}
                    </span>
                    <v-divider vertical class="mx-5"/>
                    <span class="subtitle-2">
                      {{ countrySelected.deaths | numeralFormat() }}
                      ({{ percentage(countrySelected.deaths, worldNow.confirmed) | numeralFormat('0.000%') }})
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
                      {{ percentage(worldNow.deaths, worldNow.confirmed)  | numeralFormat('0.00%') }}
                    </span>
                    <v-divider vertical class="mx-5"/>
                    <span class="subtitle-2">
                      {{ percentage(countrySelected.deaths, countrySelected.confirmed) | numeralFormat('0.00%') }}
                      ({{ percentage(countrySelected.deaths, worldNow.confirmed) | numeralFormat('0.000%') }})
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
import isoCodes from '../../config/isoCodes.json'

export default {
  data: () => ({
    flagsPath: FLAGS_PATH,
    baseUrl: process.env.BASE_URL,
    sheet: false,
    loading: false
  }),

  props: {
    sheetShow: {
      type: Boolean,
      default: false
    },

    countrySelected: {
      type: Object,
      default: null
    }
  },

  watch: {
    sheetShow (value) {
      this.sheet = !this.sheet
    }
  },

  computed: {
    worldNow () {
      return this.$store.getters.worldNow
    }
  },

  methods: {
    getIsoCode (country) {
      this.loading = true
      const codes = JSON.parse(JSON.stringify(isoCodes))
      const result = codes.filter(code => code.name === country)
      const code = result.length ? result[0].iso_code : 'UN'
      this.loading = false

      return code
    },

    percentage: (percentage, valor) => (percentage / (valor * 100)) * 100
  }
}
</script>
