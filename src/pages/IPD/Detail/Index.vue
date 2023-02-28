<template>
  <div class="main-content" id="iam-page">
    <br/>
    <h1 class="title-page">{{ __t('Chi tiết bệnh án') }} </h1>
    <br/>
    <div class="flex" style="cursor: pointer;">
      <div class="col-md-1" :class="getActiveMenu(item.Code) ? 'backColor' : ''"  @click="filterMenu(item.Code)" style="height:74px;padding: 8px;border: 0.5px solid #efefef;border-radius: 8px;" v-for="item in groupMenu" :key="item.value">{{__t(item.title)}}</div>
    </div>
    <div class="mb-10 mt-5">
      <input type="text" class="form-control" v-model="search" :placeholder="__t('Gõ để tìm tên phiếu...')"/>
    </div>
    <div v-if="loading" class="text-center"><v-loading/></div>
    <div v-else :key="index" v-for="(form, index) in finedForm" class="mb-10">
      <div v-if="form.Datas && form.Datas.length">
        <keep-alive>
          <component v-if="'DischargeAgaintsMedicalAdvice' in $options.components" :Form="form" v-bind:is="form.Type" :version="form.Datas[0].Version" :VisitType="'IPD'" :VisitId="VisitId || $route.params.Id"/>
        </keep-alive>
      </div>
    </div>
    <!-- <div v-else class="text-center"><v-loading/></div> -->
    <!-- <retail-service-patient :EdId="this.$route.params.Id" :readonlyview="readonlyview"/>
    <er0 :EdId="this.$route.params.Id" :readonlyview="readonlyview"/>
    <patient-progress-notes :VisitId="this.$route.params.Id" :Type="'ED'" :readonlyview="true"/>
    <di :EdId="this.$route.params.Id" :readonlyview="readonlyview"/> -->
  </div>
</template>
<script>
import MixinMasterData from '@/mixins/masterdata.js'
import MedicalRecordServices from '@/services/MedicalRecord.js'
const InitialAssessmentForAudult = () => import(/* webpackChunkName: "InitialAssessmentForAudult" */ '@/pages/IPD/InitialAssessment/ForAdultView.vue')
const InitialAssessmentForFrailElderly = () => import(/* webpackChunkName: "InitialAssessmentForFrailElderly" */ '@/pages/IPD/InitialAssessment/ForFrailElderlyView.vue')
const InitialAssessmentForChemotherapy = () => import(/* webpackChunkName: "InitialAssessmentForChemotherapy" */ '@/pages/IPD/InitialAssessment/ForChemotherapyView.vue')
const PFEF = () => import(/* webpackChunkName: "PFEF" */ '@/pages/PatientAndFamilyEducation/View.vue')
const PatientProgressNote = () => import(/* webpackChunkName: "PatientProgressNote" */ '@/pages/IPD/_ProgressNote/View.vue')
const CardiacArrestRecord = () => import(/* webpackChunkName: "CardiacArrestRecord" */ '@/pages/CardiacArrestRecord/View.vue')
const FallRiskAssessmentForAdult = () => import(/* webpackChunkName: "FallRiskAssessmentForAdult" */ '@/pages/IPD/FallRiskAssessment/AdultView.vue')
const FallRiskAssessmentInPediatricInpatients = () => import(/* webpackChunkName: "FallRiskAssessmentInPediatricInpatients" */ '@/pages/IPD/FallRiskAssessment/ChildView.vue')
const GlamorganScaleForScreening = () => import(/* webpackChunkName: "GlamorganScaleForScreening" */ '@/pages/IPD/GlamorganPressure/ChildView.vue')
const FallRiskAssessmentForObstetric = () => import(/* webpackChunkName: "FallRiskAssessmentForObstetric" */ '@/pages/IPD/FallRiskAssessment/ObstetricView.vue')
const PlanOfCare = () => import(/* webpackChunkName: "PlanOfCare" */ '@/pages/IPD/PlanOfCare/View.vue')
// eslint-disable-next-line const/no-duplicates
const MedicalRecord = () => import(/* webpackChunkName: "MedicalRecord" */ '@/pages/IPD/MedicalRecord/View.vue')
const GuggingSwallowingScreen = () => import(/* webpackChunkName: "GuggingSwallowingScreen" */ '@/pages/IPD/GuggingSwallowingScreen/View.vue')
const SurgeryAndProcedureSummary = () => import(/* webpackChunkName: "SurgeryAndProcedureSummary" */ '@/pages/ProcedureSummary/View.vue')
const JointConsultationGroupMinutes = () => import(/* webpackChunkName: "JointConsultationGroupMinutes" */ '@/pages/JointConsultationGroupMinutes/View.vue')
const JointConsultationForApprovalOfSurgery = () => import(/* webpackChunkName: "JointConsultationForApprovalOfSurgery" */ '@/pages/JointConsultationForApprovalOfSurgery/View.vue')
const TakeCareOfPatientsWithCovid19 = () => import(/* webpackChunkName: "TakeCareOfPatientsWithCovid19" */ '@/pages/IPD/TakeCareOfPatientsWithCovid19/View.vue')
const CareNote = () => import(/* webpackChunkName: "CareNote" */ '@/pages/IPD/TakeCareNote/View.vue')
const PhysicianNote = () => import(/* webpackChunkName: "PhysicianNote" */ '@/pages/IPD/PhysicianNote/View.vue')
const PHC = () => import(/* webpackChunkName: "PHC" */ '@/pages/ED/PreOperativeProcedureHandoverChecklists/View.vue')
const SurgicalProcedureSafetyChecklist = () => import(/* webpackChunkName: "SurgicalProcedureSafetyChecklist" */ '@/pages/OPD/SurgicalProcedureSafetyChecklist/View.vue')
// const ConsultationDrugWithAnAsteriskMark = () => import(/* webpackChunkName: "aaa" */ '@/pages/ED/ConsultationDrugWithAnAsteriskMark/View.vue')
const ConsultationDrugWithAnAsteriskMark = () => import(/* webpackChunkName: "ConsultationDrugWithAnAsteriskMark" */ '@/pages/IPD/ConsultationDrugWithAnAsteriskMarkUpForm/View.vue')
const PatientOwnMedicationsChart = () => import(/* webpackChunkName: "PatientOwnMedicationsChart" */ '@/pages/PatientOwnMedicationsChart/View.vue')
const BloodRequestSupplyAndConfirmation = () => import(/* webpackChunkName: "BloodRequestSupplyAndConfirmation" */ '@/pages/ED/BloodRequestSupplyAndConfirmation/View.vue')
const BloodTransfusionChecklist = () => import(/* webpackChunkName: "BloodTransfusionChecklist" */ '@/pages/ED/BloodTransfusionChecklist/View.vue')
const ExternalTransportationAssessment = () => import(/* webpackChunkName: "ExternalTransportationAssessment" */ '@/pages/IPD/ExternalTransportationAssessment/View.vue')
const DischargePreparationChecklist = () => import(/* webpackChunkName: "DischargePreparationChecklist" */ '@/pages/IPD/HospitalDischargeTable/View.vue')
const DischargeAgaintsMedicalAdvice = () => import(/* webpackChunkName: "DischargeAgaintsMedicalAdvice" */ '@/pages/IPD/ConfirmDischargeWithoutDirect/View.vue')
const MortalityReport = () => import(/* webpackChunkName: "MortalityReport" */ '@/pages/IPD/MortalityReport/View.vue')
const SurgeryCertificate = () => import(/* webpackChunkName: "SurgeryCertificate" */ '@/pages/IPD/SurgeryCertificate/View.vue')
const VitalSignsForAdult = () => import(/* webpackChunkName: "VitalSignsForAdult" */ '@/pages/IPD/VitalSigns/AdultVitalSigns/View.vue')
const VitalSignsForPregnantWoman = () => import(/* webpackChunkName: "VitalSignsForPregnantWoman" */ '@/pages/IPD/VitalSigns/PregnantVitalSigns/View.vue')
const NeonatalObservationChart = () => import(/* webpackChunkName: "NeonatalObservationChart" */ '@/pages/IPD/VitalSigns/NeonatalVitalSigns/View.vue')
const VitalSignFor1To3 = () => import(/* webpackChunkName: "VitalSignFor1To3" */ '@/pages/IPD/VitalSigns/Pediatric1ToUnder3Month/View.vue')
const VitalSignFor1To4 = () => import(/* webpackChunkName: "VitalSignFor1To4" */ '@/pages/IPD/VitalSigns/Pediatric1ToUnder4Old/View.vue')
const VitalSignFor3To12 = () => import(/* webpackChunkName: "VitalSignFor3To12" */ '@/pages/IPD/VitalSigns/Pediatric3To12Month/View.vue')
const VitalSignFor4To12 = () => import(/* webpackChunkName: "VitalSignFor4To12" */ '@/pages/IPD/VitalSigns/Pediatric4To12Old/View.vue')
const VitalSignForOver12 = () => import(/* webpackChunkName: "VitalSignForOver12" */ '@/pages/IPD/VitalSigns/PediatricOver12Old/View.vue')
const BradenScale = () => import(/* webpackChunkName: "BradenScale" */ '@/pages/IPD/BradenScoreboard/View.vue')
const SumaryOf15DayTreatment = () => import(/* webpackChunkName: "SumaryOf15DayTreatment" */ '@/pages/IPD/SummaryOf15DayTreatment/View.vue')
// eslint-disable-next-line const/no-duplicates
const MonitoringSheetForPatientsWith = () => import(/* webpackChunkName: "MonitoringSheetForPatientsWith" */ '@/pages/IPD/MonitorSheetForPatient/View.vue')
const MedicationHistoryForm = () => import(/* webpackChunkName: "MedicationHistoryForm" */ '@/pages/IPD/MedicationHistoryForm/View.vue')
const MedicationHistoryFormPediatricPatient = () => import(/* webpackChunkName: "MedicationHistoryFormPediatricPatient" */ '@/pages/IPD/MedicationHistoryFormForNewBorn/View.vue')
// eslint-disable-next-line const/no-duplicates
const MedicalRecordPediatric = () => import(/* webpackChunkName: "MedicalRecordPediatric" */ '@/pages/IPD/MedicalRecord/View.vue')
// eslint-disable-next-line const/no-duplicates
const MedicalRecordNeonatal = () => import(/* webpackChunkName: "MedicalRecordNeonatal" */ '@/pages/IPD/MedicalRecord/View.vue')
const MedicalReport = () => import(/* webpackChunkName: "MedicalReport" */ '@/pages/IPD/MedicalReport/View.vue')
const DischargeMedicalReport = () => import(/* webpackChunkName: "DischargeMedicalReport" */ '@/pages/IPD/DischargeMedicalReport/View.vue')
const ReferralLetter = () => import(/* webpackChunkName: "ReferralLetter" */ '@/pages/IPD/ReferralLetter/View.vue')
const InjuryCertificate = () => import(/* webpackChunkName: "InjuryCertificate" */ '@/pages/IPD/InjuryCertificate/View.vue')
const TransferLetter = () => import(/* webpackChunkName: "TransferLetter" */ '@/pages/IPD/TransferLetter/View.vue')
const HandOverCheckList = () => import(/* webpackChunkName: "HandOverCheckList" */ '@/pages/IPD/HandOverCheckList/View2.vue')
// eslint-disable-next-line const/no-duplicates
const InitialAssessmentForPediatricInPatient = () => import(/* webpackChunkName: "InitialAssessmentForPediatricInPatient" */ '@/pages/IPD/InitialAssessment/ForAdultView.vue')
const InitialAssessmentForNeonatal = () => import(/* webpackChunkName: "InitialAssessmentForNeonatal" */ '@/pages/IPD/InitialAssessment/ForNewBornView.vue')
const ThrombosisRiskFactorAssessment = () => import(/* webpackChunkName: "ThrombosisRiskFactorAssessment" */ '@/pages/IPD/ThrombosisRiskFactorAssessment/View.vue')
const ThrombosisRiskFactorAssessmentFor = () => import(/* webpackChunkName: "ThrombosisRiskFactorAssessmentFor" */ '@/pages/IPD/ThrombosisRiskFactorAssessmentForGeneralSurgeryPatients/View.vue')
const InitialAssessmentForNeonatalMaternity = () => import(/* webpackChunkName: "InitialAssessmentForNeonatalMaternity" */ '@/pages/IPD/InitialAssessment/ForNeonatalMaternity/NeonatalMaternityView.vue')
// eslint-disable-next-line camelcase
const ForUterineLife2Hours_Obstetrics = () => import(/* webpackChunkName: "ForUterineLife2Hours_Obstetrics" */ '@/pages/IPD/AssessmentOfInfantStatusDuringTheFirst2HoursOfExtrauterineLife/View.vue')
// eslint-disable-next-line camelcase, const/no-duplicates
const ForNeonatalMaternity_Obstetrics = () => import(/* webpackChunkName: "ForNeonatalMaternity_Obstetrics" */ '@/pages/IPD/InitialAssessment/ForNeonatalMaternity/NeonatalMaternityViewV2.vue')
// eslint-disable-next-line const/no-duplicates
const ForNeonatalMaternity = () => import(/* webpackChunkName: "ForNeonatalMaternity" */ '@/pages/IPD/InitialAssessment/ForNeonatalMaternity/NeonatalMaternityViewV2.vue')
// eslint-disable-next-line const/no-duplicates
const MedicalRecordObstetrics = () => import(/* webpackChunkName: "MedicalRecordObstetrics" */ '@/pages/IPD/MedicalRecord/View.vue')
const HighlyRestrictedAntimicrobialConsult = () => import(/* webpackChunkName: "HighlyRestrictedAntimicrobialConsult" */ '@/pages/HighlyRestrictedAntimicrobialConsult/View.vue')
const InitialAssessmentForPregnantWomen = () => import(/* webpackChunkName: "InitialAssessmentForPregnantWomen" */ '@/pages/IPD/InitialAssessment/ForWomenInLabourView.vue')
// eslint-disable-next-line const/no-duplicates
const MonitorSheetForPatient = () => import(/* webpackChunkName: "MonitorSheetForPatient" */ '@/pages/IPD/MonitorSheetForPatient/View.vue')
// eslint-disable-next-line const/no-duplicates
const MedicalRecordGynecological = () => import(/* webpackChunkName: "MedicalRecordGynecological" */ '@/pages/IPD/MedicalRecord/View.vue')
// eslint-disable-next-line const/no-duplicates
const MedicalRecordOncology = () => import(/* webpackChunkName: "MedicalRecordOncology" */ '@/pages/IPD/MedicalRecord/View.vue')
// eslint-disable-next-line const/no-duplicates
const A01_039_050919_V = () => import(/* webpackChunkName: "A01_039_050919_V" */ '@/pages/IPD/MedicalRecord/View.vue')
// eslint-disable-next-line const/no-duplicates
const A01_040_050919_V = () => import(/* webpackChunkName: "A01_040_050919_V" */ '@/pages/IPD/MedicalRecord/View.vue')
// eslint-disable-next-line const/no-duplicates
const TheSurgicalMedicalRecord = () => import(/* webpackChunkName: "TheSurgicalMedicalRecord" */ '@/pages/IPD/MedicalRecord/View.vue')
// eslint-disable-next-line const/no-duplicates
const MedicalRecordEye = () => import(/* webpackChunkName: "MedicalRecordEye" */ '@/pages/IPD/MedicalRecord/View.vue')
// eslint-disable-next-line const/no-duplicates
const CardiovascularForm = () => import(/* webpackChunkName: "CardiovascularForm" */ '@/pages/IPD/MedicalRecord/View.vue')
const VerbalOrderForm = () => import(/* webpackChunkName: "VerbalOrderForm" */ '@/pages/ED/EmergencyTriageRecord/OrderTableView.vue')
const CoronaryIntervention = () => import(/* webpackChunkName: "CoronaryIntervention" */ '@/pages/IPD/CoronaryIntervention/View.vue')
const Discharged = () => import(/* webpackChunkName: "Discharged" */ '@/pages/IPD/DischargeCertificate/View.vue')
const CoordinatingWithThePatient = () => import(/* webpackChunkName: "CoordinatingWithThePatient" */ '@/pages/IPD/CoordinatingWithThePatient/View.vue')
const TrickSummary = () => import(/* webpackChunkName: "TrickSummary" */ '@/pages/TrickSummary/View.vue')
const IPDScaleForAssessmentOfSuicideIntent = () => import(/* webpackChunkName: "IPDScaleForAssessmentOfSuicideIntent" */ '@/pages/IPD/ScaleForAssessmentOfSuicideIntent/View.vue')
const ArterialBloodGasTest = () => import(/* webpackChunkName: "ArterialBloodGasTest" */ '@/pages/ED/PointOfCareTesting/ArterialBloodGasTestView.vue')
const ChemicalBiologyTest = () => import(/* webpackChunkName: "ChemicalBiologyTest" */ '@/pages/ED/PointOfCareTesting/ChemicalBiologyTestView.vue')
const StandingOrder = () => import(/* webpackChunkName: "StandingOrder" */ '@/pages/StandingOrder/View.vue')
const PROMForCoronaryDisease = () => import(/* webpackChunkName: "PROMForCoronaryDisease" */ '@/pages/IPD/PromForCoronaryDisease/View.vue')
const PROMForheartFailure = () => import(/* webpackChunkName: "PROMForheartFailure" */ '@/pages/IPD/PROMForHeartFailure/View.vue')
const ConsentForOperationOrrProcedure = () => import(/* webpackChunkName: "ConsentForOperationOrrProcedure" */ '@/pages/ConsentForOperation/View.vue')
const RequestResuscitation = () => import(/* webpackChunkName: "RequestResuscitation" */ '@/pages/IPD/Consent/View.vue')
const ConsentForTransfusionOfBlood = () => import(/* webpackChunkName: "ConsentForTransfusionOfBlood" */ '@/pages/ConsentForTransfusionOfBloodAndBloodDerivedProducts/View.vue')
const HIVTestingConsent = () => import(/* webpackChunkName: "HIVTestingConsent" */ '@/pages/HIVTestingConsent/View.vue')
const CartridgeCelite = () => import(/* webpackChunkName: "CartridgeCelite" */ '@/pages/IPD/ACT/View.vue')
const A03_165_061222_V = () => import(/* webpackChunkName: "A03_165_061222_V" */ '@/pages/IPD/BloodGasAnalysisEG7/View.vue')
const IPD_A02_052_050919_V = () => import(/* webpackChunkName: "IPD_A02_052_050919_V" */ '@/pages/IPD/AskThePatientBeforeSurgery/View.vue')
const IPD_A01_159_050919_VE = () => import(/* webpackChunkName: "IPD_A01_159_050919_VE" */ '@/pages/CommitmentPaperToTakeThePlacenta/View.vue')
const CatridgeKaolinACT = () => import(/* webpackChunkName: "CatridgeKaolinACT" */ '@/pages/IPD/CartridgeKaolinACT/View.vue')
const UploadImage = () => import(/* webpackChunkName: "UploadImage" */ '@/pages/IPD/UploadImage/View.vue')
const ProcedureSafetyChecklist = () => import(/* webpackChunkName: "ProcedureSafetyChecklist" */ '@/pages/FormLienKhoa/A02_053_OR_201022_V/View.vue')
const MultidrugResistant = () => import(/* webpackChunkName: "MultidrugResistant" */ '@/pages/FormLienKhoa/A02_006_221221_V/View.vue')
// eslint-disable-next-line const/no-duplicates
export default {
  name: 'IPD-Detail',
  mixins: [MixinMasterData],
  props: ['VisitId'],
  components: {
    UploadImage,
    ForNeonatalMaternity,
    ForNeonatalMaternity_Obstetrics,
    ConsentForTransfusionOfBlood,
    StandingOrder,
    IPDScaleForAssessmentOfSuicideIntent,
    TrickSummary,
    BloodRequestSupplyAndConfirmation,
    BloodTransfusionChecklist,
    PatientOwnMedicationsChart,
    InitialAssessmentForAudult,
    InitialAssessmentForFrailElderly,
    InitialAssessmentForChemotherapy,
    PFEF,
    PatientProgressNote,
    CardiacArrestRecord,
    FallRiskAssessmentForAdult,
    FallRiskAssessmentInPediatricInpatients,
    FallRiskAssessmentForObstetric,
    PlanOfCare,
    MedicalRecord,
    GuggingSwallowingScreen,
    // ProcedureSummary,
    SurgeryAndProcedureSummary,
    JointConsultationForApprovalOfSurgery,
    JointConsultationGroupMinutes,
    TakeCareOfPatientsWithCovid19,
    CareNote,
    PhysicianNote,
    PHC,
    ConsultationDrugWithAnAsteriskMark,
    SurgicalProcedureSafetyChecklist,
    ExternalTransportationAssessment,
    DischargePreparationChecklist,
    DischargeAgaintsMedicalAdvice,
    MortalityReport,
    VitalSignsForAdult,
    VitalSignsForPregnantWoman,
    NeonatalObservationChart,
    VitalSignFor1To3,
    VitalSignFor1To4,
    VitalSignFor3To12,
    VitalSignFor4To12,
    VitalSignForOver12,
    BradenScale,
    SurgeryCertificate,
    SumaryOf15DayTreatment,
    MedicationHistoryForm,
    MedicalRecordPediatric,
    DischargeMedicalReport,
    ReferralLetter,
    InjuryCertificate,
    TransferLetter,
    MedicalReport,
    HandOverCheckList,
    InitialAssessmentForPediatricInPatient,
    MedicalRecordNeonatal,
    InitialAssessmentForNeonatal,
    ThrombosisRiskFactorAssessment,
    ThrombosisRiskFactorAssessmentFor,
    InitialAssessmentForNeonatalMaternity,
    ForUterineLife2Hours_Obstetrics,
    MedicalRecordObstetrics,
    HighlyRestrictedAntimicrobialConsult,
    InitialAssessmentForPregnantWomen,
    MonitorSheetForPatient,
    MedicalRecordGynecological,
    MonitoringSheetForPatientsWith,
    TheSurgicalMedicalRecord,
    VerbalOrderForm,
    MedicalRecordOncology,
    CoronaryIntervention,
    A01_039_050919_V,
    A01_040_050919_V,
    MedicalRecordEye,
    GlamorganScaleForScreening,
    Discharged,
    CoordinatingWithThePatient,
    MedicationHistoryFormPediatricPatient,
    ArterialBloodGasTest,
    ChemicalBiologyTest,
    PROMForCoronaryDisease,
    PROMForheartFailure,
    CardiovascularForm,
    ConsentForOperationOrrProcedure,
    RequestResuscitation,
    HIVTestingConsent,
    A03_165_061222_V,
    CartridgeCelite,
    IPD_A02_052_050919_V,
    IPD_A01_159_050919_VE,
    CatridgeKaolinACT,
    ProcedureSafetyChecklist,
    MultidrugResistant
  },
  data () {
    return {
      itemActive: 0,
      isClick: false,
      activeMenu: 55,
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
      Forms: [
      ],
      tabActive: ['TC'],
      readonlyview: false,
      search: '',
      loading: true
    }
  },
  mounted () {
    this.readonlyview = true
    this.getData()
    // if (this.$store.state.account.Position.includes('Nurse') || this.$store.state.account.Position.includes('Doctor')) {
    //   this.activeMenu = 2
    // }
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
    filterMenu (code) {
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
      new MedicalRecordServices().find('IPD/' + (this.VisitId || this.$route.params.Id)).then(response => {
        this.Forms = response
        this.Forms.map(e => {
          if (e.Type === 'CardiovascularForm') {
            e.ViName = 'Bệnh án tim mạch'
            e.EnName = 'Cardiology medical record for inpatient'
          }
        })
        this.Forms = this.Forms.sort(function (a, b) {
          let c = new Date(a.UpdatedAt)
          let d = new Date(b.UpdatedAt)
          return d - c
        })
        this.formResponse = response
        this.getMasterDatas({Form: 'NHOMBIEUMAU'}, () => {
        })
        this.loading = false
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
