<template>
  <v-container>
    <v-row v-if="deferredPrompt">
      <v-col cols="12" md="6" lg="6"  class="mx-auto">
        <v-banner
          app
          tile
          single-line
          elevation="0"
          class="body-2"
          color="grey lighten-4"
        >
          <v-icon
            slot="icon"
            color="warning"
            size="30"
          >
            mdi-shape-rectangle-plus
          </v-icon>
          Add to home screen

          <template v-slot:actions>
            <v-btn
              icon
              color="success"
              small
              outlined
              @click="promptInstall()"
            >
              <v-icon>mdi-check</v-icon>
            </v-btn>
            <v-btn
              icon
              small
              outlined
              color="grey lighten-1"
              @click="cancelInstall()"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>

          </template>
        </v-banner>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="4" lg="4">
        <HomeComponent/>
        <WorldMapComponent/>
        <WorldNowComponent/>
      </v-col>
      <v-col cols="12" md="8" lg="8">
        <StateCarouselCompoent/>
      </v-col>
       <v-col cols="12">
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// @ is an alias to /src
import HomeComponent from '@/components/home/HomeComponent'
import StateCarouselCompoent from '@/components/home/StateCarouselCompoent'
import WorldMapComponent from '@/components/home/WorldMapComponent'
import WorldNowComponent from '@/components/home/WorldNowComponent'

export default {
  name: 'Home',
  data: () => ({
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
    },

    cancelInstall () {
      this.deferredPrompt = undefined
    }
  },

  components: {
    HomeComponent,
    WorldMapComponent,
    StateCarouselCompoent,
    WorldNowComponent
  }
}
</script>
