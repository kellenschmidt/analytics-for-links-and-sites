<template>
  <div>
    <v-layout row class="mb-2">
      <v-flex xs6>
        <chart-card title="Browsers" chartType="e-pie-chart" :chartData="browserNameData" size="big"/>
      </v-flex>
      <v-flex xs6>
        <chart-card title="Browsers" chartType="e-pie-chart" :chartData="browserNameData" size="big"/>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex
        xs12 sm6 md4 xl2
        v-for="(item, key) in browserVersionData"
        :key="key">
        <chart-card :title="key" chartType="e-pie-chart" :chartData="item" size="small" class="pb-2"/>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import ChartCard from './ChartCard';

export default {
  props: ["pageVisitsData"],
  computed: {
    browserNameData: function() {
      var returnArr = []
      var pageVisitsData = this.pageVisitsData || []
      pageVisitsData.forEach((val) => {
        var browserName = val.userAgent.browserName
        var newVal = 1
        var currentIndex = returnArr.findIndex(x => x.name === browserName)
        if(currentIndex != -1) {
          newVal = returnArr[currentIndex].value + 1
          returnArr.splice(currentIndex, 1)
        }
        returnArr.push({
          value: newVal,
          name: browserName
        })
      })
      console.log("browserNameData:", returnArr)
      return returnArr
    },
    browserVersionData: function() {
      var browserMap = {}
      var pageVisitsData = this.pageVisitsData || []
      pageVisitsData.forEach((val) => {
        var browserName = val.userAgent.browserName
        var browserVersion = val.userAgent.browserVersion
        browserMap[browserName] = browserMap[browserName] || [ { name: browserVersion, value: 0 } ]
        var browserVersionIndex = browserMap[browserName].findIndex(x => x.name === browserVersion)
        if(browserVersionIndex == -1) {
          browserMap[browserName].push({ name: browserVersion, value: 1 })
        } else {
          browserMap[browserName][browserVersionIndex].value += 1
        }
      })
      console.log("browserMap", browserMap)
      return browserMap
    }
  },
  components: {
    ChartCard,
  }
}
</script>
