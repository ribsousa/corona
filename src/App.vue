<template>
  <v-app>
    <NavigationDrawer @closeDrawer="closeDrawer" :drawer="drawer"/>

    <AppBarComponent @drawerChange="drawerChange" :drawer="drawer"/>

    <v-content>
      <router-view/>
    </v-content>

    <FooterComponent/>

    <vue-snotify/>
  </v-app>
</template>

<script>
import NavigationDrawer from '@/components/layouts/NavigationDrawer'
import AppBarComponent from '@/components/layouts/AppBarComponent'
import FooterComponent from '@/components/layouts/FooterComponent'

export default {
  name: 'App',
  data: () => ({
    drawer: false
  }),

  methods: {
    drawerChange (drawerChange) {
      this.drawer = drawerChange
    },

    closeDrawer (closeDrawer) {
      this.drawer = closeDrawer
      console.log(closeDrawer)
    }
  },

  components: {
    NavigationDrawer,
    AppBarComponent,
    FooterComponent
  }
}
</script>

<style lang="sass" scoped>
</style>
