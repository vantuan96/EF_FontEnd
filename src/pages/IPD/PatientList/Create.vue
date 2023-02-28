<template>
  <div class="main-content" id="add-customer-page">
    <h1 class="title-page text-center">{{__t('Thêm bệnh nhân')}}</h1>
    <div class="add-form-group">
      <form v-on:submit.prevent="submit" name="add-customer">
        <div class="row">
          <div class="col-md-8 col-md-offset-2">
            <div class="box box-border effect1">
              <div class="row">
                <div class="col-md-6">
                  <div class="form-group" :class="{ 'form-group--error': $v.filters.Fullname.$error }">
                    <label for="Fullname" required>{{__t('customer.ho_ten_PID')}}</label>
                    <input type="text" class="form-control" v-model="filters.Fullname" id="Fullname" :placeholder="__t('customer.ho_ten_PID')">
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group" :class="{ 'form-group--error': $v.filters.DateOfBirth.$error }">
                    <label for="DateOfBirth" required>{{__t('customer.ngay_sinh')}}</label>
                    <masked-input mask="11/11/1111" v-model="filters.DateOfBirth" :placeholder="vDateFormat" class="form-control" />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <div class="form-group" :class="{ 'form-group--error': $v.filters.Gender.$error }">
                    <label for="Gender" required>{{__t('customer.gioi_tinh')}}</label>
                    <div class="gender-select flex-box">
                      <input type="radio" id="radio1" name="Gender" v-model="filters.Gender" value="0">
                      <label for="radio1">{{__t('customer.gioi_tinh_nu')}}</label>
                      <input type="radio" id="radio2" name="Gender" v-model="filters.Gender" value="1">
                      <label for="radio2">{{__t('customer.gioi_tinh_nam')}}</label>
                      <input type="radio" id="radio3" name="Gender" v-model="filters.Gender" value="2">
                      <label for="radio3">{{__t('customer.gioi_tinh_khac')}}</label>
                    </div>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <label for="Nationality">{{__t('customer.quoc_tich')}}</label>
                    <input type="text" class="form-control" id="Nationality" v-model="filters.Nationality" :placeholder="__t('customer.quoc_tich')">
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-12">
                  <div class="form-group">
                    <label for="Address">{{__t('customer.cho_o_hien_tai')}}</label>
                    <input type="text" class="form-control" id="Address" v-model="filters.Address" :placeholder="__t('customer.cho_o_hien_tai')">
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-12">
                  <button type="button" class="btn btn-block v-yellow-btn" @click="submit">{{__t('customer.btn_tim_kiem')}}</button>
                  <input type="submit" hidden />
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
    <template v-if="customers && customers.length">
      <p><b>Kết quả ({{customers.length}})</b></p>
      <table class="table table-striped table-bordered" id="customer-tbl">
        <tbody>
          <tr :data="customer" :key="index" v-for="(customer,index) in customers">
            <td width="10" align="center">{{index + 1}}</td>
            <td>
              PID: <b>{{customer.PID}} - {{customer.Fullname}}</b> - {{customer.DateOfBirth}}
              <div>{{customer.Address}}</div>
            </td>
            <td width="10">
              <button type="button" class="btn" @click="SyncVisitCode(customer)">{{__t('Chọn')}}</button>
            </td>
          </tr>
        </tbody>
      </table>
    </template>
    <template v-else-if="customers && customers.length === 0">
      <p class="text-center">{{__t('customer.msg_khong_ket_qua')}}</p>
      <p class="text-center" v-permissions="'ICIPD1DRAFT'" v-if="filters.Fullname && !isPositiveInteger(filters.Fullname)"><button type="button" class="btn" @click="submitDraftWithoutInfoCustomersIPD()">{{__t('Tạo hồ sơ nháp với thông tin đã nhập')}}</button></p>
    </template>
    <modal name="visitcode-modal" transition="pop-out" height="auto" :scrollable="true" :width="modalWidth" :clickToClose="false">
      <div class="sync-ed-box">
        <table class="table table-striped table-bordered" id="customer-tbl" v-if="isOneResult">
          <thead>
            <tr>
              <td><b>Thông tin bệnh nhân</b></td>
            </tr>
          </thead>
          <tbody>
            <tr :data="customer" :key="index" v-for="(customer,index) in customers">
              <td>
                PID: <b>{{customer.PID}} - {{customer.Fullname}}</b> - {{customer.DateOfBirth}}
                <div>Địa chỉ: {{customer.Address}}</div>
              </td>
            </tr>
          </tbody>
        </table>
        <div v-if="visitcodes && visitcodes.length">
          <table class="table table-striped table-bordered" id="customer-tbl">
            <thead>
              <tr>
                <td colspan="2"><b>Kết quả lượt khám từ OH/Ehos ({{visitcodes.length}})</b></td>
                <td>Chọn</td>
              </tr>
            </thead>
            <tbody>
              <tr :data="visitcode" :key="index" v-for="(visitcode, index) in visitcodes">
                <td width="200px" style="vertical-align: top;">
                  <div class="no-wrap" style="font-size: 16px"><b>Lượt khám: {{visitcode.VisitTypeName}}</b></div>
                  <b>Ngày vào viện: <p class="no-wrap highlighted-text">{{visitcode.NgayVao}}</p></b>
                </td>
                <td>
                  <div>{{visitcode.BenhVien}}</div>
                  <div>Bs: <b>{{visitcode.BacSi}}</b></div>
                  <div>Khoa: {{visitcode.TenKhoa}}</div>
                  {{visitcode.VisitCode}}
                </td>
                <td width="50" class="v-checkbox" align="center">
                  <input type="checkbox" :id="'ETRIOE-' + index" :name="'ETRIOE-' + index" v-model="visitcode.selected">
                  <label :for="'ETRIOE-' + index"></label>
                </td>
                <!-- <td width="50" class="v-checkbox" align="center">
                  <button class="btn btn-block btn-warning" @click="updateVisitCode(visitcode.VisitCode)">Chọn</button>
                </td> -->
              </tr>
              <tr>
                <!-- <td><button type="button" class="btn btn-warning pull-left" @click="go2InitialAssessment()">Đi đến phân loại bệnh nhân</button></td> -->
                <td><button type="button" class="btn btn-white" @click="$modal.hide('visitcode-modal')">Quay lại</button></td>
                <td colspan="2">
                  <button type="button" :disabled="!hasSelectVissitCode" class="btn btn-warning pull-right" @click="choseAndgo2InitialAssessment()">Tạo mới và đi đến phân loại bệnh nhân</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <template v-else-if="visitcodes && visitcodes.length === 0">
          <div class="callout callout-warning">
            <h4>Không tìm thấy mã lượt khám của bệnh nhân!</h4>
            <p>Vui lòng kiểm tra lại thông tin trên eHos/OH.</p>
          </div>
          <div>
            <button type="button" v-permissions="'ICIPD1DRAFT'" class="btn btn-warning ICIPD1DRAFT pull-right" @click="focusAndCreateDraft()">{{__t('Tạo hồ sơ nháp')}}</button>{{" "}}
            <button type="button" class="btn btn-white pull-lexft" @click="$modal.hide('visitcode-modal')">Quay lại</button>
          </div>
        </template>
      </div>
    </modal>
    <!-- <p class="text-center" v-permissions="'ICIPD1DRAFT'" v-if="filters.Fullname"><button type="button" class="btn" @click="submitDraftWithoutInfoCustomersIPD()">{{__t('Tạo hồ sơ nháp')}}</button></p> -->
  </div>
</template>
<script>
/* ============
 * Add cusotmer Page
 * ============
 *
 * The home index page.
 */

import MaskedInput from 'vue-masked-input'
import Customer from '@/services/Customer'
import moment from 'moment'
import { required, helpers, requiredIf } from 'vuelidate/dist/validators.min'
import MixinView from '@/mixins/view.js'
import CustomersIPD from '@/services/IPD/Customer'
// import NProgress from 'nprogress'
import utils from '@/utils.js'
const isDate = (value) => !helpers.req(value) || moment(value, process.env.DATE_FORMAT, true).isValid()
const MODAL_WIDTH = 750
export default {
  /**
   * The name of the page.
   */
  name: 'add-opd',
  mixins: [MixinView],
  data () {
    return {
      VisitId: null,
      visitcodes: [],
      modalWidth: MODAL_WIDTH,
      customer: null,
      customers: null,
      filters: {
        DateOfBirth: null,
        Address: null,
        Gender: null,
        Fullname: null,
        Nationality: null
      }
    }
  },
  validations: {
    filters: {
      DateOfBirth: {
        isDate,
        required: requiredIf(function (nestedModel) {
          return this.filters.Fullname && !utils.isPositiveInteger(this.filters.Fullname)
        })
      },
      Fullname: {
        required
      },
      Gender: {
        required: requiredIf(function (nestedModel) {
          return this.filters.Fullname && !utils.isPositiveInteger(this.filters.Fullname)
        })
      }
    }
  },
  /**
   * The components that the page can use.
   */
  components: {
    MaskedInput
  },
  computed: {
    isOneResult () {
      return this.customers && this.customers.length === 1
    },
    searchByPID: function () {
      return utils.isPositiveInteger(this.filters.Fullname)
    },
    hasSelectVissitCode () {
      return this.visitcodes.find(item => {
        return item.selected
      })
    }
  },
  mounted () {
    // this.getData()
    this.modalWidth = window.innerWidth < MODAL_WIDTH
      ? '90%'
      : MODAL_WIDTH
  },
  methods: {
    focusAndCreateDraft () {
      var vsCode = []
      this.visitcodes.forEach(item => {
        if (item.selected && !vsCode.includes(item.VisitCode)) {
          vsCode.push(item.VisitCode)
        }
      })
      this.submitDraftCustomersIPD(vsCode ? vsCode.join(',') : '')
    },
    go2InitialAssessment () {
      this.$router.push({name: 'IPDInitialAssessmentForAdult', params: {Id: this.VisitId}})
    },
    choseAndgo2InitialAssessment () {
      var vsCode = []
      this.visitcodes.forEach(item => {
        if (item.selected && !vsCode.includes(item.VisitCode)) {
          vsCode.push(item.VisitCode)
        }
      })
      if (vsCode) {
        this.submitCustomersIPD(vsCode ? vsCode.join(',') : '')
      } else {
        // this.$router.push({name: 'IPDInitialAssessmentForAdult', params: {Id: this.VisitId}})
      }
      // this.customer.VisitCode = vsCode ? vsCode.join(',') : ''
    },
    submitCustomersIPD (VisitCode) {
      this.customer.VisitCode = VisitCode
      new CustomersIPD().create(this.customer).then(response => {
        this.$modal.hide('visitcode-modal')
        this.$router.push({name: 'IPDInitialAssessmentForAdult', params: {Id: response.Id}})
      })
    },
    submitDraftCustomersIPD (VisitCode) {
      this.customer.VisitCode = VisitCode
      new CustomersIPD().update('/Draft', this.customer).then(response => {
        this.$modal.hide('visitcode-modal')
        this.$router.push({name: 'IPDInitialAssessmentForAdult', params: {Id: response.Id}})
      })
    },
    submitDraftWithoutInfoCustomersIPD () {
      this.$v.filters.$touch()
      // NProgress.start()
      if (this.$v.filters.$error) {
        return false
      }
      new CustomersIPD().update('/Draft', this.filters).then(response => {
        this.$modal.hide('visitcode-modal')
        this.$router.push({name: 'IPDInitialAssessmentForAdult', params: {Id: response.Id}})
      })
    },
    SyncVisitCode (customer) {
      if (!customer.Address) customer.Address = this.filters.Address
      if (!customer.Nationality) customer.Nationality = this.filters.Nationality
      var dataSubmit = customer
      if (customer === undefined) {
        this.$v.filters.$touch()
        // NProgress.start()
        if (this.$v.filters.$error) {
          return false
        }
        dataSubmit = this.filters
      }
      this.customer = dataSubmit
      new CustomersIPD().find('SyncVisitCodeByPID/' + customer.PID).then(response => {
        this.$modal.show('visitcode-modal')
        // var vsCode = this.customer.VisitCode ? this.customer.VisitCode.split(',') : []
        // response.forEach(element => {
        //   element.selected = vsCode.includes(element.VisitCode)
        // })
        this.visitcodes = response
      })
    },
    submit () {
      this.$v.filters.$touch()
      // NProgress.start()
      if (this.$v.filters.$error) {
        return false
      }
      if (utils.isPositiveInteger(this.filters.Fullname)) {
        this.filters.PID = this.filters.Fullname
      } else {
        this.filters.PID = null
      }
      new Customer(this.filters)
        .all()
        .then(response => {
          this.customers = response
          if (this.isOneResult) this.SyncVisitCode(this.customers[0])
          // if (this.ImSuperAdmin()) this.submitCustomersIPD('TN.X.Y.X.' + new Date().getTime())
        })
    },
    isPositiveInteger (s) {
      return utils.isPositiveInteger(s)
    }
  }
}
</script>
