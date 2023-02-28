<template>
  <div id="BradenScoreboard-Page" class="main-content disable_ccp braden-scoreboard">
    <h2 class="text-center cap mrb30 fw600">{{__t('BradenScoreboard.bigLabel')}}</h2>
    <div class="content-body">
      <page-nurse :viewOnly="viewOnly" :VisitId="VisitId"/>
    </div>
     <div>
      <p>A02_056_050919_VE</p>
    </div>
  </div>
</template>
<script>
import $ from 'jquery'
import storage from '@/lib/storage'
import PageNurse from './PageNurse.vue'

export default {
  name: 'BradenScoreboardIndex',
  props: ['viewOnly', 'VisitId'],
  data () {
    return {
    }
  },
  mixins: [],
  components: {
    PageNurse
  },
  mounted () {
    $('.disable_ccp' + (storage.get('allowcopypaste') ? 'fc' : '')).bind('cut copy paste', e => {
      this.toastedError('Bạn không thể thực hiện thao tác này trên hệ thống!')
      return false
    })
  },
  computed: {
  },
  methods: {
  }
}
</script>
<style scoped>
</style>
