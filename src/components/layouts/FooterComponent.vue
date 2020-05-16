<template>
    <v-footer
      app
      tile
      inset
      absolute
      dark
      color="teal lighten-1"
      class="font-weight-medium"
    >
        <v-col
          class="text-center overline"
          cols="12"
        >
            <v-icon small>mdi-copyright</v-icon> {{ new Date().getFullYear() }} <strong>Gleebe.com</strong>
        </v-col>
    </v-footer>
</template>

<style lang="sass" scoped>
    .v-footer
        border-top: 1px solid
        border-color: #e0e0e0
</style>
