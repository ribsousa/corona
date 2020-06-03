<template>
    <v-card outlined tile class="mt-5">
        <v-toolbar flat dense color="grey lighten-4">
            <v-toolbar-title class="overline">
                <v-icon left>mdi-earth</v-icon>
                global statistics
            </v-toolbar-title>
            <v-spacer/>
              <v-divider vertical inset/>
              <v-tooltip bottom color="indigo lighten-1">
              <template v-slot:activator="{ on }">
                <v-btn
                  icon
                  color="indigo lighten-2"
                  :to="{name: 'world'}"
                  v-on="on"
                >
                  <v-icon>mdi-page-next-outline</v-icon>
                </v-btn>
              </template>
              <span>More statistics</span>
            </v-tooltip>
        </v-toolbar>
        <v-tabs
          fixed-tabs
          center-active
          background-color="grey lighten-3">
            <v-tab>
                <v-icon left color="orange">mdi-virus-outline</v-icon>
            </v-tab>
            <v-tab>
                <v-icon left color="green">mdi-heart-pulse</v-icon>
            </v-tab>
            <v-tab>
                <v-icon left color="red">mdi-heart-off</v-icon>
            </v-tab>
            <v-tab>
                <v-icon left color="purple">mdi-skull-crossbones</v-icon>
            </v-tab>
            <v-tab-item>
                <v-card flat max-width="400" class="mx-auto">
                    <v-card-text>
                       <v-list subheader>
                           <v-sheet elevation="1" color="grey lighten-4">
                            <v-list-item>
                                <v-list-item-content class="orange--text">
                                    <v-list-item-title>
                                        {{world.confirmed | numeralFormat(world.confirmed >= 1000 ? 'O.O a' : null)}}
                                    </v-list-item-title>
                                    <v-list-item-subtitle class="overline">Cases</v-list-item-subtitle>
                                </v-list-item-content>

                                <v-list-item-icon>
                                    <v-icon left color="orange">mdi-virus-outline</v-icon>
                                </v-list-item-icon>
                            </v-list-item>
                             </v-sheet>
                        </v-list>
                    </v-card-text>
                </v-card>
            </v-tab-item>
            <v-tab-item>
                <v-card flat max-width="400" class="mx-auto">
                    <v-card-text>
                       <v-list subheader>
                           <v-sheet elevation="1" color="grey lighten-4">
                            <v-list-item>
                                <v-list-item-content class="green--text">
                                    <v-list-item-title>
                                        {{world.recovered | numeralFormat(world.recovered >= 1000 ? 'O.O a' : null)}}
                                    </v-list-item-title>
                                    <v-list-item-subtitle class="overline">Recovered</v-list-item-subtitle>
                                </v-list-item-content>

                                <v-list-item-icon>
                                    <v-icon left color="green">mdi-heart-pulse</v-icon>
                                </v-list-item-icon>
                            </v-list-item>
                             </v-sheet>
                        </v-list>
                    </v-card-text>
                </v-card>
            </v-tab-item>
            <v-tab-item>
                <v-card flat max-width="400" class="mx-auto">
                    <v-card-text>
                       <v-list subheader>
                           <v-sheet elevation="1" color="grey lighten-4">
                            <v-list-item>
                                <v-list-item-content class="red--text">
                                    <v-list-item-title>
                                        {{world.deaths | numeralFormat(world.deaths >= 1000 ? 'O.O a' : null)}}
                                    </v-list-item-title>
                                    <v-list-item-subtitle class="overline">Deaths</v-list-item-subtitle>
                                </v-list-item-content>

                                <v-list-item-icon>
                                    <v-icon left color="red">mdi-heart-off</v-icon>
                                </v-list-item-icon>
                            </v-list-item>
                             </v-sheet>
                        </v-list>
                    </v-card-text>
                </v-card>
            </v-tab-item>
            <v-tab-item>
                <v-card flat max-width="400" class="mx-auto">
                    <v-card-text>
                       <v-list subheader>
                           <v-sheet elevation="1" color="grey lighten-4">
                            <v-list-item>
                                <v-list-item-content class="purple--text">
                                    <v-list-item-title>
                                         {{percentage(world.deaths, world.confirmed) | numeralFormat('0.00%')}}
                                    </v-list-item-title>
                                    <v-list-item-subtitle class="overline">Lethality</v-list-item-subtitle>
                                </v-list-item-content>

                                <v-list-item-icon>
                                    <v-icon left color="purple">mdi-skull-crossbones</v-icon>
                                </v-list-item-icon>
                            </v-list-item>
                             </v-sheet>
                        </v-list>
                    </v-card-text>
                </v-card>
            </v-tab-item>
        </v-tabs>
        <v-card-actions class="overline">
            <v-btn
            icon
            href="https://who.int/"
        >
            <v-icon>mdi-open-in-new</v-icon>
            </v-btn>
            <span>World Health Organization</span>
        </v-card-actions>
    </v-card>
</template>

<script>

export default {
  data: () => ({
    // data
  }),

  computed: {
    world () {
      return this.$store.getters.worldNow
    }
  },

  methods: {
    changeTab (value) {
      alert(value)
    },

    percentage: (percentage, valor) => (percentage / (valor * 100)) * 100
  }
}
</script>
