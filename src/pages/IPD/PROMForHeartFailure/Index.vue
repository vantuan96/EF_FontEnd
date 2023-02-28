<template>
  <div id="AdultVitalSigns-Page" class="main-content disable_ccp adult_vital_signs">
    <h3 class="text-center cap mrb30 fw600">{{__t('PROM bệnh nhân suy tim')}}</h3>
    <div class="content-body">
      <Item :viewOnly="viewOnly" :VisitId="VisitId" :VisitType="VisitType"/>
    </div>
     <div>
      <p></p>
    </div>
  </div>
</template>
<script>
import $ from 'jquery'
import storage from '@/lib/storage'
import Item from './Item.vue'

export default {
  name: 'PROMForHeartFailureIndex',
  props: ['viewOnly', 'VisitId', 'VisitType'],
  data () {
    return {
    }
  },
  mixins: [],
  components: {
    Item
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
    submit () {
      console.log('save')
    }
  }
}
</script>
<style scoped>
</style>
