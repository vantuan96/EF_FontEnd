<template>
  <div class="main-content disable_ccp">
    <h2 class="text-center cap mrb30 fw600">{{__t('Phiếu yêu cầu khám chuyên khoa hô hấp tiền phẫu')}}</h2>
    <div class="content-body">
      <page-content :viewOnly="viewOnly" :VisitId="_VisitId"/>
    </div>
  </div>
</template>
<script>
import $ from 'jquery'
import storage from '@/lib/storage'
import PageContent from './PageContent.vue'

export default {
  name: 'CKHoHapTienPhau',
  props: ['viewOnly', 'VisitId'],
  data () {
    return {
    }
  },
  mixins: [],
  components: {
    PageContent
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
