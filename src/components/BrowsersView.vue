<template>
  <div>
    <v-layout row class="mb-2">
      <v-flex xs12>
        <chart-card title="Browsers" chartType="pie-chart" :chartData="browserNameData" legendPos="right"/>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex
        xs3
        v-for="item in browserVersionData"
        :key="item.title"
      >
        <chart-card :title="item.browserName" chartType="pie-chart" :chartData="item.dataCollection" legendPos="bottom"/>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import ChartCard from './ChartCard';

export default {
  props: ["pageVisitsData"],
  // data () {
  //   return {
  //     // samplePieData: {
  //     //   rawData: [40, 20, 80, 10, 30],
  //     //   labels: ['VueJs', 'EmberJs', 'ReactJs', 'AngularJs'],
  //     // },
  //     browserNameData: this.getBrowserNameData()
  //   }
  // },
  // watch: {
  //   pageVisitsData: function() {
  //     this.browserNameData = this.getBrowserNameData()
  //   }
  // },
  // methods: {
  //   getBrowserNameData: function() {
  //     var browserMap = {}
  //     var pageVisitsData = this.pageVisitsData || []
  //     pageVisitsData.forEach((val) => {
  //       var browserName = val.userAgent.browserName
  //       browserMap[browserName] = (browserMap[browserName] || 0) + 1
  //     })
  //     var returnData = {
  //       rawData: Object.values(browserMap),
  //       labels: Object.keys(browserMap),
  //     }
  //     console.log("Return data: ", returnData)
  //     return returnData
  //   }
  // },
  computed: {
    browserNameData: function() {
      var browserMap = {}
      var pageVisitsData = this.pageVisitsData || []
      pageVisitsData.forEach((val) => {
        var browserName = val.userAgent.browserName
        browserMap[browserName] = (browserMap[browserName] || 0) + 1
      })
      var returnData = {
        rawData: Object.values(browserMap),
        labels: Object.keys(browserMap),
      }
      console.log("browserNameData:", returnData)
      return returnData
    },
    browserVersionData: function() {
      var browserMap = {}
      var pageVisitsData = this.pageVisitsData || []
      pageVisitsData.forEach((val) => {
        var browserName = val.userAgent.browserName
        var browserVersion = val.userAgent.browserVersion
        var browserVersionMap = browserMap[browserName] || { [browserVersion]: 0 }
        browserVersionMap[browserVersion] = (browserVersionMap[browserVersion] || 0) + 1
        browserMap[browserName] = browserVersionMap
      })
      var returnData = []
      var browserMapKeys = Object.keys(browserMap)
      var browserMapValues = Object.values(browserMap)
      for(var i=0; i < browserMapKeys.length; i++) {
        returnData.push({
          browserName: browserMapKeys[i],
          dataCollection: {
            labels: Object.keys(browserMapValues[i]),
            rawData: Object.values(browserMapValues[i])
          }
        })
      }
      console.log("browserVersionData:", returnData)
      return returnData
    }
  },
  components: {
    ChartCard,
  }
}
</script>
