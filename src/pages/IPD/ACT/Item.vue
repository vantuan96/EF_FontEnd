<template>
  <div class="ACTForms-Item">
    <template v-if="loaded">
      <hr style="margin-top: 0px;"/>
      <div>
        <table class="table table-striped table-bordered v-table none-row-curso" id="customer-tbl">
          <thead class="bg-1375ba">
            <tr>
              <th class="text-center content-center" rowspan="2" width="1px" style="padding-top: 9px!important;">{{__t('STT')}}</th>
              <th class="text-center content-center" rowspan="2" width="149px" style="padding-top: 9px!important;">{{__t('Thông số ')}}</th>
              <th class="text-center content-center" rowspan="2" width="275px" style="padding-top: 9px!important;">{{__t('Khoảng tham chiếu ')}}</th>
              <th class="text-center content-center" rowspan="2" width="236px" style="padding-top: 9px!important;">{{__t('Chỉ số báo động ')}}</th>
              <th class="text-center" width="236px" colspan="3" style="border-bottom-width: 1px!important;">{{__t('Kết quả')}}</th>
            </tr>
            <tr>
              <th class="text-center no-wrap" width="100px">{{__t('Kết quả')}}</th>
              <th class="text-center" width="100px">{{__t('Đơn vị ')}}</th>
              <th class="text-center">{{__t('Hình ảnh')}} <button v-if="!readonly" class="btn btn-sync-data" @click="openFile()"><i class="fa fa-upload" aria-hidden="true"></i> {{__t('Tải ảnh')}}</button></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="text-center">1</td>
              <td class="text-center">ACT</td>
              <td class="text-center">84 - 139</td>
              <td class="text-center">>240</td>
              <td>
                <VNumberInput
                  v-if="MASTERDATA['HLQACT001']"
                  v-model="MASTERDATA['HLQACT001'].Items[0].Value"
                  :placeholder="__t('Nhập')"
                  :readonly="readonly"
                  :decimal="true"
                  :maxlength="10"
                  :style="(MASTERDATA['HLQACT001'].Items[0].Value > 240) ? 'background: #dd4b39;color: #fff;font-weight: 600;' : ''"/>
                <!-- <MDText v-if="MASTERDATA['HLQACT001']" :placeholder="__t('Nhập')" rows="1" :readonly="readonly" v-model="MASTERDATA['HLQACT001'].Items[0].Value"/> -->
              </td>
              <td class="text-center">{{__t('giây')}}</td>
              <td>
                <drop-files :readonly="readonly" :dataDropfile="dataDropfile" id="mini-upload" v-if="MASTERDATA['HLQACT003']" v-model="MASTERDATA['HLQACT003'].Items[0].Value"/>
              </td>
            </tr>
          </tbody>
        </table>
        <!-- Xác nhận -->
        <template v-if="DataSubmit.Version >= 7">
          <div class="row">
            <div class="col-md-4 col-sm-4" v-if="Technician && Technician.ConfirmAt">
              <p class="text-center">{{ getFTime(Technician.ConfirmAt) }}</p>
              <EformSignature2 :title="__t('Người làm xét nghiệm ')" :ad="Technician.ConfirmBy"/>
            </div>
            <div class="col-md-4 col-sm-4 text-center" v-else>
              <p><b>{{ __t("Người làm xét nghiệm ") }}</b></p>
              <div class="text-center fw600 mrb10 mrt10">
                <ad-info :ad="DataSubmit.CreatedBy"/>
              </div>
              <p v-if="!viewOnly && !IsLocked">
                <button @click="showDoctorConfirm('Người làm xét nghiệm ')" class="btn v-white-btn">
                  {{ __t("Xác nhận") }}
                </button>
              </p>
              <div v-if="viewOnly" class="italic" style="color: green">({{(__t('Chưa ký xác nhận'))}})</div>
            </div>
            <div class="col-md-4 col-sm-4"></div>
            <div class="col-md-4 col-sm-4" v-if="ReferringPhysician && ReferringPhysician.ConfirmAt">
              <p class="text-center">{{ getFTime(ReferringPhysician.ConfirmAt) }}</p>
              <EformSignature2 :title="__t('Bác sĩ chỉ định ')" :ad="ReferringPhysician.ConfirmBy"/>
            </div>
            <div class="col-md-4 col-sm-4 text-center" v-else>
              <p><b>{{ __t("Bác sĩ chỉ định ") }}</b></p>
              <p v-if="!viewOnly && !IsLocked">
                <button @click="showDoctorConfirm('Bác sĩ chỉ định ')" class="btn v-white-btn">
                  {{ __t("Xác nhận") }}
                </button>
              </p>
              <div v-if="viewOnly" class="italic" style="color: green">({{(__t('Chưa ký xác nhận'))}})</div>
            </div>
          </div>
        </template>
        <template v-else>
          <div class="row">
            <div class="col-md-4 col-sm-4">
              <p class="text-center">{{ getUpdatedAt() }}</p>
              <EformSignature2 :title="__t('Người làm xét nghiệm ')" :ad="getUpdatedBy()"/>
            </div>
            <div class="col-md-4 col-sm-4"></div>
            <div class="col-md-4 col-sm-4" v-if="ReferringPhysician && ReferringPhysician.ConfirmAt">
              <p class="text-center">{{ getFTime(ReferringPhysician.ConfirmAt) }}</p>
              <EformSignature2 :title="__t('Bác sĩ chỉ định ')" :ad="ReferringPhysician.ConfirmBy"/>
            </div>
            <div class="col-md-4 col-sm-4 text-center" v-else>
              <p><b>{{ __t("Bác sĩ chỉ định ") }}</b></p>
              <p v-if="!viewOnly && !IsLocked">
                <button @click="showDoctorConfirm('Bác sĩ chỉ định ')" class="btn v-white-btn">
                  {{ __t("Xác nhận") }}
                </button>
              </p>
              <div v-if="viewOnly" class="italic" style="color: green">({{(__t('Chưa ký xác nhận'))}})</div>
            </div>
          </div>
        </template>
      </div>
      <p class="mrt30">A03_040_080322_V</p>
      <LogForm :DataSubmit="DataSubmit"/>
      <!-- footer -->
      <FloatBlock :openBack="true" @handleBack="handleBack" v-if="!viewOnly">
        <template slot='buttons'>
          <div class="col-md-2 col-sm-2">
            <div class="form-group1">
            </div>
          </div>
          <div class="col-md-2 col-sm-2">
            <div class="form-group1">
            </div>
          </div>
          <div class="col-md-2 col-sm-2">
            <div @click="print()" class="btn-block btn-in" title="Price"><i class="fa fa-print" aria-hidden="true"></i> {{__t('In ngay')}}</div>
          </div>
          <div class="col-md-6 col-sm-6" v-if="!readonly">
            <div class="form-group1">
              <button class="btn v-yellow-btn pull-right btn-block hvr-ripple-out" type="button" v-shortkey="['ctrl', 's']" @click="handleSubmit"><i class="fa fa-floppy-o" aria-hidden="true"></i> {{__t('btn.luu')}}</button>
            </div>
          </div>
        </template>
      </FloatBlock>
      <doctor-confirm :popupTitle="popupTitle" @popupSave="popupSave"/>
      <print :class="isDev() ? '' : 'none'" :Version="DataSubmit.Version" :formId="formId" :viewOnly="viewOnly" :VisitId="_VisitId" :VisitType="_VisitType"/>
    </template>
    <div v-else class="loading-text"><v-loading/></div>
  </div>
</template>

<script setup>
import FormApi from '@/services/FormAPI.js'
import DoctorConfirm from './popup/PopupDoctorConfirm.vue'
import MixinMasterData from '@/mixins/masterdata.js'
// import ClinicalBreastExamNote from '@/services/OPD/ClinicalBreastExamNote'
import _ from 'lodash'
import $ from 'jquery'
import DropFiles from '@/components/DropFiles.vue'
import Print from './Print.vue'
import UploadFileService from '@/services/IPD/UploadFileService'

export default {
  name: 'ACTFormsItems',
  props: ['viewOnly', 'VisitId', 'IsLocked', 'formId', 'VisitType'],
  mixins: [MixinMasterData],
  data () {
    return {
      dataDropfile: {},
      icd10Code: ['HLQACT004'],
      popupTitle: '',
      DataSubmit: null,
      DoctorConfirmAt: '',
      dataMaster: null,
      data: {},
      ReferringPhysician: {},
      Technician: {},
      loaded: false,
      APIService: null
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
      if (this.DataSubmit.Version >= 7) {
        return this.viewOnly || this.IsLocked || this.ReferringPhysician.ConfirmAt || this.Technician.ConfirmAt
      }
      return this.viewOnly || this.IsLocked || this.ReferringPhysician.ConfirmAt
    }
  },
  components: {
    DoctorConfirm,
    DropFiles,
    Print
  },
  mounted () {
    this.APIService = new FormApi({
      VisitType: this._VisitType,
      VisitId: this._VisitId,
      FormCode: 'A03_040_080322_V'
    })
    this.getMasterDatas({Form: 'HLQACT'}, () => {
      this.getData()
    })
  },
  methods: {
    getData () {
      this.loaded = false
      if (!this._ItemId) return
      this.ReferringPhysician = {}
      this.Technician = {}
      this.APIService.GetDetail(this._ItemId + '?hidemsg=' + true).then(res => {
        this.DataSubmit = res.data
        this.dataDropfile = {
          ...this.dataDropfile,
          contentImg: 'Tóm tắt thủ thuật can thiệp động mạch vành',
          titleImg: 'Hình ảnh được lấy từ biểu mẫu Tóm tắt thủ thuật can thiệp động mạch vành',
          visittypeImg: this._VisitType,
          visitidImg: this._VisitId,
          formidImg: this.DataSubmit.Id || this.DataSubmit.ID
        }
        console.log('reload', this.dataDropfile)
        if (res.data && res.data.ConfirmInfos && res.data.ConfirmInfos.length) {
          res.data.ConfirmInfos.find(e => {
            if (e.ConfirmType === 'ReferringPhysician') {
              this.ReferringPhysician = e
            }
            if (e.ConfirmType === 'Technician_UserCreated') {
              this.Technician = e
            }
          })
        }
        // this.DoctorConfirmAt = res.DoctorConfirmAt
        this.mapData()
        this.loaded = true
      }).catch((e) => {
        console.log(e)
        this.loaded = true
      })
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
      var arr = this.MASTERDATA['HLQACT003'].Items[0].Value ? this.MASTERDATA['HLQACT003'].Items[0].Value : []
      console.log('subbb', this.MASTERDATA['HLQACT003'].Items[0].Value)
      // console.log('fdff', this.MASTERDATA['HIVTCF17'].Items[0].Value.toString())
      // await this.checkDataSubmit()
      await this.mapData2MDData()
      // await this.validateForm()
      const DataSubmit = Object.assign({}, this.DataSubmit)
      this.APIService.UpdateForm(this._ItemId, DataSubmit).then(res => {
        this.removedFile(arr)
        if (str !== 'confirm') {
          this.toastedSuccess()
        }
        this.reload()
      }).catch((e) => {
        if (str === 'confirm') {
          this.reload()
        }
      })
    },
    removedFile (arr) {
      new UploadFileService({hidemsg: true}).update('File/DeleteFileFromForms/' + this._ItemId, {Urls: arr.toString()}).then(response => {
      }).catch(err => {
        console.log(err)
      })
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
      if (this.popupTitle === 'Người làm xét nghiệm ' && this.DataSubmit.Version >= 7) {
        data.kind = 'Technician_UserCreated'
      } else {
        data.kind = 'ReferringPhysician'
      }
      this.ConfirmKyNhay(data)
    },
    // call api confirm
    ConfirmKyNhay (data) {
      var arr = this.MASTERDATA['HLQACT003'].Items[0].Value ? this.MASTERDATA['HLQACT003'].Items[0].Value : []
      this.APIService.ConfirmForm(this._ItemId, data).then(res => {
        if (!this.readonly) {
          this.handleSubmit('confirm')
        } else {
          this.removedFile(arr)
        }
        this.scroll2Bottom()
        this.toastedSuccess(this.$t('Xác nhận thành công'))
        this.reload()
      }).catch((e) => {
      })
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
    },
    print () {
      this.$PointOfCareTestingPrinter('printMe', false, 'A03_040_080322_V')
    },
    openFile () {
      $('#dropzone').click()
    },
    isDev () {
      let check = false
      if (this.$store.state.account.Username === 'hunglq25') {
        check = true
      }
      return check
    },
    getUpdatedAt () {
      if (this.DataSubmit) {
        if (this.DataSubmit.UpdatedAt) {
          return this.getFTime(this.DataSubmit.UpdatedAt)
        }
        if (this.DataSubmit.CreatedAt) {
          return this.getFTime(this.DataSubmit.CreatedAt)
        }
      }
      return ''
    },
    getUpdatedBy () {
      if (this.DataSubmit) {
        if (this.DataSubmit.UpdatedBy) {
          return this.DataSubmit.UpdatedBy
        }
        if (this.DataSubmit.CreatedBy) {
          return this.DataSubmit.CreatedBy
        }
      }
      return ''
    }
  }
}
</script>
<style scoped>
.error {
  border: 1px solid red!important;
}
</style>
