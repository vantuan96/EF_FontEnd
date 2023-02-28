const MENU = {
  IPD: [
    {
      ViName: 'Đánh giá ban đầu',
      EnName: 'Initial Assessment',
      Type: 'InitialAssessment/ForAdult',
      Role: [2]
    },
    {
      ViName: 'Bệnh án nội khoa',
      EnName: 'MedicalRecord',
      Type: 'MedicalRecord/Part2',
      Role: [1, 3]
    },
    {
      ViName: 'Bệnh án nội khoa',
      EnName: 'MedicalRecord',
      Type: 'MedicalRecord/Part1',
      Role: [2]
    },
    {
      ViName: 'Đánh giá nguy cơ ngã',
      EnName: 'Fall Risk Assessment Adult',
      Type: 'FallRiskAssessment',
      Role: [2]
    },
    {
      ViName: 'Thêm theo dõi',
      EnName: 'Add observation',
      Type: 'ProgressNote',
      Role: [2, 1, 3]
    },
    {
      ViName: 'Phiếu GDSK cho NB và thân nhân',
      EnName: 'Patient and family education form',
      Type: 'PFEF',
      Role: [2]
    },
    {
      ViName: 'Bảng kiểm an toàn phẫu thuật/thủ thuật',
      EnName: 'Surgical Procedure Safety Checklist',
      Type: 'SurgicalProcedureSafetyChecklist',
      Role: [2]
    },
    {
      ViName: 'Biên bản hội chẩn bệnh nhân sử dụng thuốc có dấu sao (*)',
      EnName: 'Minutes of consultation for patient using drug with an asterisk mark(*)',
      Type: 'ConsultationDrugWithAnAsterisk',
      Role: [1, 3]
    },
    {
      ViName: 'Bảng hồi sinh tim phổi',
      EnName: 'Cardiac Arrest Record',
      Type: 'CardiacArrestRecord',
      Role: [1, 2, 3]
    },
    {
      ViName: 'Kế hoạch điều trị và chăm sóc',
      EnName: 'Plan Of Care',
      Type: 'PlanOfCare',
      Role: [1, 2, 3]
    },
    {
      ViName: 'Báo cáo y tế ra viện',
      EnName: 'Discharge medical report',
      Type: 'IPDDischargeMedicalReport',
      Role: [4]
    },
    {
      ViName: 'Giấy chuyển viện',
      EnName: 'Referral Letter',
      Type: 'IPDReferralLetter',
      Role: [4]
    },
    {
      ViName: 'Giấy chuyển tuyến',
      EnName: 'Transfer Letter',
      Type: 'IPDTransferLetter',
      Role: [4]
    },
    {
      ViName: 'Biên bản bàn giao NB chuyển khoa',
      EnName: 'Hand Over Check List',
      Type: 'HandOverCheckList',
      Role: [4]
    },
    {
      ViName: 'Phiếu phẫu thuật/thủ thuật',
      EnName: 'Surgery and procedure Note',
      Type: 'ProcedureSummary',
      Role: [1, 3]
    },
    {
      ViName: 'Biên bản hội chẩn thông qua mổ',
      EnName: 'Joint-Consultation for approval of surgery',
      Type: 'JointConsultationForApprovalOfSurgery',
      Role: [1, 3, 2]
    },
    {
      ViName: 'Thang điểm GUSS đánh giá rối loạn nuốt',
      EnName: 'Gugging Swallowing Screen',
      Type: 'GuggingSwallowingScreen',
      Role: [1, 3, 2]
    }
  ],
  OPD: [
    {
      ViName: 'Đánh giá ban đầu',
      EnName: 'Initial Assessment',
      Type: 'InitialAssessment'
    },
    {
      ViName: 'Thêm theo dõi',
      EnName: 'Patient Progress Note',
      Type: 'PatientProgressNote'
    },
    {
      ViName: 'Phiếu khám ngoại trú',
      EnName: 'Outpatient Examination Note',
      Type: 'OutpatientExaminationNote'
    },
    {
      ViName: 'Báo cáo y tế',
      EnName: 'Medical report',
      Type: 'MedicalReport'
    },
    {
      ViName: 'Giấy chuyển tuyến',
      EnName: 'Transfer Letter',
      Type: 'OPDTransferLetter'
    },
    {
      ViName: 'Giấy chuyển viện',
      EnName: 'Referral Letter',
      Type: 'OPDReferralLetter'
    },
    {
      ViName: 'Biên bản bàn giao NB chuyển khoa',
      EnName: 'Hand Over Check List',
      Type: 'HandOverCheckList'
    },
    {
      ViName: 'Tóm tắt ca bệnh phức tạp',
      EnName: 'Complex Outpatient Case Summary',
      Type: 'ComplexOutpatientCaseSummary'
    },
    {
      ViName: 'Ghi nhận thực hiện thuốc',
      EnName: 'Standing Order',
      Type: 'StandingOrder'
    },
    {
      ViName: 'Phiếu phẫu thuật/thủ thuật',
      EnName: 'Surgery and procedure Note',
      Type: 'ProcedureSummary'
    },
    {
      ViName: 'Giấy chứng nhận thủ thuật',
      EnName: 'Procedure Sumarry Certification',
      Type: 'ProcedureSummaryCertification'
    },
    {
      ViName: 'Biên bản hội chẩn',
      EnName: 'Joint Consultation Group Minutes',
      Type: 'JointConsultationGroupMinutes'
    },
    {
      ViName: 'Bảng kiểm an toàn phẫu thuật/thủ thuật',
      EnName: 'Surgical Procedure Safety Checklist',
      Type: 'SurgicalProcedureSafetyChecklist'
    },
    {
      ViName: 'Bảng hồi sinh tim phổi',
      EnName: 'Cardiac Arrest Record',
      Type: 'CardiacArrestRecord'
    }
  ],
  ED: [
    {
      ViName: 'Phân loại cấp cứu',
      EnName: 'Emergency triage record',
      Type: 'EmergencyTriageRecord',
      Role: [2]
    },
    {
      ViName: 'Ghi nhận thực hiện thuốc',
      EnName: 'Record administration standing order medication',
      Type: 'StandingOrder',
      Role: [2]
    },
    {
      ViName: 'Ghi nhận thực hiện thuốc NB dịch vụ lẻ',
      EnName: 'Standing Order For Retail Service',
      Type: 'StandingOrderForRetailService',
      Role: [2]
    },
    {
      ViName: 'Bệnh án cấp cứu',
      EnName: 'Emergency record',
      Type: 'ER0',
      Role: [1, 3]
    },
    {
      ViName: 'Bệnh án cấp cứu ngoại viện',
      EnName: 'Ambulance Run Report',
      Type: 'AmbulanceRunReport',
      Role: [1, 2, 3]
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
      Role: [1, 3]
    },
    {
      ViName: 'Bảng kiểm bàn giao người bệnh trước mổ',
      EnName: 'Pre-operative verification and handover checklist',
      Type: 'PHC',
      Role: [2]
    },
    {
      ViName: 'Báo cáo y tế',
      EnName: 'Medical report',
      Type: 'KLM',
      Role: [4]
    },
    {
      ViName: 'Báo cáo y tế ra viện',
      EnName: 'Discharge medical report',
      Type: 'DMR',
      Role: [4]
    },
    {
      ViName: 'Giấy ra viện',
      EnName: 'DischargeCertificate',
      Type: 'NPQ',
      Role: [4]
    },
    {
      ViName: 'Giấy chuyển tuyến',
      EnName: 'Transfer Letter',
      Type: 'EDTransferLetter',
      Role: [4]
    },
    {
      ViName: 'Bàn giao vận chuyển',
      EnName: 'Hand over form for patients being transferred',
      Type: 'MCA',
      Role: [2, 4]
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
      Type: 'RL0',
      Role: [4]
    },
    {
      ViName: 'Phiếu GDSK cho NB và thân nhân',
      EnName: 'Patient and family education form',
      Type: 'PFEF',
      Role: [2]
    },
    {
      ViName: 'Giấy xác nhận BN cấp cứu',
      EnName: 'Emergency confirmation',
      Type: 'EMCO',
      Role: [4]
    },
    {
      ViName: 'Xét nghiệm sinh hóa máu',
      EnName: 'Chemical biology test',
      Type: 'PointOfCareTesting/ChemicalBiologyTest',
      Role: [1, 3, 2]
    },
    {
      ViName: 'Xét nghiệm khí máu động mạch',
      EnName: 'Arterial blood gas test',
      Type: 'PointOfCareTesting/ArterialBloodGasTest',
      Role: [1, 3, 2]
    },
    {
      ViName: 'Phiếu phẫu thuật/thủ thuật',
      EnName: 'Surgery and procedure Note',
      Type: 'ProcedureSummary',
      Role: [1, 3]
    },
    {
      ViName: 'Kết quả test da',
      EnName: 'Skin test result',
      Type: 'SkinTestResult',
      Role: [1, 2, 3]
    },
    {
      ViName: 'Biên bản hội chẩn bệnh nhân sử dụng thuốc có dấu sao (*)',
      EnName: 'Minutes of consultation for patient using drug with an asterisk mark(*)',
      Type: 'ConsultationDrugWithAnAsterisk',
      Role: [1, 3]
    },
    {
      ViName: 'Biên bản hội chẩn thông qua mổ',
      EnName: 'Joint-Consultation for approval of surgery',
      Type: 'JointConsultationForApprovalOfSurgery',
      Role: [1, 3]
    },
    {
      ViName: 'Biên bản hội chẩn',
      EnName: 'Joint Consultation Group Minutes',
      Type: 'JointConsultationGroupMinutes',
      Role: [1, 3]
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
      Role: [1, 2, 3]
    },
    {
      ViName: 'Bảng hồi sinh tim phổi',
      EnName: 'Cardiac Arrest Record',
      Type: 'CardiacArrestRecord',
      Role: [1, 2, 3]
    },
    {
      ViName: 'Giấy chứng nhận thương tích',
      EnName: 'Injury Certificate',
      Type: 'InjuryCertificate',
      Role: [3, 4]
    },
    {
      ViName: 'Kiểm thảo tử vong',
      EnName: 'Mortality Report',
      Type: 'MortalityReport',
      Role: [1, 2, 3]
    },
    {
      ViName: 'Phiếu ghi nhận sử dụng thuốc do người bệnh mang vào',
      EnName: 'Patient Own Medications Chart',
      Type: 'PatientOwnMedicationsChart',
      Role: [1, 2, 3]
    },
    {
      ViName: 'Bảng đánh giá nhu cầu trang thiết bị/ nhân lực vận chuyển ngoại viện',
      EnName: 'External Transportation Assessment',
      Type: 'ExternalTransportationAssessment',
      Role: [1, 2, 3]
    }
  ]
}
export default MENU
