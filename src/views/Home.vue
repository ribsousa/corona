<template>
  <v-container>
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
  components: {
    HomeComponent,
    WorldMapComponent,
    StateCarouselCompoent,
    WorldNowComponent
  }
}
</script>
