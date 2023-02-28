<template>
  <div class="main-content" id="iam-page">
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
      <div v-if="(form.Datas && form.Datas.length)">
        <keep-alive>
          <component v-if="form.Type in $options.components" :Form="form" v-bind:is="form.Type" :VisitType="'ED'" :VisitId="VisitId || $route.params.Id"/>
        </keep-alive>
        <!-- <div v-else>No FOUND {{form.Type}} {{form.ViName}}</div> -->
      </div>
      <!-- <div v-else>No DATA {{form.Type}} {{form.ViName}}</div> -->
    </div>
    <!-- <retail-service-patient :EdId="this.$route.params.Id" :readonlyview="readonlyview"/>
    <er0 :EdId="this.$route.params.Id" :readonlyview="readonlyview"/>
    <patient-progress-notes :VisitId="this.$route.params.Id" :Type="'ED'" :readonlyview="true"/>
    <di :EdId="this.$route.params.Id" :readonlyview="readonlyview"/> -->
  </div>
</template>
<script>
/* ============
 * Home Index Page
 * ============
 *
 * The home index page.
 */
import MixinMasterData from '@/mixins/masterdata.js'
import MedicalRecord from '@/services/MedicalRecord.js'
const EmergencyTriageRecord = () => import(/* webpackChunkName: "EmergencyTriageRecord" */ '@/pages/ED/EmergencyTriageRecord/Triage.vue')
const FallRiskScreening = () => import(/* webpackChunkName: "FallRiskScreening" */ '@/pages/ED/EmergencyTriageRecord/FallRiskScreening/View.vue')
const ER0 = () => import(/* webpackChunkName: "ER0" */ '@/pages/ED/EmergencyRecord/View.vue')
const AssessmentForRetailServicePatient = () => import(/* webpackChunkName: "AssessmentForRetailServicePatient" */ '@/pages/RetailService/AssessmentView.vue')
const DI0 = () => import(/* webpackChunkName: "DI0" */ '@/pages/ED/DischargeInformation/View.vue')
const StandingOrder = () => import(/* webpackChunkName: "StandingOrder" */ '@/pages/StandingOrder/View.vue')
const PatientProgressNote = () => import(/* webpackChunkName: "PatientProgressNote" */ '@/pages/ED/ProgressNote/View.vue')
const StandingOrderForRetailService = () => import(/* webpackChunkName: "StandingOrderForRetailService" */ '@/pages/RetailService/StandingOrderView.vue')
const AmbulanceRunReport = () => import(/* webpackChunkName: "AmbulanceRunReport" */ '@/pages/ED/AmbulanceRunReport/View.vue')
const ArterialBloodGasTest = () => import(/* webpackChunkName: "ArterialBloodGasTest" */ '@/pages/ED/PointOfCareTesting/ArterialBloodGasTestView.vue')
const ChemicalBiologyTest = () => import(/* webpackChunkName: "ChemicalBiologyTest" */ '@/pages/ED/PointOfCareTesting/ChemicalBiologyTestView.vue')
const PFEF = () => import(/* webpackChunkName: "PFEF" */ '@/pages/PatientAndFamilyEducation/View.vue')
const ExternalTransportationAssessment = () => import(/* webpackChunkName: "ExternalTransportationAssessment" */ '@/pages/IPD/ExternalTransportationAssessment/View.vue')
const SkinTestResult = () => import(/* webpackChunkName: "MortalityReport" */ '@/pages/ED/SkinTestResult/View.vue')
const MortalityReport = () => import(/* webpackChunkName: "MortalityReport" */ '@/pages/ED/MortalityReport/View.vue')
const MortalityReportV2 = () => import(/* webpackChunkName: "MortalityReportV2" */ '@/pages/ED/MortalityReport/View.vue')
const BloodRequestSupplyAndConfirmation = () => import(/* webpackChunkName: "BloodRequestSupplyAndConfirmation" */ '@/pages/ED/BloodRequestSupplyAndConfirmation/View.vue')
const BloodTransfusionChecklist = () => import(/* webpackChunkName: "BloodTransfusionChecklist" */ '@/pages/ED/BloodTransfusionChecklist/View.vue')
const CardiacArrestRecord = () => import(/* webpackChunkName: "CardiacArrestRecord" */ '@/pages/CardiacArrestRecord/View.vue')
const PatientOwnMedicationsChart = () => import(/* webpackChunkName: "PatientOwnMedicationsChart" */ '@/pages/PatientOwnMedicationsChart/View.vue')
const ConsultationDrugWithAnAsteriskMark = () => import(/* webpackChunkName: "ConsultationDrugWithAnAsteriskMark" */ '@/pages/IPD/ConsultationDrugWithAnAsteriskMarkUpForm/View.vue')
const JointConsultationForApprovalOfSurgery = () => import(/* webpackChunkName: "JointConsultationForApprovalOfSurgery" */ '@/pages/JointConsultationForApprovalOfSurgery/View.vue')
const VerbalOrderForm = () => import(/* webpackChunkName: "VerbalOrderForm" */ '@/pages/ED/EmergencyTriageRecord/OrderTableView.vue')
const ComplexOutpatientCaseSummary = () => import(/* webpackChunkName: "ComplexOutpatientCaseSummary" */ '@/pages/ComplexOutpatientCaseSummary/View.vue')
const JointConsultationGroupMinutes = () => import(/* webpackChunkName: "JointConsultationGroupMinutes" */ '@/pages/JointConsultationGroupMinutes/View.vue')
const MCA = () => import(/* webpackChunkName: "MCA" */ '@/pages/ED/MonitoringChartAndHandoverForms/View.vue')
const PHC = () => import(/* webpackChunkName: "PHC" */ '@/pages/ED/PreOperativeProcedureHandoverChecklists/View.vue')
const HandOverCheckList = () => import(/* webpackChunkName: "HandOverCheckList" */ '@/pages/ED/HandOverCheckList/ViewOnly.vue')
const SelfHarmRiskScreeningTool = () => import(/* webpackChunkName: "SelfHarmRiskScreeningTool" */ '@/pages/ED/SelfHarmRiskScreeningToolUpForm/View.vue')
const SurgeryAndProcedureSummary = () => import(/* webpackChunkName: "SurgeryAndProcedureSummary" */ '@/pages/ProcedureSummary/View.vue')
const CareNote = () => import(/* webpackChunkName: "CareNote" */ '@/pages/TakeCareNote/View.vue')
const PhysicianNote = () => import(/* webpackChunkName: "PhysicianNote" */ '@/pages/PhysicianNote/View.vue')
const HighlyRestrictedAntimicrobialConsult = () => import(/* webpackChunkName: "HighlyRestrictedAntimicrobialConsult" */ '@/pages/HighlyRestrictedAntimicrobialConsult/View.vue')
const MedicalReport = () => import(/* webpackChunkName: "MedicalReport" */ '@/pages/ED/MedicalReport/View.vue')
const DischargeMedicalReport = () => import(/* webpackChunkName: "DischargeMedicalReport" */ '@/pages/ED/DischargeMedicalReport/View.vue')
const ReferralLetter = () => import(/* webpackChunkName: "ReferralLetter" */ '@/pages/ED/ReferralLetter/View.vue')
const EMCO = () => import(/* webpackChunkName: "EMCO" */ '@/pages/ED/EmergencyConfirmation/View.vue')
const Discharged = () => import(/* webpackChunkName: "Discharged" */ '@/pages/ED/DischargeCertificate/View.vue')
const InjuryCertificate = () => import(/* webpackChunkName: "InjuryCertificate" */ '@/pages/ED/InjuryCertificate/View.vue')
const TransferLetter = () => import(/* webpackChunkName: "TransferLetter" */ '@/pages/ED/TranferLetter/View.vue')
const TrickSummary = () => import(/* webpackChunkName: "TrickSummary" */ '@/pages/TrickSummary/View.vue')
const ConsentForOperationOrrProcedure = () => import(/* webpackChunkName: "ConsentForOperationOrrProcedure" */ '@/pages/ConsentForOperation/View.vue')
const ConsentForTransfusionOfBlood = () => import(/* webpackChunkName: "ConsentForTransfusionOfBlood" */ '@/pages/ConsentForTransfusionOfBloodAndBloodDerivedProducts/View.vue')
const RequestResuscitation = () => import(/* webpackChunkName: "RequestResuscitation" */ '@/pages/IPD/Consent/View.vue')
const HIVTestingConsent = () => import(/* webpackChunkName: "HIVTestingConsent" */ '@/pages/HIVTestingConsent/View.vue')
const CartridgeCelite = () => import(/* webpackChunkName: "CartridgeCelite" */ '@/pages/IPD/ACT/View.vue')
const CatridgeKaolinACT = () => import(/* webpackChunkName: "CatridgeKaolinACT" */ '@/pages/IPD/CartridgeKaolinACT/View.vue')
const A03_165_061222_V = () => import(/* webpackChunkName: "A03_165_061222_V" */ '@/pages/IPD/BloodGasAnalysisEG7/View.vue')
const UploadImage = () => import(/* webpackChunkName: "UploadImage" */ '@/pages/IPD/UploadImage/View.vue')
const ProcedureSafetyChecklist = () => import(/* webpackChunkName: "ProcedureSafetyChecklist" */ '@/pages/FormLienKhoa/A02_053_OR_201022_V/View.vue')
const MultidrugResistant = () => import(/* webpackChunkName: "MultidrugResistant" */ '@/pages/FormLienKhoa/A02_006_221221_V/View.vue')

export default {
  /**
   * The name of the page.
   */
  name: 'ED-View',
  props: ['VisitId'],
  mixins: [MixinMasterData],
  data () {
    return {
      Forms: [],
      activeMenu: 0,
      formResponse: [],
      tabActive: ['TC'],
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
      readonlyview: false,
      search: '',
      loading: true
    }
  },
  /**
   * The components that the page can use.
   */
  components: {
    UploadImage,
    ConsentForTransfusionOfBlood,
    TrickSummary,
    EmergencyTriageRecord,
    FallRiskScreening,
    ER0,
    AssessmentForRetailServicePatient,
    DI0,
    StandingOrder,
    PatientProgressNote,
    StandingOrderForRetailService,
    AmbulanceRunReport,
    ArterialBloodGasTest,
    ChemicalBiologyTest,
    PFEF,
    ExternalTransportationAssessment,
    SkinTestResult,
    MortalityReport,
    MortalityReportV2,
    BloodRequestSupplyAndConfirmation,
    BloodTransfusionChecklist,
    CardiacArrestRecord,
    PatientOwnMedicationsChart,
    ConsultationDrugWithAnAsteriskMark,
    JointConsultationForApprovalOfSurgery,
    VerbalOrderForm,
    ComplexOutpatientCaseSummary,
    JointConsultationGroupMinutes,
    MCA,
    PHC,
    HandOverCheckList,
    // ProcedureSummary,
    SurgeryAndProcedureSummary,
    HighlyRestrictedAntimicrobialConsult,
    SelfHarmRiskScreeningTool,
    CareNote,
    PhysicianNote,
    MedicalReport,
    DischargeMedicalReport,
    ReferralLetter,
    EMCO,
    InjuryCertificate,
    TransferLetter,
    Discharged,
    ConsentForOperationOrrProcedure,
    RequestResuscitation,
    HIVTestingConsent,
    CartridgeCelite,
    CatridgeKaolinACT,
    A03_165_061222_V,
    ProcedureSafetyChecklist,
    MultidrugResistant
  },
  mounted () {
    this.readonlyview = this.$router.currentRoute.name === 'EDRECORD'
    // if (this.$store.state.account.Position.includes('Nurse') || this.$store.state.account.Position.includes('Doctor')) {
    //   this.activeMenu = 2
    // }
    this.getData()
  },
  computed: {
    finedForm: function () {
      this.Forms.filter(item => {
        item.UpdatedAt = this.$options.filters.formatDateWithoutSecon(item.UpdatedAt)
      })
      if (!this.search) return this.Forms
      return this.Forms.filter(item => {
        if (this.$i18n.locale === 'vi') {
          return this.mapingStr(this.xoaDau(this.search), this.xoaDau(item.ViName))
        } else {
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
        this.tabActive = this.tabActive.filter(name => name !== code)
      } else {
        if (code === 'TC') {
          this.tabActive = ['TC']
        } else {
          this.tabActive.push(code)
          this.tabActive = this.tabActive.filter(name => name !== 'TC')
        }
      }
      if (this.tabActive.length > 0) {
        if (this.tabActive.filter(name => name.includes('TC')).length > 0) {
          this.Forms = this.formResponse
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
        }
      } else {
        this.Forms = []
      }
    },
    getData () {
      new MedicalRecord().find('ED/' + (this.VisitId || this.$route.params.Id)).then(response => {
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
