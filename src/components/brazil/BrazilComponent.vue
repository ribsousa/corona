<template>
  <div>
    <v-skeleton-loader
      :loading="loading"
      :transition="transition"
      type="table"
      class="ma-auto"
    >
      <v-card outlined tile class="pl-2 pr-2">
          <v-card-title class="overline">
            <country-flag country='br'/> Brazil States
          </v-card-title>
          <v-data-table
            :headers="headers"
            :items="states"
            :search="search"
            item-key="state"
            :loading="loading"
            @click:row="handleClick"
            single-select
          >
            <template v-slot:top>
              <v-toolbar flat color="white">
                <v-toolbar-title>
                  <v-tooltip bottom color="green lighten-1">
                    <template v-slot:activator="{ on }">
                      <v-btn
                        icon
                        color="green lighten-1"
                        :loading="loading"
                        @click="refreshStates()"
                        v-on="on"
                      >
                        <v-icon>mdi-refresh</v-icon>
                      </v-btn>
                    </template>
                    <span>Refresh</span>
                  </v-tooltip>
                </v-toolbar-title>
                <v-divider
                  class="mx-2"
                  inset
                  vertical
                ></v-divider>
                <v-spacer></v-spacer>
                <v-autocomplete
                  :items="states"
                  id="uf"
                  color="indigo lighten-1"
                  item-text="state"
                  label="Filter"
                  v-model="search"
                  append-icon="mdi-filter"
                  @change="stateChange()"
                  return-object
                >
                  <template v-slot:selection="{ attrs, item, select, selected }">
                    <v-chip
                      v-bind="attrs"
                      :input-value="selected"
                      close
                      small
                      @click="select"
                      @click:close="search = '', stateChange()"
                    >
                      <v-avatar left>
                        <v-img :src="`${baseUrl}${flagsPath}${item.uf}.png`"></v-img>
                      </v-avatar>
                      <strong>{{ item.state }}</strong>&nbsp;
                    </v-chip>
                  </template>
                  <template v-slot:item="data">
                    <v-list-item-avatar>
                      <v-avatar size="24">
                        <v-img :src="`${baseUrl}${flagsPath}${data.item.uf}.png`"></v-img>
                      </v-avatar>
                    </v-list-item-avatar>
                    <v-list-item-content>
                        <v-list-item-title v-html="data.item.state"></v-list-item-title>
                    </v-list-item-content>
                  </template>
                </v-autocomplete>
              </v-toolbar>
            </template>
            <template v-slot:item.flag="{ item }">
              <v-avatar class="state-flag" tile color="blue" width="28" min-width="20" height="20">
                <v-img
                  :src="`${baseUrl}${flagsPath}${item.uf}.png`"
                  lazy-src="https://picsum.photos/22/222"
                  >
                    <template v-slot:placeholder>
                      <v-row
                        class="fill-height ma-0"
                        align="center"
                        justify="center"
                      >
                        <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                      </v-row>
                    </template>
                </v-img>
              </v-avatar>
            </template>
            <template v-slot:item.cases="{ item }">
              {{ item.cases | numeralFormat() }}
            </template>
            <template v-slot:item.deaths="{ item }">
              {{ item.deaths | numeralFormat() }}
            </template>
            <template v-slot:item.suspects="{ item }">
              {{ item.suspects | numeralFormat() }}
            </template>
            <template v-slot:item.lethality="{ item }">
              {{ percentage(item.deaths, item.cases) | numeralFormat('0.00%') }}
            </template>
            <template v-slot:item.datetime="{ item }">
              {{ item.datetime | moment("from", "now") }}
            </template>
          </v-data-table>
      </v-card>
    </v-skeleton-loader>

    <BottomStateComponent :sheetShow="sheet" :stateSelected="stateSelected"/>
  </div>
</template>

<script>
import { FLAGS_PATH } from '@/config/configs'
import BottomStateComponent from './BottomStateComponent'

export default {
  data () {
    return {
      flagsPath: FLAGS_PATH,
      baseUrl: process.env.BASE_URL,
      loading: true,
      transition: 'scroll-y-transition',
      search: null,
      headers: [
        { text: '', align: 'start', value: 'flag', filterable: false, sortable: false },
        { text: 'State', value: 'state' },
        { text: 'UF', value: 'uf', filterable: false },
        { text: 'Confirmed', value: 'cases', filterable: false },
        { text: 'Deaths', value: 'deaths', filterable: false },
        // { text: 'Suspects', value: 'suspects', filterable: false },
        { text: 'Lethality', value: 'lethality', filterable: false },
        { text: 'Last update', value: 'datetime', filterable: false }
      ],
      stateSelected: {},
      sheet: false
    }
  },

  props: {
    removeState: {
      type: Array,
      default: null
    }
  },

  watch: {
    removeState (value) {
      if (this.search) {
        const state = value.filter(item => item.state === this.search)
        if (state.length) {
          this.search = ''
          this.stateChange()
        }
      }
    }
  },

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

    refreshStates () {
      this.loading = true
      this.$store.dispatch('loadStates')
        .then(() => {
          this.loading = false
          this.$snotify.success('States updated', 'Success!')
        })
        .catch(error => console.log(error))
        .finally(() => {
          this.loading = false
        })
    },

    stateChange () {
      const state = this.search ? this.search : {}
      this.search = this.search.state
      this.$emit('stateChange', state)
    },

    handleClick (value, row) {
      // this.$set(row, 'isSelected', true)
      row.select()
      this.stateSelected = value
      this.sheet = !this.sheet
    },

    percentage: (percentage, valor) => (percentage / (valor * 100)) * 100
  },

  components: {
    BottomStateComponent
  }
}
</script>

<style lang="sass" scoped>
  .tv-data-table__selected
    background-color: red !important
</style>
