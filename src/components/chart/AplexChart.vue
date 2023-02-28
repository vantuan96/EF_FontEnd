<template>
  <div id="charts">
    <div id="chart1">
      <apexchart
        type="line"
        height="200"
        :options="chartOptionsArea"
        :series="series"
      />
    </div>
    <div v-if="hasBrushChart" id="chart2">
      <apexchart
        type="area"
        height="130"
        :options="chartOptionsBrush"
        :series="series"
      />
    </div>
  </div>
</template>

<script>
import VueApexCharts from 'vue-apexcharts'

export default {
  name: 'Chart',
  components: {
    apexchart: VueApexCharts
  },
  props: {
    series: null,
    chartOptionsArea: null,
    chartOptionsBrush: null,
    hasBrushChart: true
  }
}
</script>

<style scoped>
#chart1,
#chart2 {
  max-width: 100%;
  /* margin: 35px auto; */
}

#chart2 {
  position: relative;
  margin-top: -70px;
  margin-bottom: 0px;
}

#app {
  padding-top: 20px;
  padding-left: 10px;
  background: #fff;
  border: 1px solid #ddd;
  box-shadow: 0 22px 35px -16px rgba(0, 0, 0, 0.1);
  max-width: 100%;
  margin: 35px auto;
}
</style>
