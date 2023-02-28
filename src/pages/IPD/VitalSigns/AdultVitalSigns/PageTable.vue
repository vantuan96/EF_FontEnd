<template>
  <div class="page-table-vital" v-if="rowExisted > 0">
    <!-- page chart -->
    <page-chart v-if="true" :viewOnly="viewOnly" :parameters="parameters" :VisitId="VisitId"/>
    <page-chart-v2 v-if="false" :parameters="parameters" :VisitId="VisitId"/>
    <!-- box date time -->
    <div class="box1 mrb20 flex align-center" v-if="!viewOnly">
      <div class="box-date flex align-center space-between">
        <div class="title-date">Từ ngày: </div>
        <v-date-time-picker :hideTooltip="true" v-model="parameters.DateFrom" :format="vDateTimeFormat"/>
        <div class="title-date title-date2">Đến ngày: </div>
        <v-date-time-picker :hideTooltip="true" v-model="parameters.DateTo" :format="vDateTimeFormat"/>
      </div>
      <div class="nameUser">{{__t('HospitalDischargeTable.label2')}}</div>
      <user-ad v-model="parameters.CreatedBy" ref="userAd" :placeholder="__t('Điều dưỡng/ Bác sĩ')"/>
      <button class="btn v-yellow-btn" @click="handleLoc">Lọc</button>
      <button class="btn btn-default" @click="handleXoaLoc">Xoá lọc</button>
      <!-- <div class="name">{{__t('HospitalDischargeTable.label2')}} <ad-Info v-if="DataSubmit.CreatedBy" :ad="DataSubmit.CreatedBy" /></div> -->
    </div>
    <div class="box-table mrb30">
      <table-form v-if="false" @editId="handleEdit" :data="data" :parameters="parameters" :VisitId="VisitId"/>
      <table v-else class="standing-order-tbl">
        <tr>
          <th width="50px" class="text-center">STT</th>
          <th width="120px" class="text-center">{{__t('AdultVitalSigns.labelTable1')}}</th>
          <th>{{__t('AdultVitalSigns.labelTable2')}}</th>
          <th width="50px" class="text-center">{{__t('AdultVitalSigns.labelTable3')}}</th>
          <th width="100px" class="text-center">{{__t('AdultVitalSigns.labelTable4')}}</th>
        </tr>
        <template v-if="data && data.length === 0">
          <tr>
            <td colspan="5" class="text-center">{{__t('Không có dữ liệu')}}</td>
          </tr>
        </template>
        <template v-else v-for="(item, index) in data">
        <tr :key="index + '-root-tr'" :class="{'view-full': item.view}">
          <td class="text-center" style="vertical-align:top">{{((parameters.PageIndex - 1) * parameters.PageSize) + (index + 1)}}</td>
          <td style="vertical-align:top" class="text-center">{{ item.TransDate }}</td>
          <td style="vertical-align:top" class="no-padding">
            <Intervention :view="item.view" :Intervention="item.Content" />
          </td>
          <td style="vertical-align:top" class="text-center" :class="getColor(item.TotalMews)">{{item.TotalMews || 'N/A'}}</td>
          <td style="vertical-align:top" class="text-center">
            <div class="box-ad-info">
              <ad-Info v-if="item.CreatedBy" :ad="item.CreatedBy" />
            </div>
            <div class="box-btn-edit">
              <button class="btn v-yellow-btn btn-edit" v-if="$store.state.account.Username === item.CreatedBy && hasRole('MEWS03') && !IsLocked && !viewOnly" @click="handleEdit(item.Id)">Sửa</button>
              <!-- <button class="btn v-yellow-btn btn-edit" v-if="condition === 'Nurse' && !IsLocked && !viewOnly" @click="handleEdit(item.Id)">Sửa</button> -->
            </div>
          </td>
        </tr>
        <MDShowMore :key="index + '-action-tr'" :data="item" colspan="6"/>
        </template>
        <!-- phân trang -->
        <tfoot v-if="data && data.length > 0">
          <tr>
            <td colspan="5">
              <template>
                <div class="flex space-between">
                  <div>
                    <paginate
                    :clickHandler="getData"
                    :container-class="'pagination pagination-sm no-margin v-pagination'"
                    :next-text="'»'"
                    :page-count="parameters.Pages"
                    :prev-text="'«'"
                    v-if="data.length > 0"
                    v-model="parameters.PageIndex">
                    </paginate>
                  </div>
                  <div class="box-record">
                    <p>Hiển thị: {{data.length + '/' + totalRow}} theo dõi</p>
                  </div>
                </div>
              </template>
            </td>
          </tr>
        </tfoot>
    </table>
    </div>
  </div>
</template>

<script>
import Intervention from './Intervention.vue'
import GetTableMews from '@/services/IPD/AdultVitalSigns/GetTableMews'
import VDateTimePicker from '@/components/VDateTimePicker.vue'
import VSelect from '@/components/VSelect.vue'
import PageChart from './PageChart.vue'
import PageChartV2 from './PageChartV2'
import TableForm from '@/components/IPD/VitalSigns/AdultTable.vue'
import EventBus from '@/lib/eventBus'
import moment from 'moment'
export default {
  name: 'PageTable',
  props: {
    viewOnly: {
      type: Boolean,
      default: false
    },
    VisitId: ''
  },
  data () {
    return {
      data: null,
      LEVELS: ['Thấp', 'Trung Bình', 'Cao'],
      parameters: {
        Pages: 1,
        PageIndex: 1,
        PageSize: 99999,
        DateFrom: moment().subtract(7, 'day').startOf('day').format('HH:mm DD/MM/YYYY'),
        DateTo: moment().format('HH:mm DD/MM/YYYY'),
        CreatedBy: this.$store.state.account.Username
      },
      rowExisted: '',
      totalRow: '',
      IsLocked: false
    }
  },
  mounted () {
    this.getData()
    EventBus.$on('reloadUpdateFormAdultVitalSigns', this.handleLoc)
    EventBus.$on('reloadChartAdultVitalSigns', this.getData)
  },
  beforeDestroy () {
    EventBus.$off('reloadUpdateFormAdultVitalSigns')
    EventBus.$off('reloadChartAdultVitalSigns')
  },
  components: { Intervention, VDateTimePicker, VSelect, PageChart, PageChartV2, TableForm },
  computed: {
    condition () {
      let name = ''
      if (this.$store.state.account.Position.includes('Nurse')) {
        name = 'Nurse'
      }
      if (this.$store.state.account.Position.includes('Doctor')) {
        name = 'Doctor'
      }
      return name
    }
  },
  methods: {
    getData () {
      if (!this.parameters.CreatedBy) {
        this.parameters.CreatedBy = ''
      }
      if (this.viewOnly) {
        this.parameters.DateFrom = ''
        this.parameters.DateTo = ''
        this.parameters.CreatedBy = ''
      }
      new GetTableMews().update(this._VisitId, this.parameters).then(response => {
        response.Data.forEach(e => {
          e.showBtn = (this.JSONParse(e.Content) || []).length > 3
          e.view = !e.showBtn
        })
        this.data = response.Data
        this.rowExisted = response.RowExisted
        this.totalRow = response.TotalRow
        this.IsLocked = response.IsLocked
        if (response.RowExisted > 0) {
          EventBus.$emit('getNullContent', false)
        } else {
          EventBus.$emit('getNullContent', true)
        }
        if (response.IsLocked) {
          EventBus.$emit('getIsLocked', true)
        } else {
          EventBus.$emit('getIsLocked', false)
        }
        var bonus = 1
        if ((response.TotalRow % this.parameters.PageSize) === 0) {
          bonus = 0
        }
        this.parameters.Pages = parseInt(response.TotalRow / this.parameters.PageSize) + bonus
      })
    },
    handleLoc () {
      if (!this.parameters.CreatedBy) {
        this.parameters.CreatedBy = ''
      }
      this.parameters.Pages = 1
      this.parameters.PageIndex = 1
      EventBus.$emit('reloadChartAdultVitalSigns', this.parameters)
      this.getData()
    },
    handleXoaLoc () {
      this.$refs.userAd.clear()
      this.parameters = {
        Pages: 1,
        PageIndex: 1,
        PageSize: 99999,
        DateFrom: '',
        DateTo: '',
        CreatedBy: ''
      }
      EventBus.$emit('reloadChartAdultVitalSigns', this.parameters)
      this.getData()
    },
    getColor (num) {
      let colorClass = ''
      if (num === '' || num === null) {
        colorClass = ''
      }
      if (num <= 2 && num >= 0 && num !== '' && num !== null) {
        colorClass = 'color-blue2'
      }
      if (num <= 4 && num >= 3) {
        colorClass = 'color-green3'
      }
      if (num < 7 && num >= 5) {
        colorClass = 'color-yellow3'
      }
      if (num >= 7) {
        colorClass = 'color-red3'
      }
      return colorClass
    },
    handleEdit (id) {
      this.$emit('handleEdit', id)
    }
  }
}
</script>

<style lang="stylus" scoped>
  .page-table-vital {
    .title-date {
      margin-right: 5px;
    }
    .title-date2 {
      margin-left: 15px;
    }
    .nameUser {
      margin-left: 15px;
      margin-right: 5px;
    }
    .v-select-box {
      width: 150px;
    }
    .btn {
      margin-left: 20px;
    }
  }
  .color-blue2 {
    background: #9FC5F8;
  }
  .color-green3 {
    background: #93C47D;
  }
  .color-yellow3 {
    background: #FFD966;
  }
  .color-red3 {
    background: #E06666;
  }
  .box-btn-edit {
    margin-top: 5px!important;
    width: 100%;
    margin: 0 auto;
    .btn-edit {
      width: 50px;
      margin-left: 0!important;
    }
  }
</style>
