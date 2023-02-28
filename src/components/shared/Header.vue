<template>
  <!-- ádasdadad -->
  <header class="main-header">
    <nav class="navbar navbar-static-top">
      <div class="container">
        <div class="content">
          <div class="navbar-header">
            <a @click="go2Home" class="navbar-brand-logo">
              <img src="/static/logo.png?v=188" />
            </a>
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar-collapse">
              <i class="fa fa-bars"></i>
            </button>
          </div>
          <!-- /.navbar-collapse -->
          <!-- Navbar Right Menu -->
          <div class="navbar-custom-menu flex-box" v-if="store.state.account" style="margin-top: 20px;">
            <div class="btn-group btn-groxup-none-style" v-if="hasRoles(['VIEW001', 'VIEW002', 'VIEW003', 'VIEW004', 'READSROP'])">
              <button type="button" class="btn btn-warning dropdown-toggle" style="padding: 5px 10px" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <span class="glyphicon glyphicon-option-vertical"></span> Menu
              </button>
              <div class="dropdown-menu v-dropdown-menu v-context-menu ed-menu">
                <div class="v-selectmenu">
                  <ul class="sm-results" id="top-header-menu">
                    <li class="p-5" v-permissions="'VIEW001'" id="VIEW001ROLE">
                      <a :href="url('Records')">
                        <span class="glyphicon glyphicon-folder-open"></span>  {{__t('Kho HSBA')}}
                      </a>
                    </li>
                    <li class="p-5" v-permissions="'VIEW002'" id="VIEW002ROLE">
                      <a :href="url('DoctorPlaceDiagnosticsOrder')">
                        <i class="glyphicon glyphicon-user"></i>  {{__t('Chỉ định dịch vụ')}}
                      </a>
                    </li>
                    <li class="p-5" v-permissions="'VIEW003'" id="VIEW003ROLE">
                      <a :href="url('Prescription')">
                        <span class="glyphicon glyphicon-th-list"></span>  {{__t('Đơn thuốc')}}
                      </a>
                    </li>
                    <li class="p-5" v-permissions="'VIEW004'" id="VIEW004ROLE">
                      <a :href="url('MedicationAdministrationRecord')">
                        <span class="glyphicon glyphicon-list-alt"></span>  {{__t('Y lệnh nội trú')}}
                      </a>
                    </li>
                    <li class="p-5" v-permissions="'READSROP'" id="READSROPROLE">
                      <a :href="url('LabAndXrayResults')">
                        <span class="glyphicon glyphicon-list-alt"></span>  {{__t('Kết quả XN & CĐHA & CLS')}}
                      </a>
                    </li>
                    <li class="p-5" id="DR000001ROLE">
                      <a :href="url('DiagnosticReporting')">
                        <span class="glyphicon glyphicon-list-alt"></span>  {{__t('Trả kết quả cận lâm sàng')}}
                      </a>
                    </li>
                    <li class="p-5" v-if="store.state.account.Specialty && store.state.account.Specialty.VisitTypeGroupCode === 'ED'" id="TVROLE">
                      <router-link :to="{name: 'EDQMSPatientManagement'}">
                        <i class="fa fa-desktop" aria-hidden="true"></i>  TV
                      </router-link>
                    </li>
                    <li class="p-5" v-permissions="'SUPERADMINROLE'">
                      <router-link :to="{name: 'admin-Search'}">
                        <i class="fa fa-desktop" aria-hidden="true"></i>  ADMIN
                      </router-link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <ul class="nav navbar-nav">
              <li class="nav-item" v-if="store.state.account.Position">
                <a href="/#/dashboard">
                  <i :class="{
                    'v-icon-doctor': store.state.account.Position.includes('Doctor'),
                    'v-icon-nurse': store.state.account.Position.includes('Nurse'),
                    'v-icon-medical-secretary': store.state.account.Position.includes('Medical Secretary'),
                    'v-icon-administrator': store.state.account.Position.includes('Administrator')
                    }" class="v-icon xs" aria-hidden="true"></i>
                  {{store.state.account.Fullname || store.state.account.Username}}
                </a>
              </li>
              <li class="nav-item dropdown" id="notification-elm" v-if="Notifications">
                <a class="nav-link" data-toggle="dropdown" href="#" aria-expanded="true">
                  <span class="badge badge-noti navbar-badge" :class="{'animation-s': NotificationsUnread}">{{NotificationsUnread}}</span>
                </a>
                <div class="dropdown-menu dropdown-menu-lg dropdown-menu-right bpx">
                  <span class="dropdown-item dropdown-header"><span class="pull-left">{{NotificationsUnread}} {{__t('Thông báo chưa đọc')}}</span>  <i  @click="closeNotification()" class="fa fa-times pull-right" aria-hidden="true"></i></span>
                  <ul class="notifications-list">
                    <li @click="clickNotification(item)" :class="{'active': !item.Seen}" :data="item" :key="index" v-for="(item ,index) in Notifications">
                      <a>
                        <template v-if="item.VisitTypeGroupCode === 'INFO'">
                        <i class="fa fa-exclamation-triangle" aria-hidden="true"></i>
                        <span>{{__t('THÔNG BÁO TỪ HỆ THỐNG')}}</span>
                        </template>
                        <template v-else >
                        <i class="fa fa-bell" aria-hidden="true"></i>
                        <span v-html="__labelMsg(item)"></span>
                        </template>
                      </a>
                      <p><i class="fa fa-clock-o" aria-hidden="true"></i> {{item.CreatedAt}}</p>
                    </li>
                  </ul>
                </div>
              </li>
              <li class="nav-item">
                <a href="/#/dashboard">
                  <!-- <i class="fa fa-map-marker" aria-hidden="true"></i> {{__label(store.state.account.SpecialtyName)}} -->
                  <i class="fa fa-map-marker" aria-hidden="true"></i> {{getSpecialtyName()}}
                </a>
              </li>
              <li class="nav-item dropdown language-menu">
                <a class="nav-link" data-toggle="dropdown" href="#">
                  <i class="v-flag-icon flag-icon-vi" v-if="this.locale === 'vi'"></i>
                  <i class="v-flag-icon flag-icon-en" v-else></i>
                </a>
                <ul class="dropdown-menu dropdown-menu-right">
                  <li class="dropdown-item" @click="changeLocale('vi')">
                    <i class="v-flag-icon flag-icon-vi"></i> Tiếng Việt
                  </li>
                  <li class="dropdown-item" @click="changeLocale('en')">
                    <i class="v-flag-icon flag-icon-en"></i> English
                  </li>
                </ul>
              </li>
              <li class="nav-item">
                <a @click="logout()" href="#" class="font20">
                  <i class="fa fa-sign-out">
                  </i>
                </a>
              </li>
              <li class='showApp' id=''>

               </li>
            </ul>
          </div>
        </div>
        <!-- /.navbar-custom-menu -->
      </div>
      <!-- /.container-fluid -->
    </nav>
    <modal name="informationMessage" transition="pop-out" id="informationMessage" height="auto" :scrollable="false" :width="modalWidth" :clickToClose="false">
      <div class="box v-model-content-popup" id="content-wrap-popup">
        <div class="box-content">
          <h3 class="box-title">Thông báo</h3>
          <div style="padding: 10px 20px">
            <div v-html="informationMessage">...</div>
            <p style="text-align: right;"><button @click="NotificationSeen(viewing)" class="btn btn-sm btn-info">Đã đọc</button></p>
          </div>
        </div>
      </div>
    </modal>
  </header>
</template>

<script>
import store from '@/store'
import VASlideItem from '../VASlideItem'
import { i18n } from '@/plugins/vue-i18n'
import Notification from '@/services/Notification'
import TestService from '@/services/TestService'
import $ from 'jquery'
import storage from '@/lib/storage'
import utils from '@/utils'
const MODAL_WIDTH = 970
const INTERVALNOTITIME = 5 * 60 * 1000
export default {
  name: 'va-header',
  props: {
    slideMenuItems: {
      type: Array
    }
  },
  data () {
    return {
      drop_down: '',
      store: store,
      locale: 'vi',
      Notifications: null,
      VisitTypeGroupCode: null,
      notiInterval: null,
      informationMessage: '',
      viewing: {}
    }
  },
  created () {
    this.getShowMenuApp()
    this.modalWidth = window.innerWidth < MODAL_WIDTH
      ? '90%'
      : MODAL_WIDTH
    this.locale = localStorage.getItem('locale') || 'vi'
    setTimeout(() => {
      this.getNotification(true)
    }, 1 * 1000)
    if (!window.location.hash.includes('login')) {
      this.notiInterval = setTimeout(() => {
        this.getNotification()
      }, 60 * 1000)
    }
    this.VisitTypeGroupCode = this.$router.currentRoute.matched.find(m => m.meta.VisitTypeGroupCode)
  },
  mounted () {
  },
  computed: {
    NotificationsUnread: function () {
      return this.Notifications.filter(e => !e.Seen).length
    }
  },
  components: {
    'va-slide-item': VASlideItem
  },
  methods: {
    getShowMenuApp () {
      new TestService().all().then(response => {
        $('.showApp').html(response)
        $('.img-circle').initial({ charCount: 1, seed: 100, width: 50, height: 50, fontSize: 30 })
      })
    },
    getSpecialtyName () {
      if (this.locale === 'vi') {
        return `${this.$store.state.account.Site.Name} (${this.$store.state.account.Specialty.VisitTypeGroupCode} - ${this.$store.state.account.Specialty.ViName})`
      } else {
        return `${this.$store.state.account.Site.Name} (${this.$store.state.account.Specialty.VisitTypeGroupCode} - ${this.$store.state.account.Specialty.EnName.split(') - ').pop()})`
      }
    },
    url (link) {
      var visitCode = this.CurrentPatientObj.VisitCode
      var pid = this.CurrentPatientObj.PID
      var visitID = this.CurrentPatientObj.IPDId || this.CurrentPatientObj.EDId || this.CurrentPatientObj.OPDId
      var pr = {}
      if (visitCode) {
        pr.VisitCode = visitCode
      }
      if (visitID) {
        pr.VisitId = visitID
      }
      if (pid) {
        pr.PID = pid
      }
      pr.VisitType = this.CurrentPatientObj.VisitCode
      if (link === 'Records') {
        return (this.CurrentPatientObj.PID ? `/#/record?PIDNB=${this.CurrentPatientObj.PID}` : `/#/record`)
      }
      if (link === 'Prescription') {
        return (this.CurrentPatientObj.PID ? `/#/Prescription/${this.CurrentPatientObj.PID}` : `/#/Prescription/`) + this.getParameterString(pr)
      }
      if (link === 'DoctorPlaceDiagnosticsOrder') {
        return ((this.CurrentPatientObj.PID && this.CurrentPatientObj.VisitCode) ? `/#/DoctorPlaceDiagnosticsOrder/` : `/#/DoctorPlaceDiagnosticsOrder/`) + this.getParameterString(pr)
      }
      if (link === 'MedicationAdministrationRecord') {
        return (this.CurrentPatientObj.PID ? `/#/MedicationAdministrationRecord/${this.CurrentPatientObj.PID}` : `/#/MedicationAdministrationRecord/`) + this.getParameterString(pr)
      }
      if (link === 'LabAndXrayResults') {
        return (this.CurrentPatientObj.PID ? `/#/LabAndXrayResults/${this.CurrentPatientObj.PID}` : `/#/LabAndXrayResults`)
      }
      if (link === 'DiagnosticReporting') {
        return (this.CurrentPatientObj.PID ? `/#/DiagnosticReporting?PIDNB=${this.CurrentPatientObj.PID}` : `/#/DiagnosticReporting`)
      }
    },
    closeNotification () {
      $('body').click()
    },
    clickNotification (item) {
      var storeAccount = this.store.state.account
      if (item.VisitTypeGroupCode === 'INFO') {
        this.noti(item)
        return false
      }
      // console.log('SpecialtyId: ' + item.SpecialtyId)
      // console.log('storeAccount.SpecialtyId: ' + storeAccount.SpecialtyId)
      // console.log('item.VisitTypeGroupCode: ' + item.VisitTypeGroupCode)
      // console.log('storeAccount.Specialty.VisitTypeGroupCode: ' + storeAccount.Specialty.VisitTypeGroupCode)

      // item.SpecialtyId !== storeAccount.SpecialtyId
      if (item.VisitTypeGroupCode !== storeAccount.Specialty.VisitTypeGroupCode) {
        this.alert('Thông báo', 'Vui lòng chuyển đổi khoa phòng làm việc để xem được chi tiết thông báo')
      } else {
        this.NotificationSeen(item)
        this.GoToPage(item)
      }
    },
    noti (item) {
      this.viewing = item
      this.informationMessage = item.ViMessage
      this.$modal.show('informationMessage')
    },
    GoToPage (item) {
      var changeFormCode = {
        opdiafstchange: 'InitialAssessment', // Thông thường InitialAssessment
        opdiafogchange: 'InitialAssessment/long', // dài hạn InitialAssessment/long
        opdfrschange: 'InitialAssessment/FallRiskScreening', // ngã InitialAssessment/FallRiskScreening
        edetrchange: 'etr', // InitialAssessment/Telehealth
        opdiafthchange: 'InitialAssessment/Telehealth'
      }
      var convertUrl = {
        ETR: 'EmergencyTriageRecord',
        etr: 'EmergencyTriageRecord'
      }
      if (item.VisitTypeGroupCode === 'TKCM') {
        console.log(item.ViMessage)
        if (item.ViMessage.includes('yêu cầu dịch')) {
          console.log('test')
          window.location.href = '/#/TKCM' + '/' + item.Form
        } else {
          window.location.href = '/#/' + item.Form + '/' + item.VisitId
        }
      } else if (item.VisitTypeGroupCode === 'INFO') {
        this.noti(item)
      } else if (changeFormCode[utils.cleanSearchKey(item.Form)]) {
        window.location.href = '/#/' + item.VisitTypeGroupCode + '/' + changeFormCode[utils.cleanSearchKey(item.Form)] + '/' + item.VisitId + '?showfirstlog=tab3'
      } else {
        if (this.checkString(item.Form, 'Order')) {
          window.location.href = '/#/' + item.VisitTypeGroupCode + '/ETR/' + item.VisitId + '?tab=tab3'
        } else {
          window.location.href = '/#/' + item.VisitTypeGroupCode + '/' + (convertUrl[item.Form] || item.Form) + '/' + item.VisitId
        }
      }
    },
    NotificationSeen (item) {
      if (item.Seen) return this.$modal.hide('informationMessage')
      new Notification({noLoading: true}).update(item.Id, {}).then(rep => {
        this.getNotification(true)
        this.$modal.hide('informationMessage')
      })
    },
    getNotification (noInter) {
      if (window.location.hash.includes('login') || !storage.get('logined')) {
        return true
      }
      new Notification({hidemsg: true, hideloading: true, notRedirect: true, noLoading: true}).create({}).then(rep => {
        var findInfoMessage = rep.find(e => (e.VisitTypeGroupCode === 'INFO' && !e.Seen))
        if (findInfoMessage) this.noti(findInfoMessage)
        this.Notifications = rep
        if (!noInter) {
          this.notiInterval = setTimeout(() => {
            this.getNotification()
          }, INTERVALNOTITIME)
        }
      })
    },
    changeLocale (locale) {
      localStorage.setItem('locale', locale)
      i18n.locale = locale
      this.locale = locale
    },
    /**
     * Will log the user in.
     *
     * @param {Object} user The user to be logged in.
     */
    logout () {
      this.$modal.show('dialog', {
        title: this.__t('Cảnh báo!'),
        text: this.__t('Bạn muốn đăng xuất khỏi ứng dụng?'),
        class: 'v-dialog v-dialog-warning',
        buttons: [
          {
            title: this.__t('Hủy bỏ'),
            class: 'btn',
            handler: () => {
              this.$modal.hide('dialog')
            }
          },
          {
            title: this.__t('Đồng ý'),
            class: 'btn bg-yellow',
            handler: () => {
              this.$store.dispatch('auth/logout')
              this.$modal.hide('dialog')
            }
          }
        ]
      })
    },
    JSONparse (str) {
      try {
        return JSON.parse(str)
      } catch (err) {
        return {}
      }
    }
  }
}
</script>
<style scoped>
  #dropdownMenuButton {
    background-color: dodgerblue;
    border: none;
    color: white;
    padding: 8px;
    font-size: 15px;
    cursor: pointer;
  }
  #dropdownMenuButton:hover {
    background-color: royalblue;
  }
  .btn:hover {
    background-color: royalblue;
    color: white;
  }
</style>
