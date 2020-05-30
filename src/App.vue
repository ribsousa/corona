<template>
  <v-app>
    <AppBarComponent/>

    <v-content>
      <router-view/>
    </v-content>

    <FooterComponent/>

    <vue-snotify/>
  </v-app>
</template>

<script>
import AppBarComponent from '@/components/layouts/AppBarComponent'
import FooterComponent from '@/components/layouts/FooterComponent'

export default {
  name: 'App',
  data: () => ({
    // data
  }),

  components: {
    AppBarComponent,
    FooterComponent
  }
}
</script>

<style lang="sass" scoped>
</style>
