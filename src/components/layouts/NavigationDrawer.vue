<template>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant.sync="mini"
      @input="closeDrawer()"
      app
    >
      <v-list-item class="px-2">
        <v-list-item-avatar>
          <!--<v-img src="https://randomuser.me/api/portraits/men/85.jpg"></v-img>-->
          <v-icon color="green" large>mdi-compass-outline</v-icon>
        </v-list-item-avatar>

        <v-list-item-title>Navigation {{drawer}}</v-list-item-title>

        <v-btn
          icon
          @click.stop="mini = !mini"
        >
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
</template>

<script>
export default {
  data () {
    return {
      items: [
        { title: 'Home', icon: 'mdi-home-city' },
        { title: 'My Account', icon: 'mdi-account' },
        { title: 'Users', icon: 'mdi-account-group-outline' }
      ],
      mini: true
    }
  },

  props: {
    drawer: {
      type: Boolean,
      default: true
    }
  },

  methods: {
    closeDrawer () {
      this.$emit('closeDrawer', this.drawer)
    }
  }
}
</script>
