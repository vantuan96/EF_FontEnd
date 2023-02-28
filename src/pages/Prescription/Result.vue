<template>
  <div class="main-content" id="Prescription-Result-page">
    <div class="row v-flexbox">
      <div class="col-md-12 col-sm-12">
        <div class="search-group box" v-if="Customer">
          <div class="row">
            <div class="col-md-12" style="text-transform: uppercase; color: #337AB7; font-weight: bold; font-size: 16px;">
              {{ Customer.Fullname || '' }} <VipIcon :data="Customer" />
            </div>
          </div>
          <div class="row">
            <div class="col-md-6">
              <label>PID: </label> {{ Customer.PID }}
            </div>
            <div class="col-md-6">
              <label>{{__t('Dân tộc')}}: </label> {{ Customer.Fork }}
            </div>
          </div>
          <div class="row">
            <div class="col-md-6">
              <label>{{__t('Ngày sinh')}}: </label> {{ Customer.DateOfBirth }}
            </div>
            <div class="col-md-6">
              <label>{{__t('Nghề nghiệp')}}: </label> {{ Customer.Job }}
            </div>
          </div>
          <div class="row">
            <div class="col-md-6">
              <label>{{__t('Giới tính')}}: </label> {{ __t(GENDER[Customer.Gender]) }}
            </div>
            <div class="col-md-6">
              <label>{{__t('Số điện thoại')}}: </label> {{ Customer.Phone }}
            </div>
          </div>
          <div class="row">
            <div class="col-md-6">
              <label>{{__t('Quốc tịch')}}: </label> {{ Customer.Nationality }}
            </div>
            <div class="col-md-6">
              <label>{{__t('Địa chỉ')}}: </label> {{Customer.Address}}
            </div>
          </div>
        </div>
        <table class="table table-striped table-bordered v-table" id="customer-tbl" v-if="Result">
          <thead>
            <tr>
              <td width="1px" colspan="6">
                <form class="form-inline form-inline2">
                  <div class="form-group">
                    {{__t('Ngày kê đơn')}}
                    <v-date-picker v-model="parameters.FromDate" :hideTooltip="true"/>
                    <v-date-picker v-model="parameters.ToDate" :hideTooltip="true" :allday="'allday'"/>
                  </div>
                  <div class="form-group">
                    {{__t('Số tiếp nhận')}} <input type="text" class="form-control" v-model.trim="parameters.VisitCode" :placeholder="__t('Số tiếp nhận')">
                  </div>
                  <div class="form-group">
                    {{__t('Mã đơn thuốc')}} <input type="text" class="form-control" v-model.trim="parameters.PrescriptionCode" :placeholder="__t('Mã đơn thuốc')">
                  </div>
                  <div class="form-group">
                    <div class="flex-box flex-center">
                    {{__t('Bs kê đơn')}} <div><user-ad v-model="parameters.PrescriberAD" :field="'Username'" ref="userAd"/></div>
                    </div>
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
            <tr>
              <th>{{__t('STT')}}</th>
              <th>{{__t('Ngày kê đơn')}}</th>
              <th>{{__t('Số tiếp nhận')}}</th>
              <th>{{__t('Mã đơn thuốc')}}</th>
              <th>{{__t('Bs kê đơn')}}</th>
              <th>{{__t('Xem đơn thuốc')}}</th>
            </tr>
          </thead>
          <template v-if="Result.length">
            <tbody>
              <tr :data="item" :key="((parameters.pageNumber - 1) * parameters.PageSize) + (index + 1) + item.PrescriptionId" v-for="(item ,index) in Result">
                <td width="40" align="center">{{index + 1}}</td>
                <td>{{item.CreatedDate | formatDate}}</td>
                <td>{{item.VisitCode}}</td>
                <td>{{item.PrescriptionCode}}</td>
                <td><ad-Info v-if="item.PrescriberAD" :ad="item.PrescriberAD" /></td>
                <td width="40">
                  <router-link v-if="visitCode === item.VisitCode" :to="{name: 'prescription-detail',query: $route.query, params: { PID: Customer.PID, PrescriptionId: item.PrescriptionId, VisitType: item.VisitType.trim()}}" class="btn v-yellow-btn btn-sm" type="a">{{__t('Xem đơn thuốc')}}</router-link>
                  <router-link v-else :to="{name: 'prescription-detail', params: { PID: Customer.PID, PrescriptionId: item.PrescriptionId, VisitType: item.VisitType.trim()}}" class="btn v-yellow-btn btn-sm" type="a">{{__t('Xem đơn thuốc')}}</router-link>
                </td>
              </tr>
            </tbody>
          </template>
          <template v-else>
            <tr>
              <td colspan="6" class="text-center">{{__t('Không có dữ liệu')}}</td>
            </tr>
          </template>
        </table>
        <div class="text-center" v-else>
          <v-loading />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
/* ============
 * Add cusotmer Page
 * ============
 *
 * The home index page.
 */
import Prescription from '@/services/Prescription'
import CustomerApi from '@/services/CustomerApi'
import moment from 'moment'
import constants from '@/constants'

export default {
  /**
   * The name of the page.
   */
  name: 'Prescription-Result',
  data () {
    return {
      Customer: null,
      Result: null,
      loaded: false,
      parameters: {
        pageNumber: 1,
        PageSize: 1000,
        FromDate: '01/01/2022',
        ToDate: moment().endOf('day').format('DD/MM/YYYY')
      },
      GENDER: constants.GENDER,
      visitCode: ''
    }
  },
  /**
   * The components that the page can use.
   */
  components: {
  },
  mounted () {
    let stringJSON = JSON.stringify(this.$route.query)
    let objectJSON = JSON.parse(stringJSON)
    this.visitCode = objectJSON.VisitCode
    console.log(this.visitCode)
    this.getData()
  },
  computed: {
  },
  methods: {
    async getData () {
      await this.getCustomer()
      this.getPrescription()
    },
    async getCustomer () {
      await new CustomerApi()
        .find(this.$route.params.PID)
        .then(response => {
          this.Customer = response
        }).catch(e => {
          this.loaded = true
        })
    },
    async getPrescription () {
      var query = this.updateQuery()
      await new Prescription(query)
        .find(this.$route.params.PID)
        .then(response => {
          this.Result = response.filter(e => {
            return (!query.VisitCode || e.VisitCode === query.VisitCode) &&
            (!query.PrescriptionCode || e.PrescriptionCode === query.PrescriptionCode) &&
            (!query.PrescriberAD || e.PrescriberAD === query.PrescriberAD) &&
            (!query.VisitType || e.VisitType === query.VisitType)
          })
        }).catch(e => {
          this.loaded = true
        })
    },
    updateQuery () {
      console.log(this.$route.query)
      if (this.$route.query.VisitCode) {
        this.parameters.VisitCode = this.$route.query.VisitCode + ''
        this.$route.query.VisitCode = ''
        return Object.assign({}, this.parameters, {
          ToDate: moment(this.parameters.ToDate, 'DD/MM/YYYY').format('YYYY-MM-DD')
        })
      }
      if (this.parameters.FromDate != null && this.parameters.ToDate != null) {
        return Object.assign({}, this.parameters, {
          FromDate: moment(this.parameters.FromDate, 'DD/MM/YYYY').format('YYYY-MM-DD'),
          ToDate: moment(this.parameters.ToDate, 'DD/MM/YYYY').format('YYYY-MM-DD')
        })
      } else {
        return Object.assign({}, this.parameters, {
          FromDate: moment(Date.now(), 'DD/MM/YYYY').format('YYYY-MM-DD'),
          ToDate: moment(Date.now(), 'DD/MM/YYYY').format('YYYY-MM-DD')
        })
      }
    },
    btnGetData () {
      this.getPrescription()
    },
    resetFilter () {
      this.$refs.userAd.clear()
      this.parameters = {
        pageNumber: 1,
        PageSize: process.env.PAGE_SIZE,
        // FromDate: moment().subtract(7, 'day').startOf('day').format('DD/MM/YYYY'),
        // ToDate: moment().endOf('day').format('DD/MM/YYYY'),
        FromDate: null,
        ToDate: null,
        PrescriberAD: null,
        VisitCode: null
      }
      this.getPrescription()
    },
    viewDetail (item) {
      console.log(item)
    }
  }
}
</script>
