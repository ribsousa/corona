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
    fab: false,
    deferredPrompt: undefined
  }),

  created () {
    this.$on('canInstall', event => {
      // Prevent Chrome 67 and earlier from automatically showing the prompt:
      event.preventDefault()

      // Stash the event so it can be triggered later:
      this.deferredPrompt = event
    })
  },

  methods: {
    onScroll (e) {
      if (typeof window === 'undefined') return
      const top = window.pageYOffset || e.target.scrollTop || 0
      this.fab = top > 20
    },

    toTop () {
      this.$vuetify.goTo(0)
    },

    promptInstall () {
      // Show the prompt:
      this.deferredPrompt.prompt()

      // Wait for the user to respond to the prompt:
      this.deferredPrompt.userChoice.then(choiceResult => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the install prompt')
        } else {
          console.log('User dismissed the install prompt')
        }

        this.deferredPrompt = null
      })
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
