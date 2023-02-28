<template>
  <div class="main-content" id="MedicationAdministrationRecord-Result-page">
    <div style="margin-top: 20px;">
      <b style="color: rgb(51, 122, 183); font-size: 20px;">{{__t("Y lệnh nội trú")}}</b>
    </div>
    <div class="row">
      <div class="col-md-12 col-sm-12">
        <div class="search-group" v-if="Customer">
          <div class="row">
            <div
              class="col-md-12"
              style="text-transform: uppercase; color: #337AB7; font-weight: bold; font-size: 16px;"
            >
              {{ Customer.Fullname || "" }}
            </div>
          </div>
          <div class="row">
            <div class="col-md-6"><label>PID: </label> {{ Customer.PID }}</div>
            <div class="col-md-6">
              <label>{{ __t("Dân tộc") }}: </label> {{ Customer.Fork }}
            </div>
          </div>
          <div class="row">
            <div class="col-md-6">
              <label>{{ __t("Ngày sinh") }}: </label> {{ Customer.DateOfBirth }}
            </div>
            <div class="col-md-6">
              <label>{{ __t("Nghề nghiệp") }}: </label> {{ Customer.Job }}
            </div>
          </div>
          <div class="row">
            <div class="col-md-6">
              <label>{{ __t("Giới tính") }}: </label>
              {{ __t(GENDER[Customer.Gender]) }}
            </div>
            <div class="col-md-6">
              <label>{{ __t("Số điện thoại") }}: </label> {{ Customer.Phone }}
            </div>
          </div>
          <div class="row">
            <div class="col-md-6">
              <label>{{ __t("Quốc tịch") }}: </label> {{ Customer.Nationality }}
            </div>
            <div class="col-md-6">
              <label>{{ __t("Địa chỉ") }}: </label> {{ Customer.Address }}
            </div>
          </div>
        </div>
        <div v-if="listGroupByVisitCodes.length > 1">
          <table class="table table-striped table-bordered v-table">
            <thead>
              <tr style="text-align: center;">
                <td><b>{{__t("Khoa/Phòng")}}</b></td>
                <td><b>{{__t("Ngày tiếp nhận")}}</b></td>
                <td><b>{{__t("Số tiếp nhận")}}</b></td>
                <td><b>{{__t("Bác sĩ chính")}}</b></td>
                <td><b>{{__t("Xem chi tiết")}}</b></td>
              </tr>
            </thead>
            <tbody>
              <tr style="text-align: center;" :data="item" :key="index" v-for="(item, index) in listGroupByVisitCodes">
                <td>{{item.PatientArea}}</td>
                <td>{{item.VisitCreatedDate | formatDate}}</td>
                <td>{{item.VisitCode}}</td>
                <td>
                  <ad-Info v-if="item.PrimaryDoctorAD" :ad="item.PrimaryDoctorAD" />
                </td>
                <td width="40">
                  <button
                  class="btn btn-flat v-yellow-btn"
                  @click="fiterPrescriptionByVisitCode(item.VisitCode)"
                >
                  {{ __t("Xem y lệnh") }}
                </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div v-if="MommyAndBabyProfiles.length > 1">
          <table class="table table-striped table-bordered v-table" id="customer-tbl">
            <tbody>
              <template v-if="MommyAndBabyProfiles.length > 0">
                <tr class="custom-table-head" style="background-color: #337AB7 !important;">
                  <td><b>{{__t('STT')}}</b></td>
                  <td><b>{{__t('Thông tin')}}</b></td>
                  <td><b>{{__t('BS chính')}}</b></td>
                  <td><b>{{__t('ĐD tiếp nhận')}}</b></td>
                  <td><b>{{__t('Khoa123')}}</b></td>
                  <td><b>{{__t('Tiếp nhận')}}</b></td>
                  <td><b>{{__t('Trạng thái')}}</b></td>
                  <td><b>{{__t('Chọn')}}</b></td>
                </tr>
                <tr :data="item" :key="(index + 1)" v-for="(item ,index) in MommyAndBabyProfiles">
                  <td width="40" align="center">{{(index + 1)}}</td>
                  <td>
                    <div>
                      <p><b>PID: {{item.PID}} ({{item.VisitCode}})</b> - <b style="color: #3c8dbc">{{item.Fullname}}</b> <span class="label label-success" v-if="item.IsMommy">{{__t("Mẹ")}}</span></p>
                      <p>{{item.DOB | formatDateTime}} - {{item.PhoneNumber}}</p>
                    </div>
                  </td>
                  <td>
                    <ad-Info :ad="item.PrimaryDoctor" />
                  </td>
                  <td>
                    <ad-Info :ad="item.Receiver" />
                  </td>
                  <td>{{item.Department}}</td>
                  <td>{{ item.ExaminationTime | formatDateTime}}</td>
                  <td>{{item.Status}}</td>
                  <td>
                    <button class="btn v-yellow-btn" type="button" @click="selectMommyProfile(item.IsMommy, item.Id, item.VisitCode, item.Department, item.RecordCode)">{{__t("Chọn")}}</button>
                  </td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>
        <div v-if="isLoaded" >
          <div
            id="dateMedication"
            class="box box-item"
            style="display: flex; justify-content: flex-start; align-items: center; box-shadow: none; border-bottom: 1px solid black; padding-bottom: 10px;"
          >
            <div style="width: 100%; display: flex; align-items: center; justify-content: space-evenly;">
              <div class="box-item">
                <b style="font-size: 12pt;">{{ __t("Ngày y lệnh") }}: </b>
              </div>
              <div class="box-item">
                <v-date-picker
                  v-model="parameters.FromDate"
                  :hideTooltip="true"
                  :allday="'allday'"
                  :format="'DD/MM/YYYY'"
                  @input="getMedicationAdministrationRecord()"
                />
              </div>
              <div class="box-item">
                <b style="font-size: 12pt;">{{ __t("Mã y lệnh") }}: </b>
              </div>
              <div class="box-item">
                <v-autosuggest
                  v-model="prescriptionCode"
                  :options="PrescriptionCodes"
                  :isNeedDefault="false"
                />
              </div>
              <div class="box-item">
                <button
                  class="btn btn-flat v-yellow-btn"
                  @click="filterPrescription(prescriptionCode)"
                >
                  {{ __t("Lọc") }}
                </button>
              </div>
              <div class="box-item">
                <b style="font-size: 12pt;">{{ __t("Thứ tự sắp xếp") }}: </b>
              </div>
              <div class="box-item" style="width: 300px;">
                <v-select :options="OrderType" :multi="false" v-model="selectedOrderType" @change="orderPrescription()"/>
              </div>
            </div>
          </div>
          <div class="box-item" style="width: 100%; text-align: end;" v-if="listThucPhamChucNang.length > 0 || listPrescriptions.length > 0">
            <div v-if="MedicationAdministrationRecordInfo.VisitCodeViMessage !== ''">
              <i style="color: red">{{__t(MedicationAdministrationRecordInfo.VisitCodeMessage)}}</i>
            </div>
            <div v-if="MedicationAdministrationRecordInfo.HeightViMessage !== ''">
              <i style="color: red">{{__t(MedicationAdministrationRecordInfo.HeightMessage)}}</i>
            </div>
            <div v-if="MedicationAdministrationRecordInfo.WeightViMessage !== ''">
              <i style="color: red">{{__t(MedicationAdministrationRecordInfo.WeightMessage)}}</i>
            </div>
            <div v-if="MedicationAdministrationRecordInfo.DiagnosisViMessage !== ''" >
              <i style="color: red">{{__t(MedicationAdministrationRecordInfo.DiagnosisMessage)}}</i>
            </div>
          </div>
          <div v-else class="box-item" style="width: 100%; text-align: end;" v-show="IPDPrescriptions.length > 0">
            <i style="color: red">{{__t("Vui lòng chọn Phân loại y lệnh")}}</i>
          </div>
          <div v-if="IPDPrescriptions.length > 0 || listThucPhamChucNang.length > 0" style="margin-top: 30px;">
            <div class="box box-item" style="display: flex; justify-content: space-between; box-shadow: none;" >
              <div class="box-item" style="font-size: 12pt;" v-if="listPrescriptions.length > 0">
                <b>{{ __t("Ngày tiếp nhận") }}: </b>{{listPrescriptions[0].VisitCreatedDate | formatDateWithoutSecon}}
              </div>
              <div class="box-item" style="font-size: 12pt;" v-else-if="listThucPhamChucNang.length > 0">
                <b>{{ __t("Ngày tiếp nhận") }}: </b>{{listThucPhamChucNang[0].VisitCreatedDate | formatDateWithoutSecon}}
              </div>
              <!-- <div class="box-item" style="font-size: 12pt;" v-if="listPrescriptions.length > 0">
                <b>{{ __t("Số tiếp nhận") }}: </b>{{ listPrescriptions[0].VisitCode }}
              </div>
              <div class="box-item" style="font-size: 12pt;" v-else-if="listThucPhamChucNang.length > 0">
                <b>{{ __t("Số tiếp nhận") }}: </b>{{ listThucPhamChucNang[0].VisitCode }}
              </div> -->
              <div class="box-item" style="font-size: 12pt;">
                <b>{{ __t("Số tiếp nhận") }}: </b>{{ VisitCode }}
              </div>
              <div class="box-item" style="font-size: 12pt;" v-if="(listPrescriptions.length > 0 && listPrescriptions[0].PrimaryDoctorAD) || (listThucPhamChucNang.length > 0 && listThucPhamChucNang[0].PrimaryDoctorAD)">
                <b>{{ __t("BS chính") }}: </b>
                <span>
                  <ad-Info v-if="listPrescriptions.length > 0 && listPrescriptions[0].PrimaryDoctorAD" :ad="listPrescriptions[0].PrimaryDoctorAD" />
                  <ad-Info v-else-if="listThucPhamChucNang.length > 0 && listThucPhamChucNang[0].PrimaryDoctorAD" :ad="listThucPhamChucNang[0].PrimaryDoctorAD" />
                </span>
                <!-- {{ listPrescriptions[0].PrimaryDoctorAD }} -->
              </div>
              <div class="box-item" style="font-size: 12pt;" v-if="listPrescriptions.length > 0">
                <b>{{ __t("Khu nội trú") }}: </b>{{ listPrescriptions[0].PatientArea }}
              </div>
              <div class="box-item" style="font-size: 12pt;" v-else-if="listThucPhamChucNang.length > 0">
                <b>{{ __t("Khu nội trú") }}: </b>{{ listThucPhamChucNang[0].PatientArea }}
              </div>
            </div>
            <div class="box box-item" v-if="DietarySupplement.length > 0">
              <b class="pr-10 no-wrap" style="font-size: 12pt;">{{__t('Phân loại y lệnh')}}: </b>
              <span style="font-size: 12pt;"><input  type="checkbox" name="checkAll" v-model="checkAll"  @click="checkAllEvent()">{{__t('Tất cả')}}</span>
              <span class="pl-5" style="font-size: 12pt;">
                <input type="checkbox" name="checkedType" v-model="checkNomalPrescription" @click="checkNomalPrescriptionEvent()"> {{__t("Y lệnh nội trú")}}
              </span>
              <span class="pl-5" style="font-size: 12pt;" v-if="DietarySupplement.length > 0 && listThucPhamChucNang.length > 0">
                <input type="checkbox" name="checkedType" v-model="checkDietarySupplement" @click="checkDietarySupplementEvent()"> {{__t("Phiếu tư vấn")}}
              </span>
            </div>
            <div id="printMe" v-if="!loading">
              <div id="ylenh" style="margin-top: 20px" v-if="listPrescriptions.length > 0">
                <ViewToPrint
                  :IPDPrescriptions="listPrescriptions"
                  :MedicationAdministrationRecordInfo="MedicationAdministrationRecordInfo"
                  :FromDate="parameters.FromDate"
                  :ToDate="parameters.ToDate"
                  :Customer="Customer"
                  :ListGroupByVisitCode="listGroupByVisitCodes"
                  :Title="'Y LỆNH NỘI TRÚ/ MEDICATION ADMINISTRATION RECORD'"
                  :MedicationText="'Chỉ định thuốc/ Medication:'"
                  :VisitCode="listPrescriptions[0].VisitCode"
                  :PrescriptionCode="prescriptionCode"
                  :ListMedicationAdministrationRecords="ListMedicationAdministrationRecords"
                  ref="getViewToPrint"
                  :BabyVitalSigns="BabyVitalSigns"
                  :IsMommy="IsMommy"
                  :SelectedDoctorFullname="selectedDoctorFullName"
                />
              </div>
              <div style="margin-top: -190px" id="chanKyYLenh" v-if="listPrescriptions.length > 0">
                <div style="text-align: right; padding-top: 30px !important; margin-right: 20px;"><b>Bác sĩ ký và ghi tên</b></div>
                <p style="text-align: right;"><i>Doctor (Full name and Signature)</i></p>
                <br><br><br><br><br>
                <p v-if="selectedDoctorFullName !== ''" style="text-align: right; margin-right: 20px;">{{selectedDoctorFullName}}</p>
                <br><br>
              </div>
              <div id="phieutuvan" v-if="listThucPhamChucNang.length > 0" >
                <ViewToPrint
                  :IPDPrescriptions="listThucPhamChucNang"
                  :MedicationAdministrationRecordInfo="MedicationAdministrationRecordInfo"
                  :FromDate="parameters.FromDate"
                  :ToDate="parameters.ToDate"
                  :Customer="Customer"
                  :ListGroupByVisitCode="listGroupByVisitCodes"
                  :Title="'PHIẾU TƯ VẤN/ COUNSELLING'"
                  :MedicationText="'Có thể dùng phối hợp thêm/ Can use in combination with:'"
                  :VisitCode="listThucPhamChucNang[0].VisitCode"
                  :PrescriptionCode="prescriptionCode"
                  :ListMedicationAdministrationRecords="ListMedicationAdministrationRecords"
                  :BabyVitalSigns="BabyVitalSigns"
                  :IsMommy="IsMommy"
                  :SelectedDoctorFullname="selectedDoctorFullName"
                />
              </div>
              <div style="margin-top: -190px" id="chanKyPhieuTuVan" v-if="listThucPhamChucNang.length > 0">
                <div style="text-align: right; padding-top: 30px !important; margin-right: 20px;"><b>Bác sĩ ký và ghi tên</b></div>
                <p style="text-align: right;"><i>Doctor (Full name and Signature)</i></p>
                <br><br><br><br><br>
                <p v-if="selectedDoctorFullName !== ''" style="text-align: right; margin-right: 20px;">{{selectedDoctorFullName}}</p>
                <br><br>
              </div>
            </div>
            <br>
            <br>
            <FloatBlock>
              <template slot="buttons">
                <div class="col-md-6 col-sm-6">
                  <div class="form-group"></div>
                </div>
                <div class="col-md-6 col-sm-6">
                  <div class="form-group">
                    <button
                      class="btn v-yellow-btn pull-right long-btn hvr-ripple-out btn-block"
                      v-shortkey="['ctrl', 'p']"
                      @shortkey="print()"
                      type="button"
                      @click="print()"
                    >
                      <i class="fa fa fa-print" aria-hidden="true"></i>
                      {{ __t("In") }}
                    </button>
                  </div>
                </div>
              </template>
            </FloatBlock>
          </div>
          <div class="text-center" v-else>
            <b>{{ __t("Không có dữ liệu") }}</b>
          </div>
        </div>
        <div v-else class="text-center">
          <v-loading />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
/* ============
 * Add cusotmer Page
 * ============
 *
 * The home index page.
 */
import MedicationAdministrationRecord from '@/services/MedicationAdministrationRecord'
import CustomerApi from '@/services/CustomerApi'
import moment from 'moment'
import constants from '@/constants'
import ViewToPrint from './Print.vue'
import VAutosuggest from '../../components/global/VAutosuggest.vue'
import _ from 'lodash'
import InitialAssessment from '@/services/IPD/InitialAssessment'
import Account from '@/services/Account'

export default {
  /**
   * The name of the page.
   */
  name: 'MedicationAdministrationRecord-Result',
  data () {
    return {
      loading: true,
      isLoaded: false,
      Customer: null,
      IPDPrescriptions: [],
      loaded: false,
      parameters: {
        FromDate: null,
        ToDate: null,
        PID: '',
        VisitType: '',
        VisitCode: '',
        pageNumber: 1,
        PageSize: 99999
      },
      GENDER: constants.GENDER,
      MedicationAdministrationRecordInfo: {},
      PrescriptionCodes: [],
      prescriptionCode: null,
      listPrescriptions: [],
      listGroupByVisitCodes: [],
      isShow: true,
      listThucPhamChucNang: [],
      DietarySupplement: [],
      checkAll: true,
      checkNomalPrescription: true,
      checkDietarySupplement: true,
      ListMedicationAdministrationRecords: {},
      OrderType: [{value: 1, label: 'Sắp xếp theo thứ tự ra đơn', EnLabel: 'Orders by request'}, {value: 2, label: 'Sắp xếp theo thứ tự đường dùng', EnLabel: 'Order by routes'}],
      selectedOrderType: {
        value: 2,
        label: 'Sắp xếp theo thứ tự đường dùng'
      },
      MommyAndBabyProfiles: [],
      BabyVitalSigns: {
        Height: '',
        Weight: '',
        VisitCode: null,
        DiagnosisInfo: '',
        Allergy: ''
      },
      IsMommy: false,
      visitType: '',
      maHoSo: ' ',
      selectedDoctorFullName: '',
      selectedDoctorUserName: '',
      VisitCode: ''
    }
  },
  /**
   * The components that the page can use.
   */
  components: {
    ViewToPrint,
    VAutosuggest
  },
  mounted () {
    this.parameters = { ...this.$route.query, PID: this.$route.params.PID }
    if (this.$route.params.RecordCode) {
      this.parameters = {...this.parameters, RecordCode: this.$route.params.RecordCode}
    }
    if (this.parameters.FromDate === undefined) {
      this.parameters.FromDate = moment().format('DD/MM/YYYY')
      this.parameters.ToDate = moment()
        .add(1, 'days')
        .format('DD/MM/YYYY')
    }
    this.getData()
    this.selectedOrderType = this.OrderType[1]
  },
  computed: {},
  methods: {
    async getData () {
      await this.getCustomer()
      this.getMedicationAdministrationRecord()
    },
    async getCustomer () {
      await new CustomerApi()
        .find(this.parameters.PID)
        .then(response => {
          this.Customer = response
        })
        .catch(e => {
          this.loaded = true
        })
    },
    async getMedicationAdministrationRecord (visitCode) {
      this.isLoaded = false
      this.parameters.ToDate = moment(this.parameters.FromDate, 'DD/MM/YYYY')
        .add(1, 'days')
        .format('DD/MM/YYYY')
      var q = this.updateQuery()
      if (!q.VisitType) q.VisitType = ' '
      if (!q.VisitCode) q.VisitCode = ' '
      if (this.parameters.RecordCode) {
        q.RecordCode = this.parameters.RecordCode
      }
      await new MedicationAdministrationRecord(q)
        .find(this.parameters.PID)
        .then(response => {
          this.IPDPrescriptions = response.IPDPrescriptions
          this.listPrescriptions = this.IPDPrescriptions
          this.DietarySupplement = response.ThucPhamChucNang
          this.listThucPhamChucNang = response.ThucPhamChucNang
          this.PrescriptionCodes = response.PrescriptionCodes
          this.listGroupByVisitCodes = response.ListGroupByVisitCode

          if (this.listGroupByVisitCodes.length === 1) {
            if (this.listPrescriptions.length > 0) {
              this.parameters.VisitCode = this.listPrescriptions[0].VisitCode
            } else if (this.listThucPhamChucNang.length > 0) {
              this.parameters.VisitCode = this.listThucPhamChucNang[0].VisitCode
            }
          } else if (this.listGroupByVisitCodes.length > 1) {
            this.parameters.VisitCode = this.listGroupByVisitCodes[0].VisitCode
          }

          this.MedicationAdministrationRecordInfo = response.MedicationAdministrationRecordInfo

          this.MedicationAdministrationRecordInfo.IsDependentProfile = this.IsDependentProfile

          if (visitCode === undefined) {
            this.listPrescriptions = this.IPDPrescriptions.filter(
              item => item.VisitCode === this.parameters.VisitCode
            )
            this.VisitCode = this.parameters.VisitCode
          } else {
            this.listPrescriptions = this.IPDPrescriptions.filter(
              item => item.VisitCode === visitCode
            )
            this.VisitCode = visitCode
          }

          if (response.ListMedicationAdministrationRecords.length > 0) {
            this.ListMedicationAdministrationRecords = response.ListMedicationAdministrationRecords
          }

          if (this.listGroupByVisitCodes.length > 1) {
            this.isShow = false
          } else {
            this.isShow = true
          }
          this.isLoaded = true
          this.loading = false
        })
        .catch(e => {
          this.loaded = true
          this.isLoaded = true
        })

      if (this.listGroupByVisitCodes.length === 1) {
        new MedicationAdministrationRecord()
          .find('CheckProfile/' + this.parameters.PID)
          .then(response => {
            this.IsDependentProfile = response.IsDependentProfile
            if (this.IsDependentProfile === false) {
            } else {
              this.MommyAndBabyProfiles = response.ListMommyAndBabies
              if (this.MommyAndBabyProfiles.length === 1) {
                this.selectMommyProfile(true, this.MommyAndBabyProfiles[0].Id, this.MommyAndBabyProfiles[0].VisitCode, this.MommyAndBabyProfiles[0].RecordCode)
              }
            }
          })
      }
    },
    updateQuery () {
      if (this.parameters.FromDate != null) {
        return Object.assign({}, this.parameters, {
          FromDate: moment(this.parameters.FromDate, 'DD/MM/YYYY').format(
            'YYYY-MM-DD'
          ),
          ToDate: moment(this.parameters.FromDate, 'DD/MM/YYYY')
            .add(1, 'days')
            .format('YYYY-MM-DD'),
          RecordCode: this.maHoSo
        })
      } else {
        this.parameters.FromDate = moment().format('DD/MM/YYYY')
        this.parameters.ToDate = moment()
          .add(1, 'days')
          .format('DD/MM/YYYY')
        return Object.assign({}, this.parameters, {
          FromDate: moment(this.parameters.FromDate, 'DD/MM/YYYY').format(
            'YYYY-MM-DD'
          ),
          ToDate: moment(this.parameters.FromDate, 'DD/MM/YYYY')
            .add(1, 'days')
            .format('YYYY-MM-DD'),
          visitType: ' ',
          VisitCode: ' ',
          RecordCode: this.maHoSo
        })
      }
    },
    btnGetData () {
      this.getPrescription()
    },
    async print () {
      await this.$htmlToPaperWithLargeHeader('printMe')
    },
    filterPrescription (code) {
      this.listPrescriptions = this.IPDPrescriptions
      this.listThucPhamChucNang = this.DietarySupplement
      if (code === null || code === '' || code === undefined) {
        this.listPrescriptions = this.IPDPrescriptions
        this.listThucPhamChucNang = this.DietarySupplement
      } else {
        if (this.checkNomalPrescription) {
          if (this.listPrescriptions.length === 0) {
            this.listPrescriptions = this.IPDPrescriptions.filter(
              item => item.PrescriptionCode === code
            )
          } else {
            this.listPrescriptions = this.listPrescriptions.filter(
              item => item.PrescriptionCode === code
            )
          }
        } else {
          this.listPrescriptions = []
        }

        if (this.checkDietarySupplement) {
          if (this.listThucPhamChucNang.length === 0) {
            this.listThucPhamChucNang = this.DietarySupplement.filter(
              item => item.PrescriptionCode === code
            )
          } else {
            this.listThucPhamChucNang = this.listThucPhamChucNang.filter(
              item => item.PrescriptionCode === code
            )
          }
        } else {
          this.listThucPhamChucNang = []
        }
      }

      if (code !== '') {
        if (this.listPrescriptions.length > 0) {
          this.selectedDoctorUserName = this.listPrescriptions[0].PrescriberAD
        } else if (this.listThucPhamChucNang.length > 0) {
          this.selectedDoctorUserName = this.listThucPhamChucNang[0].PrescriberAD
        }
        if (this.selectedDoctorUserName !== '') {
          new Account({noLoading: true, username: this.selectedDoctorUserName, hidemsg: true, notRedirect: true, type: this.type, id: this.id}).getInfo().then(res => {
            if (res) {
              this.selectedDoctorFullName = res.FullShortName
            }
          })
        }
      } else {
        this.selectedDoctorFullName = ''
      }
    },
    async fiterPrescriptionByVisitCode (visitCode) {
      this.isShow = true
      this.loading = true
      if (visitCode !== null) {
        this.parameters.VisitCode = visitCode
        await this.getMedicationAdministrationRecord(visitCode)
        // this.listPrescriptions = this.IPDPrescriptions.filter(
        //   item => item.VisitCode !== visitCode
        // )
        // if (this.DietarySupplement && this.DietarySupplement.length > 0) {
        //   this.listThucPhamChucNang = this.DietarySupplement.filter(
        //     item => item.VisitCode === visitCode
        //   )
        // }
        this.isShow = true
        this.isLoaded = true
        setTimeout(() => {
          this.loading = false
        }, 500)
      }
      new MedicationAdministrationRecord()
        .find('CheckProfile/' + this.parameters.PID)
        .then(response => {
          this.IsDependentProfile = response.IsDependentProfile
          if (this.IsDependentProfile === false) {
          } else {
            this.MommyAndBabyProfiles = response.ListMommyAndBabies
            if (this.MommyAndBabyProfiles.length > 1) {
              this.MommyAndBabyProfiles = this.MommyAndBabyProfiles.filter(item => item.VisitCode === visitCode || item.IsMommy === true)
            } else if (this.MommyAndBabyProfiles.length === 1) {
              this.selectMommyProfile(true, this.MommyAndBabyProfiles[0].Id, this.MommyAndBabyProfiles[0].VisitCode, this.MommyAndBabyProfiles[0].RecordCode)
            }
          }
        })
      this.$nextTick(() => {
      })
    },
    hasData (key) {
      return this.Groups[key] && this.Groups[key].length > 0
    },
    checkAllEvent () {
      if (this.checkAll) {
        this.checkAll = false
        this.checkNomalPrescription = false
        this.checkDietarySupplement = false
        this.listPrescriptions = []
        this.listThucPhamChucNang = []
      } else {
        this.checkAll = true
        this.checkNomalPrescription = true
        this.checkDietarySupplement = true
        this.listPrescriptions = this.IPDPrescriptions
        this.listThucPhamChucNang = this.DietarySupplement
      }
    },
    checkNomalPrescriptionEvent () {
      if (this.checkNomalPrescription) {
        this.checkNomalPrescription = false
        this.checkAll = false
        this.listPrescriptions = []
        if (this.checkDietarySupplement) {
          this.listThucPhamChucNang = this.DietarySupplement
        } else {
          this.listThucPhamChucNang = []
        }
      } else {
        this.listPrescriptions = this.IPDPrescriptions
        if (this.checkDietarySupplement) {
          this.checkAll = true
          this.listThucPhamChucNang = this.DietarySupplement
        } else {
          this.listThucPhamChucNang = []
          this.listPrescriptions = this.IPDPrescriptions
        }
      }
    },
    checkDietarySupplementEvent () {
      if (this.checkDietarySupplement) {
        this.checkAll = false
        this.checkDietarySupplement = false
        this.listThucPhamChucNang = []
        if (this.checkNomalPrescription) {
          this.listPrescriptions = this.IPDPrescriptions
        } else {
          this.listPrescriptions = []
        }
      } else {
        this.listThucPhamChucNang = this.DietarySupplement
        if (this.checkNomalPrescription) {
          this.checkAll = true
          this.listPrescriptions = this.IPDPrescriptions
        } else {
          this.listPrescriptions = []
          this.listThucPhamChucNang = this.DietarySupplement
        }
      }
    },
    orderPrescription () {
      if (this.selectedOrderType.value === 2) {
        var groupsPrescription = _.groupBy(this.listPrescriptions, 'SeqNum')
        var listPrescriptionsOrderBy = []
        Object.keys(groupsPrescription).forEach(element => {
          var newArray = _.orderBy(groupsPrescription[element], ['PharmacyName'], ['asc'])
          listPrescriptionsOrderBy.push.apply(listPrescriptionsOrderBy, newArray)
        })
        this.listPrescriptions = listPrescriptionsOrderBy
        var groupsThucPhamChucNang = _.groupBy(this.listThucPhamChucNang, 'SeqNum')
        var listThucPhamChucNangOrderBy = []
        Object.keys(groupsThucPhamChucNang).forEach(element => {
          let newArray = _.orderBy(groupsThucPhamChucNang[element], ['PharmacyName'], ['asc'])
          listThucPhamChucNangOrderBy.push.apply(listThucPhamChucNangOrderBy, newArray)
        })
        this.listThucPhamChucNang = listThucPhamChucNangOrderBy
      } else {
        this.listPrescriptions = this.IPDPrescriptions
        this.listThucPhamChucNang = this.DietarySupplement
      }
    },
    async selectMommyProfile (isMommy, Id, visitCode, department, recordCode) {
      // Tìm hồ sơ của con để lấy thông tin
      if (isMommy) {
        this.IsMommy = true
        await new InitialAssessment().find('ForNeonatalMaternityV2/GetList/' + Id).then(response => {
          if (response.Forms.length > 0) {
            let baby = response.Forms.find(e => e.NewbornCustomer.PID === this.parameters.PID)
            if (baby) {
              new InitialAssessment().find('ForNeonatalMaternityV2/' + 'A02_016_050919_VE/' + Id + '/ForNeonatalMaternity_Obstetrics/' + baby.Id).then(response => {
                if (response.Datas) {
                  this.BabyVitalSigns.Height = response.Datas.find(e => e.Code === 'IPDOAGIANM103').Value
                  this.BabyVitalSigns.Weight = response.Datas.find(e => e.Code === 'IPDOAGIANM101').Value / 1000
                  this.MedicationAdministrationRecordInfo.HeightViMessage = ''
                  this.MedicationAdministrationRecordInfo.WeightViMessage = ''
                  this.MedicationAdministrationRecordInfo.DiagnosisMessage = ''
                }
              }).catch(e => {
                this.BabyVitalSigns.Height = ''
                this.BabyVitalSigns.Weight = ''
              })
            } else {
              this.BabyVitalSigns.Height = ''
              this.BabyVitalSigns.Weight = ''
            }
          } else {
            this.BabyVitalSigns.Height = ''
            this.BabyVitalSigns.Weight = ''
          }
        }).catch()
      } else {
        if (department.includes('IPD')) {
          this.visitType = 'IPD'
        } else if (department.includes('OPD')) {
          this.visitType = 'OPD'
        } else if (department.includes('ED')) {
          this.visitType = 'ED'
        }
        this.VisitCode = visitCode
        this.IsMommy = false
        this.maHoSo = recordCode
        this.$router.push({
          path: `/MedicationAdministrationRecord/${this.parameters.PID}`,
          query: {
            FromDate: this.parameters.FromDate,
            ToDate: moment(this.parameters.FromDate, 'DD/MM/YYYY')
              .add(1, 'days')
              .format('DD/MM/YYYY'),
            VisitCode: this.VisitCode,
            VisitType: this.visitType,
            RecordCode: this.maHoSo
          }
        })
        this.reload()
      }
    }
  }
}
</script>
<style scoped>
.box {
  border: none;
}

#dateMedication > .box-item {
  margin-right: 25px;
}
</style>
