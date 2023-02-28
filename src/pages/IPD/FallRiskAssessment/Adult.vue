<template>
  <div class="">
    <table class="standing-order-tbl" v-if="data">
      <tr>
        <th v width="100" class="no-wrap">{{___t('Thời gian')}}</th>
        <th width="1" class="no-wrap">{{___t('Tổng điểm')}}</th>
        <th width="1" class="no-wrap">{{___t('Phân loại')}}</th>
        <th>{{___t('Can thiệp')}}</th>
        <th>{{___t('Điều dưỡng')}}</th>
        <th width="1"  class="no-wrap">{{___t('Chi tiết')}}</th>
      </tr>
      <template  v-for="(item, index) in data">
      <tr :key="index + '-root-tr'" :class="{'view-full': item.view}">
        <td style="vertical-align:top">{{item.CreatedAt}}</td>
        <td style="vertical-align:top">{{item.Total}}</td>
        <td style="vertical-align:top">{{LEVELS[item.Level]}}</td>
        <td style="vertical-align:top" class="no-padding"><Intervention :view="item.view" :Intervention="item.Intervention" /></td>
        <td style="vertical-align:top"><ad-Info v-if="item.CreatedBy" :ad="item.CreatedBy" /></td>
        <td style="vertical-align:top"><button class="btn btn-sm" @click="openMorse(item.Id)"><i class="fa fa-pencil-square-o" aria-hidden="true"></i> Chi tiết</button></td>
      </tr>
      <tr :key="index + '-action-tr'" v-if="item.showBtn" :class="{'view-full': item.view}">
        <td class="text-center" colspan="6" style="padding-top: 0">
          <button @click="showMore(item)" class="btn v-green-btn v-bottom-btn btn-swit-icon">
            <span class="span-down-cion">{{__t('Mở rộng')}}</span>
            <span class="span-up-cion">{{__t('Thu gọn')}}</span>
          </button>
        </td>
      </tr>
      </template>
    </table>
    <br/>
    <Morse :readonly="readonly" :formId="formId" ref="Morse"/>
    <br/>
    <br/>
    <div>
      <logs v-if="!readonly" :EdId="this.$route.params.Id" :Type="'FallRiskAssessment/Adult'" :noDetail="true" />
      <p>A02_048_301220_VE</p>
    </div>
  </div>
</template>
<script>
// import MortalityReport from '@/services/ED/MortalityReport'
import VDatePicker from '@/components/VDateTimePicker.vue'
import MixinForm from '@/mixins/form.js'
import Logs from '@/components/Logs.vue'
import Morse from './Morse.vue'
import MixinMasterData from '@/mixins/masterdata.js'
import Intervention from './Intervention.vue'
import FallRiskAssessment from '@/services/IPD/FallRiskAssessment'
// import $ from 'jquery'
// import _ from 'lodash'
// import moment from 'moment'
export default {
  name: 'FallRiskAssessmentAdultIndex',
  mixins: [MixinForm, MixinMasterData],
  props: ['readonly', 'VisitId'],
  data () {
    return {
      data: null,
      DataSubmit: {
      },
      formId: null,
      LEVELS: ['Thấp', 'Trung Bình', 'Cao']
    }
  },
  components: {
    VDatePicker, Logs, Morse, Intervention
  },
  mounted () {
    this.getData()
  },
  computed: {
    someThing: function () {
      return []
    }
  },
  methods: {
    showMore (item) {
      item.view = !item.view
    },
    openMorse (id) {
      this.$refs.Morse.open(id)
    },
    close () {
    },
    getData () {
      new FallRiskAssessment().find('Adult/' + this._VisitId).then(response => {
        response.forEach(e => {
          e.showBtn = (this.JSONParse(e.Intervention) || []).length > 3
          e.view = !e.showBtn
        })
        this.data = response
      }).catch(e => {
        // this._401ResponseError(e)
      })
    }
  }
}
</script>
