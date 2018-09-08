<template>
  <div>
    <v-layout row class="mb-2">
      <v-flex xs12>
        <chart-card title="Browsers" chartType="pie-chart" :chartData="browserNameData" legendPos="right"/>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs3>
        <chart-card title="Chrome Versions" chartType="pie-chart" :chartData="browserNameData" legendPos="bottom"/>
      </v-flex>
      <v-flex xs3>
        <chart-card title="Safari Versions" chartType="pie-chart" :chartData="browserNameData" legendPos="bottom"/>
      </v-flex>
      <v-flex xs3>
        <chart-card title="Firefox Versions" chartType="pie-chart" :chartData="browserNameData" legendPos="bottom"/>
      </v-flex>
      <v-flex xs3>
        <chart-card title="Edge Versions" chartType="pie-chart" :chartData="browserNameData" legendPos="bottom"/>
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
  //     var browsersMap = {}
  //     var pageVisitsData = this.pageVisitsData || []
  //     pageVisitsData.forEach((val) => {
  //       var browserName = val.userAgent.browserName
  //       browsersMap[browserName] = (browsersMap[browserName] || 0) + 1
  //     })
  //     var returnData = {
  //       rawData: Object.values(browsersMap),
  //       labels: Object.keys(browsersMap),
  //     }
  //     console.log("Return data: ", returnData)
  //     return returnData
  //   }
  // },
  computed: {
    browserNameData: function() {
      var browsersMap = {}
      var pageVisitsData = this.pageVisitsData || []
      pageVisitsData.forEach((val) => {
        var browserName = val.userAgent.browserName
        browsersMap[browserName] = (browsersMap[browserName] || 0) + 1
      })
      var returnData = {
        rawData: Object.values(browsersMap),
        labels: Object.keys(browsersMap),
      }
      console.log("Return data: ", returnData)
      return returnData
    }
  },
  components: {
    ChartCard,
  }
}
</script>
