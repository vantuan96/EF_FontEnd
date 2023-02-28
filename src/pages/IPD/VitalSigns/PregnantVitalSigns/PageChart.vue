<template>
  <div id="PageChart-Page" class="page-chart">
    <div v-show="loaded" class="box-content">
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
    <div v-show="!loaded" class="loading-text"><v-loading/></div>
  </div>
</template>
<script>
import IPDPregnantVitalSign from '@/services/IPD/PregnantVitalSign'
import LineChart from '@/components/chart/ChartJS.vue'
import moment from 'moment'
import EventBus from '@/lib/eventBus'
export default {
  name: 'PageChart',
  components: { LineChart },
  props: {
    viewOnly: false,
    VisitId: {
      type: String,
      default: ''
    }
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
        IPDId: '',
        FormCode: this.FormCode,
        Assessor: this.viewOnly ? null : this.$store.state.account.Username,
        FromDate: moment().subtract(7, 'day').startOf('day').format('HH:mm DD/MM/YYYY'),
        ToDate: moment().format('HH:mm DD/MM/YYYY')
      }
    }
  },
  mounted () {
    this.init()
    EventBus.$on('reloadPregnantChart', this.init)
    EventBus.$on('reloadTablePregnantVitalSigns', this.init)
  },
  beforeDestroy () {
    EventBus.$off('reloadPregnantChart')
    EventBus.$off('reloadTablePregnantVitalSigns')
  },
  methods: {
    init (val) {
      this.loaded = false
      if (this.viewOnly) {
        this.params = {
          ...this.params,
          Assessor: ''
        }
      }
      if (val) {
        this.params = {
          Assessor: val.Assessor,
          FromDate: val.FromDate,
          ToDate: val.ToDate
        }
      }
      if (!this.$route.params.Id) return
      new IPDPregnantVitalSign(this.params).find('GetByVisitId/' + this._VisitId).then(response => {
        if (response) {
          this.loaded = true
          this.getDataChart(response)
        }
      }).catch(e => {
        this.loaded = true
        if (e.status === 404) {}
      })
    },
    getDataChart (response) {
      this.DataChart = response
      if (this.DataChart) {
        this.dates = this.DataChart.NhipThoMEWS.map(d => moment(d.TransactionDate).format('HH:mm DD/MM/YYYY'))
        this.labelsNhipTho = this.DataChart.NhipThoMEWS.map(d => d.MEWRate)
        this.labelsMach = this.DataChart.MachMEWS.map(d => d.MEWRate)
        this.labelsThanNhiet = this.DataChart.ThanNhietMEWS.map(d => d.MEWRate)
        this.totalLstBreathRate = this.DataChart.NhipThoMEWS.map(d => {
          if (d.MEWValue === '') {
            return null
          } else {
            return d.MEWValue
          }
        })
        this.dataNhipTho = this.DataChart.NhipThoMEWS.map(d => {
          if (d.MEWRate === '') {
            return {
              MEWRate: null + ' lần/phút',
              CreatedBy: d.CreatedBy
            }
          } else {
            return {
              MEWRate: d.MEWRate + ' lần/phút',
              CreatedBy: d.CreatedBy
            }
          }
        })

        this.totalLstPulse = this.DataChart.MachMEWS.map(d => {
          if (d.MEWValue === '') {
            return null
          } else {
            return d.MEWValue
          }
        })
        this.dataMach = this.DataChart.MachMEWS.map(d => {
          if (d.MEWRate === '') {
            return {
              MEWRate: null + ' nhịp/phút',
              CreatedBy: d.CreatedBy
            }
          } else {
            return {
              MEWRate: d.MEWRate + ' nhịp/phút',
              CreatedBy: d.CreatedBy
            }
          }
        })

        this.totalLstTemperature = this.DataChart.ThanNhietMEWS.map(d => {
          if (d.MEWValue === '') {
            return null
          } else {
            return d.MEWValue
          }
        })
        this.dataThanNhiet = this.DataChart.ThanNhietMEWS.map(d => {
          if (d.MEWRate === null) {
            return {
              MEWRate: null + ' oC',
              CreatedBy: d.CreatedBy
            }
          } else {
            return {
              MEWRate: d.MEWRate + ' oC',
              CreatedBy: d.CreatedBy
            }
          }
        })
      }
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
