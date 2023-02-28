<template>
  <div class="content">
    <!-- filter -->
    <div class="row container mt-10" style="width: 100%; display: flex;">
      <div class="col-2 form-group" style="width: 100%; display: inline-table">
        <label>{{__t('Từ ngày')}}</label>
        <VDateTimePicker3 :format="vDateTimeFormat" v-model="parameters.FromDate" :max="getToDateTime"/>
      </div>
      <div class="col-2 form-group" style="width: 100%; display: inline-table">
        <label>{{__t('Đến ngày')}}</label>
        <VDateTimePicker3 :format="vDateTimeFormat" v-model="parameters.ToDate" :min="getFromDateTime" :max="now"/>
      </div>
      <div class="col-4 form-group" style="width: 100%; display: inline-table; margin-left: 36px;">
        <label>{{__t('Noi_tru_san.nguoi_thuc_hien')}}</label>
        <user-ad v-model="parameters.Assessor" ref="userAd" :placeholder="__t('Nhập để tìm kiếm')"/>
      </div>
      <div class="col-3 form-group" style="width: 100%; display: inline-table; margin-top: 25px; margin-left: 20px;">
        <button class="btn btn-flat v-yellow-btn" style="margin-right: 20px" @click="getData()">{{__t("Lọc")}}</button>
        <button class="btn btn-flat" @click="clearFilter()">{{__t('Noi_tru_san.xoa_bo_loc')}}</button>
      </div>
    </div>
    <table class="standing-order-tbl" v-if="data">
      <tr>
        <th width="1" class="no-wrap">{{__t('STT')}}</th>
        <th width="100" class="no-wrap">{{__t('Noi_tru_san.thoi_gian')}}</th>
        <th width="1" class="no-wrap">{{__t('Tổng điểm')}}</th>
        <th width="1" class="no-wrap">{{__t('Noi_tru_san.phan_loai')}}</th>
        <th>{{__t('Can thiệp')}}</th>
        <th>{{__t('Noi_tru_san.nguoi_thuc_hien')}}</th>
        <th width="1"  class="no-wrap">{{__t('Chi tiết')}}</th>
      </tr>
      <template v-if="data && data.length === 0">
        <tr>
          <td colspan="7" class="text-center">{{__t('Không có dữ liệu')}}</td>
        </tr>
      </template>
      <template  v-for="(item, index) in data">
        <tr :key="index + '-root-tr'" :class="{'view-full': item.view}">
          <td class="text-center" style="vertical-align:top">{{((parameters.pageNumber - 1) * parameters.PageSize) + (index + 1)}}</td>
          <td style="vertical-align:top">{{item.CreatedAt | formatDateWithoutSecon}}</td>
          <td style="vertical-align:top">{{item.Total}}</td>
          <td style="vertical-align:top">{{__t(LEVELS[item.Level])}}</td>
          <td style="vertical-align:top" class="no-padding"><Intervention ref="Intervention" :view="item.view" :Intervention="item.Intervention" /></td>
          <!-- <div class="intervention-view" :class="{'show-border': !item.showBtn}">
            <div :key="index" v-for="(item, index) in item.Intervention" class="mb-5">
              <i class="fa fa-check fa-2 green-color" aria-hidden="true"></i> {{__label(item)}}
            </div>
          </div> -->
          <td style="vertical-align:top"><ad-Info v-if="item.CreatedBy" :ad="item.CreatedBy" /></td>
          <td style="vertical-align:top"><button class="btn btn-sm" @click="openMorse(item.Id)"><i class="fa fa-pencil-square-o" aria-hidden="true"></i> {{__t('Chi tiết')}}</button></td>
        </tr>
        <tr :key="index + '-action-tr'" v-if="item.showBtn" :class="{'view-full': item.view}">
          <td class="text-center" colspan="7" style="padding-top: 0">
            <button @click="showMore(item)" class="btn v-green-btn v-bottom-btn btn-swit-icon">
              <span class="span-down-cion">{{__t('Mở rộng')}}</span>
              <span class="span-up-cion">{{__t('Thu gọn')}}</span>
            </button>
          </td>
        </tr>
      </template>
      <!-- phân trang -->
      <tfoot v-if="data && data.length > 0">
        <tr>
          <td colspan="7">
            <template>
              <div class="flex space-between">
                <div>
                  <paginate
                  :clickHandler="getData"
                  :container-class="'pagination pagination-sm no-margin v-pagination'"
                  :next-text="'»'"
                  :page-count="parameters.pages"
                  :prev-text="'«'"
                  v-if="data.length > 0"
                  v-model="parameters.pageNumber">
                  </paginate>
                </div>
                <div class="box-record">
                  <p>{{__t('Noi_tru_san.hien_thi')}}: {{data.length + '/' + totalRow}} {{__t('Noi_tru_san.trang')}}</p>
                </div>
              </div>
            </template>
          </td>
        </tr>
      </tfoot>
    </table>
    <br/>
    <Morse :readonly="readonly" :formId="formId" ref="Morse"/>
    <br/>
    <br/>
    <p style="padding: 5px; background: #cccccc73; border-radius: 3px;">{{__t('Tham khảo từ bài viết “Xây dựng công cụ đánh giá ngã cho người bệnh tại đơn vị Sản. Tạp chí chăm sóc sức khỏe điều dưỡng cho phụ nữ”. Vol 17, số 2, tháng 4 và 5/2013. Trang 98 tới 107')}}</p>
    <br/>
    <div>
      <logs v-if="!readonly" :EdId="this._VisitId" :Type="'FallRiskAssessment/Obstetric'" :noDetail="true" />
      <p>A02_049_301220_VE</p>
      <div v-if="LastUpdated">
        <p>{{__t('Chỉnh sửa lần cuối bởi')}} <AdInfo :ad="LastUpdated.UpdatedBy" /> {{__t('lúc')}} {{LastUpdated.UpdatedAt | formatDateWithoutSecon}}</p>
      </div>
    </div>
  </div>
</template>
<script>
// import MortalityReport from '@/services/ED/MortalityReport'
import VDateTimePicker from '@/components/VDateTimePicker.vue'
import VDateTimePicker3 from '@/components/VDateTimePicker3.vue'
import UsersSelect2 from '@/components/UsersSelect2.vue'
import MixinForm from '@/mixins/form.js'
import Logs from '@/components/Logs.vue'
import Morse from './MorseObstetric.vue'
import MixinMasterData from '@/mixins/masterdata.js'
import Intervention from './Intervention.vue'
import FallRiskAssessment from '@/services/IPD/FallRiskAssessment'
import moment from 'moment'
// import $ from 'jquery'
import _ from 'lodash'
export default {
  name: 'FallRiskAssessmentObstetric',
  props: ['readonly', 'VisitId'],
  components: {
    VDateTimePicker, VDateTimePicker3, Logs, Morse, Intervention, UsersSelect2
  },
  mixins: [MixinForm, MixinMasterData],
  data () {
    return {
      data: null,
      DataSubmit: {
      },
      formId: null,
      LEVELS: ['Noi_tru_san.thap', 'Noi_tru_san.trung_binh', 'Noi_tru_san.cao'],
      totalRow: '',
      parameters: {
        pageNumber: 1,
        pages: 1,
        PageSize: 5,
        FromDate: moment().subtract(7, 'day').startOf('day').format('HH:mm DD/MM/YYYY'),
        ToDate: moment().format('HH:mm DD/MM/YYYY'),
        Assessor: this.$store.state.account.Username
      },
      LastUpdated: {},
      now: moment().format('HH:mm DD/MM/YYYY')
    }
  },
  mounted () {
    this.getData()
  },
  computed: {
    getToDateTime: function () {
      return this.parameters.ToDate !== 'Invalid date' ? this.parameters.ToDate : this.now
    },
    getFromDateTime () {
      return this.parameters.FromDate === this.now ? '' : this.parameters.FromDate
    }
  },
  methods: {
    showMore (item) {
      item.view = !item.view
    },
    openMorse (id) {
      this.$refs.Morse.open(id)
    },
    close () {
    },
    getData () {
      if (!this.parameters.Assessor) {
        this.parameters.Assessor = ''
      }
      if (this.parameters.ToDate === 'Invalid date') {
        this.parameters.ToDate = null
      }
      if (this.parameters.FromDate === 'Invalid date') {
        this.parameters.FromDate = null
      }
      new FallRiskAssessment(this.parameters).find('Obstetric/' + this._VisitId).then(response => {
        this.LastUpdated = response.LastUpdated
        response.fall_risk.forEach(e => {
          e.showBtn = (this.JSONParse(e.Intervention) || []).length > 3
          e.view = !e.showBtn
          e.Intervention = e.Intervention
        })
        this.totalRow = response.Paging.Count
        this.parameters.pages = response.Paging.TotalPage
        this.data = _.cloneDeep(response.fall_risk)
      }).catch(e => {
        // this._401ResponseError(e)
      })
    },
    handleFilter () {
      if (!this.parameters.Assessor) {
        this.parameters.Assessor = ''
      }
      this.parameters.pageNumber = 1
      this.parameters.pages = 1
      this.getData()
    },
    clearFilter () {
      this.$refs.userAd.clear()
      this.parameters = {
        FromDate: null,
        ToDate: null,
        Assessor: null,
        pageNumber: 1,
        pages: 1,
        PageSize: 5
      }
      this.getData()
    }
  }
}
</script>
<style scoped>
.show-border {
  border-bottom: 1px solid #dadce0;
}
</style>
