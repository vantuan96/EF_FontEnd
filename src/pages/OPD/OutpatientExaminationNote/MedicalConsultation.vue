<template>
  <div class="main-content" id="OutpatientExaminationNote-page" v-if="loaded">
    <template v-if="DataSubmit.IsConsultation === true">
      <div>
        <initial-assessment :VisitId="$route.params.Id" :pkFormat="true"/>
        <template v-if="isPrimaryDoctorOrAuthorizedDoctor">
          <p
            style="background-color: #f8c736; padding: 5px"
            v-if="DataSubmit.locked"
          >
            <i aria-hidden="true" class="fa fa-warning"></i> Hồ sơ đã khóa 24h hoặc bạn không có quyền chỉnh sửa
          </p>
        <MedicalConsultationForm :readonly="false" :MASTERDATA="MASTERDATA" :DataSubmit="DataSubmit" :SyncHistoryOfPresentIllness="SyncHistoryOfPresentIllness"/>
        </template>
        <template v-else>
          <p
            style="background-color: #f8c736; padding: 5px"
            v-if="DataSubmit.locked"
          >
            <i aria-hidden="true" class="fa fa-warning"></i> Hồ sơ đã khóa 24h hoặc bạn không có quyền chỉnh sửa
          </p>
          <MedicalConsultationFormView :readonly="true" :MASTERDATA="MASTERDATA" :DataSubmit="DataSubmit" :SyncHistoryOfPresentIllness="SyncHistoryOfPresentIllness"/>
        </template>
      </div>
    </template>
    <template v-else>
      <div class="text-center">
        <h4>{{__t('Chưa có phiếu tư vấn')}}</h4>
        <button
          class="btn btn-green"
          type="button"
          @click="DataSubmit.IsConsultation !== true && setConsultation(true)"
          v-if="!IsLocked"
        >
          {{ __t("customer.btn_tao_moi") }} <i v-if="DataSubmit.IsConsultation === true" aria-hidden="true" class="fa fa-check"></i>
        </button>
      </div>
    </template>
    <FloatBlock v-if="isPrimaryDoctorOrAuthorizedDoctor && DataSubmit.IsConsultation === true">
      <template slot="top">
        <TranferMsg :data="DataSubmit.visit_transfer" />
        <div
          class="group-radio"
          :class="{
            readonly: DataSubmit.visit_transfer,
            'only-wr': onlyWr,
          }"
          v-if="DataSubmit.ListStatus"
        >
          <template v-for="(status, index) in DataSubmit.ListStatus.filter(e => (!['OPDAM', 'OPDTTE'].includes(e.Code)))">
            <input
              :data="status"
              :key="index"
              type="radio"
              :id="'a' + index"
              name="status"
              :value="status"
              v-model="DataSubmit.Status"
            />
            <label
              :class="'status-' + status.Code"
              :id="'status-' + status.Id"
              :key="'a' + index"
              :for="'a' + index"
              >{{ __label(status) }}</label
            >
          </template>
        </div>
      </template>
      <template slot="buttons">
        <div class="col-md-3"></div>
        <div class="col-md-3">
          <div class="form-group1">
            <button
              class="btn btn-block v-white-btn"
              type="button"
              @click="
                $router.push({
                  name: 'OPDMedicalReport',
                  params: { Id: $route.params.Id },
                })
              "
            >
              <i class="fa fa-file-o" aria-hidden="true"></i>
              {{ __t("Báo cáo y tế") }}
            </button>
          </div>
        </div>
        <div class="col-md-6">
          <div class="form-group1">
            <button
              v-if="
                DataSubmit.Status &&
                DataSubmit.Status.Code === 'OPDNE' &&
                !IsLocked
              "
              class="btn v-yellow-btn pull-right btn-block hvr-ripple-out"
              type="button"
              v-shortkey="['ctrl', 's']"
              @shortkey="noExaminationConfirm()"
              @click="noExaminationConfirm()"
            >
              <i class="fa fa-floppy-o" aria-hidden="true"></i>
              {{ __t("btn.luu") }}
            </button>
            <button
              v-else
              class="btn v-yellow-btn pull-right btn-block hvr-ripple-out"
              type="button"
              v-shortkey="['ctrl', 's']"
              @shortkey="submit()"
              @click="submit()"
            >
              <i class="fa fa-floppy-o" aria-hidden="true"></i>
              {{ __t("btn.luu") }}
            </button>
          </div>
        </div>
      </template>
    </FloatBlock>
    <FloatBlock v-else>
      <template slot="buttons">
        <div class="col-md-3"></div>
        <div class="col-md-3"></div>
        <div class="col-md-6">
          <div class="form-group1">
            <button
              class="btn btn-block v-white-btn"
              type="button"
              @click="
                $router.push({
                  name: 'OPDMedicalReport',
                  params: { Id: $route.params.Id },
                })
              "
            >
              <i class="fa fa-file-o" aria-hidden="true"></i>
              {{ __t("Báo cáo y tế") }}
            </button>
          </div>
        </div>
      </template>
    </FloatBlock>
    <!--:IsUseHandOverCheckList="IsUseHandOverCheckList" -->
    <logs
      :EdId="this.$route.params.Id"
      :Type="'OPD/OPDOutpatientExaminationNote'"
    />
    <div class="mg-bt-120"></div>
  </div>
  <div v-else class="text-center">
    <v-loading/>
  </div>
</template>
<script>
/* ============
 * Add cusotmer Page
 * ============
 *
 * The home index page.
 */
import InitialAssessment from '@/pages/OPD/InitialAssessment/View.vue'
import OutpatientExaminationNote from '@/services/OPD/OutpatientExaminationNote'
import VDateTimePicker from '@/components/VDateTimePicker.vue'
import MixinMasterData from '@/mixins/masterdata.js'
import MixinForm from '@/mixins/FormOutpatientExaminationNew.js'
import _ from 'lodash'
import TranferMsg from '@/components/TranferMsg.vue'
import Diorpt from '@/components/OPD/DI0RPT.vue'
// import moment from 'moment'
import ICD10Service from '@/services/ICD10'
import NProgress from 'nprogress'
import Logs from '@/components/Logs.vue'
import VSelectBox from '@/components/VSelect.vue'
import ListOfCurrentMedications from '@/components/ListOfCurrentMedications.vue'
import PatientProgressNotes from '@/pages/ProgressNote/PatientProgressNotesView.vue'
import MedicalConsultationFormView from '@/pages/OPD/OutpatientExaminationNote/MedicalConsultationFormView.vue'
import MedicalConsultationForm from '@/pages/OPD/OutpatientExaminationNote/MedicalConsultationForm.vue'
import InfoForm from '@/pages/OPD/OutpatientExaminationNote/Info.vue'
import ProblemList from '@/components/ProblemList.vue'
import StandingOrder from '@/components/OPD/StandingOrder.vue'
import EventBus from '@/lib/eventBus'
import $ from 'jquery'
import storage from '@/lib/storage'
import FloatingMenu from '@/components/FloatingMenu.vue'
import OutpatientExaminationNoteViewOnly from '@/components/OPD/OutpatientExaminationNoteForm.vue'
import Endoscopy from '@/components/Endoscopy.vue'
import OutpatientExaminationNoteInfo from '@/components/OPD/OutpatientExaminationNoteDoctorInfo.vue'
import KLSCODE from './KLSCode.js'
import VDateTimePicker3 from '@/components/VDateTimePicker3.vue'
// import utils from '../../../../PatientTrackingWebApp/src/utils'
// import iconNames from '@/plugins/icons.js'
// const icons = iconNames
//   .filter(name => name !== 'BIcon')
//   .sort()
//   .map(fullName => {
//     return {
//       component: fullName,
//       name: fullName
//         .replace(/^BIcon/, '')
//         .replace(/\B([A-Z])/g, '-$1')
//         .toLowerCase()
//     }
//   })
// console.log(icons)
const MODAL_WIDTH = 750
export default {
  /**
   * The name of the page.
   */
  name: 'OutpatientExaminationNote',
  mixins: [MixinMasterData, MixinForm],
  data () {
    return {
      checkMessage: 0,
      loaded: false,
      errors: [],
      modalWidth: MODAL_WIDTH,
      MenuItems: [],
      OPDOENPT0Timeout: null,
      CODE1: ['OPDOENKTT'],
      CODE1y: [
        'OPDOENKCBPK',
        'OPDOENBHC',
        'OPDOENKYT',
        'OPDOENKCGTG',
        'OPDOENKTD',
        'OPDOENKCX',
        'OPDOENKHD',
        'OPDOENKCY',
        'OPDOENKTN',
        'OPDOENKTRT',
        'OPDOENTTL'
      ],
      CODE1y_1: ['OPDOENKNKT'],
      CODE1_1: ['OPDOENTSKN', 'OPDOENTSK'],
      CODE2Adults: [
        // 'OPDOENBHC', 'OPDOENKYT', 'OPDOENKCGTG', 'OPDOENKTD', 'OPDOENKCX', 'OPDOENKHD',
        // 'OPDOENKCY', 'OPDOENKTN', 'OPDOENKTRT', 'OPDOENTTL'
      ],
      CODE2Child: [
        'OPDOENNGNG',
        'OPDOENNTTTXH',
        'OPDOENHVTTCY',
        'OPDOENCGXG',
        'OPDOENKTTPV',
        'OPDOENMSTTLCT'
      ],
      CODE3: ['OPDOENKTTTHGC', 'OPDOENDGCGNM', 'OPDOENDGDNM', 'OPDOENKLN'],
      CODE4: ['OPDOENKTM', 'OPDOENKHH'],
      OPDOENDG: [
        'OPDOENMCN',
        'OPDOENDCT',
        'OPDOENTDTT',
        'OPDOENTHCVD',
        'OPDOENPHCN'
      ],
      OPDOENDG1: ['OPDOENCNHH', 'OPDOENSCD', 'OPDOENKNGS', 'OPDOENTDNT'],
      OPDOENDG2: [
        'OPDOENKNGT',
        'OPDOENTTRLN',
        'OPDOENNTKG',
        'OPDOENDVTH',
        'OPDOENDCDL'
      ],
      CODE5: [
        'OPDOENCCQK',
        'OPDOENKTMH',
        'OPDOENKDD',
        'OPDOENTC',
        'OPDOENPTVD',
        'OPDOENPTTT'
      ],
      OPDOENTSSK: ['OPDOENTSSK', 'OPDOENTSKN', 'OPDOENTSK'],
      DataSubmit: null,
      options: [],
      pId: null,
      message: null,
      isErrorPop: false,
      SyncHistoryOfPresentIllness: null,
      HistoryOfAllergies: null,
      InitialAssessmentAllergies: null,
      SyncPastMedicalHistory: null,
      AdmittedCode: ['OPDOENRFT', 'OPDOENFP1', 'OPDOENPS1', 'OPDOENREC'],
      TransferToEDCode: ['OPDOENRFT2', 'OPDOENFP2', 'OPDOENPS2', 'OPDOENREC2'],
      InterHospitalTransferCode: [
        'OPDOENRH1',
        'OPDOENRFT3',
        'OPDOENTOT',
        'OPDOENSBC',
        'OPDOENTM1',
        'OPDOENME0',
        'OPDOENDU0',
        'OPDOENPSA'
      ],
      UpstreamDownstreamTransfer: [
        'OPDOENRH0',
        'OPDOENMTU',
        'OPDOENPS0',
        'OPDOENRFT1',
        'OPDOENTM0',
        'OPDOENNTM'
      ],
      isFirst: true,
      syncIcdInterval: null,
      syncIcdAt: null,
      syncOPDOENPT0At: null,
      OPDOENTUCO_TMP: [],
      MDITEMINFO: {},
      rawData: {},
      defaultData: {
        'xx': 12
      },
      IsUseHandOverCheckList: true,
      IsAcceptPhysician: false,
      IsAcceptNurse: false,
      IsReadOnLy: false,
      IsLocked: false
    }
  },
  /**
   * The components that the page can use.
   */
  components: {
    InitialAssessment,
    VDateTimePicker,
    Diorpt,
    VSelectBox,
    ListOfCurrentMedications,
    Logs,
    PatientProgressNotes,
    StandingOrder,
    FloatingMenu,
    OutpatientExaminationNoteViewOnly,
    OutpatientExaminationNoteInfo,
    TranferMsg,
    ProblemList,
    Endoscopy,
    MedicalConsultationForm,
    InfoForm,
    MedicalConsultationFormView,
    VDateTimePicker3
  },
  mounted () {
    this.getSpecialities()
    this.loadDoctorRecommenWithIcd10()
    this.getMasterDatas({ Form: 'OPDOEN' }, () => {
      this.getData()
    })
    this.modalWidth = window.innerWidth < MODAL_WIDTH ? '90%' : MODAL_WIDTH
    EventBus.$on('ICDUPDATED', this.updateIcd)
    new ICD10Service({ search: 'a' })
      .create({ search: 'a', pageSize: 25 })
      .then((res) => {
        this.options = res.map((e) => {
          return {
            code: e.Code,
            label: e.Code + ', ' + e.ViName
          }
        })
      })
  },
  watch: {
    'DataSubmit.Status' () {
      if (!this.isFirst) {
        setTimeout(() => {
          $('html, body').animate({ scrollTop: 99000 }, 500)
        }, 100)
        this.autoSaveDraft()
      }
      this.isFirst = false
    },
    MASTERDATA: {
      handler () {
        this.edited = true
        if (!this.isFirst) {
          this.autoSaveDraft()
        }
      },
      deep: true
    }
  },
  computed: {
    onlyWr () {
      return (
        this.MASTERDATA['OPDOENTFEOC'] &&
        this.MASTERDATA['OPDOENTFEOC'].Items.find((e) => e.Value) &&
        !this.DataSubmit.EOCInfo.IsDone
      )
    },
    isPrimaryDoctorOrAuthorizedDoctor: function () {
      var currentUser = this.$store.state.account.Username
      if (this.ImSuperAdmin()) return true
      if (this.DataSubmit.locked) return false
      if (
        this.DataSubmit.PrimaryDoctor &&
        this.DataSubmit.PrimaryDoctor.Username === currentUser
      ) { return true }
      if (
        this.DataSubmit.AuthorizedDoctor &&
        this.DataSubmit.AuthorizedDoctor.Username === currentUser
      ) { return true }

      return false
    },
    isPrimaryDoctor: function () {
      if (this.ImSuperAdmin()) return true
      var currentUser = this.$store.state.account.Username
      if (
        this.DataSubmit.PrimaryDoctor &&
        this.DataSubmit.PrimaryDoctor.Username === currentUser
      ) { return true }
      return false
    },
    hasShowDe: function () {
      return this.MASTERDATA['OPDOENTUCO'].Items.find((e) => e.Value)
    },
    OPDOENBMIlabel: function () {
      if (this.MASTERDATA['OPDOENTUOI'].Items[0].Value) {
        return 'BMI'
      }
      if (this.MASTERDATA['OPDOENTUOI'].Items[1].Value) {
        return 'BMI theo Z-score'
      }
      if (this.MASTERDATA['OPDOENTUOI'].Items[2].Value) {
        return 'Z-score theo cân nặng/tuổi, chiều/tuổi,cân nặng/chiều cao theo tuổi và giới'
      }
      return 'BMI'
    },
    OPDOENBMICalculation: function () {
      if (this.MASTERDATA['OPDOENTUOI'].Items[0].Value) {
        var weight = this.MASTERDATA['OPDOENWEI'].Items[0].Value
          ? parseFloat(this.MASTERDATA['OPDOENWEI'].Items[0].Value)
          : 0
        var height = this.MASTERDATA['OPDOENHEI'].Items[0].Value
          ? parseFloat(this.MASTERDATA['OPDOENHEI'].Items[0].Value) / 100
          : 0
        return (weight / (height * height)).toFixed(2)
      } else {
        return this.MASTERDATA['OPDOENBMI'].Items[0].Value
      }
    },
    bmiCalculation: function () {
      var weight = this.MASTERDATA['OPDOENWEI'].Items[0].Value
        ? parseFloat(this.MASTERDATA['OPDOENWEI'].Items[0].Value)
        : 0
      var height = this.MASTERDATA['OPDOENHEI'].Items[0].Value
        ? parseFloat(this.MASTERDATA['OPDOENHEI'].Items[0].Value) / 100
        : 0
      return (weight / (height * height)).toFixed(2)
    },
    getMDSPECIALITIESS: function () {
      var status = ''
      if (this.DataSubmit.Status) {
        status = this.DataSubmit.Status.Code === 'OPDAM' ? 'IPD' : 'ED'
      }
      return (this.getSpecialitiesInCurrentSite() || []).filter((e) => {
        return e.VisitTypeGroup === status
      })
    }
  },
  methods: {
    setForm () {
      console.log('2')
      if (this.$route.name === 'MedicalConsultation') {
        new OutpatientExaminationNote({IsConsultation: 'true'})
          .update('SetConsultation/' + this.$route.params.Id)
          .then(() => {
          })
      }
    },
    pushRoute () {
      this.$router.push({name: 'CustomerOPDInfo', params: {Id: this.$route.params.Id, Check: true}})
    },
    popUpWarning (message) {
      this.$modal.show('dialog', {
        clickToClose: false,
        title: this.__t('Thông báo'),
        text: this.__t(message),
        class: 'v-dialog v-dialog-warning',
        buttons: [
          {
            title: this.__t('Đồng bộ'),
            class: 'btn btn-warning',
            handler: () => {
              // this.pushRoute()
              this.$modal.hide('dialog')
              // var check = 0
              if (message === 'Vui lòng đồng bộ PID của NB!') {
                this.checkMessage = 1
              } else if (message === 'Vui lòng đồng bộ lượt tiếp nhận của NB!') {
                this.checkMessage = 2
              } else {
                this.checkMessage = 3
              }
              this.$router.push({
                name: 'CustomerOPDInfo',
                params: {Id: this.$route.params.Id, Check: this.checkMessage}
              })
            }
          },
          {
            title: this.__t('Quay lại'),
            class: 'btn',
            handler: () => {
              // this.back()
              this.$modal.hide('dialog')
            }
          }
        ]
      })
    },
    setConsultation (type) {
      this.$modal.show('dialog', {
        title: this.__t(
          'Thông báo'
        ),
        text: this.__t(`Bạn có chắc chắn sử dụng ${(type ? 'phiếu tư vấn' : 'phiếu khám ngoại trú')}`),
        class: 'v-dialog v-dialog-warning',
        buttons: [
          {
            title: this.__t('Tôi đồng ý'),
            class: 'btn bg-yellow',
            handler: () => {
              this.$modal.hide('dialog')
              new OutpatientExaminationNote({IsConsultation: type ? 'true' : 'false'})
                .update('SetConsultation/' + this.$route.params.Id)
                .then(() => {
                  this.reload()
                })
            }
          },
          {
            title: this.__t('Hủy bỏ'),
            class: 'btn',
            handler: () => {
              this.$modal.hide('dialog')
            }
          }
        ]
      })
    },
    onchangeOPDOENTUCO (item) {
      setTimeout(() => {
        var oldValue = item.Value
        var dataOldValue = oldValue ? oldValue.split(',\n') : []
        var defaultValueSelected = this.getSelectedValue()
        var newDataValue = dataOldValue.filter((e) => {
          return !this.OPDOENTUCO_TMP.find((ev) => {
            return ev.Data === e
          })
        })
        defaultValueSelected.forEach((d) => {
          if (!newDataValue.includes(d.Data)) {
            newDataValue.push(d.Data)
          }
        })
        item.Value = newDataValue ? newDataValue.join(',\n') : ''
      }, 100)
    },
    getSelectedValue () {
      var data = []
      this.MASTERDATA['OPDOENTUCO'].Items.forEach((item) => {
        var dataItem = item.Data.filter((e) => {
          return (
            !e.Code ||
            (e.Code === 'OPDOENCSMCYES' &&
              this.MASTERDATA['OPDOENCSMC'].Items[0].Value) ||
            (e.Code === 'OPDOENCSMCNOO' &&
              this.MASTERDATA['OPDOENCSMC'].Items[1].Value) ||
            (e.Code === 'OPDOENTRTRYES' &&
              this.MASTERDATA['OPDOENTRTR'].Items[0].Value) ||
            (e.Code === 'OPDOENTRTRNOO' &&
              this.MASTERDATA['OPDOENTRTR'].Items[1].Value) ||
            (e.Code === 'OPDOENBPSDYES' &&
              this.MASTERDATA['OPDOENBPSD'].Items[0].Value) ||
            (e.Code === 'OPDOENBPSDNOO' &&
              this.MASTERDATA['OPDOENBPSD'].Items[1].Value)
          )
        })
        if (item.Value) data = data.concat(dataItem)
      })
      return data
    },
    setDefaultValue (item) {
      // item.Value = item.Data
      if (!item.Data) return false
      var defaultData = this.JSONParse(item.Data) || []
      var input = item.Value
      var inputValue = input ? input.split(',\n') : []
      defaultData.forEach((e) => {
        if (!inputValue.includes(e)) input = (input || '') + ',\n' + e
      })
      input = this.trim_(input, ',\n')
      item.Value = input
    },
    copyOPDOENRFU (selectedValue) {
      if (!selectedValue) return
      var input = this.MASTERDATA['OPDOENRFU'].Items[0].Value
      var inputValue = input ? input.split('\n') : []
      selectedValue.forEach((e) => {
        if (!inputValue.includes(this.trim_(e, '\n'))) { input = (input || '') + '\n' + e }
      })
      input = this.trim_(input || '', '\n')
      this.MASTERDATA['OPDOENRFU'].Items[0].Value = input
    },
    updateIcd (value) {
      var icdSelected = value
        .map((e) => this.DoctorRecommendations[e.code])
        .filter((e) => e)
      this.copyOPDOENRFU(icdSelected)
    },
    setMenuItems () {
      this.MenuItems = [
        {
          ViName: 'Đánh giá chung',
          EnName: 'Đánh giá chung'
        },
        this.MASTERDATA['OPDOENPMH'],
        this.MASTERDATA['OPDOENPT0'],
        this.MASTERDATA['OPDOENDD0'],
        {
          ViName: 'Điều trị',
          EnName: 'Điều trị'
        }
      ]
    },
    showWithOPDOENDG () {
      return (
        this.MASTERDATA['OPDOENDG'].Items[0].Value ||
        this.MASTERDATA['OPDOENDG'].Items[2].Value
      )
    },
    hideWithOPDOENDG () {
      if (this.DataSubmit.Clinic) {
        return this.DataSubmit.Clinic.Code !== 'MultiSelect-001'
      }
      return false
    },
    isVaccine () {
      if (this.DataSubmit.Clinic) {
        return this.DataSubmit.Clinic.Data === 'VCHHN'
      }
      return false
    },
    isOPDOENKNKT () {
      if (this.DataSubmit.Clinic) {
        return this.DataSubmit.Clinic.Code === 'FreeTextOnly-007'
      }
      return false
    },
    hasKCK () {
      return (
        this.DataSubmit.Clinic &&
        [
          'FreeTextOnly-000',
          'FreeTextOnly-001',
          'FreeTextOnly-006',
          'RadioYesNo-001'
        ].includes(this.DataSubmit.Clinic.Code)
      )
    },
    checkbox2RadioOPDOENTUOI (items, item) {
      items.forEach((element) => {
        if (element.Code !== item.Code) {
          if (this.checkString(element.DataType, 'Radio')) {
            element.Value = false
          }
          if (this.checkString(element.DataType, 'Text')) {
            element.Value = ''
          }
          if (this.checkString(element.DataType, 'Select')) {
            element.Value = ''
          }
        }
      })
      setTimeout(() => {
        if (this.MASTERDATA['OPDOENTUOI'].Items[0].Value) {
          var weight = this.MASTERDATA['OPDOENWEI'].Items[0].Value
            ? parseFloat(this.MASTERDATA['OPDOENWEI'].Items[0].Value)
            : 0
          var height = this.MASTERDATA['OPDOENHEI'].Items[0].Value
            ? parseFloat(this.MASTERDATA['OPDOENHEI'].Items[0].Value) / 100
            : 0
          this.MASTERDATA['OPDOENBMI'].Items[0].Value = (
            weight /
            (height * height)
          ).toFixed(2)
        } else {
          return ''
        }
      }, 10)
    },
    showWithClinic (codes) {
      if (this.DataSubmit.Clinic && this.DataSubmit.Clinic.Code && codes) {
        var codess = codes.replace(/\s/g, '').split(',')
        return codess.includes(this.DataSubmit.Clinic.Code)
      }
      return false
    },
    checkInClinic (codes) {
      if (codes === null || codes === '' || this.DataSubmit.Clinic) {
        return true
      }
      if (this.DataSubmit.Clinic && this.DataSubmit.Clinic.Code) {
        var codess = codes.replace(/\s/g, '').split(',')
        return codess.includes(this.DataSubmit.Clinic.Code)
      }
      return true
    },
    syncGetAction () {
      this.$refs.ListOfCurrentMedications.sync()
    },
    noExaminationConfirm () {
      this.$modal.show('dialog', {
        title: this.__t(
          'Bạn có chắc chắn đây là bệnh nhân không sử dụng dịch vụ khám bệnh.'
        ),
        text: this.__t('Chú ý: Mọi thông tin nhập trên form sẽ bị xóa'),
        class: 'v-dialog v-dialog-warning',
        buttons: [
          {
            title: this.__t('Tôi đồng ý'),
            class: 'btn bg-yellow',
            handler: () => {
              this.$modal.hide('dialog')
              this.resetMdDataValue()
              this.submit()
            }
          },
          {
            title: this.__t('Hủy bỏ'),
            class: 'btn',
            handler: () => {
              this.$modal.hide('dialog')
            }
          }
        ]
      })
    },
    submit () {
      var DataSubmit = this.getDataSubmit()
      NProgress.start()
      setTimeout(() => {
        this.DataSubmit.Room = {}
        new OutpatientExaminationNote()
          .update(this.$route.params.Id, DataSubmit)
          .then((response) => {
            this.handlerResponse(response)
            // this.$router.push({name: 'etr', params: {Id: response.Id}})
            storage.removeItem(
              'OutpatientExaminationNote#' + this.$route.params.Id
            )
            this.toastedSuccess()
            if (this.$refs.ListOfCurrentMedications) this.$refs.ListOfCurrentMedications.submit(true)
            this.setLastData()
            this.rawData = this.cloneObj(this.DataSubmit)
            if (response.IsChronic) {
              EventBus.$emit('updateGlobalOpd', 'thangdc in here')
              this.$modal.show('dialog', {
                title: this.__t('Cảnh báo!'),
                text: this.__t('Đây là ca bệnh ngoại trú phức tạp.'),
                class: 'v-dialog v-dialog-warning',
                buttons: [
                  {
                    title: this.__t('Đi đến tóm tắt ca bệnh'),
                    class: 'btn bg-yellow',
                    handler: () => {
                      this.$modal.hide('dialog')
                      this.$router.push({
                        name: 'OPDComplexOutpatientCaseSummary',
                        params: { Id: this.$route.params.Id }
                      })
                    }
                  },
                  {
                    title: this.__t('Hủy bỏ'),
                    class: 'btn',
                    handler: () => {
                      this.$modal.hide('dialog')
                      this.reload()
                    }
                  }
                ]
              })
            } else {
              this.reload()
            }
          })
          .catch((e) => {
            this.edited = false
            if (e.data.IsErorr) {
              this.popUpWarning(e.data.ViMessage)
            }
            // console.log('catch')
            // this._401ResponseError(e)
          })
      }, 100)
    },
    validateForm () {
      $('.error').removeClass('error')
      if (
        this.DataSubmit.Status.Code === 'OPDIH' ||
        this.DataSubmit.Status.Code === 'OPDNE'
      ) { return true }
      var error = []
      $('#OutpatientExaminationNoteForm')
        .find('textarea')
        .each((e, elm) => {
          var val = $(elm).val() || ''
          if ($(elm).data('code') && !val.trim()) {
            if (
              this.DataSubmit.Status.Code === 'OPDWR' &&
              [
                'OPDOENTP0ANS',
                'OPDOENRFUANS',
                'OPDOENDORANS',
                'OPDOENPT0ANS',
                'OPDOENDD0ANS'
              ].includes($(elm).data('code'))
            ) {
              // pass
            } else {
              error.push(this.MDITEMINFO[$(elm).data('code')])
            }
          }
        })
      if (
        this.DataSubmit.Status.Code === 'OPDTTE' &&
        !this.MASTERDATA['OPDOENREC2'].Items[0].Value
      ) {
        error.push(this.MASTERDATA['OPDOENREC2'].Items[0])
      }
      if (
        this.DataSubmit.Status.Code === 'OPDIHT' &&
        !this.MASTERDATA['OPDOENTOT'].Items[0].Value
      ) {
        error.push(this.MASTERDATA['OPDOENTOT'].Items[0])
      }
      if (
        this.DataSubmit.Status.Code === 'OPDAM' &&
        !this.MASTERDATA['OPDOENREC'].Items[0].Value
      ) {
        error.push(this.MASTERDATA['OPDOENREC'].Items[0])
      }
      if (
        this.DataSubmit.Status.Code === 'OPDUDT' &&
        !this.MASTERDATA['OPDOENRFT1'].Items[0].Value &&
        !this.MASTERDATA['OPDOENRFT1'].Items[1].Value
      ) {
        error.push(this.MASTERDATA['OPDOENRFT1'])
      }
      if (
        this.DataSubmit.Status.Code === 'OPDUDT' &&
        !this.MASTERDATA['OPDOENTD0'].Items[0].Value
      ) {
        error.push(this.MASTERDATA['OPDOENTD0'].Items[0])
      }
      if (!this.isEHOS()) {
        if (
          this.DataSubmit.Status.Code !== 'OPDWR' &&
          !this.MASTERDATA['OPDOENICD'].Items[0].Value
        ) {
          error.push(this.MASTERDATA['OPDOENICD'].Items[0])
        }
      }
      if (this.DataSubmit.Status.Code === 'OPDWR' && this.DataSubmit && (this.DataSubmit.AppointmentDateResult === 'Invalid date' || !this.DataSubmit.AppointmentDateResult)) {
        const obj = {
          ViName: 'Ngày hẹn trả KQ',
          EnName: 'Appointment date result',
          Code: 'AppointmentDateResult'
        }
        error.push(obj)
      }
      this.errors = error
      if (this.errors.length) {
        this.handlerResponse({ Error: this.errors })
      }
    },
    validateFormConsultation () {
      if (
        this.DataSubmit.Status.Code === 'OPDIH' ||
        this.DataSubmit.Status.Code === 'OPDNE' ||
        this.DataSubmit.Status.Code === 'OPDWR'
      ) { return true }
      var error = []
      $('.error').removeClass('error')
      $('#OutpatientExaminationNoteForm #statusblock')
        .find('textarea')
        .each((e, elm) => {
          var val = $(elm).val() || ''
          if ($(elm).data('code') && !val.trim()) {
            if (
              this.DataSubmit.Status.Code === 'OPDWR' &&
              [
                'OPDOENTP0ANS',
                'OPDOENRFUANS',
                'OPDOENDORANS',
                'OPDOENPT0ANS',
                'OPDOENDD0ANS'
              ].includes($(elm).data('code'))
            ) {
              // pass
            } else {
              error.push(this.MDITEMINFO[$(elm).data('code')])
            }
          }
        })
      if (!this.MASTERDATA['OPDOENICD'].Items[0].Value) {
        error.push(this.MASTERDATA['OPDOENICD'].Items[0])
      }
      if (!this.MASTERDATA['OPDOENDD0'].Items[0].Value) {
        error.push(this.MASTERDATA['OPDOENDD0'].Items[0])
      }
      if (!this.MASTERDATA['OPDOENCC0'].Items[0].Value) {
        error.push(this.MASTERDATA['OPDOENCC0'].Items[0])
      }
      if (!this.MASTERDATA['OPDOENRFU'].Items[0].Value) {
        error.push(this.MASTERDATA['OPDOENRFU'].Items[0])
      }
      if (
        this.DataSubmit.Status.Code === 'OPDUDT' &&
        !this.MASTERDATA['OPDOENRFT1'].Items[0].Value &&
        !this.MASTERDATA['OPDOENRFT1'].Items[1].Value
      ) {
        error.push(this.MASTERDATA['OPDOENRFT1'])
      }
      if (
        this.DataSubmit.Status.Code === 'OPDUDT' &&
        !this.MASTERDATA['OPDOENTD0'].Items[0].Value
      ) {
        error.push(this.MASTERDATA['OPDOENTD0'].Items[0])
      }
      if (
        this.DataSubmit.Status.Code === 'OPDIHT' &&
        !this.MASTERDATA['OPDOENTOT'].Items[0].Value
      ) {
        error.push(this.MASTERDATA['OPDOENTOT'].Items[0])
      }
      var planOfCare = [
        this.MASTERDATA['OPDOEN251'].Items[0].Value,
        this.MASTERDATA['OPDOEN252'].Items[0].Value,
        this.MASTERDATA['OPDOEN253'].Items[0].Value,
        this.MASTERDATA['OPDOEN254'].Items[0].Value,
        this.MASTERDATA['OPDOEN256'].Items[0].Value,
        this.MASTERDATA['OPDOEN257'].Items[0].Value,
        this.MASTERDATA['OPDOEN259'].Items[0].Value,
        this.MASTERDATA['OPDOEN260'].Items[0].Value,
        this.MASTERDATA['OPDOEN261'].Items[0].Value,
        this.MASTERDATA['OPDOEN255'].Items[0].Value
      ]
      if (planOfCare.filter(e => e).length < 1) {
        error.push(this.MASTERDATA['OPDOEN267'])
      }
      this.errors = error
      console.log('errors: ', this.errors)
      if (this.errors.length) {
        this.handlerResponse({ Error: this.errors })
      }
    },
    getDataSubmit () {
      if (this.DataSubmit && this.DataSubmit.Status && this.DataSubmit.Status.Code !== 'OPDWR') {
        this.DataSubmit.AppointmentDateResult = ''
      }
      this.validateFormConsultation()
      this.DataSubmit.Datas = []
      this.DataSubmit.IsUseHandOverCheckList = this.IsUseHandOverCheckList
      this.DataSubmit._Exception = []
      var obj = {}
      for (const property in this.MASTERDATA) {
        this.MASTERDATA[property].Items.forEach((item) => {
          obj[item.Code] = item.Value
        })
      }
      for (const property in this.MASTERDATA) {
        if (
          this.MASTERDATA[property].Items &&
          this.checkInClinic(this.MASTERDATA[property].Clinic)
        ) {
          this.MASTERDATA[property].Items.forEach((item) => {
            var val = item.Value
            if (KLSCODE.KLSCODE.includes(property) && !obj['OPDOEN25002']) {
              val = null
            }
            if (item.Code === 'OPDOENICDANS' || item.Code === 'OPDOENICDOPT' || item.Code === 'OPDOENICD0101') {
              val = JSON.stringify(item.Value)
            }
            if (item.Code === 'OPDOENDORANS' && typeof item.Value === 'object') {
              val = this.moment2String(item.Value, this.vDateFormat)
            }
            if (item.Code === 'OPDOENTD0ANS' && typeof item.Value === 'object') {
              val = this.moment2String(item.Value)
            }
            obj[item.Code] = item.Value
            if (item.Code === 'OPDOEN262002' && !obj['OPDOEN262001']) {
              val = null
            }
            if (item.Code === 'OPDOEN263002' && !obj['OPDOEN263001']) {
              val = null
            }
            if (item.Code === 'OPDOEN264002' && !obj['OPDOEN264001']) {
              val = null
            }
            if (item.Code === 'OPDOEN265002' && !obj['OPDOEN265001']) {
              val = null
            }
            if (item.Code === 'OPDOEN266002' && !obj['OPDOEN266001']) {
              val = null
            }
            if (item.Code === 'OPDOEN251002' && !obj['OPDOEN251001']) {
              val = null
            }
            if (item.Code === 'OPDOEN253002' && !obj['OPDOEN253001']) {
              val = null
            }
            if (item.Code === 'OPDOEN261002' && !obj['OPDOEN261001']) {
              val = null
            }
            this.DataSubmit.Datas.push({
              Code: item.Code,
              Value: val
            })
            if (item.Code === 'OPDOENREC2ANS') {
              var objOPDOENREC2ANS = this.MDSPECIALITIES.find(
                (e) => e.Id === obj['OPDOENREC2ANS']
              )
              this.DataSubmit._Exception.push({
                key: '_OPDOENREC2ANS',
                value: objOPDOENREC2ANS ? objOPDOENREC2ANS.ViName : 'N/A'
              })
            }
            if (item.Code === 'OPDOENRECANS') {
              var objOPDOENRECANS = this.MDSPECIALITIES.find(
                (e) => e.Id === obj['OPDOENRECANS']
              )
              this.DataSubmit._Exception.push({
                key: '_OPDOENRECANS',
                value: objOPDOENRECANS ? objOPDOENRECANS.ViName : 'N/A'
              })
            }
          })
        }
      }

      var DataSubmit = Object.assign({}, this.DataSubmit)
      if (typeof DataSubmit.ExaminationTime === 'object') {
        DataSubmit.ExaminationTime = this.moment2String(
          DataSubmit.ExaminationTime
        )
      }
      if (
        DataSubmit.ExaminationTime &&
        this.rawData.ExaminationTime !== DataSubmit.ExaminationTime
      ) {
        DataSubmit._Exception.push({
          key: 'ExaminationTime',
          value: DataSubmit.ExaminationTime
        })
      }
      return DataSubmit
    },
    resetMdData (key) {
      if (!this.MASTERDATA[key]) return
      this.MASTERDATA[key].Items.forEach((item) => {
        item.Value = null
      })
      this.DataSubmit.Datas.forEach((item) => {
        if (item.Group === key) {
          item.Value = null
        }
      })
    },
    onSearch (search, loading) {
      this.search(loading, search, this)
    },
    search: _.debounce((loading, search, vm) => {
      new ICD10Service({ search: search, pageSize: 25 })
        .create({ search: search, pageSize: 25 })
        .then((res) => {
          vm.options = res.map((e) => {
            return {
              code: e.Code,
              label: e.Code + ', ' + e.ViName
            }
          })
        })
    }, 350),
    autoLoadOPDOENPT0 (loading) {
      if (this.MASTERDATA && this.MASTERDATA['OPDOENPT0']) {
        this.MASTERDATA['OPDOENPT0'].Items[0].Value = null
        new OutpatientExaminationNote({ hidemsg: true, noLoading: !loading })
          .create({ Id: this.$route.params.Id }, 'SyncPrincipalTest')
          .then((response) => {
            this.syncOPDOENPT0At = new Date()
            var val = response
            if (val) {
              this.MASTERDATA['OPDOENPT0'].Items[0].Value =
                JSON.stringify(response)
            }
            // this.OPDOENPT0Timeout = setTimeout(() => {
            //   this.autoLoadOPDOENPT0()
            // }, 30 * 1000)
          })
          .catch((e) => {
            console.log(e)
            // data[0].Value = ''
          })
      }
    },
    loadOPDOENHPI () {
      new OutpatientExaminationNote()
        .update('SyncHistoryOfPresentIllness/' + this.$route.params.Id)
        .then((response) => {
          this.SyncHistoryOfPresentIllness = response
          if (response.length === 0) {
            this.toastedInfo(
              this.__t('Không có thông tin khai thác bệnh sử trong 24h')
            )
          }
        })
        .catch((e) => {})
    },
    loadOPDOENHOA () {
      new OutpatientExaminationNote()
        .update('SyncHistoryOfAllergies/' + this.$route.params.Id)
        .then((response) => {
          this.HistoryOfAllergies = response.HistoryOfAllergies
          this.InitialAssessmentAllergies = response.InitialAssessmentAllergies
          if (this.HistoryOfAllergies.length === 0) {
            this.toastedInfo('Không có thông tin khai thác dị ứng')
          }
        })
        .catch((e) => {})
    },
    loadOPDOENPMH (data) {
      new OutpatientExaminationNote()
        .update('SyncPastMedicalHistory/' + this.$route.params.Id)
        .then((response) => {
          this.SyncPastMedicalHistory = response
          if (this.SyncPastMedicalHistory.length === 0) {
            this.toastedError(this.__t('Không có dữ liệu'))
          }
        })
        .catch((e) => {})
    },
    pushToOPDOENPT0 (pa) {
      var str1 = ''
      var str2 = ''
      if (pa[0]) {
        str1 = `${pa[0]}`
      }
      if (pa[1]) {
        str2 = `\nKết quả chẩn đoán hình ảnh: \n ${pa[1]}`
      }
      console.log(str1 + str2)
      this.MASTERDATA['OPDOENPT0'].Items[1].Value =
        (str1 ? 'Kết quả xét nghiệm: \n ' + str1 : '') + str2
      return str1 + str2
    },
    parserOPDOENPT0 (str) {
      if (!str) return ['', '']
      var parstring = str
        .replace('Kết quả xét nghiệm: \n', '')
        .split('Kết quả chẩn đoán hình ảnh: \n')
      if (parstring.length === 1) return ['', parstring[0]]
      return parstring
    },
    mapCDHAStr (oldstr, newstr, type) {
      newstr = '- ' + newstr
      if (type === 1) {
        if (this.hasCDHA(oldstr)) {
          oldstr = oldstr.replace(
            'Kết quả chẩn đoán hình ảnh:',
            `Kết quả chẩn đoán hình ảnh:\n${newstr}`
          )
        } else {
          if (this.hasKQXN(oldstr)) {
            oldstr = oldstr + '\nKết quả chẩn đoán hình ảnh:\n' + newstr
          } else {
            oldstr = 'Kết quả chẩn đoán hình ảnh:\n' + newstr + '\n' + oldstr
          }
        }
      }
      if (type === 2) {
        if (this.hasKQXN(oldstr)) {
          oldstr = oldstr.replace(
            'Kết quả xét nghiệm:',
            `Kết quả xét nghiệm:\n${newstr}`
          )
        } else {
          oldstr = 'Kết quả xét nghiệm:\n' + newstr + '\n' + oldstr
        }
      }
      this.MASTERDATA['OPDOENPT0'].Items[1].Value = this.trim_(oldstr, '\n')
    },
    hasKQXN (str) {
      return str.includes('Kết quả xét nghiệm:')
    },
    hasCDHA (str) {
      return str.includes('Kết quả chẩn đoán hình ảnh:')
    },
    copyToOPDOENICD (data) {
      this.MASTERDATA['OPDOENDD0'].Items.forEach((item) => {
        if (data.Diagnosis && item.Code === 'OPDOENDD0ANS') {
          item.Value = data.Diagnosis
        }
      })
      this.MASTERDATA['OPDOENICD'].Items.forEach((item) => {
        if (data.PrimaryICD && item.Code === 'OPDOENICDANS') {
          item.Value = data.PrimaryICD.filter((e) => e.code)
          console.log(item.Value)
        }
      })
    },
    copyToOPDOENPT0 (str, type) {
      str = this.trim_(str)
      if (
        this.MASTERDATA['OPDOENPT0'].Items[1].Value &&
        this.MASTERDATA['OPDOENPT0'].Items[1].Value.includes(str)
      ) {
      } else {
        var old = this.MASTERDATA['OPDOENPT0'].Items[1].Value
          ? this.trim_(this.MASTERDATA['OPDOENPT0'].Items[1].Value)
          : ''
        // var old = this.MASTERDATA['OPDOENPT0'].Items[1].Value ? (this.trim_(this.MASTERDATA['OPDOENPT0'].Items[1].Value) + ', ') : ''
        if (type) {
          this.mapCDHAStr(old, str, type)
        } else {
          this.MASTERDATA['OPDOENPT0'].Items[1].Value = this.trim_(
            old + str,
            ', '
          )
        }
      }
      this.toastedInfo('Đã copy')
    },
    copyToOPDOENHOA (str) {
      str = this.trim_(str)
      if (
        this.MASTERDATA['OPDOENHOA'].Items[0].Value &&
        this.MASTERDATA['OPDOENHOA'].Items[0].Value.includes(str)
      ) {
      } else {
        var old = this.MASTERDATA['OPDOENHOA'].Items[0].Value
          ? this.trim_(this.MASTERDATA['OPDOENHOA'].Items[0].Value) + ', '
          : ''
        this.MASTERDATA['OPDOENHOA'].Items[0].Value = this.trim_(
          old + str,
          ', '
        )
        this.toastedInfo('Đã copy')
      }
    },
    copyOPDOENPMH (str) {
      str = this.trim_(str)
      if (
        this.MASTERDATA['OPDOENPMH'].Items[0].Value &&
        this.MASTERDATA['OPDOENPMH'].Items[0].Value.includes(str)
      ) {
      } else {
        var old = this.MASTERDATA['OPDOENPMH'].Items[0].Value
          ? this.trim_(this.MASTERDATA['OPDOENPMH'].Items[0].Value) + '\n'
          : ''
        this.MASTERDATA['OPDOENPMH'].Items[0].Value = this.trim_(
          old + '-' + str,
          ', '
        )
        this.toastedInfo('Đã copy')
      }
    },
    copyToOPDOENHPI (str) {
      str = this.trim_(str)
      if (
        this.MASTERDATA['OPDOENHPI'].Items[0].Value &&
        this.MASTERDATA['OPDOENHPI'].Items[0].Value.includes(str)
      ) {
      } else {
        var old = this.MASTERDATA['OPDOENHPI'].Items[0].Value
          ? this.trim_(this.MASTERDATA['OPDOENHPI'].Items[0].Value) + '\n'
          : ''
        this.MASTERDATA['OPDOENHPI'].Items[0].Value = this.trim_(
          old + '-' + str,
          ', '
        )
        this.toastedInfo('Đã copy')
      }
    },
    SyncVisitHistory () {
      new OutpatientExaminationNote()
        .update('SyncVisitHistory', { Id: this.$route.params.Id })
        .then((response) => {
          this.HistoryOfAllergies = response.HistoryOfAllergies
          this.InitialAssessmentAllergies = response.InitialAssessmentAllergies
          this.SyncHistoryOfPresentIllness = response.HistoryOfPresentIllness
          this.SyncPastMedicalHistory = response.PastMedicalHistory
        })
    },
    getData () {
      this.OPDOENTUCO_TMP = []
      this.loaded = false
      this.MDITEMINFO = {}
      if (this.$route.params.Id) {
        new OutpatientExaminationNote()
          .find(this.$route.params.Id)
          .then((response) => {
            this.IsLocked = response.locked
            if (response.AppointmentDateResult) {
              response.AppointmentDateResult = this.$options.filters.formatDateWithoutSecon(response.AppointmentDateResult)
            }
            if (response.IscheckVisitPreAnes && response.ListStatus && response.ListStatus.length) {
              response.ListStatus = response.ListStatus.filter(e => {
                if (e.Code !== 'OPDAM' && e.Code !== 'OPDTTE' && e.Code !== 'OPDUDT' && e.Code !== 'OPDIHT') {
                  return e
                }
              })
            }
            this.DataSubmit = response
            EventBus.$emit('getHandOverCheckList', response)
            this.IsUseHandOverCheckList = this.DataSubmit.IsUseHandOverCheckList

            this.IsAcceptPhysician = response.IsAcceptPhysician
            this.IsAcceptNurse = response.IsAcceptNurse
            if (this.IsAcceptPhysician || this.IsAcceptNurse) {
              this.IsReadOnLy = true
            }

            if (this.IsUseHandOverCheckList === undefined || this.IsUseHandOverCheckList === null) {
              this.IsUseHandOverCheckList = true
            }
            if (!this.DataSubmit.ExaminationTime) {
              this.DataSubmit.ExaminationTime = new Date()
            } else {
              this.DataSubmit.ExaminationTime = this.string2Moment(
                this.DataSubmit.ExaminationTime
              )
            }
            this.DataSubmit.Room = this.Rooms.find(
              (e) => e.Id === this.DataSubmit.RoomId
            )
            for (const property in this.MASTERDATA) {
              if (property === 'OPDOENRFU') {
                this.MASTERDATA[property].ViName = 'Lời dặn chung (Hiển thị trên báo cáo y tế)'
                this.MASTERDATA[property].Items[0].ViName = 'Lời dặn chung (Hiển thị trên báo cáo y tế)'
              }
              if (property === 'OPDOENCC0') {
                this.MASTERDATA[property].ViName = 'Bệnh nhân/ Người giám hộ đến tư vấn về'
                this.MASTERDATA[property].Items[0].ViName = 'Bệnh nhân/ Người giám hộ đến tư vấn về'
              }
              if (property === 'OPDOENDOR') this.MASTERDATA[property].ViName = 'Bệnh nhân sẽ lên lịch hẹn để thảo luận về mối quan tâm khác vào *(Hiển thị trên báo cáo y tế)'
              if (this.MASTERDATA[property].Items) {
                this.MASTERDATA[property].Items.forEach((item) => {
                  this.$set(this.MDITEMINFO, item.Code, item)
                  if (property === 'OPDOENTUCO') {
                    item.Data = this.JSONParse(item.Data)
                    this.OPDOENTUCO_TMP = [
                      ...this.OPDOENTUCO_TMP,
                      ...item.Data
                    ]
                  }
                  var code = item.Code
                  var exited = _.find(this.DataSubmit.Datas, { Code: code })
                  if (exited) {
                    if (
                      this.checkString(item.DataType, 'CheckBox') ||
                      this.checkString(item.DataType, 'Radio')
                    ) {
                      var isTrue = exited.Value === 'True'
                      item.Value = isTrue
                    } else if (
                      item.Code === 'OPDOENICDANS' ||
                      item.Code === 'OPDOENICDOPT' ||
                      item.Code === 'OPDOENICD0101'
                    ) {
                      item.Value = this.JSONParse(exited.Value)
                    } else if (
                      exited.Value &&
                      (item.Code === 'OPDOENDORANS_' ||
                        item.Code === 'OPDOENTD0ANS')
                    ) {
                      item.Value = this.string2Moment(exited.Value)
                    } else {
                      item.Value = exited.Value
                      // if (!exited.Value && this.checkString(item.DataType, 'Text') && item.Data) {
                      //   console.log((JSON.stringify(item.Data)).join(', \n'))
                      //   item.Value = (JSON.stringify(item.Data)).join(', \n')
                      // }
                    }
                  } else {
                    item.Value = null
                    if (code === 'OPDOENICDANS') {
                      item.Value = [
                        {
                          code: 'Z71.9',
                          label: 'Z71.9, Tư vấn không đặc hiệu',
                          ViName: 'Tư vấn không đặc hiệu'
                        }
                      ]
                    }
                    if (code === 'OPDOENDD0ANS') {
                      item.Value = 'Tư vấn không đặc hiệu'
                    }
                    if (code === 'OPDOEN25001') {
                      item.Value = true
                    }
                  }
                })
              }
            }
            if (this.isEHOS() && this.isPrimaryDoctorOrAuthorizedDoctor) { this.autoSyncIcd() }
            if (this.isPrimaryDoctorOrAuthorizedDoctor) { this.autoLoadOPDOENPT0() }

            setTimeout(() => {
              this.setMenuItems()
              if (this.MASTERDATA['OPDOENYTD']) {
                if (!this.MASTERDATA['OPDOENYTD'].Items.find((e) => e.Value)) { this.MASTERDATA['OPDOENYTD'].Items[0].Value = true }
              }
              if (this.isPrimaryDoctorOrAuthorizedDoctor) { this.SyncVisitHistory() }
              // this.setLastData()
              this.rawData = this.cloneObj(this.DataSubmit)
              this.setLastData()
              if (this.isVaccine() && this.DataSubmit.IsNew && this.isPrimaryDoctorOrAuthorizedDoctor) {
                this.setDefaultsValue()
              }
              this.loaded = true
            }, 100)
          })
          .catch((e) => {
            console.log(e)
            if (e.status === 400) {
              this._404()
            }
          })
      }
    },
    setDefaultsValue () {
      for (const property in this.MASTERDATA) {
        if (this.MASTERDATA[property].Items) {
          this.MASTERDATA[property].Items.forEach((item) => {
            if (item.DefaultValue) item.Value = item.DefaultValue
          })
        }
      }
    },
    autoSyncIcd () {
      if (!this.$route.params.Id) return false
      new OutpatientExaminationNote({ hidemsg: true, noLoading: true })
        .update('SyncDiagnosisAndICD', { Id: this.$route.params.Id })
        .then((response) => {
          this.syncIcdAt = new Date()
          this.syncIcdInterval = setTimeout(() => {
            this.autoSyncIcd()
          }, 15 * 1000)
          if (response) {
            this.MASTERDATA['OPDOENID0'].Items.forEach((item) => {
              if (
                response.InitialDiagnosis &&
                item.Code === 'OPDOENID0ANS' &&
                !item.Value
              ) {
                item.Value = response.InitialDiagnosis
              }
            })
            this.MASTERDATA['OPDOENDD0'].Items.forEach((item) => {
              if (response.Diagnosis && item.Code === 'OPDOENDD0ANS') {
                item.Value = response.Diagnosis
              }
            })
            this.MASTERDATA['OPDOENICD'].Items.forEach((item) => {
              if (response.PrimaryICD && item.Code === 'OPDOENICDANS') {
                item.Value = response.PrimaryICD.filter((e) => e.code)
              }
              if (
                response.OptionICD &&
                item.Code === 'OPDOENICDOPT' &&
                (!item.Value || item.Value.length === 0)
              ) {
                item.Value = response.OptionICD.filter((e) => e.code)
              }
            })
          }
          if (
            this.MASTERDATA['OPDOENRFU'] &&
            !this.MASTERDATA['OPDOENRFU'].Items[0].Value
          ) {
            if (response.PrimaryICD && this.isNew) { this.updateIcd(response.PrimaryICD) }
            if (response.OptionICD && this.isNew) { this.updateIcd(response.OptionICD) }
          }
        })
    },
    autoSaveDraft () {
      // var DataSubmit = this.getDataSubmit()
      // setTimeout(() => {
      //   storage.set('OutpatientExaminationNote#' + this.$route.params.Id, JSON.stringify(DataSubmit))
      // }, 100)
    },
    getDataDraft () {
      return storage.get('OutpatientExaminationNote#' + this.$route.params.Id)
    },
    OPDOENICD01icdChange (value) {
      var val = (value || []).map(e => e.ViName)
      var currentValue = ''
      currentValue = this.MASTERDATA['OPDOENID0'].Items[0].Value || ''
      this.MASTERDATA['OPDOENID0'].Items[0].Value = ([currentValue].concat(val.filter(e => !currentValue.includes(e)))).filter(e => e).join(', ')
    }
  },
  beforeDestroy () {
    if (this.syncIcdInterval) clearTimeout(this.syncIcdInterval)
    if (this.OPDOENPT0Timeout) clearTimeout(this.OPDOENPT0Timeout)
    EventBus.$off('ICDUPDATED')
  }
}
</script>
