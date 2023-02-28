<template>
  <div class="main-content" id="translation-page">
    <div class="row v-flexbox">
      <div class="col-md-10 col-sm-10">
        <div class="search-group box">
          <div class="row">
            <div class="col-md-12">
              <form v-on:submit.prevent="filterByText(parameters.search)">
                <label>{{ __t('Tìm kiếm') }}</label>
                <input type="text" class="form-control" v-model="parameters.search" :placeholder="__t('Nhập họ tên, hoặc PID, hoặc VisitCode người bệnh')">
              </form>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-2 col-sm-2 no-padding-left">
        <a type="button" @click="getData()" class="btn v-yellow-btn pull-right btn-home-add">
          <span>
            <span class="glyphicon glyphicon-search"></span>
            <p>{{ __t('Tìm kiếm') }}</p>
          </span>
        </a>
      </div>
    </div>
    <div>
      <form class="form-inline form-inline2">
        <div class="form-group">
          <v-select :multi="true" v-model="parameters.Status" :items="AllStatus" :placeholder="__t('home.trang_thai')"/>
        </div>
        <div class="form-group">
          <!-- <v-date-picker v-model="parameters.FromDate" :format="vDateTimeFormat" :placeholder="__t('Từ ngày')"/> -->
          <VDateTimePicker5 class="mrr20" :max="getMax()" v-model="parameters.FromDate" :format="vDateTimeFormat" :placeholder="__t('Từ ngày')"/>
          <!-- <v-date-picker v-model="parameters.ToDate" :format="vDateTimeFormat" :placeholder="__t('Đến ngày')"/> -->
          <VDateTimePicker5 class="mrr20" v-model="parameters.ToDate" :format="vDateTimeFormat" :placeholder="__t('Đến ngày ')"/>
        </div>
        <div class="form-group">
          <users-ad style="min-width: 290px;" v-model="parameters.User" ref="userAd" :placeholder="__t('Tìm kiếm Người yêu cầu/ Người dịch')"/>
        </div>
        <div class="form-group">
          <button class="btn v-yellow-btn" type="button" @click="btnGetData">{{__t('home.loc')}}</button>
        </div>
        <div class="form-group pull-right">
          <button class="btn btn-default" type="button" @click="resetFilter">{{__t('home.reset')}}</button>
        </div>
      </form>
    </div>
    <table class="table table-striped table-bordered v-table" id="customer-tbl">
      <template v-if="results.length > 0">
      <thead>
        <tr>
          <td colspan="8">{{total}} {{__t('kết quả')}}</td>
        </tr>
      </thead>
      <thead class="thead-337ab7">
        <tr>
          <th width="1">
            {{__t('STT')}}
          </th>
          <!-- <th>
            PID
          </th>
          <th>
            Visitcode
          </th>
          <th>
            {{ __t('Họ và tên') }}
          </th> -->
          <th class="no-wrap">
            {{ __t('Thông tin người bệnh') }}
          </th>
          <th class="no-wrap">
            {{ __t('Khoa ') }}
          </th>
          <th class="no-wrap">
            {{ __t('Phiếu dịch') }}
          </th>
          <th class="no-wrap">
            {{ __t('Thời gian yêu cầu') }}
          </th>
          <th width="1">
            {{ __t('Trạng thái') }}
          </th>
          <th class="no-wrap">
            {{ __t('Người yêu cầu/ Người dịch') }}
          </th>
          <!-- <th width="1">--/--</th> -->
          <th width="1">
            {{ __t('Dịch') }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr :data="item" :key="index" v-for="(item ,index) in results">
          <td>{{((parameters.pageNumber - 1) * parameters.PageSize) + (index + 1)}}</td>
          <td>
            PID: <b><pid :PID="item.PID" :noPidmsg="'Chưa đồng bộ PID'" />
            <i v-if="item.VisitCode">({{item.VisitCode}})</i>
            <!-- <i v-else class="highlighted-text no-wrap">
                {{__t('Chưa có mã tiếp nhận')}}
            </i> -->
            - <a style="cursor-pointer: none;" class="no-wrap">{{item.CustomerName}} <VipIcon /></a></b>
            <div v-if="item.DateOfBirth !== null">
              {{item.DateOfBirth | formatDate2}} - {{item.Phone || 'N/A'}}
            </div>
            <div v-else>
              {{'N/A'}} - {{item.Phone || 'N/A'}}
            </div>
          </td>
          <td>{{item.SpecialtyName}}</td>
          <td>{{__label(item.TranslationName)}}</td>
          <td>{{item.RequestTime}}</td>
          <td class="no-wrap"><label class="tran-label" :class="'tran-label-' + item.Status.Id">{{__label(item.Status)}}</label></td>
          <td class="no-wrap">
            <ad-Info :ad="item.RequestedBy" />
            <div v-if="item.TranslatedBy">/ <ad-Info :ad="item.TranslatedBy" /></div>
          </td>
          <td class="no-wrap">
            <router-link class="btn btn-sm btn-warning" :to="{name: 'TKCM', params: { Id: item.Id }}">
              {{__t('Dịch')}}
            </router-link>
          </td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td colspan="9">
            <paginate
            :clickHandler="getData"
            :container-class="'pagination pagination-sm no-margin v-pagination'"
            :next-text="'»'"
            :page-count="parameters.pages"
            :prev-text="'«'"
            v-model="parameters.pageNumber">
            </paginate>
          </td>
        </tr>
      </tfoot>
      </template>
      <tbody v-else>
        <tr>
          <th>{{__t('Không có yêu cầu dịch nào')}}</th>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
/* ============
 * Add cusotmer Page
 * ============
 *
 * The home index page.
 */
import VLayout from '@/layouts/Default.vue'
import Translation from '@/services/Translation'
import VSelect from '@/components/VSelect.vue'
import VDatePicker from '@/components/VDateTimePicker.vue'
import OpdComponent from '@/components/OPD/VIEW_OPDV2.vue'
import moment from 'moment'
import VDateTimePicker5 from '@/components/VDateTimePicker5.vue'
export default {
  /**
   * The name of the page.
   */
  name: 'TranslationList',
  data () {
    return {
      results: [],
      parameters: {
        search: null,
        visitCode: null,
        pageNumber: 1,
        pages: 1,
        PageSize: process.env.PAGE_SIZE,
        // status: [],
        FromDate: null,
        ToDate: null,
        User: null,
        Status: [
          {
            value: '0',
            label: 'Yêu cầu dịch',
            searchableValue: 'yeucaudich',
            selected: true
          }
        ]
      },
      total: 0,
      AllStatus: [
        {
          value: '0',
          label: 'Yêu cầu dịch'
        },
        {
          value: '1',
          label: 'Yêu cầu chỉnh sửa '
        },
        {
          value: '2',
          label: 'Đang phê duyệt'
        },
        {
          value: '3',
          label: 'Đã phê duyệt'
        }
      ],
      timeNow: moment(new Date()).format('HH:mm DD/MM/YYYY')
    }
  },
  mixins: [],
  /**
   * The components that the page can use.
   */
  components: {
    OpdComponent,
    VLayout,
    VSelect,
    VDatePicker,
    // VDateTimePicker,
    VDateTimePicker5
  },
  mounted () {
    this.getData()
  },
  computed: {
  },
  methods: {
    searchByName () {},
    getData () {
      new Translation(this.updateQuery())
        .all()
        .then(response => {
          this.results = response.results || []
          this.total = response.count
          var bonussssss = 1
          if ((response.count % this.parameters.PageSize) === 0) {
            bonussssss = 0
          }
          this.parameters.pages = parseInt(response.count / this.parameters.PageSize) + bonussssss
        })
    },
    btnGetData () {
      this.parameters.pages = 1
      this.parameters.pageNumber = 1
      this.getData()
    },
    resetFilter () {
      this.parameters = {
        search: null,
        visitCode: null,
        pageNumber: 1,
        pages: 1,
        PageSize: process.env.PAGE_SIZE,
        // status: [],
        FromDate: '',
        ToDate: '',
        User: null,
        Status: []
      }
      this.$refs.userAd.clear()
      this.getData()
    },
    filterByText (search) {
      this.$refs.userAd.clear()
      this.parameters = {
        search: search,
        visitCode: null,
        pageNumber: 1,
        pages: 1,
        PageSize: process.env.PAGE_SIZE,
        FromDate: '',
        ToDate: '',
        User: null,
        Status: []
      }
      this.getData()
    },
    updateQuery () {
      return Object.assign({}, this.parameters, {
        Status: this.parameters.Status.map(e => { return e.value }),
        FromDate: this.parameters.FromDate === null ? '' : this.parameters.FromDate,
        ToDate: this.parameters.ToDate === null ? '' : this.parameters.ToDate
      })
    },
    getMax () {
      if (this.parameters.ToDate && this.parameters.ToDate !== 'Invalid date') {
        return this.parameters.ToDate
      }
      return ''
    }
  }
}
</script>
