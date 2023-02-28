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
                  <div class="form-group">
                    <label for="Gender">{{__t('customer.gioi_tinh')}}</label>
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
              <!-- <div class="row">
                <div class="col-md-12">
                  <div class="form-group">
                    <label class="w-full">Chưa rõ danh tính</label>
                    <span class="v-checkbox">
                      <input class="form-control" type="checkbox" id="no-name" name="no-name" v-model="filters.NoName">
                      <label for="no-name"></label>
                    </span>
                  </div>
                </div>
              </div> -->
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
      <p><b>{{__t('Kết quả')}} ({{customers.length}})</b></p>
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
    </template>
    <modal name="visitcode-modal" transition="pop-out" height="auto" :scrollable="true" :width="modalWidth" :clickToClose="false">
      <div class="sync-ed-box">
        <table class="table table-striped table-bordered" id="customer-tbl" v-if="isOneResult">
          <thead>
            <tr>
              <td><b>{{__t('Thông tin bệnh nhân')}}</b></td>
            </tr>
          </thead>
          <tbody>
            <tr :data="customer" :key="index" v-for="(customer,index) in customers">
              <td>
                PID: <b>{{customer.PID}} - {{customer.Fullname}}</b> - {{customer.DateOfBirth}}
                <div>{{__t('Địa chỉ')}}: {{customer.Address}}</div>
              </td>
            </tr>
          </tbody>
        </table>
        <div v-if="visitcodes && visitcodes.length">
          <table class="table table-striped table-bordered" id="customer-tbl">
            <thead>
              <tr>
                <td colspan="2"><b>{{__t('Kết quả')}} ({{visitcodes.length}})</b></td>
                <td>{{__t('Chọn')}}</td>
              </tr>
            </thead>
            <tbody>
              <tr :data="visitcode" :key="index" v-for="(visitcode, index) in visitcodes">
                <td width="200px" style="vertical-align: top;">
                  <div class="no-wrap" style="font-size: 16px"><b>{{__t('Lượt khám')}}: {{visitcode.VisitTypeName}}</b></div>
                  <b>{{__t('Ngày vào viện')}}: <p class="no-wrap highlighted-text">{{visitcode.NgayVao}}</p></b>
                </td>
                <td>
                  <div>{{visitcode.BenhVien}}</div>
                  <div>{{__t('BS')}}: <b>{{visitcode.BacSi}}</b></div>
                  <div>{{__t('Khoa')}}: {{visitcode.TenKhoa}}</div>
                  <div>{{__t('Mã tiếp nhận')}}: {{visitcode.VisitCode}}</div>
                  <p style="color: red;"><i v-if="visitcode.VisitTypeName === 'Nội trú'"><i class="fa fa-exclamation-triangle" aria-hidden="true"></i> {{__t('Lượt khám')}} <b>{{__t('Nội trú')}}</b> {{__t('đối với bệnh nhân chuyển từ')}} <b>{{__t('Nội trú')}}</b> {{__t('xuống khám')}}</i></p>
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
                <td><button type="button" class="btn btn-white" @click="$modal.hide('visitcode-modal')">{{__t('Quay lại')}}</button></td>
                <td colspan="2"><button type="button" :disabled="!hasSelectVissitCode" class="btn btn-warning pull-right" @click="choseAndgo2InitialAssessment()">{{__t('Chọn và đi đến phân loại bệnh nhân')}}</button></td>
              </tr>
            </tbody>
          </table>
        </div>
        <template v-else-if="visitcodes && visitcodes.length === 0">
          <div class="callout callout-warning">
            <h4>{{__t('Không tìm thấy mã lượt khám của bệnh nhân!')}}</h4>
            <p>{{__t('Vui lòng kiểm tra lại thông tin trên eHos/OH')}}.</p>
            <p><button type="button" class="btn btn-white" @click="$modal.hide('visitcode-modal')">{{__t('Quay lại')}}</button></p>
          </div>
        </template>
      </div>
    </modal>
    <!-- <p class="text-center"><button type="button" class="btn" @click="submitCustomersOPD()">{{__t('customer.btn_tao_moi')}}</button></p> -->
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
import CustomersOPD from '@/services/OPD/Customer'
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
      opdid: null,
      visitcodes: [],
      modalWidth: MODAL_WIDTH,
      customer: null,
      customers: null,
      TransferData: null,
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
    noName () {
      this.filters.Fullname = 'Không rõ danh tính 01'
    },
    go2InitialAssessment () {
      this.$router.push({name: 'OPDInitialAssessmentShort', params: {Id: this.opdid}})
    },
    choseAndgo2InitialAssessment () {
      var vsCode = []
      var vsType = []
      this.visitcodes.forEach(item => {
        if (item.selected && !vsCode.includes(item.VisitCode)) {
          vsCode.push(item.VisitCode)
          vsType.push(item.VisitTypeCode)
        }
      })
      if (this.TransferData) {
        this.create(vsCode ? vsCode.join(',') : '')
      } else {
        this.submitCustomersOPD(vsCode ? vsCode.join(',') : '', vsType ? vsType[0] : '')
      }
      // this.customer.VisitCode = vsCode ? vsCode.join(',') : ''
    },
    create (VisitCode) {
      new CustomersOPD().update('/customer-form-anesthesia/' + this.TransferData.Id, { ...this.customer, ...this.TransferData }).then(response => {
        this.$router.push({name: 'OPDInitialAssessmentShort', params: {Id: response.Id}})
      })
    },
    submitCustomersOPD (VisitCode, VisitTypeCode) {
      this.customer.VisitCode = VisitCode
      this.customer.VisitType = VisitTypeCode
      new CustomersOPD().create(this.customer).then(response => {
        this.$modal.hide('visitcode-modal')
        this.$router.push({name: 'OPDInitialAssessmentShort', params: {Id: response.Id}})
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
      new CustomersOPD({checkTranfer: 'whatever', hidemsg: true}).find('SyncVisitCodeByPID/' + customer.PID).then(response => {
        this.$modal.show('visitcode-modal')
        this.visitcodes = response
      }).catch(e => {
        if (e.data && e.data.TransferExit) {
          this.openConfirmPopup(e.data.TransferData)
        } else if (e.data && e.data.ViMessage) {
          this.toastedError(e.data.ViMessage)
        } else {
          this.toastedError()
        }
      })
    },
    msg (item) {
      return `<p>${this.__t('Tên người bệnh')}: ${item.Fullname}</p><p>PID: ${item.PID}</p><p>${this.__t('Ngày sinh')}: ${item.DateOfBirth ? moment(item.DateOfBirth).format('DD/MM/YYYY') : ''}</p><div>${this.__t('Từ khoa')}: ${item.SpecialtyName}</div>`
    },
    openConfirmPopup (item) {
      this.TransferData = item
      this.$modal.show('dialog', {
        title: this.__t('Xác nhận tiếp nhận bệnh nhân?'),
        text: this.msg(item),
        class: 'v-dialog v-dialog-warning',
        buttons: [
          {
            title: this.__t('Đồng ý'),
            class: 'btn',
            handler: () => {
              this.$modal.hide('dialog')
              this.choseAndgo2InitialAssessment()
            }
          },
          {
            title: this.__t('Hủy bỏ'),
            class: 'btn bg-yellow',
            handler: () => {
              this.TransferData = null
              this.$modal.hide('dialog')
            }
          }
        ]
      })
    },
    // SyncVisitCode (cusotmer) {
    //   new CustomersOPD().find('SyncVisitCode/' + cusotmer.PID).then(response => {
    //     this.$modal.show('visitcode-modal')
    //     // var vsCode = this.customer.VisitCode ? this.customer.VisitCode.split(',') : []
    //     // response.forEach(element => {
    //     //   element.selected = vsCode.includes(element.VisitCode)
    //     // })
    //     this.visitcodes = response
    //   })
    // },
    updateVisitCode (visitcode) {
      this.customer.VisitCode = visitcode
      new CustomersOPD().create(this.customer, 'ManualUpdate/' + this.opdid).then(response => {
        this.toastedSuccess()
        // this.getData()
        // EventBus.$emit('updateGlobalEd', 'thangdc in here')
        this.go2InitialAssessment()
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
          // if (this.ImSuperAdmin()) this.submitCustomersOPD('TN.X.Y.X.' + new Date().getTime())
        })
    }
  }
}
</script>
