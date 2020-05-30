<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="4" lg="4">
        <HomeComponent/>
        <WorldMapComponent/>
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

export default {
  name: 'Home',
  components: {
    HomeComponent,
    WorldMapComponent,
    StateCarouselCompoent
  }
}
</script>
