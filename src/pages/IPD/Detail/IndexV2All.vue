<template>
  <div class="main-content">
    <div :key="index" v-for="(form, index) in $options.components" class="mb-10">
      <keep-alive>
        <component v-if="form.name === Type" :FormV2="FormV2" :Form="form" v-bind:is="Type" :VisitType="VisitType" :VisitId="VisitId"/>
      </keep-alive>
    </div>
  </div>
</template>
<script>
// ipd
const IPDInitialAssessmentForAudult = () => import(/* webpackChunkName: "IPDInitialAssessmentForAudult" */ '@/pages/IPD/InitialAssessment/ForAdultViewV2.vue')
const IPDInitialAssessmentForFrailElderly = () => import(/* webpackChunkName: "IPDInitialAssessmentForFrailElderly" */ '@/pages/IPD/InitialAssessment/ForFrailElderlyView.vue')
const IPDInitialAssessmentForChemotherapy = () => import(/* webpackChunkName: "IPDInitialAssessmentForChemotherapy" */ '@/pages/IPD/InitialAssessment/ForChemotherapyView.vue')
const IPDPFEF = () => import(/* webpackChunkName: "IPDPFEF" */ '@/pages/PatientAndFamilyEducation/View.vue')
const EDPFEF = () => import(/* webpackChunkName: "EDPFEF" */ '@/pages/PatientAndFamilyEducation/ViewED.vue')
const EOCPFEF = () => import(/* webpackChunkName: "EOCPFEF" */ '@/pages/PatientAndFamilyEducation/ViewEOC.vue')
const OPDPFEF = () => import(/* webpackChunkName: "OPDPFEF" */ '@/pages/PatientAndFamilyEducation/ViewOPD.vue')
const IPDPatientProgressNote = () => import(/* webpackChunkName: "IPDPatientProgressNote" */ '@/pages/IPD/_ProgressNote/View.vue')
const IPDCardiacArrestRecord = () => import(/* webpackChunkName: "IPDCardiacArrestRecord" */ '@/pages/CardiacArrestRecord/View.vue')
const IPDFallRiskAssessmentForAdult = () => import(/* webpackChunkName: "IPDFallRiskAssessmentForAdult" */ '@/pages/IPD/FallRiskAssessment/AdultView.vue')
const IPDFallRiskAssessmentInPediatricInpatients = () => import(/* webpackChunkName: "IPDFallRiskAssessmentInPediatricInpatients" */ '@/pages/IPD/FallRiskAssessment/ChildView.vue')
const IPDGlamorganScaleForScreening = () => import(/* webpackChunkName: "IPDGlamorganScaleForScreening" */ '@/pages/IPD/GlamorganPressure/ChildView.vue')
const IPDFallRiskAssessmentForObstetric = () => import(/* webpackChunkName: "IPDFallRiskAssessmentForObstetric" */ '@/pages/IPD/FallRiskAssessment/ObstetricView.vue')
const IPDPlanOfCare = () => import(/* webpackChunkName: "IPDPlanOfCare" */ '@/pages/IPD/PlanOfCare/View.vue')
const IPDMedicalRecord = () => import(/* webpackChunkName: "IPDMedicalRecord" */ '@/pages/IPD/MedicalRecord/BANoiKhoaViewV2.vue')
const IPDGuggingSwallowingScreen = () => import(/* webpackChunkName: "IPDGuggingSwallowingScreen" */ '@/pages/IPD/GuggingSwallowingScreen/View.vue')
const IPDJointConsultationGroupMinutes = () => import(/* webpackChunkName: "IPDJointConsultationGroupMinutes" */ '@/pages/JointConsultationGroupMinutes/View.vue')
const EDJointConsultationGroupMinutes = () => import(/* webpackChunkName: "EDJointConsultationGroupMinutes" */ '@/pages/JointConsultationGroupMinutes/ViewED.vue')
const EOCJointConsultationGroupMinutes = () => import(/* webpackChunkName: "EOCJointConsultationGroupMinutes" */ '@/pages/JointConsultationGroupMinutes/ViewEOC.vue')
const OPDJointConsultationGroupMinutes = () => import(/* webpackChunkName: "OPDJointConsultationGroupMinutes" */ '@/pages/JointConsultationGroupMinutes/ViewOPD.vue')
const IPDJointConsultationForApprovalOfSurgery = () => import(/* webpackChunkName: "IPDJointConsultationForApprovalOfSurgery" */ '@/pages/JointConsultationForApprovalOfSurgery/View.vue')
const EDJointConsultationForApprovalOfSurgery = () => import(/* webpackChunkName: "EDJointConsultationForApprovalOfSurgery" */ '@/pages/JointConsultationForApprovalOfSurgery/ViewED.vue')
const EOCJointConsultationForApprovalOfSurgery = () => import(/* webpackChunkName: "EOCJointConsultationForApprovalOfSurgery" */ '@/pages/JointConsultationForApprovalOfSurgery/ViewEOC.vue')
const OPDJointConsultationForApprovalOfSurgery = () => import(/* webpackChunkName: "OPDJointConsultationForApprovalOfSurgery" */ '@/pages/JointConsultationForApprovalOfSurgery/ViewOPD.vue')
const IPDTakeCareOfPatientsWithCovid19 = () => import(/* webpackChunkName: "IPDTakeCareOfPatientsWithCovid19" */ '@/pages/IPD/TakeCareOfPatientsWithCovid19/View.vue')
const IPDCareNote = () => import(/* webpackChunkName: "IPDCareNote" */ '@/pages/IPD/TakeCareNote/View.vue')
const EDCareNote = () => import(/* webpackChunkName: "IPDCareNote" */ '@/pages/TakeCareNote/View.vue')
const IPDPhysicianNote = () => import(/* webpackChunkName: "IPDPhysicianNote" */ '@/pages/IPD/PhysicianNote/View.vue')
const EDPhysicianNote = () => import(/* webpackChunkName: "EDPhysicianNote" */ '@/pages/PhysicianNote/View.vue')
const IPDPHC = () => import(/* webpackChunkName: "IPDPHC" */ '@/pages/ED/PreOperativeProcedureHandoverChecklists/View.vue')
const EDPHC = () => import(/* webpackChunkName: "EDPHC" */ '@/pages/ED/PreOperativeProcedureHandoverChecklists/ViewED.vue')
const EOCPHC = () => import(/* webpackChunkName: "EOCPHC" */ '@/pages/ED/PreOperativeProcedureHandoverChecklists/ViewEOC.vue')
const OPDPHC = () => import(/* webpackChunkName: "OPDPHC" */ '@/pages/ED/PreOperativeProcedureHandoverChecklists/ViewOPD.vue')
const IPDSurgicalProcedureSafetyChecklist = () => import(/* webpackChunkName: "IPDSurgicalProcedureSafetyChecklist" */ '@/pages/OPD/SurgicalProcedureSafetyChecklist/View.vue')
const EOCSurgicalProcedureSafetyChecklist = () => import(/* webpackChunkName: "EOCSurgicalProcedureSafetyChecklist" */ '@/pages/OPD/SurgicalProcedureSafetyChecklist/ViewEOC.vue')
const OPDSurgicalProcedureSafetyChecklist = () => import(/* webpackChunkName: "OPDSurgicalProcedureSafetyChecklist" */ '@/pages/OPD/SurgicalProcedureSafetyChecklist/ViewOPD.vue')
const IPDPatientOwnMedicationsChart = () => import(/* webpackChunkName: "IPDPatientOwnMedicationsChart" */ '@/pages/PatientOwnMedicationsChart/View.vue')
const EDPatientOwnMedicationsChart = () => import(/* webpackChunkName: "EDPatientOwnMedicationsChart" */ '@/pages/PatientOwnMedicationsChart/ViewED.vue')
const IPDBloodRequestSupplyAndConfirmation = () => import(/* webpackChunkName: "IPDBloodRequestSupplyAndConfirmation" */ '@/pages/ED/BloodRequestSupplyAndConfirmation/View.vue')
const EDBloodRequestSupplyAndConfirmation = () => import(/* webpackChunkName: "EDBloodRequestSupplyAndConfirmation" */ '@/pages/ED/BloodRequestSupplyAndConfirmation/ViewED.vue')
const IPDExternalTransportationAssessment = () => import(/* webpackChunkName: "IPDExternalTransportationAssessment" */ '@/pages/IPD/ExternalTransportationAssessment/View.vue')
const EDExternalTransportationAssessment = () => import(/* webpackChunkName: "EDExternalTransportationAssessment" */ '@/pages/IPD/ExternalTransportationAssessment/ViewED.vue')
const IPDDischargePreparationChecklist = () => import(/* webpackChunkName: "IPDDischargePreparationChecklist" */ '@/pages/IPD/HospitalDischargeTable/View.vue')
const IPDDischargeAgaintsMedicalAdvice = () => import(/* webpackChunkName: "IPDDischargeAgaintsMedicalAdvice" */ '@/pages/IPD/ConfirmDischargeWithoutDirect/View.vue')
const IPDMortalityReport = () => import(/* webpackChunkName: "IPDMortalityReport" */ '@/pages/IPD/MortalityReport/View.vue')
const IPDSurgeryCertificate = () => import(/* webpackChunkName: "IPDSurgeryCertificate" */ '@/pages/IPD/SurgeryCertificate/View.vue')
const IPDVitalSignsForAdult = () => import(/* webpackChunkName: "IPDVitalSignsForAdult" */ '@/pages/IPD/VitalSigns/AdultVitalSigns/View.vue')
const IPDVitalSignsForPregnantWoman = () => import(/* webpackChunkName: "IPDVitalSignsForPregnantWoman" */ '@/pages/IPD/VitalSigns/PregnantVitalSigns/View.vue')
const IPDNeonatalObservationChart = () => import(/* webpackChunkName: "IPDNeonatalObservationChart" */ '@/pages/IPD/VitalSigns/NeonatalVitalSigns/View.vue')
const IPDVitalSignFor1To3 = () => import(/* webpackChunkName: "IPDVitalSignFor1To3" */ '@/pages/IPD/VitalSigns/Pediatric1ToUnder3Month/View.vue')
const IPDVitalSignFor1To4 = () => import(/* webpackChunkName: "IPDVitalSignFor1To4" */ '@/pages/IPD/VitalSigns/Pediatric1ToUnder4Old/View.vue')
const IPDVitalSignFor3To12 = () => import(/* webpackChunkName: "IPDVitalSignFor3To12" */ '@/pages/IPD/VitalSigns/Pediatric3To12Month/View.vue')
const IPDVitalSignFor4To12 = () => import(/* webpackChunkName: "IPDVitalSignFor4To12" */ '@/pages/IPD/VitalSigns/Pediatric4To12Old/View.vue')
const IPDVitalSignForOver12 = () => import(/* webpackChunkName: "IPDVitalSignForOver12" */ '@/pages/IPD/VitalSigns/PediatricOver12Old/View.vue')
const IPDBradenScale = () => import(/* webpackChunkName: "IPDBradenScale" */ '@/pages/IPD/BradenScoreboard/View.vue')
const IPDSumaryOf15DayTreatment = () => import(/* webpackChunkName: "IPDSumaryOf15DayTreatment" */ '@/pages/IPD/SummaryOf15DayTreatment/View.vue')
const IPDMonitoringSheetForPatientsWith = () => import(/* webpackChunkName: "IPDMonitoringSheetForPatientsWith" */ '@/pages/IPD/MonitorSheetForPatient/View.vue')
const IPDMedicationHistoryForm = () => import(/* webpackChunkName: "IPDMedicationHistoryForm" */ '@/pages/IPD/MedicationHistoryForm/View.vue')
const IPDMedicationHistoryFormPediatricPatient = () => import(/* webpackChunkName: "IPDMedicationHistoryFormPediatricPatient" */ '@/pages/IPD/MedicationHistoryFormForNewBorn/View.vue')
const IPDMedicalReport = () => import(/* webpackChunkName: "IPDMedicalReport" */ '@/pages/IPD/MedicalReport/ViewIPD.vue')
const OPDMedicalReport = () => import(/* webpackChunkName: "OPDMedicalReport" */ '@/pages/OPD/MedicalReport/BCYTOPD.vue')
const EDMedicalReport = () => import(/* webpackChunkName: "EDMedicalReport" */ '@/pages/ED/MedicalReport/BCYTED.vue')
const IPDDischargeMedicalReport = () => import(/* webpackChunkName: "IPDDischargeMedicalReport" */ '@/pages/IPD/DischargeMedicalReport/View.vue')
const EDDischargeMedicalReport = () => import(/* webpackChunkName: "EDDischargeMedicalReport" */ '@/pages/ED/DischargeMedicalReport/View.vue')
const IPDReferralLetter = () => import(/* webpackChunkName: "IPDReferralLetter" */ '@/pages/IPD/ReferralLetter/View.vue')
const IPDInjuryCertificate = () => import(/* webpackChunkName: "IPDInjuryCertificate" */ '@/pages/IPD/InjuryCertificate/View.vue')
const IPDTransferLetter = () => import(/* webpackChunkName: "IPDTransferLetter" */ '@/pages/IPD/TransferLetter/View.vue')
const IPDHandOverCheckList = () => import(/* webpackChunkName: "IPDHandOverCheckList" */ '@/pages/IPD/HandOverCheckList/View2.vue')
const IPDInitialAssessmentForPediatricInPatient = () => import(/* webpackChunkName: "IPDInitialAssessmentForPediatricInPatient" */ '@/pages/IPD/InitialAssessment/ForChildViewV2.vue')
const IPDInitialAssessmentForNeonatal = () => import(/* webpackChunkName: "IPDInitialAssessmentForNeonatal" */ '@/pages/IPD/InitialAssessment/ForNewBornView.vue')
const IPDThrombosisRiskFactorAssessment = () => import(/* webpackChunkName: "IPDThrombosisRiskFactorAssessment" */ '@/pages/IPD/ThrombosisRiskFactorAssessment/View.vue')
const IPDThrombosisRiskFactorAssessmentFor = () => import(/* webpackChunkName: "IPDThrombosisRiskFactorAssessmentFor" */ '@/pages/IPD/ThrombosisRiskFactorAssessmentForGeneralSurgeryPatients/View.vue')
const IPDInitialAssessmentForNeonatalMaternity = () => import(/* webpackChunkName: "IPDInitialAssessmentForNeonatalMaternity" */ '@/pages/IPD/InitialAssessment/ForNeonatalMaternity/NeonatalMaternityView.vue')
const IPDInitialAssessmentForPregnantWomen = () => import(/* webpackChunkName: "IPDInitialAssessmentForPregnantWomen" */ '@/pages/IPD/InitialAssessment/ForWomenInLabourView.vue')
const IPDTheSurgicalMedicalRecord = () => import(/* webpackChunkName: "IPDTheSurgicalMedicalRecord" */ '@/pages/IPD/MedicalRecord/BANKView.vue')
const IPDMedicalRecordEye = () => import(/* webpackChunkName: "IPDMedicalRecordEye" */ '@/pages/IPD/MedicalRecord/BAMatView.vue')
const IPDCardiovascularForm = () => import(/* webpackChunkName: "IPDCardiovascularForm" */ '@/pages/IPD/MedicalRecord/BMTMView.vue')
const IPDVerbalOrderForm = () => import(/* webpackChunkName: "IPDVerbalOrderForm" */ '@/pages/ED/EmergencyTriageRecord/OrderTableView.vue')
const IPDCoronaryIntervention = () => import(/* webpackChunkName: "IPDCoronaryIntervention" */ '@/pages/IPD/CoronaryIntervention/View.vue')
const IPDDischarged = () => import(/* webpackChunkName: "IPDDischarged" */ '@/pages/IPD/DischargeCertificate/View.vue')
const EDDischarged = () => import(/* webpackChunkName: "EDDischarged" */ '@/pages/ED/DischargeCertificate/View.vue')
const IPDCoordinatingWithThePatient = () => import(/* webpackChunkName: "IPDCoordinatingWithThePatient" */ '@/pages/IPD/CoordinatingWithThePatient/View.vue')
const OPDCoordinatingWithThePatient = () => import(/* webpackChunkName: "OPDCoordinatingWithThePatient" */ '@/pages/OPD/CoordinatingWithThePatient/View.vue')
const IPDIPDScaleForAssessmentOfSuicideIntent = () => import(/* webpackChunkName: "IPDIPDScaleForAssessmentOfSuicideIntent" */ '@/pages/IPD/ScaleForAssessmentOfSuicideIntent/View.vue')
const IPDArterialBloodGasTest = () => import(/* webpackChunkName: "IPDArterialBloodGasTest" */ '@/pages/ED/PointOfCareTesting/ArterialBloodGasTestView.vue')
const EDArterialBloodGasTest = () => import(/* webpackChunkName: "EDArterialBloodGasTest" */ '@/pages/ED/PointOfCareTesting/ArterialBloodGasTestViewED.vue')
const IPDChemicalBiologyTest = () => import(/* webpackChunkName: "IPDChemicalBiologyTest" */ '@/pages/ED/PointOfCareTesting/ChemicalBiologyTestView.vue')
const EDChemicalBiologyTest = () => import(/* webpackChunkName: "EDChemicalBiologyTest" */ '@/pages/ED/PointOfCareTesting/ChemicalBiologyTestViewED.vue')
const IPDPROMForheartFailure = () => import(/* webpackChunkName: "IPDPROMForheartFailure" */ '@/pages/IPD/PROMForHeartFailure/View.vue')
const OPDPROMForheartFailure = () => import(/* webpackChunkName: "OPDPROMForheartFailure" */ '@/pages/IPD/PROMForHeartFailure/ViewOPD.vue')
const IPDPROMForCoronaryDisease = () => import(/* webpackChunkName: "IPDPROMForCoronaryDisease" */ '@/pages/IPD/PromForCoronaryDisease/View.vue')
const OPDPROMForCoronaryDisease = () => import(/* webpackChunkName: "OPDPROMForCoronaryDisease" */ '@/pages/IPD/PromForCoronaryDisease/ViewOPD.vue')
const IPDMedicalRecordObstetrics = () => import(/* webpackChunkName: "IPDMedicalRecordObstetrics" */ '@/pages/IPD/MedicalRecord/BASANKHOAView.vue')
const IPDMedicalRecordGynecological = () => import(/* webpackChunkName: "IPDMedicalRecordGynecological" */ '@/pages/IPD/MedicalRecord/BAPKView.vue')
const IPDMedicalRecordPediatric = () => import(/* webpackChunkName: "IPDMedicalRecordPediatric" */ '@/pages/IPD/MedicalRecord/BANHIKHOAView.vue')
const IPDMedicalRecordNeonatal = () => import(/* webpackChunkName: "IPDMedicalRecordNeonatal" */ '@/pages/IPD/MedicalRecord/BASoSinhView.vue')
const IPDA01_039_050919_V = () => import(/* webpackChunkName: "IPDA01_039_050919_V" */ '@/pages/IPD/MedicalRecord/BATMHView.vue')
const IPDA01_040_050919_V = () => import(/* webpackChunkName: "IPDA01_040_050919_V" */ '@/pages/IPD/MedicalRecord/BARHMView.vue')
const IPDMedicalRecordOncology = () => import(/* webpackChunkName: "IPDMedicalRecordOncology" */ '@/pages/IPD/MedicalRecord/ViewBAUngBuou.vue')
const IPDConsentForOperationOrrProcedure = () => import(/* webpackChunkName: "IPDConsentForOperationOrrProcedure" */ '@/pages/ConsentForOperation/View.vue')
const EDConsentForOperationOrrProcedure = () => import(/* webpackChunkName: "EDConsentForOperationOrrProcedure" */ '@/pages/ConsentForOperation/ViewED.vue')
const EOCConsentForOperationOrrProcedure = () => import(/* webpackChunkName: "EOCConsentForOperationOrrProcedure" */ '@/pages/ConsentForOperation/ViewEOC.vue')
const OPDConsentForOperationOrrProcedure = () => import(/* webpackChunkName: "OPDConsentForOperationOrrProcedure" */ '@/pages/ConsentForOperation/ViewOPD.vue')
const IPDRequestResuscitation = () => import(/* webpackChunkName: "IPDRequestResuscitation" */ '@/pages/IPD/Consent/View.vue')
const EDRequestResuscitation = () => import(/* webpackChunkName: "EDRequestResuscitation" */ '@/pages/IPD/Consent/ViewED.vue')
const EOCRequestResuscitation = () => import(/* webpackChunkName: "EOCRequestResuscitation" */ '@/pages/IPD/Consent/ViewEOC.vue')
const OPDRequestResuscitation = () => import(/* webpackChunkName: "OPDRequestResuscitation" */ '@/pages/IPD/Consent/ViewOPD.vue')
const IPDHIVTestingConsent = () => import(/* webpackChunkName: "IPDHIVTestingConsent" */ '@/pages/HIVTestingConsent/View.vue')
const EDHIVTestingConsent = () => import(/* webpackChunkName: "EDHIVTestingConsent" */ '@/pages/HIVTestingConsent/ViewED.vue')
const EOCHIVTestingConsent = () => import(/* webpackChunkName: "EOCHIVTestingConsent" */ '@/pages/HIVTestingConsent/ViewEOC.vue')
const OPDHIVTestingConsent = () => import(/* webpackChunkName: "OPDHIVTestingConsent" */ '@/pages/HIVTestingConsent/ViewOPD.vue')
const IPDCartridgeCelite = () => import(/* webpackChunkName: "IPDCartridgeCelite" */ '@/pages/IPD/ACT/View.vue')
const EDCartridgeCelite = () => import(/* webpackChunkName: "EDCartridgeCelite" */ '@/pages/IPD/ACT/ViewED.vue')
const IPDA03_165_061222_V = () => import(/* webpackChunkName: "IPDA03_165_061222_V" */ '@/components/IPD/BloodGasAnalysisEG7/ViewIPD.vue')
const IPDHighlyRestrictedAntimicrobialConsult = () => import(/* webpackChunkName: "IPDHighlyRestrictedAntimicrobialConsult" */ '@/pages/HighlyRestrictedAntimicrobialConsult/View.vue')
const IPDConsultationDrugWithAnAsteriskMark = () => import(/* webpackChunkName: "IPDConsultationDrugWithAnAsteriskMark" */ '@/pages/IPD/ConsultationDrugWithAnAsteriskMarkUpForm/View.vue')
const IPDTrickSummary = () => import(/* webpackChunkName: "IPDTrickSummary" */ '@/pages/TrickSummary/View.vue')
const IPDBloodTransfusionChecklist = () => import(/* webpackChunkName: "IPDBloodTransfusionChecklist" */ '@/pages/ED/BloodTransfusionChecklist/View.vue')
const IPDSurgeryAndProcedureSummary = () => import(/* webpackChunkName: "IPDSurgeryAndProcedureSummary" */ '@/pages/ProcedureSummary/View.vue')
const IPDConsentForTransfusionOfBlood = () => import(/* webpackChunkName: "IPDConsentForTransfusionOfBlood" */ '@/pages/ConsentForTransfusionOfBloodAndBloodDerivedProducts/ViewIPD.vue')
// opd
const OPDInitialAssessmentForShortTerm = () => import(/* webpackChunkName: "OPDInitialAssessmentForShortTerm" */ '@/components/OPD/ForShortTerm.vue')
const EOCInitialAssessmentForShortTerm = () => import(/* webpackChunkName: "EOCInitialAssessmentForShortTerm" */ '@/components/EOC/ForShortTerm.vue')
const OPDInitialAssessmentForOnGoing = () => import(/* webpackChunkName: "OPDInitialAssessmentForOnGoing" */ '@/components/OPD/ForOnGoing.vue')
const EOCInitialAssessmentForOnGoing = () => import(/* webpackChunkName: "EOCInitialAssessmentForOnGoing" */ '@/components/EOC/ForOnGoing.vue')
const OPDFallRiskScreening = () => import(/* webpackChunkName: "OPDFallRiskScreening" */ '@/pages/OPD/InitialAssessment/FallRiskScreening/View.vue')
const EOCFallRiskScreening = () => import(/* webpackChunkName: "EOCFallRiskScreening" */ '@/pages/EOC/InitialAssessment/FallRiskScreening/View.vue')
const OPDInitialAssessmentForTelehealth = () => import(/* webpackChunkName: "OPDInitialAssessmentForTelehealth" */ '@/components/OPD/Telehealth.vue')
const OPDOutpatientExaminationNote = () => import(/* webpackChunkName: "OPDOutpatientExaminationNote" */ '@/components/OPD/OutpatientExaminationNote.vue')
const OPDTelehealthExaminationNote = () => import(/* webpackChunkName: "OPDTelehealthExaminationNote" */ '@/components/OPD/TelehealthExaminationNote.vue')
const EOCOutpatientExaminationNote = () => import(/* webpackChunkName: "EOCOutpatientExaminationNote" */ '@/components/EOC/OutpatientExaminationNote.vue')
const OPDHandOverCheckList = () => import(/* webpackChunkName: "OPDHandOverCheckList" */ '@/pages/OPD/HandOverCheckList/ViewOnly.vue')
const EDHandOverCheckList = () => import(/* webpackChunkName: "EDHandOverCheckList" */ '@/pages/ED/HandOverCheckList/ViewOnly.vue')
const EDCardiacArrestRecord = () => import(/* webpackChunkName: "EDCardiacArrestRecord" */ '@/pages/CardiacArrestRecord/ViewED.vue')
const OPDPatientProgressNote = () => import(/* webpackChunkName: "OPDPatientProgressNote" */ '@/pages/OPD/ProgressNote/View.vue')
const EDSkinTestResult = () => import(/* webpackChunkName: "EDSkinTestResult" */ '@/pages/ED/SkinTestResult/View.vue')
const EOCSkinTestResult = () => import(/* webpackChunkName: "EOCSkinTestResult" */ '@/pages/ED/SkinTestResult/ViewEOC.vue')
const OPDSkinTestResult = () => import(/* webpackChunkName: "OPDSkinTestResult" */ '@/pages/ED/SkinTestResult/ViewOPD.vue')
const EDAssessmentForRetailServicePatient = () => import(/* webpackChunkName: "EDAssessmentForRetailServicePatient" */ '@/pages/RetailService/AssessmentView.vue')
const OPDAssessmentForRetailServicePatient = () => import(/* webpackChunkName: "OPDAssessmentForRetailServicePatient" */ '@/pages/RetailService/AssessmentViewOPD.vue')
const EOCMedicalReport = () => import(/* webpackChunkName: "EOCMedicalReport" */ '@/pages/EOC/Documents/MedicalReport/BCYTEOC.vue')
const OPDReferralLetter = () => import(/* webpackChunkName: "OPDReferralLetter" */ '@/pages/OPD/ReferralLetter/View.vue')
const OPDTransferLetter = () => import(/* webpackChunkName: "OPDTransferLetter" */ '@/pages/OPD/TransferLetter/View.vue')
const OPDNCCNBROV1 = () => import(/* webpackChunkName: "OPDNCCNBROV1" */ '@/pages/OPD/NCCNBROV1/View.vue')
const OPDCBE = () => import(/* webpackChunkName: "OPDCBE" */ '@/pages/OPD/ClinicalBreastExamNote/View.vue')
const OPDPatientInformationTheRiskAssessmentForCancer = () => import(/* webpackChunkName: "OPDPatientInformationTheRiskAssessmentForCancer" */ '@/pages/OPD/BreastCancerRiskAssessment/View.vue')
const OPDGENBRCA = () => import(/* webpackChunkName: "OPDGENBRCA" */ '@/pages/OPD/GENBRCA1/View.vue')
const EDTrickSummary = () => import(/* webpackChunkName: "EDTrickSummary" */ '@/pages/TrickSummary/ViewED.vue')
const EOCTrickSummary = () => import(/* webpackChunkName: "EOCTrickSummary" */ '@/pages/TrickSummary/ViewEOC.vue')
const OPDTrickSummary = () => import(/* webpackChunkName: "OPDTrickSummary" */ '@/pages/TrickSummary/ViewOPD.vue')
const OPDDiseasesCertification = () => import(/* webpackChunkName: "OPDDiseasesCertification" */ '@/pages/OPD/DiseasesCertification/View.vue')
const OPDSurgeryAndProcedureSummary = () => import(/* webpackChunkName: "OPDSurgeryAndProcedureSummary" */ '@/pages/ProcedureSummary/ViewOPD.vue')
const OPDPatientHandOverRecord = () => import(/* webpackChunkName: "OPDPatientHandOverRecord" */ '@/pages/ED/HandOverCheckList/ViewOnlyOPD.vue')
const OPDStandingOrderForRetailService = () => import(/* webpackChunkName: "OPDStandingOrderForRetailService" */ '@/pages/RetailService/StandingOrderViewOPD.vue')
const OPDMedicalRecordForOutpatient = () => import(/* webpackChunkName: "OPDMedicalRecordForOutpatient" */ '@/pages/OPD/MedicalRecordForOutpatient/ViewOPD.vue')
// ed
const EDEmergencyTriageRecord = () => import(/* webpackChunkName: "EDEmergencyTriageRecord" */ '@/pages/ED/EmergencyTriageRecord/Triage.vue')
const EDER0 = () => import(/* webpackChunkName: "EDER0" */ '@/pages/ED/EmergencyRecord/BACCED.vue')
const EDDI0 = () => import(/* webpackChunkName: "EDDI0" */ '@/pages/ED/DischargeInformation/View.vue')
const EDVerbalOrderForm = () => import(/* webpackChunkName: "EDVerbalOrderForm" */ '@/pages/ED/EmergencyTriageRecord/OrderTableViewED.vue')
const EDPatientProgressNote = () => import(/* webpackChunkName: "EDPatientProgressNote" */ '@/pages/ED/ProgressNote/View.vue')
const EDStandingOrderForRetailService = () => import(/* webpackChunkName: "EDStandingOrderForRetailService" */ '@/pages/RetailService/StandingOrderView.vue')
const EDAmbulanceRunReport = () => import(/* webpackChunkName: "EDAmbulanceRunReport" */ '@/pages/ED/AmbulanceRunReport/View.vue')
const EDBloodTransfusionChecklist = () => import(/* webpackChunkName: "EDBloodTransfusionChecklist" */ '@/pages/ED/BloodTransfusionChecklist/ViewED.vue')
const EOCCardiacArrestRecord = () => import(/* webpackChunkName: "EOCCardiacArrestRecord" */ '@/pages/CardiacArrestRecord/ViewEOC.vue')
const EDConsultationDrugWithAnAsteriskMark = () => import(/* webpackChunkName: "EDConsultationDrugWithAnAsteriskMark" */ '@/pages/IPD/ConsultationDrugWithAnAsteriskMarkUpForm/ViewED.vue')
const EDMCA = () => import(/* webpackChunkName: "EDMCA" */ '@/pages/ED/MonitoringChartAndHandoverForms/View.vue')
const EDPatientHandOverRecord = () => import(/* webpackChunkName: "EDPatientHandOverRecord" */ '@/pages/ED/HandOverCheckList/ViewOnlyPatient.vue')
const EOCPatientHandOverRecord = () => import(/* webpackChunkName: "EOCPatientHandOverRecord" */ '@/pages/ED/HandOverCheckList/ViewOnlyEOC.vue')
const EDSelfHarmRiskScreeningTool = () => import(/* webpackChunkName: "EDSelfHarmRiskScreeningTool" */ '@/pages/ED/SelfHarmRiskScreeningToolUpForm/View.vue')
const EDSurgeryAndProcedureSummary = () => import(/* webpackChunkName: "EDSurgeryAndProcedureSummary" */ '@/pages/ProcedureSummary/ViewED.vue')
const EOCSurgeryAndProcedureSummary = () => import(/* webpackChunkName: "EOCSurgeryAndProcedureSummary" */ '@/pages/ProcedureSummary/ViewEOC.vue')
const EDHighlyRestrictedAntimicrobialConsult = () => import(/* webpackChunkName: "EDHighlyRestrictedAntimicrobialConsult" */ '@/pages/HighlyRestrictedAntimicrobialConsult/ViewED.vue')
const EDReferralLetter = () => import(/* webpackChunkName: "EDReferralLetter" */ '@/pages/ED/ReferralLetter/View.vue')
const EDEMCO = () => import(/* webpackChunkName: "EDEMCO" */ '@/pages/ED/EmergencyConfirmation/View.vue')
const EDInjuryCertificate = () => import(/* webpackChunkName: "EDInjuryCertificate" */ '@/pages/ED/InjuryCertificate/View.vue')
const EDTransferLetter = () => import(/* webpackChunkName: "EDTransferLetter" */ '@/pages/ED/TranferLetter/View.vue')
const EDConsentForTransfusionOfBlood = () => import(/* webpackChunkName: "EDConsentForTransfusionOfBlood" */ '@/pages/ConsentForTransfusionOfBloodAndBloodDerivedProducts/View.vue')
const EDA03_165_061222_V = () => import(/* webpackChunkName: "EDA03_165_061222_V" */ '@/components/IPD/BloodGasAnalysisEG7/ViewED.vue')
const EDMortalityReport = () => import(/* webpackChunkName: "EDMortalityReport" */ '@/pages/ED/MortalityReport/View.vue')
const EDMortalityReportV2 = () => import(/* webpackChunkName: "EDMortalityReportV2" */ '@/pages/ED/MortalityReport/ViewV2.vue')
// eoc
const IPDStandingOrder = () => import(/* webpackChunkName: "IPDStandingOrder" */ '@/pages/StandingOrder/View.vue')
const OPDStandingOrder = () => import(/* webpackChunkName: "OPDStandingOrder" */ '@/pages/StandingOrder/ViewOPD.vue')
const EDStandingOrder = () => import(/* webpackChunkName: "EDStandingOrder" */ '@/pages/StandingOrder/ViewED.vue')
const EOCStandingOrder = () => import(/* webpackChunkName: "EOCStandingOrder" */ '@/pages/StandingOrder/ViewEOC.vue')
const OPDComplexOutpatientCaseSummary = () => import(/* webpackChunkName: "OPDComplexOutpatientCaseSummary" */ '@/pages/ComplexOutpatientCaseSummary/View.vue')
const EOCComplexOutpatientCaseSummary = () => import(/* webpackChunkName: "EOCComplexOutpatientCaseSummary" */ '@/pages/ComplexOutpatientCaseSummary/ViewEOC.vue')
const EOCHandOverCheckList = () => import(/* webpackChunkName: "EOCHandOverCheckList" */ '@/pages/EOC/HandOverCheckList/ViewOnly.vue')
const OPDCardiacArrestRecord = () => import(/* webpackChunkName: "OPDCardiacArrestRecord" */ '@/pages/CardiacArrestRecord/ViewOPD.vue')
const EOCPatientProgressNote = () => import(/* webpackChunkName: "EOCPatientProgressNote" */ '@/pages/ProgressNote/View.vue')
const EOCReferralLetter = () => import(/* webpackChunkName: "EOCReferralLetter" */ '@/pages/EOC/Documents/ReferralLetter/View.vue')
const EOCTransferLetter = () => import(/* webpackChunkName: "EOCTransferLetter" */ '@/pages/EOC/Documents/TranferLetter/View.vue')
const EDFallRiskScreening = () => import(/* webpackChunkName: "EDFallRiskScreening" */ '@/pages/ED/EmergencyTriageRecord/FallRiskScreening/View.vue')
const IPDIPD_A02_052_050919_V = () => import(/* webpackChunkName: "IPDIPD_A02_052_050919_V" */ '@/pages/IPD/AskThePatientBeforeSurgery/View.vue')
const IPDCatridgeKaolinACT = () => import(/* webpackChunkName: "IPDCatridgeKaolinACT" */ '@/pages/IPD/CartridgeKaolinACT/View.vue')
const EDCatridgeKaolinACT = () => import(/* webpackChunkName: "EDCatridgeKaolinACT" */ '@/pages/IPD/CartridgeKaolinACT/ViewED.vue')
const OPDCatridgeKaolinACT = () => import(/* webpackChunkName: "OPDCatridgeKaolinACT" */ '@/pages/IPD/CartridgeKaolinACT/ViewOPD.vue')
const EOCCatridgeKaolinACT = () => import(/* webpackChunkName: "EOCCatridgeKaolinACT" */ '@/pages/IPD/CartridgeKaolinACT/ViewEOC.vue')
const OPDOPDPYCKCKHHTP = () => import(/* webpackChunkName: "OPDOPDPYCKCKHHTP" */ '@/pages/OPD/CKHoHapTienPhau/View.vue')
const OPDOPD_A01_204_030320_VE = () => import(/* webpackChunkName: "OPDOPD_A01_204_030320_VE" */ '@/pages/OPD/RequestForPreSurgeryCardiologyConsultation/View.vue')
const OPDPregnancyFollowUpRecord = () => import(/* webpackChunkName: "OPDPregnancyFollowUpRecord" */ '@/pages/OPD/PregnancyFollowUpRecord/View.vue')
const IPDIPD_A01_159_050919_VE = () => import(/* webpackChunkName: "IPDIPD_A01_159_050919_VE" */ '@/pages/CommitmentPaperToTakeThePlacenta/View.vue')
// eslint-disable-next-line camelcase
const IPDForNeonatalMaternity_Obstetrics = () => import(/* webpackChunkName: "IPDForNeonatalMaternity_Obstetrics" */ '@/pages/IPD/InitialAssessment/ForNeonatalMaternity/NeonatalMaternityViewV2.vue')
// eslint-disable-next-line camelcase
const IPDForUterineLife2Hours_Obstetrics = () => import(/* webpackChunkName: "IPDForUterineLife2Hours_Obstetrics" */ '@/pages/IPD/AssessmentOfInfantStatusDuringTheFirst2HoursOfExtrauterineLife/View.vue')
const OPDPreAnesthesiaConsultation = () => import(/* webpackChunkName: "OPDPreAnesthesiaConsultation" */ '@/pages/OPD/PreAnesthesiaConsultation/View.vue')
const IPDUploadImage = () => import(/* webpackChunkName: "IPDUploadImage" */ '@/pages/IPD/UploadImage/View.vue')
const EDUploadImage = () => import(/* webpackChunkName: "EDUploadImage" */ '@/pages/IPD/UploadImage/ViewED.vue')
const EOCUploadImage = () => import(/* webpackChunkName: "EOCUploadImage" */ '@/pages/IPD/UploadImage/ViewEOC.vue')
const OPDUploadImage = () => import(/* webpackChunkName: "OPDUploadImage" */ '@/pages/IPD/UploadImage/ViewOPD.vue')
const IPDProcedureSafetyChecklist = () => import(/* webpackChunkName: "IPDProcedureSafetyChecklist" */ '@/pages/FormLienKhoa/A02_053_OR_201022_V/View.vue')
const EDProcedureSafetyChecklist = () => import(/* webpackChunkName: "EDProcedureSafetyChecklist" */ '@/pages/FormLienKhoa/A02_053_OR_201022_V/EDView.vue')
const OPDProcedureSafetyChecklist = () => import(/* webpackChunkName: "OPDProcedureSafetyChecklist" */ '@/pages/FormLienKhoa/A02_053_OR_201022_V/OPDView.vue')
const EOCProcedureSafetyChecklist = () => import(/* webpackChunkName: "EOCProcedureSafetyChecklist" */ '@/pages/FormLienKhoa/A02_053_OR_201022_V/EOCView.vue')
const IPDMultidrugResistant = () => import(/* webpackChunkName: "IPDMultidrugResistant" */ '@/pages/FormLienKhoa/A02_006_221221_V/View.vue')
const EDMultidrugResistant = () => import(/* webpackChunkName: "EDMultidrugResistant" */ '@/pages/FormLienKhoa/A02_006_221221_V/EDView.vue')
const OPDMultidrugResistant = () => import(/* webpackChunkName: "OPDMultidrugResistant" */ '@/pages/FormLienKhoa/A02_006_221221_V/OPDView.vue')
const EOCMultidrugResistant = () => import(/* webpackChunkName: "EOCMultidrugResistant" */ '@/pages/FormLienKhoa/A02_006_221221_V/EOCView.vue')
export default {
  name: 'IPD-DetailV2',
  props: ['VisitId', 'Type', 'VisitType', 'Form', 'Label', 'UpdateAt', 'UpdatedBy', 'Code', 'Version'],
  components: {
    IPDUploadImage,
    EDUploadImage,
    EOCUploadImage,
    OPDUploadImage,
    OPDPreAnesthesiaConsultation,
    IPDForNeonatalMaternity_Obstetrics,
    IPDIPD_A02_052_050919_V,
    IPDMedicalRecordEye,
    OPDInitialAssessmentForTelehealth,
    EDHandOverCheckList,
    EOCTransferLetter,
    IPDTransferLetter,
    EDTransferLetter,
    OPDTransferLetter,
    EOCReferralLetter,
    OPDReferralLetter,
    EDReferralLetter,
    IPDReferralLetter,
    EDMCA,
    IPDInitialAssessmentForAudult,
    IPDInitialAssessmentForFrailElderly,
    IPDInitialAssessmentForChemotherapy,
    IPDPFEF,
    EDPFEF,
    EOCPFEF,
    OPDPFEF,
    IPDPatientProgressNote,
    OPDPatientProgressNote,
    EDPatientProgressNote,
    EDStandingOrderForRetailService,
    OPDStandingOrderForRetailService,
    EDAmbulanceRunReport,
    EOCPatientProgressNote,
    IPDCardiacArrestRecord,
    EDCardiacArrestRecord,
    EOCCardiacArrestRecord,
    OPDCardiacArrestRecord,
    IPDFallRiskAssessmentForAdult,
    IPDFallRiskAssessmentForObstetric,
    IPDPlanOfCare,
    IPDGuggingSwallowingScreen,
    IPDJointConsultationForApprovalOfSurgery,
    EDJointConsultationForApprovalOfSurgery,
    EOCJointConsultationForApprovalOfSurgery,
    OPDJointConsultationForApprovalOfSurgery,
    IPDJointConsultationGroupMinutes,
    EDJointConsultationGroupMinutes,
    EOCJointConsultationGroupMinutes,
    OPDJointConsultationGroupMinutes,
    IPDTakeCareOfPatientsWithCovid19,
    IPDCareNote,
    EDCareNote,
    IPDPhysicianNote,
    EDPhysicianNote,
    IPDPatientOwnMedicationsChart,
    EDPatientOwnMedicationsChart,
    IPDBloodRequestSupplyAndConfirmation,
    EDBloodRequestSupplyAndConfirmation,
    IPDBloodTransfusionChecklist,
    EDBloodTransfusionChecklist,
    IPDPHC,
    EDPHC,
    EOCPHC,
    OPDPHC,
    IPDConsultationDrugWithAnAsteriskMark,
    EDConsultationDrugWithAnAsteriskMark,
    IPDSurgicalProcedureSafetyChecklist,
    EOCSurgicalProcedureSafetyChecklist,
    OPDSurgicalProcedureSafetyChecklist,
    IPDExternalTransportationAssessment,
    EDExternalTransportationAssessment,
    IPDDischargePreparationChecklist,
    IPDMortalityReport,
    EDMortalityReport,
    EDMortalityReportV2,
    IPDBradenScale,
    IPDSurgeryCertificate,
    IPDVitalSignsForAdult,
    IPDTrickSummary,
    EDTrickSummary,
    EOCTrickSummary,
    OPDTrickSummary,
    OPDNCCNBROV1,
    OPDCBE,
    OPDPatientInformationTheRiskAssessmentForCancer,
    OPDGENBRCA,
    IPDSumaryOf15DayTreatment,
    IPDMedicationHistoryForm,
    IPDThrombosisRiskFactorAssessment,
    IPDInitialAssessmentForNeonatalMaternity,
    IPDFallRiskAssessmentInPediatricInpatients,
    IPDInitialAssessmentForPregnantWomen,
    IPDMonitoringSheetForPatientsWith,
    IPDVerbalOrderForm,
    EDVerbalOrderForm,
    IPDTheSurgicalMedicalRecord,
    IPDThrombosisRiskFactorAssessmentFor,
    IPDCoronaryIntervention,
    IPDGlamorganScaleForScreening,
    IPDNeonatalObservationChart,
    IPDCoordinatingWithThePatient,
    OPDCoordinatingWithThePatient,
    IPDMedicationHistoryFormPediatricPatient,
    IPDArterialBloodGasTest,
    EDArterialBloodGasTest,
    IPDIPDScaleForAssessmentOfSuicideIntent,
    IPDChemicalBiologyTest,
    EDChemicalBiologyTest,
    IPDSurgeryAndProcedureSummary,
    EDSurgeryAndProcedureSummary,
    EOCSurgeryAndProcedureSummary,
    OPDSurgeryAndProcedureSummary,
    IPDPROMForheartFailure,
    OPDPROMForheartFailure,
    IPDPROMForCoronaryDisease,
    OPDPROMForCoronaryDisease,
    IPDMedicalReport,
    OPDMedicalReport,
    EDMedicalReport,
    EOCMedicalReport,
    IPDHandOverCheckList,
    OPDHandOverCheckList,
    EOCHandOverCheckList,
    IPDInjuryCertificate,
    EDInjuryCertificate,
    EDEMCO,
    EDConsentForTransfusionOfBlood,
    IPDConsentForTransfusionOfBlood,
    IPDMedicalRecord,
    IPDMedicalRecordObstetrics,
    IPDMedicalRecordGynecological,
    IPDMedicalRecordPediatric,
    IPDMedicalRecordNeonatal,
    IPDA01_039_050919_V,
    IPDA01_040_050919_V,
    IPDMedicalRecordOncology,
    IPDInitialAssessmentForPediatricInPatient,
    IPDInitialAssessmentForNeonatal,
    IPDCardiovascularForm,
    IPDVitalSignFor1To3,
    IPDVitalSignFor1To4,
    IPDVitalSignFor3To12,
    IPDVitalSignForOver12,
    IPDVitalSignFor4To12,
    IPDHighlyRestrictedAntimicrobialConsult,
    EDHighlyRestrictedAntimicrobialConsult,
    IPDVitalSignsForPregnantWoman,
    IPDDischargeAgaintsMedicalAdvice,
    IPDStandingOrder,
    EDStandingOrder,
    EOCStandingOrder,
    OPDComplexOutpatientCaseSummary,
    EOCComplexOutpatientCaseSummary,
    OPDStandingOrder,
    IPDDischargeMedicalReport,
    EDDischargeMedicalReport,
    IPDDischarged,
    EDDischarged,
    OPDInitialAssessmentForShortTerm,
    EOCInitialAssessmentForShortTerm,
    OPDInitialAssessmentForOnGoing,
    EOCInitialAssessmentForOnGoing,
    OPDFallRiskScreening,
    EOCFallRiskScreening,
    EDFallRiskScreening,
    EDER0,
    EDDI0,
    EDEmergencyTriageRecord,
    OPDDiseasesCertification,
    OPDOutpatientExaminationNote,
    OPDTelehealthExaminationNote,
    EOCOutpatientExaminationNote,
    EDSkinTestResult,
    EOCSkinTestResult,
    OPDSkinTestResult,
    IPDConsentForOperationOrrProcedure,
    EDConsentForOperationOrrProcedure,
    OPDConsentForOperationOrrProcedure,
    EOCConsentForOperationOrrProcedure,
    IPDHIVTestingConsent,
    OPDHIVTestingConsent,
    IPDCartridgeCelite,
    EDCartridgeCelite,
    EOCHIVTestingConsent,
    EDHIVTestingConsent,
    EDAssessmentForRetailServicePatient,
    OPDAssessmentForRetailServicePatient,
    IPDRequestResuscitation,
    OPDRequestResuscitation,
    EDRequestResuscitation,
    EOCRequestResuscitation,
    EDSelfHarmRiskScreeningTool,
    EDPatientHandOverRecord,
    EOCPatientHandOverRecord,
    OPDPatientHandOverRecord,
    IPDCatridgeKaolinACT,
    EDCatridgeKaolinACT,
    OPDCatridgeKaolinACT,
    EOCCatridgeKaolinACT,
    OPDOPDPYCKCKHHTP,
    OPDOPD_A01_204_030320_VE,
    OPDPregnancyFollowUpRecord,
    IPDIPD_A01_159_050919_VE,
    IPDForUterineLife2Hours_Obstetrics,
    IPDProcedureSafetyChecklist,
    EDProcedureSafetyChecklist,
    OPDProcedureSafetyChecklist,
    EOCProcedureSafetyChecklist,
    IPDA03_165_061222_V,
    EDA03_165_061222_V,
    IPDMultidrugResistant,
    EDMultidrugResistant,
    OPDMultidrugResistant,
    EOCMultidrugResistant,
    OPDMedicalRecordForOutpatient
  },
  data () {
    return {
      FormV2: {
        title: this.Label,
        UpdateAt: this.UpdateAt,
        UpdatedBy: this.UpdatedBy,
        Version: this.Version,
        Code: this.Code
      }
    }
  },
  mounted () {
    console.log('indexall', this.Version)
  },
  computed: {
  },
  methods: {
  }
}
</script>
