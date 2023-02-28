<template>
  <div class="main-content" id="di0-page" v-if="loaded">
    <div class="a4-page box" id="printMe" v-if="data">
      <table width="100%">
        <tr>
          <td width="10%" valign="top">
            <img style="width: 80px;" src="/static/Logo Vinmec International Hospitall 1.png" />
          </td>
          <td class="text-center">
            <div class="font16 font-bold text-center">CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</div>
            <div class="font16 font-bold text-center"><i>SOCIALIST REPUBLIC OF VIETNAM</i></div>
            <div class="font14 font-bold text-center"><span class="text-underline">Độc lập - Tự do - Hạnh phúc</span></div>
            <div class="font14 font-bold text-center"><span class="text-underline"><i>Independence – Freedom - Happiness</i></span></div>
          </td>
          <td width="10%">
          </td>
        </tr>
      </table>
      <table width="100%">
        <tr>
          <td width="30%">
            <p class="font13 ptag" style="text-align: center;">SỞ Y TẾ/ <i>DEPARTMENT OF HEALTH</i>: {{data.LocationUnit}} {{data.Province}}</p>
            <p class="font13 ptag" style="text-align: center;">Bệnh viện/ <i>Hospital</i>: VINMEC {{data.Site}}</p>
            <p class="font13 ptag" style="text-align: center;">Số/ <i>Number</i> .........../20............/GCT</p>
          </td>
          <td class="text-center">
          </td>
          <td width="30%">
            <p class="font13 ptag">Số hồ sơ/ <i>PID</i>: {{data.PID}}</p>
            <p class="font13 ptag">Vào sổ chuyển tuyến số/ <i>Number in transfer book</i>: ......</p>
          </td>
        </tr>
      </table>
      <br/>
      <p class="text-center font20 font-bold">GIẤY CHUYỂN TUYẾN KHÁM BỆNH, CHỮA BỆNH BẢO HIỂM Y TẾ</p>
      <p class="text-center font18 font-bold"><i>HOSPITAL TRANSFER FOR EXAM AND TREATMENT UNDER MEDICAL INSURANCE</i></p>
      <div class="text-center font14 font-bold">Kính gửi/ <i>Dear</i>: {{data.ReceivingHospital}}</div>
      <br/>
      <div class="font15">
        <p>BỆNH VIỆN ĐA KHOA QUỐC TẾ VINMEC/ <i>VINMEC INTERNATIONAL GENERAL HOSPITAL</i>: {{data.Site}} trân trọng giới thiệu/ <i>presents</i>: </p>
        <p>- Họ và tên người bệnh/ <i>Patient’s name</i>: {{data.Fullname}} <span class="tab404">Giới tính/ <i>Gender</i>: {{data.Gender}}</span> <span class="tab404">Tuổi/ <i>Age</i>: {{data.AgeFormated | formatAge}}</span></p>
        <p class="no-wrap-hidden">- Địa chỉ/ <i>Address</i>: {{data.Address}}</p>
        <p class="no-wrap-hidden">- Dân tộc/ <i>Ethnic</i>: {{data.Ethnic}} <span class="tab404">Quốc tịch/ <i>Nationality</i>: {{data.Nationality}}</span></p>
        <p>- Nghề nghiệp/ <i>Occupation</i>: {{data.Job}} <span class="tab404">Nơi làm việc/ <i>Working place</i>: {{data.WorkPlace}}</span></p>
        <template v-if="data.HealthInsuranceNumber">
          <p>- Số thẻ/ <i>HI no.</i>: {{data.HealthInsuranceNumber}}</p>
        </template>
        <template v-else>
          <p>- Số thẻ/ <i>HI no.</i>:</p>
        </template>
        <p class="no-wrap-hidden">- Hạn sử dụng/ <i>Health of issurance valid to date</i>: {{data.ExpireHealthInsuranceDate}}</p>
        <p>Đã được khám bệnh/ điều trị/ <i>Examined/ treated</i>:</p>
        <p>+  Tại: BVĐKQT VINMEC {{data.Site}} (Tuyến {{data.Level}})/ <i>At VINMEC INTERNATIONAL GENERAL HOSPITAL</i> {{data.Site}} (Level {{data.Level}}) từ ngày/ <i>from</i> {{data.Admission}} đến ngày/ <i>to</i> {{data.Discharge || '. . . . . . . . . . . . . . . . . . . . .'}}</p>
        <p @dblclick="addBreakPage" class="hasBreakPage font-bold">TÓM TẮT BỆNH ÁN/ <i>SUMMARY OF MEDICAL RECORD</i></p>
        <p @dblclick="addBreakPage" class="hasBreakPage">- Dấu hiệu lâm sàng/ <i>Clinical signs</i>:</p>
        <div style="padding-left: 5px;">
          <!-- <p style="margin: 7px 0;font-size: 15px;line-height: 1.5;" :data="item" :key="index" v-for="(item ,index) in responseList">{{removeIndexText(item.ViName)}}: {{(item.Value)}}</p> -->
          <!-- <p>{{str}}</p> -->
          <!-- <p style="margin: 7px 0;font-size: 15px;line-height: 1.5;" :style="item.Order === 12 || item.Code === 'IPDMRPT124' || item.Code === 'IPDMRPT135' || item.Code === 'IPDMRPT137' ? 'margin-left:20px' : ''"  :data="item" :key="index" v-for="(item ,index) in responseList.filter(i => i.Order !== 5 && i.Order !== 6)">{{removeIndexText(item.ViName)}}: {{(item.Value)}}</p> -->
          <!-- <span>{{str}}</span> -->
          <p style="margin: 7px 0;font-size: 15px;line-height: 1.5;"><span v-html="getValueOfPatientIllnessAndAssessment ? getValueOfPatientIllnessAndAssessment : textFill"></span></p>
        </div>
        <p @dblclick="addBreakPage" class="hasBreakPage">- Kết quả xét nghiệm, cận lâm sàng/ <i>Lab test and paraclinical test result</i>: {{data.ResultOfParaclinicalTests}}</p>
        <!-- <p @dblclick="addBreakPage" class="hasBreakPage">- Chẩn đoán/ <i>Diagnosis</i>: {{fomartIcd(data.Diagnosis, data.ICDDiagnosis, data.CoMorbidities, data.ICDCoMorbidities)}}</p> -->
        <p @dblclick="addBreakPage" class="hasBreakPage">- Chẩn đoán/ <i>Diagnosis</i>: {{data.Diagnosis}}</p>
        <div @dblclick="addBreakPage" class="hasBreakPage">- Phương pháp, thủ thuật, kỹ thuật, thuốc đã sử dụng trong điều trị/ <i>Method, procedure, technique, medication applied during treatment</i>:</div>
        <p v-html="data.TreatmentsAndProcedures" :style="data.DrugsUsed ? 'margin-bottom: 0px!important;' : ''"></p>
        <p>{{data.DrugsUsed}}</p>
        <p @dblclick="addBreakPage" class="hasBreakPage">- Tình trạng người bệnh lúc chuyển tuyến/ <i>Patient’s condition upon transfer</i>: {{data.ConditionAtDischarge}}</p>
        <p @dblclick="addBreakPage" class="hasBreakPage">- Lý do chuyển tuyến/ <i>Reason for transfer</i>: Khoanh tròn vào lý do chuyển tuyến phù hợp sau đây/ <i>Circle the appropriate reason below</i>:</p>
        <p :data="item" :key="index" v-for="(item, index) in data.ReasonForTransfer">
          <span v-if="index === 0" class="t-boder" :class="{'t-boder-none': item.Value === 'False' || item.Value === null || item.Value === ''}">{{index + 1}}</span> <span v-if="index === 0">{{item.ViName}}/ <i>Eligible for transfer</i></span>
          <span v-if="index === 1" class="t-boder" :class="{'t-boder-none': item.Value === 'False' || item.Value === null || item.Value === ''}">{{index + 1}}</span> <span v-if="index === 1">{{item.ViName}}/ <i>As requested by patient or patient’s legal representative</i></span>
        </p>
        <!-- <div style="page-break-after: always;"></div> -->
        <p @dblclick="addBreakPage" class="hasBreakPage">- Hướng điều trị/ <i>Treatment plan</i>: {{data.FollowUpCarePlan}}</p>
        <p @dblclick="addBreakPage" class="hasBreakPage">- Chuyển tuyến hồi/ <i>Transfer Date</i>: {{data.TimeOfTransfer | bilingualFormatDateTime}}</p>
        <p @dblclick="addBreakPage" class="hasBreakPage">- Phương tiện vận chuyển/ <i>Transportation method</i>: {{data.TransportationMethod}}</p>
        <p @dblclick="addBreakPage" class="hasBreakPage -no-wrap-hidden">- Họ tên, chức danh, trình độ chuyên môn của người hộ tống/ <i>Name, title, professional qualification of escort</i>: {{data.EscortPerson}}</p>
      </div>
      <br/>
      <table width="100%">
        <tr>
          <td></td>
          <td width="60%" style="text-align: center;">
            <div style="text-align: center;" class="font15">{{data.Date | bilingualFormatDateTimeTwo}}</div>
          </td>
        </tr>
      </table>
      <template v-if="data && data.Version >= 10">
        <table width="100%" class="only-print-page">
          <tr>
            <td style="text-align: center;">
              <p style="text-align: center;">{{TRANSFERLETTER_TIME_PIC || ''}}</p>
              <p style="text-align: center;" class="font-bold font15">Y, BÁC SĨ KHÁM, ĐIỀU TRỊ/ <i>PHYSICIAN-IN-CHARGE</i></p>
            </td>
            <td style="text-align: center;">
              <p style="text-align: center;">{{TRANSFERLETTER_TIME_TAU || ''}}</p>
              <p style="text-align: center;" class="font-bold font15">NGƯỜI CÓ THẨM QUYỀN CHUYỂN TUYẾN/ <i>TRANSFER AUTHORITY</i></p>
            </td>
          </tr>
          <tr>
            <td valign="top">
              <p style="text-align: center;" class="font15">(Ký tên, đóng dấu/ <i>Sign, stamp</i>)</p>
              <img style="opacity: 0" class="hidden-box" src="/static/140x80.png" />
              <p v-if="TRANSFERLETTER_PIC" style="text-align: center;">{{TRANSFERLETTER_PIC}}</p>
            </td>
            <td valign="top">
              <p style="text-align: center;" class="font15">(Ký tên, đóng dấu/ <i>Sign, stamp</i>)</p>
              <img style="opacity: 0" class="hidden-box" src="/static/140x80.png" />
              <p v-if="TRANSFERLETTER_TAU" style="text-align: center;">{{TRANSFERLETTER_TAU}}</p>
            </td>
          </tr>
        </table>
      </template>
      <template v-else>
        <table width="100%" class="hidden-only-form">
          <tr>
            <td style="text-align: center;">
              <p style="text-align: center;">{{(data.PhysicianInChargeTime || '')}}</p>
              <p style="text-align: center;" class="font-bold font15">Y, BÁC SĨ KHÁM, ĐIỀU TRỊ/ <i>PHYSICIAN-IN-CHARGE</i></p>
            </td>
            <td style="text-align: center;">
              <p style="text-align: center;">{{(data.DirectorTime || '')}}</p>
              <p style="text-align: center;" class="font-bold font15">NGƯỜI CÓ THẨM QUYỀN CHUYỂN TUYẾN/ <i>TRANSFER AUTHORITY</i></p>
            </td>
          </tr>
          <tr>
            <td valign="top">
              <p style="text-align: center;" class="font15">(Ký tên, đóng dấu/ <i>Sign, stamp</i>)</p>
              <img style="opacity: 0" class="hidden-box" src="/static/140x80.png" />
              <p v-if="data.PhysicianInCharge.Fullname" style="text-align: center;">{{(data.PhysicianInCharge.Fullname)}}</p>
            </td>
            <td valign="top">
              <p style="text-align: center;" class="font15">(Ký tên, đóng dấu/ <i>Sign, stamp</i>)</p>
              <img style="opacity: 0" class="hidden-box" src="/static/140x80.png" />
              <p v-if="data.Director.Fullname" style="text-align: center;">{{(data.Director.Fullname)}}</p>
            </td>
          </tr>
        </table>
      </template>
    </div>
    <div v-else class="text-center">
      <h4>{{errMsg}}</h4>
      <p><button class="btn btn-back v-white-btn" type="button" @click="back()">{{__t('btn.back')}}</button></p>
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
      <translation-request :FormCode="FormCode" :name="'giấy chuyển tuyến'" :VisitId="_VisitId" :ViName="'GIẤY CHUYỂN TUYẾN'" :EnName="'TRANSFER LETTER'" />
    </div>
    <div class="container mt-10" style="width: 870px !important; padding: 0">
      <p>A01_167_180220_VE</p>
    </div>
    <template v-if="data && data.Version >= 10">
      <div v-if="data.Version" class="a4-page no-style">
        <Confirm
          class="mt-10 only-web-page"
          :MasterDataCode="'TRANSFERLETTERCONFIRM'"
          :FormCode="`A01_167_180220_VE`"
          :VisitId="_VisitId"
          :FormId="data.Id"
          :ReadOnly="viewOnly || IsFormLocked(data)"
          :Bilingual="true"
          @ResponseData="getListConfirm"
        />
      </div>
    </template>
    <template v-else>
      <div class="a4-page no-style" v-if="data">
        <div class="row only-web-page">
          <div class="col-md-6 col-sm-6 text-center">
            <template v-if="data.PhysicianInCharge && data.PhysicianInCharge.Username">
              <p>{{data.PhysicianInChargeTime}}</p>
              <eform-signature :ad="data.PhysicianInCharge.Username" :title="'Y, BÁC SĨ KHÁM, ĐIỀU TRỊ/ PHYSICIAN-IN-CHARGE'" />
            </template>
            <template v-else>
              <p><b>Y, BÁC SĨ KHÁM, ĐIỀU TRỊ/ PHYSICIAN-IN-CHARGE</b></p>
              <p v-if="!viewOnly && !IsFormLocked(data)">
                <button @click="showDoctorConfirm('PhysicianInCharge', 'Y, BÁC SĨ KHÁM, ĐIỀU TRỊ/ PHYSICIAN-IN-CHARGE')" class="btn v-white-btn">{{__t('Xác nhận')}}</button>
              </p>
              <p v-else>
                <i style="color: green">{{__t('(Chưa ký xác nhận)')}}</i>
              </p>
            </template>
          </div>
          <div class="col-md-6 col-sm-6 text-center">
            <template v-if="data.Director && data.Director.Username">
              <p>{{data.DirectorTime}}</p>
              <eform-signature :ad="data.Director.Username" :title="'NGƯỜI CÓ THẨM QUYỀN CHUYỂN TUYẾN/ TRANSFER AUTHORITY'" />
            </template>
            <template v-else>
              <p><b>NGƯỜI CÓ THẨM QUYỀN CHUYỂN TUYẾN/ TRANSFER AUTHORITY</b></p>
              <p v-if="!viewOnly && !IsFormLocked(data)">
                <button @click="showDoctorConfirm('Director', 'NGƯỜI CÓ THẨM QUYỀN CHUYỂN TUYẾN/ TRANSFER AUTHORITY')" class="btn v-white-btn">{{__t('Xác nhận')}}</button>
              </p>
              <p v-else>
                <i style="color: green">{{__t('(Chưa ký xác nhận)')}}</i>
              </p>
            </template>
          </div>
          <br/>
          <br/>
          <br/>
        </div>
      </div>
    </template>
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
    <modal :name="'view-modal'" transition="pop-out" height="auto" :scrollable="false" :width="modalWidth" :class="'no-scroll-x'">
      <div v-if="TranItem && TranItem.Status !== 3">
        <view-item :isTranslate="true" @confirmed="confirmed" :Id="TranItem.Id" :ForDoctor="true" />
      </div>
      <div v-else>
        <ReferralLetterView :dataTrans="dataTrans" :dataParent="data" v-if="dataTranslated" :isTranView="true" :data="dataTranslated" :CheckDate="CheckDate" :visitIDFromPage="_VisitId" :viewOnly="viewOnly" :printId="'printview'"/>
        <div v-else class="loading-text"><v-loading/></div>
      </div>
    </modal>
    <FloatBlock v-if="data && !viewOnly">
      <template slot='buttons'>
        <div class="col-md-4">
          <div class="form-group1">
          </div>
        </div>
        <div class="col-md-8">
          <div class="form-group1">
            <button class="btn v-yellow-btn pull-right" @click="print()" v-shortkey="['ctrl', 'p']" @shortkey="print()"><i class="fa fa-print" aria-hidden="true"></i> In ngay</button>
          </div>
        </div>
      </template>
    </FloatBlock>
  </div>
  <div v-else class="loading-text"><v-loading/></div>
</template>
<script>
/* ============
 * The home index page.
 */
import Confirm from '@/components/Form/Confirm3'
import TranferLetter from '@/services/IPD/TranferLetter'
import MedicalRecordMixinForm from '@/pages/IPD/MedicalRecord/Mixin.js'
import MixinMasterData from '@/mixins/masterdata.js'
import TranslationRequest from '@/components/Translation/Request.vue'
import ViewItem from '@/components/Translation/View.vue'
import MixinView from '@/mixins/view.js'
import ReferralLetterView from './View/Index.vue'
import Translation from '@/services/Translation'
import { cloneDeep } from 'lodash'
import moment from 'moment'

const MODAL_WIDTH = 870

export default {
  /**
   * The name of the page.
   */
  name: 'ED-TranferLetter',
  props: ['viewOnly', 'VisitId'],
  mixins: [MedicalRecordMixinForm, MixinMasterData, MixinView],
  data () {
    return {
      TranItem: null,
      dataTranslated: null,
      modalWidth: MODAL_WIDTH,
      str: '',
      data: null,
      loaded: false,
      responseList: [],
      popupTitle: '',
      user: {},
      errMsg: 'Hồ sơ bệnh án chưa đầy đủ, vui lòng thực hiện trước khi sử dụng tính năng này',
      textFill: 'Toàn thân: (ý thức, da niêm mạc, hệ thống hạch, tuyến giáp, vị trí, kích thước, số lượng, v.v..):\nCác cơ quan:\n+ Tuần hoàn:\n+ Hô hấp:\n+ Tiêu hoá:\n+ Thận- Tiết niệu- Sinh dục:\n+ Thần Kinh:\n+ Cơ- Xương- Khớp:\n+ Tai- Mũi- Họng:\n+ Răng- Hàm- Mặt:\n+ Mắt:\n+ Nội tiết, dinh dưỡng và các bệnh lý khác:',
      FormCode: '',
      dataTrans: null,
      TRANSFERLETTER_PIC: '',
      TRANSFERLETTER_TAU: '',
      TRANSFERLETTER_TIME_PIC: '',
      TRANSFERLETTER_TIME_TAU: ''
    }
  },
  /**
   * The components that the page can use.
   */
  components: {
    TranslationRequest,
    ViewItem,
    ReferralLetterView,
    Confirm
  },
  mounted () {
    this.modalWidth = window.innerWidth < MODAL_WIDTH
      ? '90%'
      : MODAL_WIDTH
    this.getData()
  },
  computed: {
    HealthInsuranceNumber () {
      if (this.data.HealthInsuranceNumber) {
        var arr = this.data.HealthInsuranceNumber.split(' ')
        return arr.length === 4 ? arr : null
      }
      return null
    },
    getValueOfPatientIllnessAndAssessment () {
      return this.valueOfPatientIllnessAndAssessment || this.valueOfPatientIllnessAndAssessmentEye
    }
  },
  methods: {
    getListConfirm (val) {
      val.map(item => {
        if (item.ConfirmType === 'TRANSFERLETTER_PIC') {
          this.TRANSFERLETTER_PIC = item.Fullname
          this.TRANSFERLETTER_TIME_PIC = moment(item.ConfirmAt).format('HH:mm DD/MM/YYYY')
        }
        if (item.ConfirmType === 'TRANSFERLETTER_TAU') {
          this.TRANSFERLETTER_TAU = item.Fullname
          this.TRANSFERLETTER_TIME_TAU = moment(item.ConfirmAt).format('HH:mm DD/MM/YYYY')
        }
      })
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
          this.dataTranslated = this.mappingTranslation(cloneDeep(response))
          this.dataTrans = cloneDeep(response)
        })
      } else {
        this.TranItem = item
      }
      this.$modal.show('view-modal')
    },
    mappingTranslation (res) {
      var translation = res.Translation
      console.log(res.Translation, 'what is translation')
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
            console.log(res[key], 'check res keyyyyyyyyyyyyyyyyyyy')
            res[key] = this.trim_([res[key], '/ ', translation[key]].map(e => e).join(''), '/ ')
          }
        }
      }
      return res
    },
    print () {
      this.$htmlToPaper('printMe', false, 'A01_167_180220_VE')
    },
    getData () {
      new TranferLetter().find(this._VisitId + '?hidemsg=' + true).then(async response => {
        this.data = response
        this.$store.dispatch('setCurrentFormId', response.Id)
        if (response.IPDMedicalRecordOfPatient && response.IPDMedicalRecordOfPatient.FormCode) {
          this.FormCode = response.IPDMedicalRecordOfPatient.FormCode
        }
        if (response.VisitType === 'IPD' && this.FormCode) {
          if (this.FormCode === 'A01_035_050919_V') {
            this.getDataFillBA(this.FormCode, [1, 0])
          } else if (this.FormCode === 'A01_037_050919_V') {
            this.getDataFillBA(this.FormCode, [14, 13, 0])
          } else if (this.FormCode === 'A01_034_050919_V') {
            this.getDataFillBA(this.FormCode, [14, 13, 0])
          } else if (this.FormCode === 'A01_038_050919_V') {
            this.getDataFillBA(this.FormCode, [21, 20, 19, 0])
          } else if (this.FormCode === 'A01_195_050919_V') {
            this.getDataFillBA(this.FormCode, [14, 13, 0])
          } else if (this.FormCode === 'A01_036_050919_V') {
            this.getDataFillBA(this.FormCode, [0])
          } else if (this.FormCode === 'A01_196_050919_V') {
            this.getDataFillBA(this.FormCode, [14, 13])
          } else if (this.FormCode === 'A01_040_050919_V') {
            this.getDataFillBA(this.FormCode, [14, 13])
          } else if (this.FormCode === 'A01_039_050919_V') {
            this.getDataFillBA(this.FormCode, [14, 13])
          } else if (this.FormCode === 'A01_041_050919_V') {
            await this.getMasterDatas({Form: 'IPDMRPT'}, () => {
              this.getDataFillBAEye(this.FormCode, [479, 478, 0])
            })
          } else if (this.FormCode === 'BMTIMMACH') {
            this.getDataFillBA('A01_034_050919_V', [14, 13, 0])
          } else {
            this.getDataFillBA(this.FormCode)
          }
        }
        this.loaded = true
      })
    },
    changeData (data) {
      // let str = ''
      let row8 = {
        Code: 'MauSacDa',
        ViName: '+ Màu sắc da',
        Order: 9,
        Value: ''
      }
      let row = {
        Code: 'CacCoQuanKhac',
        ViName: 'Các cơ quan khác',
        Order: 10,
        Value: ''
      }
      data.push(row8)
      data.push(row)
      data.sort((a, b) => a.Order - b.Order)
      data.map(m => {
        if (m.Value === 'True') {
          m.Value = true
        }
        if (m.Value === 'False') {
          m.Value = false
        }
        if (m.ViName.includes(':')) {
          m.ViName = m.ViName.replace(':', '')
        }
        if (m.ViName.includes('-')) {
          m.ViName = m.ViName.replace('-', '+')
        }
        if (m.ViName.includes('. ')) {
          m.ViName = m.ViName.split('. ')[1]
        }
        if (m.Code === 'IPDMRPT61') {
          m.Order = 1
        }
        if (m.Code === 'IPDMRPT104') {
          m.Value = ''
          m.Order = 2
          m.ViName = 'Toàn thân'
        }
        if (m.Code === 'IPDMRPT105') {
          if (m.Value === true) {
            m.Value = 'Dị tật bẩm sinh'
          } else {
            m.Value = ''
          }
          m.Order = 3
          m.ViName = '+ Dị tật bẩm sinh/Có hậu môn'
        }

        if (m.Code === 'IPDMRPT106') {
          m.Order = 5
          m.ViName = ''
          if (m.Value === true) {
            data.find(e => {
              if (e.Code === 'IPDMRPT105') {
                if (e.Value) {
                  e.Value += ', '
                }
                e.Value += 'Có hậu môn'
              }
            })
          }
          m.Value = ''
        }

        if (m.Code === 'IPDMRPT108') {
          m.Order = 6
          m.ViName = ''
          if (m.Value) {
            data.find(e => {
              if (e.Code === 'IPDMRPT105') {
                if (e.Value) {
                  e.Value += '. Cụ thể dị tật: '
                }
                e.Value += m.Value
              }
            })
            m.Value = ''
          }
        }
        if (m.Code === 'IPDMRPT111') {
          m.Order = 7
        }
        if (m.Code === 'IPDMRPT113') {
          m.Order = 8
        }
        if ((m.Code === 'IPDMRPT115' && !m.Value) && (m.Code === 'IPDMRPT116' && !m.Value) && (m.Code === 'IPDMRPT117' && !m.Value) && (m.Code === 'IPDMRPT118' && !m.Value) && (m.Code === 'IPDMRPT119' && !m.Value)) {
          data.find(e => {
            if (e.Code === 'MauSacDa') {
              e.Value = ''
            }
          })
        }
        if ((m.Code === 'IPDMRPT115' || m.Code === 'IPDMRPT116' || m.Code === 'IPDMRPT117' || m.Code === 'IPDMRPT118' || m.Code === 'IPDMRPT119') && m.Value) {
          data.find(e => {
            if (e.Code === 'MauSacDa') {
              e.Value = m.ViName
            }
          })
        }
        if (m.Code === 'IPDMRPTHOHAANS') {
          m.Order = 11
        }
        if (m.Code === 'IPDMRPT122') {
          m.Order = 12
          m.ViName = ' ' + m.ViName
        }
        if (m.Code === 'IPDMRPT124') {
          m.Order = 13
          m.ViName = ' ' + m.ViName
        }
        if (m.Code === 'IPDMRPT126') {
          m.Order = 14
        }
        if (m.Code === 'IPDMRPT128') {
          m.Order = 15
        }
        if (m.Code === 'IPDMRPT130') {
          m.Order = 16
          m.ViName = '+ Cơ quan sinh dục ngoài'
        }
        if (m.Code === 'IPDMRPT132') {
          m.Order = 17
        }
        if (m.Code === 'IPDMRPT133') {
          m.Order = 18
        }
        if (m.Code === 'IPDMRPT135') {
          m.Order = 19
          m.ViName = ' + Phản xạ'
        }
        if (m.Code === 'IPDMRPT137') {
          m.Order = 20
          m.ViName = ' ' + m.ViName
        }
        if (m.Code === 'IPDMRPTCXNCANS') {
          m.Order = 21
        }
        if (m.Code === 'IPDMRPTTTBAANS') {
          m.Order = 22
        }
        if (m.Code === 'IPDMRPT139') {
          m.Order = 23
        }
      })
      this.responseList = []
      data.sort((a, b) => a.Order - b.Order)
      for (let i = 0; i < data.length; i++) {
        const a = {
          Code: data[i].Code,
          Value: data[i].Value,
          ViName: data[i].ViName,
          EnName: data[i].EnName,
          Order: data[i].Order
        }
        this.responseList.push(a)
      }
    },
    confirm () {
      new TranferLetter().update(this._VisitId, this.user, '/Confirm/').then(response => {
        this.getData()
        this.$modal.hide('doctorConfirm')
      }).catch(e => {
        // this.back()
      })
    },
    showDoctorConfirm (kind, title) {
      this.popupTitle = title
      this.user.kind = kind
      this.$modal.show('doctorConfirm')
    }
  }
}
</script>
