<template>
  <div>
    <v-layout row class="mb-2">
      <v-flex xs12>
        <chart-card title="Kellen" chartType="bar-chart" :chartData="barData"/>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs3>
        <chart-card title="Kellen" chartType="bar-chart" :chartData="barData"/>
      </v-flex>
      <v-flex xs3>
        <chart-card title="Kellen" chartType="bar-chart" :chartData="barData"/>
      </v-flex>
      <v-flex xs3>
        <chart-card title="Kellen" chartType="bar-chart" :chartData="barData"/>
      </v-flex>
      <v-flex xs3>
        <chart-card title="Kellen" chartType="bar-chart" :chartData="barData"/>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import ChartCard from './ChartCard';

export default {
  data () {
    return {
      barData: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11],
    }
  },
  components: {
    ChartCard,
  }
}
</script>
