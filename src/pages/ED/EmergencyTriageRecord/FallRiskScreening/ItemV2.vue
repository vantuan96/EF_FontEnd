<template>
  <div v-if="loaded">
    <div v-if="allowEdit && !ViewOnly">
      <div class="form-control" v-if="DataSubmit.IsShowSyncButton"><button class="btn btn-sync-data pull-right" @click="syncData()">{{__t('Lấy dữ liệu đánh giá gần nhất trong vòng 24 giờ')}}</button></div>
      <div class="row mt-10 mb-10">
        <div v-if="MASTERDATA['ETRLOC']" class="col-md-4">
          <div class="flex-box flex-center">
            <label class="display-inline no-wrap mr-5 my-0">{{__label(MASTERDATA['ETRLOC'])}}:</label>
            <input v-model="MASTERDATA['ETRLOC'].Items[0].Value" class="form-control" />
            <!-- <v-select class='select-full-w' :search="true" :placeholder="__t('Địa điểm')" v-model="MASTERDATA['ETRLOC'].Items[0].Value" :items="Clinics"/> -->
          </div>
        </div>
        <div v-if="MASTERDATA['ETRTD0']" class="col-md-4">
          <div class="flex-box flex-center">
            <label class="display-inline no-wrap mr-5 my-0">{{__label(MASTERDATA['ETRTD0'])}}:</label>
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
      <table class="table v-table-1 table-bordered" v-if="!syncing && MASTERDATA['ETRUTH']">
        <tr v-if="MASTERDATA['ETRTD0']">
          <th class="align-left">{{__t('ETR.screening')}}</th>
          <th width="35%" class="text-center">{{__t('ETR.thuc_hien')}}</th>
        </tr>
        <tr v-if="MASTERDATA['ETRUTH']">
          <td class="text-bold">{{__t('ETR.doi_tuong_co_nguy_co_nga_cao')}} ?</td>
          <td>
            <div :key="index" v-for="(item,index) in MASTERDATA['ETRUTH'].Items" v-if="index === 0" class="v-btn-checkbox">
              <button :class="{'active': item.Value === '1'}" class="btn btn-select" @click="item.Value === '1' ? item.Value = '-1' : item.Value = '1'">{{__t('Có')}}</button>
              <button :class="{'active': item.Value === '0'}" class="btn btn-select" @click="item.Value === '0' ? item.Value = '-1' : item.Value = '0'">{{__t('Không')}}</button>
            </div>
          </td>
        </tr>
        <tr v-if="(!checkHiddenRow() && MASTERDATA['ETRUTH'].Items[0].Value === '1') && MASTERDATA['ETRDPH']">
          <td>1. {{__label(MASTERDATA['ETRDPH'])}}</td>
          <td>
            <div :key="index" v-for="(item,index) in MASTERDATA['ETRDPH'].Items" v-if="index === 0" class="v-btn-checkbox">
              <button :class="{'active': item.Value === '1'}" class="btn btn-select" @click="item.Value === '1' ? item.Value = '-1' : item.Value = '1'">{{__t('Có')}}</button>
              <button :class="{'active': item.Value === '0'}" class="btn btn-select" @click="item.Value === '0' ? item.Value = '-1' : item.Value = '0'">{{__t('Không')}}</button>
            </div>
          </td>
        </tr>
        <tr v-if="(!checkHiddenRow() && MASTERDATA['ETRUTH'].Items[0].Value === '1') && MASTERDATA['ETRDPN']">
          <td>2. {{__t('ETR.screening_2')}} ?</td>
          <td>
            <div :key="index" v-for="(item,index) in MASTERDATA['ETRDPN'].Items" v-if="index === 0" class="v-btn-checkbox">
              <button :class="{'active': item.Value === '1'}" class="btn btn-select" @click="item.Value === '1' ? item.Value = '-1' : item.Value = '1'">{{__t('Có')}}</button>
              <button :class="{'active': item.Value === '0'}" class="btn btn-select" @click="item.Value === '0' ? item.Value = '-1' : item.Value = '0'">{{__t('Không')}}</button>
            </div>
          </td>
        </tr>
        <tr v-if="((!checkHiddenRow() && MASTERDATA['ETRUTH'].Items[0].Value === '1')) && MASTERDATA['ETRHPS']">
          <td>3. {{__label(MASTERDATA['ETRHPS'])}}</td>
          <td>
            <div :key="index" v-for="(item,index) in MASTERDATA['ETRHPS'].Items" v-if="index === 0" class="v-btn-checkbox">
              <button :class="{'active': item.Value === '1'}" class="btn btn-select" @click="item.Value === '1' ? item.Value = '-1' : item.Value = '1'">{{__t('Có')}}</button>
              <button :class="{'active': item.Value === '0'}" class="btn btn-select" @click="item.Value === '0' ? item.Value = '-1' : item.Value = '0'">{{__t('Không')}}</button>
            </div>
          </td>
        </tr>
        <template v-if="hasInitialAssessment">
        <tr v-if="MASTERDATA['ETRINT']">
          <th colspan="2" style="text-align: left;">{{__label(MASTERDATA['ETRINT'])}}</th>
        </tr>
        <tr v-if="MASTERDATA['ETRFRS']">
          <td>1. {{__t('ETR.intervention_1')}}</td>
          <td class="v-checkbox" align="center">
            <input type="checkbox" :id="'ETRFRS-' + 1" :name="'ETRFRS-' + 1" v-model="MASTERDATA['ETRFRS'].Items[0].Value">
            <label :for="'ETRFRS-' + 1"></label>
          </td>
        </tr>
        <tr v-if="MASTERDATA['ETRPIO']">
          <td>2. {{__label(MASTERDATA['ETRPIO'])}}</td>
          <td class="v-checkbox" align="center">
            <input type="checkbox" :id="'ETRPIO-' + 1" :name="'ETRPIO-' + 1" v-model="MASTERDATA['ETRPIO'].Items[0].Value">
            <label :for="'ETRPIO-' + 1"></label>
          </td>
        </tr>
        <tr v-if="MASTERDATA['ETRLUA']">
          <td>3. {{__t('ETR.intervention_3')}}</td>
          <td class="v-checkbox" align="center">
            <input type="checkbox" :id="'ETRLUA-' + 1" :name="'ETRLUA-' + 1" v-model="MASTERDATA['ETRLUA'].Items[0].Value">
            <label :for="'ETRLUA-' + 1"></label>
          </td>
        </tr>
        <tr v-if="MASTERDATA['ETRIOE']">
          <td>4. {{__t('ETR.intervention_4')}}</td>
          <td class="v-checkbox" align="center">
            <input type="checkbox" :id="'ETRIOE-' + 1" :name="'ETRIOE-' + 1" v-model="MASTERDATA['ETRIOE'].Items[0].Value">
            <label :for="'ETRIOE-' + 1"></label>
          </td>
        </tr>
        <tr v-if="MASTERDATA['ETRSMA']">
          <td>5. {{__label(MASTERDATA['ETRSMA'])}}</td>
          <td class="v-checkbox" align="center">
            <input type="checkbox" :id="'ETRSMA-' + 1" :name="'ETRSMA-' + 1" v-model="MASTERDATA['ETRSMA'].Items[0].Value">
            <label :for="'ETRSMA-' + 1"></label>
          </td>
        </tr>
        <tr v-if="MASTERDATA['ETRPAA']">
          <td>6. {{__t('ETR.intervention_6')}}</td>
          <td class="v-checkbox" align="center">
            <input type="checkbox" :id="'ETRPAA-' + 1" :name="'ETRPAA-' + 1" v-model="MASTERDATA['ETRPAA'].Items[0].Value">
            <label :for="'ETRPAA-' + 1"></label>
          </td>
        </tr>
        <tr v-if="MASTERDATA['ETREDF']">
          <td>7. {{__t('ETR.intervention_7')}}</td>
          <td class="v-checkbox" align="center">
            <input type="checkbox" :id="'ETREDF-' + 1" :name="'ETREDF-' + 1" v-model="MASTERDATA['ETREDF'].Items[0].Value">
            <label :for="'ETREDF-' + 1"></label>
          </td>
        </tr>
        <tr v-if="MASTERDATA['ETRRM0']">
          <td>8. {{__label(MASTERDATA['ETRRM0'])}}</td>
          <td class="v-checkbox" align="center">
            <input type="checkbox" :id="'ETRRM0-' + 1" :name="'ETRRM0-' + 1" v-model="MASTERDATA['ETRRM0'].Items[0].Value">
            <label :for="'ETRRM0-' + 1"></label>
          </td>
        </tr>
        <tr v-if="MASTERDATA['ETRRBR']">
          <td>9. {{__t('ETR.intervention_9')}}</td>
          <td class="v-checkbox" align="center">
            <input type="checkbox" :id="'ETRRBR-' + 1" :name="'ETRRBR-' + 1" v-model="MASTERDATA['ETRRBR'].Items[0].Value">
            <label :for="'ETRRBR-' + 1"></label>
          </td>
        </tr>
        <tr v-if="MASTERDATA['ETRUTY']">
          <td>10. {{__t('ETR.intervention_10')}}</td>
          <td class="v-checkbox" align="center">
            <input type="checkbox" :id="'ETRUTY-' + 1" :name="'ETRUTY-' + 1" v-model="MASTERDATA['ETRUTY'].Items[0].Value">
            <label :for="'ETRUTY-' + 1"></label>
          </td>
        </tr>
        <tr v-if="MASTERDATA['ETRIOT']">
          <td>
            11. {{__label(MASTERDATA['ETRIOT'])}}
            <template>
              <input v-model="MASTERDATA['ETRIOT'].Items[0].Value" class="form-control" />
            </template>
          </td>
          <td class="v-checkbox" align="center">
            <input type="checkbox" :id="'ETRIOT-' + 1" :name="'ETRIOT-' + 1" v-model="MASTERDATA['ETRIOT'].Items[1].Value">
            <label :for="'ETRIOT-' + 1"></label>
          </td>
        </tr>
        </template>
      </table>
      <div v-if="parseInt(DataSubmit.Version) >= 9">
        <Confirm
          class="mt-10"
          ref="ConfirmComponent"
          :MasterDataCode="'FALLRISKSCREENINGCONFIRM'"
          :FormCode="'ED_A02_007_220321_VE'"
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
              <button class="btn v-yellow-btn pull-right btn-block hvr-ripple-out" type="button" v-shortkey="['ctrl', 's']" @shortkey="save()" @click="save()"><i class="fa fa-floppy-o" aria-hidden="true"></i> {{__t('btn.luu')}}</button>
            </div>
          </div>
        </template>
      </FloatBlock>
      <logs :EdId="this._VisitId" :Type="'ED/EmergencyTriageRecord/FallRiskScreening'" />
    </div>
    <ViewOnly v-else :MASTERDATA="MASTERDATA" :DataSubmit="DataSubmit" :options="Clinics" :VisitId="VisitId" :formId="formId" :checkHiddenRow="checkHiddenRow"/>
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
import Confirm from '@/components/Form/Confirm.vue'
import ViewOnly from '@/components/ED/FallRiskScreenViewV2.vue'
import MixinMasterData from '@/mixins/masterdata.js'
import MixinForm from '@/mixins/form.js'
import moment from 'moment'
import VSelect from '@/components/VSelect.vue'
import VDateTimePicker3 from '@/components/VDateTimePicker3.vue'
import FallRiskScreening from '@/services/ED/FallRiskScreening'
import NProgress from 'nprogress'
import _ from 'lodash'
import Logs from '@/components/Logs.vue'

export default {
  name: 'EDInitialAssessmentFallRiskScreeningItem',
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
      saveSuccesss: false,
      dataMaster: {}
    }
  },
  mounted () {
    this.getMasterDatas({Form: 'ETR'}, () => {
      this.checkHiddenRow()
      this.getClinics()
      this.getData()
      this.loaded = true
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
        this.getMasterDatas({Form: 'ETR'}, () => {
          this.getData()
        })
      }
    }
  },
  computed: {
    hasInitialAssessment: function () {
      var list = [
        ...(this.MASTERDATA['ETRDPH'] ? this.MASTERDATA['ETRDPH'].Items : []),
        ...(this.MASTERDATA['ETRDPN'] ? this.MASTERDATA['ETRDPN'].Items : []),
        ...(this.MASTERDATA['ETRHPS'] ? this.MASTERDATA['ETRHPS'].Items : []),
        ...(this.MASTERDATA['ETRUTH'] ? this.MASTERDATA['ETRUTH'].Items : [])
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
      if (parseInt(this.DataSubmit.Version) >= 9) {
        return (this.DataSubmit.CreatedBy === this.getUser() || this.ImSuperAdmin()) && !this.DataSubmit.IsLocked && this.hasRole('SUASLN') && !(this.ConfirmInfo.length > 0 && this.ConfirmInfo[0].ConfirmBy)
      }
      return this.DataSubmit.CreatedBy === this.getUser() || this.ImSuperAdmin() || !this.hasRole('SUASLN')
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
        if (this.MASTERDATA['ETRUTH'].Items[0].Value === '0' || this.MASTERDATA['ETRUTH'].Items[0].Value === '' || this.MASTERDATA['ETRUTH'].Items[0].Value === '-1') {
          const Code = ['ETRHPS', 'ETRDPN', 'ETRDPH']
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
        if (this.MASTERDATA['ETRUTH'].Items[0].Value === '') {
          this.MASTERDATA['ETRUTH'].Items[0].Value = '1'
        }
        return true
      }
      return false
    },
    save () {
      NProgress.start()
      this.DataSubmit.Datas = []
      if (this.time === 'Invalid date') {
        this.MASTERDATA['ETRTD0'].Items[0].Value = ''
      } else {
        this.MASTERDATA['ETRTD0'].Items[0].Value = this.time
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
        this.DataSubmit.Clinic = this.MASTERDATA['ETRLOC'].Items[0].Value
        this.DataSubmit.TransessionDate = this.time
        new FallRiskScreening().update('/Update/' + this._ItemId, this.DataSubmit).then(response => {
          this.toastedSuccess()
          this.edited = false
          this.reload()
        }).catch(e => {
          this._401ResponseError(e)
        })
      }, 100)
    },
    getData () {
      new FallRiskScreening().find('/Detail/' + this._ItemId).then(response => {
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
        if (this.MASTERDATA['ETRTD0'].Items[0].Value === '' || this.MASTERDATA['ETRTD0'].Items[0].Value === 'Invalid date') {
          this.time = moment(response.CreatedAt).format('HH:mm DD/MM/YYYY')
        } else {
          this.time = this.MASTERDATA['ETRTD0'].Items[0].Value
        }
        if (!this.MASTERDATA['ETRUTH'].Items[0].Value) {
          this.MASTERDATA['ETRUTH'].Items[0].Value = true
        }
        this.loaded = true
        setTimeout(() => {
          this.dataMaster = JSON.stringify(this.MASTERDATA)
          this.edited = false
        }, 500)
      }).catch(e => {
        if (e.status === 400) {
          this._404()
        }
        this.loaded = true
      })
    },
    setNow (item) {
      item.Value = moment(new Date()).format(this.vDateTimeFormat)
    },
    handleBack () {
      if (this.dataMaster !== JSON.stringify(this.MASTERDATA)) {
        this.confirmPopupBack()
      } else {
        this.back()
      }
    },
    // popup canh bao
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
    }
  }
}
</script>
