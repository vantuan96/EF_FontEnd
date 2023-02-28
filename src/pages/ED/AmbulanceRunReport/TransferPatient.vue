<template>
  <div>
    <div class="tab-content" v-if="DataSubmit">
      <div class="border">
        <div class="row">
          <div class="col-md-6 col-sm-5" v-if="MASTERDATA['EDARRTRPADIAG']">
            <label>{{__label(MASTERDATA['EDARRTRPADIAG'])}}</label>
            <textarea-autosize class="form-control" rows="1" :placeholder="__t('Nhập')" v-model="MASTERDATA['EDARRTRPADIAG'].Items[0].Value"/>
          </div>
          <div class="col-md-3 col-sm-3" v-if="MASTERDATA['EDARRTRPAFROM']">
            <label>{{__label(MASTERDATA['EDARRTRPAFROM'])}}</label>
            <textarea-autosize class="form-control" rows="1" :placeholder="__t('Nhập')" v-model="MASTERDATA['EDARRTRPAFROM'].Items[0].Value"/>
          </div>
          <div class="col-md-3 col-sm-4" v-if="MASTERDATA['EDARRTRPATIME']">
            <label>{{__label(MASTERDATA['EDARRTRPATIME'])}}</label>
            <v-date-picker :format="'HH:mm DD/MM/YYYY'" v-model="MASTERDATA['EDARRTRPATIME'].Items[0].Value" class="full-w"/>
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
          <th class="text-center" width="200px">{{__t('Ký tên')}}</th>
        </tr>
        <template v-if="DataSubmit.Records && DataSubmit.Records.length">
        <tr :key="index" v-for="(item, index) in DataSubmit.Records" v-if="!item.IsDeleted">
          <template v-if="item.CreatedBy && item.CreatedBy === $store.state.account.Username && !getConfirmItem(item)">
          <td style="position: relative" width="50px">
            <button class="btn-pos-left" @click="removedItem(item)"><i class="fa fa-trash" aria-hidden="true"></i></button>
            <v-date-picker v-model="item.Time" class="wmg" :format="vDateTimeFormat"/>
          </td>
          <td width="50px"><input type="text" class="form-control w50" v-model="item.BP"/></td>
          <td width="50px"><input type="text" class="form-control w50" v-model="item.Pulse"/></td>
          <td width="50px"><input type="text" class="form-control w50" v-model="item.RespRate"/></td>
          <td width="50px"><input type="text" class="form-control w50" v-model="item.PatternOfRespiration"/></td>
          <td width="50px"><input type="text" class="form-control w50" v-model="item.SpO2"/></td>
          <td width="50px"><input type="text" class="form-control w50" v-model="item.HR"/></td>
          <td width="150px"><input type="text" class="form-control w150" v-model="item.Procedure"/></td>
          <td><medication v-model="item.Drug" /></td>
          <td width="50px"><input type="text" class="form-control w50" v-model="item.Dose"/></td>
          <td width="150px"><medication-route v-model="item.Route"/></td>
          </template>
          <template v-else>
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
          <!-- ký tên v9 -->
          <td class="no-wrap">
            <template v-if="DataSubmit.Version >= 9">
              <SingleConfirm
                :kind="'TransferPatient_USERCREATED'"
                :FormCode="'A03_006_050919_VE'"
                :item="item" :readonly="getConfirmItem(item)"
                :viewOnly="false"
                :dataVerOld="item.CreatedBy"
                :hideLabel="true"
                @saveRow="saveRow"
                @success="success"
                :title="'Người thực hiện'"/>
            </template>
            <template v-else>
              <ad-Info v-if="item.CreatedBy" :ad="item.CreatedBy" />
            </template>
          </td>
          <!-- <td><ad-Info :ad="item.CreatedBy" /></td> -->
        </tr>
        </template>
        <template v-else>
          <tr>
            <td colspan="77" class="text-center hide-counter">{{__t('Chưa có can thiệp')}}</td>
          </tr>
        </template>
      </table>
      <div class="text-center">
        <button @click="addNewRecord()" class="btn v-green-btn v-bottom-btn"><i aria-hidden="true" class="fa fa-plus"></i> {{__t('THÊM THỜI GIAN')}}</button>
      </div>
      <br/>
      <table class="table v-table-1">
        <tr v-if="MASTERDATA['EDARRTRPAAICO']">
          <th width="180px">{{__label(MASTERDATA['EDARRTRPAAICO'])}}</th>
          <td>
            <div class="row">
              <div class="col-md-4 col-sm-6" :data="item" :key="index" v-for="(item, index) in MASTERDATA['EDARRTRPAAICO'].Items">
                <div class="flex-box flex-center">
                  <div class="v-checkbox">
                    <input type="checkbox" :id="'EDARRTRPAAICOradio-' + index" v-model="item.Value">
                    <label :for="'EDARRTRPAAICOradio-' + index"></label>
                  </div>
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
              <div class="col-md-4 col-sm-6" :data="item" :key="index" v-for="(item, index) in MASTERDATA['EDARRTRPAEMMT'].Items">
                <div class="flex-box flex-center">
                  <div class="v-checkbox">
                    <input type="checkbox" :id="'EDARRTRPAEMMTradio-' + index" v-model="item.Value">
                    <label :for="'EDARRTRPAEMMTradio-' + index"></label>
                  </div>
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
              <div class="group-radio">
                <template :data="item"  v-for="(item,index) in MASTERDATA['EDARRTRPAARAH'].Items">
                  <span :key="index" v-if="item.DataType === 'Radio'">
                    <input type="checkbox" :id="'EDARRTRPAARAHradio-' + index" v-model="item.Value">
                    <label :for="'EDARRTRPAARAHradio-' + index" @click="checkbox2Radio(MASTERDATA['EDARRTRPAARAH'].Items, item)">{{__label(item)}}</label>
                  </span>
                </template>
              </div>
            </div>
          </td>
        </tr>
        <tr v-if="MASTERDATA['EDARRTRPAEMDO']">
          <th width="180px">{{__label(MASTERDATA['EDARRTRPAEMDO'])}}</th>
          <td>
            <div class="row">
              <div class="col-md-4 col-sm-6" :data="item" :key="index" v-for="(item, index) in MASTERDATA['EDARRTRPAEMDO'].Items">
                <div class="flex-box flex-center">
                  <div class="v-checkbox">
                    <input type="checkbox" :id="'EDARRTRPAEMDOradio-' + index" v-model="item.Value">
                    <label :for="'EDARRTRPAEMDOradio-' + index"></label>
                  </div>
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
              <div class="col-md-4 col-sm-6" :data="item" :key="index" v-for="(item, index) in MASTERDATA['EDARRTRPAHOOU'].Items">
                <div class="flex-box flex-center">
                  <div class="v-checkbox">
                    <input type="checkbox" :id="'EDARRTRPAHOOUradio-' + index" v-model="item.Value">
                    <label :for="'EDARRTRPAHOOUradio-' + index"></label>
                  </div>
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
                <template :data="item"  v-for="(item,index) in MASTERDATA['EDARRTRPAEQFA'].Items">
                  <span :key="index" v-if="item.DataType === 'Radio'">
                    <input type="checkbox" :id="'EDARRTRPAEQFAradio-' + index" v-model="item.Value">
                    <label :for="'EDARRTRPAEQFAradio-' + index" @click="checkbox2Radio(MASTERDATA['EDARRTRPAEQFA'].Items, item)">{{__label(item)}}</label>
                  </span>
                </template>
              </div>
              <span class="ml-5 mr-5" v-if="MASTERDATA['EDARRTRPAEQFA'].Items[0].Value">{{__label(MASTERDATA['EDARRTRPAEXPL'])}}</span>
              <div style="flex-grow: 1;"  v-if="MASTERDATA['EDARRTRPAEQFA'].Items[0].Value">
                <textarea-autosize class="form-control" rows="1" :placeholder="__t('Nhập')" v-model="MASTERDATA['EDARRTRPAEXPL'].Items[0].Value"/>
              </div>
            </div>
          </td>
        </tr>
      </table>
      <!-- <div class="row" v-if="DataSubmit.Version >= 9">
          <Confirm
          class="mt-10"
          ref="ConfirmComponent"
          :MasterDataCode="'A03_006_050919_VE'"
          :FormCode="'A03_006_050919_VE'"
          :AdInfo="[DataSubmit.CreatedBy]"
          :VisitId="_VisitId"
          :ReadOnly="false"
          :FormId="DataSubmit.Id"
          @confirmSuccess="reload()"
          :TabActive="'TAB2'"
        />
        </div> -->
      <br/>
      <br/>
      <br/>
      <div class="row">
        <div class="col-md-12 col-sm-12">
          <p  v-if="this.$i18n.locale === 'vi'"><b>- NKQ</b>: Nội khí quản</p>
          <p  v-if="this.$i18n.locale === 'en'"><b>- AMA</b>: Against Medical Advices</p>
        </div>
      </div>
      <div class="mt-20">
        <LastUpdateWithFormCode :FormCode="'A03_006_050919_VE'" :DataSubmit="DataSubmit"/>
      </div>
      <FloatBlock :openBack="true" @handleBack="handleBack">
        <template slot='buttons'>
          <div class="col-md-2 col-sm-2">
            <div class="form-group1">
            </div>
          </div>
          <div class="col-md-4 col-sm-4">
            <div class="form-group1">
            </div>
          </div>
          <div class="col-md-6 col-sm-6">
            <div class="form-group1">
              <button class="btn v-yellow-btn pull-right btn-block hvr-ripple-out" type="button" v-shortkey="['ctrl', 's']" @shortkey="submit()" @click="submit()"><i class="fa fa-floppy-o" aria-hidden="true"></i> {{__t('btn.luu')}}</button>
            </div>
          </div>
        </template>
      </FloatBlock>
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
  mixins: [MixinForm, MixinMasterData],
  data () {
    return {
      DataSubmit: null,
      loaded: false,
      edited: false,
      deleteItem: []
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
    },
    MASTERDATA: {
      handler () {
        this.edited = true
      },
      deep: true
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
    getConfirmItem (item) {
      if (item.ConfirmCreated && item.ConfirmCreated.ConfirmAt) {
        return true
      } else {
        return false
      }
    },
    removedItem (item) {
      // this.DataSubmit.Records = this.DataSubmit.Records.filter(e => e.Id !== item.Id)
      // for (let i = 0; i < this.DataSubmit.Records.length; i++) {
      //   this.DataSubmit.Records[i].Removed = true
      // }
      this.DataSubmit.Records = this.DataSubmit.Records.map(obj =>
        obj.Id === item.Id ? { ...obj, IsDeleted: true } : obj
      )
      console.log('dfdsds', this.DataSubmit.Records)
    },
    saveRow () {
      var obj = {}
      NProgress.start()
      this.DataSubmit.Records = this.DataSubmit.Records
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
      new AmbulanceRunReport().update('TransferPatient/' + this.$route.params.Id, this.DataSubmit).then(response => {
        this.getData()
      }).catch(e => {
        // this._401ResponseError(e)
      })
    },
    success () {
      this.getData()
    },
    handleBack () {
      if (this.edited) {
        this.confirmPopupBack()
      } else {
        this.back()
      }
    },
    confirmPopupBack () {
      this.$modal.show('dialog', {
        clickToClose: false,
        title: this.__t('Cảnh báo'),
        text: this.__t('Dữ liệu bạn đang làm có thể bị mất nếu chưa lưu'),
        class: 'v-dialog v-dialog-warning',
        buttons: [
          {
            title: this.__t('Đồng ý'),
            class: 'btn',
            handler: () => {
              this.$modal.hide('dialog')
              this.back()
            }
          },
          {
            title: this.__t('Hủy bỏ'),
            class: 'btn btn-warning',
            handler: () => {
              // this.back()
              this.$modal.hide('dialog')
            }
          }
        ]
      })
    },
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
        Removed: false,
        IsDeleted: false
      })
      this.submit()
    },
    submit () {
      var obj = {}
      NProgress.start()
      this.DataSubmit.Records = this.DataSubmit.Records
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
      new AmbulanceRunReport().update('TransferPatient/' + this.$route.params.Id, this.DataSubmit).then(response => {
        this.toastedSuccess().getData()
        this.edited = false
      }).catch(e => {
        // this._401ResponseError(e)
      })
    },
    getData () {
      this.loaded = false
      new AmbulanceRunReport().find('TransferPatient/' + this.$route.params.Id + '?hidemsg=' + true).then(response => {
        this.DataSubmit = response
        console.log('abc', this.DataSubmit.Records)
        this.$store.dispatch('setCurrentFormId', response.Id)
        this.loaded = true
        this.edited = false
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
