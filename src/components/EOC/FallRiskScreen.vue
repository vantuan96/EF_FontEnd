<template>
  <Vcollapse @getData="getData()" ref="Vcollapse">
    <template slot='title'>
      {{__label(Form)}}
    </template>
    <template slot='info'>
      <span class="pull-right" style="padding: 8px;font-size: 14px;">{{__t('Chỉnh sửa lần cuối bởi')}} <AdInfo :ad="Form.UpdatedBy" /> {{__t('lúc')}} {{Form.UpdatedAt}}</span>
    </template>
    <template slot='content' v-if="hasData">
      <ViewOnly :MASTERDATA="MASTERDATA" :options="Clinics"/>
    </template>
  </Vcollapse>
</template>
<script>
import MixinMasterData from '@/mixins/masterdata.js'
import InitialAssessment from '@/services/EOC/InitialAssessment'
import ViewOnly from '../OPD/FallRiskScreenView.vue'
export default {
  name: 'FallRiskScreen',
  mixins: [MixinMasterData],
  props: ['VisitId', 'Form'],
  components: {ViewOnly},
  data () {
    return {
      hasData: false,
      YESNO: ['Không', 'Có'],
      CHECKED: ['&#9745;', '&#9744;'],
      DataSubmit: {}
    }
  },
  created () {
  },
  computed: {
  },
  methods: {
    getData () {
      this.getMasterDatas({Form: 'OPDFRSFOP'}, () => {
        this.getClinics()
        new InitialAssessment().find('FallRiskScreening/' + this.VisitId).then(response => {
          if (this.$refs.Vcollapse) {
            this.$refs.Vcollapse.setHasData()
          }
          this.$emit('hasData', 'ForShortTerm')
          this.DataSubmit = response
          this.mapMdData2Data()
          this.hasData = true
        })
      })
    }
  }
}
</script>
