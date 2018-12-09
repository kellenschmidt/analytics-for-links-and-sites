<script>
import { Bar } from 'vue-chartjs'

export default {
  extends: Bar,
  props: ["chartData"],
  mounted () {
    this.renderChart({
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      datasets: [
        {
          label: 'Data One',
          backgroundColor: '#f87979',
          // data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11]
          data: this.chartData,
        }
      ]
    },
    {
      responsive: true,
      maintainAspectRatio: false,
      legend: {
        position: 'bottom',
        labels: {
          fontColor: this.$vuetify.theme.text,
        },
      },
      scales: {
            xAxes: [{
                fontColor: this.$vuetify.theme.text,
                backgroundColor: '#ffffff'
            }],
            yAxes: [{
                fontColor: this.$vuetify.theme.text,
                backgroundColor: '#ffffff'
            }]
        }
    })
  }
}
</script>
