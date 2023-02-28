<template>
  <div id="PediatricOver12Old-Page" class="main-content disable_ccp adult_vital_signs">
    <h3 class="text-center cap fw600">{{__t('PediatricVitalSigns.bigTitle')}}</h3>
    <h3 class="text-center mrb30 fw600">{{__t('(Trên 12 tuổi)')}}</h3>
    <div class="content-body">
      <Form :VisitId="VisitId" @hiddenLog="setHiddenLog" :viewOnly="viewOnly" @TimeLog="getTimeLog"/>
    </div>
     <div>
      <p>A02_032_080322_V</p>
    </div>
    <div v-if="hiddenLog">
      <p>{{__t('Chỉnh sửa lần cuối bởi')}} <AdInfo v-if="timeLog" :ad="timeLog[1]" /> {{__t('lúc')}} {{ timeLog[0] }}</p>
    </div>
  </div>
</template>
<script>
import $ from 'jquery'
import storage from '@/lib/storage'
import Form from './Form.vue'

export default {
  name: 'PediatricOver12Old',
  props: ['viewOnly', 'VisitId'],
  data () {
    return {
      timeLog: [],
      hiddenLog: false
    }
  },
  mixins: [],
  components: {
    Form
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
    },
    getTimeLog (val1, val2) {
      this.timeLog = [val1, val2]
    },
    setHiddenLog () {
      this.hiddenLog = true
    }
  }
}
</script>
<style scoped>
</style>
