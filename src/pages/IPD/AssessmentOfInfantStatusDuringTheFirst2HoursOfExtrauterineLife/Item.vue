<template>
  <div class="disable_ccp">
    <GetInfoPid class="mrt10 mrb10" :hiddenDeleteBtn="false" :readonly="isReadonly || viewOnly" :Customer="Customer" @updateInfo="updateInfo" :isGetVisitCode="false"/>
    <IPDInitialAssessmentForUterineLife2Hours :FormCode="'A02_016_061022_VE'" :NewbornCustomerId="NewbornCustomerId" :formId="formId" :viewOnly="viewOnly" :VisitId="VisitId" @isReadonly="getIsReadonly"/>
  </div>
</template>

<script>
import ContraintNewbornAndPregnantWoman from '@/services/ContraintNewbornAndPregnantWoman'
import IPDInitialAssessmentForUterineLife2Hours from '@/pages/IPD/InitialAssessment/ForNeonatalMaternity/ForUterineLife2Hours.vue'
import storage from '@/lib/storage'
import $ from 'jquery'
export default {
  name: 'AssessmentOfInfantStatusDuringTheFirst2HoursOfExtrauterineLifeItem',
  components: {
    IPDInitialAssessmentForUterineLife2Hours
  },
  props: ['NewbornCustomerId', 'viewOnly', 'IsLocked', 'VisitId', 'dataItem', 'formId'],
  data () {
    return {
      isReadonly: false,
      Customer: {
        PID: null,
        Fullname: '',
        Gender: null,
        DateOfBirth: ''
      }
    }
  },
  watch: {
    dataItem (val) {
      this.Customer = {
        PID: val.PID,
        Fullname: val.FullNameNewborn,
        Gender: val.Gender,
        DateOfBirth: val.DateOfBirth,
        AgeFormated: val.AgeFormated
      }
    }
  },
  mounted () {
    $('.disable_ccp' + (storage.get('allowcopypaste') ? 'fc' : '')).bind('cut copy paste', e => {
      this.toastedError('Bạn không thể thực hiện thao tác này trên hệ thống!')
      return false
    })
    if (this.dataItem) {
      this.Customer = {
        PID: this.dataItem.PID,
        Fullname: this.dataItem.FullNameNewborn,
        Gender: this.dataItem.Gender,
        DateOfBirth: this.dataItem.DateOfBirth,
        AgeFormated: this.dataItem.AgeFormated
      }
    }
  },
  methods: {
    getIsReadonly (val) {
      if (val) {
        this.isReadonly = true
      } else {
        this.isReadonly = false
      }
    },
    updateInfo () {
      new ContraintNewbornAndPregnantWoman().update('Updated/' + this.NewbornCustomerId + (this.Customer.PID ? '/' + this.Customer.PID : '')).then(res => {
        this.toastedSuccess()
        this.$emit('getListSoSinh')
      })
    }
  }
}
</script>
