<template>
  <div>
    <div class="tab-content" v-if="DataSubmit">
      <table class="table v-table-1" :class="{'disabel-table': isConfirmed}">
        <tr v-if="MASTERDATA['EDARRPAHAPAS'] && MASTERDATA['EDARRPAHATIM']">
          <th width="1">
            <p class="mb-5">{{__label(MASTERDATA['EDARRPAHAPAS'])}}</p>
            <p class="fake-input disable no-wrap" style="white-space: nowrap">{{MASTERDATA['EDARRPAHATIM'].Items[0].Value || 'N/A'}}</p>
          </th>
          <td>
            <div class="row">
              <div class="col-md-4 col-sm-4">
                <p class="mb-5"><b>{{__label(MASTERDATA['EDARRPAHAGLS'])}}:</b></p>
                <p class="fake-input disable">{{MASTERDATA['EDARRPAHAGLS'].Items[0].Value || 'N/A'}}</p>
              </div>
              <div class="col-md-2 col-sm-2">
                <p class="mb-5"><b>{{__label(MASTERDATA['EDARRPAHAPUL'])}}:</b></p>
                <p class="fake-input disable no-wrap" style="white-space: nowrap">{{MASTERDATA['EDARRPAHAPUL'].Items[0].Value || 'N/A'}}</p>
              </div>
              <div class="col-md-2 col-sm-2">
                <p class="mb-5"><b>{{__label(MASTERDATA['EDARRPAHAHER'])}}:</b></p>
                <p class="fake-input disable no-wrap" style="white-space: nowrap">{{MASTERDATA['EDARRPAHAHER'].Items[0].Value || 'N/A'}}</p>
              </div>
              <div class="col-md-2 col-sm-2">
                <p class="mb-5"><b>{{__label(MASTERDATA['EDARRPAHABLP'])}}:</b></p>
                <p class="fake-input disable no-wrap" style="white-space: nowrap">{{MASTERDATA['EDARRPAHABLP'].Items[0].Value || 'N/A'}}</p>
              </div>
              <div class="col-md-2 col-sm-2">
                <p class="mb-5"><b>{{__label(MASTERDATA['EDARRPAHARER'])}}:</b></p>
                <p class="fake-input disable no-wrap" style="white-space: nowrap">{{MASTERDATA['EDARRPAHARER'].Items[0].Value || 'N/A'}}</p>
              </div>
            </div>
            <br/>
            <label>{{__t('Thuốc đang dùng')}}</label>
            <list-of-current-medications
              ref="ListOfCurrentMedications"
              :Type="'ED-PatientHandover'"
              :VisitTypeGroupCode="'ED'"
              :RealOnly="true"
              />
          </td>
        </tr>
        <tr v-if="MASTERDATA['EDARRPAHAITS']">
          <th>
            {{__label(MASTERDATA['EDARRPAHAITS'])}}
          </th>
          <td>
            <div class="row">
              <div class="col-md-4 col-sm-6" :data="item" :key="index" v-for="(item, index) in MASTERDATA['EDARRPAHAITS'].Items" v-if="index !== 6 && item.Value">
                <div class="flex-box flex-centser">
                  <CheckboxValue v-model="item.Value" />
                  <span class="displaytbl" :class="{'no-wrap': index === 5}"><span>{{__label(item)}}</span></span>
                  <p class="fake-input disable no-wrasp" v-if="MASTERDATA['EDARRPAHAITS'].Items[5].Value && index === 5">{{MASTERDATA['EDARRPAHAITS'].Items[6].Value || 'N/A'}}</p>
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
            <textarea-autosize readonly :placeholder="__t('N/A')" rows="3" v-model="MASTERDATA['EDARRPAHAADC'].Items[0].Value" class="form-control"/>
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
          <div v-else>
            <div class="italic fw400" style="color: green">({{__t('Chưa ký xác nhận')}})</div>
          </div>
        </div>
        <div class="col-md-6 col-sm-6 text-center">
          <p v-if="DataSubmit.AdmitTime">{{DataSubmit.AdmitTime}}</p>
          <p><b>{{__t('Người nhận bàn giao')}}</b></p>
          <div v-if="DataSubmit.AdmitTime">
            <EformSignature :title="''" :ad="DataSubmit.Admit.Username" />
          </div>
          <div v-else>
            <div class="italic fw400" style="color: green">({{__t('Chưa ký xác nhận')}})</div>
          </div>
        </div>
      </div>
      <br/>
      <br/>
      <br/>
      <div>
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
import ListOfCurrentMedications from '@/components/ListOfCurrentMedications.vue'

// import moment from 'moment'
export default {
  name: 'PatientHandover',
  mixins: [MixinForm, MixinMasterData],
  props: ['VisitId'],
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
    getData () {
      this.loaded = false
      new AmbulanceRunReport().find('PatientHandover/' + this._VisitId + '?hidemsg=' + true).then(response => {
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
