<template>
  <div class="main-content">
    <div :key="index" v-for="(form, index) in $options.components" class="mb-10">
      <component v-if="form.Type === Type" :Form="form" v-bind:is="form.Type" :VisitType="'IPD'" :VisitId="VisitId"/>
    </div>
  </div>
</template>
<script>
// eslint-disable-next-line const/no-duplicates
const InitialAssessmentForAudult = () => import(/* webpackChunkName: "InitialAssessmentForAudult" */ '@/pages/IPD/InitialAssessment/ForAdultView.vue')
const InitialAssessmentForFrailElderly = () => import(/* webpackChunkName: "InitialAssessmentForFrailElderly" */ '@/pages/IPD/InitialAssessment/ForFrailElderlyView.vue')
const InitialAssessmentForChemotherapy = () => import(/* webpackChunkName: "InitialAssessmentForChemotherapy" */ '@/pages/IPD/InitialAssessment/ForChemotherapyView.vue')
const PFEF = () => import(/* webpackChunkName: "PFEF" */ '@/pages/PatientAndFamilyEducation/View.vue')
const PatientProgressNote = () => import(/* webpackChunkName: "PatientProgressNote" */ '@/pages/ProgressNote/View.vue')
const CardiacArrestRecord = () => import(/* webpackChunkName: "CardiacArrestRecord" */ '@/pages/CardiacArrestRecord/View.vue')
// eslint-disable-next-line const/no-duplicates
const FallRiskAssessmentForAdult = () => import(/* webpackChunkName: "FallRiskAssessmentForAdult" */ '@/pages/IPD/FallRiskAssessment/AdultView.vue')
// eslint-disable-next-line const/no-duplicates
const FallRiskAssessmentInPediatricInpatients = () => import(/* webpackChunkName: "FallRiskAssessmentInPediatricInpatients" */ '@/pages/IPD/FallRiskAssessment/ChildView.vue')
const GlamorganScaleForScreening = () => import(/* webpackChunkName: "GlamorganScaleForScreening" */ '@/pages/IPD/GlamorganPressure/ChildView.vue')
const FallRiskAssessmentForObstetric = () => import(/* webpackChunkName: "FallRiskAssessmentForObstetric" */ '@/pages/IPD/FallRiskAssessment/ObstetricView.vue')
const PlanOfCare = () => import(/* webpackChunkName: "PlanOfCare" */ '@/pages/IPD/PlanOfCare/View.vue')
// eslint-disable-next-line const/no-duplicates
const MedicalRecord = () => import(/* webpackChunkName: "MedicalRecord" */ '@/pages/IPD/MedicalRecord/View.vue')
const GuggingSwallowingScreen = () => import(/* webpackChunkName: "GuggingSwallowingScreen" */ '@/pages/IPD/GuggingSwallowingScreen/View.vue')
const ProcedureSummary = () => import(/* webpackChunkName: "ProcedureSummary" */ '@/pages/ProcedureSummary/View.vue')
const JointConsultationGroupMinutes = () => import(/* webpackChunkName: "JointConsultationGroupMinutes" */ '@/pages/JointConsultationGroupMinutes/View.vue')
const JointConsultationForApprovalOfSurgery = () => import(/* webpackChunkName: "JointConsultationForApprovalOfSurgery" */ '@/pages/JointConsultationForApprovalOfSurgery/View.vue')
const TakeCareOfPatientsWithCovid19 = () => import(/* webpackChunkName: "TakeCareOfPatientsWithCovid19" */ '@/pages/IPD/TakeCareOfPatientsWithCovid19/View.vue')
const CareNote = () => import(/* webpackChunkName: "CareNote" */ '@/pages/IPD/TakeCareNote/View.vue')
const PhysicianNote = () => import(/* webpackChunkName: "PhysicianNote" */ '@/pages/IPD/PhysicianNote/View.vue')
const PHC = () => import(/* webpackChunkName: "PHC" */ '@/pages/ED/PreOperativeProcedureHandoverChecklists/View.vue')
const SurgicalProcedureSafetyChecklist = () => import(/* webpackChunkName: "SurgicalProcedureSafetyChecklist" */ '@/pages/OPD/SurgicalProcedureSafetyChecklist/View.vue')
// const ConsultationDrugWithAnAsteriskMark = () => import(/* webpackChunkName: "InitialAssessmentForAudult" */ '@/pages/ED/ConsultationDrugWithAnAsteriskMark/View.vue')
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
const VerbalOrderForm = () => import(/* webpackChunkName: "VerbalOrderForm" */ '@/pages/ED/EmergencyTriageRecord/OrderTableView.vue')
const CoronaryIntervention = () => import(/* webpackChunkName: "CoronaryIntervention" */ '@/pages/IPD/CoronaryIntervention/View.vue')
const Discharged = () => import(/* webpackChunkName: "Discharged" */ '@/pages/IPD/DischargeCertificate/View.vue')
const CoordinatingWithThePatient = () => import(/* webpackChunkName: "CoordinatingWithThePatient" */ '@/pages/IPD/CoordinatingWithThePatient/View.vue')
const TrickSummary = () => import(/* webpackChunkName: "TrickSummary" */ '@/pages/TrickSummary/View.vue')
const IPDScaleForAssessmentOfSuicideIntent = () => import(/* webpackChunkName: "IPDScaleForAssessmentOfSuicideIntent" */ '@/pages/IPD/ScaleForAssessmentOfSuicideIntent/View.vue')
const ArterialBloodGasTest = () => import(/* webpackChunkName: "ArterialBloodGasTest" */ '@/pages/ED/PointOfCareTesting/ArterialBloodGasTestView.vue')
const ConsentForTransfusionOfBlood = () => import(/* webpackChunkName: "ConsentForTransfusionOfBlood" */ '@/pages/ConsentForTransfusionOfBloodAndBloodDerivedProducts/View.vue')

export default {
  /**
   * The name of the page.
   */
  name: 'IPD-DetailV2',
  props: ['VisitId', 'Type', 'VisitType'],
  components: {
    ConsentForTransfusionOfBlood,
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
    ProcedureSummary,
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
    ArterialBloodGasTest
    // DischargeAdultVitalSigns
  },
  data () {
    return {
    }
  },
  mounted () {
  },
  computed: {
  },
  methods: {
  }
}
</script>
