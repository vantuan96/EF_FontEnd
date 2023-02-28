<template>
  <div class="page-table-vital">
    <!-- page chart -->
    <page-chart v-if="true" :FormType="'IPDPediatricVitalSign'" :FormCode='FormCode' :viewOnly="viewOnly" :parameters="parameters" :DataChart="DataChart" :VisitId="VisitId"/>
    <!-- box date time -->
    <div class="box1 mrb20 flex align-center">
      <div class="box-date flex align-center space-between">
        <div class="title-date">Từ ngày: </div>
        <v-date-time-picker :hideTooltip="true" v-model="parameters.FromDate" :format="vDateTimeFormat"/>
        <div class="title-date title-date2">Đến ngày: </div>
        <v-date-time-picker :hideTooltip="true" v-model="parameters.ToDate" :format="vDateTimeFormat"/>
      </div>
      <div class="nameUser">{{__t('HospitalDischargeTable.label2')}}</div>
      <user-ad v-model="parameters.Assessor" ref="userAd" :placeholder="__t('Điều dưỡng/ Bác sĩ')"/>
      <button class="btn v-yellow-btn" @click="handleLoc">Lọc</button>
      <button class="btn btn-default" @click="handleXoaLoc">Xoá lọc</button>
    </div>
    <div class="box-table mrb30">
      <!-- table form -->
      <table-form v-if="false" @editId="handleEdit" :FormType="'IPDPediatricVitalSign'" :FormCode='FormCode' :viewOnly="false" :parameters="parameters" :DataChart="DataChart" :VisitId="VisitId"/>
      <table v-else class="standing-order-tbl">
        <tr>
          <th width="50px" class="text-center">STT</th>
          <th width="120px" class="text-center">{{__t('AdultVitalSigns.labelTable1')}}</th>
          <th>{{__t('AdultVitalSigns.labelTable2')}}</th>
          <th width="50px" class="text-center">{{__t('Tổng PEWS')}}</th>
          <th width="100px" class="text-center">{{__t('AdultVitalSigns.labelTable4')}}</th>
        </tr>
        <template v-if="data && data.length === 0">
          <tr>
            <td colspan="5" class="text-center">{{__t('Không có dữ liệu')}}</td>
          </tr>
        </template>
        <template v-else v-for="(item, index) in data">
          <tr :key="index + '-root-tr'" :class="{'view-full': item.view}">
            <td class="text-center" style="vertical-align:top">{{((parameters.pageNumber - 1) * parameters.PageSize) + (index + 1)}}</td>
            <td style="vertical-align:top" class="text-center">{{ item.TransactionDate | formatDateWithoutSecon}}</td>
            <td style="vertical-align:top" class="no-padding">
              <Intervention :view="item.view" :Intervention="item.Content" />
            </td>
            <td style="vertical-align:top" class="text-center" :class="getColor(item.MEWSTotal)">{{item.MEWSTotal || 'N/A'}}</td>
            <td style="vertical-align:top" class="text-center">
              <div class="box-ad-info">
                <ad-Info v-if="item.CreatedBy" :ad="item.CreatedBy" />
              </div>
              <div class="box-btn-edit">
                <button class="btn v-yellow-btn btn-edit" v-if="$store.state.account.Username === item.CreatedBy && hasRole('IPDEDIT13NHI') && !IsLocked && !viewOnly" @click="handleEdit(item.Id)">Sửa</button>
              </div>
            </td>
          </tr>
          <MDShowMore :key="index + '-action-tr'" :data="item" colspan="5"/>
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
                    :page-count="parameters.pages"
                    :prev-text="'«'"
                    v-if="data.length > 0"
                    v-model="parameters.pageNumber">
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
import Intervention from '@/components/IPD/VitalSigns/Intervention.vue'
import PageChart from '@/components/IPD/VitalSigns/PediatricChart.vue'
import TableForm from '@/components/IPD/VitalSigns/4To12OldTable.vue'
import MixinMasterData from '@/mixins/masterdata.js'
import IPDPediatricVitalSign from '@/services/IPD/PediatricVitalSigns'
import VDateTimePicker from '@/components/VDateTimePicker.vue'
import VSelect from '@/components/VSelect.vue'
import EventBus from '@/lib/eventBus'
import _ from 'lodash'
import moment from 'moment'
export default {
  name: 'PageTable',
  components: { Intervention, VDateTimePicker, VSelect, PageChart, TableForm },
  mixins: [MixinMasterData],
  props: {
    viewOnly: {
      type: Boolean,
      default: false
    },
    VisitId: {
      type: String,
      default: ''
    },
    FormType: {
      type: String,
      default: ''
    },
    FormCode: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      data: null,
      DataChart: {},
      parameters: {
        IPDId: this._VisitId,
        FormCode: this.FormCode,
        pageNumber: 1,
        pages: 1,
        PageSize: 5,
        FromDate: moment().subtract(7, 'day').startOf('day').format('HH:mm DD/MM/YYYY'),
        ToDate: moment().format('HH:mm DD/MM/YYYY'),
        Assessor: this.viewOnly ? null : this.$store.state.account.Username,
        hidemsg: true
      },
      rowExisted: '',
      totalRow: '',
      IsLocked: false
    }
  },
  mounted () {
    this.getData()
    EventBus.$on('reloadUpdateForm', this.handleLoc)
    EventBus.$on('reloadTablePediatricVitalSigns', this.getData)
  },
  beforeDestroy () {
    EventBus.$off('reloadUpdateForm')
    EventBus.$off('reloadTablePediatricVitalSigns')
  },
  methods: {
    getData () {
      console.log('getData ~ PediatricTable')
      if (!this.parameters.Assessor) {
        this.parameters.Assessor = ''
      }
      this.parameters.IPDId = this._VisitId
      new IPDPediatricVitalSign(this.parameters).find('All/').then(response => {
        this.DataChart = response
        this.totalRow = response.Count
        this.IsLocked = response.IsLocked
        response.listItems.map(e => {
          e.showBtn = true
          e.view = !e.showBtn
        })
        this.data = _.cloneDeep(response.listItems)
        this.parameters.pages = response.Paging.numberPage
        this.$emit('checkLoaded')
      }).catch(e => {
        this.loaded = true
        if (e.status === 404) {}
      })
    },
    handleLoc () {
      if (!this.parameters.Assessor) {
        this.parameters.Assessor = ''
      }
      this.parameters.pageNumber = 1
      this.parameters.pages = 1
      this.getData()
      EventBus.$emit('reloadPediatricChart', this.parameters)
    },
    handleXoaLoc () {
      this.$refs.userAd.clear()
      this.parameters = {
        IPDId: this._VisitId,
        FormCode: this.FormCode,
        pageNumber: 1,
        pages: 1,
        PageSize: 5,
        FromDate: '',
        ToDate: '',
        Assessor: ''
      }
      this.getData()
      EventBus.$emit('reloadPediatricChart', this.parameters)
    },
    getColor (num) {
      let colorClass = ''
      if (num === '' || num === null) {
        colorClass = ''
      }
      if (num <= 2 && num >= 0 && num !== '' && num !== null) {
        colorClass = 'color-blue2'
      }
      if (num <= 5 && num >= 3) {
        colorClass = 'color-green3'
      }
      // eslint-disable-next-line
      if (num == 6) {
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
