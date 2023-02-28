<template>
 <div class="SurgeryCertificate main-content disable_ccp1">
   <h1 v-if="!viewOnly" class="text-center fw600">{{__t('SurgeryCertificate.bigLabel')}}</h1>
   <br v-if="!viewOnly">
   <page-content v-if="!version" :viewOnly="viewOnly" :VisitId="VisitId" />
   <div v-else style="padding: 0 160px;">
      <div v-if="Lists && Lists.length > 0" class="v-tab v-tab-2">
        <ul class="nav nav-tabs flex-containerx no-border" role="tablist">
          <li :data="item" :key="index" v-for="(item ,index) in Lists" class="text-center flex-containerx no-border" style="margin-right: 0px;">
            <router-link class="no-border" @click.native="handleId(item.Id)" :to="{name: 'IpdSurgeryCertificateItem', params: { Id: _VisitId, Item: item.Id }} ">
              <div>{{__t('Phiếu') + ' ' + (index + 1)}}</div>
              <div>{{item.CreatedAt | formatDateWithoutSecon}}</div>
              <div>
                <ad-Info v-if="item.CreatedBy" :ad="item.CreatedBy" />
                <br v-else-if="item.CreatedBy === ''">
              </div>
            </router-link>
          </li>
        </ul>
        <div class="tab-content">
          <transition name="page" mode="out-in">
            <router-view :version="version" :VisitType="VisitType" :viewOnly="viewOnly" :versionCheck="versionCheck"/>
          </transition>
        </div>
      </div>
      <div v-if="Lists && !Lists.length">
        <p class="text-center">{{__t('Chưa có thông tin')}}</p>
      </div>
    </div>
   <!-- <p :style="version ? 'padding: 0 160px;' :''">A01_151_050919_VE</p> -->
 </div>
</template>

<script>
import $ from 'jquery'
import storage from '@/lib/storage'
import PageContent from './PageContent.vue'
import GetSurgeryCertificate from '@/services/IPD/SurgeryCertificate/GetSurgeryCertificate'
export default {
  name: 'SurgeryCertificateIndex',
  props: ['viewOnly', 'VisitId'],
  data () {
    return {
      Lists: [],
      version: false,
      versionCheck: '',
      id: ''
    }
  },
  components: {
    PageContent
  },
  mounted () {
    $('.disable_ccp1' + (storage.get('allowcopypaste') ? 'fc' : '')).bind('cut copy paste', e => {
      this.toastedError('Bạn không thể thực hiện thao tác này trên hệ thống!')
      return false
    })
    this.getVision()
  },
  methods: {
    handleId (id) {
      let checkVersion = this.Lists.filter(element => element.Id === id)
      console.log(checkVersion, 'check data version')
      this.versionCheck = checkVersion[0].Version
    },
    getVision () {
      new GetSurgeryCertificate().find(this._VisitId + '?hidemsg=' + true).then(res => {
        if (res.Version === '2') {
          this.version = true
          this.getListData()
          this.handleId(this.$route.params.Item)
        } else {
          this.version = false
        }
      }).catch(e => {
        this.version = true
      })
    },
    getListData () {
      new GetSurgeryCertificate().find('All/' + this._VisitId + '?hidemsg=' + true).then(response => {
        this.Lists = response.forms_result
        if (response.forms_result.length > 0 && !this.$route.params.Item) {
          this.$router.push({name: 'IpdSurgeryCertificateItem', params: { Id: this._VisitId, Item: response.forms_result[response.forms_result.length - 1].Id }})
        }
        this.handleId(this.$route.params.Item)
      }).catch(e => {
        console.log('e: ', e)
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
</style>
