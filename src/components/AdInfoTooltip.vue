<template>
  <div>
    <div class="v-tootip" ref="infoBoxTooltip">
      <header><i class="fa fa-info-circle" aria-hidden="true"></i> {{__t('Thông tin chi tiết')}}</header>
      <content>
        <p><label>Username:</label> {{info.Username || '...'}}</p>
        <p v-if="info.Fullname"><label>{{__t('Họ và tên')}}:</label> {{info.Fullname || '...'}}</p>
        <p v-if="info.Mobile"><label>{{__t('SĐT')}}:</label> {{info.Mobile || '...'}}</p>
        <p v-if="info.Title"><label>{{__t('Chức danh')}}:</label> {{info.Title || '...'}}</p>
        <p v-if="info.Department"><label>{{__t('Phòng ban')}}:</label> {{info.Department || '...'}}</p>
      </content>
    </div>
  </div>
</template>
<script>
import EventBus from '@/lib/eventBus'
import $ from 'jquery'
export default {
  name: 'AdInfoTooltip',
  data () {
    return {
      info: {},
      adw: 0,
      adh: 0,
      activeClass: '',
      loading: false,
      hidden: true
    }
  },
  mounted () {
    EventBus.$on('updateAdTooltip', this.setPosition)
    EventBus.$on('HideAdTooltip', this.hideAdTooltip)
  },
  methods: {
    hideAdTooltip () {
      this.hidden = true
      $('.v-tootip').css({
        'z-index': -9999,
        'opacity': 0,
        'visibility': 'hidden'
      })
    },
    setPosition (obj, boun) {
      this.hidden = false
      this.info = obj
      if (this.$refs['infoBoxTooltip'] && this.$refs['infoBoxTooltip'].clientWidth) {
        var adw = this.$refs['infoBoxTooltip'].clientWidth
        var adh = this.$refs['infoBoxTooltip'].clientHeight
        $('.v-tootip').css({
          'top': boun.top - adh - 3,
          'left': boun.left - adw / 2 + boun.width / 2,
          'visibility': 'visible',
          'opacity': 1,
          'z-index': 99999999
        })
      }
    }
  }
}
</script>
