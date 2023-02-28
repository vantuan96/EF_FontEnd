<template>
  <div id="AdultVitalSigns-Page" class="main-content disable_ccp adult_vital_signs">
    <h3 class="text-center cap fw600" style="font-size:30px">{{__t('Upload File')}}</h3>
    <!-- <h3 class="text-center cap mrb30 fw600 italic" style="font-size:30px">Do not resuscitation order</h3> -->
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
  name: 'UploadImage',
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
