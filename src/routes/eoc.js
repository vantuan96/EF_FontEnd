export default [
  {
    path: '/EOC/',
    name: 'EOC-page',
    component: () => import('@/pages/EOC/Index.vue'),
    meta: {
      name: 'Nội soi',
      roles: [4],
      requireSettingDepartment: true,
      auth: true,
      VisitTypeGroupCode: 'EOC'
    },
    children: [
      {
        path: '/EOC/',
        name: 'EOC',
        component: () => import('@/pages/EOC/Home.vue'),
        meta: {
          name: 'Nội soi',
          roles: [4],
          requireSettingDepartment: true
        },
        children: [
          {
            path: '/EOC/',
            name: 'ListPatientInEOC',
            component: () => import('@/pages/EOC/PatientList/List.vue'),
            meta: {
              name: 'Danh sách người bệnh',
              roles: [4],
              requireSettingDepartment: true
            }
          },
          {
            path: '/EOC/ListTransfer',
            name: 'ListPatientTransferEOC',
            component: () => import('@/pages/EOC/PatientList/ListTransfer.vue'),
            meta: {
              name: 'Danh sách người bệnh chuyển khoa',
              roles: [4],
              requireSettingDepartment: true
            }
          }
        ]
      },
      {
        path: '/EOC/add',
        name: 'EOCAddCustomer',
        component: () => import('@/pages/EOC/PatientList/Add.vue'),
        meta: {
          name: 'Thêm mới bệnh nhân',
          localKey: 'general.them_moi_benh_nhan',
          roles: [4],
          requireSettingDepartment: true
        }
      },
      {
        path: '/EOC/InitialAssessment/:Id',
        name: 'EOCInitialAssessment',
        component: () => import('@/pages/EOC/InitialAssessment/Index.vue'),
        meta: {
          name: 'Đánh giá ban đầu',
          localKey: 'general.phan_loai_benh_nhan',
          roles: [4],
          requireSettingDepartment: true
        },
        children: [
          {
            path: '/EOC/InitialAssessment/:Id',
            name: 'EOCInitialAssessmentShort',
            component: () => import('@/pages/EOC/InitialAssessment/Short.vue'),
            meta: {
              name: 'Ngoại trú thông thường',
              roles: [4],
              requireSettingDepartment: true
            }
          },
          {
            path: '/EOC/InitialAssessment/long/:Id',
            name: 'EOCInitialAssessmentLong',
            component: () => import('@/pages/EOC/InitialAssessment/Long.vue'),
            meta: {
              name: 'Ngoại trú dài hạn',
              roles: [4],
              requireSettingDepartment: true
            }
          },
          {
            path: '/EOC/InitialAssessment/FallRiskScreening/:Id',
            name: 'EOCInitialAssessmentFallRiskScreening',
            component: () => import('@/pages/EOC/InitialAssessment/FallRiskScreening/Index.vue'),
            meta: {
              name: 'Đánh giá ngã',
              roles: [4],
              requireSettingDepartment: true
            },
            children: [
              {
                path: '/EOC/InitialAssessment/FallRiskScreening/:Id/:Item',
                name: 'EOCInitialAssessmentFallRiskScreeningItem',
                component: () => import('@/pages/EOC/InitialAssessment/FallRiskScreening/Form.vue'),
                meta: {
                  name: 'Đánh giá ngã',
                  roles: [4],
                  requireSettingDepartment: true
                }
              }
            ]
          }
        ]
      },
      {
        path: '/eoc/OutpatientExaminationNote/:Id',
        name: 'EOCOutpatientExaminationNote',
        component: () => import('@/pages/EOC/OutpatientExaminationNote.vue'),
        meta: {
          name: 'Phiếu khám ngoại trú',
          localKey: 'general.phieu_kham_benh',
          roles: [4],
          requireSettingDepartment: true
        }
      },
      {
        path: '/EOC/EOCMedicalReport/:Id',
        name: 'EOCMedicalReport',
        component: () => import('@/pages/EOC/Documents/MedicalReport/Index.vue'),
        meta: {
          name: 'Báo cáo y tế',
          localKey: 'general.bao_cao_y_te',
          roles: [4],
          requireSettingDepartment: true
        }
      },
      {
        path: '/eoc/HandOverCheckList/:Id',
        name: 'eoc-PHR',
        component: () => import('@/pages/EOC/HandOverCheckList/Index.vue'),
        meta: {
          name: 'Biên bản bàn giao người bệnh chuyển khoa',
          localKey: 'general.bien_ban_ban_giao_nguoi_benh_chuyen_khoa',
          roles: [4],
          requireSettingDepartment: true
        }
      },
      {
        path: '/EOC/EOCReferralLetter/:Id',
        name: 'EOCReferralLetter',
        component: () => import('@/pages/EOC/Documents/ReferralLetter/Index.vue'),
        meta: {
          name: 'Giấy chuyển viện',
          localKey: 'general.giay_chuyen_vien',
          roles: [4],
          requireSettingDepartment: true
        }
      },
      {
        path: '/EOC/EOCTransferLetter/:Id',
        name: 'EOCTransferLetter',
        component: () => import('@/pages/EOC/Documents/TranferLetter/Index.vue'),
        meta: {
          name: 'Giấy chuyển tuyến',
          localKey: 'general.giay_chuyen_tuyen',
          roles: [4],
          requireSettingDepartment: true
        }
      },
      {
        path: '/eoc/CardiacArrestRecord/:Id',
        name: 'EOCCardiacArrestRecord',
        component: () => import('@/pages/CardiacArrestRecord/Index.vue'),
        meta: {
          name: 'Bảng hồi sinh tim phổi',
          localKey: 'general.phan_loai_benh_nhan',
          roles: [4],
          requireSettingDepartment: true
        },
        children: [
          {
            path: '/eoc/CardiacArrestRecord/:Id',
            name: 'EOCCardiacArrestRecordForm',
            component: () => import('@/pages/CardiacArrestRecord/Form.vue'),
            meta: {
              name: 'Bảng hồi sinh tim phổi',
              roles: [4],
              requireSettingDepartment: true
            }
          },
          {
            path: '/eoc/CardiacArrestRecordTable/:Id',
            name: 'EOCCardiacArrestRecordTable',
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
        path: '/EOC/JointConsultationGroupMinutes/:Id',
        name: 'EOCJointConsultationGroupMinutes',
        component: () => import('@/pages/JointConsultationGroupMinutes/Index.vue'),
        meta: {
          name: 'Biên bản hội chẩn',
          localKey: 'Biên bản hội chẩn',
          roles: [4],
          requireSettingDepartment: true
        },
        children: [
          {
            path: '/EOC/JointConsultationGroupMinutes/:Id/:Item',
            name: 'EOCJointConsultationGroupMinutesItem',
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
        path: '/eoc/SkinTestResult/:Id',
        name: 'eocSkinTestResult',
        component: () => import('@/pages/ED/SkinTestResult/Index.vue'),
        meta: {
          name: 'Kết quả test da',
          localKey: 'Kết quả test da',
          roles: [4],
          requireSettingDepartment: true
        }
      },
      // {
      //   path: '/eoc/ProcedureSummary/:Id',
      //   name: 'EOCProcedureSummary',
      //   component: () => import('@/pages/ProcedureSummary/Index.vue'),
      //   meta: {
      //     name: 'Phiếu phẫu thuật/thủ thuật',
      //     localKey: 'Phiếu phẫu thuật/thủ thuật',
      //     roles: [4],
      //     requireSettingDepartment: true
      //   },
      //   children: [
      //     {
      //       path: '/EOC/ProcedureSummary/:Id/:Item',
      //       name: 'EOCProcedureSummaryItem',
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
        path: '/eoc/SurgeryAndProcedureSummary/:Id',
        name: 'EOCSurgeryAndProcedureSummary',
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
            path: '/EOC/SurgeryAndProcedureSummary/:Id/:Item',
            name: 'EOCSurgeryAndProcedureSummaryItem',
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
        path: '/eoc/StandingOrder/:Id',
        name: 'EOCStandingOrder',
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
        path: '/eoc/SurgicalProcedureSafetyChecklist/:Id',
        name: 'EOCSurgicalProcedureSafetyChecklist',
        component: () => import('@/pages/OPD/SurgicalProcedureSafetyChecklist/Index.vue'),
        meta: {
          name: 'Đánh giá ban đầu',
          localKey: 'general.phan_loai_benh_nhan',
          roles: [4],
          requireSettingDepartment: true
        },
        children: [
          {
            path: '/eoc/SurgicalProcedureSafetyChecklist/SignIn/:Id/:FormId/:ItemId',
            name: 'EOCSurgicalProcedureSafetyChecklistSignIn',
            component: () => import('@/pages/OPD/SurgicalProcedureSafetyChecklist/SignIn.vue'),
            meta: {
              name: 'Ngoại trú thông thường',
              roles: [4],
              requireSettingDepartment: true
            }
          },
          {
            path: '/eoc/SurgicalProcedureSafetyChecklist/TimeOut/:Id/:FormId/:ItemId',
            name: 'EOCSurgicalProcedureSafetyChecklistTimeOut',
            component: () => import('@/pages/OPD/SurgicalProcedureSafetyChecklist/TimeOut.vue'),
            meta: {
              name: 'Ngoại trú thông thường',
              roles: [4],
              requireSettingDepartment: true
            }
          },
          {
            path: '/eoc/SurgicalProcedureSafetyChecklist/SignOut/:Id/:FormId/:ItemId',
            name: 'EOCSurgicalProcedureSafetyChecklistSignOut',
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
        path: '/eoc/PHC/:Id',
        name: 'EOCPHC',
        component: () => import('@/pages/ED/PreOperativeProcedureHandoverChecklists/Index.vue'),
        meta: {
          name: 'Bảng kiểm bàn giao người bệnh trước mổ',
          localKey: 'general.ban_kiem_ban_giao_nguoi_benh_truoc_mo',
          roles: [4],
          requireSettingDepartment: true
        }
      },
      {
        path: '/eoc/ComplexOutpatientCaseSummary/:Id',
        name: 'EOCComplexOutpatientCaseSummary',
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
        path: '/EOC/View/:Id',
        name: 'EOCView',
        component: () => import('@/pages/EOC/View.vue'),
        meta: {
          name: 'Thông tin bệnh nhân',
          localKey: 'general.thong_tin_benh_nhan',
          roles: [4],
          requireSettingDepartment: true
        }
      },
      {
        path: '/EOC/all/detail/:Id',
        name: 'EOCAllDetail',
        component: () => import('@/pages/Detail/Index.vue'),
        meta: {
          name: 'detail all',
          localKey: 'detail all',
          roles: [4],
          requireSettingDepartment: true
        },
        children: [
          {
            path: '/EOC/all/detail/:Id/detailIpd',
            name: 'EOCDETAILGROUP',
            component: () => import('@/pages/EOC/View.vue'),
            meta: {
              name: 'Thông tin khách hàng',
              localKey: 'general.thong_tin_khach_hang',
              roles: [4],
              requireSettingDepartment: true
            }
          },
          {
            path: '/EOC/all/detail/:Id/TomTatThongTinNguoiBenh',
            name: 'EOCTomTatThongTinNguoiBenh',
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
        path: '/eoc/PatientProgressNote/:Id',
        name: 'eocPatientProgressNote',
        component: () => import('@/pages/ProgressNote/Index.vue'),
        meta: {
          name: 'Theo dõi diễn biến bệnh nhân',
          localKey: 'general.theo_doi_dien_bien',
          roles: [4],
          requireSettingDepartment: true
        }
      },
      {
        path: '/EOC/Customer/:Id',
        name: 'EOCCustomerInfo',
        component: () => import('@/pages/EOC/Customer.vue'),
        meta: {
          name: 'Thông tin khách hàng',
          localKey: 'general.thong_tin_khach_hang',
          roles: [4],
          requireSettingDepartment: true
        }
      },
      {
        path: '/eoc/TrickSummary/:Id',
        name: 'EOCTrickSummary',
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
            path: '/eoc/TrickSummary/:Id/:Item',
            name: 'EOCTrickSummaryItem',
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
        path: '/eoc/PatientAndFamilyEducation/:Id',
        name: 'EOCPatientAndFamilyEducation',
        component: () => import('@/pages/PatientAndFamilyEducation/Index.vue'),
        meta: {
          name: 'Đánh giá ban đầu',
          localKey: 'general.phieu_gdsk',
          roles: [4],
          requireSettingDepartment: true,
          visitType: 'EOC'
        },
        children: [
          {
            path: '/eoc/PatientAndFamilyEducation/:Id/:Item',
            name: 'EOCPatientAndFamilyEducationView',
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
        path: '/eoc/ConsentForOperation/:Id',
        name: 'EOCConsentForOperation',
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
        path: '/eoc/HIVTestingConsent/:Id',
        name: 'EOCHIVTestingConsent',
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
        path: '/EOC/CartridgeKaolinACT/:Id',
        name: 'EOCCartridgeKaolinACT',
        component: () => import('@/pages/IPD/CartridgeKaolinACT/Index.vue'),
        meta: {
          enName: 'Cartridge Kaolin ACT',
          name: 'CartridgeKaolinACT',
          localKey: 'XNTC - Đông máu ACT (Cartridge Kaolin ACT)',
          roles: [4],
          requireSettingDepartment: true
        },
        children: [
          {
            path: '/EOC/CartridgeKaolinACT/:Id/:Item',
            name: 'EOCCartridgeKaolinACTItem',
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
        path: '/EOC/UploadImage/:Id',
        name: 'EOCUploadImage',
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
        path: '/EOC/A02_053_OR_201022_V/:Id',
        name: 'EOCA02_053_OR_201022_V',
        component: () => import('@/pages/FormLienKhoa/A02_053_OR_201022_V/Index.vue'),
        meta: {
          name: 'Bảng kiểm an toàn phẫu thuật, thủ thuật trong phòng mổ và phòng can thiệp tim mạch',
          localKey: 'Bảng kiểm an toàn phẫu thuật, thủ thuật trong phòng mổ và phòng can thiệp tim mạch',
          roles: [4],
          requireSettingDepartment: true
        },
        children: [
          {
            path: '/EOC/A02_053_OR_201022_V/:Id/:ItemId',
            name: 'EOCA02_053_OR_201022_VITEM',
            component: () => import('@/pages/FormLienKhoa/A02_053_OR_201022_V/Form.vue'),
            meta: {
              name: 'Bảng kiểm an toàn phẫu thuật, thủ thuật trong phòng mổ và phòng can thiệp tim mạch',
              localKey: 'Bảng kiểm an toàn phẫu thuật, thủ thuật trong phòng mổ và phòng can thiệp tim mạch',
              roles: [4],
              requireSettingDepartment: true
            },
            children: [
              {
                path: '/EOC/A02_053_OR_201022_V/:Id/:ItemId/01',
                name: 'EOCA02_053_OR_201022_VITEM_01',
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
                    path: '/EOC/A02_053_OR_201022_V/:Id/:ItemId/01/001',
                    name: 'EOCA02_053_OR_201022_VITEM_01_001',
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
                    path: '/EOC/A02_053_OR_201022_V/:Id/:ItemId/01/002',
                    name: 'EOCA02_053_OR_201022_VITEM_01_002',
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
                    path: '/EOC/A02_053_OR_201022_V/:Id/:ItemId/01/003',
                    name: 'EOCA02_053_OR_201022_VITEM_01_003',
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
                    path: '/EOC/A02_053_OR_201022_V/:Id/:ItemId/01/004',
                    name: 'EOCA02_053_OR_201022_VITEM_01_004',
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
                path: '/EOC/A02_053_OR_201022_V/:Id/:ItemId/02',
                name: 'EOCA02_053_OR_201022_VITEM_02',
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
        path: '/EOC/A02_006_221221_V/:Id',
        name: 'EOCA02_006_221221_V',
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
