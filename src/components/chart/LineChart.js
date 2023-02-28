import { Line, mixins } from 'vue-chartjs'
import ChartDataLabels from 'chartjs-plugin-datalabels'
const { reactiveProp } = mixins
export default {
  extends: Line,
  mixins: [reactiveProp],
  plugins: [ChartDataLabels],
  props: ['options', 'chartData'],
  mounted () {
    this.renderChart(this.chartData,
      {
        responsive: true,
        maintainAspectRatio: false,
        pieceLabel: {
          render: 'value',
          precision: 1
        },
        plugins: {
          datalabels: {
            backgroundColor: function (context) {
              return context.dataset.borderColor
            },
            borderRadius: 4,
            color: 'white',
            font: {
              weight: 'bold'
            }
          }
        },
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              }
            }]
        }
      })
  }
}
