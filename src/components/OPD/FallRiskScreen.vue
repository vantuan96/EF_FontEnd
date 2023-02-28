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
import InitialAssessment from '@/services/OPD/InitialAssessment'
import ViewOnly from './FallRiskScreenView.vue'
import _ from 'lodash'
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
    hasInitialAssessment: function () {
      var list = [
        ...(this.MASTERDATA['OPDFRSFOPDPH'] ? this.MASTERDATA['OPDFRSFOPDPH'].Items : []),
        ...(this.MASTERDATA['OPDFRSFOPDPN'] ? this.MASTERDATA['OPDFRSFOPDPN'].Items : []),
        ...(this.MASTERDATA['OPDFRSFOPHPF'] ? this.MASTERDATA['OPDFRSFOPHPF'].Items : []),
        ...(this.MASTERDATA['OPDFRSFOPUTH'] ? this.MASTERDATA['OPDFRSFOPUTH'].Items : [])
      ]
      return list.find(e => e.Value === '1')
    },
    OPDFRSFOPGCS: function () {
      return parseFloat(this.MASTERDATA['OPDFRSFOPEYE'].Items[0].Value || 0) + parseFloat(this.MASTERDATA['OPDFRSFOPVOI'].Items[0].Value || 0) + parseFloat(this.MASTERDATA['OPDFRSFOPMOV'].Items[0].Value || 0)
    },
    bmiCalculation: function () {
      var weight = parseFloat(this.MASTERDATA['OPDFRSFOPWEI'].Items[0].Value)
      var height = parseFloat(this.MASTERDATA['OPDFRSFOPHEI'].Items[0].Value) / 100
      return (weight / (height * height)).toFixed(2)
    }
  },
  methods: {
    getData () {
      this.getMasterDatas({Form: 'OPDFRSFOP'}, () => {
        this.getClinics()
        new InitialAssessment().find('FallRiskScreening/' + this.VisitId).then(response => {
          this.DataSubmit = response
          this.hasData = true
          if (this.$refs.Vcollapse) {
            this.$refs.Vcollapse.setHasData()
          }
          for (const property in this.MASTERDATA) {
            if (this.MASTERDATA[property].Items) {
              this.MASTERDATA[property].Items.forEach(item => {
                var code = item.Code
                var exited = _.find(response.Datas, {Code: code})
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
