<template>
  <div class="main-content" id="add-customer-page">
    <h1 class="title-page text-center">{{__t('customer.thong_tin_benh_nhan')}}</h1>
    <div class="add-form-group">
      <div class="row">
        <!-- <div class="col-md-8 col-md-offset-2"> -->
        <div class="col-md-10 col-md-offset-1">
          <div class="box box-border effect1">
            <div class="row">
              <div class="col-md-6">
                <div class="form-group" :class="{ 'form-group--error': $v.customer.PID.$error }">
                  <label for="Fullname">PID:</label>
                  <div class="input-group input-group-sm">
                    <input :class="checkBoder === 1 || checkBoder === 3 ? 'borderColor' : ''" type="text" class="form-control" v-model="customer.PID"/>
                    <span class="input-group-btn">
                      <button type="button" class="btn btn-info btn-flat" :disabled="!customer.PID" @click="SyncEd()"><span class="glyphicon glyphicon-refresh green-color"></span></button>
                    </span>
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group" :class="{'disable': !customer.PID }">
                  <label for="DateOfBirth">VisitCode:</label>
                  <div class="input-group input-group-sm">
                    <input type="text" :class="checkBoder === 2 || checkBoder === 3 ? 'borderColor' : ''" class="form-control" v-model="customer.VisitCode"/>
                    <span class="input-group-btn">
                      <button type="button" class="btn btn-info btn-flat" @click="SyncVisitCode()"><span class="glyphicon glyphicon-refresh green-color"></span></button>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <hr />
            <div class="row">
              <div class="col-md-6">
                <div class="form-group" :class="{ 'form-group--error': $v.customer.Fullname.$error }">
                  <label for="Fullname" required>{{__t('customer.ho_ten')}}:</label>
                  <!-- <input type="text" class="form-control" v-model="customer.Nationality" :placeholder="__t('customer.quoc_tich')"> -->
                  <FakeInput style="margin: 0 !important" type="text" class="form-control" v-model="customer.Fullname" :placeholder="__t('customer.ho_ten')" />
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group" :class="{ 'form-group--error': $v.customer.DateOfBirth.$error }">
                  <label for="DateOfBirth">{{__t('customer.ngay_sinh')}}:</label>
                  <!-- <v-masked-input mask="11/11/1111" v-model="customer.DateOfBirth" :placeholder="vDateFormat" class="form-control" /> -->
                  <FakeInput style="margin: 0 !important" :placeholder="vDateFormat" class="form-control"  v-model="customer.DateOfBirth"/>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6">
                <div class="form-group" :class="{ 'form-group--error': $v.customer.Gender.$error }">
                  <label for="Gender" required>{{__t('customer.gioi_tinh')}}:</label>
                  <div class="gender-select flex-box disable" style="pointer-events: none;">
                    <input type="radio" id="radio1" name="Gender" v-model="customer.Gender" value="0">
                    <label for="radio1">{{__t('customer.gioi_tinh_nu')}}</label>
                    <input type="radio" id="radio2" name="Gender" v-model="customer.Gender" value="1">
                    <label for="radio2">{{__t('customer.gioi_tinh_nam')}}</label>
                    <input type="radio" id="radio3" name="Gender" v-model="customer.Gender" value="2">
                    <label for="radio3">{{__t('customer.gioi_tinh_khac')}}</label>
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <label for="Nationality">{{__t('customer.quoc_tich')}}:</label>
                  <!-- <input type="text" class="form-control" v-model="customer.Nationality" :placeholder="__t('customer.quoc_tich')"> -->
                  <FakeInput style="margin: 0 !important" type="text" class="form-control" v-model="customer.Nationality" :placeholder="__t('customer.quoc_tich')" />
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6">
                <div class="form-group">
                  <label>{{__t('customer.nghe_nghiep')}}:</label>
                  <!-- <v-select :placeholder="__t('Chọn')" v-model="customer.Job" :options="findJob" /> -->
                  <FakeInput style="margin: 0 !important" type="text" class="form-control" v-model="customer.Job" :placeholder="__t('customer.nghe_nghiep')"/>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <label>{{__t('customer.noi_lam_viec')}}</label>
                  <!-- <input type="text" class="form-control" v-model="customer.WorkPlace" :placeholder="__t('customer.noi_lam_viec')"/> -->
                  <FakeInput style="margin: 0 !important" type="text" class="form-control" v-model="customer.WorkPlace" :placeholder="__t('customer.noi_lam_viec')"/>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6">
                <div class="form-group">
                  <label>{{__t('customer.so_dien_thoai')}}</label>
                  <!-- <input type="text" class="form-control" v-model="customer.Phone" :placeholder="__t('customer.so_dien_thoai')"/> -->
                  <FakeInput style="margin: 0 !important" type="text" class="form-control" v-model="customer.Phone" :placeholder="__t('customer.so_dien_thoai')"/>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <label>{{__t('customer.dan_toc')}}:</label>
                  <!-- <input type="text" class="form-control" v-model="customer.Fork" :placeholder="__t('customer.dan_toc')"/> -->
                  <!-- <v-select :placeholder="__t('Chọn')" v-model="customer.Fork" :options="findETHNIC" /> -->
                  <FakeInput style="margin: 0 !important" type="text" class="form-control" v-model="customer.Fork" :placeholder="__t('customer.dan_toc')"/>
                </div>
              </div>
              <div class="col-md-12">
                <div class="form-group">
                  <label>{{__t('customer.cho_o_hien_tai')}}</label>
                  <!-- <input type="text" class="form-control" v-model="customer.Address" :placeholder="__t('customer.cho_o_hien_tai')"/> -->
                  <FakeInput style="margin: 0 !important" type="text" class="form-control" v-model="customer.Address" :placeholder="__t('customer.cho_o_hien_tai')"/>
                </div>
              </div>
            </div>
            <hr />
            <div class="row">
              <div class="col-md-6">
                <div class="form-group">
                  <label>{{__t('Số CMTND/Hộ chiếu')}}</label>
                  <!-- <input type="text" class="form-control" v-model="customer.IdentificationCard" :placeholder="__t('Số CMTND/Hộ chiếu')"> -->
                  <FakeInput style="margin: 0 !important" type="text" class="form-control" v-model="customer.IdentificationCard" :placeholder="__t('Số CMTND/Hộ chiếu')" />
                </div>
              </div>
              <div class="col-md-3">
                <div class="form-group">
                  <label>{{__t('Ngày cấp')}}</label>
                  <!-- <v-masked-input mask="11/11/1111" v-model="customer.IssueDate" :placeholder="vDateFormat" class="form-control" /> -->
                  <!-- <v-masked-input mask="11/11/1111" v-model="customer.IssueDate" :placeholder="vDateFormat" class="form-control" /> -->
                  <FakeInput style="margin: 0 !important" v-model="customer.IssueDate" :placeholder="vDateFormat" class="form-control" />
                </div>
              </div>
              <div class="col-md-3">
                <div class="form-group">
                  <!-- <label class="hidden-text">{{__t('Nơi cấp')}}</label> -->
                  <label>{{__t('Nơi cấp')}}</label>
                  <!-- <input type="text" class="form-control" v-model="customer.IssuePlace" :placeholder="__t('Nơi cấp')"/> -->
                  <FakeInput style="margin: 0 !important" type="text" class="form-control" v-model="customer.IssuePlace" :placeholder="__t('Nơi cấp')"/>
                </div>
              </div>
            </div>
            <hr />
            <div class="row">
              <div class="col-md-6">
                <div class="form-group">
                  <label>{{__t('customer.so_bao_hiem_y_te')}}</label>
                  <input v-model="customer.HealthInsuranceNumber" :placeholder="__t('customer.so_bao_hiem_y_te')" class="form-control" />
                  <p><small class="font-italic">Ví dụ: AB 2 22 2313136xxxx</small></p>
                </div>
              </div>
              <div class="col-md-3">
                <div class="form-group" :class="{ 'form-group--error': $v.customer.StartHealthInsuranceDate.$error }">
                  <label>{{__t('customer.thoi_han')}}</label>
                  <v-masked-input mask="11/11/1111" v-model="customer.StartHealthInsuranceDate" :placeholder="vDateFormat" class="form-control" />
                </div>
              </div>
              <div class="col-md-3">
                <div class="form-group" :class="{ 'form-group--error': $v.customer.ExpireHealthInsuranceDate.$error }">
                  <label class="hidden-text">{{__t('Tới')}}</label>
                  <v-masked-input mask="11/11/1111" v-model="customer.ExpireHealthInsuranceDate" :placeholder="vDateFormat" class="form-control" />
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-12">
                <div class="row">
                  <div class="col-md-6">
                    <div class="form-group">
                      <button class="btn pull-left btn-back v-white-btn" type="button" @click="backButton()">{{__t('btn.quay_lai')}}</button>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <button class="btn v-yellow-btn pull-right long-btn" v-shortkey="['ctrl', 's']" @shortkey="submit()" type="button" @click="submit()">{{__t('btn.luu')}}</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <logs :EdId="this.$route.params.Id" :Type="'CustomersED/ManualUpdate'" />
        </div>
      </div>
    </div>
    <modal :name="EdId + '-modal'" transition="pop-out" height="auto" :scrollable="true" :width="modalWidth">
      <div class="sync-ed-box">
        <div v-if="customers && customers.length">
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
                  <button type="button" class="btn" @click="updateEd(customer)">Chọn</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <template v-else-if="customers && customers.length === 0">
          <div class="callout callout-warning">
            <h4>Không tìm thấy bệnh nhân này!</h4>
            <p>Vui lòng kiểm tra lại thông tin trên eHos/OH.</p>
          </div>
        </template>
      </div>
    </modal>
    <modal name="visitcode-modal" transition="pop-out" height="auto" :scrollable="true" :width="modalWidth">
      <div class="sync-ed-box">
        <div v-if="visitcodes && visitcodes.length">
          <p><b>Kết quả ({{visitcodes.length}})</b></p>
          <table class="table table-striped table-bordered" id="customer-tbl">
            <tbody>
              <tr :data="visitcode" :key="index" v-for="(visitcode, index) in visitcodes">
                <td width="10" align="center">{{index + 1}}</td>
                <td width="120px">
                  {{visitcode.VisitCode}}
                  <p>{{visitcode.VisitTypeName}}</p>
                </td>
                <td>
                  <div>{{visitcode.BenhVien}}</div>
                  <div>Bs: <b>{{visitcode.BacSi}}</b></div>
                  <div>Khoa: {{visitcode.TenKhoa}}</div>
                  <div>Ngày vào viện: {{visitcode.NgayVao}}</div>
                </td>
                <td width="50" class="v-checkbox" align="center">
                  <input type="checkbox" :id="'ETRIOE-' + index" :name="'ETRIOE-' + index" v-model="visitcode.selected">
                  <label :for="'ETRIOE-' + index"></label>
                </td>
              </tr>
              <tr>
                <td colspan="4">
                  <div class="row">
                    <div class="col-md-4">
                      <button class="btn btn-block" @click="$modal.hide('visitcode-modal')">Hủy</button>
                    </div>
                    <div class="col-md-8">
                      <button class="btn btn-block btn-warning" @click="updateVisitCode">Chọn</button>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <template v-else-if="visitcodes && visitcodes.length === 0">
          <div class="callout callout-warning">
            <h4>Không tìm thấy kết quả!</h4>
            <p>Vui lòng kiểm tra lại thông tin trên eHos/OH.</p>
          </div>
        </template>
      </div>
    </modal>
    <modal name="error-pid-modal" transition="pop-out" height="auto" :scrollable="true" :width="500">
      <div class="sync-ed-box">
        <h4>
          Thông tin PID không trùng khớp với thông tin nhập vào.
        </h4>
        <p><i>Vui lòng kiểm tra lại</i></p>
        <hr/>
        <p><label>PID:</label> {{errorData.PID}}</p>
        <p><label>Họ và tên:</label> {{errorData.Fullname}}</p>
        <p><label>Ngày sinh:</label> {{errorData.DateOfBirth}}</p>
        <p><label>Số điện thoại:</label> {{errorData.Phone}}</p>
        <p class="text-right"><button type="button" class="btn btn-warning" @click="$modal.hide('error-pid-modal')">Thoát</button></p>
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
import MaskedInput from 'vue-masked-input'
import Customer from '@/services/Customer'
import moment from 'moment'
import { required, helpers } from 'vuelidate/dist/validators.min'
import CustomersED from '@/services/ED/CustomersED'
import Logs from '@/components/Logs.vue'
import EventBus from '@/lib/eventBus'
import constants from '@/constants.js'
import MixinMasterData from '@/mixins/masterdata.js'
import MixinForm from '@/mixins/form.js'
// import NProgress from 'nprogress'
const isDate = (value) => !helpers.req(value) || moment(value, process.env.DATE_FORMAT, true).isValid()
const isPid = (value) => !helpers.req(value) || value.length === 8 || value.length === 9 || value.length === 10
const MODAL_WIDTH = 750
export default {
  /**
   * The name of the page.
   */
  name: 'add-ed',
  mixins: [MixinMasterData, MixinForm],
  data () {
    return {
      hasSubmit: false,
      ETHNICLIST: null,
      findETHNIC: null,
      JOBLIST: null,
      findJob: null,
      GENDERLIST: constants.GENDERLIST,
      modalWidth: MODAL_WIDTH,
      customers: null,
      checkBoder: 0,
      visitcodes: null,
      customerExceptChoose: false,
      exceptChoose: {},
      customer: {
        DateOfBirth: null,
        Address: null,
        Gender: null,
        Fullname: null,
        Nationality: null,
        BacSiAD: null,
        ForkChoose: null,
        JobChoose: null
      },
      EdId: this.$route.params.Id,
      errorData: {}
    }
  },
  validations: {
    customer: {
      DateOfBirth: {
        isDate
      },
      ExpireHealthInsuranceDate: {
        isDate
      },
      StartHealthInsuranceDate: {
        isDate
      },
      Fullname: {
        required
      },
      Gender: {
        required
      },
      PID: {
        isPid
      }
    }
  },
  /**
   * The components that the page can use.
   */
  components: {
    MaskedInput,
    Logs
  },
  mounted () {
    this.getData()
    this.getMasterDatas({Form: 'GENJOBB'}, (data) => {
      this.JOBLIST = data
      this.findJob = this.JOBLIST.map(e => e.ViName)
    })
    this.getMasterDatas({Form: 'GENETHN'}, (data) => {
      this.ETHNICLIST = data
      this.findETHNIC = this.ETHNICLIST.map(e => e.ViName)
    })
    this.checkBoder = this.$route.params.Check
    this.modalWidth = window.innerWidth < MODAL_WIDTH
      ? '90%'
      : MODAL_WIDTH
    // this.$modal.show('error-pid-modal')
  },
  watch: {
    customer: {
      handler (val) {
        this.edited = true
        this.VisitCode = val.VisitCode
      },
      deep: true
    }
  },
  methods: {
    objectWithoutKey (object, key) {
      const {[key]: deletedKey, ...otherKeys} = object
      return otherKeys
    },
    getData () {
      new CustomersED().find(this.EdId).then(response => {
        if (this.customerExceptChoose === false) {
          // this.customer = response
          if (this.hasSubmit === true) {
            this.customer = response
            this.exceptChoose = this.customer
            if (response.VisitCode) this.VisitCode = response.VisitCode
          } else {
            this.customer = response
            this.exceptChoose = this.customer
            if (response.VisitCode) this.VisitCode = response.VisitCode
          }
        } else {
          this.customer = response
          if (response.VisitCode) this.VisitCode = response.VisitCode
        }
        this.hasSubmit = false
        setTimeout(() => {
          this.edited = false
        }, 500)
      }).then(er => {
      })
    },
    submitCustomersED (data) {
    },
    submit () {
      this.customerExceptChoose = false
      this.hasSubmit = true
      this.$v.customer.$touch()
      if (this.$v.customer.$error) {
        return false
      }
      this.customer._Exception = []
      Object.keys(this.customer).forEach(key => {
        if (key !== '_Exception' && key !== 'ATSScale' && key !== 'Link' && key !== 'Id' && key !== 'IsChronic' && key !== 'EDId' && key !== 'RecordCode') {
          var value = this.customer[key]
          if (key === 'Gender') {
            if (value === 0) {
              value = 'Nữ'
            } else if (value === 1) {
              value = 'Nam'
            } else {
              value = 'Khác'
            }
          }
          this.customer._Exception.push({
            key: key,
            value: value
          })
        }
      })
      if (this.VisitCode) {
        Object.assign(this.customer, {VisitCode: this.VisitCode})
        this.customer._Exception.push({
          key: 'VisitCode',
          value: this.VisitCode
        })
      }
      new CustomersED().create(this.customer, 'ManualUpdate/' + this.EdId).then(response => {
        this.checkBoder = 0
        this.toastedSuccess()
        this.getData()
        EventBus.$emit('updateGlobalEd', 'thangdc in here')
      }).catch(e => {
        if (e.status === 400 && e.data.PID) {
          this.errorData = e.data
          this.$modal.show('error-pid-modal')
        }
      })
    },
    SyncEd () {
      new Customer({PID: this.customer.PID})
        .all()
        .then(response => {
          this.openTable()
          this.customers = response
        })
    },
    SyncVisitCode () {
      new CustomersED().find('SyncVisitCode/' + this.EdId).then(response => {
        this.$modal.show('visitcode-modal')
        var vsCode = this.customer.VisitCode ? this.customer.VisitCode.split(',') : []
        response.forEach(element => {
          element.selected = vsCode.includes(element.VisitCode)
        })
        this.visitcodes = response
        this.customer.BacSiAD = response.BacSiAD
      })
    },
    openTable () {
      this.$modal.show(this.EdId + '-modal')
    },
    updateEd (data) {
      this.customer = data
      // if (this.exceptChoose.length !== 0) {
      if (this.exceptChoose.Fork !== null && this.exceptChoose.Fork !== '') {
        this.customer.Fork = this.exceptChoose.Fork
      }
      if (this.exceptChoose.Job !== null && this.exceptChoose.Job !== '') {
        this.customer.Job = this.exceptChoose.Job
      }
      if (this.exceptChoose.HealthInsuranceNumber !== null && this.exceptChoose.HealthInsuranceNumber !== '') {
        this.customer.HealthInsuranceNumber = this.exceptChoose.HealthInsuranceNumber
      }
      if (this.exceptChoose.StartHealthInsuranceDate !== null && this.exceptChoose.StartHealthInsuranceDate !== '') {
        this.customer.StartHealthInsuranceDate = this.exceptChoose.StartHealthInsuranceDate
      }
      if (this.exceptChoose.ExpireHealthInsuranceDate !== null && this.exceptChoose.ExpireHealthInsuranceDate !== '') {
        this.customer.ExpireHealthInsuranceDate = this.exceptChoose.ExpireHealthInsuranceDate
      }
      // }
      this.customerExceptChoose = true
      this.$modal.hide(this.EdId + '-modal')
      this.submit()
    },
    updateVisitCode (data) {
      var vsCode = []
      this.visitcodes.forEach(item => {
        if (item.selected) {
          vsCode.push(item.VisitCode)
          this.customer.BacSiAD = item.BacSiAD
        }
      })
      this.customer.VisitCode = vsCode ? vsCode.join(',') : ''
      this.$modal.hide('visitcode-modal')
    },
    backButton () {
      if (this.edited) {
        this.$modal.show('dialog', {
          title: this.__t('Cảnh báo'),
          text: this.__t('Dữ liệu bạn đang làm có thể bị mất nếu chưa lưu'),
          class: 'v-dialog v-dialog-warning',
          buttons: [
            {
              title: this.__t('Đồng ý'),
              class: 'btn',
              handler: () => {
                this.$emit('closed')
                this.$modal.hide('MasterDataPopup')
                this.$modal.hide('dialog')
                this.edited = false
                this.back()
              }
            },
            {
              title: this.__t('Hủy bỏ'),
              class: 'btn bg-yellow',
              handler: () => {
                this.$modal.hide('dialog')
              }
            }
          ]
        })
      } else {
        this.back()
      }
    }
  }
}
</script>
<style scoped>
  .input-para {
    width: 150px;
  }
  .borderColor {
    border-color: red
  }
</style>
