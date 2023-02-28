<template>
<div>
  <div v-if="DataSubmit">
    <template v-if="allowEdit">
    <div class="form-control" v-if="DataSubmit.IsShowSyncButton"><button class="btn btn-sync-data pull-right" @click="syncData()">{{__t('Lấy dữ liệu đánh giá gần nhất trong vòng 24 giờ')}}</button></div>
    <table class="table v-table-1 table-bordered" v-if="!syncing">
      <tr v-if="MASTERDATA['OPDFRSFOPTD0']">
        <th rowspan="2" class="align-left">{{__t('ETR.cau_hoi_sang_loc')}}</th>
        <th :data="item" :key="index" v-for="(item,index) in MASTERDATA['OPDFRSFOPTD0'].Items" width="200">
          <v-masked-input mask="11:11 11/11/1111" v-model="item.Value" :placeholder="'HH:mm MM/DD/YYYY'" class="form-control datetime-input" />
          <span class="glyphicon glyphicon-time icon-now" @click="setNow(item)"></span>
        </th>
      </tr>
      <tr v-if="MASTERDATA['OPDFRSFOPLOC']">
        <th :data="item" :key="index" v-for="(item,index) in MASTERDATA['OPDFRSFOPLOC'].Items">
          <v-select style="width: 180px" class='select-full-w' :search="true" :placeholder="__t('Địa điểm')" v-model="item.Value" :items="Clinics"/>
        </th>
      </tr>
      <tr v-if="MASTERDATA['OPDFRSFOPDPH']">
        <td>{{__label(MASTERDATA['OPDFRSFOPDPH'])}}</td>
        <td :data="item" :key="index" v-for="(item,index) in MASTERDATA['OPDFRSFOPDPH'].Items">
          <div class="v-btn-checkbox">
            <button :class="{'active': item.Value === '1'}" class="btn btn-select" @click="item.Value === '1' ? item.Value = '-1' : item.Value = '1'">{{__t('Có')}}</button>
            <button :class="{'active': item.Value === '0'}" class="btn btn-select" @click="item.Value === '0' ? item.Value = '-1' : item.Value = '0'">{{__t('Không')}}</button>
          </div>
        </td>
      </tr>
      <tr v-if="MASTERDATA['OPDFRSFOPDPN']">
        <td>{{__label(MASTERDATA['OPDFRSFOPDPN'])}}</td>
        <td :data="item" :key="index" v-for="(item,index) in MASTERDATA['OPDFRSFOPDPN'].Items">
          <div class="v-btn-checkbox">
            <button :class="{'active': item.Value === '1'}" class="btn btn-select" @click="item.Value === '1' ? item.Value = '-1' : item.Value = '1'">{{__t('Có')}}</button>
            <button :class="{'active': item.Value === '0'}" class="btn btn-select" @click="item.Value === '0' ? item.Value = '-1' : item.Value = '0'">{{__t('Không')}}</button>
          </div>
        </td>
      </tr>
      <tr v-if="MASTERDATA['OPDFRSFOPHPF']">
        <td>{{__label(MASTERDATA['OPDFRSFOPHPF'])}}</td>
        <td :data="item" :key="index" v-for="(item,index) in MASTERDATA['OPDFRSFOPHPF'].Items">
          <div class="v-btn-checkbox">
            <button :class="{'active': item.Value === '1'}" class="btn btn-select" @click="item.Value === '1' ? item.Value = '-1' : item.Value = '1'">{{__t('Có')}}</button>
            <button :class="{'active': item.Value === '0'}" class="btn btn-select" @click="item.Value === '0' ? item.Value = '-1' : item.Value = '0'">{{__t('Không')}}</button>
          </div>
        </td>
      </tr>
      <tr v-if="MASTERDATA['OPDFRSFOPUTH']">
        <td>{{__label(MASTERDATA['OPDFRSFOPUTH'])}}</td>
        <td :data="item" :key="index" v-for="(item,index) in MASTERDATA['OPDFRSFOPUTH'].Items">
          <div class="v-btn-checkbox">
            <button :class="{'active': item.Value === '1'}" class="btn btn-select" @click="item.Value === '1' ? item.Value = '-1' : item.Value = '1'">{{__t('Có')}}</button>
            <button :class="{'active': item.Value === '0'}" class="btn btn-select" @click="item.Value === '0' ? item.Value = '-1' : item.Value = '0'">{{__t('Không')}}</button>
          </div>
        </td>
      </tr>
      <tr>
        <td colspan="4"><span style="color: red;font-size: 13px;font-style: italic;">{{__t('*Người bệnh có ít nhất 1 trong 4 câu hỏi sàng lọc thì được đánh giá là có nguy cơ ngã cao và cần áp dụng các biện pháp can thiệp phù hợp.')}}</span></td>
      </tr>
      <template v-if="hasInitialAssessment">
      <tr v-if="MASTERDATA['OPDFRSFOPINT']">
        <th colspan="4" style="text-align: left;">{{__label(MASTERDATA['OPDFRSFOPINT'])}}</th>
      </tr>
      <tr v-if="MASTERDATA['OPDFRSFOPFRS']">
        <td>{{__label(MASTERDATA['OPDFRSFOPFRS'])}}</td>
        <td :data="item" :key="index" v-for="(item,index) in MASTERDATA['OPDFRSFOPFRS'].Items" class="v-checkbox" align="center">
          <input type="checkbox" :id="'OPDFRSFOPFRS-' + index" :name="'OPDFRSFOPFRS-' + index" v-model="item.Value">
          <label :for="'OPDFRSFOPFRS-' + index"></label>
        </td>
      </tr>
      <tr v-if="MASTERDATA['OPDFRSFOPPIO']">
        <td>{{__label(MASTERDATA['OPDFRSFOPPIO'])}}</td>
        <td :data="item" :key="index" v-for="(item,index) in MASTERDATA['OPDFRSFOPPIO'].Items" class="v-checkbox" align="center">
          <input type="checkbox" :id="'OPDFRSFOPPIO-' + index" :name="'OPDFRSFOPPIO-' + index" v-model="item.Value">
          <label :for="'OPDFRSFOPPIO-' + index"></label>
        </td>
      </tr>
      <tr v-if="MASTERDATA['OPDFRSFOPLUA']">
        <td>{{__label(MASTERDATA['OPDFRSFOPLUA'])}}</td>
        <td :data="item" :key="index" v-for="(item,index) in MASTERDATA['OPDFRSFOPLUA'].Items" class="v-checkbox" align="center">
          <input type="checkbox" :id="'OPDFRSFOPLUA-' + index" :name="'OPDFRSFOPLUA-' + index" v-model="item.Value">
          <label :for="'OPDFRSFOPLUA-' + index"></label>
        </td>
      </tr>
      <tr v-if="MASTERDATA['OPDFRSFOPIOE']">
        <td>{{__label(MASTERDATA['OPDFRSFOPIOE'])}}</td>
        <td :data="item" :key="index" v-for="(item,index) in MASTERDATA['OPDFRSFOPIOE'].Items" class="v-checkbox" align="center">
          <input type="checkbox" :id="'OPDFRSFOPIOE-' + index" :name="'OPDFRSFOPIOE-' + index" v-model="item.Value">
          <label :for="'OPDFRSFOPIOE-' + index"></label>
        </td>
      </tr>
      <tr v-if="MASTERDATA['OPDFRSFOPSPM']">
        <td>{{__label(MASTERDATA['OPDFRSFOPSPM'])}}</td>
        <td :data="item" :key="index" v-for="(item,index) in MASTERDATA['OPDFRSFOPSPM'].Items" class="v-checkbox" align="center">
          <input type="checkbox" :id="'OPDFRSFOPSPM-' + index" :name="'OPDFRSFOPSPM-' + index" v-model="item.Value">
          <label :for="'OPDFRSFOPSPM-' + index"></label>
        </td>
      </tr>
      <tr v-if="MASTERDATA['OPDFRSFOPPAA']">
        <td>{{__label(MASTERDATA['OPDFRSFOPPAA'])}}</td>
        <td :data="item" :key="index" v-for="(item,index) in MASTERDATA['OPDFRSFOPPAA'].Items" class="v-checkbox" align="center">
          <input type="checkbox" :id="'OPDFRSFOPPAA-' + index" :name="'OPDFRSFOPPAA-' + index" v-model="item.Value">
          <label :for="'OPDFRSFOPPAA-' + index"></label>
        </td>
      </tr>
      <tr v-if="MASTERDATA['OPDFRSFOPEDF']">
        <td>{{__label(MASTERDATA['OPDFRSFOPEDF'])}}</td>
        <td :data="item" :key="index" v-for="(item,index) in MASTERDATA['OPDFRSFOPEDF'].Items" class="v-checkbox" align="center">
          <input type="checkbox" :id="'OPDFRSFOPEDF-' + index" :name="'OPDFRSFOPEDF-' + index" v-model="item.Value">
          <label :for="'OPDFRSFOPEDF-' + index"></label>
        </td>
      </tr>
      <tr v-if="MASTERDATA['OPDFRSFOPRM0']">
        <td>{{__label(MASTERDATA['OPDFRSFOPRM0'])}}</td>
        <td :data="item" :key="index" v-for="(item,index) in MASTERDATA['OPDFRSFOPRM0'].Items" class="v-checkbox" align="center">
          <input type="checkbox" :id="'OPDFRSFOPRM0-' + index" :name="'OPDFRSFOPRM0-' + index" v-model="item.Value">
          <label :for="'OPDFRSFOPRM0-' + index"></label>
        </td>
      </tr>
      <tr v-if="MASTERDATA['OPDFRSFOPRBR']">
        <td>{{__label(MASTERDATA['OPDFRSFOPRBR'])}}</td>
        <td :data="item" :key="index" v-for="(item,index) in MASTERDATA['OPDFRSFOPRBR'].Items" class="v-checkbox" align="center">
          <input type="checkbox" :id="'OPDFRSFOPRBR-' + index" :name="'OPDFRSFOPRBR-' + index" v-model="item.Value">
          <label :for="'OPDFRSFOPRBR-' + index"></label>
        </td>
      </tr>
      <tr v-if="MASTERDATA['OPDFRSFOPUTY']">
        <td>{{__label(MASTERDATA['OPDFRSFOPUTY'])}}</td>
        <td :data="item" :key="index" v-for="(item,index) in MASTERDATA['OPDFRSFOPUTY'].Items" class="v-checkbox" align="center">
          <input type="checkbox" :id="'OPDFRSFOPUTY-' + index" :name="'OPDFRSFOPUTY-' + index" v-model="item.Value">
          <label :for="'OPDFRSFOPUTY-' + index"></label>
        </td>
      </tr>
      <tr v-if="MASTERDATA['OPDFRSFOPOTH']">
        <td>
          {{__label(MASTERDATA['OPDFRSFOPOTH'])}}
          <template v-for="(item,index) in MASTERDATA['OPDFRSFOPOTH'].Items">
            <input :data="item" :key="index"  v-if="item.DataType === 'Text'" v-model="item.Value" class="form-control" />
          </template>
        </td>
        <td :data="item" :key="index" v-for="(item,index) in MASTERDATA['OPDFRSFOPOTH'].Items" class="v-checkbox" align="center" v-if="item.DataType === 'CheckBox'">
          <input type="checkbox" :id="'OPDFRSFOPOTH-' + index" :name="'OPDFRSFOPOTH-' + index" v-model="item.Value">
          <label :for="'OPDFRSFOPOTH-' + index"></label>
        </td>
      </tr>
      </template>
    </table>
    <div class="status-float-block">
      <div class="action-btn-block">
        <div class="container">
          <div class="content-container">
            <div class="row">
              <div class="col-sm-2 col-md-1">
                <div class="form-group1">
                </div>
              </div>
              <div class="col-sm-2 col-md-2">
                <div class="form-group1">
                  <button class="btn btn-block v-white-btn" type="button" @click="back()"><i class="fa fa-angle-double-left" aria-hidden="true"></i> {{__t('Quay lại')}}</button>
                </div>
              </div>
              <div class="col-sm-4 col-md-4">
                <div class="form-group1">
                </div>
              </div>
              <div class="col-sm-4 col-md-5">
                <div class="form-group1">
                  <button class="btn v-yellow-btn pull-right btn-block hvr-ripple-out" v-shortkey="['ctrl', 's']" @shortkey="save()" type="button" @click="save()"><i class="fa fa-floppy-o" aria-hidden="true"></i> {{__t('btn.luu')}}</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <logs :EdId="this.$route.params.Id" :Type="'OPD/InitialAssessments/FallRiskScreening'" />
    </template>
    <ViewOnly v-else :MASTERDATA="MASTERDATA" :options="Clinics"/>
  </div>
</div>
</template>
<script>
import MixinMasterData from '@/mixins/masterdata.js'
import MixinForm from '@/mixins/form.js'
import moment from 'moment'
import ViewOnly from '@/components/OPD/FallRiskScreenView.vue'
// import MaskedInput from 'vue-masked-input'
import VSelect from '@/components/VSelect.vue'
import InitialAssessment from '@/services/EOC/InitialAssessment'
import NProgress from 'nprogress'
import _ from 'lodash'
import Logs from '@/components/Logs.vue'
export default {
  name: 'InitialAssessmentFallRiskScreening',
  mixins: [MixinMasterData, MixinForm],
  props: ['ViewOnly', 'VisitId', 'VisitType', 'formId', 'OpdId'],
  components: {VSelect, Logs, ViewOnly},
  data () {
    return {
      syncing: false,
      DataSubmit: null,
      loaded: false,
      hasErrForm: false,
      FormCode: 'A02_007_220321_VE'
    }
  },
  mounted () {
  },
  created () {
    this.getMasterDatas({Form: 'OPDFRSFOP'}, () => {
      this.getClinics()
      this.getData()
    })
  },
  watch: {
    formId: {
      handler () {
        this.getMasterDatas({Form: 'OPDFRSFOP'}, () => {
          this.getData()
        })
      }
    }
  },
  computed: {
    hasInitialAssessment: function () {
      var list = [
        ...(this.MASTERDATA['OPDFRSFOPDPH'] ? this.MASTERDATA['OPDFRSFOPDPH'].Items : []),
        ...(this.MASTERDATA['OPDFRSFOPDPN'] ? this.MASTERDATA['OPDFRSFOPDPN'].Items : []),
        ...(this.MASTERDATA['OPDFRSFOPHPF'] ? this.MASTERDATA['OPDFRSFOPHPF'].Items : []),
        ...(this.MASTERDATA['OPDFRSFOPUTH'] ? this.MASTERDATA['OPDFRSFOPUTH'].Items : [])
      ]
      return list.find(e => e.Value === '1')
    },
    allowEdit () {
      return this.DataSubmit.CreatedBy === this.getCurrentUsername() || this.ImSuperAdmin()
    },
    _ItemId: function () {
      return this.$route.params.Item || this.formId
    }
  },
  methods: {
    syncData () {
      this.syncing = true
      new InitialAssessment().update('/FallRiskScreening/Sync/' + this.FormCode + '/' + this._VisitId + '/' + this._ItemId).then(response => {
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
        this.syncing = false
      }).catch(e => {
        this.syncing = false
      })
    },
    setNow (item) {
      item.Value = moment(new Date()).format(this.vDateTimeFormat)
    },
    save () {
      NProgress.start()
      this.DataSubmit.Datas = []
      for (const property in this.MASTERDATA) {
        if (this.MASTERDATA[property].Items) {
          this.MASTERDATA[property].Items.forEach(item => {
            this.DataSubmit.Datas.push({
              Code: item.Code,
              Value: item.Value
            })
          })
        }
      }
      setTimeout(() => {
        this.DataSubmit.Room = {}
        new InitialAssessment().update('/FallRiskScreening/Update/' + this.FormCode + '/' + this._VisitId + '/' + this._ItemId, this.DataSubmit).then(response => {
          this.toastedSuccess()
          this.edited = false
        }).catch(e => {
          this._401ResponseError(e)
        })
      }, 100)
    },
    getData () {
      new InitialAssessment({hidemsg: true}).find('/FallRiskScreening/' + this.FormCode + '/' + this._VisitId + '/' + this._ItemId).then(response => {
        this.DataSubmit = response
        this.mapMdData2Data()
        this.loaded = true
      }).catch(e => {
        if (e.status !== 404) this.hasErrForm = true
        this.loaded = true
      })
    }
  }
}
</script>
