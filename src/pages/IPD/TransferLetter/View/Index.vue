<template>
  <div class="main-content" id="di0-page">
    <div class="a4-page box" :id="printId || 'printMeTranslate'" v-if="data">
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
            <p class="font13 ptag" style="text-align: center">Bệnh viện/ <i>Hospital</i>: VINMEC {{data.Site}}</p>
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
      <div class="text-center font14 font-bold">Kính gửi/ <i>Dear</i>: {{dataParent ? dataParent.ReceivingHospital: data.ReceivingHospital}}</div>
      <br/>
      <div class="font15">
        <p>BỆNH VIỆN ĐA KHOA QUỐC TẾ VINMEC/ <i>VINMEC INTERNATIONAL GENERAL HOSPITAL</i>: {{data.Site}} trân trọng giới thiệu/ <i>presents</i>: </p>
        <p>- Họ và tên người bệnh/ <i>Patient’s name</i>: {{data.Fullname}} <span class="tab404">Giới tính/ <i>Gender</i>: {{data.Gender}}</span> <span class="tab404">Tuổi/ <i>Age</i>: {{data.AgeFormated | formatAge}}</span></p>
        <p>- Địa chỉ/ <i>Address</i>: {{data.Address}}</p>
        <p>- Dân tộc/ <i>Ethnic</i>: {{data.Ethnic}} <span class="tab404">Quốc tịch/ <i>Nationality</i>: {{data.Nationality}}</span></p>
        <p>- Nghề nghiệp/ <i>Occupation</i>: {{data.MOHJob}} <span class="tab404">Nơi làm việc/ <i>Working place</i>: {{data.WorkPlace}}</span></p>
        <template v-if="dataParent.HealthInsuranceNumber">
          <p>- Số thẻ/ <i>HI no.</i>: {{dataParent.HealthInsuranceNumber}}</p>
        </template>
        <template v-else>
          <p>- Số thẻ/ <i>HI no.</i>:</p>
        </template>
        <p class="no-wrap-hidden">- Hạn sử dụng/ <i>Health of issurance valid to date</i>: {{dataParent ? dataParent.ExpireHealthInsuranceDate: data.ExpireHealthInsuranceDate}}</p>
        <p>Đã được khám bệnh/ điều trị/ <i>Examined/ treated</i>:</p>
        <p>+  Tại: BVĐKQT VINMEC {{dataParent.Site ? dataParent.Site : data.Site}} (Tuyến {{dataParent.Level ? dataParent.Level : data.Level}})/ <i>At VINMEC INTERNATIONAL GENERAL HOSPITAL</i> {{dataParent.Site ? dataParent.Site : data.Site}} (Level {{dataParent.Level ? dataParent.Level : data.Level}}) từ ngày/ <i>from</i> {{dataParent.Admission ? dataParent.Admission : data.Admission}} đến ngày/ <i>to</i> {{dataParent.Discharge ? dataParent.Discharge : '. . . . . . . . . . . . . . . . . . . . .'}}</p>
        <p @dblclick="addBreakPage" class="hasBreakPage font-bold">TÓM TẮT BỆNH ÁN/ <i>SUMMARY OF MEDICAL RECORD</i></p>
        <p @dblclick="addBreakPage" class="hasBreakPage">- Dấu hiệu lâm sàng/ <i>Clinical signs</i>:</p>
        <div style="padding-left: 5px;">
          <p v-if="data.MedicalSign" v-html="data.MedicalSign"></p>
        </div>
        <p @dblclick="addBreakPage" class="hasBreakPage">- Kết quả xét nghiệm, cận lâm sàng/ <i>Lab test and paraclinical test result</i>: {{data.ResultOfParaclinicalTests}}</p>
        <p @dblclick="addBreakPage" class="hasBreakPage">- Chẩn đoán/ <i>Diagnosis</i>: {{data.Diagnosis}}</p>
        <div @dblclick="addBreakPage" class="hasBreakPage">- Phương pháp, thủ thuật, kỹ thuật, thuốc đã sử dụng trong điều trị/ <i>Method, procedure, technique, medication applied during treatment</i>:</div>
          <p v-if="data.Method" v-html="data.Method" :style="data.DrugsUsed ? 'margin-bottom: 0px!important;' : ''"></p>
        <p @dblclick="addBreakPage" class="hasBreakPage">- Tình trạng người bệnh lúc chuyển tuyến/ <i>Patient’s condition upon transfer</i>: {{data.ConditionAtDischarge}}</p>
        <p @dblclick="addBreakPage" class="hasBreakPage">- Lý do chuyển tuyến/ <i>Reason for transfer</i>: Khoanh tròn vào lý do chuyển tuyến phù hợp sau đây/ <i>Circle the appropriate reason below</i>:</p>
        <p v-if="dataOrigin.ReasonForTransfer" :data="item" :key="index" v-for="(item, index) in dataOrigin.ReasonForTransfer">
          <span v-if="index === 0" class="t-boder" :class="{'t-boder-none': item.Value === 'False' || item.Value === null || item.Value === ''}">{{index + 1}}</span> <span v-if="index === 0">{{item.ViName}}/ <i>Eligible for transfer</i></span>
          <span v-if="index === 1" class="t-boder" :class="{'t-boder-none': item.Value === 'False' || item.Value === null || item.Value === ''}">{{index + 1}}</span> <span v-if="index === 1">{{item.ViName}}/ <i>As requested by patient or patient’s legal representative</i></span>
        </p>
        <p @dblclick="addBreakPage" class="hasBreakPage">- Hướng điều trị/ <i>Treatment plan</i>: {{data.FollowUpCarePlan}}</p>
        <p @dblclick="addBreakPage" class="hasBreakPage">- Chuyển tuyến hồi/ <i>Transfer Date</i>: {{dataOrigin.TimeOfTransfer | bilingualFormatDateTime}}</p>
        <p @dblclick="addBreakPage" class="hasBreakPage">- Phương tiện vận chuyển/ <i>Transportation method</i>: {{data.TransportationMethod}}</p>
        <p @dblclick="addBreakPage" class="hasBreakPage -no-wrap-hidden">- Họ tên, chức danh, trình độ chuyên môn của người hộ tống/ <i>Name, title, professional qualification of escort</i>: {{data.EscortPerson}}</p>
      </div>
      <br/>
      <template v-if="dataParent && dataParent.Version >= 10">
        <table width="100%">
          <tr>
            <td></td>
            <td width="60%" style="text-align: center;">
              <div style="text-align: center;" class="font15">{{dataParent.Date | bilingualFormatDateTimeTwo}}</div>
            </td>
          </tr>
          <tr>
            <td style="text-align: center;">
              <p style="text-align: center;">{{TRANSFERLETTER_TIME_PIC}}</p>
              <p style="text-align: center;" class="font-bold font15">Y, BÁC SĨ KHÁM, ĐIỀU TRỊ/ <i>PHYSICIAN-IN-CHARGE</i></p>
            </td>
            <td style="text-align: center;">
              <p style="text-align: center;">{{TRANSFERLETTER_TIME_TAU}}</p>
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
        <table width="100%">
          <tr>
            <td></td>
            <td width="60%" style="text-align: center;">
              <div style="text-align: center;" class="font15">{{dataParent.Date | bilingualFormatDateTimeTwo}}</div>
            </td>
          </tr>
          <tr>
            <td style="text-align: center;" class="font-bold font15">Y, BÁC SĨ KHÁM, ĐIỀU TRỊ/ <i>PHYSICIAN-IN-CHARGE</i></td>
            <td style="text-align: center;" class="font-bold font15">NGƯỜI CÓ THẨM QUYỀN CHUYỂN TUYẾN/ <i>TRANSFER AUTHORITY</i></td>
          </tr>
          <tr>
            <td valign="top">
              <p style="text-align: center;" class="font15">(Ký tên, đóng dấu/ <i>Sign, stamp</i>)</p>
              <img style="opacity: 0" class="hidden-box" src="/static/140x80.png" />
              <p style="text-align: center;">{{(dataParent.PhysicianInCharge ? dataParent.PhysicianInCharge.Fullname : '')}}</p>
            </td>
            <td valign="top">
              <p style="text-align: center;" class="font15">(Ký tên, đóng dấu/ <i>Sign, stamp</i>)</p>
              <img style="opacity: 0" class="hidden-box" src="/static/140x80.png" />
            </td>
          </tr>
           <tr>
            <th v-if="!dataOrigin.PhysicianInCharge" width="50%" class="text-center" style="text-align: center"><p><br /></p></th>
            <th v-if="!dataOrigin.Director" class="text-center" style="text-align: center"><p><br /></p></th>
          </tr>
          <tr>
            <td v-if="dataOrigin.PhysicianInCharge && dataOrigin.PhysicianInCharge.Fullname" width="50%" class="text-center" style="text-align: center"><b>Họ tên</b>/ <i>Full name</i>: {{dataOrigin.PhysicianInCharge.Fullname}}</td>
            <td v-else width="50%" class="text-center" style="text-align: center"><b>Họ tên</b>/ <i>Full name</i>:.............................</td>
            <td v-if="dataOrigin.Director && dataOrigin.Director.Fullname" width="50%" class="text-center" style="text-align: center"><b>Họ tên</b>/ <i>Full name</i>: {{dataOrigin.Director.Fullname}}</td>
            <td v-else width="50%" class="text-center" style="text-align: center"><b>Họ tên</b>/ <i>Full name</i>:.............................</td>
          </tr>
        </table>
      </template>
    </div>
    <div v-else class="text-center">
      <h4>{{errMsg}}</h4>
      <p><button class="btn btn-back v-white-btn" type="button" @click="back()">{{__t('btn.back')}}</button></p>
    </div>
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
    <div v-if="isTranView && !viewOnly" class="print-area">
      <button class="btn v-yellow-btn pull-right" @click="print()" v-shortkey="['ctrl', 'p']" @shortkey="print()"><i class="fa fa-print" aria-hidden="true"></i> In ngay</button>
    </div>
  </div>
</template>
<script>
/* ============
 * The home index page.
 */
import TranferLetter from '@/services/IPD/TranferLetter'
import Confirm from '@/components/Form/Confirm3'
import moment from 'moment'
export default {
  /**
   * The name of the page.
   */
  name: 'ED-TranferLetter-View',
  props: ['viewOnly', 'VisitId', 'data', 'isTranView', 'printId', 'visitIDFromPage', 'dataParent', 'dataTrans'],
  mixins: [],
  data () {
    return {
      errMsg: 'Hồ sơ bệnh án chưa đầy đủ, vui lòng thực hiện trước khi sử dụng tính năng này',
      FormCode: '',
      dataOrigin: null,
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
    this.getData()
  },
  computed: {
    HealthInsuranceNumber () {
      if (this.data.HealthInsuranceNumber) {
        var arr = this.data.HealthInsuranceNumber.split(' ')
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
    getData () {
      new TranferLetter().find(this.visitIDFromPage + '?hidemsg=' + true).then(async response => {
        this.dataOrigin = response
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
    }
  }
}
</script>
<style lang="stylus" scoped>
.no-wrap-hiddenNoSpace {
  white-space: nowrap;
  overflow: hidden;
}
</style>
