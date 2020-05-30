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
            ref='selectState'
            chips
            solo
            multiple
            clearable
            hide-selected
            :items="states"
            :loading="loading"
            return-object
            id="state"
            color="orange"
            item-text="state"
            item-value="uf"
            label="States"
            v-model="selectedStates"
            append-icon="mdi-plus-circle-multiple-outline"
            clear-icon="mdi-close-circle-multiple-outline"
            @change="loadState()"
            @click:clear="clearStates()"
            @click:close="loadState()"
          >
            <template v-slot:selection="{ attrs, item, select, selected }">
              <v-chip
                v-bind="attrs"
                :input-value="selected"
                close
                @click="select"
                @click:close="remove(item)"
              >
                <v-avatar left>
                  <v-img :src="`${baseUrl}${flagsPath}${item.uf}.png`"></v-img>
                </v-avatar>
                <strong>{{ item.uf }}</strong>&nbsp;
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
          <CompareShartComponent
            v-if="state.length"
            :state="state"
          >
          </CompareShartComponent>
        </v-card-text>
    </v-card>
</template>

<script>
import { FLAGS_PATH } from '@/config/configs'
import CompareShartComponent from './CompareShartComponent'

export default {
  data: () => ({
    flagsPath: FLAGS_PATH,
    baseUrl: process.env.BASE_URL,
    selectedStates: [],
    loading: false,
    state: []
  }),

  props: {
    stateSeleted: {
      type: Object,
      default: null
    }
  },

  watch: {
    stateSeleted (value) {
      this.state = []
      this.selectedStates = value.state ? [value] : []
      if (value.state) {
        this.loadState()
      } else {
        this.addStateLocalStorage()
      }
    }
  },

  computed: {
    computedDateFormatted () {
      return this.formatDate(this.date)
    },

    states () {
      return this.$store.state.brazil.items.data
    }
  },

  mounted () {
    this.loadLocalStorage()
  },

  methods: {
    loadState () {
      this.state = []
      if (this.selectedStates.length) {
        this.loading = true
        this.selectedStates.forEach(state => this.state.push(state))
        this.loading = false
        this.addStateLocalStorage()
      } else {
        this.state = []
      }
    },

    remove (item) {
      this.selectedStates = this.selectedStates.filter(state => state.uf !== item.uf)
      this.$refs.selectState.blur()
      this.loadState()
      this.addStateLocalStorage()
      this.compareChange([item])
    },

    addStateLocalStorage () {
      if (this.selectedStates) {
        const states = JSON.stringify(this.selectedStates)
        localStorage.setItem('selectedStates', states)
      }
    },

    loadLocalStorage () {
      const states = JSON.parse(localStorage.getItem('selectedStates'))
      if (states && states.length) {
        this.selectedStates = states
        this.loadState()
      }
    },

    clearStates () {
      this.compareChange(this.state)
      this.state = []
    },

    compareChange (states) {
      this.$emit('compareChange', states)
    }
  },

  components: {
    CompareShartComponent
  }
}
</script>

<style lang="sass" scoped>
</style>
