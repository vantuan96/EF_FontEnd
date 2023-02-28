<template>
  <Vcollapse @getData="getData()" ref="Vcollapse">
    <template slot='title'>
      {{FormV2 ? FormV2.title : __label(Form)}}
    </template>
    <template slot='info'>
      <span class="pull-right" style="padding: 8px;font-size: 14px;">{{__t('Chỉnh sửa lần cuối bởi')}} <AdInfo :ad="FormV2 ? FormV2.UpdatedBy : Form.UpdatedBy" /> {{__t('lúc')}} {{FormV2 ? FormV2.UpdateAt : Form.UpdatedAt}}</span>
    </template>
    <template slot='content'>
      <div v-if="hasData && DataSubmit && data">
        <print-phr :data="data" :DataSubmit="DataSubmit" :MASTERDATA="MASTERDATA"/>
      </div>
      <div v-else class="loading-text"><v-loading/></div>
    </template>
  </Vcollapse>
</template>
<script>
/* ============
 * Add cusotmer Page
 * ============
 *
 * The home index page.
 */

import PatientHandOverRecord from '@/services/OPD/PatientHandOverRecord'
import HandOverCheckList from '@/services/OPD/HandOverCheckList'
import moment from 'moment'
// const isDate = (value) => !helpers.req(value) || moment(value, 'DD-MM-YYYY', true).isValid()
import MixinMasterData from '@/mixins/masterdata.js'
import _ from 'lodash'
import PrintPhr from '@/components/OPD/PRINT_PHR.vue'
export default {
  /**
   * The name of the page.
   */
  name: 'OPDHandOverCheckList',
  props: ['VisitId', 'Form', 'FormV2'],
  data () {
    return {
      data: {},
      DataSubmit: null,
      hasData: false
    }
  },
  mixins: [MixinMasterData],
  /**
   * The components that the page can use.
   */
  components: {
    PrintPhr
  },
  mounted () {
  },
  computed: {
  },
  methods: {
    getHandOverCheckList () {
      this.getMasterDatas({Form: 'OPDHOC'}, () => {
        new HandOverCheckList().find(this._VisitId).then(response => {
          this.DataSubmit = response
          if (!this.DataSubmit.HandOverTimeNurse) {
            // this.DataSubmit.HandOverTimeNurse = moment(new Date()).format(this.vDateTimeFormat)
          } else {
            this.DataSubmit.HandOverTimeNurse = moment(this.DataSubmit.HandOverTimeNurse, this.vDateTimeFormat)
          }
          for (const property in this.MASTERDATA) {
            if (this.MASTERDATA[property].Items) {
              this.MASTERDATA[property].Items.forEach(item => {
                var code = item.Code
                var exited = _.find(this.DataSubmit.Datas, {Code: code})
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
          if (e.status) {
            // this.go2Home()
          }
        })
      })
    },
    getData () {
      new PatientHandOverRecord().find(this._VisitId).then(response => {
        this.getHandOverCheckList()
        response.History = response.PastMedicalHistory
        response.Assessment = response.ClinicalExaminationAndFindings
        response.TreatmentAndProcedures = response.TreatmentPlans
        response.CurrentStatus = response.PatientStatus
        response.FollowupCarePlan = response.FollowupPlan
        response.SignificantMedications = response.PrincipalTest

        this.data = response
        this.hasData = true
        if (this.$refs.Vcollapse) {
          this.$refs.Vcollapse.setHasData()
        }
        // if (!this.data.HandOverTimePhysician) {
        //   this.data.HandOverTimePhysician = new Date()
        // } else {
        //   this.data.HandOverTimePhysician = moment(this.data.HandOverTimePhysician, this.vDateTimeFormat)
        // }
      }).catch(e => {
        if (e.status) {
          // this.go2Home()
        }
      })
    }
  }
}
</script>
