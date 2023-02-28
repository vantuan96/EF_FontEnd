<template>
  <MDContextMenu v-if="loaded" :VisitId="EdId" :MenuPositon='MenuPositon' :IsAnesthesia="IsAnesthesia" :IsTelehealth="IsTelehealth" :Customer='Customer' :menuItems="menuItems" Type="OPD"/>
</template>
<script>
import _ from 'lodash'
export default {
  name: 'CONTEXT-MENU',
  props: ['items', 'EdId', 'Type', 'MenuPositon', 'Customer', 'IsAnesthesia', 'IsTelehealth'],
  components: {},
  data () {
    return {
      menuId: this.makeid(),
      countOfForm: 10,
      heightItemLi: 30,
      menuClass: '',
      menuTop: 0,
      loaded: false,
      menuItems: [
        {
          ViName: 'Đánh giá ban đầu',
          EnName: 'Initial Assessment',
          Type: 'InitialAssessment',
          Role: [2],
          Group: 2,
          GayMe: true
        },
        {
          ViName: 'Đánh giá ban đầu NB dịch vụ lẻ',
          EnName: 'Initial assessment of patients with retail services',
          Type: 'InitialAssessment/RetailService',
          Role: [2],
          Group: 3
        },
        {
          ViName: 'Theo dõi thực hiện thuốc NB dịch vụ lẻ',
          EnName: 'Standing Order For Retail Service',
          Type: 'StandingOrderForRetailService',
          Role: [2],
          Group: 3
        },
        {
          ViName: 'Thêm theo dõi',
          EnName: 'Patient Progress Note',
          Type: 'PatientProgressNote',
          Role: [2]
        },
        {
          ViName: 'Phiếu khám ngoại trú',
          EnName: 'Outpatient Examination Note',
          Type: 'OutpatientExaminationNote',
          Role: [1, 3],
          Group: 2
        },
        {
          ViName: 'Phiếu tư vấn',
          EnName: 'Counseling',
          Type: 'MedicalConsultation',
          Role: [1, 3],
          Group: 2
        },
        {
          ViName: 'Tóm tắt ca bệnh phức tạp',
          EnName: 'Complex Outpatient Case Summary',
          Type: 'ComplexOutpatientCaseSummary',
          Role: [1, 3],
          Group: 2
        },
        {
          ViName: 'Kết quả test da',
          EnName: 'Skill test result',
          Type: 'SkinTestResult',
          Role: [1, 3, 2],
          Group: 7
        },
        // {
        //   ViName: 'Phiếu phẫu thuật/thủ thuật',
        //   EnName: 'Surgery and procedure Note',
        //   Type: 'ProcedureSummary',
        //   Role: [1, 3],
        //   Group: 6
        // },
        {
          ViName: 'Tóm tắt phẫu thuật',
          EnName: 'Surgery summary',
          Type: 'SurgeryAndProcedureSummary',
          Role: [1, 3],
          Group: 6
        },
        {
          ViName: 'Ghi nhận thực hiện thuốc Standing Order',
          EnName: 'Record administration standing order medication',
          Type: 'StandingOrder',
          Role: [1, 3, 2],
          Group: 3
        },
        {
          ViName: 'Biên bản hội chẩn',
          EnName: 'Joint Consultation Group Minutes',
          Type: 'JointConsultationGroupMinutes',
          Role: [1, 3],
          Group: 2
        },
        {
          ViName: 'Biên bản hội chẩn thông qua mổ',
          EnName: 'Joint-Consultation for approval of surgery',
          Type: 'JointConsultationForApprovalOfSurgery',
          Role: [1, 3],
          Group: 6
        },
        {
          ViName: 'Bảng kiểm chuẩn bị và bàn giao người bệnh trước phẫu thuật',
          EnName: 'Pre-operative verification and handover checklist',
          Type: 'PHC',
          Role: [2],
          Group: 6
        },
        {
          ViName: 'Bảng kiểm an toàn phẫu thuật/thủ thuật',
          EnName: 'Surgical Procedure Safety Checklist',
          Type: 'SurgicalProcedureSafetyChecklist',
          Role: [2],
          Group: 6
        },
        {
          ViName: 'Báo cáo y tế',
          EnName: 'Medical report',
          Type: 'OPDMedicalReport',
          Role: [4],
          Group: 9
        },
        {
          ViName: 'Giấy chuyển viện',
          EnName: 'Referral Letter',
          Type: 'OPDReferralLetter',
          Role: [4],
          Group: 9
        },
        {
          ViName: 'Giấy xác nhận tình trạng bệnh tật',
          EnName: 'Medical Certificate',
          Type: 'OPDDiseasesCertification',
          Role: [4],
          Group: 9
        },
        {
          ViName: 'Giấy chuyển tuyến',
          EnName: 'Transfer Letter',
          Type: 'OPDTransferLetter',
          Role: [4],
          Group: 9
        },
        {
          ViName: 'Biên bản bàn giao NB chuyển khoa',
          EnName: 'Hand Over Check List',
          Type: 'HandOverCheckList',
          Role: [4],
          Group: 2
        },
        {
          ViName: 'Bệnh án ngoại trú',
          EnName: 'Medical record for outpatient',
          Type: 'MedicalRecordForOutpatient',
          Role: [4]
        },
        // {
        //   ViName: 'Giấy chứng nhận thủ thuật',
        //   EnName: 'Procedure Sumarry Certification',
        //   Type: 'ProcedureSummaryCertification',
        //   Role: [1, 3]
        // },
        {
          ViName: 'Bảng hồi sinh tim phổi',
          EnName: 'Cardiac Arrest Record',
          Type: 'CardiacArrestRecord',
          Role: [1, 3, 2],
          Group: 10
        },
        {
          ViName: 'Phiếu đánh giá nguy cơ di truyền trong sàng lọc ung thư vú',
          EnName: 'NCCN BR/OV-1',
          Type: 'NCCNBROV1',
          Role: [1, 3]
        },
        {
          ViName: 'Phiếu thông tin khách hàng - Đánh giá nguy cơ ung thư',
          EnName: 'Patient information - The risk assessment for cancer',
          Type: 'BreastCancerRiskAssessment',
          Role: [1, 3]
        },
        {
          ViName: 'Biên bản phối hợp với bệnh nhân/ gia đình xử lý thai chết lưu',
          EnName: 'Coordinating with the patient/ family to deal with a stillbirth',
          Type: 'CoordinatingWithThePatient',
          Role: [1, 3],
          Permission: 'IPD-MENU0043'
        },
        {
          ViName: 'Phiếu đánh giá tiêu chuẩn chỉ định xét nghiệm GEN BRCA 1/2',
          EnName: 'Phiếu đánh giá tiêu chuẩn chỉ định xét nghiệm GEN BRCA 1/2',
          Type: 'GENBRCA1',
          Role: [1, 2, 3]
        },
        {
          ViName: 'Tóm tắt thủ thuật',
          EnName: 'Procedure Summary',
          Type: 'TrickSummary',
          Role: [1, 3]
        },
        {
          ViName: 'Phiếu GDSK cho NB và thân nhân',
          EnName: 'Patient and family education form',
          Type: 'PatientAndFamilyEducation',
          Role: [1, 2, 3]
        },
        {
          ViName: 'PROM bệnh nhân mạch vành',
          EnName: 'PROM for coronary disease',
          Type: 'PromForCoronaryDisease',
          Role: [1, 2, 3]
        },
        {
          ViName: 'PROM bệnh nhân suy tim',
          EnName: 'PROM for heart failure',
          Type: 'PROMForHeartFailure',
          Role: [1, 2, 3]
        },
        {
          ViName: 'Phiếu cam kết phẫu thuật/ thủ thuật/ điều trị có nguy cơ cao',
          EnName: 'Consent for Operation/ Procedure/ High risk treatment',
          Type: 'ConsentForOperation',
          Role: [5],
          Permission: 'IPD-MENU0049'
        },
        {
          ViName: 'Phiếu đồng ý xét nghiệm HIV',
          EnName: 'HIV Testing Consent Form',
          Type: 'HIVTestingConsent',
          Role: [5],
          Permission: 'IPD-MENU0050'
        },
        {
          ViName: 'XNTC - Đông máu ACT (Cartridge Kaolin ACT)',
          EnName: 'POCT - Coagulation ACT (Catridge Kaolin ACT)',
          Type: 'CartridgeKaolinACT',
          Role: [1, 3, 2]
        },
        {
          ViName: 'Phiếu yêu cầu khám chuyên khoa hô hấp tiền phẫu',
          EnName: 'Request For Pre Surgery Respiratory Consultation',
          Type: 'CKHoHapTienPhau',
          Role: [1, 2, 3]
        },
        {
          ViName: 'Phiếu yêu cầu khám chuyên khoa tim mạch tiền phẫu',
          EnName: 'Request For Pre Surgery Cardiology Consultation',
          Type: 'RequestForPreSurgeryCardiologyConsultation',
          Role: [1, 2, 3]
        },
        {
          ViName: 'Phiếu khám gây mê',
          EnName: 'Pre-Anesthesia Consultation',
          Type: 'PreAnesthesiaConsultation',
          Role: [1, 2, 3]
        },
        {
          ViName: 'Quản lý thai nghén',
          EnName: 'Pregnancy Follow Up Record',
          Type: 'PregnancyFollowUpRecord/ObstetricInformation',
          Role: [1, 3]
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
        // {
        //   ViName: 'Đơn thuốc',
        //   EnName: `Đơn thuốc`,
        //   Type: 'Prescription',
        //   Role: [1, 3]
        // },
        // {
        //   ViName: 'Chỉ định',
        //   EnName: `Chỉ định`,
        //   Type: 'DoctorPlaceDiagnosticsOrder',
        //   Role: [1, 3]
        // },
      ],
      Doctor: {
        id: 3,
        ViName: 'Bác sĩ',
        EnName: 'Doctor',
        Active: true
      },
      Nurse: {
        id: 2,
        ViName: 'Điều dưỡng',
        EnName: 'Nurse',
        Active: false
      },
      current: 3
    }
  },
  created () {
    if (this.menuItems.find(i => i.Type === 'SurgicalProcedureSafetyChecklist') && this.Customer.Version >= 9) {
      this.menuItems = this.menuItems.filter(i => i.Type !== 'SurgicalProcedureSafetyChecklist')
    }
    if (this.$store.state.account.Position.includes('Doctor')) {
      this.Doctor.id = 1
      this.current = 1
    } else {
      this.current = 2
    }
    if (this.hasRole('VIEW002')) {
      this.menuItems.unshift(
        {
          ViName: 'Chỉ định dịch vụ',
          EnName: `Place Diagnostics Order`,
          Type: 'DoctorPlaceDiagnosticsOrder',
          Role: [1, 3]
        }
      )
    }
    if (this.hasRole('VIEW003')) {
      this.menuItems.unshift(
        {
          ViName: 'Đơn thuốc',
          EnName: `Prescription`,
          Type: 'Prescription',
          Role: [1, 2, 3]
        }
      )
    }
    if (this.hasRole('VIEW004')) {
      this.menuItems.unshift(
        {
          ViName: 'Y lệnh nội trú',
          EnName: `Medication Administration Record`,
          Type: 'MedicationAdministrationRecord',
          Role: [1, 2, 3]
        }
      )
    }
    if (this.Customer && this.Customer.PromissoryNote && this.Customer.PromissoryNote.length) {
      this.Customer.PromissoryNote.find(e => {
        if (e.FormCode === 'A03_116_200520_V') {
          this.menuItems.push(
            {
              ViName: 'Phiếu khám lâm sàng vú',
              EnName: 'Clinical breast examNote',
              Type: 'ClinicalBreastExamNote',
              Role: [1, 3]
            }
          )
        }
      })
    }
    this.menuItems = this.Customer.PromissoryNote && this.Customer.PromissoryNote.filter(i => i.Type === 'A01_152_100122_VE').length > 0 ? this.menuItems : this.menuItems.filter(i => i.Type !== 'CoordinatingWithThePatient')
    this.menuItems = this.Customer.PromissoryNote && this.Customer.PromissoryNote.filter(i => i.Type === 'NCCNBROV1').length > 0 ? this.menuItems : this.menuItems.filter(i => i.Type !== 'NCCNBROV1')
    this.menuItems = this.Customer.PromissoryNote && this.Customer.PromissoryNote.filter(i => i.Type === 'BreastCancerRiskAssessment').length > 0 ? this.menuItems : this.menuItems.filter(i => i.Type !== 'BreastCancerRiskAssessment')
    this.menuItems = this.Customer.PromissoryNote && this.Customer.PromissoryNote.filter(i => i.Type === 'A03_119_201119_V').length > 0 ? this.menuItems : this.menuItems.filter(i => i.Type !== 'GENBRCA1')
    this.menuItems = this.Customer.PromissoryNote && this.Customer.PromissoryNote.filter(i => i.Type === 'PromForCoronaryDisease').length > 0 ? this.menuItems : this.menuItems.filter(i => i.Type !== 'PromForCoronaryDisease' && i.Type !== 'PROMForHeartFailure')
    this.menuItems = this.Customer.PromissoryNote && this.Customer.PromissoryNote.filter(i => i.Type === 'A01_067_050919_VE').length > 0 ? this.menuItems : this.menuItems.filter(i => i.Type !== 'PregnancyFollowUpRecord/ObstetricInformation')
    if (this.IsAnesthesia) {
      this.menuItems = this.menuItems.filter(item => item.Type === 'RequestForPreSurgeryCardiologyConsultation' || item.Type === 'CKHoHapTienPhau' || item.Type === 'PreAnesthesiaConsultation' || item.Type === 'InitialAssessment')
    } else {
      this.menuItems = this.menuItems.filter(item => item.Type !== 'RequestForPreSurgeryCardiologyConsultation' && item.Type !== 'CKHoHapTienPhau' && item.Type !== 'PreAnesthesiaConsultation')
    }
    // Thay phieu kham bang phieu kham telehealth
    if (this.IsTelehealth || this.CurrentPatientObj.IsTelehealth) {
      const indexOfConsultation = this.menuItems.findIndex(item => item.Type === 'MedicalConsultation')
      const menuTelehealth = {
        ViName: 'Phiếu khám Telehealth',
        EnName: 'Telehealth Examination Note',
        Type: 'TelehealthExaminationNote',
        Role: [1, 3],
        Group: 2
      }
      this.menuItems = this.menuItems.filter(item => item.ViName !== 'Phiếu khám ngoại trú' && item.Type !== 'OutpatientExaminationNote')
      this.menuItems.splice(indexOfConsultation - 1, 0, menuTelehealth)
    }
    const menuUploadImage = {
      ViName: 'Upload File',
      EnName: 'Upload File',
      Type: 'UploadImage',
      Role: [1, 2, 3],
      Permission: 'OPD-MENU0052'
    }
    this.menuItems.unshift(menuUploadImage)
    this.loaded = true
  },
  computed: {
    listRoles: function () {
      return (_.sortBy([this.Doctor, this.Nurse], o => o.id)).concat([
        {
          id: 4,
          ViName: 'Bản in',
          EnName: 'Print Document',
          Active: false
        }
      ])
    }
  }
}
</script>
