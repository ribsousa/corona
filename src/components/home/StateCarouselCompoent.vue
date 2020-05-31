<template>
    <v-scale-transition>
        <v-card
            class="mx-auto"
            tile
            flat
            outlined
        >
            <v-card-title class="overline">
              <v-img
                :src="`${baseUrl}${flagsPath}countries/BR.png`"
                max-width="28"
                class="mr-2"
              >
              </v-img>
              Brazil States
            </v-card-title>
            <v-card-text>
              <v-slide-group
                v-model="model"
                class="pa-4"
                active-class="warning"
                next-icon="mdi-chevron-right-circle-outline"
                prev-icon="mdi-chevron-left-circle-outline"
                show-arrows
                center-active
                mandatory
              >
                <v-slide-item
                    v-for="state in states"
                    :key="state.uid"
                    v-slot:default="{ active, toggle }"
                >
                    <v-card
                    class="ma-4 pa-1"
                    height="auto"
                    width="70"
                    @click="toggle(), handleSelectItem(state)"
                    >
                      <v-tooltip bottom color="indigo lighten-1">
                        <template v-slot:activator="{ on }">
                          <v-img
                              :src="`${baseUrl}${flagsPath}${state.uf}.png`"
                              width="auto"
                              v-on="on"
                          >
                          </v-img>
                        </template>
                        <span>{{state.uf}}</span>
                      </v-tooltip>
                    </v-card>
                </v-slide-item>
              </v-slide-group>
            </v-card-text>
            <v-scale-transition>
            <v-sheet
                v-if="selected.state"
                height="auto"
                tile
            >
              <v-container>
                <v-row
                class="fill-height"
                align="center"
                justify="center"
                >
                  <v-col cols="12">
                    <HomeChartStateCompoent
                      :state="selected"
                    />
                  </v-col>
                </v-row>
              </v-container>
            </v-sheet>
            </v-scale-transition>
        </v-card>
    </v-scale-transition>
</template>

<script>
import { FLAGS_PATH } from '@/config/configs'
import HomeChartStateCompoent from '../reports/home/HomeChartStateCompoent'

export default {
  data: () => ({
    flagsPath: FLAGS_PATH,
    baseUrl: process.env.BASE_URL,
    loading: false,
    model: null,
    selected: {}
  }),

  created () {
    this.loadStates()
    this.loadState('SP')
  },

  beforeMount () {
    this.handleSelectItem(this.selected)
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

    loadState (uf) {
      this.loading = true
      this.$store.dispatch('loadState', uf)
        .then((response) => {
          this.selected = response
          this.model = 0
          this.loading = false
        })
        .catch(error => console.log(error))
        .finally(() => { this.loading = false })
    },

    handleSelectItem (state) {
      this.selected = state
    },

    percentage: (percentage, valor) => (percentage / (valor * 100)) * 100
  },

  components: {
    HomeChartStateCompoent
  }
}
</script>
