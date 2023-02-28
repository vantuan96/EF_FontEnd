<template>
  <div class="main-content" id="add-customer-page">
    <h1 class="title-page text-center">{{__t('customer.thong_tin_benh_nhan')}}</h1>
    <div class="add-form-group">
      <div class="row">
        <div class="col-md-8 col-md-offset-2">
          <div class="box box-border effect1">
            <div class="row">
              <div class="col-md-6">
                <div class="form-group">
                  <label for="Fullname">PID:</label>
                  <input type="text" readonly class="form-control" v-model="customer.PID"/>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group" :class="{'disable': !customer.PID }">
                  <label for="DateOfBirth">Lượt tiếp nhận:</label>
                  <div class="input-group input-group-sm">
                    <input type="text" class="form-control" v-model="customer.VisitCode"/>
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
                  <label for="Fullname" required>{{__t('customer.ho_ten')}}</label>
                  <input type="text" class="form-control" v-model="customer.Fullname" :placeholder="__t('customer.ho_ten')">
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group" :class="{ 'form-group--error': $v.customer.DateOfBirth.$error }">
                  <label for="DateOfBirth">{{__t('customer.ngay_sinh')}}</label>
                  <masked-input mask="11/11/1111" v-model="customer.DateOfBirth" :placeholder="vDateFormat" class="form-control" />
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6">
                <div class="form-group" :class="{ 'form-group--error': $v.customer.Gender.$error }">
                  <label for="Gender" required>{{__t('customer.gioi_tinh')}}:</label>
                  <div class="gender-select flex-box">
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
                  <input type="text" class="form-control" v-model="customer.Nationality" :placeholder="__t('customer.quoc_tich')">
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6">
                <div class="form-group">
                  <label>{{__t('customer.nghe_nghiep')}}:</label>
                  <input type="text" class="form-control" v-model="customer.Job" :placeholder="__t('customer.nghe_nghiep')"/>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <label>{{__t('customer.noi_lam_viec')}}</label>
                  <input type="text" class="form-control" v-model="customer.WorkPlace" :placeholder="__t('customer.noi_lam_viec')"/>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6">
                <div class="form-group">
                  <label>{{__t('customer.so_dien_thoai')}}</label>
                  <input type="text" class="form-control" v-model="customer.Phone" :placeholder="__t('customer.so_dien_thoai')"/>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <label>{{__t('customer.dan_toc')}}:</label>
                  <input type="text" class="form-control" v-model="customer.Fork" :placeholder="__t('customer.dan_toc')"/>
                </div>
              </div>
              <div class="col-md-12">
                <div class="form-group">
                  <label>{{__t('customer.cho_o_hien_tai')}}</label>
                  <input type="text" class="form-control" v-model="customer.Address" :placeholder="__t('customer.cho_o_hien_tai')"/>
                </div>
              </div>
            </div>
            <hr />
            <div class="row">
              <div class="col-md-6">
                <div class="form-group">
                  <label>{{__t('Số CMTND/Hộ chiếu')}}</label>
                  <input type="text" class="form-control" v-model="customer.IdentificationCard" :placeholder="__t('Số CMTND/Hộ chiếu')">
                </div>
              </div>
              <div class="col-md-3">
                <div class="form-group">
                  <label>{{__t('Ngày cấp')}}</label>
                  <v-masked-input mask="11/11/1111" v-model="customer.IssueDate" :placeholder="vDateFormat" class="form-control" />
                </div>
              </div>
              <div class="col-md-3">
                <div class="form-group">
                  <label class="hidden-text">{{__t('Nơi cấp')}}</label>
                  <input type="text" class="form-control" v-model="customer.IssuePlace" :placeholder="__t('Nơi cấp')"/>
                </div>
              </div>
            </div>
            <hr />
            <div class="row">
              <div class="col-md-6">
                <div class="form-group">
                  <label>{{__t('customer.so_bao_hiem_y_te')}}</label>
                  <v-masked-input mask="aa 1 11 1111111111" v-model="customer.HealthInsuranceNumber" :placeholder="__t('customer.so_bao_hiem_y_te')" class="form-control" />
                  <p><small class="font-italic">Ví dụ: AB 2 22 2313134xxxx</small></p>
                </div>
              </div>
              <div class="col-md-3">
                <div class="form-group" :class="{ 'form-group--error': $v.customer.StartHealthInsuranceDate.$error }">
                  <label>{{__t('customer.thoi_han')}}</label>
                  <masked-input mask="11/11/1111" v-model="customer.StartHealthInsuranceDate" :placeholder="vDateFormat" class="form-control" />
                </div>
              </div>
              <div class="col-md-3">
                <div class="form-group" :class="{ 'form-group--error': $v.customer.ExpireHealthInsuranceDate.$error }">
                  <label class="hidden-text">Tới</label>
                  <masked-input mask="11/11/1111" v-model="customer.ExpireHealthInsuranceDate" :placeholder="vDateFormat" class="form-control" />
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-12">
                <div class="row">
                  <div class="col-md-6">
                    <div class="form-group">
                      <button class="btn pull-left btn-back v-white-btn" type="button" @click="back()">{{__t('btn.quay_lai')}}</button>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <button class="btn v-yellow-btn pull-right long-btn" type="button" @click="submit()">{{__t('btn.luu')}}</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <logs :EdId="this.$route.params.Id" :Type="'CustomerOPD/ManualUpdate'" />
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
          <p>{{__t('Lựa chọn các lượt khám cho bệnh nhân')}}</p>
          <table class="table table-striped table-bordered" id="customer-tbl">
            <thead>
              <tr>
                <td colspan="2"><b>Kết quả ({{visitcodes.length}})</b></td>
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
                </td>
                <!-- <td><div>Ngày vào viện: <b>{{visitcode.NgayVao}}</b></div></td> -->
                <!-- <td width="50" class="v-checkbox" align="center">
                  <button class="btn btn-block btn-warning" @click="updateVisitCode(visitcode.VisitCode)">Chọn</button>
                </td> -->
                <td width="50" class="v-checkbox" align="center">
                  <input type="checkbox" :id="'ETRIOE-' + index" :name="'ETRIOE-' + index" v-model="visitcode.selected">
                  <label :for="'ETRIOE-' + index"></label>
                </td>
              </tr>
              <tr>
                <td colspan="3">
                  <div class="row">
                    <div class="col-md-4">
                      <button class="btn btn-block" @click="$modal.hide('visitcode-modal')">Hủy</button>
                    </div>
                    <div class="col-md-8">
                      <button class="btn btn-block btn-warning" @click="updateVisitCode()">Chọn</button>
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
import CustomersIPD from '@/services/IPD/Customer'
import Logs from '@/components/Logs.vue'
import EventBus from '@/lib/eventBus'
import MixinForm from '@/mixins/form.js'
// import NProgress from 'nprogress'
const isDate = (value) => !helpers.req(value) || moment(value, process.env.DATE_FORMAT, true).isValid()
const MODAL_WIDTH = 750
export default {
  /**
   * The name of the page.
   */
  name: 'add-ipd',
  mixins: [MixinForm],
  data () {
    return {
      modalWidth: MODAL_WIDTH,
      customers: null,
      visitcodes: null,
      customer: {
        DateOfBirth: null,
        Address: null,
        Gender: null,
        Fullname: null,
        Nationality: null,
        IdentificationCard: null,
        IssueDate: null,
        IssuePlace: null
      },
      EdId: this.$route.params.Id
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
    this.modalWidth = window.innerWidth < MODAL_WIDTH
      ? '90%'
      : MODAL_WIDTH
  },
  methods: {
    getData () {
      new CustomersIPD().find(this.EdId).then(response => {
        this.customer = response
        // if (!this.customer.VisitCode) this.SyncVisitCode()
        if (this.$route.query.showSync) this.ShowSyncVisitCode()
      }).then(er => {
      })
    },
    submitCustomersIPD (data) {
    },
    submit () {
      this.$v.customer.$touch()
      if (this.$v.customer.$error) {
        return false
      }
      this.customer._Exception = []
      Object.keys(this.customer).forEach(key => {
        if (key !== 'AdmittedDate' && key !== 'IsTelehealth' && key !== '_Exception' && key !== 'ATSScale' && key !== 'Link' && key !== 'Id' && key !== 'IsChronic' && key !== 'OPDId' && key !== 'RecordCode') {
          var value = this.customer[key]
          if (key === 'Gender') {
            if (value === 0) {
              value = 'Nữ'
            } else if (value === 1) {
              value = 'Name'
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
      new CustomersIPD().create(this.customer, 'ManualUpdate/' + this.EdId).then(response => {
        this.toastedSuccess()
        this.$router.replace({'query': null})
        EventBus.$emit('updateGlobalOpd', 'thangdc in here')
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
    ShowSyncVisitCode () {
      new CustomersIPD().find('SyncVisitCode/' + this.EdId).then(response => {
        this.$modal.show('visitcode-modal')
        var vsCode = this.customer.VisitCode ? this.customer.VisitCode.split(',') : []
        response.forEach(element => {
          element.selected = vsCode.includes(element.VisitCode)
        })
        this.visitcodes = response
      })
    },
    SyncVisitCode () {
      new CustomersIPD().find('SyncVisitCode/' + this.EdId).then(response => {
        this.$modal.show('visitcode-modal')
        var vsCode = this.customer.VisitCode ? this.customer.VisitCode.split(',') : []
        response.forEach(element => {
          element.selected = vsCode.includes(element.VisitCode)
        })
        this.visitcodes = response
      })
    },
    openTable () {
      this.$modal.show(this.EdId + '-modal')
    },
    updateEd (data) {
      this.customer.Address = data.Address
      this.customer.DateOfBirth = data.DateOfBirth
      this.customer.Gender = data.Gender
      this.customer.Fullname = data.Fullname
      this.customer.Fork = data.Fork
      this.customer.Job = data.Job
      this.customer.Nationality = data.Nationality
      this.customer.PID = data.PID
      this.customer.Phone = data.Phone
      this.$modal.hide(this.EdId + '-modal')
    },
    // updateVisitCode (data) {
    //   var vsCode = []
    //   this.visitcodes.forEach(item => {
    //     if (item.selected) {
    //       vsCode.push(item.VisitCode)
    //     }
    //   })
    //   this.customer.VisitCode = vsCode ? vsCode.join(',') : ''
    //   this.$modal.hide('visitcode-modal')
    // },
    updateVisitCode () {
      var vsCode = []
      this.visitcodes.forEach(item => {
        if (item.selected && !vsCode.includes(item.VisitCode)) {
          vsCode.push(item.VisitCode)
        }
      })
      this.customer.VisitCode = vsCode ? vsCode.join(',') : ''
      this.$modal.hide('visitcode-modal')
    }
  }
}
</script>
