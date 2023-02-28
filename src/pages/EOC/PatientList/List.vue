<template>
    <form v-on:submit.prevent="filterByText(parameters.search, true)">
      <table class="table table-striped table-bordered v-table" id="customer-tbl">
        <thead class="bg-1375ba">
          <tr>
            <td colspan="7">
              <form class="form-inline form-inline2">
                <div class="form-group" v-if="status.length">
                  <v-select :multi="true" v-model="parameters.emergencyStatus" :items="status" :placeholder="__t('home.trang_thai')"/>
                </div>
                <div class="form-group">
                  <v-date-picker v-model="parameters.StartAdmittedDate" :format="vDateTimeFormat" :placeholder="__t('Từ ngày')"/>
                  <v-date-picker v-model="parameters.EndAdmittedDate" :format="vDateTimeFormat" :placeholder="__t('Đến ngày')"/>
                </div>
                <div class="form-group">
                  <users-ad v-model="parameters.User" ref="userAd"/>
                </div>
                <div class="form-group">
                  <button class="btn v-yellow-btn" type="button" @click="btnGetData">{{__t('home.loc')}}</button>
                </div>
                <div class="form-group pull-right">
                  <button class="btn btn-default pull-right" type="button" @click="resetFilter">{{__t('home.reset')}}</button>
                </div>
              </form>
            </td>
          </tr>
          <tr class="table__title--center">
            <th>STT</th>
            <th class="no-wrap">{{__t('Thông tin bệnh nhân')}}</th>
            <th class="no-wrap">{{__t('Người đánh giá')}}</th>
            <th class="no-wrap">{{__t('Bác sĩ khám')}}</th>
            <th class="no-wrap">{{__t('Trạng thái')}}</th>
            <th class="no-wrap">{{__t('Tiếp nhận')}}</th>
            <th width="1px"></th>
          </tr>
        </thead>
        <tbody>
          <template v-if="ED.length">
            <tr :data="item" :key="((parameters.pageNumber - 1) * parameters.PageSize) + (index + 1) + item.Id" v-for="(item ,index) in ED">
              <td width="1px" align="center" :class="{'no-visit': !item.VisitCode, 'no-pid': !item.Customer.PID}" class="boder-left">{{((parameters.pageNumber - 1) * parameters.PageSize) + (index + 1)}}</td>
              <td>
                PID: <b><pid :PID="item.Customer.PID" :noPidmsg="'Chưa đồng bộ PID'" />
                <i v-if="item.VisitCode">({{item.VisitCode}})</i>
                <i v-else class="highlighted-text no-wrap">
                  <router-link :to="{name: 'EOCCustomerInfo', params: { Id: item.Id }, query: { showSync: true}}">
                    {{__t('Chưa có mã tiếp nhận')}} <span class="glyphicon glyphicon-pencil"></span>
                  </router-link>
                </i>
                - <router-link class="no-wrap" :to="{name: 'EOCAllDetail', params: { Id: item.Id }}">{{item.Customer.Fullname}} <VipIcon :data="item.Customer" /><template v-if="item.VisitAllergy && item.VisitAllergy.IsAllergy"><AllergyLabel :data="item.VisitAllergy"/></template><label v-if="item.IsFallRiskScreening" class="label label-warning ml-5">NB có nguy cơ ngã</label></router-link></b>
                <div>
                  {{item.Customer.DateOfBirth || 'N/A'}} - {{item.Customer.Phone || 'N/A'}}
                  <router-link :to="{name: 'EOCCustomerInfo', params: { Id: item.Id }}">
                    <span class="glyphicon glyphicon-pencil"></span>
                  </router-link>
                </div>
                <span v-if="item.BookingTime" class="note-text warning">{{__t('Đặt hẹn lúc')}}: {{item.BookingTime}}</span>
              </td>
              <td>
                <ad-Info v-if="item.Nurse" :ad="item.Nurse" />
                <template v-else>NA</template>
              </td>
              <td>
                <template v-if="item.PrimaryDoctor">
                  <div  class="no-wrap display-inline">
                    <ad-Info :ad="item.PrimaryDoctor" />
                    <button class="btn btn-warning btn-xs" v-if="$store.state.account.Position.includes('Nurse') || $store.state.account.Position.includes('Administrator')" type="button" @click="syncHisDoctor(item)"><i class="fa fa-retweet" aria-hidden="true"></i></button>
                  </div>
                </template>
                <template v-else>
                  NA
                  <button class="btn btn-warning btn-xs" v-if="$store.state.account.Position.includes('Nurse') || $store.state.account.Position.includes('Administrator')" type="button" @click="syncHisDoctor(item)"><i class="fa fa-retweet" aria-hidden="true"></i></button>
                </template>
                <template v-if="item.AuthorizedDoctor">
                  <br/>
                  <div  class="no-wrap display-inline">
                    <ad-Info :ad="item.AuthorizedDoctor" />
                  </div>
                </template>
              </td>
              <td class="text-center" width="1px">
                <p class="no-margin">
                  <router-link :to="{name: 'EOCOutpatientExaminationNote', params: { Id: item.Id }}">
                    <b class="no-wrap">{{__label(item.EmergencyStatus)}}</b>
                  </router-link>
                </p>
              </td>
              <td width="1px" class="text-center">
                {{item.AdmittedDate}}
              </td>
              <td class="text-center" width="1">
                <context-menu  :Customer="{Version: item.Version, VisitCode: item.VisitCode, PID: item.Customer.PID}" :items="item.Link" :VisitId="item.Id" :Type="'EOC'"/>
              </td>
            </tr>
          </template>
          <template v-else>
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
          </tr>
        </tfoot>
      </table>
      <his-doctor ref="HisDoctor" @close="updateDoctor" />
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
import ContextMenu from '@/components/EOC/ContextMenu.vue'
import EocService from '@/services/EOC/Eoc'
import MixinMasterData from '@/mixins/masterdata.js'
import MixinView from '@/mixins/view.js'
import moment from 'moment'
import storage from '@/lib/storage'
import EDStatus from '@/services/ED/EDStatus'
import EventBus from '@/lib/eventBus'
import HisDoctor from '@/components/OPD/HisDoctor.vue'
import InitialAssessment from '@/services/EOC/InitialAssessment'
export default {
  /**
   * The name of the page.
   */
  name: 'OPDHomeIndex',
  mixins: [MixinMasterData, MixinView],
  data () {
    return {
      data: {
      },
      parameters: {
        type: 0,
        isTelehealth: false,
        search: null,
        emergencyStatus: [],
        aTSScale: [],
        pageNumber: 1,
        pages: 1,
        StartAdmittedDate: moment().subtract(7, 'day').startOf('day'),
        EndAdmittedDate: moment().endOf('day'),
        PageSize: process.env.PAGE_SIZE,
        User: null
      },
      ED: [],
      status: [],
      selectedVisitId: null
    }
  },
  /**
   * The components that the page can use.
   */
  components: {
    VSelect,
    VDatePicker,
    ContextMenu,
    HisDoctor
  },
  created () {
    this.init()
    EventBus.$on('updateSearchByName', this.filterByText)
    EventBus.$on('reloadData', this.getData)
  },
  destroyed () {
    EventBus.$off('updateSearchByName')
    EventBus.$off('reloadData')
  },
  computed: {
  },
  methods: {
    updateDoctor (item) {
      new InitialAssessment().update(this.selectedVisitId, item, '/ForShortTerm/PrimaryDoctor/').then(response => {
        this.getData()
        this.toastedSuccess()
      })
    },
    syncHisDoctor (item) {
      this.selectedVisitId = item.Id
      this.$refs.HisDoctor.open(item.PrimaryDoctor ? {Fullname: item.PrimaryDoctor, Id: item.PrimaryDoctorId} : {}, true)
    },
    async init () {
      await this.getStatus()
      // var UserPosition = localStorage.getItem('UserPosition')
      this.parameters.emergencyStatus = this.status.filter(e => ['Đang thực hiện dịch vụ'].includes(e.label))
      this.getData()
    },
    async getStatus () {
      var fromStorage = storage.get('EOCStatus')
      if (!fromStorage) {
        await new EDStatus({'visit_type_group': 'EOC'}).all().then(r => {
          r.forEach(option => {
            this.status.push({
              label: option.ViName,
              value: option.Id,
              selected: true
            })
          })
          storage.set('EOCStatus', JSON.stringify(this.status))
        })
      } else {
        this.status = fromStorage
      }
    },
    updateEdDone (ed) {
      this.getData()
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
        User: null
      }
      if (this.$refs.userAd) this.$refs.userAd.clear()
      EventBus.$emit('clearSearchByName', 'search')
      this.getData()
    },
    filterByText (search) {
      if (this.$refs.userAd) this.$refs.userAd.clear()
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
        User: null
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
      new EocService(this.updateQuery())
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
          this.parameters.pages = parseInt(response.count / this.parameters.PageSize) + bonussssss
        })
    }
  }
}
</script>
