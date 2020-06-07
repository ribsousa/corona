<template>
  <v-app>
    <AppBarComponent/>

    <v-content>
      <router-view/>
    </v-content>

    <FooterComponent/>

    <vue-snotify/>

    <v-fab-transition>
      <v-btn
        v-scroll="onScroll"
        v-show="fab"
        fab
        dark
        fixed
        bottom
        right
        x-small
        outlined
        color="orange"
        @click="toTop"
      >
        <v-icon>mdi-arrow-up</v-icon>
      </v-btn>
    </v-fab-transition>
  </v-app>
</template>

<script>
import AppBarComponent from '@/components/layouts/AppBarComponent'
import FooterComponent from '@/components/layouts/FooterComponent'

export default {
  name: 'App',
  data: () => ({
    fab: false
  }),

  methods: {
    onScroll (e) {
      if (typeof window === 'undefined') return
      const top = window.pageYOffset || e.target.scrollTop || 0
      this.fab = top > 20
    },

    toTop () {
      this.$vuetify.goTo(0)
    }
  },

  components: {
    AppBarComponent,
    FooterComponent
  }
}
</script>

<style lang="sass" scoped>
</style>
