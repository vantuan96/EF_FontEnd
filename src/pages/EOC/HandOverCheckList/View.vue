<template>
  <div class="main-content disable_ccp" id="etr-page">
    <div v-if="DataSubmit && data">
      <print-phr :data="data" :DataSubmit="DataSubmit" :MASTERDATA="MASTERDATA"/>
    </div>
    <div v-else class="loading-text"><v-loading/></div>
  </div>
</template>
<script>
/* ============
 * Add cusotmer Page
 * ============
 *
 * The home index page.
 */

import HandOverCheckList from '@/services/EOC/HandOverCheckList'
import MixinMasterData from '@/mixins/masterdata.js'
import $ from 'jquery'
import PrintPhr from '@/components/EOC/PRINT_PHR.vue'
import storage from '@/lib/storage'
import EventBus from '@/lib/eventBus'
export default {
  /**
   * The name of the page.
   */
  name: 'HandOverCheckList',
  props: ['VisitId'],
  data () {
    return {
      data: {},
      DataSubmit: null
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
    this.getData()
    $('.disable_ccp' + (storage.get('allowcopypaste') ? 'fc' : '')).bind('cut copy paste', e => {
      this.toastedError('Bạn không thể thực hiện thao tác này trên hệ thống!')
      return false
    })
  },
  methods: {
    getData () {
      this.getMasterDatas({Form: 'HOC'}, () => {
        new HandOverCheckList().find(this._VisitId).then(response => {
          EventBus.$emit('getHandOverCheckList', response)
          response.History = response.PastMedicalHistory
          response.Assessment = response.ClinicalExaminationAndFindings
          response.TreatmentAndProcedures = response.TreatmentPlans
          response.CurrentStatus = response.PatientStatus
          response.FollowupCarePlan = response.FollowupPlan
          response.SignificantMedications = response.PrincipalTest
          this.loading = false
          this.hasData = true
          this.data = response
          this.DataSubmit = response
          if (!this.DataSubmit.HandOverTimeNurse) {
            this.DataSubmit.HandOverTimeNurse = new Date()
          } else {
            this.DataSubmit.HandOverTimeNurse = this.string2Moment(this.DataSubmit.HandOverTimeNurse)
          }
          this.mapMdData2Data()
          this.HOCOTCount = this.parseInt(this.MASTERDATA['HOCOT6'].Items[0].Value, 0)
        }).catch(e => {
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
