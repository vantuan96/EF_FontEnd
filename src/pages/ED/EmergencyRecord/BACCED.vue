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
        <md-input-text :readonly="true" v-if="MASTERDATA['ER0PHH']" v-model="MASTERDATA['ER0PHH']"/>
        <md-input-text :readonly="true" v-if="MASTERDATA['ER0HIS']" v-model="MASTERDATA['ER0HIS']"/>
        <div class="box-bg">
          <label>{{__label(MASTERDATA['ER0ASS'])}}</label>
          <md-input-text :readonly="true" v-if="MASTERDATA['ER0KTT']" v-model="MASTERDATA['ER0KTT']"/>
          <md-input-text :readonly="true" v-if="MASTERDATA['ER0KTM']" v-model="MASTERDATA['ER0KTM']"/>
          <md-input-text :readonly="true" v-if="MASTERDATA['ER0KHH']" v-model="MASTERDATA['ER0KHH']"/>
          <md-input-text :readonly="true" v-if="MASTERDATA['ER0KCK']" v-model="MASTERDATA['ER0KCK']"/>
          <md-input-text :readonly="true" v-if="MASTERDATA['ER0KCBPK']" v-model="MASTERDATA['ER0KCBPK']"/>
        </div>
        <!-- <md-input-text :readonly="true" v-if="MASTERDATA['ER0ASS']" v-model="MASTERDATA['ER0ASS']"/> -->
        <md-input-text :readonly="true" v-if="MASTERDATA['ER0ID0']" v-model="MASTERDATA['ER0ID0']"/>
        <md-input-text :readonly="true" v-if="MASTERDATA['ER0IH0']" v-model="MASTERDATA['ER0IH0']"/>
        <div class="row">
          <div class="col-md-12">
            <div class="form-group">
              <label>{{__t('ER0.thoi_gian_kham')}}:</label> {{TimeSeen}}
            </div>
          </div>
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
import EmergencyRecords from '@/services/ED/EmergencyRecords'
import _ from 'lodash'
export default {
  /**
   * The name of the page.
   */
  name: 'EDER0',
  mixins: [MixinMasterData],
  props: ['VisitId', 'Form', 'FormV2'],
  data () {
    return {
      hasData: false,
      TimeSeen: ''
    }
  },
  /**
   * The components that the page can use.
   */
  components: {
  },
  mounted () {
  },
  computed: {
  },
  watch: {
  },
  methods: {
    getData () {
      this.getMasterDatas({Form: 'ER0'}, () => {
        new EmergencyRecords().find(this.VisitId).then(response => {
          // this.$router.push({name: 'etr', params: {Id: response.Id}})
          this.hasData = true
          if (this.$refs.Vcollapse) {
            this.$refs.Vcollapse.setHasData()
          }
          this.TimeSeen = response.TimeSeen
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
