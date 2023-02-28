<template>
  <div id="SummaryOf15DayTreatmentItem">
    <template v-if="loaded">
      <div class="no-border mrb30">
        <div class="box-top-content">
          <div class="row">
            <div class="col-md-12 col-sm-12">
              <div class="flex align-center mrt10 mrb10">
                <b class="mrr40 fs16" v-if="MASTERDATA['IPDSO15DTR01']">{{__label(MASTERDATA['IPDSO15DTR01'])}}</b>
                <MDTextInput v-if="MASTERDATA['IPDSO15DTR01']" :readonly="isConfirmed" :placeholder="__t('Nhập')" v-model="MASTERDATA['IPDSO15DTR01'].Items[0].Value" width="500px"/>
              </div>
              <b class="fs16">{{__label(MASTERDATA['IPDSO15DTR03'])}}</b>
              <div class="content-top">
                <b>{{__label(MASTERDATA['IPDSO15DTR04'])}}</b>
                <TextCopyFill v-if="!isConfirmed" :data="getDataTextFill(DataInfo.Diagnostic, 'main')" @copy="handleCopy"/>
                <icd10 v-if="!isConfirmed" class="mrb20" @icdChange="icdChange" :single="true" v-model="ICD1"/>
                <Icd10View2 v-else :single="true" :value="ICD1"/>
                <b class="mrb10">{{__label(MASTERDATA['IPDSO15DTR06'])}}</b>
                <md-input-text :hidelabel="true" :readonly="isConfirmed" :placeholder="__t('Nhập')" v-if="MASTERDATA['IPDSO15DTR06']" v-model="MASTERDATA['IPDSO15DTR06']"/>
                <b class="mrb10">{{__label(MASTERDATA['IPDSO15DTR08'])}}</b>
                <TextCopyFill v-if="!isConfirmed" :data="getDataTextFill(DataInfo.Diagnostic, 'including')" @copy="handleCopy"/>
                <icd10 v-if="!isConfirmed" class="mrb20" @icdChange="icdChange2" v-model="ICD2"/>
                <Icd10View2 v-else :value="ICD2"/>
                <b class="mrb10">{{__label(MASTERDATA['IPDSO15DTR10'])}}</b>
                <md-input-text :hidelabel="true" :readonly="isConfirmed" :placeholder="__t('Nhập')" v-if="MASTERDATA['IPDSO15DTR10']" v-model="MASTERDATA['IPDSO15DTR10']"/>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="no-border">
        <div class="row" v-if="!isConfirmed">
          <div class="col-md-12 col-sm-12">
            <button class="btn btn-sync-data pull-right" @click="syncHistoryOfPatientIllnessAndAssessment('type')">{{__t('label_tham_khao')}}</button>
          </div>
        </div>
        <div class="box-collapse-title">
          <b>{{__label(MASTERDATA['IPDSO15DTR12'])}}</b>
        </div>
        <div class="box1 mrb30">
          <md-input-text :hidelabel="true" :readonly="isConfirmed" :placeholder="__t('Nhập')" v-if="MASTERDATA['IPDSO15DTR12']" v-model="MASTERDATA['IPDSO15DTR12']"/>
        </div>
        <div class="box-collapse-title">
          <b>{{__label(MASTERDATA['IPDSO15DTR14'])}}</b>
        </div>
        <div class="box2 mrb30">
          <!-- Tham khảo nội dung từ tổng kết bệnh án -->
          <md-input-text :hidelabel="true" :placeholder="__t('Nhập')" v-if="MASTERDATA['IPDSO15DTR14'] && !isConfirmed" v-model="MASTERDATA['IPDSO15DTR14']">
            <SyncPrincipalTest v-if="condition && condition==='Doctor'" @copy="copyToOPDOENPT0" :value="MASTERDATA['IPDSO15DTR14'].Items[0].Value" :VisitId="VisitId" />
          </md-input-text>
          <md-input-text :hidelabel="true" :readonly="true" :placeholder="__t('Nhập')" v-if="MASTERDATA['IPDSO15DTR14']  && isConfirmed" v-model="MASTERDATA['IPDSO15DTR14']"/>
        </div>
        <div class="box-collapse-title">
          <b>{{__label(MASTERDATA['IPDSO15DTR16'])}}</b>
        </div>
        <div class="box3 mrb30">
          <md-input-text :hidelabel="true" :readonly="isConfirmed" :placeholder="__t('Nhập')" v-if="MASTERDATA['IPDSO15DTR16']" v-model="MASTERDATA['IPDSO15DTR16']"/>
        </div>
        <div class="box-collapse-title">
          <b>{{__label(MASTERDATA['IPDSO15DTR18'])}}</b>
        </div>
        <div class="box4 mrb30">
          <md-input-text :hidelabel="true" :readonly="isConfirmed" :placeholder="__t('Nhập')" v-if="MASTERDATA['IPDSO15DTR18']" v-model="MASTERDATA['IPDSO15DTR18']"/>
        </div>
        <div class="box-collapse-title">
          <b>{{__label(MASTERDATA['IPDSO15DTR20'])}}</b>
        </div>
        <div class="box5 mrb30">
          <!-- Mở thư viện tham khảo -->
          <md-input-text :hidelabel="true" :readonly="isConfirmed" :placeholder="__t('Nhập')" v-if="MASTERDATA['IPDSO15DTR20']" v-model="MASTERDATA['IPDSO15DTR20']" :defaultLib="'LOIDAN061021'"/>
        </div>
        <div>
          <p>A01_056_050919_VE</p>
        </div>
      </div>
      <div class="a4-page no-style">
        <table style="width: 100%">
          <tr>
            <th style="width: 50%" class="text-center">
              <p class="fw100" v-if="DataSubmit.HeadOfDepartmentConfirmAt">{{DataSubmit.HeadOfDepartmentConfirmAt}}</p>
              <p><b>{{__t('Trưởng khoa2')}}</b></p>
              <div v-if="DataSubmit.HeadOfDepartmentConfirmAt"><ad-Info :ad="DataSubmit.HeadOfDepartmentConfirm.UserName" /></div>
              <div v-else-if="!viewOnly && !DataSubmit.IsLocked">
                <button @click="showDoctorConfirm('HEADOFDEPARTMENT', 'Trưởng khoa')" class="btn v-white-btn">{{__t('Xác nhận')}}</button>
              </div>
              <div v-else-if="DataSubmit.IsLocked">
                {{__t('Chưa xác nhận')}}
              </div>
            </th>
            <th style="width: 50%" class="text-center">
              <p class="fw100" v-if="DataSubmit.PhysicianConfirmAt">{{DataSubmit.PhysicianConfirmAt}}</p>
              <p><b>{{__t('Bác sĩ điều trị2')}}</b></p>
              <div v-if="DataSubmit.PhysicianConfirmAt"><ad-Info :ad="DataSubmit.PhysicianConfirm.UserName" /></div>
              <div v-else-if="!viewOnly && !DataSubmit.IsLocked">
                <button @click="showDoctorConfirm('DOCTOR', 'Bác sĩ điều trị')" class="btn v-white-btn">{{__t('Xác nhận')}}</button>
              </div>
              <div v-else-if="DataSubmit.IsLocked">
                {{__t('Chưa xác nhận')}}
              </div>
            </th>
          </tr>
        </table>
      </div>
      <doctor-confirm @popupSave="popupSave" :popupTitle="popupTitle" :TypeConfirm="TypeConfirm"/>
      <summary-of-15-day-treatment-price class="none" :id="_VisitId" :MASTERDATA="dataMaster" :DataSubmit="DataSubmit2"/>
      <FloatBlock v-if="!viewOnly" price="true" @handleBack="handleBack" @handlePrice="handlePrice">
      <!-- <FloatBlock price="true" @handleBack="handleBack" @handlePrice="handlePrice"> -->
        <template slot='buttons'>
          <div class="col-md-2 col-sm-2">
            <div class="form-group1">
            </div>
          </div>
          <div class="col-md-4 col-sm-4">
            <div class="form-group1">
            </div>
          </div>
          <!-- <div class="col-md-6 col-sm-6" v-if="$store.state.account.Position[0] === 'Doctor' && !data.IsLocked"> -->
          <div class="col-md-6 col-sm-6" v-if="!isConfirmed">
            <div class="form-group1">
              <button class="btn v-yellow-btn pull-right btn-block hvr-ripple-out" type="button" v-shortkey="['ctrl', 's']" @click="save()"><i class="fa fa-floppy-o" aria-hidden="true"></i> {{__t('btn.luu')}}</button>
            </div>
          </div>
        </template>
      </FloatBlock>
    </template>
    <div v-else class="loading-text"><v-loading/></div>
  </div>
</template>
<script>

// import Customer from '@/services/IPD/Customer'
import VSelect from '@/components/VSelect.vue'
// import moment from 'moment'
import VDateTimePicker from '@/components/VDateTimePicker.vue'
// import constants from '@/constants'
import DateTimePicker from 'vue2-datepicker'
// import $ from 'jquery'
import _ from 'lodash'
import MixinMasterData from '@/mixins/masterdata.js'
import DoctorConfirm from './popup/PopupDoctorConfirm.vue'
import MixinForm from '@/mixins/form.js'
import SummaryOf15DayTreatmentPrice from './price/SummaryOf15DayTreatmentPrice.vue'
import SyncPrincipalTest from './SyncPrincipalTest.vue'
import GetListAllSumOf15DayTreatments from '@/services/IPD/SummaryOf15DayTreatment/GetListAllSumOf15DayTreatments'
import TextCopyFill from '@/components/global/Component/TextCopyFill.vue'
export default {
  name: 'SummaryOf15DayTreatmentItem',
  props: ['formId', 'viewOnly', 'VisitId', 'VisitType'],
  mixins: [MixinForm, MixinMasterData],
  data () {
    return {
      popupTitle: '',
      TypeConfirm: '',
      DataSubmit: [],
      dataMaster: [],
      DataSubmit2: [],
      ICD1: [],
      ICD2: [],
      DataInfo: [],
      NullRoomId: false,
      loaded: false
    }
  },
  /**
   * The components that the page can use.
   */
  components: {
    VSelect,
    VDateTimePicker,
    DateTimePicker,
    DoctorConfirm,
    SummaryOf15DayTreatmentPrice,
    SyncPrincipalTest,
    TextCopyFill
  },
  mounted () {
    this.currentUser = this.$store.state.account.Username
    // master data
    this.getMasterDatas({Form: 'A01_056_050919_VE'}, () => {
      this.getData()
    })
  },
  watch: {
    formId () {
      this.getMasterDatas({Form: 'A01_056_050919_VE'}, () => {
        this.getData()
      })
    }
  },
  methods: {
    copyToOPDOENPT0 (str) {
      this.MASTERDATA['IPDSO15DTR14'].Items[0].Value = str
    },
    save (dataComfirm) {
      this.DataSubmit.Datas = []
      if (!this._VisitId) return
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
            } else {
            }
          })
        }
      }
      this.mapData2MDData()
      const data = Object.assign({}, this.DataSubmit)
      new GetListAllSumOf15DayTreatments().update('/Update/' + this._VisitId + '/' + this._ItemId, data).then(() => {
        if (!dataComfirm) {
          this.toastedSuccess()
          this.reload()
        }
        if (dataComfirm) {
          this.ConfirmKyNhay2(dataComfirm)
        }
      }).catch(() => {
      })
    },
    getData () {
      this.loaded = false
      new GetListAllSumOf15DayTreatments().find(this._VisitId + '/' + this._ItemId).then(res => {
        this.DataSubmit = res
        this.DataSubmit2 = res
        if (!res.Datas.length) {
          this.NullRoomId = true
        }
        this.mapMdData2Data()
        this.dataMaster = JSON.stringify(this.MASTERDATA)
        if (this.MASTERDATA['IPDSO15DTR04'].Items[0].Value) {
          this.ICD1 = this.JSONParse(this.MASTERDATA['IPDSO15DTR04'].Items[0].Value)
        } else {
          this.ICD1 = ''
        }
        if (this.MASTERDATA['IPDSO15DTR08'].Items[0].Value) {
          this.ICD2 = this.JSONParse(this.MASTERDATA['IPDSO15DTR08'].Items[0].Value)
        } else {
          this.ICD2 = ''
        }
        if (!this.isConfirmed) {
          this.syncHistoryOfPatientIllnessAndAssessment()
        }
        this.loaded = true
      }).catch(() => {
        this.loaded = true
      })
    },
    handleBack () {
      if (this.dataMaster !== JSON.stringify(this.MASTERDATA)) {
        this.confirmPopup()
      } else {
        this.back2(`/IPD/SurgeryCertificate/${this._VisitId}`)
      }
    },
    // popup canh bao
    confirmPopup () {
      this.$modal.show('dialog', {
        clickToClose: false,
        title: 'Thông báo',
        text: 'Dữ liệu bạn đang làm có thể bị mất nếu chưa lưu',
        class: 'v-dialog v-dialog-warning',
        buttons: [
          {
            title: 'Đồng ý',
            class: 'btn btn-warning',
            handler: () => {
              this.$modal.hide('dialog')
              this.back2(`/IPD/SurgeryCertificate/${this._VisitId}`)
            }
          },
          {
            title: 'Huỷ bỏ',
            class: 'btn',
            handler: () => {
              // this.back()
              this.$modal.hide('dialog')
            }
          }
        ]
      })
    },
    handlePrice () {
      this.$htmlToPaper3('SummaryOf15DayTreatment-price', false, 'A01_056_050919_VE')
    },
    showDoctorConfirm (TypeConfirm, title) {
      this.popupTitle = title
      this.TypeConfirm = TypeConfirm
      this.$modal.show('doctorConfirm')
    },
    syncHistoryOfPatientIllnessAndAssessment (type) {
      new GetListAllSumOf15DayTreatments().find('Info/' + this._VisitId + '?hidemsg=' + true).then(res => {
        this.DataInfo = res
        if (res.RoomId && !type && this.NullRoomId && !this.isConfirmed) {
          this.MASTERDATA['IPDSO15DTR01'].Items[0].Value = res.RoomId
        }
        if (res.TotalMedical.ClinicalEvolution && type) {
          this.MASTERDATA['IPDSO15DTR12'].Items[0].Value = res.TotalMedical.ClinicalEvolution
        }
        if (res.TotalMedical.ResultsOfPrincipleTest && type) {
          this.MASTERDATA['IPDSO15DTR14'].Items[0].Value = res.TotalMedical.ResultsOfPrincipleTest
        }
        if ((res.TotalMedical.Treatment.MethodTreatment || res.TotalMedical.Treatment.MainDrugsUsed || res.TotalMedical.TreatmentResult) && type) {
          let str = ''
          if (res.TotalMedical.Treatment.MethodTreatment) {
            if (res.TotalMedical.Treatment.MethodTreatment.includes('\n')) {
              str += `Phương pháp điều trị: ${res.TotalMedical.Treatment.MethodTreatment}`
            } else {
              str += `Phương pháp điều trị: \n + ${res.TotalMedical.Treatment.MethodTreatment}`
            }
          }
          if (res.TotalMedical.Treatment.MethodTreatment && res.TotalMedical.Treatment.MainDrugsUsed) {
            str += '\n'
          }
          if (res.TotalMedical.Treatment.MainDrugsUsed) {
            str += `Các thuốc chính đã dùng: \n + ${res.TotalMedical.Treatment.MainDrugsUsed} \n`
          }
          if (res.TotalMedical.TreatmentResult) {
            str += `${res.TotalMedical.TreatmentResult}`
          }
          this.MASTERDATA['IPDSO15DTR16'].Items[0].Value = str
        }
        if (res.TotalMedical.ResultsOfTreatment && type) {
          this.MASTERDATA['IPDSO15DTR18'].Items[0].Value = res.TotalMedical.ResultsOfTreatment
        }
        if (res.TotalMedical.ContinuousTreatmentAndPrognosis && type) {
          this.MASTERDATA['IPDSO15DTR20'].Items[0].Value = res.TotalMedical.ContinuousTreatmentAndPrognosis
        }
      })
    },
    icdChange (value) {
      this.ICD1 = []
      if (value.length) {
        this.ICD1 = value
        this.MASTERDATA['IPDSO15DTR04'].Items[0].Value = JSON.stringify(value)
        if (!this.MASTERDATA['IPDSO15DTR06'].Items[0].Value) {
          this.MASTERDATA['IPDSO15DTR06'].Items[0].Value = value[0].ViName
        }
      } else {
        this.MASTERDATA['IPDSO15DTR04'].Items[0].Value = ''
      }
    },
    icdChange2 (value) {
      var val = (value || []).map(e => e.ViName)
      var currentValue = this.MASTERDATA['IPDSO15DTR10'].Items[0].Value || ''
      this.MASTERDATA['IPDSO15DTR10'].Items[0].Value = ([currentValue].concat(val.filter(e => !currentValue.includes(e)))).filter(e => e).join(', ')
      if (this.ICD2) {
        const array = []
        this.ICD2.forEach(elm => {
          array.push(elm)
        })
        this.MASTERDATA['IPDSO15DTR08'].Items[0].Value = JSON.stringify(array)
      } else {
        this.MASTERDATA['IPDSO15DTR08'].Items[0].Value = ''
      }
    },
    popupSave (data) {
      // this.MASTERDATA['IPDSO15DTR22'].Items[0].Value = JSON.stringify(data)
      // this.save(data)
      if (!this.isConfirmed) {
        this.save(data)
      } else {
        this.ConfirmKyNhay2(data)
      }
    },
    ConfirmKyNhay2 (data) {
      new GetListAllSumOf15DayTreatments().update('/Confirm/' + this._VisitId + '/' + this._ItemId, data).then(() => {
        this.scroll2Bottom()
        this.toastedSuccess()
        this.reload()
      }).catch(() => {
      })
    },
    handleCopy (data) {
      if (!data) return
      if (data.Type === 'main') {
        if (data.Icd) {
          this.ICD1 = this.JSONParse(data.Icd)
          this.MASTERDATA['IPDSO15DTR04'].Items[0].Value = data.Icd
        }
        this.MASTERDATA['IPDSO15DTR06'].Items[0].Value = data.Disease
      } else {
        if (data.Icd) {
          this.ICD2 = this.JSONParse(data.Icd)
          this.MASTERDATA['IPDSO15DTR08'].Items[0].Value = data.Icd
        }
        this.MASTERDATA['IPDSO15DTR10'].Items[0].Value = data.Disease
      }
    },
    getDataTextFill (Data, type) {
      let data = {
        Icd: '',
        Disease: '',
        CreateBy: '',
        UpdateAt: '',
        Type: ''
      }
      if (Data) {
        data = {
          Icd: '',
          Disease: '',
          CreateBy: Data.CreateBy,
          UpdateAt: Data.UpdateAt,
          Type: type
        }
        if (type === 'main') {
          data.Icd = Data.ICD10MainDisease
          data.Disease = Data.MainDisease
        } else {
          data.Icd = Data.IDC10IncludingDisease
          data.Disease = Data.IncludingDisease
        }
      }
      return data
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
    isConfirmed: function () {
      // return false
      return (this.DataSubmit.HeadOfDepartmentConfirmAt || this.DataSubmit.PhysicianConfirmAt || this.viewOnly || this.DataSubmit.IsLocked || (this.condition && this.condition === 'Nurse'))
    },
    _ItemId: function () {
      return this.formId || this.$route.params.Item
    }
  }
}
</script>
<style lang="stylus" scoped>
  .box-collapse-title {
    text-align: left!important;
  }
  .box-top-content {
    border-top: 2px solid #D2D6DE;
  }
  .content-box2 {
    margin-bottom: 5px;
    .mini-box1, .mini-box2 {
      border: 1px solid #D2D6DE;
      padding: 6px 12px 0 12px;
      border-top: 0px;
    }
    .box-ed-content {
      background: #ffd695;
      padding: 5px;
      border-radius: 0px 0px 4px 4px;
    }
  }
</style>
