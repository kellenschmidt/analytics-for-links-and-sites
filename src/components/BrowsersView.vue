<template>
  <div>
    <v-layout row class="mb-2">
      <v-flex xs12>
        <chart-card title="Kellen" chartType="pie-chart" :chartData="samplePieData" legendPos="right"/>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs3>
        <chart-card title="Kellen" chartType="pie-chart" :chartData="samplePieData" legendPos="bottom"/>
      </v-flex>
      <v-flex xs3>
        <chart-card title="Kellen" chartType="pie-chart" :chartData="samplePieData" legendPos="bottom"/>
      </v-flex>
      <v-flex xs3>
        <chart-card title="Kellen" chartType="pie-chart" :chartData="samplePieData" legendPos="bottom"/>
      </v-flex>
      <v-flex xs3>
        <chart-card title="Kellen" chartType="pie-chart" :chartData="samplePieData" legendPos="bottom"/>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import ChartCard from './ChartCard';

export default {
  data () {
    return {
      samplePieData: {
        rawData: [40, 20, 80, 10, 30],
        labels: ['VueJs', 'EmberJs', 'ReactJs', 'AngularJs'],
      },
    }
  },
  components: {
    ChartCard,
  }
}
</script>
