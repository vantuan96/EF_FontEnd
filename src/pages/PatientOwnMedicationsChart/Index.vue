<template>
  <div class="main-content">
    <h2 class="text-center" v-if="!viewOnly">{{__t('Phiếu ghi nhận sử dụng thuốc do người bệnh mang vào')}}</h2>
    <h4 class="text-center" v-if="!viewOnly"><b>{{__t('Khoa')}}: </b>{{__label(this.$store.state.account.Specialty)}}</h4>
    <div v-if="loaded">
      <template v-if="DataSubmit">
        <div class="form-content">
          <table class="standing-order-tbl">
            <tr>
              <th width="1" class="no-wrap">{{__t('Stt')}}</th>
              <th>{{__t('Tên thuốc, nồng độ, hàm lượng')}}</th>
              <th width="1" class="no-wrap">{{__t('ĐVT')}}</th>
              <th width="1" class="no-wrap">{{__t('Số lượng')}}</th>
              <th width="1" class="no-wrap">{{__t('Số lô')}}</th>
              <th width="1" class="no-wrap">{{__t('Hạn dùng')}}</th>
              <th width="1" class="no-wrap">{{__t('Điều kiện bảo quản/ nơi mua')}}</th>
              <th width="150px">{{__t('Ghi chú')}}</th>
            </tr>
            <template v-if="DataSubmit.Datas && DataSubmit.Datas.length">
              <tr v-for="(item, index) in DataSubmit.Datas" :key="index">
                <td class="text-center" style="position: relative">
                  <button v-if="!item.Id" class="btn-pos-left" @click="removeItem(DataSubmit.Datas, index)"><i class="fa fa-trash" aria-hidden="true"></i></button> {{++index}}
                </td>
                <td>
                  <p v-if="isConfirmed || item.CreatedBy !== $store.state.account.Username" class="mg0">{{item.DrugName || 'N/A'}}</p>
                  <input :placeholder="__t('Tên thuốc, nồng độ, hàm lượng')" v-else class="form-control" v-model="item.DrugName" />
                </td>
                <td>
                  <p v-if="isConfirmed || item.CreatedBy !== $store.state.account.Username" class="mg0">{{item.Unit || 'N/A'}}</p>
                  <input :placeholder="__t('ĐVT')" v-else class="form-control w100" v-model="item.Unit" />
                </td>
                <td>
                  <p v-if="isConfirmed || item.CreatedBy !== $store.state.account.Username" class="mg0">{{item.Quantity || 'N/A'}}</p>
                  <input :placeholder="__t('Số lượng')" v-else class="form-control w100" v-model="item.Quantity" />
                </td>
                <td>
                  <p v-if="isConfirmed || item.CreatedBy !== $store.state.account.Username" class="mg0">{{item.LotNo || 'N/A'}}</p>
                  <input :placeholder="__t('Số lô')" v-else class="form-control w100" v-model="item.LotNo" />
                </td>
                <td>
                  <p v-if="isConfirmed || item.CreatedBy !== $store.state.account.Username" class="mg0">{{item.ExpiryDate || 'N/A'}}</p>
                  <VDatePicker class="wmg2" :placeholder="__t('Hạn dùng')" v-else :hideTooltip="true" :allday="'allday'" style="display: inline-block;" v-model="item.ExpiryDate" :format="vDateFormat"/>
                </td>
                <td>
                  <p v-if="isConfirmed || item.CreatedBy !== $store.state.account.Username" class="mg0">{{item.StorageOrigin || 'N/A'}}</p>
                  <textarea-autosize v-else class="form-control" rows="1" :placeholder="__t('Nhập')"  v-model="item.StorageOrigin"/>
                </td>
                <td>
                  <p v-if="isConfirmed || item.CreatedBy !== $store.state.account.Username" class="mg0">{{item.Note || 'N/A'}}</p>
                  <textarea-autosize v-else class="form-control" rows="1" :placeholder="__t('Nhập')"  v-model="item.Note"/>
                </td>
              </tr>
            </template>
            <template v-else>
              <tr>
                <td colspan="8" class="text-center hide-counter">{{__t('Chưa có thuốc')}}</td>
              </tr>
            </template>
          </table>
          <div class="text-center" v-if="!isConfirmed">
            <button @click="addNewData" class="btn v-green-btn v-bottom-btn"><i aria-hidden="true" class="fa fa-plus"></i> {{__t('THÊM THUỐC')}}</button>
          </div>
          <br/>
          <p>{{__t('Tổng số khoản')}}: {{firstTotal}}</p>
          <p><b>1. {{__t('Ý kiến bác sĩ điều trị')}}:</b></p>
          <div class="mb10">
            <textarea-autosize :readonly="isConfirmed" class="form-control" rows="3" :placeholder="__t('Ý kiến bác sĩ điều trị')"  v-model="DataSubmit.DoctorOpinion"/>
          </div>
          <p><b>2. {{__t('Cam kết của người bệnh')}}:<i> {{__t('Đồng ý sử dụng và chịu hoàn toàn trách nhiệm nếu xảy ra các tai biến liên quan đến sử dụng các thuốc ở trên.')}}</i></b></p>
          <p><b>3. {{__t('Thẩm định khoa dược')}}:</b></p>
          <div class="mb10">
            <textarea-autosize :readonly="isConfirmed" class="form-control" rows="3" :placeholder="__t('Thẩm định khoa dược')"  v-model="DataSubmit.ClinicalPharmacistReview"/>
          </div>
          <p><b>4. {{__t('Gửi thuốc tại khoa dược')}}:</b></p>
          <div class="mb10">
            <div class="group-radio no-flex">
              <input type="radio" :id="'aStorageDrugsAtPharmacy'" name="StorageDrugsAtPharmacy" :value="true" v-model="DataSubmit.StorageDrugsAtPharmacy">
              <label :class="{'readonly': isConfirmed}" :for="'aStorageDrugsAtPharmacy'">{{__t('Có')}}</label>
              <input type="radio" :id="'bStorageDrugsAtPharmacy'" name="StorageDrugsAtPharmacy" :value="false" v-model="DataSubmit.StorageDrugsAtPharmacy">
              <label :class="{'readonly': isConfirmed}" :for="'bStorageDrugsAtPharmacy'">{{__t('Không')}}</label>
            </div>
          </div>
          <p>{{__t('Tổng')}}: <span v-if="isConfirmed">{{DataSubmit.SecondTotal || 0}}</span> <v-select v-else :disabeleclear="true" class='w100' v-model="DataSubmit.SecondTotal" :placeholder="__t('Chọn')" :items="secondTotals"/></p>
          <div class="pomc-upload-area">
            <div class="row">
              <div class="col-md-7 col-sm-7">
                <p><b>{{__t('Upload ảnh')}}:</b></p>
                <p><button v-if="!viewOnly && !IsLocked" @click="openFile()" class="btn v-white-btn font16 font-bold btn-upload"><i class="fa fa-upload" aria-hidden="true"></i> {{__t('UPLOAD TỪ THIẾT BỊ')}}</button></p>
                <p>{{__t('Sau khi phiếu ghi nhận sử dụng thuốc do người bệnh mang vào có xác nhận/chữ ký từ người bệnh/người nhà bệnh nhân. Người dùng chụp ảnh phiếu ghi nhận và tải ảnh lên hệ thống.')}}</p>
              </div>
              <div class="col-md-5 col-sm-5">
                <drop-files id="mini-upload" :readonly="viewOnly || IsLocked" v-model="DataSubmit.Upload" :dataDropfile="dataDropfile"/>
              </div>
            </div>
          </div>
          <br/>
          <br/>
          <br/>
          <div class="row">
            <div class="col-md-4 col-sm-4 text-center">
              <template v-if="DataSubmit.HeadOfPharmacyTime">
                <p class="text-center">{{DataSubmit.HeadOfPharmacyTime}}</p>
                <eform-signature :ad="DataSubmit.HeadOfPharmacy.Username" :title="'Trưởng khoa dược'" />
              </template>
              <template v-else>
                <p><b>{{__t('Trưởng khoa dược')}}:</b></p>
                <p>
                  <i v-if="viewOnly || IsLocked">{{__t('Chưa xác nhận')}}</i>
                  <button v-else @click="showDoctorConfirm('HeadOfPharmacy', 'Trưởng khoa dược')" class="btn v-white-btn">{{__t('Xác nhận')}}</button>
                </p>
              </template>
            </div>
            <div class="col-md-4 col-sm-4 text-center">
              <template v-if="DataSubmit.HeadOfDepartmentTime">
                <p class="text-center">{{DataSubmit.HeadOfDepartmentTime}}</p>
                <eform-signature :ad="DataSubmit.HeadOfDepartment.Username" :title="'Trưởng khoa điều trị'" />
              </template>
              <template v-else>
                <p><b>{{__t('Trưởng khoa điều trị')}}:</b></p>
                <p><i v-if="viewOnly || IsLocked">{{__t('Chưa xác nhận')}}</i><button v-else @click="showDoctorConfirm('HeadOfDepartment', 'Trưởng khoa điều trị')" class="btn v-white-btn">{{__t('Xác nhận')}}</button></p>
              </template>
            </div>
            <div class="col-md-4 col-sm-4 text-center">
              <template v-if="DataSubmit.DoctorTime">
                <p class="text-center">{{DataSubmit.DoctorTime}}</p>
                <eform-signature :ad="DataSubmit.Doctor.Username" :title="'Bác sĩ điều trị'" />
              </template>
              <template v-else>
                <p><b>{{__t('Bác sĩ điều trị')}}:</b></p>
                <p><i v-if="viewOnly || IsLocked">{{__t('Chưa xác nhận')}}</i><button v-else @click="showDoctorConfirm('Doctor', 'Bác sĩ điều trị')" class="btn v-white-btn">{{__t('Xác nhận')}}</button></p>
              </template>
            </div>
          </div>
          <br/>
          <br/>
          <br/>
          <modal name="doctorConfirm" transition="pop-out" id="doctor-login" height="auto" :clickToClose="false">
            <div class="box v-model-content-popup">
              <div class="box-header text-center">
                <h3 class="box-title">{{__t(popupTitle)}}.</h3>
                <div style="color: #fff">{{__t('Vui lòng nhập tài khoản ad để xác nhận')}}</div>
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
                  <div class="col-xs-6">
                    <button type="button" class="btn btn-block v-white-btn" @click="$modal.hide('doctorConfirm')">{{__t('Thoát')}}</button>
                  </div>
                  <div class="col-xs-6">
                    <button type="button" class="btn btn-block v-yellow-btn" @click="confirm()">{{__t('Xác nhận')}}</button>
                  </div>
                </div>
                <p style="margin-top: 10px; text-align:center">{{__t('Sử dụng tài khoản máy tính')}}</p>
                <p style="margin-top: 10px; text-align:center">{{__t('Sau khi xác nhận, người dùng sẽ không thể chỉnh sửa thông tin trên phiếu')}}</p>
              </div>
            </div>
          </modal>
          <div class="status-float-block" v-if="!viewOnly">
            <div class="action-btn-block">
              <div class="container">
                <div class="content-container">
                  <div class="row">
                    <!-- <div class="col-md-2 col-sm-2"> -->
                    <div class="col-md-2 col-sm-2" v-if="!IsLocked">
                      <div class="form-group1">
                        <button class="btn btn-block v-white-btn" type="button" @click="back()"><i class="fa fa-angle-double-left" aria-hidden="true"></i> {{__t('Quay lại')}}</button>
                      </div>
                    </div>
                    <div class="col-md-5 col-sm-5">
                      <div class="form-group1">
                        <button class="btn v-white-btn pull-right btn-block" type="button"  v-shortkey="['ctrl', 'p']" @shortkey="print()" @click="print()"><i class="fa fa-print" aria-hidden="true"></i> {{__t('In')}}</button>
                      </div>
                    </div>
                    <!-- <div class="col-md-5 col-sm-5"> -->
                    <div class="col-md-5 col-sm-5" v-if="!IsLocked">
                      <div class="form-group1">
                        <button class="btn v-yellow-btn pull-right btn-block hvr-ripple-out" type="button"  v-shortkey="['ctrl', 's']" @shortkey="save()" @click="save()"><i class="fa fa-floppy-o" aria-hidden="true"></i> {{__t('btn.luu')}}</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Printer :data="DataPrint" v-if="DataPrint" hidden />
      </template>
      <div v-else>
        <div class="text-center">
          <NewForm @createForm="confirmPopup" :IsLocked="IsLocked" :TitleForm="''"/>
          <!-- <p>{{__t('Chưa có phiếu ghi nhận sử dụng thuốc do người bệnh mang vào')}}</p>
          <button v-if="!IsLocked && !viewOnly" class="btn btn-warning" @click="confirmPopup">{{__t('Tạo mới')}}</button> -->
        </div>
      </div>
    </div>
    <div v-else class="loading-text"><v-loading/></div>
    <br/>
    <div>
      <logs v-if="!viewOnly" :EdId="this.$route.params.Id" :Type="'PatientOwnMedicationsChart'" :noDetail="true" />
      <p>A03_051_120421_VE</p>
    </div>
  </div>
</template>
<script>
import PatientOwnMedicationsChart from '@/services/PatientOwnMedicationsChart'
// import VDatePicker from '@/components/VDateTimePicker.vue'
import VSelect from '@/components/VSelect.vue'
import Printer from './Print.vue'
import MixinForm from '@/mixins/form.js'
import Logs from '@/components/Logs.vue'
import $ from 'jquery'
import DropFiles from '@/components/DropFiles.vue'
import UploadFileService from '@/services/IPD/UploadFileService'
// import _ from 'lodash'
// import moment from 'moment'
export default {
  name: 'PatientOwnMedicationsChartIndex',
  props: ['VisitId', 'VisitType', 'viewOnly', 'dataDropfile'],
  mixins: [MixinForm],
  data () {
    return {
      IsLocked: false,
      user: {},
      DataSubmit: null,
      DataPrint: null,
      loaded: false,
      users: [
      ],
      progressDatas: [],
      popupTitle: ''
    }
  },
  components: {
    Logs, VSelect, DropFiles, Printer
  },
  mounted () {
    this.getData()
  },
  computed: {
    isConfirmed () {
      return this.IsLocked || this.viewOnly || (this.DataSubmit.DoctorTime || this.DataSubmit.HeadOfDepartmentTime || this.DataSubmit.HeadOfPharmacyTime)
    },
    firstTotal () {
      if (this.DataSubmit) {
        return this.DataSubmit.Datas.filter(e => !e.Removed).length
      }
      return 0
    },
    secondTotals () {
      var arr = []
      for (let index = 0; index <= this.firstTotal; index++) {
        arr.push({
          value: String(index),
          label: String(index)
        })
      }
      return arr
    }
  },
  watch: {
    firstTotal: {
      handler (a, b) {
        if (this.DataSubmit.SecondTotal > a) this.DataSubmit.SecondTotal = a
      },
      deep: true
    },
    DataSubmit: {
      handler () {
        this.edited = true
      },
      deep: true
    }
  },
  methods: {
    removeItem (item, index) {
      item.splice(index - 1, 1)
    },
    print () {
      this.getData(true)
    },
    async confirm () {
      if (this.edited) {
        await this.save()
      }
      new PatientOwnMedicationsChart({}, this._VisitType).update(this.$route.params.Id, this.user, 'Confirm/').then(response => {
        this.getData()
        this.toastedSuccess().scroll2Bottom()
        this.$modal.hide('doctorConfirm')
      }).catch(e => {
        // this.back()
      })
    },
    showDoctorConfirm (kind, title) {
      this.popupTitle = title
      this.user.kind = kind
      this.$modal.show('doctorConfirm')
    },
    openFile () {
      console.log($('#dropzone'))
      $('#dropzone').click()
    },
    addNewData () {
      this.DataSubmit.Datas.push({
        DrugName: '',
        Unit: '',
        Quantity: '',
        LotNo: '',
        ExpiryDate: '',
        Note: '',
        StorageOrigin: '',
        Removed: false,
        CreatedBy: this.$store.state.account.Username
      })
    },
    getData (forprint) {
      new PatientOwnMedicationsChart({}, this._VisitType).find(this._VisitId + '?hidemsg=' + true).then(response => {
        this.$store.dispatch('setCurrentFormId', response.Id)
        this.IsLocked = response.IsLocked
        this.dataDropfile = {
          ...this.dataDropfile,
          contentImg: 'Tóm tắt thủ thuật can thiệp động mạch vành',
          titleImg: 'Hình ảnh được lấy từ biểu mẫu Tóm tắt thủ thuật can thiệp động mạch vành',
          visittypeImg: this._VisitType,
          visitidImg: this._VisitId,
          formidImg: response.Id || response.ID
        }
        if (forprint) {
          this.DataPrint = response
          setTimeout(() => {
            this.$htmlToPaper2('printMe', false, 'A03_051_120421_VE')
          }, 500)
        } else {
          if (response.Upload) response.Upload = this.JSONParse(response.Upload)
          this.DataSubmit = response
        }
        // this.DataSubmit.Customer = {}
        this.loaded = true
      }).catch(e => {
        this.IsLocked = e.data.IsLocked
        this.loaded = true
      })
    },
    removedFile (arr) {
      new UploadFileService({hidemsg: true}).update('File/DeleteFileFromForms/' + this.DataSubmit.Id, {Urls: arr.toString()}).then(response => {
      }).catch(err => {
        console.log(err)
      })
    },
    save () {
      this.DataSubmit.FirstTotal = this.firstTotal
      this.DataSubmit.Datas = this.DataSubmit.Datas.filter(e => !e.Removed)
      var arr = this.DataSubmit.Upload ? this.DataSubmit.Upload : []
      return new PatientOwnMedicationsChart({}, this._VisitType).update(this.$route.params.Id, this.DataSubmit).then(response => {
        this.removedFile(arr)
        this.toastedSuccess()
        this.reload()
        this.edited = false
      }).catch(e => {
        // this.back()
      })
    },
    create () {
      new PatientOwnMedicationsChart({}, this._VisitType).update('create/' + this.$route.params.Id, {}).then(response => {
        this.reload()
      }).catch(e => {
        // this.back()
      })
    },
    confirmPopup () {
      this.$modal.show('dialog', {
        clickToClose: false,
        title: this.__t('Thông báo'),
        text: this.__t('Tạo mới phiếu ghi nhận sử dụng thuốc do người bệnh mang vào?'),
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
    }
  }
}
</script>
