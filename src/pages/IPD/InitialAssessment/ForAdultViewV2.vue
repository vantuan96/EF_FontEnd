<template>
  <Vcollapse @getData="getData()" ref="Vcollapse" class="disable_ccp4">
    <template slot='title'>
      {{FormV2 ? FormV2.title : __label(Form)}}
    </template>
    <template slot='info'>
      <span class="pull-right" style="padding: 8px;font-size: 14px;">{{__t('Chỉnh sửa lần cuối bởi')}} <AdInfo :ad="FormV2 ? FormV2.UpdatedBy : Form.UpdatedBy" /> {{__t('lúc')}} {{FormV2 ? FormV2.UpdateAt :  Form.UpdatedAt}}</span>
    </template>
    <template slot='content' v-if="hasData" class=" no-padding">
      <ViewOnly :MASTERDATA="MASTERDATA" :DataSubmit="DataSubmit" />
      <!-- <ViewOnlyChild v-else :MASTERDATA="MASTERDATA" :DataSubmit="DataSubmit" /> -->
    </template>
  </Vcollapse>
</template>
<script>
import MixinMasterData from '@/mixins/masterdata.js'
// import MixinForm from '@/mixins/form.js'
import ViewOnly from '@/components/IPD/ForAdultViewcheckV2.vue'
import ViewOnlyChild from '@/components/IPD/ForChildView.vue'
import InitialAssessment from '@/services/IPD/InitialAssessment'
import _ from 'lodash'
import $ from 'jquery'
import storage from '@/lib/storage'
export default {
  name: 'IPDInitialAssessmentForAudult',
  props: ['VisitId', 'Form', 'FormV2'],
  mixins: [MixinMasterData],
  data () {
    return {
      DataSubmit: {},
      hasData: false
    }
  },
  components: {
    ViewOnly,
    ViewOnlyChild
  },
  watch: {
  },
  mounted () {
    $('.disable_ccp4' + (storage.get('allowcopypaste') ? 'fc' : '')).bind('cut copy paste', e => {
      this.toastedError('Bạn không thể thực hiện thao tác này trên hệ thống!')
      return false
    })
  },
  computed: {
  },
  methods: {
    getData () {
      var formCode = 'A02_013_220321_VE'

      this.getMasterDatas({Form: 'IPDIAAU'}, () => {
        console.log('id', this.VisitId)
        new InitialAssessment().find('ForAdult/' + formCode + '/' + this.VisitId + '?hidemsg=' + true).then(response => {
          this.vcollapseHasData()
          this.DataSubmit = response
          for (const property in this.MASTERDATA) {
            if (this.MASTERDATA[property].Items) {
              this.MASTERDATA[property].Items.forEach(item => {
                var code = item.Code
                var exited = _.find(this.DataSubmit.Datas, {Code: code})
                if (exited) {
                  if (code === 'IPDIAAUPASCANS') exited.Value = this.parseInt(exited.Value)
                  if (this.checkString(item.DataType, 'CheckBox') || this.checkString(item.DataType, 'Radio')) {
                    var isTrue = (exited.Value === 'True')
                    item.Value = isTrue
                  } else {
                    item.Value = exited.Value
                  }
                } else {
                  if (code === 'IPDIAAULANGANS') {
                    item.Value = null
                  }
                }
              })
            }
          }
          this.edited = false
        }).catch(e => {
          this.edited = false
        })
      })
    }
  }
}
</script>
