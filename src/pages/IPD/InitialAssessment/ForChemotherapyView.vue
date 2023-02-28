<template>
  <Vcollapse @getData="getData()" ref="Vcollapse">
    <template slot='title'>
      {{FormV2 ? FormV2.title : __label(Form)}}
    </template>
    <template slot='info'>
      <span class="pull-right" style="padding: 8px;font-size: 14px;">{{__t('Chỉnh sửa lần cuối bởi')}} <AdInfo :ad="FormV2 ? FormV2.UpdatedBy : Form.UpdatedBy" /> {{__t('lúc')}} {{FormV2 ? FormV2.UpdateAt : getFTime(Form.UpdatedAt) }}</span>
    </template>
    <template slot='content' v-if="hasData" class=" no-padding">
      <ViewOnly :MASTERDATA="MASTERDATA"/>
      <div class="row">
        <div class="col-md-6 col-sm-6 text-center">
        </div>
        <div v-if="DataSubmit.VersionApp >= 11">
          <Confirm
            class="mt-10"
            :MasterDataCode="'FORCHEMOTHERAPYCONFIRM_USERCREATED'"
            :FormCode="'A02_011_080121_VE'"
            :ReadOnly="true"
            :AdInfo="[DataSubmit.CreatedBy]"
            :VisitId="_VisitId"
            :FormId="DataSubmit.InfoForChemotherapy.FormId"
            :saveSuccesss="saveSuccesss"
          />
        </div>
        <div v-else class="col-md-6 col-sm-6 text-center">
          <template v-if="DataSubmit.UpdatedAt && DataSubmit.UpdatedBy">
            <p>{{getFTime(DataSubmit.UpdatedAt)}}</p>
            <eform-signature :ad="DataSubmit.UpdatedBy.Username" :title="__t('Điều dưỡng thực hiện')" />
          </template>
        </div>
      </div>
      <div class="padding-15">
        <p>A02_011_080121_VE</p>
      </div>
      <p v-if="DataSubmit.VersionApp >= 11"  style="padding-left: 10px">
        {{ __t("Chỉnh sửa lần cuối bởi") }} <AdInfo
          v-if="DataSubmit.InfoForChemotherapy.UpdatedBy"
          :ad="DataSubmit.InfoForChemotherapy.UpdatedBy"
        /> {{ __t("lúc") }} {{ DataSubmit.InfoForChemotherapy.UpdatedAt | formatDateWithoutSecon }}
        </p>
    </template>
  </Vcollapse>
</template>
<script>
import MixinMasterData from '@/mixins/masterdata.js'
import MixinForm from '@/mixins/form.js'
import ViewOnly from '@/components/IPD/ForChemotherapyView.vue'
import InitialAssessment from '@/services/IPD/InitialAssessment'
import Confirm from '@/components/Form/Confirm'

import _ from 'lodash'
export default {
  name: 'IPDInitialAssessmentForChemotherapy',
  props: ['VisitId', 'Form', 'FormV2'],
  mixins: [MixinForm, MixinMasterData],
  data () {
    return {
      DataSubmit: {},
      hasData: false
    }
  },
  components: {
    ViewOnly, Confirm
  },
  watch: {
  },
  mounted () {
  },
  computed: {
  },
  methods: {
    getData () {
      this.getMasterDatas({Form: 'IPDIACP'}, () => {
        new InitialAssessment().find('ForChemotherapy/' + this.VisitId + '?hidemsg=' + true).then(response => {
          this.vcollapseHasData()
          this.DataSubmit = response
          this.loaded = true
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
                } else {
                  // if (code === 'IPDIAAULANGANS') {
                  //   item.Value = null
                  // }
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
