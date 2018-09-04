<template>
  <div>
    <v-navigation-drawer
      v-model="drawer"
      clipped
      fixed
      app
    >
      <p class="headline pt-4 text-xs-center">
        Link Analytics
      </p>
      <v-avatar size="80px" class="d-flex mx-auto my-3">
        <img src="@/assets/graphql.png" alt="user-avatar">
      </v-avatar>
      <p class="text-xs-center subheading">
        Kellen Schmidt
      </p>
      <v-list dense>
        <router-link
          :to="item.name"
          tag="span"
          class="nav-row"
          v-for="item in items"
          :key="item.title"
          @click="listItemClicked(item.title)">
          <v-list-tile>
            <v-list-tile-action>
              <font-awesome-icon :icon="['fab', 'vuejs']" size="lg" pull="right"/>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            </v-list-tile-content>
          
          </v-list-tile>
        </router-link>
      </v-list>
    </v-navigation-drawer>
    <v-content>
      <v-container fluid fill-height>
        <v-layout justify-center align-center>
          <router-view/>
        </v-layout>
      </v-container>
    </v-content>
    <v-footer app fixed>
      <span>&copy; 2018</span>
    </v-footer>
  </div>
</template>

<script>
import Table from "./Table";

export default {
  // name: 'Home',
  data () {
    return {
      items: [
        { title: 'Overview', name: 'overview', icon: 'dashboard' },
        { title: 'Browsers', name: 'browsers', icon: 'question_answer' },
        { title: 'Operating Systems', name: 'operating-systems', icon: 'question_answer' },
        { title: 'Devices', name: 'devices', icon: 'question_answer' },
        { title: 'Location', name: 'location', icon: 'question_answer' },
        { title: 'Frequency', name: 'frequency', icon: 'question_answer' },
        { title: 'Table', name: 'table', icon: 'question_answer' },
      ],
      drawer: true,
      selectedNavItem: "Overview"
    }
  },
  methods: {
    listItemClicked: function (itemTitle) {
      this.selectedNavItem = itemTitle;
    }
  },
  components: {
    Table
  },
}
</script>

<style scoped lang="scss">
.nav-row {
  opacity: 0.5;
  display: inherit
}

.nav-row:hover {
  cursor: pointer;
}

.router-link-active {
  /* color: #e535ab; */
  opacity: 1;
}
</style>
