<template>
  <div class="main-content" id="di0-page">
    <div class="a4-page box" :id="printId || 'printMeTranslate'">
      <div class="text-center" style="text-align: center"><img class="top-logo" src="/static/Logo Vinmec International Hospitall 1.png" /></div>
      <h2 class="title-page text-center" style="text-align: center; font-size: 20px">GIẤY CHUYỂN VIỆN/REFERRAL LETTER</h2>
      <p style="text-align: center"><b>Kính gửi/To</b>: {{dataParent.To}}</p>
      <p>Bệnh viện VINMEC trân trọng giới thiệu/<i> We would like to refer to you the below patient:</i></p>
      <br/>
      <p><b>Họ và tên người bệnh</b>/ <i>Patient’s name </i>: {{data.Fullname}}</p>
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
      <p>Đã được khám/điều trị tại BV VINMEC/ Examined/ treated in VINMEC hospital từ ngày/ from {{dataParent ? dataParent.StartDate : data.StartDate}} đến/to {{dataParent ? dataParent.EndDate : data.EndDate}}</p>
      <p>Số thẻ BHYT/Insurance card No: {{dataParent ? dataParent.InsuranceCardNo : data.InsuranceCardNo}}  Có giá trị đến/Expire date: {{dataParent ? dataParent.ExpireDate : data.ExpireDate}}</p>
      <p>Lý do chuyển viện/ Reason for transfer: {{data.ReasonForTransfer}}</p>
      <p>Chuyển viện hồi/ Time of transfer: {{dataParent.EndDate}}</p>
      <p>Họ tên, chức danh người được liên hệ để nhận bệnh nhân/ Name and title of staff being contacted from receiving hospital: {{data.ReceivingPerson}}</p>
      <p>Phương tiện vận chuyển/ Transportation method: {{data.TransportationMethod}}</p>
      <p>Họ tên, chức danh người đưa đi/Name and title of medical escort: {{data.EscortPerson}}</p>
      <h2 class="title-page text-center" style="text-align: center; font-size: 20px">TÓM TẮT BỆNH ÁN/ SUMMARY OF MEDICAL RECORD</h2>
      <p><b>Lý do vào viện</b>/ <i>Chief complaint</i>: {{data.ChiefComplain}}</p>
      <!-- ResultOfParaclinicalTests -->
      <div>
        <p><b>Quá trình bệnh lý và diễn biến lâm sàng</b>/ <i>Clinical evolution</i>:</p>
        <!-- <div>Tiền sử/ Past Health History: {{data.PastHealthHistory}}</div> -->
        <p>Bệnh sử/ History: {{data.History}}</p>
        <p>Thăm khám/ Assessment:</p>
        <div style="padding-left: 5px;">
          <p style="margin: 7px 0;font-size: 15px;line-height: 1.5;" :data="item" :key="index" v-for="(item ,index) in data.ClinicalExaminationAndFindings">+ <span>{{item.ViName}}/<i> {{item.EnName}}: </i>{{item.Value}}</span></p>
        </div>
        <p></p>
      </div>
      <p><b>Kết quả cận lâm sàng</b>/ <i>Result of paraclinical tests</i>: {{data.ResultOfParaclinicalTests}}</p>
      <!-- <p><b>Chẩn đoán</b>/ <i>Diagnosis</i>: {{data.Diagnosis}} <span v-if="data.ICD && getICD10(data.ICD)">({{getICD10(data.ICD)}})</span></p> -->
      <p><b>Chẩn đoán</b>/ <i>Diagnosis</i>: {{data.Diagnosis}}</p>
      <p><b>Phương pháp điều trị</b>/ <i>Treatment and procedures</i>: {{data.TreatmentAndProcedures}}</p>
      <p><b>Các thuốc chính đã dùng</b>/ <i>Drugs used</i>: {{data.SignificantMedications}}</p>
      <p><b>Tình trạng bệnh nhân lúc chuyển viện</b>/ <i>Current status</i>: {{data.PatientStatusAtTransfer}}</p>
      <div>
        <p><b>Kế hoạch điều trị và chăm sóc tiếp theo</b>/ <i>Follow-up care plan</i>: {{data.PlanOfCare}}</p>
        <p v-if="data.DoctorRecommendations"><b>Lời dặn của thầy thuốc</b>/ <i>Doctor recommendations</i>: {{data.DoctorRecommendations}}</p>
      </div>
      <p style="text-align: right; padding-right: 55px;"><i>{{dataParent.Date | viDisplayformatDateTime}}</i></p>
      <table class="table" style="width: 100%; font-size: 14px">
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
    <p style="margin: 10px 0 0 10px;">A01_145_050919_VE</p>
    <div v-if="dataParent && dataParent.Version >= 10" class="a4-page no-style">
      <Confirm
        class="mt-10"
        style="display: none;"
        :MasterDataCode="'REFERRALLETTERCONFIRM'"
        :FormCode="`A01_145_050919_VE`"
        :VisitId="_VisitId"
        :FormId="dataParent.Id"
        :ReadOnly="true"
        :Bilingual="true"
        @ResponseData="getListConfirm"
      />
    </div>
    <div v-if="isTranView" class="print-area">
      <button class="btn v-yellow-btn pull-right" @click="print()" v-shortkey="['ctrl', 'p']" @shortkey="print()"><i class="fa fa-print" aria-hidden="true"></i> {{__t('In')}}</button>
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
import Confirm from '@/components/Form/Confirm3'
import moment from 'moment'
export default {
  /**
   * The name of the page.
   */
  name: 'KLM-View',
  props: ['data', 'isTranView', 'printId', 'dataParent'],
  mixins: [],
  data () {
    return {
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
    Confirm
  },
  mounted () {
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
    print () {
      this.$htmlToPaper(this.printId || 'printMeTranslate', false, 'A01_145_050919_VE')
    }
  }
}
</script>
