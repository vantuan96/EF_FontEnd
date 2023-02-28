<template>
  <div class="main-content" id="di0-page" tabindex="0">
    <div v-if="CheckDate === 2" class="box-msg" style="text-align: center; padding: 10px">{{__t('Toàn bộ bệnh nhân được tiếp nhận thực tế sau 16/02/2022 và trước 30/09/2022 sẽ sử dụng Báo cáo y tế ra viện mã A01_143_120521_VE !')}}</div>
    <div v-if="CheckDate === 3" class="box-msg" style="text-align: center; padding: 10px">{{__t('Toàn bộ bệnh nhân được tiếp nhận thực tế sau 30/09/2022 sẽ sử dụng Báo cáo y tế ra viện mới mã A01_143_290922_VE !')}}</div>
    <div class="a4-page box" id="printMe">
      <div class="text-center" style="text-align: center"><img class="top-logo" src="/static/Logo Vinmec International Hospitall 1.png" /></div>
      <h2 class="title-page text-center" style="text-align: center">BÁO CÁO Y TẾ RA VIỆN</h2>
      <h2 class="text-center" style="text-align: center;font-size: 14px;"><i>DISCHARGE MEDICAL REPORT</i></h2>
      <p><b>Khoa</b>/ <i>Department </i>: {{(data && data.Specialty) ? data.Specialty : ''}}</p>
      <p><b>Họ và tên người bệnh</b>/ <i>Patient’s name </i>: {{data.Fullname}}</p>
      <table width="100%">
        <tr>
          <td><p><b>Ngày tháng năm sinh</b>/ <i>D.O.B</i>: {{data.DateOfBirth}}</p></td>
          <td width="40%"><p><b>Giới tính</b>/ <i>Gender</i>: {{data.Gender}}</p></td>
        </tr>
        <tr>
          <td><p><b>Quốc tịch</b>/ <i>Nationality</i>: {{data.Nationality}}</p></td>
          <td><p><b>PID</b>: {{data.PID}}</p></td>
        </tr>
      </table>
      <p><b>Địa chỉ</b>/ <i>Address</i>: {{data.Address}}</p>
      <p v-if="CheckDate === 3"><b>Vào viện lúc</b>/ <i>Hospital Admission (Time, Date):</i> {{data.AdmittedDate}}</p>
      <p v-else><b>Vào viện lúc</b>/ <i>Adminssion at (Time, Date):</i> {{data.AdmittedDate}}</p>
      <p v-if="CheckDate === 3"><b>Ra viện lúc</b>/ <i>Hospital Discharge (Time, Date):</i> {{data.DischargeDate}}</p>
      <p v-else><b>Ra viện lúc</b>/ <i>Discharge at (Time, Date):</i> {{data.DischargeDate}}</p>
      <p><b>Lý do vào viện</b>/ <i>Chief complaint</i>: {{data.ChiefComplain}}</p>
      <div>
        <p><b>Quá trình bệnh lý và diễn biến lâm sàng</b>/ <i>Clinical evolution</i>:</p>
        <p @dblclick="addBreakPage" class="hasBreakPage">Bệnh sử/ History: {{data.History}}</p>
        <p @dblclick="addBreakPage" class="hasBreakPage">Thăm khám/ Assessment:</p>
        <div style="padding-left: 5px;">
          <p style="margin: 7px 0;font-size: 15px;line-height: 1.5;" :data="item" :key="index" v-for="(item ,index) in data.Assessment">+ {{item.ViName}}/<i> {{item.EnName}}: </i>{{item.Value}}</p>
        </div>
        <p></p>
      </div>
      <p @dblclick="addBreakPage" class="hasBreakPage"><b>Kết quả cận lâm sàng</b>/ <i>Result of paraclinical tests</i>:{{'\n'}}{{data.ReadOnlyResultOfParaclinicalTests}}{{data.ResultOfParaclinicalTests}}</p>
      <p @dblclick="addBreakPage" class="hasBreakPage"><b>Chẩn đoán</b>/ <i>Diagnose</i>: {{data.Diagnosis}}</p>
      <p @dblclick="addBreakPage" class="hasBreakPage" v-if="CheckDate === 2 || CheckDate === 3"><b>Mã bệnh</b>/ <i>ICD</i>: {{getICD10s2(data.ICDDiagnosis, '')}}</p>
      <p @dblclick="addBreakPage" class="hasBreakPage" v-if="CheckDate === 2 || CheckDate === 3"><b>Bệnh kèm theo</b>/ <i>Co morbidities</i>: {{data.CoMorbidities}}</p>
      <p @dblclick="addBreakPage" class="hasBreakPage" v-if="CheckDate === 2 || CheckDate === 3"><b>Mã bệnh</b>/ <i>ICD</i>: {{getICD10s2(data.ICDCoMorbidities, '')}}</p>
      <p @dblclick="addBreakPage" class="hasBreakPage"><b>Phương pháp điều trị</b>/ <i>Treatment and procedures</i>: {{data.TreatmentAndProcedures}}</p>
      <p @dblclick="addBreakPage" class="hasBreakPage"><b>Các thuốc chính đã dùng: </b>{{data.SignificantMedications}}</p>
      <p @dblclick="addBreakPage" class="hasBreakPage"><b>Tình trạng bệnh nhân hiện tại</b>/ <i>Current status</i>: {{data.CurrentStatus}}</p>
      <div>
        <p @dblclick="addBreakPage" class="hasBreakPage"><b>Kế hoạch điều trị và chăm sóc tiếp theo</b>/ <i>Follow-up care plan</i>: {{data.FollowupCarePlan}}</p>
        <p v-if="data.DoctorRecommendations"><b>Lời dặn của thầy thuốc</b>/ <i>Doctor recommendations</i>: {{data.DoctorRecommendations ? ('\n' + data.DoctorRecommendations) : ''}}</p>
      </div>
      <table class="table" style="width: 100%">
        <tr class="only-print-page">
          <td width="33%">
            <p v-if="DISCHARGEMEDICALREPORT_TIME_PHY">{{DISCHARGEMEDICALREPORT_TIME_PHY | bilingualFormatDateTimeKLM}}</p>
            <p v-else>...Giờ/hour ....Ngày/Date..../...../.........</p>
          </td>
          <td width="33%">
            <p v-if="DISCHARGEMEDICALREPORT_TIME_DEP">{{DISCHARGEMEDICALREPORT_TIME_DEP | bilingualFormatDateTimeKLM}}</p>
            <p v-else>...Giờ/hour ....Ngày/Date..../...../.........</p>
          </td>
          <td class="text-center no-wrap">
            <p v-if="DISCHARGEMEDICALREPORT_TIME_DIR">{{DISCHARGEMEDICALREPORT_TIME_DIR | bilingualFormatDateTimeKLM}}</p>
            <p v-else>...Giờ/hour ....Ngày/Date..../...../.........</p>
          </td>
        </tr>
        <tr class="only-print-page">
          <td width="33%" height="150" class="text-center" style="text-align: center" valign="top">
            <b>Bác sỹ điều trị</b>
            <br/><i>PHYSICIAN-IN-CHARGE</i>
            <p v-if="DISCHARGEMEDICALREPORT_PHY" style="text-align: center; margin-top: 60px; margin-bottom: 0;">{{DISCHARGEMEDICALREPORT_PHY}}</p>
          </td>
          <td width="33%" height="150" class="text-center" style="text-align: center" valign="top">
            <b>Trưởng khoa</b>
            <br/><i>DEPT HEAD</i>
            <p v-if="DISCHARGEMEDICALREPORT_DEP" style="text-align: center; margin-top: 60px; margin-bottom: 0;">{{DISCHARGEMEDICALREPORT_DEP}}</p>
          </td>
          <td width="33%" height="150" class="text-center" style="text-align: center" valign="top">
            <b>Giám đốc</b>
            <br/><i>DIRECTOR</i>
            <p v-if="DISCHARGEMEDICALREPORT_DIR" style="text-align: center; margin-top: 60px; margin-bottom: 0;">{{DISCHARGEMEDICALREPORT_DIR}}</p>
          </td>
          <td>
            <img style="width: 100%" src="/static/chu_ky.png" />
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
      <translation-request :name="'báo cáo y tế ra viện'" :VisitId="VisitId" :ViName="'BÁO CÁO Y TẾ RA VIỆN'" :EnName="'DISCHARGE MEDICAL REPORT'" />
    </div>
    <div v-if="data.Version" class="a4-page no-style">
      <Confirm
        class="mt-10 only-web-page"
        :MasterDataCode="'DISCHARGEMEDICALREPORT'"
        :FormCode="'A01_143_290922_VE'"
        :VisitId="_VisitId"
        :FormId="data.Id"
        :ReadOnly="viewOnly"
        :Bilingual="true"
        @ResponseData="getListConfirm"
      />
    </div>
    <div class="a4-page no-style" v-if="!viewOnly">
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
        <DischargeMedicalReportView :CheckDate="CheckDate" :dataParent="data" :isTranView="true" :data="dataTranslated" v-if="dataTranslated" :printId="'printview'"/>
        <div v-else class="loading-text"><v-loading/></div>
      </div>
    </modal>
    <p class="a4-page no-style">{{getFormCode}}</p>
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
 * DMR Page vi sao đặt tên là DMR hỏi dungnv53
 * ============
 *
 * The home index page.
 */
import Confirm from '@/components/Form/Confirm3'
import MixinMasterData from '@/mixins/masterdata.js'
import DischargeMedicalReport from '@/services/ED/DischargeMedicalReport'
import MixinView from '@/mixins/view.js'
import moment from 'moment'
import MixinForm from '@/mixins/form.js'
import TranslationRequest from '@/components/Translation/Request.vue'
import ViewItem from '@/components/Translation/View.vue'
import Translation from '@/services/Translation'
import DischargeMedicalReportView from './View/Index.vue'
const MODAL_WIDTH = 870
export default {
  /**
   * The name of the page.
   */
  name: 'DMR',
  mixins: [MixinMasterData, MixinView, MixinForm],
  props: ['viewOnly', 'VisitId'],
  data () {
    return {
      data: {},
      CheckDate: null,
      popupTitle: '',
      modalWidth: MODAL_WIDTH,
      TranItem: null,
      dataTranslated: null,
      user: {},
      DISCHARGEMEDICALREPORT_PHY: '',
      DISCHARGEMEDICALREPORT_DEP: '',
      DISCHARGEMEDICALREPORT_DIR: '',
      DISCHARGEMEDICALREPORT_TIME_PHY: '',
      DISCHARGEMEDICALREPORT_TIME_DEP: '',
      DISCHARGEMEDICALREPORT_TIME_DIR: ''
    }
  },
  /**
   * The components that the page can use.
   */
  components: {
    TranslationRequest,
    ViewItem,
    DischargeMedicalReportView,
    Confirm
  },
  mounted () {
    this.modalWidth = window.innerWidth < MODAL_WIDTH
      ? '90%'
      : MODAL_WIDTH
    this.getData()
  },
  computed: {
    getFormCode () {
      if (this.CheckDate === 1) {
        return 'A01_143_050919_VE'
      } else if (this.CheckDate === 2) {
        return 'A01_143_120521_VE'
      } else {
        return 'A01_143_290922_VE'
      }
    }
  },
  methods: {
    getListConfirm (val) {
      val.map(item => {
        if (item.ConfirmType === 'DISCHARGEMEDICALREPORT_PHY') {
          this.DISCHARGEMEDICALREPORT_PHY = item.Fullname
          this.DISCHARGEMEDICALREPORT_TIME_PHY = moment(item.ConfirmAt).format('HH:mm DD/MM/YYYY')
        }
        if (item.ConfirmType === 'DISCHARGEMEDICALREPORT_DEP') {
          this.DISCHARGEMEDICALREPORT_DEP = item.Fullname
          this.DISCHARGEMEDICALREPORT_TIME_DEP = moment(item.ConfirmAt).format('HH:mm DD/MM/YYYY')
        }
        if (item.ConfirmType === 'DISCHARGEMEDICALREPORT_DIR') {
          this.DISCHARGEMEDICALREPORT_DIR = item.Fullname
          this.DISCHARGEMEDICALREPORT_TIME_DIR = moment(item.ConfirmAt).format('HH:mm DD/MM/YYYY')
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
      this.$htmlToPaperKLM('printMe', true, this.getFormCode, this.getHotlineEd())
    },
    getData () {
      new DischargeMedicalReport().find(this._VisitId).then(response => {
        this.data = response
        this.$store.dispatch('setCurrentFormId', response.Id)
        if (response.AdmittedDate) {
          this.handleCheckDate(response.AdmittedDate)
        }
      }).catch(e => {
        if (e.status === 400) {
          this._404()
        }
      })
    },
    handleCheckDate (AdmittedDate) {
      // this.CheckDate = AdmittedDate && moment(new Date(2022, 1, 16, 14, 0, 0)) > moment(AdmittedDate, 'HH:mm DD/MM/YYYY')
      if (moment(AdmittedDate, 'HH:mm DD/MM/YYYY') > moment(new Date(2022, 8, 30, 17, 0, 0))) {
        this.CheckDate = 3
      }
      if (moment(AdmittedDate, 'HH:mm DD/MM/YYYY') > moment(new Date(2022, 1, 16, 14, 0, 0)) && moment(AdmittedDate, 'HH:mm DD/MM/YYYY') <= moment(new Date(2022, 8, 30, 17, 0, 0))) {
        this.CheckDate = 2
      }
      if (moment(AdmittedDate, 'HH:mm DD/MM/YYYY') <= moment(new Date(2022, 1, 16, 14, 0, 0))) {
        this.CheckDate = 1
      }
      console.log(`AdmittedDate: ${AdmittedDate} ${moment(new Date(2022, 8, 30, 17, 0, 0)).format()} => Version: ${this.CheckDate}`)
    },
    showDoctorConfirm (kind, title) {
      this.popupTitle = title
      this.user.kind = kind
      this.$modal.show('doctorConfirm')
    },
    confirm () {
      new DischargeMedicalReport().update(this._VisitId, this.user, '/Confirm/').then(response => {
        this.getData()
        this.$modal.hide('doctorConfirm')
      }).catch(e => {
        // this.back()
      })
    }
  }
}
</script>
<style scoped>
.box-msg {
  padding-right: 161px;
}
</style>
