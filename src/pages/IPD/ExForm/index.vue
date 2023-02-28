<template>
  <div id="PageContent-Page" class="main-content disable_ccp">
    <h2 class="text-center cap mrb30 fw600">{{__t('label')}}</h2>
    <div class="content-body">
      <page-content :viewOnly="viewOnly" :VisitId="VisitId"/>
    </div>
     <div>
      <p>A02_056_050919_VE</p>
    </div>
  </div>
</template>
<script>
import $ from 'jquery'
import storage from '@/lib/storage'
import PageContent from './PageContent.vue'

export default {
  name: 'PageContent',
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
