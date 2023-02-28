<template>
  <div class="a4-page box has-translation" :id="printId || 'printMe'" v-if="tmp">
    <div class="text-center" style="text-align: center"><img class="top-logo" src="/static/Logo Vinmec International Hospitall 1.png" /></div>
    <br/>
    <h2 class="title-page text-center" style="text-align: center; font-size: 20px;margin: 5px 0;">BÁO CÁO Y TẾ / MEDICAL REPORT</h2>
    <h3 class="title-page text-center" style="text-align: center; font-size: 16px;margin: 5px 0;">BỆNH VIỆN ĐA KHOA QUỐC TẾ VINMEC CHỨNG NHẬN:</h3>
    <h3 class="title-page text-center" style="text-align: center; font-size: 16px;font-weight: normal;margin: 5px 0;"><i>VINMEC INTERNATIONAL HOSPITAL CERTIFIES THAT:</i></h3>
    <div>
      <p><br/></p>
    </div>
    <div>
      <p style="margin: 7px 0;font-size: 14px;line-height: 1.5;"><b>Ông (Bà)</b>/ <i>Mr (Ms): </i> {{tmp.Fullname}} <span style="float: right"><b>Số hồ sơ</b>/ <i>PID: </i> {{tmp.PID}}</span></p>
    </div>
    <div>
      <p style="margin: 7px 0;font-size: 14px;line-height: 1.5;"><b>Giới tính</b>/ <i>Gender: </i> {{tmp.Gender}}</p>
    </div>
    <div>
      <p style="margin: 7px 0;font-size: 14px;line-height: 1.5;"><b>Ngày sinh</b>/ <i>D.O.B: </i> {{tmp.DateOfBirth}}</p>
    </div>
    <div>
      <p style="margin: 7px 0;font-size: 14px;line-height: 1.5;"><b>Địa chỉ</b>/ <i>Address: </i> {{tmp.Address}}</p>
    </div>
    <div>
      <p style="margin: 7px 0;font-size: 14px;line-height: 1.5;"><b>Đã đến khám và điều trị tại bệnh viện của chúng tôi, với những thông tin sau</b>/ <i>Visited and received treatment at our hospital, with the following information: </i></p>
    </div>
    <div>
      <p @dblclick="addBreakPage" class="hasBreakPage" style="margin: 7px 0;font-size: 14px;line-height: 1.5;"><b>Ngày khám bệnh</b>/ <i>Date of visit: </i>{{tmp.DateOfVisit}}</p>
    </div>
    <div>
      <p @dblclick="addBreakPage" class="hasBreakPage" style="margin: 7px 0;font-size: 14px;line-height: 1.5;"><b>Lý do khám bệnh</b>/ <i>Reason for visit: </i>{{tmp.ReasonOfVisit}}</p>
    </div>
    <div>
      <p @dblclick="addBreakPage" class="hasBreakPage" style="margin: 7px 0;font-size: 14px;line-height: 1.5;"><b>Bệnh sử</b>/ <i>History of present illness: </i>{{tmp.HistoryOfPresentIllness}}</p>
    </div>
    <div v-if="tmp.IsTelehealth">
      <p @dblclick="addBreakPage" class="hasBreakPage" style="margin: 7px 0;font-size: 14px;line-height: 1.5;"><b>Triệu chứng cơ năng</b>/ <i>Symptoms described by patient: </i>{{tmp.ClinicalExaminationAndFindings}}</p>
    </div>
    <div v-else-if="tmp.IsEoc">
      <p v-if="tmp.Version !== 2" @dblclick="addBreakPage" class="hasBreakPage" style="margin: 7px 0;font-size: 14px;line-height: 1.5;"><b>Khám lâm sàng</b>/ <i>Clinical examination and findings: </i>{{tmp.ClinicalExaminationAndFindings}}</p>
      <div v-if="tmp.Version === 2">
        <p @dblclick="addBreakPage" class="hasBreakPage" style="margin: 7px 0;font-size: 14px;line-height: 1.5;"><b>Khám lâm sàng</b>/ <i>Clinical examination and findings: </i></p>
        <div style="padding-left: 5px;">
          <p v-if="tmp.DataOenVersion2[2]" style="margin: 7px 0;font-size: 14px;line-height: 1.5;">+ <span v-if="tmp.DataOenVersion2[2]" class="font15">Khám toàn thân/<i> Body physical examination: </i>{{tmp.DataOenVersion2[2].Value}}</span></p>
          <p v-if="tmp.DataOenVersion2[0]" style="margin: 7px 0;font-size: 14px;line-height: 1.5;">+ <span v-if="tmp.DataOenVersion2[0]" class="font15">Khám chuyên khoa/<i> Subspecialty examination: </i>{{tmp.DataOenVersion2[0].Value}}</span></p>
          <p v-if="tmp.DataOenVersion2[1]" style="margin: 7px 0;font-size: 14px;line-height: 1.5;">+ <span v-if="tmp.DataOenVersion2[1]" class="font15">Khám tim mạch, hô hấp/<i> Respiratory and cardiac function: </i>{{tmp.DataOenVersion2[1].Value}}</span></p>
          <p v-if="tmp.DataOenVersion2[3]" style="margin: 7px 0;font-size: 14px;line-height: 1.5;">+ <span v-if="tmp.DataOenVersion2[3]" class="font15">Khám các bộ phận khác (nếu có)/<i> Examination of other related areas (if any): </i>{{tmp.DataOenVersion2[3].Value}}</span></p>
        </div>
      </div>
    </div>
    <div v-else>
      <p @dblclick="addBreakPage" class="hasBreakPage" style="margin: 7px 0;font-size: 14px;line-height: 1.5;"><b>Khám lâm sàng</b>/ <i>Clinical examination and findings: </i></p>
      <div style="padding-left: 5px;">
        <p style="margin: 7px 0;font-size: 14px;line-height: 1.5;" :data="item" :key="index" v-for="(item ,index) in tmp.ClinicalExaminationAndFindings" v-if="item.Code !== 'OPDOENTUOI519' && item.Code !== 'OPDOENTUOI19' && item.Code !== 'OPDOENTUOI5'">+ <span class="font15">{{item.ViName}}/<i> {{item.EnName}}: </i>{{item.Value}}</span></p>
      </div>
    </div>
    <div>
      <p @dblclick="addBreakPage" class="hasBreakPage" style="margin: 7px 0;font-size: 14px;line-height: 1.5;"><b>Các xét nghiệm, thăm dò chính</b>/ <i>Principal tests: </i>{{tmp.PrincipalTest ? ('\n' + tmp.PrincipalTest) : ''}}</p>
    </div>
    <div>
      <p @dblclick="addBreakPage" class="hasBreakPage" style="margin: 7px 0;font-size: 14px;line-height: 1.5;"><b>Chẩn đoán</b>/ <i>Diagnosis: </i>{{tmp.Diagnosis}}</p>
    </div>
    <div>
      <p @dblclick="addBreakPage" class="hasBreakPage" style="margin: 7px 0;font-size: 14px;line-height: 1.5;"><b>Chẩn đoán ICD</b>/ <i>ICD Diagnosis: </i>{{getICD10s(data.ICDDiagnosis, data.ICDOption)}}</p>
    </div>
    <div>
      <p @dblclick="addBreakPage" class="hasBreakPage" style="margin: 7px 0;font-size: 14px;line-height: 1.5;"><b>Hướng điều trị</b>/ <i>Treatment plans: </i>{{data.TreatmentPlans ? ('\n' + data.TreatmentPlans) : ''}}</p>
    </div>
    <div>
      <p @dblclick="addBreakPage" class="hasBreakPage" style="margin: 7px 0;font-size: 14px;line-height: 1.5;"><b>Dặn dò</b>/ <i>Recommendation & Follow-up: </i>{{data.RecommendtionAndFollowUp ? ('\n' + data.RecommendtionAndFollowUp) : ''}}</p>
    </div>
    <div>
      <p @dblclick="addBreakPage" class="hasBreakPage" style="margin: 7px 0;font-size: 14px;line-height: 1.5;"><b>Ngày hẹn tái khám</b>/ <i>Date of next appointment: </i>{{(data.DateOfNextAppointment)}}</p>
    </div>
    <div v-if="checkHide()">
      <p @dblclick="addBreakPage" class="hasBreakPage" style="margin: 7px 0;font-size: 14px;line-height: 1.5;"><b>Ngày hẹn trả KQ</b>/ <i>The return date results: </i>{{(data.AppointmentDateResult) | formatDateWithoutSecon}}</p>
    </div>
    <div>
    </div>
    <table width="100%">
      <tr class="only-print-page">
        <td></td>
        <td width="50%" style="text-align: center;">
          <p v-if="MEDICALREPORT_PHY_TIME" style="text-align: center; font-size: 14px;"><b>Ngày</b>/ <i>Date: </i>{{MEDICALREPORT_PHY_TIME}}</p>
          <p v-else style="text-align: center; font-size: 14px;"><b>Ngày</b>/ <i>Date: </i>{{(data.Date)}}</p>
          <p style="text-align: center; margin-bottom: 0;">Bác sỹ/ <i>Physician</i></p>
          <p style="text-align: center; font-weight: normal;">(Ký, ghi rõ họ tên/ <i>Sign, name</i>)</p>
          <img style="opacity: 0" class="hidden-box" src="/static/140x80.png" />
          <p style="text-align: center; font-size: 14px;">{{MEDICALREPORT_PHY || ''}}</p>
        </td>
      </tr>
    </table>
    <div v-if="isTranView" class="print-area">
      <button class="btn v-yellow-btn pull-right" @click="print()" v-shortkey="['ctrl', 'p']" @shortkey="print()"><i class="fa fa-print" aria-hidden="true"></i> In ngay</button>
    </div>
    <div v-if="data.Version">
      <Confirm
        class="mt-10 only-web-page"
        :MasterDataCode="'MEDICALREPORTCONFIRM'"
        :FormCode="`A01_198_100120_VE`"
        :VisitId="_VisitId"
        :FormId="data.Id"
        :ReadOnly="viewOnly || IsLocked"
        :Bilingual="true"
        @ResponseData="getListConfirm"
      />
    </div>
  </div>
</template>
<script>
/* ============
 * The home index page.
 */
import Confirm from '@/components/Form/Confirm3'
import moment from 'moment'
export default {
  /**
   * The name of the page.
   */
  name: 'OPD-MedicalReportView',
  props: ['data', 'isTranView', 'printId', 'site', 'Status', 'PkntVersion', 'viewOnly', 'VisitType', 'IsLocked'],
  data () {
    return {
      tmp: null,
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
    this.tmp = this.cloneObj(this.data)
    if (this.isJson(this.tmp.ClinicalExaminationAndFindings)) {
      this.tmp.ClinicalExaminationAndFindings = this.JSONParse(this.tmp.ClinicalExaminationAndFindings) || []
    }
    if (this.tmp.IsTelehealth) {
      this.tmp.ClinicalExaminationAndFindings = this.tmp.ClinicalExaminationAndFindings[0].Value
    }
    if (this.tmp.IsEoc) {
      this.tmp.ClinicalExaminationAndFindings = this.tmp.ClinicalExaminationAndFindings
    }
    this.changeData()
    this.OPDOENBMIlabel()
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
    OPDOENBMIlabel () {
      if (this.tmp.IsTelehealth || this.tmp.IsEoc) {
        return
      }
      var y1 = this.tmp.ClinicalExaminationAndFindings.find(e => e.Code === 'OPDOENTUOI519')
      var OPDOENBMI = this.tmp.ClinicalExaminationAndFindings.find(e => e.Code === 'OPDOENBMIANS')
      if (y1 && OPDOENBMI) {
        var y2 = this.tmp.ClinicalExaminationAndFindings.find(e => e.Code === 'OPDOENTUOI19')
        var y3 = this.tmp.ClinicalExaminationAndFindings.find(e => e.Code === 'OPDOENTUOI5')
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
    },
    print () {
      this.$htmlToPaper(this.printId || 'printMe', false, 'A01_198_100120_VE')
    },
    checkHide () {
      let check = true
      if (this.site &&
        this.site === 'OPD' &&
        this.Status &&
        this.Status.Code !== 'OPDWR') {
        check = false
      }
      return check
    },
    changeData () {
      if (this.tmp && (this.tmp.PkntVersion === 2 || this.PkntVersion === 2) && this.tmp.ClinicalExaminationAndFindings && this.tmp.ClinicalExaminationAndFindings.length) {
        let str = JSON.stringify(this.tmp.ClinicalExaminationAndFindings)
        str = this.dichTextVer2Pknt(str)
        this.tmp.ClinicalExaminationAndFindings = this.JSONParse(str || [], true)
      }
    }
  }
}
</script>
<style scoped>
  #printMe > p, i, span {
    font-size: 14px !important;
  }
</style>
