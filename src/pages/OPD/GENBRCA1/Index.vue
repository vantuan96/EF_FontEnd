<template>
  <div id="GENBRCA1-Page" class="main-content disable_ccp">
    <h3 class="text-center cap mrb30 fw600">{{__t('Phiếu đánh giá tiêu chuẩn chỉ định xét nghiệm GEN BRCA 1/2')}}<sup style="margin-left: 2.5px; font-size: 13.5px;">1</sup></h3>
    <div class="content-body">
      <Form :VisitId="VisitId" @hiddenLog="setHiddenLog" :viewOnly="viewOnly" @TimeLog="getTimeLog"></Form>
    </div>
    <div>
      <p class="mt-10">A03_119_201119_V</p>
    </div>
    <div v-if="hiddenLog">
      <p>{{__t('Chỉnh sửa lần cuối bởi')}} <AdInfo v-if="timeLog" :ad="timeLog[1]" /> {{__t('lúc')}} {{ timeLog[0] }}</p>
    </div>
  </div>
</template>

<script>
// import $ from 'jquery'
// import storage from '@/lib/storage'
import Form from './Form.vue'

export default {
  name: 'OPDGENBRCA',
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
    console.log('mounted')
    // $('.disable_ccp' + (storage.get('allowcopypaste') ? 'fc' : '')).bind('cut copy paste', e => {
    //   this.toastedError('Bạn không thể thực hiện thao tác này trên hệ thống!')
    //   return false
    // })
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
