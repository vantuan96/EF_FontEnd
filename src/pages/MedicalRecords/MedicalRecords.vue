<template>
  <div class="main-content" id="Home-page">
    <h1 class="title-page">{{ __t('Kho HSBA') }}</h1>
    <div class="row v-flexbox">
      <div class="col-md-12 col-sm-12">
        <div class="search-group">
          <form v-on:submit.prevent="getData()">
            <label>{{__t('home.tim_kiem_benh_nhan') }}</label>
            <div class="input-group input-group-lg">
              <input type="text" class="form-control" v-model.trim="parameters.Search" :placeholder="__t('Nhập PID để tìm kiếm...')">
              <span class="input-group-btn">
                <button type="button" class="btn btn-flat v-yellow-btn" @click="getData()"><i class="fa fa-search" aria-hidden="true"></i> {{ __t('home.tim_kiem') }}</button>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
    <template v-if="Records">
      <div v-if="Records.length">
        <h1 class="title-page">{{__t('Danh sách hồ sơ bệnh án')}} - <span class="count-data"><label>{{count}}</label> {{__t('kết quả')}}</span></h1>
        <table class="table table-striped table-bordered v-table" id="customer-tbl">
          <tbody>
            <template v-if="Records.length">
              <tr class="custom-table-head" style="background-color: #337AB7 !important;">
                <td><b>{{__t('Stt')}}</b></td>
                <td><b>{{__t('PID')}}</b></td>
                <td><b>{{__t('Họ và tên')}}</b></td>
                <td><b>{{__t('Ngày sinh')}}</b></td>
                <td><b>{{__t('Số điện thoại')}}</b></td>
                <td><b>{{__t('Ngày tạo hồ sơ')}}</b></td>
                <td><b>{{__t('Chi tiết')}}</b></td>
              </tr>
              <tr :data="item" :key="((parameters.pageNumber - 1) * parameters.PageSize) + (index + 1)" v-for="(item ,index) in Records">
                <td width="40" align="center">{{((parameters.pageNumber - 1) * parameters.PageSize) + (index + 1)}}</td>
                <td width="100">{{ item.PID }}</td>
                <td>{{ item.Fullname }}</td>
                <td width="150">{{ item.DateOfBirth }}</td>
                <td width="150">{{ item.Phone }}</td>
                <td width="150">{{ item.CreatedAt }}</td>
                <td width="100" style="text-align: center;">
                  <router-link :to="{name: 'PatientRecordsMenu', params: { Id: item.PID }}">
                    <button class="btn v-yellow-btn" type="button">{{__t('Chi tiết')}}</button>
                  </router-link>
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
              <td colspan="7">
                <paginate
                :clickHandler="getData"
                :container-class="'pagination pagination-sm no-margin v-pagination'"
                :next-text="'»'"
                :page-count="parameters.pages"
                :prev-text="'«'"
                v-if="Records.length > 0"
                v-model="parameters.pageNumber">
                </paginate>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
      <div class="text-center" v-else>
        {{__t('Không có dữ liệu')}}
      </div>
    </template>
  </div>
</template>
<script>
/* ============
 * Add cusotmer Page
 * ============
 *
 * The home index page.
 */
// import $ from 'jquery'
import MedicalRecords from '@/services/MedicalRecords'
import VDatePicker from '@/components/VDateTimePicker.vue'

export default {
  /**
   * The name of the page.
   */
  name: 'Medical-Records',
  data () {
    return {
      parameters: {
        Search: '',
        pID: null,
        fullname: null,
        phone: null,
        dateOfbirth: null,
        startCreatedAt: null,
        endCreatedAt: null,
        pageNumber: 1,
        pages: 1,
        maxPageSize: 1000,
        PageSize: process.env.PAGE_SIZE
      },
      // type: 1,
      count: 0,
      Records: null
    }
  },
  /**
   * The components that the page can use.
   */
  components: {
    VDatePicker
  },
  mounted () {
    if (this.$route.query.PIDNB && !this.parameters.Search) {
      this.parameters.Search = this.$route.query.PIDNB
      this.getData()
    }
  },
  computed: {
    // width () {
    //   return $('.container').width() / 2
    // }
  },
  methods: {
    searchAction () {
      this.parameters.pageNumber = 1
      this.getData()
    },
    resetFilter () {
      this.parameters = {
        pID: null,
        fullname: null,
        phone: null,
        dateOfbirth: null,
        startCreatedAt: null,
        endCreatedAt: null,
        pageNumber: 1,
        pages: 1,
        maxPageSize: 1000,
        PageSize: process.env.PAGE_SIZE
      }
      this.getData()
    },
    updateQuery () {
      return Object.assign({}, this.parameters, {
        pID: this.parameters.pID,
        fullname: this.parameters.fullname,
        phone: this.parameters.phone,
        dateOfbirth: this.parameters.dateOfbirth,
        startCreatedAt: this.parameters.startCreatedAt,
        endCreatedAt: this.parameters.endCreatedAt
      })
    },
    getData () {
      new MedicalRecords(this.updateQuery())
        .all()
        .then(response => {
          this.Records = response.results || []
          var bonussssss = 1
          if ((response.count % this.parameters.PageSize) === 0) {
            bonussssss = 0
          }
          this.count = response.count
          this.parameters.pages = parseInt(response.count / this.parameters.PageSize) + bonussssss
        })
    }
  },
  created () {
  },
  beforeDestroy () {
  }
}
</script>
<style scoped lang="stylus">
  .search-group {
    background: #fff;
  }
</style>
