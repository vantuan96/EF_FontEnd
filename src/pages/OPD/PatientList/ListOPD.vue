<template>
    <form v-on:submit.prevent="filterByText(parameters.search, true)">
      <table class="table table-striped table-bordered v-table" id="customer-tbl">
        <thead class="bg-1375ba">
          <tr>
            <td colspan="8" style="padding-bottom: 0px;">
              <div class="flex space-between on-top">
                <div>
                  <div class="inline mrb10" v-if="ATSScales.length">
                    <v-select :multi="true" v-model="parameters.aTSScale" :items="ATSScales" :placeholder="__t('home.trang_thai_cap_cuu')"/>
                  </div>
                  <div class="inline mrb10">
                    <v-select :multi="true" v-model="parameters.emergencyStatus" :items="status" :placeholder="__t('home.trang_thai')"/>
                  </div>
                  <div class="inline mrb10">
                    <v-date-picker class="inline" v-model="parameters.StartAdmittedDate" :format="vDateTimeFormat" :placeholder="__t('Từ ngày')"/>
                    <v-date-picker class="inline" v-model="parameters.EndAdmittedDate" :format="vDateTimeFormat" :placeholder="__t('Đến ngày')"/>
                  </div>
                  <div class="inline mrb10" style="display: inline-block!important;">
                    <users-ad v-model="parameters.User" :styleUserAd="'min-width: 9vw!important;'" ref="userAd"/>
                  </div>
                  <div class="inline mrb10"><v-select v-model="parameters.type" :items="types"/></div>
                  <div class="inline mrb10">
                    <v-select :items="Clinics"
                    v-model="parameters.ClinicId"
                    :styleSelect="'width: 180px!important;margin-right: 0px;'"
                    :showGlyphicon="true"
                    :placeholder="__t('Phòng khám')" />
                  </div>
                </div>
                <div class="flex on-top">
                  <div class="mrr10">
                    <button class="btn v-yellow-btn" type="button" @click="btnGetData">{{__t('home.loc')}}</button>
                  </div>
                  <div>
                    <button class="btn btn-default" type="button" @click="resetFilter">{{__t('home.reset')}}</button>
                  </div>
                </div>
              </div>
            </td>
          </tr>
          <tr class="table__title--center">
            <th>STT</th>
            <th class="no-wrap">{{__t('Thông tin bệnh nhân')}}</th>
            <th class="no-wrap">{{__t('Tiếp nhận/ Đánh giá')}}</th>
            <th class="no-wrap">{{__t('Bác sĩ khám')}}</th>
            <th class="no-wrap">{{__t('Phòng khám')}}</th>
            <th class="no-wrap">{{__t('Trạng thái')}}</th>
            <th class="no-wrap">{{__t('Tiếp nhận')}}</th>
            <th width="1px"></th>
          </tr>
        </thead>
        <tbody>
          <template v-if="loading">
            <tr>
              <td colspan="7" class="text-center"><div class="text-center"><v-loading/></div></td>
            </tr>
          </template>
          <template v-if="ED.length && !loading">
            <tr :data="item" :key="((parameters.pageNumber - 1) * parameters.PageSize) + (index + 1) + item.Id" v-for="(item ,index) in ED">
              <td width="1px" align="center" :class="{'no-visit': !item.VisitCode, 'no-pid': !item.Customer.PID}" class="boder-left">{{((parameters.pageNumber - 1) * parameters.PageSize) + (index + 1)}}</td>
              <td>
                PID: <b><pid :PID="item.Customer.PID" :noPidmsg="'Chưa đồng bộ PID'" />
                <i v-if="item.VisitCode">({{item.VisitCode}})</i>
                <i v-else class="highlighted-text no-wrap">
                  <router-link :to="{name: 'CustomerOPDInfo', params: { Id: item.Id }, query: { showSync: true}}">
                    {{__t('Chưa có mã tiếp nhận')}} <span class="glyphicon glyphicon-pencil"></span>
                  </router-link>
                </i>
                - <router-link class="no-wrap" :to="{name: 'OPDDETAILGROUP', params: { Id: item.Id }}">{{item.Customer.Fullname}} <VipIcon :data="item.Customer" /><template v-if="item.VisitAllergy && item.VisitAllergy.IsAllergy"><AllergyLabel :data="item.VisitAllergy"/></template><label v-if="item.IsFallRiskScreening" class="label label-warning ml-5">NB có nguy cơ ngã</label></router-link></b>
                <div>
                  {{item.Customer.DateOfBirth || 'N/A'}} - {{item.Customer.Phone || 'N/A'}}
                  <router-link :to="{name: 'CustomerOPDInfo', params: { Id: item.Id }}">
                    <span class="glyphicon glyphicon-pencil"></span>
                  </router-link>
                </div>
                <span v-if="item.BookingTime" class="note-text warning">{{__t('Đặt hẹn lúc')}}: {{item.BookingTime}}</span>
                <span v-if="item.IsTelehealth">
                  <router-link :to="{name: 'OPDInitialAssessmentTelehealth', params: { Id: item.Id }}">
                    Telehealth
                    <i class="fa fa-check v-green" aria-hidden="true"></i>
                  </router-link>
                </span>
                <span v-if="item.IsRetailService">
                  <router-link :to="{name: 'OPDAssessmentForRetailServicePatient', params: { Id: item.Id }}">
                    NB dịch vụ lẻ
                    <i class="fa fa-check v-green" aria-hidden="true"></i>
                  </router-link>
                </span>
              </td>
              <td>
                <div class="d-flex flex-center justify-content-center">
                  <ad-Info v-if="item.UserReceiver" :ad="item.UserReceiver" />
                  <template v-else>N/A</template>
                  <p style="margin: 0 5px;">/</p>
                  <ad-Info v-if="item.UserLastDoAtnitialAssessment" :ad="item.UserLastDoAtnitialAssessment" />
                  <template v-else>N/A</template>
                </div>
              </td>
              <td>
                <template v-if="item.PrimaryDoctor">
                  <div  class="no-wrap display-inline">
                    <ad-Info :ad="item.PrimaryDoctor" />
                    <ChangeDoctorForm
                      v-if="$store.state.account.Position.includes('Nurse') || $store.state.account.Position.includes('Administrator')"
                      :VisitId="item.Id"
                      :Customer="item"
                    />
                  </div>
                </template>
                <template v-else>
                  NA
                  <ChangeDoctorForm
                    v-if="$store.state.account.Position.includes('Nurse') || $store.state.account.Position.includes('Administrator')"
                    :VisitId="item.Id"
                    :Customer="item"
                  />
                </template>
                <template v-if="item.AuthorizedDoctor">
                  <br/>
                  <div  class="no-wrap display-inline">
                    <ad-Info :ad="item.AuthorizedDoctor" />
                  </div>
                </template>
              </td>
              <td>{{item.Clinic ? item.Clinic.ViName : ''}}</td>
              <td class="text-center" width="1px">
                <p class="no-margin">
                  <router-link v-if="!item.IsAnesthesia && !item.IsConsultation && !item.IsTelehealth" :to="{name: 'OutpatientExaminationNote', params: { Id: item.Id }}">
                    <b class="no-wrap">{{__label(item.EmergencyStatus)}}</b>
                  </router-link>
                  <router-link v-else-if="!item.IsAnesthesia && !item.IsConsultation && item.IsTelehealth" :to="{name: 'TelehealthExaminationNote', params: { Id: item.Id }}">
                    <b class="no-wrap">{{__label(item.EmergencyStatus)}}</b>
                  </router-link>
                  <router-link v-else-if="!item.IsAnesthesia && item.IsConsultation" :to="{name: 'MedicalConsultation', params: { Id: item.Id }}">
                    <b class="no-wrap">{{__label(item.EmergencyStatus)}}</b>
                  </router-link>
                  <router-link v-else :to="{name: 'PreAnesthesiaConsultation', params: { Id: item.Id }}">
                    <b class="no-wrap">{{__label(item.EmergencyStatus)}}</b>
                  </router-link>
                </p>
              </td>
              <td width="1px" class="text-center">
                {{item.AdmittedDate}}
              </td>
              <td class="text-center" width="1">
                <context-menu :Customer="{Version: item.Version, VisitCode: item.VisitCode, PID: item.Customer.PID, PromissoryNote: item.PromissoryNote}" :items="item.Link" :IsAnesthesia="item.IsAnesthesia" :IsTelehealth="item.IsTelehealth" :EdId="item.Id" :Type="'OPD'"/>
              </td>
            </tr>
          </template>
          <template v-else-if="ED.length === 0 && !loading">
            <tr>
              <td colspan="7" class="text-center">{{__t('Không có dữ liệu')}}</td>
            </tr>
          </template>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="8">
              <paginate
              :clickHandler="getData"
              :container-class="'pagination pagination-sm no-margin v-pagination'"
              :next-text="'»'"
              :page-count="parameters.pages"
              :prev-text="'«'"
              v-if="ED.length > 0"
              v-model="parameters.pageNumber">
              </paginate>
            </td>
            <!-- <td>
              <div class="form-group pull-right">
                <button class="btn btn-default" type="button" @click="resetFilter">{{__t('home.reset')}}</button>
              </div>
            </td> -->
          </tr>
        </tfoot>
      </table>
      <!-- <dynamic-component :data="null" :type="'Video'" /> -->
    </form>
</template>
<script>
/* ============
 * Home Index Page
 * ============
 *
 * The home index page.
 */

import VSelect from '@/components/VSelect.vue'
// import DynamicComponent from '@/templates/Index.vue'
import VDatePicker from '@/components/VDateTimePicker.vue'
import ContextMenu from '@/components/OPD/ContextMenu.vue'
import OPDService from '@/services/OPD/OPD'
import MixinMasterData from '@/mixins/masterdata.js'
import MixinView from '@/mixins/view.js'
import moment from 'moment'
import storage from '@/lib/storage'
import EDStatus from '@/services/ED/EDStatus'
import EventBus from '@/lib/eventBus'
import ChangeDoctorForm from './ChangeDoctor'
export default {
  /**
   * The name of the page.
   */
  name: 'OPDHomeIndex',
  mixins: [MixinMasterData, MixinView],
  data () {
    return {
      isForm: null,
      data: {
      },
      types: [
        {
          value: 0,
          label: 'Tất cả'
        },
        {
          value: 1,
          label: 'Telehealth'
        },
        {
          value: 2,
          label: 'Dịch vụ lẻ'
        }
      ],
      parameters: {
        type: 0,
        isTelehealth: false,
        search: null,
        emergencyStatus: [
          {
            value: '0500d704-5ca9-4d9a-a50e-4df2f9eb93bd',
            label: 'Đang khám ngoại trú',
            searchableValue: 'dangnamngoaitru',
            selected: true
          }
        ],
        aTSScale: [],
        pageNumber: 1,
        pages: 1,
        StartAdmittedDate: moment().subtract(7, 'day').startOf('day'),
        EndAdmittedDate: moment().endOf('day'),
        PageSize: process.env.PAGE_SIZE,
        User: null,
        ClinicId: null
      },
      ED: [],
      ATSScales: [],
      status: [],
      countOfForm: 10,
      heightItemLi: 41,
      menuClass: '',
      menuTop: 0,
      loading: true
    }
  },
  /**
   * The components that the page can use.
   */
  components: {
    VSelect,
    VDatePicker,
    ContextMenu,
    ChangeDoctorForm
    // DynamicComponent
  },
  created () {
    this.getClinics()
    var UserPosition = localStorage.getItem('UserPosition')
    if (UserPosition && (UserPosition.split(',')).includes('Doctor')) {
      this.parameters.StartAdmittedDate = null
      this.parameters.emergencyStatus = [
        {
          value: '0500d704-5ca9-4d9a-a50e-4df2f9eb93bd',
          label: 'Đang khám ngoại trú',
          searchableValue: 'dangnamngoaitru',
          selected: true
        },
        {
          value: '4ac15bf9-716d-42c6-a010-18e734ba1a27',
          label: 'Chờ KQ CLS',
          searchableValue: 'NBchoKQXN',
          selected: true
        }
      ]
    }
    this.getEDStatus()
    this.getData()
    EventBus.$on('updateSearchByName', this.filterByText)
    EventBus.$on('reloadData', this.getData)
    // console.log('ON-OPD')
  },
  destroyed () {
    EventBus.$off('updateSearchByName')
    EventBus.$off('reloadData')
    // console.log('OFF-OPD')
  },
  computed: {
  },
  methods: {
    getEDStatus () {
      var fromStorage = storage.get('OPDStatus')
      if (!fromStorage) {
        new EDStatus({'visit_type_group': 'OPD'}).all().then(r => {
          r.forEach(option => {
            this.status.push({
              label: option.ViName,
              value: option.Id,
              selected: true,
              StatusCode: option.StatusCode
            })
          })
          storage.set('OPDStatus', JSON.stringify(this.status))
        })
      } else {
        this.status = fromStorage
      }
      if (this.$store.state.account.IsAnesthesia) {
        this.status = this.status.filter(e => {
          if (e.StatusCode !== 'OPDAM' && e.StatusCode !== 'OPDTTE' && e.StatusCode !== 'OPDUDT' && e.StatusCode !== 'OPDIHT') {
            return e
          }
        })
      }
    },
    updateEdDone (ed) {
      this.getData()
    },
    getStatus (item) {
      if (item.ATSScale) {
        return item.ATSScale
      }
    },
    resetFilter () {
      this.parameters = {
        search: null,
        emergencyStatus: [],
        aTSScale: [],
        pageNumber: 1,
        pages: 1,
        StartAdmittedDate: null,
        EndAdmittedDate: null,
        PageSize: process.env.PAGE_SIZE,
        isTelehealth: false,
        User: null,
        ClinicId: null
      }
      this.$refs.userAd.clear()
      EventBus.$emit('clearSearchByName', 'search')
      this.getData()
    },
    filterByText (search) {
      this.$refs.userAd.clear()
      this.parameters = {
        search: search,
        emergencyStatus: [],
        aTSScale: [],
        pageNumber: 1,
        pages: 1,
        StartAdmittedDate: null,
        EndAdmittedDate: null,
        PageSize: process.env.PAGE_SIZE,
        isTelehealth: false,
        User: null,
        ClinicId: null
      }
      this.getData()
    },
    updateQuery () {
      this.parameters.isTelehealth = false
      this.parameters.isRetailService = false
      var StartAdmittedDate = this.parameters.StartAdmittedDate
      var EndAdmittedDate = this.parameters.EndAdmittedDate
      if (typeof StartAdmittedDate === 'object') {
        StartAdmittedDate = this.moment2String(StartAdmittedDate)
      }
      if (typeof EndAdmittedDate === 'object') {
        EndAdmittedDate = this.moment2String(EndAdmittedDate)
      }
      if (this.parameters.type === 1) {
        this.parameters.isTelehealth = true
      }
      if (this.parameters.type === 2) {
        this.parameters.isRetailService = true
      }
      return Object.assign({}, this.parameters, {
        aTSScale: this.parameters.aTSScale.map(e => { return e.value }),
        emergencyStatus: this.parameters.emergencyStatus.map(e => { return e.value }),
        StartAdmittedDate: StartAdmittedDate,
        EndAdmittedDate: EndAdmittedDate
      })
    },
    btnGetData () {
      this.parameters.search = ''
      this.parameters.pages = 1
      this.parameters.pageNumber = 1
      EventBus.$emit('clearSearchByName', 'search')
      this.getData()
      // var t = null
      // console.log(t.abc)
    },
    getData () {
      new OPDService(this.updateQuery())
        .all()
        .then(response => {
          this.ED = response.results.map(e => {
            if (e.IsRetailService && e.EmergencyStatus.Code === 'OPDIH') {
              e.EmergencyStatus.ViName = 'Đang thực hiện DV lẻ'
            }
            return e
          }) || []
          var bonussssss = 1
          if ((response.count % this.parameters.PageSize) === 0) {
            bonussssss = 0
          }
          this.loading = false
          this.parameters.pages = parseInt(response.count / this.parameters.PageSize) + bonussssss
        })
    }
  }
}
</script>
