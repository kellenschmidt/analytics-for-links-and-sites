<template>
  <div>
    <pie-chart :chart-data="dataCollection" :options="options"></pie-chart>
  </div>
</template>

<script>
  import PieChart from '../charts/PieChart'

  export default {
    components: {
      PieChart
    },
    props: ["chartData", "legendPos", "size"],
    computed: {
      dataCollection: function() {
        return {
          labels: this.chartData.labels,
          datasets: [
            {
              backgroundColor: [
                '#41B883',
                '#E46651',
                '#00D8FF',
                '#DD1B16'
              ],
              borderWidth: [1,1,1,1],
              data: this.chartData.rawData,
              // borderColor: ['rgba(0,0,0,0)', 'rgba(0,0,0,0)', 'rgba(0,0,0,0)', 'rgba(0,0,0,0)'],
              hoverBorderColor: ['#41B883',
                '#E46651',
                '#00D8FF',
                '#DD1B16'],
              hoverBorderWidth: [2,2,2,2],
            }
          ]
        }
      },
      options: function() {
        return {
          responsive: true,
          maintainAspectRatio: false,
          legend: {
            position: this.legendPos,
            labels: {
              fontColor: this.$vuetify.theme.text,
              fontSize: this.size === 'big' ? 24 : 12,
            },
          },
          animation: {
            animateScale: true,
          },
        }
      }
    }
  }
</script>
