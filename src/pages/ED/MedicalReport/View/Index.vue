<template>
  <div>
    <div class="a4-page box" :id="printId || 'printMe'">
      <div class="text-center" style="text-align: center"><img class="top-logo" src="/static/Logo Vinmec International Hospitall 1.png" /></div>
      <h2 class="title-page text-center" style="text-align: center; font-size: 20px">BÁO CÁO Y TẾ / MEDICAL REPORT</h2>
      <p style="text-align: right"><b>{{data.Location}}</b>, <i>ngày {{data.Date}}</i></p>
      <p  ><b><i>Kính gửi các cơ quan hữu quan/ To whom it may concern</i></b>,</p>
      <p><b>Họ và tên người bệnh</b>/ <i>Patient’s name </i>: {{data.Fullname}}</p>
      <p><b>Ngày tháng năm sinh</b>/ <i>D.O.B</i>: {{data.DateOfBirth}}</p>
      <p><b>Số đăng ký</b>/ <i>PID</i>: {{data.PID}}</p>
      <!-- <p><b>Vào khoa cấp cứu lúc</b>/ <i>Admission at (Time, Date)</i>: {{data.AdmittedDate}}</p>
      <p><b>Nhập viện lúc</b>/ <i>Discharge at (Time, Date):</i> {{data.DischargeDate}}</p> -->
      <p>Người bệnh có tên trên đây có đến khám/điều trị tại Bệnh viện đa khoa quốc tế Vinmec từ ngày/ <i>The above patient visited and received treatment at Vinmec International Hospital on</i> {{data.AdmittedDate}} tới ngày/to  {{data.DischargeDate}}</p>
      <p>Với những thông tin sau/ <i>With the following information:</i> </p>
      <p @dblclick="addBreakPage" class="hasBreakPage"><b>Lý do vào viện</b>/ <i>Chief complaint</i>: {{data.ChiefComplain}}</p>
      <div>
        <b @dblclick="addBreakPage" class="hasBreakPage"  >Quá trình bệnh lý và diễn biến lâm sàng</b>/ <i>Clinical evolution</i>:
        <p style="margin: 0; ">Bệnh sử/ History: {{data.History}}</p>
        <p style="margin: 0; ">Thăm khám/ Assessment:</p>
        <div style="padding-left: 5px;">
          <p style="margin: 7px 0;font-size: 14px;line-height: 1.5;" :data="item" :key="index" v-for="(item ,index) in data.ClinicalExaminationAndFindings">+ <span>{{item.ViName}}/<i> {{item.EnName}}: </i>{{item.Value}}</span></p>
        </div>
      </div>
      <p @dblclick="addBreakPage" class="hasBreakPage"  ><b>Kết quả cận lâm sàng</b>/ <i>Result of paraclinical tests</i>: {{'\n'}}{{data.ResultOfParaclinicalTests}}</p>
      <!-- <p @dblclick="addBreakPage" class="hasBreakPage"  ><b>Chẩn đoán</b>/ <i>Diagnosis</i>: {{fomartIcd(data.Diagnosis, data.ICD, '', data.ICDOption)}}</p> -->
      <p @dblclick="addBreakPage" class="hasBreakPage"  ><b>Chẩn đoán</b>/ <i>Diagnosis</i>: {{data.Diagnosis}}</p>
      <p @dblclick="addBreakPage" class="hasBreakPage"  ><b>Phương pháp điều trị</b>/ <i>Treatment and procedures</i>: {{data.TreatmentAndProcedures}}</p>
      <p @dblclick="addBreakPage" class="hasBreakPage"  ><b>Các thuốc chính đã dùng</b>/ <i>Significant medications</i>: {{data.SignificantMedications}}</p>
      <p @dblclick="addBreakPage" class="hasBreakPage"  ><b>Tình trạng bệnh nhân hiện tại</b>/ <i>Current status</i>: {{data.CurrentStatus}}</p>
      <div>
        <p @dblclick="addBreakPage" class="hasBreakPage"  ><b>Kế hoạch điều trị và chăm sóc tiếp theo</b>/ <i>Follow-up care plan</i>: {{data.PlanOfCare}}</p>
        <p v-if="data.DoctorRecommendations"  ><b>Lời dặn của thầy thuốc</b>/ <i>Doctor recommendations:</i> {{data.DoctorRecommendations ? ('\n' + data.DoctorRecommendations) : ''}}</p>
        <p></p>
      </div>
      <table class="table" style="width: 100%">
        <tr>
          <th width="50%"></th>
          <th class="text-center" style="text-align: center; font-size: 14px;">
            <p style="text-align: center; font-weight: normal;"><b>Ngày</b>/ <i>Date: </i>{{MEDICALREPORT_PHY_TIME | formatDateWithoutSecon}}</p>
            <p style="text-align: center; margin-bottom: 0;">Bác sỹ/ <i>Physician</i></p>
            <p style="text-align: center; font-weight: normal;">(Ký, ghi rõ họ tên/ <i>Sign, name</i>)</p>
            <p v-if="MEDICALREPORT_PHY" style="text-align: center; margin-top: 60px; margin-bottom: 0;">{{MEDICALREPORT_PHY}}</p>
          </th>
        </tr>
        <!-- <tr>
          <td width="50%" class="text-center" style="text-align: center"></td>
          <td class="text-center" style="text-align: center"></td>
        </tr> -->
      </table>
      <div v-if="isTranView" class="print-area">
        <button class="btn v-yellow-btn pull-right" @click="print()" v-shortkey="['ctrl', 'p']" @shortkey="print()"><i class="fa fa-print" aria-hidden="true"></i> {{__t('In')}}</button>
      </div>
    </div>
    <div v-if="dataParent.Version">
      <Confirm
        class="mt-10 d-none"
        :MasterDataCode="'MEDICALREPORTCONFIRM'"
        :FormCode="'A01_144_050919_VE'"
        :VisitId="_VisitId"
        :FormId="dataParent.Id"
        :ReadOnly="true"
        :Bilingual="true"
        @ResponseData="getListConfirm"
      />
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
  name: 'KLMViewTranslate',
  props: ['data', 'dataParent', 'isTranView', 'printId', 'viewOnly'],
  mixins: [],
  data () {
    return {
      MEDICALREPORT_PHY: '',
      MEDICALREPORT_PHY_TIME: ''
    }
  },
  /**
   * The components that the page can use.
   */
  components: {
    Confirm
  },
  mounted () {
    if (this.data.Assessment && typeof this.data.Assessment === 'string') {
      this.data.Assessment = this.JSONParse(this.data.Assessment) || []
    }
  },
  computed: {
  },
  methods: {
    getListConfirm (val) {
      val.map(item => {
        if (item.ConfirmType === 'MEDICALREPORT_PHY') {
          this.MEDICALREPORT_PHY = item.Fullname
          this.MEDICALREPORT_PHY_TIME = moment(item.ConfirmAt).format('DD/MM/YYYY')
        }
      })
    },
    print () {
      this.$htmlToPaperKLM(this.printId || 'printMe', true, 'A01_144_050919_VE', this.getHotlineEd())
    }
  }
}
</script>
<style scoped>
  #printMe > p, i, span {
    font-size: 14px !important;
  }
</style>
