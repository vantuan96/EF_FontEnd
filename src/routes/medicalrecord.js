export default [
  {
    path: '/record/',
    name: 'Records-page',
    component: () => import('@/pages/MedicalRecords/Index.vue'),
    meta: {
      roles: [4],
      auth: true
    },
    children: [
      {
        path: '/record/',
        name: 'Records',
        component: () => import('@/pages/MedicalRecords/MedicalRecords.vue'),
        meta: {
          name: 'Lịch sử NB',
          localKey: 'Lịch sử NB',
          roles: [4]
        }
      },
      {
        path: '/recordV2/:PID/:Id/:TYPE/:TypeVisit',
        name: 'RecordV2',
        component: () => import('@/pages/MedicalRecords/Detail.vue'),
        meta: {
          name: 'Lịch sử NB',
          localKey: 'Lịch sử NB',
          roles: [4]
        }
      },
      {
        path: '/record/menu/:Id',
        name: 'PatientRecordsMenu',
        component: () => import('@/pages/MedicalRecords/RecoreMenu.vue'),
        meta: {
          name: 'Thông tin người bệnh',
          localKey: 'Thông tin người bệnh',
          roles: [4]
        }
      },
      {
        path: '/record/OPD/:Id',
        name: 'OPDRECORD',
        component: () => import('@/pages/OPD/View.vue'),
        meta: {
          name: 'Thông tin người bệnh',
          localKey: 'Thông tin người bệnh',
          roles: [4],
          reonly: true,
          allowView: true,
          VisitTypeGroupCode: 'OPD'
        }
      },
      {
        path: '/record/OPD/:Id/:isPreAnesthesia',
        name: 'OPDRECORDCheck',
        component: () => import('@/pages/OPD/View.vue'),
        meta: {
          name: 'Thông tin người bệnh',
          localKey: 'Thông tin người bệnh',
          roles: [4],
          reonly: true,
          allowView: true,
          VisitTypeGroupCode: 'OPD'
        }
      },
      {
        path: '/record/EOC/:Id',
        name: 'EOCRECORD',
        component: () => import('@/pages/EOC/View.vue'),
        meta: {
          name: 'Thông tin người bệnh',
          localKey: 'Thông tin người bệnh',
          roles: [4],
          reonly: true,
          allowView: true,
          LocalVisitType: 'EOC',
          VisitTypeGroupCode: 'OPD'
        }
      },
      {
        path: '/record/ED/:Id',
        name: 'EDRECORD',
        component: () => import('@/pages/ED/View.vue'),
        meta: {
          name: 'Thông tin người bệnh',
          localKey: 'Thông tin người bệnh',
          roles: [4],
          reonly: true,
          allowView: true,
          VisitTypeGroupCode: 'ED'
        }
      },
      {
        path: '/ipd/viewdetail/:Id',
        name: 'IPDVIEWDETAIL',
        component: () => import('@/pages/IPD/Detail/Index.vue'),
        meta: {
          name: 'Thông tin khách hàng',
          localKey: 'general.thong_tin_khach_hang',
          roles: [4],
          requireSettingDepartment: true
        }
      },
      // ListRecordsMenu
      {
        path: '/ListRecord/:Id',
        name: 'ListRecordsMenu',
        component: () => import('@/pages/MedicalRecords/RecordMenu2.vue'),
        meta: {
          name: 'Thông tin người bệnh',
          localKey: 'Thông tin người bệnh',
          roles: [4]
        },
        children: [
          {
            path: '/ListRecord/HSBA/:Id',
            name: 'ListRecordsMenuHSBA',
            component: () => import('@/pages/MedicalRecords/PatientRecords.vue'),
            meta: {
              name: 'Thông tin người bệnh',
              localKey: 'Thông tin người bệnh',
              roles: [4]
            }
          },
          {
            path: '/ListRecord/LSCD/:Id',
            name: 'ListRecordsMenuLSCD',
            component: () => import('@/pages/MedicalRecords/DiagnosticReporting.vue'),
            meta: {
              name: 'Thông tin người bệnh',
              localKey: 'Thông tin người bệnh',
              roles: [4]
            },
            children: [
              {
                path: '/ListRecord/LSCD/CLS/:Id',
                name: 'ListRecordsMenuCLS',
                component: () => import('@/pages/MedicalRecords/CLS.vue'),
                meta: {
                  name: 'Thông tin người bệnh',
                  localKey: 'Thông tin người bệnh',
                  roles: [4]
                }
              },
              {
                path: '/ListRecord/LSCD/KQXN/:Id',
                name: 'ListRecordsMenuLaboratory',
                component: () => import('@/pages/MedicalRecords/Laboratory/Index.vue'),
                meta: {
                  name: 'Thông tin người bệnh',
                  localKey: 'Thông tin người bệnh',
                  roles: [4]
                }
              },
              {
                path: '/ListRecord/LSCD/CDHA/:Id',
                name: 'ListRecordsMenuRadiology',
                component: () => import('@/pages/MedicalRecords/Radiology/Index.vue'),
                meta: {
                  name: 'Chẩn đoán hình ảnh',
                  localKey: 'Chẩn đoán hình ảnh',
                  roles: [4]
                }
              },
              {
                path: '/ListRecord/LSCD/AlliedService/:Id',
                name: 'ListRecordsMenuAlliedService',
                component: () => import('@/pages/MedicalRecords/AlliedService.vue'),
                meta: {
                  name: 'Thông tin người bệnh',
                  localKey: 'Thông tin người bệnh',
                  roles: [4]
                }
              }
            ]
          },
          {
            path: '/ListRecord/LSDT/:Id',
            name: 'ListRecordsMenuLSDT',
            component: () => import('@/pages/MedicalRecords/MedicationHistory.vue'),
            meta: {
              name: 'Thông tin người bệnh',
              localKey: 'Thông tin người bệnh',
              roles: [4]
            }
          }
        ]
      },
      {
        path: '/LichSuKhamTaiVinmec/:Id/:Type/:VisitCode',
        name: 'LichSuKhamTaiVinmec',
        component: () => import('@/pages/Detail/LichSuKhamTaiVinmec.vue'),
        meta: {
          name: 'Lịch sử khám bệnh',
          localKey: 'Lịch sử khám bệnh',
          roles: [4]
        },
        children: [
          {
            path: '/LichSuKhamTaiVinmec/:Id/:Type/:VisitCode/IPDCTBA',
            name: 'IPDLichSuKhamTaiVinmecCTBA',
            component: () => import('@/pages/IPD/Detail/Index.vue'),
            meta: {
              name: 'Lịch sử khám bệnh',
              localKey: 'Lịch sử khám bệnh',
              roles: [4]
            }
          },
          {
            path: '/LichSuKhamTaiVinmec/:Id/:Type/:VisitCode/EDCTBA',
            name: 'EDLichSuKhamTaiVinmecCTBA',
            component: () => import('@/pages/ED/View.vue'),
            meta: {
              name: 'Lịch sử khám bệnh',
              localKey: 'Lịch sử khám bệnh',
              roles: [4],
              requireSettingDepartment: true,
              allowView: true
            }
          },
          {
            path: '/LichSuKhamTaiVinmec/:Id/:Type/:VisitCode/OPDCTBA',
            name: 'OPDLichSuKhamTaiVinmecCTBA',
            component: () => import('@/pages/OPD/View.vue'),
            meta: {
              name: 'Lịch sử khám bệnh',
              localKey: 'Lịch sử khám bệnh',
              roles: [4],
              requireSettingDepartment: true
            }
          },
          {
            path: '/LichSuKhamTaiVinmec/:Id/:Type/:VisitCode/EOCCTBA',
            name: 'EOCLichSuKhamTaiVinmecCTBA',
            component: () => import('@/pages/EOC/View.vue'),
            meta: {
              name: 'Lịch sử khám bệnh',
              localKey: 'Lịch sử khám bệnh',
              roles: [4],
              requireSettingDepartment: true
            }
          },
          {
            path: '/LichSuKhamTaiVinmec/:Id/:Type/:VisitCode/KQXN',
            name: 'LichSuKhamTaiVinmecKQXN',
            component: () => import('@/pages/MedicalRecords/Laboratory/Index.vue'),
            meta: {
              name: 'Lịch sử khám bệnh',
              localKey: 'Lịch sử khám bệnh',
              roles: [4]
            }
          },
          {
            path: '/LichSuKhamTaiVinmec/:Id/:Type/:VisitCode/CDHA',
            name: 'LichSuKhamTaiVinmecCDHA',
            component: () => import('@/pages/MedicalRecords/Radiology/Index.vue'),
            meta: {
              name: 'Lịch sử khám bệnh',
              localKey: 'Lịch sử khám bệnh',
              roles: [4]
            }
          },
          {
            path: '/LichSuKhamTaiVinmec/:Id/:Type/:VisitCode/CLS',
            name: 'LichSuKhamTaiVinmecCLS',
            component: () => import('@/pages/MedicalRecords/CLS.vue'),
            meta: {
              name: 'Lịch sử khám bệnh',
              localKey: 'Lịch sử khám bệnh',
              roles: [4]
            }
          },
          {
            path: '/LichSuKhamTaiVinmec/:Id/:Type/:VisitCode/DVC',
            name: 'LichSuKhamTaiVinmecDVC',
            component: () => import('@/pages/MedicalRecords/AlliedService.vue'),
            meta: {
              name: 'Lịch sử khám bệnh',
              localKey: 'Lịch sử khám bệnh',
              roles: [4]
            }
          },
          {
            path: '/LichSuKhamTaiVinmec/:Id/:Type/:VisitCode/DST',
            name: 'LichSuKhamTaiVinmecDST',
            component: () => import('@/pages/MedicalRecords/MedicationHistory.vue'),
            meta: {
              name: 'Lịch sử khám bệnh',
              localKey: 'Lịch sử khám bệnh',
              roles: [4]
            }
          }
        ]
      }
    ]
  }
]
