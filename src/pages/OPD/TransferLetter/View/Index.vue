<template>
  <div class="main-content" id="di0-page">
    <div class="a4-page box" :id="printId || 'printMeTranslate'">
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
            <p class="font13 ptag" style="text-align: center">SỞ Y TẾ/ <i>DEPARTMENT OF HEALTH</i>: {{data.LocationUnit}} {{data.Province}}</p>
            <p class="font13 ptag" style="text-align: center">Bệnh viện/ <i>Hospital</i>: VINMEC {{data.Site}}</p>
            <p class="font13 ptag" style="text-align: center">Số/ <i>Number</i> .........../20............/GCT</p>
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
      <div class="text-center font14 font-bold">Kính gửi/ <i>Dear</i>: {{dataParent ? dataParent.Hospital : '. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .'}}</div>
      <br/>
      <div class="font15">
        <p>BỆNH VIỆN ĐA KHOA QUỐC TẾ VINMEC/ <i>VINMEC INTERNATIONAL GENERAL HOSPITAL</i>: {{data.Site}} trân trọng giới thiệu/ <i>presents</i>: </p>
        <p>- Họ và tên người bệnh/ <i>Patient’s name</i>: {{data.Fullname}} <span class="tab404">Giới tính/ <i>Gender</i>: {{data.Gender || '. . . . . . . . . . . . . . '}}</span> <span class="tab404">Tuổi/ <i>Age</i>: {{$options.filters.formatAge(dataParent ? dataParent.AgeFormated : '') || '. . . . . . . . . . . . . . '}}</span></p>
        <p>- Địa chỉ/ <i>Address</i>: {{data.Address || '. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . '}}</p>
        <p>- Dân tộc/ <i>Ethnic</i>: {{dataParent ? dataParent.Fork : '. . . . . . . . . . . . . . . . . . . . . . . . . . . . '}} <span class="tab404">Quốc tịch/ <i>Nationality</i>: {{data.Nationality || '. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . '}}</span></p>
        <p>- Nghề nghiệp/ <i>Occupation</i>: {{data.Job || '. . . . . . . . . . . . . . . . . . . . . . . .'}} <span class="tab404">Nơi làm việc/ <i>Working place</i>: {{data.WorkPlace || '. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .'}}</span></p>
        <template v-if="dataParent.HealthInsuranceNumber">
          <p>- Số thẻ/ <i>HI no.</i>: {{dataParent.HealthInsuranceNumber}}</p>
        </template>
        <template v-else>
          <p>- Số thẻ/ <i>HI no.</i>:</p>
        </template>
        <p class="no-wrap-hidden">- Hạn sử dụng/ <i>Health of issurance valid to date</i>: {{dataParent.ExpireHealthInsuranceDate ? dataParent.ExpireHealthInsuranceDate : '. . . . . . . . . . . . . . . . . . . . . . . .  . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .'}}</p>
        <p>Đã được khám bệnh/ điều trị/ <i>Examined/ treated</i>:</p>
        <p>+  Tại: BVĐKQT VINMEC {{dataParent.Site ? dataParent.Site : data.Site}} (Tuyến {{dataParent.Level ? dataParent.Level : data.Level}})/ <i>At VINMEC INTERNATIONAL GENERAL HOSPITAL</i> {{dataParent.Site ? dataParent.Site : data.Site}} (Level {{dataParent.Level ? dataParent.Level : data.Level}}) từ ngày/ <i>from</i> {{dataParent ? dataParent.StartDate : ''}} đến ngày/ <i>to</i> {{dataParent ? dataParent.EndDate : '. . . . . . . . . . . . . . . . . . . . .'}}</p>
        <p @dblclick="addBreakPage" class="hasBreakPage font-bold">TÓM TẮT BỆNH ÁN/ <i>SUMMARY OF MEDICAL RECORD</i></p>
        <!-- <p @dblclick="addBreakPage" class="hasBreakPage">- Dấu hiệu lâm sàng: {{data.ClinicalExaminationAndFindings}}</p> -->
        <div v-if="data.IsTelehealth">
          <p @dblclick="addBreakPage" class="hasBreakPage" style="margin: 7px 0;font-size: 15px;line-height: 1.5;">- Triệu chứng cơ năng: {{data.ClinicalExaminationAndFindings}}</p>
        </div>
        <div v-else>
        <p @dblclick="addBreakPage" class="hasBreakPage" style="margin: 7px 0;font-size: 15px;line-height: 1.5;">- Dấu hiệu lâm sàng/ <i>Clinical signs</i>:</p>
        <div style="padding-left: 5px;">
          <p style="margin: 7px 0;font-size: 15px;line-height: 1.5;" v-if="item.Code !== 'OPDOENTUOI519' && item.Code !== 'OPDOENTUOI19' && item.Code !== 'OPDOENTUOI5'" :data="item" :key="index" v-for="(item ,index) in data.ClinicalExaminationAndFindings">+ {{item.ViName}}/ <i>{{item.EnName}}</i>: {{item.Value}}</p>
        </div>
        </div>
        <p @dblclick="addBreakPage" class="hasBreakPage">- Kết quả xét nghiệm, cận lâm sàng/ <i>Lab test and paraclinical test result</i>: {{data.PrincipalTest ? ('\n' + data.PrincipalTest) : '. . . . . . . . . . . . . . . . . . . . . . . .  . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .  . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .  . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .  . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .'}}</p>
        <p @dblclick="addBreakPage" class="hasBreakPage">- Chẩn đoán/ <i>Diagnosis</i>: {{data.Diagnosis || '. . . . . . . . . . . . . . . . . . . . . . . .  . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .  . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .  . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .  . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .  . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .'}}</p>
        <p @dblclick="addBreakPage" class="hasBreakPage">- Phương pháp, thủ thuật, kỹ thuật, thuốc đã sử dụng trong điều trị/ <i>Method, procedure, technique, medication applied during treatment</i>: {{data.Method || '. . . . . . . . . . . . . . . . . . . . . . . .  . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .  . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .  . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .  . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .'}}</p>
        <p @dblclick="addBreakPage" class="hasBreakPage">- Tình trạng người bệnh lúc chuyển tuyến/ <i>Patient’s condition upon transfer</i>: {{data.PatientStatus || '. . . . . . . . . . . . . . . . . . . . . . . .  . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .  . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .  . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .  . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .'}}</p>
        <p @dblclick="addBreakPage" class="hasBreakPage">- Lý do chuyển tuyến/ <i>Reason for transfer</i>: Khoanh tròn vào lý do chuyển tuyến phù hợp sau đây/ <i>Circle the appropriate reason below</i>:</p>
        <p :data="item" :key="index" v-for="(item, index) in dataParent.ReasonForTransfer">
          <span v-if="index === 0" class="t-boder" :class="{'t-boder-none': item.Value === 'False' || item.Value === null || item.Value === ''}">{{index + 1}}</span> <span v-if="index === 0">{{item.ViName}}/ <i>Eligible for transfer</i></span>
          <span v-if="index === 1" class="t-boder" :class="{'t-boder-none': item.Value === 'False' || item.Value === null || item.Value === ''}">{{index + 1}}</span> <span v-if="index === 1">{{item.ViName}}/ <i>As requested by patient or patient’s legal representative</i></span>
        </p>
        <!-- <div style="page-break-after: always;"></div> -->
        <p @dblclick="addBreakPage" class="hasBreakPage">- Hướng điều trị/ <i>Treatment plan</i>: {{data.TreatmentPlans || '. . . . . . . . . . . . . . . . . . . . . . . .  . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .  . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .  . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .  . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .'}}</p>
        <p @dblclick="addBreakPage" class="hasBreakPage">- Chuyển tuyến hồi/ <i>Transfer Date</i>: <template v-if="data.Date">{{data.Date | bilingualFormatDate}}</template><template v-else>. . . . . . . . . giờ . . . . . . . . . phút, ngày . . . . . . . . . tháng . . . . . . . . . năm . . . . . . . . .</template></p>
        <p @dblclick="addBreakPage" class="hasBreakPage">- Phương tiện vận chuyển/ <i>Transportation method</i>: {{data.TransportationMethod || '. . . . . . . . . . . . . . . . . . . . . . . .  . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .  . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .  . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .  . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .'}}</p>
        <p @dblclick="addBreakPage" class="hasBreakPage">- Họ tên, chức danh, trình độ chuyên môn của người hộ tống/ <i>Name, title, professional qualification of escort</i>: {{data.Escort || '. . . . . . . . . . . . . . . . . . . . . . . .  . . . . . . . . . . . . . . . .'}}</p>
      </div>
      <br/>
      <table width="100%">
        <tr>
          <td></td>
          <td width="60%" style="text-align: center;">
            <div style="text-align: center;" class="font15">{{dataParent.Date | bilingualFormatDateTimeTwo}}</div>
          </td>
        </tr>
        <tr>
          <td style="text-align: center;">
            <p v-if="TRANSFERLETTER_TIME_PIC" style="text-align: center;">{{TRANSFERLETTER_TIME_PIC}}</p>
            <p style="text-align: center;" class="font-bold font15">Y, BÁC SĨ KHÁM, ĐIỀU TRỊ/ <i>PHYSICIAN-IN-CHARGE</i></p>
          </td>
          <td style="text-align: center;">
            <p v-if="TRANSFERLETTER_TIME_TAU" style="text-align: center;">{{TRANSFERLETTER_TIME_TAU}}</p>
            <p style="text-align: center;" class="font-bold font15">NGƯỜI CÓ THẨM QUYỀN CHUYỂN TUYẾN/ <i>TRANSFER AUTHORITY</i></p>
          </td>
        </tr>
        <tr>
          <td valign="top">
            <p style="text-align: center;" class="font15">(Ký tên, đóng dấu/ <i>Sign, stamp</i>)</p>
            <img style="opacity: 0" class="hidden-box" src="/static/140x80.png" />
            <p v-if="TRANSFERLETTER_PIC && dataParent.Version >= 10" style="text-align: center;">{{TRANSFERLETTER_PIC}}</p>
            <p v-else-if="dataParent && dataParent.Version < 10" style="text-align: center;">{{(dataParent.Physician)}}</p>
          </td>
          <td valign="top">
            <p style="text-align: center;" class="font15">(Ký tên, đóng dấu/ <i>Sign, stamp</i>)</p>
            <img style="opacity: 0" class="hidden-box" src="/static/140x80.png" />
            <p v-if="TRANSFERLETTER_TAU" style="text-align: center;">{{TRANSFERLETTER_TAU}}</p>
          </td>
        </tr>
      </table>
    </div>
    <p class="mt-10">A01_167_180220_VE</p>
    <div v-if="dataParent && dataParent.Version >= 10" class="a4-page no-style">
      <Confirm
        class="mt-10"
        style="display: none;"
        :MasterDataCode="'TRANSFERLETTERCONFIRM'"
        :FormCode="`A01_167_180220_VE`"
        :VisitId="_VisitId"
        :FormId="dataParent.Id"
        :Bilingual="true"
        @ResponseData="getListConfirm"
      />
    </div>
    <div v-if="isTranView" class="print-area">
      <button class="btn v-yellow-btn pull-right" @click="print()" v-shortkey="['ctrl', 'p']" @shortkey="print()"><i class="fa fa-print" aria-hidden="true"></i> In ngay</button>
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
  name: 'OPDTranferLetter-View',
  props: ['viewOnly', 'VisitId', 'data', 'isTranView', 'printId', 'site', 'Status', 'PkntVersion', 'dataParent'],
  mixins: [],
  data () {
    return {
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
    Confirm
  },
  mounted () {
  },
  computed: {
    HealthInsuranceNumber () {
      if (this.dataParent.HealthInsuranceNumber) {
        var arr = this.dataParent.HealthInsuranceNumber.split(' ')
        return arr.length === 4 ? arr : null
      }
      return null
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
    print () {
      this.$htmlToPaper(this.printId || 'printMeTranslate', false, 'A01_167_180220_VE')
    },
    OPDOENBMIlabel () {
      if (this.data.IsTelehealth) {
        return
      }
      var y1 = this.data.ClinicalExaminationAndFindings.find(e => e.Code === 'OPDOENTUOI519')
      var OPDOENBMI = this.data.ClinicalExaminationAndFindings.find(e => e.Code === 'OPDOENBMIANS')
      if (y1 && OPDOENBMI) {
        var y2 = this.data.ClinicalExaminationAndFindings.find(e => e.Code === 'OPDOENTUOI19')
        var y3 = this.data.ClinicalExaminationAndFindings.find(e => e.Code === 'OPDOENTUOI5')
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
    changeData () {
      if (this.data.PkntVersion === 2 && this.data.ClinicalExaminationAndFindings && this.data.ClinicalExaminationAndFindings.length) {
        let str = JSON.stringify(this.data.ClinicalExaminationAndFindings)
        str = this.dichTextVer2Pknt(str)
        this.data.ClinicalExaminationAndFindings = this.JSONParse(str || [], true)
      }
    }
  }
}
</script>
