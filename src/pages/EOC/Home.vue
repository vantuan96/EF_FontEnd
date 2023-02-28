<template>
  <div class="main-content" id="Home-page">
    <h1 class="title-page">{{ __t('home.danh_sach_benh_nhan') }}</h1><div class="row v-flexbox">
        <div class="col-md-10 col-sm-10">
          <form v-on:submit.prevent="searchByName(search, true)">
            <div class="search-group box">
                <label>{{ __t('home.tim_kiem_benh_nhan') }}</label>
                <div class="input-group input-group-sm">
                  <input type="text" class="form-control" v-model="search" :placeholder="__t('home.placeholder_search')">
                  <span class="input-group-btn">
                    <button type="button" class="btn btn-flat v-yellow-btn" @click="searchByName(search, true)">{{ __t('home.tim_kiem') }}</button>
                  </span>
                </div>
              </div>
          </form>
        </div>
        <div class="col-md-2 col-sm-2 no-padding-left">
          <a style="margin-bottom: 0px;" type="button" href="/#/EOC/add" class="btn v-yellow-btn pull-right btn-home-add">
            <span>
              <span class="glyphicon glyphicon-plus"></span>
              <p>{{ __t('home.them_benh_nhan') }}</p>
            </span>
          </a>
          <div class="text-center" style="display: block;width: 229px;position: absolute;bottom: -4px;left: -22px;"><i style="color: red!important;">{{__t('Chỉ áp dụng cho bệnh nhân mới!')}}</i></div>
        </div>
      </div>
    <div class="v-tab">
      <ul class="nav nav-tabs" role="tablist">
        <li role="presentation" :class="activeClass('ListPatientInEOC')">
          <router-link :to="{name: 'ListPatientInEOC'}">
            {{ __t('Danh sách người bệnh') }}
          </router-link>
        </li>
        <li role="presentation" :class="activeClass('ListPatientTransferEOC')" v-if="$store.state.account.Position.includes('Nurse') || $store.state.account.Position.includes('Administrator')">
          <router-link :to="{name: 'ListPatientTransferEOC'}">
            {{ __t('Tiếp nhận người bệnh chuyển khoa') }} <span v-if="count" class="badge badge-noti navbar-badge animation-s">{{count}}</span>
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
import Tranfers from '@/services/EOC/Tranfer'

export default {
  /**
   * The name of the page.
   */
  name: 'OPD',
  data () {
    return {
      search: null,
      interval: null,
      count: 0
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
      new Tranfers({
        Type: 'count',
        hidemsg: true,
        noLoading: true,
        notRedirect: true
      })
        .all()
        .then(response => {
          this.count = response.count
        })
    },
    activeClass (link) {
      return link === this.$route.name ? 'active' : ''
    },
    searchByName (search) {
      EventBus.$emit('updateSearchByName', search)
    },
    clearSearchByName () {
      this.search = null
    }
  },
  created () {
    EventBus.$on('clearSearchByName', this.clearSearchByName)
    // console.log('ON-Home')
  },
  beforeDestroy () {
    EventBus.$off('clearSearchByName')
    clearInterval(this.interval)
  }
}
</script>
