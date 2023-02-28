<template>
 <div class="MedicationHistoryForm disable_ccp1">
   <h1 class="text-center fw600">{{__t('MedicationHistoryForm.bigLabel')}}</h1>
   <h4 class="text-center mrb10">{{__t('MedicationHistoryForm.label1')}}</h4>
   <page-content class="mrt20" :viewOnly="viewOnly" :VisitId="VisitId"/>
 </div>
</template>

<script>
import $ from 'jquery'
import storage from '@/lib/storage'
import PageContent from './PageContent.vue'
export default {
  name: 'MedicationHistoryFormDex',
  props: ['viewOnly', 'VisitId'],
  components: {
    PageContent
  },
  mounted () {
    $('.disable_ccp1' + (storage.get('allowcopypaste') ? 'fc' : '')).bind('cut copy paste', e => {
      this.toastedError('Bạn không thể thực hiện thao tác này trên hệ thống!')
      return false
    })
  },
  methods: {
  }
}
</script>

<style lang="stylus" scoped></style>
