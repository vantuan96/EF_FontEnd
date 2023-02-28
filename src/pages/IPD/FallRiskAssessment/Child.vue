<template>
 <div class="">
  <div
  v-if="routeName === 'IPDFallRiskAssessmentChild'"
   class="row container mt-10"
   style="width: 100%; display: flex; margin-left: -10px"
  >
   <div style="width: 100%; display: inline-table">
    <label>{{ __t("Từ ngày") }}</label>
    <v-date-time-picker
     :format="vDateTimeFormat"
     :allday="'allday'"
     v-model="query.FromDate"
     :max="query.ToDate"
    ></v-date-time-picker>
   </div>
   <div style="width: 100%; display: inline-table">
    <label>{{ __t("Đến ngày") }}</label>
    <v-date-time-picker
     :format="vDateTimeFormat"
     :allday="'allday'"
     v-model="query.ToDate"
     :min="query.FromDate"
    ></v-date-time-picker>
   </div>
   <div
    style="width: 100%; display: inline-table; margin-left: 36px"
   >
    <label style="display: inline-block">{{ __t("Người đánh giá") }}</label>
    <div>
     <user-ad
      v-model="query.UserLogin"
      ref="userAd"
      :placeholder="__t('Điều dưỡng/ Bác sĩ')"
     />
    </div>
    <!-- <UsersSelect2 v-model="query.Assessor" /> -->
   </div>
   <div
    style="width: 100%; display: inline-table; margin-top: 25px; margin-left: 20px;"
   >
    <button
     class="btn btn-flat v-yellow-btn"
     style="margin-right: 20px"
     @click="getData();"
    >
     {{ __t("Lọc") }}
    </button>
    <button class="btn btn-flat" @click="clearFilter();">
     {{ __t("Xóa bộ lọc") }}
    </button>
   </div>
  </div>
  <table class="standing-order-tbl mt-10" v-if="data">
   <tr>
    <th width="1" class="text-left">{{ __t("women.stt") }}</th>
    <th width="140" class="no-wrap">{{ __t("women.datetime") }}</th>
    <th width="2" class="no-wrap">{{ __t("women.totalPoint") }}</th>
    <th width="1" class="no-wrap">{{ __t("women.level") }}</th>
    <th>{{ __t("women.intervention") }}</th>
    <th>{{ __t("women.userAssess") }}</th>
    <th width="1" class="no-wrap">{{ __t("women.detail") }}</th>
   </tr>
   <template v-for="(item, index) in data">
    <tr :key="index + '-root-tr'" :class="{ 'view-full': item.view }">
     <td style="vertical-align:top">{{ query.PageNumber * 30 - 30 +  index + 1 }}</td>
     <td style="vertical-align:top">{{ item.CreatedAt }}</td>
     <td v-if="item.Total === 9999" style="vertical-align:top">{{ __t("women.36month") }}</td>
     <td v-else style="vertical-align:top">{{ item.Total }}</td>
     <td style="vertical-align:top">{{__t(item.Level)}}</td>
     <td style="vertical-align:top" class="no-padding">
      <!--
       <Intervention :view="item.view" :Intervention="item.Intervention" />
      -->
      <div class="intervention-view">
       <div
        :key="index"
        v-for="(item, index) in item.Intervention"
        class="mb-5"
       >
        <i class="fa fa-check fa-2 green-color" aria-hidden="true"></i>
        {{ __label(item) }}
       </div>
      </div>
     </td>
     <td style="vertical-align:top">
      <ad-Info v-if="item.CreatedBy" :ad="item.CreatedBy" />
     </td>
     <td style="vertical-align:top">
      <button class="btn btn-sm" @click="openMorse(item.Id);">
       <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
       {{ __t("women.detail") }}
      </button>
     </td>
    </tr>
    <tr
     :key="index + '-action-tr'"
     v-if="item.showBtn"
     :class="{ 'view-full': item.view }"
    >
     <td class="text-center" colspan="6" style="padding-top: 0">
      <button
       @click="showMore(item);"
       class="btn v-green-btn v-bottom-btn btn-swit-icon"
      >
       <span class="span-down-cion">{{ __t("Mở rộng") }}</span>
       <span class="span-up-cion">{{ __t("Thu gọn") }}</span>
      </button>
     </td>
    </tr>
   </template>
   <template v-if="data && data.length === 0">
    <tr>
     <td colspan="8" class="text-center hide-counter">
      {{ __t("Chưa có thông tin") }}
     </td>
    </tr>
   </template>
  </table>

  <div class="mt-10" v-if="data && data.length > 0">
   <paginate
    :clickHandler="changePaginValue"
    :container-class="'pagination pagination-sm no-margin v-pagination'"
    :next-text="'»'"
    :page-count="query.Pages"
    :prev-text="'«'"
    v-model="query.PageNumber"
   >
   </paginate>
  </div>

  <br />
  <!-- <ChildTable -->
  <ChildTable :readonly="readonly" :formId="formId" ref="ChildTable" />
  <br />
  <br />
  <div>
   <logs
    v-if="!readonly"
    :EdId="this.$route.params.Id"
    :Type="'FallRiskAssessment/Adult'"
    :noDetail="true"
   />
   <p>A02_047_301220_VE</p>
  </div>
 </div>
</template>
<script>
// import MortalityReport from '@/services/ED/MortalityReport'
// import VDatePicker from '@/components/VDateTimePicker.vue'
import MixinForm from '@/mixins/form.js'
import Logs from '@/components/Logs.vue'
import ChildTable from './ChildTable.vue'
import MixinMasterData from '@/mixins/masterdata.js'
import Intervention from './Intervention.vue'
import FallRiskAssessment from '@/services/IPD/FallRiskAssessment'
import UsersSelect2 from '@/components/UsersSelect2.vue'
import VDateTimePicker from '@/components/VDateTimePicker.vue'
import DateRangePicker from 'vue2-daterange-picker'
import 'vue2-daterange-picker/dist/vue2-daterange-picker.css'
// import $ from 'jquery'
// import _ from 'lodash'
// import moment from 'moment'
export default {
  name: 'FallRiskAssessmentAdult',
  mixins: [MixinForm, MixinMasterData],
  props: ['readonly', 'VisitId'],
  data () {
    return {
      data: null,
      responseList: [],
      routeName: this.$route.name,
      query: {
        VisitId: null,
        UserLogin: this.$route.name === 'IPDFallRiskAssessmentChild' ? this.$store.state.account.Username : '',
        Assessor: {
          Username: '',
          Fullname: ''
        },
        FromDate: null,
        ToDate: null,
        PageNumber: 1,
        PageSize: 30,
        Pages: 1
      },
      DataSubmit: {
      },
      formId: null,
      LEVELS: ['Thấp', 'Trung Bình', 'Cao']
    }
  },
  components: {
    VDateTimePicker, Logs, ChildTable, Intervention, UsersSelect2, DateRangePicker
  },
  mounted () {
    // Assessor: {
    //       Username: '',
    //       Fullname: ''
    //     },
    // if (this.$route.name !== 'IPDFallRiskAssessmentChild') {
    //   console.log('khác')
    // } else {
    //   this.query.UserLogin = this.$store.state.account.Username
    // }
    // eslint-disable-next-line no-unused-expressions
    // this.query.Assessor.Username = 'thanhnt135'
    // this.query.Assessor.Fullname = 'Thành Nguyễn Trung'
    this.getData()
  },
  // watch: {
  //   'query.UserLogin' (val) {
  //     console.log('k', val)
  //   }
  // },
  computed: {
    someThing: function () {
      return []
    }
  },
  methods: {
    changePaginValue (value) {
      this.query.PageNumber = value
      // this.query.PageSize = 5
      this.getData()
    },
    showMore (item) {
      item.view = !item.view
    },
    openMorse (id) {
      this.$refs.ChildTable.open(id)
    },
    close () {
    },
    clearFilter () {
      this.$refs.userAd.clear()
      const a = {
        VisitId: null,
        UserLogin: null,
        Assessor: {
          Username: '',
          Fullname: ''
        },
        FromDate: null,
        ToDate: null,
        PageNumber: 1,
        PageSize: 30
      }
      this.query = a
      this.getData()
    },
    getData () {
      // if (this.$query.name === 'IPDFallRiskAssessmentChild') {

      // }
      const params = {
        ...this.query,
        VisitId: this.VisitId ? this.VisitId : this.$route.params.Id,
        Assessor: this.query.UserLogin ? this.query.UserLogin : ''
      }
      if (this.$route.name !== 'IPDFallRiskAssessmentChild') {
        delete params.Assessor
      }
      new FallRiskAssessment(params).find('Pediatric/All').then(response => {
        response.fallRicks.forEach(e => {
          e.showBtn = (this.JSONParse(e.Intervention) || []).length > 3
          e.view = !e.showBtn
          e.Intervention = this.JSONParse(e.Intervention)
        })
        // this.query.PageNumber = response.Paging.numberPage
        this.query.Pages = response.Paging.numberPage
        this.data = response.fallRicks
      }).catch(e => {
        // this._401ResponseError(e)
      })
    }
  }
}
</script>
