<script>
import { Line } from 'vue-chartjs'

export default {
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
    dataNhipTho: {
      type: Array
    },
    dataMach: {
      type: Array
    },
    dataThanNhiet: {
      type: Array
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
      this.renderChart(
        {
          labels: this.dates,
          dataNhipTho: this.dataNhipTho,
          dataMach: this.dataMach,
          dataThanNhiet: this.dataThanNhiet,
          datasets: [
            {
              label: this.__t('AdultVitalSigns.Chart.label2'),
              data: this.totalLstBreathRate,
              borderColor: 'rgba(245, 39, 243, 0.8)',
              pointBorderColor: 'rgba(210, 23, 209, 0.8)',
              pointBackgroundColor: 'rgba(210, 23, 209, 0.8)',
              backgroundColor: 'rgba(0, 0, 0, 0)',
              tension: 0
            },
            {
              label: this.__t('AdultVitalSigns.Chart.label3'),
              data: this.totalLstPulse,
              borderColor: 'rgba(81, 228, 122, 0.8)',
              pointBorderColor: 'rgba(48, 220, 97, 0.8)',
              pointBackgroundColor: 'rgba(48, 220, 97, 0.8)',
              backgroundColor: 'rgba(0, 0, 0, 0)',
              tension: 0
            },
            {
              label: this.__t('AdultVitalSigns.Chart.label6'),
              data: this.totalLstTemperature,
              borderColor: 'rgba(130, 186, 249, 0.37)',
              pointBorderColor: 'rgba(30, 52, 77, 0.37)',
              pointBackgroundColor: 'rgba(29, 65, 106, 0.37)',
              backgroundColor: 'rgba(0, 0, 0, 0)',
              tension: 0
            }
          ]
        },
        this.options
      )
    }
  }
}
</script>
