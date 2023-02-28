<script>
import { Line } from 'vue-chartjs'
import ChartDataLabels from 'chartjs-plugin-datalabels'
export default {
  plugins: [ChartDataLabels],
  extends: Line,
  props: {
    label: {
      type: String
    },
    totalLstBreathRate: {
      type: Array
    },
    totalLstPulse: {
      type: Array
    },
    totalLstTemperature: {
      type: Array
    },
    options: {
      type: Object
    },
    chartColors: {
      type: Object
    },
    dates: {
      type: Array
    },
    subLabels: {
      type: Array
    },
    dataNhipTho: {
      type: Array
    },
    dataMach: {
      type: Array
    },
    dataThanNhiet: {
      type: Array
    },
    type: {
      type: String
    },
    height: {
      type: Number,
      default: 200
    }
  },
  watch: {
    dates (val) {
      if (val.length > 0) {
        this.init()
      }
    }
  },
  data () {
    return {

    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      if (this.type === 'BreathRate') {
        this.renderChart(
          {
            labels: this.dates,
            subLabels: this.subLabels,
            dataNhipTho: this.dataNhipTho,
            datasets: [
              {
                label: this.__t('AdultVitalSigns.Chart.label2'),
                data: this.totalLstBreathRate,
                borderColor: '#4BC0C0',
                pointBorderColor: '#4BC0C0',
                pointBackgroundColor: 'white',
                backgroundColor: 'rgba(0, 0, 0, 0)',
                tension: 0,
                datalabels: {
                  borderRadius: 4,
                  padding: 6,
                  align: 'end',
                  anchor: 'end',
                  font: {
                    weight: 'bold'
                  },
                  labels: {
                    value: {
                      backgroundColor: '#4BC0C0',
                      color: 'white'
                    }
                  }
                }
              }
            ]
          },
          this.options
        )
      }
      if (this.type === 'Pulse') {
        this.renderChart(
          {
            labels: this.dates,
            subLabels: this.subLabels,
            dataMach: this.dataMach,
            datasets: [
              {
                label: this.__t('AdultVitalSigns.Chart.label3'),
                data: this.totalLstPulse,
                borderColor: '#FF3784',
                pointBorderColor: '#FF3784',
                pointBackgroundColor: 'white',
                backgroundColor: 'rgba(0, 0, 0, 0)',
                tension: 0,
                datalabels: {
                  borderRadius: 4,
                  padding: 6,
                  align: 'end',
                  anchor: 'end',
                  labels: {
                    value: {
                      backgroundColor: '#FF3784',
                      color: 'white'
                    }
                  }
                }
              }
            ]
          },
          this.options
        )
      }
      if (this.type === 'Temperature') {
        this.renderChart(
          {
            labels: this.dates,
            subLabels: this.subLabels,
            dataThanNhiet: this.dataThanNhiet,
            datasets: [
              {
                label: this.__t('AdultVitalSigns.Chart.label6'),
                data: this.totalLstTemperature,
                borderColor: 'rgba(243, 156, 18, 0.8)',
                pointBorderColor: 'rgba(243, 156, 18, 0.8)',
                pointBackgroundColor: 'white',
                backgroundColor: 'rgba(0, 0, 0, 0)',
                tension: 0,
                datalabels: {
                  borderRadius: 4,
                  padding: 6,
                  align: 'end',
                  anchor: 'end',
                  font: {
                    weight: 'bold'
                  },
                  labels: {
                    value: {
                      backgroundColor: 'rgba(243, 156, 18, 0.8)',
                      color: 'white'
                    }
                  }
                }
              }
            ]
          },
          this.options
        )
      }
    }
  }
}
</script>
