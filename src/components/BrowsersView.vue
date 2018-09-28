<template>
  <div>
    <v-layout row wrap class="mb-2">
      <v-flex xs12 md6>
        <chart-card title="Browser Distribution" chartType="e-pie-chart" :chartData="browserNameData" size="big"/>
      </v-flex>
      <v-flex xs12 md6>
        <chart-card title="Browser Usage" chartType="e-stacked-line" :chartData="browserDateData" size="big"/>
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
import ChartCard from './ChartCard'
import moment from 'moment'

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
      console.log("browserVersionData", browserMap)
      return browserMap
    },
    browserDateData: function() {
      var browserMap = {}
      var rangeSize = 10
      var pageVisitsData = this.pageVisitsData || []
      if(pageVisitsData.length > 0) {
        var beginDate = moment.utc(pageVisitsData[0].userAgent.datetime).valueOf()
        var endDate = moment.utc(pageVisitsData[pageVisitsData.length-1].userAgent.datetime).valueOf()
        var dateRange = (endDate - beginDate)/rangeSize
      }
      pageVisitsData.forEach((val) => {
        var browserName = val.userAgent.browserName
        var datetime = moment.utc(val.userAgent.datetime).valueOf()
        if(browserMap[browserName] === undefined) {
          browserMap[browserName] = {}
        }
        if(browserMap[browserName][datetime] === undefined) {
          browserMap[browserName][datetime] = 1
        } else {
          browserMap[browserName][datetime]++
        }
      })
      console.log("BrowserIntermediateDateData", browserMap)

      var returnArr = []
      Object.entries(browserMap).forEach(([key, value]) => {
        var newData = new Array(rangeSize).fill(0)
        Object.entries(value).forEach(([key, value]) => {
          var index = Math.floor((key - beginDate)/dateRange)
          index = index < rangeSize ? index : (rangeSize-1)
          newData[index] += value
        })

        for(var i=1; i<rangeSize; i++) {
            newData[i] += newData[i-1]
        }
        
        returnArr.push({
          name: key,
          data: newData
        })
      })
      console.log("BrowserDateData", returnArr)

      var xAxisData = []
      for(var i=0; i<rangeSize; i++) {
        var str = ""
        str += moment(beginDate + dateRange*i).format("M/D")
        str += " - "
        str += moment(beginDate + dateRange*(i+1)).format("M/D")
        xAxisData.push(str)
      }

      return {
        xAxisData,
        series: returnArr
      }
    }
  },
  components: {
    ChartCard,
  }
}
</script>
