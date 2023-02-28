<template>
  <div class="ed-info box-collapse open">
    <div class="ed-customer-title">
      <b>{{__t('OS0.bang_theo_doi')}}</b>
      <button class="btn btn-xs btn-flat btn-primary pull-right" @click="openTable">{{__t('btn.nhap_du_lieu')}}</button>
    </div>
    <div class="box-collapse-content">
      <div id="chart-wrap" v-if="datacollection">
        <line-chart :chart-data="datacollection" :styles="chartStyle"/>
      </div>
    </div>
    <modal name="ObservationTable" transition="pop-out" id="ObservationTable" height="auto" :scrollable="true" :width="modalWidth" :clickToClose="false">
      <div class="box v-model-content-popup">
        <div class="box-header text-center">
          <h3 class="box-title">{{__t('OS0.bang_theo_doi')}}</h3>
        </div>
        <observation-table :EdId='EdId' @close="close"/>
      </div>
    </modal>
  </div>
</template>
<script>
// import _ from 'lodash'
import LineChart from '@/components/chart/LineChart.js'
import ObservationTable from '@/components/ObservationTable.vue'
import ObservationChart from '@/services/ED/ObservationChart'
const MODAL_WIDTH = 970
export default {
  name: 'v-ObservationChart',
  props: ['EdId'],
  components: {
    LineChart, ObservationTable
  },
  data () {
    return {
      modalWidth: MODAL_WIDTH,
      modalHeight: window.innerHeight * 2 / 3,
      datacollection: null
    }
  },
  watch: {
  },
  created () {
    this.fillData()
    this.modalWidth = window.innerWidth < MODAL_WIDTH
      ? '90%'
      : MODAL_WIDTH
  },
  computed: {
    displayLable: function () {
      return this.selected
    },
    chartStyle () {
      return {
        position: 'relative'
      }
    }
  },
  methods: {
    openTable () {
      this.$modal.show('ObservationTable', {
        height: 'auto',
        width: 'auto'
      })
    },
    close () {
      this.$modal.hide('ObservationTable')
      this.fillData()
    },
    fillData () {
      new ObservationChart().find('Chart/' + this.EdId).then(response => {
        this.datacollection = {
          labels: response.Time,
          datasets: [
            {
              label: 'SysBP',
              data: response.SysBP,
              borderColor: '#00a65a',
              fill: false,
              lineTension: 0,
              datalabels: {
                align: 'center',
                anchor: 'center'
              }
            }, {
              label: 'DiaBP',
              data: response.DiaBP,
              borderColor: '#dd4b39',
              fill: false,
              lineTension: 0,
              datalabels: {
                align: 'center',
                anchor: 'center'
              }
            }, {
              label: 'Pulse',
              data: response.Pulse,
              borderColor: '#f39c12',
              fill: false,
              lineTension: 0,
              datalabels: {
                align: 'center',
                anchor: 'center'
              }
            }, {
              label: 'Temperature',
              data: response.Temperature,
              borderColor: '#605ca8',
              fill: false,
              lineTension: 0,
              datalabels: {
                align: 'center',
                anchor: 'center'
              }
            }, {
              label: 'SpO2',
              data: response.SpO2,
              borderColor: '#001F3F',
              fill: false,
              lineTension: 0,
              datalabels: {
                align: 'center',
                anchor: 'center'
              }
            }, {
              label: 'Resp',
              data: response.Resp,
              borderColor: '#39CCCC',
              fill: false,
              lineTension: 0,
              datalabels: {
                align: 'center',
                anchor: 'center'
              }
            }, {
              label: 'RestPainScore',
              data: response.RestPainScore,
              borderColor: '#D81B60',
              fill: false,
              lineTension: 0,
              datalabels: {
                align: 'center',
                anchor: 'center'
              }
            }, {
              label: 'MovePainScore',
              data: response.MovePainScore,
              borderColor: '#00c0ef',
              fill: false,
              lineTension: 0,
              datalabels: {
                align: 'center',
                anchor: 'center'
              }
            }
          ]
        }
      })
    }
  }
}
</script>
