const IndexPage = () => import('@/pages/MedicationAdministrationRecord/Index.vue')
const SearchPage = () => import('@/pages/MedicationAdministrationRecord/Search.vue')
const ResultPage = () => import('@/pages/MedicationAdministrationRecord/Result.vue')
export default [
  {
    path: 'MedicationAdministrationRecord',
    name: 'medicationAdministrationRecord-page',
    component: IndexPage,
    meta: {
      roles: [4],
      auth: true
    },
    children: [
      {
        path: '/MedicationAdministrationRecord/',
        name: 'medicationAdministrationRecord-Search',
        component: SearchPage,
        meta: {
          name: 'Y lệnh nội trú',
          localKey: 'Y lệnh nội trú',
          roles: [4]
        },
        query: {}
      },
      {
        path: '/MedicationAdministrationRecord/:PID',
        name: 'medicationAdministrationRecord-result',
        component: ResultPage,
        meta: {
          name: 'Y lệnh nội trú',
          localKey: 'Y lệnh nội trú',
          roles: [4]
        }
      }
    ]
  }
]
