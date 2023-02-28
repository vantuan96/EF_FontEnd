<template>
  <div>
    <div class="a4-page box" :id="printId || 'printMe'" v-if="data">
      <div class="text-center" style="text-align: center"><img class="top-logo" src="/static/Logo Vinmec International Hospitall 1.png" /></div>
      <h2 class="title-page text-center" style="text-align: center; font-size: 20px">BÁO CÁO Y TẾ / MEDICAL REPORT</h2>
      <p style="text-align: right"><b>{{data.Location}}</b>,<i> {{data.DischargeHour}} giờ</i> <i>ngày {{data.Date}}</i></p>
      <p><b><i>Kính gửi các cơ quan hữu quan/ To whom it may concern</i></b>,</p>
      <p><b>Họ và tên người bệnh</b>/ <i>Patient’s name </i>: {{data.Fullname}}</p>
      <p><b>Ngày tháng năm sinh</b>/ <i>D.O.B</i>: {{data.DateOfBirth}}</p>
      <p><b>Số đăng ký</b>/ <i>PID</i>: {{data.PID}}</p>
      <p>Người bệnh có tên trên đây có đến khám/điều trị tại Bệnh viện đa khoa quốc tế Vinmec từ ngày/ <i>The above patient visited and received treatment at Vinmec International Hospital on</i> {{data.AdmittedDate}} tới ngày/to  {{data.DischargeDate}}</p>
      <p>Với những thông tin sau/ <i>With the following information:</i> </p>
      <p @dblclick="addBreakPage" class="hasBreakPage"><b>Lý do vào viện</b>/ <i>Chief complaint</i>: {{data.ChiefComplain}}</p>
      <div>
        <p @dblclick="addBreakPage" class="hasBreakPage"><b>Quá trình bệnh lý và diễn biến lâm sàng</b>/ <i>Clinical evolution:</i> <br>{{data.ClinicalEvolution}}</p>
        <div style="padding-left: 5px;">
          <p style="margin: 7px 0;font-size: 14px;line-height: 1.5;" :data="item" :key="index" v-for="(item ,index) in data.Assessment">+ <span class="font14">{{item.ViName}}/ {{item.EnName}}: {{item.Value}}</span></p>
        </div>
      </div>
      <p @dblclick="addBreakPage" class="hasBreakPage"><b>Kết quả cận lâm sàng</b>/ <i>Result of paraclinical tests</i>: {{'\n'}}{{data.ResultOfParaclinicalTests}}</p>
      <p @dblclick="addBreakPage" class="hasBreakPage"><b>Chẩn đoán</b>/ <i>Diagnosis</i>: {{data.Diagnosis}}</p>
      <div>
        <div @dblclick="addBreakPage" class="hasBreakPage"><b>Phương pháp điều trị</b>/ <i>Treatments and procedures</i>:</div>
        <p v-html="data.TreatmentAndProcedures"></p>
      </div>
      <p @dblclick="addBreakPage" class="hasBreakPage"><b>Tình trạng người bệnh hiện tại</b>/ <i>Current status</i>: {{data.CurrentStatus}}</p>
      <div>
        <p @dblclick="addBreakPage" class="hasBreakPage"><b>Kế hoạch điều trị và chăm sóc tiếp theo</b>/ <i>Follow-up care plan</i>: {{data.FollowupCarePlan}}</p>
        <p></p>
      </div>
      <br>
      <table class="table" style="width: 100%">
        <tr>
          <th width="50%" class="text-center" style="text-align: center; font-size: 14px;">Họ tên bác sỹ/<i>Physician’s name</i></th>
          <th class="text-center" style="text-align: center; font-size: 14px;">Chữ ký/<i>Signature</i></th>
        </tr>
        <tr>
          <td width="50%" class="text-center" style="text-align: center"></td>
          <td class="text-center" style="text-align: center"></td>
        </tr>
      </table>
    </div>
    <div class="a4-page no-style" v-if="data && data.Translations.length && !viewOnly">
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
      <translation-request :name="'báo cáo y tế'" :VisitId="_VisitId" :ViName="'BÁO CÁO Y TẾ '" :EnName="'MEDICAL REPORT'" />
    </div>
    <div class="container" style="width: 870px !important; padding: 0">
      <p>A01_144_050919_VE</p>
    </div>
    <div class="a4-page" style="border: 0px !important" v-if="!viewOnly">
      <button class="btn pull-left btn-back v-white-btn" type="button" @click="back()">{{__t('Quay lại')}}</button>
      <button class="btn v-yellow-btn pull-right" @click="print()" v-shortkey="['ctrl', 'p']" @shortkey="print()"><i class="fa fa-print" aria-hidden="true"></i> {{__t('In ngay')}}</button>
    </div>
    <modal :name="'view-modal'" transition="pop-out" height="auto" :scrollable="false" :width="modalWidth" :class="'no-scroll-x'">
      <div v-if="TranItem && TranItem.Status !== 3">
        <view-item :isTranslate="true" @confirmed="confirmed" :Id="TranItem.Id" :ForDoctor="true" />
      </div>
      <div v-else>
        <medical-report-view :dataParent="data" v-if="dataTranslated" :isTranView="true" :data="dataTranslated" :CheckDate="CheckDate" :viewOnly="viewOnly" :printId="'printview'"/>
        <div v-else class="loading-text"><v-loading/></div>
      </div>
    </modal>
  </div>
</template>
<script>
import MedicalReport from '@/services/IPD/MedicalReport'
import MedicalReportView from './View/Index.vue'
import TranslationRequest from '@/components/Translation/Request.vue'
import MixinForm from '@/mixins/form.js'
import MixinMasterData from '@/mixins/masterdata.js'
import MixinView from '@/mixins/view.js'
import ViewItem from '@/components/Translation/View.vue'
import Translation from '@/services/Translation'
const MODAL_WIDTH = 870

export default {
  name: 'IPDMedicalReport',
  props: ['data', 'isTranView', 'printId', 'viewOnly', 'VisitId'],
  mixins: [MixinForm, MixinMasterData, MixinView],
  data () {
    return {
      modalWidth: MODAL_WIDTH,
      TranItem: null,
      dataTranslated: null,
      Status: null
    }
  },
  mounted () {
    this.modalWidth = window.innerWidth < MODAL_WIDTH
      ? '90%'
      : MODAL_WIDTH
    this.getData()
  },
  components: {
    TranslationRequest,
    ViewItem,
    MedicalReportView
  },
  methods: {
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
      console.log(translation, 'check data after trans')
      // translation['Assessment'] = 'text'
      var objNotTran = [
        'Fullname',
        'ClinicCode',
        'Copy',
        'DateOfNextAppointment',
        'DateOfVisit',
        'DateOfBirth',
        'Date',
        'Physician',
        'Location',
        'AdmittedDate',
        'DischargeDate',
        'PID',
        'ICDOption',
        'Site',
        'Province',
        'IsTelehealth',
        'ICDDiagnosis'
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
            res[key] = this.trim_([res[key], '/ ', translation[key]].map(e => e).join(''), '/ ')
          }
        }
      }
      return res
    },
    getData () {
      new MedicalReport().find(this._VisitId).then((response) => {
        this.data = response
        this.Status = null
        if (response.Status) {
          this.Status = response.Status
        }
      })
    },
    print () {
      this.$htmlToPaperKLM('printMe', true, 'A01_144_050919_VE', this.getHotlineEd())
    }
  }
}
</script>
<style scoped>
  #printMe > p, i, span {
    font-size: 14px !important;
  }
</style>
