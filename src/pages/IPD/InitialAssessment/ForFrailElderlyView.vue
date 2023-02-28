<template>
  <Vcollapse @getData="getData()" ref="Vcollapse">
    <template slot='title'>
      {{FormV2 ? FormV2.title : __label(Form)}}
    </template>
    <template slot='info'>
      <span class="pull-right" style="padding: 8px;font-size: 14px;">{{__t('Chỉnh sửa lần cuối bởi')}} <AdInfo :ad="FormV2 ? FormV2.UpdatedBy : Form.UpdatedBy" /> {{__t('lúc')}} {{FormV2 ? FormV2.UpdateAt : getFTime(Form.UpdatedAt) }}</span>
    </template>
    <template slot='content' v-if="hasData" class=" no-padding">
      <ViewOnly :MASTERDATA="MASTERDATA" />
      <br/><br/>
      <div class="row">
        <div class="col-md-6 col-sm-6 text-center">
        </div>
        <div class="col-md-6 col-sm-6 text-center">
          <template v-if="DataSubmit.UpdatedAt && DataSubmit.UpdatedBy">
            <p>{{getFTime(DataSubmit.UpdatedAt)}}</p>
            <eform-signature :ad="DataSubmit.UpdatedBy.Username" :title="__t('Điều dưỡng thực hiện')" />
          </template>
        </div>
      </div>
      <br/><br/>
      <div class="row">
        <div class="col-md-6 col-sm-6 text-center">
        </div>
        <!-- <div class="col-md-6 col-sm-6 text-center">
          <template v-if="DataSubmit.UpdatedAt && DataSubmit.UpdatedBy">
            <p>{{DataSubmit.UpdatedAt}}</p>
            <eform-signature :ad="DataSubmit.UpdatedBy.Username" :title="__t('Điều dưỡng thực hiện')" />
          </template>
        </div> -->
        <div v-if="DataSubmit.VersionApp >= 11">
          <Confirm
            class="mt-10"
            :MasterDataCode="'FORFRAILELDERLYCONFIRM_USERCREATED'"
            :FormCode="'A03_012_080121_VE'"
            :ReadOnly="true"
            :AdInfo="[DataSubmit.CreatedBy]"
            :VisitId="_VisitId"
            :FormId="DataSubmit.InfoForFrailElderly.FormId"
            :saveSuccesss="saveSuccesss"
          />
        </div>
        </div>
        <br/>
        <br/>
        <div style="padding-left: 10px">
          <p v-if="DataSubmit.VersionApp >= 2">A03_012_080121_VE</p>
          <p v-else>A03_012_080121_V</p>
        </div>
        <p v-if="DataSubmit.VersionApp >= 11"  style="padding-left: 10px">
        {{ __t("Chỉnh sửa lần cuối bởi") }} <AdInfo
          v-if="DataSubmit.InfoForFrailElderly.UpdatedBy"
          :ad="DataSubmit.InfoForFrailElderly.UpdatedBy"
        /> {{ __t("lúc") }} {{ DataSubmit.InfoForFrailElderly.UpdatedAt | formatDateWithoutSecon }}
        </p>
    </template>
  </Vcollapse>
</template>
<script>
import MixinMasterData from '@/mixins/masterdata.js'
import MixinForm from '@/mixins/form.js'
import V2Select from '@/components/VSelectDisplay.vue'
import ViewOnly from '@/components/IPD/ForFrailElderlyView.vue'
import InitialAssessment from '@/services/IPD/InitialAssessment'
import Confirm from '@/components/Form/Confirm'
import _ from 'lodash'
export default {
  name: 'IPDInitialAssessmentForFrailElderly',
  props: ['VisitId', 'Form', 'FormV2'],
  mixins: [MixinForm, MixinMasterData],
  data () {
    return {
      DataSubmit: {},
      hasData: false
    }
  },
  components: {
    V2Select,
    ViewOnly,
    Confirm
  },
  watch: {
  },
  mounted () {
  },
  computed: {
  },
  methods: {
    getData () {
      this.getMasterDatas({Form: 'IPDIAFE'}, () => {
        new InitialAssessment().find('ForFrailElderly/' + this.VisitId + '?hidemsg=' + true).then(response => {
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
