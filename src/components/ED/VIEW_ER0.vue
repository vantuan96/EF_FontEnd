<template>
  <div class="ed-info box-collapse" :class="{'open': open}">
    <div class="ed-customer-title">
      <b>{{__t('ER0.benh_an_cap_cuu')}}</b>
      <router-link :to="{name: 'ER0', params: { Id: EdId }}" class="pull-right" v-if="!readonlyview">
        <span class="glyphicon glyphicon-pencil"></span>
      </router-link>
    </div>
    <div class="box-collapse-content content-view">
      <div class="row">
        <div class="col-md-12" v-if="MASTERDATA['ER0PHH']">
          <div class="form-group">
            <p><label>{{__label(MASTERDATA['ER0PHH'])}}:</label> <template  v-for="(item) in MASTERDATA['ER0PHH'].Items">{{item.Value}}</template></p>
          </div>
        </div>
        <div class="col-md-12" v-if="MASTERDATA['ER0HIS']">
          <div class="form-group">
            <p><label>{{__label(MASTERDATA['ER0HIS'])}}:</label> <template  v-for="(item) in MASTERDATA['ER0HIS'].Items">{{item.Value}}</template></p>
          </div>
        </div>
        <div class="box-bg" style="overflow: hidden;">
          <label>{{__label(MASTERDATA['ER0ASS'])}}</label>
          <div class="col-md-12" v-if="MASTERDATA['ER0KTT']">
            <div class="form-group">
              <p><label>{{__label(MASTERDATA['ER0KTT'])}}:</label> <template  v-for="(item) in MASTERDATA['ER0KTT'].Items">{{item.Value}}</template></p>
            </div>
          </div>
          <div class="col-md-12" v-if="MASTERDATA['ER0KTM']">
            <div class="form-group">
              <p><label>{{__label(MASTERDATA['ER0KTM'])}}:</label> <template  v-for="(item) in MASTERDATA['ER0KTM'].Items">{{item.Value}}</template></p>
            </div>
          </div>
          <div class="col-md-12" v-if="MASTERDATA['ER0KHH']">
            <div class="form-group">
              <p><label>{{__label(MASTERDATA['ER0KHH'])}}:</label> <template  v-for="(item) in MASTERDATA['ER0KHH'].Items">{{item.Value}}</template></p>
            </div>
          </div>
          <div class="col-md-12" v-if="MASTERDATA['ER0KCK']">
            <div class="form-group">
              <p><label>{{__label(MASTERDATA['ER0KCK'])}}:</label> <template  v-for="(item) in MASTERDATA['ER0KCK'].Items">{{item.Value}}</template></p>
            </div>
          </div>
          <div class="col-md-12" v-if="MASTERDATA['ER0KCBPK']">
            <div class="form-group">
              <p><label>{{__label(MASTERDATA['ER0KCBPK'])}}:</label> <template  v-for="(item) in MASTERDATA['ER0KCBPK'].Items">{{item.Value}}</template></p>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12" v-if="MASTERDATA['ER0ASS']" hidden>
          <div class="form-group">
            <p><label>{{__label(MASTERDATA['ER0ASS'])}}:</label> <template  v-for="(item) in MASTERDATA['ER0ASS'].Items">{{item.Value}}</template></p>
          </div>
        </div>
        <div class="col-md-12" v-if="MASTERDATA['ER0ID0']">
          <div class="form-group">
            <p><label>{{__label(MASTERDATA['ER0ID0'])}}:</label> <template  v-for="(item) in MASTERDATA['ER0ID0'].Items">{{item.Value}}</template></p>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12" v-if="MASTERDATA['ER0IH0']">
          <div class="form-group">
            <p><label>{{__label(MASTERDATA['ER0IH0'])}}:</label> <template  v-for="(item) in MASTERDATA['ER0IH0'].Items">{{item.Value}}</template></p>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12" v-if="MASTERDATA['ER0IH0']">
          <div class="form-group">
            <p><label>{{__t('ER0.thoi_gian_kham')}}:</label> {{TimeSeen}}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="box-action" @click="collapse()">
      <span class="show-down link-text"><i class="fa fa-angle-double-down"></i></span>
      <span class="hide-up link-text"><i class="fa fa-angle-double-up"></i></span>
    </div>
  </div>
</template>
<script>
import MixinMasterData from '@/mixins/masterdata.js'
import EmergencyRecords from '@/services/ED/EmergencyRecords'
import _ from 'lodash'
export default {
  name: 'IAM-VIEW',
  mixins: [MixinMasterData],
  props: ['EdId', 'readonlyview'],
  data () {
    return {
      collapseId: '',
      open: false,
      TimeSeen: ''
    }
  },
  created () {
    this.collapseId = 'collapse_ER0-' + Math.floor(Math.random() * 10)
    this.getMasterDatas({Form: 'ER0'}, () => {
      this.getData()
    })
  },
  methods: {
    collapse () {
      this.open = !this.open
    },
    getData () {
      new EmergencyRecords().find(this.EdId).then(response => {
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
      })
    }
  }
}
</script>
