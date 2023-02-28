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
              <td><b>{{__t('Thời gian chuyển NB')}}</b></td>
              <td><b>{{__t('Người tiếp nhận')}}</b></td>
            </tr>
            <tr :data="item" :key="((parameters.pageNumber - 1) * parameters.PageSize) + (index + 1)" v-for="(item ,index) in ED">
              <td width="40" align="center">{{((parameters.pageNumber - 1) * parameters.PageSize) + (index + 1)}}</td>
              <td>
                PID: <b>{{item.PID || __t('Chưa đồng bộ PID')}} - {{item.Fullname}}</b>
                <div>
                  {{item.DateOfBirth || 'N/A'}} - {{item.Phone || 'N/A'}}
                </div>
              </td>
              <td>{{item.SpecialtyName}}</td>
              <td width="200" class="no-wrap">
                <div v-if="item.TransferBy">
                  <ad-Info :ad="item.TransferBy" />
                </div>
              </td>
              <td width="160" class="no-wrap">
                {{item.TransferAt}}
              </td>
              <td width="200" class="no-wrap">
                <!-- <button class="btn v-yellow-btn" type="button" @click="openConfirmPopup(item)">Xác nhận</button> -->
                <div v-if="(($store.state.account.Position.includes('Nurse') || $store.state.account.Position.includes('Administrator')) && !item.IsAcceptNurse)" style="text-align: center;">
                  <button class="btn v-yellow-btn" type="button" @click="openConfirmPopup(item)">{{__t('Xác nhận')}}</button>
                </div>
                <!-- <div v-if="(usrPosition == 'Doctor' && !item.IsAcceptPhysician)" style="text-align: center;">
                  <button class="btn v-yellow-btn" type="button" @click="openConfirmPopup(item)">Xác nhận</button>
                </div> -->
                <div v-if="item.AcceptBy">
                  <ad-Info :ad="item.AcceptBy" />
                </div>
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
    <modal name="visitcode-modal" transition="pop-out" height="auto" :scrollable="true" :width="modalWidth" :clickToClose="false">
      <div class="sync-ed-box">
        <div v-if="visitcodes && visitcodes.length">
          <table class="table table-striped table-bordered" id="customer-tbl">
            <thead>
              <tr>
                <td colspan="2"><b>{{__t('Kết quả')}} ({{visitcodes.length}})</b></td>
                <td>{{__t('Chọn')}}</td>
              </tr>
            </thead>
            <tbody>
              <tr :data="visitcode" :key="index" v-for="(visitcode, index) in visitcodes">
                <td width="200px" style="vertical-align: top;">
                  <div class="no-wrap" style="font-size: 16px"><b>{{__t('Lượt khám')}}: {{visitcode.VisitTypeName}}</b></div>
                  <b>{{__t('Ngày vào viện')}}: <p class="no-wrap highlighted-text">{{visitcode.NgayVao}}</p></b>
                </td>
                <td>
                  <div>{{visitcode.BenhVien}}</div>
                  <div>{{__t('BS')}}: <b>{{visitcode.BacSi}}</b></div>
                  <div>{{__t('Khoa')}}: {{visitcode.TenKhoa}}</div>
                  <div>{{__t('Mã tiếp nhận')}}: {{visitcode.VisitCode}}</div>
                  <p style="color: red;"><i v-if="visitcode.VisitTypeName === 'Nội trú'"><i class="fa fa-exclamation-triangle" aria-hidden="true"></i> {{__t('Lượt khám')}} <b>{{__t('Nội trú')}}</b> {{__t('đối với bệnh nhân chuyển từ')}} <b>{{__t('Nội trú')}}</b> {{__t('xuống khám')}}</i></p>
                </td>
                <td width="50" class="v-checkbox" align="center">
                  <input type="checkbox" :id="'ETRIOE-' + index" :name="'ETRIOE-' + index" v-model="visitcode.selected">
                  <label :for="'ETRIOE-' + index"></label>
                </td>
                <!-- <td width="50" class="v-checkbox" align="center">
                  <button class="btn btn-block btn-warning" @click="updateVisitCode(visitcode.VisitCode)">Chọn</button>
                </td> -->
              </tr>
              <tr>
                <!-- <td><button type="button" class="btn btn-warning pull-left" @click="go2InitialAssessment()">Đi đến phân loại bệnh nhân</button></td> -->
                <td><button type="button" class="btn btn-white" @click="$modal.hide('visitcode-modal')">{{__t('Quay lại')}}</button></td>
                <td colspan="2"><button type="button" :disabled="!hasSelectVissitCode" class="btn btn-warning pull-right" @click="choseAndgo2InitialAssessment()">{{__t('Chọn và đi đến phân loại bệnh nhân')}}</button></td>
              </tr>
            </tbody>
          </table>
        </div>
        <template v-else-if="visitcodes && visitcodes.length === 0">
          <div class="callout callout-warning">
            <h4>{{__t('Không tìm thấy mã lượt khám của bệnh nhân!')}}</h4>
            <p>{{__t('Vui lòng kiểm tra lại thông tin trên eHos/OH')}}.</p>
            <p><button type="button" class="btn btn-white" @click="$modal.hide('visitcode-modal')">{{__t('Quay lại')}}</button></p>
          </div>
        </template>
      </div>
    </modal>
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
import Tranfers from '@/services/EOC/Tranfer'
import EocService from '@/services/EOC/Eoc'
import MixinMasterData from '@/mixins/masterdata.js'
import MixinView from '@/mixins/view.js'
import moment from 'moment'
import Users from '@/services/Users'
import EventBus from '@/lib/eventBus'
import CustomersEOC from '@/services/EOC/Customer'
const MODAL_WIDTH = 750

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
      visitcodes: [],
      modalWidth: MODAL_WIDTH
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
    hasSelectVissitCode () {
      return this.visitcodes.find(item => {
        return item.selected
      })
    }
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
    choseAndgo2InitialAssessment () {
      var vsCode = []
      this.visitcodes.forEach(item => {
        if (item.selected && !vsCode.includes(item.VisitCode)) {
          vsCode.push(item.VisitCode)
        }
      })
      if (vsCode) {
        this.create(vsCode ? vsCode.join(',') : '')
      } else {
        // this.$router.push({name: 'OPDInitialAssessmentShort', params: {Id: this.opdid}})
      }
      // this.customer.VisitCode = vsCode ? vsCode.join(',') : ''
    },
    submitCustomersEOC (VisitCode) {
      this.customer.VisitCode = VisitCode
      new CustomersEOC().create(this.customer).then(response => {
        this.$modal.hide('visitcode-modal')
        this.$router.push({name: 'EOCInitialAssessmentShort', params: {Id: response.Id}})
      })
    },
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
      new Tranfers(this.updateQuery())
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
    SyncVisitCode () {
      new CustomersEOC().find('SyncVisitCodeByPID/' + this.DataSubmit.PID).then(response => {
        this.$modal.show('visitcode-modal')
        this.visitcodes = response
      })
    },
    create (VisitCode) {
      new EocService().update('/customer-form-other-specialty/' + this.DataSubmit.Id, {VisitCode}).then(response => {
        this.$router.push({name: 'EOCInitialAssessmentShort', params: {Id: response.Id}})
      })
    },
    msg (item) {
      return `<p>${this.__t('Tên người bệnh')}: ${item.Fullname}</p><p>PID: ${item.PID}</p><p>${this.__t('Ngày sinh')}: ${item.DateOfBirth}</p><div>${this.__t('Từ khoa')}: ${item.SpecialtyName}</div>`
    },
    openConfirmPopup (item) {
      this.DataSubmit = item
      this.$modal.show('dialog', {
        title: this.__t('Xác nhận tiếp nhận bệnh nhân?'),
        text: this.msg(item),
        class: 'v-dialog v-dialog-warning',
        buttons: [
          {
            title: this.__t('Đồng ý'),
            class: 'btn',
            handler: () => {
              this.$modal.hide('dialog')
              this.create()
            }
          },
          {
            title: this.__t('Hủy bỏ'),
            class: 'btn bg-yellow',
            handler: () => {
              this.$modal.hide('dialog')
            }
          }
        ]
      })
    },
    closeConfirmPopup () {
      this.DataSubmit = null
    }
  }
}
</script>
