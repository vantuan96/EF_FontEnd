export default [
  {
    path: '/opd/',
    name: 'OPDPage',
    component: () => import('@/pages/OPD/Index.vue'),
    meta: {
      auth: true,
      name: 'Ngoại trú',
      roles: [4],
      requireSettingDepartment: true,
      VisitTypeGroupCode: 'OPD'
    },
    children: [
      {
        path: '/opd/',
        name: 'OPD',
        component: () => import('@/pages/OPD/Home.vue'),
        meta: {
          name: 'Ngoại trú',
          roles: [4],
          requireSettingDepartment: true
        },
        children: [
          {
            path: '/opd/',
            name: 'ListPatientInOPD',
            component: () => import('@/pages/OPD/PatientList/ListOPD.vue'),
            meta: {
              name: 'Danh sách người bệnh',
              roles: [4],
              requireSettingDepartment: true
            }
          },
          {
            path: '/opd/ListTransfer',
            name: 'ListPatientTransferOPD',
            component: () => import('@/pages/OPD/PatientList/ListTransfer.vue'),
            meta: {
              name: 'Danh sách người bệnh chuyển khoa',
              roles: [4],
              requireSettingDepartment: true
            }
          }
        ]
      },
      {
        path: '/opd/add',
        name: 'OPDAddCustomer',
        component: () => import('@/pages/OPD/Add.vue'),
        meta: {
          name: 'Thêm mới bệnh nhân',
          localKey: 'general.them_moi_benh_nhan',
          roles: [4],
          requireSettingDepartment: true
        }
      },
      {
        path: '/opd/PHC/:Id',
        name: 'OPDPHC',
        component: () => import('@/pages/ED/PreOperativeProcedureHandoverChecklists/Index.vue'),
        meta: {
          name: 'Bảng kiểm bàn giao người bệnh trước mổ',
          localKey: 'general.ban_kiem_ban_giao_nguoi_benh_truoc_mo',
          roles: [4],
          requireSettingDepartment: true
        }
      },
      {
        path: '/opd/SkinTestResult/:Id',
        name: 'OPDSkinTestResult',
        component: () => import('@/pages/ED/SkinTestResult/Index.vue'),
        meta: {
          name: 'Kết quả test da',
          localKey: 'Kết quả test da',
          roles: [4],
          requireSettingDepartment: true
        }
      },
      {
        path: '/opd/InitialAssessment/:Id',
        name: 'OPDInitialAssessment',
        component: () => import('@/pages/OPD/InitialAssessment/Index.vue'),
        meta: {
          name: 'Đánh giá ban đầu',
          localKey: 'general.phan_loai_benh_nhan',
          roles: [4],
          requireSettingDepartment: true
        },
        children: [
          {
            path: '/opd/InitialAssessment/:Id',
            name: 'OPDInitialAssessmentShort',
            component: () => import('@/pages/OPD/InitialAssessment/Short.vue'),
            meta: {
              name: 'Ngoại trú thông thường',
              roles: [4],
              requireSettingDepartment: true
            }
          },
          {
            path: '/opd/InitialAssessment/long/:Id',
            name: 'OPDInitialAssessmentLong',
            component: () => import('@/pages/OPD/InitialAssessment/Long.vue'),
            meta: {
              name: 'Ngoại trú dài hạn',
              roles: [4],
              requireSettingDepartment: true
            }
          },
          {
            path: '/opd/InitialAssessment/FallRiskScreening/:Id',
            name: 'OPDInitialAssessmentFallRiskScreening',
            // component: () => import('@/pages/OPD/InitialAssessment/FallRiskScreening.vue'),
            component: () => import('@/pages/OPD/InitialAssessment/FallRiskScreening/Index.vue'),
            meta: {
              name: 'Đánh giá ngã',
              roles: [4],
              requireSettingDepartment: true
            },
            children: [
              {
                path: '/OPD/InitialAssessment/FallRiskScreening/:Id/:Item',
                name: 'OPDInitialAssessmentFallRiskScreeningItem',
                component: () => import('@/pages/OPD/InitialAssessment/FallRiskScreening/Form.vue'),
                meta: {
                  name: 'Đánh giá ngã',
                  roles: [4],
                  requireSettingDepartment: true
                }
              }
            ]
          },
          {
            path: '/opd/InitialAssessment/Telehealth/:Id',
            name: 'OPDInitialAssessmentTelehealth',
            component: () => import('@/pages/OPD/InitialAssessment/Telehealth.vue'),
            meta: {
              name: 'Telehealth',
              roles: [4],
              requireSettingDepartment: true
            }
          },
          {
            path: '/opd/InitialAssessment/RetailService/:Id',
            name: 'OPDAssessmentForRetailServicePatient',
            component: () => import('@/pages/RetailService/AssessmentForOpd.vue'),
            meta: {
              name: 'Telehealth',
              roles: [4],
              requireSettingDepartment: true
            }
          },
          {
            path: '/opd/InitialAssessment/ChemotherapyPatient/:Id',
            name: 'OPDAssessmentForChemotherapyPatient',
            component: () => import('@/pages/OPD/InitialAssessment/ForChemotherapyPatient.vue'),
            meta: {
              name: 'ChemotherapyPatient',
              roles: [4],
              requireSettingDepartment: true
            }
          }
        ]
      },
      {
        path: '/opd/TestCovid2Confirmation/:Id',
        name: 'OPD-TestCovid2Confirmation',
        component: () => import('@/pages/RetailService/TestCovid2Confirmation.vue'),
        meta: {
          name: 'Xác nhận xét nghiệm SAR-COVID-2',
          localKey: 'Xác nhận xét nghiệm SAR-COVID-2',
          roles: [4],
          requireSettingDepartment: true
        }
      },
      {
        path: '/opd/StandingOrderForRetailService/:Id',
        name: 'OPD-StandingOrderForRetailService',
        component: () => import('@/pages/RetailService/StandingOrder.vue'),
        meta: {
          name: 'Theo dõi thực hiện thuốc',
          localKey: 'general.theo_doi_thuc_hien_thuoc',
          roles: [4],
          requireSettingDepartment: true
        }
      },
      {
        path: '/opd/OutpatientExaminationNote/:Id',
        name: 'OutpatientExaminationNote',
        component: () => import('@/pages/OPD/OutpatientExaminationNote/Index.vue'),
        meta: {
          name: 'Phiếu khám ngoại trú',
          localKey: 'general.phieu_kham_ngoai_tru',
          roles: [4],
          requireSettingDepartment: true
        }
      },
      {
        path: '/opd/TelehealthExaminationNote/:Id',
        name: 'TelehealthExaminationNote',
        component: () => import('@/pages/OPD/OutpatientExaminationNote/Index.vue'),
        meta: {
          name: 'Phiếu khám Telehealth',
          localKey: 'general.phieu_kham_telehealth',
          roles: [4],
          requireSettingDepartment: true
        }
      },
      {
        path: '/opd/MedicalConsultation/:Id',
        name: 'MedicalConsultation',
        component: () => import('@/pages/OPD/OutpatientExaminationNote/MedicalConsultation.vue'),
        meta: {
          name: 'Phiếu tư vấn',
          localKey: 'Phiếu tư vấn',
          roles: [4],
          requireSettingDepartment: true
        }
      },
      // {
      //   path: '/opd/ProcedureSummary/:Id',
      //   name: 'OPDProcedureSummary',
      //   component: () => import('@/pages/ProcedureSummary/Index.vue'),
      //   meta: {
      //     name: 'Phiếu phẫu thuật/thủ thuật',
      //     localKey: 'Phiếu phẫu thuật/thủ thuật',
      //     roles: [4],
      //     requireSettingDepartment: true
      //   },
      //   children: [
      //     {
      //       path: '/OPD/ProcedureSummary/:Id/:Item',
      //       name: 'OPDProcedureSummaryItem',
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
        path: '/opd/SurgeryAndProcedureSummary/:Id',
        name: 'OPDSurgeryAndProcedureSummary',
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
            path: '/OPD/SurgeryAndProcedureSummary/:Id/:Item',
            name: 'OPDSurgeryAndProcedureSummaryItem',
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
        path: '/opd/ProcedureSummaryCertification/:Id',
        name: 'ProcedureSummaryCertification',
        component: () => import('@/pages/ProcedureSummary/Certification.vue'),
        meta: {
          name: 'Giấy trứng nhận thủ thuật',
          localKey: 'Giấy trứng nhận thủ thuật',
          roles: [4],
          requireSettingDepartment: true
        }
      },
      {
        path: '/OPD/Customer/:Id',
        name: 'CustomerOPDInfo',
        component: () => import('@/pages/OPD/Customer.vue'),
        meta: {
          name: 'Thông tin khách hàng',
          localKey: 'general.thong_tin_khach_hang',
          roles: [4],
          requireSettingDepartment: true
        }
      },
      {
        path: '/OPD/OPDMedicalReport/:Id',
        name: 'OPDMedicalReport',
        component: () => import('@/pages/OPD/MedicalReport/Index.vue'),
        meta: {
          name: 'Báo cáo y tế',
          localKey: 'general.bao_cao_y_te',
          roles: [4],
          requireSettingDepartment: true
        }
      },
      {
        path: '/OPD/OPDReferralLetter/:Id',
        name: 'OPDReferralLetter',
        component: () => import('@/pages/OPD/ReferralLetter/Index.vue'),
        meta: {
          name: 'Giấy chuyển viện',
          localKey: 'general.giay_chuyen_vien',
          roles: [4],
          requireSettingDepartment: true
        }
      },
      {
        path: '/OPD/OPDDiseasesCertification/:Id',
        name: 'OPDDiseasesCertification',
        component: () => import('@/pages/OPD/DiseasesCertification/Index.vue'),
        meta: {
          name: 'Giấy xác nhận tình trạng bệnh tật',
          localKey: 'general.giay_xac_nhan',
          roles: [4],
          requireSettingDepartment: true
        }
      },
      {
        path: '/OPD/OPDTransferLetter/:Id',
        name: 'OPDTransferLetter',
        component: () => import('@/pages/OPD/TransferLetter/Index.vue'),
        meta: {
          name: 'Giấy chuyển tuyến',
          localKey: 'general.giay_chuyen_tuyen',
          roles: [4],
          requireSettingDepartment: true
        }
      },
      {
        path: '/OPD/HandOverCheckList/:Id',
        name: 'OPDHandOverCheckList',
        component: () => import('@/pages/OPD/HandOverCheckList/Index.vue'),
        meta: {
          name: 'Biên bản - Bảng kiểm bàn giao NB chuyển khoa',
          localKey: 'Biên bản - Bảng kiểm bàn giao NB chuyển khoa',
          roles: [4],
          requireSettingDepartment: true
        }
      },
      {
        path: '/OPD/View/:Id',
        name: 'OPDView',
        component: () => import('@/pages/OPD/View.vue'),
        meta: {
          name: 'Thông tin bệnh nhân',
          localKey: 'general.thong_tin_benh_nhan',
          roles: [4],
          requireSettingDepartment: true
        }
      },
      {
        path: '/OPD/all/detail/:Id',
        name: 'OPDAllDetail',
        component: () => import('@/pages/Detail/Index.vue'),
        meta: {
          name: 'detail all',
          localKey: 'detail all',
          roles: [4],
          requireSettingDepartment: true
        },
        children: [
          {
            path: '/OPD/all/detail/:Id/detailIpd',
            name: 'OPDDETAILGROUP',
            component: () => import('@/pages/OPD/View.vue'),
            meta: {
              name: 'Thông tin khách hàng',
              localKey: 'general.thong_tin_khach_hang',
              roles: [4],
              requireSettingDepartment: true
            }
          },
          {
            path: '/OPD/all/detail/:Id/TomTatThongTinNguoiBenh',
            name: 'OPDTomTatThongTinNguoiBenh',
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
        path: '/OPD/StandingOrder/:Id',
        name: 'OPDStandingOrder',
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
        path: '/OPD/ComplexOutpatientCaseSummary/:Id',
        name: 'OPDComplexOutpatientCaseSummary',
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
        path: '/opd/PatientProgressNote/:Id',
        name: 'PatientProgressNote',
        component: () => import('@/pages/ProgressNote/Index.vue'),
        meta: {
          name: 'Theo dõi diễn biến bệnh nhân',
          localKey: 'general.theo_doi_dien_bien',
          roles: [4],
          requireSettingDepartment: true
        }
      },
      {
        path: '/OPD/JointConsultationGroupMinutes/:Id',
        name: 'OPDJointConsultationGroupMinutes',
        component: () => import('@/pages/JointConsultationGroupMinutes/Index.vue'),
        meta: {
          name: 'Biên bản hội chẩn',
          localKey: 'Biên bản hội chẩn',
          roles: [4],
          requireSettingDepartment: true
        },
        children: [
          {
            path: '/OPD/JointConsultationGroupMinutes/:Id/:Item',
            name: 'OPDJointConsultationGroupMinutesItem',
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
        path: '/opd/JointConsultationForApprovalOfSurgery/:Id',
        name: 'OPDJointConsultationForApprovalOfSurgery',
        component: () => import('@/pages/JointConsultationForApprovalOfSurgery/Index.vue'),
        meta: {
          name: 'Biên bản hội chẩn thông qua mổ',
          localKey: 'Biên bản hội chẩn thông qua mổ',
          roles: [4],
          requireSettingDepartment: true
        },
        children: [
          {
            path: '/opd/JointConsultationForApprovalOfSurgery/:Id/:Item',
            name: 'OPDJointConsultationForApprovalOfSurgeryItem',
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
        path: '/opd/SurgicalProcedureSafetyChecklist/:Id',
        name: 'OPDSurgicalProcedureSafetyChecklist',
        component: () => import('@/pages/OPD/SurgicalProcedureSafetyChecklist/Index.vue'),
        meta: {
          name: 'Đánh giá ban đầu',
          localKey: 'general.phan_loai_benh_nhan',
          roles: [4],
          requireSettingDepartment: true
        },
        children: [
          {
            path: '/opd/SurgicalProcedureSafetyChecklist/SignIn/:Id/:FormId/:ItemId',
            name: 'OPDSurgicalProcedureSafetyChecklistSignIn',
            component: () => import('@/pages/OPD/SurgicalProcedureSafetyChecklist/SignIn.vue'),
            meta: {
              name: 'Ngoại trú thông thường',
              roles: [4],
              requireSettingDepartment: true
            }
          },
          {
            path: '/opd/SurgicalProcedureSafetyChecklist/TimeOut/:Id/:FormId/:ItemId',
            name: 'OPDSurgicalProcedureSafetyChecklistTimeOut',
            component: () => import('@/pages/OPD/SurgicalProcedureSafetyChecklist/TimeOut.vue'),
            meta: {
              name: 'Ngoại trú thông thường',
              roles: [4],
              requireSettingDepartment: true
            }
          },
          {
            path: '/opd/SurgicalProcedureSafetyChecklist/SignOut/:Id/:FormId/:ItemId',
            name: 'OPDSurgicalProcedureSafetyChecklistSignOut',
            component: () => import('@/pages/OPD/SurgicalProcedureSafetyChecklist/SignOut.vue'),
            meta: {
              name: 'Ngoại trú thông thường',
              roles: [4],
              requireSettingDepartment: true
            }
          }
        ]
      },
      {
        path: '/opd/CardiacArrestRecord/:Id',
        name: 'OPDCardiacArrestRecord',
        component: () => import('@/pages/CardiacArrestRecord/Index.vue'),
        meta: {
          name: 'Bảng hồi sinh tim phổi',
          localKey: 'general.phan_loai_benh_nhan',
          roles: [4],
          requireSettingDepartment: true
        },
        children: [
          {
            path: '/opd/CardiacArrestRecord/:Id',
            name: 'OPDCardiacArrestRecordForm',
            component: () => import('@/pages/CardiacArrestRecord/Form.vue'),
            meta: {
              name: 'Bảng hồi sinh tim phổi',
              roles: [4],
              requireSettingDepartment: true
            }
          },
          {
            path: '/opd/CardiacArrestRecordTable/:Id',
            name: 'OPDCardiacArrestRecordTable',
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
        path: '/opd/NCCNBROV1/:Id',
        name: 'NCCNBROV1',
        component: () => import('@/pages/OPD/NCCNBROV1/Index.vue'),
        meta: {
          name: 'Phiếu đánh giá nguy cơ di truyền trong sàng lọc ung thư vú',
          localKey: 'Phiếu đánh giá nguy cơ di truyền trong sàng lọc ung thư vú',
          roles: [4],
          requireSettingDepartment: true
        }
      },
      {
        path: '/opd/ClinicalBreastExamNote/:Id',
        name: 'OPDClinicalBreastExamNote',
        component: () => import('@/pages/OPD/ClinicalBreastExamNote/Index.vue'),
        meta: {
          name: 'Phiếu khám lâm sàng vú',
          localKey: 'Phiếu khám lâm sàng vú',
          roles: [4],
          requireSettingDepartment: true
        },
        children: [
          {
            path: '/opd/ClinicalBreastExamNote/:Id/:Item',
            name: 'OPDClinicalBreastExamNoteItem',
            component: () => import('@/pages/OPD/ClinicalBreastExamNote/Item.vue'),
            meta: {
              name: 'Phiếu khám lâm sàng vú',
              localKey: 'Phiếu khám lâm sàng vú',
              roles: [4],
              requireSettingDepartment: true
            }
          }
        ]
      },
      {
        path: '/opd/BreastCancerRiskAssessment/:Id',
        name: 'BreastCancerRiskAssessment',
        component: () => import('@/pages/OPD/BreastCancerRiskAssessment/Index.vue'),
        meta: {
          enName: 'Patient information - The risk assessment for cancer',
          name: 'Phiếu thông tin khách hàng - Đánh giá nguy cơ ung thư',
          localKey: 'Phiếu thông tin khách hàng - Đánh giá nguy cơ ung thư',
          roles: [4],
          requireSettingDepartment: true
        }
      },
      {
        path: '/opd/CoordinatingWithThePatient/:Id',
        name: 'OPDCoordinatingWithThePatient',
        component: () => import('@/pages/OPD/CoordinatingWithThePatient'),
        meta: {
          enName: 'Coordinating with the patient/ family to deal with a stillbirth',
          name: 'Biên bản phối hợp với bệnh nhân/ gia đình xử lý thai chết lưu',
          localKey: 'listAction.thai_chet_luu',
          roles: [4],
          requireSettingDepartment: true
        },
        children: [
          {
            path: '/opd/CoordinatingWithThePatient/:Id/:Item',
            name: 'OPDCoordinatingWithThePatientItem',
            component: () => import('@/pages/OPD/CoordinatingWithThePatient/Item.vue'),
            meta: {
              enName: 'Coordinating with the patient/ family to deal with a stillbirth',
              name: 'Biên bản phối hợp với bệnh nhân/ gia đình xử lý thai chết lưu',
              localKey: 'listAction.thai_chet_luu',
              roles: [4],
              requireSettingDepartment: true
            }
          }
        ]
      },
      {
        path: '/opd/GENBRCA1/:Id',
        name: 'GENBRCA1',
        component: () => import('@/pages/OPD/GENBRCA1/Index.vue'),
        meta: {
          name: 'Phiếu đánh giá tiêu chuẩn chỉ định xét nghiệm GEN BRCA 1/2',
          localKey: 'Phiếu đánh giá tiêu chuẩn chỉ định xét nghiệm GEN BRCA 1/2',
          roles: [4],
          requireSettingDepartment: true
        }
      },
      {
        path: '/opd/TrickSummary/:Id',
        name: 'OPDTrickSummary',
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
            path: '/opd/TrickSummary/:Id/:Item',
            name: 'OPDTrickSummaryItem',
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
        path: '/opd/PatientAndFamilyEducation/:Id',
        name: 'OPDPatientAndFamilyEducation',
        component: () => import('@/pages/PatientAndFamilyEducation/Index.vue'),
        meta: {
          name: 'Đánh giá ban đầu',
          localKey: 'general.phieu_gdsk',
          roles: [4],
          requireSettingDepartment: true,
          visitType: 'OPD'
        },
        children: [
          {
            path: '/opd/PatientAndFamilyEducation/:Id/:Item',
            name: 'OPDPatientAndFamilyEducationView',
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
        path: '/OPD/PromForCoronaryDisease/:Id',
        name: 'OPDPromForCoronaryDisease',
        component: () => import('@/pages/IPD/PromForCoronaryDisease/Index.vue'),
        meta: {
          name: 'PROM bệnh nhân mạch vành',
          localKey: 'PROM bệnh nhân mạch vành',
          roles: [1, 2, 3, 4],
          requireSettingDepartment: true,
          allowView: true
        }
      },
      {
        path: '/OPD/PROMForHeartFailure/:Id',
        name: 'OPDPROMForHeartFailure',
        component: () => import('@/pages/IPD/PROMForHeartFailure/Index.vue'),
        meta: {
          name: 'PROM bệnh nhân suy tim',
          localKey: 'PROM for heart failure',
          roles: [1, 2, 3, 4],
          requireSettingDepartment: true,
          allowView: true
        }
      },
      {
        path: '/OPD/ConsentForOperation/:Id',
        name: 'OPDConsentForOperation',
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
        path: '/OPD/HIVTestingConsent/:Id',
        name: 'OPDHIVTestingConsent',
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
        path: '/OPD/PregnancyFollowUpRecord/:Id',
        name: 'OPDPregnancyFollowUpRecord',
        component: () => import('@/pages/OPD/PregnancyFollowUpRecord/Index.vue'),
        meta: {
          name: 'Quản lý thai nghén',
          localKey: 'Quản lý thai nghén',
          roles: [4],
          requireSettingDepartment: true,
          allowView: true
        },
        children: [
          {
            path: '/opd/PregnancyFollowUpRecord/ObstetricInformation/:Id',
            name: 'OPDObstetricInformation',
            component: () => import('@/pages/OPD/PregnancyFollowUpRecord/Item1.vue'),
            meta: {
              name: 'Thông tin sản khoa',
              localKey: 'Quản lý thai nghén',
              roles: [4],
              requireSettingDepartment: true,
              type: 'ObstetricInformation'
            }
          },
          {
            path: '/opd/PregnancyFollowUpRecord/ThePregnancyCheckupProcess/:Id',
            name: 'OPDThePregnancyCheckupProcess',
            component: () => import('@/pages/OPD/PregnancyFollowUpRecord/Item2.vue'),
            meta: {
              name: 'Quá trình khám thai',
              localKey: 'Quản lý thai nghén',
              roles: [4],
              requireSettingDepartment: true,
              type: 'ThePregnancyCheckupProcess'
            }
          }
        ]
      },
      {
        path: '/OPD/CartridgeKaolinACT/:Id',
        name: 'OPDCartridgeKaolinACT',
        component: () => import('@/pages/IPD/CartridgeKaolinACT/Index.vue'),
        meta: {
          name: 'CartridgeKaolinACT',
          localKey: 'XNTC - Đông máu ACT (Cartridge Kaolin ACT)',
          roles: [4],
          requireSettingDepartment: true
        },
        children: [
          {
            path: '/OPD/CartridgeKaolinACT/:Id/:Item',
            name: 'OPDCartridgeKaolinACTItem',
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
        path: '/OPD/CKHoHapTienPhau/:Id',
        name: 'OPDCKHoHapTienPhau',
        component: () => import('@/pages/OPD/CKHoHapTienPhau/Index.vue'),
        meta: {
          name: 'Phiếu yêu cầu khám chuyên khoa hô hấp tiền phẫu',
          localKey: 'Phiếu yêu cầu khám chuyên khoa hô hấp tiền phẫu',
          roles: [4],
          requireSettingDepartment: true
        }
      },
      {
        path: '/opd/PreAnesthesiaConsultation/:Id',
        name: 'PreAnesthesiaConsultation',
        component: () => import('@/pages/OPD/PreAnesthesiaConsultation/Index.vue'),
        meta: {
          name: 'Phiếu khám gây mê',
          localKey: 'Phiếu khám gây mê',
          roles: [4],
          requireSettingDepartment: true
        }
      },
      {
        path: '/opd/RequestForPreSurgeryCardiologyConsultation/:Id',
        name: 'RequestForPreSurgeryCardiologyConsultation',
        component: () => import('@/pages/OPD/RequestForPreSurgeryCardiologyConsultation/Index.vue'),
        meta: {
          name: 'Phiếu yêu cầu khám chuyên khoa tim mạch tiền phẫu',
          localKey: 'Phiếu yêu cầu khám chuyên khoa tim mạch tiền phẫu',
          roles: [4],
          requireSettingDepartment: true
        }
      },
      {
        path: '/OPD/UploadImage/:Id',
        name: 'OPDUploadImage',
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
        path: '/OPD/EFORMDEMO/:Id',
        name: 'OPDEFORMDEMO',
        component: () => import('@/pages/AExamForms/Index.vue'),
        meta: {
          name: 'ExampleForm',
          localKey: 'ExampleForm'
        },
        children: [
          {
            path: '/opd/EFORMDEMO/:Id/:ItemId',
            name: 'OPDEFORMDEMOITEM',
            component: () => import('@/pages/AExamForms/Form.vue'),
            meta: {
              name: 'Example Form',
              localKey: 'ExampleForm'
            }
          }
        ]
      },
      {
        path: '/OPD/A02_053_OR_201022_V/:Id',
        name: 'OPDA02_053_OR_201022_V',
        component: () => import('@/pages/FormLienKhoa/A02_053_OR_201022_V/Index.vue'),
        meta: {
          name: 'Bảng kiểm an toàn phẫu thuật, thủ thuật trong phòng mổ và phòng can thiệp tim mạch',
          localKey: 'Bảng kiểm an toàn phẫu thuật, thủ thuật trong phòng mổ và phòng can thiệp tim mạch',
          roles: [4],
          requireSettingDepartment: true
        },
        children: [
          {
            path: '/OPD/A02_053_OR_201022_V/:Id/:ItemId',
            name: 'OPDA02_053_OR_201022_VITEM',
            component: () => import('@/pages/FormLienKhoa/A02_053_OR_201022_V/Form.vue'),
            meta: {
              name: 'Bảng kiểm an toàn phẫu thuật, thủ thuật trong phòng mổ và phòng can thiệp tim mạch',
              localKey: 'Bảng kiểm an toàn phẫu thuật, thủ thuật trong phòng mổ và phòng can thiệp tim mạch',
              roles: [4],
              requireSettingDepartment: true
            },
            children: [
              {
                path: '/OPD/A02_053_OR_201022_V/:Id/:ItemId/01',
                name: 'OPDA02_053_OR_201022_VITEM_01',
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
                    path: '/OPD/A02_053_OR_201022_V/:Id/:ItemId/01/001',
                    name: 'OPDA02_053_OR_201022_VITEM_01_001',
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
                    path: '/OPD/A02_053_OR_201022_V/:Id/:ItemId/01/002',
                    name: 'OPDA02_053_OR_201022_VITEM_01_002',
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
                    path: '/OPD/A02_053_OR_201022_V/:Id/:ItemId/01/003',
                    name: 'OPDA02_053_OR_201022_VITEM_01_003',
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
                    path: '/OPD/A02_053_OR_201022_V/:Id/:ItemId/01/004',
                    name: 'OPDA02_053_OR_201022_VITEM_01_004',
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
                path: '/OPD/A02_053_OR_201022_V/:Id/:ItemId/02',
                name: 'OPDA02_053_OR_201022_VITEM_02',
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
        path: '/OPD/MedicalRecordForOutpatient/:Id',
        name: 'MedicalRecordForOutpatient',
        component: () => import('@/pages/OPD/MedicalRecordForOutpatient/Index.vue'),
        meta: {
          name: 'Bệnh án ngoại trú',
          localKey: 'Bệnh án ngoại trú',
          roles: [4],
          requireSettingDepartment: true
        }
      },
      {
        path: '/OPD/A02_006_221221_V/:Id',
        name: 'OPDA02_006_221221_V',
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
