<template>
 <div class="SurgeryCertificate-content">
   <div class="main-content" v-if="!viewOnly && DataSubmit">
    <div class="a4-page box">
      <table class="table" style="width: 100%">
        <tr style="height: 100px;">
          <th style="text-align: center;" align="center">
            <img class="top-logo" src="/static/Logo Vinmec International Hospitall 1.png" />
          </th>
        </tr>
        <tr>
          <th class="text-center" style="text-align: center;vertical-align: bottom;" align="center">
            <p class="text-center textUppercase fs20 none-mrb">GIẤY CHỨNG NHẬN PHẪU THUẬT</p>
            <p class="text-center textUppercase fs20 none-mrb fw100">SURGERY CERTIFICATE</p>
          </th>
        </tr>
      </table>
      <br>
      <p style="margin-bottom: 10px;"><b style="display: inline;">Khoa/</b>Department: {{DataSubmit.Khoa ? DataSubmit.Khoa : ''}}</p>
      <p style="margin-bottom: 10px;"><b style="display: inline;">Họ, tên người bệnh/</b>Patient's Name: {{DataSubmit.CustomerInfo ? DataSubmit.CustomerInfo.Fullname : ''}}</p>
      <p style="margin-bottom: 10px;"><b style="display: inline;">Số đăng ký/</b>PID: {{DataSubmit.CustomerInfo ? DataSubmit.CustomerInfo.PID : ''}}</p>
      <p v-if="DataSubmit.CustomerInfo" style="margin-bottom: 10px;"><b style="display: inline;">Ngày sinh/</b>D.O.B: {{DataSubmit.CustomerInfo.DateOfBirth | formatDate2}}</p>
      <p v-if="DataSubmit.CustomerInfo" style="margin-bottom: 10px;"><b style="display: inline;">Giới tính/</b>Gender: {{GENDER[DataSubmit.CustomerInfo.Gender] || ''}}</p>
      <p style="margin-bottom: 10px;"><b style="display: inline;">Quốc tịch/</b>Nationality: {{DataSubmit.CustomerInfo ? DataSubmit.CustomerInfo.Nationality : ''}}</p>
      <p style="margin-bottom: 10px;"><b style="display: inline;">Địa chỉ/</b>Address: {{getAddress()}}</p>
      <p style="margin-bottom: 10px;" v-if="MASTERDATA['IPDSURCER01']"><b style="display: inline;">Ngày vào viện/</b>Admission Date: {{MASTERDATA['IPDSURCER01'].Items[0].Value}}</p>
      <p style="margin-bottom: 10px;" v-if="MASTERDATA['IPDSURCER05']"><b style="display: inline;">Ngày ra viện/</b>Discharge Date: {{MASTERDATA['IPDSURCER05'].Items[0].Value}}</p>
      <p style="margin-bottom: 10px;" v-if="MASTERDATA['IPDSURCER03']"><b style="display: inline;">Ngày phẫu thuật/</b>Surgery Date: {{MASTERDATA['IPDSURCER03'].Items[0].Value}}</p>
      <p style="margin-bottom: 10px;" v-if="MASTERDATA['IPDSURCER07']"><b style="display: inline;">Chẩn đoán trước mổ/</b>Preoperative diagnosis: {{getDiagnosisSC(MASTERDATA['IPDSURCER07'].Items[0].Value)}}</p>
      <p style="margin-bottom: 10px;" v-if="MASTERDATA['IPDSURCER21']"><b style="display: inline;">Chẩn đoán sau mổ/</b>Postoperative diagnosis: {{getDiagnosisSC(MASTERDATA['IPDSURCER21'].Items[0].Value)}}</p>
      <p style="margin-bottom: 10px;" v-if="MASTERDATA['IPDSURCER13']"><b style="display: inline;">Phương pháp phẫu thuật/</b>Procedure performed: {{MASTERDATA['IPDSURCER13'].Items[0].Value}}</p>
      <p style="margin-bottom: 10px;" v-if="MASTERDATA['IPDSURCER15']"><b style="display: inline;">Phương pháp vô cảm/</b>Method of anesthesia: {{MASTERDATA['IPDSURCER15'].Items[0].Value}}</p>
      <p style="margin-bottom: 10px;" v-if="versionFormTT === '4'"><b style="display: inline;">Phẫu thuật viên/</b>Surgeon's name: <GetUsers :listUser="getName(DataFormTT.Datas.find(e => e.Code === 'SSNEW28').Value)"></GetUsers></p>
      <p style="margin-bottom: 10px;" v-else-if="versionFormTT === '3'"><b style="display: inline;">Phẫu thuật viên/</b>Surgeon's name: <GetUsers :listUser="getName(DataFormTT.Datas.find(e => e.Code === 'SAPSNEW28').Value)"></GetUsers></p>
      <p style="margin-bottom: 10px;" v-else><b style="display: inline;">Phẫu thuật viên/</b>Surgeon's name: {{MASTERDATA['IPDSURCER17'] ? getName(MASTERDATA['IPDSURCER17'].Items[0].Value) : ''}}</p>
      <p style="margin-bottom: 10px;" v-if="versionFormTT === '4'"><b style="display: inline;">Bác sĩ gây mê/</b>Anesthetist: <GetUsers :listUser="getName(DataFormTT.Datas.find(e => e.Code === 'SSNEW32').Value)"></GetUsers></p>
      <p style="margin-bottom: 10px;" v-else-if="versionFormTT === '3'"><b style="display: inline;">Bác sĩ gây mê/</b>Anesthetist: <GetUsers :listUser="getName(DataFormTT.Datas.find(e => e.Code === 'SAPSNEW32').Value)"></GetUsers></p>
      <p style="margin-bottom: 10px;" v-else><b style="display: inline;">Bác sĩ gây mê/</b>Anesthetist: {{MASTERDATA['IPDSURCER19'] ? getName(MASTERDATA['IPDSURCER19'].Items[0].Value) : ''}}</p>
    </div>
    <div class="a4-page no-style" v-if="data && data.Translations && data.Translations.length > 0">
      {{__t('Xem các bản dịch tiếng')}} :
      <button @click="view(item)" class="btn v-white-btn btn-round" :data="item" :key="index" v-for="(item ,index) in data.Translations">
        <i class="fa fa-share-square-o" aria-hidden="true" v-if="item.Status === 0"></i>
        <i class="fa fa-commenting" aria-hidden="true" v-if="item.Status === 1"></i>
        <i class="fa fa-clock-o" aria-hidden="true" v-if="item.Status === 2"></i>
        <i class="fa fa-check green-color" aria-hidden="true" v-if="item.Status === 3"></i>
        {{__t(item.ToLanguage)}}
      </button>
    </div>
    <div class="a4-page translation-area" v-if="!viewOnly && DataSubmit">
      <translation-request :FormId="_ItemId" :FormCode="'A01_151_050919_VE'" :name="'giấy chứng nhận phẫu thuật'" :VisitId="_VisitId" :ViName="'GIẤY CHỨNG NHẬN PHẪU THUẬT'" :EnName="'SURGERY CERTIFICATE'" />
    </div>
    <p>A01_151_050919_VE</p>
    <div style="text-align: right;margin-bottom: 5px;" v-if="CreateAtHouse !== null">Giờ/Time {{CreateAtHouse}} Ngày/Date {{CreateAt}}</div>
    <div style="text-align: right;margin-bottom: 5px;" v-else>Giờ/Time &emsp;&emsp;&emsp;&emsp;&emsp; Ngày/Date &emsp;&emsp;&emsp;&emsp;&emsp;</div>
    <br/>
    <table style="width: 100%">
      <tr>
        <th style="width: 33%" class="text-center">
          <p style="font-weight: 100;">{{DataSubmit.ProcedureTime}}</p>
          <p><b>Phẫu thuật viên</b> <span class="fw100">/ Surgeon</span></p>
          <div v-if="DataSubmit.ProcedureTime"><ad-Info :ad="DataSubmit.ProcedureDoctor.Username" /></div>
          <div v-else><button @click="showDoctorConfirm('Surgoen', 'Phẫu thuật viên')" class="btn v-white-btn">{{__t('Xác nhận')}}</button></div>
        </th>
        <th style="width: 33%" class="text-center">
          <p style="font-weight: 100;">{{DataSubmit.DeanConfirmTime}}</p>
          <p><b>Trưởng khoa</b> <span class="fw100">/ Head of department</span></p>
          <div v-if="DataSubmit.DeanConfirmTime"><ad-Info :ad="DataSubmit.Dean.Username" /></div>
          <div v-else><button @click="showDoctorConfirm('Head Of Department', 'Trưởng khoa')" class="btn v-white-btn">{{__t('Xác nhận')}}</button></div>
        </th>
        <th style="width: 33%" class="text-center">
          <p style="font-weight: 100;">{{DataSubmit.DirectorTime}}</p>
          <p><b>Giám đốc</b> <span class="fw100">/ Director</span></p>
          <div v-if="DataSubmit.DirectorTime"><ad-Info :ad="DataSubmit.Director.Username" /></div>
          <div v-else><button @click="showDoctorConfirm('Director', 'Giám đốc')" class="btn v-white-btn">{{__t('Xác nhận')}}</button></div>
        </th>
      </tr>
    </table>
    <modal :name="'view-modal'" transition="pop-out" height="auto" :scrollable="false" :width="modalWidth" :class="'no-scroll-x'">
      <div v-if="TranItem && TranItem.Status !== 3">
        <view-item :isTranslate="true" @confirmed="confirmed" :Id="TranItem.Id" :ForDoctor="true"/>
      </div>
      <div v-else>
        <SurgeryCertificateView :dataParent="DataSubmit" :versionFormTT="versionFormTT" :DataFormTT="DataFormTT" :MASTERDATA="MASTERDATA" :isTranView="true" :visitId="_VisitId" :itemId="_ItemId" :DataSubmit="dataTranslated" v-if="dataTranslated" :printId="'printview'" :site="'OPD'"/>
        <div v-else class="loading-text"><v-loading/></div>
      </div>
    </modal>
  </div>
   <!-- footer -->
    <!-- <FloatBlock v-if="!viewOnly" price="true" :openBack="true" @handleBack="handleBack" @handlePrice="handlePrice"> -->
    <FloatBlock v-if="!viewOnly" price="true" :openBack="true" @handleBack="handleBack" @handlePrice="handlePrice">
      <template slot='buttons'>
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
   <surgery-certificate-price :versionFormTT="versionFormTT" :DataFormTT="DataFormTT" :Data="DataSubmit" :MASTERDATA="MASTERDATA" :class="!viewOnly ? 'none' : ''"/>
 </div>
</template>

<script>
import moment from 'moment'
import MixinForm from '@/mixins/form.js'
import DoctorConfirm from './popup/PopupDoctorConfirm.vue'
import SurgeryCertificatePrice from './price/SurgeryCertificatePrice.vue'
import VDateTimePicker from '@/components/VDateTimePicker.vue'
import CreateSurgeryCertificate from '@/services/IPD/SurgeryCertificate/CreateSurgeryCertificate'
// import ListAllProcedureSummary from '@/services/IPD/SurgeryCertificate/ListAllProcedureSummary'
import SurgeryCertificateV3 from '@/services/IPD/SurgeryCertificate/SurgeryCertificateV3'
import GetSurgeryCertificate from '@/services/IPD/SurgeryCertificate/GetSurgeryCertificate'
import SurgeryCertificateConfirm from '@/services/IPD/SurgeryCertificate/SurgeryCertificateConfirm'
import MixinMasterData from '@/mixins/masterdata.js'
import UsersSelect from '@/components/UsersSelect.vue'
import constants from '@/constants'
import SurgeryAndProcedureSummaryV3 from '@/services/SurgeryAndProcedureSummaryV3'
import GetUsers from '@/components/global/GetUsers.vue'
import TranslationRequest from '@/components/Translation/Request.vue'
import ViewItem from '@/components/Translation/View.vue'
import Translation from '@/services/Translation'
import MixinView from '@/mixins/view.js'
import SurgeryCertificateView from './View/Index.vue'
const GENDER = constants.GENDER
const MODAL_WIDTH = 870

export default {
  name: 'IPDSurgeryCertificateItem',
  mixins: [MixinForm, MixinMasterData, MixinView],
  // props: ['viewOnly', 'VisitId', 'formId', 'versionCheck'],
  props: {
    viewOnly: {
      type: Boolean,
      default: false
    },
    VisitId: '',
    formId: '',
    versionCheck: '',
    VisitType: '',
    version: ''
  },
  watch: {
    formId: function (val) {
      if (val) {
        this._ItemId = val
        this.GetListAllProcedureSummary()
      }
    }
  },
  data () {
    return {
      data: null,
      modalWidth: MODAL_WIDTH,
      TranItem: null,
      dataTranslated: null,
      popupTitle: '',
      kind: '',
      DataSubmit: {},
      DataSubmit2: {
        text: '',
        ICD1: null,
        ICD2: null
      },
      IsLocked: false,
      DataAllList: [],
      open1: true,
      isConfirmed: true,
      GENDER: GENDER,
      formIdTT: '',
      versionFormTT: '',
      DataFormTT: null,
      Status: null
    }
  },
  components: {
    DoctorConfirm,
    SurgeryCertificatePrice,
    VDateTimePicker,
    UsersSelect,
    GetUsers,
    TranslationRequest,
    ViewItem,
    SurgeryCertificateView
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
    CreateAtHouse: function () {
      return this.MASTERDATA['IPDSURCER05'].Items[0].Value ? this.$options.filters.formatDateWithoutSecon(this.MASTERDATA['IPDSURCER05'].Items[0].Value).split(' ')[0] : null
    },
    CreateAt: function () {
      return this.MASTERDATA['IPDSURCER05'].Items[0].Value ? this.MASTERDATA['IPDSURCER05'].Items[0].Value.split(' ')[1] : null
    },
    Datas: function () {
      return (this.DataSubmit.Datas.length || [])
    }
  },
  mounted () {
    this.modalWidth = window.innerWidth < MODAL_WIDTH
      ? '90%'
      : MODAL_WIDTH
    // master data
    this.getMasterDatas({Form: 'A01_151_050919_VE'}, () => {
      console.log(this.test)
      this.GetListAllProcedureSummary()
    })
  },
  methods: {
    confirmed () {
      var id = this.TranItem.Id
      this.TranItem = null
      this.view({
        Status: 3,
        Id: id
      })
      this.GetListAllProcedureSummary()
    },
    view (item) {
      if (item.Status === 3) {
        new Translation().find('MedicalReport/Document/' + (item.Id)).then(response => {
          this.dataTranslated = this.mappingTranslation(response)
        })
      } else {
        this.TranItem = item
      }
      this.test = 'TESTMMMMMMMMMMMMM'
      this.$modal.show('view-modal')
      this.reset++
    },
    mappingTranslation (res) {
      var translation = res.Translation
      var objNotTran = [
        'Fullname',
        'Admission',
        'AdmittedDateFirstIpd',
        'DateOfBirth',
        'Date',
        'DeptHead',
        'DeptHeadTime',
        'Director',
        'DirectorTime',
        'Location',
        'PID',
        'PhysicianInCharge',
        'PhysicianInChargeTime',
        'Province',
        'Site',
        'Specialty',
        'Translations',
        'Discharge',
        'ICDCoMorbidities',
        'ICDDiagnosis'
      ]
      for (var key of Object.keys(res)) {
        if (!objNotTran.includes(key)) {
          if (key === 'ClinicalExaminationAndFindings') {
            if (typeof translation[key] === 'string') {
              translation[key] = this.JSONParse(translation[key]) || []
            }
            res[key].forEach(item => {
              var tranEd = (translation[key].find(e => e.ViName === item.ViName) || {Value: ''}).Value
              item.Value = this.trim_(item.Value + (tranEd ? ('/ ' + tranEd) : ''), '/ ')
            })
          } else {
            res[key] = this.trim_([res[key], '/ ', translation[key]].map(e => e).join(''), '/ ')
          }
        }
      }
      return res
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
      if (!this._VisitId) return
      new CreateSurgeryCertificate().update('Create/' + this._VisitId).then(() => {
        this.reload()
      }).catch(e => {
        // this.back()
      })
    },
    async GetListAllProcedureSummary () {
      if (this.MASTERDATA['IPDSURCER03'].Items[0].Value === '') {
        this.MASTERDATA['IPDSURCER03'].Items[0].Value = moment().format('HH:mm DD/MM/YYYY')
      }
      if (this._ItemId) {
        if (this.versionCheck === '2') {
          new GetSurgeryCertificate().find('DetailById/' + this._VisitId + '/' + this._ItemId + '?hidemsg=' + true).then((res) => {
          // new SurgeryCertificateV3().find('DetailById/' + this._VisitId + '/' + this._ItemId + '?hidemsg=' + true).then((res) => {
            // this.DataAllList = res
            this.data = res
            console.log(this.versionFormTT, 'checkckkkkkkkkkkkkkkkkkkkkk')
            this.DataSubmit = res
            this.versionFormTT = ''
            this.mapMdData2Data()
            if (this.MASTERDATA['IPDSURCER09'].Items[0].Value) {
              this.DataSubmit2.ICD1 = this.JSONParse(this.MASTERDATA['IPDSURCER09'].Items[0].Value)
            }
            if (this.MASTERDATA['IPDSURCER11'].Items[0].Value) {
              this.DataSubmit2.ICD2 = this.JSONParse(this.MASTERDATA['IPDSURCER11'].Items[0].Value)
            }
            if (this.MASTERDATA['IPDSURCER01']) {
              this.MASTERDATA['IPDSURCER01'].Items[0].Value = res.NgayVaoVien
            }
            if (this.MASTERDATA['IPDSURCER05']) {
              this.MASTERDATA['IPDSURCER05'].Items[0].Value = res.NgayRaVien
            }
          }).catch(e => {
            // this.back()
          })
        } else {
          // new GetSurgeryCertificate().find('DetailById/' + this._VisitId + '/' + this._ItemId + '?hidemsg=' + true).then((res) => {
          await new SurgeryCertificateV3().find('DetailById/' + this._VisitId + '/' + this._ItemId + '?hidemsg=' + true).then((res) => {
            // this.DataAllList = res
            this.data = res
            this.formIdTT = res.FormId
            this.DataSubmit = res
            this.mapMdData2Data()
            if (this.MASTERDATA['IPDSURCER09'].Items[0].Value) {
              this.DataSubmit2.ICD1 = this.JSONParse(this.MASTERDATA['IPDSURCER09'].Items[0].Value)
            }
            if (this.MASTERDATA['IPDSURCER11'].Items[0].Value) {
              this.DataSubmit2.ICD2 = this.JSONParse(this.MASTERDATA['IPDSURCER11'].Items[0].Value)
            }
            if (this.MASTERDATA['IPDSURCER01']) {
              this.MASTERDATA['IPDSURCER01'].Items[0].Value = res.NgayVaoVien
            }
            if (this.MASTERDATA['IPDSURCER05']) {
              this.MASTERDATA['IPDSURCER05'].Items[0].Value = res.NgayRaVien
            }
          }).catch(e => {
            // this.back()
          })
          console.log(this._VisitType, 'join api 1')
          new SurgeryAndProcedureSummaryV3({}, this._VisitType).find('GetDetail/' + this._VisitId + '/' + this.formIdTT + '?hidemsg=' + true).then(response => {
            console.log('join api 2')
            this.DataFormTT = response
            this.versionFormTT = response.Version
            console.log(this.versionFormTT, 'checkckkkkkkkkkkkkkkkkkkkkk this api')
          }).catch(e => {
            console.log(e, 'join api')
            new GetSurgeryCertificate().find('DetailById/' + this._VisitId + '/' + this._ItemId + '?hidemsg=' + true).then((res) => {
              // new SurgeryCertificateV3().find('DetailById/' + this._VisitId + '/' + this._ItemId + '?hidemsg=' + true).then((res) => {
              // this.DataAllList = res
              this.DataSubmit = res
              this.data = res
              this.mapMdData2Data()
              if (this.MASTERDATA['IPDSURCER09'].Items[0].Value) {
                this.DataSubmit2.ICD1 = this.JSONParse(this.MASTERDATA['IPDSURCER09'].Items[0].Value)
              }
              if (this.MASTERDATA['IPDSURCER11'].Items[0].Value) {
                this.DataSubmit2.ICD2 = this.JSONParse(this.MASTERDATA['IPDSURCER11'].Items[0].Value)
              }
              if (this.MASTERDATA['IPDSURCER01']) {
                this.MASTERDATA['IPDSURCER01'].Items[0].Value = res.NgayVaoVien
              }
              if (this.MASTERDATA['IPDSURCER05']) {
                this.MASTERDATA['IPDSURCER05'].Items[0].Value = res.NgayRaVien
              }
            }).catch(e => {
              // this.back()
            })
          })

          console.log('join api 3')
        }
      }
    },
    handleBack () {
      this.back()
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
      new GetSurgeryCertificate().update(this._VisitId, DataSubmit).then(response => {
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
      this.ConfirmKyNhay2(data)
    },
    ConfirmKyNhay2 (data) {
      if (this._ItemId) {
        new SurgeryCertificateConfirm().update(this._ItemId, data).then(() => {
          this.scroll2Bottom()
          this.toastedSuccess()
          this.reload()
        }).catch((e) => {
        })
      }
    },
    getAddress () {
      let str = ''
      if (this.DataSubmit && this.DataSubmit.CustomerInfo) {
        return [
          this.DataSubmit.CustomerInfo.MOHAddress,
          this.DataSubmit.CustomerInfo.MOHDistrict,
          this.DataSubmit.CustomerInfo.MOHProvince
        ].filter(e => e).join(', ')
      }
      return str
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
    },
    getName (nameInfo) {
      // let name = nameInfo
      // if (nameInfo && nameInfo.split(' (').length) {
      //   name = nameInfo.split(' (')[0]
      // }
      // return name
      if (typeof nameInfo === 'object' || nameInfo.includes('[')) {
        nameInfo = JSON.parse(nameInfo).map(e => e)
        if (nameInfo) {
          nameInfo = nameInfo.join(',').replace(/ *\([^)]*\) */g, '')
        }
      } else if (typeof nameInfo === 'string' && nameInfo.includes('(')) {
        console.log(nameInfo)
        if (nameInfo && nameInfo.split(' (').length) {
          nameInfo = nameInfo.split(' (')[0]
        }
      }
      return nameInfo
    },
    getDiagnosisSC (Diagnosis) {
      let str = Diagnosis
      if (Diagnosis && Diagnosis.includes('()')) {
        str = ''
      }
      return str
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
