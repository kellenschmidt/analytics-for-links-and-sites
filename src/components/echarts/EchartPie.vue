<template>
    <section>
      <figure>
        <chart
          :options="pie"
          auto-resize
          theme="ovilia-green"
          :class="[{ small: this.size == 'small' }, mx-auto]"
          
        />
      </figure>
    </section>
</template>

<script>
import ECharts from 'vue-echarts/components/ECharts'

import 'echarts/lib/chart/pie'

// built-in theme
// import 'echarts/theme/dark'
// import 'echarts/theme/infographic'
// import 'echarts/theme/macarons'
// import 'echarts/theme/roma'
// import 'echarts/theme/shine'
// import 'echarts/theme/vintage'

// custom theme
import theme from './theme.json'

// registering custom theme
ECharts.registerTheme('ovilia-green', theme)

export default {
  components: {
    chart: ECharts
  },
  props: ["chartData", "size"],
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
          // left: 'left',
          bottom: true,
          // height: '100%',
          // itemGap: 50,
          // top: true,
          // right: true,
          // data: ['React', 'Vue', 'Angular', 'jQuery', 'Ember']
          // padding: [
          //   0,  // up
          //   0, // right
          //   10,  // down
          //   0, // left
          // ]
        },
        textStyle: {
          fontSize: this.size == 'big' ? 17 : 13,
        },
        series: [
          {
            name: 'data-name',
            type: 'pie',
            // radius: '60%',
            // center: ['20%', '50%'],
            data: this.chartData,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            },
            label: {
              position: this.size == 'big' ? 'outside' : 'inside'
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

