<template>
  <div id="NCCNBROV1-Page" class="main-content disable_ccp">
    <h3 class="text-center cap mrb30 fw600">{{__t('Phiếu đánh giá nguy cơ di truyền trong sàng lọc ung thư vú')}}</h3>
    <div class="content-body">
      <Form :VisitId="VisitId" @hiddenLog="setHiddenLog" :viewOnly="viewOnly" @TimeLog="getTimeLog"/>
    </div>
     <div>
      <p class="mt-10">A01_201_201119_V</p>
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
  name: 'NCCNBROV1',
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
