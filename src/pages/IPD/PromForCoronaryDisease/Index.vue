<template>
  <div id="AdultVitalSigns-Page" class="main-content disable_ccp adult_vital_signs">
    <h3 class="text-center cap mrb30 fw600">{{__t('PROM bệnh nhân mạch vành')}}</h3>
    <div class="content-body">
      <Item :viewOnly="viewOnly" :VisitId="VisitId" :VisitType="VisitType"/>
    </div>
     <div>
      <p></p>
    </div>
  </div>
</template>
<script>
import Item from './Item.vue'

export default {
  name: 'PromForCoronaryDiseaseIndex',
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
  },
  computed: {
  },
  methods: {
    submit () {
    }
  }
}
</script>
<style scoped>
</style>
