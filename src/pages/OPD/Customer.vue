<template>
  <div class="main-content" id="add-customer-page">
    <h1 class="title-page text-center">{{__t('customer.thong_tin_benh_nhan')}}</h1>
    <div class="add-form-group">
      <div class="row">
        <div class="col-md-10 col-md-offset-1">
          <div class="box box-border effect1">
            <div class="row">
              <div class="col-md-6">
                <div class="form-group">
                  <label for="Fullname">PID:</label>
                  <div class="input-group input-group-sm">
                    <input type="text" :class="checkBoder === 1 || checkBoder === 3 ? 'borderColor' : ''" class="form-control" readonly v-model="customer.PID"/>
                    <span class="input-group-btn">
                      <button type="button" class="btn btn-info btn-flat" :disabled="!customer.PID" @click="SyncEd()"><span class="glyphicon glyphicon-refresh green-color"></span></button>
                    </span>
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group" :class="{'disable': !customer.PID }">
                  <label for="DateOfBirth">{{__t('Lượt tiếp nhận')}}:</label>
                  <div class="input-group input-group-sm">
                    <input :class="checkBoder === 2 || checkBoder === 3 ? 'borderColor' : ''" type="text" class="form-control" v-model="customer.VisitCode"/>
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
                  <!-- <input type="text" class="form-control" v-model="customer.Fullname" :placeholder="__t('customer.ho_ten')"> -->
                  <FakeInput style="margin: 0 !important" type="text" class="form-control" v-model="customer.Fullname" :placeholder="__t('customer.ho_ten')" />
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group" :class="{ 'form-group--error': $v.customer.DateOfBirth.$error }">
                  <label for="DateOfBirth">{{__t('customer.ngay_sinh')}}</label>
                  <!-- <masked-input mask="11/11/1111" v-model="customer.DateOfBirth" :placeholder="vDateFormat" class="form-control" /> -->
                  <FakeInput style="margin: 0 !important" v-model="customer.DateOfBirth" :placeholder="vDateFormat" class="form-control" />
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
                  <!-- <FakeInput style="margin: 0 !important" type="text" class="form-control" v-model="customer.Job" :placeholder="__t('customer.nghe_nghiep')" /> -->
                  <div class="input-group" style="flex-grow: 1">
                    <FakeInput style="margin: 0 !important" type="text" class="form-control" v-model="customer.MOHJob" :placeholder="__t('customer.nghe_nghiep')" />
                    <span class="input-group-addon" style="background-color: #eee">{{customer.MOHJobCode}}</span>
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <label>{{__t('customer.noi_lam_viec')}}</label>
                  <!-- <input type="text" class="form-control" v-model="customer.WorkPlace" :placeholder="__t('customer.noi_lam_viec')"/> -->
                  <FakeInput style="margin: 0 !important" type="text" class="form-control" v-model="customer.WorkPlace" :placeholder="__t('customer.noi_lam_viec')" />
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6">
                <div class="form-group">
                  <label>{{__t('customer.so_dien_thoai')}}</label>
                  <!-- <input type="text" class="form-control" v-model="customer.Phone" :placeholder="__t('customer.so_dien_thoai')"/> -->
                  <FakeInput style="margin: 0 !important" type="text" class="form-control" v-model="customer.Phone" :placeholder="__t('customer.so_dien_thoai')" />
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <label>{{__t('customer.dan_toc')}}:</label>
                  <!-- <FakeInput style="margin: 0 !important" type="text" class="form-control" v-model="customer.Fork" :placeholder="__t('customer.dan_toc')" /> -->
                  <div class="input-group" style="flex-grow: 1">
                    <FakeInput style="margin: 0 !important" type="text" class="form-control" v-model="customer.MOHEthnic" :placeholder="__t('customer.dan_toc')" />
                    <span class="input-group-addon" style="background-color: #eee">{{customer.MOHEthnicCode}}</span>
                  </div>
                </div>
              </div>
              <!-- <div class="col-md-12">
                <div class="form-group">
                  <label>{{__t('customer.cho_o_hien_tai')}}</label>
                  <FakeInput style="margin: 0 !important" type="text" class="form-control" v-model="customer.Address" :placeholder="__t('customer.cho_o_hien_tai')" />
                </div>
              </div> -->
            </div>
            <!-- Bổ sung Thông tin hành chính cho người bệnh -->
            <div class="row">
              <div class="col-md-12">
                <div class="form-group">
                  <label>{{__t('customer.dia_chi')}}</label>
                  <FakeInput style="margin: 0 !important" type="text" class="form-control" v-model="customer.MOHAddress" :placeholder="__t('customer.dia_chi')" />
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <label>{{__t('customer.huyen_quan_thixa')}}</label>
                  <div class="input-group" style="flex-grow: 1">
                    <FakeInput style="margin: 0 !important" type="text" class="form-control" v-model="customer.MOHDistrict" :placeholder="__t('customer.huyen_quan_thixa')" />
                    <span class="input-group-addon" style="background-color: #eee">{{customer.MOHDistrictCode}}</span>
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <label>{{__t('customer.tinh_tp')}}</label>
                  <div class="input-group" style="flex-grow: 1">
                    <FakeInput style="margin: 0 !important" type="text" class="form-control" v-model="customer.MOHProvince" :placeholder="__t('customer.tinh_tp')" />
                    <span class="input-group-addon" style="background-color: #eee">{{customer.MOHProvinceCode}}</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6">
                <label>{{__t2('customer.hoten_diachi_baotin')}}:</label>
                <FakeInput style="margin: 0 0 15px 0 !important" type="text" class="form-control" v-model="customer.Relationship" :placeholder="__t('customer.hoten_diachi_baotin')" />
              </div>
              <div class="col-md-6">
                <label>{{__t2('customer.dien_thoai')}}:</label>
                <FakeInput style="margin: 0 0 15px 0 !important" type="text" class="form-control" v-model="customer.RelationshipContact" :placeholder="__t('customer.dien_thoai')" />
              </div>
            </div>
            <div class="row">
              <div class="col-md-6">
                <div class="form-group">
                  <label>{{__t('customer.ngoai_kieu')}}</label>
                  <div class="input-group" style="flex-grow: 1">
                    <v-select @search:clear="customer.MOHNationalityCode = ''" :placeholder="__t('Chọn')" @search:focus="getNationalityList" v-model="customer.MOHNationality" :options="nationalityList" />
                    <span class="input-group-addon" style="background-color: #eee">{{customer.MOHNationalityCode}}</span>
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <div style="margin-bottom: 10px;">
                    <label>{{__t('customer.doi_tuong')}}</label>
                    <div class="for2m-group" style="flex-grow: 1">
                      <radio-list v-model="customer.MOHObject" :options="MOHOBJECT" />
                    </div>
                  </div>
                  <textarea-autosize v-if="customer.MOHObject === '4'" rows="2" v-model="customer.MOHObjectOther" class="form-control" :placeholder="__t('Nhập')" />
                </div>
              </div>
            </div>
            <!-- End bổ sung Thông tin hành chính cho người bệnh -->
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
                  <FakeInput style="margin: 0 !important" v-model="customer.IssueDate" :placeholder="vDateFormat" class="form-control" />
                </div>
              </div>
              <div class="col-md-3">
                <div class="form-group">
                  <label class="hidden-text">{{__t('Nơi cấp')}}</label>
                  <!-- <input type="text" class="form-control" v-model="customer.IssuePlace" :placeholder="__t('Nơi cấp')"/> -->
                  <FakeInput style="margin: 0 !important" type="text" class="form-control" v-model="customer.IssuePlace" :placeholder="__t('Nơi cấp')" />
                </div>
              </div>
            </div>
            <hr />
            <!-- Chỉnh sửa thông tin hành chính -->
            <div class="row">
              <div class="col-md-6">
                <div class="form-group">
                  <label>{{__t('customer.so_the_BHYT')}}</label>
                  <input v-model="customer.HealthInsuranceNumber" :placeholder="__t('customer.so_the_BHYT')" class="form-control" />
                  <p><small class="font-italic">{{__t('Ví dụ')}}: AB 2 22 231313xxxx</small></p>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group" :class="{ 'form-group--error': $v.customer.ExpireHealthInsuranceDate.$error }">
                  <label>{{__t('customer.BHYT_gia_tri_den')}}</label>
                  <masked-input mask="11/11/1111" v-model="customer.ExpireHealthInsuranceDate" :placeholder="vDateFormat" class="form-control" />
                </div>
              </div>
            </div>
            <!-- End chỉnh sửa thông tin hành chính -->
            <!-- <div class="row">
              <div class="col-md-6">
                <div class="form-group">
                  <label>{{__t('customer.so_bao_hiem_y_te')}}</label>
                  <input v-model="customer.HealthInsuranceNumber" :placeholder="__t('customer.so_bao_hiem_y_te')" class="form-control" />
                  <p><small class="font-italic">{{__t('Ví dụ')}}: AB 2 22 231313xxxx</small></p>
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
                  <label class="hidden-text">{{__t('Tới')}}</label>
                  <masked-input mask="11/11/1111" v-model="customer.ExpireHealthInsuranceDate" :placeholder="vDateFormat" class="form-control" />
                </div>
              </div>
            </div> -->
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
                      <button class="btn v-yellow-btn pull-right long-btn" type="button" v-shortkey="['ctrl', 's']" @shortkey="submit()" @click="submit()">{{__t('btn.luu')}}</button>
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
                  <button type="button" class="btn" @click="updateEd(customer)">{{__t('Chọn')}}</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <template v-else-if="customers && customers.length === 0">
          <div class="callout callout-warning">
            <h4>{{__t('Không tìm thấy mã lượt khám của bệnh nhân!')}}</h4>
            <p>{{__t('Vui lòng kiểm tra lại thông tin trên eHos/OH')}}.</p>
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
                <td colspan="2"><b>{{__t('Kết quả')}} ({{visitcodes.length}})</b></td>
                <td>{{__t('Chọn')}}</td>
              </tr>
            </thead>
            <tbody>
              <tr :data="visitcode" :key="index" v-for="(visitcode, index) in visitcodes">
                <!-- <td width="120px">
                  {{visitcode.VisitCode}}
                  <p>{{visitcode.VisitTypeName}}</p>
                </td> -->
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
                      <button class="btn btn-block" @click="$modal.hide('visitcode-modal')">{{__t('Hủy')}}</button>
                    </div>
                    <div class="col-md-8">
                      <button class="btn btn-block btn-warning" @click="updateVisitCode()">{{__t('Chọn')}}</button>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <template v-else-if="visitcodes && visitcodes.length === 0">
          <div class="callout callout-warning">
            <h4>{{__t('Không tìm thấy mã lượt khám của bệnh nhân!')}}</h4>
            <p>{{__t('Vui lòng kiểm tra lại thông tin trên eHos/OH')}}.</p>
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
import CustomersOPD from '@/services/OPD/CustomersOPD'
import Logs from '@/components/Logs.vue'
import EventBus from '@/lib/eventBus'
import MixinForm from '@/mixins/form.js'
import MixinMasterData from '@/mixins/masterdata.js'
import constants from '@/constants.js'
// import NProgress from 'nprogress'
const isDate = (value) => !helpers.req(value) || moment(value, process.env.DATE_FORMAT, true).isValid()
const MODAL_WIDTH = 750
export default {
  /**
   * The name of the page.
   */
  name: 'add-ed',
  mixins: [MixinMasterData, MixinForm],
  data () {
    return {
      GENDERLIST: constants.GENDERLIST,
      MOHOBJECT: constants.MOHOBJECT,
      NATIONALITYLIST: null,
      hasSubmit: false,
      ETHNICLIST: null,
      findETHNIC: null,
      JOBLIST: null,
      findJob: null,
      checkBoder: 0,
      modalWidth: MODAL_WIDTH,
      customers: null,
      visitcodes: null,
      customerExceptChoose: false,
      exceptChoose: {},
      VisitCode: null,
      customer: {
        DateOfBirth: null,
        Address: null,
        Gender: null,
        Fullname: null,
        Nationality: null,
        IdentificationCard: null,
        IssueDate: null,
        IssuePlace: null,
        ForkChoose: null,
        JobChoose: null
      },
      EdId: this.$route.params.Id,
      oldMOHNationality: ''
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
  },
  watch: {
    'customer.MOHNationality': function (val) {
      this.setNationalityCode()
    },
    customer: {
      handler (val) {
        if (!this.customer.MOHObject) {
          if (this.customer.HealthInsuranceNumber) {
            this.customer.MOHObject = '1'
          }
        }
        this.edited = true
        this.VisitCode = val.VisitCode
      },
      deep: true
    }
  },
  computed: {
    nationalityList () {
      var nationalitys = []
      var mdnationality = []
      if (this.customer.MOHNationality) nationalitys = [this.customer.MOHNationality]
      if (this.NATIONALITYLIST) mdnationality = this.NATIONALITYLIST.map(e => e.ViName)
      return [...new Set(nationalitys.concat(mdnationality))]
    }
  },
  methods: {
    setNationalityCode (e) {
      this.customer.MOHNationalityCode = this.NATIONALITYLIST ? (this.NATIONALITYLIST.find(e => e.ViName === this.customer.MOHNationality) || {}).Note : this.customer.MOHNationalityCode
    },
    getNationalityList () {
      if (this.NATIONALITYLIST) return
      this.getRawMasterDatas({Form: 'GENNATI'}, (data) => {
        this.NATIONALITYLIST = data
      })
    },
    getData () {
      new CustomersOPD().find(this.EdId).then(response => {
        if (this.customerExceptChoose === false) {
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
        if (this.$route.query.showSync) this.ShowSyncVisitCode()
        setTimeout(() => {
          this.edited = false
        }, 500)
      }).then(er => {
      })
    },
    submitCustomersOPD (data) {
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
      if (this.VisitCode) {
        Object.assign(this.customer, {VisitCode: this.VisitCode})
        this.customer._Exception.push({
          key: 'VisitCode',
          value: this.VisitCode
        })
      }
      new CustomersOPD().create(this.customer, 'ManualUpdate/' + this.EdId).then(response => {
        console.log(response, 'check response')
        this.checkBoder = 0
        this.toastedSuccess()
        this.getData()
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
      new CustomersOPD().find('SyncVisitCode/' + this.EdId).then(response => {
        this.$modal.show('visitcode-modal')
        var vsCode = this.customer.VisitCode ? this.customer.VisitCode.split(',') : []
        response.forEach(element => {
          element.selected = vsCode.includes(element.VisitCode)
        })
        this.visitcodes = response
      })
    },
    SyncVisitCode () {
      new CustomersOPD().find('SyncVisitCode/' + this.EdId).then(response => {
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
      if (this.exceptChoose.MOHNationality !== null && this.exceptChoose.MOHNationality !== '') {
        this.customer.MOHNationality = this.exceptChoose.MOHNationality
      }
      if (this.exceptChoose.MOHObject !== null && this.exceptChoose.MOHObject !== '') {
        this.customer.MOHObject = this.exceptChoose.MOHObject
      }
      if (this.exceptChoose.MOHObjectOther !== null && this.exceptChoose.MOHObjectOther !== '') {
        this.customer.MOHObjectOther = this.exceptChoose.MOHObjectOther
      }
      if (this.exceptChoose.MOHAddress !== null && this.exceptChoose.MOHAddress !== '') {
        this.customer.MOHAddress = this.exceptChoose.MOHAddress
      }
      if (this.exceptChoose.MOHDistrict !== null && this.exceptChoose.MOHDistrict !== '') {
        this.customer.MOHDistrict = this.exceptChoose.MOHDistrict
      }
      if (this.exceptChoose.MOHProvince !== null && this.exceptChoose.MOHProvince !== '') {
        this.customer.MOHProvince = this.exceptChoose.MOHProvince
      }
      this.setNationalityCode()
      // }
      this.customerExceptChoose = true
      this.$modal.hide(this.EdId + '-modal')
      this.submit()
    },
    updateVisitCode () {
      var vsCode = []
      this.visitcodes.forEach(item => {
        if (item.selected && !vsCode.includes(item.VisitCode)) {
          vsCode.push(item.VisitCode)
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
  .borderColor {
    border-color: red
  }
</style>
