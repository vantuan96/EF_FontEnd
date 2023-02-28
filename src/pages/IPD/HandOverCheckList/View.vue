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

import PatientHandOverRecord from '@/services/IPD/PatientHandOverRecord'
import HandOverCheckList from '@/services/IPD/HandOverCheckList'
import moment from 'moment'
// const isDate = (value) => !helpers.req(value) || moment(value, 'DD-MM-YYYY', true).isValid()
import MixinMasterData from '@/mixins/masterdata.js'
import _ from 'lodash'
import PrintPhr from '@/components/IPD/PRINT_PHR.vue'
import storage from '@/lib/storage'
import $ from 'jquery'
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
    this.getHandOverCheckList()
    $('.disable_ccp' + (storage.get('allowcopypaste') ? 'fc' : '')).bind('cut copy paste', e => {
      this.toastedError('Bạn không thể thực hiện thao tác này trên hệ thống!')
      return false
    })
  },
  computed: {
  },
  methods: {
    getHandOverCheckList () {
      this.getMasterDatas({Form: 'IPDHOC'}, () => {
        new HandOverCheckList().find(this.VisitId || this.$route.params.Id).then(response => {
          this.DataSubmit = response
          EventBus.$emit('getHandOverCheckList', response)
          console.log(response)
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
      new PatientHandOverRecord().find(this.VisitId || this.$route.params.Id).then(response => {
        response.History = response.PastMedicalHistory
        response.Assessment = response.ClinicalExaminationAndFindings
        response.TreatmentAndProcedures = response.TreatmentPlans
        response.CurrentStatus = response.PatientStatus
        response.FollowupCarePlan = response.FollowupPlan
        response.SignificantMedications = response.PrincipalTest

        this.data = response
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
