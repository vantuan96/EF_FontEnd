<template>
  <div class="main-content" id="di0-page">
    <div class="a4-page box" id="printMe">
      <div class="text-center" style="text-align: center"><img class="top-logo" src="/static/Logo Vinmec International Hospitall 1.png" /></div>
      <h2 class="title-page text-center" style="text-align: center; font-size: 20px">GIẤY CHUYỂN VIỆN/REFERRAL LETTER</h2>
      <p style="text-align: center"><b>Kính gửi/To</b>: {{data.To}}</p>
      <p>Bệnh viện VINMEC trân trọng giới thiệu/<i> We would like to refer to you the below patient:</i></p>
      <br/>
      <p><b>Họ và tên người bệnh</b>/ <i>Patient’s name </i>: {{data.Name}}</p>
      <table width="100%">
        <tr>
          <td><p><b>Ngày tháng năm sinh</b>/ <i>D.O.B</i>: {{data.DOB}}</p></td>
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
      <p>Đã được khám/điều trị tại BV VINMEC/ Examined/ treated in VINMEC hospital từ ngày/ from {{data.StartDate}} đến/to {{data.EndDate}}</p>
      <p>Số thẻ BHYT/Insurance card No: {{data.InsuranceCardNo}}  Có giá trị đến/Expire date: {{data.ExpireDate}}</p>
      <p>Lý do chuyển viện/ Reason for transfer: {{data.ReasonForTransfer}}</p>
      <p>Chuyển viện hồi/ Time of transfer: {{data.EndDate}}</p>
      <p>Họ tên, chức danh người được liên hệ để nhận bệnh nhân/ Name and title of staff being contacted from receiving hospital: {{data.ReceivingPerson}}</p>
      <p>Phương tiện vận chuyển/ Transportation method: {{data.TransportationMethod}}</p>
      <p>Họ tên, chức danh người đưa đi/Name and title of medical escort: {{data.EscortPerson}}</p>
      <h2 class="title-page text-center" style="text-align: center; font-size: 20px">TÓM TẮT BỆNH ÁN/ SUMMARY OF MEDICAL RECORD</h2>
      <p><b>Lý do vào viện</b>/ <i>Chief complaint</i>: {{data.ReasonsForAdmission}}</p>
      <!-- ResultOfParaclinicalTests -->
      <div>
        <p><b>Quá trình bệnh lý và diễn biến lâm sàng</b>/ <i>Clinical evolution</i>:</p>
        <!-- <div>Tiền sử/ Past Health History: {{data.PastHealthHistory}}</div> -->
        <p>Bệnh sử/ History: {{data.History}}</p>
        <p>Thăm khám/ Assessment:</p>
        <div style="padding-left: 5px;">
          <p style="margin: 7px 0;font-size: 15px;line-height: 1.5;" :data="item" :key="index" v-for="(item ,index) in data.Assessment">+ <span>{{item.ViName}}/<i> {{item.EnName}}: </i>{{item.Value}}</span></p>
        </div>
        <p></p>
      </div>
      <p><b>Kết quả cận lâm sàng</b>/ <i>Result of paraclinical tests</i>: {{data.ResultOfParaclinicalTests}}</p>
      <p><b>Chẩn đoán</b>/ <i>Diagnosis</i>: {{data.Diagnosis}} <span v-if="data.ICD && getICD10(data.ICD)">({{getICD10(data.ICD)}})</span></p>
      <p><b>Phương pháp điều trị</b>/ <i>Treatment and procedures</i>: {{data.TreatmentAndProcedures}}</p>
      <p><b>Các thuốc chính đã dùng</b>/ <i>Drugs used</i>: {{data.DrugsUsed}}</p>
      <p><b>Tình trạng bệnh nhân lúc chuyển viện</b>/ <i>Current status</i>: {{data.PatientStatusAtTransfer}}</p>
      <div>
        <p><b>Kế hoạch điều trị và chăm sóc tiếp theo</b>/ <i>Follow-up care plan</i>: {{data.PlanOfCare}}</p>
        <p v-if="data.DoctorRecommendations"><b>Lời dặn của thầy thuốc</b>/ <i>Doctor recommendations</i>: {{data.DoctorRecommendations}}</p>
      </div>
      <p style="text-align: right; padding-right: 55px;"><i>{{data.Date | viDisplayformatDateTime}}</i></p>
      <table class="table" :class="{'only-print-page': data.Version >= 10}" style="width: 100%; font-size: 14px">
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
      <translation-request :name="'giấy chuyển viện'" :VisitId="VisitId" :ViName="'GIẤY CHUYỂN VIỆN'" :EnName="'REFERRAL LETTER'" />
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
    <div class="a4-page no-style" v-if="!viewOnly">
      <div class="">
        <button class="btn pull-left btn-back v-white-btn" type="button" @click="back()">Quay lại</button>
        <button class="btn v-yellow-btn pull-right"  v-shortkey="['ctrl', 'p']" @shortkey="print()" @click="print"><i class="fa fa-print" aria-hidden="true"></i> In ngay</button>
      </div>
    </div>
    <modal :name="'view-modal'" transition="pop-out" height="auto" :scrollable="false" :width="modalWidth" :class="'no-scroll-x'">
      <div v-if="TranItem && TranItem.Status !== 3">
        <view-item :isTranslate="true" @confirmed="confirmed" :Id="TranItem.Id" :ForDoctor="true" />
      </div>
      <div v-else>
        <ReferralLetterView :dataParent="data" :isTranView="true" :data="dataTranslated" v-if="dataTranslated" :printId="'printview'"/>
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
import MixinMasterData from '@/mixins/masterdata.js'
import ReferralLetter from '@/services/ED/ReferralLetter'
import MixinForm from '@/mixins/form.js'
import TranslationRequest from '@/components/Translation/Request.vue'
import ViewItem from '@/components/Translation/View.vue'
import Translation from '@/services/Translation'
import ReferralLetterView from './View/Index.vue'
import moment from 'moment'

const MODAL_WIDTH = 870

export default {
  /**
   * The name of the page.
   */
  name: 'KLM',
  props: ['viewOnly', 'VisitId'],
  mixins: [MixinMasterData, MixinForm],
  data () {
    return {
      data: {},
      modalWidth: MODAL_WIDTH,
      TranItem: null,
      dataTranslated: null,
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
        'DateOfBirth',
        'Date',
        'ICD',
        'Location',
        'AdmittedDate',
        'DischargeDate',
        'PID',
        'ICDOption',
        'Site',
        'Province'
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
            if (res[key]) {
              res[key] = this.trim_([res[key], '/ ', translation[key]].map(e => e).join(''), '/ ')
            }
          }
        }
      }
      return res
    },
    print () {
      this.$htmlToPaper('printMe', false, 'A01_145_050919_VE')
    },
    getData () {
      new ReferralLetter().find(this._VisitId).then(response => {
        this.data = response
        this.$store.dispatch('setCurrentFormId', response.Id)
      })
    }
  }
}
</script>
