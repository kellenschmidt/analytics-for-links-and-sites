<template>
  <v-card class="text-xs-center">
    <v-card-title primary-title>
      <div>
        <h3 class="headline mb-0">{{ title }}</h3>
        <!-- <div>Located two hours south of Sydney in the Southern Highlands of New South Wales...</div> -->
      </div>
    </v-card-title>

    <component :is="chartType" :chartData="chartData" :size="size"></component>

    <!-- <v-card-actions>
      <v-btn flat color="orange">Share</v-btn>
      <v-btn flat color="orange">Explore</v-btn>
    </v-card-actions> -->
  </v-card>
</template>

<script>
import BarChart from './charts/BarChart'
import LineChart from './charts/LineChart'
import CustomChart from './charts/CustomChart'
import PieChart from './chart-controllers/PieChartController'
import EPieChart from './echarts/EchartPie'
import EStackedLine from './echarts/EchartStackedLine'

export default {
  // name: 'Home',
  props: ["title", "chartType", "chartData", "size"],
  data () {
    return {}
  },
  components: {
    BarChart,
    PieChart,
    LineChart,
    CustomChart,
    EPieChart,
    EStackedLine,
  },
}
</script>

<style lang="scss" scoped>
.v-card__title {
  padding-bottom: 0;
}
</style>

