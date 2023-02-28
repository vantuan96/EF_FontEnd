<template>
  <div class="main-content" id="di0-page">
    <template v-if="data">
      <medical-report-view :data="data" :Status="Status" :site="'OPD'" :printIsOpend="printIsOpend" :viewOnly="viewOnly" :IsLocked="data.IsLock24h"/>
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
        <translation-request :name="'báo cáo y tế'" :VisitId="_VisitId" :ViName="'BÁO CÁO Y TẾ '" :EnName="'MEDICAL REPORT'" />
      </div>
      <div class="container" style="width: 870px !important; padding: 0">
        <p class="mt-10">A01_198_100120_VE</p>
      </div>
      <div class="a4-page no-style" v-if="!viewOnly">
        <div class="">
          <button class="btn pull-left btn-back v-white-btn" type="button" @click="back()">{{__t('Quay lại')}}</button>
          <button class="btn v-yellow-btn pull-right" @click="print()" v-shortkey="['ctrl', 'p']" @shortkey="print()"><i class="fa fa-print" aria-hidden="true"></i> {{__t('In ngay')}}</button>
        </div>
        <!-- <p v-if="data.Status && ['In hospital', 'Waiting results'].includes(data.Status.EnName)" class="text-right"><i>Bác sĩ chưa hoàn thiện hồ sơ</i></p> -->
      </div>
      <modal :name="'view-modal'" transition="pop-out" height="auto" :scrollable="false" :width="modalWidth" :class="'no-scroll-x'">
        <div v-if="TranItem && TranItem.Status !== 3">
          <view-item :isTranslate="true" @confirmed="confirmed" :Id="TranItem.Id" :PkntVersion="data.PkntVersion" :ForDoctor="true" :printIsOpend="printIsOpend" :viewOnly="viewOnly"/>
        </div>
        <div v-else>
          <MedicalReportViewTranslate :dataTrans="dataTrans" :dataParent="data" :isTranView="true" :PkntVersion="data.PkntVersion" :data="dataTranslated" v-if="dataTranslated" :printId="'printview'" :site="'OPD'" :Status="Status" :printIsOpend="printIsOpend" :viewOnly="viewOnly" :VisitType="VisitType"/>
          <div v-else class="loading-text"><v-loading/></div>
        </div>
      </modal>
    </template>
    <div v-else class="loading-text"><v-loading/></div>
  </div>
</template>
<script>
/* ============
 * The home index page.
 */

import MixinMasterData from '@/mixins/masterdata.js'
import MedicalReport from '@/services/OPD/MedicalReport'
import MedicalReportView from '@/components/OPD/MedicalReport.vue'
import MedicalReportViewTranslate from './View/Index.vue'
import MixinView from '@/mixins/view.js'
import MixinForm from '@/mixins/form.js'
import TranslationRequest from '@/components/Translation/Request.vue'
import ViewItem from '@/components/Translation/View.vue'
import Translation from '@/services/Translation'
import { cloneDeep } from 'lodash'
const MODAL_WIDTH = 870
export default {
  /**
   * The name of the page.
   */
  name: 'OPD-MedicalReport',
  mixins: [MixinMasterData, MixinView, MixinForm],
  props: ['viewOnly', 'VisitId', 'VisitType'],
  data () {
    return {
      data: null,
      modalWidth: MODAL_WIDTH,
      TranItem: null,
      dataTranslated: null,
      Status: null,
      dataTrans: null,
      printIsOpend: false
    }
  },
  /**
   * The components that the page can use.
   */
  components: {
    TranslationRequest,
    ViewItem,
    MedicalReportView,
    MedicalReportViewTranslate
  },
  mounted () {
    this.modalWidth = window.innerWidth < MODAL_WIDTH
      ? '90%'
      : MODAL_WIDTH
    console.log('?')
    this.getData()
  },
  computed: {
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
          this.dataTranslated = this.mappingTranslation(cloneDeep(response))
          this.dataTrans = cloneDeep(response)
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
    print () {
      this.printIsOpend = true
      setTimeout(() => {
        this.$nextTick(() => {
          this.$htmlToPaper('printMe', false, 'A01_198_100120_VE')
        })
        setTimeout(() => {
          this.printIsOpend = false
        }, 1000)
      }, 200)
    },
    getData () {
      new MedicalReport().find(this._VisitId).then(response => {
        this.data = response
        this.$store.dispatch('setCurrentFormId', response.Id)
        this.Status = null
        if (response.Status) {
          this.Status = response.Status
        }
      })
    }
  }
}
</script>
