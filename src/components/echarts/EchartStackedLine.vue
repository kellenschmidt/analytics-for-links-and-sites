<template>
  <figure>
    <chart 
      :options="stackedLine"
      auto-resize
      theme="dark-theme"
      :class="[{ small: this.size == 'small' }, 'mx-auto']"
    />
  </figure>
</template>

<script>
import ECharts from 'vue-echarts/components/ECharts'
import 'echarts/theme/dark'
import theme from './theme.json'

ECharts.registerTheme('dark-theme', theme)

export default {
  components: {
    chart: ECharts
  },
  props: {
    chartData: Object,
    size: String
  },
  computed: {
    stackedLine: function() {
      return {
        tooltip: {
          trigger: 'axis',
        },
        legend: {
          bottom: true,
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            data: this.chartData.xAxisData
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: this.createSeriesData(this.chartData.series),
      }
    }
  },
  methods: {
    createSeriesData: function(seriesInputData) {
      var returnArr = []
      seriesInputData.forEach((val) => {
        returnArr.push({
          name: val.name,
          type: 'line',
          stack: 'myStack',
          areaStyle: { normal: {} },
          data: val.data
        })
      })
      console.log("Series data", returnArr)
      return returnArr
    }
  }
}
</script>

<style scoped lang="scss">
.echarts {
  width: 100%;
  height: 450px;
  &.small {
    height: 200px;
  }
}
    
</style>
