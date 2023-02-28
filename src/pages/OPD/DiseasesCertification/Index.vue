<template>
  <div class="main-content" id="di0-page">
    <div v-if="checkIsCreate" class="a4-page box" id="printMe">
      <div class="text-center" style="text-align: center"><img class="top-logo" src="/static/Logo Vinmec International Hospitall 1.png" /></div>
      <h2 class="title-page text-center" style="text-align: center; font-size: 20px">GIẤY XÁC NHẬN TÌNH TRẠNG BỆNH TẬT</h2>
      <h2 class="title-page text-center" style="text-align: center; font-size: 20px"><i>MEDICAL CERTIFICATE</i></h2>
      <p class="text-center mt-40">{{data.Hospital.ViName}} XÁC NHẬN/ {{data.Hospital.EnName}}:</p>
      <div class="mt-20" style="display: flex">
        <div style="width:70%"><p><b>Bệnh nhân/ <i>Patient’s name</i>: {{data.NameCustumer}}</b></p></div>
        <div><p><b>Giới tính/ <i>Gender</i>:</b>{{data.GenderCustumer === 1 ? 'Nam' : 'Nữ'}}</p></div>
      </div>
      <p><b>Ngày sinh/ <i>D.O.B</i>:</b>  {{data.DateOfBirthCustumer}}</p>
      <p><b>Họ tên bố/ <i>Father’s full name</i>:</b> {{data.FatherCustumer}}</p>
      <p><b>Họ tên mẹ/ <i>Mother’s full name</i>:</b> {{data.MotherCustumer}}</p>
      <p><b>Địa chỉ/ <i>Address</i>: </b>{{data.Address}}</p>
      <p>Đã khám ngoại trú taị bệnh viện đa khoa quốc tế Vinmec/ <i>Outpatient visits at Vinmec International Hospital</i></p>
      <div class="mt-10" style="display: flex">
        <div style="width:40%"><p><b>Số hồ sơ/ <i>PID</i>:</b> {{data.PID}}</p></div>
        <div>
          <p><b>Ngày khám/ <i>Date of visit</i>:</b> ngày/ <i>day</i> {{nowDate.day}} tháng/ <i>month</i> {{nowDate.month}} năm/ <i>year</i> {{nowDate.year}}</p>
        </div>
      </div>
      <p><b>Chẩn đoán/ <i>Diagnosis</i>:</b>  {{data.Diagnose}}</p>
      <p><b>Hướng điều trị/ <i>Treatment plans</i>:</b>  {{data.TreatmentDirection}}</p>
      <div style="display: flex">
        <div style="width:50%; float: right">
        <br/>
        <br/>
        <p style="font-weight: bold; margin-left:15px">Xác nhận của bệnh viện/ <i>Hospital’s confirmation</i></p>
        <br/>
        <div style="display: flex">
          <div>
            <p>Chữ ký của bác sĩ/ <i>Doctor’s signature</i>: {{data.UserDoctorConfirmed.FullName}}</p>
            </div>
          <div class="ml-20" style="margin-top:-10px" v-if="!data.UserHospitalConfirmation.UserName && !viewOnly"><button @click="showDoctorConfirm('hospital', 'BỆNH VIỆN')" class="btn v-white-btn">{{__t('Xác nhận')}}</button></div>
        </div>
        <p>Công tác tại khoa/ <i>Working at Department of</i>:  {{data.Specialty.ViName}}</p>
        <p>Bệnh viện đa khoa quốc tế Vinmmec là đúng/ <i>At Vinmec International General Hospital is valid</i></p>
        <p style="font-style: italic">{{data.Location}}, ngày/ <i>day</i> {{nowDate.day}} tháng/ <i>month</i> {{nowDate.month}} năm/ <i>year</i> {{nowDate.year}}</p>
        <br/>
        <br/>
        <p v-if="data.UserHospitalConfirmation.UserName" style="margin-left:10px">{{data.UserHospitalConfirmation.FullName}}</p>
        </div>
        <div style="width:50%; float: right">
        <p style="font-style: italic">
          {{data.Location}}, ngày/ <i>day</i> {{nowDate.day}} tháng/ <i>month</i> {{nowDate.month}} năm/ <i>year</i> {{nowDate.year}}
        </p>
        <p class="text-center" style="font-weight: bold;">Bác sĩ/ <i>Doctor</i></p>
        <p class="text-center" style="font-style: italic">(Ký, ghi rõ họ tên)</p>
        <p class="text-center" v-if="!data.UserDoctorConfirmed.UserName && !viewOnly"><button @click="showDoctorConfirm('doctor', 'BÁC SĨ')" class="btn v-white-btn">{{__t('Xác nhận')}}</button></p>
        <br/>
        <br/>
        <p class="text-center" v-if="data.UserDoctorConfirmed.UserName">{{data.UserDoctorConfirmed.FullName}}</p>
        </div>
      </div>
       <br/>
      <br/>
      <p>A01_215_030820_V</p>
    </div>
    <div v-else class="text-center">
      <h1 class="fs-16 text-bold">{{__t('general.giay_xac_nhan')}}</h1>
      <h4>{{__t('Giấy xác nhận tình trạng bệnh tật không tồn tại!')}}</h4>
      <p><button class="btn btn-back v-white-btn" type="button" @click="back()">{{__t('btn.back')}}</button></p>
    </div>
    <div class="a4-page no-style" v-if="data.Translations && data.Translations.length && !viewOnly">
      {{__t('Xem các bản dịch tiếng')}} :
      <button @click="view(item)" class="btn v-white-btn btn-round" :data="item" :key="index" v-for="(item ,index) in data.Translations">
        <i class="fa fa-share-square-o" aria-hidden="true" v-if="item.Status === 0"></i>
        <i class="fa fa-commenting" aria-hidden="true" v-if="item.Status === 1"></i>
        <i class="fa fa-clock-o" aria-hidden="true" v-if="item.Status === 2"></i>
        <i class="fa fa-check green-color" aria-hidden="true" v-if="item.Status === 3"></i>
        {{__t(item.ToLanguage)}}
      </button>
    </div>
    <div class="a4-page translation-area" v-if="!viewOnly">
      <translation-request :name="'giấy xác nhận tình trạng bệnh tật'" :VisitId="_VisitId" :ViName="'GIẤY XÁC NHẬN TÌNH TRẠNG BỆNH TẬT'" :EnName="'ILLNESS CERTIFICATE'" />
    </div>
    <div class="a4-page no-style" v-if="!viewOnly && checkIsCreate">
      <div class="">
        <button class="btn pull-left btn-back v-white-btn" type="button" @click="back()">Quay lại</button>
        <button class="btn v-yellow-btn pull-right" v-shortkey="['ctrl', 'p']" @shortkey="print()" @click="print"><i class="fa fa-print" aria-hidden="true"></i> In ngay</button>
      </div>
    </div>
    <modal :name="'view-modal'" transition="pop-out" height="auto" :scrollable="false" :width="modalWidth" :class="'no-scroll-x'">
      <div v-if="TranItem && TranItem.Status !== 3">
        <view-item :isTranslate="true" @confirmed="confirmed" :Id="TranItem.Id" :PkntVersion="data.PkntVersion" :ForDoctor="true" />
      </div>
      <div v-else>
        <DiseasesCertificationView :dataParent="data" :nowDate="nowDate" :user="user" :isTranView="true" :PkntVersion="data.PkntVersion" :data="dataTranslated" v-if="dataTranslated" :printId="'printview'"/>
        <div v-else class="loading-text"><v-loading/></div>
      </div>
    </modal>
    <modal name="doctorConfirm" transition="pop-out" id="doctor-login" height="auto" :clickToClose="false">
      <div class="box v-model-content-popup">
        <div class="box-header text-center">
          <h3 class="box-title">{{popupTitle}} xác nhận</h3>
          <div style="color: #fff">{{__t('Vui lòng nhập tài khoản ad để xác nhận')}}</div>
        </div>
        <div class="form-confirm">
          <div class="form-group has-feedback">
            <input v-model="user.username" type="text" class="form-control" :placeholder="__t('Tên đăng nhập')"/>
            <span class="glyphicon glyphicon-user form-control-feedback"></span>
          </div>
          <div class="form-group has-feedback">
            <input v-model="user.password" type="password" class="form-control current-password" :placeholder="__t('Mật khẩu')"/>
            <span class="glyphicon glyphicon-lock form-control-feedback"></span>
          </div>
          <div class="row">
            <div class="col-xs-6">
              <button type="button" class="btn btn-block v-white-btn" @click="$modal.hide('doctorConfirm')">{{__t('Thoát')}}</button>
            </div>
            <div class="col-xs-6">
              <button type="button" class="btn btn-block v-yellow-btn" @click="confirm()">{{__t('Xác nhận')}}</button>
            </div>
          </div>
          <p style="margin-top: 10px; text-align:center"> {{__t('Sử dụng tài khoản máy tính')}}</p>
        </div>
      </div>
    </modal>
  </div>
</template>
<script>
/* ============
 * The home index page.
 */

import MixinMasterData from '@/mixins/masterdata.js'
import DiseasesCertification from '@/services/OPD/DiseasesCertification'
import OPDConfirmService from '@/services/OPD/OPDConfirm'
import MixinView from '@/mixins/view.js'
import MixinForm from '@/mixins/form.js'
import TranslationRequest from '@/components/Translation/Request.vue'
import ViewItem from '@/components/Translation/View.vue'
import Translation from '@/services/Translation'
import DiseasesCertificationView from './View/Index.vue'
const MODAL_WIDTH = 870

export default {
  /**
   * The name of the page.
   */
  name: 'OPDDiseasesCertificationIndex',
  props: ['viewOnly', 'VisitId'],
  mixins: [MixinMasterData, MixinView, MixinForm],
  data () {
    return {
      checkIsCreate: false,
      typeConfirm: '',
      user: {},
      data: {},
      nowDate: {},
      modalWidth: MODAL_WIDTH,
      TranItem: null,
      dataTranslated: null,
      Status: null,
      popupTitle: ''
    }
  },
  /**
   * The components that the page can use.
   */
  components: {
    TranslationRequest,
    ViewItem,
    DiseasesCertificationView
  },
  mounted () {
    this.modalWidth = window.innerWidth < MODAL_WIDTH
      ? '90%'
      : MODAL_WIDTH
    // this.nowDate = {
    //   day: date.getDate(),
    //   month: date.getMonth(),
    //   year: date.getFullYear()
    // }
    // console.log('now', this.nowDate)
    this.getData()
  },
  computed: {
    HealthInsuranceNumber () {
      if (this.data.HealthInsuranceNumber) {
        var arr = this.data.HealthInsuranceNumber.split(' ')
        return arr.length === 4 ? arr : null
      }
      return null
    }
  },
  methods: {
    confirmed () {
      var id = this.TranItem.Id
      this.TranItem = null
      this.view({
        Status: 3,
        Id: id
      })
      this.getData()
    },
    view (item) {
      if (item.Status === 3) {
        new Translation().find('MedicalReport/Document/' + (item.Id)).then(response => {
          this.dataTranslated = this.mappingTranslation(response)
        })
      } else {
        this.TranItem = item
      }
      this.$modal.show('view-modal')
    },
    mappingTranslation (res) {
      var translation = res.Translation
      // translation['Assessment'] = 'text'
      var objNotTran = [
        'Fullname',
        'ClinicCode',
        'Copy',
        'DateOfNextAppointment',
        'DateOfVisit',
        'DateOfBirth',
        'Date',
        'Physician',
        'Location',
        'AdmittedDate',
        'DischargeDate',
        'PID',
        'ICDOption',
        'Site',
        'Province',
        'IsTelehealth',
        'ICDDiagnosis'
      ]
      for (var key of Object.keys(res)) {
        if (!objNotTran.includes(key)) {
          if (key === 'ClinicalExaminationAndFindings') {
            if (typeof translation[key] === 'string') {
              translation[key] = this.JSONParse(translation[key]) || []
            }
            if (key === 'ClinicalExaminationAndFindings' && !!translation[key]) {
              res[key].forEach(item => {
                var tranEd = (translation[key].find(e => e.ViName === item.ViName) || {Value: ''}).Value
                item.Value = this.trim_(item.Value + (tranEd ? ('/ ' + tranEd) : ''), '/ ')
              })
            }
          } else {
            res[key] = this.trim_([res[key], '/ ', translation[key]].map(e => e).join(''), '/ ')
          }
        }
      }
      return res
    },
    confirm () {
      const a = {
        ...this.user
      }
      if (this.typeConfirm === 'doctor') {
        new OPDConfirmService().update('/DoctorConfirmDiseasesCertification/' + this._VisitId, a).then(response => {
          this.$modal.hide('doctorConfirm')
          this.reload()
          this.toastedSuccess(this.$t('Xác nhận thành công'))
          this.save()
        }).catch(e => {
          this.$modal.hide('doctorConfirm')
        })
      } else {
        new OPDConfirmService().update('/HospitalConfirmDiseasesCertification/' + this._VisitId, a).then(response => {
          this.$modal.hide('doctorConfirm')
          this.reload()
          this.toastedSuccess(this.$t('Xác nhận thành công'))
          this.save()
        }).catch(e => {
          this.$modal.hide('doctorConfirm')
        })
      }
    },
    showDoctorConfirm (Type, title) {
      this.typeConfirm = Type
      this.popupTitle = title
      // this.user.kind = kind
      this.$modal.show('doctorConfirm')
    },
    getItemDate (value) {
      if (value) {
        const date = value.toString()
        var text = ''
        const items = {
          hour: date.split(' ')[0].split(':')[0],
          minutes: date.split(' ')[0].split(':')[1],
          day: date.split(' ')[1].split('/')[0],
          month: date.split(' ')[1].split('/')[1],
          years: date.split(' ')[1].split('/')[2],
          fullDate: date.split(' ')[1]
        }
        text = items.hour + 'giờ/ hour' + ' ' + items.minutes + ', ' + 'ngày/ date' + ' ' + items.fullDate
        return text
      }
    },
    print () {
      this.$htmlToPaper('printMe', false, 'A01_215_030820_V')
    },
    getData () {
      new DiseasesCertification().find(this._VisitId).then(response => {
        const date = response.ExaminationDate
        this.nowDate = {
          day: date.split('/')[0],
          month: date.split('/')[1],
          year: date.split('/')[2]
        }
        console.log('now', this.nowDate)
        this.checkIsCreate = true
        if (response.IsTelehealth) {
          response.ClinicalExaminationAndFindings = response.ClinicalExaminationAndFindings[0].Value
        }
        console.log('a', this.getItemDate(response.AdmittedDate))
        this.data = response
        // this.OPDOENBMIlabel()
      })
    },
    OPDOENBMIlabel () {
      if (this.data.IsTelehealth) {
        return
      }
      var y1 = this.data.ClinicalExaminationAndFindings.find(e => e.Code === 'OPDOENTUOI519')
      var OPDOENBMI = this.data.ClinicalExaminationAndFindings.find(e => e.Code === 'OPDOENBMIANS')
      if (y1 && OPDOENBMI) {
        var y2 = this.data.ClinicalExaminationAndFindings.find(e => e.Code === 'OPDOENTUOI19')
        var y3 = this.data.ClinicalExaminationAndFindings.find(e => e.Code === 'OPDOENTUOI5')
        if (y2.Value === 'True') {
          OPDOENBMI.ViName = 'BMI'
          OPDOENBMI.EnName = 'BMI (over 19 years old)'
        }
        if (y1.Value === 'True') {
          OPDOENBMI.ViName = 'BMI theo Z-score'
          OPDOENBMI.EnName = 'BMI by Z-score (5-19 years old)'
        }
        if (y3.Value === 'True') {
          OPDOENBMI.ViName = 'Z-score theo cân nặng/tuổi, chiều/tuổi,cân nặng/chiều cao theo tuổi và giới'
          OPDOENBMI.EnName = 'Z-score by weight / age'
        }
      }
    }
  }
}
</script>
