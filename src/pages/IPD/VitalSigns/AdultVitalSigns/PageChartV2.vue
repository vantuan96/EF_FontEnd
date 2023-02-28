<template>
  <div id="PageChart-Page" class="page-chart">
    <div class="box-content">
      <div class="box-chart">
        <div class="row mt-5">
          <template class="col mb-20">
            <line-chart
              v-if="dates.length > 0 && totalLstBreathRate.length > 0"
              :series="series"
              :chartOptionsArea="chartOptionsArea"
              :chartOptionsBrush="chartOptionsBrush"
            />
          </template>
          <template class="col mb-20">
            <line-chart
              v-if="dates.length > 0 && totalLstPulse.length > 0"
              :series="series1"
              :chartOptionsArea="chartOptionsArea1"
              :chartOptionsBrush="chartOptionsBrush1"
            />
          </template>
          <div class="col mb-20">
            <line-chart
              v-if="dates.length > 0 && totalLstTemperature.length > 0"
              :series="series2"
              :chartOptionsArea="chartOptionsArea2"
              :chartOptionsBrush="chartOptionsBrush2"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
/* eslint-disable */
import LineChart from '@/components/chart/AplexChart.vue'
import GetLineChartVitalSignAdult from '@/services/IPD/AdultVitalSigns/GetLineChartVitalSignAdult'
import EventBus from '@/lib/eventBus'
import moment from 'moment'
export default {
  name: 'PageChart',
  props: {
    parameters: {},
    viewOnly: false,
    VisitId: ''
  },
  components: { LineChart },
  data () {
    return {
      DataChart: {},
      totalLstBreathRate: [],
      totalLstPulse: [],
      totalLstTemperature: [],
      dates: [],
      labelsMach: [],
      labelsNhipTho: [],
      labelsThanNhiet: [],
      dataNhipTho: [],
      dataMach: [],
      dataThanNhiet: [],
      series: [
        {
          name: 'Nhịp thở',
          data: []
        }
      ],
      chartOptionsArea: {
        chart: {
          id: 'chartAreaNhipTho',
          toolbar: {
            autoSelected: 'pan',
            show: false
          }
        },
        colors: ['#4BC0C0'],
        stroke: {
          width: 3
        },
        dataLabels: {
          enabled: true
        },
        fill: {
          opacity: 1
        },
        markers: {
          size: 0
        },
        legend: {
          show: true,
          position: 'top'
        },
        yaxis: {
          title: {
            text: 'MEWS - Nhịp thở',
            style: {
              fontWeight: 'bold',
              fontFamily: 'Helvetica Neue Light,HelveticaNeue-Light,Helvetica Neue,Calibri,Helvetica,Arial'
            }
          }
        },
        xaxis: {
          type: 'datetime',
          title: {
            text: 'Ngày/ giờ thực hiện',
            style: {
              fontWeight: 'bold',
              fontFamily: 'Helvetica Neue Light,HelveticaNeue-Light,Helvetica Neue,Calibri,Helvetica,Arial'
            }
          },
          labels: {
            formatter: function (value) {
              return moment(value).format('HH:mm DD/MM/YYYY')
            }
          }
        }
      },
      chartOptionsBrush: {
        chart: {
          id: 'chartBrushNhipTho',
          brush: {
            target: 'chartAreaNhipTho',
            enabled: true
          },
          selection: {
            enabled: true
          }
        },
        colors: ['#4BC0C0'],
        fill: {
          gradient: {
            enabled: true,
            opacityFrom: 0.91,
            opacityTo: 0.1
          }
        },
        xaxis: {
          type: 'datetime',
          labels: {
            formatter: function (value) {
              return moment(value).format('HH:mm DD/MM/YYYY')
            }
          },
          tooltip: {
            enabled: true
          }
        },
        yaxis: {
          tickAmount: 2
        }
      },
      series1: [
        {
          name: 'Mạch',
          data: []
        }
      ],
      chartOptionsArea1: {
        chart: {
          id: 'chartAreaMach',
          toolbar: {
            autoSelected: 'pan',
            show: false
          }
        },
        colors: ['#FF3784'],
        stroke: {
          width: 3
        },
        dataLabels: {
          enabled: true
        },
        fill: {
          opacity: 1
        },
        markers: {
          size: 0
        },
        legend: {
          show: true,
          position: 'top'
        },
        yaxis: {
          title: {
            text: 'MEWS - Mạch',
            style: {
              fontWeight: 'bold',
              fontFamily: 'Helvetica Neue Light,HelveticaNeue-Light,Helvetica Neue,Calibri,Helvetica,Arial'
            }
          }
        },
        xaxis: {
          type: 'datetime',
          title: {
            text: 'Ngày/ giờ thực hiện',
            style: {
              fontWeight: 'bold',
              fontFamily: 'Helvetica Neue Light,HelveticaNeue-Light,Helvetica Neue,Calibri,Helvetica,Arial'
            }
          },
          labels: {
            formatter: function (value) {
              return moment(value).format('HH:mm DD/MM/YYYY')
            }
          }
        }
      },
      chartOptionsBrush1: {
        chart: {
          id: 'chartBrushMach',
          brush: {
            target: 'chartAreaMach',
            enabled: true
          },
          selection: {
            enabled: true
          }
        },
        colors: ['#FF3784'],
        fill: {
          gradient: {
            enabled: true,
            opacityFrom: 0.91,
            opacityTo: 0.1
          }
        },
        xaxis: {
          type: 'datetime',
          labels: {
            formatter: function (value) {
              return moment(value).format('HH:mm DD/MM/YYYY')
            }
          },
          tooltip: {
            enabled: true
          }
        },
        yaxis: {
          tickAmount: 2
        }
      },
      series2: [
        {
          name: 'Thân nhiệt',
          data: []
        }
      ],
      chartOptionsArea2: {
        chart: {
          id: 'chartAreaThanNhiet',
          toolbar: {
            autoSelected: 'pan',
            show: false
          }
        },
        colors: ['rgba(243, 156, 18, 0.8)'],
        stroke: {
          width: 3
        },
        dataLabels: {
          enabled: true
        },
        fill: {
          opacity: 1
        },
        markers: {
          size: 0
        },
        legend: {
          show: true,
          position: 'top'
        },
        yaxis: {
          title: {
            text: 'MEWS - Thân nhiệt',
            style: {
              fontWeight: 'bold',
              fontFamily: 'Helvetica Neue Light,HelveticaNeue-Light,Helvetica Neue,Calibri,Helvetica,Arial'
            }
          }
        },
        xaxis: {
          type: 'datetime',
          title: {
            text: 'Ngày/ giờ thực hiện',
            style: {
              fontWeight: 'bold',
              fontFamily: 'Helvetica Neue Light,HelveticaNeue-Light,Helvetica Neue,Calibri,Helvetica,Arial'
            }
          },
          labels: {
            formatter: function (value) {
              return moment(value).format('HH:mm DD/MM/YYYY')
            }
          }
        }
      },
      chartOptionsBrush2: {
        chart: {
          id: 'chartBrushThanNhiet',
          brush: {
            target: 'chartAreaThanNhiet',
            enabled: true
          },
          selection: {
            enabled: true
          }
        },
        colors: ['rgba(243, 156, 18, 1)'],
        fill: {
          gradient: {
            enabled: true,
            opacityFrom: 0.91,
            opacityTo: 0.1
          }
        },
        xaxis: {
          type: 'datetime',
          labels: {
            formatter: function (value) {
              return moment(value).format('HH:mm DD/MM/YYYY')
            }
          },
          tooltip: {
            enabled: true
          }
        },
        yaxis: {
          tickAmount: 2
        }
      }
    }
  },
  mounted () {
    this.init()
    EventBus.$on('reloadChartAdultVitalSigns', this.init)
    EventBus.$on('reloadTableAdultVitalSigns', this.init)
  },
  beforeDestroy () {
    EventBus.$off('reloadChartAdultVitalSigns')
    EventBus.$off('reloadTableAdultVitalSigns')
  },
  methods: {
    updateChart () {
      let dates = this.dates
      let totalLstBreathRate = this.totalLstBreathRate, totalLstPulse = this.totalLstPulse, totalLstTemperature = this.totalLstTemperature
      let result = [], result1 = [], result2 = []
      let labelsNhipTho = this.labelsNhipTho, labelsMach = this.labelsMach, labelsThanNhiet = this.labelsThanNhiet
      let labelTooltip = this.dataNhipTho

      // Nhip tho
      for (let i = 0; i < Math.min(dates.length, totalLstBreathRate.length); i++) {
        result.push([new Date(dates[i]).getTime(), totalLstBreathRate[i]])
      }
      this.series = [{
        name: '',
        data: result
      }]
      this.chartOptionsArea = { ...this.chartOptionsArea,
        ...{
          dataLabels: {
            enabled: true,
            formatter: function (val, opt) {
              return labelsNhipTho[opt.dataPointIndex]
            }
          },
          tooltip: {
            y: {
              formatter: function (value, { series, seriesIndex, dataPointIndex, w }) {
                return 'Người thực hiện: ' + labelTooltip[seriesIndex].CreatedBy
              }
            }
          }
        }
      }
      this.chartOptionsBrush = { ...this.chartOptionsBrush,
        ...{
          selection: {
            enabled: true,
            xaxis: {
              min: new Date(this.dates[0]).getTime(),
              max: new Date(this.dates.length - 1).getTime()
            }
          }
        }
      }
      // Mach
      for (let i = 0; i < Math.min(dates.length, totalLstPulse.length); i++) {
        result1.push([new Date(dates[i]).getTime(), totalLstPulse[i]])
      }
      this.series1 = [{
        name: '',
        data: result1
      }]
      this.chartOptionsArea1 = { ...this.chartOptionsArea1,
        ...{
          dataLabels: {
            enabled: true,
            formatter: function (val, opt) {
              return labelsMach[opt.dataPointIndex]
            }
          },
          tooltip: {
            y: {
              formatter: function (value, { series, seriesIndex, dataPointIndex, w }) {
                return 'Người thực hiện: ' + labelTooltip[seriesIndex].CreatedBy
              }
            }
          }
        }
      }
      this.chartOptionsBrush1 = { ...this.chartOptionsBrush1,
        ...{
          selection: {
            enabled: true,
            xaxis: {
              min: new Date(this.dates[0]).getTime(),
              max: new Date(this.dates.length - 1).getTime()
            }
          }
        }
      }
      // Than nhiet
      for (let i = 0; i < Math.min(dates.length, totalLstTemperature.length); i++) {
        result2.push([new Date(dates[i]).getTime(), totalLstTemperature[i]])
      }
      this.series2 = [{
        name: '',
        data: result2
      }]
      this.chartOptionsArea2 = { ...this.chartOptionsArea2,
        ...{
          dataLabels: {
            enabled: true,
            formatter: function (val, opt) {
              return labelsThanNhiet[opt.dataPointIndex]
            }
          },
          tooltip: {
            y: {
              formatter: function (value, { series, seriesIndex, dataPointIndex, w }) {
                return 'Người thực hiện: ' + labelTooltip[seriesIndex].CreatedBy
              }
            }
          }
        }
      }
      this.chartOptionsBrush2 = { ...this.chartOptionsBrush2,
        ...{
          selection: {
            enabled: true,
            xaxis: {
              min: new Date(this.dates[0]).getTime(),
              max: new Date(this.dates.length - 1).getTime()
            }
          }
        }
      }
    },
    init (val) {
      if (this.viewOnly) {
        this.params = {
          CreatedBy: '',
          DateFrom: '',
          DateTo: ''
        }
      }
      if (val) {
        this.params = {
          CreatedBy: val.CreatedBy,
          DateFrom: val.DateFrom,
          DateTo: val.DateTo
        }
      }
      if (!this._VisitId) return
      new GetLineChartVitalSignAdult().hideErrorMsg()
        .update(this._VisitId, this.params)
        .then((res) => {
          this.getDataChart(res)
        })
    },
    getDataChart (res) {
      this.DataChart = res
      if (this.DataChart) {
        this.dates = this.DataChart.LstBreathRate.map(d => moment(d.CreatedAt, 'HH:mm DD/MM/YYYY').format())
        this.labelsNhipTho = this.DataChart.LstBreathRate.map(d => d.BreathRate)
        this.labelsMach = this.DataChart.LstPulse.map(d => d.Pulse)
        this.labelsThanNhiet = this.DataChart.LstTemperature.map(d => d.Temperature)
        this.totalLstBreathRate = this.DataChart.LstBreathRate.map(d => {
          if (d.BreathMEWS === '') {
            return null
          } else {
            return d.BreathMEWS
          }
        })
        this.dataNhipTho = this.DataChart.LstBreathRate.map(d => {
          if (d.BreathRate === '') {
            return {
              BreathRate: null + ' lần/phút',
              CreatedBy: d.CreatedBy
            }
          } else {
            return {
              BreathRate: d.BreathRate + ' lần/phút',
              CreatedBy: d.CreatedBy
            }
          }
        })

        this.totalLstPulse = this.DataChart.LstPulse.map(d => {
          if (d.PulseMEWS === '') {
            return null
          } else {
            return d.PulseMEWS
          }
        })
        this.dataMach = this.DataChart.LstPulse.map(d => {
          if (d.Pulse === '') {
            return {
              Pulse: null + ' nhịp/phút',
              CreatedBy: d.CreatedBy
            }
          } else {
            return {
              Pulse: d.Pulse + ' nhịp/phút',
              CreatedBy: d.CreatedBy
            }
          }
        })

        this.totalLstTemperature = this.DataChart.LstTemperature.map(d => {
          if (d.TemperatureMEWS === '') {
            return null
          } else {
            return d.TemperatureMEWS
          }
        })
        this.dataThanNhiet = this.DataChart.LstTemperature.map(d => {
          if (d.Temperature === null) {
            return {
              Temperature: null + ' oC',
              CreatedBy: d.CreatedBy
            }
          } else {
            return {
              Temperature: d.Temperature + ' oC',
              CreatedBy: d.CreatedBy
            }
          }
        })
      }
      this.updateChart()
    }
  }
}
</script>
<style lang="stylus" scoped>
.page-chart {
  margin-bottom: 30px;
  .box-content {
    .box-chart {
      margin-bottom: 10px;
    }
  }
}
</style>
