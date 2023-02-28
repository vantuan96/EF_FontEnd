<template>
  <div>
    <h3 v-if="!viewOnly">{{__t('Y lệnh miệng')}}</h3>
    <div class="form-group" v-if="DataSubmit.Version > 0">
      <label>{{__t('Chẩn đoán')}}</label>
      <div class="inline">{{getDiagnosis()}}</div>
      <!-- <Icd10View :value="JSONParse(DataSubmit.Customer.ICD10)"/> -->
    </div>
    <md-input-text :readonly="true" v-if="MASTERDATA['EDVOFV1PI'] && DataSubmit.Version > 0" v-model="MASTERDATA['EDVOFV1PI']"/>
    <table class="table table-bordered table-view">
      <tbody v-if="DataSubmit.DatasOrder && DataSubmit.DatasOrder.length">
        <tr>
          <th>{{__t('Thời gian')}}</th>
          <th width="250">{{__t('Tên thuốc')}}</th>
          <th class="no-wrap" width="1" v-if="DataSubmit.Version > 0">{{__t('Số lượng')}}</th>
          <th>{{__t('Liều dùng')}}</th>
          <th>{{__t('Đường dùng')}}</th>
          <th>{{__t('Thời điểm dùng')}}</th>
          <th>{{__t('Thực hiện')}}</th>
          <th>{{__t('Bs xác nhận')}}</th>
        </tr>
        <tr :data="item" :key="index" v-for="(item,index) in DataSubmit.DatasOrder">
          <td>{{item.Time}}</td>
          <td style="white-space: pre-line">{{item.Drug}}</td>
          <td v-if="DataSubmit.Version > 0">{{item.Quantity}}</td>
          <td>{{item.Dosage}}</td>
          <td>{{item.Route}}</td>
          <td>{{item.UsedAt}}</td>
          <td>
            <template v-if="item.MedicalStaffName">
              {{__t('Đã thực hiện')}}
              <span v-if="item.Status"><ad-Info :ad="item.MedicalStaffName" /></span>
            </template>
            <template v-else>
              {{__t('Chưa thực hiện')}}
            </template>
          </td>
          <td>
            <span>
              <ad-Info :ad="item.DoctorConfirm" />
            </span>
          </td>
        </tr>
        <tr v-if="hasConfirmBtn">
          <td colspan="10">
            <button class="btn pull-right btn-info" type="button" @click="confirm()">{{__t('btn.bs_xac_nhan')}}</button>
          </td>
        </tr>
      </tbody>
      <tbody v-else>
        <tr>
          <th class="text-center">{{__t('Chưa có dữ liệu')}}</th>
        </tr>
      </tbody>
    </table>
    <modal name="doctorLogin" transition="pop-out" id="doctor-login" height="auto">
      <div class="box v-model-content-popup">
        <div class="box-header text-center">
          <h3 class="box-title">{{__t('btn.nhap_tai_khoan')}}</h3>
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
          <p style="margin-top: 10px; text-align:center"> {{__t('Sử dụng tài khoản máy tính')}}</p>
        </div>
      </div>
    </modal>
    <p>A03_030_290321_VE</p>
  </div>
</template>
<script>
/* ============
 * Add cusotmer Page
 * ============
 *
 * The home index page.
 */
import VLayout from '@/layouts/Default.vue'
import MixinMasterData from '@/mixins/masterdata.js'
import MixinForm from '@/mixins/form.js'

import Orders from '@/services/ED/Orders'
// import NProgress from 'nprogress'
// import _ from 'lodash'

export default {
  /**
   * The name of the page.
   */
  name: 'ORDERSVIEW',
  mixins: [MixinForm, MixinMasterData],
  props: ['viewOnly', 'VisitId', 'VisitType'],
  data () {
    return {
      DataSubmit: {},
      datas: [],
      user: {}
    }
  },
  /**
   * The components that the page can use.
   */
  components: {
    VLayout
  },
  mounted () {
    // this.addItem()
    this.getMasterDatas({Form: 'EDVOFV1'}, () => {
      this.getData()
    })
  },
  computed: {
    hasConfirmBtn: function () {
      return !this.viewOnly && (this.DataSubmit.DatasOrder && this.DataSubmit.DatasOrder.find(e => !e.IsConfirm && e.Id))
    }
  },
  methods: {
    confirmed () {
      new Orders({}, this._VisitType).update('Confirm/' + this.$route.params.Id, this.user).then(response => {
        this.getData()
        this.hide()
      })
    },
    hide () {
      this.$modal.hide('doctorLogin')
      this.user = {}
    },
    confirm () {
      this.$modal.show('doctorLogin', {
        height: 'auto',
        width: 'auto'
      })
      this.user = {}
    },
    getData () {
      new Orders({}, this._VisitType).find(this._VisitId).then(response => {
        this.DataSubmit = response
        this.mapMdData2Data()
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
        if (str2) {
          str2 += ', '
        }
        if (this.DataSubmit.Customer.ICDOptions && this.JSONParse(this.DataSubmit.Customer.ICDOptions).length) {
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
