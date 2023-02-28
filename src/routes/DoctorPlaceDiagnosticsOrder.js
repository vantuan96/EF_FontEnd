const IndexPage = () => import('@/pages/DoctorPlaceDiagnosticsOrder/Index.vue')
const SearchPage = () => import('@/pages/DoctorPlaceDiagnosticsOrder/Search.vue')
const FormPage = () => import('@/pages/DoctorPlaceDiagnosticsOrder/PlaceDiagnostics/Index.vue')
const History = () => import('@/pages/DoctorPlaceDiagnosticsOrder/PlaceDiagnostics/History.vue')
const OrderSets = () => import('@/pages/DoctorPlaceDiagnosticsOrder/OrderSets/Index.vue')
const ViHC = () => import('@/pages/DoctorPlaceDiagnosticsOrder/PlaceDiagnostics/ViHC.vue')

const DiagnosticReportingIndexPage = () => import('@/pages/DiagnosticReporting/Index.vue')
const List = () => import('@/pages/DiagnosticReporting/List.vue')
const Pending = () => import('@/pages/DiagnosticReporting/Pending.vue')

export default [
  {
    path: '/DiagnosticReporting/',
    name: 'DiagnosticReporting-page',
    component: DiagnosticReportingIndexPage,
    meta: {
      roles: [4],
      auth: true
    },
    children: [
      {
        path: '/DiagnosticReporting/',
        name: 'DiagnosticReporting-Pending',
        component: Pending,
        meta: {
          name: 'Trả kết quả CLS',
          localKey: 'Trả kết quả CLS',
          roles: [4]
        }
      },
      {
        path: '/DiagnosticReporting/List',
        name: 'DiagnosticReporting-List',
        component: List,
        meta: {
          name: 'Trả kết quả CLS',
          localKey: 'Trả kết quả CLS',
          roles: [4]
        }
      }
    ]
  },
  {
    path: '/DoctorPlaceDiagnosticsOrder/',
    name: 'DoctorPlaceDiagnosticsOrder-page',
    component: IndexPage,
    meta: {
      roles: [4],
      auth: true
    },
    children: [
      {
        path: '/DoctorPlaceDiagnosticsOrder/',
        name: 'DoctorPlaceDiagnosticsOrder-Search',
        component: SearchPage,
        meta: {
          name: 'Chỉ định dịch vụ',
          localKey: 'Chỉ định dịch vụ',
          roles: [4]
        }
      },
      {
        path: '/DoctorPlaceDiagnosticsOrder/:PID/:VisitCode',
        name: 'DoctorPlaceDiagnosticsOrder-Form',
        component: FormPage,
        meta: {
          name: 'Chỉ định dịch vụ',
          localKey: 'Chỉ định dịch vụ',
          roles: [4]
        }
      },
      {
        path: '/DoctorPlaceDiagnosticsOrderHistory/:PID/:VisitCode',
        name: 'DoctorPlaceDiagnosticsOrder-History',
        component: History,
        meta: {
          name: 'Chỉ định dịch vụ',
          localKey: 'Chỉ định dịch vụ',
          roles: [4]
        }
      },
      {
        path: '/DoctorPlaceDiagnostics/OrderSets',
        name: 'DoctorPlaceDiagnostics-OrderSets',
        component: OrderSets,
        meta: {
          name: 'Danh sách gói cá nhân của bạn',
          localKey: 'Chỉ định dịch vụ',
          roles: [4]
        }
      },
      {
        path: '/DoctorPlaceDiagnosticsOrderViHC/:PID',
        name: 'DoctorPlaceDiagnosticsOrder-ViHC',
        component: ViHC,
        meta: {
          name: 'ViHC',
          localKey: 'ViHC',
          roles: [4]
        }
      }
    ]
  }
]
