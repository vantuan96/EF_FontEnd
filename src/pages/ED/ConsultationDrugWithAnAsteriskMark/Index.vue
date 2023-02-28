<template>
  <div class="main-content" id="StandingOrderForRetailService-page">
    <h2 v-if="!viewOnly" class="text-center"><b>{{__t('Biên bản hội chẩn bệnh nhân sử dụng thuốc có dấu sao (*)')}}</b></h2>
    <h4 v-if="!viewOnly" class="text-center"><b>{{__t('Khoa')}}: </b>{{__label(this.$store.state.account.Specialty)}}</h4>
    <div v-if="loaded">
      <div v-if="DataSubmit" :class="{'r2eadonly': DataSubmit.confirmed}">
        <div>
          <p><b>{{__t('Số phòng')}}: </b><template v-if="DataSubmit.confirmed">{{DataSubmit.RoomNumber || 'N/A'}}</template><input v-else :placeholder="__t('Nhập')" style="display: inline-block;" class="form-control w130" v-model="DataSubmit.RoomNumber" /></p>
          <br/>
        </div>
        <div>
          <p><b>{{__t('Ngày vào viện')}}: </b>{{DataSubmit.AddmisionDate}}</p>
          <br/>
        </div>
        <div>
          <p><b>{{__t('Ngày hội chẩn')}}: </b><template v-if="DataSubmit.confirmed">{{DataSubmit.ConsultationDate}}</template><v-date-picker style="display: inline-block;" v-if="!DataSubmit.confirmed" v-model="DataSubmit.ConsultationDate" :format="vDateTimeFormat"/></p>
          <br/>
        </div>
        <div>
          <p><b>{{__t('Chẩn đoán bệnh')}}: </b>{{DataSubmit.Diagnosis || 'N/A'}}</p>
          <br/>
        </div>
        <div>
          <p><b>{{__t('Thuốc kháng sinh đã điều trị')}}: </b><template v-if="DataSubmit.confirmed">{{DataSubmit.AntibioticsTreatmentBefore}}</template></p>
          <significant-medications v-if="!DataSubmit.confirmed" :data="AntibioticsTreatmentBefore" @copy="copyToDI0SM0"/>
          <textarea-autosize :placeholder="__t('Nhập')" v-if="!DataSubmit.confirmed" rows="3" class="form-control" v-model="DataSubmit.AntibioticsTreatmentBefore"/>
          <br/>
        </div>
        <div>
          <p><b>{{__t('Chẩn đoán bệnh sau hội chẩn')}}: </b><template v-if="DataSubmit.confirmed">{{DataSubmit.DiagnosisAfterConsultation}}</template></p>
          <textarea-autosize :placeholder="__t('Nhập')" v-if="!DataSubmit.confirmed" rows="3" class="form-control" v-model="DataSubmit.DiagnosisAfterConsultation"/>
          <br/>
        </div>
        <p><b>{{__t('Chỉ định dùng thuốc dấu sao(*)')}}</b> {{__t('(Lý do, tên thuốc, hàm lượng, đường dùng)')}}:</p>
        <table class="table header-table v-header-table">
          <tr>
            <th width="30%" class="text-center">{{__t('Tên thuốc')}}</th>
            <th class="text-center">{{__t('Lý do')}}</th>
            <th class="text-center">{{__t('Hàm lượng')}}</th>
            <th width="200px" class="text-center">{{__t('Đường dùng')}}</th>
          </tr>
          <tbody :data="item" :key="index" v-for="(item, index) in DataSubmit.Orders" v-if="!item.removed">
            <tr>
              <td style="position: relative">
                <template v-if="DataSubmit.confirmed">{{item.Drug || 'N/A'}}</template>
                <template v-else>
                  <button v-if="!item.Id" class="btn-pos-left" @click="remove(item)"><i class="fa fa-trash" aria-hidden="true"></i></button>
                  <medication v-model="item.Drug" />
                </template>
              </td>
              <td>
                <template v-if="DataSubmit.confirmed">{{item.Reason || 'N/A'}}</template>
                <input v-else class="form-control" v-model="item.Reason" :placeholder="__t('Nhập lý do')"/>
              </td>
              <td>
                <template v-if="DataSubmit.confirmed">{{item.Concentration || 'N/A'}}</template>
                <input v-else class="form-control" v-model="item.Concentration" :placeholder="__t('Nhập hàm lượng')"/>
              </td>
              <td>
                <template v-if="DataSubmit.confirmed">{{item.Route || 'N/A'}}</template>
                <medication-route v-else v-model="item.Route"/>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="text-center" v-if="!DataSubmit.confirmed"><button class="btn v-green-btn v-bottom-btn" @click="addNew"><i class="fa fa-plus" aria-hidden="true"></i>{{__t('THÊM THUỐC')}}</button></div>
        <br/><br/>
        <br/><br/>
        <div class="row">
          <div class="col-md-6 col-sm-6 text-center">
            <template v-if="DataSubmit.HospitalDirectorOrHeadDepartment.Username">
              <p class="text-center">{{DataSubmit.HospitalDirectorOrHeadDepartmentTime}}</p>
              <eform-signature :ad="DataSubmit.HospitalDirectorOrHeadDepartment.Username" :title="__t('Giám đốc bệnh viện/Trưởng khoa')" />
            </template>
            <template v-else>
              <p><b>{{__t('Giám đốc bệnh viện/Trưởng khoa')}}</b></p>
              <p><i v-if="viewOnly || IsLocked">{{__t('Chưa xác nhận')}}</i><button v-else @click="showDoctorConfirm('HospitalDirectorOrHeadDepartment', 'Giám đốc bệnh viện/Trưởng khoa')" class="btn v-white-btn">{{__t('Xác nhận')}}</button></p>
            </template>
          </div>
          <div class="col-md-6 col-sm-6 text-center">
            <template v-if="DataSubmit.Doctor.Username">
              <p class="text-center">{{DataSubmit.DoctorTime}}</p>
              <eform-signature :ad="DataSubmit.Doctor.Username" :title="__t('Bác sĩ điều trị')" />
            </template>
            <template v-else>
              <p><b>{{__t('Bác sĩ điều trị')}}</b></p>
              <p><i v-if="viewOnly || IsLocked">{{__t('Chưa xác nhận')}}</i><button v-else @click="showDoctorConfirm('Doctor', 'Bác sĩ điều trị')" class="btn v-white-btn">{{__t('Xác nhận')}}</button></p>
            </template>
          </div>
        </div>
        <br/><br/>
        <br/><br/>
        <logs v-if="!viewOnly" :EdId="this.$route.params.Id" :Type="'ED/ConsultationDrugWithAnAsteriskMark'" />
        <p>A01_058_050919_VE</p>
        <div class="status-float-block" v-if="!DataSubmit.confirmed">
          <div class="action-btn-block">
            <div class="container">
              <div class="content-container">
                <div class="row">
                  <!-- <div class="col-md-1">
                    <div class="form-group1">
                      <floating-menu :Items="MenuItems" />
                    </div>
                  </div> -->
                  <div class="col-md-2">
                    <div class="form-group1">
                      <button class="btn btn-block v-white-btn" type="button" @click="back()"><i class="fa fa-angle-double-left" aria-hidden="true"></i> {{__t('Quay lại')}}</button>
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="form-group1">
                      <!-- <button class="btn btn-block v-white-btn" type="button" @click="$router.push({name: 'OPDMedicalReport', params: {Id: $route.params.Id}})"><i class="fa fa-file-o" aria-hidden="true"></i> {{__t('Báo cáo y tế')}}</button> -->
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group1">
                      <button class="btn v-yellow-btn pull-right btn-block hvr-ripple-out" v-shortkey="['ctrl', 's']" @shortkey="submit()" type="button" @click="submit()"><i class="fa fa-floppy-o" aria-hidden="true"></i> {{__t('btn.luu')}}</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <div class="text-center">
          <p>{{__t('Chưa có kết quả')}}</p>
          <button v-if="!IsLocked" class="btn btn-warning" @click="confirmPopup">{{__t('Tạo mới')}}</button>
        </div>
      </div>
    </div>
    <div v-else class="loading-text"><v-loading/></div>
    <modal name="doctorConfirm" transition="pop-out" id="doctor-login" height="auto" :clickToClose="false">
      <div class="box v-model-content-popup">
        <div class="box-header text-center">
          <h3 class="box-title">{{__t(popupTitle)}} {{__t('xác nhận')}}</h3>
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
        </div>
      </div>
    </modal>
  </div>
</template>
<script>
import moment from 'moment'
import MixinForm from '@/mixins/form.js'
import VDatePicker from '@/components/VDateTimePicker.vue'
import DischargeInformation from '@/services/ED/DischargeInformation'
import SignificantMedications from '@/components/ED/SignificantMedications.vue'
import ConsultationDrugWithAnAsteriskMark from '@/services/ED/ConsultationDrugWithAnAsteriskMark'
import Logs from '@/components/Logs.vue'
export default {
  /**
   * The name of the page.
   */
  name: 'ConsultationDrugWithAnAsteriskMark',
  props: ['VisitId', 'VisitType', 'viewOnly'],
  data () {
    return {
      DataSubmit: null,
      user: {},
      AntibioticsTreatmentBefore: null,
      Kind: null,
      loaded: false,
      popupTitle: '',
      IsLocked: false
    }
  },
  mixins: [MixinForm],
  mounted () {
    this.getData()
  },
  components: {
    VDatePicker, SignificantMedications, Logs
  },
  methods: {
    remove (item) {
      item.removed = true
      // this.index --
    },
    showDoctorConfirm (kind, title) {
      this.popupTitle = title
      this.user.kind = kind
      this.$modal.show('doctorConfirm')
    },
    copyToDI0SM0 (str) {
      if (this.DataSubmit.AntibioticsTreatmentBefore && this.DataSubmit.AntibioticsTreatmentBefore.includes(str)) {
      } else {
        this.DataSubmit.AntibioticsTreatmentBefore = this.trim((this.DataSubmit.AntibioticsTreatmentBefore || '') + ', ' + str, ', ')
      }
      this.toastedInfo('Đã copy')
    },
    loadAntibioticsTreatmentBefore () {
      new DischargeInformation({hidemsg: true, notRedirect: true}).create({Id: this.$route.params.Id}, 'SyncReadOnlySignificantMedications').then(response => {
        this.AntibioticsTreatmentBefore = JSON.stringify(response)
      })
    },
    submit () {
      this.DataSubmit._Exception = []
      Object.keys(this.DataSubmit).forEach(key => {
        if (key !== '_Exception' && key !== 'AddmisionDate' && key !== 'Doctor' && key !== 'HospitalDirectorOrHeadDepartment' && key !== 'DoctorTime' && key !== 'HospitalDirectorOrHeadDepartmentTime' && key !== 'Orders' && key !== 'Id') {
          var value = this.DataSubmit[key]
          if (key === 'Gender') {
            if (value === 0) {
              value = 'Nữ'
            } else if (value === 1) {
              value = 'Nam'
            } else {
              value = 'Khác'
            }
          }
          this.DataSubmit._Exception.push({
            key: key,
            value: value
          })
        }
      })
      var DataSubmit = Object.assign({}, this.DataSubmit)
      if (typeof DataSubmit.ConsultationDate === 'object') {
        DataSubmit.ConsultationDate = moment(DataSubmit.ConsultationDate).format(this.vDateTimeFormat)
      }
      DataSubmit.Orders = DataSubmit.Orders.filter(e => !e.removed)
      setTimeout(() => {
        new ConsultationDrugWithAnAsteriskMark({}, this._VisitType).update(this.$route.params.Id, DataSubmit).then(response => {
          this.getData()
          this.toastedSuccess().scroll2Bottom()
        }).catch(e => {
          // this.back()
        })
      }, 100)
    },
    confirm () {
      new ConsultationDrugWithAnAsteriskMark({}, this._VisitType).update(this.$route.params.Id, this.user, '/Accept/').then(response => {
        this.getData()
        this.toastedSuccess().scroll2Bottom()
        this.$modal.hide('doctorConfirm')
      }).catch(e => {
        // this.back()
      })
    },
    creat () {
      new ConsultationDrugWithAnAsteriskMark({}, this._VisitType).update(this.$route.params.Id, {}, '/Create/').then(response => {
        this.reload()
      }).catch(e => {
        this.reload()
      })
    },
    addNew () {
      this.DataSubmit.Orders.push({
        Drug: '',
        Concentration: '',
        SkinResult: '',
        Reason: '',
        Route: '',
        removed: false
      })
    },
    getData () {
      this.loaded = false
      new ConsultationDrugWithAnAsteriskMark({}, this._VisitType).find(this._VisitId + '?hidemsg=' + true).then(response => {
        this.IsLocked = response.IsLocked
        if (response.Orders) {
          response.Orders.map(e => {
            e.removed = false
            return e
          })
        }
        this.DataSubmit = response
        // console.log(response)
        if (this.DataSubmit.Orders.length === 0) this.addNew()
        this.DataSubmit.confirmed = this.IsLocked || this.viewOnly || (this.DataSubmit.HospitalDirectorOrHeadDepartment.Username || this.DataSubmit.Doctor.Username)
        if (!this.DataSubmit.ConsultationDate && !this.DataSubmit.confirmed) {
          this.DataSubmit.ConsultationDate = new Date()
        }
        this.loadAntibioticsTreatmentBefore()
        this.loaded = true
      }).catch(e => {
        this.loaded = true
        this.IsLocked = e.data.IsLocked
        if (e.status === 404) {}
      })
    },
    confirmPopup () {
      this.$modal.show('dialog', {
        clickToClose: false,
        title: this.__t('Thông báo'),
        text: this.__t('Tạo mới biên bản hội chẩn thuốc có dấu sao(*)?'),
        class: 'v-dialog v-dialog-warning',
        buttons: [
          {
            title: this.__t('Tôi xác nhận'),
            class: 'btn btn-warning',
            handler: () => {
              this.$modal.hide('dialog')
              this.creat()
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
