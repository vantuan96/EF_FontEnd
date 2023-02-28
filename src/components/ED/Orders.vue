<template>
  <div class="mt-20 disable_ccp5">
    <template v-if="DataSubmit">
      <div v-if="needCreate">
        <div class="text-center">
          <p>{{__t('Chưa có Phiếu ghi nhận thuốc y lệnh miệng')}}</p>
          <button class="btn btn-warning" @click="confirmPopup">{{__t('Tạo mới')}}</button>
        </div>
      </div>
      <template v-else>
        <div class="form-group" v-if="DataSubmit.Version > 0">
          <label>{{__t('Chẩn đoán')}}:</label>
          <div class="inline">{{getDiagnosis()}}</div>
          <!-- <Icd10View :value="JSONParse(DataSubmit.Customer.ICD10)"/> -->
        </div>
        <md-input-text v-if="MASTERDATA['EDVOFV1PI'] && DataSubmit.Version > 0" v-model="MASTERDATA['EDVOFV1PI']"/>
        <table class="table standing-order-tbl td-re">
          <tr>
            <th width="1">{{__t('Thời gian')}}</th>
            <th>{{__t('Tên thuốc')}}</th>
            <th class="no-wrap" width="1" v-if="DataSubmit.Version > 0">{{__t('Số lượng')}}</th>
            <th class="no-wrap" width="1">{{__t('Liều dùng')}}</th>
            <th class="no-wrap" width="1">{{__t('Đường dùng')}}</th>
            <th class="no-wrap" width="1">{{__t('Thời điểm dùng')}}</th>
            <th class="no-wrap text-center" width="1">{{__t('Thực hiện')}}</th>
            <th class="no-wrap" width="1">{{__t('Bs xác nhận')}}</th>
          </tr>
          <tr :data="item" :key="index" v-for="(item,index) in DataSubmit.DatasOrder" :class="{'readonly': item.DoctorConfirm}" v-if="!item.Remove">
            <template v-if="item.DoctorConfirm">
              <td>{{item.Time}}</td>
              <td>{{item.Drug}}</td>
              <td v-if="DataSubmit.Version > 0">{{item.Quantity}}</td>
              <td>{{item.Dosage}}</td>
              <td>{{item.Route}}</td>
              <td>{{item.UsedAt}}</td>
              <td class="text-center">
                <span class="v-checkbox" v-if="item.IsConfirm && !item.MedicalStaffName">
                  <input class="form-control" type="checkbox" :id="'Status-' + index" :name="'Status-' + index" v-model="item.Status">
                  <label :for="'Status-' + index"></label>
                </span>
                <span v-if="item.Status"><ad-Info :ad="item.MedicalStaffName" /></span>
              </td>
              <td class="text-center">
                <span><ad-Info :ad="item.DoctorConfirm" /></span>
                <button v-if="!item.Status && !item.IsConfirm" @click="remove(index, item)"><span class="glyphicon glyphicon-trash"></span></button>
              </td>
            </template>
            <template v-else>
              <td style="position: relative">
                <button class="btn-pos-left" v-if="!item.Status && !item.IsConfirm" @click="remove(index, item)"><i class="fa fa-trash" aria-hidden="true"></i></button>
                {{item.Time}}
              </td>
              <td><medication v-model="item.Drug" /></td>
              <td v-if="DataSubmit.Version > 0"><input class="form-control w-100" v-model="item.Quantity"/></td>
              <td><input class="form-control w-100" v-model="item.Dosage"/></td>
              <td class="w130"><medication-route v-model="item.Route"/></td>
              <td><v-date-picker class="w-150" :format="vDateTimeFormat" v-model="item.UsedAt"/></td>
              <td class="text-center">
              </td>
              <td class="text-center">
                <span>{{__t('Bs Chưa xác nhận')}}</span>
              </td>
            </template>
          </tr>
          <tr v-if="hasNurseConfirmBtn || hasConfirmBtn">
            <td></td>
            <td v-if="DataSubmit.Version > 0"></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td><button v-if="hasNurseConfirmBtn" class="btn pull-right btn-warning" type="button" @click="confirm('Nurse')">{{__t('Xác nhận đã thực hiện')}}</button></td>
            <td><button v-if="hasConfirmBtn" class="btn pull-right btn-info" type="button" @click="confirm('Doctor')">{{__t('Bác sĩ xác nhận')}}</button></td>
          </tr>
        </table>
        <div class="text-center" colspan="3">
          <button class="btn" type="button" @click="addItem()">{{__t('btn.them_moi')}}</button>
        </div>
        <p v-if="DataSubmit.Version > 0">A03_030_290321_VE</p>
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
      </template>
    </template>
    <div class="text-center" v-else><v-loading/></div>
    <modal name="doctorLogin" transition="pop-out" id="doctor-login" height="auto">
      <div class="box v-model-content-popup">
        <div class="box-header text-center">
          <h3 class="box-title">{{__t('btn.nhap_tai_khoan')}}</h3>
          <div style="color: #fff" v-if="user.type === 'Nurse'">{{__t('Xác nhận thực hiện')}}</div>
          <div style="color: #fff" v-if="user.type === 'Doctor'">{{__t('Bác sĩ xác nhận y lệnh miệng')}}</div>
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
            <div class="col-xs-8">
              <button type="button" class="btn btn-block v-yellow-btn" @click="confirmed()">{{__t('Xác nhận')}}</button>
            </div>
            <div class="col-xs-4">
              <button type="button" class="btn btn-block" @click="hide()">{{__t('Hủy')}}</button>
            </div>
          </div>
          <p style="margin-top: 10px; text-align:center">{{__t('Sử dụng tài khoản máy tính')}}</p>
        </div>
      </div>
    </modal>
  </div>
</template>
<script>
/* ============
 * Add cusotmer Page
 * ============
 *
 * The home index page.
 */
import $ from 'jquery'
import storage from '@/lib/storage'
import VLayout from '@/layouts/Default.vue'
import MixinMasterData from '@/mixins/masterdata.js'
import VSelect from '@/components/VSelect.vue'
import VDatePicker from '@/components/VDateTimePicker.vue'
import Orders from '@/services/ED/Orders'
// import NProgress from 'nprogress'
import moment from 'moment'
// import _ from 'lodash'

export default {
  /**
   * The name of the page.
   */
  name: 'ORDERS',
  mixins: [MixinMasterData],
  props: ['VisitId'],
  data () {
    return {
      DataSubmit: null,
      datas: [],
      user: {
        type: '',
        username: '',
        password: ''
      }
    }
  },
  /**
   * The components that the page can use.
   */
  components: {
    VLayout,
    VSelect,
    VDatePicker
  },
  mounted () {
    // this.addItem()
    if (this._VisitType && this._VisitType === 'IPD') {
      $('.disable_ccp5' + (storage.get('allowcopypaste') ? 'fc' : '')).bind('cut copy paste', e => {
        this.toastedError('Bạn không thể thực hiện thao tác này trên hệ thống!')
        return false
      })
    }
    this.getMasterDatas({Form: 'EDVOFV1'}, () => {
      this.getData()
    })
  },
  computed: {
    hasConfirmBtn: function () {
      return this.DataSubmit.DatasOrder && this.DataSubmit.DatasOrder.find(e => !e.IsConfirm && e.Id && !e.Remove)
    },
    hasNurseConfirmBtn () {
      return this.DataSubmit.Version !== 0 && this.DataSubmit.DatasOrder && this.DataSubmit.DatasOrder.find(e => e.Status && !e.MedicalStaffName)
    },
    needCreate () {
      return (this.DataSubmit.Version === 0 && this.DataSubmit.DatasOrder.length === 0)
    }
  },
  methods: {
    remove (index, item) {
      // if (item.Id) {
      //   new Orders({}, this._VisitType).update('Delete/' + item.Id).then(response => {
      //     this.DataSubmit.DatasOrder[index].Remove = true
      //   })
      // } else {
      //   this.DataSubmit.DatasOrder[index].Remove = true
      // }
      // if (item.Id) {
      //   item.Id = ''
      // }
      // this.DataSubmit.DatasOrder[index].Id = ''
      this.DataSubmit.DatasOrder[index].Remove = true
    },
    async confirmed () {
      await this.submit(true)
      new Orders({}, this._VisitType).update((this.user.type === 'Nurse' ? 'NurseConfirm/' : 'Confirm/') + this._VisitId, this.user).then(response => {
        this.getData()
        this.hide()
      })
    },
    hide () {
      this.$modal.hide('doctorLogin')
      this.user = {}
    },
    confirm (type) {
      this.$modal.show('doctorLogin', {
        height: 'auto',
        width: 'auto'
      })
      this.user = {
        type,
        username: '',
        password: ''
      }
    },
    getData () {
      new Orders({}, this._VisitType).find(this._VisitId).then(response => {
        response.DatasOrder.forEach(item => {
          item.Remove = false
          // if (item.Time) {
          //   item.Time = moment(item.Time, this.vDateTimeFormat)
          // }
          if (item.UsedAt && !item.IsConfirm) {
            item.UsedAt = moment(item.UsedAt, this.vDateTimeFormat)
          }
          if (!item.MedicalStaffName) {
            item.Status = false
          }
        })
        this.DataSubmit = response
        this.mapMdData2Data()
        // if (response.Datas.length === 0) this.addItem()
      })
    },
    async submit (hidemsg) {
      this.mapData2MDData()
      var DataSubmit = Object.assign({}, this.DataSubmit)
      DataSubmit.DatasOrder.forEach(item => {
        // item.Time = moment(item.Time).format(this.vDateTimeFormat)
        if (item.UsedAt && typeof item.UsedAt === 'object') {
          item.UsedAt = moment(item.UsedAt).format(this.vDateTimeFormat)
        }
      })
      // DataSubmit.DatasOrder = DataSubmit.DatasOrder.filter(e => !e.Remove)
      await new Orders({}, this._VisitType).update(this._VisitId, DataSubmit).then(response => {
        if (!hidemsg) {
          this.toastedSuccess()
          this.getData()
        }
      })
    },
    create () {
      new Orders({}, this._VisitType).update(this._VisitId, {}, 'Create/').then(response => {
        this.getData()
      })
    },
    confirmPopup () {
      this.$modal.show('dialog', {
        clickToClose: false,
        title: this.__t('Thông báo'),
        text: this.__t('Tạo mới Phiếu ghi nhận thuốc y lệnh miệng'),
        class: 'v-dialog v-dialog-warning',
        buttons: [
          {
            title: this.__t('Tôi xác nhận'),
            class: 'btn btn-warning',
            handler: () => {
              this.$modal.hide('dialog')
              this.create()
            }
          },
          {
            title: this.__t('Bỏ qua'),
            class: 'btn',
            handler: () => {
              // this.back()
              this.$modal.hide('dialog')
            }
          }
        ]
      })
    },
    addItem () {
      this.DataSubmit.DatasOrder.push({
        Time: moment(new Date()).format(this.vDateTimeFormat),
        Drug: '',
        Dosage: '',
        Route: '',
        UsedAt: '',
        MedicalStaffName: '',
        DoctorConfirm: '',
        Quantity: '',
        IsConfirm: false,
        Status: false,
        Remove: false
      })
    },
    getDiagnosis () {
      let str = ''
      let str2 = ''
      if (this.DataSubmit) {
        if (this.DataSubmit.Customer.Diagnosis) {
          str += this.DataSubmit.Customer.Diagnosis
        }
        if (this.DataSubmit.DiagnosisOption) {
          if (str) {
            str += ', '
          }
          str += this.DataSubmit.DiagnosisOption
        }
        if (this.DataSubmit.Customer.ICD10 && this.JSONParse(this.DataSubmit.Customer.ICD10).length) {
          str2 += this.JSONParse(this.DataSubmit.Customer.ICD10).map(e => e.code).join(', ')
        }
        if (this.DataSubmit.Customer.ICDOptions && this.JSONParse(this.DataSubmit.Customer.ICDOptions).length) {
          if (str2) {
            str2 += ', '
          }
          str2 += this.JSONParse(this.DataSubmit.Customer.ICDOptions).map(e => e.code).join(', ')
        }
        if (str2) {
          str += ' (' + str2 + ')'
        }
      }
      return str
    }
  }
}
</script>
