<template>
  <div id="PageChart-Page" class="page-chart">
    <div class="box-content">
      <div class="box-chart">
        <div class="row mt-5">
          <div class="col mb-20">
            <line-chart
              v-if="dates.length > 0 && totalLstBreathRate.length > 0"
              :totalLstBreathRate="totalLstBreathRate"
              :dataNhipTho="dataNhipTho"
              :options="chartOptions"
              :chartColors="positiveChartColors"
              :dates="dates"
              :subLabels="labelsNhipTho"
              :type="'BreathRate'"
              label="Tổng Pews"
            />
          </div>
          <div class="col mb-20">
            <line-chart
              v-if="dates.length > 0 && totalLstPulse.length > 0"
              :totalLstPulse="totalLstPulse"
              :dataMach="dataMach"
              :options="chartOptions1"
              :chartColors="positiveChartColors"
              :dates="dates"
              :subLabels="labelsMach"
              :type="'Pulse'"
              label="Tổng Pews"
            />
          </div>
          <div class="col mb-20">
            <line-chart
              v-if="dates.length > 0 && totalLstTemperature.length > 0"
              :totalLstTemperature="totalLstTemperature"
              :dataThanNhiet="dataThanNhiet"
              :options="chartOptions2"
              :chartColors="positiveChartColors"
              :dates="dates"
              :subLabels="labelsThanNhiet"
              :type="'Temperature'"
              label="Tổng Pews"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import LineChart from '@/components/chart/ChartJS.vue'
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
  watch: {
  },
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
      positiveChartColors: {
        borderColor: '#EB5E81',
        pointBorderColor: '#F7003D',
        pointBackgroundColor: '#F7003D',
        backgroundColor: 'rgba(0, 0, 0, 0)'
      },
      loaded: false,
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
              min: 0,
              max: 3.9,
              stepValue: 1,
              callback: function (value) { if (value % 1 === 0) { return value } }
            }
          }]
        },
        tooltips: {
          enabled: true,
          callbacks: {
            label: function (tooltipItem, data) {
              let label = ''
              label = `Người thực hiện: ${data.dataNhipTho[tooltipItem.index].CreatedBy}`
              return label
            }
          }
        },
        legend: {
          display: true,
          position: 'top'
        },
        title: {
          display: true,
          text: 'Ngày/ giờ thực hiện',
          position: 'bottom'
        },
        plugins: {
          datalabels: {
            formatter: function (value, context) {
              return context.chart.data.subLabels[context.dataIndex]
            }
          }
        }
      },
      chartOptions1: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
              min: 0,
              max: 3.9,
              stepValue: 1,
              callback: function (value) { if (value % 1 === 0) { return value } }
            }
          }]
        },
        tooltips: {
          enabled: true,
          callbacks: {
            label: function (tooltipItem, data) {
              let label = ''
              label = `Người thực hiện: ${data.dataMach[tooltipItem.index].CreatedBy}`
              return label
            }
          }
        },
        legend: {
          display: true,
          position: 'top'
        },
        title: {
          display: true,
          text: 'Ngày/ giờ thực hiện',
          position: 'bottom'
        },
        plugins: {
          datalabels: {
            formatter: function (value, context) {
              return context.chart.data.subLabels[context.dataIndex]
            }
          }
        }
      },
      chartOptions2: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
              min: 0,
              max: 3.9,
              stepValue: 1,
              callback: function (value) { if (value % 1 === 0) { return value } }
            }
          }]
        },
        tooltips: {
          enabled: true,
          callbacks: {
            label: function (tooltipItem, data) {
              let label = ''
              label = `Người thực hiện: ${data.dataThanNhiet[tooltipItem.index].CreatedBy}`
              return label
            }
          }
        },
        legend: {
          display: true,
          position: 'top'
        },
        title: {
          display: true,
          text: 'Ngày/ giờ thực hiện',
          position: 'bottom'
        },
        plugins: {
          datalabels: {
            formatter: function (value, context) {
              return context.chart.data.subLabels[context.dataIndex]
            }
          }
        }
      },
      params: {
        FormCode: this.FormCode,
        CreatedBy: this.viewOnly ? null : this.$store.state.account.Username,
        DateFrom: moment().subtract(7, 'day').startOf('day').format('HH:mm DD/MM/YYYY'),
        DateTo: moment().format('HH:mm DD/MM/YYYY')
      }
    }
  },
  mixins: [],
  components: { LineChart },
  created: {
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
    init (val) {
      if (this.viewOnly) {
        this.params = {
          ...this.params,
          CreatedBy: ''
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
        this.dates = this.DataChart.LstBreathRate.map(d => d.CreatedAt)
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
    }
  },

  computed: {
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
