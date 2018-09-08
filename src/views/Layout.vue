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
          :key="item.title">
          <v-list-tile>
            <v-list-tile-action>
              <font-awesome-icon :icon="item.icon" size="lg" pull="right"/>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            </v-list-tile-content>
          
          </v-list-tile>
        </router-link>
      </v-list>
    </v-navigation-drawer>
    <v-content>
      <v-container wrap grid-list-xl class="px-5">
        <router-view :pageVisitsData="pageVisits"/>
      </v-container>
    </v-content>
    <v-footer app fixed>
      <span>&copy; 2018 Version:&nbsp;</span>
      <a href="https://hub.docker.com/r/kellenschmidt/analytics-for-links-and-sites/tags/" target="_blank" rel="noopener">{{appVersion}}</a>
    </v-footer>
  </div>
</template>

<script>
import Table from "./Table";
import { appVersion } from '../app-version';
import PageVisitsGql from '../graphql/PageVisits.gql'

export default {
  // name: 'Home',
  data () {
    return {
      items: [
        { title: 'Overview', name: 'overview', icon: ['fab', 'vuejs'] },
        { title: 'Browsers', name: 'browsers', icon: ['fab', 'vuejs'] },
        { title: 'Operating Systems', name: 'operating-systems', icon: ['fab', 'vuejs'] },
        { title: 'Devices', name: 'devices', icon: ['fab', 'vuejs'] },
        { title: 'Location', name: 'location', icon: ['fab', 'vuejs'] },
        { title: 'Frequency', name: 'frequency', icon: ['fab', 'vuejs'] },
        { title: 'Table', name: 'table', icon: ['fab', 'vuejs'] },
      ],
      drawer: true,
      appVersion: appVersion,
    }
  },
  components: {
    Table
  },
  apollo: {
    pageVisits: {
      query: PageVisitsGql,
      result({ data, loading, networkStatus }) {
        console.log("We got some result!", data)
      },
      // Error handling
      error(error) {
        console.error('We\'ve got an error!', error)
      },
    },
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
  opacity: 1;
}
</style>
