<template>
  <div class="ed-info box-collapse" :class="{'open': open}">
    <div class="ed-customer-title">
      <b>{{__t('Đánh giá kết thúc')}}</b>
      <router-link :to="{name: 'ED-DI0', params: { Id: EdId }}" class="pull-right" v-if="!readonlyview">
        <span class="glyphicon glyphicon-pencil"></span>
      </router-link>
    </div>
    <div class="box-collapse-content content-view">
      <div class="row" v-if="DataSubmit">
        <div class="col-md-12">
          <div class="form-group">
            <label required>{{__t('Thời gian đánh giá')}}: </label>
            {{DataSubmit.AssessmentAt}}
          </div>
        </div>
      </div>
      <div class="form-group" v-if="MASTERDATA['DI0RPT']">
        <p><label>{{MASTERDATA['DI0RPT'].ViName}}: </label><template v-for="item in MASTERDATA['DI0RPT'].Items" v-if="!item.IsReadOnly">{{'\n' + item.Value}}</template></p>
      </div>
      <div class="form-group" v-if="MASTERDATA['DI0DIA']">
        <p><label>{{MASTERDATA['DI0DIA'].ViName}}: </label><template v-for="(item,index) in MASTERDATA['DI0DIA'].Items"><span :data="item" :key="index" v-if="item.DataType === 'Text'"> {{item.Value}}</span></template></p>
        <div><template v-for="(item,index) in MASTERDATA['DI0DIA'].Items"><p :data="item" :key="index" v-if="item.DataType === 'ICD10'"><b>{{__label(item)}}:</b> {{getICD10(item.Value)}}</p></template></div>
      </div>
      <div class="form-group" v-if="MASTERDATA['DI0TAP']">
        <p><label>{{MASTERDATA['DI0TAP'].ViName}}: </label><template  v-for="item in MASTERDATA['DI0TAP'].Items"> {{item.Value}}</template></p>
      </div>
      <div class="form-group" v-if="MASTERDATA['DI0SM0']">
        <p><label>{{MASTERDATA['DI0SM0'].ViName}}: </label><template  v-for="item in MASTERDATA['DI0SM0'].Items" v-if="!item.IsReadOnly"> {{item.Value}}</template></p>
      </div>
      <div class="form-group" v-if="MASTERDATA['DI0CS0']">
        <p><label>{{MASTERDATA['DI0CS0'].ViName}}: </label><template v-for="item in MASTERDATA['DI0CS0'].Items"> {{item.Value}}</template></p>
      </div>
      <div class="form-group" v-if="MASTERDATA['DI0FCP']">
        <p><label>{{MASTERDATA['DI0FCP'].ViName}}: </label><template  v-for="item in MASTERDATA['DI0FCP'].Items"> {{item.Value}}</template></p>
      </div>
      <template v-if="DataSubmit.Status && DataSubmit.Status.EnName === 'Inter-hospital transfer'">
        <div class="form-group" v-if="MASTERDATA['DI0RH0']">
          <p><label>{{MASTERDATA['DI0RH0'].ViName}}: </label><template  v-for="item in MASTERDATA['DI0RH0'].Items"> {{item.Value}}</template></p>
        </div>
        <div class="form-group" v-if="MASTERDATA['DI0RFT']">
          <p><label>{{MASTERDATA['DI0RFT'].ViName}}: </label><template  v-for="item in MASTERDATA['DI0RFT'].Items"> {{item.Value}}</template></p>
        </div>
        <div class="form-group" v-if="MASTERDATA['DI0NRH']">
          <p><label>{{MASTERDATA['DI0NRH'].ViName}}: </label><template  v-for="item in MASTERDATA['DI0NRH'].Items"> {{item.Value}}</template></p>
        </div>
        <div class="form-group" v-if="MASTERDATA['DI0TM0']">
          <p><label>{{MASTERDATA['DI0TM0'].ViName}}: </label><template  v-for="item in MASTERDATA['DI0TM0'].Items"> {{item.Value}}</template></p>
        </div>
        <div class="form-group" v-if="MASTERDATA['DI0NAT']">
          <p><label>{{MASTERDATA['DI0NAT'].ViName}}: </label><template  v-for="item in MASTERDATA['DI0NAT'].Items"> {{item.Value}}</template></p>
        </div>
      </template>
      <template v-if="DataSubmit.Status && DataSubmit.Status.EnName === 'Upstream/Downstream transfer'">
        <div class="form-group" v-if="MASTERDATA['DI0RH1']">
          <p><label>{{MASTERDATA['DI0RH1'].ViName}}: </label><template  v-for="item in MASTERDATA['DI0RH1'].Items"> {{item.Value}}</template></p>
        </div>
        <div class="form-group" v-if="MASTERDATA['DI0MTU']">
          <p><label>{{MASTERDATA['DI0MTU'].ViName}}: </label><template  v-for="item in MASTERDATA['DI0MTU'].Items"> {{item.Value}}</template></p>
        </div>
        <div class="form-group" v-if="MASTERDATA['DI0PS0']">
          <p><label>{{MASTERDATA['DI0PS0'].ViName}}: </label><template  v-for="item in MASTERDATA['DI0PS0'].Items"> {{item.Value}}</template></p>
        </div>
        <div class="form-group" v-if="MASTERDATA['DI0RFT1']">
          <p><label>{{MASTERDATA['DI0RFT1'].ViName}}: </label> {{__label(getMDRadioValue(MASTERDATA['DI0RFT1'].Items))}}</p>
        </div>
        <div class="form-group" v-if="MASTERDATA['DI0TM1']">
          <p><label>{{MASTERDATA['DI0TM1'].ViName}}: </label><template  v-for="item in MASTERDATA['DI0TM1'].Items"> {{item.Value}}</template></p>
        </div>
        <div class="form-group" v-if="MASTERDATA['DI0NTM']">
          <p><label>{{MASTERDATA['DI0NTM'].ViName}}: </label><template  v-for="item in MASTERDATA['DI0NTM'].Items"> {{item.Value}}</template></p>
        </div>
        <div class="form-group" v-if="MASTERDATA['DI0TD0']">
          <p><label>{{MASTERDATA['DI0TD0'].ViName}}: </label><template  v-for="item in MASTERDATA['DI0TD0'].Items"> {{item.Value}}</template></p>
        </div>
      </template>
      <template v-if="DataSubmit.Status && DataSubmit.Status.EnName === 'Admitted'">
        <div class="form-group" v-if="MASTERDATA['DI0RFA']">
          <p><label>{{MASTERDATA['DI0RFA'].ViName}}: </label><template  v-for="item in MASTERDATA['DI0RFA'].Items"> {{item.Value}}</template></p>
        </div>
        <div class="form-group" v-if="MASTERDATA['DI0REC1']">
          <p><label>{{MASTERDATA['DI0REC1'].ViName}}: </label><template v-for="(item, index) in MASTERDATA['DI0REC1'].Items"><v-select :data="item" :key="index" :search="true" class="full-w select-boox-full-w" v-model="item.Value" :items="getMDSPECIALITIESs"/></template></p>
        </div>
      </template>
      <template v-if="DataSubmit.Status && DataSubmit.Status.EnName === 'Transfer to OPD'">
        <div class="form-group" v-if="MASTERDATA['DI0RFT2']">
          <p><label>{{MASTERDATA['DI0RFT2'].ViName}}: </label><template  v-for="item in MASTERDATA['DI0RFT2'].Items"> {{item.Value}}</template></p>
        </div>
        <div class="form-group" v-if="MASTERDATA['DI0REC2']">
          <p><label>{{MASTERDATA['DI0REC2'].ViName}}: </label><template v-for="(item, index) in MASTERDATA['DI0REC2'].Items"><v-select :data="item" :key="index" :search="true" class="full-w select-boox-full-w" v-model="item.Value" :items="getMDSPECIALITIESs"/></template></p>
        </div>
      </template>
      <div class="form-group" v-if="DataSubmit.Status">
        <label>{{__t('Trạng thái')}}: </label> {{__label(DataSubmit.Status)}}
      </div>
    </div>
    <div class="box-action" @click="collapse()">
      <span class="show-down link-text"><i class="fa fa-angle-double-down"></i></span>
      <span class="hide-up link-text"><i class="fa fa-angle-double-up"></i></span>
    </div>
  </div>
</template>
<script>
/* ============
 * DI0 Page vi sao đặt tên là DI0 hỏi dungnv53
 * ============
 */
import MixinMasterData from '@/mixins/masterdata.js'
import DischargeInformation from '@/services/ED/DischargeInformation'
import VSelect from '@/components/VSelectDisplay.vue'
// import IAMProxy from '@/services/IAMProxy'
import _ from 'lodash'
// import NProgress from 'nprogress'
export default {
  /**
   * The name of the page.
   */
  props: ['EdId', 'readonlyview'],
  name: 'v-di0',
  mixins: [MixinMasterData],
  data () {
    return {
      open: false,
      DataSubmit: {}
    }
  },
  /**
   * The components that the page can use.
   */
  components: {
    VSelect
  },
  mounted () {
    this.getSpecialities()
    this.getMasterDatas({Form: 'DI0'}, () => {
      this.getData()
    })
  },
  computed: {
    getMDSPECIALITIESs: function () {
      var status = ''
      if (this.DataSubmit.Status) {
        status = this.DataSubmit.Status.EnName === 'Admitted' ? 'IPD' : 'OPD'
      }
      return this.MDSPECIALITIES.filter(e => {
        return e.VisitTypeGroup === status
      })
    }
  },
  methods: {
    getData () {
      new DischargeInformation().find(this.$route.params.Id).then(response => {
        this.DataSubmit = response
        for (const property in this.MASTERDATA) {
          if (this.MASTERDATA[property].Items) {
            this.MASTERDATA[property].Items.forEach(item => {
              var code = item.Code
              var exited = _.find(this.DataSubmit.Datas, {Code: code})
              if (exited) {
                item.Value = exited.Value
              }
            })
          }
        }
      })
    },
    collapse () {
      this.open = !this.open
    }
  }
}
</script>
