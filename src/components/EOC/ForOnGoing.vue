<template>
  <Vcollapse @getData="getData()" ref="Vcollapse">
    <template slot='title' v-if="Form">
      {{FormV2 ? FormV2.title : __label(Form)}}
    </template>
    <template slot='info' v-if="Form">
      <span class="pull-right" style="padding: 8px;font-size: 14px;">{{__t('Chỉnh sửa lần cuối bởi')}} <AdInfo :ad="FormV2 ? FormV2.UpdatedBy : Form.UpdatedBy" /> {{__t('lúc')}} {{FormV2 ? FormV2.UpdateAt : Form.UpdatedAt }}</span>
    </template>
    <template slot='content' v-if="hasData">
      <!-- <initial-assessment-form :readonly="true" v-if="DataSubmit.InitialAssessmentForm" v-model="DataSubmit.InitialAssessmentForm" /> -->
      <ForOnGoingForm
        :DataSubmit="DataSubmit"
        :MASTERDATA="MASTERDATA"
        :VisitId="VisitId"
        :ConfirmInfo="ConfirmInfo"
        :VisitType="VisitType"
      />
      <br/>
      <p>A02_008_080121_VE</p>
    </template>
  </Vcollapse>
</template>
<script>
import ConfirmForms from '@/services/ConfirmForms'
import InitialAssessment from '@/services/EOC/InitialAssessment'
// import InitialAssessmentForm from '@/components/OPD/InitialAssessmentForm.vue'
import MixinMasterData from '@/mixins/masterdata.js'
import VSelectBox from '@/components/VSelectDisplay.vue'
import ForOnGoingForm from '../OPD/ForOnGoingForm.vue'
export default {
  name: 'EOCInitialAssessmentForOnGoing',
  mixins: [MixinMasterData],
  props: ['VisitId', 'readonlyview', 'Form', 'FormV2', 'VisitType'],
  components: {VSelectBox, ForOnGoingForm},
  data () {
    return {
      DataSubmit: {
        Data: []
      },
      collapseId: '',
      open: false,
      hasData: false,
      ConfirmInfo: []
    }
  },
  computed: {
  },
  mounted () {
  },
  created () {
  },
  methods: {
    collapse () {
      this.open = !this.open
    },
    getData () {
      this.getMasterDatas({noLoading: true, Form: 'OPDIAFOGOP'}, () => {
        new InitialAssessment({noLoading: true}).find('ForOnGoing/' + this.VisitId).then(response => {
          if (this.$refs.Vcollapse) {
            this.$refs.Vcollapse.setHasData()
          }
          this.$emit('hasData', 'ForShortTerm')
          this.DataSubmit = response
          this.getConfirm(response.Id)
          this.mapMdData2Data()
          this.hasData = true
        })
      })
    },
    getConfirm (FormId) {
      new ConfirmForms().find('GetList' + '/' + FormId).then(response => {
        this.ConfirmInfo = response
      }).catch((e) => {
        console.log(e)
      })
    }
  }
}
</script>
