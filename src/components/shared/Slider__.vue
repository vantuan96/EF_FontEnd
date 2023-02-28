<template>
  <header class="main-header">
    <nav class="navbar navbar-static-top">
      <div class="container">
        <div class="navbar-header">
          <a href="/#/dashboard" class="navbar-brand">
            <img src="/static/logo.png" />
          </a>
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar-collapse">
            <i class="fa fa-bars"></i>
          </button>
        </div>

        <!-- Collect the nav links, forms, and other content for toggling -->
        <div class="collapse navbar-collapse pull-left" id="navbar-collapse">
          <ul data-widget="tree" class="nav navbar-nav">
            <va-slide-item
              v-for="(item,index) in slideMenuItems"
              :data="item"
              :key="index"
              :type="item.type"
              :isHeader="item.isHeader"
              :icon="item.icon"
              :name="item.name"
              :badge="item.badge"
              :items="item.items"
              :router="item.router"
              :link="item.link"
              :active="item.active"
              :query="item.query"
              v-if="store.state.auth.role.includes(item.roles)"
            >
            </va-slide-item>
          </ul>
        </div>
        <!-- /.navbar-collapse -->
        <!-- Navbar Right Menu -->
        <div class="navbar-custom-menu">
          <ul class="nav navbar-nav">
            <!-- Notifications Menu -->
            <li class="nav-item">
              <a>{{store.state.account.fullname}}</a>
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
            <li>
                <a data-toggle="control-sidebar" @click="logout()" href="#">
                    <i class="fa fa-sign-out">
                    </i>
                </a>
            </li>
          </ul>
        </div>
        <!-- /.navbar-custom-menu -->
      </div>
      <!-- /.container-fluid -->
    </nav>
  </header>
</template>

<script>
import store from '@/store'
import VASlideItem from '../VASlideItem'
import { i18n } from '@/plugins/vue-i18n'
export default {
  name: 'va-slider',
  props: {
    slideMenuItems: {
      type: Array
    }
  },
  data () {
    return {
      drop_down: '',
      store: store,
      locale: 'vi'
    }
  },
  created () {
    this.locale = localStorage.getItem('locale') || 'vi'
  },
  computed: {
  },
  components: {
    'va-slide-item': VASlideItem
  },
  methods: {
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
        title: 'Cảnh báo!',
        text: 'Bạn muốn đăng xuất khỏi ứng dụng',
        buttons: [
          {
            title: 'Đồng ý',
            class: 'bg-green-active vue-dialog-button',
            handler: () => {
              this.$store.dispatch('auth/logout')
              this.$modal.hide('dialog')
            }
          },
          {
            title: 'Hủy bỏ',
            class: 'bg-yellow vue-dialog-button',
            handler: () => {
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
