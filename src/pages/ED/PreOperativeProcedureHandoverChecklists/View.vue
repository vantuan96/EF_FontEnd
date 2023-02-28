<template>
  <Vcollapse @getData="getData()" ref="Vcollapse">
    <template slot='title'>
      {{FormV2 ? FormV2.title : __label(Form)}}
    </template>
    <template slot='info'>
      <span class="pull-right" style="padding: 8px;font-size: 14px;">{{__t('Chỉnh sửa lần cuối bởi')}} <AdInfo :ad="FormV2 ? FormV2.UpdatedBy : Form.UpdatedBy" /> {{__t('lúc')}} {{FormV2 ? FormV2.UpdateAt : Form.UpdatedAt}}</span>
    </template>
    <template slot='content' v-if="hasData">
      <ViewOnly v-if="DataSubmit < 9" :viewOnly="true" :MASTERDATA="MASTERDATA" :PreOperativeProcedureHandoverChecklistsData="PreOperativeProcedureHandoverChecklistsData" :SpongeSharpsAndInstrumentsCountsSheetsData="SpongeSharpsAndInstrumentsCountsSheetsData" />
      <ViewOnlyV2 v-else :viewOnly="true" :MASTERDATA="MASTERDATA" :PreOperativeProcedureHandoverChecklistsData="PreOperativeProcedureHandoverChecklistsData" :SpongeSharpsAndInstrumentsCountsSheetsData="SpongeSharpsAndInstrumentsCountsSheetsData" />
    </template>
  </Vcollapse>
</template>
<script>
/*
api/ED/ExternalTransportationAssessment/{id}
api/ED/ExternalTransportationAssessment/Create/{id}
api/ED/ExternalTransportationAssessment/{id}
api/ED/ExternalTransportationAssessment/Confirm/{id}
GENTDBM : thang điểm
EIOAEFET: form
*/
import EIOService from '@/services/IPD/EIOService'
import PreOperativeProcedureHandoverChecklists from '@/services/ED/PreOperativeProcedureHandoverChecklists'
import SpongeSharpsAndInstrumentsCountsSheets from '@/services/ED/SpongeSharpsAndInstrumentsCountsSheets'
import MixinMasterData from '@/mixins/masterdata.js'
import ViewOnly from '@/components/ED/PRINT_PHC.vue'
import ViewOnlyV2 from '@/components/ED/PRINT_PHC_V2.vue'
import moment from 'moment'
import _ from 'lodash'
export default {
  name: 'IPDPHC',
  props: ['VisitId', 'Form', 'VisitType', 'FormV2'],
  mixins: [MixinMasterData],
  data () {
    return {
      hasData: false,
      PreOperativeProcedureHandoverChecklistsData: {},
      SpongeSharpsAndInstrumentsCountsSheetsData: {},
      DataSubmit: {}
    }
  },
  components: {
    ViewOnly,
    ViewOnlyV2
  },
  mounted () {
    this.getVersion()
  },
  computed: {
  },
  watch: {
  },
  methods: {
    getVersion () {
      new EIOService().find('EMRForm/GetVersionByVisit/' + this._VisitId + '/' + this._VisitType).then(response => {
        this.DataSubmit = response.Version
      }).catch((e) => {
        console.log(e)
      })
    },
    getSpongeSharpsAndInstrumentsCountsSheetsData () {
      new SpongeSharpsAndInstrumentsCountsSheets({}, this._VisitType).find(this._VisitId).then(response => {
        this.SpongeSharpsAndInstrumentsCountsSheetsData = response
        if (!this.SpongeSharpsAndInstrumentsCountsSheetsData.DateTimeSheet) {
        } else {
          this.SpongeSharpsAndInstrumentsCountsSheetsData.DateTimeSheet = moment(this.SpongeSharpsAndInstrumentsCountsSheetsData.DateTimeSheet, this.vDateTimeFormat)
        }
        for (const property in this.MASTERDATA) {
          if (this.MASTERDATA[property].Items && this.MASTERDATA[property].Group === 'SSA') {
            this.MASTERDATA[property].Items.forEach(item => {
              var code = item.Code
              var exited = _.find(this.SpongeSharpsAndInstrumentsCountsSheetsData.Datas, {Code: code})
              if (exited) {
                if (this.checkString(item.DataType, 'CheckBox') || this.checkString(item.DataType, 'Radio')) {
                  var isTrue = (exited.Value === 'True')
                  item.Value = isTrue
                } else {
                  item.Value = exited.Value
                }
              }
            })
          }
        }
      }).catch(e => {
        if (e.status === 400) {
          this._404()
        }
      })
    },
    getPreOperativeProcedureHandoverChecklistsData () {
      new PreOperativeProcedureHandoverChecklists({}, this._VisitType).find(this._VisitId).then(response => {
        this.PreOperativeProcedureHandoverChecklistsData = response
        if (!this.PreOperativeProcedureHandoverChecklistsData.DateTimeHandover) {
          this.PreOperativeProcedureHandoverChecklistsData.DateTimeHandover = moment(new Date()).format(this.vDateTimeFormat)
        } else {
          this.PreOperativeProcedureHandoverChecklistsData.DateTimeHandover = moment(this.PreOperativeProcedureHandoverChecklistsData.DateTimeHandover, this.vDateTimeFormat)
        }
        for (const property in this.MASTERDATA) {
          if (this.MASTERDATA[property].Items && this.MASTERDATA[property].Group === 'PHC') {
            this.MASTERDATA[property].Items.forEach(item => {
              var code = item.Code
              var exited = _.find(this.PreOperativeProcedureHandoverChecklistsData.Datas, {Code: code})
              if (exited) {
                if (this.checkString(item.DataType, 'CheckBox') || this.checkString(item.DataType, 'Radio')) {
                  var isTrue = (exited.Value === 'True')
                  item.Value = isTrue
                } else if (this.checkString(item.DataType, 'datetime') && exited.Value) {
                  item.Value = exited.Value
                } else {
                  item.Value = exited.Code === 'PHCXUSANS' ? this.JSONParse(exited.Value) : exited.Value
                }
              }
            })
          }
        }
      }).catch(e => {
        if (e.status === 400) {
          this._404()
        }
      })
    },
    getData () {
      this.hasData = true
      if (this.$refs.Vcollapse) {
        this.$refs.Vcollapse.setHasData()
      }
      this.getMasterDatas({Form: 'PHC'}, () => {
        this.getPreOperativeProcedureHandoverChecklistsData()
      })
      this.getMasterDatas({Form: 'SSA'}, (SSA) => {
        this.SSA = SSA
        this.getSpongeSharpsAndInstrumentsCountsSheetsData()
      })
    }
  }
}
</script>
