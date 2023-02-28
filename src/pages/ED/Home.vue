<template>
  <div class="main-content" id="Home-page">
    <h1 class="title-page">{{ __t('home.danh_sach_benh_nhan') }}</h1>
    <div class="row v-flexbox">
      <div class="col-md-10 col-sm-10">
        <div class="search-group box">
          <form v-on:submit.prevent="searchByName(search, true)">
            <label>{{__t('home.tim_kiem_benh_nhan') }}</label>
            <div class="input-group input-group-sm">
              <input type="text" class="form-control" v-model="search" :placeholder="__t('home.placeholder_search')">
              <span class="input-group-btn">
                <button type="button" class="btn btn-flat v-yellow-btn" @click="searchByName(search, true)">{{ __t('home.tim_kiem') }}</button>
              </span>
            </div>
          </form>
        </div>
      </div>
      <div class="col-md-2 col-sm-2 no-padding-left">
        <a style="margin-bottom: 0px;" type="button" href="/#/ed/add" class="btn v-yellow-btn pull-right btn-home-add">
          <span>
            <span class="glyphicon glyphicon-plus"></span>
            <p>{{__t('home.them_benh_nhan') }}</p>
          </span>
        </a>
        <div class="text-center" style="display: block;width: 229px;position: absolute;bottom: -4px;left: -16px;"><i style="color: red!important;">{{__t('Chỉ áp dụng cho bệnh nhân mới!')}}</i></div>
      </div>
    </div>
    <div class="v-tab">
      <ul class="nav nav-tabs" role="tablist">
        <li role="presentation" :class="activeClass('ListPatientInED')">
          <router-link :to="{name: 'ListPatientInED'}">
            {{__t('Danh sách người bệnh')}}
          </router-link>
        </li>
        <li role="presentation" :class="activeClass('ListPatientTransfer')" v-if="$store.state.account.Position.includes('Nurse') || $store.state.account.Position.includes('Administrator')">
          <router-link :to="{name: 'ListPatientTransfer'}">
            {{__t('Tiếp nhận người bệnh chuyển khoa')}} <span v-if="count" class="badge badge-noti navbar-badge animation-s">{{count}}</span>
          </router-link>
        </li>
      </ul>
      <div class="tab-content">
        <router-view/>
      </div>
    </div>
  </div>
</template>
<script>
/* ============
 * Add cusotmer Page
 * ============
 *
 * The home index page.
 */
import EventBus from '@/lib/eventBus'
import HandOverCheckList from '@/services/ED/HandOverCheckList'
export default {
  /**
   * The name of the page.
   */
  name: 'OPD',
  data () {
    return {
      search: null,
      count: 0,
      interval: null
    }
  },
  /**
   * The components that the page can use.
   */
  components: {
  },
  mounted () {
    this.$store.dispatch('account/update', {CurrentPatientObj: {}})
    this.getHandOverCheckList()
    this.interval = setInterval(() => {
      this.getHandOverCheckList()
    }, 15 * 1000)
  },
  computed: {
  },
  methods: {
    getHandOverCheckList () {
      new HandOverCheckList({
        hidemsg: true,
        noLoading: true,
        notRedirect: true
      }).find('count')
        .then(response => {
          this.count = response
        }).catch(e => {
          console.log('aasdasd')
          // window.location.href= "https://localhost:44320/Authen/Login"
        })
    },
    activeClass (link) {
      return link === this.$route.name ? 'active' : ''
    },
    searchByName (search) {
      // console.log('s')
      EventBus.$emit('updateSearchByName', search)
    },
    clearSearchByName () {
      this.search = null
    }
  },
  created () {
    EventBus.$on('clearSearchByName', this.clearSearchByName)
    // EventBus.$on('clearSearchField', this.clearSearchField)
    // console.log('ON-Home')
  },
  beforeDestroy () {
    EventBus.$off('clearSearchByName')
    // EventBus.$off('clearSearchField')
    clearInterval(this.interval)
  }
}
</script>
