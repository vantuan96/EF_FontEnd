<template>
  <div class="main-content" id="home-page">
    <form v-on:submit.prevent="filterByText(parameters.search, true)">
      <table class="table table-striped table-bordered v-table" id="customer-tbl">
        <thead class="bg-1375ba">
          <tr>
            <td :colspan="IsCovidSpecialty ? 9 : 8" width="1px">
              <form class="form-inline form-inline2">
                <div v-if="IsCovidSpecialty" class="form-group">
                  <v-select :multi="true" v-model="parameters.RickGroups" :items="RickGroup" :placeholder="__t('Phân loại nguy cơ')"/>
                </div>
                <template v-else>
                  <div class="form-group" v-if="ATSScales.length">
                    <v-select :multi="true" v-model="parameters.aTSScale" :items="ATSScales" :placeholder="__t('home.trang_thai_cap_cuu')"/>
                  </div>
                </template>
                <div class="form-group" v-if="status.length">
                  <v-select :multi="true" v-model="parameters.emergencyStatus" :items="status" :placeholder="__t('home.trang_thai')"/>
                </div>
                <div class="form-group">
                  <v-date-picker v-model="parameters.StartAdmittedDate" :format="vDateTimeFormat" :placeholder="__t('Từ ngày')"/>
                  <v-date-picker v-model="parameters.EndAdmittedDate" :format="vDateTimeFormat" :placeholder="__t('Đến ngày')"/>
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
            <th>STT</th>
            <th>{{__t('Chi tiết người bệnh')}}</th>
            <th v-if="IsCovidSpecialty">{{__t('Bác sĩ')}}</th>
            <th>{{__t('Mức độ')}}</th>
            <th class="no-wrap">{{__t('Tiếp nhận/ Phân loại')}}</th>
            <th class="no-wrap">{{__t('BS chính')}}</th>
            <th>{{__t('Trạng thái')}}</th>
            <th>{{__t('Thời gian')}}</th>
            <th width="1px"></th>
          </tr>
        </thead>
        <tbody>
          <template v-if="loading">
            <tr>
              <td colspan="8" class="text-center"><v-loading/></td>
            </tr>
          </template>
          <template v-else>
          <template v-if="ED.length">
            <tr :data="item" :key="((parameters.pageNumber - 1) * parameters.PageSize) + (index + 1) + item.Id" v-for="(item ,index) in ED">
              <td width="40" align="center" :class="{'no-visit': !item.VisitCode, 'no-pid': !item.Customer.PID}" class="boder-left">{{((parameters.pageNumber - 1) * parameters.PageSize) + (index + 1)}}</td>
              <td>
                PID: <b> <pid :PID="item.Customer.PID" :noPidmsg="__t('Chưa đồng bộ PID')" /><i>({{item.VisitCode || __t('Chưa đồng bộ VisitCode')}})</i> - <router-link class="no-wrap" :to="{name: 'EDDETAILGROUP', params: { Id: item.Id }}">{{item.Customer.Fullname}} <VipIcon :data="item.Customer" />  <template v-if="item.VisitAllergy && item.VisitAllergy.IsAllergy"><AllergyLabel :data="item.VisitAllergy"/></template><label v-if="item.IsFallRiskScreening" class="label label-warning ml-5">NB có nguy cơ ngã</label><label v-if="item.SelfHarmRiskScreeningResults" :class="'label ml-5 SelfHarmRiskScreeningResults-' + item.SelfHarmRiskScreeningResults">{{item.SelfHarmRiskScreeningResults === 2 ? 'Nguy cơ tự hại cao' : 'Nguy cơ tự hại trung bình'}}</label></router-link></b>
                <div>
                  {{item.Customer.DateOfBirth || 'N/A'}} - {{item.Customer.Phone || 'N/A'}}
                  <router-link :to="{name: 'CustomerInfo', params: { Id: item.Id }}">
                    <span class="glyphicon glyphicon-pencil"></span>
                  </router-link>
                </div>
              </td>
              <td v-if="IsCovidSpecialty" class="text-center" width="1px"><ad-Info v-if="item.Doctor" :ad="item.Doctor" /><template v-else>NA</template></td>
              <td v-if="IsCovidSpecialty" class="text-center" width="1px">
                <router-link :to="{name: 'ED-etr', params: { Id: item.Id }}">
                  <span v-if="item.CovidRiskGroup" class="label e-label" :class="'CovidRiskGroup-' + item.CovidRiskGroup">{{__t(RickGroup[item.CovidRiskGroup - 1].label)}}</span>
                  <span v-else class="label e-label">{{__t('home.chua_phan_loai')}}</span>
                </router-link>
              </td>
              <td class="text-center" width="1px" v-else>
                <router-link v-if="item.IsRetailService" :to="{name: 'ED-AssessmentForRetailServicePatient', params: { Id: item.Id }}">
                  <span v-if="item.ATSScale" class="label e-label" :style="'background-color: ' + item.ATSScale.Note"><i class="fa fa-check v-gr2een" aria-hidden="true"></i>  {{__label(item.ATSScale)}}</span>
                </router-link>
                <router-link v-else :to="{name: 'ED-etr', params: { Id: item.Id }}">
                  <span v-if="item.ATSScale && item.ATSScale.ViName" class="label e-label" :style="'background-color: ' + item.ATSScale.Note">{{__label(item.ATSScale)}}</span>
                  <span v-else class="label e-label">{{__t('home.chua_phan_loai')}}</span>
                </router-link>
              </td>
              <td class="text-center">
                <div class="d-flex flex-center justify-content-center">
                  <ad-Info v-if="item.UserReceiver" :ad="item.UserReceiver" />
                  <template v-else>N/A</template>
                  <p style="margin: 0 5px;">/</p>
                  <ad-Info v-if="item.UserDoTriage" :ad="item.UserDoTriage" />
                  <template v-else>N/A</template>
                </div>
                <!-- <ad-Info v-if="item.CreatedBy" :ad="item.CreatedBy" />
                <template v-else>N/A</template> -->
              </td>
              <td class="text-center">
                <ad-Info v-if="item.Doctor" :ad="item.Doctor" />
                <template v-else>N/A</template>
              </td>
              <td class="text-center" width="1px">
                <p class="no-margin no-wrap">
                  <router-link :to="{name: 'ED-DI0', params: { Id: item.Id }}">
                    <b>{{__label(item.EmergencyStatus)}}</b>
                  </router-link>
                </p>
              </td>
              <td width="1px" class="text-center">
                {{item.AdmittedDate}}
              </td>
              <td class="text-center" width="45px">
                <ed-context-menu :Customer="{VisitCode: item.VisitCode, PID: item.Customer.PID, Version: item.Version}" :EdId="item.Id" :items="item.Link" :Type="'ed'"/>
                <!-- <context-menu :items="item.Link" :EdId="item.Id" :Type="'ED'"/> -->
              </td>
            </tr>
          </template>
          <template v-else>
            <tr>
              <td colspan="8" class="text-center">{{__t('Không có dữ liệu')}}</td>
            </tr>
          </template>
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
import EDService from '@/services/ED/ED'
import MixinMasterData from '@/mixins/masterdata.js'
import MixinView from '@/mixins/view.js'
import moment from 'moment'
import storage from '@/lib/storage'
import EDStatus from '@/services/ED/EDStatus'
import EventBus from '@/lib/eventBus'
// let today = new Date()
import constants from '@/constants'
export default {
  /**
   * The name of the page.
   */
  name: 'HomeIndex',
  mixins: [MixinMasterData, MixinView],
  data () {
    return {
      RickGroup: constants.RISKGROUP,
      IsCovidSpecialty: false,
      isForm: null,
      data: {
      },
      parameters: {
        isRetailService: false,
        search: null,
        emergencyStatus: [
          {
            value: '5b0d968b-a1a2-47cb-a141-4c08ca420e7c',
            label: 'Đang nằm cấp cứu',
            searchableValue: 'dangnamcapcuu',
            selected: true
          }
        ],
        aTSScale: [],
        RickGroups: [],
        pageNumber: 1,
        pages: 1,
        StartAdmittedDate: moment().subtract(7, 'day').startOf('day'),
        EndAdmittedDate: moment().endOf('day'),
        PageSize: process.env.PAGE_SIZE
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
    VDatePicker
  },
  mounted () {
    this.getEDStatus()
    var fromStorage = storage.get('ETRATS')
    if (!fromStorage) {
      this.getRawMasterDatas({Group: 'ETRATS'}, data => {
        data.forEach(option => {
          this.ATSScales.push({
            label: option.ViName,
            value: option.Code
          })
        })
        this.ATSScales.push({
          label: 'Chưa phân loại',
          value: -1
        })
        storage.set('ETRATS', JSON.stringify(this.ATSScales))
      })
      this.getData()
    } else {
      this.ATSScales = fromStorage
      this.getData()
    }
    EventBus.$on('updateSearchByName', this.filterByText)
  },
  destroyed () {
    EventBus.$off('updateSearchByName')
    console.log('OFF-ED')
  },
  computed: {
  },
  methods: {
    getEDStatus () {
      var fromStorage = storage.get('EDStatus')
      if (!fromStorage) {
        new EDStatus({'visit_type_group': 'ED'}).all().then(r => {
          r.forEach(option => {
            this.status.push({
              label: option.ViName,
              value: option.Id
            })
          })
          storage.set('EDStatus', JSON.stringify(this.status))
        })
      } else {
        this.status = fromStorage
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
        RickGroups: [],
        pageNumber: 1,
        pages: 1,
        StartAdmittedDate: null,
        EndAdmittedDate: null,
        PageSize: process.env.PAGE_SIZE,
        isRetailService: false
      }
      EventBus.$emit('clearSearchByName', 'search')
      this.getData()
    },
    filterByText (search) {
      this.parameters = {
        search: search,
        emergencyStatus: [],
        aTSScale: [],
        pageNumber: 1,
        pages: 1,
        StartAdmittedDate: null,
        EndAdmittedDate: null,
        PageSize: process.env.PAGE_SIZE,
        isRetailService: false,
        RickGroups: []
      }
      this.getData()
    },
    updateQuery () {
      return Object.assign({}, this.parameters, {
        aTSScale: this.parameters.aTSScale.map(e => { return e.value }),
        RickGroups: this.parameters.RickGroups.map(e => { return e.value }),
        emergencyStatus: this.parameters.emergencyStatus.map(e => { return e.value }),
        StartAdmittedDate: this.parameters.StartAdmittedDate === null || typeof this.parameters.StartAdmittedDate === 'string' ? this.parameters.StartAdmittedDate : moment((this.parameters.StartAdmittedDate)).format(process.env.DATETIME_FORMAT),
        EndAdmittedDate: this.parameters.EndAdmittedDate === null || typeof this.parameters.EndAdmittedDate === 'string' ? this.parameters.EndAdmittedDate : moment((this.parameters.EndAdmittedDate)).format(process.env.DATETIME_FORMAT)
      })
    },
    btnGetData () {
      EventBus.$emit('clearSearchByName', 'search')
      this.parameters.pages = 1
      this.parameters.search = ''
      this.parameters.pageNumber = 1
      this.getData()
    },
    updateStatusLabel () {
      if (this.IsCovidSpecialty) {
        this.status = this.status.map(e => {
          if (e.label === 'Đang nằm cấp cứu') {
            e.label = 'Đang theo dõi'
          }
          return e
        })
        this.parameters.emergencyStatus.forEach(e => {
          if (e.label === 'Đang nằm cấp cứu') {
            e.label = 'Đang theo dõi'
          }
        })
      }
    },
    getData () {
      this.loading = true
      new EDService(this.updateQuery())
        .all()
        .then(response => {
          this.loading = false
          this.IsCovidSpecialty = response.IsCovidSpecialty
          this.ED = (response.results || []).map(e => {
            if (this.IsCovidSpecialty && e.EmergencyStatus && e.EmergencyStatus.EnName === 'In hospital') {
              e.EmergencyStatus.ViName = 'Đang theo dõi'
            }
            return e
          })
          var bonussssss = 1
          if ((response.count % this.parameters.PageSize) === 0) {
            bonussssss = 0
          }
          this.parameters.pages = parseInt(response.count / this.parameters.PageSize) + bonussssss
          this.updateStatusLabel()
        }).catch(e => {
          this.loading = false
        })
    }
  }
}
</script>
