<template>
  <Vcollapse @getData="getData()" ref="Vcollapse">
    <template slot='title'>
      {{FormV2 ? FormV2.title : __label(Form)}}
    </template>
    <template slot='info'>
      <span v-if="Form" class="pull-right" style="padding: 8px;font-size: 14px;">{{__t('Chỉnh sửa lần cuối bởi')}} <AdInfo :ad="FormV2 ? FormV2.UpdatedBy : Form.UpdatedBy" /> {{__t('lúc')}} {{FormV2 ? getFTime(FormV2.UpdateAt) : getFTime(Form.UpdatedAt)}}</span>
    </template>
    <template slot='content' v-if="hasData">
      <ThrombosisRiskFactorAssessmentForGSP :viewOnly="true" :VisitId="_VisitId"/>
    </template>
  </Vcollapse>
</template>
<script>
import ThrombosisRiskFactorAssessmentForGSP from './Index.vue'

export default {
  name: 'IPDThrombosisRiskFactorAssessmentFor',
  props: ['VisitId', 'Form', 'VisitType', 'FormV2'],
  mixins: [],
  data () {
    return {
      hasData: false
    }
  },
  components: {
    ThrombosisRiskFactorAssessmentForGSP
  },
  methods: {
    getData () {
      this.hasData = true
      if (this.$refs.Vcollapse) {
        this.$refs.Vcollapse.setHasData()
      }
    }
  }
}
</script>
