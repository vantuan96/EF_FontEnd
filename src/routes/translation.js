export default [
  {
    path: '/TKCM/',
    name: 'Translations',
    component: () => import('@/pages/Translation/Index.vue'),
    VisitTypeGroupCode: 'TKCM',
    meta: {
      roles: [4],
      auth: true
    },
    children: [
      {
        path: '/TKCM/',
        name: 'Translations-list',
        component: () => import('@/pages/Translation/List.vue'),
        meta: {
          name: 'Danh sách yêu cầu dịch hồ sơ',
          localKey: 'Danh sách yêu cầu dịch hồ sơ',
          roles: [4]
        }
      },
      {
        path: '/TKCM/:Id',
        name: 'TKCM',
        component: () => import('@/pages/Translation/Item.vue'),
        meta: {
          name: 'Dịch hồ sơ',
          localKey: 'Dịch hồ sơ',
          roles: [4]
        }
      }
    ]
  }
]
