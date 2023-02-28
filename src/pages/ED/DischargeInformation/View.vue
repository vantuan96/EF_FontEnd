<template>
  <Vcollapse @getData="getData()" ref="Vcollapse">
    <template slot='title'>
      {{FormV2 ? FormV2.title : __label(Form)}}
    </template>
    <template slot='info'>
      <span class="pull-right" style="padding: 8px;font-size: 14px;">{{__t('Chỉnh sửa lần cuối bởi')}} <AdInfo :ad="FormV2 ? FormV2.UpdatedBy : Form.UpdatedBy" /> {{__t('lúc')}} {{FormV2 ? FormV2.UpdateAt : Form.UpdatedAt}}</span>
    </template>
    <template slot='content' v-if="hasData">
      <div class="box-body">
        <div class="row">
          <div class="col-md-6">
            <div class="form-group">
              <label required>{{__t('DI0.thoi_gian_nhap_cap_cuu')}}</label>
              <input readonly class="form-control" v-model="DataSubmit.AdmittedDate"/>
            </div>
          </div>
          <div class="col-md-6">
            <div class="form-group">
              <label required>{{__t('DI0.thoi_gian_roi_cap_cuu')}}</label>
              <input readonly class="form-control" v-model="DataSubmit.AssessmentAt"/>
            </div>
          </div>
        </div>
        <div class="form-group" v-if="MASTERDATA['DI0RPT']">
          <label>{{__label(MASTERDATA['DI0RPT'])}}</label>
          <div :key="index" v-for="(item,index) in MASTERDATA['DI0RPT'].Items">
            <div v-if="item.IsReadOnly">
            </div>
            <p class="fake-input disable" v-else>{{item.Value}}</p>
          </div>
        </div>
        <div class="form-group" v-if="MASTERDATA['DI0DIA'] && DataSubmit.VersionApp < 10">
          <p><label>{{MASTERDATA['DI0DIA'].ViName}}: </label><template v-for="(item,index) in MASTERDATA['DI0DIA'].Items"><div :data="item" :key="index" v-if="item.DataType === 'Text'" class="fake-input disable"> {{item.Value}}</div></template></p>
          <div><template v-for="(item,index) in MASTERDATA['DI0DIA'].Items"><p :data="item" :key="index" v-if="item.DataType === 'ICD10'"><b>{{__label(item)}}:</b> <span class="fake-input disable">{{getICD10(item.Value) || 'N/A'}}</span></p></template></div>
        </div>
        <div class="form-group" v-if="MASTERDATA['DI0DIA'] && DataSubmit.VersionApp >= 10">
          <template v-for="(item,index) in MASTERDATA['DI0DIA'].Items">
            <template v-if="item.DataType === 'Text'">
              <label :key="index">{{__label(item)}}:</label><span :key="index"><MDRadioView :key="index" v-if="item.Code === 'DI0DIAOPT2'" :data="MASTERDATA['DI0Check'].Items" /></span>
              <div v-if="checkMordibility === item.Code" :data="item" :key="index" class="fake-input disable"> {{item.Value}}</div>
              <div v-else-if="checkMordibility.includes('HasMordibility')" :data="item" :key="index" class="fake-input disable"> {{item.Value}}</div>
            </template>
            <div :class="item.Code === 'DI0DIAOPT' ? 'mt-15 margin-bottom-10' : 'margin-bottom-10'" v-if="item.DataType === 'ICD10'" :key="index">
              <label v-if="checkICDMordibility === item.Code">{{__label(item)}}:</label>
              <label v-else-if="checkICDMordibility.includes('HasMordibility')">{{__label(item)}}:</label>
              <template>
                <span v-if="checkICDMordibility === item.Code" class="fake-input disable">{{getICD10(item.Value) || 'N/A'}}</span>
                <span v-else-if="checkICDMordibility.includes('HasMordibility')" class="fake-input disable">{{getICD10(item.Value) || 'N/A'}}</span>
              </template>
            </div>
          </template>
          <!-- <label>{{MASTERDATA['DI0DIA'].ViName}}: </label> -->
          <!-- <p>
            <template v-for="(item,index) in MASTERDATA['DI0DIANEW'].Items" v-if="item.DataType === 'Text'">
              <label v-if="item.Code === 'DI0DIAANSNEW'" :key="index">{{__label(item)}}: </label>
              <div v-if="item.Code === 'DI0DIAANSNEW'" :data="item" :key="index" class="fake-input disable"> {{item.Value}}</div>
              <label v-if="item.Code === 'DI0DIAOPT2NEW'" :key="index">{{__label(item)}}: </label> <MDRadioView :key="index" v-if="item.Code === 'DI0DIAOPT2NEW'" :data="MASTERDATA['DI0Check'].Items" />
              <div v-if="MASTERDATA['DI0Check'].Items[0].Value && item.Code === 'DI0DIAOPT2NEW'" :data="item" :key="index" class="fake-input disable"> {{item.Value}}</div>
            </template>
          </p>
          <div>
            <template v-for="(item,index) in MASTERDATA['DI0DIANEW'].Items">
              <p :data="item" :key="index" v-if="item.DataType === 'ICD10'">
                <label v-if="item.Code === 'DI0DIAICDNEW'">{{__label(item)}}:</label>
                <span  v-if="item.Code === 'DI0DIAICDNEW'" class="fake-input disable">{{getICD10(item.Value) || 'N/A'}}</span>
                <label v-if="item.Code === 'DI0DIAOPTNEW' && MASTERDATA['DI0Check'].Items[0].Value">{{__label(item)}}:</label>
                <span  v-if="item.Code === 'DI0DIAOPTNEW' && MASTERDATA['DI0Check'].Items[0].Value" class="fake-input disable">{{getICD10(item.Value) || 'N/A'}}</span>
              </p>
            </template>
          </div> -->
        </div>
        <hr/>
        <md-input-text :readonly="true" v-if="MASTERDATA['DI0TAP']" v-model="MASTERDATA['DI0TAP']"/>
        <md-input-text :readonly="true" v-if="MASTERDATA['DI0SM0']" v-model="MASTERDATA['DI0SM0']"/>
        <md-input-text :readonly="true" v-if="MASTERDATA['DI0CS0']" v-model="MASTERDATA['DI0CS0']"/>
        <md-input-text :readonly="true" v-if="MASTERDATA['DI0FCP']" v-model="MASTERDATA['DI0FCP']"/>
        <md-input-text :readonly="true" v-if="MASTERDATA['DI0DR0']" v-model="MASTERDATA['DI0DR0']"/>
        <div v-if="DataSubmit.Status && DataSubmit.Status.EnName === 'Inter-hospital transfer'" class="transfered-info">
          <md-input-text :readonly="true" v-if="MASTERDATA['DI0RH0']" v-model="MASTERDATA['DI0RH0']"/>
          <md-input-text :readonly="true" v-if="MASTERDATA['DI0RFT']" v-model="MASTERDATA['DI0RFT']"/>
          <md-input-text :readonly="true" v-if="MASTERDATA['DI0NRH']" v-model="MASTERDATA['DI0NRH']"/>
          <md-input-text :readonly="true" v-if="MASTERDATA['DI0TM0']" v-model="MASTERDATA['DI0TM0']"/>
          <md-input-text :readonly="true" v-if="MASTERDATA['DI0NAT']" v-model="MASTERDATA['DI0NAT']"/>
        </div>
        <div v-if="DataSubmit.Status && DataSubmit.Status.EnName === 'Admitted'" class="transfered-info">
          <md-input-text :readonly="true" v-if="MASTERDATA['DI0RFA'] && DataSubmit.IsUseHandOverCheckList" v-model="MASTERDATA['DI0RFA']"/>
          <div class="form-group" v-if="MASTERDATA['DI0REC1']">
            <p><label>{{MASTERDATA['DI0REC1'].ViName}}: </label><template v-for="(item, index) in MASTERDATA['DI0REC1'].Items"><v-select :data="item" :key="index" :search="true" class="full-w select-boox-full-w" v-model="item.Value" :items="getMDSPECIALITIESs"/></template></p>
          </div>
          <div class="bg-gray-2 mt-10"  style="display: flex;">
            <input :readonly="true" type="checkbox" style="display: inline !important; height: 25px; width: 25px; margin-right: 6px;" v-model="DataSubmit.IsUseHandOverCheckList">
            <b style="display: contents !important; line-height: 2.5;">{{__t('Sử dụng biên bản bàn giao NB')}}</b>
          </div>
        </div>
        <div v-if="DataSubmit.Status && DataSubmit.Status.EnName === 'Transfer to OPD'" class="transfered-info">
          <md-input-text :readonly="true" v-if="MASTERDATA['DI0RFT2'] && DataSubmit.IsUseHandOverCheckList" v-model="MASTERDATA['DI0RFT2']"/>
          <div class="form-group" v-if="MASTERDATA['DI0REC2']">
            <p><label>{{MASTERDATA['DI0REC2'].ViName}}: </label><template v-for="(item, index) in MASTERDATA['DI0REC2'].Items"><v-select :data="item" :key="index" :search="true" class="full-w select-boox-full-w" v-model="item.Value" :items="getMDSPECIALITIESs"/></template></p>
          </div>
          <div class="bg-gray-2 mt-10"  style="display: flex;">
            <input :readonly="true" type="checkbox" style="display: inline !important; height: 25px; width: 25px; margin-right: 6px;" v-model="DataSubmit.IsUseHandOverCheckList">
            <b style="display: contents !important; line-height: 2.5;">{{__t('Sử dụng biên bản bàn giao NB')}}</b>
          </div>
        </div>
        <div v-if="DataSubmit.Status && DataSubmit.Status.EnName === 'Upstream/Downstream transfer'" class="transfered-info">
          <md-input-text :readonly="true" v-if="MASTERDATA['DI0RH1']" v-model="MASTERDATA['DI0RH1']"/>
          <md-input-text :readonly="true" v-if="MASTERDATA['DI0MTU']" v-model="MASTERDATA['DI0MTU']"/>
          <md-input-text :readonly="true" v-if="MASTERDATA['DI0PS0']" v-model="MASTERDATA['DI0PS0']"/>
          <div class="form-group" v-if="MASTERDATA['DI0RFT1']">
            <label>{{__label(MASTERDATA['DI0RFT1'])}} <i class="unit-label">{{MASTERDATA['DI0RFT1'].Note}}</i></label>
            <MDRadioView :data="MASTERDATA['DI0RFT1'].Items" />
          </div>
          <md-input-text :readonly="true" v-if="MASTERDATA['DI0TM1']" v-model="MASTERDATA['DI0TM1']"/>
          <md-input-text :readonly="true" v-if="MASTERDATA['DI0NTM']" v-model="MASTERDATA['DI0NTM']"/>
          <div class="form-group" v-if="MASTERDATA['DI0TD0']">
            <p><label>{{MASTERDATA['DI0TD0'].ViName}}: </label><template  v-for="item in MASTERDATA['DI0TD0'].Items"> {{item.Value}}</template></p>
          </div>
        </div>
        <div v-if="DataSubmit.Status && DataSubmit.Status.EnName === 'Discharged' && DataSubmit.VersionApp >= 10" class="transfered-info">
          <div :class="MASTERDATA['DI0DT'].Items[1].Value ? 'form-group d-flex' : 'form-group'" v-if="MASTERDATA['DI0DT']">
            <label style="margin-top: 4px;">{{__label(MASTERDATA['DI0DT'])}}</label>
            <MDRadioView :data="MASTERDATA['DI0DT'].Items" />
            <MDRadioView v-if="MASTERDATA['DI0DT'].Items[1].Value" :data="MASTERDATA['DI0Reason'].Items" />
            <p v-if="MASTERDATA['DI0DT'].Items[1].Value" class="fake-input disable max-width" style="margin: 0; flex:1">{{MASTERDATA['DI0Reason'].Items[3].Value || 'N/A'}}</p>
          </div>
        </div>
        <hr/>
        <div class="form-group" v-if="MASTERDATA['DI0COEM']">
          <label>{{__label(MASTERDATA['DI0COEM'])}} <i class="unit-label">{{MASTERDATA['DI0COEM'].Note}}</i></label>
          <MDRadioView :data="MASTERDATA['DI0COEM'].Items" />
        </div>
        <Endoscopy v-if="MASTERDATA['DI0TFEOC']" :readonly="true" v-model="MASTERDATA['DI0TFEOC']" :EOCInfo="DataSubmit.EOCInfo"/>
        <div class="form-group" v-if="DataSubmit.Status">
          <label>{{__t('Trạng thái')}}: </label> <span class="el-radio-view">{{__label(DataSubmit.Status)}}</span>
        </div>
        <div class="form-group" v-if="MASTERDATA['DI0COIN']">
          <label>{{__label(MASTERDATA['DI0COIN'])}} <i class="unit-label">{{MASTERDATA['DI0COIN'].Note}}</i></label>
          <MDRadioView :data="MASTERDATA['DI0COIN'].Items" />
        </div>
      </div>
    </template>
  </Vcollapse>
</template>
<script>
/* ============
 * Home Index Page
 * ============
 *
 * The home index page.
 */

import MixinMasterData from '@/mixins/masterdata.js'
import DischargeInformation from '@/services/ED/DischargeInformation'
import VSelect from '@/components/VSelectDisplay.vue'
import _ from 'lodash'
import Endoscopy from '@/components/Endoscopy.vue'
export default {
  /**
   * The name of the page.
   */
  name: 'EDDI0',
  mixins: [MixinMasterData],
  props: ['VisitId', 'Form', 'FormV2'],
  data () {
    return {
      hasData: false,
      TimeSeen: '',
      DataSubmit: {
        Datas: []
      }
    }
  },
  /**
   * The components that the page can use.
   */
  components: {
    VSelect, Endoscopy
  },
  mounted () {
  },
  computed: {
    checkMordibility: function () {
      if (this.MASTERDATA['DI0Check'].Items[0].Value === true) {
        return 'HasMordibility'
      } else {
        console.log(this.MASTERDATA['DI0Check'].Items[0].Value, 'checkkkkkk')
        return 'DI0DIAANS'
      }
    },
    checkICDMordibility: function () {
      if (this.MASTERDATA['DI0Check'].Items[0].Value === true) {
        return 'HasMordibility'
      } else {
        console.log(this.MASTERDATA['DI0Check'].Items[0].Value, 'checkkkkkk')
        return 'DI0DIAICD'
      }
    },
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
  watch: {
  },
  methods: {
    getData () {
      this.getSpecialities()
      this.getMasterDatas({Form: 'DI0'}, () => {
        new DischargeInformation().find(this.VisitId).then(response => {
          // this.$router.push({name: 'etr', params: {Id: response.Id}})
          this.hasData = true
          if (this.$refs.Vcollapse) {
            this.$refs.Vcollapse.setHasData()
          }
          this.DataSubmit = response
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
        }).catch(e => {
          if (e.status === 400) {
            this._404()
          }
        })
      })
    }
  }
}
</script>
<style lang="stylus" scoped>
.mt-15 {
  margin-top: 15px;
}
</style>
