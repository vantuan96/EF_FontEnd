<template>
  <div v-if="loaded">
    <div v-if="allowEdit && !ViewOnly">
      <div class="form-control" v-if="DataSubmit.IsShowSyncButton"><button class="btn btn-sync-data pull-right" @click="syncData()">{{__t('Lấy dữ liệu đánh giá gần nhất trong vòng 24 giờ')}}</button></div>
      <div class="row mt-10 mb-10">
        <div v-if="MASTERDATA['OPDFRSFOPLOC']" class="col-md-4">
          <div class="flex-box flex-center">
            <label class="display-inline no-wrap mr-5 my-0">{{__label(MASTERDATA['OPDFRSFOPLOC'])}}:</label>
            <input v-model="MASTERDATA['OPDFRSFOPLOC'].Items[0].Value" class="form-control" />
            <!-- <v-select class='select-full-w' :search="true" :placeholder="__t('Địa điểm')" v-model="MASTERDATA['OPDFRSFOPLOC'].Items[0].Value" :items="Clinics"/> -->
          </div>
        </div>
        <div v-if="MASTERDATA['OPDFRSFOPTD0']" class="col-md-4">
          <div class="flex-box flex-center">
            <label class="display-inline no-wrap mr-5 my-0">{{__label(MASTERDATA['OPDFRSFOPTD0'])}}:</label>
            <VDateTimePicker3 :hideTooltip="true" v-model="time" :max="timeNow" :min="$store.state.account.CurrentPatientObj.AdmittedDate" :format="vDateTimeFormat"/>
          </div>
        </div>
        <div v-if="DataSubmit && DataSubmit.Version < 9" class="col-md-4">
          <div style="transform: translateY(7px);" class="flex-box flex-center">
            <label class="display-inline no-wrap mr-5 my-0">{{__t('ETR.nguoi_thuc_hien')}}:</label>
            <ad-Info class="no-margin" :ad="DataSubmit.CreatedBy"/>
          </div>
        </div>
      </div>
      <table class="table v-table-1 table-bordered" v-if="!syncing && MASTERDATA['OPDFRSFOPUTH']">
        <tr v-if="MASTERDATA['OPDFRSFOPTD0']">
          <th class="align-left">{{__t('ETR.screening')}}</th>
          <th width="35%" class="text-center">{{__t('ETR.thuc_hien')}}</th>
        </tr>
        <tr v-if="MASTERDATA['OPDFRSFOPUTH']">
          <td class="text-bold">{{__t('ETR.doi_tuong_co_nguy_co_nga_cao')}} ?</td>
          <td>
            <div :key="index" v-for="(item,index) in MASTERDATA['OPDFRSFOPUTH'].Items" v-if="index === 0" class="v-btn-checkbox">
              <button :class="{'active': item.Value === '1'}" class="btn btn-select" @click="item.Value === '1' ? item.Value = '-1' : item.Value = '1'">{{__t('Có')}}</button>
              <button :class="{'active': item.Value === '0'}" class="btn btn-select" @click="item.Value === '0' ? item.Value = '-1' : item.Value = '0'">{{__t('Không')}}</button>
            </div>
          </td>
        </tr>
        <tr v-if="(!checkHiddenRow() && MASTERDATA['OPDFRSFOPUTH'].Items[0].Value === '1') && MASTERDATA['OPDFRSFOPDPH']">
          <td>1. {{__label(MASTERDATA['OPDFRSFOPDPH'])}}</td>
          <td>
            <div :key="index" v-for="(item,index) in MASTERDATA['OPDFRSFOPDPH'].Items" v-if="index === 0" class="v-btn-checkbox">
              <button :class="{'active': item.Value === '1'}" class="btn btn-select" @click="item.Value === '1' ? item.Value = '-1' : item.Value = '1'">{{__t('Có')}}</button>
              <button :class="{'active': item.Value === '0'}" class="btn btn-select" @click="item.Value === '0' ? item.Value = '-1' : item.Value = '0'">{{__t('Không')}}</button>
            </div>
          </td>
        </tr>
        <tr v-if="(!checkHiddenRow() && MASTERDATA['OPDFRSFOPUTH'].Items[0].Value === '1') && MASTERDATA['OPDFRSFOPDPN']">
          <td>2. {{__t('ETR.screening_2')}} ?</td>
          <td>
            <div :key="index" v-for="(item,index) in MASTERDATA['OPDFRSFOPDPN'].Items" v-if="index === 0" class="v-btn-checkbox">
              <button :class="{'active': item.Value === '1'}" class="btn btn-select" @click="item.Value === '1' ? item.Value = '-1' : item.Value = '1'">{{__t('Có')}}</button>
              <button :class="{'active': item.Value === '0'}" class="btn btn-select" @click="item.Value === '0' ? item.Value = '-1' : item.Value = '0'">{{__t('Không')}}</button>
            </div>
          </td>
        </tr>
        <tr v-if="((!checkHiddenRow() && MASTERDATA['OPDFRSFOPUTH'].Items[0].Value === '1')) && MASTERDATA['OPDFRSFOPHPF']">
          <td>3. {{__label(MASTERDATA['OPDFRSFOPHPF'])}}</td>
          <td>
            <div :key="index" v-for="(item,index) in MASTERDATA['OPDFRSFOPHPF'].Items" v-if="index === 0" class="v-btn-checkbox">
              <button :class="{'active': item.Value === '1'}" class="btn btn-select" @click="item.Value === '1' ? item.Value = '-1' : item.Value = '1'">{{__t('Có')}}</button>
              <button :class="{'active': item.Value === '0'}" class="btn btn-select" @click="item.Value === '0' ? item.Value = '-1' : item.Value = '0'">{{__t('Không')}}</button>
            </div>
          </td>
        </tr>
        <template v-if="hasInitialAssessment">
        <tr v-if="MASTERDATA['OPDFRSFOPINT']">
          <th colspan="2" style="text-align: left;">{{__label(MASTERDATA['OPDFRSFOPINT'])}}</th>
        </tr>
        <tr v-if="MASTERDATA['OPDFRSFOPFRS']">
          <td>1. {{__t('ETR.intervention_1')}}</td>
          <td class="v-checkbox" align="center">
            <input type="checkbox" :id="'OPDFRSFOPFRS-' + 1" :name="'OPDFRSFOPFRS-' + 1" v-model="MASTERDATA['OPDFRSFOPFRS'].Items[0].Value">
            <label :for="'OPDFRSFOPFRS-' + 1"></label>
          </td>
        </tr>
        <tr v-if="MASTERDATA['OPDFRSFOPPIO']">
          <td>2. {{__label(MASTERDATA['OPDFRSFOPPIO'])}}</td>
          <td class="v-checkbox" align="center">
            <input type="checkbox" :id="'OPDFRSFOPPIO-' + 1" :name="'OPDFRSFOPPIO-' + 1" v-model="MASTERDATA['OPDFRSFOPPIO'].Items[0].Value">
            <label :for="'OPDFRSFOPPIO-' + 1"></label>
          </td>
        </tr>
        <tr v-if="MASTERDATA['OPDFRSFOPLUA']">
          <td>3. {{__t('ETR.intervention_3')}}</td>
          <td class="v-checkbox" align="center">
            <input type="checkbox" :id="'OPDFRSFOPLUA-' + 1" :name="'OPDFRSFOPLUA-' + 1" v-model="MASTERDATA['OPDFRSFOPLUA'].Items[0].Value">
            <label :for="'OPDFRSFOPLUA-' + 1"></label>
          </td>
        </tr>
        <tr v-if="MASTERDATA['OPDFRSFOPIOE']">
          <td>4. {{__t('ETR.intervention_4')}}</td>
          <td class="v-checkbox" align="center">
            <input type="checkbox" :id="'OPDFRSFOPIOE-' + 1" :name="'OPDFRSFOPIOE-' + 1" v-model="MASTERDATA['OPDFRSFOPIOE'].Items[0].Value">
            <label :for="'OPDFRSFOPIOE-' + 1"></label>
          </td>
        </tr>
        <tr v-if="MASTERDATA['OPDFRSFOPSPM']">
          <td>5. {{__label(MASTERDATA['OPDFRSFOPSPM'])}}</td>
          <td class="v-checkbox" align="center">
            <input type="checkbox" :id="'OPDFRSFOPSPM-' + 1" :name="'OPDFRSFOPSPM-' + 1" v-model="MASTERDATA['OPDFRSFOPSPM'].Items[0].Value">
            <label :for="'OPDFRSFOPSPM-' + 1"></label>
          </td>
        </tr>
        <tr v-if="MASTERDATA['OPDFRSFOPPAA']">
          <td>6. {{__t('ETR.intervention_6')}}</td>
          <td class="v-checkbox" align="center">
            <input type="checkbox" :id="'OPDFRSFOPPAA-' + 1" :name="'OPDFRSFOPPAA-' + 1" v-model="MASTERDATA['OPDFRSFOPPAA'].Items[0].Value">
            <label :for="'OPDFRSFOPPAA-' + 1"></label>
          </td>
        </tr>
        <tr v-if="MASTERDATA['OPDFRSFOPEDF']">
          <td>7. {{__t('ETR.intervention_7')}}</td>
          <td class="v-checkbox" align="center">
            <input type="checkbox" :id="'OPDFRSFOPEDF-' + 1" :name="'OPDFRSFOPEDF-' + 1" v-model="MASTERDATA['OPDFRSFOPEDF'].Items[0].Value">
            <label :for="'OPDFRSFOPEDF-' + 1"></label>
          </td>
        </tr>
        <tr v-if="MASTERDATA['OPDFRSFOPRM0']">
          <td>8. {{__label(MASTERDATA['OPDFRSFOPRM0'])}}</td>
          <td class="v-checkbox" align="center">
            <input type="checkbox" :id="'OPDFRSFOPRM0-' + 1" :name="'OPDFRSFOPRM0-' + 1" v-model="MASTERDATA['OPDFRSFOPRM0'].Items[0].Value">
            <label :for="'OPDFRSFOPRM0-' + 1"></label>
          </td>
        </tr>
        <tr v-if="MASTERDATA['OPDFRSFOPRBR']">
          <td>9. {{__t('ETR.intervention_9')}}</td>
          <td class="v-checkbox" align="center">
            <input type="checkbox" :id="'OPDFRSFOPRBR-' + 1" :name="'OPDFRSFOPRBR-' + 1" v-model="MASTERDATA['OPDFRSFOPRBR'].Items[0].Value">
            <label :for="'OPDFRSFOPRBR-' + 1"></label>
          </td>
        </tr>
        <tr v-if="MASTERDATA['OPDFRSFOPUTY']">
          <td>10. {{__t('ETR.intervention_10')}}</td>
          <td class="v-checkbox" align="center">
            <input type="checkbox" :id="'OPDFRSFOPUTY-' + 1" :name="'OPDFRSFOPUTY-' + 1" v-model="MASTERDATA['OPDFRSFOPUTY'].Items[0].Value">
            <label :for="'OPDFRSFOPUTY-' + 1"></label>
          </td>
        </tr>
        <tr v-if="MASTERDATA['OPDFRSFOPOTH']">
          <td>
            11. {{__label(MASTERDATA['OPDFRSFOPOTH'])}}
            <template>
              <input v-model="MASTERDATA['OPDFRSFOPOTH'].Items[0].Value" class="form-control" />
            </template>
          </td>
          <td class="v-checkbox" align="center">
            <input type="checkbox" :id="'OPDFRSFOPOTH-' + 1" :name="'OPDFRSFOPOTH-' + 1" v-model="MASTERDATA['OPDFRSFOPOTH'].Items[1].Value">
            <label :for="'OPDFRSFOPOTH-' + 1"></label>
          </td>
        </tr>
        </template>
      </table>
      <div v-if="DataSubmit.Version >= 9">
        <Confirm
          class="mt-10"
          :MasterDataCode="'FALLRISKSCREENINGCONFIRM'"
          :FormCode="'EOC_A02_007_220321_VE'"
          :ReadOnly="!allowEdit"
          :AdInfo="[DataSubmit.CreatedBy]"
          :VisitId="_VisitId"
          :FormId="DataSubmit.Id"
          @confirmSuccess="reload()"
          @getListConfirm="getListConfirm"
          @handleConfirm="handleSave"
          :saveSuccesss="saveSuccesss"
        />
      </div>
      <div class="status-float-block">
        <div class="action-btn-block">
          <div class="container">
            <div class="content-container">
              <div class="row">
                <div class="col-sm-2 col-md-1">
                  <div class="form-group1">
                    <!-- <button class="btn v-red-btn btn-block" type="button" @click="removeETR()">{{__t('btn.xoa')}}</button> -->
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
      <logs :EdId="this._VisitId" :Type="'EOC/InitialAssessments/FallRiskScreening'" />
    </div>
    <ViewOnly v-else :MASTERDATA="MASTERDATA" :DataSubmit="DataSubmit" :options="Clinics" :VisitType="VisitType" :checkHiddenRow="checkHiddenRow"/>
    <div class="mt-10">
      <p>{{FormCode}}</p>
    </div>
    <div v-if="DataSubmit">
      <p>{{__t('Chỉnh sửa lần cuối bởi')}} <AdInfo :ad="DataSubmit.UpdatedBy" /> {{__t('lúc')}} {{DataSubmit.UpdatedAt | formatDateWithoutSecon}}</p>
    </div>
  </div>
  <div v-else class="loading-text"><v-loading/></div>
</template>
<script>
import Confirm from '@/components/Form/Confirm3'
import ViewOnly from '@/components/OPD/FallRiskScreenViewV2.vue'
import MixinMasterData from '@/mixins/masterdata.js'
import MixinForm from '@/mixins/form.js'
import moment from 'moment'
import VSelect from '@/components/VSelect.vue'
import VDateTimePicker3 from '@/components/VDateTimePicker3.vue'
import InitialAssessment from '@/services/EOC/InitialAssessment'
import NProgress from 'nprogress'
import _ from 'lodash'
import Logs from '@/components/Logs.vue'
export default {
  name: 'EOCInitialAssessmentFallRiskScreeningItem',
  mixins: [MixinMasterData, MixinForm],
  props: ['ViewOnly', 'VisitId', 'VisitType', 'formId'],
  components: {VSelect, Logs, ViewOnly, VDateTimePicker3, Confirm},
  data () {
    return {
      DataSubmit: {
        Datas: [],
        IsShowSyncButton: false,
        IsNew: false
      },
      loaded: false,
      time: '',
      timeNow: moment().format('HH:mm DD/MM/YYYY'),
      syncing: false,
      FormCode: 'A02_007_220321_VE',
      ConfirmInfo: [],
      dataMaster: {},
      saveSuccesss: false
    }
  },
  mounted () {
    this.getMasterDatas({Form: 'OPDFRSFOP'}, () => {
      this.checkHiddenRow()
      this.getClinics()
      this.getData()
    })
  },
  watch: {
    MASTERDATA: {
      handler () {
        this.resetUncheck()
      },
      deep: true
    },
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
    getMonthOfAge () {
      return Math.floor(moment(new Date()).diff(moment(this.$store.getters['account/getDateOfBirth'], 'DD/MM/YYYY'), 'months', true))
    },
    _ItemId: function () {
      return this.formId || this.$route.params.Item
    },
    allowEdit () {
      if (this.DataSubmit.Version >= 9) {
        return (this.DataSubmit.CreatedBy === this.getUser() || this.ImSuperAdmin()) && this.hasRole('EOC016') && !(this.ConfirmInfo.length > 0 && this.ConfirmInfo[0].ConfirmBy)
      }
      return (this.DataSubmit.CreatedBy === this.getUser() || this.ImSuperAdmin()) && this.hasRole('EOC016')
      // return true
    }
  },
  methods: {
    async handleSave () {
      if (this.dataMaster !== JSON.stringify(this.MASTERDATA)) {
        await this.save()
      }
      this.saveSuccesss = await true
    },
    getListConfirm (val) {
      this.ConfirmInfo = val
    },
    resetUncheck () {
      if (this.MASTERDATA) {
        if (this.MASTERDATA['OPDFRSFOPUTH'].Items[0].Value === '0' || this.MASTERDATA['OPDFRSFOPUTH'].Items[0].Value === '' || this.MASTERDATA['OPDFRSFOPUTH'].Items[0].Value === '-1') {
          const Code = ['OPDFRSFOPHPF', 'OPDFRSFOPDPN', 'OPDFRSFOPDPH']
          for (const property of Code) {
            if (this.MASTERDATA[property].Items) {
              this.MASTERDATA[property].Items.forEach(item => {
                item.Value = ''
              })
            }
          }
        }
      }
    },
    checkHiddenRow () {
      if (this.getMonthOfAge < 36) {
        if (this.MASTERDATA['OPDFRSFOPUTH'].Items[0].Value === '') {
          this.MASTERDATA['OPDFRSFOPUTH'].Items[0].Value = '1'
        }
        return true
      }
      return false
    },
    syncData () {
      this.syncing = true
      new InitialAssessment().update('/FallRiskScreening/Sync/' + this.FormCode + '/' + this._VisitId + '/' + this._ItemId).then(response => {
        // this.toastedSuccess(`Dữ liệu đồng bộ từ: ${response.Clinic ? (response.Clinic.ViName || 'N/A') : 'N/A'} khám lúc ${response.AdmittedDate}`)
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
    save () {
      NProgress.start()
      this.DataSubmit.Datas = []
      if (this.time === 'Invalid date') {
        this.MASTERDATA['OPDFRSFOPTD0'].Items[0].Value = ''
      } else {
        this.MASTERDATA['OPDFRSFOPTD0'].Items[0].Value = this.time
      }
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
          this.reload()
        }).catch(e => {
          this._401ResponseError(e)
        })
      }, 100)
    },
    getData () {
      new InitialAssessment().find('/FallRiskScreening/' + this.FormCode + '/' + this._VisitId + '/' + this._ItemId).then(response => {
        this.DataSubmit = response
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
              }
            })
          }
        }
        if (this.MASTERDATA['OPDFRSFOPTD0'].Items[0].Value === '' || this.MASTERDATA['OPDFRSFOPTD0'].Items[0].Value === 'Invalid date') {
          this.time = moment(response.CreatedAt).format('HH:mm DD/MM/YYYY')
        } else {
          this.time = this.MASTERDATA['OPDFRSFOPTD0'].Items[0].Value
        }
        if (!this.MASTERDATA['OPDFRSFOPUTH'].Items[0].Value) {
          this.MASTERDATA['OPDFRSFOPUTH'].Items[0].Value = true
        }
        this.loaded = true
        setTimeout(() => {
          this.dataMaster = JSON.stringify(this.MASTERDATA)
          this.edited = false
        }, 10)
      }).catch(e => {
        if (e.status === 400) {
          this._404()
        }
        this.loaded = true
      })
    }
  }
}
</script>
