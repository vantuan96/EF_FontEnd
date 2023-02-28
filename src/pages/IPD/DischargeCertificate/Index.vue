<template>
  <div class="main-content" id="di0-page">
    <template v-if="loaded">
      <template v-if="!error">
        <div class="a4-page box" id="printMe">
          <table class="table" style="width: 100%">
            <tr>
              <td width="28%"  style="vertical-align: top;" align="top">
                <p class="textUppercase text-center font12">Sở y tế/ <i>DEPARTMENT OF HEALTH</i> {{data.Province}}</p>
                <p class="textUppercase text-center font12">BVĐKQT Vinmec/ <i>VINMEC INTERNATIONAL GENERAL HOSPITAL</i> {{data.Site}}</p>
                <p class="text-center font12">Khoa/ Department: {{(data && data.Specialty) ? data.Specialty : ''}}</p>
              </td>
              <th class="text-center" style="text-align: center;vertical-align: top;" align="top">
                <p class="text-center textUppercase font16">Cộng hòa xã hội chủ nghĩa Việt Nam</p>
                <p class="text-center textUppercase font16"><i>SOCIALIST REPUBLIC OF VIETNAM</i></p>
                <p class="text-center"><span class="text-underline">Độc lập - Tự do - Hạnh phúc</span></p>
                <p class="text-center"><span class="text-underline"><i>Independence – Freedom - Happiness</i></span></p>
              </th>
              <td width="20%" style="vertical-align: top;" align="top">
                <p class="font12">MS: 01/BV-01</p>
                <p class="font12">Số lưu trữ/ PID: {{data.PID}}</p>
                <p class="font12">Mã Y tế ......./...../.....</p>
              </td>
            </tr>
          </table>
          <h1 class="title-page" style="text-align: center;font-size: 20px">GIẤY RA VIỆN</h1>
          <h1 class="title-page" style="text-align: center;font-size: 18px;"><i>HOSPITAL DISCHARGE FORM</i></h1>
          <p><br /></p>
          <table class="table" style="width: 100%">
            <tr>
              <td width="435px" style="text-align: left" align="top">
                <p style="white-space: nowrap;"><b>Họ tên người bệnh</b>/ <i>Patient's name</i>: <span class="textUppercase no-wrap">{{data.Fullname}}</span></p>
              </td>
              <td class="text-left" style="text-align: left; padding: 0 5px;" align="top">
                <p style="white-space: nowrap;"><b>Tuổi</b>/ <i>Age</i>: {{data.AgeFormated | formatAgeWithMultiLang}}</p>
              </td>
              <td class="text-left" style="text-align: left" align="top">
                <p style="white-space: nowrap;"><b>Giới tính</b>/ <i>Gender</i>: {{data.Gender}}</p>
              </td>
            </tr>
            <tr>
              <td width="435px" style="text-align: left" align="top">
                <p><b>Dân tộc</b>/ <i>Ethnic</i>: {{data.Folk}}</p>
              </td>
              <td colspan="2" class="text-left" style="text-align: left; padding: 0 5px;" align="top">
                <p><b>Nghề nghiệp</b>/ <i>Occupation</i>: {{data.Job}}</p>
              </td>
            </tr>
          </table>
          <p>
            <b>Mã số BHXH/Thẻ BHYT số</b>/ <i>HI no.</i>: {{data.HealthInsuranceNumber}}
          </p>
          <p>
            <b>Địa chỉ</b>/ <i>Address</i>: {{data.Address}}
          </p>
          <p v-if="Version === 2">
            <b>Vào viện lúc</b>/ <i>Hospital Admission (Time, Date)</i>: {{data.AdmittedDate}}
          </p>
          <p v-else>
            <b>Vào viện lúc</b>/ <i>Adminssion at (Time, Date)</i>: {{data.AdmittedDate}}
          </p>
          <p v-if="Version === 2">
            <b>Vào khoa nội trú lúc</b>/ <i>Inpatient Admission (Time, Date)</i>: {{data.AdmittedDateFirstIpd}}
          </p>
          <p v-if="Version === 2">
            <b>Ra viện lúc</b>/ <i>Hospital Discharge (Time, Date)</i>: {{data.DischareDate}}
          </p>
          <p v-else>
            <b>Ra viện lúc</b>/ <i>Discharge at (Time, Date)</i>: {{data.DischareDate}}
          </p>
          <p>
            <!-- <b>Chẩn đoán</b>/ <i>Diagnosis</i>: {{DiagnosisFormated()}} -->
            <b>Chẩn đoán</b>/ <i>Diagnosis</i>: {{data.Diagnosis}}
          </p>
          <div>
            <b>Phương pháp điều trị</b>/ <i>Treatment method</i>:
          </div>
          <p v-html="data.TreatmentAndProcedures"></p>
          <p>
            <b>Ghi chú</b>/ <i>Note</i>: {{'\n'}}{{data.DoctorRecommendations}}
          </p>
          <p><br /></p>
          <table class="table hidden-only-form" style="width: 100%">
            <tr v-if="false">
              <td width="50%">
                <p v-if="Director && Director.ConfirmAt" class="text-center" style="text-align: center">Ngày<i>/ date</i> {{getConfirmDate(Director.ConfirmAt).day || '&emsp;&emsp;'}} tháng<i>/ month</i> {{getConfirmDate(Director.ConfirmAt).month || '&emsp;&emsp;'}} năm<i>/ year</i> {{getConfirmDate(Director.ConfirmAt).year || '&emsp;&emsp;'}}</p>
                <p v-else class="text-center" style="text-align: center">Ngày<i>/ date</i> {{'&emsp;&emsp;'}} tháng<i>/ month</i> {{'&emsp;&emsp;'}} năm<i>/ year</i> {{'&emsp;&emsp;'}}</p>
              </td>
              <td>
                <p v-if="DeptHead && DeptHead.ConfirmAt" class="text-center" style="text-align: center">Ngày<i>/ date</i> {{getConfirmDate(DeptHead.ConfirmAt).day || '&emsp;&emsp;'}} tháng<i>/ month</i> {{getConfirmDate(DeptHead.ConfirmAt).month || '&emsp;&emsp;'}} năm<i>/ year</i> {{getConfirmDate(DeptHead.ConfirmAt).year || '&emsp;&emsp;'}}</p>
                <p v-else class="text-center" style="text-align: center">Ngày<i>/ date</i> {{'&emsp;&emsp;'}} tháng<i>/ month</i> {{'&emsp;&emsp;'}} năm<i>/ year</i> {{'&emsp;&emsp;'}}</p>
              </td>
            </tr>
            <tr v-else>
              <td width="50%">
                <p class="text-center" style="text-align: center">Ngày<i>/ date</i> {{DateCreated[0] || '&emsp;&emsp;'}} tháng<i>/ month</i> {{DateCreated[1] || '&emsp;&emsp;'}} năm<i>/ year</i> {{DateCreated[2] || '&emsp;&emsp;'}}</p>
              </td>
              <td>
                <p class="text-center" style="text-align: center">Ngày<i>/ date</i> {{DateCreated[0] || '&emsp;&emsp;'}} tháng<i>/ month</i> {{DateCreated[1] || '&emsp;&emsp;'}} năm<i>/ year</i> {{DateCreated[2] || '&emsp;&emsp;'}}</p>
              </td>
            </tr>
            <tr>
              <td width="50%" class="text-center" style="text-align: center"><b>Thủ trưởng đơn vị</b>/ <i>Head of Unit</i><div style="text-align: center"><i>(Ký tên đóng dấu/ Sign and seal)</i></div></td>
              <td class="text-center" style="text-align: center;vertical-align: top;" align="top"><b>Trưởng khoa</b>/ <i>Dept Head</i></td>
            </tr>
            <tr>
              <th v-if="!DeptHead" width="50%" class="text-center" style="text-align: center"><p><br /></p></th>
              <th v-if="!Director" class="text-center" style="text-align: center"><p><br /></p></th>
            </tr>
            <tr v-if="Version === 2 && !viewOnly">
              <th width="50%" class="text-center" style="text-align: center">
                <p v-if="!Director"></p>
                <p v-else><br/><br/></p>
              </th>
              <th class="text-center" style="text-align: center">
                <p v-if="!DeptHead"></p>
                <p v-else><br/><br/></p>
              </th>
            </tr>
            <tr v-else>
              <th width="50%" class="text-center" style="text-align: center"><p><br /></p></th>
              <th class="text-center" style="text-align: center"><p><br /></p></th>
            </tr>
            <tr>
              <th width="50%" class="text-center" style="text-align: center"><p><br /></p></th>
              <th class="text-center" style="text-align: center"><p><br /></p></th>
            </tr>
            <tr>
              <td v-if="Director && Director.ConfirmBy" width="50%" class="text-center" style="text-align: center"><b>Họ tên</b>/ <i>Full name</i>: {{Director.FullName}}</td>
              <td v-else width="50%" class="text-center" style="text-align: center"><b>Họ tên</b>/ <i>Full name</i>:.............................</td>
              <td v-if="DeptHead && DeptHead.ConfirmBy" width="50%" class="text-center" style="text-align: center"><b>Họ tên</b>/ <i>Full name</i>: {{DeptHead.FullName}}</td>
              <td v-else width="50%" class="text-center" style="text-align: center"><b>Họ tên</b>/ <i>Full name</i>:.............................</td>
            </tr>
          </table>
        </div>
        <div class="a4-page no-style" v-if="data.Translations && data.Translations.length">
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
          <translation-request :name="'giấy ra viện'" :VisitId="_VisitId" :ViName="'GIẤY RA VIỆN '" :EnName="'DISCHARGE CERTIFICATE'" />
        </div>
        <p class="a4-page no-style">{{getFormCode}}</p>
        <table class="table" style="width: 100%">
          <tr v-if="false">
            <td width="50%">
              <p v-if="Director && Director.ConfirmAt" class="text-center" style="text-align: center">Ngày<i>/ date</i> {{getConfirmDate(Director.ConfirmAt).day || '&emsp;&emsp;'}} tháng<i>/ month</i> {{getConfirmDate(Director.ConfirmAt).month || '&emsp;&emsp;'}} năm<i>/ year</i> {{getConfirmDate(Director.ConfirmAt).year || '&emsp;&emsp;'}}</p>
              <p v-else class="text-center" style="text-align: center">Ngày<i>/ date</i> {{'&emsp;&emsp;'}} tháng<i>/ month</i> {{'&emsp;&emsp;'}} năm<i>/ year</i> {{'&emsp;&emsp;'}}</p>
            </td>
            <td>
              <p v-if="DeptHead && DeptHead.ConfirmAt" class="text-center" style="text-align: center">Ngày<i>/ date</i> {{getConfirmDate(DeptHead.ConfirmAt).day || '&emsp;&emsp;'}} tháng<i>/ month</i> {{getConfirmDate(DeptHead.ConfirmAt).month || '&emsp;&emsp;'}} năm<i>/ year</i> {{getConfirmDate(DeptHead.ConfirmAt).year || '&emsp;&emsp;'}}</p>
              <p v-else class="text-center" style="text-align: center">Ngày<i>/ date</i> {{'&emsp;&emsp;'}} tháng<i>/ month</i> {{'&emsp;&emsp;'}} năm<i>/ year</i> {{'&emsp;&emsp;'}}</p>
            </td>
          </tr>
          <tr v-else>
            <td width="50%">
              <p class="text-center" style="text-align: center">Ngày<i>/ date</i> {{DateCreated[0] || '&emsp;&emsp;'}} tháng<i>/ month</i> {{DateCreated[1] || '&emsp;&emsp;'}} năm<i>/ year</i> {{DateCreated[2] || '&emsp;&emsp;'}}</p>
            </td>
            <td>
              <p class="text-center" style="text-align: center">Ngày<i>/ date</i> {{DateCreated[0] || '&emsp;&emsp;'}} tháng<i>/ month</i> {{DateCreated[1] || '&emsp;&emsp;'}} năm<i>/ year</i> {{DateCreated[2] || '&emsp;&emsp;'}}</p>
            </td>
          </tr>
          <tr>
            <td width="50%" class="text-center" style="text-align: center"><b>Thủ trưởng đơn vị</b>/ <i>Head of Unit</i><div style="text-align: center"><i>(Ký tên đóng dấu/ Sign and seal)</i></div></td>
            <td class="text-center" style="text-align: center;vertical-align: top;" align="top"><b>Trưởng khoa</b>/ <i>Dept Head</i></td>
          </tr>
          <tr>
            <th v-if="!DeptHead" width="50%" class="text-center" style="text-align: center"><p><br /></p></th>
            <th v-if="!Director" class="text-center" style="text-align: center"><p><br /></p></th>
          </tr>
          <tr v-if="Version === 2 && !viewOnly">
            <th width="50%" class="text-center" style="text-align: center">
              <p v-if="!Director"><button @click="showDoctorConfirm('Director', 'Thủ trưởng đơn vị/ HEAD OF UNIT')" class="btn v-white-btn">{{__t('Xác nhận')}}</button></p>
              <p v-else><br/><br/></p>
            </th>
            <th class="text-center" style="text-align: center">
              <p v-if="!DeptHead"><button @click="showDoctorConfirm('DeptHead', 'Trưởng khoa/ DEPT HEAD')" class="btn v-white-btn">{{__t('Xác nhận')}}</button></p>
              <p v-else><br/><br/></p>
            </th>
          </tr>
          <tr v-else>
            <th width="50%" class="text-center" style="text-align: center"><p><br /></p></th>
            <th class="text-center" style="text-align: center"><p><br /></p></th>
          </tr>
          <tr>
            <th width="50%" class="text-center" style="text-align: center"><p><br /></p></th>
            <th class="text-center" style="text-align: center"><p><br /></p></th>
          </tr>
          <tr>
            <td v-if="Director && Director.ConfirmBy" width="50%" class="text-center" style="text-align: center"><b>Họ tên</b>/ <i>Full name</i>: {{Director.FullName}}</td>
            <td v-else width="50%" class="text-center" style="text-align: center"><b>Họ tên</b>/ <i>Full name</i>:.............................</td>
            <td v-if="DeptHead && DeptHead.ConfirmBy" width="50%" class="text-center" style="text-align: center"><b>Họ tên</b>/ <i>Full name</i>: {{DeptHead.FullName}}</td>
            <td v-else width="50%" class="text-center" style="text-align: center"><b>Họ tên</b>/ <i>Full name</i>:.............................</td>
          </tr>
        </table>
        <div style="padding-top: 0;" class="a4-page no-style" v-if="!viewOnly">
          <div class="">
            <button class="btn pull-left btn-back v-white-btn" type="button" @click="back()">{{__t('Quay lại')}}</button>
            <button class="btn v-yellow-btn pull-right"  v-shortkey="['ctrl', 'p']" @shortkey="print()" @click="print"><i class="fa fa-print" aria-hidden="true"></i> {{__t('In ngay')}}</button>
          </div>
        </div>
        <modal :name="'view-modal'" transition="pop-out" height="auto" :scrollable="false" :width="modalWidth" :class="'no-scroll-x'">
        <div v-if="TranItem && TranItem.Status !== 3">
          <view-item :isTranslate="true" @confirmed="confirmed" :Id="TranItem.Id" :ForDoctor="true" />
        </div>
        <div v-else>
          <DischargeCertificateView :dataParent="data" :Version="Version" v-if="dataTranslated" :isTranView="true" :data="dataTranslated" :CheckDate="CheckDate" :viewOnly="viewOnly" :Director="Director" :DeptHead="DeptHead" :printId="'printview'"/>
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
      </template>
      <div v-else class="text-center">
        <hr/>
        <p>{{__labelMsg(error)}}</p>
        <button class="btn btn-back v-white-btn" type="button" @click="back()">{{__t('Quay lại')}}</button>
        <hr/>
      </div>
    </template>
    <div v-else class="text-center">
      <v-loading/>
    </div>
  </div>
</template>
<script>
/* ============
 * KLM Page vi sao đặt tên là KLM hỏi dungnv53
 * ============
 *
 * The home index page.
 */
import DischargeCertificateView from './View/Index.vue'
import TranslationRequest from '@/components/Translation/Request.vue'
import MixinMasterData from '@/mixins/masterdata.js'
import DischargeCertificate from '@/services/IPD/DischargeCertificate'
import MixinView from '@/mixins/view.js'
import MixinForm from '@/mixins/form.js'
import moment from 'moment'
import ViewItem from '@/components/Translation/View.vue'
import Translation from '@/services/Translation'
const MODAL_WIDTH = 870

export default {
  /**
   * The name of the page.
   */
  name: 'NPQ',
  mixins: [MixinMasterData, MixinView, MixinForm],
  props: ['viewOnly', 'VisitId'],
  data () {
    return {
      modalWidth: MODAL_WIDTH,
      TranItem: null,
      dataTranslated: null,
      data: {},
      loaded: false,
      error: false,
      Version: null,
      popupTitle: '',
      user: {},
      Director: null,
      DeptHead: null
    }
  },
  /**
   * The components that the page can use.
   */
  components: {
    TranslationRequest,
    ViewItem,
    DischargeCertificateView
  },
  mounted () {
    this.modalWidth = window.innerWidth < MODAL_WIDTH
      ? '90%'
      : MODAL_WIDTH
    this.getData()
  },
  computed: {
    DateCreated: function () {
      return this.data.Date ? this.data.Date.split('/') : ['', '', '']
    },
    getFormCode () {
      return this.Version === 1 ? 'A01_146_050920_V' : 'A01_146_290922_V'
    }
  },
  methods: {
    print () {
      this.$htmlToPaper('printMe', false, this.getFormCode)
    },
    getData () {
      new DischargeCertificate({hidemsg: true}).find(this._VisitId).then(response => {
        this.data = response
        this.handleCheckDate(response.AdmittedDate)
        if (response.Confirm.length > 0) {
          this.Director = response.Confirm.find(item => item.ConfirmType === 'Director')
          this.DeptHead = response.Confirm.find(item => item.ConfirmType === 'DeptHead')
        }
        this.loaded = true
      }).catch(e => {
        this.loaded = true
        if (e.status === 404 && e.data.EnMessage) {
          this.error = e.data
        }
      })
    },
    confirm () {
      new DischargeCertificate().update(this._VisitId, this.user, '/Confirm/').then(response => {
        this.getData()
        this.$modal.hide('doctorConfirm')
      }).catch(e => {
        // this.back()
      })
    },
    handleCheckDate (AdmittedDate) {
      if (moment(AdmittedDate, 'HH:mm DD/MM/YYYY') > moment(new Date(2022, 8, 30, 17, 0, 0))) {
        this.Version = 2
      } else {
        this.Version = 1
      }
      console.log(`AdmittedDate: ${AdmittedDate} ${moment(new Date(2022, 8, 30, 17, 0, 0)).format()} => Version: ${this.Version}`)
    },
    getConfirmDate (value) {
      let confirmDate = {}
      if (value) {
        value = moment(value).format('DD/MM/YYYY')
        confirmDate = {
          day: value.split('/')[0],
          month: value.split('/')[1],
          year: value.split('/')[2]
        }
      }
      return confirmDate
    },
    showDoctorConfirm (kind, title) {
      this.popupTitle = title
      this.user.kind = kind
      this.$modal.show('doctorConfirm')
    },
    DiagnosisFormated () {
      let str = ''
      let str2 = ''
      if (this.data) {
        if (this.data.Diagnosis) {
          str += this.data.Diagnosis
        }
        if (this.data.DiagnosisOption) {
          if (str) {
            str += ', '
          }
          str += this.data.DiagnosisOption
        }
        if (this.data.ICDDiagnosis && this.data.ICDDiagnosis !== 'null' && this.JSONParse(this.data.ICDDiagnosis).length) {
          str2 += this.JSONParse(this.data.ICDDiagnosis).map(e => e.code).join(', ')
        }
        if (this.data.ICDOption && this.data.ICDOption !== 'null' && this.JSONParse(this.data.ICDOption).length) {
          if (str2) {
            str2 += ', '
          }
          str2 += this.JSONParse(this.data.ICDOption).map(e => e.code).join(', ')
        }
        if (str2) {
          str += ' (' + str2 + ')'
        }
      }
      return str
      // var icd = this.getICD10s(this.data.ICDDiagnosis, this.data.ICDOption)
      // return [this.data.Diagnosis, this.data.DiagnosisOption, icd ? `(${icd})` : null].filter(e => e).join(', ')
    },
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
    }
  }
}
</script>
