<template>
  <div class="main-content" id="di0-page">
    <div class="a4-page box" :id="printId || 'printMeTranslate'" v-if="data">
      <div class="text-center" style="text-align: center"><img class="top-logo" src="/static/Logo Vinmec International Hospitall 1.png" /></div>
      <h2 class="title-page text-center" style="text-align: center; font-size: 20px">GIẤY CHUYỂN VIỆN/ <i>REFERRAL LETTER</i></h2>
      <p style="text-align: center"><b>Kính gửi/ <i>To</i></b>: {{dataParent ? dataParent.ReceivingHospital : ''}}</p>
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
      <p>Đã được khám/ điều trị tại BV VINMEC/ <i>Examined/ treated in VINMEC hospital</i> từ ngày/ <i>from</i> {{data.Admission}} đến/ <i>to</i> {{data.Discharge}}</p>
      <p>Số thẻ BHYT/ <i>Insurance card No</i>: {{data.HealthInsuranceNumber}}  Có giá trị đến/ <i>Expire date</i>: {{data.ExpireHealthInsuranceDate}}</p>
      <p>Lý do chuyển viện/ <i>Reason for transfer</i>: {{data.ReasonForTransfer}}</p>
      <p>Chuyển viện hồi/ <i>Time of transfer</i>: {{data.TimeOfTransfer}}</p>
      <p>Họ tên, chức danh người được liên hệ để nhận bệnh nhân/ <i>Name and title of staff being contacted from receiving hospital</i>: {{data.ReceivingPerson}}</p>
      <p>Phương tiện vận chuyển/ <i>Transportation method</i>: {{data.TransportationMethod}}</p>
      <p>Họ tên, chức danh người đưa đi/ <i>Name and title of medical escort</i>: {{data.EscortPerson}}</p>
      <h2 class="title-page text-center" style="text-align: center; font-size: 20px">TÓM TẮT BỆNH ÁN/ SUMMARY OF MEDICAL RECORD</h2>
      <p @dblclick="addBreakPage" class="hasBreakPage"><b>Lý do nhập viện</b>/ <i>Chief complaint</i>: {{data.ChiefComplaint}}</p>
      <p @dblclick="addBreakPage" class="hasBreakPage"><b>Quá trình bệnh lý và diễn biến lâm sàng</b>/ <i>Clinical evolution</i>: {{data.ClinicalEvolution}}</p>
      <p @dblclick="addBreakPage" class="hasBreakPage"><b>Kết quả cận lâm sàng</b>/ <i>Result of paraclinical tests</i>: {{data.ResultOfParaclinicalTests}}</p>
      <p @dblclick="addBreakPage" class="hasBreakPage"><b>Chẩn đoán</b>/ <i>Diagnosis</i>: {{data.Diagnosis}}</p>
      <div @dblclick="addBreakPage" class="hasBreakPage"><b>Phương pháp điều trị</b>/ <i>Treatments and procedures</i>:</div>
      <div v-if="data && data.TreatmentsAndProcedures && (data.TreatmentsAndProcedures).toString().includes('/')">
        <p v-html="data.TreatmentsAndProcedures"></p>
      </div>
      <div v-else>
        <p v-if="dataParent && dataParent.TreatmentsAndProcedures" v-html="dataParent.TreatmentsAndProcedures"></p>
        <div style="display: flex;">
          <span style="margin-right: 5px;" v-if="dataParent && dataParent.TreatmentsAndProcedures">/ </span>
          <p v-html="data.TreatmentsAndProcedures"></p>
        </div>
      </div>
      <p @dblclick="addBreakPage" class="hasBreakPage"><b>Các thuốc chính đã dùng</b>/ <i>Significant medications</i>: {{data.DrugsUsed}}</p>
      <p @dblclick="addBreakPage" class="hasBreakPage"><b>Tình trạng người bệnh lúc chuyển viện</b>/ <i>Condition at discharge</i>: {{data.ConditionAtDischarge}}</p>
      <p @dblclick="addBreakPage" class="hasBreakPage"><b>Kế hoạch điều trị tiếp theo</b>/ <i>Follow-up care plan</i>: {{data.FollowUpCarePlan}}</p>
      <p style="text-align: right;padding-right: 57px;"><i>{{data.Date | viDisplayformatDateTime}}</i></p>
      <template v-if="dataParent && dataParent.Version >= 10">
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
      </template>
      <template v-else>
        <table class="table" style="width: 100%;font-size: 14px" v-if="!viewOnly">
          <tr>
            <td width="50%" class="text-center" style="text-align: center"><b>BÁC SĨ ĐIỀU TRỊ</b>/ <i>PHYSICIAN-IN-CHARGE</i></td>
            <td class="text-center" style="text-align: center"><b>GIÁM ĐỐC BỆNH VIỆN</b>/ <i>DIRECTOR</i></td>
          </tr>
          <tr>
            <th v-if="!dataParent.PhysicianInCharge" width="50%" class="text-center" style="text-align: center"><p><br /></p></th>
            <th v-if="!dataParent.Director" class="text-center" style="text-align: center"><p><br /></p></th>
          </tr>
           <tr>
            <td width="50%"  height="150px" class="text-center" style="text-align: center">
            </td>
            <td class="text-center" style="text-align: center">
            </td>
          </tr>
           <tr>
            <td v-if="dataParent.PhysicianInCharge && dataParent.PhysicianInCharge.Fullname" width="50%" class="text-center" style="text-align: center"><b>Họ tên</b>/ <i>Full name</i>: {{dataParent.PhysicianInCharge.Fullname}}</td>
            <td v-else width="50%" class="text-center" style="text-align: center"><b>Họ tên</b>/ <i>Full name</i>:.............................</td>
            <td v-if="dataParent.Director && dataParent.Director.Fullname" width="50%" class="text-center" style="text-align: center"><b>Họ tên</b>/ <i>Full name</i>: {{dataParent.Director.Fullname}}</td>
            <td v-else width="50%" class="text-center" style="text-align: center"><b>Họ tên</b>/ <i>Full name</i>:.............................</td>
          </tr>
        </table>
      </template>
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
    <div v-else-if="!viewOnly" class="text-center">
      <h4>{{errMsg}}</h4>
      <p><button class="btn btn-back v-white-btn" type="button" @click="back()">{{__t('btn.back')}}</button></p>
    </div>
    <div v-if="isTranView && !viewOnly" class="print-area">
      <button class="btn v-yellow-btn pull-right" @click="print()" v-shortkey="['ctrl', 'p']" @shortkey="print()"><i class="fa fa-print" aria-hidden="true"></i> In ngay</button>
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
  name: 'ReferralLetter-View',
  props: ['viewOnly', 'VisitId', 'isTranView', 'data', 'printId', 'dataParent'],
  mixins: [],
  data () {
    return {
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
