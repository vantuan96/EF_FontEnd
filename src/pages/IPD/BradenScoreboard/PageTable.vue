<template>
 <div id="PageTable-BradenScoreboard" class="PageTable-BradenScoreboard">
  <!-- box date time -->
  <div class="box1 mrb20 flex align-center">
   <div class="box-date flex align-center space-between">
    <div class="title-date mrr10">{{__t('BradenScoreboard.miniLabel1')}}:</div>
    <v-date-time-picker
     :hideTooltip="true"
     v-model="parameters.DateFrom"
     :format="vDateTimeFormat"
    />
    <div class="title-date title-date2 mrr10 mrl10">{{__t('BradenScoreboard.miniLabel2')}}:</div>
    <v-date-time-picker
     :hideTooltip="true"
     v-model="parameters.DateTo"
     :format="vDateTimeFormat"
    />
   </div>
   <div class="nameUser mrr10 mrl10">{{__t('BradenScoreboard.miniLabel3')}}:</div>
   <user-ad
    v-model="parameters.CreatedBy"
    ref="userAd"
    :placeholder="__t('Điều dưỡng/ Bác sĩ')"
   />
   <button class="btn v-yellow-btn mrl10" @click="handleLoc">{{__t('BradenScoreboard.miniLabel4')}}</button>
   <button class="btn btn-default mrl10" @click="handleXoaLoc">{{__t('BradenScoreboard.miniLabel5')}}</button>
  </div>
  <div class="box-table mrb30">
   <table class="standing-order-tbl">
    <tr>
     <th width="50px" class="text-center">{{__t('BradenScoreboard.miniLabel6')}}</th>
     <th width="120px" class="text-center">{{__t('BradenScoreboard.miniLabel7')}}</th>
     <th width="100px" class="text-center">{{__t('BradenScoreboard.miniLabel8')}}</th>
     <th width="150px" class="text-center">{{__t('BradenScoreboard.miniLabel9')}}</th>
     <th class="text-center">{{__t('BradenScoreboard.miniLabel10')}}</th>
     <th width="120px" class="text-center">{{__t('BradenScoreboard.miniLabel11')}}</th>
    </tr>
    <template v-if="data && data.length === 0">
     <tr>
      <td colspan="5" class="text-center">{{ __t("Không có dữ liệu") }}</td>
     </tr>
    </template>
    <template v-else v-for="(item, index) in data">
     <tr :key="index + '-root-tr'" :class="{ 'view-full': item.view }">
      <td class="text-center" style="vertical-align:top">
       {{ (parameters.PageIndex - 1) * parameters.PageSize + (index + 1) }}
      </td>
      <td class="text-center" style="vertical-align:top">{{ item.TransDate }}</td>
      <td class="text-center" style="vertical-align:top">{{ item.TotalScore || 'N/A' }}</td>
      <td class="text-center" style="vertical-align:top">{{ __label(item.Classify) }}</td>
      <td style="vertical-align:top" class="no-padding">
       <Intervention :view="item.view" :Intervention="item.Intervention" />
      </td>
      <td class="text-center" style="vertical-align:top">
       <div>
         <div>
            <ad-Info v-if="item.CreatedBy" :ad="item.CreatedBy" />
         </div>
         <div class="box-btn-edit">
          <button class="btn btn-edit" @click="handleEdit(item.Id, item.CreatedBy)"><i class="fa fa-pencil-square-o" aria-hidden="true"></i> Chi tiết</button>
         </div>
       </div>
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
    <tfoot v-if="data && data.length > 0">
     <tr>
      <td colspan="6">
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
           v-model="parameters.PageIndex"
          >
          </paginate>
         </div>
         <div class="box-record">
          <p>{{__t('Show')}}: {{ data.length + "/" + totalRow }} {{__t('Follow')}}</p>
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
import moment from 'moment'
import GetTableBradenScoreboard from '@/services/IPD/BradenScoreboard/GetTableBradenScoreboard'
import VDateTimePicker from '@/components/VDateTimePicker.vue'
import EventBus from '@/lib/eventBus'
export default {
  name: 'PageTable-BradenScoreboard',
  props: {
    viewOnly: {
      type: Boolean,
      default: false
    },
    VisitId: ''
  },
  data () {
    return {
      parameters: {
        Pages: 1,
        PageIndex: 1,
        PageSize: 5,
        DateFrom: moment().subtract(7, 'day').startOf('day').format('HH:mm DD/MM/YYYY'),
        DateTo: moment().format('HH:mm DD/MM/YYYY'),
        CreatedBy: this.$store.state.account.Username
      },
      IsLocked: false,
      data: null
    }
  },
  components: {
    VDateTimePicker,
    Intervention
  },
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
  mounted () {
    this.getData()
    EventBus.$on('reloadTableBraden', this.getData)
  },
  methods: {
    getData () {
      if (!this.parameters.CreatedBy) {
        this.parameters.CreatedBy = ''
      }
      new GetTableBradenScoreboard().update(this._VisitId, this.parameters).then(response => {
        response.Data.forEach(e => {
          e.showBtn = (this.JSONParse(e.Intervention) || []).length > 3
          e.view = !e.showBtn
          e.Classify = this.JSONParse(e.Classify) || {}
        })
        this.data = response.Data
        // this.rowExisted = response.RowExisted
        this.totalRow = response.TotalRow
        if (response.IsLocked) {
          this.IsLocked = response.IsLocked
          this.$emit('getIsLocked', true)
        }
        if (response.RowExisted > 0) {
          EventBus.$emit('getNullContentBradenScoreboard', false)
        } else {
          EventBus.$emit('getNullContentBradenScoreboard', true)
        }
        var bonus = 1
        if ((response.TotalRow % this.parameters.PageSize) === 0) {
          bonus = 0
        }
        this.parameters.Pages = parseInt(response.TotalRow / this.parameters.PageSize) + bonus
      })
    },
    showMore (item) {
      item.view = !item.view
    },
    handleLoc () {
      if (!this.parameters.CreatedBy) {
        this.parameters.CreatedBy = ''
      }
      this.parameters.Pages = 1
      this.parameters.PageIndex = 1
      this.getData()
    },
    handleXoaLoc () {
      this.$refs.userAd.clear()
      this.parameters = {
        Pages: 1,
        PageIndex: 1,
        PageSize: 5,
        DateFrom: '',
        DateTo: '',
        CreatedBy: ''
      }
      this.getData()
    },
    handleEdit (id, CreatedBy) {
      let dataEdit = {
        id: id,
        CreatedBy: CreatedBy
      }
      this.$emit('handleEdit', dataEdit)
    }
  }
}
</script>

<style lang="stylus" scoped>
  .box-btn-edit {
    margin-top: 5px!important;
    width: 100%;
    margin: 0 auto;
    .btn-edit {
      margin-left: 0!important;
    }
  }
</style>
