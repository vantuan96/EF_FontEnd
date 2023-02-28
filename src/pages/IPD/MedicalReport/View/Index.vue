<template>
  <div>
    <div class="a4-page box" :id="printId || 'printMeTranslate'" v-if="data">
      <div class="text-center" style="text-align: center"><img class="top-logo" src="/static/Logo Vinmec International Hospitall 1.png" /></div>
      <h2 class="title-page text-center" style="text-align: center; font-size: 20px">BÁO CÁO Y TẾ / MEDICAL REPORT</h2>
      <p style="text-align: right"><b>{{data.Location}}</b>,<i> {{DateCreated[0]}} giờ</i> <i>ngày {{DateCreated[1]}}</i></p>
      <p><b><i>Kính gửi các cơ quan hữu quan/ To whom it may concern</i></b>,</p>
      <p><b>Họ và tên người bệnh</b>/ <i>Patient’s name </i>: {{data.Fullname}}</p>
      <p><b>Ngày tháng năm sinh</b>/ <i>D.O.B</i>: {{data.DateOfBirth}}</p>
      <p><b>Số đăng ký</b>/ <i>PID</i>: {{data.PID}}</p>
      <p>Người bệnh có tên trên đây có đến khám/điều trị tại Bệnh viện đa khoa quốc tế Vinmec từ ngày/ <i>The above patient visited and received treatment at Vinmec International Hospital on</i> {{dataParent ? dataParent.AdmittedDate : ''}} tới ngày/to  {{dataParent ? dataParent.DischargeDate : ''}}</p>
      <p>Với những thông tin sau/ <i>With the following information:</i> </p>
      <p @dblclick="addBreakPage" class="hasBreakPage"><b>Lý do vào viện</b>/ <i>Chief complaint</i>: {{data.ChiefComplaint}}</p>
      <div>
        <p @dblclick="addBreakPage" class="hasBreakPage"><b>Quá trình bệnh lý và diễn biến lâm sàng</b>/ <i>Clinical evolution:</i> <br>{{data.ClinicalEvolution}}</p>
        <div style="padding-left: 5px;">
          <p style="margin: 7px 0;font-size: 14px;line-height: 1.5;" :data="item" :key="index" v-for="(item ,index) in data.ClinicalExaminationAndFindings">+ <span class="font14">{{item.ViName}}/ {{item.EnName}}: {{item.Value}}</span></p>
        </div>
      </div>
      <p @dblclick="addBreakPage" class="hasBreakPage"><b>Kết quả cận lâm sàng</b>/ <i>Result of paraclinical tests</i>: {{'\n'}}{{data.ResultOfParaclinicalTests}}</p>
      <p @dblclick="addBreakPage" class="hasBreakPage"><b>Chẩn đoán</b>/ <i>Diagnosis</i>: {{data.Diagnosis}}</p>
      <div>
        <div @dblclick="addBreakPage" class="hasBreakPage"><b>Phương pháp điều trị</b>/ <i>Treatments and procedures</i>:</div>
        <div v-if="data && data.TreatmentsAndProcedures && (data.TreatmentsAndProcedures).toString().includes('/')">
          <p v-html="data.TreatmentsAndProcedures"></p>
        </div>
        <div v-else>
          <p v-if="dataParent && dataParent.TreatmentAndProcedures" v-html="dataParent.TreatmentAndProcedures"></p>
          <div style="display: flex;">
            <span style="margin-right: 5px;" v-if="dataParent && dataParent.TreatmentAndProcedures">/ </span>
            <p v-html="data.TreatmentsAndProcedures"></p>
          </div>
        </div>
        <!-- <p v-if="dataParent" v-html="dataParent.TreatmentAndProcedures"></p>
        <div style="display: flex">
          <span>/</span>
          <p v-html="data.TreatmentsAndProcedures"></p>
        </div> -->
      </div>
      <p @dblclick="addBreakPage" class="hasBreakPage"><b>Tình trạng người bệnh hiện tại</b>/ <i>Current status</i>: {{data.DischargeStatus}}</p>
      <div>
        <p @dblclick="addBreakPage" class="hasBreakPage"><b>Kế hoạch điều trị và chăm sóc tiếp theo</b>/ <i>Follow-up care plan</i>: {{data.FollowUpCarePlan}}</p>
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
    <div v-if="isTranView && !viewOnly" class="print-area">
      <button class="btn v-yellow-btn pull-right" @click="print()" v-shortkey="['ctrl', 'p']" @shortkey="print()"><i class="fa fa-print" aria-hidden="true"></i> In ngay</button>
    </div>
  </div>
</template>
<script>
import MedicalReport from '@/services/IPD/MedicalReport'
import MedicalReportView from '@/components/OPD/MedicalReport.vue'
import TranslationRequest from '@/components/Translation/Request.vue'
import MixinForm from '@/mixins/form.js'
import MixinMasterData from '@/mixins/masterdata.js'
import MixinView from '@/mixins/view.js'
import ViewItem from '@/components/Translation/View.vue'
import Translation from '@/services/Translation'

export default {
  name: 'IPDMedicalReport',
  props: ['data', 'isTranView', 'printId', 'viewOnly', 'VisitId', 'dataParent'],
  mixins: [MixinForm, MixinMasterData, MixinView],
  data () {
    return {
      TranItem: null,
      dataTranslated: null,
      Status: null
    }
  },
  mounted () {
    console.log(this.data, 'check data receive ')
  },
  components: {
    TranslationRequest,
    ViewItem,
    MedicalReportView
  },
  computed: {
    DateCreated: function () {
      return this.data.Date ? this.data.Date.split(' ') : ['']
    }
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
            res[key].forEach(item => {
              var tranEd = (translation[key].find(e => e.ViName === item.ViName) || {Value: ''}).Value
              item.Value = this.trim_(item.Value + (tranEd ? ('/ ' + tranEd) : ''), '/ ')
            })
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
      this.$htmlToPaperKLM(this.printId || 'printMeTranslate', true, 'A01_144_050919_VE', this.getHotlineEd())
    }
  }
}
</script>
<style scoped>
  #printMe > p, i, span {
    font-size: 14px !important;
  }
</style>
