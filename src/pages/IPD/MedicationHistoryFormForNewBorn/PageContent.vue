<template>
 <div class="MedicationHistoryForm-page">
   <template v-if="loaded">
    <div v-if="nullContent">
    <div v-if="IsLocked" style="color: red; margin-top: 30px;" class="italic">
      <h4><i class="fa fa-lock" aria-hidden="true"></i> {{__t('Bạn không được phép chỉnh sửa do hồ sơ đã bị khóa theo nguyên tắc 24h!')}}</h4>
    </div>
    <div v-else class="text-center">
      <h4 class="italic">{{message || __t('Chưa có thông tin')}}</h4>
    </div>
    <button v-if="!isConfirmed && getRoleCreate" type="button" class="btn btn-flat v-yellow-btn btn-create" @click="confirmPopup">{{__t('Tạo mới')}}</button>
   </div>
   <div class="content" v-else>
     <!-- <TextFillView v-if="DataInfo && DataInfo.DateOfAdmission" :label="__t('MedicationHistoryForm.label20')" :value="DataInfo.DateOfAdmission" formatDate="HH:mm DD/MM/YYYY"/> -->
     <p class="bold-label fw600 fs16 mrb10">{{__t('MedicationHistoryForm.label20')}}</p><p class="text-right" v-if="DataInfo && DataInfo.DateOfAdmission">{{DataInfo.DateOfAdmission | formatDateWithoutSecon}}</p><br>
     <p class="bold-label fw600 fs16">{{__t('MedicationHistoryForm.label3')}}</p>
     <p class="text-right" v-if="DataInfo && DataInfo.Diagnostic">{{getTextDiagnosis(DataInfo.Diagnostic)}}</p>
     <br>
     <p class="text-yellow mrb10">{{__t('MedicationHistoryForm.miniLabel1')}}</p>
     <p class="bold-label fw600 fs16">{{__t('MedicationHistoryForm.label2')}}</p>
     <p class="text-right" v-if="DataInfo && DataInfo.Allergy">{{getAllergy(DataInfo.Allergy)}}</p><br>
     <p class="text-yellow mrb10">{{__t('MedicationHistoryForm.miniLabel2')}}</p>
     <div class="flex space-between align-center mrt10" style="width: 60%;">
       <div class="fw600 fs16 mrr122">{{__label(MASTERDATA['IPDMEDHIS01'])}}</div>
       <MDTextInput :readonly="isConfirmed" :placeholder="__t('Nhập')" width="100%" v-model="MASTERDATA['IPDMEDHIS01'].Items[0].Value"/>
     </div><br>
     <div class="col-md-12 col-sm-12 flex align-center mrt10 box-tien-su-benh">
        <div class="fw600 fs16 label-left">{{__label(MASTERDATA['IPDMEDHIS03'])}}</div>
        <md-input-text width="100%;" :hidelabel="true" :readonly="isConfirmed" :placeholder="__t('Nhập')" v-if="MASTERDATA['IPDMEDHIS03']" v-model="MASTERDATA['IPDMEDHIS03']"/>
     </div><br>
      <page-table @handleBack="handleBack" @handleSubmit="handleSubmit" :isConfirmed="isConfirmed" :dataTable1="dataTable" :dataTableTPCN1="dataTableTPCN"/>
      <!-- <p v-if="DataInfo.CurrentDrug && DataInfo.CurrentDrug.length" class="fw600 fs16 mrt10">{{__t('MedicationHistoryForm.label13')}}</p>
      <table v-if="DataInfo.CurrentDrug && DataInfo.CurrentDrug.length" class="table observation-table">
        <thead>
          <tr>
            <th>{{__t('MedicationHistoryForm.label14')}}</th>
            <th width="130px">{{__t('MedicationHistoryForm.label15')}}</th>
            <th width="150px">{{__t('MedicationHistoryForm.label16')}}</th>
            <th width="200px">{{__t('MedicationHistoryForm.label17')}}</th>
            <th width="80px"></th>
          </tr>
        </thead>
        <tbody>
          <template v-for="(item, index) in DataInfo.CurrentDrug">
            <tr :key="index">
              <td>{{item.Drug}}</td>
              <td>{{item.Dosage}}</td>
              <td>{{item.Route}}</td>
              <td>{{item.LastDoseDate | formatDate2}}</td>
              <td><BtnCopy v-if="!isConfirmed" :index="index" @copy="copy" :hideCopy="true"/></td>
            </tr>
          </template>
        </tbody>
      </table> -->
      <hr />
      <p class="fw600 fs16">{{__label(MASTERDATA['IPDMEDHIS26'])}}</p>
      <p class="fw500">{{__label(MASTERDATA['IPDMEDHIS27'])}}</p>
      <md-input-text :hidelabel="true" :readonly="isConfirmed" :placeholder="__t('Nhập')" v-if="MASTERDATA['IPDMEDHIS27']" v-model="MASTERDATA['IPDMEDHIS27']"/>
      <p class="fw500">{{__label(MASTERDATA['IPDMEDHIS29'])}}</p>
      <md-input-text :hidelabel="true" :readonly="isConfirmed" :placeholder="__t('Nhập')" v-if="MASTERDATA['IPDMEDHIS29']" v-model="MASTERDATA['IPDMEDHIS29']"/>
      <p class="fw500">{{__label(MASTERDATA['IPDMEDHIS31'])}}</p>
      <md-input-text :hidelabel="true" :readonly="isConfirmed" :placeholder="__t('Nhập')" v-if="MASTERDATA['IPDMEDHIS31']" v-model="MASTERDATA['IPDMEDHIS31']"/>
      <p class="fw500">{{__label(MASTERDATA['IPDMEDHIS33'])}}</p>
      <md-input-text :hidelabel="true" :readonly="isConfirmed" :placeholder="__t('Nhập')" v-if="MASTERDATA['IPDMEDHIS33']" v-model="MASTERDATA['IPDMEDHIS33']"/>
      <p class="fw500 text-bold">{{__label(MASTERDATA['IPDIAATSDTTTTVX'])}}:</p>
      <md-input-text :hidelabel="true" :readonly="isConfirmed" :placeholder="__t('Nhập')" v-if="MASTERDATA['IPDIAATSDTTTTVX']" v-model="MASTERDATA['IPDIAATSDTTTTVX']"/>
      <div class="a4-page no-style mrt20">
      <table style="width: 100%">
        <tr>
          <th style="width: 50%" class="text-center">
            <template v-if="DataSubmit.PhysicianConfirmAt">
              <p class="text-center" style="font-weight: 100;">{{DataSubmit.PhysicianConfirmAt | formatDateWithoutSecon}}</p>
              <eform-signature :ad="DataSubmit.PharmacistConfirm.UserName" :title="__label(MASTERDATA['IPDMEDHIS35'])" />
            </template>
            <div v-else>
              <p><b>{{__label(MASTERDATA['IPDMEDHIS35'])}}</b></p>
              <i v-if="viewOnly" style="font-weight: 100;">{{__t('Chưa xác nhận')}}</i>
              <button v-if="!viewOnly" @click="showDoctorConfirm('PHARMACIST', 'Dược sỹ')" class="btn v-white-btn">{{__t('Xác nhận')}}</button>
            </div>
          </th>
          <th style="width: 50%" class="text-center">
            <template v-if="DataSubmit.DoctorConfirmAt">
              <p class="text-center" style="font-weight: 100;">{{DataSubmit.DoctorConfirmAt | formatDateWithoutSecon}}</p>
              <eform-signature :ad="DataSubmit.DoctorConfirm.UserName" :title="__label(MASTERDATA['IPDMEDHIS36'])" />
            </template>
            <div v-else>
              <p><b>{{__label(MASTERDATA['IPDMEDHIS36'])}}</b></p>
              <i v-if="viewOnly" style="font-weight: 100;">{{__t('Chưa xác nhận')}}</i>
              <button v-if="!viewOnly" @click="showDoctorConfirm('DOCTOR', 'Bác sỹ')" class="btn v-white-btn">{{__t('Xác nhận')}}</button>
            </div>
          </th>
        </tr>
      </table>
    </div>
   </div>
   <doctor-confirm :popupTitle="popupTitle" :TypeConfirm="TypeConfirm" @popupSaveNewBorn="popupSaveNewBorn"/>
   <p>A03_124_120421_VE</p>
   <!-- <p>{{__t('Chỉnh sửa lần cuối bởi')}} <AdInfo :ad="updatedByDoctor" /> {{__t('lúc')}} {{updatedAtDoctor}}</p> -->
   <p v-if="!nullContent">{{__t('Chỉnh sửa lần cuối bởi')}} <AdInfo v-if="DataSubmit.UpdateBy" :ad="DataSubmit.UpdateBy" /> {{__t('lúc')}} {{DataSubmit.UpdatedAt | formatDateWithoutSecon}}</p>
   </template>
   <div v-else class="loading-text"><v-loading/></div>
 </div>
</template>

<script>
import DoctorConfirm from './popup/PopupDoctorConfirm.vue'
import PageTable from './PageTable.vue'
// import GetMedicationHistory from '@/services/IPD/MedicationHistory/GetMedicationHistory'
import MixinMasterData from '@/mixins/masterdata.js'
import EventBus from '@/lib/eventBus'
import _ from 'lodash'
import MedicationHistory from '@/services/IPD/MedicationHistoryFormPediatricPatientService.js'
// import $ from 'jquery'
export default {
  name: 'MedicationHistoryFormForNewBorn-page',
  mixins: [MixinMasterData],
  data () {
    return {
      data: {
        text: '',
        checkbox: false
      },
      popupTitle: '',
      TypeConfirm: '',
      nullContent: true,
      IsLocked: false,
      FirstCreate: false,
      DataSubmit: [],
      DataInfo: [],
      dataMaster: null,
      dataTable: '',
      dataTableTPCN: '',
      loaded: false
    }
  },
  props: {
    viewOnly: {
      type: Boolean,
      default: false
    },
    VisitId: ''
  },
  components: {
    PageTable,
    DoctorConfirm
  },
  computed: {
    getRoleCreate () {
      if (this.hasRole('MEDHISFORCHILDPOST')) {
        return true
      } else {
        return false
      }
    },
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
    isConfirmed () {
      // return (this.DataSubmit.SecretaryTime || this.DataSubmit.ChairmanTime || this.DataSubmit.Members.find(e => e.ConfirmTime)) || this.viewOnly
      return (this.DataSubmit.PhysicianConfirmAt || this.DataSubmit.DoctorConfirmAt || this.viewOnly || this.IsLocked)
    }
  },
  // watch: {
  //   isConfirmed: function (val) {
  //     if (val) {
  //       $('#IPDMEDHIS05-0').disabled = true
  //     }
  //   }
  // },
  mounted () {
    // master data
    this.getMasterDatas({Form: 'A03_120_120421_VE'}, () => {
      this.getData()
    })
  },
  methods: {
    // popup canh bao
    confirmPopup () {
      this.$modal.show('dialog', {
        clickToClose: false,
        title: this.__t('Thông báo'),
        text: this.__t('MedicationHistoryForm.labelConfirm'),
        class: 'v-dialog v-dialog-warning',
        buttons: [
          {
            title: this.__t('Tôi xác nhận'),
            class: 'btn btn-warning',
            handler: () => {
              this.$modal.hide('dialog')
              this.handleCreateContent()
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
    handleCreateContent () {
      if (!this._VisitId) return
      new MedicationHistory().update('/Create/A03_124_120421_VE/' + this._VisitId).then(response => {
        this.toastedSuccess()
        this.reload()
      }).catch(() => {
      })
    },
    pushData () {
      if (!this._VisitId) return
      new MedicationHistory().find('/Info/A03_124_120421_VE/' + this._VisitId + '?hidemsg=' + true).then(res => {
        this.DataInfo = res
        if (this.FirstCreate && !this.isConfirmed) {
          this.MASTERDATA['IPDMEDHIS01'].Items[0].Value = res.RoomId
          this.MASTERDATA['IPDMEDHIS03'].Items[0].Value = res.DiseaseHistory
        } else {
        }
      }).catch(() => {
      })
    },
    mapDataUpdate () {
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
              } else {
                item.Value = exited.Value
              }
            } else {
            }
          })
        }
      }
      this.mapData2MDData()
    },
    showDoctorConfirm (TypeConfirm, title) {
      console.log('popupTitle', title)
      this.popupTitle = title
      this.TypeConfirm = TypeConfirm
      this.$modal.show('doctorConfirm')
    },
    getData () {
      this.loaded = false
      if (!this._VisitId) return
      new MedicationHistory().find('A03_124_120421_VE/' + this._VisitId + '?hidemsg=' + true).then(res => {
        this.$store.dispatch('setCurrentFormId', res.ID)
        this.IsLocked = res.IsLocked
        this.nullContent = false
        this.DataSubmit = res
        if (!res.Datas.length) {
          this.FirstCreate = true
        } else {
          this.FirstCreate = false
        }
        if (res.MedicationHistory.length) {
          res.MedicationHistory.map(e => {
            e.LastDoseDate = this.$options.filters.formatDate2(e.LastDoseDate)
          })
          this.dataTable = JSON.stringify(res.MedicationHistory)
        }
        if (res.TPCN.length) {
          res.TPCN.map(e => {
            e.LastDoseDate = this.$options.filters.formatDate2(e.LastDoseDate)
          })
          this.dataTableTPCN = JSON.stringify(res.TPCN)
        }
        this.mapMdData2Data()
        this.pushData()
        this.dataMaster = JSON.stringify(this.MASTERDATA)
        this.loaded = true
      }).catch((e) => {
        if (e.data.ViMessage === 'Form không tồn tại') {
          this.nullContent = true
          this.IsLocked = e.data.IsLocked
        }
        this.loaded = true
      })
    },
    handleSubmit (data) {
      if (!this._VisitId) return
      this.mapDataUpdate()
      const dataSubmit = {
        ...this.DataSubmit,
        MedicationHistoryPediatric: this.DataSubmit.MedicationHistory
      }
      delete dataSubmit.MedicationHistory
      const Data = Object.assign({}, dataSubmit)
      Data.MedicationHistoryPediatric = data[0]
      Data.TPCN = data[1]
      console.log('Data', Data)
      new MedicationHistory().update('/Update/A03_124_120421_VE/' + this._VisitId, Data).then(() => {
        this.toastedSuccess()
        this.reload()
      }).catch(() => {
      })
    },
    async popupSaveNewBorn (data) {
      this.ConfirmKyNhay(data)
    },
    ConfirmKyNhay (data) {
      EventBus.$emit('SaveMedicationHistoryFormNewBorn')
      if (!this._VisitId) return
      new MedicationHistory().update('/Confirm/A03_124_120421_VE/' + this._VisitId, data).then(() => {
        console.log('vao')
        this.toastedSuccess(this.$t('Xác nhận thành công'))
        if (!this.isConfirmed) {
          this.toastedSuccess()
          console.log('ok')
        } else {
          this.scroll2Bottom()
          this.toastedSuccess()
          this.reload()
        }
      }).catch(() => {
      })
    },
    handleBack (check) {
      if (this.dataMaster !== JSON.stringify(this.MASTERDATA) || check) {
        this.confirmPopupBack()
      } else {
        this.back()
      }
    },
    // popup canh bao
    confirmPopupBack () {
      this.$modal.show('dialog', {
        clickToClose: false,
        title: this.__t('Cảnh báo'),
        text: this.__t('Dữ liệu bạn đang làm có thể bị mất nếu chưa lưu'),
        class: 'v-dialog v-dialog-warning',
        buttons: [
          {
            title: this.__t('Đồng ý'),
            class: 'btn btn-warning',
            handler: () => {
              this.$modal.hide('dialog')
              this.back()
            }
          },
          {
            title: this.__t('Hủy bỏ'),
            class: 'btn',
            handler: () => {
              // this.back()
              this.$modal.hide('dialog')
            }
          }
        ]
      })
    },
    handleChange () {
      if (!this.MASTERDATA['IPDMEDHIS05'].Items[0].Value) {
        this.MASTERDATA['IPDMEDHIS05'].Items[1].Value = ''
      }
      if (!this.MASTERDATA['IPDMEDHIS05'].Items[2].Value) {
        this.MASTERDATA['IPDMEDHIS05'].Items[3].Value = ''
      }
    },
    copy (dex) {
      let data = {...this.DataInfo.CurrentDrug[dex]}
      delete data.Id
      data.Dosage = `${data.Dosage || ''} ${data.Dosage && data.Route ? ',' : ''} ${data.Route || ''}`
      data.Note = ''
      data.MedicationPlan = ''
      data.Route = ''
      EventBus.$emit('handleAddMedicationHistoryFormTable', data)
    },
    getAllergy (data) {
      let str = ''
      if (data && data.MasterData.length) {
        if (data.VisitAllergy.IsAllergy === false) {
          if (data.VisitAllergy.Allergy === 'Không xác định') {
            data.MasterData.find(e => {
              if (e.Code === 'IPDIAAUALLENPA') {
                str = this.__label(e)
              }
            })
          } else {
            data.MasterData.find(e => {
              if (e.Code === 'IPDIAAUALLENOO') {
                str = this.__label(e)
              }
            })
          }
        } else if (data.VisitAllergy.IsAllergy === null) {
          str = ''
        } else {
          let select = ''
          data.MasterData.find(e => {
            if (e.Code === 'IPDIAAUALLEKOA') {
              select = this.JSONParse(e.Data)
            }
          })
          var lab = []
          select.find(e => {
            if (data.VisitAllergy.KindOfAllergy.split(',').includes(e.value)) {
              lab.push(this.__t(e.label))
            }
          })
          lab.forEach((e, index) => {
            if (index < (lab.length - 1)) {
              str += e + ', '
            }
            if (index === (lab.length - 1)) {
              str += e
            }
          })
          if (lab.length && data.VisitAllergy.Allergy) {
            str += ' - '
          }
          str += `${data.VisitAllergy.Allergy}`
        }
      }
      return str
    }
  }
}
</script>

<style lang="stylus" scoped>
.MedicationHistoryForm-page {
  color: #000000!important;
  .bold-label {
    color: black;
    display: inline-block;
    margin-right: 20px;
    margin-bottom: 0px;
  }
  .text-right {
    display: inline-block;
    margin-bottom: 0px;
  }
  .text-yellow {
    font-size: 12px;
    font-style: italic;
    font-weight: 600;
  }
  .col-md-6, .col-sm-6, .col-md-12, .col-sm-12, .col-md-7, .col-sm-7 {
    padding-left: 0px;
    padding-right: 0px;
  }
  .label-left {
    width: 177px;
  }
  .mrr122 {
    margin-right: 104px!important;
  }
  .box-tien-su-benh {
    position relative;
    margin-bottom: 10px;
    .text-yellow {
      position: absolute;
      right: 0px;
      bottom: -26px;
    }
  }
  .btn-create {
    display: block;
    margin: 0 auto;
  }
  .big-box-table-1 {
    .mini-box-table1 {
      min-width: 33.29%;
      display: inline-block;
      height: 50px;
      padding: 0 auto;
    }
  }
  input[type=checkbox]:checked:disabled + label:before {
    transform: scale(1);
    background-color: #aaa!important;
    border-color: #aaa!important;
  }
}
</style>
