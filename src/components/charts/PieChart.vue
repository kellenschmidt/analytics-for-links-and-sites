<!-- <template>
</template> -->

<script>
import { Pie } from 'vue-chartjs'

export default {
  extends: Pie,
  props: ["chartData", "legendPos"],
  mounted () {
    this.renderChart({
      labels: this.chartData.labels,
      datasets: [
        {
          backgroundColor: [
            '#41B883',
            '#E46651',
            '#00D8FF',
            '#DD1B16'
          ],
          data: this.chartData.rawData,
          // borderWidth: [0,0,0,0],
          borderColor: ['rgba(0,0,0,0)', 'rgba(0,0,0,0)', 'rgba(0,0,0,0)', 'rgba(0,0,0,0)'],
          hoverBorderColor: ['#41B883',
            '#E46651',
            '#00D8FF',
            '#DD1B16'],
          hoverBorderWidth: [2,2,2,2],
        }
      ]
    },
    {
      responsive: true,
      maintainAspectRatio: false,
      legend: {
        // display: false,
        position: this.legendPos,
        labels: {
          fontColor: this.$vuetify.theme.text,
        },
      },
      animation: {
        animateScale: true,
      },
    })
  }
}
</script>
