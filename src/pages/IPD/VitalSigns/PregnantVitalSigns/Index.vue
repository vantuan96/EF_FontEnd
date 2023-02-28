<template>
  <div id="PregnantVitalSigns-Page" class="main-content disable_ccp adult_vital_signs">
    <h3 class="text-center cap mrb30 fw600">{{__t('PregnantVitalSigns.bigTitle')}}</h3>
    <div class="content-body">
      <PageNurse :VisitId="VisitId" @hiddenLog="setHiddenLog" :viewOnly="viewOnly" @TimeLog="getTimeLog"/>
    </div>
     <div>
      <p>A02_037_080322_V</p>
    </div>
    <div v-if="hiddenLog">
      <p>{{__t('Chỉnh sửa lần cuối bởi')}} <AdInfo v-if="timeLog" :ad="timeLog[1]" /> {{__t('lúc')}} {{ timeLog[0] }}</p>
    </div>
  </div>
</template>
<script>
import $ from 'jquery'
import storage from '@/lib/storage'
import PageNurse from './PageNurse.vue'

export default {
  name: 'PregnantVitalSigns',
  props: ['viewOnly', 'VisitId'],
  data () {
    return {
      timeLog: [],
      hiddenLog: false
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
