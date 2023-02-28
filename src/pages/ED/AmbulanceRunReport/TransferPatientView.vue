<template>
  <div>
    <div class="tab-content" v-if="DataSubmit">
      <div class="border">
        <div class="row">
          <div class="col-md-6 col-sm-5" v-if="MASTERDATA['EDARRTRPADIAG']">
            <label>{{__label(MASTERDATA['EDARRTRPADIAG'])}}</label>
            <textarea-autosize readonly class="form-control" rows="1" :placeholder="__t('Nhập')" v-model="MASTERDATA['EDARRTRPADIAG'].Items[0].Value"/>
          </div>
          <div class="col-md-3 col-sm-3" v-if="MASTERDATA['EDARRTRPAFROM']">
            <label>{{__label(MASTERDATA['EDARRTRPAFROM'])}}</label>
            <textarea-autosize readonly class="form-control" rows="1" :placeholder="__t('Nhập')" v-model="MASTERDATA['EDARRTRPAFROM'].Items[0].Value"/>
          </div>
          <div class="col-md-3 col-sm-4" v-if="MASTERDATA['EDARRTRPATIME']">
            <label>{{__label(MASTERDATA['EDARRTRPATIME'])}}</label>
            <input readonly v-model="MASTERDATA['EDARRTRPATIME'].Items[0].Value" class="form-control"/>
          </div>
        </div>
      </div>
      <table class="table v-table-1 tbl-p5 no-margin">
        <tr>
          <th class="text-left" width="50px">{{__t('Thời gian')}}</th>
          <th class="text-left" width="50px">{{__t('Huyết áp')}}<br/><span class="note-text">mmHg</span></th>
          <th class="text-left" width="50px">{{__t('Mạch')}}<br/><span class="note-text">({{__t('nhịp/ phút')}})</span></th>
          <th class="text-left" width="50px">{{__t('Tần số thở')}}<br/><span class="note-text">({{__t('lần/ phút')}})</span></th>
          <th class="text-left" width="50px">{{__t('Kiểu thở')}}</th>
          <th class="text-left" width="50px">{{__t('SpO2')}}</th>
          <th class="text-left" width="50px">{{__t('Nhịp tim')}}<br/><span class="note-text">({{__t('nhịp/ phút')}})</span></th>
          <th class="text-left" width="150px">{{__t('Can thiệp thủ thuật')}}</th>
          <th class="text-left">{{__t('Tên thuốc')}}</th>
          <th class="text-left" width="50px">{{__t('Liều')}}</th>
          <th class="text-left" width="150px">{{__t('Đường dùng')}}</th>
          <th class="text-left" width="50px">{{__t('Ký tên')}}</th>
        </tr>
        <template v-if="DataSubmit.Records && DataSubmit.Records.length">
        <tr :key="index" v-for="(item, index) in DataSubmit.Records">
          <template>
            <td style="position: relative">
              {{item.Time || 'N/A'}}
            </td>
            <td>{{item.BP || 'N/A'}}</td>
            <td>{{item.Pulse || 'N/A'}}</td>
            <td>{{item.RespRate || 'N/A'}}</td>
            <td>{{item.PatternOfRespiration || 'N/A'}}</td>
            <td>{{item.SpO2 || 'N/A'}}</td>
            <td>{{item.HR || 'N/A'}}</td>
            <td>{{item.Procedure || 'N/A'}}</td>
            <td>{{item.Drug || 'N/A'}}</td>
            <td>{{item.Dose || 'N/A'}}</td>
            <td>{{item.Route || 'N/A'}}</td>
          </template>
          <td class="no-wrap">
            <template v-if="DataSubmit.Version >= 9">
              <SingleConfirm
                :kind="'TransferPatient_USERCREATED'"
                :FormCode="'A03_006_050919_VE'"
                :item="item" :readonly="true"
                :viewOnly="true"
                :dataVerOld="item.CreatedBy"
                :hideLabel="true"
                :title="'Người thực hiện'"/>
            </template>
            <template v-else>
              <ad-Info v-if="item.CreatedBy" :ad="item.CreatedBy" />
            </template>
          </td>
        </tr>
        </template>
        <template v-else>
          <tr>
            <td colspan="77" class="text-center hide-counter">{{__t('Chưa có can thiệp')}}</td>
          </tr>
        </template>
      </table>
      <br/>
      <table class="table v-table-1">
        <tr v-if="MASTERDATA['EDARRTRPAAICO']">
          <th width="180px">{{__label(MASTERDATA['EDARRTRPAAICO'])}}</th>
          <td>
            <div class="row">
              <div class="col-md-4 col-sm-6" v-if="item.Value" :data="item" :key="index" v-for="(item, index) in MASTERDATA['EDARRTRPAAICO'].Items">
                <div class="flex-box flex-center">
                  <CheckboxValue v-model="item.Value" />
                  <span class="displaytbl"><span>{{__label(item)}}</span></span>
                </div>
              </div>
            </div>
          </td>
        </tr>
        <tr v-if="MASTERDATA['EDARRTRPAEMMT']">
          <th width="180px">{{__label(MASTERDATA['EDARRTRPAEMMT'])}}</th>
          <td>
            <div class="row">
              <div class="col-md-4 col-sm-6" v-if="item.Value" :data="item" :key="index" v-for="(item, index) in MASTERDATA['EDARRTRPAEMMT'].Items">
                <div class="flex-box flex-center">
                  <CheckboxValue v-model="item.Value" />
                  <span class="displaytbl"><span>{{__label(item)}}</span></span>
                </div>
              </div>
            </div>
          </td>
        </tr>
        <tr v-if="MASTERDATA['EDARRTRPAPROU']">
          <th width="180px">{{__label(MASTERDATA['EDARRTRPAPROU'])}}</th>
          <td>
            <div class="flex-box flex-center">
              <span class="mr-10">{{__label(MASTERDATA['EDARRTRPAARAH'])}}</span>
              <MDRadioView :data="MASTERDATA['EDARRTRPAARAH'].Items" />
            </div>
          </td>
        </tr>
        <tr v-if="MASTERDATA['EDARRTRPAEMDO']">
          <th width="180px">{{__label(MASTERDATA['EDARRTRPAEMDO'])}}</th>
          <td>
            <div class="row">
              <div class="col-md-4 col-sm-6" v-if="item.Value" :data="item" :key="index" v-for="(item, index) in MASTERDATA['EDARRTRPAEMDO'].Items">
                <div class="flex-box flex-center">
                  <CheckboxValue v-model="item.Value" />
                  <span class="displaytbl"><span>{{__label(item)}}</span></span>
                </div>
              </div>
            </div>
          </td>
        </tr>
        <tr v-if="MASTERDATA['EDARRTRPAHOOU']">
          <th width="180px">{{__label(MASTERDATA['EDARRTRPAHOOU'])}}</th>
          <td>
            <div class="row">
              <div class="col-md-4 col-sm-6" v-if="item.Value" :data="item" :key="index" v-for="(item, index) in MASTERDATA['EDARRTRPAHOOU'].Items">
                <div class="flex-box flex-center">
                  <CheckboxValue v-model="item.Value" />
                  <span class="displaytbl"><span>{{__label(item)}}</span></span>
                </div>
              </div>
            </div>
          </td>
        </tr>
        <tr v-if="MASTERDATA['EDARRTRPAEQFA']">
          <th width="180px">{{__label(MASTERDATA['EDARRTRPAEQFA'])}}</th>
          <td>
            <div class="flex-box flex-center">
              <div class="group-radio">
                <MDRadioView :data="MASTERDATA['EDARRTRPAEQFA'].Items" />
              </div>
              <span class="ml-5 mr-5" v-if="MASTERDATA['EDARRTRPAEQFA'].Items[0].Value">{{__label(MASTERDATA['EDARRTRPAEXPL'])}}</span>
              <div style="flex-grow: 1;"  v-if="MASTERDATA['EDARRTRPAEQFA'].Items[0].Value">
                <textarea-autosize readonly class="form-control" rows="1" :placeholder="__t('N/A')" v-model="MASTERDATA['EDARRTRPAEXPL'].Items[0].Value"/>
              </div>
            </div>
          </td>
        </tr>
      </table>
      <br/>
      <br/>
      <br/>
      <div class="row">
        <div class="col-md-12 col-sm-12">
          <p><b>- NKQ</b>: Nội khí quản <b class="ml-20">- AMA</b>: Against Medical Advices</p>
        </div>
      </div>
      <div class="mt-20">
        <LastUpdateWithFormCode :FormCode="'A03_006_050919_VE'" :DataSubmit="DataSubmit"/>
      </div>
    </div>
  </div>
</template>
<script>
import AmbulanceRunReport from '@/services/ED/AmbulanceRunReport'
import VDatePicker from '@/components/VDateTimePicker.vue'
import MixinForm from '@/mixins/form.js'
import Logs from '@/components/Logs.vue'
import MixinMasterData from '@/mixins/masterdata.js'
import $ from 'jquery'
import _ from 'lodash'
import moment from 'moment'
import NProgress from 'nprogress'
import SingleConfirm from '@/components/Form/SingleConfirm.vue'
export default {
  name: 'TransferPatient',
  props: ['VisitId'],
  mixins: [MixinForm, MixinMasterData],
  data () {
    return {
      DataSubmit: null,
      loaded: false
    }
  },
  components: {
    VDatePicker, Logs, SingleConfirm
  },
  watch: {
    DataSubmit (a, b) {
      if (this.DataSubmit) {
        $('#AmbulanceRunReportTab').show()
      } else {
        $('#AmbulanceRunReportTab').hide()
      }
    }
  },
  mounted () {
    this.getMasterDatas({Form: 'EDARRTRPA'}, () => {
      this.getData()
    })
  },
  computed: {
    someThing: function () {
      return []
    }
  },
  methods: {
    addNewRecord () {
      this.DataSubmit.Records.push({
        BP: '',
        Pulse: '',
        RespRate: '',
        PatternOfRespiration: '',
        SpO2: '',
        HR: '',
        Procedure: '',
        Drug: '',
        Dose: '',
        Route: '',
        CreatedBy: this.$store.state.account.Username,
        Time: moment().format('HH:mm DD/MM/YYYY'),
        Removed: false
      })
    },
    submit () {
      var obj = {}
      NProgress.start()
      this.DataSubmit.Records = this.DataSubmit.Records.filter(e => !e.Removed)
      this.DataSubmit.Datas = []
      for (const property in this.MASTERDATA) {
        if (this.MASTERDATA[property].Items) {
          this.MASTERDATA[property].Items.forEach(item => {
            var val = item.Value
            this.DataSubmit.Datas.push({
              Code: item.Code,
              Value: val,
              Group: property
            })
            obj[item.Code] = item.Value
          })
        }
      }
      new AmbulanceRunReport().update('TransferPatient/' + this._VisitId, this.DataSubmit).then(response => {
        this.toastedSuccess().getData()
        this.edited = false
      }).catch(e => {
        // this._401ResponseError(e)
      })
    },
    getData () {
      this.loaded = false
      new AmbulanceRunReport().find('TransferPatient/' + this._VisitId + '?hidemsg=' + true).then(response => {
        this.DataSubmit = response
        this.$store.dispatch('setCurrentFormId', response.Id)
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
              }
            })
          }
        }
      }).catch(e => {
        this.loaded = true
        this.DataSubmit = false
        if (e.status === 404) {}
      })
    }
  }
}
</script>
