<template>
  <div class="main-content" id="di0-page">
    <div class="a4-page box" id="printMe">
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
      <div class="text-center font14 font-bold">Kính gửi/ <i>Dear</i>: {{data.Hospital || '. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .'}}</div>
      <br/>
      <div class="font15">
        <p>BỆNH VIỆN ĐA KHOA QUỐC TẾ VINMEC/ <i>VINMEC INTERNATIONAL GENERAL HOSPITAL</i>: {{data.Site}} trân trọng giới thiệu/ <i>presents</i>: </p>
        <p>- Họ và tên người bệnh/ <i>Patient’s name</i>: {{data.Fullname}} <span class="tab404">Giới tính/ <i>Gender</i>: {{data.Gender || '. . . . . . . . . . . . . . '}}</span> <span class="tab404">Tuổi/ <i>Age</i>: {{$options.filters.formatAge(data.AgeFormated) || '. . . . . . . . . . . . . . '}}</span></p>
        <p>- Địa chỉ/ <i>Address</i>: {{data.Address || '. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . '}}</p>
        <p>- Dân tộc/ <i>Ethnic</i>: {{data.Fork || '. . . . . . . . . . . . . . . . . . . . . . . . . . . . '}} <span class="tab404">Quốc tịch/ <i>Nationality</i>: {{data.Nationality || '. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . '}}</span></p>
        <p>- Nghề nghiệp/ <i>Occupation</i>: {{data.Job || '. . . . . . . . . . . . . . . . . . . . . . . .'}} <span class="tab404">Nơi làm việc/ <i>Working place</i>: {{data.WorkPlace || '. . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .'}}</span></p>
        <p>- Số thẻ/ <i>HI no.</i>: {{HealthInsuranceNumber || '. . . . . . . . . . . . . . . . . . . . . . . .'}}</p>
        <p>- Hạn sử dụng/ <i>Health of issurance valid to date</i>: {{data.ExpireHealthInsuranceDate || '. . . . . . . . . . . . . . . . . . . . . . . .  . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .'}}</p>
        <p>Đã được khám bệnh/ điều trị/ <i>Examined/ treated</i>:</p>
        <p>+  Tại: BVĐKQT VINMEC {{data.Site}} (Tuyến {{data.Level}})/ <i>At VINMEC INTERNATIONAL GENERAL HOSPITAL</i> {{data.Site}} (Level {{data.Level}}) từ ngày/ <i>from</i> {{data.StartDate}} đến ngày/ <i>to</i> {{data.EndDate || '. . . . . . . . . . . . . . . . . . . . .'}}</p>
        <p @dblclick="addBreakPage" class="hasBreakPage font-bold">TÓM TẮT BỆNH ÁN/ <i>SUMMARY OF MEDICAL RECORD</i></p>
        <!-- <p @dblclick="addBreakPage" class="hasBreakPage">- Dấu hiệu lâm sàng: {{data.ClinicalExaminationAndFindings}}</p> -->
        <p @dblclick="addBreakPage" class="hasBreakPage">- Dấu hiệu lâm sàng/ <i>Clinical signs</i>:</p>
        <div style="padding-left: 5px;">
          <p style="margin: 7px 0;font-size: 15px;line-height: 1.5;" :data="item" :key="index" v-for="(item ,index) in data.ClinicalExaminationAndFindings">+ {{item.ViName}}/<i> {{item.EnName}}: </i>{{item.Value}}</p>
        </div>
        <p @dblclick="addBreakPage" class="hasBreakPage">- Kết quả xét nghiệm, cận lâm sàng/ <i>Lab test and paraclinical test result</i>: {{'\n'}}{{data.PrincipalTest || '. . . . . . . . . . . . . . . . . . . . . . . .  . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .  . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .  . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .  . . . . . . . . . . . . . '}}</p>
        <p @dblclick="addBreakPage" class="hasBreakPage">- Chẩn đoán/ <i>Diagnosis</i>: {{data.Diagnosis || '. . . . . . . . . . . . . . . . . . . . . . . .  . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .  . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .  . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .  . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .  . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .'}}</p>
        <!-- <p @dblclick="addBreakPage" class="hasBreakPage">- Phương pháp, thủ thuật, kỹ thuật, thuốc đã sử dụng trong điều trị: {{data.Method || '. . . . . . . . . . . . . . . . . . . . . . . .  . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .  . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .  . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .  . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .'}}</p> -->
        <div @dblclick="addBreakPage" class="hasBreakPage">- Phương pháp, thủ thuật, kỹ thuật, thuốc đã sử dụng trong điều trị/ <i>Method, procedure, technique, medication applied during treatment</i>:</div>
        <p v-html="data.Method" :style="data.DrugsUsed ? 'margin-bottom: 0px!important;' : ''"></p>
        <p>{{data.DrugsUsed}}</p>
        <p @dblclick="addBreakPage" class="hasBreakPage">- Tình trạng người bệnh lúc chuyển tuyến/ <i>Patient’s condition upon transfer</i>: {{data.PatientStatus || '. . . . . . . . . . . . . . . . . . . . . . . .  . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .  . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .  . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .  . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .'}}</p>
        <p @dblclick="addBreakPage" class="hasBreakPage">- Lý do chuyển tuyến/ <i>Reason for transfer</i>: Khoanh tròn vào lý do chuyển tuyến phù hợp sau đây/ <i>Circle the appropriate reason below</i>:</p>
        <p :data="item" :key="index" v-for="(item, index) in data.ReasonForTransfer">
          <span v-if="index === 0" class="t-boder" :class="{'t-boder-none': item.Value === 'False' || item.Value === null || item.Value === ''}">{{index + 1}}</span> <span v-if="index === 0">{{item.ViName}}/ <i>Eligible for transfer</i></span>
          <span v-if="index === 1" class="t-boder" :class="{'t-boder-none': item.Value === 'False' || item.Value === null || item.Value === ''}">{{index + 1}}</span> <span v-if="index === 1">{{item.ViName}}/ <i>As requested by patient or patient’s legal representative</i></span>
        </p>
        <!-- <div style="page-break-after: always;"></div> -->
        <p @dblclick="addBreakPage" class="hasBreakPage">- Hướng điều trị/ <i>Treatment plan</i>: {{data.CarePlan || '. . . . . . . . . . . . . . . . . . . . . . . .  . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .  . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .  . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .  . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .'}}</p>
        <p @dblclick="addBreakPage" class="hasBreakPage">- Chuyển tuyến hồi/ <i>Transfer Date</i>: <template v-if="data.EndDateTime">{{data.EndDateTime | bilingualFormatDateTime}}</template><template v-else>. . . . . . . . . giờ . . . . . . . . . phút, ngày . . . . . . . . . tháng . . . . . . . . . năm . . . . . . . . .</template></p>
        <p @dblclick="addBreakPage" class="hasBreakPage">- Phương tiện vận chuyển/ <i>Transportation method</i>: {{data.TransportationMethod || '. . . . . . . . . . . . . . . . . . . . . . . .  . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .'}}</p>
        <p @dblclick="addBreakPage" class="hasBreakPage">- Họ tên, chức danh, trình độ chuyên môn của người hộ tống/ <i>Name, title, professional qualification of escort</i>: {{data.Escort || '. . . . . . . . . . . . . . . . . . . . . . . .  . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .'}}</p>
      </div>
      <br/>
      <table width="100%">
        <tr>
          <td></td>
          <td width="60%" style="text-align: center;">
            <div style="text-align: center;" class="font15">{{data.Date | bilingualFormatDateTimeTwo}}</div>
          </td>
        </tr>
        <tr :class="{'only-print-page': data.Version >= 10}">
          <td style="text-align: center;">
            <p v-if="TRANSFERLETTER_TIME_PIC" style="text-align: center;">{{TRANSFERLETTER_TIME_PIC}}</p>
            <p style="text-align: center;" class="font-bold font15">Y, BÁC SĨ KHÁM, ĐIỀU TRỊ/ <i>PHYSICIAN-IN-CHARGE</i></p>
          </td>
          <td style="text-align: center;">
            <p v-if="TRANSFERLETTER_TIME_TAU" style="text-align: center;">{{TRANSFERLETTER_TIME_TAU}}</p>
            <p style="text-align: center;" class="font-bold font15">NGƯỜI CÓ THẨM QUYỀN CHUYỂN TUYẾN/ <i>TRANSFER AUTHORITY</i></p>
          </td>
        </tr>
        <tr :class="{'only-print-page': data.Version >= 10}">
          <td valign="top">
            <p style="text-align: center;" class="font15">(Ký tên, đóng dấu/ <i>Sign, stamp</i>)</p>
            <img style="opacity: 0" class="hidden-box" src="/static/140x80.png" />
            <p v-if="TRANSFERLETTER_PIC && data.Version >= 10" style="text-align: center;">{{TRANSFERLETTER_PIC}}</p>
            <p v-else-if="data && data.Version < 10" style="text-align: center;">{{(data.Physician)}}</p>
          </td>
          <td valign="top">
            <p style="text-align: center;" class="font15">(Ký tên, đóng dấu/ <i>Sign, stamp</i>)</p>
            <img style="opacity: 0" class="hidden-box" src="/static/140x80.png" />
            <p v-if="TRANSFERLETTER_TAU" style="text-align: center;">{{TRANSFERLETTER_TAU}}</p>
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
      <translation-request :name="'giấy chuyển tuyến'" :VisitId="VisitId" :ViName="'GIẤY CHUYỂN TUYẾN'" :EnName="'TRANSFER LETTER'" />
    </div>
    <div class="container mt-10" style="width: 870px !important; padding: 0">
      <p>A01_167_180220_VE</p>
    </div>
    <div v-if="data && data.Version >= 10" class="a4-page no-style">
      <Confirm
        class="mt-10 only-web-page"
        :MasterDataCode="'TRANSFERLETTERCONFIRM'"
        :FormCode="`A01_167_180220_VE`"
        :VisitId="_VisitId"
        :FormId="data.Id"
        :ReadOnly="viewOnly || IsFormLocked(data)"
        :Bilingual="true"
        @ResponseData="getListConfirm"
      />
    </div>
    <modal :name="'view-modal'" transition="pop-out" height="auto" :scrollable="false" :width="modalWidth" :class="'no-scroll-x'">
      <div v-if="TranItem && TranItem.Status !== 3">
        <view-item :isTranslate="true" @confirmed="confirmed" :Id="TranItem.Id" :ForDoctor="true" />
      </div>
      <div v-else>
        <TransferLetterView :dataParent="data" :isTranView="true" :data="dataTranslated" v-if="dataTranslated" :printId="'printview'"/>
        <div v-else class="loading-text"><v-loading/></div>
      </div>
    </modal>
    <div class="a4-page no-style" v-if="!viewOnly">
      <div class="">
        <button class="btn pull-left btn-back v-white-btn" type="button" @click="back()">{{__t('Quay lại')}}</button>
        <button class="btn v-yellow-btn pull-right"  v-shortkey="['ctrl', 'p']" @shortkey="print()" @click="print"><i class="fa fa-print" aria-hidden="true"></i> {{__t('In ngay')}}</button>
      </div>
    </div>
  </div>
</template>
<script>
/* ============
 * The home index page.
 */
import Confirm from '@/components/Form/Confirm3'
import TranferLetter from '@/services/ED/TranferLetter'
import MixinMasterData from '@/mixins/masterdata.js'
import MixinView from '@/mixins/view.js'
import MixinForm from '@/mixins/form.js'
import TranslationRequest from '@/components/Translation/Request.vue'
import ViewItem from '@/components/Translation/View.vue'
import Translation from '@/services/Translation'
import TransferLetterView from './View/Index.vue'
import moment from 'moment'

const MODAL_WIDTH = 870

export default {
  /**
   * The name of the page.
   */
  name: 'ED-TranferLetter',
  props: ['viewOnly', 'VisitId'],
  mixins: [MixinMasterData, MixinForm, MixinView],
  data () {
    return {
      data: {},
      modalWidth: MODAL_WIDTH,
      TranItem: null,
      dataTranslated: null,
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
    TranslationRequest,
    ViewItem,
    TransferLetterView,
    Confirm
  },
  mounted () {
    this.modalWidth = window.innerWidth < MODAL_WIDTH
      ? '90%'
      : MODAL_WIDTH
    this.getData()
  },
  computed: {
    HealthInsuranceNumber () {
      return this.data.HealthInsuranceNumber
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
      this.$htmlToPaper('printMe', false, 'A01_167_180220_VE')
    },
    getData () {
      new TranferLetter().find(this._VisitId).then(response => {
        this.data = response
        this.$store.dispatch('setCurrentFormId', response.Id)
      })
    }
  }
}
</script>
<style lang="stylus" scoped>
.no-wrap-hiddenNoSpace {
  overflow: hidden;
}
</style>
