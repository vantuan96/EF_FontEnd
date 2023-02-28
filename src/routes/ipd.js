export default [
  {
    path: '/ipd/',
    name: 'IPD-page',
    component: () => import('@/pages/IPD/Index.vue'),
    meta: {
      name: 'Nội trú',
      roles: [4],
      requireSettingDepartment: true,
      auth: true,
      VisitTypeGroupCode: 'IPD'
    },
    children: [
      // form mẫu dạng list
      // {
      //   path: '/ipd/ExForms/:Id',
      //   name: 'IPDExForms',
      //   component: () => import('@/pages/IPD/ExForms/Index.vue'),
      //   meta: {
      //     name: 'ExForms',
      //     localKey: 'ExForms',
      //     roles: [4],
      //     requireSettingDepartment: true
      //   },
      //   children: [
      //     {
      //       path: '/ipd/ExForms/:Id/:Item',
      //       name: 'IPDExFormsItem',
      //       component: () => import('@/pages/IPD/ExForms/Item.vue'),
      //       meta: {
      //         name: 'ExForms',
      //         localKey: 'ExForms',
      //         roles: [4],
      //         requireSettingDepartment: true
      //       }
      //     }
      //   ]
      // },
      {
        path: '/ipd/',
        name: 'IPD',
        component: () => import('@/pages/IPD/Home.vue'),
        meta: {
          name: 'Cấp cứu',
          roles: [4],
          requireSettingDepartment: true
        },
        children: [
          {
            path: '/ipd/',
            name: 'ListPatientInIPD',
            component: () => import('@/pages/IPD/PatientList/ListIPD.vue'),
            meta: {
              name: 'Danh sách người bệnh',
              roles: [4],
              requireSettingDepartment: true
            }
          },
          {
            path: '/ipd/ListTransfer',
            name: 'ListPatientTransferIPD',
            component: () => import('@/pages/IPD/PatientList/ListTransfer.vue'),
            meta: {
              name: 'Danh sách người bệnh chuyển khoa',
              roles: [4],
              requireSettingDepartment: true
            }
          }
        ]
      },
      {
        path: '/ipd/create',
        name: 'IPDAddCustomer',
        component: () => import('@/pages/IPD/PatientList/Create.vue'),
        meta: {
          name: 'Thêm mới bệnh nhân',
          localKey: 'general.them_moi_benh_nhan',
          roles: [4],
          requireSettingDepartment: true
        }
      },
      {
        path: '/IPD/SurgicalProcedureSafetyChecklist/:Id',
        name: 'IPDSurgicalProcedureSafetyChecklist',
        component: () => import('@/pages/OPD/SurgicalProcedureSafetyChecklist/Index.vue'),
        meta: {
          name: 'Đánh giá ban đầu',
          localKey: 'general.phan_loai_benh_nhan',
          roles: [4],
          requireSettingDepartment: true
        },
        children: [
          {
            path: '/IPD/SurgicalProcedureSafetyChecklist/SignIn/:Id/:FormId/:ItemId',
            name: 'IPDSurgicalProcedureSafetyChecklistSignIn',
            component: () => import('@/pages/OPD/SurgicalProcedureSafetyChecklist/SignIn.vue'),
            meta: {
              name: 'Ngoại trú thông thường',
              roles: [4],
              requireSettingDepartment: true
            }
          },
          {
            path: '/IPD/SurgicalProcedureSafetyChecklist/TimeOut/:Id/:FormId/:ItemId',
            name: 'IPDSurgicalProcedureSafetyChecklistTimeOut',
            component: () => import('@/pages/OPD/SurgicalProcedureSafetyChecklist/TimeOut.vue'),
            meta: {
              name: 'Ngoại trú thông thường',
              roles: [4],
              requireSettingDepartment: true
            }
          },
          {
            path: '/IPD/SurgicalProcedureSafetyChecklist/SignOut/:Id/:FormId/:ItemId',
            name: 'IPDSurgicalProcedureSafetyChecklistSignOut',
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
        path: '/ipd/ProgressNote/:Id',
        name: 'IpdPatientProgressNote',
        component: () => import('@/pages/ProgressNote/Index.vue'),
        meta: {
          name: 'Theo dõi diễn biến bệnh nhân',
          localKey: 'general.theo_doi_dien_bien',
          roles: [4],
          requireSettingDepartment: true
        }
      },
      {
        path: '/ipd/PhysicianNote/:Id',
        name: 'IpdPatientPhysicianNote',
        component: () => import('@/pages/IPD/PhysicianNote/Index.vue'),
        meta: {
          name: 'Phiếu điều trị',
          localKey: 'Phiếu điều trị',
          roles: [4],
          requireSettingDepartment: true
        }
      },
      {
        path: '/ipd/CareNote/:Id',
        name: 'TakeCareNote',
        component: () => import('@/pages/IPD/TakeCareNote/Index.vue'),
        meta: {
          name: 'Phiếu chăm sóc',
          localKey: 'Phiếu chăm sóc',
          roles: [4],
          requireSettingDepartment: true
        }
      },
      {
        path: '/IPD/HandOverCheckList/:Id',
        name: 'IPDHandOverCheckList',
        component: () => import('@/pages/IPD/HandOverCheckList/Index.vue'),
        meta: {
          name: 'Biên bản - Bảng kiểm bàn giao NB chuyển khoa',
          localKey: 'Biên bản - Bảng kiểm bàn giao NB chuyển khoa',
          roles: [4],
          requireSettingDepartment: true
        }
      },
      {
        path: '/ipd/PatientAndFamilyEducation/:Id',
        name: 'IPDPatientAndFamilyEducation',
        component: () => import('@/pages/PatientAndFamilyEducation/Index.vue'),
        meta: {
          name: 'Đánh giá ban đầu',
          localKey: 'general.phieu_gdsk',
          roles: [4],
          requireSettingDepartment: true,
          visitType: 'IPD'
        },
        children: [
          {
            path: '/ipd/PatientAndFamilyEducation/:Id/:Item',
            name: 'IPDPatientAndFamilyEducationView',
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
        path: '/ipd/CardiacArrestRecord/:Id',
        name: 'IPDCardiacArrestRecord',
        component: () => import('@/pages/CardiacArrestRecord/Index.vue'),
        meta: {
          name: 'Bảng hồi sinh tim phổi',
          localKey: 'general.phan_loai_benh_nhan',
          roles: [4],
          requireSettingDepartment: true
        },
        children: [
          {
            path: '/ipd/CardiacArrestRecord/:Id',
            name: 'IPDCardiacArrestRecordForm',
            component: () => import('@/pages/CardiacArrestRecord/Form.vue'),
            meta: {
              localKey: 'Bảng hồi sinh tim phổi',
              name: 'Bảng hồi sinh tim phổi',
              roles: [4],
              requireSettingDepartment: true
            }
          },
          {
            path: '/ipd/CardiacArrestRecordTable/:Id',
            name: 'IPDCardiacArrestRecordTable',
            component: () => import('@/pages/CardiacArrestRecord/Table.vue'),
            meta: {
              localKey: 'Bảng hồi sinh tim phổi',
              name: 'Bảng hồi sinh tim phổi',
              roles: [4],
              requireSettingDepartment: true
            }
          }
        ]
      },
      {
        path: '/ipd/InitialAssessment/:Id',
        name: 'IPDInitialAssessment',
        component: () => import('@/pages/IPD/InitialAssessment/Index.vue'),
        meta: {
          name: 'Đánh giá ban đầu người bệnh nội trú',
          localKey: 'general.phan_loai_benh_nhan',
          roles: [4],
          requireSettingDepartment: true
        },
        children: [
          {
            path: '/ipd/InitialAssessment/ForAdult/:Id',
            name: 'IPDInitialAssessmentForAdult',
            component: () => import('@/pages/IPD/InitialAssessment/ForAdult.vue'),
            meta: {
              name: 'Đánh giá ban đầu người bệnh nội trú thông thường',
              roles: [4],
              requireSettingDepartment: true
            }
          },
          {
            path: '/ipd/InitialAssessment/NeonatalMaternity/:Id',
            name: 'IPDInitialAssessmentNeonatalMaternity',
            component: () => import('@/pages/IPD/InitialAssessment/ForNeonatalMaternity/NeonatalMaternity.vue'),
            meta: {
              name: 'Đánh giá ban đầu cho trẻ vừa sinh',
              roles: [4],
              requireSettingDepartment: true,
              type: 'NeonatalMaternity'
            },
            children: [
              {
                path: '/ipd/InitialAssessment/ForNeonatalMaternity/:Id',
                name: 'IPDInitialAssessmentForNeonatalMaternity',
                component: () => import('@/pages/IPD/InitialAssessment/ForNeonatalMaternity/ForNeonatalMaternity.vue'),
                meta: {
                  name: 'Đánh giá chung',
                  roles: [4],
                  requireSettingDepartment: true,
                  type: 'NeonatalMaternity'
                }
              },
              {
                path: '/ipd/InitialAssessment/ForAdmissionAssessment/:Id',
                name: 'IPDInitialAssessmentForAdmissionAssessment',
                component: () => import('@/pages/IPD/InitialAssessment/ForNeonatalMaternity/ForAdmissionAssessment.vue'),
                meta: {
                  name: 'Đánh giá ngay sau sinh',
                  roles: [4],
                  requireSettingDepartment: true,
                  type: 'NeonatalMaternity'
                }
              },
              {
                path: '/ipd/InitialAssessment/ForUterineLife2Hours/:Id',
                name: 'IPDInitialAssessmentForUterineLife2Hours',
                component: () => import('@/pages/IPD/InitialAssessment/ForNeonatalMaternity/ForUterineLife2Hours.vue'),
                meta: {
                  name: 'Đánh giá trong 2h sau sinh',
                  roles: [4],
                  requireSettingDepartment: true,
                  type: 'NeonatalMaternity'
                }
              },
              {
                path: '/ipd/InitialAssessment/NeonatalMaternity/:Id/:Item/:NewbornCustomerId',
                name: 'IPDNeonatalMaternityV2',
                component: () => import('@/pages/IPD/InitialAssessment/ForNeonatalMaternity/ForNeonatalMaternityItemV2.vue'),
                meta: {
                  name: 'Đánh giá ban đầu trẻ vừa sinh',
                  roles: [4],
                  requireSettingDepartment: true,
                  type: 'NeonatalMaternityV2'
                }
              }
            ]
          },
          {
            path: '/ipd/InitialAssessment/Special/:Id',
            name: 'IPDInitialAssessmentSpecial',
            component: () => import('@/pages/IPD/InitialAssessment/Special.vue'),
            meta: {
              name: 'Đánh giá ban đầu người bệnh nội trú đặc biệt',
              roles: [4],
              requireSettingDepartment: true
            },
            children: [
              {
                path: '/ipd/InitialAssessment/ForFrailElderly/:Id',
                name: 'IPDInitialAssessmentForFrailElderly',
                component: () => import('@/pages/IPD/InitialAssessment/ForFrailElderly.vue'),
                meta: {
                  name: 'Đánh giá ban đầu người bệnh nội trú thông thường',
                  roles: [4],
                  requireSettingDepartment: true
                }
              },
              {
                path: '/ipd/InitialAssessment/ForChemotherapy/:Id',
                name: 'IPDInitialAssessmentForChemotherapy',
                component: () => import('@/pages/IPD/InitialAssessment/ForChemotherapy.vue'),
                meta: {
                  name: 'Đánh giá ban đầu người bệnh nội trú thông thường',
                  roles: [4],
                  requireSettingDepartment: true
                }
              },
              {
                path: '/ipd/InitialAssessment/ForChemotherapy2/:Id',
                name: 'IPDInitialAssessmentForChemotherS',
                component: () => import('@/pages/IPD/InitialAssessment/ForChemotherapy.vue'),
                meta: {
                  name: 'Đánh giá ban đầu người bệnh nội trú thông thường',
                  roles: [4],
                  requireSettingDepartment: true
                }
              }
            ]
          },
          {
            path: '/ipd/InitialAssessment/ForChild/:Id',
            name: 'IPDInitialAssessmentForChild',
            component: () => import('@/pages/IPD/InitialAssessment/ForAdult.vue'),
            meta: {
              name: 'Trẻ nội trú nhi',
              roles: [4],
              requireSettingDepartment: true
            }
          },
          {
            path: '/ipd/InitialAssessment/ForNewBorn/:Id',
            name: 'IPDInitialAssessmentForNewBorn',
            component: () => import('@/pages/IPD/InitialAssessment/ForNewBorn.vue'),
            meta: {
              name: 'Trẻ sơ sinh nội trú',
              roles: [4],
              requireSettingDepartment: true
            }
          },
          {
            path: '/ipd/InitialAssessment/ForWomenInLabour/:Id',
            name: 'IPDInitialAssessmentForWomenInLabour',
            component: () => import('@/pages/IPD/InitialAssessment/ForWomenInLabour.vue'),
            meta: {
              name: 'Sản phụ chuyển dạ',
              roles: [4],
              requireSettingDepartment: true
            }
          }
        ]
      },
      {
        path: '/ipd/AssessmentOfInfantStatusDuringTheFirst2HoursOfExtrauterineLife/:Id',
        name: 'AssessmentOfInfantStatusDuringTheFirst2HoursOfExtrauterineLife',
        component: () => import('@/pages/IPD/AssessmentOfInfantStatusDuringTheFirst2HoursOfExtrauterineLife/Index.vue'),
        meta: {
          name: 'Đánh giá tình trạng trẻ trong 2 giờ sau sinh',
          localKey: 'Đánh giá tình trạng trẻ trong 2 giờ sau sinh',
          roles: [4],
          requireSettingDepartment: true
        },
        children: [
          {
            path: '/ipd/AssessmentOfInfantStatusDuringTheFirst2HoursOfExtrauterineLifeItem/:Id/:Item',
            name: 'AssessmentOfInfantStatusDuringTheFirst2HoursOfExtrauterineLifeItem',
            component: () => import('@/pages/IPD/AssessmentOfInfantStatusDuringTheFirst2HoursOfExtrauterineLife/Item.vue'),
            meta: {
              name: 'Đánh giá tình trạng trẻ trong 2 giờ sau sinh',
              localKey: 'Đánh giá tình trạng trẻ trong 2 giờ sau sinh',
              roles: [4],
              requireSettingDepartment: true
            }
          }
        ]
      },
      {
        path: '/ipd/Customer/:Id',
        name: 'CustomerIPDInfo',
        component: () => import('@/pages/IPD/Customer.vue'),
        meta: {
          name: 'Thông tin khách hàng',
          localKey: 'general.thong_tin_khach_hang',
          roles: [4],
          requireSettingDepartment: true
        }
      },
      {
        path: '/ipd/TakeCareOfPatientsWithCovid19/:Id',
        name: 'TakeCareOfPatientsWithCovid19',
        component: () => import('@/pages/IPD/TakeCareOfPatientsWithCovid19/Index.vue'),
        meta: {
          name: 'Thông tin khách hàng',
          localKey: 'general.thong_tin_khach_hang',
          roles: [4],
          requireSettingDepartment: true
        }
      },
      {
        path: '/ipd/TakeCareOfPatientsWithCovid19/:Id/Assessment/:ItemId',
        name: 'TakeCareOfPatientsWithCovid19Form',
        component: () => import('@/pages/IPD/TakeCareOfPatientsWithCovid19/Assessment/Form.vue'),
        meta: {
          name: 'Thông tin khách hàng',
          localKey: 'general.thong_tin_khach_hang',
          roles: [4],
          requireSettingDepartment: true
        }
      },
      {
        path: '/ipd/TakeCareOfPatientsWithCovid19/:Id/Recomment/:ItemId',
        name: 'TakeCareOfPatientsWithCovid19RecommentForm',
        component: () => import('@/pages/IPD/TakeCareOfPatientsWithCovid19/Recomment/Form.vue'),
        meta: {
          name: 'Thông tin khách hàng',
          localKey: 'general.thong_tin_khach_hang',
          roles: [4],
          requireSettingDepartment: true
        }
      },
      {
        path: '/IPD/HighlyRestrictedAntimicrobialConsult/:Id',
        name: 'IPDHighlyRestrictedAntimicrobialConsult',
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
            path: '/IPD/HighlyRestrictedAntimicrobialConsult/:Id/:Item',
            name: 'IPDHighlyRestrictedAntimicrobialConsultItem',
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
        path: '/IPD/JointConsultationGroupMinutes/:Id',
        name: 'IPDJointConsultationGroupMinutes',
        component: () => import('@/pages/JointConsultationGroupMinutes/Index.vue'),
        meta: {
          name: 'Biên bản hội chẩn',
          localKey: 'Biên bản hội chẩn',
          roles: [4],
          requireSettingDepartment: true
        },
        children: [
          {
            path: '/IPD/JointConsultationGroupMinutes/:Id/:Item',
            name: 'IPDJointConsultationGroupMinutesItem',
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
        path: '/ipd/IPDDischargeMedicalReport/:Id',
        name: 'IPDDischargeMedicalReport',
        component: () => import('@/pages/IPD/DischargeMedicalReport/Index.vue'),
        meta: {
          name: 'Thông tin khách hàng',
          localKey: 'general.thong_tin_khach_hang',
          roles: [4],
          requireSettingDepartment: true
        }
      },
      {
        path: '/ipd/IPDReferralLetter/:Id',
        name: 'IPDReferralLetter',
        component: () => import('@/pages/IPD/ReferralLetter/Index.vue'),
        meta: {
          name: 'Giấy chuyển viện',
          localKey: 'general.giay_chuyen_vien',
          roles: [4],
          requireSettingDepartment: true
        }
      },
      {
        path: '/ipd/DischargeCertificate/:Id',
        name: 'DischargeCertificate',
        component: () => import('@/pages/IPD/DischargeCertificate/Index.vue'),
        meta: {
          name: 'Giấy ra viện',
          localKey: 'general.giay_ra_vien',
          roles: [4],
          requireSettingDepartment: true
        }
      },
      {
        path: '/ipd/IPDTransferLetter/:Id',
        name: 'IPDTransferLetter',
        component: () => import('@/pages/IPD/TransferLetter/Index.vue'),
        meta: {
          name: 'Giấy chuyển tuyến',
          localKey: 'general.giay_chuyen_tuyen',
          roles: [4],
          requireSettingDepartment: true
        }
      },
      {
        path: '/ipd/detail/:Id/detailIpd',
        name: 'IPDDETAIL',
        component: () => import('@/pages/IPD/Detail/Index.vue'),
        meta: {
          name: 'Thông tin khách hàng',
          localKey: 'general.thong_tin_khach_hang',
          roles: [4],
          requireSettingDepartment: true
        }
      },
      {
        path: '/ipd/all/detail/:Id',
        name: 'IPDAllDetail',
        component: () => import('@/pages/Detail/Index.vue'),
        meta: {
          name: 'detail all',
          localKey: 'detail all',
          roles: [4],
          requireSettingDepartment: true
        },
        children: [
          {
            path: '/ipd/all/detail/:Id/detailIpd',
            name: 'IPDDETAILGROUP',
            component: () => import('@/pages/IPD/Detail/Index.vue'),
            meta: {
              name: 'Thông tin khách hàng',
              localKey: 'general.thong_tin_khach_hang',
              roles: [4],
              requireSettingDepartment: true
            }
          },
          {
            path: '/IPD/all/detail/:Id/TomTatThongTinNguoiBenh',
            name: 'IPDTomTatThongTinNguoiBenh',
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
        path: '/ipd/PlanOfCare/:Id',
        name: 'IPDPlanOfCare',
        component: () => import('@/pages/IPD/PlanOfCare/Index.vue'),
        meta: {
          name: 'Kế hoạch điều trị và chăm sóc',
          localKey: 'Kế hoạch điều trị và chăm sóc',
          roles: [4],
          requireSettingDepartment: true
        }
      },
      {
        path: '/ipd/FallRiskAssessment/:Id',
        name: 'IPDFallRiskAssessment',
        component: () => import('@/pages/IPD/FallRiskAssessment/Index.vue'),
        meta: {
          name: 'Thang điểm morse đánh giá nguy cơ ngã ở NB nội trú',
          localKey: 'Thang điểm morse đánh giá nguy cơ ngã ở NB nội trú',
          roles: [4],
          requireSettingDepartment: true
        },
        children: [
          {
            path: '/ipd/FallRiskAssessment/Adult/:Id',
            name: 'IPDFallRiskAssessmentAdult',
            component: () => import('@/pages/IPD/FallRiskAssessment/Adult.vue'),
            meta: {
              name: 'Thang điểm morse đánh giá nguy cơ ngã ở NB nội trú người lớn',
              roles: [4],
              requireSettingDepartment: true
            }
          },
          {
            path: '/ipd/FallRiskAssessment/Obstetric/:Id',
            name: 'IPDFallRiskAssessmentObstetric',
            component: () => import('@/pages/IPD/FallRiskAssessment/Obstetric.vue'),
            meta: {
              name: 'Thang điểm morse đánh giá nguy cơ ngã ở NB nội trú cho nội trú sản',
              roles: [4],
              requireSettingDepartment: true
            }
          },
          {
            path: '/ipd/FallRiskAssessment/Child/:Id',
            name: 'IPDFallRiskAssessmentChild',
            component: () => import('@/pages/IPD/FallRiskAssessment/Child.vue'),
            meta: {
              name: 'Thang điểm morse đánh giá nguy cơ ngã ở NB nội trú người nhi',
              roles: [4],
              requireSettingDepartment: true
            }
          }
        ]
      },
      {
        path: '/ipd/JointConsultationForApprovalOfSurgery/:Id',
        name: 'IPDJointConsultationForApprovalOfSurgery',
        component: () => import('@/pages/JointConsultationForApprovalOfSurgery/Index.vue'),
        meta: {
          name: 'Biên bản hội chẩn thông qua mổ',
          localKey: 'Biên bản hội chẩn thông qua mổ',
          roles: [4],
          requireSettingDepartment: true
        },
        children: [
          {
            path: '/ipd/JointConsultationForApprovalOfSurgery/:Id/:Item',
            name: 'IPDJointConsultationForApprovalOfSurgeryItem',
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
      // {
      //   path: '/ipd/ProcedureSummary/:Id',
      //   name: 'IPDProcedureSummary',
      //   component: () => import('@/pages/ProcedureSummary/Index.vue'),
      //   meta: {
      //     name: 'Phiếu phẫu thuật/thủ thuật',
      //     localKey: 'Phiếu phẫu thuật/thủ thuật',
      //     roles: [4],
      //     requireSettingDepartment: true
      //   },
      //   children: [
      //     {
      //       path: '/IPD/ProcedureSummary/:Id/:Item',
      //       name: 'IPDProcedureSummaryItem',
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
        path: '/ipd/SurgeryAndProcedureSummary/:Id',
        name: 'IPDSurgeryAndProcedureSummary',
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
            path: '/IPD/SurgeryAndProcedureSummary/:Id/:Item',
            name: 'IPDSurgeryAndProcedureSummaryItem',
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
        path: '/ipd/MedicalRecord/:Id',
        name: 'IPDMedicalRecord',
        component: () => import('@/pages/IPD/MedicalRecord/Index.vue'),
        meta: {
          name: 'Bệnh án nội khoa',
          localKey: 'Bệnh án nội khoa',
          roles: [4],
          requireSettingDepartment: true
        },
        children: [
          {
            path: '/ipd/MedicalRecord/Print/:Id',
            name: 'IPDMedicalRecordPrint',
            component: () => import('@/pages/IPD/MedicalRecord/Print/Index.vue'),
            meta: {
              name: 'Bệnh án nội khoa',
              roles: [4],
              requireSettingDepartment: true
            }
          },
          {
            path: '/ipd/MedicalRecord/Part1/:Id',
            name: 'IPDMedicalRecordPart1',
            tab: 'Part1',
            component: () => import('@/pages/IPD/MedicalRecord/Part1.vue'),
            meta: {
              name: 'Bệnh án nội khoa',
              roles: [4],
              requireSettingDepartment: true
            }
          },
          {
            path: '/ipd/MedicalRecord/Part2/:Id',
            name: 'IPDMedicalRecordPart2',
            tab: 'Part2',
            component: () => import('@/pages/IPD/MedicalRecord/Part2.vue'),
            meta: {
              name: 'Bệnh án nội khoa',
              roles: [4],
              requireSettingDepartment: true
            }
          },
          {
            path: '/ipd/MedicalRecord/Part3/:Id',
            name: 'IPDMedicalRecordPart3',
            tab: 'Part3',
            component: () => import('@/pages/IPD/MedicalRecord/Part3.vue'),
            meta: {
              name: 'Bệnh án nội khoa',
              roles: [4],
              requireSettingDepartment: true
            }
          },
          {
            path: '/ipd/MedicalRecord/PreProcedureRiskAssessmentForCardiacCatheterization/:Id',
            name: 'PreProcedureRiskAssessmentForCardiacCatheterization',
            tab: 'PreProcedureRiskAssessmentForCardiacCatheterization',
            component: () => import('@/pages/IPD/MedicalRecord/PreProcedureRiskAssessmentForCardiacCatheterization/Index.vue'),
            meta: {
              name: 'Bệnh án nội khoa',
              roles: [4],
              requireSettingDepartment: true
            }
          }
        ]
      },
      {
        path: '/ipd/MedicalRecordNeonatal/:Id',
        name: 'IPDMedicalRecordNeonatal',
        component: () => import('@/pages/IPD/MedicalRecord/Index.vue'),
        meta: {
          name: 'Bệnh án sơ sinh',
          localKey: 'Bệnh án sơ sinh',
          roles: [4],
          requireSettingDepartment: true,
          type: 'Neonatal'
        },
        children: [
          {
            path: '/ipd/MedicalRecordNeonatal/Print/:Id',
            name: 'IPDMedicalRecordNeonatalPrint',
            component: () => import('@/pages/IPD/MedicalRecord/Print/Index.vue'),
            meta: {
              name: 'Bệnh án sơ sinh',
              roles: [4],
              requireSettingDepartment: true,
              type: 'Neonatal'
            }
          },
          {
            path: '/ipd/MedicalRecordNeonatal/Part1/:Id',
            name: 'IPDMedicalRecordNeonatalPart1',
            tab: 'Part1',
            component: () => import('@/pages/IPD/MedicalRecord/Part1.vue'),
            meta: {
              name: 'Bệnh án sơ sinh',
              roles: [4],
              requireSettingDepartment: true,
              type: 'Neonatal'
            }
          },
          {
            path: '/ipd/MedicalRecordNeonatal/Part2/:Id',
            name: 'IPDMedicalRecordNeonatalPart2',
            tab: 'Part2',
            component: () => import('@/pages/IPD/MedicalRecord/Part2.vue'),
            meta: {
              name: 'Bệnh án sơ sinh',
              roles: [4],
              requireSettingDepartment: true,
              type: 'Neonatal'
            }
          },
          {
            path: '/ipd/MedicalRecordNeonatal/Part3/:Id',
            name: 'IPDMedicalRecordNeonatalPart3',
            tab: 'Part3',
            component: () => import('@/pages/IPD/MedicalRecord/Part3.vue'),
            meta: {
              name: 'Bệnh án sơ sinh',
              roles: [4],
              requireSettingDepartment: true,
              type: 'Neonatal'
            }
          }
        ]
      },
      // Bệnh án sản
      {
        path: '/ipd/MedicalRecordObstetrics/:Id',
        name: 'IPDMedicalRecordObstetrics',
        component: () => import('@/pages/IPD/MedicalRecord/Index.vue'),
        meta: {
          name: 'Bệnh án sản khoa',
          localKey: 'Bệnh án sản khoa',
          roles: [4],
          requireSettingDepartment: true,
          type: 'Obstetrics'
        },
        children: [
          {
            path: '/ipd/MedicalRecordObstetrics/Print/:Id',
            name: 'IPDMedicalRecordObstetricsPrint',
            component: () => import('@/pages/IPD/MedicalRecord/Print/Index.vue'),
            meta: {
              name: 'Bệnh án sản khoa',
              roles: [4],
              requireSettingDepartment: true,
              type: 'Obstetrics'
            }
          },
          {
            path: '/ipd/MedicalRecordObstetrics/Part1/:Id',
            name: 'IPDMedicalRecordObstetricsPart1',
            tab: 'Part1',
            component: () => import('@/pages/IPD/MedicalRecord/Part1.vue'),
            meta: {
              name: 'Bệnh án sản khoa',
              roles: [4],
              requireSettingDepartment: true,
              type: 'Obstetrics'
            }
          },
          {
            path: '/ipd/MedicalRecordObstetrics/Part2/:Id',
            name: 'IPDMedicalRecordObstetricsPart2',
            tab: 'Part2',
            component: () => import('@/pages/IPD/MedicalRecord/Part2.vue'),
            meta: {
              name: 'Bệnh án sản khoa',
              roles: [4],
              requireSettingDepartment: true,
              type: 'Obstetrics'
            }
          },
          {
            path: '/ipd/MedicalRecordObstetrics/Part3/:Id',
            name: 'IPDMedicalRecordObstetricsPart3',
            tab: 'Part3',
            component: () => import('@/pages/IPD/MedicalRecord/Part3.vue'),
            meta: {
              name: 'Bệnh án sản khoa',
              roles: [4],
              requireSettingDepartment: true,
              type: 'Obstetrics'
            }
          }
        ]
      },
      {
        path: '/ipd/GuggingSwallowingScreen/:Id',
        name: 'GuggingSwallowingScreen',
        component: () => import('@/pages/IPD/GuggingSwallowingScreen/Index.vue'),
        meta: {
          name: 'GuggingSwallowingScreen',
          localKey: 'general.thong_tin_khach_hang',
          roles: [4],
          requireSettingDepartment: true
        },
        children: [
          {
            path: '/ipd/GuggingSwallowingScreen/:Id/:Item',
            name: 'GuggingSwallowingScreenItem',
            component: () => import('@/pages/IPD/GuggingSwallowingScreen/Item.vue'),
            meta: {
              name: 'GuggingSwallowingScreen',
              localKey: 'general.thong_tin_khach_hang',
              roles: [4],
              requireSettingDepartment: true
            }
          }
        ]
      },
      {
        path: '/ipd/PatientOwnMedicationsChart/:Id',
        name: 'IPDPatientOwnMedicationsChart',
        component: () => import('@/pages/PatientOwnMedicationsChart/Index.vue'),
        meta: {
          enName: 'Patient Own Medications Chart',
          name: 'Phiếu ghi nhận sử dụng thuốc do người bệnh mang vào',
          localKey: 'Phiếu ghi nhận sử dụng thuốc do người bệnh mang vào',
          roles: [4],
          requireSettingDepartment: true
        }
      },
      {
        path: '/ipd/BloodRequestSupplyAndConfirmation/:Id',
        name: 'IPDBloodRequestSupplyAndConfirmation',
        component: () => import('@/pages/ED/BloodRequestSupplyAndConfirmation/Index.vue'),
        meta: {
          name: 'Phiếu dự trù, cung cấp và xác nhận thực hiện máu - Chế phẩm máu',
          localKey: 'Phiếu dự trù, cung cấp và xác nhận thực hiện máu - Chế phẩm máu',
          roles: [4],
          requireSettingDepartment: true
        },
        children: [
          {
            path: '/ipd/BloodRequestSupplyAndConfirmation/PurchaseRequest/:Id/:FormId',
            name: 'IPDBloodRequestSupplyAndConfirmationPurchaseRequest',
            component: () => import('@/pages/ED/BloodRequestSupplyAndConfirmation/PurchaseRequest.vue'),
            meta: {
              name: 'Ngoại trú thông thường',
              localKey: 'Phiếu dự trù, cung cấp và xác nhận thực hiện máu - Chế phẩm máu',
              roles: [4],
              requireSettingDepartment: true
            }
          },
          {
            path: '/ipd/BloodRequestSupplyAndConfirmation/Supply/:Id/:FormId',
            name: 'IPDBloodRequestSupplyAndConfirmationSupply',
            component: () => import('@/pages/ED/BloodRequestSupplyAndConfirmation/Supply.vue'),
            meta: {
              name: 'Ngoại trú thông thường',
              localKey: 'Phiếu dự trù, cung cấp và xác nhận thực hiện máu - Chế phẩm máu',
              roles: [4],
              requireSettingDepartment: true
            }
          },
          {
            path: '/ipd/BloodRequestSupplyAndConfirmation/TransfusionConfirmation/:Id/:FormId',
            name: 'IPDBloodRequestSupplyAndConfirmationTransfusionConfirmation',
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
        path: '/ipd/BloodTransfusionChecklist/:Id',
        name: 'IPDBloodTransfusionChecklist',
        component: () => import('@/pages/ED/BloodTransfusionChecklist/Index.vue'),
        meta: {
          name: 'Phiếu truyền máu',
          localKey: 'general.phieu_truyen_mau',
          roles: [4],
          requireSettingDepartment: true
        },
        children: [
          {
            path: '/ipd/BloodTransfusionChecklist/:Id/:Item',
            name: 'IPDBloodTransfusionChecklistItem',
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
        path: '/ipd/ArterialBloodGasTest/:Id',
        name: 'IPDArterialBloodGasTestList',
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
            path: '/ipd/ArterialBloodGasTest/View/:Id/:Item',
            name: 'IPDArterialBloodGasTest',
            component: () => import('@/pages/ED/PointOfCareTesting/ArterialBloodGasTest.vue'),
            meta: {
              name: 'Xét nghiệm tại chỗ - Khí máu Cartridge CG4+',
              enName: 'Point of care testing - Blood gas analysis Cartridge CG4+',
              localKey: 'Xét nghiệm tại chỗ - Khí máu Cartridge CG4+',
              roles: [4],
              requireSettingDepartment: true
            }
          },
          {
            path: '/ipd/ArterialBloodGasTestV2/:Id/:Item',
            name: 'IPDArterialBloodGasTestV2',
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
        path: '/ipd/ChemicalBiologyTest/:Id',
        name: 'IPDChemicalBiologyTestList',
        component: () => import('@/pages/ED/PointOfCareTesting/ChemicalBiologyTestIndex.vue'),
        meta: {
          enName: 'Point of care testing - Chemistry Catridge CHEM8+',
          name: 'Xét nghiệm tại giường - Sinh hóa máu - Máy:iSTAT',
          localKey: 'Xét nghiệm tại chỗ - Sinh hóa máu Catridge CHEM8+',
          roles: [4],
          requireSettingDepartment: true
        },
        children: [
          {
            path: '/ipd/ChemicalBiologyTest/:Id/:Item',
            name: 'IPDChemicalBiologyTest',
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
            path: '/ipd/ChemicalBiologyTestV2/:Id/:Item',
            name: 'IPDChemicalBiologyTestV2',
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
      // {
      //   path: '/ipd/ConsultationDrugWithAnAsteriskMark/:Id',
      //   name: 'IPDConsultationDrugWithAnAsteriskMark',
      //   component: () => import('@/pages/ED/ConsultationDrugWithAnAsteriskMark/Index.vue'),
      //   meta: {
      //     name: 'Biên bản hội chẩn thuốc có dấu *',
      //     localKey: 'Biên bản hội chẩn thuốc có dấu *',
      //     roles: [4],
      //     requireSettingDepartment: true
      //   }
      // },
      {
        path: '/ipd/PHC/:Id',
        name: 'IPDPHC',
        component: () => import('@/pages/ED/PreOperativeProcedureHandoverChecklists/Index.vue'),
        meta: {
          name: 'Bảng kiểm bàn giao người bệnh trước mổ',
          localKey: 'general.ban_kiem_ban_giao_nguoi_benh_truoc_mo',
          roles: [4],
          requireSettingDepartment: true
        }
      },
      {
        path: '/ipd/IPDMedicalReport/:Id',
        name: 'IPDMedicalReport',
        component: () => import('@/pages/IPD/MedicalReport/Index.vue'),
        meta: {
          name: 'Báo cáo y tế',
          localKey: 'general.bao_cao_y_te',
          roles: [4],
          requireSettingDepartment: true
        }
      },
      {
        path: '/ipd/ExternalTransportationAssessment/:Id',
        name: 'IPDExternalTransportationAssessment',
        component: () => import('@/pages/IPD/ExternalTransportationAssessment/ExternalTransportationAssessment.vue'),
        meta: {
          name: 'Bảng đánh giá nhu cầu trang thiết bị/ nhân lực vận chuyển ngoại viện',
          localKey: 'Bảng đánh giá nhu cầu trang thiết bị/ nhân lực vận chuyển ngoại viện',
          roles: [4],
          requireSettingDepartment: true
        },
        children: [
          {
            path: '/ipd/ExternalTransportationAssessment/:Id/:Item',
            name: 'IPDExternalTransportationAssessmentItem',
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
        path: '/ipd/DischargeAgaintsMedicalAdvice/:Id',
        name: 'IPD-DischargeAgaintsMedicalAdvice',
        component: () => import('@/pages/IPD/ConfirmDischargeWithoutDirect/Index.vue'),
        meta: {
          enName: 'Discharge Againts Medical Advice',
          name: 'Giấy xác nhận ra viện không theo chỉ định của bác sĩ',
          localKey: 'Giấy xác nhận ra viện không theo chỉ định của bác sĩ',
          roles: [4],
          requireSettingDepartment: true
        }
      },
      // Bảng kiểm chuẩn bị ra viện
      {
        path: '/ipd/DischargePreparationChecklist/:Id',
        name: 'IpdHospitalDischargeTable',
        component: () => import('@/pages/IPD/HospitalDischargeTable'),
        meta: {
          name: 'Bảng kiểm chuẩn bị ra viện',
          localKey: 'listAction.bang_kiem_chuan_ra_vien',
          roles: [4],
          requireSettingDepartment: true
        }
      },
      // Bảng theo dõi dấu hiệu sinh tồn
      {
        path: '/ipd/VitalSigns/:Id',
        name: 'IpdVitalSigns',
        component: () => import('@/pages/IPD/VitalSigns/Index.vue'),
        meta: {
          name: 'Bảng theo dõi dấu hiệu sinh tồn',
          localKey: 'listAction.bang_theo_doi_dau_hieu_sinh_ton',
          roles: [4],
          requireSettingDepartment: true
        },
        children: [
          // Bảng theo dõi dấu hiệu sinh tồn người lớn
          {
            path: '/ipd/VitalSignsForAdult/:Id',
            name: 'IpdAdultVitalSigns',
            component: () => import('@/pages/IPD/VitalSigns/AdultVitalSigns/index.vue'),
            meta: {
              name: 'Bảng theo dõi dấu hiệu sinh tồn',
              localKey: 'listAction.bang_theo_doi_dau_hieu_sinh_ton_nguoi_lon',
              roles: [4],
              type: 'A02_031_220321_V',
              requireSettingDepartment: true
            }
          },
          // Bảng theo dõi dấu hiệu sinh tồn sản phụ
          {
            path: '/ipd/VitalSignsForPregnant/:Id',
            name: 'IpdPregnantVitalSigns',
            component: () => import('@/pages/IPD/VitalSigns/PregnantVitalSigns/Index.vue'),
            meta: {
              name: 'Bảng theo dõi dấu hiệu sinh tồn',
              localKey: 'listAction.bang_theo_doi_dau_hieu_sinh_ton_san_phu',
              roles: [4],
              type: 'A02_037_080322_V',
              requireSettingDepartment: true
            }
          },
          // Bảng theo dõi dấu hiệu sinh tồn trẻ sơ sinh
          {
            path: '/ipd/VitalSignsForNeonatal/:Id',
            name: 'IpdNeonatalVitalSigns',
            component: () => import('@/pages/IPD/VitalSigns/NeonatalVitalSigns/Index.vue'),
            meta: {
              name: 'Bảng theo dõi dấu hiệu sinh tồn',
              localKey: 'listAction.bang_theo_doi_dau_hieu_sinh_ton_tre_so_sinh',
              type: 'A02_030_080322_V',
              roles: [4],
              requireSettingDepartment: true
            }
          },
          // Bảng theo dõi dấu hiệu sinh tồn dành cho trẻ nhi (Từ 1 đến dưới 3 tháng tuổi)
          {
            path: '/ipd/VitalSignsPediatric1ToUnder3Month/:Id',
            name: 'IpdPediatric1ToUnder3Month',
            component: () => import('@/pages/IPD/VitalSigns/Pediatric1ToUnder3Month/Index.vue'),
            meta: {
              name: 'Bảng theo dõi dấu hiệu sinh tồn',
              localKey: 'listAction.bang_theo_doi_dau_hieu_sinh_ton_tre_nhi_tu_1_den_duoi_3_thang_tuoi',
              type: 'A02_036_080322_V',
              roles: [4],
              requireSettingDepartment: true
            }
          },
          // Bảng theo dõi dấu hiệu sinh tồn dành cho trẻ nhi (Từ 3 đến 12 tháng tuổi)
          {
            path: '/ipd/VitalSignsPediatric3To12Month/:Id',
            name: 'IpdPediatric3To12Month',
            component: () => import('@/pages/IPD/VitalSigns/Pediatric3To12Month/Index.vue'),
            meta: {
              name: 'Bảng theo dõi dấu hiệu sinh tồn',
              localKey: 'listAction.bang_theo_doi_dau_hieu_sinh_ton_tre_nhi_tu_3_den_12_thang_tuoi',
              type: 'A02_035_080322_V',
              roles: [4],
              requireSettingDepartment: true
            }
          },
          // Bảng theo dõi dấu hiệu sinh tồn dành cho trẻ nhi (Từ 1 đến dưới 4 tuổi)
          {
            path: '/ipd/VitalSignsPediatric1ToUnder4Old/:Id',
            name: 'IpdPediatric1ToUnder4Old',
            component: () => import('@/pages/IPD/VitalSigns/Pediatric1ToUnder4Old/Index.vue'),
            meta: {
              name: 'Bảng theo dõi dấu hiệu sinh tồn',
              localKey: 'listAction.bang_theo_doi_dau_hieu_sinh_ton_tre_nhi_tu_1_den_duoi_4_tuoi',
              roles: [4],
              type: 'A02_034_080322_V',
              requireSettingDepartment: true
            }
          },
          // Bảng theo dõi dấu hiệu sinh tồn dành cho trẻ nhi (Từ 4 đến 12 tuổi)
          {
            path: '/ipd/VitalSignsPediatric4To12Old/:Id',
            name: 'IpdPediatric4To12Old',
            component: () => import('@/pages/IPD/VitalSigns/Pediatric4To12Old/Index.vue'),
            meta: {
              name: 'Bảng theo dõi dấu hiệu sinh tồn',
              localKey: 'listAction.bang_theo_doi_dau_hieu_sinh_ton_tre_nhi_tu_4_den_12_tuoi',
              roles: [4],
              type: 'A02_033_080322_V',
              requireSettingDepartment: true
            }
          },
          // Bảng theo dõi dấu hiệu sinh tồn dành cho trẻ nhi (Trên 12 tuổi)
          {
            path: '/ipd/VitalSignsPediatricOver12Old/:Id',
            name: 'IpdPediatricOver12Old',
            component: () => import('@/pages/IPD/VitalSigns/PediatricOver12Old/Index.vue'),
            meta: {
              name: 'Bảng theo dõi dấu hiệu sinh tồn',
              localKey: 'listAction.bang_theo_doi_dau_hieu_sinh_ton_tre_nhi_tren_12_tuoi',
              roles: [4],
              type: 'A02_032_220321_VE',
              requireSettingDepartment: true
            }
          }
        ]
      },
      // Giấy chứng nhận thương tích
      {
        path: '/ipd/InjuryCertificate/:Id',
        name: 'InjuryCertificate',
        component: () => import('@/pages/IPD/InjuryCertificate/Index.vue'),
        meta: {
          name: 'Giấy chứng nhận thương tích',
          localKey: 'listAction.giay_chung_nhan_thuong_tich',
          roles: [4],
          requireSettingDepartment: true
        }
      },
      // Kiểm thảo tử vong
      {
        path: '/ipd/MortalityReport/:Id',
        name: 'IpdMortalityReport',
        component: () => import('@/pages/IPD/MortalityReport'),
        meta: {
          name: 'Biên bản - Trích biên bản kiểm thảo tử vong',
          localKey: 'listAction.kiem_thao_tu_vong',
          roles: [4],
          requireSettingDepartment: true
        },
        children: [
          {
            path: '/ipd/MortalityReport/Page1/:Id',
            name: 'IpdMortalityReportPage1',
            tab: 'Part1',
            component: () => import('@/pages/IPD/MortalityReport/Page1.vue'),
            meta: {
              name: 'Biên bản - Trích biên bản kiểm thảo tử vong',
              roles: [4],
              localKey: 'listAction.kiem_thao_tu_vong',
              requireSettingDepartment: true
            }
          },
          {
            path: '/ipd/MortalityReport/Page2/:Id',
            name: 'IpdMortalityReportPage2',
            tab: 'Part2',
            component: () => import('@/pages/IPD/MortalityReport/Page2.vue'),
            meta: {
              name: 'Biên bản - Trích biên bản kiểm thảo tử vong',
              roles: [4],
              localKey: 'listAction.kiem_thao_tu_vong',
              requireSettingDepartment: true
            }
          }
        ]
      },
      // Bảng điểm Braden đánh giá nguy cơ loét
      {
        path: '/ipd/BradenScale/:Id',
        name: 'BradenScale',
        component: () => import('@/pages/IPD/BradenScoreboard'),
        meta: {
          name: 'Bảng điểm Braden đánh giá nguy cơ loét',
          localKey: 'listAction.bang_diem_braden_danh_gia_nguy_co_lo_loet',
          roles: [4],
          requireSettingDepartment: true
        }
      },
      // {
      //   path: '/MedicationAdministrationRecord',
      //   name: 'medicationAdministrationRecord-page',
      //   component: () => import('@/pages/MedicationAdministrationRecord/Index.vue'),
      //   meta: {
      //     roles: [4],
      //     auth: true
      //   },
      //   children: [
      //     {
      //       path: '/MedicationAdministrationRecord/',
      //       name: 'medicationAdministrationRecord-Search',
      //       component: () => import('@/pages/MedicationAdministrationRecord/Search.vue'),
      //       meta: {
      //         name: 'Y lệnh nội trú',
      //         localKey: 'Y lệnh nội trú',
      //         roles: [4]
      //       }
      //     },
      //     {
      //       path: '/MedicationAdministrationRecord/:PID',
      //       name: 'medicationAdministrationRecord-result',
      //       component: () => import('@/pages/MedicationAdministrationRecord/Result.vue'),
      //       meta: {
      //         name: 'Y lệnh nội trú',
      //         localKey: 'Y lệnh nội trú',
      //         roles: [4]
      //       }
      //     }
      //   ]
      // }
      {
        path: '/ipd/SumaryOf15DayTreatment/:Id',
        name: 'IPDSummaryOf15DayTreatment',
        component: () => import('@/pages/IPD/SummaryOf15DayTreatment'),
        meta: {
          name: 'Phiếu sơ kết 15 ngày điều trị',
          localKey: 'listAction.Phieu_so_ket_15_ngay_dieu_tri',
          roles: [4],
          requireSettingDepartment: true
        },
        children: [
          {
            path: '/ipd/SumaryOf15DayTreatment/:Id/:Item',
            name: 'IPDSummaryOf15DayTreatmentItem',
            component: () => import('@/pages/IPD/SummaryOf15DayTreatment/Item.vue'),
            meta: {
              name: 'Phiếu sơ kết 15 ngày điều trị',
              localKey: 'listAction.Phieu_so_ket_15_ngay_dieu_tri',
              roles: [4],
              requireSettingDepartment: true
            }
          }
        ]
      },
      {
        path: '/ipd/MedicationHistoryForm/:Id',
        name: 'MedicationHistoryForm',
        component: () => import('@/pages/IPD/MedicationHistoryForm'),
        meta: {
          name: 'Phiếu khai thác tiền sử dùng thuốc',
          localKey: 'listAction.phieu_khai_thac_tien_su_dung_thuoc',
          roles: [4],
          requireSettingDepartment: true
        }
      },
      // {
      //   path: '/ipd/SurgeryCertificate/:Id',
      //   name: 'IpdSurgeryCertificate',
      //   component: () => import('@/pages/IPD/SurgeryCertificate'),
      //   meta: {
      //     name: 'Giấy chứng nhận phẫu thuật',
      //     localKey: 'listAction.giay_chung_nhan_phau_thuat',
      //     roles: [4],
      //     requireSettingDepartment: true
      //   }
      // },
      {
        path: '/ipd/SurgeryCertificate/:Id',
        name: 'IpdSurgeryCertificate',
        component: () => import('@/pages/IPD/SurgeryCertificate'),
        meta: {
          name: 'Giấy chứng nhận phẫu thuật',
          localKey: 'listAction.giay_chung_nhan_phau_thuat',
          roles: [4],
          requireSettingDepartment: true
        },
        children: [
          {
            path: '/IPD/SurgeryCertificate/:Id/:Item',
            name: 'IpdSurgeryCertificateItem',
            component: () => import('@/pages/IPD/SurgeryCertificate/item.vue'),
            meta: {
              name: 'Giấy chứng nhận phẫu thuật',
              localKey: 'listAction.giay_chung_nhan_phau_thuat',
              roles: [4],
              requireSettingDepartment: true
            }
          }
        ]
      },
      // Bệnh án nhi
      {
        path: '/ipd/MedicalRecordPediatric/:Id',
        name: 'MedicalRecordPediatric',
        component: () => import('@/pages/IPD/MedicalRecord/Index.vue'),
        meta: {
          name: 'Bệnh án nhi khoa',
          localKey: 'listAction.benh_an_nhi_khoa',
          roles: [4],
          requireSettingDepartment: true,
          type: 'Pediatric'
        },
        children: [
          {
            path: '/ipd/MedicalRecordPediatric/Print/:Id',
            name: 'IPDMedicalRecordPediatricPrint',
            component: () => import('@/pages/IPD/MedicalRecord/Print/Index.vue'),
            meta: {
              name: 'Bệnh án nhi khoa',
              roles: [4],
              requireSettingDepartment: true,
              type: 'Pediatric'
            }
          },
          {
            path: '/ipd/MedicalRecordPediatric/Part1/:Id',
            name: 'IPDMedicalRecordPediatricPart1',
            tab: 'Part1',
            component: () => import('@/pages/IPD/MedicalRecord/Part1.vue'),
            meta: {
              name: 'Bệnh án nhi khoa',
              roles: [4],
              requireSettingDepartment: true,
              type: 'Pediatric'
            }
          },
          {
            path: '/ipd/MedicalRecordPediatric/Part2/:Id',
            name: 'IPDMedicalRecordPediatricPart2',
            tab: 'Part2',
            component: () => import('@/pages/IPD/MedicalRecord/Part2.vue'),
            meta: {
              name: 'Bệnh án nhi khoa',
              roles: [4],
              requireSettingDepartment: true,
              type: 'Pediatric'
            }
          },
          {
            path: '/ipd/MedicalRecordPediatric/Part3/:Id',
            name: 'IPDMedicalRecordPediatricPart3',
            tab: 'Part3',
            component: () => import('@/pages/IPD/MedicalRecord/Part3.vue'),
            meta: {
              name: 'Bệnh án nhi khoa',
              roles: [4],
              requireSettingDepartment: true,
              type: 'Pediatric'
            }
          }
        ]
      },
      {
        path: '/ipd/ThrombosisRiskFactorAssessment/:Id',
        name: 'ThrombosisRiskFactorAssessment',
        component: () => import('@/pages/IPD/ThrombosisRiskFactorAssessment/Index.vue'),
        meta: {
          name: 'Đánh giá nguy cơ thuyên tắc mạch cho BN nội khoa',
          localKey: 'Đánh giá nguy cơ thuyên tắc mạch',
          roles: [1],
          requireSettingDepartment: true
        }
      },
      {
        path: '/ipd/TRFAforgeneralsurgerypatients/:Id',
        name: 'ThrombosisRiskFactorAssessmentForGSP',
        component: () => import('@/pages/IPD/ThrombosisRiskFactorAssessmentForGeneralSurgeryPatients/Index.vue'),
        meta: {
          name: 'Đánh giá nguy cơ thuyên tắc mạch bệnh nhân ngoại tổng hợp',
          localKey: 'Đánh giá nguy cơ thuyên tắc mạch cho bệnh nhân ngoại tổng hợp',
          roles: [1],
          requireSettingDepartment: true,
          type: 'A01_195_050919_V'
        }
      },
      // Bệnh án phụ khoa
      {
        path: '/ipd/MedicalRecordGynecological/:Id',
        name: 'IPDMedicalRecordGynecological',
        component: () => import('@/pages/IPD/MedicalRecord/Index.vue'),
        meta: {
          name: 'Bệnh án phụ khoa',
          localKey: 'Bệnh án phụ khoa',
          roles: [4],
          requireSettingDepartment: true,
          type: 'Gynecological'
        },
        children: [
          {
            path: '/ipd/MedicalRecordGynecological/Print/:Id',
            name: 'IPDMedicalRecordGynecologicalPrint',
            component: () => import('@/pages/IPD/MedicalRecord/Print/Index.vue'),
            meta: {
              name: 'Bệnh án phụ khoa',
              roles: [4],
              requireSettingDepartment: true,
              type: 'Gynecological'
            }
          },
          {
            path: '/ipd/MedicalRecordGynecological/Part1/:Id',
            name: 'IPDMedicalRecordGynecologicalPart1',
            tab: 'Part1',
            component: () => import('@/pages/IPD/MedicalRecord/Part1.vue'),
            meta: {
              name: 'Bệnh án phụ khoa',
              roles: [4],
              requireSettingDepartment: true,
              type: 'Gynecological'
            }
          },
          {
            path: '/ipd/MedicalRecordGynecological/Part2/:Id',
            name: 'IPDMedicalRecordGynecologicalPart2',
            tab: 'Part2',
            component: () => import('@/pages/IPD/MedicalRecord/Part2.vue'),
            meta: {
              name: 'Bệnh án phụ khoa',
              roles: [4],
              requireSettingDepartment: true,
              type: 'Gynecological'
            }
          },
          {
            path: '/ipd/MedicalRecordGynecological/Part3/:Id',
            name: 'IPDMedicalRecordGynecologicalPart3',
            tab: 'Part3',
            component: () => import('@/pages/IPD/MedicalRecord/Part3.vue'),
            meta: {
              name: 'Bệnh án phụ khoa',
              roles: [4],
              requireSettingDepartment: true,
              type: 'Gynecological'
            }
          }
        ]
      },
      // Bệnh án ngoại khoa
      {
        path: '/ipd/TheSurgicalMedicalRecord/:Id',
        name: 'IPDTheSurgicalMedicalRecord',
        component: () => import('@/pages/IPD/MedicalRecord/Index.vue'),
        meta: {
          name: 'Bệnh án ngoại khoa',
          localKey: 'Bệnh án ngoại khoa',
          roles: [4],
          requireSettingDepartment: true,
          type: 'A01_195_050919_V'
        },
        children: [
          {
            path: '/ipd/TheSurgicalMedicalRecord/Print/:Id',
            name: 'IPDTheSurgicalMedicalRecordPrint',
            component: () => import('@/pages/IPD/MedicalRecord/Print/Index.vue'),
            meta: {
              name: 'Bệnh án ngoại khoa',
              roles: [4],
              requireSettingDepartment: true,
              type: 'A01_195_050919_V'
            }
          },
          {
            path: '/ipd/TheSurgicalMedicalRecord/Part1/:Id',
            name: 'IPDTheSurgicalMedicalRecordPart1',
            tab: 'Part1',
            component: () => import('@/pages/IPD/MedicalRecord/Part1.vue'),
            meta: {
              name: 'Bệnh án ngoại khoa',
              roles: [4],
              requireSettingDepartment: true,
              type: 'A01_195_050919_V'
            }
          },
          {
            path: '/ipd/TheSurgicalMedicalRecord/Part2/:Id',
            name: 'IPDTheSurgicalMedicalRecordPart2',
            tab: 'Part2',
            component: () => import('@/pages/IPD/MedicalRecord/Part2.vue'),
            meta: {
              name: 'Bệnh án ngoại khoa',
              roles: [4],
              requireSettingDepartment: true,
              type: 'A01_195_050919_V'
            }
          },
          {
            path: '/ipd/TheSurgicalMedicalRecord/Part3/:Id',
            name: 'IPDTheSurgicalMedicalRecordPart3',
            tab: 'Part3',
            component: () => import('@/pages/IPD/MedicalRecord/Part3.vue'),
            meta: {
              name: 'Bệnh án ngoại khoa',
              roles: [4],
              requireSettingDepartment: true,
              type: 'A01_195_050919_V'
            }
          }
        ]
      },
      // Bệnh án nha khoa
      {
        path: '/ipd/A01_040_050919_V/:Id',
        name: 'IPDA01_040_050919_V',
        component: () => import('@/pages/IPD/MedicalRecord/Index.vue'),
        meta: {
          name: 'Bệnh án răng hàm mặt',
          localKey: 'Bệnh án răng hàm mặt',
          roles: [4],
          requireSettingDepartment: true,
          type: 'A01_040_050919_V'
        },
        children: [
          {
            path: '/ipd/A01_040_050919_V/Print/:Id',
            name: 'IPDA01_040_050919_VPrint',
            component: () => import('@/pages/IPD/MedicalRecord/Print/Index.vue'),
            meta: {
              name: 'Bệnh án răng hàm mặt',
              roles: [4],
              requireSettingDepartment: true,
              type: 'A01_040_050919_V'
            }
          },
          {
            path: '/ipd/A01_040_050919_V/Part1/:Id',
            name: 'IPDA01_040_050919_VPart1',
            tab: 'Part1',
            component: () => import('@/pages/IPD/MedicalRecord/Part1.vue'),
            meta: {
              name: 'Bệnh án răng hàm mặt',
              roles: [4],
              requireSettingDepartment: true,
              type: 'A01_040_050919_V'
            }
          },
          {
            path: '/ipd/A01_040_050919_V/Part2/:Id',
            name: 'IPDA01_040_050919_VPart2',
            tab: 'Part2',
            component: () => import('@/pages/IPD/MedicalRecord/Part2.vue'),
            meta: {
              enName: 'The Dental- Maxillofacial Medical Record',
              name: 'Bệnh án răng hàm mặt',
              roles: [4],
              requireSettingDepartment: true,
              type: 'A01_040_050919_V'
            }
          },
          {
            path: '/ipd/A01_040_050919_V/Part3/:Id',
            name: 'IPDA01_040_050919_VPart3',
            tab: 'Part3',
            component: () => import('@/pages/IPD/MedicalRecord/Part3.vue'),
            meta: {
              name: 'Bệnh án răng hàm mặt',
              roles: [4],
              requireSettingDepartment: true,
              type: 'A01_040_050919_V'
            }
          }
        ]
      },
      // Bệnh án tim mach
      {
        path: '/ipd/CardiovascularForm/:Id',
        name: 'CardiovascularForm',
        component: () => import('@/pages/IPD/MedicalRecord/Index.vue'),
        meta: {
          name: 'Bệnh án tim mạch',
          localKey: 'Bệnh án tim mạch',
          roles: [4],
          requireSettingDepartment: true,
          type: 'CardiovascularForm'
        },
        children: [
          {
            path: '/ipd/CardiovascularForm/Print/:Id',
            name: 'IPDCardiovascularFormPrint',
            component: () => import('@/pages/IPD/MedicalRecord/Print/Index.vue'),
            meta: {
              name: 'Bệnh án tim mạch',
              roles: [4],
              requireSettingDepartment: true,
              type: 'CardiovascularForm'
            }
          },
          {
            path: '/ipd/CardiovascularForm/Part1/:Id',
            name: 'IPDCardiovascularFormPart1',
            tab: 'Part1',
            component: () => import('@/pages/IPD/MedicalRecord/Part1.vue'),
            meta: {
              name: 'Bệnh án tim mạch',
              roles: [4],
              requireSettingDepartment: true,
              type: 'CardiovascularForm'
            }
          },
          {
            path: '/ipd/CardiovascularForm/Part2/:Id',
            name: 'IPDCardiovascularFormPart2',
            tab: 'Part2',
            component: () => import('@/pages/IPD/MedicalRecord/Part2.vue'),
            meta: {
              name: 'Bệnh án tim mạch',
              roles: [4],
              requireSettingDepartment: true,
              type: 'CardiovascularForm'
            }
          },
          {
            path: '/ipd/CardiovascularForm/Part3/:Id',
            name: 'IPDCardiovascularFormPart3',
            tab: 'Part3',
            component: () => import('@/pages/IPD/MedicalRecord/Part3.vue'),
            meta: {
              name: 'Bệnh án tim mạch',
              roles: [4],
              requireSettingDepartment: true,
              type: 'CardiovascularForm'
            }
          },
          {
            path: '/ipd/CardiovascularForm/PreProcedureRiskAssessmentForCardiacCatheterization/:Id',
            name: 'IPDCardiovascularFormPart4',
            tab: 'Part5',
            component: () => import('@/pages/IPD/MedicalRecord/PreProcedureRiskAssessmentForCardiacCatheterization/Index.vue'),
            meta: {
              name: 'Bệnh án tim mạch',
              roles: [4],
              requireSettingDepartment: true,
              type: 'CardiovascularForm'
            }
          }
        ]
      },
      // Bệnh án tai mui hong
      {
        path: '/ipd/A01_039_050919_V/:Id',
        name: 'IPDA01_039_050919_V',
        component: () => import('@/pages/IPD/MedicalRecord/Index.vue'),
        meta: {
          name: 'Bệnh án tai mũi họng',
          localKey: 'Bệnh án tai mũi họng',
          roles: [4],
          requireSettingDepartment: true,
          type: 'A01_039_050919_V'
        },
        children: [
          {
            path: '/ipd/A01_039_050919_V/Print/:Id',
            name: 'IPDA01_039_050919_VPrint',
            component: () => import('@/pages/IPD/MedicalRecord/Print/Index.vue'),
            meta: {
              name: 'Bệnh án tai mũi họng',
              roles: [4],
              requireSettingDepartment: true,
              type: 'A01_039_050919_V'
            }
          },
          {
            path: '/ipd/A01_039_050919_V/Part1/:Id',
            name: 'IPDA01_039_050919_VPart1',
            tab: 'Part1',
            component: () => import('@/pages/IPD/MedicalRecord/Part1.vue'),
            meta: {
              name: 'Bệnh án tai mũi họng',
              roles: [4],
              requireSettingDepartment: true,
              type: 'A01_039_050919_V'
            }
          },
          {
            path: '/ipd/A01_039_050919_V/Part2/:Id',
            name: 'IPDA01_039_050919_VPart2',
            tab: 'Part2',
            component: () => import('@/pages/IPD/MedicalRecord/Part2.vue'),
            meta: {
              enName: 'E.N.T Medical Record',
              name: 'Bệnh án tai mũi họng',
              roles: [4],
              requireSettingDepartment: true,
              type: 'A01_039_050919_V'
            }
          },
          {
            path: '/ipd/A01_039_050919_V/Part3/:Id',
            name: 'IPDA01_039_050919_VPart3',
            tab: 'Part3',
            component: () => import('@/pages/IPD/MedicalRecord/Part3.vue'),
            meta: {
              name: 'Bệnh án tai mũi họng',
              roles: [4],
              requireSettingDepartment: true,
              type: 'A01_039_050919_V'
            }
          }
        ]
      },
      {
        path: '/ipd/MonitorSheetForPatient/:Id',
        name: 'IPDMonitorSheetForPatient',
        component: () => import('@/pages/IPD/MonitorSheetForPatient'),
        meta: {
          name: 'Phiếu theo dõi người bệnh thoát mạch thuốc điều trị ung thư',
          localKey: 'listAction.Phieu_theo_doi_nguoi_benh_thoat_mach_thuoc_dieu_tri_ung_thu',
          roles: [4],
          requireSettingDepartment: true
        },
        children: [
          {
            path: '/ipd/MonitorSheetForPatient/:Id/:Item',
            name: 'IPDMonitorSheetForPatientItem',
            component: () => import('@/pages/IPD/MonitorSheetForPatient/Item.vue'),
            meta: {
              name: 'Phiếu theo dõi người bệnh thoát mạch thuốc điều trị ung thư',
              localKey: 'listAction.Phieu_theo_doi_nguoi_benh_thoat_mach_thuoc_dieu_tri_ung_thu',
              roles: [4],
              requireSettingDepartment: true
            }
          }
        ]
      },
      {
        path: '/ipd/CoronaryIntervention/:Id',
        name: 'IPDCoronaryIntervention',
        testTitle: 'abc xyz',
        component: () => import('@/pages/IPD/CoronaryIntervention'),
        meta: {
          enName: 'Coronary intervention summary',
          name: 'Tóm tắt thủ thuật can thiệp động mạch vành',
          localKey: 'listAction.Dieu_tri_can_thiep_dong_mach_vanh',
          roles: [4],
          requireSettingDepartment: true
        },
        children: [
          {
            path: '/ipd/CoronaryIntervention/:Id/:Item',
            name: 'IPDCoronaryInterventionItem',
            component: () => import('@/pages/IPD/CoronaryIntervention/Item.vue'),
            meta: {
              enName: 'Coronary intervention summary',
              name: 'Tóm tắt thủ thuật can thiệp động mạch vành',
              localKey: 'listAction.Dieu_tri_can_thiep_dong_mach_vanh',
              roles: [4],
              requireSettingDepartment: true
            }
          }
        ]
      },
      {
        path: '/ipd/CoordinatingWithThePatient/:Id',
        name: 'IPDCoordinatingWithThePatient',
        component: () => import('@/pages/IPD/CoordinatingWithThePatient'),
        meta: {
          enName: 'Coordinating with the patient/ family to deal with a stillbirth',
          name: 'Biên bản phối hợp với bệnh nhân/ gia đình xử lý thai chết lưu',
          localKey: 'listAction.thai_chet_luu',
          roles: [4],
          requireSettingDepartment: true
        },
        children: [
          {
            path: '/ipd/CoordinatingWithThePatient/:Id/:Item',
            name: 'IPDCoordinatingWithThePatientItem',
            component: () => import('@/pages/IPD/CoordinatingWithThePatient/Item.vue'),
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
      // Bảng điểm Braden đánh giá nguy cơ loét
      {
        path: '/ipd/VerbalOrderForm/:Id',
        name: 'VerbalOrderForm',
        component: () => import('@/pages/IPD/VerbalOrderForm/Index.vue'),
        meta: {
          name: 'Phiếu ghi nhận thuốc y lệnh miệng',
          localKey: 'listAction.phieu_ghi_nhan_thuoc_y_lenh',
          roles: [4],
          requireSettingDepartment: true
        }
      },
      // Bệnh án ung bướu
      {
        path: '/ipd/MedicalRecordOncology/:Id',
        name: 'IPDMedicalRecordOncology',
        component: () => import('@/pages/IPD/MedicalRecord/Index.vue'),
        meta: {
          name: 'Bệnh án ung bướu',
          localKey: 'Bệnh án ung bướu',
          roles: [4],
          requireSettingDepartment: true,
          type: 'Oncology'
        },
        children: [
          {
            path: '/ipd/MedicalRecordOncology/Print/:Id',
            name: 'IPDMedicalRecordOncologyPrint',
            component: () => import('@/pages/IPD/MedicalRecord/Print/Index.vue'),
            meta: {
              enNamne: 'Oncology medical record',
              name: 'Bệnh án ung bướu',
              roles: [4],
              requireSettingDepartment: true,
              type: 'Oncology'
            }
          },
          {
            path: '/ipd/MedicalRecordOncology/Part1/:Id',
            name: 'IPDMedicalRecordOncologyPart1',
            tab: 'Part1',
            component: () => import('@/pages/IPD/MedicalRecord/Part1.vue'),
            meta: {
              name: 'Bệnh án ung bướu',
              roles: [4],
              requireSettingDepartment: true,
              type: 'Oncology'
            }
          },
          {
            path: '/ipd/MedicalRecordOncology/Part2/:Id',
            name: 'IPDMedicalRecordOncologyPart2',
            tab: 'Part2',
            component: () => import('@/pages/IPD/MedicalRecord/Part2.vue'),
            meta: {
              enName: 'The Oncology Medical Record',
              name: 'Bệnh án ung bướu',
              roles: [4],
              requireSettingDepartment: true,
              type: 'Oncology'
            }
          },
          {
            path: '/ipd/MedicalRecordOncology/Part3/:Id',
            name: 'IPDMedicalRecordOncologyPart3',
            tab: 'Part3',
            component: () => import('@/pages/IPD/MedicalRecord/Part3.vue'),
            meta: {
              name: 'Bệnh án ung bướu',
              roles: [4],
              requireSettingDepartment: true,
              type: 'Oncology'
            }
          }
        ]
      },
      // Bệnh án tai mắt
      {
        path: '/ipd/MedicalRecordEye/:Id',
        name: 'IPDMedicalRecordEye',
        component: () => import('@/pages/IPD/MedicalRecord/Index.vue'),
        meta: {
          name: 'Bệnh án mắt',
          localKey: 'Bệnh tai mắt',
          roles: [4],
          requireSettingDepartment: true,
          type: 'Oncology'
        },
        children: [
          {
            path: '/ipd/MedicalRecordEye/Print/:Id',
            name: 'IPDMedicalRecordEyePrint',
            component: () => import('@/pages/IPD/MedicalRecord/Print/Index.vue'),
            meta: {
              enName: 'Bệnh án tai mắt',
              name: 'Bệnh án tai mắt',
              roles: [4],
              requireSettingDepartment: true,
              type: 'Eye'
            }
          },
          {
            path: '/ipd/MedicalRecordEye/Part1/:Id',
            name: 'IPDMedicalRecordEyePart1',
            tab: 'Part1',
            component: () => import('@/pages/IPD/MedicalRecord/Part1.vue'),
            meta: {
              name: 'Bệnh án tai mắt',
              roles: [4],
              requireSettingDepartment: true,
              type: 'Eye'
            }
          },
          {
            path: '/ipd/MedicalRecordEye/Part2/:Id',
            name: 'IPDMedicalRecordEyePart2',
            tab: 'Part2',
            component: () => import('@/pages/IPD/MedicalRecord/Part2.vue'),
            meta: {
              enName: 'Ophthalmology Medical Record',
              name: 'Bệnh án mắt',
              roles: [4],
              requireSettingDepartment: true,
              type: 'Eye'
            }
          },
          {
            path: '/ipd/MedicalRecordEye/Part3/:Id',
            name: 'IPDMedicalRecordEyePart3',
            tab: 'Part3',
            component: () => import('@/pages/IPD/MedicalRecord/Part3.vue'),
            meta: {
              name: 'Bệnh án tai mắt',
              roles: [4],
              requireSettingDepartment: true,
              type: 'Eye'
            }
          }
        ]
      },
      {
        path: '/ipd/ConsultationDrugWithAnAsterisk/:Id',
        name: 'IPDConsultationDrugWithAnAsterisk',
        component: () => import('@/pages/IPD/ConsultationDrugWithAnAsteriskMarkUpForm'),
        meta: {
          name: 'Biên bản hội chẩn bệnh nhân sử dụng thuốc có dấu sao (*)',
          localKey: 'Biên bản hội chẩn bệnh nhân sử dụng thuốc có dấu sao (*)',
          roles: [4],
          requireSettingDepartment: true
        },
        children: [
          {
            path: '/ipd/ConsultationDrugWithAnAsterisk/:Id/:Item',
            name: 'IPDConsultationDrugWithAnAsterisk',
            component: () => import('@/pages/IPD/ConsultationDrugWithAnAsteriskMarkUpForm/Item.vue'),
            meta: {
              name: 'Biên bản hội chẩn bệnh nhân sử dụng thuốc có dấu sao (*)',
              localKey: 'Biên bản hội chẩn bệnh nhân sử dụng thuốc có dấu sao (*)',
              roles: [4],
              requireSettingDepartment: true
            }
          }
        ]
      },
      {
        path: '/ipd/GlamorganPressure/:Id',
        name: 'GlamorganPressure',
        component: () => import('@/pages/IPD/GlamorganPressure/Child.vue'),
        meta: {
          name: 'Bảng điểm GLAMORGAN sàng lọc loét do tỳ ép ở trẻ nhi và sơ sinh',
          localKey: 'Bảng điểm GLAMORGAN sàng lọc loét do tỳ ép ở trẻ nhi và sơ sinh',
          roles: [4],
          requireSettingDepartment: true
        }
      },
      {
        path: '/ipd/MHFForNewBorn/:Id',
        name: 'MedicationHistoryFormForNewBorn',
        component: () => import('@/pages/IPD/MedicationHistoryFormForNewBorn'),
        meta: {
          name: 'Phiếu khai thác tiền sử dùng thuốc bệnh - Nhi',
          localKey: 'Phiếu khai thác tiền sử dùng thuốc bệnh - Nhi',
          roles: [4],
          requireSettingDepartment: true
        }
      },
      {
        path: '/ipd/TrickSummary/:Id',
        name: 'IPDTrickSummary',
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
            path: '/ipd/TrickSummary/:Id/:Item',
            name: 'IPDTrickSummaryItem',
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
        path: '/ipd/ScaleForAssessmentOfSuicideIntent/:Id',
        name: 'IPDScaleForAssessmentOfSuicideIntent',
        component: () => import('@/pages/IPD/ScaleForAssessmentOfSuicideIntent/Index.vue'),
        meta: {
          name: 'Thang đánh giá ý tưởng tự sát và mức độ ý tưởng tự sát',
          localKey: 'Thang đánh giá ý tưởng tự sát và mức độ ý tưởng tự sát',
          roles: [4],
          requireSettingDepartment: true
        },
        children: [
          {
            path: '/ipd/ScaleForAssessmentOfSuicideIntent/:Id/:Item',
            name: 'IPDScaleForAssessmentOfSuicideIntentItem',
            component: () => import('@/pages/IPD/ScaleForAssessmentOfSuicideIntent/Item.vue'),
            meta: {
              name: 'Thang đánh giá ý tưởng tự sát và mức độ ý tưởng tự sát',
              localKey: 'Thang đánh giá ý tưởng tự sát và mức độ ý tưởng tự sát',
              roles: [4],
              requireSettingDepartment: true
            }
          }
        ]
      },
      {
        path: '/IPD/StandingOrder/:Id',
        name: 'IPDStandingOrder',
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
        path: '/IPD/PromForCoronaryDisease/:Id',
        name: 'IPDPromForCoronaryDisease',
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
        path: '/IPD/PROMForHeartFailure/:Id',
        name: 'IPDPROMForHeartFailure',
        component: () => import('@/pages/IPD/PROMForHeartFailure/Index.vue'),
        meta: {
          name: 'PROM bệnh nhân suy tim',
          localKey: 'PROM bệnh nhân suy tim',
          roles: [1, 2, 3, 4],
          requireSettingDepartment: true,
          allowView: true
        }
      },
      {
        path: '/IPD/ConsentForTransfusionOfBloodAndBloodDerivedProducts/:Id',
        name: 'IPDConsentForTransfusionOfBloodAndBloodDerivedProducts',
        component: () => import('@/pages/ConsentForTransfusionOfBloodAndBloodDerivedProducts/Index.vue'),
        meta: {
          enName: 'Consent for transfusion of blood and/ or blood derived products',
          name: 'Phiếu cam kết truyền máu và các chế phẩm máu',
          localKey: 'Phiếu cam kết truyền máu và các chế phẩm máu',
          roles: [4],
          requireSettingDepartment: true,
          allowView: true
        }
      },
      {
        path: '/IPD/ConsentForOperation/:Id',
        name: 'IPDConsentForOperation',
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
        path: '/IPD/ConsentDoNotOrder/:Id',
        name: 'ConsentDoNotOrder',
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
        path: '/IPD/HIVTestingConsent/:Id',
        name: 'IPDHIVTestingConsent',
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
        path: '/IPD/UploadImage/:Id',
        name: 'UploadFile',
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
        path: '/IPD/AskThePatientBeforeSurgery/:Id',
        name: 'AskThePatientBeforeSurgery',
        component: () => import('@/pages/IPD/AskThePatientBeforeSurgery/Index.vue'),
        meta: {
          enName: 'Yêu cầu người bệnh chuẩn bị trước khi phẫu thuật/ thủ thuật',
          name: 'Yêu cầu người bệnh chuẩn bị trước khi phẫu thuật/ thủ thuật',
          localKey: 'Yêu cầu người bệnh chuẩn bị trước khi phẫu thuật/ thủ thuật',
          roles: [1, 2, 3, 4],
          requireSettingDepartment: true,
          allowView: true
        }
      },
      {
        path: '/ipd/ACTForms/:Id',
        name: 'IPDACTForms',
        component: () => import('@/pages/IPD/ACT/Index.vue'),
        meta: {
          enName: 'Point of case testing - ACT Cartridge Celite',
          name: 'Xét nghiệm tại chỗ - ACT Cartridge Celite',
          localKey: 'XNTC - ACT Cartridge Celite',
          roles: [4],
          requireSettingDepartment: true
        },
        children: [
          {
            path: '/ipd/ACTForms/:Id/:Item',
            name: 'IPDACTFormsItem',
            component: () => import('@/pages/IPD/ACT/Item.vue'),
            meta: {
              enName: 'Point of case testing - ACT Cartridge Celite',
              name: 'Xét nghiệm tại chỗ - ACT Cartridge Celite',
              localKey: 'XNTC - ACT Cartridge Celite',
              roles: [4],
              requireSettingDepartment: true
            }
          }
        ]
      },
      {
        path: '/ipd/A03_165_061222_V/:Id',
        name: 'IPDBloodGasAnalysisEG7',
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
            path: '/ipd/A03_165_061222_V/:Id/:Item',
            name: 'IPDBloodGasAnalysisEG7Item',
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
        path: '/IPD/CommitmentPaperToTakeThePlacenta/:Id',
        name: 'CommitmentPaperToTakeThePlacenta',
        component: () => import('@/pages/CommitmentPaperToTakeThePlacenta/Form.vue'),
        meta: {
          enName: 'Commitment paper to take the placenta out of hospital byeon the regulations of placenta management of the hospital',
          name: 'Bản cam kết xin lấy bánh rau không theo quy định quản lý của Bệnh viện',
          localKey: 'Bản cam kết xin lấy bánh rau không theo quy định quản lý của Bệnh viện',
          roles: [4],
          requireSettingDepartment: true,
          allowView: true
        },
        children: [
          {
            path: '/IPD/CommitmentPaperToTakeThePlacenta/:Id/:Item',
            name: 'CommitmentPaperToTakeThePlacentaItem',
            component: () => import('@/pages/CommitmentPaperToTakeThePlacenta/Item.vue'),
            meta: {
              enName: 'Commitment paper to take the placenta out of hospital byeon the regulations of placenta management of the hospital',
              name: 'Bản cam kết xin lấy bánh rau không theo quy định quản lý của Bệnh viện',
              localKey: 'Bản cam kết xin lấy bánh rau không theo quy định quản lý của Bệnh viện',
              roles: [4],
              requireSettingDepartment: true
            }
          }
        ]
      },
      {
        path: '/ipd/CartridgeKaolinACT/:Id',
        name: 'IPDCartridgeKaolinACT',
        component: () => import('@/pages/IPD/CartridgeKaolinACT/Index.vue'),
        meta: {
          enName: 'Cartridge Kaolin ACT',
          name: 'XNTC - Đông máu ACT (Cartridge Kaolin ACT)',
          localKey: 'XNTC - Đông máu ACT (Cartridge Kaolin ACT)',
          roles: [4],
          requireSettingDepartment: true
        },
        children: [
          {
            path: '/ipd/CartridgeKaolinACT/:Id/:Item',
            name: 'IPDCartridgeKaolinACTItem',
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
        path: '/ipd/ACTForms/:Id',
        name: 'IPDACTForms',
        component: () => import('@/pages/IPD/ACT/Index.vue'),
        meta: {
          name: 'ACTForms',
          localKey: 'XNTC - ACT Cartridge Celite',
          roles: [4],
          requireSettingDepartment: true
        },
        children: [
          {
            path: '/ipd/ACTForms/:Id/:Item',
            name: 'IPDACTFormsItem',
            component: () => import('@/pages/IPD/ACT/Item.vue'),
            meta: {
              name: 'ACTForms',
              localKey: 'XNTC - ACT Cartridge Celite',
              roles: [4],
              requireSettingDepartment: true
            }
          }
        ]
      },
      {
        path: '/ipd/A02_053_OR_201022_V/:Id',
        name: 'IPDA02_053_OR_201022_V',
        component: () => import('@/pages/FormLienKhoa/A02_053_OR_201022_V/Index.vue'),
        meta: {
          name: 'Bảng kiểm an toàn phẫu thuật, thủ thuật trong phòng mổ và phòng can thiệp tim mạch',
          localKey: 'Bảng kiểm an toàn phẫu thuật, thủ thuật trong phòng mổ và phòng can thiệp tim mạch',
          roles: [4],
          requireSettingDepartment: true
        },
        children: [
          {
            path: '/ipd/A02_053_OR_201022_V/:Id/:ItemId',
            name: 'IPDA02_053_OR_201022_VITEM',
            component: () => import('@/pages/FormLienKhoa/A02_053_OR_201022_V/Form.vue'),
            meta: {
              name: 'Bảng kiểm an toàn phẫu thuật, thủ thuật trong phòng mổ và phòng can thiệp tim mạch',
              localKey: 'Bảng kiểm an toàn phẫu thuật, thủ thuật trong phòng mổ và phòng can thiệp tim mạch',
              roles: [4],
              requireSettingDepartment: true
            },
            children: [
              {
                path: '/ipd/A02_053_OR_201022_V/:Id/:ItemId/01',
                name: 'IPDA02_053_OR_201022_VITEM_01',
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
                    path: '/ipd/A02_053_OR_201022_V/:Id/:ItemId/01/001',
                    name: 'IPDA02_053_OR_201022_VITEM_01_001',
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
                    path: '/ipd/A02_053_OR_201022_V/:Id/:ItemId/01/002',
                    name: 'IPDA02_053_OR_201022_VITEM_01_002',
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
                    path: '/ipd/A02_053_OR_201022_V/:Id/:ItemId/01/003',
                    name: 'IPDA02_053_OR_201022_VITEM_01_003',
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
                    path: '/ipd/A02_053_OR_201022_V/:Id/:ItemId/01/004',
                    name: 'IPDA02_053_OR_201022_VITEM_01_004',
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
                path: '/ipd/A02_053_OR_201022_V/:Id/:ItemId/02',
                name: 'IPDA02_053_OR_201022_VITEM_02',
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
        path: '/ipd/A02_006_221221_V/:Id',
        name: 'IPDA02_006_221221_V',
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
