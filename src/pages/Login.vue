<template>
  <v-login>
    <div class="row">
      <div class="col-md-6">
        <div class="login-guild">
          <p><img src="/static/logo.png?v=188"></p>
          <h4><b>{{__t('Hướng dẫn đăng nhập')}}:</b></h4>
          <p>- {{__t('Tên đăng nhập: Sử dụng account AD(là account đăng nhập vào máy tính với những máy Join domain Vingroup)')}}</p>
          <p>- {{__t('Mật khẩu: Mật khẩu account AD')}}</p>
          <p>{{__t('Trường hợp không rõ Account AD của mình hoặc không đăng nhập được, vui lòng liên hệ bộ phận IT của đơn vị để kiểm tra')}}</p>
        </div>
      </div>
      <div class="col-md-6">
        <form class="mb-20" method="post" @submit.prevent="login(user)">
          <div class="form-group has-feedback">
            <input v-model="user.username" type="text" class="form-control" :placeholder="__t('Tên đăng nhập')"/>
            <span class="glyphicon glyphicon-user form-control-feedback"></span>
          </div>
          <div class="form-group has-feedback">
            <!-- @keyup="checkCapsLock($event)"
              @mousedown="checkCapsLock($event)" -->
            <input
              v-model="user.password"
              :type="showPassword ? 'text' : 'password'"
              class="form-control current-password"
              :placeholder="__t('Mật khẩu')"
            />
            <span class="glyphicon glyphicon-eye-open form-control-feedback" @mousedown="showPassword = true" @mouseup="showPassword = false"></span>
            <p v-if="Capslock" class="note-text font12 no-margin"><i class="fa fa-exclamation" aria-hidden="true"></i> {{__t('WARNING! Caps lock is ON.')}}</p>
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
            <div class="col-xs-12">
              <button type="submit" class="btn btn-block v-yellow-btn" :disabled="!validateForm()">{{__t('Đăng nhập')}}</button>
            </div>
          </div>
          <p style="margin-top: 10px; text-align:center">{{__t('Sử dụng tài khoản máy tính để đăng nhập')}}</p>
        </form>
        <div class="sl-nav">
       {{selectLang}}:
    <ul>
      <li><b>{{language}}</b><i style="margin-left:5px" :class="locale === 'vi' ? 'v-flag-icon flag-icon-vi' : 'v-flag-icon flag-icon-en'"></i> <i class="fa fa-angle-down" aria-hidden="true"></i>
        <div class="triangle"></div>
        <ul>
          <li class="w200">
            <div class="row slectLang" @click="changeLocale('vi')">
              <div class="col-md-6"><span class="active">Việt Nam</span></div>
              <div class="col-md-6" style="float:right"><i class="v-flag-icon flag-icon-vi"></i></div>
             </div>
             <div class="row slectLang" @click="changeLocale('en')">
              <div class="col-md-6"><span class="active">English</span></div>
              <div class="col-md-6" style="float:right"><i class="v-flag-icon flag-icon-en"></i></div>
             </div>
          </li>
              <!-- <i class="v-flag-icon flag-icon-vi"></i> <span class="active">Deutsch</span> -->
          <!-- <li><i class="v-flag-icon flag-icon-en"></i> <span>English</span></li> -->
        </ul>
      </li>
    </ul>
  </div>
      </div>
    </div>
  </v-login>
</template>
<script>
import VLogin from '@/layouts/Login.vue'
import VueRecaptcha from 'vue-recaptcha'
import Auth from '@/services/Auth'
import { i18n } from '@/plugins/vue-i18n'
export default {
  /**
   * The name of the page.
   */
  name: 'Login',
  data () {
    return {
      language: 'Việt Nam',
      selectLang: 'Ngôn ngữ',
      locale: 'vi',
      showPassword: false,
      user: {
        username: null,
        password: null,
        captcha: null
      },
      hasCaptcha: false,
      CaptchaVerified: false,
      sitekey: process.env.GOOGLE_CAPTCHA_SITE_KEY,
      countErr: 0,
      Capslock: false
    }
  },
  /**
   * The components that the page can use.
   */
  components: {
    VLogin, VueRecaptcha
  },
  mounted () {
    this.getCaptcha()
  },
  methods: {
    changeLocale (locale) {
      localStorage.setItem('locale', locale)
      this.language = locale === 'vi' ? 'Việt Nam' : 'English'
      this.selectLang = locale === 'vi' ? 'Ngôn ngữ' : 'Language'
      i18n.locale = locale
      this.locale = locale
    },
    checkCapsLock (event) {
      if (event.getModifierState('CapsLock')) {
        this.Capslock = true
      } else {
        this.Capslock = false
      }
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
    },
    /**
     * Will log the user in.
     *
     * @param {Object} user The user to be logged in.
     */
    login (user) {
      // this.$cookies.set('theme', 'default')
      // this.$cookies.remove('_RequestVerificationToken', 'dungnv53')
      this.$store.dispatch('auth/login', user)
      setTimeout(() => {
        this.countErr = this.countErr + 1
        if (this.countErr > 3) {
          this.hasCaptcha = true
        }
        this.reset()
      }, 500)
    },
    validateForm () {
      return this.user.password && this.user.username && ((this.hasCaptcha && this.CaptchaVerified) || (!this.hasCaptcha))
    },
    onCaptchaVerified (cap) {
      this.CaptchaVerified = cap
      this.user.captcha = cap
    },
    onCaptchaExpired (cap) {
      this.reset()
    }
  }
}
</script>
<style scoped>
.nav-wrapper {
  width: 300px;
  margin: 100px auto;
  text-align: center;
}
  .sl-nav {
  display: inline;
}
.slectLang:hover {
  background: #99c6f8;
}
.sl-nav ul {
  margin:0;
  padding:0;
  list-style: none;
  position: relative;
  display: inline-block;
}
.sl-nav li {
  cursor: pointer;
  padding-bottom:10px;
}
.sl-nav li ul {
  display: none;
}
.sl-nav li:hover ul {
  position: absolute;
  top:29px;
  right:-15px;
  display: block;
  background: #fff;
  /* width: 120px; */
  padding-top: 0px;
  z-index: 1;
  border-radius:5px;
  box-shadow: 0px 0px 20px rgba(0,0,0,0.2);
}
.sl-nav li:hover .triangle {
  position: absolute;
  top: 15px;
  right: -10px;
  z-index:10;
  height: 14px;
  overflow:hidden;
  width: 30px;
  background: transparent;
}
.sl-nav li:hover .triangle:after {
  content: '';
  display: block;
  z-index: 20;
  width: 15px;
  transform: rotate(45deg) translateY(0px) translatex(10px);
  height: 15px;
  background: #fff;
  border-radius:2px 0px 0px 0px;
  box-shadow: 0px 0px 20px rgba(0,0,0,0.2);
}
.sl-nav li ul li {
  position: relative;
  text-align: left;
  background: transparent;
  padding: 15px 15px;
  padding-bottom:0;
  z-index: 2;
  font-size: 15px;
  color: #3c3c3c;
}
.sl-nav li ul li:last-of-type {
  padding-bottom: 15px;
}
.sl-nav li ul li span {
  padding-left: 5px;
}
.sl-nav li ul li span:hover, .sl-nav li ul li span.active {
  color: #146c78;
}
.sl-flag {
  display: inline-block;
  box-shadow: 0px 0px 3px rgba(0,0,0,0.4);
  width: 15px;
  height: 15px;
  background: #aaa;
  border-radius: 50%;
  position: relative;
  top: 2px;
  overflow: hidden;
}
.flag-de {
background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAIAAAAC64paAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAZdEVYdFNvZnR3YXJlAHBhaW50Lm5ldCA0LjAuMTM0A1t6AAAAPUlEQVQ4T+3HMQ0AIBTE0NOHM8x9B7hgh71bIWGieUvze1m7kHGBr/AVvsJX+EpmP5dV5/gKX+ErfIUvVDYcX2NMxQC8PAAAAABJRU5ErkJggg==');
  background-size: cover;
  background-position: center center;
}
</style>
