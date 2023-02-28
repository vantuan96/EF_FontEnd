<template>
  <MDContextMenu :VisitId="VisitId" :MenuPositon='MenuPositon' :Customer='Customer' :menuItems="menuItems" Type="EOC"/>
</template>
<script>
export default {
  name: 'EOC-CONTEXT-MENU',
  props: ['VisitId', 'MenuPositon', 'Customer'],
  data () {
    return {
      menuItems: [
        {
          ViName: 'Upload File',
          EnName: `Upload File`,
          Type: 'UploadImage',
          Role: [1, 2, 3]
        },
        {
          ViName: 'Đơn thuốc',
          EnName: `Prescription`,
          Type: 'Prescription',
          Role: [1, 2, 3]
        },
        {
          ViName: 'Chỉ định dịch vụ',
          EnName: `Place Diagnostics Order`,
          Type: 'DoctorPlaceDiagnosticsOrder',
          Role: [1, 2, 3]
        },
        {
          ViName: 'Đánh giá ban đầu',
          EnName: 'Initial Assessment',
          Type: 'InitialAssessment',
          Role: [2],
          Group: 2
        },
        {
          ViName: 'Thêm theo dõi',
          EnName: 'Patient Progress Note',
          Type: 'PatientProgressNote',
          Role: [2]
        },
        {
          ViName: 'Phiếu khám bệnh',
          EnName: 'Patient Examination Note',
          Type: 'OutpatientExaminationNote',
          Role: [1, 3]
        },
        {
          ViName: 'Tóm tắt ca bệnh phức tạp',
          EnName: 'Complex Outpatient Case Summary',
          Type: 'ComplexOutpatientCaseSummary',
          Role: [1, 3]
        },
        {
          ViName: 'Kết quả test da',
          EnName: 'Kết quả test da',
          Type: 'SkinTestResult',
          Role: [1, 2, 3],
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
          Role: [1, 2, 3],
          Group: 3
        },
        {
          ViName: 'Bảng kiểm chuẩn bị và bàn giao NB trước phẫu thuật',
          EnName: 'Pre-operative verification and handover checklist',
          Type: 'PHC',
          Role: [2],
          Group: 6
        },
        {
          ViName: 'Bảng kiểm an toàn phẫu thuật/ thủ thuật',
          EnName: 'Surgical Procedure Safety Checklist',
          Type: 'SurgicalProcedureSafetyChecklist',
          Role: [2],
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
          ViName: 'Bảng hồi sinh tim phổi',
          EnName: 'Cardiac Arrest Record',
          Type: 'CardiacArrestRecord',
          Role: [1, 2, 3],
          Group: 10
        },
        // {
        //   ViName: 'Giấy chứng nhận thủ thuật',
        //   EnName: 'Procedure Sumarry Certification',
        //   Type: 'ProcedureSummaryCertification',
        //   Role: [2]
        // },
        {
          ViName: 'Báo cáo y tế',
          EnName: 'Medical report',
          Type: 'EOCMedicalReport',
          Role: [4],
          Group: 9
        },
        {
          ViName: 'Giấy chuyển viện',
          EnName: 'Referral Letter',
          Type: 'EOCReferralLetter',
          Role: [4],
          Group: 9
        },
        {
          ViName: 'Giấy chuyển tuyến',
          EnName: 'Transfer Letter',
          Type: 'EOCTransferLetter',
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
          Permission: 'IPD-MENU0049'
        },
        {
          ViName: 'XNTC - Đông máu ACT (Cartridge Kaolin ACT)',
          EnName: 'POCT - Coagulation ACT (Catridge Kaolin ACT)',
          Type: 'CartridgeKaolinACT',
          Role: [1, 3, 2]
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
      ]
    }
  },
  created () {
    if (this.menuItems.find(i => i.Type === 'SurgicalProcedureSafetyChecklist') && this.Customer.Version >= 9) {
      this.menuItems = this.menuItems.filter(i => i.Type !== 'SurgicalProcedureSafetyChecklist')
    }
  }
}
</script>
