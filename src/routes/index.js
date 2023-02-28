
/* ============
 * Routes File
 * ============
 *
 * The routes and redirects are defined in this file.
 */
import edRouter from './ed.js'
import opdRouter from './opd.js'
import ipdRouter from './ipd'
import eocRouter from './eoc'
import recRouter from './medicalrecord'
import translation from './translation'
import prescription from './prescription'
import DoctorPlaceDiagnosticsOrder from './DoctorPlaceDiagnosticsOrder'
import MedicationAdministrationRecord from './MedicationAdministrationRecord'
import AdminPage from './admin'

export default [
  ...eocRouter,
  ...edRouter,
  ...opdRouter,
  ...ipdRouter,
  ...recRouter,
  ...translation,
  ...prescription,
  ...DoctorPlaceDiagnosticsOrder,
  ...MedicationAdministrationRecord,
  ...AdminPage,
  // {
  //   path: '/IAM/:Id',
  //   name: 'IAM',
  //   component: () => import('@/pages/IAM.vue'),
  //   meta: {
  //     auth: true,
  //     name: 'Đánh giá ban đầu',
  //     localKey: 'general.danh_gia_ban_dau',
  //     roles: [4]
  //   }
  // },
  {
    path: '/',
    name: 'home',
    component: () => import('@/pages/Index.vue'),
    meta: {
      auth: true,
      name: 'Home',
      roles: [4]
    }
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('@/pages/Dashboard.vue'),
    meta: {
      auth: true,
      name: 'Home',
      roles: [4]
    }
  },
  {
    path: '/login',
    name: 'login.index',
    component: () => import('@/pages/Login.vue'),
    meta: {
      guest: true,
      name: 'Đăng nhập'
    }
  },
  {
    path: '/error-version',
    name: 'ErrorVersion',
    component: () => import('@/pages/ErrorVersion.vue'),
    meta: {
      auth: true,
      name: 'Error-version'
    }
  },
  {
    path: '/no-staff',
    name: 'no.staff',
    component: () => import('@/pages/NoStaff.vue'),
    meta: {
      guest: true,
      name: 'Chưa phân quyền'
    }
  },
  {
    path: '/print',
    name: 'print',
    component: () => import('@/pages/Print.vue'),
    meta: {
      guest: true,
      name: 'Print'
    }
  },
  {
    path: '*',
    name: '404',
    component: () => import('@/pages/404.vue'),
    meta: {
      guest: true,
      name: '404 Error Page'
    }
  },
  {
    path: '/403',
    name: 'page403',
    component: () => import('@/pages/403.vue'),
    meta: {
      guest: true,
      name: '403 Error Page'
    }
  },
  {
    path: '/tivi',
    name: 'pagetivi',
    component: () => import('@/pages/ED/Qms/Tivi.vue'),
    meta: {
      guest: true,
      name: '403 Error Page'
    }
  },
  {
    path: '/LabAndXrayResults/:PID',
    name: 'LabAndXrayResultsByPid',
    component: () => import('@/pages/LabAndXrayResults/Index.vue'),
    meta: {
      guest: true,
      name: 'Kết quả xét nghiệm và chẩn đoán hình ảnh'
    }
  },
  {
    path: '/LabAndXrayResults/',
    name: 'LabAndXrayResults',
    component: () => import('@/pages/LabAndXrayResults/Index.vue'),
    meta: {
      guest: true,
      name: 'Kết quả xét nghiệm và chẩn đoán hình ảnh'
    }
  },
  {
    path: '/masterdata',
    name: 'masterdata',
    component: () => import('@/pages/Masterdata.vue'),
    meta: {
      guest: true,
      name: '403 Error Page'
    }
  },
  {
    path: '/ExamForm',
    name: 'ExamForm',
    component: () => import('@/pages/ExamForm.vue'),
    meta: {
      guest: true,
      name: '403 Error Page'
    }
  }
]
