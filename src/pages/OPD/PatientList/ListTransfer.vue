<template>
  <div>
    <form v-on:submit.prevent="filterByText(parameters.search, true)">
      <table class="table table-striped table-bordered v-table" id="customer-tbl">
        <thead>
          <tr>
            <td colspan="6">
              <form class="form-inline">
                <div class="form-group" v-if="Status.length">
                  <v-box-select :multi="true" v-model="parameters.handoverStatus" :items="Status" :placeholder="__t('home.trang_thai')"/>
                </div>
                <div class="form-group">
                  <v-select :multiple="true" v-model="parameters.user" :filterable="false" :options="Users" @search="onSearch" :placeholder="__t('Người chuyển/Tiếp nhận')"
                    style="background-color: #fff; min-width: 200px;">
                    <template slot="no-options">
                      {{__t('Gõ để tìm người dùng...')}}
                    </template>
                  </v-select>
                </div>
                <div class="form-group">
                  <v-date-picker v-model="parameters.startDate" :format="vDateTimeFormat"/>
                </div>
                <div class="form-group">
                  <v-date-picker v-model="parameters.endDate" :format="vDateTimeFormat"/>
                </div>
                <button class="btn v-yellow-btn" type="button" @click="getData">{{__t('home.loc')}}</button>
                <button class="btn btn-default pull-right" type="button" @click="resetFilter">{{__t('home.reset')}}</button>
              </form>
            </td>
          </tr>
        </thead>
        <tbody>
          <template v-if="ED.length">
            <tr style="background-color: #dadce0 !important;">
              <td><b>{{__t('STT')}}</b></td>
              <td><b>{{__t('Chi tiết người bệnh')}}</b></td>
              <td class="no-wrap"><b>{{__t('Nơi chuyển')}}</b></td>
              <td><b>{{__t('Người chuyển')}}</b></td>
              <td><b>{{__t('Người tiếp nhận')}}</b></td>
              <td><b>{{__t('Thời gian chuyển NB')}}</b></td>
            </tr>
            <tr :data="item" :key="((parameters.pageNumber - 1) * parameters.PageSize) + (index + 1)" v-for="(item ,index) in ED">
              <td width="40" align="center">{{((parameters.pageNumber - 1) * parameters.PageSize) + (index + 1)}}</td>
              <td>
                PID: <b>{{item.PID || __t('Chưa đồng bộ PID')}} <i>({{item.VisitCode || __t('Chưa đồng bộ VisitCode')}})</i> - {{item.Fullname}}</b>
                <div>
                  {{item.DateOfBirth || 'N/A'}} - {{item.Phone || 'N/A'}}
                </div>
              </td>
              <td>{{item.HandOverUnit}}</td>
              <td width="200" class="no-wrap">
                <div v-if="item.HandOverNurseUsername">
                  {{__t('ĐD')}}: <ad-Info :ad="item.HandOverNurseUsername" />
                </div>
                <div v-if="item.HandOverPhysicianUsername">
                  {{__t('BS')}}: <ad-Info :ad="item.HandOverPhysicianUsername" />
                </div>
              </td>
              <td width="200" class="no-wrap">
                <!-- <button class="btn v-yellow-btn" type="button" @click="openConfirmPopup(item)">Xác nhận</button> -->
                <div v-if="(($store.state.account.Position.includes('Nurse') || $store.state.account.Position.includes('Administrator')) && !item.IsAcceptNurse)" style="text-align: center;">
                  <button class="btn v-yellow-btn" type="button" @click="openConfirmPopup(item)">{{__t('Xác nhận')}}</button>
                </div>
                <!-- <div v-if="(usrPosition == 'Doctor' && !item.IsAcceptPhysician)" style="text-align: center;">
                  <button class="btn v-yellow-btn" type="button" @click="openConfirmPopup(item)">Xác nhận</button>
                </div> -->
                <div v-if="item.ReceivingNurseUsername">
                  {{__t('ĐD')}}: <ad-Info :ad="item.ReceivingNurseUsername" />
                </div>
                <div v-if="item.ReceivingPhysicianUsername">
                  {{__t('BS')}}: <ad-Info :ad="item.ReceivingPhysicianUsername" />
                </div>
              </td>
              <td width="160" class="no-wrap">
                {{item.TransferDate}}
              </td>
            </tr>
          </template>
          <template v-else>
            <tr>
              <td colspan="5" class="text-center">{{__t('Không có dữ liệu')}}</td>
            </tr>
          </template>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="4">
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
    </form>
    <confirm-handover-popup
      :CurrentGroup="'OPD'"
      :pId="DataSubmit.Id"
      :message="DataSubmit.message"
      :VisitTypeGroupCode="DataSubmit.VisitTypeGroupCode"
      :IsUseHandOverCheckList = DataSubmit.IsUseHandOverCheckList
      :VisitId="DataSubmit.VisitId"
      :hasCallBack="true"
      v-if="DataSubmit"
      :dataHandoverChecklistFromOpd="DataSubmit"
      @close="closeConfirmPopup()"
    />
  </div>
</template>
<script>
/* ============
 * Home Index Page
 * ============
 *
 * The home index page.
 */
import _ from 'lodash'
import VBoxSelect from '@/components/VSelect.vue'
import VDatePicker from '@/components/VDateTimePicker.vue'
import OPDService from '@/services/OPD/OPDHandoverCheckList'
import MixinMasterData from '@/mixins/masterdata.js'
import MixinView from '@/mixins/view.js'
import moment from 'moment'
import Users from '@/services/Users'
import EventBus from '@/lib/eventBus'
import { router } from '@/plugins/vue-router'
import OPDHandoverService from '@/services/Custome'

// import { router } from '@/plugins/vue-router'
export default {
  /**
   * The name of the page.
   */
  name: 'OPDTransferHomeIndex',
  mixins: [MixinMasterData, MixinView],
  data () {
    return {
      usrPosition: null,
      data: {
      },
      parameters: {
        search: null,
        handoverStatus: [
          {
            value: '0',
            label: 'Chưa xác nhận',
            searchableValue: 'dangnamngoaitru',
            selected: true
          }
        ],
        user: [],
        pageNumber: 1,
        pages: 1,
        startDate: moment().subtract(7, 'day').startOf('day'),
        endDate: moment().endOf('day'),
        PageSize: process.env.PAGE_SIZE
      },
      ED: [],
      Users: [],
      Status: [],
      countOfForm: 10,
      heightItemLi: 41,
      menuClass: '',
      menuTop: 0,
      DataSubmit: null,
      IsUseHandOverCheckList: null,
      modalWidth: 500,
      Item: null,
      usr: {
        username: null,
        password: null
      }
    }
  },
  /**
   * The components that the page can use.
   */
  components: {
    VBoxSelect,
    VDatePicker
  },
  mounted () {
    // console.log(router.currentRoute.name)
    // this.getUsers()
    this.getEDStatus()
    this.getData()
    EventBus.$on('updateSearchByName', this.filterByText)
    // console.log('ON-TRA')
  },
  destroyed () {
    EventBus.$off('updateSearchByName')
    // console.log('OFF-TRA')
  },
  computed: {
  },
  methods: {
    onSearch (search, loading) {
      this.search(loading, search, this)
    },
    search: _.debounce((loading, search, vm) => {
      new Users({search: search}).all().then(res => {
        vm.Users = res.map(e => {
          return {
            code: e.Id,
            label: e.Fullname
          }
        })
      })
    }, 350),
    // getUsers () {
    //   new Users().all().then(r => {
    //     r.forEach(option => {
    //       this.Users.push({
    //         label: option.Fullname,
    //         code: option.Id
    //       })
    //     })
    //   })
    //   console.log(this.Users)
    // },
    getEDStatus () {
      this.Status.push({
        label: 'Chưa xác nhận',
        value: '0',
        EnLabel: this.__t('Chưa xác nhận')
      })
      this.Status.push({
        label: 'Đã xác nhận',
        value: '1',
        EnLabel: this.__t('Đã xác nhận')
      })
    },
    resetFilter () {
      this.parameters = {
        search: null,
        handoverStatus: [],
        user: [],
        pageNumber: 1,
        pages: 1,
        startDate: null,
        endDate: null,
        PageSize: process.env.PAGE_SIZE
      }
      EventBus.$emit('clearSearchByName', 'search')
      this.getData()
    },
    filterByText (search) {
      this.parameters = {
        search: search,
        handoverStatus: [],
        user: [],
        pageNumber: 1,
        pages: 1,
        startDate: null,
        endDate: null,
        PageSize: process.env.PAGE_SIZE
      }
      this.getData()
    },
    updateQuery () {
      var startDate = this.parameters.startDate
      var endDate = this.parameters.endDate
      if (typeof startDate === 'object') {
        startDate = this.moment2String(startDate)
      }
      if (typeof endDate === 'object') {
        endDate = this.moment2String(endDate)
      }
      return Object.assign({}, this.parameters, {
        userAccept: this.parameters.user.map(e => { return e.code }),
        status: this.parameters.handoverStatus.map(e => { return e.value }),
        startDate: startDate,
        endDate: endDate
      })
    },
    getData () {
      new OPDService(this.updateQuery())
        .all()
        .then(response => {
          this.ED = response.results || []
          var bonussssss = 1
          if ((response.count % this.parameters.PageSize) === 0) {
            bonussssss = 0
          }
          this.parameters.pages = parseInt(response.count / this.parameters.PageSize) + bonussssss
        })
    },
    openConfirmPopup (item) {
      console.log(item)
      this.DataSubmit = item
    },
    closeConfirmPopup () {
      this.DataSubmit = null
    },
    // msg (item) {
    //   return `<p>${this.__t('Tên người bệnh')}: ${item.Fullname}</p><p>PID: ${item.PID}</p><p>${this.__t('Ngày sinh')}: ${item.DateOfBirth}</p><div>${this.__t('Từ khoa')}: ${item.HandOverUnit}</div>`
    // },
    // openConfirmPopup (item) {
    //   this.DataSubmit = item
    //   this.$modal.show('dialog', {
    //     title: this.__t('Xác nhận tiếp nhận bệnh nhân?'),
    //     text: this.msg(item),
    //     class: 'v-dialog v-dialog-warning',
    //     buttons: [
    //       {
    //         title: this.__t('Đồng ý'),
    //         class: 'btn',
    //         handler: () => {
    //           this.$modal.hide('dialog')
    //           this.create()
    //         }
    //       },
    //       {
    //         title: this.__t('Hủy bỏ'),
    //         class: 'btn bg-yellow',
    //         handler: () => {
    //           this.$modal.hide('dialog')
    //         }
    //       }
    //     ]
    //   })
    // },
    // closeConfirmPopup () {
    //   this.DataSubmit = null
    // },
    cancel () {
      this.$modal.hide('test')
    },
    confirm () {
      this.usr.username = this.getUser()
      new OPDHandoverService(`api/OPD/HandOverCheckList/Accept/`).update(this.Item.Id, this.usr).then(response => {
        this.toastedSuccess(this.__t('Tiếp nhận bệnh nhân thành công'))
        this.$modal.hide('test')
        if (router.currentRoute.name === 'ListPatientTransferOPD') {
          this.$router.push({name: 'OPDInitialAssessmentShort', params: {Id: response.Id}})
        } else if (router.currentRoute.name === 'ListPatientTransfer') {
          this.$router.push({name: 'ED-etr', params: {Id: response.Id}})
        } else if (router.currentRoute.name === 'ListPatientTransferIPD') {
          this.$router.push({name: 'IPDInitialAssessmentForAdult', params: {Id: response.Id}})
        }
        setTimeout(() => {
          this.reload()
        }, 1000)
      })
    }
  }
}
</script>
