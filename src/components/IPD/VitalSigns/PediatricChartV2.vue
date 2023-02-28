<template>
  <div class="col mb-20">
    <line-chart
      v-if="dates.length > 0 && totalLstBreathRate.length > 0 && ChartType === 'Breath'"
      :series="series"
      :chartOptionsArea="chartOptionsArea"
      :chartOptionsBrush="chartOptionsBrush"
    />
    <line-chart
      v-if="dates.length > 0 && totalLstPulse.length > 0 && ChartType === 'Pulse'"
      :series="series1"
      :chartOptionsArea="chartOptionsArea1"
      :chartOptionsBrush="chartOptionsBrush1"
    />
    <line-chart
      v-if="dates.length > 0 && totalLstTemperature.length > 0 && ChartType === 'Temperature'"
      :series="series2"
      :chartOptionsArea="chartOptionsArea2"
      :chartOptionsBrush="chartOptionsBrush2"
    />
  </div>
</template>
<script>
/* eslint-disable */
import LineChart from '@/components/chart/AplexChart.vue'
import moment from 'moment'
export default {
  name: 'PageChart',
  props: {
    DataChart: {
      type: Object,
      default: () => {}
    },
    ChartType: {
      type: String,
      default: ''
    }
  },
  components: { LineChart },
  data () {
    return {
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
      },
      params: {
        IPDId: '',
        FormCode: this.FormCode,
        Assessor: this.$store.state.account.Username,
        FromDate: moment().subtract(7, 'day').startOf('day').format('HH:mm DD/MM/YYYY'),
        ToDate: moment().format('HH:mm DD/MM/YYYY')
      }
    }
  },
  mounted () {
    this.init()
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
      console.log('getData ~ PediatricChart')
      this.loaded = true
      this.getDataChart()
    },
    getDataChart () {
      if (this.DataChart) {
        this.DataChart.NhipThoMEWS.reverse()
        this.DataChart.MachMEWS.reverse()
        this.DataChart.ThanNhietMEWS.reverse()
        this.dates = this.DataChart.NhipThoMEWS.map(d => d.TransactionDate)
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
