<template>
  <Vcollapse @getData="getData()" ref="Vcollapse">
    <template slot='title' v-if="Form">
      {{FormV2 ? FormV2.title : __label(Form)}}
    </template>
    <template slot='info' v-if="Form">
      <span class="pull-right" style="padding: 8px;font-size: 14px;">{{__t('Chỉnh sửa lần cuối bởi')}} <AdInfo :ad="FormV2 ? FormV2.UpdatedBy : Form.UpdatedBy" /> {{__t('lúc')}} {{pkFormat ? $options.filters.formatDateWithoutSecon(Form.UpdatedAt) : FormV2 ? FormV2.UpdateAt : Form.UpdatedAt }}</span>
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
import InitialAssessment from '@/services/OPD/InitialAssessment'
// import InitialAssessmentForm from '@/components/OPD/InitialAssessmentForm.vue'
import MixinMasterData from '@/mixins/masterdata.js'
import _ from 'lodash'
import VSelectBox from '@/components/VSelectDisplay.vue'
import ForOnGoingForm from './ForOnGoingForm.vue'
export default {
  name: 'OPDInitialAssessmentForOnGoing',
  mixins: [MixinMasterData],
  props: ['VisitId', 'readonlyview', 'Form', 'FormV2', 'pkFormat', 'VisitType'],
  components: {VSelectBox, ForOnGoingForm},
  data () {
    return {
      DataSubmit: {
        Data: []
      },
      ConfirmInfo: [],
      loaded: false,
      isNew: false,
      collapseId: '',
      open: false,
      hasData: false
    }
  },
  computed: {
    bmiCalculation: function () {
      var weight = this.MASTERDATA['OPDIAFSTOPWEI'].Items[0].Value ? parseFloat(this.MASTERDATA['OPDIAFSTOPWEI'].Items[0].Value) : 0
      var height = this.MASTERDATA['OPDIAFSTOPHEI'].Items[0].Value ? (parseFloat(this.MASTERDATA['OPDIAFSTOPHEI'].Items[0].Value) / 100) : 0
      return (weight / (height * height)).toFixed(2)
    }
  },
  mounted () {
  },
  created () {
  },
  methods: {
    select2Suggest (data) {
      var list = this.JSONParse(data)
      if (list) {
        return list.map(e => {
          e.id = e.value
          e.name = e.vilabel
          e.label = e.vilabel
          return e
        })
      } else {
        return []
      }
    },
    collapse () {
      this.open = !this.open
    },
    getData () {
      this.getMasterDatas({noLoading: true, Form: 'OPDIAFOGOP'}, () => {
        new InitialAssessment({noLoading: true}).find('ForOnGoing/' + this.VisitId).then(response => {
          this.hasData = true
          if (this.$refs.Vcollapse) {
            this.$refs.Vcollapse.setHasData()
          }
          if (!response.IsNew) {
            this.isNew = false
            this.loaded = true
            this.$emit('hasData', 'ForOnGoing')
            this.DataSubmit = response
            this.getConfirm(response.Id)
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
          } else {
            this.isNew = true
          }
        }).catch(e => {
          this.isNew = true
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
