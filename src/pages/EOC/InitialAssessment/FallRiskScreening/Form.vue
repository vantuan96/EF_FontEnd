<template>
  <div v-if="loaded">
    <ItemV1 v-if="DataSubmit && DataSubmit.Version === 1" :ViewOnly="ViewOnly" :VisitId="VisitId" :VisitType="VisitType" :formId="_ItemId"/>
    <ItemV2 v-else :ViewOnly="ViewOnly" :VisitId="VisitId" :VisitType="VisitType" :formId="_ItemId"/>
    <!-- <ItemV2 :ViewOnly="ViewOnly" :VisitId="VisitId" :VisitType="VisitType" :formId="_ItemId"/> -->
  </div>
</template>
<script>
import InitialAssessment from '@/services/EOC/InitialAssessment'
import ItemV1 from '@/pages/EOC/InitialAssessment/FallRiskScreening.vue'
import ItemV2 from './ItemV2.vue'
export default {
  name: 'EOCInitialAssessmentFallRiskScreeningItem',
  props: ['ViewOnly', 'VisitId', 'VisitType', 'formId'],
  components: {ItemV1, ItemV2},
  data () {
    return {
      loaded: false,
      FormCode: 'A02_007_220321_VE',
      DataSubmit: {}
    }
  },
  created () {
    this.getData()
  },
  watch: {
    formId: {
      handler () {
        this.getData()
      }
    }
  },
  computed: {
    _ItemId: function () {
      return this.$route.params.Item || this.formId
    }
  },
  methods: {
    getData () {
      new InitialAssessment().find('/FallRiskScreening/' + this.FormCode + '/' + this._VisitId + '/' + this._ItemId).then(response => {
        this.DataSubmit = response
        this.loaded = true
      }).catch(e => {
        if (e.status === 400) {
          this._404()
        }
        this.loaded = true
      })
    }
  }
}
</script>
