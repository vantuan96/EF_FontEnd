<template>
  <div v-if="DataProp && DataProp.MedicalRecordOncologyOld && DataProp.MedicalRecordOncologyOld.VisitId">
    <basepopup name="getDataBa" width="1500px" :isShowFooter="false" :clickToClose="false">
      <div slot="title" class="text-center">
        <h3 class="box-title cap">{{__t('Tham khảo nội dung Bệnh án ung bướu thuộc lượt tiếp nhận')}} {{DataProp.VisitCode}} {{__t('của Bác sĩ chính')}} {{DataProp.Username}}</h3>
      </div>
      <div class="body-content">
        <ViewOnly :routeType="routeType" :VisitIdDrop='DataProp.MedicalRecordOncologyOld.VisitId'/>
      </div>
      <div slot="footer">
        <div class="flex align-center space-center">
          <div class="mrr20">
            <button type="button" class="btn btn-block v-yellow-btn" @click="hamdleSubmit()">{{__t('Sử dụng')}}</button>
          </div>
          <div>
            <button type="button" class="btn btn-block v-white-btn" @click="handleClose()">{{__t('Bỏ qua')}}</button>
          </div>
        </div>
      </div>
    </basepopup>
  </div>
</template>

<script>
import ViewOnly from '@/pages/IPD/MedicalRecord/View/Index.vue'
export default {
  name: 'PopupGetDataBa',
  props: ['routeType', 'DataProp'],
  data () {
    return {
      data: {
      }
    }
  },
  components: {
    ViewOnly
  },
  mounted () {
  },
  methods: {
    handleResetData () {
    },
    handleClose () {
      this.handleResetData()
      this.$modal.hide('getDataBa')
    },
    hamdleSubmit () {
      // this.data = {...this.data, TypeConfirm: this.TypeConfirm}
      if (this.DataProp && this.DataProp.MedicalRecordOncologyOld && this.DataProp.MedicalRecordOncologyOld.VisitId) {
        this.$emit('popupSave', this.DataProp.MedicalRecordOncologyOld.VisitId)
      }
      this.handleClose()
    }
  }
}
</script>

<style scoped>
  .btn {
    width: 132px;
    height: 34px;
  }
</style>
