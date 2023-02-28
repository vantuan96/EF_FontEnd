<template>
  <div class="main-content" id="Home-page">
    <h1 class="title-page">{{ __t('Danh sách người bệnh') }}</h1>
    <div class="row v-flexbox">
      <div class="col-md-10 col-sm-10">
        <div class="search-group box">
          <form v-on:submit.prevent="searchByName(search, true)">
            <label>{{__t('Tìm kiếm người bệnh') }}</label>
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
        <a style="margin-bottom: 0px;" type="button" href="/#/ipd/Create" class="btn v-yellow-btn pull-right btn-home-add">
          <span>
            <span class="glyphicon glyphicon-plus"></span>
            <p>{{__t('Thêm người bệnh') }}</p>
          </span>
        </a>
        <div class="text-center" style="display: block;width: 288px;position: absolute;bottom: -4px;left: -46px;"><i style="color: red!important;">{{__t('Chỉ áp dụng cho bệnh nhân mới!')}}</i></div>
      </div>
    </div>
    <div class="v-tab">
      <ul class="nav nav-tabs" role="tablist">
        <li role="presentation" :class="activeClass('ListPatientInIPD')">
          <router-link :to="{name: 'ListPatientInIPD'}">
            {{__t('Danh sách người bệnh')}}
          </router-link>
        </li>
        <li class="pos-l" role="presentation" :class="activeClass('ListPatientTransferIPD')" v-if="$store.state.account.Position.includes('Nurse') || $store.state.account.Position.includes('Administrator')">
          <router-link :to="{name: 'ListPatientTransferIPD'}">
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
import HandOverCheckList from '@/services/IPD/HandOverCheckList'
export default {
  /**
   * The name of the page.
   */
  name: 'IPD',
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
  destroyed () {
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
      })
        .find('count')
        .then(response => {
          this.count = response
        })
    },
    activeClass (link) {
      return link === this.$route.name ? 'active' : ''
    },
    searchByName (search) {
      EventBus.$emit('updateSearchIPDByName', search)
    },
    clearSearchIPDByName () {
      this.search = null
    }
  },
  created () {
    EventBus.$on('clearSearchIPDByName', this.clearSearchIPDByName)
    // console.log('ON-Home')
  },
  beforeDestroy () {
    EventBus.$off('clearSearchIPDByName')
    clearInterval(this.interval)
  }
}
</script>
