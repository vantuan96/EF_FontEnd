<template>
  <div class="main-content" id="di0-page">
      <!-- <div v-if="CheckDate === 2" class="box-msg" style="text-align: center; padding: 10px">{{__t('Toàn bộ bệnh nhân được tiếp nhận thực tế sau 16/02/2022 và trước 30/09/2022 sẽ sử dụng Báo cáo y tế ra viện mã A01_143_120521_VE !')}}</div> -->
      <div class="box-msg" style="text-align: center; padding: 10px">{{__t('Toàn bộ bệnh nhân được tiếp nhận thực tế sau 30/09/2022 sẽ sử dụng Báo cáo y tế ra viện mới mã A01_143_290922_VE !')}}</div>
      <div class="a4-page box" :id="printId || 'printMe'">
      <div class="text-center" style="text-align: center"><img class="top-logo" src="/static/Logo Vinmec International Hospitall 1.png" /></div>
      <h2 class="title-page text-center" style="text-align: center">BÁO CÁO Y TẾ RA VIỆN</h2>
      <h2 class="text-center" style="text-align: center;font-size: 14px;margin-top: 0;"><i>DISCHARGE MEDICAL REPORT</i></h2>
      <p><b>Khoa</b>/ <i>Department</i>: {{(data && data.Specialty) ? data.Specialty : ''}}</p>
      <p><b>Họ và tên người bệnh</b>/ <i>Patient’s name</i>: {{data.Fullname}}</p>
      <table width="100%">
        <tr>
          <td><p><b>Ngày sinh</b>/ <i>D.O.B</i>: {{data.DateOfBirth}}</p></td>
          <td width="40%"><p><b>Giới tính</b>/ <i>Gender</i>: {{data.Gender}}</p></td>
        </tr>
        <tr>
          <td><p><b>Quốc tịch</b>/ <i>Nationality</i>: {{data.Nationality}}</p></td>
          <td><p><b>Số đăng ký/ PID</b>: {{data.PID}}</p></td>
        </tr>
      </table>
      <p><b>Địa chỉ</b>/ <i>Address</i>: {{data.Address}}</p>
      <p v-if="CheckDate === 3"><b>Vào viện lúc</b>/ <i>Hospital Admission (Time, Date):</i> {{data.Admission}}</p>
      <p v-else><b>Vào viện lúc</b>/ <i>Admission (Time, Date):</i> {{data.Admission}}</p>
      <p v-if="CheckDate === 3"><b>Vào nội trú lúc</b>/ <i>Inpatient Admission (Time, Date):</i> {{data.AdmittedDateFirstIpd}}</p>
      <p v-if="CheckDate === 3"><b>Ra viện lúc</b>/ <i>Hospital Discharge (Time, Date):</i> {{data.Discharge}}</p>
      <p v-else><b>Ra viện lúc</b>/ <i>Discharge (Time, Date):</i> {{data.Discharge}}</p>
      <p><b>Lý do vào viện</b>/ <i>Chief complaint</i>: {{data.ChiefComplaint}}</p>
      <p><b>Quá trình bệnh lý và diễn biến lâm sàng</b>/ <i>Clinical evolution</i>:</p>
      <p>{{data.ClinicalEvolution}}</p>
      <p @dblclick="addBreakPage" class="hasBreakPage"><b>Kết quả cận lâm sàng</b>/ <i>Result of paraclinical tests</i>: {{data.ResultOfParaclinicalTests}}</p>
      <p @dblclick="addBreakPage" class="hasBreakPage" v-if="CheckDate === 1"><b>Chẩn đoán</b>/ <i>Diagnosis</i>: {{data.Diagnosis}} {{getICD10s(data.ICDDiagnosis, '', true)}}</p>
      <p @dblclick="addBreakPage" class="hasBreakPage" v-else><b>Chẩn đoán</b>/ <i>Diagnosis</i>: {{data.Diagnosis}}</p>
      <p @dblclick="addBreakPage" class="hasBreakPage" v-if="CheckDate === 2 || CheckDate === 3"><b>Mã bệnh</b>/ <i>ICD</i>: {{getICD10s2(data.ICDDiagnosis, '', false)}}</p>
      <p @dblclick="addBreakPage" class="hasBreakPage" v-if="CheckDate === 1"><b>Bệnh kèm theo</b>/ <i>Co morbidities</i>: {{data.CoMorbidities}} {{getICD10s(data.ICDCoMorbidities, '', true)}}</p>
      <p @dblclick="addBreakPage" class="hasBreakPage" v-else><b>Bệnh kèm theo</b>/ <i>Co morbidities</i>: {{data.CoMorbidities}}</p>
      <p @dblclick="addBreakPage" class="hasBreakPage" v-if="CheckDate === 2 || CheckDate === 3"><b>Mã bệnh</b>/ <i>ICD</i>: {{getICD10s2(data.ICDCoMorbidities, '', false)}}</p>
      <div>
        <div @dblclick="addBreakPage" class="hasBreakPage"><b>Phương pháp điều trị</b>/ <i>Treatments and procedures</i>:</div>
        <!-- <p v-if="dataParent" v-html="dataParent.TreatmentsAndProcedures"></p>
        <div style="display: flex">
          <span>/ </span>
          <p v-html="data.TreatmentsAndProcedures"></p>
        </div> -->
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
      </div>
      <p @dblclick="addBreakPage" class="hasBreakPage"><b>Các thuốc chính đã dùng</b>/ <i>Significant medications</i>: {{data.SignificantMedications}}</p>
      <p @dblclick="addBreakPage" class="hasBreakPage"><b>Tình trạng khi ra viện</b>/ <i>Condition at discharge</i>: {{data.ConditionAtDischarge}}</p>
      <p @dblclick="addBreakPage" class="hasBreakPage"><b>Kế hoạch điều trị tiếp theo</b>/ <i>Follow-up care plan</i>: {{data.FollowUpCarePlan}}</p>
      <p @dblclick="addBreakPage" class="hasBreakPage"><b>Ngày hẹn tái khám</b>/ <i>Date of next appointment: </i>{{(dataParent.DateOfNextAppointment && dataParent.DateOfNextAppointment !== 'Invalid date') ? dataParent.DateOfNextAppointment : ''}}</p>
      <p style="text-align: right;" class="hidden-only-form">{{DischargeTime}}</p>
      <table class="table hidden-only-form" style="width: 100%">
        <tr>
          <td width="40%" height="150" class="text-center" style="text-align: center" valign="top">
            <p><b>BÁC SĨ ĐIỀU TRỊ/ </b><i>PHYSICIAN-IN-CHARGE</i></p>
            <img style="opacity: 0" class="hidden-box" src="/static/140x80.png" />
            <p v-if="dataParent.PhysicianInCharge && dataParent.PhysicianInCharge.Fullname">{{dataParent.PhysicianInCharge.Fullname}}</p>
            <p v-else class="text-center" style="text-align: center"><b>Họ tên</b>/ <i>Full name</i>:.............................</p>
          </td>
          <td width="30%" height="150" class="text-center" style="text-align: center" valign="top">
            <p><b>TRƯỞNG KHOA/ </b><i>DEPT HEAD</i></p>
            <img style="opacity: 0" class="hidden-box" src="/static/140x80.png" />
            <p v-if="dataParent.DeptHead && dataParent.DeptHead.Fullname">{{dataParent.DeptHead.Fullname}}</p>
            <p v-else class="text-center" style="text-align: center"><b>Họ tên</b>/ <i>Full name</i>:.............................</p>
          </td>
          <td width="30%" height="150" class="text-center" style="text-align: center" valign="top">
            <p><b>GIÁM ĐỐC/ </b><i>DIRECTOR</i></p>
            <img style="opacity: 0" class="hidden-box" src="/static/140x80.png" />
            <p v-if="dataParent.Director && dataParent.Director.Fullname">{{dataParent.Director.Fullname}}</p>
            <p v-else class="text-center" style="text-align: center"><b>Họ tên</b>/ <i>Full name</i>:.............................</p>
          </td>
        </tr>
      </table>
      <div v-if="isTranView && !viewOnly" class="print-area">
        <button class="btn v-yellow-btn pull-right" @click="print()" v-shortkey="['ctrl', 'p']" @shortkey="print()"><i class="fa fa-print" aria-hidden="true"></i> In ngay</button>
      </div>
    </div>
  </div>
</template>
<script>
/* ============
 * DMR Page vi sao đặt tên là DMR hỏi dungnv53
 * ============
 *
 * The home index page.
 */
// import DischargeMedicalReport from '@/services/IPD/DischargeMedicalReport'
export default {
  /**
   * The name of the page.
   */
  name: 'DischargeMedicalReport-view',
  mixins: [],
  props: ['printId', 'isTranView', 'CheckDate', 'data', 'viewOnly', 'dataParent'],
  data () {
    return {
      Kind: null,
      loaded: false,
      popupTitle: '',
      user: {}
      // data: null
    }
  },
  /**
   * The components that the page can use.
   */
  components: {
  },
  mounted () {
  },
  computed: {
    DischargeTime: function () {
      if (this.data.Discharge) {
        return this.data.Discharge.replace(' ', ', Ngày/Date ').replace(':', ' Giờ/hour ')
      } else {
        return '......Giờ/hour ......, Ngày/Date ....../....../............'
      }
    },
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
    print () {
      this.$htmlToPaper(this.printId || 'printMe', true, this.getFormCode)
    }
  }
}
</script>
<style scoped>
.box-msg {
  padding-right: 161px;
}
</style>
