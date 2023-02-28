<template>
 <div class="">
  <h2 class="text-center font-bold font28 uppercase">{{ __t("women.TitleGlam") }}</h2>
  <div class="row container mt-10" style="width: 100%; display: flex;">
  <!-- <h5 class="text-center msg-no-data" >{{__t('Chưa có thông tin')}}</h5> -->
   <div class="col-2 form-group" style="width: 100%; display: inline-table">
    <label>{{ __t("women.From") }}</label>
    <v-date-time-picker
     :format="vDateTimeFormat"
     :allday="'allday'"
     v-model="query.FromDate"
     :max="query.ToDate"
    ></v-date-time-picker>
   </div>
   <div class="col-2 form-group" style="width: 100%; display: inline-table">
    <label>{{ __t("women.To") }}</label>
    <v-date-time-picker
     :format="vDateTimeFormat"
     :allday="'allday'"
     v-model="query.ToDate"
     :min="query.FromDate"
    ></v-date-time-picker>
   </div>
   <div
    class="col-4 form-group"
    style="width: 100%; display: inline-table; margin-left: 36px; min-width: 350px"
   >
    <label style="display: inline-block">{{ __t("women.userAssessGlam") }}</label>
    <UsersSelect2 v-model="query.Assessor" />
   </div>
   <div
    class="col-3 form-group"
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
  <table class="standing-order-tblnew" v-if="data">
   <tr>
    <th width="1" class="text-left">{{ __t("women.stt") }}</th>
    <th width="140" style="text-align:center" class="no-wrap">{{ __t("women.datetime") }}</th>
    <th width="1" class="no-wrap" style="text-align:center">{{ __t("women.totalPoint") }}</th>
    <th width="100" style="text-align:center" class="no-wrap">{{ __t("women.Classsify") }}</th>
    <th style="text-align:center">{{ __t("women.intervention") }}</th>
    <th width="200" style="text-align:center">{{ __t("women.userAssessGlam") }}</th>
    <th width="1" style="text-align:center" class="no-wrap">{{ __t("women.detail") }}</th>
   </tr>
   <tr v-if="data.length === 0">
    <td colspan="7" class="text-center">{{__t('Chưa có thông tin')}}</td>
   </tr>
   <template v-else v-for="(item, index) in data">
    <tr :key="index + '-root-tr'" :class="{ 'view-full': item.view }">
    <td style="vertical-align:top">{{ query.PageNumber * 5 - 5 +  index + 1 }}</td>
     <td style="vertical-align:top">{{ item.StartingAssessment | formatDateHourMinutesDDMMYYY }}</td>
     <td style="vertical-align:top; text-align:center">{{ item.Total }}</td>
     <td style="vertical-align:top">{{__t(item.Level)}}</td>
     <td style="vertical-align:top" class="no-padding">
      <!-- <Intervention :view="item.view" :Intervention="item.Intervention" /> -->
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
      <div class="intervention-view" style="margin-top: -10px">
       <div
       v-if="item.value"
        :key="index"
        v-for="(item, index) in item.InterventionOther"
        class="mb-5"
       >
        <i class="fa fa-check fa-2 green-color" aria-hidden="true"></i>
        {{item.text}}
        <!-- {{ __label(item) }} -->
       </div>
      </div>
     </td>
     <td class="no-wrap">
        <template v-if="Version >= 9">
          <SingleConfirm
            v-if="loadConfirm"
            :key="reset"
            :kind="'Glamorgan_USERCREATED'"
            :FormCode="'A02_066_050919_VE'"
            :item="item" :readonly="getReadonLy(item)"
            :dataVerOld="item.CreatedBy"
            :viewOnly="false"
            :hideLabel="true"
            :title="'Người thực hiện'"/>
        </template>
        <template v-else>
          <ad-Info v-if="item.CreatedBy" :ad="item.CreatedBy" />
        </template>
      </td>
     <!-- <td style="vertical-align:top">
      <ad-Info v-if="item.CreatedBy" :ad="item.CreatedBy" />
     </td> -->
     <td style="vertical-align:top">
      <button class="btn btn-sm" @click="openMorse(item.Id);">
       <i class="fa fa-pencil-square-o" aria-hidden="true"></i> {{ __t("women.detail") }}
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
  </table>
  <div class="mt-10" v-if="this.data && this.data.length > 0">
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
    <LastUpdateWithFormCode :FormCode="'A02_066_050919_VE'" :DataSubmit="DataSubmit"/>
  </div>
  <FloatBlock v-if="!readonly" :openBack="true" @handleBack="handleBack">
    <template slot="buttons">
     <div class="col-md-2 col-sm-2"><div class="form-group1"></div></div>
     <div class="col-md-8 col-sm-">
      <div style="float:right" v-if="!IsLocked">
        <button style="width:275px" class="btn v-yellow-btn pull-right btn-block hvr-ripple-out" type="button" v-shortkey="['ctrl', 's']" @click="openMorse()"><i class="fa fa-floppy-o" aria-hidden="true"></i> {{__t('Thêm lượt đánh giá')}}</button>
      </div>
     </div>
    </template>
   </FloatBlock>
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
import Glamorgan from '@/services/IPD/Glamorgan'
import UsersSelect2 from '@/components/UsersSelect2.vue'
import VDateTimePicker from '@/components/VDateTimePicker.vue'
import DateRangePicker from 'vue2-daterange-picker'
import moment from 'moment'
import SingleConfirm from '@/components/Form/SingleConfirm.vue'
import 'vue2-daterange-picker/dist/vue2-daterange-picker.css'

// import $ from 'jquery'
// import _ from 'lodash'
// import moment from 'moment'
export default {
  name: 'GlamorganAdult',
  mixins: [MixinForm, MixinMasterData],
  props: ['readonly', 'VisitId'],
  data () {
    return {
      reset: 0,
      loadConfirm: false,
      IsLocked: false,
      data: null,
      Version: 0,
      query: {
        VisitId: this.VisitId,
        Assessor: {
          Username: '',
          Fullname: ''
        },
        FromDate: moment().subtract(7, 'day').startOf('day').format('HH:mm DD/MM/YYYY'),
        ToDate: moment().format('HH:mm DD/MM/YYYY'),
        // FromDate: moment().subtract(7, 'day').startOf('day').format('HH:mm DD/MM/YYYY'),
        // ToDate: moment().format('HH:mm DD/MM/YYYY'),
        PageNumber: 1,
        PageSize: 5,
        Pages: 1
      },
      DataSubmit: {
      },
      formId: null,
      LEVELS: ['Thấp', 'Trung Bình', 'Cao']
    }
  },
  components: {
    VDateTimePicker, Logs, ChildTable, Intervention, UsersSelect2, DateRangePicker, SingleConfirm
  },
  mounted () {
    console.log('getuser', this.getUser())
    this.getData()
  },
  // watch: {
  //   'query.Assessor' (val) {
  //     if (!this.query.Assessor) {
  //       console.log('k')
  //     } else {
  //       console.log('co')
  //     }
  //   }
  // },
  computed: {
    someThing: function () {
      return []
    },
    isReadonly: function () {
      return this.readonly || this.IsLocked
    }
  },
  methods: {
    getReadonLy (item) {
      if (this.readonly) {
        return true
      } else {
        return item.IsLocked
      }
    },
    handleBack () {
      this.back()
    },
    changePaginValue (value) {
      this.query.PageNumber = value
      this.query.PageSize = 5
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
      const a = {
        VisitId: null,
        Assessor: {
          Username: '',
          Fullname: ''
        },
        FromDate: null,
        ToDate: null,
        PageNumber: 1,
        PageSize: 5
      }
      this.query = a
      this.getData()
    },
    getData () {
      // delete this.query.Pages
      const params = {
        ...this.query,
        VisitId: this.VisitId ? this.VisitId : this.$route.params.Id,
        Assessor: this.query.Assessor ? this.query.Assessor.Username : ''
      }
      new Glamorgan(params).find('A02_066_050919_VE/All').then(response => {
        this.IsLocked = response.IsLocked
        this.DataSubmit = {
          UpdatedAt: response.UpdatedAt,
          UpdatedBy: response.UpdatedBy
        }
        // response.fallRicks.forEach(e => {
        //   e.showBtn = (this.JSONParse(e.Intervention) || []).length > 3
        //   e.view = !e.showBtn
        //   e.Intervention = this.JSONParse(e.Intervention)
        // })
        response.Glamorgans.forEach(e => {
          e.showBtn = (this.JSONParse(e.Intervention) || []).length > 3
          e.view = !e.showBtn
          e.Intervention = this.JSONParse(e.Intervention)
          e.InterventionOther = this.JSONParse(e.InterventionOther)
          // if (localStorage.getItem('locale') === 'en') {
          //   if (e.Level === 'Nguy cơ thấp') {
          //     e.Level = 'At risk'
          //   }
          //   if (e.Level === 'Nguy cơ cao') {
          //     e.Level = 'High risk'
          //   }
          //   if (e.Level === 'Nguy cơ rất cao') {
          //     e.Level = 'Very high risk'
          //   }
          // }
        })
        this.query.Pages = response.Paging.numberPage
        this.data = response.Glamorgans
        console.log('data', this.data)
        this.Version = response.Version
        // for (let i = 0; i <= this.data.length; i++) {
        //   if (response.Paging.PageNumber > 1) {
        //     const pageIndex = {
        //       pageIndex: this.query.PageNumber * 5 - 5
        //     }
        //     this.data[i].push(pageIndex)
        //   }
        // }
        this.loadConfirm = true
        this.reset = this.reset + 1
      }).catch(e => {
        // this._401ResponseError(e)
      })
    }
  }
}
</script>
