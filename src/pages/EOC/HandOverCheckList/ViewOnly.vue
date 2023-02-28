<template>
  <Vcollapse @getData="getData()" ref="Vcollapse">
    <template slot='title'>
      {{FormV2 ? FormV2.title : __label(Form)}}
    </template>
    <template slot='info'>
      <span class="pull-right" style="padding: 8px;font-size: 14px;">{{__t('Chỉnh sửa lần cuối bởi')}} <AdInfo :ad="FormV2 ? FormV2.UpdatedBy : Form.UpdatedBy" /> {{__t('lúc')}} {{FormV2 ? FormV2.UpdateAt : Form.UpdatedAt}}</span>
    </template>
    <template slot='content'>
      <div v-if="DataSubmit && data && hasData">
        <print-phr :data="data" :DataSubmit="DataSubmit" :VisitId="VisitId" :MASTERDATA="MASTERDATA"/>
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

import HandOverCheckList from '@/services/EOC/HandOverCheckList'
// const isDate = (value) => !helpers.req(value) || moment(value, 'DD-MM-YYYY', true).isValid()
import MixinMasterData from '@/mixins/masterdata.js'
import PrintPhr from '@/components/EOC/PRINT_PHR.vue'
export default {
  /**
   * The name of the page.
   */
  name: 'EOCHandOverCheckList',
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
    getData () {
      this.getMasterDatas({Form: 'HOC'}, () => {
        new HandOverCheckList().find(this._VisitId).then(response => {
          response.History = response.PastMedicalHistory
          response.Assessment = response.ClinicalExaminationAndFindings
          response.TreatmentAndProcedures = response.TreatmentPlans
          response.CurrentStatus = response.PatientStatus
          response.FollowupCarePlan = response.FollowupPlan
          response.SignificantMedications = response.PrincipalTest
          this.loading = false
          this.data = response
          this.DataSubmit = response
          if (!this.DataSubmit.HandOverTimeNurse) {
            this.DataSubmit.HandOverTimeNurse = new Date()
          } else {
            this.DataSubmit.HandOverTimeNurse = this.string2Moment(this.DataSubmit.HandOverTimeNurse)
          }
          this.mapMdData2Data()
          // this.HOCOTCount = this.parseInt(this.MASTERDATA['HOCOT6'].Items[0].Value, 0)
          setTimeout(() => {
            this.hasData = true
            if (this.$refs.Vcollapse) {
              this.$refs.Vcollapse.setHasData()
            }
          }, 300)
        }).catch(e => {
          console.log(e)
          if (e.status) {
            // this.go2Home()
            this.loading = false
            this.msgError = e.data
            console.log(e)
          }
        })
      })
    }
  }
}
</script>
