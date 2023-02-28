<template>
  <div>
    <!-- <div class="wrapper" style="overflow-x: scroll"> -->
    <div>
      <div class="mrb12 flex align-center row" style="justify-content: start;">
        <!-- <ul class="dropdown-menu v-dropdown-menu v-context-menu v-top">
            <li :data="link" :key="i" v-for="(link ,i) in Items"><a href="">{{__label(link)}}</a></li>
        </ul> -->
        <div class="col-md-6 d-flex flex-center" v-if="!$route.params.VisitCode">
          <div class="w160 no-wrap">{{__t(' Lượt tiếp nhận')}}:</div>
          <div class="ml-5" style="width: 100%">
            <v-select style="" :multi="true" v-model="VisitCode" :options="uniqueListVisitCode" :items="uniqueListVisitCode" :placeholder="__t(' Tất cả')" :filterable="false" class="select-full-wTest"/>
            <!-- <allergies-select :key="index" v-model="VisitCode" :multi="true" :options="uniqueListVisitCode" :filterable="false" :items="uniqueListVisitCode" :placeholder="__t(' Tất cả')" class="select-full-w"/> -->
            <!-- <VNumberInput class="mrr20" style="width: 300px" maxlength="10" v-model="VisitCode" :placeholder="__t('nhập')"/> -->
          </div>
        </div>
        <div style="margin-left: 50px;" class="fw600 mrr20">{{__t(' Loại')}}:</div>
        <div class="col-md-1.5 padding-right-0">
          <label class="container-checkbox" style="margin: 12px 8px 5px 10px;">
            <p style="padding: 2px;">{{__t('Ngoại trú')}}</p>
            <input type="checkbox" v-model="DataFilter" :value="'OPD'">
            <span class="checkmark"></span>
          </label>
        </div>
        <div class="col-md-1.5 padding-right-0">
          <label class="container-checkbox" style="margin: 12px 8px 5px 10px;">
            <p style="padding: 2px;">{{__t('Nội trú')}}</p>
            <input type="checkbox" v-model="DataFilter" :value="'IPD'">
            <span class="checkmark"></span>
          </label>
        </div>
        <div class="col-md-1.5 padding-right-0">
          <label class="container-checkbox" style="margin: 12px 8px 5px 10px;">
            <p style="padding: 2px;">{{__t('Ra viện')}}</p>
            <input type="checkbox" v-model="DataFilter" :value="'DIS'">
            <span class="checkmark"></span>
          </label>
        </div>
        <!-- <div class="col-md-1.5 padding-right-0">
          <label class="container-checkbox" style="margin: 12px 8px 5px 10px;">
            <p style="padding: 2px;">{{__t('NB mang vào')}}</p>
            <input type="checkbox" v-model="DataFilter" :value="'External'">
            <span class="checkmark"></span>
          </label>
        </div> -->
      </div>
      <hr/>
      <div class="mrb10 flex align-center" style="display: flex; justify-content: start;">
        <div class="fw600 mrr5" style="font-size:20px; color: #2b78e4;">{{__t('Lịch sử dùng thuốc')}}:</div>
        <div style="padding-top: 7px;"><p class="rounded">{{ DataTable2.length !== '0' ? DataTable2.length : DataTable.length}}</p></div>
      </div>
      <div class="wrapper" v-dragscroll.x="true" @mousedown="cursorGrap = false" @mouseup="cursorGrap = true" :class="{'cursor-grapbing': !cursorGrap, 'cursor-grap': cursorGrap }">
        <table class="standing-order-tbl">
          <thead>
            <tr>
              <th style="min-width: 155px; border: none; box-shadow: inset -2px 1px 3px -1px #fff !important; z-index: 1;" height="30px" class="text-center fixedScroll">{{__t('Bắt đầu ')}}</th>
              <th style="min-width: 155px; border: none; box-shadow: inset -2px 1px 3px -1px #fff !important; z-index: 1;" height="30px" class="text-center fixedScrollRow1">{{__t('Kết thúc ')}}</th>
              <th style="min-width: 350px;" height="30px" class="text-center fixedScrollRow2 wrap-text">{{__t('ETR.thuoc')}}</th>
              <th width="120px" height="30px" class="text-center">{{__t('Trạng thái ')}}</th>
              <th width="140px" height="30px" class="text-center">{{__t('Liều lượng')}}</th>
              <th width="125px" height="30px" class="text-center">{{__t('Tần suất dùng')}}</th>
              <th width="120px" height="30px" class="text-center">{{__t(' Số lượng ')}}</th>
              <th width="200px" height="30px" class="text-center">{{__t('Đường dùng')}}</th>
              <th width="100px" height="30px" class="text-center">{{__t('PRN')}}</th>
              <th width="100px" height="30px" class="text-center">{{__t('Thời hạn')}}</th>
              <th width="100px" height="30px" class="text-center">{{__t('Cung cấp')}}</th>
              <!-- <th width="100px" height="30px" class="text-center">{{__t('Bệnh viện')}}</th> -->
              <!-- <th width="100px" height="30px" class="text-center">{{__t('Khu nội trú/Khoa')}}</th> -->
              <!-- <th width="100px" height="30px" class="text-center">{{__t('Mã khu vực')}}</th> -->
              <!-- <th width="100px" height="30px" class="text-center">{{__t('Mã tiếp nhận')}}</th> -->
              <th width="100px" height="30px" class="text-center">{{__t('Số tiếp nhận')}}</th>
              <!-- <th width="100px" height="30px" class="text-center">{{__t('Ngày tiếp nhận')}}</th> -->
              <!-- <th width="100px" height="30px" class="text-center">{{__t('Ngày đóng lượt tiếp nhận')}}</th> -->
              <th width="100px" height="30px" class="text-center">{{__t('Người kê đơn')}}</th>
              <!-- <th width="100px" height="30px" class="text-center">{{__t('Username')}}</th> -->
              <th width="100px" height="30px" class="text-center">{{__t('Mã đơn')}}</th>
              <!-- <th width="100px" height="30px" class="text-center">{{__t('Ngày kê đơn')}}</th> -->
              <th width="100px" height="30px" class="text-center">{{__t('Số chỉ định')}}</th>
            </tr>
            <!-- <tr v-if="DataTable && DataTable.length !== 0" class="fixedScrollData">VisitCode: {{VisitCode.map(e => e.value).join(', ')}}</tr> -->
          </thead>
          <tbody>
            <!-- <tr>
              Bộ lọc group
            </tr> -->
            <template v-if="loaded">
              <template v-if="DataTable2 && DataTable2.length === 0">
                <tr class="fixedScrollNoInfor text-center" height="40px" style="line-height: 40px;">
                  <td style="border: none; text-align: end; margin-right: 5px;" colspan="3">{{ __t("Không có thông tin!") }}</td>
                </tr>
              </template>
              <template v-else v-for="(item, index) in DataTable2">
                <tr :key="index">
                  <td style="border: none; box-shadow: inset -2px 1px 3px -1px #fff !important; z-index: 1;" class="fixedScroll" :class="getColor(item.Status)">
                    <!-- {{index + 1}} -->
                    {{item.StartDateTime | formatDateWithoutSecon }}
                  </td>
                  <td height="40px" class="fixedScrollRow1" style="border: none; box-shadow: inset -2px 1px 3px -1px #fff !important; z-index: 1;" :class="getColor(item.Status)">{{item.StopDateTime | formatDateWithoutSecon}}</td>
                  <td height="40px" class="fixedScrollRow2" style="border-bottom: 1px solid #fff; border-right: 1px solid #fff;" :class="getColor(item.Status)">{{item.Medication}}</td>
                  <td height="40px" style="border-bottom: 1px solid #fff; border-right: 1px solid #fff;" :class="getColor(item.Status)">{{item.Status}}</td>
                  <td height="40px" style="border-bottom: 1px solid #fff; border-right: 1px solid #fff;" :class="getColor(item.Status)">{{(item.Dose).substring(0,1) === '0' ? (item.Dose).substring((item.Dose).indexOf("(") + 1, (item.Dose).lastIndexOf(")")) : item.Dose}}</td>
                  <td height="40px" style="border-bottom: 1px solid #fff; border-right: 1px solid #fff;" :class="getColor(item.Status)">{{item.Frequency}}</td>
                  <td height="40px" style="border-bottom: 1px solid #fff; border-right: 1px solid #fff;" :class="getColor(item.Status)">{{(item.RxQuantity).substring(0,1) === '0' ? '' : item.RxQuantity}}</td>
                  <td height="40px" style="border-bottom: 1px solid #fff; border-right: 1px solid #fff;" :class="getColor(item.Status)">{{item.Route}}</td>
                  <td height="40px" style="border-bottom: 1px solid #fff; border-right: 1px solid #fff;" :class="getColor(item.Status)">{{item.PRN === 'False' ? '' : 'prn'}}</td>
                  <td height="40px" style="border-bottom: 1px solid #fff; border-right: 1px solid #fff;" :class="getColor(item.Status)">{{item.Duration}}</td>
                  <td height="40px" style="border-bottom: 1px solid #fff; border-right: 1px solid #fff;" :class="getColor(item.Status)">{{item.Supply}}</td>
                  <!-- <td height="40px" style="border-bottom: 1px solid #fff; border-right: 1px solid #fff;" :class="getColor(item.Status)">{{item.Facility}}</td> -->
                  <!-- <td height="40px" style="border-bottom: 1px solid #fff; border-right: 1px solid #fff;" :class="getColor(item.Status)">{{item.WardOrClinic}}</td> -->
                  <!-- <td height="40px" style="border-bottom: 1px solid #fff; border-right: 1px solid #fff;" :class="getColor(item.Status)">{{item.VisitTypeGroup}}</td> -->
                  <!-- <td height="40px" style="border-bottom: 1px solid #fff; border-right: 1px solid #fff;" :class="getColor(item.Status)">{{item.VisitType}}</td> -->
                  <td height="40px" style="border-bottom: 1px solid #fff; border-right: 1px solid #fff;" :class="getColor(item.Status)">{{item.VisitCode}}</td>
                  <!-- <td height="40px" style="border-bottom: 1px solid #fff; border-right: 1px solid #fff;" :class="getColor(item.Status)">{{item.VisitStart}}</td> -->
                  <!-- <td height="40px" style="border-bottom: 1px solid #fff; border-right: 1px solid #fff;" :class="getColor(item.Status)">{{item.VisitClosure}}</td> -->
                  <td height="40px" style="border-bottom: 1px solid #fff; border-right: 1px solid #fff;" :class="getColor(item.Status)">{{item.PrescriberName}}</td>
                  <!-- <td height="40px" style="border-bottom: 1px solid #fff; border-right: 1px solid #fff;" :class="getColor(item.Status)">{{item.PrescriberAD}}</td> -->
                  <td height="40px" style="border-bottom: 1px solid #fff; border-right: 1px solid #fff;" :class="getColor(item.Status)">{{item.Rx}}</td>
                  <!-- <td height="40px" style="border-bottom: 1px solid #fff; border-right: 1px solid #fff;" :class="getColor(item.Status)">{{item.RxDate}}</td> -->
                  <td height="40px" style="border-bottom: 1px solid #fff; border-right: 1px solid #fff;" :class="getColor(item.Status)">{{item.RxItem}}</td>
                </tr>
              </template>
            </template>
            <template v-else>
              <tr>
                <td colspan="3" style="border: none; text-align: end;">
                  <div class="loading-textTest"><v-loading/></div>
                </td>
              </tr>
            </template>
          </tbody>
          <tfoot v-if="DataTable && DataTable.length > 0">
          </tfoot>
        </table>
      </div>
   </div>
  </div>
</template>

<script>
import VDatePicker from '@/components/VDateTimePicker.vue'
// import moment from 'moment'
import VSelect from '@/components/VSelect.vue'
import OHMedicationHistory from '@/services/OHMedicationHistory'
import VDateTimePicker3 from '@/components/VDateTimePicker3.vue'
import { uniqBy } from 'lodash'
export default {
  name: 'MedicationHistory',
  components: {
    VDatePicker, VDateTimePicker3, VSelect
  },
  props: ['PID'],
  data () {
    return {
      loaded: false,
      PatientInfo: {},
      color: 'red',
      status: [],
      DataTable: [],
      DataTable2: [],
      ListVisitCode: [],
      uniqueListVisitCode: [],
      parameters: {
        OPD: 'true',
        IPD: 'true',
        Discharge: 'true',
        ExternalMedication: 'true'
      },
      DataFilter: ['OPD', 'IPD', 'DIS', 'External'],
      VisitCode: [],
      DataSearch: [],
      cursorGrap: true
    }
  },
  mounted () {
    this.getInfo()
    setTimeout(() => {
      this.getData()
    }, 500)
  },
  watch: {
    DataFilter: function (val) {
      this.emitData()
    },
    VisitCode: function (val) {
      this.emitData()
    }
  },
  methods: {
    emitData () {
      if (this.$route.params.VisitCode && this.$route.params.VisitCode !== 'N/A') {
        this.DataTable2 = this.DataTable.filter((item) => {
          return this.DataFilter.includes(item.VisitTypeGroup) && (item.VisitCode === this.$route.params.VisitCode)
        })
      } else {
        this.DataSearch = this.VisitCode.map(e => e.value)
        if (this.DataSearch.length === 0) {
          this.DataTable2 = this.DataTable.filter((item) => {
            return this.DataFilter.includes(item.VisitTypeGroup)
          })
        } else {
          this.DataTable2 = this.DataTable.filter((item) => {
            return this.DataFilter.includes(item.VisitTypeGroup) && this.DataSearch.includes(item.VisitCode)
          })
        }
      }
    },
    getInfo () {
      this.PatientInfo = this.$store.state.account.CurrentPatientObj
    },
    getData () {
      new OHMedicationHistory().find(this.PID || this.$route.params.Id).then(res => {
        this.loaded = true
        this.DataTable = res.Orders
        this.DataTable2 = this.DataTable
        this.DataTable2.forEach(options => {
          if (!this.uniqueListVisitCode.includes(options.VisitCode)) {
            this.uniqueListVisitCode.push({
              label: options.VisitCode,
              value: options.VisitCode
            })
            setTimeout(() => {
              this.uniqueListVisitCode = uniqBy(this.uniqueListVisitCode, e => e.value)
            }, 500)
          }
        })
        var sortedArray = this.DataTable2.sort((a, b) => Date.parse(new Date(b.StartDateTime)) - Date.parse(new Date(a.StartDateTime)))
        console.log(sortedArray, 'check sorted Array')
        if (this.$route.params.VisitCode && this.$route.params.VisitCode !== 'N/A') {
          this.DataTable2 = this.DataTable.filter((item) => {
            return this.DataFilter.includes(item.VisitTypeGroup) && (item.VisitCode === this.$route.params.VisitCode)
          })
        }
      })
    },
    getColor (status) {
      let colorClass = ''
      if (status === '' || status === null) {
        colorClass = ''
      }
      if (status === 'Active') {
        colorClass = 'color-green3'
      } else if (status === 'Discontinued') {
        colorClass = 'color-default'
      } else if (status === 'Completed') {
        colorClass = 'color-blue3'
      } else if (status === 'Superseded') {
        colorClass = 'color-red3'
      } else {
        colorClass = 'color-default'
      }
      return colorClass
    }
  }
}
</script>

<style lang="stylus" scoped>
  .loading-textTest {
    text-align: end;
    margin-bottom: 15px;
  }
  .color-blue3 {
    background: #9fc5f8;
    color: #5291e8
  }
  .color-green3 {
    background: #B6D7A8;
  }
  .color-default {
    background: #eeeeee;
  }
  .color-red3 {
    background: #cccccc;
    color: #b17492
  }
  .rounded {
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 34px;
    height: 32px;
    background-color: #2b78e4;
    color: white;
    font-size: 15px;
    border-radius: 100%;
  }
  table.scrolldown {
    width: 100%;
    border-spacing: 0;
    border: 2px solid black;
  }
  table.scrolldown tbody {
    overflow-y: auto;
    overflow-x: hidden;
  }
  .wrapper {
    overflow-x: scroll;
  }
  .wrapper table {
    white-space: nowrap;
    cursor: pointer;
  }
  .fixedScroll {
    position: sticky;
    left: 0;
  }
  .fixedScrollNoInfor {
    position: sticky;
    left: 0;
  }
  .fixedScrollData {
    position: sticky;
    left: 900px !important;
    background: #e6e6e6
  }
  .fixedScrollRow1 {
    position: sticky;
    left: 155px !important;
  }
  .fixedScrollRow2 {
    position: sticky;
    left: 310px !important;
    border-right: 1px solid #fff;
  }
</style>
