<template>
  <div class="main-content" id="iam-page">
    <!-- <ed :EdId="this.$route.params.Id"/> -->
    <etr :EdId="this.$route.params.Id"/>
    <retail-service-patient :EdId="this.$route.params.Id"/>
    <h2 class="text-center">{{__t('ER0.benh_an_cap_cuu')}}</h2>
    <template v-if="allowEdit">
      <div v-if="DataSubmit.Version >= 9" class="row">
        <div class="col-md-4">
          <div class="form-group">
            <label>{{__t('ER0.thoi_gian_kham')}}:</label> <v-date-picker v-model="DataSubmit.TimeSeen" :format="vDateTimeFormat" class="full-w" :readonly="!allowEdit"/>
          </div>
        </div>
      </div>
      <div class="box border-box">
        <div class="box-body">
          <div class="row">
            <div class="col-md-12" v-if="MASTERDATA['ER0PHH']">
              <div class="form-group bg-gray-2">
                <label>{{__label(MASTERDATA['ER0PHH'])}}</label>
                <template  v-for="(item,index) in MASTERDATA['ER0PHH'].Items">
                  <textarea-autosize :minHeight="100" :data="item" :key="index" class="form-control" v-model="item.Value"></textarea-autosize>
                </template>
                <div class="HistoryOfPresentIllness"  v-if="SyncPastMedicalHistory && SyncPastMedicalHistory.length">
                  <label>{{__t('Thông tin khai thác tiền sử bệnh')}}</label>
                  <vue-scrolling-table v-if="SyncPastMedicalHistory.length">
                    <template slot="tbl">
                      <table class="table table-bordered table-bordered-x">
                        <thead>
                          <tr>
                            <th width="1" class="no-wrap">{{__t('Ngày khám')}}</th>
                            <th width="1" class="no-wrap">{{__t('Bác sĩ khám')}}</th>
                            <th width="1" class="no-wrap">{{__t('Khoa Phòng')}}</th>
                            <th>{{__t('Tiền sử bệnh')}}</th>
                            <th width="1"></th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr :data="item" :key="index"  v-for="(item, index) in SyncPastMedicalHistory">
                            <td class="no-wrap">{{item.ExaminationTime}}</td>
                            <td class="no-wrap"><ad-Info :ad="item.PrimaryDoctor" :type="item.Type" /></td>
                            <td class="no-wrap">{{__label(item.Clinic)}}</td>
                            <td><p v-if="item.Value">{{item.Value}}</p></td>
                            <td width="1" class="no-wrap"><button class="btn btn-xs v-white-btn" @click="copyOPDOENPMH(item.Value)">Copy</button></td>
                          </tr>
                        </tbody>
                      </table>
                    </template>
                  </vue-scrolling-table>
                </div>
              </div>
            </div>
            <div class="col-md-12" v-if="MASTERDATA['ER0HIS']">
              <div class="form-group bg-gray-2">
                <label>{{__label(MASTERDATA['ER0HIS'])}}</label>
                <template  v-for="(item,index) in MASTERDATA['ER0HIS'].Items">
                  <textarea-autosize :minHeight="100" :data="item" :key="index" class="form-control" v-model="item.Value"></textarea-autosize>
                </template>
                <div class="HistoryOfPresentIllness"  v-if="SyncHistoryOfPresentIllness && SyncHistoryOfPresentIllness.length">
                  <label> {{__t('Thông tin khai thác bệnh sử')}}</label>
                  <vue-scrolling-table v-if="SyncHistoryOfPresentIllness.length">
                    <template slot="tbl">
                      <table class="table table-bordered table-bordered-x">
                        <thead>
                          <tr>
                            <th width="130" class="no-wrap">{{__t('Ngày khám')}}</th>
                            <th width="1" class="no-wrap">{{__t('Người tạo')}}</th>
                            <th width="1" class="no-wrap">{{__t('Khoa Phòng')}}</th>
                            <th>{{__t('Nội dung')}}</th>
                            <th width="1"></th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr :data="HistoryOfPresent" :key="index"  v-for="(HistoryOfPresent, index) in SyncHistoryOfPresentIllness">
                            <td class="no-wrap">{{HistoryOfPresent.ExaminationTime}}</td>
                            <td class="no-wrap"><ad-Info :ad="HistoryOfPresent.Username" :type="HistoryOfPresent.Type"/></td>
                            <td class="no-wrap">{{__label(HistoryOfPresent)}}</td>
                            <td><p v-if="HistoryOfPresent.HistoryOfPresentIllness">{{HistoryOfPresent.HistoryOfPresentIllness}}</p></td>
                            <td width="1" class="no-wrap"><button class="btn btn-xs v-white-btn" @click="copyToOPDOENHPI(HistoryOfPresent.HistoryOfPresentIllness)">Copy</button></td>
                          </tr>
                        </tbody>
                      </table>
                    </template>
                  </vue-scrolling-table>
                </div>
              </div>
            </div>
          </div>
          <div class="box-bg">
            <label>{{__label(MASTERDATA['ER0ASS'])}}</label>
            <md-input-text :groupDefaultLib="'GENTVKBBGEEX'" v-if="MASTERDATA['ER0KTT']" v-model="MASTERDATA['ER0KTT']">
              <button class="btn btn-xs btn-flat btn-primary pull-right" @click="loadObservation(MASTERDATA['ER0KTT'].Items)">{{__t('btn.lay_du_lieu_gan_nhat')}}</button>
            </md-input-text>
            <md-input-text :groupDefaultLib="'GENTVKBBCAEX'" v-if="MASTERDATA['ER0KTM']" v-model="MASTERDATA['ER0KTM']"/>
            <md-input-text :groupDefaultLib="'GENTVKBBPUEX'" v-if="MASTERDATA['ER0KHH']" v-model="MASTERDATA['ER0KHH']"/>
            <md-input-text :defaultLib="'GENTCTBL2'" v-if="MASTERDATA['ER0KCK']" v-model="MASTERDATA['ER0KCK']"/>
            <md-input-text :groupDefaultLib="'GENTVKBBOTOE'" v-if="MASTERDATA['ER0KCBPK']" v-model="MASTERDATA['ER0KCBPK']"/>
          </div>
          <div class ="row" v-if="MASTERDATA['ER0ICD101']">
            <div class="col-md-12">
              <div class="form-group">
                <label style="font-size: 13.5px;">{{ __t(__label(MASTERDATA["ER0ICD101"]))}}</label>
                <icd10 class="mrb10" :mdCode="'ER0ICD102'" :single="true" @icdChange="icdChange" v-model="MASTERDATA['ER0ICD101'].Items[0].Value"/>
              </div>
            </div>
          </div>
          <PathWay v-if="MASTERDATA['ER0ICD101']" :MainDisease="MASTERDATA['ER0ICD101'].Items[0].Value"/>
          <div class="row">
            <div class="col-md-12" v-if="MASTERDATA['ER0ASS']" hidden>
              <div class="form-group">
                <label>{{__label(MASTERDATA['ER0ASS'])}}</label><button class="btn btn-xs btn-flat btn-primary pull-right" @click="loadObservation(MASTERDATA['ER0ASS'].Items)">{{__t('btn.lay_du_lieu_gan_nhat')}}</button>
                <template  v-for="(item,index) in MASTERDATA['ER0ASS'].Items">
                  <textarea-autosize :minHeight="100" :data="item" :key="index" class="form-control" v-model="item.Value"></textarea-autosize>
                </template>
              </div>
            </div>
            <div class="col-md-12" v-if="MASTERDATA['ER0ID0']">
              <div class="form-group">
                <label>{{__label(MASTERDATA['ER0ID0'])}}</label>
                <template  v-for="(item,index) in MASTERDATA['ER0ID0'].Items">
                  <textarea-autosize :minHeight="100" :data="item" :key="index" class="form-control" v-model="item.Value"></textarea-autosize>
                </template>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12" v-if="MASTERDATA['ER0IH0']">
              <div class="form-group">
                <label>{{__label(MASTERDATA['ER0IH0'])}}</label>
                <template  v-for="(item,index) in MASTERDATA['ER0IH0'].Items">
                  <textarea-autosize :minHeight="100" :data="item" :key="index" class="form-control" v-model="item.Value"></textarea-autosize>
                </template>
              </div>
            </div>
          </div>
          <div v-if="DataSubmit.Version < 9" class="row">
            <div class="col-md-4 col-md-offset-8">
              <div class="form-group">
                <label>{{__t('ER0.thoi_gian_kham')}}</label>
                <div><v-date-picker v-model="DataSubmit.TimeSeen" :format="vDateTimeFormat" class="full-w"/></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template v-if="!allowEdit && DataSubmit.Version >= 9">
      <div class="box-body">
        <div v-if="DataSubmit.Version >= 9" class="row">
          <div class="col-md-4">
            <div class="form-group">
              <label>{{__t('ER0.thoi_gian_kham')}}:</label> <v-date-picker v-model="DataSubmit.TimeSeen" :format="vDateTimeFormat" class="full-w" :readonly="true"/>
            </div>
          </div>
        </div>
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
        <md-input-text :readonly="true" v-if="MASTERDATA['ER0ID0']" v-model="MASTERDATA['ER0ID0']"/>
        <md-input-text :readonly="true" v-if="MASTERDATA['ER0IH0']" v-model="MASTERDATA['ER0IH0']"/>
      </div>
    </template>
    <div v-if="DataSubmit.Version >= 9">
      <Confirm
        class="mt-10"
        :MasterDataCode="'EMERGENCYRECORDCONFIRM'"
        :FormCode="'EDER0'"
        :ReadOnly="!allowEdit"
        :VisitId="$route.params.Id"
        :FormId="DataSubmit.Id"
        @getListConfirm="getListConfirm"
        @confirmSuccess="handleSave"
      />
    </div>
    <p v-if="DataSubmit.Version >= 9" class="box-body">{{__t('Chỉnh sửa lần cuối bởi')}} <AdInfo :ad="DataSubmit.UpdatedBy" /> {{__t('lúc')}} {{DataSubmit.UpdatedAt | formatDateWithoutSecon}}</p>
    <logs :EdId="this.$route.params.Id" :Type="'EmergencyRecords'" />
    <FloatBlock>
      <template slot='buttons'>
        <div class="col-md-5">
        </div>
        <div class="col-md-3">
          <div class="form-group1">
            <button class="btn v-white-btn long-btn pull-right" type="button" @click="$router.push({name: 'ED-DI0', params: {Id: $route.params.Id}})"><i class="fa fa-file-o" aria-hidden="true"></i> {{__t('Đánh giá kết thúc')}}</button>
          </div>
        </div>
        <div class="col-md-4">
          <div class="form-group1">
            <button type="button" class="btn v-yellow-btn long-btn pull-right" v-shortkey="['ctrl', 's']" @shortkey="submit()" @click="submit()"><i class="fa fa-floppy-o" aria-hidden="true"></i> {{__t('btn.luu')}}</button>
          </div>
        </div>
      </template>
    </FloatBlock>
  </div>
</template>
<script>
/* ============
 * Home Index Page
 * ============
 *
 * The home index page.
 */
import Confirm from '@/components/Form/Confirm3'
import MixinMasterData from '@/mixins/masterdata.js'
import MixinForm from '@/mixins/form.js'
import Etr from '@/components/ED/VIEW_ETR.vue'
import EmergencyRecords from '@/services/ED/EmergencyRecords'
import SyncVisitHistory from '@/services/ED/SyncVisitHistory'
import VDatePicker from '@/components/VDateTimePicker.vue'
import ObservationChart from '@/services/ObservationChart'
import _ from 'lodash'
import moment from 'moment'
import NProgress from 'nprogress'
import Logs from '@/components/Logs.vue'
import RetailServicePatient from '@/components/ED/RetailServicePatient.vue'
import PathWay from '@/components/global/PathWay.vue'
export default {
  /**
   * The name of the page.
   */
  name: 'ER0',
  mixins: [MixinMasterData, MixinForm],
  data () {
    return {
      DataSubmit: {
        Datas: []
      },
      pId: null,
      message: null,
      isErrorPop: false,
      SyncPastMedicalHistory: null,
      SyncHistoryOfPresentIllness: null,
      IsUseHandOverCheckList: true,
      dataMaster: {},
      ConfirmInfo: []
    }
  },
  /**
   * The components that the page can use.
   */
  components: {
    Etr, VDatePicker, Logs, RetailServicePatient, Confirm, PathWay
  },
  mounted () {
    this.getMasterDatas({Form: 'ER0'}, () => {
      this.getData()
    })
  },
  computed: {
    allowEdit () {
      if (this.DataSubmit.Version >= 9) {
        return !(this.ConfirmInfo.length > 0 && this.ConfirmInfo[0].ConfirmBy)
        // return false
      } else {
        return true
      }
    }
  },
  // watch: {
  //   DataSubmit: {
  //     handler () {
  //       this.edited = true
  //     },
  //     deep: true
  //   }
  // },
  methods: {
    async handleSave () {
      if (this.dataMaster !== JSON.stringify(this.MASTERDATA)) {
        await this.submit()
      }
    },
    getListConfirm (val) {
      this.ConfirmInfo = val
    },
    icdChange (value, code) {
      var val = (value || []).map(e => e.ViName)
      switch (code) {
        case 'ER0ICD102':
          if (!this.MASTERDATA['ER0ID0'].Items[0].Value) this.MASTERDATA['ER0ID0'].Items[0].Value = val.join(', ')
      }
    },
    copyToOPDOENHPI (str) {
      str = this.trim_(str)
      if (this.MASTERDATA['ER0HIS'].Items[0].Value && this.MASTERDATA['ER0HIS'].Items[0].Value.includes(str)) {
      } else {
        var old = this.MASTERDATA['ER0HIS'].Items[0].Value ? (this.trim_(this.MASTERDATA['ER0HIS'].Items[0].Value) + '\n') : ''
        this.MASTERDATA['ER0HIS'].Items[0].Value = this.trim_(old + '-' + str, ', ')
        this.toastedInfo('Đã copy')
      }
    },
    copyOPDOENPMH (str) {
      str = this.trim_(str)
      if (this.MASTERDATA['ER0PHH'].Items[0].Value && this.MASTERDATA['ER0PHH'].Items[0].Value.includes(str)) {
      } else {
        var old = this.MASTERDATA['ER0PHH'].Items[0].Value ? (this.trim_(this.MASTERDATA['ER0PHH'].Items[0].Value) + '\n') : ''
        this.MASTERDATA['ER0PHH'].Items[0].Value = this.trim_(old + '-' + str, ', ')
        this.toastedInfo('Đã copy')
      }
    },
    SyncVisitHistory () {
      new SyncVisitHistory().create({Id: this.$route.params.Id}).then(response => {
        this.SyncHistoryOfPresentIllness = response.HistoryOfPresentIllness
        this.SyncPastMedicalHistory = response.PastMedicalHistory
      })
    },
    loadObservation (data) {
      new ObservationChart({notRedirectAndLoginPopup: true, VisitType: 'ED'}).find(this.$route.params.Id).then(response => {
        // var val = response.Datas[response.Datas.length - 1]
        var val = response.Datas[0]
        if (val) {
          data[0].Value = this.trim_(data[0].Value + `${(data[0].Value ? ',\n' : '')}- Huyết áp ${val.SysBP}/${val.DiaBP} mmHg, Mạch ${val.Pulse} nhịp/phút, Nhiệt độ: ${val.Temperature} độ C, Nhịp thở: ${val.Resp} lần/phút, Spo2: ${val.SpO2}%, Đau: ${val.RestPainScore}, Moving: ${val.MovePainScore}`, ', ')
        }
      })
    },
    submit () {
      // this.MASTERDATA['ER0ICD101'].Items[0].Value = ''
      NProgress.start()
      var obj = {}
      this.DataSubmit.Datas = []
      this.DataSubmit._Exception = []
      for (const property in this.MASTERDATA) {
        if (this.MASTERDATA[property].Items) {
          this.MASTERDATA[property].Items.forEach(item => {
            if (item.Code === 'ER0ICD102' && item.Value) {
              item.Value = JSON.stringify(item.Value)
            }
            this.DataSubmit.Datas.push({
              Code: item.Code,
              Value: item.Value
            })
            obj[item.Code] = item.Value
          })
        }
      }
      setTimeout(() => {
        var DataSubmit = Object.assign({}, this.DataSubmit)
        if (typeof DataSubmit.TimeSeen === 'object') {
          DataSubmit.TimeSeen = moment(DataSubmit.TimeSeen).format(this.vDateTimeFormat)
        }
        if (DataSubmit.TimeSeen) {
          DataSubmit._Exception.push({
            key: 'TimeSeen',
            value: DataSubmit.TimeSeen
          })
        }
        new EmergencyRecords().update(this.$route.params.Id, DataSubmit).then(response => {
          // this.$router.push({name: 'etr', params: {Id: response.Id}})
          this.toastedSuccess()
          this.edited = false
          this.getData()
        }).catch(e => {
          this._401ResponseError(e)
        })
      }, 100)
    },
    getData () {
      new EmergencyRecords().find(this.$route.params.Id).then(response => {
        // this.$router.push({name: 'etr', params: {Id: response.Id}})
        this.$store.dispatch('setCurrentFormId', response.Id)
        this.DataSubmit = response
        this.IsUseHandOverCheckList = response.IsUseHandOverCheckList
        if (this.IsUseHandOverCheckList == null || this.IsUseHandOverCheckList === undefined) {
          this.IsUseHandOverCheckList = true
        }
        if (!this.DataSubmit.TimeSeen) {
          this.DataSubmit.TimeSeen = new Date()
        } else {
          this.DataSubmit.TimeSeen = moment(this.DataSubmit.TimeSeen, this.vDateTimeFormat)
        }
        for (const property in this.MASTERDATA) {
          if (this.MASTERDATA[property].Items) {
            this.MASTERDATA[property].Items.forEach(item => {
              var code = item.Code
              var exited = _.find(this.DataSubmit.Datas, {Code: code})
              if (exited) {
                if (this.checkString(item.DataType, 'CheckBox') || this.checkString(item.DataType, 'Radio')) {
                  var isTrue = (exited.Value === 'True')
                  item.Value = isTrue
                } else if (exited.Value && item.Code === 'ER0ICD102') {
                  if (exited.Value !== '') {
                    item.Value = this.JSONParse(exited.Value, true)
                  }
                } else {
                  item.Value = exited.Value
                }
              }
            })
          }
        }
        setTimeout(() => {
          this.dataMaster = JSON.stringify(this.MASTERDATA)
          this.SyncVisitHistory()
          this.edited = false
        }, 500)
      }).catch(e => {
        if (e.status === 400) {
          this._404()
        }
      })
    }
  }
}
</script>
