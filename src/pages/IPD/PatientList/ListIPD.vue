<template>
  <div class="main-content" id="home-page">
    <form v-on:submit.prevent="filterByText(parameters.search, true)">
      <table class="table table-striped table-bordered v-table" id="customer-tbl">
        <thead class="bg-1375ba">
          <tr>
            <td colspan="7">
              <form class="form-inline form-inline2">
                <div class="form-group" v-if="status.length">
                  <v-select :multi="true" v-model="parameters.EmergencyStatus" :items="status" :placeholder="__t('home.trang_thai')"/>
                </div>
                <div class="form-group">
                  <users-ad v-model="parameters.User" ref="userAd" :placeholder="__t('Điều dưỡng/ Bác sĩ')"/>
                </div>
                <div class="form-group">
                  <v-date-picker v-model="parameters.StartAdmittedDate" :format="vDateTimeFormat" :placeholder="__t('Từ ngày')"/>
                  <v-date-picker v-model="parameters.EndAdmittedDate" :format="vDateTimeFormat" :placeholder="__t('Đến ngày')"/>
                </div>
                <div class="form-group">
                  <label class="container-checkbox" style="margin: 0 8px 5px 10px;">
                    {{__t('HS nháp')}}
                    <input type="checkbox" v-model="parameters.IsDraft">
                    <span class="checkmark"></span>
                  </label>
                </div>
                <div class="form-group">
                <button class="btn v-yellow-btn" type="button" @click="btnGetData">{{__t('home.loc')}}</button>
                </div>
                <div class="form-group pull-right">
                <button class="btn btn-default" type="button" @click="resetFilter">{{__t('home.reset')}}</button>
                </div>
              </form>
            </td>
          </tr>
          <tr class="table__title--center">
            <th width="1px" class="no-wrap">STT</th>
            <th>{{__t('Thông tin người bệnh')}}</th>
            <th width="1px" class="no-wrap">{{__t('Tiếp nhận/ Đánh giá')}}</th>
            <th width="1px" class="no-wrap">{{__t('BS chính')}}</th>
            <th width="1px" class="no-wrap">{{__t('Trạng thái')}}</th>
            <th width="1px" class="no-wrap">{{__t('Tiếp nhận')}}</th>
            <th width="1px" class="no-wrap"></th>
          </tr>
        </thead>
        <tbody>
          <template v-if="loading">
            <tr>
              <td colspan="7" class="text-center"><div class="text-center"><v-loading/></div></td>
            </tr>
          </template>
          <template v-if="IPD.length && !loading">
            <tr :data="item" :key="((parameters.pageNumber - 1) * parameters.PageSize) + (index + 1) + item.Id" v-for="(item ,index) in IPD">
              <td width="40" align="center" :class="{'no-visit': !item.VisitCode, 'no-pid': !item.Customer.PID}" class="boder-left">{{((parameters.pageNumber - 1) * parameters.PageSize) + (index + 1)}}</td>
              <td>
                PID: <b> <pid :PID="item.Customer.PID" :noPidmsg="'Chưa đồng bộ PID'" /><i>({{item.VisitCode || __t('Chưa đồng bộ VisitCode')}})</i> - <span class="display-inline"><router-link class="no-wrap flex-box flex-center" :to="{name: 'IPDDETAILGROUP', params: { Id: item.Id }}">{{item.Customer.Fullname}}  <VipIcon :data="item.Customer" /> <DraftIcon class="ml-5" :data="item"/> <template v-if="item.VisitAllergy && item.VisitAllergy.IsAllergy"><AllergyLabel :data="item.VisitAllergy"/></template></router-link></span></b>
                <div>
                  {{item.Customer.DateOfBirth || 'N/A'}} - {{item.Customer.Phone || 'N/A'}}
                  <router-link v-if="item.MedicalRecordType && item.MedicalRecordType.length" :to="{name: getRouterName2(item.MedicalRecordType), params: { Id: item.Id }}">
                    <span class="glyphicon glyphicon-pencil"></span>
                  </router-link>
                  <span v-else style="color: #3c8dbc;" class="glyphicon glyphicon-pencil"></span>
                  <template v-if="!item.PermissionForVisitor"><label class="label label-warning label-warning-2">{{__t('Không thăm hỏi')}} <i class="fa fa-exclamation-triangle" aria-hidden="true"></i></label></template>
                </div>
              </td>
              <td class="text-center" width="1px">
                <div class="d-flex flex-center justify-content-center">
                  <ad-Info v-if="item.UserReceiver" :ad="item.UserReceiver" />
                  <template v-else>N/A</template>
                  <p style="margin: 0 5px;">/</p>
                  <ad-Info v-if="item.UserDoNormalInpatiens" :ad="item.UserDoNormalInpatiens" />
                  <template v-else>N/A</template>
                </div>
              </td>
              <td class="text-center" width="1px">
                <ad-Info v-if="item.PrimaryDoctor" :ad="item.PrimaryDoctor" />
                <template v-else>N/A</template>
              </td>
              <td class="text-center" width="1px">
                <p class="no-margin no-wrap" v-if="item.MedicalRecordType && item.MedicalRecordType.length">
                  <router-link :to="{name: getRouterName(item.MedicalRecordType), params: { Id: item.Id }}">
                    <b>{{__label(item.EmergencyStatus)}}</b>
                  </router-link>
                </p>
                <p class="no-margin no-wrap" v-else>
                  <b style="color: #3c8dbc;">{{__label(item.EmergencyStatus)}}</b>
                </p>
              </td>
              <td width="1px" class="text-center">
                {{item.AdmittedDate}}
              </td>
              <td class="text-center" width="45px">
                <context-menu :Customer="{Version: item.Version, VisitCode: item.VisitCode, PID: item.Customer.PID, MedicalRecordType: item.MedicalRecordType, AdmittedDate: item.AdmittedDate, HideFormNewborn: item.HideFormNewborn}" :VisitId="item.Id"/>
              </td>
            </tr>
          </template>
          <template v-if="IPD.length === 0 && !loading">
            <tr>
              <td colspan="7" class="text-center">{{__t('Không có dữ liệu')}}</td>
            </tr>
          </template>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="7">
              <paginate
              :clickHandler="getData"
              :container-class="'pagination pagination-sm no-margin v-pagination'"
              :next-text="'»'"
              :page-count="parameters.pages"
              :prev-text="'«'"
              v-if="IPD.length > 0"
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
    </form>
  </div>
</template>
<script>
/* ============
 * Home Index Page
 * ============
 *
 * The home index page.
 */

import VSelect from '@/components/VSelect.vue'
import VDatePicker from '@/components/VDateTimePicker.vue'
import ContextMenu from '@/components/IPD/ContextMenu.vue'
import IPDService from '@/services/IPD/IPD'
import MixinMasterData from '@/mixins/masterdata.js'
import MixinView from '@/mixins/view.js'
import moment from 'moment'
import storage from '@/lib/storage'
import EDStatus from '@/services/ED/EDStatus'
import EventBus from '@/lib/eventBus'
// let today = new Date()
const STRDEFAULTSTATUS = 'Đang nằm viện'
export default {
  /**
   * The name of the page.
   */
  name: 'HomeIPDIndex',
  mixins: [MixinMasterData, MixinView],
  data () {
    return {
      isForm: null,
      data: {
      },
      parameters: {
        search: null,
        EmergencyStatus: [
          {
            value: '6a30cd4c-3af7-4a72-9c4d-bbfec718b5a2',
            label: 'Đang nằm nội trú'
          },
          {
            value: 'de5ce2d3-15f2-4358-bde9-621e11e5841a',
            // label: 'NB chờ KQDV',
            label: 'Chờ KQ CLS'
          }
        ],
        status: [
        ],
        pageNumber: 1,
        pages: 1,
        StartAdmittedDate: '',
        EndAdmittedDate: '',
        PageSize: process.env.PAGE_SIZE,
        User: null,
        IsDraft: null
      },
      IPD: [],
      status: [],
      loading: true
    }
  },
  /**
   * The components that the page can use.
   */
  components: {
    VSelect,
    VDatePicker,
    ContextMenu
  },
  mounted () {
    this.getIPDStatus()
    this.getData()
    EventBus.$on('updateSearchIPDByName', this.filterByText)
  },
  destroyed () {
    EventBus.$off('updateSearchIPDByName')
    console.log('OFF-ED')
  },
  computed: {
  },
  methods: {
    getIPDStatus () {
      var fromStorage = storage.get('IPDStatus')
      if (!fromStorage) {
        new EDStatus({'visit_type_group': 'IPD'}).all().then(r => {
          r.forEach(option => {
            if (option.ViName === STRDEFAULTSTATUS) {
              this.parameters.EmergencyStatus = [{
                value: option.Id,
                label: STRDEFAULTSTATUS,
                searchableValue: 'dangnamvien',
                selected: true
              }]
            }
            this.status.push({
              label: option.ViName,
              value: option.Id
            })
          })
          storage.set('IPDStatus', JSON.stringify(this.status))
        })
      } else {
        this.status = fromStorage
        var defaultStatus = this.status.find(e => e.label === STRDEFAULTSTATUS)
        if (defaultStatus) {
          this.parameters.EmergencyStatus = [{
            value: defaultStatus.value,
            label: STRDEFAULTSTATUS,
            searchableValue: 'dangnamvien',
            selected: true
          }]
        }
      }
    },
    resetFilter () {
      this.parameters = {
        search: null,
        EmergencyStatus: [],
        pageNumber: 1,
        pages: 1,
        StartAdmittedDate: null,
        EndAdmittedDate: null,
        PageSize: process.env.PAGE_SIZE,
        User: null,
        IsDraft: null
      }
      this.$refs.userAd.clear()
      EventBus.$emit('clearSearchIPDByName', 'search')
      this.getData()
    },
    filterByText (search) {
      this.parameters = {
        search: search,
        EmergencyStatus: [],
        pageNumber: 1,
        pages: 1,
        StartAdmittedDate: null,
        EndAdmittedDate: null,
        PageSize: process.env.PAGE_SIZE,
        User: null,
        IsDraft: null
      }
      this.$refs.userAd.clear()
      this.getData()
    },
    updateQuery () {
      return Object.assign({}, this.parameters, {
        EmergencyStatus: this.parameters.EmergencyStatus.map(e => { return e.value }),
        StartAdmittedDate: this.parameters.StartAdmittedDate === null || typeof this.parameters.StartAdmittedDate === 'string' ? this.parameters.StartAdmittedDate : moment((this.parameters.StartAdmittedDate)).format(process.env.DATETIME_FORMAT),
        EndAdmittedDate: this.parameters.EndAdmittedDate === null || typeof this.parameters.EndAdmittedDate === 'string' ? this.parameters.EndAdmittedDate : moment((this.parameters.EndAdmittedDate)).format(process.env.DATETIME_FORMAT)
      })
    },
    btnGetData () {
      this.parameters.pages = 1
      this.parameters.pageNumber = 1
      this.getData()
    },
    getData () {
      new IPDService(this.updateQuery())
        .all()
        .then(response => {
          this.IPD = response.results || []
          var bonussssss = 1
          if ((response.count % this.parameters.PageSize) === 0) {
            bonussssss = 0
          }
          this.loading = false
          this.parameters.pages = parseInt(response.count / this.parameters.PageSize) + bonussssss
        })
    },
    getRouterName (Data) {
      Data = Data.filter(e => e.FormCode !== 'IPDBAICU' && (e.Role && e.Role.length))
      let name = ''
      if (Data && Data.length && Data[0].Type) {
        var Type = Data[0].Type
        name = 'IPD' + Type.split('/')[0] + 'Part3'
      }
      // không setup ba nào chỉ có icu thì push vào part3 bệnh án nội
      if (Data.length === 0) {
        return 'IPDMedicalRecordPart3'
      } else {
        return name
      }
    },
    getRouterName2 (Data) {
      Data = Data.filter(e => e.FormCode !== 'IPDBAICU' && (e.Role && e.Role.length))
      let name = ''
      if (Data && Data.length && Data[0].Type) {
        var Type = Data[0].Type
        name = 'IPD' + Type.split('/')[0] + 'Part1'
      }
      // không setup ba nào chỉ có icu thì push vào part3 bệnh án nội
      if (Data.length === 0) {
        return 'IPDMedicalRecordPart1'
      } else {
        return name
      }
      // return name
    }
  }
}
</script>
