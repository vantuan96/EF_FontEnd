<template>
  <Vcollapse @getData="getData()" ref="Vcollapse">
    <template slot='title' v-if="Form">
      {{FormV2 ? FormV2.title : __label(Form)}}
    </template>
    <template slot='info' v-if="Form">
      <span class="pull-right" style="padding: 8px;font-size: 14px;">{{__t('Chỉnh sửa lần cuối bởi')}} <AdInfo :ad="FormV2 ? FormV2.UpdatedBy : Form.UpdatedBy | formatDateWithoutSecon" /> {{__t('lúc')}}: {{pkFormat ? $options.filters.formatDateWithoutSecon(Form.UpdatedAt) : FormV2 ? FormV2.UpdateAt : Form.UpdatedAt }}</span>
    </template>
    <template slot='content' v-if="hasData">
      <TelehealthForm
        :DataSubmit="DataSubmit"
        :MASTERDATA="MASTERDATA"
        :VisitId="VisitId"
      />
      <br/>
      <p>A02_012_080121_VE</p>
    </template>
  </Vcollapse>
</template>
<script>
import InitialAssessment from '@/services/OPD/InitialAssessment'
import MixinMasterData from '@/mixins/masterdata.js'
import CommunicableDiseasesScreening from '@/components/CommunicableDiseasesScreening.vue'
import TelehealthForm from './TelehealthForm.vue'
import _ from 'lodash'
export default {
  name: 'OPDInitialAssessmentForTelehealth',
  mixins: [MixinMasterData],
  props: ['VisitId', 'readonlyview', 'Form', 'FormV2', 'pkFormat'],
  data () {
    return {
      DataSubmit: {
        Data: []
      },
      loaded: false,
      isNew: false,
      collapseId: '',
      open: false,
      hasData: false
    }
  },
  components: {
    CommunicableDiseasesScreening,
    TelehealthForm
  },
  computed: {
    bmiCalculation: function () {
      var weight = this.MASTERDATA['OPDIAFTPWEI'].Items[0].Value ? parseFloat(this.MASTERDATA['OPDIAFTPWEI'].Items[0].Value) : 0
      var height = this.MASTERDATA['OPDIAFTPHEI'].Items[0].Value ? (parseFloat(this.MASTERDATA['OPDIAFTPHEI'].Items[0].Value) / 100) : 0
      return (weight / (height * height)).toFixed(2)
    }
  },
  mounted () {
  },
  created () {
  },
  methods: {
    getData () {
      this.getMasterDatas({noLoading: true, Form: 'OPDIAFTP'}, () => {
        new InitialAssessment({noLoading: true}).find('ForTelehealth/' + this.VisitId + '?hidemsg=' + true).then(response => {
          this.hasData = true
          if (this.$refs.Vcollapse) {
            this.$refs.Vcollapse.setHasData()
          }
          this.isNew = false
          this.loaded = true
          // this.$emit('hasData', 'ForShortTerm')
          this.DataSubmit = response
          for (const property in this.MASTERDATA) {
            if (this.MASTERDATA[property].Items) {
              this.MASTERDATA[property].Items.forEach(item => {
                var code = item.Code
                var exited = _.find(this.DataSubmit.Datas, {Code: code})
                if (exited) {
                  if (this.checkString(item.DataType, 'CheckBox') || this.checkString(item.DataType, 'Radio')) {
                    var isTrue = (exited.Value === 'True')
                    item.Value = isTrue
                  } else {
                    item.Value = exited.Value
                  }
                }
              })
            }
          }
        })
      })
    }
  }
}
</script>
