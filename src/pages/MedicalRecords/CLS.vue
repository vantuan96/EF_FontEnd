<template>
  <div>
    <div class="mrb10 flex align-center">
      <div class="fw600 mrr5">{{__t('Từ ngày ')}}:</div>
      <VDateTimePicker5 class="mrr20" :max="getMax()" v-model="parameters.StartAt" :format="vDateTimeFormat" :placeholder="__t('Từ ngày')"/>
      <div class="fw600 mrr5">{{__t('Đến ngày ')}}:</div>
      <VDateTimePicker5 class="mrr20" v-model="parameters.EndAt" :format="vDateTimeFormat" :placeholder="__t('Đến ngày ')"/>
      <div class="flex align-center" style="justify-content: end;flex-grow: 1;">
        <button class="btn v-yellow-btn mrr10" type="button" @click="getData">{{__t('home.loc')}}</button>
        <button class="btn btn-default" type="button" @click="resetFilter">{{__t('home.reset')}}</button>
      </div>
    </div>
    <table class="table table-striped table-bordered v-table none-row-curso" id="customer-tbl">
      <thead class="bg-1375ba">
        <tr>
          <th width="1px" class="text-center">{{__t('STT')}}</th>
          <th class="text-center">{{__t('Tên chỉ định')}}</th>
          <th width="150px" class="text-center">{{__t('Người chỉ định')}}</th>
          <th width="120px" class="text-center">{{__t('Ngày chỉ định')}}</th>
          <th width="140px" class="text-center">{{__t('Người trả kết quả')}}</th>
          <th width="140px" class="text-center">{{__t('Ngày trả kết quả')}}</th>
          <th width="120px" class="text-center">{{__t('Lượt tiếp nhận ')}}</th>
          <th width="200px" class="text-center">{{__t('Nơi chỉ định ')}}</th>
          <th width="100px" class="text-center">{{__t('Xem kết quả')}}</th>
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
            <!-- {{index + 1}} -->
            {{ (parameters.PageNumber - 1) * parameters.PageSize + (index + 1) }}
          </td>
          <td>{{getServiceName(item)}}</td>
          <td><ad-Info :ad="item.CreatedBy" /></td>
          <td>{{item.CreatedAt | formatDateWithoutSecon}}</td>
          <td><ad-Info :ad="item.UpdatedBy" /></td>
          <td>{{item.ExamCompleted | formatDateWithoutSecon}}</td>
          <td>{{item.VisitCode}}</td>
          <td>{{item.AreaName}}</td>
          <td class="text-center">
            <div class="btn v-yellow-btn" type="button" @click="showPopupDetail(item.Id)">{{__t('Xem')}}</div>
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
            :clickHandler="getData"
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
    <popup-can-lam-sang :id="id"/>
  </div>
</template>

<script>
import moment from 'moment'
import PopupCanLamSang from './popup/PopupCanLamSang.vue'
import VDateTimePicker5 from '@/components/VDateTimePicker5.vue'
import DiagnosticReporting from '@/services/DiagnosticReporting'
export default {
  name: 'CDHA',
  props: ['PID'],
  components: {
    VDateTimePicker5, PopupCanLamSang
  },
  data () {
    return {
      DataTable: [],
      parameters: {
        hidemsg: true,
        notRedirect: true,
        Search: this.$route.params.Id,
        PageNumber: 1,
        Pages: 1,
        Type: '2',
        StartAt: moment(moment().subtract(7, 'day').startOf('day')).format(process.env.DATETIME_FORMAT),
        EndAt: new Date(),
        PageSize: 30
      },
      id: '',
      count: 3
    }
  },
  mounted () {
    if (this.$route.params.VisitCode) {
      this.parameters.StartAt = ''
      this.parameters.EndAt = ''
    }
    this.getData()
  },
  methods: {
    getData () {
      if (this.parameters.StartAt) {
        this.parameters.StartAt = `${this.parameters.StartAt}`
        if (this.parameters.StartAt.includes('Invalid')) {
          this.parameters.StartAt = ''
        }
        if (this.parameters.StartAt.includes('(')) {
          this.parameters.StartAt = this.$options.filters.formatDateWithoutSecon(this.parameters.StartAt)
        }
      }
      if (this.parameters.EndAt) {
        this.parameters.EndAt = `${this.parameters.EndAt}`
        if (this.parameters.EndAt.includes('Invalid')) {
          this.parameters.EndAt = ''
        }
        if (this.parameters.EndAt.includes('(')) {
          this.parameters.EndAt = this.$options.filters.formatDateWithoutSecon(this.parameters.EndAt)
        }
      }
      if (this.PID) {
        this.parameters.Search = this.PID
      }
      if (this.$route.params.VisitCode) {
        if (this.$route.params.VisitCode === 'N/A') {
          this.parameters.VisitCode = ''
        } else {
          this.parameters.VisitCode = this.$route.params.VisitCode
        }
      }
      new DiagnosticReporting(this.parameters).ListCanLamSang().then(res => {
        this.DataTable = res.items
        this.count = res.count
        var bonus = 1
        if ((res.count % this.parameters.PageSize) === 0) {
          bonus = 0
        }
        this.parameters.Pages = parseInt(res.count / this.parameters.PageSize) + bonus
      })
    },
    resetFilter () {
      this.parameters = {
        Search: this.$route.params.Id,
        PageNumber: 1,
        Pages: 1,
        Type: '2',
        StartAt: '',
        EndAt: '',
        PageSize: 30
      }
      this.getData()
    },
    showPopupDetail (id) {
      this.id = id
      this.$modal.show('canLamSang')
    },
    getMax () {
      if (this.parameters.EndAt && this.parameters.EndAt !== 'Invalid date') {
        return this.parameters.EndAt
      }
      return ''
    },
    getServiceName (item) {
      let name = ''
      if (item && item.ServiceName) {
        if (item.ServiceCode) {
          name += item.ServiceCode + ' - '
        }
        name += item.ServiceName
      }
      return name
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
  .none-row-curso tbody tr {
    cursor: context-menu!important;
  }
</style>
