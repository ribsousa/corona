<template>
  <v-container>
    <HomeComponent />
  </v-container>
</template>

<script>
// @ is an alias to /src
import HomeComponent from '@/components/home/HomeComponent.vue'

export default {
  name: 'Home',
  components: {
    HomeComponent
  }
}
</script>
