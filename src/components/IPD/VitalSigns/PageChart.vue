<template>
  <div id="PageChart-Page" class="page-chart">
    <div v-show="loaded" class="box-content">
      <div class="box-chart">
        <div class="row mt-5">
          <div class="col">
            <line-chart
            v-if="dates.length > 0 && totalLstBreathRate.length > 0 && totalLstPulse.length > 0 && totalLstTemperature.length > 0"
              :totalLstBreathRate="totalLstBreathRate"
              :totalLstPulse="totalLstPulse"
              :totalLstTemperature="totalLstTemperature"
              :dataNhipTho="dataNhipTho"
              :dataMach="dataMach"
              :dataThanNhiet="dataThanNhiet"
              :options="chartOptions"
              :chartColors="positiveChartColors"
              :dates="dates"
              label="Tổng News"
            />
          </div>
        </div>
      </div>
    </div>
    <div v-show="!loaded" class="loading-text"><v-loading/></div>
  </div>
</template>
<script>
import IPDNeonatalVitalSign from '@/services/IPD/NeonatalVitalSigns'
import LineChart from '@/components/chart/Chart.vue'
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
    },
    FormType: {
      type: String,
      default: 'IPDNeonatalVitalSign'
    },
    FormCode: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      loaded: false,
      DataChart: {},
      totalLstBreathRate: [],
      totalLstPulse: [],
      totalLstTemperature: [],
      dates: [],
      dataNhipTho: [],
      dataMach: [],
      dataThanNhiet: [],
      positiveChartColors: {
        borderColor: '#EB5E81',
        pointBorderColor: '#F7003D',
        pointBackgroundColor: '#F7003D',
        backgroundColor: 'rgba(0, 0, 0, 0)'
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
              callback: function (value) { if (value % 1 === 0) { return value } }
              // callback: (value, index, values) => {
              //   return `£ ${value} test`
              // }
            }
          }]
        },
        tooltips: {
          enabled: true,
          callbacks: {
            label: function (tooltipItem, data) {
              let label = ''
              if (tooltipItem.datasetIndex === 0) {
                label = data.datasets[tooltipItem.datasetIndex].label + ': ' + data.dataNhipTho[tooltipItem.index]
              }
              if (tooltipItem.datasetIndex === 1) {
                label = data.datasets[tooltipItem.datasetIndex].label + ': ' + data.dataMach[tooltipItem.index]
              }
              if (tooltipItem.datasetIndex === 2) {
                label = data.datasets[tooltipItem.datasetIndex].label + ': ' + data.dataThanNhiet[tooltipItem.index]
              }
              return label
            }
          }
        }
      },
      params: {
        Assessor: this.$store.state.account.Username,
        FromDate: moment().subtract(7, 'day').startOf('day').format('HH:mm DD/MM/YYYY'),
        ToDate: moment().format('HH:mm DD/MM/YYYY')
      }
    }
  },
  mounted () {
    this.init()
    EventBus.$on('reloadChart', this.init)
    EventBus.$on('reloadTableNeonatalVitalSigns', this.init)
  },
  beforeDestroy () {
    EventBus.$off('reloadChart')
    EventBus.$off('reloadTableNeonatalVitalSigns')
  },
  methods: {
    init (val) {
      console.log('PageChart ~ getData')
      this.loaded = false
      if (this.viewOnly) {
        this.params = {
          Assessor: '',
          FromDate: '',
          ToDate: ''
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
      if (this.FormType === 'IPDNeonatalVitalSign') {
        new IPDNeonatalVitalSign(this.params).find('GetByVisitId/' + this._VisitId).then(response => {
          if (response) {
            this.loaded = true
            this.getDataChart(response)
          }
        }).catch(e => {
          this.loaded = true
          if (e.status === 404) {}
        })
      }
    },
    getDataChart (response) {
      this.DataChart = response
      if (this.DataChart) {
        this.dates = this.DataChart.NhipThoMEWS.map(d => moment(d.TransactionDate).format('HH:mm DD/MM/YYYY'))
        this.totalLstBreathRate = this.DataChart.NhipThoMEWS.map(d => d.MEWValue)
        this.dataNhipTho = this.DataChart.NhipThoMEWS.map(d => d.MEWRate + ' lần/phút')

        this.totalLstPulse = this.DataChart.MachMEWS.map(d => d.MEWValue)
        this.dataMach = this.DataChart.MachMEWS.map(d => d.MEWRate + ' nhịp/phút')

        this.totalLstTemperature = this.DataChart.ThanNhietMEWS.map(d => d.MEWValue)
        this.dataThanNhiet = this.DataChart.ThanNhietMEWS.map(d => d.MEWRate + ' oC')
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
