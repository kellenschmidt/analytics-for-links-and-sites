<template>
  <!-- <v-card class="mx-3"> -->
  <v-card>
    <v-card-title primary-title>
      <div>
        <h3 class="headline mb-0">{{ title }}</h3>
        <!-- <div>Located two hours south of Sydney in the Southern Highlands of New South Wales...</div> -->
      </div>
    </v-card-title>

    <component :is="chartType" :chartData="chartData" :legendPos="legendPos"></component>

    <!-- <v-card-actions>
      <v-btn flat color="orange">Share</v-btn>
      <v-btn flat color="orange">Explore</v-btn>
    </v-card-actions> -->
  </v-card>
</template>

<script>
import BarChart from './charts/BarChart'
import PieChart from './charts/PieChart'
import LineChart from './charts/LineChart'
import CustomChart from './charts/CustomChart'

export default {
  // name: 'Home',
  props: ["title", "chartType", "chartData", "legendPos"],
  data () {
    return {}
  },
  components: {
    BarChart,
    PieChart,
    LineChart,
    CustomChart,
  },
  created: function () {
    // `this` points to the vm instance
    // console.log('legendPos is: ' + this.legendPos);
  },
}
</script>
