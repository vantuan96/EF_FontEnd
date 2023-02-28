<template>
  <MDContextMenu :VisitId="VisitId" @emitMenu="getdataMenu" :MenuPositon='MenuPositon' :Customer='Customer' :menuItems="menuItems2" Type="IPD"/>
</template>
<script>
import moment from 'moment'
import _ from 'lodash'
export default {
  name: 'IPDContextMenu',
  props: ['VisitId', 'MenuPositon', 'Customer'],
  watch: {
    Customer () {
      this.getData()
    },
    deep: true
  },
  data () {
    return {
      menuItems: [
        {
          ViName: 'Đánh giá ban đầu',
          EnName: 'Initial Assessment',
          Type: 'InitialAssessment/ForAdult',
          Role: [2],
          Permission: 'IPD-MENU0001',
          Group: 2
        },
        {
          ViName: 'Đánh giá tình trạng trẻ trong 2 giờ sau sinh',
          EnName: 'Assessment of infant status during the first 2 hours of extrauterine life',
          Type: 'AssessmentOfInfantStatusDuringTheFirst2HoursOfExtrauterineLife',
          Role: [2],
          Permission: 'IPD-MENU0001',
          Group: 2
        },
        {
          ViName: 'Đánh giá nguy cơ ngã',
          EnName: 'Fall Risk Assessment Adult',
          Type: 'FallRiskAssessment',
          Role: [2],
          Permission: 'IPD-MENU0004',
          Group: 5
        },
        {
          ViName: 'Thêm theo dõi',
          EnName: 'Add observation',
          Type: 'ProgressNote',
          Role: [2, 1, 3],
          Permission: 'IPD-MENU0005'
        },
        {
          ViName: 'Phiếu GDSK cho NB và thân nhân',
          EnName: 'Patient and family education form',
          Type: 'PatientAndFamilyEducation',
          Role: [1, 2, 3],
          Permission: 'IPD-MENU0006',
          Group: 9
        },
        {
          ViName: 'Bảng kiểm an toàn phẫu thuật/thủ thuật',
          EnName: 'Surgical Procedure Safety Checklist',
          Type: 'SurgicalProcedureSafetyChecklist',
          Role: [2],
          Permission: 'IPD-MENU0007',
          Group: 6
        },
        {
          ViName: 'Bảng hồi sinh tim phổi',
          EnName: 'Cardiac Arrest Record',
          Type: 'CardiacArrestRecord',
          Role: [1, 2, 3],
          Permission: 'IPD-MENU0008',
          Group: 10
        },
        {
          ViName: 'Phiếu ghi nhận sử dụng thuốc do người bệnh mang vào',
          EnName: 'Patient Own Medications Chart',
          Type: 'PatientOwnMedicationsChart',
          Role: [1, 3],
          Permission: 'IPD-MENU0009',
          Group: 3
        },
        {
          ViName: 'Kế hoạch điều trị và chăm sóc',
          EnName: 'Plan Of Care',
          Type: 'PlanOfCare',
          Role: [1, 2, 3],
          Permission: 'IPD-MENU0010',
          Group: 2
        },
        {
          ViName: 'Báo cáo y tế',
          EnName: 'Medical report',
          Type: 'IPDMedicalReport',
          Role: [4],
          Permission: 'IPD-MENU0011',
          Group: 9
        },
        {
          ViName: 'Báo cáo y tế ra viện',
          EnName: 'Discharge medical report',
          Type: 'IPDDischargeMedicalReport',
          Role: [4],
          Permission: 'IPD-MENU0012',
          Group: 9
        },
        {
          ViName: 'Giấy chuyển viện',
          EnName: 'Referral Letter',
          Type: 'IPDReferralLetter',
          Role: [4],
          Permission: 'IPD-MENU0013',
          Group: 9
        },
        {
          ViName: 'Giấy chuyển tuyến',
          EnName: 'Transfer Letter',
          Type: 'IPDTransferLetter',
          Role: [4],
          Permission: 'IPD-MENU0014',
          Group: 9
        },
        {
          ViName: 'Giấy ra viện',
          EnName: 'Hospital Discharge Form',
          Type: 'DischargeCertificate',
          Role: [4],
          Permission: 'IPD-MENU0015',
          Group: 9
        },
        {
          ViName: 'Biên bản - Bảng kiểm bàn giao NB chuyển khoa',
          EnName: 'Hand Over Check List',
          Type: 'HandOverCheckList',
          Role: [4],
          Permission: 'IPD-MENU0017',
          Group: 2
        },
        // {
        //   ViName: 'Phiếu phẫu thuật/thủ thuật',
        //   EnName: 'Surgery and procedure Note',
        //   Type: 'ProcedureSummary',
        //   Role: [1, 3],
        //   Permission: 'IPD-MENU0018',
        //   Group: 6
        // },
        {
          ViName: 'Tóm tắt phẫu thuật',
          EnName: 'Surgery summary',
          Type: 'SurgeryAndProcedureSummary',
          Role: [1, 3],
          Permission: 'IPD-MENU0018',
          Group: 6
        },
        {
          ViName: 'Biên bản hội chẩn thông qua mổ',
          EnName: 'Joint-Consultation for approval of surgery',
          Type: 'JointConsultationForApprovalOfSurgery',
          Role: [1, 3],
          Permission: 'IPD-MENU0019',
          Group: 6
        },
        {
          ViName: 'Thang điểm GUSS đánh giá rối loạn nuốt',
          EnName: 'Gugging Swallowing Screen',
          Type: 'GuggingSwallowingScreen',
          Role: [2],
          Permission: 'IPD-MENU0020',
          Group: 5
        },
        {
          ViName: 'Biên bản hội chẩn sử dụng kháng sinh cần ưu tiên quản lý',
          EnName: 'Highly Restricted Antimicrobial Consult',
          Type: 'HighlyRestrictedAntimicrobialConsult',
          Role: [1, 3],
          Permission: 'IPD-MENU0021',
          Group: 2
        },
        {
          ViName: 'Biên bản hội chẩn bệnh nhân sử dụng thuốc có dấu sao (*)',
          EnName: 'Minutes of consultation for patient using drug with an asterisk mark(*)',
          Type: 'ConsultationDrugWithAnAsterisk',
          Role: [1, 3],
          Permission: 'IPD-MENU0022',
          Group: 2
        },
        {
          ViName: 'Biên bản hội chẩn',
          EnName: 'Joint Consultation Group Minutes',
          Type: 'JointConsultationGroupMinutes',
          Role: [1, 3],
          Permission: 'IPD-MENU0023',
          Group: 2
        },
        {
          ViName: 'Phiếu chăm sóc người bệnh Covid-19',
          EnName: 'Take care of COVID-19 patient',
          Type: 'TakeCareOfPatientsWithCovid19',
          Id: 'TakeCareOfPatientsWithCovid19',
          Role: [2, 1, 3],
          Permission: 'IPD-MENU0024',
          Group: 2
        },
        {
          ViName: 'Phiếu điều trị',
          EnName: `Physician's Note`,
          Type: 'PhysicianNote',
          Role: [1, 3],
          Permission: 'IPD-MENU0025',
          Group: 2
        },
        {
          ViName: 'Bảng đánh giá nhu cầu trang thiết bị/ nhân lực vận chuyển ngoại viện',
          EnName: 'External Transportation Assessment',
          Type: 'ExternalTransportationAssessment',
          Role: [1, 2, 3],
          Permission: 'IPD-MENU0026',
          Group: 10
        },
        {
          ViName: 'Phiếu chăm sóc',
          EnName: `Nurse's Note`,
          Type: 'CareNote',
          Role: [2],
          Permission: 'IPD-MENU0027',
          Group: 2
        },
        {
          ViName: 'Phiếu dự trù, cung cấp và xác nhận thực hiện máu - Chế phẩm máu',
          EnName: 'Blood Request Supply And Confirmation',
          Type: 'BloodRequestSupplyAndConfirmation',
          Role: [1, 2, 3],
          Permission: 'IPD-MENU0028'
        },
        {
          ViName: 'Phiếu truyền máu',
          EnName: 'Blood Transfusion Checklist',
          Type: 'BloodTransfusionChecklist',
          Role: [1, 2, 3],
          Permission: 'IPD-MENU0029',
          Group: 10
        },
        {
          ViName: 'Xét nghiệm tại chỗ - Sinh hóa máu Catridge CHEM8+',
          EnName: 'Point of care testing - Chemistry Catridge CHEM8+',
          Type: 'ChemicalBiologyTest',
          Role: [1, 3, 2],
          Group: 10
        },
        {
          ViName: 'Xét nghiệm tại chỗ - Khí máu Cartridge CG4+',
          EnName: 'Point of care testing - Blood gas analysis Cartridge CG4+',
          Type: 'ArterialBloodGasTest',
          Role: [1, 3, 2],
          Group: 10
        },
        {
          ViName: 'XNTC - ACT Cartridge Celite',
          EnName: 'POCT - ACT Cartridge Celite',
          Type: 'ACTForms',
          Role: [1, 3, 2]
        },
        {
          ViName: 'XNTC - Đông máu ACT (Cartridge Kaolin ACT)',
          EnName: 'POCT - Coagulation ACT (Catridge Kaolin ACT)',
          Type: 'CartridgeKaolinACT',
          Role: [1, 3, 2]
        },
        {
          ViName: 'XNTC - Khí máu và điện giải EG7+',
          EnName: 'POCT - Blood gas analysis (Cartridge EG7+)',
          Type: 'A03_165_061222_V',
          Role: [1, 3, 2]
        },
        {
          ViName: 'Bảng kiểm chuẩn bị và bàn giao NB trước phẫu thuật',
          EnName: 'Pre-operative verification and handover checklist',
          Type: 'PHC',
          Role: [2],
          Permission: 'IPD-MENU0030',
          Group: 6
        },
        // Bảng kiểm chuẩn bị ra viện
        {
          ViName: 'Bảng kiểm chuẩn bị ra viện',
          EnName: 'Hospital discharge checklist',
          Type: 'DischargePreparationChecklist',
          Role: [2, 1, 3],
          Permission: 'IPD-MENU0031',
          Group: 9
        },
        {
          ViName: 'Giấy xác nhận ra viện không theo chỉ định của bác sĩ',
          EnName: 'Discharge Againts Medical Advice',
          Type: 'DischargeAgaintsMedicalAdvice',
          Role: [1, 3],
          Permission: 'IPD-MENU0032',
          Group: 9
        },
        {
          ViName: 'Bảng theo dõi dấu hiệu sinh tồn',
          EnName: 'Vital signs',
          Type: 'VitalSigns',
          Role: [2],
          Permission: 'IPD-MENU0033',
          Group: 5
        },
        // Giấy chứng nhận thương tích
        {
          ViName: 'Giấy chứng nhận thương tích',
          EnName: 'Injury Certificate',
          Type: 'InjuryCertificate',
          Role: [4],
          Permission: 'IPD-MENU0034',
          Group: 11
        },
        // Kiểm thảo tử vong
        {
          ViName: 'Biên bản - Trích biên bản kiểm thảo tử vong',
          EnName: 'Minutes - Excerpt from the death audit report',
          Type: 'MortalityReport/Page1',
          Role: [2, 1, 3],
          Permission: 'IPD-MENU0035',
          Group: 10
        },
        // Bảng điểm Braden đánh giá nguy cơ loét
        {
          ViName: 'Bảng điểm Braden đánh giá nguy cơ loét',
          EnName: 'Abbreviated braden scale for predicting pressure score risk',
          Type: 'BradenScale',
          Role: [2],
          Permission: 'IPD-MENU0036',
          Group: 5
        },
        // Giấy chứng nhận phẫu thuật
        {
          ViName: 'Giấy chứng nhận phẫu thuật',
          EnName: 'Surgery certificate',
          Type: 'SurgeryCertificate',
          Role: [3, 4],
          Group: 9
        },
        // Phiếu sơ kết 15 ngày điều trị
        {
          ViName: 'Phiếu sơ kết 15 ngày điều trị',
          EnName: 'Summary of 15 day treatment',
          Type: 'SumaryOf15DayTreatment',
          Role: [1, 3],
          Permission: 'IPD-MENU0037',
          Group: 2
        },
        // Phiếu khai thác tiền sử dụng thuốc
        {
          ViName: 'Phiếu khai thác tiền sử dùng thuốc - Người lớn',
          EnName: 'Medication history form - Adult patient',
          Type: 'MedicationHistoryForm',
          Role: [1, 3],
          Permission: 'IPD-MENU0038',
          Group: 3
        },
        {
          ViName: 'Phiếu theo dõi người bệnh thoát mạch thuốc điều trị ung thư',
          EnName: 'Monitoring sheet for patient with chemotherapy extravasation',
          Type: 'MonitorSheetForPatient',
          Role: [2],
          Permission: 'IPD-MENU0039',
          Group: 5
        },
        {
          ViName: 'Tóm tắt thủ thuật can thiệp động mạch vành',
          EnName: 'Coronary intervention summary',
          Type: 'CoronaryIntervention',
          Role: [1, 3],
          Permission: 'IPD-MENU0040',
          Group: 2
        },
        // Phiếu ghi nhận thuốc y lệnh miệng
        {
          ViName: 'Phiếu ghi nhận thuốc y lệnh miệng',
          EnName: 'Verbal order form',
          Type: 'VerbalOrderForm',
          Role: [1, 2, 3],
          Permission: 'IPD-MENU0041',
          Group: 3
        },
        {
          ViName: 'Ghi nhận thực hiện thuốc Standing Order',
          EnName: 'Record administration standing order medication',
          Type: 'StandingOrder',
          Role: [1, 3, 2],
          Group: 3
        },
        {
          ViName: 'Bảng điểm GLAMORGAN sàng lọc loét do tỳ ép ở trẻ nhi và sơ sinh',
          EnName: 'GLAMORGAN pressure injury screening tool ',
          Type: 'GlamorganPressure',
          Role: [2],
          Permission: 'IPD-MENU0042',
          Group: 5
        },
        {
          ViName: 'Biên bản phối hợp với bệnh nhân/ gia đình xử lý thai chết lưu',
          EnName: 'Coordinating with the patient/ family to deal with a stillbirth',
          Type: 'CoordinatingWithThePatient',
          Role: [1, 3],
          Permission: 'IPD-MENU0043'
        },
        {
          ViName: 'Phiếu khai thác tiền sử dùng thuốc bệnh - Nhi',
          EnName: 'Medication history form - pediatric patient',
          Type: 'MHFForNewBorn',
          Role: [1, 3],
          Permission: 'IPD-MENU0044'
        },
        {
          ViName: 'Tóm tắt thủ thuật',
          EnName: 'Procedure Summary',
          Type: 'TrickSummary',
          Role: [1, 3],
          Permission: 'IPD-MENU0045'
        },
        {
          ViName: 'Thang đánh giá ý tưởng tự sát và mức độ ý tưởng tự sát',
          EnName: 'Suicidal ideation scale and degree of suicidal ideation',
          Type: 'ScaleForAssessmentOfSuicideIntent',
          Role: [1, 3],
          Permission: 'IPD-MENU0046'
        },
        {
          ViName: 'Phiếu cam kết truyền máu và các chế phẩm máu',
          EnName: 'Consent for transfusion of blood and/ or blood derived products',
          Type: 'ConsentForTransfusionOfBloodAndBloodDerivedProducts',
          Role: [5],
          Permission: 'IPD-MENU0049'
        },
        {
          ViName: 'Phiếu cam kết phẫu thuật/ thủ thuật/ điều trị có nguy cơ cao',
          EnName: 'Consent for Operation/ Procedure/ High risk treatment',
          Type: 'ConsentForOperation',
          Role: [5],
          Permission: 'IPD-MENU0049'
        },
        {
          ViName: 'Yêu cầu không hồi sinh tim phổi',
          EnName: 'Do not resuscitation order',
          Type: 'ConsentDoNotOrder',
          Role: [5],
          Permission: 'IPD-MENU0047'
        },
        {
          ViName: 'Phiếu đồng ý xét nghiệm HIV',
          EnName: 'HIV Testing Consent Form',
          Type: 'HIVTestingConsent',
          Role: [5],
          Permission: 'IPD-MENU0050'
        },
        {
          ViName: 'Bản cam kết xin lấy bánh rau không theo quy định quản lý của Bệnh viện',
          EnName: 'Commitment paper to take the placenta out of the hospital',
          Type: 'CommitmentPaperToTakeThePlacenta',
          Role: [5],
          Permission: 'IPD-MENU0052'
        },
        {
          ViName: 'Bảng kiểm an toàn phẫu thuật, thủ thuật trong phòng mổ và phòng can thiệp tim mạch',
          EnName: 'Bảng kiểm an toàn phẫu thuật, thủ thuật trong phòng mổ và phòng can thiệp tim mạch',
          Type: 'A02_053_OR_201022_V',
          Role: [1, 2, 3]
        },
        {
          ViName: 'Đánh giá nguy cơ vi khuẩn đa kháng (MDRO)',
          EnName: 'Đánh giá nguy cơ vi khuẩn đa kháng (MDRO)',
          Type: 'A02_006_221221_V',
          Role: [1, 3]
        }
      ],
      menuItems2: []
    }
  },
  mounted () {
    if (this.Customer.Version >= 13) {
      this.menuItems.map(e => {
        if (e.Type === 'CommitmentPaperToTakeThePlacenta') {
          e.ViName = 'Bản cam kết xin chuyển bánh rau/ tổ chức thai/bộ phận cơ thể ra ngoài bệnh viện và tuân thủ quy định pháp luật'
          e.EnName = 'Commitment paper to take the placenta /nonviable/body parts removed out of hospital and comply with the law'
        }
      })
    }
    this.getData()
  },
  methods: {
    getData () {
      this.menuItems2 = this.menuItems
      if (this.menuItems2.find(i => i.Type === 'SurgicalProcedureSafetyChecklist') && this.Customer.Version >= 9) {
        this.menuItems2 = this.menuItems2.filter(i => i.Type !== 'SurgicalProcedureSafetyChecklist')
      }
      if (this.Customer && this.Customer.MedicalRecordType && this.Customer.MedicalRecordType.length > 0) {
        this.monthOfAge = Math.floor(moment(new Date()).diff(moment(this.Customer.DateOfBirth, 'DD/MM/YYYY'), 'months', true))
        this.yearOfAge = moment(new Date()).diff(moment(this.Customer.DateOfBirth, 'DD/MM/YYYY'), 'years', true)
        let arr = _.cloneDeep([...this.Customer.MedicalRecordType])
        arr.reverse().forEach((e) => {
          this.checkHasForm2(e)
        })
        var index = -1
        var index1 = -1
        this.Customer.MedicalRecordType.forEach(element => {
          if (element.FormCode === 'A01_034_050919_V') {
            let item = this.menuItems2.find(e => e.Type === 'ProgressNote')
            index = this.menuItems2.indexOf(item)
            return false
          }
          if (element.FormCode === 'A01_195_050919_V') {
            let item = this.menuItems2.find(e => e.Type === 'ProgressNote')
            index1 = this.menuItems2.indexOf(item)
            return false
          }
        })

        if (index !== -1) {
        }
        if (index1 !== -1) {
        }
        if (this.Customer.MedicalRecordType.filter(i => i.FormCode === 'IPDBAICU').length > 0 && this.Customer.MedicalRecordType.filter(i => i.FormCode === 'A01_034_050919_V').length === 0) {
          const part1 = {
            EnName: 'The General Internal Medical Record',
            FormCode: 'A01_034_050919_V',
            Role: [2],
            Type: 'MedicalRecord/Part1',
            ViName: 'Bệnh án nội khoa'
          }
          const part2 = {
            EnName: 'The General Internal Medical Record',
            FormCode: 'A01_034_050919_V',
            Role: [1, 3],
            Type: 'MedicalRecord/Part2',
            ViName: 'Bệnh án nội khoa'
          }
          const part3 = {
            EnName: 'The General Internal Medical Record',
            FormCode: 'A01_034_050919_V',
            Role: [4],
            Type: 'MedicalRecord/Print',
            ViName: 'Bệnh án nội khoa'
          }
          this.checkHasForm2(part1)
          this.checkHasForm2(part2)
          this.checkHasForm2(part3)
        }
        // push đánh giá nguy cơ thuyên tắc mạch cho bệnh nhân nội khoa
        // khi có setup bệnh án nội hoặc BM tim mạch
        // if (this.Customer.MedicalRecordType.filter(i => i.FormCode === 'BMTIMMACH' || i.FormCode === 'A01_034_050919_V').length > 0) {
        if (this.Customer.MedicalRecordType.filter(i => i.FormCode === 'IPDTRFA').length > 0) {
          const itemttm = {
            ViName: 'Đánh giá nguy cơ thuyên tắc mạch',
            EnName: 'Thrombosis risk Factor Assessment',
            Type: 'ThrombosisRiskFactorAssessment',
            Role: [1, 3],
            Permission: 'IPD-MENU00039',
            Group: 5
          }
          this.checkHasForm(itemttm)
        }
        // push đánh giá nguy cơ thuyên tắc mạch cho bệnh nhân ngoại tổng hợp
        // khi có setup bệnh án ngoại(A01_195_050919_V) hoặc BM tim mạch
        // if (this.Customer.MedicalRecordType.filter(i => i.FormCode === 'BMTIMMACH' || i.FormCode === 'A01_195_050919_V').length > 0) {
        if (this.Customer.MedicalRecordType.filter(i => i.FormCode === 'A01_049_050919_VE').length > 0) {
          const itemnth = {
            ViName: 'Đánh giá nguy cơ thuyên tắc mạch bệnh nhân ngoại tổng hợp',
            EnName: 'Thrombosis risk factor assessment for general surgery patients',
            Type: 'TRFAforgeneralsurgerypatients',
            Role: [1, 3],
            Permission: 'IPD-MENU00041'
          }
          this.checkHasForm(itemnth)
        }
        // if (this.Customer.MedicalRecordType.filter(i => i.FormCode === 'BMTIMMACH').length > 0 && this.Customer.MedicalRecordType.filter(i => i.FormCode === 'A01_195_050919_V').length === 0) {
        if (this.Customer.MedicalRecordType.filter(i => i.FormCode === 'A01_195_050919_V').length > 0) {
          const part1 = {
            EnName: 'The surgical medical record',
            FormCode: 'A01_195_050919_V',
            Role: [2],
            Type: 'TheSurgicalMedicalRecord/Part1',
            ViName: 'Bệnh án ngoại khoa'
          }
          const part2 = {
            EnName: 'The General Internal Medical Record',
            FormCode: 'A01_195_050919_V',
            Role: [1, 3],
            Type: 'TheSurgicalMedicalRecord/Part2',
            ViName: 'Bệnh án ngoại khoa'
          }
          const part3 = {
            EnName: 'The General Internal Medical Record',
            FormCode: 'A01_195_050919_V',
            Role: [4],
            Type: 'TheSurgicalMedicalRecord/Print',
            ViName: 'Bệnh án ngoại khoa'
          }
          this.checkHasForm2(part1)
          this.checkHasForm2(part2)
          this.checkHasForm2(part3)
        }
        // Hien form PROM duoi Benh an Tim mach
        let array1 = [
          {
            ViName: 'PROM bệnh nhân mạch vành',
            EnName: 'PROM for coronary disease',
            Type: 'PromForCoronaryDisease',
            Role: [1, 2, 3],
            Permission: 'IPD-MENU0047'
          },
          {
            ViName: 'PROM bệnh nhân suy tim',
            EnName: 'PROM for heart failure',
            Type: 'PROMForHeartFailure',
            Role: [1, 2, 3],
            Permission: 'IPD-MENU0048'
          }
        ]
        let array2 = []
        let array3 = []
        let array4 = []
        if (this.menuItems2.filter(i => i.FormCode === 'BMTIMMACH').length > 0) {
          let item = this.menuItems2.findIndex(x => x.Type === 'CardiovascularForm/Print')
          for (let i = 0; i < this.menuItems2.length; i++) {
            if (i < item) {
              array2.push(this.menuItems2[i])
            } else if (i >= item) {
              array3.push(this.menuItems2[i])
            }
          }
          array4 = array2.concat(array1).concat(array3)
          this.menuItems2 = array4
        } else {
          this.menuItems2 = this.menuItems2.concat(array1)
          console.log('chưa setup bmtimmach')
        }
      }
      // if (this.Customer.MedicalRecordType && this.Customer.MedicalRecordType.filter(i => i.FormCode === 'A01_195_050919_V').length > 0) {
      if (this.Customer.MedicalRecordType && this.Customer.MedicalRecordType.filter(i => i.FormCode === 'A02_052_050919_V').length > 0) {
        let itemnth = {
          ViName: 'Yêu cầu người bệnh chuẩn bị trước khi phẫu thuật thủ thuật',
          EnName: 'Yêu cầu người bệnh chuẩn bị trước khi phẫu thuật thủ thuật',
          Type: 'AskThePatientBeforeSurgery',
          Role: [2],
          Permission: 'IPD-MENU0051'
        }
        this.checkHasForm(itemnth)
      }
      if (this.hasRole('VIEW002')) {
        let item = {
          ViName: 'Chỉ định dịch vụ',
          EnName: `Place Diagnostics Order`,
          Type: 'DoctorPlaceDiagnosticsOrder',
          Role: [1, 3],
          Permission: 'VIEW002'
        }
        this.checkHasForm2(item)
      }
      if (this.hasRole('VIEW003')) {
        let item = {
          ViName: 'Đơn thuốc',
          EnName: `Prescription`,
          Type: 'Prescription',
          Role: [1, 2, 3],
          Permission: 'VIEW003'
        }
        this.checkHasForm2(item)
      }
      if (this.hasRole('VIEW004')) {
        let item = {
          ViName: 'Y lệnh nội trú',
          EnName: `Medication Administration Record`,
          Type: 'MedicationAdministrationRecord',
          Role: [1, 2, 3],
          Permission: 'VIEW004'
        }
        this.checkHasForm2(item)
      }
      // check Customer.MedicalRecordType api trả ra null, loc theo ma form medical record
      if (this.Customer && this.Customer.MedicalRecordType) {
        // this.menuItems = this.Customer.MedicalRecordType.filter(i =>
        //   i.FormCode === 'BMTIMMACH').length > 0
        //   ? this.menuItems
        //   : this.menuItems.filter(i => i.Type !== 'CoronaryIntervention' && i.Type !== 'PromForCoronaryDisease' && i.Type !== 'PROMForHeartFailure')
        // PROM bệnh nhân mạch vành
        this.menuItems2 = this.Customer.MedicalRecordType.filter(i =>
          i.FormCode === 'PROMFCD').length > 0
          ? this.menuItems2
          : this.menuItems2.filter(i => i.Type !== 'PromForCoronaryDisease')

        // PROM bệnh nhân suy tim
        this.menuItems2 = this.Customer.MedicalRecordType.filter(i =>
          i.FormCode === 'PROMFHF').length > 0
          ? this.menuItems2
          : this.menuItems2.filter(i => i.Type !== 'PROMForHeartFailure')

        // Tóm tắt thủ thuật can thiệp động mạch vành
        this.menuItems2 = this.Customer.MedicalRecordType.filter(i =>
          i.FormCode === 'A01_076_050919_VE').length > 0
          ? this.menuItems2
          : this.menuItems2.filter(i => i.Type !== 'CoronaryIntervention')

        this.menuItems2 = this.Customer.MedicalRecordType.filter(i =>
          // i.FormCode === 'A01_037_050919_V' || i.FormCode === 'A01_038_050919_V' || i.FormCode === 'A01_195_050919_V').length > 0
          i.FormCode === 'A02_066_050919_VE').length > 0
          ? this.menuItems2
          : this.menuItems2.filter(i => i.Type !== 'GlamorganPressure')

        this.menuItems2 = this.Customer.MedicalRecordType.filter(i =>
          // i.FormCode === 'A01_035_050919_V').length > 0
          i.FormCode === 'A01_152_100122_VE').length > 0
          ? this.menuItems2
          : this.menuItems2.filter(i => i.Type !== 'CoordinatingWithThePatient')

        this.menuItems2 = this.Customer.MedicalRecordType.filter(i =>
          // i.FormCode === 'A01_035_050919_V').length > 0
          i.FormCode === 'A01_159_050919_VE').length > 0
          ? this.menuItems2
          : this.menuItems2.filter(i => i.Type !== 'CommitmentPaperToTakeThePlacenta')

        // Đánh giá tình trạng trẻ trong 2 giờ sau sinh
        this.menuItems2 = this.Customer.MedicalRecordType.filter(i =>
          // i.FormCode === 'A01_035_050919_V').length > 0 && this.Customer.HideFormNewborn
          i.FormCode === 'A02_016_061022_VE').length > 0 && this.Customer.HideFormNewborn
          ? this.menuItems2
          : this.menuItems2.filter(i => i.Type !== 'AssessmentOfInfantStatusDuringTheFirst2HoursOfExtrauterineLife')

        // Phiếu theo dõi người bệnh thoát mạch thuốc điều trị ung thư
        this.menuItems2 = this.Customer.MedicalRecordType.filter(i =>
          i.FormCode === 'A02_041_050919_V').length > 0
          ? this.menuItems2
          : this.menuItems2.filter(i => i.Type !== 'MonitorSheetForPatient')

        // Phiếu khai thác tiền sử dùng thuốc bệnh - Nhi
        // this.menuItems2 = this.Customer.MedicalRecordType.filter(i =>
        //   i.FormCode === 'A03_124_120421_VE').length > 0
        //   ? this.menuItems2
        //   : this.menuItems2.filter(i => i.Type !== 'MHFForNewBorn')

        // Phiếu ghi nhận thuốc y lệnh miệng
        this.menuItems2 = this.Customer.MedicalRecordType.filter(i =>
          i.FormCode === 'A03_030_290321_VE').length > 0
          ? this.menuItems2
          : this.menuItems2.filter(i => i.Type !== 'VerbalOrderForm')

        if (this.Customer.MedicalRecordType.filter(i => i.FormCode === 'A01_038_050919_V' || i.FormCode === 'A01_035_050919_V').length > 0) {
          for (let i = 0; i < this.menuItems2.length; i++) {
            if (this.menuItems2[i].Type === 'InitialAssessment/ForAdult') {
              this.menuItems2[i].Role = [1, 2, 3]
            }
          }
        }
      } else {
        this.menuItems2 = this.menuItems2.filter(i => i.Type !== 'GlamorganPressure')
        this.menuItems2 = this.menuItems2.filter(i => i.Type !== 'AssessmentOfInfantStatusDuringTheFirst2HoursOfExtrauterineLife')
      }
      // upload image lên đầu
      const menuUploadImage = {
        ViName: 'Upload File',
        EnName: 'Upload File',
        Type: 'UploadImage',
        Role: [1, 2, 3],
        Permission: 'IPD-MENU0052'
      }
      this.checkHasForm2(menuUploadImage)
    },
    getdataMenu (value) {
      console.log('a', value, this.menuItems2)
    },
    checkHasForm (itemttm) {
      let check = true
      this.menuItems2.find(e => {
        if (e.Type === itemttm.Type) {
          check = false
        }
      })
      if (check) {
        this.menuItems2.push(itemttm)
      }
    },
    checkHasForm2 (itemttm) {
      let check = true
      this.menuItems2.find(e => {
        if (e.Type === itemttm.Type) {
          check = false
        }
      })
      if (check) {
        this.menuItems2.unshift(itemttm)
      }
    }
  }
}
</script>
