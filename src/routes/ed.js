export default [
  {
    path: '/ed/',
    name: 'ED-page',
    component: () => import('@/pages/ED/Index.vue'),
    meta: {
      name: 'Cấp cứu',
      roles: [4],
      requireSettingDepartment: true,
      auth: true,
      VisitTypeGroupCode: 'ED'
    },
    children: [
      {
        path: '/ed/',
        name: 'ED',
        component: () => import('@/pages/ED/Home.vue'),
        meta: {
          name: 'Cấp cứu',
          roles: [4],
          requireSettingDepartment: true
        },
        children: [
          {
            path: '/ed/',
            name: 'ListPatientInED',
            component: () => import('@/pages/ED/PatientList/ListED.vue'),
            meta: {
              name: 'Danh sách người bệnh',
              roles: [4],
              requireSettingDepartment: true
            }
          },
          {
            path: '/ed/ListTransfer',
            name: 'ListPatientTransfer',
            component: () => import('@/pages/ED/PatientList/ListTransfer.vue'),
            meta: {
              name: 'Danh sách người bệnh chuyển khoa',
              roles: [4],
              requireSettingDepartment: true
            }
          }
        ]
      },
      {
        path: '/ed/add',
        name: 'ED-Add-customer',
        component: () => import('@/pages/ED/Add.vue'),
        meta: {
          name: 'Thêm mới bệnh nhân',
          localKey: 'general.them_moi_benh_nhan',
          roles: [4],
          requireSettingDepartment: true
        }
      },
      {
        path: '/ed/tivi',
        name: 'ED-Tivi',
        component: () => import('@/pages/ED/Qms/Tivi.vue'),
        meta: {
          name: 'Thêm mới bệnh nhân',
          localKey: 'general.them_moi_benh_nhan',
          roles: [4],
          requireSettingDepartment: true
        }
      },
      {
        path: '/ed/view/:Id',
        name: 'ED-view',
        component: () => import('@/pages/ED/View.vue'),
        meta: {
          name: 'Thông tin bệnh nhân',
          localKey: 'general.thong_tin_benh_nhan',
          roles: [4],
          requireSettingDepartment: true,
          allowView: true
        }
      },
      {
        path: '/ED/all/detail/:Id',
        name: 'EDAllDetail',
        component: () => import('@/pages/Detail/Index.vue'),
        meta: {
          name: 'detail all',
          localKey: 'detail all',
          roles: [4],
          requireSettingDepartment: true
        },
        children: [
          {
            path: '/ED/all/detail/:Id/detailIpd',
            name: 'EDDETAILGROUP',
            component: () => import('@/pages/ED/View.vue'),
            meta: {
              name: 'Thông tin khách hàng',
              localKey: 'general.thong_tin_khach_hang',
              roles: [4],
              requireSettingDepartment: true,
              allowView: true
            }
          },
          {
            path: '/ED/all/detail/:Id/TomTatThongTinNguoiBenh',
            name: 'EDTomTatThongTinNguoiBenh',
            component: () => import('@/pages/Detail/TomTatThongTinNguoiBenh.vue'),
            meta: {
              name: 'Tóm tắt thông tin người bệnh',
              localKey: 'Tóm tắt thông tin người bệnh',
              roles: [4],
              requireSettingDepartment: true
            }
          }
        ]
      },
      {
        path: '/ed/EmergencyTriageRecord/:Id',
        name: 'ED-etr',
        component: () => import('@/pages/ED/EmergencyTriageRecord/Index.vue'),
        meta: {
          name: 'Phân loại bệnh nhân',
          localKey: 'general.phan_loai_benh_nhan',
          roles: [4],
          requireSettingDepartment: true,
          allowView: true
        }
      },
      {
        path: '/ed/FallRiskScreening/:Id',
        name: 'EDInitialAssessmentFallRiskScreening',
        component: () => import('@/pages/ED/EmergencyTriageRecord/FallRiskScreening/Index.vue'),
        meta: {
          name: 'Sàng lọc ngã',
          localKey: 'Sàng lọc ngã',
          roles: [4],
          requireSettingDepartment: true
        },
        children: [
          {
            path: '/ed/FallRiskScreening/:Id/:Item',
            name: 'EDInitialAssessmentFallRiskScreeningItem',
            component: () => import('@/pages/ED/EmergencyTriageRecord/FallRiskScreening/ItemV2.vue'),
            meta: {
              name: 'Sàng lọc ngã',
              localKey: 'Sàng lọc ngã',
              roles: [4],
              requireSettingDepartment: true
            }
          }
        ]
      },
      {
        path: '/ed/ExternalTransportationAssessment/:Id',
        name: 'EDExternalTransportationAssessment',
        component: () => import('@/pages/IPD/ExternalTransportationAssessment/ExternalTransportationAssessment.vue'),
        meta: {
          name: 'Bảng đánh giá nhu cầu trang thiết bị/ nhân lực vận chuyển ngoại viện',
          localKey: 'Bảng đánh giá nhu cầu trang thiết bị/ nhân lực vận chuyển ngoại viện',
          roles: [4],
          requireSettingDepartment: true
        },
        children: [
          {
            path: '/ed/ExternalTransportationAssessment/:Id/:Item',
            name: 'EDExternalTransportationAssessmentItem',
            component: () => import('@/pages/IPD/ExternalTransportationAssessment/Index.vue'),
            meta: {
              name: 'Bảng đánh giá nhu cầu trang thiết bị/ nhân lực vận chuyển ngoại viện',
              localKey: 'Bảng đánh giá nhu cầu trang thiết bị/ nhân lực vận chuyển ngoại viện',
              roles: [4],
              requireSettingDepartment: true
            }
          }
        ]
      },
      {
        path: '/ED/HighlyRestrictedAntimicrobialConsult/:Id',
        name: 'EDHighlyRestrictedAntimicrobialConsult',
        component: () => import('@/pages/HighlyRestrictedAntimicrobialConsult/Form.vue'),
        meta: {
          enName: 'Highly Restricted Antimicrobial Consult',
          name: 'Biên bản hội chẩn sử dụng kháng sinh cần ưu tiên quản lý',
          localKey: 'Biên bản hội chẩn sử dụng kháng sinh cần ưu tiên quản lý',
          roles: [4],
          requireSettingDepartment: true
        },
        children: [
          {
            path: '/ED/HighlyRestrictedAntimicrobialConsult/:Id/:Item',
            name: 'EDHighlyRestrictedAntimicrobialConsultItem',
            component: () => import('@/pages/HighlyRestrictedAntimicrobialConsult/Item.vue'),
            meta: {
              enName: 'Highly Restricted Antimicrobial Consult',
              name: 'Biên bản hội chẩn sử dụng kháng sinh cần ưu tiên quản lý',
              localKey: 'Biên bản hội chẩn sử dụng kháng sinh cần ưu tiên quản lý',
              roles: [4],
              requireSettingDepartment: true
            }
          }
        ]
      },
      {
        path: '/ed/AssessmentForRetailServicePatient/:Id',
        name: 'ED-AssessmentForRetailServicePatient',
        component: () => import('@/pages/RetailService/AssessmentForEd.vue'),
        meta: {
          name: 'Phân loại bệnh nhân',
          localKey: 'general.phan_loai_benh_nhan',
          roles: [4],
          requireSettingDepartment: true
        }
      },
      {
        path: '/ed/StandingOrderForRetailService/:Id',
        name: 'ED-StandingOrderForRetailService',
        component: () => import('@/pages/RetailService/StandingOrder.vue'),
        meta: {
          name: 'Theo dõi thực hiện thuốc',
          localKey: 'general.theo_doi_thuc_hien_thuoc',
          roles: [4],
          requireSettingDepartment: true
        }
      },
      {
        path: '/ed/ER0/:Id',
        name: 'ER0',
        component: () => import('@/pages/ED/EmergencyRecord/Index.vue'),
        meta: {
          name: 'Bệnh án cấp cứu',
          localKey: 'general.benh_an_cap_cuu',
          roles: [4],
          requireSettingDepartment: true
        }
      },
      {
        path: '/ed/ProgressNote/:Id',
        name: 'ProgressNote',
        component: () => import('@/pages/ProgressNote/Index.vue'),
        meta: {
          name: 'Theo dõi diễn biến',
          localKey: 'general.theo_doi_dien_bien',
          roles: [4],
          requireSettingDepartment: true
        }
      },
      {
        path: '/ed/PhysicianNote/:Id',
        name: 'PhysicianNote',
        component: () => import('@/pages/PhysicianNote/Index.vue'),
        meta: {
          name: 'Phiếu điều trị',
          localKey: 'Phiếu điều trị',
          roles: [4],
          requireSettingDepartment: true
        }
      },
      {
        path: '/ed/TakeCareNote/:Id',
        name: 'TakeCareNotes',
        component: () => import('@/pages/TakeCareNote/Index.vue'),
        meta: {
          name: 'Phiếu chăm sóc',
          localKey: 'Phiếu chăm sóc',
          roles: [4],
          requireSettingDepartment: true
        }
      },
      {
        path: '/ed/PHR/:Id',
        name: 'ED-PHR',
        component: () => import('@/pages/ED/HandOverCheckList/Index.vue'),
        meta: {
          name: 'Biên bản bàn giao người bệnh chuyển khoa',
          localKey: 'general.bien_ban_ban_giao_nguoi_benh_chuyen_khoa',
          roles: [4],
          requireSettingDepartment: true
        }
      },
      {
        path: '/ed/DI0/:Id',
        name: 'ED-DI0',
        component: () => import('@/pages/ED/DischargeInformation/Index.vue'),
        meta: {
          name: 'Đánh giá kết thúc',
          localKey: 'general.danh_gia_ket_thuc',
          roles: [4],
          requireSettingDepartment: true
        }
      },
      {
        path: '/ED/ComplexOutpatientCaseSummary/:Id',
        name: 'EDComplexOutpatientCaseSummary',
        component: () => import('@/pages/ComplexOutpatientCaseSummary/Index.vue'),
        meta: {
          name: 'Theo dõi ca bệnh phức tạp',
          localKey: 'general.theo_doi_ca_benh_phuc_tap',
          roles: [4],
          requireSettingDepartment: true,
          allowView: true
        }
      },
      {
        path: '/ed/PHC/:Id',
        name: 'EDPHC',
        component: () => import('@/pages/ED/PreOperativeProcedureHandoverChecklists/Index.vue'),
        meta: {
          name: 'Bảng kiểm bàn giao người bệnh trước mổ',
          localKey: 'general.ban_kiem_ban_giao_nguoi_benh_truoc_mo',
          roles: [4],
          requireSettingDepartment: true
        }
      },
      {
        path: '/ed/EDMedicalReport/:Id',
        name: 'EDMedicalReport',
        component: () => import('@/pages/ED/MedicalReport/KLM.vue'),
        meta: {
          name: 'Báo cáo y tế',
          localKey: 'general.bao_cao_y_te',
          roles: [4],
          requireSettingDepartment: true
        }
      },
      {
        path: '/ed/EDDischargeMedicalReport/:Id',
        name: 'EDDischargeMedicalReport',
        component: () => import('@/pages/ED/DischargeMedicalReport/DMR.vue'),
        meta: {
          name: 'Báo cáo y tế ra viện',
          localKey: 'general.bao_cao_y_te_ra_vien',
          roles: [4],
          requireSettingDepartment: true
        }
      },
      {
        path: '/ed/NPQ/:Id',
        name: 'NPQ',
        component: () => import('@/pages/ED/NPQ.vue'),
        meta: {
          name: 'Giấy ra viện',
          localKey: 'general.giay_ra_vien',
          roles: [4],
          requireSettingDepartment: true
        }
      },
      {
        path: '/ed/MCA/:Id',
        name: 'MCA',
        component: () => import('@/pages/ED/MonitoringChartAndHandoverForms/Index.vue'),
        meta: {
          name: 'Bàn giao vận chuyển',
          localKey: 'general.ban_giao_van_chuyen',
          roles: [4],
          requireSettingDepartment: true
        }
      },
      {
        path: '/ed/EDReferralLetter/:Id',
        name: 'EDReferralLetter',
        component: () => import('@/pages/ED/ReferralLetter/RL0.vue'),
        meta: {
          name: 'Giấy chuyển viện',
          localKey: 'general.giay_chuyen_vien',
          roles: [4],
          requireSettingDepartment: true
        }
      },
      {
        path: '/ed/Customer/:Id',
        name: 'CustomerInfo',
        component: () => import('@/pages/ED/Customer.vue'),
        meta: {
          name: 'Thông tin khách hàng',
          localKey: 'general.thong_tin_khach_hang',
          roles: [4],
          requireSettingDepartment: true
        }
      },
      {
        path: '/ed/EMCO/:Id',
        name: 'EmergencyConfirmation',
        component: () => import('@/pages/ED/EmergencyConfirmation/Index.vue'),
        meta: {
          name: 'Xác nhận cấp cứu',
          localKey: 'general.xac_nhan_cap_cuu',
          roles: [4],
          requireSettingDepartment: true
        }
      },
      {
        path: '/ed/PatientAndFamilyEducation/:Id',
        name: 'EDPatientAndFamilyEducation',
        component: () => import('@/pages/PatientAndFamilyEducation/Index.vue'),
        meta: {
          name: 'Đánh giá ban đầu',
          localKey: 'general.phieu_gdsk',
          roles: [4],
          requireSettingDepartment: true,
          visitType: 'ED'
        },
        children: [
          {
            path: '/ed/PatientAndFamilyEducation/:Id/:Item',
            name: 'EDPatientAndFamilyEducationView',
            component: () => import('@/pages/PatientAndFamilyEducation/Item.vue'),
            meta: {
              name: 'Ngoại trú thông thường',
              localKey: 'general.phieu_gdsk',
              roles: [4],
              requireSettingDepartment: true
            }
          }
        ]
      },
      {
        path: '/ED/StandingOrder/:Id',
        name: 'EDStandingOrder',
        component: () => import('@/pages/StandingOrder/Index.vue'),
        meta: {
          name: 'Ghi nhận thực hiện thuốc',
          localKey: 'general.ghi_nhan_thuc_hien_thuoc',
          roles: [4],
          requireSettingDepartment: true,
          allowView: true
        }
      },
      {
        path: '/ED/EDTransferLetter/:Id',
        name: 'EDTransferLetter',
        component: () => import('@/pages/ED/TranferLetter/Index.vue'),
        meta: {
          name: 'Giấy chuyển tuyến',
          localKey: 'general.giay_chuyen_tuyen',
          roles: [4],
          requireSettingDepartment: true
        }
      },
      {
        path: '/ed/PointOfCareTesting/ArterialBloodGasTest/:Id',
        name: 'EDArterialBloodGasTestList',
        component: () => import('@/pages/ED/PointOfCareTesting/ArterialBloodGasTestIndex.vue'),
        meta: {
          enName: 'Point of care testing - Blood gas analysis Cartridge CG4+',
          name: 'Xét nghiệm tại chỗ - Khí máu Cartridge CG4+',
          localKey: 'Xét nghiệm tại chỗ - Khí máu Cartridge CG4+',
          roles: [4],
          requireSettingDepartment: true
        },
        children: [
          {
            path: '/ed/PointOfCareTesting/ArterialBloodGasTest/View/:Id/:Item',
            name: 'EDArterialBloodGasTest',
            component: () => import('@/pages/ED/PointOfCareTesting/ArterialBloodGasTest.vue'),
            meta: {
              enName: 'Point of care testing - Blood gas analysis Cartridge CG4+',
              name: 'Xét nghiệm tại chỗ - Khí máu Cartridge CG4+',
              localKey: 'Xét nghiệm tại chỗ - Khí máu Cartridge CG4+',
              roles: [4],
              requireSettingDepartment: true
            }
          },
          {
            path: '/ed/PointOfCareTesting/ArterialBloodGasTestV2/:Id/:Item',
            name: 'EDArterialBloodGasTestV2',
            component: () => import('@/pages/ED/PointOfCareTesting/ArterialBloodGasTestV2.vue'),
            meta: {
              enName: 'Point of care testing - Blood gas analysis Cartridge CG4+',
              name: 'Xét nghiệm tại chỗ - Khí máu Cartridge CG4+',
              localKey: 'Xét nghiệm tại chỗ - Khí máu Cartridge CG4+',
              roles: [4],
              requireSettingDepartment: true
            }
          }
        ]
      },
      {
        path: '/ed/PointOfCareTesting/ChemicalBiologyTest/:Id',
        name: 'EDChemicalBiologyTestList',
        component: () => import('@/pages/ED/PointOfCareTesting/ChemicalBiologyTestIndex.vue'),
        meta: {
          name: 'Xét nghiệm tại chỗ - Sinh hóa máu Catridge CHEM8+',
          enName: 'Point of care testing - Chemistry Catridge CHEM8+',
          localKey: 'Xét nghiệm tại chỗ - Sinh hóa máu Catridge CHEM8+',
          roles: [4],
          requireSettingDepartment: true
        },
        children: [
          {
            path: '/ed/PointOfCareTesting/ChemicalBiologyTest/:Id/:Item',
            name: 'EDChemicalBiologyTest',
            component: () => import('@/pages/ED/PointOfCareTesting/ChemicalBiologyTest.vue'),
            meta: {
              enName: 'Point of care testing - Chemistry Catridge CHEM8+',
              name: 'Xét nghiệm tại giường - Sinh hóa máu - Máy:iSTAT',
              localKey: 'Xét nghiệm tại chỗ - Sinh hóa máu Catridge CHEM8+',
              roles: [4],
              requireSettingDepartment: true
            }
          },
          {
            path: '/ed/PointOfCareTesting/ChemicalBiologyTestV2/:Id/:Item',
            name: 'EDChemicalBiologyTestV2',
            component: () => import('@/pages/ED/PointOfCareTesting/ChemicalBiologyTestV2.vue'),
            meta: {
              enName: 'Point of care testing - Chemistry Catridge CHEM8+',
              name: 'Xét nghiệm tại chỗ - Sinh hóa máu Catridge CHEM8+',
              localKey: 'Xét nghiệm tại chỗ - Sinh hóa máu Catridge CHEM8+',
              roles: [4],
              requireSettingDepartment: true
            }
          }
        ]
      },
      {
        path: '/ed/SkinTestResult/:Id',
        name: 'SkinTestResult',
        component: () => import('@/pages/ED/SkinTestResult/Index.vue'),
        meta: {
          name: 'Kết quả test da',
          localKey: 'Kết quả test da',
          roles: [4],
          requireSettingDepartment: true
        }
      },
      // {
      //   path: '/ed/ConsultationDrugWithAnAsterisk/:Id',
      //   name: 'ConsultationDrugWithAnAsterisk',
      //   component: () => import('@/pages/ED/ConsultationDrugWithAnAsteriskMarkUpForm/Index.vue'),
      //   meta: {
      //     name: 'Biên bản hội chẩn thuốc có dấu *',
      //     localKey: 'Biên bản hội chẩn thuốc có dấu *',
      //     roles: [4],
      //     requireSettingDepartment: true
      //   }
      // },
      {
        path: '/ed/JointConsultationForApprovalOfSurgery/:Id',
        name: 'EDJointConsultationForApprovalOfSurgery',
        component: () => import('@/pages/JointConsultationForApprovalOfSurgery/Index.vue'),
        meta: {
          name: 'Biên bản hội chẩn thông qua mổ',
          localKey: 'Biên bản hội chẩn thông qua mổ',
          roles: [4],
          requireSettingDepartment: true
        },
        children: [
          {
            path: '/ed/JointConsultationForApprovalOfSurgery/:Id/:Item',
            name: 'EDJointConsultationForApprovalOfSurgeryItem',
            component: () => import('@/pages/JointConsultationForApprovalOfSurgery/Item.vue'),
            meta: {
              name: 'Biên bản hội chẩn thông qua mổ',
              localKey: 'Biên bản hội chẩn thông qua mổ',
              roles: [4],
              requireSettingDepartment: true
            }
          }
        ]
      },
      {
        path: '/ed/JointConsultationGroupMinutes/:Id',
        name: 'EDJointConsultationGroupMinutes',
        component: () => import('@/pages/JointConsultationGroupMinutes/Index.vue'),
        meta: {
          name: 'Biên bản hội chẩn',
          localKey: 'Biên bản hội chẩn',
          roles: [4],
          requireSettingDepartment: true
        },
        children: [
          {
            path: '/ed/JointConsultationGroupMinutes/:Id/:Item',
            name: 'EDJointConsultationGroupMinutesItem',
            component: () => import('@/pages/JointConsultationGroupMinutes/Item.vue'),
            meta: {
              name: 'Biên bản hội chẩn',
              localKey: 'Biên bản hội chẩn',
              roles: [4],
              requireSettingDepartment: true
            }
          }
        ]
      },
      {
        path: '/ed/InjuryCertificate/:Id',
        name: 'EDInjuryCertificate',
        component: () => import('@/pages/ED/InjuryCertificate/Index.vue'),
        meta: {
          name: 'Giấy chứng nhận thuong tích',
          localKey: 'listAction.giay_chung_nhan_thuong_tich',
          roles: [4],
          requireSettingDepartment: true
        }
      },
      // {
      //   path: '/ed/ProcedureSummary/:Id',
      //   name: 'EDProcedureSummary',
      //   component: () => import('@/pages/ProcedureSummary/Index.vue'),
      //   meta: {
      //     name: 'Phiếu phẫu thuật/thủ thuật',
      //     localKey: 'Phiếu phẫu thuật/thủ thuật',
      //     roles: [4],
      //     requireSettingDepartment: true
      //   },
      //   children: [
      //     {
      //       path: '/ED/ProcedureSummary/:Id/:Item',
      //       name: 'EDProcedureSummaryItem',
      //       component: () => import('@/pages/ProcedureSummary/Item.vue'),
      //       meta: {
      //         name: 'Phiếu phẫu thuật/thủ thuật',
      //         localKey: 'Phiếu phẫu thuật/thủ thuật',
      //         roles: [4],
      //         requireSettingDepartment: true
      //       }
      //     }
      //   ]
      // },
      {
        path: '/ed/SurgeryAndProcedureSummary/:Id',
        name: 'EDSurgeryAndProcedureSummary',
        component: () => import('@/pages/ProcedureSummary/Index.vue'),
        meta: {
          enName: 'Surgery summary',
          name: 'Tóm tắt phẫu thuật',
          localKey: 'Tóm tắt phẫu thuật',
          roles: [4],
          requireSettingDepartment: true
        },
        children: [
          {
            path: '/ED/SurgeryAndProcedureSummary/:Id/:Item',
            name: 'EDSurgeryAndProcedureSummaryItem',
            component: () => import('@/pages/ProcedureSummary/Item.vue'),
            meta: {
              enName: 'Surgery summary',
              name: 'Tóm tắt phẫu thuật',
              localKey: 'Tóm tắt phẫu thuật',
              roles: [4],
              requireSettingDepartment: true
            }
          }
        ]
      },
      {
        path: '/ed/MortalityReport/:Id',
        name: 'EDMortalityReport',
        component: () => import('@/pages/ED/MortalityReport/Index.vue'),
        meta: {
          name: 'Kiểm thảo tử vong',
          localKey: 'Kiểm thảo tử vong',
          roles: [4],
          requireSettingDepartment: true
        }
      },
      {
        path: '/ed/MortalityReportV2/:Id',
        name: 'EDMortalityReport',
        component: () => import('@/pages/ED/MortalityReport/Index.vue'),
        meta: {
          name: 'Biên bản - Trích biên bản kiểm thảo tử vong',
          localKey: 'listAction.kiem_thao_tu_vong',
          roles: [4],
          requireSettingDepartment: true
        },
        children: [
          {
            path: '/ed/MortalityReportV2/Page1/:Id',
            name: 'EDMortalityReportPage1',
            component: () => import('@/pages/ED/MortalityReport/Page1.vue'),
            meta: {
              name: 'Biên bản - Trích biên bản kiểm thảo tử vong',
              localKey: 'listAction.kiem_thao_tu_vong',
              roles: [4],
              requireSettingDepartment: true
            }
          },
          {
            path: '/ed/MortalityReportV2/Page2/:Id',
            name: 'EDMortalityReportPage2',
            component: () => import('@/pages/ED/MortalityReport/Page2.vue'),
            meta: {
              name: 'Biên bản - Trích biên bản kiểm thảo tử vong',
              localKey: 'listAction.kiem_thao_tu_vong',
              roles: [4],
              requireSettingDepartment: true
            }
          }
        ]
      },
      {
        path: '/ed/PatientOwnMedicationsChart/:Id',
        name: 'EDPatientOwnMedicationsChart',
        component: () => import('@/pages/PatientOwnMedicationsChart/Index.vue'),
        meta: {
          enName: 'Patient’s Own Medications Chart',
          name: 'Phiếu ghi nhận sử dụng thuốc do người bệnh mang vào',
          localKey: 'Phiếu ghi nhận sử dụng thuốc do người bệnh mang vào',
          roles: [4],
          requireSettingDepartment: true
        }
      },
      {
        path: '/ed/BloodRequestSupplyAndConfirmation/:Id',
        name: 'EDBloodRequestSupplyAndConfirmation',
        component: () => import('@/pages/ED/BloodRequestSupplyAndConfirmation/Index.vue'),
        meta: {
          name: 'Phiếu dự trù, cung cấp và xác nhận thực hiện máu - Chế phẩm máu',
          localKey: 'Phiếu dự trù, cung cấp và xác nhận thực hiện máu - Chế phẩm máu',
          roles: [4],
          requireSettingDepartment: true
        },
        children: [
          {
            path: '/ed/BloodRequestSupplyAndConfirmation/PurchaseRequest/:Id/:FormId',
            name: 'EDBloodRequestSupplyAndConfirmationPurchaseRequest',
            component: () => import('@/pages/ED/BloodRequestSupplyAndConfirmation/PurchaseRequest.vue'),
            meta: {
              name: 'Ngoại trú thông thường',
              localKey: 'Phiếu dự trù, cung cấp và xác nhận thực hiện máu - Chế phẩm máu',
              roles: [4],
              requireSettingDepartment: true
            }
          },
          {
            path: '/ED/BloodRequestSupplyAndConfirmation/Supply/:Id/:FormId',
            name: 'EDBloodRequestSupplyAndConfirmationSupply',
            component: () => import('@/pages/ED/BloodRequestSupplyAndConfirmation/Supply.vue'),
            meta: {
              name: 'Ngoại trú thông thường',
              localKey: 'Phiếu dự trù, cung cấp và xác nhận thực hiện máu - Chế phẩm máu',
              roles: [4],
              requireSettingDepartment: true
            }
          },
          {
            path: '/ED/BloodRequestSupplyAndConfirmation/TransfusionConfirmation/:Id/:FormId',
            name: 'EDBloodRequestSupplyAndConfirmationTransfusionConfirmation',
            component: () => import('@/pages/ED/BloodRequestSupplyAndConfirmation/TransfusionConfirmation.vue'),
            meta: {
              name: 'Ngoại trú thông thường',
              localKey: 'Phiếu dự trù, cung cấp và xác nhận thực hiện máu - Chế phẩm máu',
              roles: [4],
              requireSettingDepartment: true
            }
          }
        ]
      },
      {
        path: '/ed/BloodTransfusionChecklist/:Id',
        name: 'EDBloodTransfusionChecklist',
        component: () => import('@/pages/ED/BloodTransfusionChecklist/Index.vue'),
        meta: {
          name: 'Phiếu truyền máu',
          localKey: 'general.phieu_truyen_mau',
          roles: [4],
          requireSettingDepartment: true
        },
        children: [
          {
            path: '/ed/BloodTransfusionChecklist/:Id/:Item',
            name: 'EDBloodTransfusionChecklistItem',
            component: () => import('@/pages/ED/BloodTransfusionChecklist/Item.vue'),
            meta: {
              localKey: 'general.phieu_truyen_mau',
              name: 'Phiếu truyền máu',
              roles: [4],
              requireSettingDepartment: true
            }
          }
        ]
      },
      {
        path: '/ed/CardiacArrestRecord/:Id',
        name: 'EDCardiacArrestRecord',
        component: () => import('@/pages/CardiacArrestRecord/Index.vue'),
        meta: {
          name: 'Bảng hồi sinh tim phổi',
          localKey: 'general.bang_hoi_sinh_tim_phoi',
          roles: [4],
          requireSettingDepartment: true
        },
        children: [
          {
            path: '/ed/CardiacArrestRecord/:Id',
            name: 'EDCardiacArrestRecordForm',
            component: () => import('@/pages/CardiacArrestRecord/Form.vue'),
            meta: {
              localKey: 'general.bang_hoi_sinh_tim_phoi',
              name: 'Bảng hồi sinh tim phổi',
              roles: [4],
              requireSettingDepartment: true
            }
          },
          {
            path: '/ed/CardiacArrestRecordTable/:Id',
            name: 'EDCardiacArrestRecordTable',
            component: () => import('@/pages/CardiacArrestRecord/Table.vue'),
            meta: {
              name: 'Bảng hồi sinh tim phổi',
              roles: [4],
              requireSettingDepartment: true
            }
          }
        ]
      },
      {
        path: '/ed/AmbulanceRunReport/:Id',
        name: 'AmbulanceRunReport',
        component: () => import('@/pages/ED/AmbulanceRunReport/Index.vue'),
        meta: {
          name: 'Bệnh án cấp cứu ngoại viện',
          localKey: 'Bệnh án cấp cứu ngoại viện',
          roles: [4],
          requireSettingDepartment: true
        },
        children: [
          {
            path: '/ed/AmbulanceRunReport/:Id',
            name: 'AmbulanceRunReportPatientManagement',
            component: () => import('@/pages/ED/AmbulanceRunReport/PatientManagement.vue'),
            meta: {
              localKey: 'Bệnh án cấp cứu ngoại viện',
              name: 'Chuyên môn',
              roles: [4],
              requireSettingDepartment: true
            }
          },
          {
            path: '/ed/AmbulanceRunReport/TransferPatient/:Id',
            name: 'AmbulanceRunReportTransferPatient',
            component: () => import('@/pages/ED/AmbulanceRunReport/TransferPatient.vue'),
            meta: {
              localKey: 'Bệnh án cấp cứu ngoại viện',
              name: 'Vận chuyển người bệnh',
              roles: [4],
              requireSettingDepartment: true
            }
          },
          {
            path: '/ed/AmbulanceRunReport/PatientHandover/:Id',
            name: 'AmbulanceRunReportPatientHandover',
            component: () => import('@/pages/ED/AmbulanceRunReport/PatientHandover.vue'),
            meta: {
              localKey: 'Bệnh án cấp cứu ngoại viện',
              name: 'Bàn giao người bệnh',
              roles: [4],
              requireSettingDepartment: true
            }
          }
        ]
      },
      {
        path: '/ed/TestCovid2Confirmation/:Id',
        name: 'ED-TestCovid2Confirmation',
        component: () => import('@/pages/RetailService/TestCovid2Confirmation.vue'),
        meta: {
          name: 'Xác nhận xét nghiệm SAR-COVID-2',
          localKey: 'Xác nhận xét nghiệm SAR-COVID-2',
          roles: [4],
          requireSettingDepartment: true
        }
      },
      // {
      //   path: '/ed/SelfHarmRiskScreeningTool/:Id',
      //   name: 'ED-SelfHarmRiskScreeningTool',
      //   component: () => import('@/pages/ED/SelfHarmRiskScreeningTool/Index.vue'),
      //   meta: {
      //     name: 'Bảng sàng lọc nguy cơ tự hại',
      //     localKey: 'Bảng sàng lọc nguy cơ tự hại',
      //     roles: [4],
      //     requireSettingDepartment: true
      //   }
      // },
      {
        path: '/ed/SelfHarmRiskScreeningTool/:Id',
        name: 'IPDSelfHarmRiskScreeningToolED',
        component: () => import('@/pages/ED/SelfHarmRiskScreeningToolUpForm'),
        meta: {
          name: 'Bảng sàng lọc nguy cơ tự hại',
          localKey: 'Bảng sàng lọc nguy cơ tự hại',
          roles: [4],
          requireSettingDepartment: true
        },
        children: [
          {
            path: '/ed/SelfHarmRiskScreeningTool/:Id/:Item',
            name: 'IPDSelfHarmRiskScreeningToolEDItem',
            component: () => import('@/pages/ED/SelfHarmRiskScreeningToolUpForm/Item.vue'),
            meta: {
              name: 'Bảng sàng lọc nguy cơ tự hại',
              localKey: 'Bảng sàng lọc nguy cơ tự hại',
              roles: [4],
              requireSettingDepartment: true
            }
          }
        ]
      },
      {
        path: '/ed/qms-patient-management',
        name: 'EDPatientManagementRoot',
        component: () => import('@/pages/ED/Qms/Setup.vue'),
        meta: {
          name: 'Cấp cứu',
          roles: [4],
          requireSettingDepartment: true
        },
        children: [
          {
            path: '/ed/patient-management',
            name: 'EDQMSPatientManagement',
            component: () => import('@/pages/ED/Qms/PatientManagement.vue'),
            meta: {
              name: 'Danh sách người bệnh',
              roles: [4],
              requireSettingDepartment: true
            }
          },
          {
            path: '/ed/human-resource-assessment',
            name: 'EDHumanResourceAssessment',
            component: () => import('@/pages/ED/Qms/HumanResourceAssessment.vue'),
            meta: {
              name: 'Danh sách người bệnh chuyển khoa',
              roles: [4],
              requireSettingDepartment: true
            }
          }
        ]
      },
      {
        path: '/ed/ConsultationDrugWithAnAsterisk/:Id',
        name: 'IPDConsultationDrugWithAnAsteriskED',
        component: () => import('@/pages/IPD/ConsultationDrugWithAnAsteriskMarkUpForm'),
        meta: {
          name: 'biên bản hội chẩn',
          localKey: 'Biên bản hội chẩn bệnh nhân sử dụng thuốc có dấu sao (*)',
          roles: [4],
          requireSettingDepartment: true
        },
        children: [
          {
            path: '/ed/ConsultationDrugWithAnAsterisk/:Id/:Item',
            name: 'IPDConsultationDrugWithAnAsteriskEDItem',
            component: () => import('@/pages/IPD/ConsultationDrugWithAnAsteriskMarkUpForm/Item.vue'),
            meta: {
              name: 'biên bản hội chẩn',
              localKey: 'Biên bản hội chẩn bệnh nhân sử dụng thuốc có dấu sao (*)',
              roles: [4],
              requireSettingDepartment: true
            }
          }
        ]
      },
      {
        path: '/ed/TrickSummary/:Id',
        name: 'EDTrickSummary',
        component: () => import('@/pages/TrickSummary/Index.vue'),
        meta: {
          enName: 'Procedure Summary',
          name: 'Tóm tắt thủ thuật ',
          localKey: 'Tóm tắt thủ thuật ',
          roles: [4],
          requireSettingDepartment: true
        },
        children: [
          {
            path: '/ed/TrickSummary/:Id/:Item',
            name: 'EDTrickSummaryItem',
            component: () => import('@/pages/TrickSummary/Item.vue'),
            meta: {
              enName: 'Procedure Summary',
              name: 'Tóm tắt thủ thuật ',
              localKey: 'Tóm tắt thủ thuật ',
              roles: [4],
              requireSettingDepartment: true
            }
          }
        ]
      },
      {
        path: '/ed/ConsentForTransfusionOfBloodAndBloodDerivedProducts/:Id',
        name: 'EDConsentForTransfusionOfBloodAndBloodDerivedProducts',
        component: () => import('@/pages/ConsentForTransfusionOfBloodAndBloodDerivedProducts/Index.vue'),
        meta: {
          enName: 'Consent for transfusion of blood and/ or blood derived products',
          name: 'Phiếu cam kết truyền máu và các chế phẩm máu',
          localKey: 'Phiếu cam kết truyền máu và các chế phẩm máu',
          roles: [4],
          requireSettingDepartment: true
        }
      },
      {
        path: '/ed/ConsentForOperation/:Id',
        name: 'EDConsentForOperation',
        component: () => import('@/pages/ConsentForOperation/Index.vue'),
        meta: {
          enName: 'Consent for Operation/ Procedure/ High risk treatment',
          name: 'Phiếu cam kết phẫu thuật/ thủ thuật/ điều trị có nguy cơ cao',
          localKey: 'Phiếu cam kết phẫu thuật/ thủ thuật/ điều trị có nguy cơ cao',
          roles: [4],
          requireSettingDepartment: true,
          allowView: true
        }
      },
      {
        path: '/ed/HIVTestingConsent/:Id',
        name: 'EDHIVTestingConsent',
        component: () => import('@/pages/HIVTestingConsent/Form.vue'),
        meta: {
          enName: 'HIV Testing Consent Form',
          name: 'Phiếu đồng ý xét nghiệm HIV',
          localKey: 'Phiếu đồng ý xét nghiệm HIV',
          roles: [4],
          requireSettingDepartment: true,
          allowView: true
        }
      },
      {
        path: '/ED/ConsentDoNotOrder/:Id',
        name: 'EDConsentDoNotOrder',
        component: () => import('@/pages/IPD/Consent/Index.vue'),
        meta: {
          enName: 'Do not resuscitation order',
          name: 'Yêu cầu không hồi sinh tim phổi',
          localKey: 'general.yeu_cau_khong_hoi_sinh_tim_phoi',
          roles: [1, 2, 3, 4],
          requireSettingDepartment: true,
          allowView: true
        }
      },
      {
        path: '/ED/ACTForms/:Id',
        name: 'EDACTForms',
        component: () => import('@/pages/IPD/ACT/Index.vue'),
        meta: {
          enName: 'POCT - ACT Cartridge Celite',
          name: 'Xét nghiệm tại chỗ - ACT Cartridge Celite',
          localKey: 'XNTC - ACT Cartridge Celite',
          roles: [4],
          requireSettingDepartment: true
        },
        children: [
          {
            path: '/ED/ACTForms/:Id/:Item',
            name: 'EDACTFormsItem',
            component: () => import('@/pages/IPD/ACT/Item.vue'),
            meta: {
              enName: 'POCT - ACT Cartridge Celite',
              name: 'Xét nghiệm tại chỗ - ACT Cartridge Celite',
              localKey: 'XNTC - ACT Cartridge Celite',
              roles: [4],
              requireSettingDepartment: true
            }
          }
        ]
      },
      {
        path: '/ED/CartridgeKaolinACT/:Id',
        name: 'EDCartridgeKaolinACT',
        component: () => import('@/pages/IPD/CartridgeKaolinACT/Index.vue'),
        meta: {
          enName: 'Point of case testing - Coagulation ACT (Catridge Kaolin ACT)',
          name: 'XNTC - Đông máu ACT (Cartridge Kaolin ACT)',
          localKey: 'XNTC - Đông máu ACT (Cartridge Kaolin ACT)',
          roles: [4],
          requireSettingDepartment: true
        },
        children: [
          {
            path: '/ED/CartridgeKaolinACT/:Id/:Item',
            name: 'EDCartridgeKaolinACTItem',
            component: () => import('@/pages/IPD/CartridgeKaolinACT/Item.vue'),
            meta: {
              enName: 'Point of case testing - Coagulation ACT (Catridge Kaolin ACT)',
              name: 'XNTC - Đông máu ACT (Cartridge Kaolin ACT)',
              localKey: 'XNTC - Đông máu ACT (Cartridge Kaolin ACT)',
              roles: [4],
              requireSettingDepartment: true
            }
          }
        ]
      },
      {
        path: '/ed/A03_165_061222_V/:Id',
        name: 'EDBloodGasAnalysisEG7',
        component: () => import('@/pages/IPD/BloodGasAnalysisEG7/Index.vue'),
        meta: {
          enName: 'Point of case testing - Blood gas analysis (Cartridge EG7+)',
          name: 'Xét nghiệm tại chỗ - Khí máu và điện giải EG7+',
          localKey: 'Xét nghiệm tại chỗ - Khí máu và điện giải EG7+',
          roles: [4],
          requireSettingDepartment: true
        },
        children: [
          {
            path: '/ed/A03_165_061222_V/:Id/:Item',
            name: 'EDBloodGasAnalysisEG7Item',
            component: () => import('@/pages/IPD/BloodGasAnalysisEG7/Item.vue'),
            meta: {
              enName: 'Point of case testing - Blood gas analysis (Cartridge EG7+)',
              name: 'Xét nghiệm tại chỗ - Khí máu và điện giải EG7+',
              localKey: 'Xét nghiệm tại chỗ - Khí máu và điện giải EG7+',
              roles: [4],
              requireSettingDepartment: true
            }
          }
        ]
      },
      {
        path: '/ED/UploadImage/:Id',
        name: 'EDUploadImage',
        component: () => import('@/pages/IPD/UploadImage/Index.vue'),
        meta: {
          name: 'Upload ảnh',
          localKey: 'general.UploadImage',
          roles: [1, 2, 3, 4],
          requireSettingDepartment: true,
          allowView: true
        }
      },
      {
        path: '/ED/A02_053_OR_201022_V/:Id',
        name: 'EDA02_053_OR_201022_V',
        component: () => import('@/pages/FormLienKhoa/A02_053_OR_201022_V/Index.vue'),
        meta: {
          name: 'Bảng kiểm an toàn phẫu thuật, thủ thuật trong phòng mổ và phòng can thiệp tim mạch',
          localKey: 'Bảng kiểm an toàn phẫu thuật, thủ thuật trong phòng mổ và phòng can thiệp tim mạch',
          roles: [4],
          requireSettingDepartment: true
        },
        children: [
          {
            path: '/ED/A02_053_OR_201022_V/:Id/:ItemId',
            name: 'EDA02_053_OR_201022_VITEM',
            component: () => import('@/pages/FormLienKhoa/A02_053_OR_201022_V/Form.vue'),
            meta: {
              name: 'Bảng kiểm an toàn phẫu thuật, thủ thuật trong phòng mổ và phòng can thiệp tim mạch',
              localKey: 'Bảng kiểm an toàn phẫu thuật, thủ thuật trong phòng mổ và phòng can thiệp tim mạch',
              roles: [4],
              requireSettingDepartment: true
            },
            children: [
              {
                path: '/ED/A02_053_OR_201022_V/:Id/:ItemId/01',
                name: 'EDA02_053_OR_201022_VITEM_01',
                component: () => import('@/pages/FormLienKhoa/A02_053_OR_201022_V/Item01.vue'),
                meta: {
                  name: 'Bảng kiểm an toàn phẫu thuật, thủ thuật trong phòng mổ và phòng can thiệp tim mạch',
                  localKey: 'Bảng kiểm an toàn phẫu thuật, thủ thuật trong phòng mổ và phòng can thiệp tim mạch',
                  roles: [4],
                  child: '01',
                  requireSettingDepartment: true
                },
                children: [
                  {
                    path: '/ED/A02_053_OR_201022_V/:Id/:ItemId/01/001',
                    name: 'EDA02_053_OR_201022_VITEM_01_001',
                    component: () => import('@/pages/FormLienKhoa/A02_053_OR_201022_V/ItemChild1.vue'),
                    meta: {
                      name: 'Bảng kiểm an toàn phẫu thuật, thủ thuật trong phòng mổ và phòng can thiệp tim mạch',
                      localKey: 'Bảng kiểm an toàn phẫu thuật, thủ thuật trong phòng mổ và phòng can thiệp tim mạch',
                      roles: [4],
                      child2: '001',
                      requireSettingDepartment: true
                    }
                  },
                  {
                    path: '/ED/A02_053_OR_201022_V/:Id/:ItemId/01/002',
                    name: 'EDA02_053_OR_201022_VITEM_01_002',
                    component: () => import('@/pages/FormLienKhoa/A02_053_OR_201022_V/ItemChild2.vue'),
                    meta: {
                      name: 'Bảng kiểm an toàn phẫu thuật, thủ thuật trong phòng mổ và phòng can thiệp tim mạch',
                      localKey: 'Bảng kiểm an toàn phẫu thuật, thủ thuật trong phòng mổ và phòng can thiệp tim mạch',
                      roles: [4],
                      child2: '002',
                      requireSettingDepartment: true
                    }
                  },
                  {
                    path: '/ED/A02_053_OR_201022_V/:Id/:ItemId/01/003',
                    name: 'EDA02_053_OR_201022_VITEM_01_003',
                    component: () => import('@/pages/FormLienKhoa/A02_053_OR_201022_V/ItemChild3.vue'),
                    meta: {
                      name: 'Bảng kiểm an toàn phẫu thuật, thủ thuật trong phòng mổ và phòng can thiệp tim mạch',
                      localKey: 'Bảng kiểm an toàn phẫu thuật, thủ thuật trong phòng mổ và phòng can thiệp tim mạch',
                      roles: [4],
                      child2: '003',
                      requireSettingDepartment: true
                    }
                  },
                  {
                    path: '/ED/A02_053_OR_201022_V/:Id/:ItemId/01/004',
                    name: 'EDA02_053_OR_201022_VITEM_01_004',
                    component: () => import('@/pages/FormLienKhoa/A02_053_OR_201022_V/ItemChild4.vue'),
                    meta: {
                      name: 'Bảng kiểm an toàn phẫu thuật, thủ thuật trong phòng mổ và phòng can thiệp tim mạch',
                      localKey: 'Bảng kiểm an toàn phẫu thuật, thủ thuật trong phòng mổ và phòng can thiệp tim mạch',
                      roles: [4],
                      child2: '004',
                      requireSettingDepartment: true
                    }
                  }
                ]
              },
              {
                path: '/ED/A02_053_OR_201022_V/:Id/:ItemId/02',
                name: 'EDA02_053_OR_201022_VITEM_02',
                component: () => import('@/pages/FormLienKhoa/A02_053_OR_201022_V/Item02.vue'),
                meta: {
                  name: 'Bảng kiểm an toàn phẫu thuật, thủ thuật trong phòng mổ và phòng can thiệp tim mạch',
                  localKey: 'Bảng kiểm an toàn phẫu thuật, thủ thuật trong phòng mổ và phòng can thiệp tim mạch',
                  roles: [4],
                  child: '02',
                  requireSettingDepartment: true
                }
              }
            ]
          }
        ]
      },
      {
        path: '/ED/A02_006_221221_V/:Id',
        name: 'EDA02_006_221221_V',
        component: () => import('@/pages/FormLienKhoa/A02_006_221221_V/Index.vue'),
        meta: {
          name: 'Đánh giá nguy cơ vi khuẩn đa kháng (MDRO)',
          localKey: 'Đánh giá nguy cơ vi khuẩn đa kháng (MDRO)',
          roles: [4],
          requireSettingDepartment: true
        }
      }
    ]
  }
]
