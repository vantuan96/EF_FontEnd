<template>
  <Vcollapse @getData="getData()" ref="Vcollapse">
    <template slot='title' v-if="Form">
      {{FormV2 ? FormV2.title : __label(Form)}}
    </template>
    <template slot='info' v-if="Form">
      <span class="pull-right" style="padding: 8px;font-size: 14px;">{{__t('Chỉnh sửa lần cuối bởi')}} <AdInfo :ad="FormV2 ? FormV2.UpdatedBy : Form.UpdatedBy" /> {{__t('lúc')}} {{FormV2 ? FormV2.UpdateAt : Form.UpdatedAt | formatDateWithoutSecon }}</span>
    </template>
    <template slot='content' v-if="hasData">
      <ForShortTermForm
        :DataSubmit="DataSubmit"
        :MASTERDATA="MASTERDATA"
        :VisitId="VisitId"
      />
      <br/>
      <p>A02_007_080121_VE</p>
    </template>
  </Vcollapse>
</template>
<script>
import InitialAssessment from '@/services/EOC/InitialAssessment'
import MixinMasterData from '@/mixins/masterdata.js'
import ForShortTermForm from '../OPD/ForShortTermForm'
export default {
  name: 'EOCInitialAssessmentForShortTerm',
  mixins: [MixinMasterData],
  props: ['VisitId', 'readonlyview', 'Form', 'FormV2'],
  data () {
    return {
      DataSubmit: {
        Data: []
      },
      collapseId: '',
      hasData: false
    }
  },
  components: {
    ForShortTermForm
  },
  computed: {
  },
  mounted () {
  },
  created () {
  },
  methods: {
    getData () {
      this.getMasterDatas({Form: 'OPDIAFSTOP', noLoading: true}, () => {
        new InitialAssessment({noLoading: true}).find('ForShortTerm/' + this.VisitId).then(response => {
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
