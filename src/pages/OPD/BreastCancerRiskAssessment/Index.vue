<template>
  <div id="NCCNBROV1-Page" class="main-content disable_ccp">
    <h3 class="text-center cap mrb30 fw600">{{__t('Phiếu thông tin khách hàng - Đánh giá nguy cơ ung thư')}}</h3>
    <div class="content-body">
      <Form :VisitId="VisitId" @hiddenLog="setHiddenLog" :viewOnly="viewOnly" @TimeLog="getTimeLog"/>
    </div>
     <div>
      <p class="mt-10">A03_115_200520_V</p>
    </div>
    <div v-if="hiddenLog">
      <p>{{__t('Chỉnh sửa lần cuối bởi')}} <AdInfo v-if="timeLog" :ad="timeLog[1]" /> {{__t('lúc')}} {{ timeLog[0] }}</p>
    </div>
  </div>
</template>
<script>
import Form from './Form.vue'

export default {
  name: 'BreastCancerRiskAssessment',
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
