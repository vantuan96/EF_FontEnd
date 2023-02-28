<template>
  <div class="page-lscd disable_ccp_page_dex">
    <h2 class="text-center cap mrb20 fw600">{{__t('Quản lý thai nghén')}}</h2>
    <div class="v-tab">
      <ul class="nav nav-tabs">
        <li role="presentation" v-for="(type, index) in Types" :key="index" :class="activeClass(`${type.Path}/`)">
          <router-link @click="Type = type.Value" :to="{name: type.RouteName, params: { Id: $route.params.Id }}">
            {{__t(type.Label)}}
          </router-link>
        </li>
      </ul>
    </div>
    <div class="tab-content" id="record-menu">
      <transition name="page" mode="out-in">
        <router-view class="mrt10" :viewOnly="viewOnly" :VisitId="_VisitId" :VisitType="_VisitType"/>
      </transition>
    </div>
  </div>
</template>
<script>
import $ from 'jquery'
import storage from '@/lib/storage'
export default {
  name: 'PregnancyFollowUpRecordIndex',
  props: ['viewOnly', 'VisitId', 'VisitType'],
  data () {
    return {
      Types: [
        {
          Label: 'Thông tin sản khoa',
          Value: 1,
          RouteName: 'OPDObstetricInformation',
          Path: 'ObstetricInformation'
        },
        {
          Label: 'Quá trình khám thai',
          Value: 2,
          RouteName: 'OPDThePregnancyCheckupProcess',
          Path: 'ThePregnancyCheckupProcess'
        }
      ],
      Type: 1
    }
  },
  mounted () {
    $('.disable_ccp_page_dex' + (storage.get('allowcopypaste') ? 'fc' : '')).bind('cut copy paste', e => {
      this.toastedError('Bạn không thể thực hiện thao tác này trên hệ thống!')
      return false
    })
  },
  methods: {
    activeClass (link) {
      if (typeof link === 'string') return this.$route.path.includes(link) ? 'active' : ''
      return link.includes(this.$route.name) ? 'active' : ''
    }
  }
}
</script>
