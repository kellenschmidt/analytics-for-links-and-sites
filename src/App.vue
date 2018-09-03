<template>
<v-app id="inspire" dark>
    <v-navigation-drawer
      v-model="drawer"
      clipped
      fixed
      app
    >
      <v-list dense class="pt-0">
        <v-list-tile>
          <v-list-tile-title class="title text-xs-center">
            Link Analytics
          </v-list-tile-title>
        </v-list-tile>
        <v-avatar size="80px" class="d-flex mx-auto">
          <img src="@/assets/logo.png" alt="Vuetify.js">
        </v-avatar>
        <v-list-tile-title class="text-xs-center">
            Kellen Schmidt
          </v-list-tile-title>
        <v-list-tile
          v-for="item in items"
          :key="item.title"
          @click="listItemClicked()"
        >
          <v-list-tile-action>
            <font-awesome-icon :icon="['fab', 'vuejs']" size="lg" pull="right"/>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-content>
      <v-container fluid fill-height>
        <v-layout justify-center align-center>
          <Home/>
        </v-layout>
      </v-container>
    </v-content>
    <v-footer app fixed>
      <span>&copy; 2018</span>
    </v-footer>
  </v-app>
</template>

<script>
import Home from './views/Home.vue'

export default {
  name: 'App',
  data () {
    return {
      items: [
        { title: 'Overview', icon: 'dashboard' },
        { title: 'Browsers', icon: 'question_answer' },
        { title: 'Operating Systems', icon: 'question_answer' },
        { title: 'Devices', icon: 'question_answer' },
        { title: 'Location', icon: 'question_answer' },
        { title: 'Frequency', icon: 'question_answer' },
        { title: 'Table', icon: 'question_answer' },
      ],
      right: null,
      drawer: true,
    }
  },
  methods: {
    listItemClicked: () => {
      console.log("Clicked list item!");
    }
  },
  components: {
    Home,
  }
}
</script>
