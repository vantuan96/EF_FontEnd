<template>
  <div id="PreAnesthesiaConsultation-Page" class="main-content disable_ccp">
    <initial-assessment v-if="!viewOnly" :VisitId="$route.params.Id"  :pkFormat="true"/>
    <h3 class="text-center cap mrb30 fw600">{{__t('Phiếu khám gây mê')}}</h3>
    <div class="content-body">
      <Item :VisitId="VisitId" @hiddenLog="setHiddenLog" :viewOnly="viewOnly" @TimeLog="getTimeLog"/>
    </div>
     <!-- <div>
      <p class="mt-10">A03_034_200520_VE</p>
    </div>
    <div v-if="hiddenLog">
      <p>{{__t('Chỉnh sửa lần cuối bởi')}} <AdInfo v-if="timeLog" :ad="timeLog[1]" /> {{__t('lúc')}} {{ timeLog[0] }}</p>
    </div> -->
  </div>
</template>
<script>
import Item from './Item.vue'
import InitialAssessment from '@/pages/OPD/InitialAssessment/View.vue'
export default {
  name: 'PreAnesthesiaConsultation',
  props: ['viewOnly', 'VisitId'],
  data () {
    return {
      timeLog: [],
      hiddenLog: false
    }
  },
  mixins: [],
  components: {
    Item, InitialAssessment
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
