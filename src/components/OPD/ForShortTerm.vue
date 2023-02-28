<template>
  <Vcollapse @getData="getData()" ref="Vcollapse">
    <template slot='title' v-if="Form">
      {{FormV2 ? FormV2.title : __label(Form)}}
    </template>
    <template slot='info' v-if="Form">
      <span class="pull-right" style="padding: 8px;font-size: 14px;">{{__t('Chỉnh sửa lần cuối bởi')}} <AdInfo :ad="FormV2 ? FormV2.UpdatedBy : Form.UpdatedBy" /> {{__t('lúc')}} {{pkFormat ? $options.filters.formatDateWithoutSecon(Form.UpdatedAt) : FormV2 ? FormV2.UpdateAt : Form.UpdatedAt }}</span>
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
import InitialAssessment from '@/services/OPD/InitialAssessment'
import MixinMasterData from '@/mixins/masterdata.js'
import ForShortTermForm from './ForShortTermForm'
import _ from 'lodash'
export default {
  name: 'OPDInitialAssessmentForShortTerm',
  mixins: [MixinMasterData],
  props: ['VisitId', 'readonlyview', 'Form', 'pkFormat', 'FormV2'],
  data () {
    return {
      DataSubmit: {
        Data: []
      },
      loaded: false,
      isNew: false,
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
        new InitialAssessment({noLoading: true}).find('ForShortTerm/' + 'A02_007_080121_VE/' + this.VisitId).then(response => {
          this.hasData = true
          if (this.$refs.Vcollapse) {
            this.$refs.Vcollapse.setHasData()
          }
          if (!response.IsNew) {
            this.isNew = false
            this.loaded = true
            this.$emit('hasData', 'ForShortTerm')
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
          } else {
            this.isNew = true
          }
        }).catch(e => {
          this.isNew = true
        })
      })
    }
  }
}
</script>
