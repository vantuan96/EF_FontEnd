<template>
  <div class="main-content" id="Home-page">
    <div class="row v-flexbox">
      <div class="col-md-12 col-sm-12">
        <div class="search-group box">
          <form v-on:submit.prevent="getData()">
            <label>{{__t('home.tim_kiem_benh_nhan') }}</label>
            <div class="input-group input-group-lg">
              <input type="text" class="form-control" v-model.trim="parameters.PID" :placeholder="__t('Nhập PID để tìm kiếm...')">
              <span class="input-group-btn">
                <button type="button" class="btn btn-flat v-yellow-btn" @click="getData()"><i class="fa fa-search" aria-hidden="true"></i> {{__t('home.tim_kiem') }}</button>
              </span>
            </div>
          </form>
        </div>
        <div class="text-right">
          <button class="btn btn-sm mr-10 btn-info" @click="$router.push({path: '/DoctorPlaceDiagnostics/OrderSets/'})">{{__t('Tạo gói cá nhân')}}</button>
        </div>
      </div>
    </div>
    <div class="text-center" v-if="loading">
      <v-loading/>
    </div>
    <div v-if="response">
      <div class="sync-ed-box">
        <table class="table table-striped table-bordered" id="customer-tbl">
          <thead>
            <tr>
              <td><b>{{__t('Thông tin bệnh nhân')}}</b></td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                PID: <b>{{response.Customer.PID}} - {{response.Customer.Fullname}}</b> <vip-icon :data="response.Customer"/> - {{response.Customer.DateOfBirthConverted || response.Customer.DateOfBirth}}
                <div>{{__t('Địa chỉ')}}: {{response.Customer.Address}}</div>
                <router-link :to="{name: 'DoctorPlaceDiagnosticsOrder-History', params: {PID: parameters.PID, VisitCode: 'view'}}">
                  {{__t('Xem lịch sử chỉ định của bệnh nhân')}}<br/>
                </router-link>
              </td>
            </tr>
          </tbody>
        </table>
        <div v-if="response.Visit && response.Visit.length">
          <table class="table table-striped table-bordered" id="customer-tbl">
            <thead>
              <tr>
                <td colspan="2"><b>{{__t('Kết quả')}} ({{response.Visit.length}})</b></td>
                <td>{{__t('Chọn')}}</td>
              </tr>
            </thead>
            <tbody>
              <tr :data="visitcode" :key="index" v-for="(visitcode, index) in response.Visit">
                <td width="200px" style="vertical-align: top;">
                  <div class="no-wrap" style="font-size: 16px"><b>{{__t('Lượt khám')}}: {{visitcode.VisitTypeName}}</b></div>
                  <b>{{__t('Ngày vào viện')}}: <p class="no-wrap highlighted-text">{{visitcode.ActualVisitDate}}</p></b>
                </td>
                <td>
                  <div>{{__t('Khu vực')}}: {{visitcode.AreaName}}</div>
                  <div>{{__t('BS')}}: <ad-Info :ad="visitcode.DoctorAD" /></div>
                  <div>{{__t('Mã tiếp nhận')}}: {{visitcode.VisitCode}}</div>
                  <span v-if="!visitcode.PatientLocationId" class="msg-error">{{__t('BN chưa được gán khu vực, vui lòng kiểm tra lại')}}</span>
                  <span v-else-if="!visitcode.CostCentreId" class="msg-error">{{__t('Khu vực bệnh nhân chưa được thiết lập Cost Centre, vui lòng kiểm tra lại')}}</span>
                  <span v-else></span>
                </td>
                <td width="50">
                  <button :disabled="!visitcode.PatientLocationId || !visitcode.CostCentreId || !visitcode.DoctorAD" class="btn btn-block btn-warning" @click="updateVisitCode(visitcode.VisitCode, visitcode.PatientLocationCode)">{{__t('Chọn')}}</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <template v-else-if="response.Visit && response.Visit.length === 0">
          <div class="callout callout-warning">
            <h4>{{__t('Không tìm thấy mã lượt khám của bệnh nhân!')}}</h4>
            <p>{{__t('Vui lòng kiểm tra lại thông tin trên eHos/OH')}}.</p>
          </div>
        </template>
      </div>
    </div>
    <div class="text-center" v-else>
      <template v-if="loaded">{{__t('Không có dữ liệu')}}</template>
      <template v-else>
      </template>
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
import DoctorPlaceDiagnosticsOrder from '@/services/DoctorPlaceDiagnosticsOrder'
import VipIcon from '../../components/global/VipIcon.vue'

export default {
  /**
   * The name of the page.
   */
  name: 'DoctorPlaceDiagnosticsOrder-Search',
  data () {
    return {
      loading: false,
      Error: '',
      response: null,
      loaded: false,
      parameters: {
        PID: ''
      }
    }
  },
  /**
   * The components that the page can use.
   */
  components: {
    VipIcon
  },
  mounted () {
    // this.getData()
    this.checkquery()
  },
  computed: {
  },
  methods: {
    updateVisitCode (VisitCode, PatientLocationCode) {
      var query = this.$route.query
      query.PatientLocationCode = PatientLocationCode
      delete query.VisitCode
      this.$router.push({path: '/DoctorPlaceDiagnosticsOrder/' + this.response.Customer.PID + '/' + VisitCode, query: query})
    },
    checkquery () {
      if (this.$route.query.PID) {
        this.parameters.PID = this.$route.query.PID
        setTimeout(() => {
          this.getData()
        }, 200)
      }
    },
    getData () {
      if (!this.parameters.PID) return false
      this.loading = true
      this.response = null
      this.loaded = false
      new DoctorPlaceDiagnosticsOrder(this.parameters)
        .find('Customer')
        .then(response => {
          this.loading = false
          this.response = response
          this.loaded = true
        }).catch(e => {
          this.loading = false
          this.loaded = true
        })
    }
  }
}
</script>
