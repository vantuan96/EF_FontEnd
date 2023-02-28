<template>
  <div class="main-content">
    <div class="header" style="margin-bottom: 30px;">
      <h2 class="text-center" style="font-style: bold">{{__t('PHIẾU ĐỒNG Ý XÉT NGHIỆM HIV')}}</h2>
    </div>
    <div class="text-center" v-if="NeedNew">
      <p>{{__t("Chưa có Phiếu đồng ý xét nghiệm HIV")}}</p>
      <button class="btn v-yellow-btn" v-if="NeedNew" @click="createPopup">{{__t('Tạo mới')}}</button>
    </div>
    <div v-else class="content-body">
      <Print v-if="DataSubmit" :DataSubmit="DataSubmit" :MASTERDATA="MASTERDATA" :dataPicture="dataPicture" hidden />
      <div class="content" v-if="DataSubmit" style="border: 1px solid #dadce0; padding-top: 10px;">
        <p><b>{{__label(MASTERDATA['HIVTCF01'])}}:</b> {{CurrentPatientObj.Address}}</p>
        <p><b>{{__label(MASTERDATA['HIVTCF03'])}}:</b> {{CurrentPatientObj.IdentificationCard}}</p>
        <p><b>{{__label(MASTERDATA['HIVTCF05'])}}:</b> {{CurrentPatientObj.IssueDate}}</p>
        <p><b>{{__label(MASTERDATA['HIVTCF07'])}}:</b> {{CurrentPatientObj.IssuePlace}}</p>
        <p>{{__label(MASTERDATA['HIVTCF09'])}} </p>
        <div style="display: flex">
          <p style="margin-top: 10px;">{{__t("Tôi")}}</p>
          <div class="ml-10" style="box-sizing: border-box">
            <div class="form-group flex"  style="display: flex">
              <div :data="item" :key="index" v-for="(item, index) in MASTERDATA['HIVTCF10'].Items">
                <div class="btn-action radio-left" >
                  <MdRadiosInput4
                    :noFlex="true"
                    :indexs="[index]"
                    v-model="MASTERDATA['HIVTCF10']"
                    v-if="!readonly"
                    :songngu="false"
                  />
                  <MdRadiosInput4
                    v-else
                    :noFlex="true"
                    :indexs="[index]"
                    v-model="MASTERDATA['HIVTCF10']"
                    style="pointer-events: none;"
                    :songngu="false"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <p>{{__t("cung cấp họ và tên, năm sinh và địa chỉ nơi cư trú để được xét nghiệm HIV.")}}</p>
        <p v-html="__label(MASTERDATA['HIVTCF13'])"></p>
        <p v-html="__label(MASTERDATA['HIVTCF14'])"></p>
        <div class="form-group" style="display: flex; align-items: center; justify-content: flex-start">
          <label style="margin-right: 8px; margin-top:2px;">{{__label(MASTERDATA['HIVTCF15'])}}</label>
          <v-date-time-picker
            v-model="MASTERDATA['HIVTCF15'].Items[0].Value"
            :format="vDateTimeFormat"
            :readonly="readonly"
            :hideTooltip="true"
          />
        </div>
        <br/>
        <br/>
        <!-- UPLOAD ảnh -->
        <div class="mt-10 ml-20 mr-20">
          <div class="pomc-upload-area mb-10" v-if="MASTERDATA['HIVTCF17']">
            <div class="row" >
              <div class="col-md-7 col-sm-7">
                <p><b>{{__t('Upload ảnh')}}:</b></p>
                <p><button @click="openFile()" class="btn v-white-btn font16 font-bold btn-upload"><i class="fa fa-upload" aria-hidden="true"></i> {{__t('UPLOAD TỪ THIẾT BỊ')}}</button></p>
                <p>{{__t('Sau khi phiếu có xác nhận/ chữ ký từ người bệnh/ người đại diện. Người dùng chụp ảnh phiếu và tải lên hệ thống')}}</p>
              </div>
              <div class="col-md-5 col-sm-5">
                <drop-files id="mini-upload" v-model="MASTERDATA['HIVTCF17'].Items[0].Value" :dataDropfile="dataDropfile"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div>
      <p class="mrt10">A01_014_050919_VE</p>
      <p v-if="DataSubmit">{{__t('Chỉnh sửa lần cuối bởi')}} <ad-info :ad="DataSubmit.data.UpdatedBy" /> {{__t('lúc')}} {{DataSubmit.data.UpdatedAt}}</p>
    </div>
    <!-- FloatBlock -->
    <FloatBlock v-if="!viewOnly && NeedNew === false" :openBack="true" @handleBack="handleBack">
      <template slot="buttons">
        <div class="col-md-2 col-sm-2"><div class="form-group1"></div></div>
        <div class="col-md-4 col-sm-4">
          <div class="form-group1">
          <button
            v-if="checkShowPrintButton()"
            class="btn btn-block v-white-btn"
            type="button"
            v-shortkey="['ctrl', 'p']"
            @shortkey="print();"
            @click="print();"
          >
            <i class="fa fa-print" aria-hidden="true"></i> {{ __t("In") }}
          </button>
          </div>
        </div>

        <div class="col-md-6 col-sm-6" v-if="!IsLocked">
          <div class="flex form-group1">
          <button
            class="btn v-yellow-btn pull-right btn-block hvr-ripple-out"
            type="button"
            v-shortkey="['ctrl', 's']"
            @click="handleSubmit();"
          >
            <i class="fa fa-floppy-o" aria-hidden="true"></i> {{ __t("btn.luu") }}
          </button>
          </div>
        </div>
      </template>
    </FloatBlock>
  </div>
</template>
<script>

import HIVTestingConsentServices from '@/services/HIVTestingConsent'
import MixinMasterData from '@/mixins/masterdata.js'
import MixinForm from '@/mixins/form.js'
import _ from 'lodash'
import VDateTimePicker from '@/components/VDateTimePicker.vue'
import moment from 'moment'
import $ from 'jquery'
import DropFiles from '@/components/DropFiles.vue'
import Print from './Print.vue'
import UploadFileService from '@/services/IPD/UploadFileService'

export default ({
  name: 'HIVTestingConsentForm',
  props: ['viewOnly', 'VisitType', 'VisitId'],
  mixins: [MixinMasterData, MixinForm],
  components: {VDateTimePicker, DropFiles, Print},
  data () {
    return {
      dataDropfile: {},
      Loaded: false,
      NeedNew: true,
      DataSubmit: null,
      time: null,
      IsLocked: false,
      checkUser: false,
      dataPicture: []
    }
  },
  computed: {
    readonly: function () {
      return this.viewOnly || this.IsLocked || this.checkUser
    },
    CurrentPatientObj () {
      return this.$store.state.account.CurrentPatientObj
    }
  },
  mounted () {
    this.getMasterDatas({ Form: 'A01_014_050919_VE' }, () => {
      this.getData()
    })

    this.checkShowPrintButton()
  },
  methods: {
    async getData () {
      if (this._VisitType === 'IPD' || this._VisitType === 'OPD') {
        await new HIVTestingConsentServices({}, this._VisitType, 'GetInfo').find(this._VisitId + '?hidemsg=' + true).then(res => {
          this.IsLocked = res
          if (this.IsLocked) {
            this.NeedNew = false
          }
        })
      }

      await new HIVTestingConsentServices({}, this._VisitType, 'Get')
        .find(this._VisitId)
        .then(response => {
          this.DataSubmit = response
          this.dataDropfile = {
            ...this.dataDropfile,
            contentImg: 'Tóm tắt thủ thuật can thiệp động mạch vành',
            titleImg: 'Hình ảnh được lấy từ biểu mẫu Tóm tắt thủ thuật can thiệp động mạch vành',
            visittypeImg: this._VisitType,
            visitidImg: this._VisitId,
            formidImg: response.data.Id || response.data.ID
          }
          if (this.DataSubmit.data.CreatedBy !== this.$store.state.account.Username) {
            this.checkUser = true
            this.NeedNew = false
          }
          if (response.EnMessage === 'Form is not found') {
            this.NeedNew = true
          } else {
            this.NeedNew = false
          }
          for (const property in this.MASTERDATA) {
            if (this.MASTERDATA[property].Items) {
              this.MASTERDATA[property].Items.forEach(item => {
                var code = item.Code
                var exited = _.find(this.DataSubmit.data.Datas, { Code: code })
                if (exited) {
                  if (this.checkString(item.DataType, 'Radio')) {
                    var isTrue = (exited.Value === 'True')
                    item.Value = isTrue
                  } else if (exited.Code === 'HIVTCF16') {
                    item.Value = new Date(moment(exited.Value, 'HH:mm DD/MM/YYYY'))
                  } else if (exited.Value && item.Code === 'HIVTCF18') {
                    item.Value = (this.JSONParse(exited.Value, true) || [])
                  }
                }
              })
            }
          }

          this.dataMaster = JSON.stringify(this.MASTERDATA)
          for (let i = 0; i < response.length; i++) {
            if (response[i.Code === 'HIVTCF18']) {
              this.MASTERDATA['HIVTCF17'].Items[0].Value = this.JSONParse(response[i].Value)
            }
          }
          this.dataPicture = this.MASTERDATA['HIVTCF17'].Items[0].Value
        })
    },
    createNewForm () {
      new HIVTestingConsentServices({}, this._VisitType, 'Create/' + this._VisitId)
        .create()
        .then(response => {
          this.reload()
        })
    },
    handleSubmit () {
      this.save()
    },
    save () {
      var obj = {}
      this.DataSubmit.Datas = []
      for (const property in this.MASTERDATA) {
        if (this.MASTERDATA[property].Items) {
          this.MASTERDATA[property].Items.forEach(item => {
            var code = item.Code
            var exited = _.find(this.DataSubmit.Datas, {Code: code})
            if (exited) {
              if (this.checkString(item.DataType, 'CheckBox') || this.checkString(item.DataType, 'Radio')) {
                var isTrue = (exited.Value === 'True')
                item.Value = isTrue
              } else if (item.Code === 'HIVTCF18') {
                item.Value = JSON.stringify(item.Value)
              } else {
                item.Value = exited.Value
              }
            }
            this.DataSubmit.Datas.push({
              Code: item.Code,
              Value: item.Value,
              Group: property
            })
            obj[item.Code] = item.Value
          })
        }
      }
      var arr = this.MASTERDATA['HIVTCF17'].Items[0].Value ? this.MASTERDATA['HIVTCF17'].Items[0].Value : []
      new HIVTestingConsentServices({}, this._VisitType, 'update/').update(this._VisitId, this.DataSubmit).then(response => {
        this.removedFile(arr)
        this.toastedSuccess()
        this.reload()
      })
    },
    handleBack () {
      if (this.dataMaster !== JSON.stringify(this.MASTERDATA)) {
        this.confirmPopup()
      } else {
        this.back()
      }
    },
    removedFile (arr) {
      new UploadFileService({hidemsg: true}).update('File/DeleteFileFromForms/' + this.DataSubmit.data.Id, {Urls: arr.toString()}).then(response => {
      }).catch(err => {
        console.log(err)
      })
    },
    confirmPopup () {
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
              this.$modal.hide('dialog')
            }
          }
        ]
      })
    },
    openFile () {
      $('#dropzone').click()
    },
    print () {
      this.$htmlToPaper('printMe', false, 'A01_014_050919_VE')
    },
    createPopup () {
      this.$modal.show('dialog', {
        clickToClose: false,
        title: this.$t('Thông báo'),
        text: this.$t('Tạo mới Phiếu đồng ý xét nghiệm HIV'),
        class: 'v-dialog v-dialog-warning',
        buttons: [
          {
            title: this.__t('Tôi xác nhận'),
            class: 'btn btn-warning',
            handler: () => {
              this.$modal.hide('dialog')
              this.createNewForm()
            }
          },
          {
            title: this.__t('Bỏ qua'),
            class: 'btn',
            handler: () => {
              // this.back()
              this.$modal.hide('dialog')
            }
          }
        ]
      })
    },
    checkShowPrintButton () {
      if (this.IsLocked && this.DataSubmit) {
        return true
      } else if (!this.DataSubmit) {
        return false
      } else if (this.IsLocked && !this.DataSubmit) {
        return false
      } else if (!this.IsLocked && this.DataSubmit) {
        return true
      }
    }
  }
})
</script>
