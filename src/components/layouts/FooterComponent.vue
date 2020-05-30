<template>
  <v-bottom-navigation
    :input-value="showNav"
    color="indigo"
    app
    fixed
    hide-on-scroll
    scroll-threshold=10
  >
    <v-btn href="http://gleebe.com" target="_blank">
      <span>Developer</span>
      <v-avatar size="28">
        <v-img src="http://gleebe.com/images/0.jpg"></v-img>
      </v-avatar>
    </v-btn>

    <v-btn href="https://vuejs.org" target="_blank">
      <span>Coding</span>
      <v-icon color="green darken-3">mdi-vuejs</v-icon>
    </v-btn>

    <v-btn href="https://vuetifyjs.com" target="_blank">
      <span>Interface</span>
      <v-icon color="blue darken-2">mdi-vuetify</v-icon>
    </v-btn>

    <v-btn href="https://digitalocean.com" target="_blank">
      <span>Deploy</span>
      <v-icon color="blue darken-3">mdi-digital-ocean</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>

<script>
export default {
  data () {
    return {
      showNav: false
    }
  }
}
</script>

<style lang="sass" scoped>
    .v-footer
        border-top: 1px solid
        border-color: #e0e0e0
</style>
