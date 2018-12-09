<template>
    <section>
      <figure>
        <chart
          :options="pie"
          auto-resize
          theme="dark-theme"
          :class="[{ small: this.size == 'small' }, 'mx-auto']"
        />
      </figure>
    </section>
</template>

<script>
import ECharts from 'vue-echarts/components/ECharts'
import 'echarts/lib/chart/pie'
import theme from './theme.json'

ECharts.registerTheme('dark-theme', theme)

export default {
  components: {
    chart: ECharts
  },
  props: {
    chartData: Array,
    size: String
  },
  computed: {
    pie: function () {
      return  {
        tooltip: {
          trigger: 'item',
          // formatter: '{a} <br/>{b} : {c} ({d}%)'
          formatter: '{b} : {c} ({d}%)'
        },
        legend: {
          show: false,
          orient: 'horizontal',
          bottom: true,
        },
        textStyle: {
          fontSize: this.size == 'big' ? 17 : 13,
        },
        series: [
          {
            name: 'data-name',
            type: 'pie',
            data: this.chartData,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            },
            label: {
              position: this.size == 'big' ? 'outside' : 'inside',
              color: this.size == 'big' ? '' : '#000',
            }
          }
        ]
      }
    },
  },
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
