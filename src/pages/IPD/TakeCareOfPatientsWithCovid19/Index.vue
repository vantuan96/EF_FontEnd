<template>
  <div class="main-content">
    <h2 class="text-center font-bold font28">{{__t('Phiếu chăm sóc người bệnh Covid-19')}}</h2>
    <h3>{{__t('Đánh giá người bệnh:')}}</h3>
    <Assessment :VisitId="_VisitId" :VisitType="_VisitType" :readonly="readonly"/>
    <hr/>
    <h3>{{__t('Những lưu ý khi bàn giao ca:')}}</h3>
    <Recomment :VisitId="_VisitId" :VisitType="_VisitType" :readonly="readonly"/>
    <div>
      <p>A02_009_310821_V_VMCP</p>
      <!-- <logs :EdId="this.$route.params.Id" :Type="'TakeCareOfPatientsWithCovid19'" :noDetail="true" /> -->
    </div>
  </div>
</template>
<script>
import Assessment from './Assessment/Index.vue'
import Recomment from './Recomment/Index.vue'
export default {
  name: 'TakeCareOfPatientsWithCovid19Index',
  props: ['VisitId', 'VisitType', 'readonly'],
  mixins: [],
  data () {
    return {
    }
  },
  components: {
    Assessment,
    Recomment
  }
}
</script>
