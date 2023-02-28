<template>
 <div class="SurgeryCertificate-content">
   <div class="row" v-if="!nullContent && !viewOnly">
     <div class="col-md-12 col-sm-12">
       <!-- box date time -->
      <div class="box1 mrb10 flex align-center">
        <div class="box-date flex align-center space-between mrr30">
          <div class="title-date fw600 mrr10">{{__t('SurgeryCertificate.label1')}}</div>
          <v-date-time-picker v-if="MASTERDATA['IPDSURCER01']" readonly="true" :hideTooltip="true" v-model="MASTERDATA['IPDSURCER01'].Items[0].Value" :format="vDateTimeFormat"/>
        </div>
        <div class="box-date flex align-center space-between mrr30">
          <div class="title-date fw600 mrr10">{{__t('SurgeryCertificate.label2')}}</div>
          <v-date-time-picker v-if="MASTERDATA['IPDSURCER03'] && !isConfirmed" :hideTooltip="true" v-model="MASTERDATA['IPDSURCER03'].Items[0].Value" :format="vDateTimeFormat"/>
          <v-date-time-picker v-if="MASTERDATA['IPDSURCER03'] && isConfirmed" readonly="true" :hideTooltip="true" v-model="MASTERDATA['IPDSURCER03'].Items[0].Value" :format="vDateTimeFormat"/>
        </div>
        <div class="box-date flex align-center space-between mrr30">
          <div class="title-date fw600 mrr10">{{__t('SurgeryCertificate.label3')}}</div>
          <v-date-time-picker v-if="MASTERDATA['IPDSURCER05']" readonly="true" :hideTooltip="true" v-model="MASTERDATA['IPDSURCER05'].Items[0].Value" :format="'HH:mm DD/MM/YYYY'"/>
        </div>
      </div>
      <p class="fw600" v-if="DataAllList.length > 0">{{__t('SurgeryCertificate.label4')}}</p>
      <!-- All list -->
      <div v-if="DataAllList.length > 0" v-for="(item, index) in DataAllList" :key="index">
        <MDCollapse :id="'id-' + index" :rowClick="true">
          <div slot="label">
            <p class="fw600">{{item.CreatedAt | formatDateWithoutSecon}} {{item.CreatedBy ? '-' : null}} <ad-Info :ad="item.CreatedBy" /></p>
          </div>
          <div slot="content" class="box-ed-content">
            <table class="table observation-table">
                <tr>
                  <th width="180px">{{__t('SurgeryCertificate.label5')}}</th>
                  <th width="180px">{{__t('SurgeryCertificate.label6')}}</th>
                  <th>{{__t('SurgeryCertificate.label7')}}</th>
                  <th width="160px">{{__t('SurgeryCertificate.label8')}}</th>
                  <th width="150px">PTV</th>
                  <th width="150px">{{__t('SurgeryCertificate.label10')}}</th>
                  <th width="50px" v-if="!isConfirmed"></th>
                </tr>
                <tr>
                  <td>{{item.ChanDoanTruocPhauThuat ? item.ChanDoanTruocPhauThuat : 'N/A'}}</td>
                  <td>{{item.ChanDoanSauPhauThuat ? item.ChanDoanSauPhauThuat : 'N/A'}}</td>
                  <td>{{item.PhuongPhapPhauThuat ? item.PhuongPhapPhauThuat : 'N/A'}}</td>
                  <td>{{item.PhuongPhapVoCam ? item.PhuongPhapVoCam : 'N/A'}}</td>
                  <td>{{item.PhauThuanVien ? item.PhauThuanVien : 'N/A'}}</td>
                  <td>{{item.BacSiGayMe ? item.BacSiGayMe : 'N/A'}}</td>
                  <td v-if="!isConfirmed" class="text-center">
                    <button class="btn btn-xs" @click="handleCopy(index)">Copy</button>
                    <!-- <div v-if="!isConfirmed" class="box-copy cursor" @click="handleCopy(index)">copy</div>
                    <div v-else class="box-copy">copy</div> -->
                  </td>
                </tr>
              </table>
          </div>
        </MDCollapse>
      </div>
      <p class="fw600">{{__t('SurgeryCertificate.label5')}}</p>
      <icd10 v-if="!isConfirmed" @icdChange="icdChange" v-model="DataSubmit2.ICD1"/>
      <Icd10View2 v-else :value="DataSubmit2.ICD1"/>
      <textarea-autosize v-if="MASTERDATA['IPDSURCER07']" :readonly="isConfirmed" class="form-control mrb10 mt-5" rows="3" :placeholder="__t('Nhập')"  v-model="MASTERDATA['IPDSURCER07'].Items[0].Value"/>
      <p class="fw600 mt-40">{{__t('SurgeryCertificate.label6')}}</p>
      <icd10 v-if="!isConfirmed" @icdChange="icdChange2" v-model="DataSubmit2.ICD2"/>
      <Icd10View2 v-else :value="DataSubmit2.ICD2"/>
      <textarea-autosize v-if="MASTERDATA['IPDSURCER21']" :readonly="isConfirmed" class="form-control mrb10 mt-5" rows="3" :placeholder="__t('Nhập')"  v-model="MASTERDATA['IPDSURCER21'].Items[0].Value"/>
      <p class="fw600 mt-40">{{__t('SurgeryCertificate.label7')}}</p>
      <div class="mb10" v-if="MASTERDATA['IPDSURCER13']">
        <textarea-autosize class="form-control" rows="3" :readonly="isConfirmed" :placeholder="__t('Nhập')"  v-model="MASTERDATA['IPDSURCER13'].Items[0].Value"/>
      </div>
      <p class="fw600 mt-40">{{__t('SurgeryCertificate.label8')}}</p>
      <div class="mb10" v-if="MASTERDATA['IPDSURCER15']">
        <textarea-autosize class="form-control" rows="3" :readonly="isConfirmed" :placeholder="__t('Nhập')"  v-model="MASTERDATA['IPDSURCER15'].Items[0].Value"/>
      </div>
      <div class="flex align-center">
        <div class="fw600 mrr20 mt-40" style="width: 123px;">{{__t('SurgeryCertificate.label9')}}</div>
        <div v-if="MASTERDATA['IPDSURCER17']" class="full-width mt-40">
          <div
            :data="item"
            :key="index"
            v-for="(item, index) in MASTERDATA['IPDSURCER17'].Items"
          >
            <user-auto-suggest
              :position="'ALL'"
              :readonly="isConfirmed"
              :data-code="item.Code"
              :id="item.Code"
              :data="item"
              :placeholder="__label(item)"
              v-model="item.Value"
            />
          </div>
        </div>
      </div>
      <br>
      <div class="flex align-center mt-20">
        <div class="fw600 mrr20" style="width: 123px;">{{__t('SurgeryCertificate.label10')}}</div>
        <!-- <textarea-autosize v-if="MASTERDATA['IPDSURCER19']" :readonly="isConfirmed" class="form-control" rows="1" :placeholder="__t('Nhập')"  v-model="MASTERDATA['IPDSURCER19'].Items[0].Value"/> -->
        <div v-if="MASTERDATA['IPDSURCER19']" class="full-width">
          <div
            :data="item"
            :key="index"
            v-for="(item, index) in MASTERDATA['IPDSURCER19'].Items"
          >
            <user-auto-suggest
              :position="'ALL'"
              :readonly="isConfirmed"
              :data-code="item.Code"
              :id="item.Code"
              :data="item"
              :placeholder="__label(item)"
              v-model="item.Value"
            />
          </div>
        </div>
      </div>
       <div class="a4-page no-style mrt20 mt-20">
        <table style="width: 100%">
          <tr>
            <th style="width: 33%" class="text-center">
              <p style="font-weight: 100;">{{DataSubmit.ProcedureTime}}</p>
              <p><b>{{__t('SurgeryCertificate.label13')}}</b></p>
              <div v-if="DataSubmit.ProcedureTime"><ad-Info :ad="DataSubmit.ProcedureDoctor.Username" /></div>
              <div v-else><button @click="showDoctorConfirm('Surgoen', 'Phẫu thuật viên')" class="btn v-white-btn">{{__t('Xác nhận')}}</button></div>
            </th>
            <th style="width: 33%" class="text-center">
              <p style="font-weight: 100;">{{DataSubmit.DeanConfirmTime}}</p>
              <p><b>{{__t('SurgeryCertificate.label14')}}</b></p>
              <div v-if="DataSubmit.DeanConfirmTime"><ad-Info :ad="DataSubmit.Dean.Username" /></div>
              <div v-else><button @click="showDoctorConfirm('Head Of Department', 'Trưởng khoa')" class="btn v-white-btn">{{__t('Xác nhận')}}</button></div>
            </th>
            <th style="width: 33%" class="text-center">
              <p style="font-weight: 100;">{{DataSubmit.DirectorTime}}</p>
              <p><b>{{__t('SurgeryCertificate.label12')}}</b></p>
              <div v-if="DataSubmit.DirectorTime"><ad-Info :ad="DataSubmit.Director.Username" /></div>
              <div v-else><button @click="showDoctorConfirm('Director', 'Giám đốc')" class="btn v-white-btn">{{__t('Xác nhận')}}</button></div>
            </th>
          </tr>
        </table>
      </div>
     </div>
   </div>
   <!-- footer -->
    <FloatBlock v-if="!viewOnly" price="true" :showForm="!nullContent" :nullContent="nullContent" @handleBack="handleBack" @handlePrice="handlePrice">
      <template slot='buttons' v-if="!nullContent">
        <div class="col-md-2 col-sm-2">
          <div class="form-group1">
          </div>
        </div>
        <div class="col-md-4 col-sm-4">
          <div class="form-group1">
          </div>
        </div>
        <div class="col-md-6 col-sm-6" v-if="condition && condition === 'Doctor' && !isConfirmed">
          <div class="form-group1">
            <button class="btn v-yellow-btn pull-right btn-block hvr-ripple-out" @click="handleSave"><i class="fa fa-floppy-o" aria-hidden="true"></i> {{__t('btn.luu')}}</button>
          </div>
        </div>
      </template>
    </FloatBlock>
   <doctor-confirm :popupTitle="popupTitle" :kind="kind" @popupSave="popupSave"/>
   <surgery-certificate-price :Data="DataSubmit" :MASTERDATA="MASTERDATA" :class="!viewOnly ? 'none' : ''"/>
 </div>
</template>

<script>
import moment from 'moment'
import MixinForm from '@/mixins/form.js'
import DoctorConfirm from './popup/PopupDoctorConfirm.vue'
import SurgeryCertificatePrice from './price/SurgeryCertificatePrice.vue'
import VDateTimePicker from '@/components/VDateTimePicker.vue'
import CreateSurgeryCertificate from '@/services/IPD/SurgeryCertificate/CreateSurgeryCertificate'
import ListAllProcedureSummary from '@/services/IPD/SurgeryCertificate/ListAllProcedureSummary'
import GetSurgeryCertificate from '@/services/IPD/SurgeryCertificate/GetSurgeryCertificate'
import SurgeryCertificateConfirm from '@/services/IPD/SurgeryCertificate/SurgeryCertificateConfirm'
import MixinMasterData from '@/mixins/masterdata.js'
import UsersSelect from '@/components/UsersSelect.vue'
import MDCollapse from '@/components/global/MDCollapse.vue'
export default {
  name: 'SurgeryCertificate-content',
  mixins: [MixinForm, MixinMasterData],
  props: {
    viewOnly: {
      type: Boolean,
      default: false
    },
    VisitId: ''
  },
  data () {
    return {
      nullContent: true,
      popupTitle: '',
      kind: '',
      dataMaster: null,
      DataSubmit: {},
      DataSubmit2: {
        text: '',
        ICD1: null,
        ICD2: null
      },
      IsLocked: false,
      DataAllList: [],
      open1: true
    }
  },
  components: {
    DoctorConfirm,
    SurgeryCertificatePrice,
    VDateTimePicker,
    UsersSelect,
    MDCollapse
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
    isConfirmed () {
      return (this.DataSubmit.DeanConfirmTime || this.DataSubmit.DirectorTime || this.DataSubmit.ProcedureTime || this.viewOnly || this.IsLocked)
    }
  },
  mounted () {
    // master data
    this.getMasterDatas({Form: 'A01_151_050919_VE'}, () => {
      this.getData()
    })
  },
  methods: {
    // master data
    getData () {
      if (this.MASTERDATA['IPDSURCER03'].Items[0].Value === '') {
        this.MASTERDATA['IPDSURCER03'].Items[0].Value = moment().format('HH:mm DD/MM/YYYY')
      }
      new GetSurgeryCertificate().find(this._VisitId + '?hidemsg=' + true).then(response => {
        this.nullContent = false
        this.DataSubmit = response
        this.IsLocked = response.IsLocked
        this.GetListAllProcedureSummary()
        this.mapMdData2Data()
        this.dataMaster = JSON.stringify(this.MASTERDATA)
        if (this.MASTERDATA['IPDSURCER09'].Items[0].Value) {
          this.DataSubmit2.ICD1 = this.JSONParse(this.MASTERDATA['IPDSURCER09'].Items[0].Value)
        }
        if (this.MASTERDATA['IPDSURCER11'].Items[0].Value) {
          this.DataSubmit2.ICD2 = this.JSONParse(this.MASTERDATA['IPDSURCER11'].Items[0].Value)
        }
        if (this.MASTERDATA['IPDSURCER01']) {
          this.MASTERDATA['IPDSURCER01'].Items[0].Value = response.NgayVaoVien
        }
        if (this.MASTERDATA['IPDSURCER05']) {
          this.MASTERDATA['IPDSURCER05'].Items[0].Value = response.NgayRaVien
        }
      }).catch(e => {
        if (e.data.ViMessage === 'Phiếu phẫu thuật/ thủ thuật không tồn tại') {
          this.nullContent = true
          this.DataSubmit = {}
        }
        if (e.data.IsLocked) {
          this.IsLocked = true
        }
        if (e.status === 404) {}
      })
    },
    // popup canh bao
    confirmPopup () {
      this.$modal.show('dialog', {
        clickToClose: false,
        title: this.__t('Thông báo'),
        text: this.__t('SurgeryCertificate.confirm'),
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
      // this.nullContent = false
      if (!this._VisitId) return
      new CreateSurgeryCertificate().update('Create/' + this._VisitId).then(() => {
        this.reload()
      }).catch(e => {
        // this.back()
      })
    },
    GetListAllProcedureSummary () {
      new ListAllProcedureSummary().find(this._VisitId + '?hidemsg=' + true).then((res) => {
        this.DataAllList = res
      }).catch(e => {
        // this.back()
      })
    },
    handleBack () {
      if (this.dataMaster !== JSON.stringify(this.MASTERDATA)) {
        this.confirmPopupBack()
      } else {
        this.back()
      }
    },
    showDoctorConfirm (kind, title) {
      this.popupTitle = title
      this.kind = kind
      this.$modal.show('doctorConfirm')
    },
    handlePrice () {
      this.$htmlToPaper3('SurgeryCertificate-price', false, 'A01_151_050919_VE')
    },
    icdChange (value) {
      var val = (value || []).map(e => e.ViName)
      var currentValue = this.MASTERDATA['IPDSURCER07'].Items[0].Value || ''
      this.MASTERDATA['IPDSURCER07'].Items[0].Value = ([currentValue].concat(val.filter(e => !currentValue.includes(e)))).filter(e => e).join(', ')
      if (this.DataSubmit2.ICD1) {
        const array = []
        this.DataSubmit2.ICD1.forEach(elm => {
          array.push(elm)
        })
        this.MASTERDATA['IPDSURCER09'].Items[0].Value = JSON.stringify(array)
      } else {
        this.MASTERDATA['IPDSURCER09'].Items[0].Value = ''
      }
    },
    icdChange2 (value) {
      var val = (value || []).map(e => e.ViName)
      var currentValue = this.MASTERDATA['IPDSURCER21'].Items[0].Value || ''
      this.MASTERDATA['IPDSURCER21'].Items[0].Value = ([currentValue].concat(val.filter(e => !currentValue.includes(e)))).filter(e => e).join(', ')
      if (this.DataSubmit2.ICD2) {
        const array = []
        this.DataSubmit2.ICD2.forEach(elm => {
          array.push(elm)
        })
        this.MASTERDATA['IPDSURCER11'].Items[0].Value = JSON.stringify(array)
      } else {
        this.MASTERDATA['IPDSURCER11'].Items[0].Value = ''
      }
    },
    handleCopy (index) {
      if (!this.isConfirmed) {
        let ChanDoanTruocPhauThuat = this.DataAllList[index].ChanDoanTruocPhauThuat || ''
        if (ChanDoanTruocPhauThuat && !this.MASTERDATA['IPDSURCER07'].Items[0].Value.includes(ChanDoanTruocPhauThuat)) {
          if (this.MASTERDATA['IPDSURCER07'].Items[0].Value) {
            this.MASTERDATA['IPDSURCER07'].Items[0].Value = this.MASTERDATA['IPDSURCER07'].Items[0].Value + ', ' + ChanDoanTruocPhauThuat
          } else {
            this.MASTERDATA['IPDSURCER07'].Items[0].Value = ChanDoanTruocPhauThuat
          }
        }
        let ChanDoanSauPhauThuat = this.DataAllList[index].ChanDoanSauPhauThuat || ''
        if (ChanDoanSauPhauThuat && !this.MASTERDATA['IPDSURCER21'].Items[0].Value.includes(ChanDoanSauPhauThuat)) {
          if (this.MASTERDATA['IPDSURCER21'].Items[0].Value) {
            this.MASTERDATA['IPDSURCER21'].Items[0].Value = this.MASTERDATA['IPDSURCER21'].Items[0].Value + ', ' + ChanDoanSauPhauThuat
          } else {
            this.MASTERDATA['IPDSURCER21'].Items[0].Value = ChanDoanSauPhauThuat
          }
        }
        let PhuongPhapPhauThuat = this.DataAllList[index].PhuongPhapPhauThuat || ''
        if (PhuongPhapPhauThuat && !this.MASTERDATA['IPDSURCER13'].Items[0].Value.includes(PhuongPhapPhauThuat)) {
          if (this.MASTERDATA['IPDSURCER13'].Items[0].Value) {
            this.MASTERDATA['IPDSURCER13'].Items[0].Value = this.MASTERDATA['IPDSURCER13'].Items[0].Value + ', ' + PhuongPhapPhauThuat
          } else {
            this.MASTERDATA['IPDSURCER13'].Items[0].Value = PhuongPhapPhauThuat
          }
        }
        let PhuongPhapVoCam = this.DataAllList[index].PhuongPhapVoCam || ''
        if (PhuongPhapVoCam && !this.MASTERDATA['IPDSURCER15'].Items[0].Value.includes(PhuongPhapVoCam)) {
          if (this.MASTERDATA['IPDSURCER15'].Items[0].Value) {
            this.MASTERDATA['IPDSURCER15'].Items[0].Value = this.MASTERDATA['IPDSURCER15'].Items[0].Value + ', ' + PhuongPhapVoCam
          } else {
            this.MASTERDATA['IPDSURCER15'].Items[0].Value = PhuongPhapVoCam
          }
        }
        let PhauThuanVien = this.DataAllList[index].PhauThuanVien || ''
        if (PhauThuanVien && !this.MASTERDATA['IPDSURCER17'].Items[0].Value.includes(PhauThuanVien)) {
          if (this.MASTERDATA['IPDSURCER17'].Items[0].Value) {
            this.MASTERDATA['IPDSURCER17'].Items[0].Value = this.MASTERDATA['IPDSURCER17'].Items[0].Value + ', ' + PhauThuanVien
          } else {
            this.MASTERDATA['IPDSURCER17'].Items[0].Value = PhauThuanVien
          }
        }
        let BacSiGayMe = this.DataAllList[index].BacSiGayMe || ''
        if (BacSiGayMe && !this.MASTERDATA['IPDSURCER19'].Items[0].Value.includes(BacSiGayMe)) {
          if (this.MASTERDATA['IPDSURCER19'].Items[0].Value) {
            this.MASTERDATA['IPDSURCER19'].Items[0].Value = this.MASTERDATA['IPDSURCER19'].Items[0].Value + ', ' + BacSiGayMe
          } else {
            this.MASTERDATA['IPDSURCER19'].Items[0].Value = BacSiGayMe
          }
        }
      }
    },
    handleSave () {
      this.handleSubmit()
    },
    handleSubmit (data) {
      this.mapData2MDData()
      const DataSubmit = Object.assign({}, this.DataSubmit)
      new GetSurgeryCertificate().update(this.DataSubmit.Id, DataSubmit).then(response => {
        if (!data) {
          this.toastedSuccess()
          this.reload()
        }
        if (data) {
          this.ConfirmKyNhay2(data)
        }
      })
    },
    popupSave (data) {
      if (!this.isConfirmed) {
        this.handleSubmit(data)
      } else {
        this.ConfirmKyNhay2(data)
      }
    },
    ConfirmKyNhay2 (data) {
      new SurgeryCertificateConfirm().update(this.DataSubmit.Id, data).then(() => {
        this.scroll2Bottom()
        this.toastedSuccess()
        this.reload()
      }).catch((e) => {
        // this.toastedSuccess(e.data.ViMessage)
        // this.toastedError(e.data.ViMessage)
        // this.reload()
      })
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
    }
  }
}
</script>

<style lang="stylus" scoped>
.SurgeryCertificate-content {
  .btn-create {
    display: block;
    margin: 0 auto;
  }
  .inline {
    display: inline-block;
  }
  .box-select {
    width: 100%;
    border: 1px solid black;
    color: #fff;
    background: #337AB7;
    border-radius: 3px;
    font-weight: 600;
    padding: 5px;
    position relative;
    .text-label {
      margin-bottom: 0px!important;
    }
    .icon {
      color: #fff;
      position absolute;
      font-size: 18px;
      right: 5px;
      top: 5px;
      font-weight: 600;
      cursor: pointer;
    }
  }
  .box-ed-content {
      border-radius: 4px;
      th {
        padding: 2px 5px;
      }
      td {
        padding: 3px 5px;
      }
      .box-copy {
        border: 1px solid black;
        border-radius: 4px;
        font-weight: 400;
        background: #f5f5f5;
      }
    }
}
</style>
