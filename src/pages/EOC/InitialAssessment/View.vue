<template>
  <div class="disable_ccp">
    <div :key="index" v-for="(form, index) in Forms" class="mb-10">
      <div v-if="form.Datas && form.Datas.length">
        <component v-if="form.Type in $options.components" :Form="form" v-bind:is="form.Type" :VisitId="$route.params.Id" :VisitType="VisitType"/>
      </div>
    </div>
  </div>
</template>
<script>
import MedicalRecord from '@/services/MedicalRecord.js'
import InitialAssessmentForShortTerm from '@/components/EOC/ForShortTerm.vue'
import InitialAssessmentForOnGoing from '@/components/EOC/ForOnGoing.vue'
// import FallRiskScreening from '@/components/OPD/FallRiskScreen.vue'
import StandingOrder from '@/pages/StandingOrder/View.vue'
import PatientProgressNote from '@/pages/ProgressNote/View.vue'
export default {
  name: 'InitialAssessmentView',
  props: ['OpdId', 'VisitType'],
  components: {
    InitialAssessmentForShortTerm,
    InitialAssessmentForOnGoing,
    StandingOrder,
    PatientProgressNote
  },
  data () {
    return {
      Forms: []
    }
  },
  computed: {
  },
  mounted () {
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      new MedicalRecord().find('EOC/' + this.$route.params.Id).then(response => {
        this.Forms = response
      })
    }
  }
}
</script>
