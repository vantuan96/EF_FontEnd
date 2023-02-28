<template>
  <MDContextMenu :VisitId="EdId" :MenuPositon='MenuPositon' :Customer='Customer' :menuItems="menuItems" Type="ED"/>
</template>
<script>
import _ from 'lodash'
export default {
  name: 'EdContextMenu',
  props: ['items', 'EdId', 'Type', 'MenuPositon', 'Customer'],
  components: {},
  data () {
    return {
      menuId: this.makeid(),
      countOfForm: 10,
      heightItemLi: 30,
      menuClass: '',
      menuTop: 0,
      menuItems: [
        {
          ViName: 'Phân loại cấp cứu',
          EnName: 'Emergency triage record',
          Type: 'EmergencyTriageRecord',
          Role: [2],
          Group: 2
        },
        {
          ViName: 'Ghi nhận thực hiện thuốc Standing Order',
          EnName: 'Record administration standing order medication',
          Type: 'StandingOrder',
          Role: [1, 3, 2],
          Group: 3
        },
        {
          ViName: 'Ghi nhận thực hiện thuốc NB dịch vụ lẻ',
          EnName: 'Standing Order For Retail Service',
          Type: 'StandingOrderForRetailService',
          Role: [2],
          Group: 3
        },
        {
          ViName: 'Bệnh án cấp cứu',
          EnName: 'Emergency record',
          Type: 'ER0',
          Role: [1, 3],
          Group: 2
        },
        {
          ViName: 'Bệnh án cấp cứu ngoại viện',
          EnName: 'Ambulance Run Report',
          Type: 'AmbulanceRunReport',
          Role: [1, 2, 3],
          Group: 2
        },
        {
          ViName: 'Thêm theo dõi',
          EnName: 'Add observation',
          Type: 'ProgressNote',
          Role: [2, 1, 3]
        },
        {
          ViName: 'Đánh giá kết thúc',
          EnName: 'Discharge information',
          Type: 'DI0',
          Role: [1, 3],
          Group: 9
        },
        {
          ViName: 'Bảng kiểm chuẩn bị và bàn giao NB trước phẫu thuật',
          EnName: 'Pre-operative verification and handover checklist',
          Type: 'PHC',
          Role: [2],
          Group: 6
        },
        {
          ViName: 'Báo cáo y tế',
          EnName: 'Medical report',
          Type: 'EDMedicalReport',
          Role: [4],
          Group: 9
        },
        {
          ViName: 'Báo cáo y tế ra viện',
          EnName: 'Discharge medical report',
          Type: 'EDDischargeMedicalReport',
          Role: [4],
          Group: 9
        },
        {
          ViName: 'Giấy ra viện',
          EnName: 'Hospital Discharge Form',
          Type: 'NPQ',
          Role: [4],
          Group: 9
        },
        {
          ViName: 'Giấy chuyển tuyến',
          EnName: 'Transfer Letter',
          Type: 'EDTransferLetter',
          Role: [4],
          Group: 9
        },
        {
          ViName: 'Bàn giao vận chuyển',
          EnName: 'Hand over form for patients being transferred',
          Type: 'MCA',
          Role: [2, 4],
          Group: 9
        },
        {
          ViName: 'Biên bản bàn giao người bệnh chuyển khoa',
          EnName: 'Patient hand over record',
          Type: 'PHR',
          Role: [2, 4]
        },
        {
          ViName: 'Giấy chuyển viện',
          EnName: 'ReferralLetter',
          Type: 'EDReferralLetter',
          Role: [4],
          Group: 9
        },
        {
          ViName: 'Phiếu GDSK cho NB và thân nhân',
          EnName: 'Patient and family education form',
          Type: 'PatientAndFamilyEducation',
          Role: [1, 2, 3],
          Group: 9
        },
        {
          ViName: 'Giấy xác nhận BN cấp cứu',
          EnName: 'Emergency confirmation',
          Type: 'EMCO',
          Role: [4],
          Group: 10
        },
        {
          ViName: 'Xét nghiệm tại chỗ - Sinh hóa máu Catridge CHEM8+',
          EnName: 'Point of care testing - Chemistry Catridge CHEM8+',
          Type: 'PointOfCareTesting/ChemicalBiologyTest',
          Role: [1, 3, 2],
          Group: 7
        },
        {
          ViName: 'Xét nghiệm tại chỗ - Khí máu Cartridge CG4+',
          EnName: 'Point of care testing - Blood gas analysis Cartridge CG4+',
          Type: 'PointOfCareTesting/ArterialBloodGasTest',
          Role: [1, 3, 2],
          Group: 7
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
          ViName: 'Kết quả test da',
          EnName: 'Skin test result',
          Type: 'SkinTestResult',
          Role: [1, 2, 3],
          Group: 7
        },
        {
          ViName: 'Biên bản hội chẩn bệnh nhân sử dụng thuốc có dấu sao (*)',
          EnName: 'Minutes of consultation for patient using drug with an asterisk mark(*)',
          Type: 'ConsultationDrugWithAnAsterisk',
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
          ViName: 'Biên bản hội chẩn',
          EnName: 'Joint Consultation Group Minutes',
          Type: 'JointConsultationGroupMinutes',
          Role: [1, 3],
          Group: 2
        },
        {
          ViName: 'Phiếu dự trù, cung cấp và xác nhận thực hiện máu - Chế phẩm máu',
          EnName: 'Blood Request Supply And Confirmation',
          Type: 'BloodRequestSupplyAndConfirmation',
          Role: [1, 2, 3]
        },
        {
          ViName: 'Phiếu truyền máu',
          EnName: 'Blood Transfusion Checklist',
          Type: 'BloodTransfusionChecklist',
          Role: [1, 2, 3],
          Group: 10
        },
        {
          ViName: 'Bảng hồi sinh tim phổi',
          EnName: 'Cardiac Arrest Record',
          Type: 'CardiacArrestRecord',
          Role: [1, 2, 3],
          Group: 10
        },
        {
          ViName: 'Giấy chứng nhận thương tích',
          EnName: 'Injury Certificate',
          Type: 'InjuryCertificate',
          Role: [3, 4],
          Group: 11
        },
        {
          ViName: 'Kiểm thảo tử vong',
          EnName: 'Mortality Report',
          Type: 'MortalityReport',
          Role: [1, 2, 3],
          Group: 10
        },
        {
          ViName: 'Phiếu ghi nhận sử dụng thuốc do người bệnh mang vào',
          EnName: 'Patient Own Medications Chart',
          Type: 'PatientOwnMedicationsChart',
          Role: [1, 3],
          Group: 3
        },
        {
          ViName: 'Bảng đánh giá nhu cầu trang thiết bị/ nhân lực vận chuyển ngoại viện',
          EnName: 'External Transportation Assessment',
          Type: 'ExternalTransportationAssessment',
          Role: [1, 2, 3],
          Group: 10
        },
        {
          ViName: 'Biên bản hội chẩn sử dụng kháng sinh cần ưu tiên quản lý',
          EnName: 'Highly Restricted Antimicrobial Consult',
          Type: 'HighlyRestrictedAntimicrobialConsult',
          Role: [1, 3],
          Group: 2
        },
        {
          ViName: 'Bảng sàng lọc nguy cơ tự hại',
          EnName: 'Self-Harm Risk Screening Tool',
          Type: 'SelfHarmRiskScreeningTool',
          Role: [1, 3],
          Group: 2
        },
        {
          ViName: 'Phiếu điều trị',
          EnName: `Physician's Note`,
          Type: 'PhysicianNote',
          Role: [1, 3],
          Group: 2
        },
        {
          ViName: 'Phiếu chăm sóc',
          EnName: `Nurse's Note`,
          Type: 'TakeCareNote',
          Role: [2],
          Group: 2
        },
        {
          ViName: 'Tóm tắt thủ thuật',
          EnName: 'Procedure Summary',
          Type: 'TrickSummary',
          Role: [1, 3]
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
          ViName: 'Phiếu cam kết truyền máu và các chế phẩm máu',
          EnName: 'Consent for transfusion of blood and/ or blood derived products',
          Type: 'ConsentForTransfusionOfBloodAndBloodDerivedProducts',
          Role: [5]
        },
        {
          ViName: 'Phiếu đồng ý xét nghiệm HIV',
          EnName: 'HIV Testing Consent Form',
          Type: 'HIVTestingConsent',
          Role: [5],
          Permission: 'IPD-MENU0049'
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
        // }
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
    const menuUploadImage = {
      ViName: 'Upload File',
      EnName: 'Upload File',
      Type: 'UploadImage',
      Role: [1, 2, 3]
    }
    this.menuItems.unshift(menuUploadImage)
    // Add new menuItem MortalityReport
    if (this.Customer.Version >= 11) {
      this.menuItems = this.menuItems.filter(e => e.Type !== 'MortalityReport')
      const indexOfInjuryCertificate = this.menuItems.findIndex(item => item.EnName === 'Injury Certificate')
      const menuMortalityReport = {
        ViName: 'Biên bản - Trích biên bản kiểm thảo tử vong',
        EnName: 'Minutes - Excerpt from the death audit report',
        Type: 'MortalityReportV2',
        Role: [1, 2, 3],
        Group: 10
      }
      this.menuItems.splice(indexOfInjuryCertificate - 1, 0, menuMortalityReport)
    }
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
