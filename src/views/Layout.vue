<template>
  <div>
    <v-navigation-drawer
      v-model="drawer"
      clipped
      fixed
      app
    >
      <p class="headline pt-4 text-xs-center">
        {{isSites ? "Site" : "Link"}} Analytics
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
          :event="(item.name === 'disabled' ? '' : 'click')"
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
        <v-layout row wrap>
          <v-flex xs12 sm4 md3 lg2 d-flex>
            <v-select
              :items="dateRangeItems"
              v-model="selectedDateRange"
              item-text="text"
              item-value="value"
              solo
            ></v-select>
          </v-flex>
          <v-flex xs12 sm4 md3 lg2 d-flex v-if="this.selectedDateRange === 'custom'">
            <v-menu
              ref="startDateMenu"
              :close-on-content-click="false"
              v-model="startDateModal"
              :return-value.sync="startDate"
              lazy
              transition="scale-transition"
              offset-y
            >
              <v-text-field
                slot="activator"
                v-model="startDate"
                label="Start Date"
                prepend-icon="event"
                readonly
                solo
              ></v-text-field>
              <v-date-picker
                v-model="startDate"
                @input="$refs.startDateMenu.save(startDate)"
                no-title
              />
            </v-menu>
          </v-flex>
          <v-flex xs12 sm4 md3 lg2 d-flex v-if="this.selectedDateRange === 'custom'">
            <v-menu
              ref="endDateMenu"
              :close-on-content-click="false"
              v-model="endDateModal"
              :return-value.sync="endDate"
              lazy
              transition="scale-transition"
              offset-y
            >
              <v-text-field
                slot="activator"
                v-model="endDate"
                label="End Date"
                prepend-icon="event"
                readonly
                solo
              />
              <v-date-picker
                v-model="endDate"
                @input="$refs.endDateMenu.save(endDate)"
                no-title
              />
            </v-menu>
          </v-flex>
          <v-flex xs12 sm4 md3 lg2 d-flex>
            <v-select
              :items="linkOrSiteItems"
              v-model="selectedLinkOrSite"
              @change="routeToNewLink"
              solo
            ></v-select>
          </v-flex>
        </v-layout>
        <router-view :pageVisitsData="pageVisitsInRange"/>
      </v-container>
    </v-content>
    <v-footer app fixed>
      <span class="ml-2">&copy; 2018 Version:&nbsp;</span>
      <a href="https://hub.docker.com/r/kellenschmidt/analytics-for-links-and-sites/tags/" target="_blank" rel="noopener">{{appVersion}}</a>
      <font-awesome-icon icon="palette" class="ml-auto mr-3" @click="toggleTheme"/>
    </v-footer>
  </div>
</template>

<script>
import Table from "./Table";
import { appVersion } from '../app-version';
import PageVisitsGql from '../graphql/PageVisits.gql'
import moment from 'moment'

export default {
  // name: 'Home',
  props: {
    toggleTheme: Function,
  },
  data () {
    return {
      items: [
        // { title: 'Overview', name: 'overview', icon: ['fab', 'vuejs'] },
        { title: 'Browsers', name: 'browsers', icon: ['fab', 'chrome'] },
        // { title: 'Operating Systems', name: 'operating-systems', icon: ['fab', 'vuejs'] },
        // { title: 'Devices', name: 'devices', icon: ['fab', 'vuejs'] },
        // { title: 'Location', name: 'location', icon: ['fab', 'vuejs'] },
        // { title: 'Frequency', name: 'frequency', icon: ['fab', 'vuejs'] },
        { title: 'Table', name: 'table', icon: ['fas', 'table'] },
        { title: 'More coming soon...', name: 'disabled', icon: ['fas', 'ellipsis-h'] },
      ],
      dateRangeItems: [{text: 'All time', value: "all time"}, {text: 'Last week', value: moment().subtract(7, 'days')}, {text: 'Last month', value: moment().subtract(1, 'month')}, {text: 'Last year', value: moment().subtract(1, 'year')}, {text: 'Custom...', value: "custom"}],
      selectedDateRange: "all time",
      selectedLinkOrSite: null,
      startDate: null,
      endDate: null,
      startDateModal: false,
      endDateModal: false,
      drawer: true,
      isSites: this.$router.currentRoute.path.includes("/sites"),
      sitesArr: ["/interactive-resume", "/url-shortener"],
      appVersion: appVersion,
    }
  },
  computed: {
    pageVisitsInRange: function() {
      var allPageVisits = this.pageVisits || []

      var returnPageVisits = this.fixInvalidPageVisits(allPageVisits)
      
      if(this.selectedDateRange === "custom") {
        returnPageVisits = this.getPageVisitsByDate(this.startDate, this.endDate)
      } else if(this.selectedDateRange !== "all time") {
        returnPageVisits = this.getPageVisitsByDate(this.selectedDateRange, new Date())
      }
      if(this.selectedLinkOrSite) {
        returnPageVisits = this.getPageVisitsByPath(returnPageVisits, this.selectedLinkOrSite)
      }

      return returnPageVisits
    },
    linkOrSiteItems: function() {
      var pageVisits = this.pageVisits || []
      var itemsObj = {}
      pageVisits.forEach((val) => {
        const sameType = this.isSites === this.sitesArr.includes(val.path)
        if(val.userId !== null && sameType) {
          itemsObj[val.path] = ""
        }
      })

      var returnArr = Object.keys(itemsObj)
      returnArr.unshift(`All ${this.isSites ? 'sites' : 'links'}`)
      return returnArr
    }
  },
  methods: {
    getPageVisitsByDate: function(start, end) {
      if(start === null && end === null) {
        return this.pageVisits
      }

      var inDateRange = []
      this.pageVisits.forEach((val) => {
        const valDatetime = moment(val.datetime)
        if((start === null || valDatetime > moment(start)) && (end === null || valDatetime < moment(end))) {
          inDateRange.push(val)
        }
      })

      return inDateRange
    },
    getPageVisitsByPath: function(inputPageVisits, pathFilter) {
      var returnArr = []
      inputPageVisits.forEach((val) => {
        const sameType = this.isSites === this.sitesArr.includes(val.path)
        if((val.path === pathFilter || pathFilter.includes("All ")) && sameType) {
          returnArr.push(val)
        }
      })

      return returnArr
    },
    fixInvalidPageVisits: function(inputPageVisits) {
      var returnArr = []
      inputPageVisits.forEach((val) => {
        if(val.ipAddress === null) {
          val.ipAddress = {}
        } else if(val.userAgent === null) {
          val.userAgent = {}
        }
        returnArr.push(val)
      })

      return returnArr
    },
    getInitialLink: function() {
      const pageId = this.$router.currentRoute.params.pageId
      
      return pageId === undefined ? this.linkOrSiteItems[0] : "/" + pageId
    },
    routeToNewLink: function(selectedPath) {
      const currentPath = this.$router.currentRoute.path
      const pathSuffix = currentPath.substring(currentPath.lastIndexOf("/"))
      
      if(selectedPath.includes("All ")) {
        selectedPath = ""
      }

      const newPath = (this.isSites ? "/sites" : "/links") + selectedPath + pathSuffix
      this.$router.push(newPath)
    }
  },
  mounted() {
    const pageId = this.$router.currentRoute.params.pageId

    if(pageId !== undefined && !this.linkOrSiteItems.includes(pageId)) {
      this.routeToNewLink("All ")
    }
  },
  watch: {
    linkOrSiteItems: function() {
      this.selectedLinkOrSite = this.getInitialLink()
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
