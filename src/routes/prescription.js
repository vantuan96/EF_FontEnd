const IndexPage = () => import('@/pages/Prescription/Index.vue')
const SearchPage = () => import('@/pages/Prescription/Search.vue')
const ResultPage = () => import('@/pages/Prescription/Result.vue')
const DetailPage = () => import('@/pages/Prescription/Detail.vue')
export default [
  {
    path: '/prescription/',
    name: 'prescription-page',
    component: IndexPage,
    meta: {
      roles: [4],
      auth: true
    },
    children: [
      {
        path: '/prescription/',
        name: 'prescription-Search',
        component: SearchPage,
        meta: {
          name: 'Đơn thuốc',
          localKey: 'Đơn thuốc',
          roles: [4]
        }
      },
      {
        path: '/prescription/:PID',
        name: 'prescription-result',
        component: ResultPage,
        meta: {
          name: 'Đơn thuốc',
          localKey: 'Đơn thuốc',
          roles: [4]
        }
      },
      {
        path: '/prescription/:PID/:PrescriptionId/:VisitType',
        name: 'prescription-detail',
        component: DetailPage,
        meta: {
          name: 'Đơn thuốc',
          localKey: 'Đơn thuốc',
          roles: [4]
        }
      }
    ]
  }
]
