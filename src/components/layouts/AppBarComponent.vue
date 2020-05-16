<template>
    <v-app-bar
      app
      flat
      light
      height="57"
      color="white"
      collapse-on-scroll
    >
      <v-app-bar-nav-icon
        @click="drawerChange()"
      >

      </v-app-bar-nav-icon>

      <div class="d-flex align-center">
        <v-icon color="purple" large left @click="!drawer">mdi-virus-outline</v-icon>
      </div>

      <v-toolbar-title>Corona</v-toolbar-title>

      <v-spacer></v-spacer>

      <router-link class="app-bar-link" :to="{name: 'home'}">
        <v-btn icon>
          <v-icon>mdi-home</v-icon>
        </v-btn>
      </router-link>

      <router-link class="app-bar-link" :to="{name: 'brazil'}">
        <v-btn icon>
          <country-flag country='br'/>
        </v-btn>
      </router-link>

      <router-link class="app-bar-link" :to="{name: 'world'}">
        <v-btn icon color="indigo lighten-2">
          <v-icon>mdi-earth</v-icon>
        </v-btn>
      </router-link>

    </v-app-bar>
</template>

<script>
export default {
  data () {
    return {
      //
    }
  },

  props: {
    drawer: {
      type: Boolean,
      default: false
    }
  },

  methods: {
    drawerChange () {
      this.$emit('drawerChange', true)
    }
  }
}
</script>

<style lang="sass" scoped>
  .v-application .white
    border-bottom: 1px solid !important
    border-color: #e0e0e0 !important

  .app-bar-link
    text-decoration: none
</style>
