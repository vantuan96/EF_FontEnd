<template>
  <div class="ExForms-Item">
    <hr style="margin-top: 0px;"/>
    <div>
      CONTENT
    </div>
    <p>{{__t('Chỉnh sửa lần cuối bởi')}} <AdInfo v-if="DataSubmit.UpdateBy" :ad="DataSubmit.UpdateBy" /> {{__t('lúc')}} {{DataSubmit.UpdatedAt | formatDateWithoutSecon}}</p>
    <!-- footer -->
    <FloatBlock :openBack="true" @handleBack="handleBack">
      <template slot='buttons'>
        <div class="col-md-2 col-sm-2">
          <div class="form-group1">
          </div>
        </div>
        <div class="col-md-4 col-sm-4">
          <div class="form-group1">
          </div>
        </div>
        <div class="col-md-6 col-sm-6" v-if="!readonly">
          <div class="form-group1">
            <button class="btn v-yellow-btn pull-right btn-block hvr-ripple-out" type="button" v-shortkey="['ctrl', 's']" @click="handleSubmit"><i class="fa fa-floppy-o" aria-hidden="true"></i> {{__t('btn.luu')}}</button>
          </div>
        </div>
      </template>
    </FloatBlock>
    <doctor-confirm :popupTitle="popupTitle" @popupSave="popupSave"/>
  </div>
</template>

<script setup>
import DoctorConfirm from './popup/PopupDoctorConfirm.vue'
import MixinMasterData from '@/mixins/masterdata.js'
// import ClinicalBreastExamNote from '@/services/OPD/ClinicalBreastExamNote'
import VDateTimePicker3 from '@/components/VDateTimePicker3.vue'
import _ from 'lodash'
export default {
  name: 'ExFormsItems',
  props: ['viewOnly', 'VisitId', 'IsLocked', 'formId'],
  mixins: [MixinMasterData],
  data () {
    return {
      icd10Code: [],
      popupTitle: '',
      DataSubmit: null,
      DoctorConfirmAt: '',
      dataMaster: null
    }
  },
  watch: {
    formId: function (val) {
      if (val) {
        this._ItemId = val
        this.getData()
      }
    }
  },
  computed: {
    condition () {
      let name = ''
      if (this.$store.state.account.Position.includes('Nurse')) {
        name = 'Nurse'
      }
      if (this.$store.state.account.Position.includes('Doctor')) {
        name = 'Doctor'
      }
      return name
    },
    _ItemId: function () {
      return this.formId || this.$route.params.Item
    },
    readonly () {
      return this.viewOnly || this.IsLocked || this.DoctorConfirmAt
    }
  },
  components: {
    DoctorConfirm,
    VDateTimePicker3
  },
  mounted () {
    this.getMasterDatas({Form: 'OPDPKLSV'}, () => {
      this.getData()
    })
  },
  methods: {
    getData () {
      // new ClinicalBreastExamNote().find('A03_116_200520_V/' + this._VisitId + '/' + this._ItemId).then((res) => {
      //   this.DataSubmit = res
      //   this.DoctorConfirmAt = res.DoctorConfirmAt
      //   this.mapData()
      // }).catch((e) => {
      //   console.log(e)
      // })
    },
    mapData () {
      for (const property in this.MASTERDATA) {
        if (this.MASTERDATA[property].Items) {
          this.MASTERDATA[property].Items.forEach(item => {
            var code = item.Code
            var exited = _.find(this.DataSubmit.Datas, {Code: code})
            if (exited) {
              if (this.checkString(item.DataType, 'CheckBox') || this.checkString(item.DataType, 'Radio')) {
                var isTrue = (exited.Value === 'True')
                item.Value = isTrue
              } else if (this.icd10Code.includes(item.Code)) {
                item.Value = this.JSONParse(exited.Value || [], true)
              } else {
                item.Value = exited.Value
              }
            } else {
              item.Value = null
            }
          })
        }
      }
      this.dataMaster = JSON.stringify(this.MASTERDATA)
    },
    handleBack () {
      if (this.dataMaster !== JSON.stringify(this.MASTERDATA)) {
        this.confirmPopupBack()
      } else {
        this.back()
      }
    },
    async handleSubmit (str) {
      await this.checkDataSubmit()
      await this.mapData2MDData()
      await this.validateForm()
      // const DataSubmit = Object.assign({}, this.DataSubmit)
      // new ClinicalBreastExamNote().update('Update/A03_116_200520_V/' + this._VisitId + '/' + this._ItemId, DataSubmit).then((res) => {
      //   if (str !== 'confirm') {
      //     this.toastedSuccess()
      //   }
      //   this.reload()
      // }).catch((e) => {
      //   if (str === 'confirm') {
      //     this.reload()
      //   }
      // })
    },
    // popup canh bao chưa lưu dữ liệu
    confirmPopupBack () {
      this.$modal.show('dialog', {
        clickToClose: false,
        title: this.__t('Cảnh báo'),
        text: this.__t('Dữ liệu bạn đang làm có thể bị mất nếu chưa lưu'),
        class: 'v-dialog v-dialog-warning',
        buttons: [
          {
            title: this.__t('Đồng ý'),
            class: 'btn',
            handler: () => {
              this.$modal.hide('dialog')
              this.back()
            }
          },
          {
            title: this.__t('Hủy bỏ'),
            class: 'btn btn-warning',
            handler: () => {
              // this.back()
              this.$modal.hide('dialog')
            }
          }
        ]
      })
    },
    // gọi popup confirm
    showDoctorConfirm (title) {
      this.popupTitle = title
      this.$modal.show('doctorConfirm')
    },
    // emit từ popup về confirm
    popupSave (data) {
      this.ConfirmKyNhay(data)
    },
    // call api confirm
    ConfirmKyNhay (data) {
      // new ClinicalBreastExamNote().update('Confirm/A03_116_200520_V/' + this._VisitId + '/' + this._ItemId, data).then(() => {
      //   if (!this.readonly) {
      //     this.handleSubmit('confirm')
      //   }
      //   this.scroll2Bottom()
      //   this.toastedSuccess()
      // }).catch((e) => {
      // })
    },
    // clear dữ liệu theo nghiệp vụ
    checkDataSubmit () {
      // if (this.MASTERDATA['OPDPKLSV83'] && !this.MASTERDATA['OPDPKLSV83'].Items[1].Value) {
      //   this.handleClearData(['OPDPKLSV86'])
      // }
    },
    handleClearData (listCode) {
      if (listCode && listCode.length) {
        listCode.forEach((code) => {
          this.MASTERDATA[code].Items.map((e, dex) => {
            if (e.DataType === 'Radio' || e.DataType === 'Checkbox') {
              e.Value = false
            } else {
              e.Value = ''
            }
          })
        })
      }
    },
    // validate form
    validateForm () {
      let errors = []
      // if (this.getValueOfMASTERDATA2('OPDPKLSV68', 'OPDPKLSV70')) {
      //   if (!this.getValueOfMASTERDATA2('OPDPKLSV71', 'OPDPKLSV72') &&
      //     !this.getValueOfMASTERDATA2('OPDPKLSV71', 'OPDPKLSV73')) {
      //     errors.push(this.MASTERDATA['OPDPKLSV71'])
      //   }
      // }
      if (errors.length) {
        console.log('errors: ', errors)
        this.handlerResponse({Error: errors})
      }
    }
  }
}
</script>
<style scoped>
.error {
  border: 1px solid red!important;
}
</style>
