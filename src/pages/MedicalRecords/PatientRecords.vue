<template>
  <div class="main-content" id="patientRecords-page">
    <template v-if="loaded">
      <!-- <template v-if="hasNote || ImSuperAdmin()"> -->
        <div class="box-view-table-timeline flex align-center mrb10" v-if="hasRole('SHOWTIMELINE')">
          <button type="button" class="mini-btn" :class="timeline ? 'active' : ''" @click="timeline = !timeline">{{__t('Mốc thời gian')}}</button>
          <button type="button" class="mini-btn" :class="!timeline ? 'active' : ''" @click="timeline = !timeline">{{__t('Bảng')}}</button>
        </div>
        <hr v-if="tomtatthongtinnguoibenh" style="border-bottom: 2px solid #1375ba;margin-top: -11px;"/>
        <template v-if="hasRole('SHOWTIMELINE')">
          <MDTimeLine class="mrb10 box-timeline" v-if="timeline" :dataTimeLine="DataTimeLine" :class="!timeline ? 'show' : ''"/>
        </template>
        <div class="box-table" v-if="!timeline" :class="timeline ? 'show' : ''">
          <h1 class="title-page">{{__t('Bệnh án')}}</h1>
          <table class="table table-striped table-bordered v-table" id="customer-tbl">
            <thead>
              <tr>
                <td colspan="10">
                  <div>
                    <label>{{__t('Lọc theo')}}:</label>
                  </div>
                  <div class="flex space-between">
                    <div>
                      <v-select class="mrb10 mrr10 inline-block" style="padding-top: 6px;" :multi="true" v-model="parameters.status" :items="ListStatus" :placeholder="__t('Trạng thái')"/>
                      <VText class="mrb10 mrr10 inline-block" style="min-width: 250px;" type="text" v-model="parameters.recordCode" :placeholder="__t('Mã hồ sơ')"/>
                      <VText class="mrb10 mrr10 inline-block" type="text" v-model="parameters.visitCode" :placeholder="__t('Số tiếp nhận')"/>
                      <v-select class="mrb10 mrr10 inline-block" style="padding-top: 6px;" :multi="true" v-model="parameters.visitTypeGroupCode" :items="ListVisitType" :placeholder="__t('Loại thăm khám')"/>
                      <v-select class="mrb10 mrr10 inline-block" style="padding-top: 6px;" :multi="true" v-model="parameters.specialty" :items="ListSpecialties" :placeholder="__t('Chuyên khoa')"/>
                      <v-date-picker class="mrb10 mrr10" style="display: inline-block;" v-model="parameters.startExaminationTime" :format="vDateTimeFormat" :placeholder="__t('Từ ngày')"/>
                      <v-date-picker class="mrb10 mrr10" style="display: inline-block;" v-model="parameters.endExaminationTime" :format="vDateTimeFormat" :placeholder="__t('Tới ngày')"/>
                    </div>
                    <div style="min-width: 155px;padding-top: 5px;">
                      <button class="btn v-yellow-btn mrr10 inline-block" type="button" @click="getData">{{__t('home.loc')}}</button>
                      <button class="btn btn-default inline-block" type="button" @click="resetFilter">{{__t('home.reset')}}</button>
                    </div>
                  </div>
                </td>
              </tr>
            </thead>
            <tbody>
              <template v-if="Visit && Visit.length">
                <tr class="custom-table-head" style="background-color: #337AB7 !important;">
                  <td><b>{{__t('Stt')}}</b></td>
                  <td><b>{{__t('Mã hồ sơ')}}</b></td>
                  <td><b>{{__t('Thời gian thăm khám')}}</b></td>
                  <td class="no-wrap"><b>{{__t('Mã tiếp nhận')}}</b></td>
                  <td class="no-wrap"><b>{{__t('Trạng thái')}}</b></td>
                  <td align="center"><b>{{__t('Loại thăm khám')}}</b></td>
                  <td width="250" class="no-wrap"><b>{{__t('Chuyên khoa khám')}}</b></td>
                  <td><b>{{__t('BS Chính')}}</b></td>
                  <td><b>{{__t('ĐD Tiếp nhận')}}</b></td>
                  <td align="center"><b>{{__t('Chi tiết')}}</b></td>
                </tr>
                <tr :data="item" :key="((parameters.pageNumber - 1) * parameters.PageSize) + (index + 1)" v-for="(item ,index) in Visit.filter(e => e.Assessment !== 'Điều trị nội trú')">
                  <td width="1" align="center">{{((parameters.pageNumber - 1) * parameters.PageSize) + (index + 1)}}</td>
                  <td width="1">
                    {{ item.RecordCode }}
                    <button v-permissions="'GUNLK1'" v-if="['OPD'].includes(item.Type)" @click="unlock(item)" title="Mở khóa hồ sơ cho bác sĩ chính" class="btn v-yellow-btn btn-xs" type="button">
                      <i aria-hidden="true" class="fa fa-key"></i>
                    </button>
                    <button v-if="item.Type !== 'EHOS'" v-permissions="'ADMINUPDATESTATUS'" title="Chỉnh sửa trạng thái" class="btn v-green-btn btn-xs" @click="handleChangeStatus(item.Type, item.Id, item.StatusId)"><i aria-hidden="true" class="fa fa-edit"></i></button>
                  </td>
                  <td align="center" width="1">{{ getFTime(item.ExaminationTime)}}</td>
                  <td width="1">{{ item.VisitCode }}</td>
                  <td width="1">{{__label({ViName: item.StatusViName, EnName: item.StatusEnName})}}</td>
                  <td width="1" align="center" v-if="item.Type !== 'EHOS'"><span :class="'visit-type-label label-' + item.Type">{{ item.Type }}</span></td>
                  <td width="1" align="center" v-else-if="item.Type !== 'VIHC'"><span :class="'visit-type-label label-' + item.Type">{{ item.Type }}</span></td>
                  <td width="1" align="center" v-else><span :class="'visit-type-label label-' + item.Type">{{ item.Type }}</span></td>
                  <td>
                    <span v-if="item.Type == 'EHOS'">{{item.ViName}}</span>
                    <span v-else-if="item.Type == 'VIHC'">ViHC/ {{item.PackageName}}</span>
                    <span v-else>{{__label({ViName: item.SpecialtyViName, EnName: item.SpecialtyEnName})}} - {{item.SpecialtySiteApiCode}}</span>
                  </td>
                  <td>
                    <ad-Info :ad="item.Type == 'EHOS' ? item.Username : item.DoctorUsername"/> <template v-if="item.AuthorizedDoctorUsername">/ <ad-Info :ad="item.AuthorizedDoctorUsername"/></template>
                  </td>
                  <td>
                    <ad-Info :ad="item.NurseUsername" />
                  </td>
                  <td v-if="tomtatthongtinnguoibenh" width="100" style="text-align: center;">
                    <router-link v-if="item.Type !== 'VIHC'" target='_blank' :VisitType="item.Type" :to="{name: 'LichSuKhamTaiVinmec', params: { Id: item.Id, Type: item.Type, VisitCode: item.VisitCode || 'N/A' }}">
                      <button class="btn v-yellow-btn" type="button">{{__t('Chi tiết')}}</button>
                    </router-link>
                    <button v-else @click="openPopupViHC(item)" class="btn v-yellow-btn" type="button">{{__t('Chi tiết')}}</button>
                  </td>
                  <td v-else width="1" style="text-align: center;">
                    <router-link target='_blank' v-if="item.Type == 'OPD' && item.IsPreAnesthesia === true" :to="{name: 'OPDRECORDCheck', params: { Id: item.Id, isPreAnesthesia: item.IsPreAnesthesia }}">
                      <button class="btn v-yellow-btn" type="button">{{__t('Chi tiết')}}</button>
                    </router-link>
                    <router-link target='_blank' v-else-if="item.Type == 'OPD'" :to="{name: 'OPDRECORD', params: { Id: item.Id, isPreAnesthesia: item.IsPreAnesthesia }}">
                      <button class="btn v-yellow-btn" type="button">{{__t('Chi tiết')}}</button>
                    </router-link>
                    <router-link target='_blank' v-if="item.Type == 'ED'" :to="{name: 'EDRECORD', params: { Id: item.Id }}">
                      <button class="btn v-yellow-btn" type="button">{{__t('Chi tiết')}}</button>
                    </router-link>
                    <router-link target='_blank' v-if="item.Type == 'IPD'" :to="{name: 'IPDVIEWDETAIL', params: { Id: item.Id }}">
                      <button class="btn v-yellow-btn" type="button">{{__t('Chi tiết')}}</button>
                    </router-link>
                    <router-link target='_blank' v-if="item.Type == 'EOC'" :to="{name: 'EOCRECORD', params: { Id: item.Id }}">
                      <button class="btn v-yellow-btn" type="button">{{__t('Chi tiết')}}</button>
                    </router-link>
                    <button v-if="item.Type == 'EHOS'" @click="openEhosView(item)" class="btn v-yellow-btn" type="button">{{__t('Chi tiết')}}</button>
                    <button v-if="item.Type == 'VIHC'" @click="openPopupViHC(item)" class="btn v-yellow-btn" type="button">{{__t('Chi tiết')}}</button>
                    <!-- GUNLK1 -->
                  </td>
                </tr>
              </template>
              <template v-else>
                <tr>
                  <td colspan="9" class="text-center">{{__t('Không có dữ liệu')}}</td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>
      <modal name="ehosView" width="800" transition="pop-out" height="auto">
        <div class="box v-model-content-popup">
          <div class="box-header text-center">
            <h3 class="box-title">{{__t('Thông tin lượt khám từ EHOS')}}</h3>
          </div>
          <div class="box-body padding-15">
            <EhosView :Data="ehosItem" />
          </div>
          <div class="box-footer padding-15">
            <div class="row">
              <div class="col-md-12"><button type="button" class="btn btn-block" @click="$modal.hide('ehosView')">{{__t('Đóng')}}</button></div>
            </div>
          </div>
        </div>
      </modal>
      <PopupViHC v-if="vihcItem.VisitCode && showPopupViHC" @closePopup="showPopupViHC = false" :vihcItem="vihcItem"/>
      <popup-change-status :VisitType="TypeBN" :DataStatus="DataStatus" :PID="PID" @handleResetData="getData"/>
    </template>
    <div v-else class="loading-text"><v-loading/></div>
  </div>
</template>

<script>
import MedicalRecordsV3 from '@/services/MedicalRecordsV3'
import MedicalRecords from '@/services/MedicalRecords'
import UnlockForm from '@/services/UnlockForm'
import EDStatus from '@/services/ED/EDStatus'
import Specialty from '@/services/Specialities'
import VDatePicker from '@/components/VDateTimePicker.vue'
import VSelect from '@/components/VSelect.vue'
import storage from '@/lib/storage'
import EhosView from './EhosView.vue'
import PopupViHC from '@/pages/MedicalRecords/popup/PopupViHC'
import PopupChangeStatus from './popup/PopupChangeStatus.vue'
import MDTimeLine from '@/pages/MedicalRecords/MDTimeLine.vue'
import $ from 'jquery'
import VText from '@/components/Form/Input/VText.vue'
// import moment from 'moment'
export default {
  name: 'Patient-Records',
  props: ['tomtatthongtinnguoibenh'],
  data () {
    return {
      Notes: [
        {
          id: 1,
          ViName: 'Khám bệnh/ Thực hiện phẫu thuật/thủ thuật tại bệnh viện',
          EnName: 'Khám bệnh/ Thực hiện phẫu thuật/thủ thuật tại bệnh viện',
          selected: false
        },
        {
          id: 2,
          ViName: 'Nhập viện nội trú',
          EnName: 'Nhập viện nội trú',
          selected: false
        },
        {
          id: 3,
          ViName: 'Hội chẩn',
          EnName: 'Hội chẩn',
          selected: false
        },
        {
          id: 4,
          ViName: 'Cấp lại giấy tờ cho bệnh nhân',
          EnName: 'Cấp lại giấy tờ cho bệnh nhân',
          selected: false
        },
        {
          id: 5,
          ViName: 'Giải quyết sự cố hoặc phàn nàn của bệnh nhân',
          EnName: 'Giải quyết sự cố hoặc phàn nàn của bệnh nhân',
          selected: false
        },
        {
          id: 6,
          ViName: 'Đánh giá tuân thủ hồ sơ bệnh án',
          EnName: 'Đánh giá tuân thủ hồ sơ bệnh án',
          selected: false
        },
        {
          id: 7,
          ViName: 'Đánh giá tuân thủ quy trình chuyên môn',
          EnName: 'Đánh giá tuân thủ quy trình chuyên môn',
          selected: false
        },
        {
          id: 8,
          ViName: 'Giải trình cho Bảo hiểm',
          EnName: 'Giải trình cho Bảo hiểm',
          selected: false
        },
        {
          id: 9,
          ViName: 'Kiểm tra định kỳ/đột xuất (JCI, SYT, Bảo hiểm..v.v..)',
          EnName: 'Kiểm tra định kỳ/đột xuất (JCI, SYT, Bảo hiểm..v.v..)',
          selected: false
        },
        {
          id: 10,
          ViName: 'Nghiên cứu khoa học',
          EnName: 'Nghiên cứu khoa học',
          selected: false
        },
        {
          id: 12,
          ViName: 'IT hỗ trợ người dùng',
          EnName: 'IT hỗ trợ người dùng',
          selected: false
        },
        {
          id: 11,
          ViName: 'Khác (Ghi rõ…..)',
          EnName: 'Khác (Ghi rõ…..)',
          selected: false
        }
      ],
      OtherNote: '',
      hasNote: false,
      parameters: {
        status: [],
        recordCode: null,
        visitCode: null,
        visitTypeGroupCode: [],
        specialty: [],
        startExaminationTime: null,
        endExaminationTime: null,
        pageNumber: 1,
        pages: 1,
        PageSize: 99999
      },
      Records: {
        Visit: []
      },
      Visit: [],
      ListStatus: [],
      ListSpecialties: [],
      ListVisitType: [
        {
          label: 'ED - Cấp cứu',
          value: 'ED'
        },
        {
          label: 'OPD - Ngoại trú',
          value: 'OPD'
        },
        {
          label: 'IPD - Nội trú',
          value: 'IPD'
        }
      ],
      Id: '',
      ehosItem: {},
      DataStatus: [],
      TypeBN: '',
      PID: '',
      DataTimeLine: null,
      timeline: false,
      loaded: false,
      vihcItem: {},
      showPopupViHC: false
    }
  },
  components: {
    VDatePicker, VSelect, EhosView, PopupChangeStatus, MDTimeLine, VText, PopupViHC
  },
  mounted () {
    if (this.CurrentPatientObj && this.CurrentPatientObj.PID) {
      this.Id = this.CurrentPatientObj.PID
    } else {
      this.Id = this.$route.params.Id
    }
    this.getStatus()
    this.getSpecialties()
    this.getData()
    this.getTimeLine()
  },
  computed: {
    width () {
      return $('.container').width() / 2
    }
  },
  methods: {
    unlock (item) {
      if (item.DoctorUsername) {
        this.$modal.show('dialog', {
          title: 'Mở khóa PHIẾU KHÁM NGOẠI TRÚ',
          text: 'Thao tác này sẽ mở khóa PHIẾU KHÁM NGOẠI TRÚ cho bác sĩ ' + item.DoctorUsername,
          class: 'v-dialog v-dialog-warning',
          buttons: [
            {
              title: 'OK',
              class: 'btn btn-warning',
              handler: () => {
                this.$modal.hide('dialog')
                this.unlockDoctor(item)
              }
            },
            {
              title: 'Hủy',
              class: 'btn',
              handler: () => {
                this.$modal.hide('dialog')
              }
            }
          ]
        })
      } else {
        this.alert('Thông báo', 'Hồ sơ này chưa có bác sĩ')
      }
    },
    unlockDoctor (item) {
      console.log(item)
      new UnlockForm().create({Id: item.Id}).then(() => {
        this.toastedSuccess('Mở khóa hồ sơ thành công')
      })
    },
    openEhosView (item) {
      this.$modal.show('ehosView')
      this.ehosItem = item
    },
    openPopupViHC (item) {
      this.vihcItem = item
      this.showPopupViHC = true
      setTimeout(() => {
        this.$modal.show('PopupViHC')
      }, 500)
    },
    hasSelectNote () {
      var hasOtherNote = this.Notes.find(e => e.selected && e.id === 11)
      var hasNote = this.Notes.find(e => e.selected && e.id !== 11)
      var OtherNote = this.OtherNote
      return (hasOtherNote && OtherNote) || (!hasOtherNote && hasNote)
    },
    resetFilter () {
      this.parameters = {
        status: [],
        visitCode: null,
        recordCode: null,
        visitTypeGroupCode: [],
        specialty: [],
        startExaminationTime: null,
        endExaminationTime: null,
        pageNumber: 1,
        pages: 1,
        PageSize: process.env.PAGE_SIZE
      }
      this.getData()
    },
    getStatus () {
      var fromStorage = storage.get('AllStatus')
      if (!fromStorage) {
        new EDStatus({'visit_type_group': ''}).all().then(r => {
          r.forEach(option => {
            this.ListStatus.push({
              label: option.Code + ' - ' + option.ViName,
              EnLabel: option.Code + ' - ' + option.EnName,
              value: option.Id,
              group: option.Code,
              StatusCode: option.StatusCode
            })
          })
          storage.set('AllStatus', JSON.stringify(this.ListStatus))
        })
      } else {
        this.ListStatus = fromStorage
      }
    },
    getSpecialties () {
      new Specialty().all().then(r => {
        r.forEach(option => {
          this.ListSpecialties.push({
            label: option.SiteName + ' - ' + option.ViName,
            EnLabel: option.SiteName + ' - ' + option.EnName,
            value: option.Id
          })
        })
      })
    },
    updateQuery () {
      return Object.assign({}, this.parameters, {
        status: this.parameters.status.map(e => { return e.value }),
        visitCode: this.parameters.visitCode,
        recordCode: this.parameters.recordCode,
        visitTypeGroupCode: this.parameters.visitTypeGroupCode.map(e => { return e.value }),
        specialty: this.parameters.specialty.map(e => { return e.value }),
        startExaminationTime: this.parameters.startExaminationTime,
        endExaminationTime: this.parameters.endExaminationTime
      })
    },
    getData () {
      new MedicalRecordsV3(this.updateQuery())
        .find(this.Id)
        .then(response => {
          this.Visit = response || []
          var bonussssss = 1
          if ((response.count % this.parameters.PageSize) === 0) {
            bonussssss = 0
          }
          this.parameters.pages = parseInt(response.count / this.parameters.PageSize) + bonussssss
          this.loaded = true
        }).catch(e => {
          this.loaded = true
        })
    },
    getTimeLine () {
      new MedicalRecords(this.updateQuery())
        .find('V2/' + this.Id)
        .then(response => {
          this.DataTimeLine = response
        })
    },
    handleChangeStatus (type, id, statusId) {
      this.TypeBN = type
      this.PID = id
      var DataStatus = storage.get('AllStatus')
      this.DataStatus = DataStatus.map(e => {
        e.DataType = 'Radio'
        e.Value = statusId === e.value
        return e
      }).filter(e => e.group === type)
      this.$modal.show('ChangeStatus')
    }
  }
}
</script>
<style scoped lang="stylus">
  #patientRecords-page {
    .btn-change-status {
      width: 116px;
      margin-left: 10px;
      outline: none;
    }
    .mini-btn {
      width: 127px!important;
      height: 40px!important;
      font-weight: bold!important;
      color: #1a1a1a!important;
      border-radius: 4px!important;
      line-height: 0.8!important;
      box-shadow: 1px 0px 2px 0px #ccc!important;
      background: #fff!important;
    }
    .active {
      background-color: #1375ba!important;
      color: #fff!important;
    }
  }
  .label-VIHC {
    background-color: #2098DB;
    color: #fff;
  }
</style>
