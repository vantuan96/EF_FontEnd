<template>
  <div class="main-content disable_ccp" id="di0-page">
    <div class="a4-page box" id="printMe" v-if="data">
      <div class="text-center" style="text-align: center"><img class="top-logo" src="/static/Logo Vinmec International Hospitall 1.png" /></div>
      <h2 class="title-page text-center" style="text-align: center; font-size: 20px">GIẤY CHUYỂN VIỆN/ <i>REFERRAL LETTER</i></h2>
      <p style="text-align: center"><b>Kính gửi/ <i>To</i></b>: {{data.ReceivingHospital}}</p>
      <p>Bệnh viện VINMEC trân trọng giới thiệu/<i> We would like to refer to you the below patient:</i></p>
      <p><b>Họ và tên người bệnh</b>/ <i>Patient’s name</i>: {{data.Fullname}}</p>
      <table width="100%">
        <tr>
          <td><p><b>Ngày tháng năm sinh</b>/ <i>D.O.B</i>: {{data.DateOfBirth}}</p></td>
          <td width="40%"><p><b>Giới tính</b>/ <i>Gender</i>: {{data.Gender}}</p></td>
        </tr>
        <tr>
          <td><p><b>Quốc tịch</b>/ <i>Nationality</i>: {{data.Nationality}}</p></td>
          <td></td>
        </tr>
      </table>
      <p><b>Số đăng ký</b>/ <i>PID</i>: {{data.PID}}</p>
      <!-- <p><b>Vào khoa cấp cứu lúc</b>/ <i>Admission at (Time, Date)</i>: {{data.AdmittedDate}}</p>
      <p><b>Nhập viện lúc</b>/ <i>Discharge at (Time, Date):</i> {{data.DischargeDate}}</p> -->
      <p>Đã được khám/ điều trị tại BV VINMEC/ <i>Examined/ treated in VINMEC hospital</i> từ ngày/ <i>from</i> {{data.Admission}} đến/ <i>to</i> {{data.Discharge}}</p>
      <p>Số thẻ BHYT/ <i>Insurance card No</i>: {{data.HealthInsuranceNumber}}  Có giá trị đến/ <i>Expire date</i>: {{data.ExpireHealthInsuranceDate}}</p>
      <p>Lý do chuyển viện/ <i>Reason for transfer</i>: {{data.ReasonForTransfer}}</p>
      <p>Chuyển viện hồi/ <i>Time of transfer</i>: {{data.TimeOfTransfer}}</p>
      <p>Họ tên, chức danh người được liên hệ để nhận bệnh nhân/ <i>Name and title of staff being contacted from receiving hospital</i>: {{data.ReceivingPerson}}</p>
      <p>Phương tiện vận chuyển/ <i>Transportation method</i>: {{data.TransportationMethod}}</p>
      <p>Họ tên, chức danh người đưa đi/ <i>Name and title of medical escort</i>: {{data.EscortPerson}}</p>
      <h2 class="title-page text-center" style="text-align: center; font-size: 20px">TÓM TẮT BỆNH ÁN/ SUMMARY OF MEDICAL RECORD</h2>
      <p @dblclick="addBreakPage" class="hasBreakPage"><b>Lý do nhập viện</b>/ <i>Chief complaint</i>: {{data.ReasonsForAdmission}}</p>
      <p @dblclick="addBreakPage" class="hasBreakPage"><b>Quá trình bệnh lý và diễn biến lâm sàng</b>/ <i>Clinical evolution</i>: {{data.ClinicalEvolution}}</p>
      <p @dblclick="addBreakPage" class="hasBreakPage"><b>Kết quả cận lâm sàng</b>/ <i>Result of paraclinical tests</i>: {{data.ResultOfParaclinicalTests}}</p>
      <p @dblclick="addBreakPage" class="hasBreakPage"><b>Chẩn đoán</b>/ <i>Diagnosis</i>: {{data.Diagnosis}}</p>
      <div @dblclick="addBreakPage" class="hasBreakPage"><b>Phương pháp điều trị</b>/ <i>Treatments and procedures</i>:</div>
      <p v-html="data.TreatmentsAndProcedures"></p>
      <p @dblclick="addBreakPage" class="hasBreakPage"><b>Các thuốc chính đã dùng</b>/ <i>Significant medications</i>: {{data.DrugsUsed}}</p>
      <p @dblclick="addBreakPage" class="hasBreakPage"><b>Tình trạng người bệnh lúc chuyển viện</b>/ <i>Condition at discharge</i>: {{data.ConditionAtDischarge}}</p>
      <p @dblclick="addBreakPage" class="hasBreakPage"><b>Kế hoạch điều trị tiếp theo</b>/ <i>Follow-up care plan</i>: {{data.FollowUpCarePlan}}</p>
      <p style="text-align: right;padding-right: 57px;"><i>{{data.Date | viDisplayformatDateTime}}</i></p>
      <template v-if="data && data.Version >= 10">
        <table class="table only-print-page" style="width: 100%; font-size: 14px">
          <tr>
            <td width="50%" class="text-center" style="text-align: center">
              <p v-if="REFERRALLETTER_TIME_PIC" style="text-align: center;">{{REFERRALLETTER_TIME_PIC}}</p>
              <p style="text-align: center;"><b>BÁC SỸ ĐIỀU TRỊ</b>/ <i>PHYSICIAN-IN-CHARGE</i></p>
            </td>
            <td class="text-center" style="text-align: center">
              <p v-if="REFERRALLETTER_TIME_DIR" style="text-align: center;">{{REFERRALLETTER_TIME_DIR}}</p>
              <p style="text-align: center;"><b>GIÁM ĐỐC BỆNH VIỆN</b>/ <i>DIRECTOR</i></p>
            </td>
          </tr>
          <tr>
            <td valign="top">
              <img style="opacity: 0" class="hidden-box" src="/static/140x80.png" />
              <p v-if="REFERRALLETTER_PIC" style="text-align: center;">{{REFERRALLETTER_PIC}}</p>
            </td>
            <td valign="top">
              <img style="opacity: 0" class="hidden-box" src="/static/140x80.png" />
              <p v-if="REFERRALLETTER_DIR" style="text-align: center;">{{REFERRALLETTER_DIR}}</p>
            </td>
          </tr>
        </table>
      </template>
      <template v-else>
        <table class="table hidden-only-form" style="width: 100%;font-size: 14px">
          <tr>
            <td style="text-align: center;">
              <p style="text-align: center;">{{(data.PhysicianInChargeTime || '')}}</p>
              <p style="text-align: center;" class="font-bold font15">BÁC SỸ ĐIỀU TRỊ/ <i>PHYSICIAN-IN-CHARGE</i></p>
            </td>
            <td style="text-align: center;">
              <p style="text-align: center;">{{(data.DirectorTime || '')}}</p>
              <p style="text-align: center;" class="font-bold font15">GIÁM ĐỐC BỆNH VIỆN<i>DIRECTOR</i></p>
            </td>
          </tr>
          <tr>
            <td valign="top">
              <img style="opacity: 0" class="hidden-box" src="/static/140x80.png" />
              <p v-if="data.PhysicianInCharge.Fullname" style="text-align: center;">{{(data.PhysicianInCharge.Fullname)}}</p>
            </td>
            <td valign="top">
              <img style="opacity: 0" class="hidden-box" src="/static/140x80.png" />
              <p v-if="data.Director.Fullname" style="text-align: center;">{{(data.Director.Fullname)}}</p>
            </td>
          </tr>
        </table>
      </template>
    </div>
    <div v-else-if="!viewOnly" class="text-center">
      <h4>{{errMsg}}</h4>
      <p><button class="btn btn-back v-white-btn" type="button" @click="back()">{{__t('btn.back')}}</button></p>
    </div>
    <div class="a4-page no-style" v-if="data && data.Translations && data.Translations.length">
      {{__t('Xem các bản dịch tiếng')}} :
      <button @click="view(item)" class="btn v-white-btn btn-round" :data="item" :key="index" v-for="(item ,index) in data.Translations">
        <i class="fa fa-share-square-o" aria-hidden="true" v-if="item.Status === 0"></i>
        <i class="fa fa-commenting" aria-hidden="true" v-if="item.Status === 1"></i>
        <i class="fa fa-clock-o" aria-hidden="true" v-if="item.Status === 2"></i>
        <i class="fa fa-check green-color" aria-hidden="true" v-if="item.Status === 3"></i>
        {{__t(item.ToLanguage)}}
      </button>
    </div>
    <div class="a4-page translation-area" v-if="!viewOnly && data">
      <translation-request :name="'giấy chuyển viện'" :VisitId="_VisitId" :ViName="'GIẤY CHUYỂN VIỆN '" :EnName="'REFERRAL LETTER'" />
    </div>
    <div class="container mt-10" style="width: 870px !important; padding: 0">
      <p>A01_145_050919_VE</p>
    </div>
    <div v-if="data && data.Version >= 10" class="a4-page no-style">
      <Confirm
        class="mt-10 only-web-page"
        :MasterDataCode="'REFERRALLETTERCONFIRM'"
        :FormCode="`A01_145_050919_VE`"
        :VisitId="_VisitId"
        :FormId="data.Id"
        :ReadOnly="viewOnly || IsFormLocked(data)"
        :Bilingual="true"
        @ResponseData="getListConfirm"
      />
    </div>
    <template v-else>
      <div class="2a4-page no-style" v-if="data">
        <div class="row only-web-page">
          <br/>
          <br/>
          <div class="col-md-6 col-sm-6 text-center">
            <template v-if="data.PhysicianInCharge && data.PhysicianInCharge.Username">
              <p>{{data.PhysicianInChargeTime}}</p>
              <eform-signature :ad="data.PhysicianInCharge.Username" :title="'Bác sĩ/ PHYSICIAN-IN-CHARGE'" />
            </template>
            <template v-else>
              <p><b>BÁC SĨ ĐIỀU TRỊ/ </b><i>PHYSICIAN-IN-CHARGE</i></p>
              <p v-if="!viewOnly && !IsFormLocked(data)">
                <button @click="showDoctorConfirm('PhysicianInCharge', 'Bác sĩ/ PHYSICIAN-IN-CHARGE')" class="btn v-white-btn">{{__t('Xác nhận')}}</button>
              </p>
              <p v-else>
                <i style="color: green">{{__t('(Chưa ký xác nhận)')}}</i>
              </p>
            </template>
          </div>
          <div class="col-md-6 col-sm-6 text-center">
            <template v-if="data.Director && data.Director.Username">
              <p>{{data.DirectorTime}}</p>
              <eform-signature :ad="data.Director.Username" :title="'Giám đốc/ DIRECTOR'" />
            </template>
            <template v-else>
              <p><b>GIÁM ĐỐC/ </b><i>DIRECTOR</i></p>
              <p v-if="!viewOnly && !IsFormLocked(data)">
                <button @click="showDoctorConfirm('Director', 'Giám đốc/ DIRECTOR')" class="btn v-white-btn">{{__t('Xác nhận')}}</button>
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
    <modal :name="'view-modal'" transition="pop-out" height="auto" :scrollable="false" :width="modalWidth" :class="'no-scroll-x'">
      <div v-if="TranItem && TranItem.Status !== 3">
        <view-item :isTranslate="true" @confirmed="confirmed" :Id="TranItem.Id" :ForDoctor="true" />
      </div>
      <div v-else>
        <ReferralLetterView :dataParent="data" v-if="dataTranslated" :isTranView="true" :data="dataTranslated" :CheckDate="CheckDate" :viewOnly="viewOnly" :printId="'printview'"/>
        <div v-else class="loading-text"><v-loading/></div>
      </div>
    </modal>
  </div>
</template>
<script>
/* ============
 * KLM Page vi sao đặt tên là KLM hỏi dungnv53
 * ============
 *
 * The home index page.
 */
import Confirm from '@/components/Form/Confirm3'
import TranslationRequest from '@/components/Translation/Request.vue'
import Document from '@/services/IPD/ReferralLetter'
import MixinForm from '@/mixins/form.js'
import MixinMasterData from '@/mixins/masterdata.js'
import ViewItem from '@/components/Translation/View.vue'
import ReferralLetterView from './View/Index.vue'
import Translation from '@/services/Translation'
import moment from 'moment'

const MODAL_WIDTH = 870

export default {
  /**
   * The name of the page.
   */
  name: 'ReferralLetter',
  props: ['viewOnly', 'VisitId'],
  mixins: [MixinMasterData, MixinForm],
  data () {
    return {
      modalWidth: MODAL_WIDTH,
      TranItem: null,
      dataTranslated: null,
      data: null,
      Kind: null,
      loaded: false,
      popupTitle: '',
      user: {},
      errMsg: 'Hồ sơ bệnh án chưa đầy đủ, vui lòng thực hiện trước khi sử dụng tính năng này',
      REFERRALLETTER_PIC: '',
      REFERRALLETTER_DIR: '',
      REFERRALLETTER_TIME_PIC: '',
      REFERRALLETTER_TIME_DIR: ''
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
  },
  methods: {
    getListConfirm (val) {
      val.map(item => {
        if (item.ConfirmType === 'REFERRALLETTER_PIC') {
          this.REFERRALLETTER_PIC = item.Fullname
          this.REFERRALLETTER_TIME_PIC = moment(item.ConfirmAt).format('HH:mm DD/MM/YYYY')
        }
        if (item.ConfirmType === 'REFERRALLETTER_DIR') {
          this.REFERRALLETTER_DIR = item.Fullname
          this.REFERRALLETTER_TIME_DIR = moment(item.ConfirmAt).format('HH:mm DD/MM/YYYY')
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
    },
    print () {
      this.$htmlToPaper('printMe', false, 'A01_145_050919_VE')
    },
    getData () {
      new Document().find(this._VisitId + '?hidemsg=' + true).then(response => {
        this.data = response
        this.$store.dispatch('setCurrentFormId', response.Id)
      })
    },
    confirm () {
      new Document().update(this._VisitId, this.user, '/Confirm/').then(response => {
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
