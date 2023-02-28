<template>
  <div>
    <div class="tab-content" v-if="DataSubmit">
      <table class="table v-table-1" :class="{'disabel-table': isConfirmed}">
        <tr v-if="MASTERDATA['EDARRPAHAPAS'] && MASTERDATA['EDARRPAHATIM']">
          <th width="1">
            <p class="mb-5">{{__label(MASTERDATA['EDARRPAHAPAS'])}}</p>
            <v-date-picker :format="'HH:mm DD/MM/YYYY'" v-model="MASTERDATA['EDARRPAHATIM'].Items[0].Value" class="wmg"/>
          </th>
          <td>
            <!-- ok -->
            <div class="row">
              <div class="col-md-4 col-sm-4">
                <p class="mb-5"><b>{{__label(MASTERDATA['EDARRPAHAGLS'])}}:</b></p>
                <textarea-autosize :placeholder="__t('Nhập')" v-model="MASTERDATA['EDARRPAHAGLS'].Items[0].Value" class="form-control"/>
              </div>
              <div class="col-md-2 col-sm-2">
                <p class="mb-5"><b>{{__label(MASTERDATA['EDARRPAHAPUL'])}}:</b></p>
                <input :placeholder="__t('Nhập')" v-model="MASTERDATA['EDARRPAHAPUL'].Items[0].Value" class="form-control"/>
              </div>
              <div class="col-md-2 col-sm-2">
                <p class="mb-5"><b>{{__label(MASTERDATA['EDARRPAHAHER'])}}:</b></p>
                <input :placeholder="__t('Nhập')" v-model="MASTERDATA['EDARRPAHAHER'].Items[0].Value" class="form-control"/>
              </div>
              <div class="col-md-2 col-sm-2">
                <p class="mb-5"><b>{{__label(MASTERDATA['EDARRPAHABLP'])}}:</b></p>
                <input :placeholder="__t('Nhập')" v-model="MASTERDATA['EDARRPAHABLP'].Items[0].Value" class="form-control"/>
              </div>
              <div class="col-md-2 col-sm-2">
                <p class="mb-5"><b>{{__label(MASTERDATA['EDARRPAHARER'])}}:</b></p>
                <input :placeholder="__t('Nhập')" v-model="MASTERDATA['EDARRPAHARER'].Items[0].Value" class="form-control"/>
              </div>
            </div>
            <br/>
            <label>{{__t('Thuốc đang dùng')}}</label>
            <list-of-current-medications
              ref="ListOfCurrentMedications"
              :Type="'ED-PatientHandover'"
              :VisitTypeGroupCode="'ED'"
              :RealOnly="isConfirmed"
              />
          </td>
        </tr>
        <tr v-if="MASTERDATA['EDARRPAHAITS']">
          <th>
            {{__label(MASTERDATA['EDARRPAHAITS'])}}
          </th>
          <td>
            <div class="row">
              <div class="col-md-4 col-sm-6" :data="item" :key="index" v-for="(item, index) in MASTERDATA['EDARRPAHAITS'].Items" v-if="index !== 6">
                <div class="flex-box flex-center">
                  <div class="v-checkbox">
                    <input type="checkbox" :id="'EDARRPAHAITSradio-' + index" v-model="item.Value">
                    <label :for="'EDARRPAHAITSradio-' + index"></label>
                  </div>
                  <span class="displaytbl" :class="{'no-wrap': index === 5}"><span>{{__label(item)}}</span></span>
                  <input :placeholder="__t('Nhập')" v-if="MASTERDATA['EDARRPAHAITS'].Items[5].Value && index === 5" class="form-control ml-5" v-model="MASTERDATA['EDARRPAHAITS'].Items[6].Value" />
                </div>
              </div>
            </div>
          </td>
        </tr>
        <tr v-if="MASTERDATA['EDARRPAHAADC']">
          <th>
            {{__label(MASTERDATA['EDARRPAHAADC'])}}
          </th>
          <td>
            <textarea-autosize :placeholder="__t('Nhập')" rows="3" v-model="MASTERDATA['EDARRPAHAADC'].Items[0].Value" class="form-control"/>
          </td>
        </tr>
      </table>
      <br/>
      <div class="row">
        <div class="col-md-6 col-sm-6 text-center">
          <p v-if="DataSubmit.TransferTime">{{DataSubmit.TransferTime}}</p>
          <p><b>{{__t('Người bàn giao')}}</b></p>
          <div v-if="DataSubmit.TransferTime">
            <EformSignature :title="''" :ad="DataSubmit.Transfer.Username" />
          </div>
          <div v-else><button @click="showDoctorConfirm('Transfer', 'Người bàn giao')" class="btn v-white-btn">{{__t('Xác nhận')}}</button></div>
        </div>
        <div class="col-md-6 col-sm-6 text-center">
          <p v-if="DataSubmit.AdmitTime">{{DataSubmit.AdmitTime}}</p>
          <p><b>{{__t('Người nhận bàn giao')}}</b></p>
          <div v-if="DataSubmit.AdmitTime">
            <EformSignature :title="''" :ad="DataSubmit.Admit.Username" />
          </div>
          <div v-else><button @click="showDoctorConfirm('Admit', 'Người nhận bàn giao')" class="btn v-white-btn">{{__t('Xác nhận')}}</button></div>
        </div>
      </div>
      <br/>
      <br/>
      <br/>
      <modal name="doctorConfirm" transition="pop-out" id="doctor-login" height="auto" :clickToClose="false">
        <div class="box v-model-content-popup">
          <div class="box-header text-center">
            <h3 class="box-title">{{__t(popupTitle)}}.</h3>
            <div style="color: #fff">{{__t('Vui lòng nhập tài khoản ad để xác nhận')}}</div>
          </div>
          <div class="form-confirm">
            <div class="form-group has-feedback">
              <input v-model="user.username" type="text" class="form-control" :placeholder="__t('Tên đăng nhập')"/>
              <span class="glyphicon glyphicon-user form-control-feedback"></span>
            </div>
            <div class="form-group has-feedback">
              <input v-model="user.password" type="password" class="form-control current-password" :placeholder="__t('Mật khẩu')"/>
              <span class="glyphicon glyphicon-lock form-control-feedback"></span>
            </div>
            <div class="row">
              <div class="col-xs-6">
                <button type="button" class="btn btn-block v-white-btn" @click="$modal.hide('doctorConfirm')">{{__t('Thoát')}}</button>
              </div>
              <div class="col-xs-6">
                <button type="button" class="btn btn-block v-yellow-btn" @click="confirm()">{{__t('Xác nhận')}}</button>
              </div>
            </div>
            <p style="margin-top: 10px; text-align:center">{{__t('Sử dụng tài khoản máy tính')}}</p>
            <p style="margin-top: 10px; text-align:center">{{__t('Sau khi xác nhận, người dùng sẽ không thể chỉnh sửa thông tin trên phiếu')}}</p>
          </div>
        </div>
      </modal>
      <br/>
      <div>
        <LastUpdateWithFormCode :FormCode="'A03_006_050919_VE'" :DataSubmit="DataSubmit"/>
      </div>
      <!-- <div>
        <logs :EdId="this.$route.params.Id" :Type="'AmbulanceRunReport/PatientHandover'" :noDetail="true" />
        <p>A03_006_050919_VE</p>
      </div> -->
      <FloatBlock>
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
import ListOfCurrentMedications from '@/components/ListOfCurrentMedications.vue'
// import moment from 'moment'
import NProgress from 'nprogress'
export default {
  name: 'PatientHandover',
  mixins: [MixinForm, MixinMasterData],
  data () {
    return {
      DataSubmit: null,
      loaded: false,
      user: {},
      popupTitle: ''
    }
  },
  components: {
    VDatePicker, Logs, ListOfCurrentMedications
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
    this.getMasterDatas({Form: 'EDARRPAHA'}, () => {
      this.getData()
    })
  },
  computed: {
    isConfirmed: function () {
      return this.DataSubmit.TransferTime || this.DataSubmit.AdmitTime
    }
  },
  methods: {
    async confirm () {
      if (this.edited) {
        await this.submit()
      }
      new AmbulanceRunReport(this.VisitType).update('PatientHandover/Confirm/' + this.$route.params.Id, this.user).then(response => {
        this.$modal.hide('doctorConfirm')
        this.toastedSuccess(this.$t('Xác nhận thành công'))
        this.getData()
      }).catch(e => {
        this.$modal.hide('doctorConfirm')
      })
    },
    showDoctorConfirm (kind, title, id) {
      this.confirmId = id
      this.popupTitle = title
      this.user.kind = kind
      this.$modal.show('doctorConfirm')
    },
    submit () {
      var obj = {}
      NProgress.start()
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
      return new AmbulanceRunReport().update('PatientHandover/' + this.$route.params.Id, this.DataSubmit).then(response => {
        this.toastedSuccess().getData()
        this.edited = false
        if (this.$refs.ListOfCurrentMedications) {
          this.$refs.ListOfCurrentMedications.submit()
        }
      }).catch(e => {
        // this._401ResponseError(e)
      })
    },
    getData () {
      this.loaded = false
      new AmbulanceRunReport().find('PatientHandover/' + this.$route.params.Id + '?hidemsg=' + true).then(response => {
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
        setTimeout(() => {
          this.edited = false
        }, 100)
      }).catch(e => {
        this.loaded = true
        this.DataSubmit = false
        if (e.status === 404) {}
      })
    }
  }
}
</script>
