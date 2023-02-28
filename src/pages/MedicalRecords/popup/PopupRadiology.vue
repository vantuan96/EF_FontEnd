<template>
  <div>
    <basepopup name="PopupRadiology" width="1200px" :isShowFooter="false" :clickToClose="true">
      <div slot="title" class="text-center">
        <h3 class="box-title">{{__t('KẾT QUẢ CHẨN ĐOÁN HÌNH ẢNH')}}</h3>
      </div>
      <template v-if="loaded">
        <template v-if="ReportId">
          <div class="radiology-view" v-html="htmlCode"></div>
        </template>
        <template v-else>
          <div class="text-center">{{__t('Không có thông tin!')}}</div>
        </template>
      </template>
      <div v-else class="loading-text"><v-loading/></div>
      <div slot="footer">
        <div class="d-flex align-center space-between mt-20" style="padding: 0 250px;">
          <div>
            <button type="button" class="btn btn-block v-white-btn" style="width: 150px" @click="handleClose()">{{__t('Đóng')}}</button>
          </div>
          <div>
            <button v-if="hasRole('PRINTRADIOLOGY')" type="button" class="btn btn-block v-yellow-btn" style="width: 150px" @click="handlePrint()">{{__t('In')}}</button>
          </div>
        </div>
      </div>
    </basepopup>
    <Printer :Content="htmlCode" v-show="false"/>
  </div>
</template>

<script>
import Printer from '@/pages/MedicalRecords/Radiology/Print.vue'
import MedicalRecordCDHA from '@/services/MedicalRecordCDHA'
import VDateTimePicker from '@/components/VDateTimePicker.vue'
export default {
  name: 'PopupRadiology',
  props: ['ReportId', 'ResultBy'],
  data () {
    return {
      htmlCode: '',
      PrintIsOpen: false,
      loaded: false
    }
  },
  watch: {
    ReportId (val) {
      if (val) {
        this.getData()
      }
    }
  },
  components: {
    Printer, VDateTimePicker
  },
  mounted () {
    this.getData()
  },
  methods: {
    getData () {
      let reqBody = {
        UserName: this.ResultBy,
        ReportId: this.ReportId
      }
      if (reqBody.UserName && reqBody.ReportId) {
        new MedicalRecordCDHA().update('/ViewReport', reqBody).then(response => {
          this.htmlCode = response
          this.loaded = true
        })
      }
      this.loaded = true
    },
    handleClose () {
      this.$emit('closePopup', false)
      this.$modal.hide('PopupRadiology')
    },
    handlePrint () {
      this.PrintIsOpen = true
      this.$htmlToPaper('printMe', false, '')
    }
  }
}
</script>
<style scoped lang="stylus">
>>>.radiology-view {
  p {
    white-space: normal !important;
  }
  .standard {
    display: none !important;
  }
}
</style>
