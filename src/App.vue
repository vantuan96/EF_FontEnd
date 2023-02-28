<template>
  <div id="app" @mouseover="mouseOver">
    <div class="wrapper" v-if="userLoaded">
      <va-header :slideMenuItems="slideMenuItems"></va-header>
      <router-view/>
      <va-footer/>
      <loading/>
      <v-dialog />
      <DialogError/>
      <AdInfoTooltip v-if="!requesting"/>
      <modal name="doctorLoginForm" transition="pop-out" id="doctor-login" height="auto" :clickToClose="false" v-if="!isLoginPage">
        <div class="box v-model-content-popup">
          <div class="box-header text-center">
            <h3 class="box-title">{{__t('Đã hết phiên sử dụng hệ thống.')}}</h3>
            <div style="color: #fff">{{__t('Vui lòng nhập lại để tiếp tục')}}</div>
          </div>
          <div class="form-confirm">
            <div class="form-group has-feedback">
              <input v-model="user.username" readonly type="text" class="form-control" :placeholder="__t('Tên đăng nhập')"/>
              <span class="glyphicon glyphicon-user form-control-feedback"></span>
            </div>
            <div class="form-group has-feedback">
              <input v-model="user.password" type="password" class="form-control current-password" :placeholder="__t('Mật khẩu')"/>
              <span class="glyphicon glyphicon-lock form-control-feedback"></span>
            </div>
            <div class="form-group has-feedback">
              <vue-recaptcha
                v-if="hasCaptcha || countErr > 3"
                ref="recaptcha"
                @verify="onCaptchaVerified"
                @expired="onCaptchaExpired"
                :sitekey="sitekey">
              </vue-recaptcha>
            </div>
            <div class="row">
              <div class="col-xs-6">
                <button type="button" class="btn btn-block v-white-btn" @click="logout()">{{__t('Thoát')}}</button>
              </div>
              <div class="col-xs-6">
                <button type="button" class="btn btn-block v-yellow-btn" @click="login()">{{__t('Đăng nhập')}}</button>
              </div>
              <!-- <div class="col-xs-4">
                <button type="button" class="btn btn-block" @click="closeForm()">Hủy</button>
              </div> -->
            </div>
            <p style="margin-top: 10px; text-align:center"> {{__t('Sử dụng tài khoản máy tính')}}</p>
          </div>
        </div>
      </modal>
    </div>
    <MaintenancePage v-if="isMaintenancePage" :msg="MaintenancePageMsg" />
  </div>
</template>
<script>
/* ============
 * Entry Point
 * ============
 *
 * The entry point of the application.
 */
// import Vue from 'vue'
import VANaviBar from '@/components/shared/NaviBar.vue'
import Footer from '@/components/shared/Footer.vue'
import Header from '@/components/shared/Header.vue'
import Loading from '@/components/Loading.vue'
import vDialog from '@/components/Dialog.vue'
import DialogError from '@/components/DialogError.vue'
import AdInfoTooltip from '@/components/AdInfoTooltip.vue'
import MaintenancePage from '@/components/MaintenancePage.vue'
import storage from '@/lib/storage'
import slideMenuItems from '@/lib/slideMenuItems.js'
import EventBus from '@/lib/eventBus'
import { mapGetters } from 'vuex'
import Auth from '@/services/Auth'
import Logs from '@/services/Logs'
import SiteConfig from '@/services/SiteConfig'
import VueRecaptcha from 'vue-recaptcha'
import utils from '@/utils.js'
export default {
  /**
   * The name of the application.
   */
  name: 'VueEstore',
  data () {
    return {
      slideMenuItems: slideMenuItems,
      carousel: {
        name: 'carousel-example',
        list: []
      },
      user: {
        username: '',
        captcha: null
      },
      changeing: false,
      hasCaptcha: false,
      CaptchaVerified: false,
      sitekey: process.env.GOOGLE_CAPTCHA_SITE_KEY,
      countErr: 0,
      isLoginPage: false,
      requesting: false,
      isMaintenancePage: false,
      MaintenancePageMsg: '',
      userLoaded: false
    }
  },
  components: {
    'va-navibar': VANaviBar,
    'va-header': Header,
    'va-footer': Footer,
    Loading,
    vDialog,
    VueRecaptcha,
    AdInfoTooltip,
    DialogError,
    MaintenancePage
  },
  computed: {
    ...mapGetters({
      Sites: 'account/getSites',
      Site: 'account/getSite',
      Specialty: 'account/getSpecialty',
      Position: 'account/getPosition'
    })
  },
  watch: {
    $route (to, from) {
      if ((to.name !== 'dashboard' && to.name !== 'home' && to.meta.requireSettingDepartment) && (!this.Site || !this.Specialty)) {
        window.location.href = '/#/dashboard/'
      }
      this.loging(to)
      this.setHistory(to)
    }
  },
  /**
   * Fires when the app has been mounted.
   */
  mounted () {
    utils.checkAndSetCookie('EFORM_CLIENT_REQUEST_ID', utils.uuidv4(), 100)
    this.isLoginPage = window.location.hash.includes('login')
    EventBus.$on('AxiosRequest', this.axiosRequest)
    EventBus.$on('updatepage', this.updatepage)
    EventBus.$on('401Event', this._401Event)
    EventBus.$on('403Event', this._403Event)
    if (this.$store.state.auth.authenticated && !window.location.hash.includes('login') && !window.location.hash.includes('error-version')) {
      this.$store.dispatch('account/find').then(() => {
        this.userLoaded = true
      })
    } else {
      this.userLoaded = true
    }
    setInterval(() => {
      this.updateUser()
    }, 5 * 1000)
    var link = document.createElement('link')
    link.type = 'image/x-icon'
    link.rel = 'shortcut icon'
    link.href = '/static/favicon.ico'
    document.getElementsByTagName('head')[0].appendChild(link)
    var ver = process.env.COMMITID
    console.log(
      `%cCopyright © 2020 Vinmec, CurrentVer ${ver}.`,
      `font: 4em monospace; color: ${utils.getRandomColor()};-webkit-text-stroke: 1px black;font-weight:bold;text-shadow: 8px 8px 4px #CE5937;padding: 10px 20px;background-color: ${utils.getRandomColor()}`)
  },
  methods: {
    updatepage () {
      this.userLoaded = false
      setTimeout(() => {
        this.userLoaded = true
      }, 200)
    },
    getSiteConfig () {
      if (window.location.hash.includes('login')) return
      new SiteConfig({hidemsg: true, noLoading: true, notRedirect: true, v: new Date().getTime()})
        .all()
        .then(response => {
          this.lock(response)
        }).catch(e => {
          this.isMaintenancePage = false
        })
      setTimeout(() => {
        this.getSiteConfig()
      }, 2 * 60 * 1000)
    },
    lock (response) {
      this.MaintenancePageMsg = response.msg
      this.isMaintenancePage = response.maintenance && !response.users.includes(this.$store.state.account.Username)
    },
    setHistory (to) {
      setTimeout(() => {
        try {
          var fromStorage = storage.get('back_url')
          var currenturl = fromStorage && typeof fromStorage === 'object' ? fromStorage : []
          if (currenturl[currenturl.length - 1] !== to.fullPath) {
            currenturl.push(to.fullPath)
            storage.set('back_url', JSON.stringify(currenturl))
          }
        } catch (e) {
          console.log(e)
        }
      }, 1000)
    },
    mouseOver ($event) {
      if ($event.fromElement && $event.fromElement.className === 'ad-info') {
        // pass
      } else {
        EventBus.$emit('HideAdTooltip')
      }
    },
    axiosRequest () {
      this.requesting = true
      setTimeout(() => {
        this.requesting = false
      }, 50)
    },
    updateUser () {
      if (this.$store.state.auth.authenticated && !window.location.hash.includes('login')) {
        this.$store.dispatch('account/update', this.JSONParse(localStorage.getItem('account_info')))
      }
    },
    loging (to) {
      if (to.name !== 'EDPatientAndFamilyEducationView' &&
      to.name !== 'EDPatientAndFamilyEducation' &&
      to.name !== 'IPDPatientAndFamilyEducationView' &&
      to.name !== 'IPDPatientAndFamilyEducation' &&
      to.name !== 'OPDPatientAndFamilyEducationView' &&
      to.name !== 'OPDPatientAndFamilyEducation' &&
      to.name !== 'EOCPatientAndFamilyEducationView' &&
      to.name !== 'EOCPatientAndFamilyEducation' &&
      to.name !== 'ArterialBloodGasTestList' &&
      to.name !== 'ArterialBloodGasTest' &&
      to.name !== 'ChemicalBiologyTestList' &&
      to.name !== 'ChemicalBiologyTest') {
        this.changeing = true
      }
      setTimeout(() => {
        this.changeing = false
      }, 333)
      if (to.name === 'login.index' || to.name === 'pagetivi') {
        return false
      }
      new Logs({hidemsg: true, hideloading: true, notRedirect: true})
        .update('', {
          url: to.fullPath,
          name: to.meta.name
        })
        .then(response => {
        })
    },
    logout () {
      this.$store.dispatch('auth/logout')
    },
    login () {
      new Auth()
        .login(this.user)
        .then((response) => {
          this.closeForm()
        }).catch(e => {
          this.countErr = this.countErr + 1
          if (this.countErr > 3) {
            this.hasCaptcha = true
          }
        })
    },
    closeForm () {
      this.$modal.hide('doctorLoginForm')
    },
    _403Event (msg) {
      setTimeout(() => {
        this.alert(this.__t('Lỗi phân quyền'), msg || this.__t('Bạn không có quyền thực hiện thao tác này'))
      }, 100)
    },
    _401Event () {
      this.user.username = this.$store.state.account.Username
      this.$modal.show('doctorLoginForm', {
        height: 'auto',
        width: 'auto'
      })
    },
    onCaptchaVerified (cap) {
      this.CaptchaVerified = cap
      this.user.captcha = cap
    },
    onCaptchaExpired (cap) {
      this.reset()
    },
    reset () {
      if (this.$refs.recaptcha) {
        this.$refs.recaptcha.reset()
      }
    },
    getCaptcha () {
      new Auth().find('ShowCaptcha').then(response => {
        this.hasCaptcha = response
      })
    }
  }
}
</script>
