<template>
    <div class="main-content" id="EOC-VIEW">
      <br/>
      <h1 class="title-page">{{ __t('Chi tiết bệnh án') }}</h1>
      <br/>
      <div class="flex" style="cursor: pointer;">
      <div class="col-md-1" :class="getActiveMenu(item.Code) ? 'backColor' : ''"  @click="filterMenu(item.value, item.Code, activeMenu)" style="height:74px;padding: 8px;border: 0.5px solid #efefef;border-radius: 8px;" v-for="item in groupMenu" :key="item.value">{{__t(item.title)}}</div>
    </div>
      <div class="mb-10">
        <input type="text" class="form-control" v-model="search" :placeholder="__t('Gõ để tìm tên phiếu...')"/>
      </div>
      <div v-if="loading" class="text-center"><v-loading/></div>
      <div v-else :key="index" v-for="(form, index) in finedForm" class="mb-10">
        <div v-if="form.Datas && form.Datas.length">
          <component v-if="form.Type in $options.components" :Form="form" v-bind:is="form.Type" :VisitId="VisitId || $route.params.Id" :VisitType="'EOC'"/>
        </div>
      </div>
      <!-- <h1 class="text-center">{{__t('general.thong_tin_benh_nhan')}}</h1>
      <for-short-term :OpdId="OpdId || $route.params.Id" :readonlyview="readonlyview"/>
      <for-on-going :OpdId="OpdId || $route.params.Id" :readonlyview="readonlyview"/>
      <telehealth :OpdId="$route.params.Id" :readonlyview="readonlyview"/>
      <outpatient-examination-note :OpdId="OpdId || $route.params.Id" :readonlyview="readonlyview"/>
      <div class="form-content-2 no-bsorder no-bg">
        <div class="row">
          <div class="col-md-9">
            <div class="form-group">
              <button class="btn pull-left btn-back v-white-btn" type="button" @click="back()">{{__t('btn.quay_lai')}}</button>
            </div>
          </div>
          <div class="col-md-3" v-if="!readonlyview">
            <div class="form-group">
              <button class="btn btn-block v-yellow-btn" type="button" @click="$router.push({name: 'OPDMedicalReport', params: {Id: $route.params.Id}})">Báo cáo y tế</button>
            </div>
          </div>
        </div>
      </div> -->
    </div>
</template>
<script>
/* ============
 * Add cusotmer Page
 * ============
 *
 * The home index page.
 */
import MixinMasterData from '@/mixins/masterdata.js'
import MixinForm from '@/mixins/form.js'
import MedicalRecord from '@/services/MedicalRecord.js'
const InitialAssessmentForShortTerm = () => import(/* webpackChunkName: "InitialAssessmentForShortTerm" */ '@/components/EOC/ForShortTerm.vue')
const InitialAssessmentForOnGoing = () => import(/* webpackChunkName: "InitialAssessmentForOnGoing" */ '@/components/EOC/ForOnGoing.vue')
const FallRiskScreening = () => import(/* webpackChunkName: "FallRiskScreening" */ '@/pages/EOC/InitialAssessment/FallRiskScreening/View.vue')
const OutpatientExaminationNote = () => import(/* webpackChunkName: "OutpatientExaminationNote" */ '@/components/EOC/OutpatientExaminationNoteDetail.vue')
const StandingOrder = () => import(/* webpackChunkName: "StandingOrder" */ '@/pages/StandingOrder/View.vue')
const ComplexOutpatientCaseSummary = () => import(/* webpackChunkName: "ComplexOutpatientCaseSummary" */ '@/pages/ComplexOutpatientCaseSummary/View.vue')
const HandOverCheckList = () => import(/* webpackChunkName: "HandOverCheckList" */ '@/pages/EOC/HandOverCheckList/ViewOnly.vue')
const CardiacArrestRecord = () => import(/* webpackChunkName: "CardiacArrestRecord" */ '@/pages/CardiacArrestRecord/View.vue')
const JointConsultationGroupMinutes = () => import(/* webpackChunkName: "JointConsultationGroupMinutes" */ '@/pages/JointConsultationGroupMinutes/View.vue')
const PatientProgressNote = () => import(/* webpackChunkName: "PatientProgressNote" */ '@/pages/ProgressNote/View.vue')
const SurgicalProcedureSafetyChecklist = () => import(/* webpackChunkName: "SurgicalProcedureSafetyChecklist" */ '@/pages/OPD/SurgicalProcedureSafetyChecklist/View.vue')
// const ProcedureSummary = () => import(/* webpackChunkName: "IPD" */ '@/pages/ProcedureSummary/View.vue')
const SurgeryAndProcedureSummary = () => import(/* webpackChunkName: "SurgeryAndProcedureSummary" */ '@/pages/ProcedureSummary/View.vue')
const PHC = () => import(/* webpackChunkName: "PHC" */ '@/pages/ED/PreOperativeProcedureHandoverChecklists/View.vue')
const SkinTestResult = () => import(/* webpackChunkName: "SkinTestResult" */ '@/pages/ED/SkinTestResult/View.vue')
const MedicalReport = () => import(/* webpackChunkName: "MedicalReport" */ '@/pages/EOC/Documents/MedicalReport/View.vue')
const ReferralLetter = () => import(/* webpackChunkName: "ReferralLetter" */ '@/pages/EOC/Documents/ReferralLetter/View.vue')
const TransferLetter = () => import(/* webpackChunkName: "TransferLetter" */ '@/pages/EOC/Documents/TranferLetter/View.vue')
const TrickSummary = () => import(/* webpackChunkName: "TrickSummary" */ '@/pages/TrickSummary/View.vue')
const PFEF = () => import(/* webpackChunkName: "PFEF" */ '@/pages/PatientAndFamilyEducation/View.vue')
const ConsentForOperationOrrProcedure = () => import(/* webpackChunkName: "ConsentForOperationOrrProcedure" */ '@/pages/ConsentForOperation/View.vue')
const HIVTestingConsent = () => import(/* webpackChunkName: "HIVTestingConsent" */ '@/pages/HIVTestingConsent/View.vue')
const CatridgeKaolinACT = () => import(/* webpackChunkName: "CatridgeKaolinACT" */ '@/pages/IPD/CartridgeKaolinACT/View.vue')
const UploadImage = () => import(/* webpackChunkName: "UploadImage" */ '@/pages/IPD/UploadImage/View.vue')
const ProcedureSafetyChecklist = () => import(/* webpackChunkName: "ProcedureSafetyChecklist" */ '@/pages/FormLienKhoa/A02_053_OR_201022_V/View.vue')
export default {
  /**
   * The name of the page.
   */
  name: 'EOC-VIEW',
  props: ['VisitId'],
  data () {
    return {
      activeMenu: 0,
      formResponse: [],
      groupMenu: [
        {
          title: this.$t('Tất cả'),
          value: 0,
          Code: 'TC'
        },
        {
          title: this.$t('Hành chính, Cam kết'),
          value: 1,
          Code: 'HCCK'
        },
        {
          title: this.$t('Bệnh án hội chẩn'),
          value: 2,
          Code: 'BAHC'
        },
        {
          title: this.$t('Y lệnh'),
          value: 3,
          Code: 'YL'
        },
        {
          title: this.$t('Y lệnh khác'),
          value: 4,
          Code: 'YLK'
        },
        {
          title: this.$t('Theo dõi điều dưỡng'),
          value: 5,
          Code: 'TDDD'
        },
        {
          title: this.$t('Phẫu thuật, Thủ thuật'),
          value: 6,
          Code: 'PTTT'
        },
        {
          title: this.$t('Kết quả xét nghiệm'),
          value: 7,
          Code: 'KQXN'
        },
        {
          title: this.$t('Kết quả CĐHA'),
          value: 8,
          Code: 'KQCDHA'
        },
        {
          title: this.$t('Ra viện'),
          value: 9,
          Code: 'RAVIEN'
        },
        {
          title: this.$t('Khác'),
          value: 10,
          Code: 'KHAC'
        },
        {
          title: this.$t('Biểu mẫu không thuộc HSBA'),
          value: 11,
          Code: 'BMKTHSBA'
        }],
      data: {
      },
      OpdId: null,
      readonlyview: false,
      Forms: [],
      tabActive: ['TC'],
      search: '',
      loading: true
    }
  },
  mixins: [MixinForm, MixinMasterData],
  /**
   * The components that the page can use.
   */
  components: {
    UploadImage,
    TrickSummary,
    InitialAssessmentForShortTerm,
    InitialAssessmentForOnGoing,
    OutpatientExaminationNote,
    FallRiskScreening,
    StandingOrder,
    ComplexOutpatientCaseSummary,
    HandOverCheckList,
    CardiacArrestRecord,
    JointConsultationGroupMinutes,
    PatientProgressNote,
    SurgicalProcedureSafetyChecklist,
    // ProcedureSummary,
    SurgeryAndProcedureSummary,
    PHC,
    SkinTestResult,
    MedicalReport,
    ReferralLetter,
    TransferLetter,
    PFEF,
    ConsentForOperationOrrProcedure,
    HIVTestingConsent,
    CatridgeKaolinACT,
    ProcedureSafetyChecklist
  },
  mounted () {
    this.readonlyview = this.$router.currentRoute.name === 'EOCRECORD'
    // if (this.$store.state.account.Position.includes('Nurse') || this.$store.state.account.Position.includes('Doctor')) {
    //   this.activeMenu = 2
    // }
    this.getData()
  },
  computed: {
    finedForm: function () {
      console.log(this.Forms, 'check this form')
      this.Forms.filter(item => {
        item.UpdatedAt = this.$options.filters.formatDateWithoutSecon(item.UpdatedAt)
      })
      if (!this.search) return this.Forms
      return this.Forms.filter(item => {
        if (this.$i18n.locale === 'vi') {
          console.log(this.Forms, 'check this form using viname')
          return this.mapingStr(this.xoaDau(this.search), this.xoaDau(item.ViName))
        } else {
          console.log(this.Forms, 'check this form using Ename')
          return this.mapingStr(this.xoaDau(this.search), this.xoaDau(item.EnName))
        }
      })
    }
  },
  methods: {
    getActiveMenu (code) {
      if (this.tabActive.filter(name => name === code).length > 0) {
        return true
      } else {
        return false
      }
    },
    filterMenu (i, code, activeMenu) {
      if (this.tabActive.filter(name => name === code).length > 0) {
        console.log('join case 1')
        this.tabActive = this.tabActive.filter(name => name !== code)
      } else {
        console.log('join case 2')
        if (code === 'TC') {
          this.tabActive = ['TC']
        } else {
          this.tabActive.push(code)
          this.tabActive = this.tabActive.filter(name => name !== 'TC')
        }
      }
      if (this.tabActive.length > 0) {
        console.log('join case 3')
        if (this.tabActive.filter(name => name.includes('TC')).length > 0) {
          this.Forms = this.formResponse
          console.log(this.Forms, 'join case 3.1')
        } else {
          var list1 = []
          for (let i = 0; i < this.tabActive.length; i++) {
            var list = this.MASTERDATA[this.tabActive[i]].Items
            list1 = list1.concat(list)
          }
          var arr = this.formResponse.filter((el) => {
            return list1.some((f) => {
              return f.Code === el.Type
            })
          })
          this.Forms = arr
          console.log(this.Forms, 'join case 3.2')
        }
      } else {
        this.Forms = []
      }
    },
    getData () {
      new MedicalRecord().find('EOC/' + (this.VisitId || this.$route.params.Id)).then(response => {
        this.Forms = response
        this.Forms = this.Forms.sort(function (a, b) {
          let c = new Date(a.UpdatedAt)
          let d = new Date(b.UpdatedAt)
          return d - c
        })
        this.formResponse = response
        this.loading = false
        this.getMasterDatas({Form: 'NHOMBIEUMAU'}, () => {
        })
      })
    }
  }
}
</script>
<style scoped>
   .backColor {
    background-color: #337ab7;
    color: #fff;
  }
</style>
