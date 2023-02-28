const IndexPage = () => import('@/pages/Admin/Index.vue')
const SearchPage = () => import('@/pages/Admin/Search.vue')
const ResultPage = () => import('@/pages/Admin/Result.vue')
export default [
  {
    path: '/admin/',
    name: 'admin-page',
    component: IndexPage,
    meta: {
      roles: [4],
      auth: true
    },
    children: [
      {
        path: '/admin/',
        name: 'admin-Search',
        component: SearchPage,
        meta: {
          name: 'Tìm kiếm KH',
          localKey: 'Tìm kiếm KH',
          roles: [4]
        }
      },
      {
        path: '/admin/:PID',
        name: 'admin-result',
        component: ResultPage,
        meta: {
          name: 'Chi tiết KH',
          localKey: 'Chi tiết KH',
          roles: [4]
        }
      }
    ]
  }
]
