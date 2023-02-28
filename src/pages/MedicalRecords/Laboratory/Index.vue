<template>
  <div>
    <div class="box-x-ray">
      <div class="mrb10 mt-10 flex on-top space-between" style="align-items: flex-start;">
        <div>
          <div class="fw600 mrb10 mrr5 white-space inline-block">{{__t('Từ ngày ')}}:</div>
          <VDateTimePicker5 class="mrb10 mrr10" style="display: inline-block;" :max="getMax()" v-model="parameters.FromDate" :format="vDateTimeFormat" :placeholder="__t('Từ ngày')"/>
          <div class="fw600 mrb10 mrr5 white-space inline-block">{{__t('Đến ngày ')}}:</div>
          <VDateTimePicker5 class="mrr10 mrb10" style="display: inline-block;" v-model="parameters.ToDate" :format="vDateTimeFormat" :placeholder="__t('Đến ngày ')"/>
          <div v-if="!$route.params.VisitCode" class="fw600 mrb10 mrr5 white-space">{{__t('Lượt tiếp nhận')}}:</div>
          <VNumberInput v-if="!$route.params.VisitCode" class="mrr10 mrb10" style="width: 100px;display: inline-block;" maxlength="10" v-model="parameters.VisitCode" :placeholder="__t('Nhập')"/>
          <div class="fw600 mrb10 mrr5 white-space inline-block">{{__t('Nhóm dịch vụ')}}:</div>
          <VSelect class="mrr10 mrb10" style="display: inline-block;" :disabeleclear="false" v-model="parameters.CategoryCode" :placeholder="__t('Chọn loại dịch vụ ')" :items="CategoryLists"/>
        </div>
        <div class="on-top" style="min-width: 155px;">
          <button class="btn v-yellow-btn mrr10 inline-block" type="button" @click="handleFilter">{{__t('home.loc')}}</button>
          <button class="btn btn-default inline-block" type="button" @click="resetFilter">{{__t('home.reset')}}</button>
        </div>
      </div>
      <table class="table table-striped table-bordered v-table" id="customer-tbl">
        <thead class="bg-1375ba">
          <tr>
            <th class="text-center vertical-align-middle" width="1">{{__t('STT')}}</th>
            <th class="text-center vertical-align-middle">{{__t('Tên chỉ định')}}</th>
            <th class="text-center vertical-align-middle">{{__t('Người chỉ định')}}</th>
            <th class="text-center vertical-align-middle">{{__t('Ngày chỉ định')}}</th>
            <th class="text-center vertical-align-middle">{{__t('Người trả kết quả')}}</th>
            <th class="text-center vertical-align-middle">{{__t('Ngày trả kết quả')}}</th>
            <th class="text-center vertical-align-middle">{{__t('Lượt tiếp nhận ')}}</th>
            <th class="text-center vertical-align-middle">{{__t('Nơi chỉ định ')}}</th>
            <th class="text-center vertical-align-middle">{{__t('Xem kết quả')}}</th>
          </tr>
        </thead>
        <tbody>
          <template v-if="DataTable && DataTable.length === 0">
          <tr>
            <td colspan="9" class="text-center">{{ __t("Không có thông tin! ") }}</td>
          </tr>
          </template>
          <template v-else v-for="(item, index) in DataTable">
          <tr :key="index">
            <td class="text-center">
              {{ (parameters.PageNumber - 1) * parameters.PageSize + (index + 1) }}
            </td>
            <td style="max-width: 350px;">{{item.ItemCode}} - {{item.ItemNameV}}</td>
            <td class="text-center"><ad-Info :ad="item.ServiceByAD" /></td>
            <td>{{item.ServiceDate | formatDateWithoutSecon}}</td>
            <td class="text-center"><ad-Info :ad="item.ResultBy" /></td>
            <td>{{item.ResultAt | formatDateWithoutSecon}}</td>
            <td class="text-center">{{item.VisitCode}}</td>
            <td class="no-wrap">{{item.LocationNameV}}</td>
            <td class="text-center">
              <div v-if="item.ResultAt && item.ResultBy" class="btn v-yellow-btn" type="button" @click="showPopupDetail(item)">{{__t('Xem')}}</div>
              <div v-else>{{__t('Chưa có kết quả')}}</div>
            </td>
          </tr>
          </template>
        </tbody>
        <tfoot v-if="DataTable && DataTable.length > 0">
          <tr>
            <td colspan="9">
            <template>
              <div class="flex space-between">
              <div>
                <paginate
                :clickHandler="paginate"
                :container-class="'pagination pagination-sm no-margin v-pagination'"
                :next-text="'»'"
                :page-count="parameters.Pages"
                :prev-text="'«'"
                v-if="DataTable.length > 0"
                v-model="parameters.PageNumber"
                >
                </paginate>
              </div>
              <div class="box-record">
                <p>{{__t('Show')}}: {{ DataTable.length + "/" + count }} {{__t('chỉ định')}}</p>
              </div>
              </div>
            </template>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
    <PopupLaboratory v-if="openPopup" :PID="PID" @closePopup="openPopup = false" :LaboratoryData="LaboratoryData"/>
  </div>
</template>

<script>
import GetLISInforByPID from '@/services/GetLISInforByPID'
import DoctorPlaceDiagnosticsOrder from '@/services/DoctorPlaceDiagnosticsOrder'
import LISResultByPID from '@/components/LISResultByPID.vue'
import PopupLaboratory from '../popup/PopupLaboratory.vue'
import MixinMasterData from '@/mixins/masterdata.js'
import VDateTimePicker5 from '@/components/VDateTimePicker5.vue'
import VSelect from '@/components/VSelect.vue'
import moment from 'moment'
import { cloneDeep } from 'lodash'
export default {
  name: 'ListRecordsMenuLaboratory',
  mixins: [MixinMasterData],
  props: ['PID'],
  components: {
    VDateTimePicker5, VSelect, LISResultByPID, PopupLaboratory
  },
  data () {
    return {
      Datas: null,
      DataTable: [],
      ResultEmit: [],
      CategoryLists: [],
      count: 0,
      LaboratoryData: {},
      parameters: {
        Assessor: this.$route.params.Id,
        FromDate: moment(moment().subtract(7, 'day').startOf('day')).format(process.env.DATETIME_FORMAT),
        ToDate: moment(new Date()).format(process.env.DATETIME_FORMAT),
        PageNumber: 1,
        PageSize: 30,
        FormCode: null,
        VisitCode: null,
        CategoryCode: []
      },
      openPopup: false
    }
  },
  watch: {
    parameters: {
      handler (val) {
        if (val.FromDate === 'Invalid date') {
          val.FromDate = ''
        }
        if (val.ToDate === 'Invalid date') {
          val.ToDate = ''
        }
      },
      deep: true
    }
  },
  async mounted () {
    await this.getCategoryList()
    if (this.$route.params.VisitCode) {
      this.parameters.FromDate = ''
      this.parameters.ToDate = ''
    }
    this.getData()
  },
  methods: {
    getData () {
      if (this.parameters.FromDate) {
        this.parameters.FromDate = `${this.parameters.FromDate}`
        if (this.parameters.FromDate.includes('Invalid')) {
          this.parameters.FromDate = ''
        }
        if (this.parameters.FromDate.includes('(')) {
          this.parameters.FromDate = this.$options.filters.formatDateWithoutSecon(this.parameters.FromDate)
        }
      }
      if (this.parameters.ToDate) {
        this.parameters.ToDate = `${this.parameters.ToDate}`
        if (this.parameters.ToDate.includes('Invalid')) {
          this.parameters.ToDate = ''
        }
        if (this.parameters.ToDate.includes('(')) {
          this.parameters.ToDate = this.$options.filters.formatDateWithoutSecon(this.parameters.ToDate)
        }
      }
      if (this.$route.params.VisitCode) {
        if (this.$route.params.VisitCode === 'N/A') {
          this.parameters.VisitCode = ''
        } else {
          this.parameters.VisitCode = this.$route.params.VisitCode
        }
      }
      new GetLISInforByPID(this.parameters).find(this.PID || this.$route.params.Id).then(response => {
        this.Datas = response
        this.ResultEmit = cloneDeep(this.Datas)
        this.handleData()
      }).catch(e => {
        console.log('e', e)
      })
    },
    getCategoryList () {
      new DoctorPlaceDiagnosticsOrder({
        Type: '0',
        PageSize: 2000
      }).find('ServicesGroup').then(response => {
        response.items.map(item => this.CategoryLists.push({
          value: item.Code,
          label: item.ViName
        }))
      }).catch((e) => {
        console.log(e)
      })
    },
    handleData () {
      if (this.parameters.VisitCode || this.parameters.CategoryCode || this.parameters.FromDate || this.parameters.ToDate) {
        this.handleFilter()
      } else {
        this.paginate()
      }
    },
    paginate () {
      let indexOfLastNews = this.parameters.PageNumber * this.parameters.PageSize
      let indexOfFirstNews = indexOfLastNews - this.parameters.PageSize
      this.DataTable = this.ResultEmit.slice(indexOfFirstNews, indexOfLastNews)
      this.count = this.ResultEmit.length
      this.parameters.Pages = Math.ceil(this.ResultEmit.length / this.parameters.PageSize)
    },
    resetFilter () {
      this.parameters = {
        Assessor: this.$route.params.Id,
        PageNumber: 1,
        Pages: 1,
        FromDate: '',
        ToDate: '',
        PageSize: 30,
        VisitCode: '',
        CategoryCode: ''
      }
      this.getData()
    },
    handleFilter () {
      this.ResultEmit = cloneDeep(this.Datas)
      // eslint-disable-next-line one-var
      let result = [], result1 = [], result2 = [], result3 = []
      if (this.parameters.VisitCode) {
        this.ResultEmit.map(item => {
          if ((Number.parseInt(item.VisitCode) === Number.parseInt(this.parameters.VisitCode))) {
            result.push(item)
          }
        })
      } else {
        result = cloneDeep(this.ResultEmit)
      }
      if (this.parameters.CategoryCode) {
        result.map(item => {
          if (item.CategoryCode.includes(this.parameters.CategoryCode)) {
            result1.push(item)
          }
        })
      } else {
        result1 = cloneDeep(result)
      }
      if (this.parameters.FromDate) {
        result1.map(item => {
          if (moment(this.parameters.FromDate, process.env.DATETIME_FORMAT).format() <= item.ServiceDate) {
            result2.push(item)
          }
        })
      } else {
        result2 = cloneDeep(result1)
      }
      if (this.parameters.ToDate) {
        result2.map(item => {
          if (moment(this.parameters.ToDate, process.env.DATETIME_FORMAT).format() >= item.ServiceDate) {
            result3.push(item)
          }
        })
      } else {
        result3 = cloneDeep(result2)
      }
      this.ResultEmit = result3
      this.parameters.PageNumber = 1
      this.parameters.PageSize = 30
      this.paginate()
    },
    getMax () {
      if (this.parameters.ToDate && this.parameters.ToDate !== 'Invalid date') {
        return this.parameters.ToDate
      }
      return ''
    },
    getServiceName (item) {
      let name = ''
      if (item && item.ItemNameV) {
        if (item.ItemCode) {
          name += item.ItemCode + ' - '
        }
        name += item.ItemNameV
      }
      return name
    },
    showPopupDetail (item) {
      this.openPopup = true
      this.LaboratoryData = item
      setTimeout(() => {
        this.$modal.show('PopupLaboratory')
      }, 500)
    }
  }
}
</script>

<style lang="stylus" scoped>
.mini-btn {
    width: 127px;
    height: 40px;
    font-weight: bold;
    color: #1a1a1a;
    border-radius: 4px;
    line-height: 0.8;
    box-shadow: 1px 0px 2px 0px #ccc;
    background: #fff;
    // border: 1px solid black;
  }
  .active {
    background-color: #1375ba;
    color: #fff;
  }
</style>
