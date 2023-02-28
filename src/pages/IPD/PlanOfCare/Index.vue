<template>
  <div class="main-content">
    <h2 v-if="!readonly" class="text-center font-bold font28 uppercase">{{__t('Kế hoạch điều trị và chăm sóc')}}</h2>
    <p v-if="!readonly" class="text-center font16">{{__t('(Bác sĩ và điều dưỡng cùng sử dụng)')}}</p>
    <br v-if="!readonly"/>
    <table class="standing-order-tbl">
      <tr>
        <th width="200" class="no-wrap">{{__t('Ngày, giờ')}}</th>
        <th width="30%">{{__t('Kế hoạch điều trị và chăm sóc')}}</th>
        <th width="30%">{{__t('Mục tiêu-poc')}} <span class="note-text">({{__t('Nếu có-poc')}})</span></th>
        <th width="1" class="no-wrap">{{__t('Kết quả')}}<br/><span class="note-text">({{__t('Đạt/ không đạt')}})</span></th>
        <th width="1" class="no-wrap">{{__t('Người xây dựng')}}</th>
      </tr>
      <template v-if="DataSubmit.Datas && DataSubmit.Datas.length">
        <tr :data="item" :key="index" v-for="(item, index) in DataSubmit.Datas" v-if="!item.IsDeleted" :readonly="viewOnly" >
          <template v-if="item.IsDoctor">
            <td style="position: relative" valign="top">
              <button v-if="!viewOnly && $store.state.account.Username === item.CreatedBy" class="btn-pos-left" @click="item.IsDeleted = true"><i class="fa fa-trash" aria-hidden="true"></i></button>
              <v-date-time-picker v-if="isCreator(item)" :hideTooltip="true" v-model="item.Time" class="w200" :format="vDateTimeFormat"/>
              <div class="fake-input disable" v-else>{{item.Time || 'N/A'}}</div>
            </td>
            <td valign="top">
              <div class="mb-10">
                {{__t('Chẩn đoán')}}
              </div>
              <VTextarea v-if="isCreator(item)" :defaultLib="'KHCSDTCD101021'" rows="2" :placeholder="__t('Nhập')" v-model="item.Diagnosis" />
              <p v-else class="fake-input disable">{{item.Diagnosis || 'N/A'}}</p>
              <div class="mb-10 mt-10">
                {{__t('Phương pháp điều trị và KHCS chính')}}
              </div>
              <VTextarea v-if="isCreator(item)" rows="2" :defaultLib="'KHCSDTPP101021'" :placeholder="__t('Nhập')" v-model="item.FollowUpCarePlan" />
              <p v-else class="fake-input disable">{{item.FollowUpCarePlan || 'N/A'}}</p>
              <div class="mb-10 mt-10">
                {{__t('KH xét nghiệm, thăm dò chính')}}
              </div>
              <VTextarea :defaultLib="'KHCSDTXNTD101021'" v-if="isCreator(item)" rows="2" :placeholder="__t('Nhập')" v-model="item.ParaClinicalTestsPlan" />
              <p v-else class="fake-input disable">{{item.ParaClinicalTestsPlan || 'N/A'}}</p>
              <div class="mb-10 mt-10">Yêu cầu đặc biệt về chăm sóc và theo dõi <button v-if="isCreator(item) && !isDoctorr" class="btn btn-sync-data" @click="SyncSpecialRequest(item)">{{__t('Thông tin đặc biệt trong ĐGBĐ')}}</button></div>
              <VTextarea v-if="isCreator(item)" :defaultLib="'KHCSDTCSDD101021'" rows="2" :placeholder="__t('Nhập')" v-model="item.SpecialRequests" />
              <p v-else class="fake-input disable">{{item.SpecialRequests || 'N/A'}}</p>
              <div class="mb-10 mt-10">Kế hoạch GDSK <button v-if="isCreator(item)" class="btn btn-sync-data" @click="SyncEducationPlan(item)">{{__t('Chọn nội dung đào tạo')}}</button></div>
              <VTextarea v-if="isCreator(item)" :defaultLib="'KHCSDTGDSK101021'" rows="2" :placeholder="__t('Nhập')" v-model="item.EducationPlan" />
              <p v-else class="fake-input disable">{{item.EducationPlan || 'N/A'}}</p>
              <div class="mb-10 mt-10">
                {{__t('Dự kiến số ngày nằm viện/ ngày ra viện')}}
              </div>
              <VTextarea v-if="isCreator(item)" :defaultLib="'KHCSDTNVRV101021'" rows="1" :placeholder="__t('Nhập')" v-model="item.ExpectedNumber" />
              <p v-else class="fake-input disable">{{item.ExpectedNumber || 'N/A'}}</p>
              <div class="mt-10 mb-5">
                {{__t('Tiên lượng')}}
              </div>
              <VTextarea v-if="isCreator(item)" :defaultLib="'KHCSDTTL101021'" rows="1" :placeholder="__t('Nhập')" v-model="item.Prognosis" />
              <p v-else class="fake-input disable">{{item.Prognosis || 'N/A'}}</p>
            </td>
            <td valign="top">
              <VTextarea v-if="isCreator(item)" rows="5" :placeholder="__t('Nhập')" class="form-control textarea-no-border" v-model="item.ExpectedOutcome" />
              <p v-else class="fake-input disable">{{item.ExpectedOutcome || 'N/A'}}</p>
            </td>
            <td valign="top">
              <div class="group-radio no-flex">
                <div class="mb-10">
                  <input type="radio" :disabled="!isDoctorr" :id="index + 'yes'" :name="index + 'Note'" value="true" v-model="item.Note">
                  <label class="no-margin" :class="!isDoctorr ? 'contex-menu' : ''" :for="index + 'yes'" @click="handleChange('true', index)">Đạt</label>
                </div>
                <div class="mb-10">
                  <input type="radio" :disabled="!isDoctorr" :id="index + 'no'" :name="index + 'Note'" value="false" v-model="item.Note">
                  <label class="no-margin" :class="!isDoctorr ? 'contex-menu' : ''" :for="index + 'no'" @click="handleChange('false', index)">Không đạt</label>
                </div>
              </div>
              <p v-if="item.ConfirmTime">Đã xác nhận lúc: {{item.ConfirmTime}}</p>
            </td>
            <td class="no-wrap" style="pointer-events: all !important;" valign="top"><ad-Info :ad="item.CreatedBy" /></td>
          </template>
          <template v-else>
            <td style="position: relative" valign="top">
              <button v-if="!viewOnly && $store.state.account.Username === item.CreatedBy" class="btn-pos-left" @click="item.IsDeleted = true"><i class="fa fa-trash" aria-hidden="true"></i></button>
              <v-date-time-picker v-if="isCreator(item)" :hideTooltip="true" v-model="item.Time" class="w200" :format="vDateTimeFormat"/>
              <div class="fake-input disable" v-else>{{item.Time || 'N/A'}}</div>
            </td>
            <td valign="top">
              <div class="mb-10 mt-10">Yêu cầu đặc biệt về chăm sóc và theo dõi <button v-if="isCreator(item) && !isDoctorr" class="btn btn-sync-data" @click="SyncSpecialRequest(item)">{{__t('Thông tin đặc biệt trong ĐGBĐ')}}</button></div>
              <VTextarea v-if="isCreator(item)" :defaultLib="'KHCSDTCSDD101021'" rows="2" :placeholder="__t('Nhập')" v-model="item.SpecialRequests" />
              <p v-else class="fake-input disable">{{item.SpecialRequests || 'N/A'}}</p>
              <div class="mb-10 mt-10">Kế hoạch GDSK <button v-if="isCreator(item)" class="btn btn-sync-data" @click="SyncEducationPlan(item)">{{__t('Chọn nội dung đào tạo')}}</button></div>
              <VTextarea v-if="isCreator(item)" :defaultLib="'KHCSDTGDSK101021'" rows="2" :placeholder="__t('Nhập')" v-model="item.EducationPlan" />
              <p v-else class="fake-input disable">{{item.EducationPlan || 'N/A'}}</p>
            </td>
            <td valign="top">
              <VTextarea v-if="isCreator(item)" rows="5" :placeholder="__t('Nhập')" class="form-control textarea-no-border" v-model="item.ExpectedOutcome" />
              <p v-else class="fake-input disable">{{item.ExpectedOutcome || 'N/A'}}</p>
            </td>
            <td valign="top">
              <div class="group-radio no-flex">
                <div class="mb-10">
                  <input type="radio" :disabled="isDoctorr" :id="index + 'yes'" :name="index + 'Note'" value="true" v-model="item.Note">
                  <label class="no-margin" :class="isDoctorr ? 'contex-menu' : ''" :for="index + 'yes'" @click="handleChange('true', index)">Đạt</label>
                </div>
                <div class="mb-10">
                  <input type="radio" :disabled="isDoctorr" :id="index + 'no'" :name="index + 'Note'" value="false" v-model="item.Note">
                  <label class="no-margin" :class="isDoctorr ? 'contex-menu' : ''" :for="index + 'no'" @click="handleChange('false', index)">Không đạt</label>
                </div>
              </div>
              <p v-if="item.ConfirmTime">Đã xác nhận lúc: {{item.ConfirmTime}}</p>
            </td>
            <td class="no-wrap" style="pointer-events: all !important;" valign="top"><ad-Info :ad="item.CreatedBy" /></td>
          </template>
        </tr>
      </template>
      <tr v-else>
        <td class="text-center" colspan="5">
          {{__t('Chưa có thông tin')}}
        </td>
      </tr>
    </table>
    <div v-if="!readonly" class="text-center"><button @click="newItem" v-if="!DataSubmit.IsLocked" class="btn v-green-btn v-bottom-btn"><i aria-hidden="true" class="fa fa-plus"></i>  {{__t('THÊM KẾ HOẠCH')}}</button></div>
    <br/>
    <br/>
    <div class="padding-15">
      <logs v-if="!readonly" :EdId="this.$route.params.Id" :Type="'IPD/PlanOfCare'" :noDetail="true" />
      <p>A03_009_050919_VE</p>
      <p v-if="DataSubmit">{{__t('Chỉnh sửa lần cuối bởi')}} <ad-info v-if="DataSubmit.UpdatedBy || DataSubmit.CreatedBy" :ad="DataSubmit.UpdatedBy || DataSubmit.CreatedBy" /> {{__t('lúc')}} {{getTimeUpdate()}}</p>
    </div>
    <div v-if="!readonly" class="status-float-block">
      <div class="action-btn-block">
        <div class="container">
          <div class="content-container">
            <div class="row">
              <div class="col-md-2 col-sm-2">
                <div class="form-group1">
                  <button class="btn btn-block v-white-btn" type="button" @click="back()"><i class="fa fa-angle-double-left" aria-hidden="true"></i> {{__t('Quay lại')}}</button>
                </div>
              </div>
              <div class="col-md-4 col-sm-4">
                <div class="form-group1">
                  <p class="hidden-text">hidden-text</p>
                </div>
              </div>
              <div class="col-md-6 col-sm-6">
                <div class="form-group1">
                  <button v-if="DataSubmit.Datas && DataSubmit.Datas.length && !DataSubmit.IsLocked" class="btn v-yellow-btn pull-right btn-block hvr-ripple-out" type="button" v-shortkey="['ctrl', 's']" @shortkey="save()" @click="save()"><i class="fa fa-floppy-o" aria-hidden="true"></i> {{__t('btn.luu')}}</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <modal name="SpecialRequest" transition="pop-out" height="auto" :scrollable="true" :width="870">
      <div class="sync-ed-header">{{__t('Danh mục thông tin đặc biệt trong ĐGBĐ')}} <i @click="$modal.hide('SpecialRequest')" class="fa fa-times pull-right fa-2" aria-hidden="true"></i></div>
      <div class="sync-ed-box">
        <table class="standing-order-tbl">
          <tr>
            <th width="1">
              <label class="container-checkbox reset" :for="'xxxradio'">
                <input type="checkbox" :id="'xxxradio'" v-model="isCheckAllSpecialRequest">
                <span class="checkmark"></span>
              </label>
            </th>
            <th>Tên danh mục</th>
            <th>Thông tin</th>
          </tr>
          <tr :key="index" :data="item"  v-for="(item, index) in SpecialRequest">
            <td class="text-center">
              <label class="container-checkbox reset" :for="'xxxradio-' + index">
                <input type="checkbox" :id="'xxxradio-' + index" v-model="item.selected">
                <span class="checkmark"></span>
              </label>
            </td>
            <td>
              {{item.ViName}}
            </td>
            <td>
              {{item.ViValue}}
            </td>
          </tr>
        </table>
        <br/>
        <button class="btn btn-yellow-gradient btn-block" @click="selectSpecialRequest()">{{__t('CHỌN')}}</button>
      </div>
    </modal>
    <modal name="Educational-needs" transition="pop-out" height="auto" :scrollable="true" :width="350" v-if="EducationPlan.length">
      <div class="sync-ed-header">{{__t('CHỌN NỘI DUNG ĐÀO TẠO')}}</div>
      <div class="sync-ed-box">
        <div :key="index" :data="item"  v-for="(item,index) in EducationPlan">
          <label class="container-checkbox" :for="'PFEFEN0radio-' + index">{{__label(item)}}
            <input type="checkbox" :id="'PFEFEN0radio-' + index" v-model="item.Value">
            <span class="checkmark"></span>
          </label>
        </div>
        <div class="mt-5 mb-5" v-if="EducationPlan[EducationPlan.length - 1].Value">
          <textarea-autosize rows="1" :placeholder="__t('Nhập')" class="form-control" v-model="EducationPlanOther" />
        </div>
        <button class="btn btn-yellow-gradient btn-block" @click="selectEducationalNeeds()">{{__t('CHỌN')}}</button>
      </div>
    </modal>
  </div>
</template>
<script>
import PlanOfCare from '@/services/IPD/PlanOfCare'
import VDateTimePicker from '@/components/VDateTimePicker.vue'
import MixinForm from '@/mixins/form.js'
import MixinMasterData from '@/mixins/masterdata.js'
import Logs from '@/components/Logs.vue'
// import $ from 'jquery'
// import _ from 'lodash'
import moment from 'moment'
export default {
  props: ['VisitId', 'readonly'],
  name: 'IPD-Plan-of-care',
  mixins: [MixinForm, MixinMasterData],
  data () {
    return {
      DataSubmit: {
        Datas: []
      },
      EducationPlan: [],
      currentItemSyncEducationPlan: {},
      EducationPlanOther: '',
      SpecialRequest: [],
      isCheckAllSpecialRequest: false
    }
  },
  components: {
    VDateTimePicker, Logs
  },
  watch: {
    isCheckAllSpecialRequest (a, b) {
      this.SpecialRequest.forEach(e => {
        e.selected = a
      })
    },
    DataSubmit: {
      handler (a, b) {
        this.edited = true
      },
      deep: true
    }
  },
  mounted () {
    this.getData()
  },
  computed: {
    isDoctorr: function () {
      return this.$store.state.account.Position.includes('Doctor') || this.readonly
    },
    viewOnly: function () {
      return this.readonly || (this.DataSubmit && this.DataSubmit.IsLocked)
    }
  },
  methods: {
    checkallSpecialRequest () {
      this.SpecialRequest.forEach(e => {
        e.selected = true
      })
    },
    selectSpecialRequest () {
      var selected = this.SpecialRequest.filter(e => e.selected)
      var selectedValue = selected.map(e => {
        return '- ' + e.ViName + ': ' + e.ViValue
      })

      if (!selectedValue) return
      var input = this.currentItemSyncEducationPlan.SpecialRequests
      var inputValue = input ? input.split('\n') : []
      selectedValue.forEach(e => {
        if (!inputValue.includes(this.trim_(e, '\n'))) input = (input || '') + '\n' + e
      })
      input = this.trim_(input, '\n')
      this.currentItemSyncEducationPlan.SpecialRequests = input
      this.$modal.hide('SpecialRequest')
    },
    selectEducationalNeeds () {
      var selected = this.EducationPlan.filter(e => e.Value)
      var selectedValue = selected.map(e => {
        if (e.Code === 'PFEFEN0OTH') return '- ' + this.EducationPlanOther
        return '- ' + e.ViName
      })
      if (!selectedValue) return
      var input = this.currentItemSyncEducationPlan.EducationPlan
      var inputValue = input ? input.split('\n') : []
      selectedValue.forEach(e => {
        if (!inputValue.includes(this.trim_(e, '\n'))) input = (input || '') + '\n' + e
      })
      input = this.trim_(input, '\n')
      this.currentItemSyncEducationPlan.EducationPlan = input
      // this.currentItemSyncEducationPlan.EducationPlan = selectedValue.join('\r\n')
      this.$modal.hide('Educational-needs')
    },
    isCreator (item) {
      return !this.readonly && item.CreatedBy === this.$store.state.account.Username
      // return !this.readonly && (this.$store.state.account.Username === 'thangdc3' || item.CreatedBy === this.$store.state.account.Username)
    },
    uncheck (val, type) {
      console.log(val.Note)
      if (val.Note === 'true') return
      if (val.Note === type) {
        val.Note = ''
      }
    },
    SyncEducationPlan (item) {
      this.currentItemSyncEducationPlan = item
      this.getRawMasterDatas({Group: 'PFEFEN0'}, (EducationPlan) => {
        this.EducationPlan = EducationPlan
        setTimeout(() => {
          this.$modal.show('Educational-needs')
        }, 500)
      })
    },
    SyncSpecialRequest (item) {
      // PFEFEN0
      this.currentItemSyncEducationPlan = item
      new PlanOfCare().find('SyncSpecialRequest/' + this.$route.params.Id, {}).then(response => {
        console.log(response)
        this.SpecialRequest = response
        setTimeout(() => {
          this.$modal.show('SpecialRequest')
        }, 500)
      }).catch(e => {
        // this._401ResponseError(e)
      })
    },
    newItem () {
      let role = this.$store.state.account.Position.includes('Doctor')
      this.DataSubmit.Datas.push({
        Time: moment().format('HH:mm DD/MM/YYYY'),
        SpecialRequests: '',
        EducationPlan: '',
        ExpectedOutcome: '',
        Diagnosis: '',
        FollowUpCarePlan: '',
        ParaClinicalTestsPlan: '',
        ExpectedNumber: '',
        Prognosis: '',
        Note: '',
        IsDoctor: role,
        CreatedBy: this.$store.state.account.Username,
        IsDeleted: false
      })
    },
    save () {
      this.DataSubmit.Datas = this.DataSubmit.Datas.filter(e => !e.IsDeleted || e.Id)
      new PlanOfCare().update(this.$route.params.Id, this.DataSubmit).then(response => {
        this.toastedSuccess().getData()
        this.edited = false
        this.reload()
      }).catch(e => {
        // this._401ResponseError(e)
      })
    },
    getData () {
      new PlanOfCare().find(this._VisitId).then(response => {
        let obj = response
        obj.Datas.map(elm => {
          elm.IsDeleted = false
        })
        this.DataSubmit = obj
        setTimeout(() => {
          this.edited = false
        }, 500)
      })
    },
    handleChange (val, index) {
      if (!this.viewOnly) {
        if (this.DataSubmit && this.DataSubmit.Datas && this.DataSubmit.Datas.length) {
          if (this.DataSubmit.Datas[index] && this.DataSubmit.Datas[index].Note !== '' && this.DataSubmit.Datas[index].IsDoctor === this.isDoctorr) {
            if (this.DataSubmit.Datas[index].Note === val) {
              setTimeout(() => {
                this.DataSubmit.Datas[index].Note = ''
              }, 100)
            }
          }
        }
      }
    },
    getTimeUpdate () {
      if (this.DataSubmit && this.DataSubmit.UpdatedAt) {
        return this.getFTime(this.DataSubmit.UpdatedAt)
      }
      if (this.DataSubmit && this.DataSubmit.CreatedAt) {
        return this.getFTime(this.DataSubmit.CreatedAt)
      }
      return ''
    }
  }
}
</script>
