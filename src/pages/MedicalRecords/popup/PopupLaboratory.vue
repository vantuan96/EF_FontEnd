<template>
  <div>
    <basepopup name="PopupLaboratory" width="1200px" :isShowFooter="false" :clickToClose="false">
      <div slot="title" class="text-center">
        <h3 class="box-title">{{LaboratoryData.ItemCode}} - {{__t(LaboratoryData.ItemNameV)}}</h3>
      </div>
      <template v-if="loaded">
        <div v-if="cols.length > 0 && datas.length > 0">
          <ul>
            <li class="font-italic">Màu vàng: chỉ số dưới khoảng tham chiếu</li>
            <li class="font-italic">Màu đỏ: chỉ số trên khoảng tham chiếu</li>
          </ul>
          <table class="table table-striped table-bordered v-table mb-10" id="customer-tbl">
            <thead class="bg-1375ba">
              <tr class="laboratory-table__header">
                <th>STT</th>
                <th :key="index" v-for="(col, index) in cols" :class="getColorByRange('', '', '', '', col.Item.Sub_SID)">{{index + 1}}</th>
                <th width="120px" rowspan="3">{{__t('Đơn vị')}}</th>
                <th class="no-wrap" width="140px" rowspan="3">{{__t('Khoảng tham chiếu')}}</th>
                <th class="no-wrap" width="100px" rowspan="3">{{__t('Xem biểu đồ')}}</th>
              </tr>
              <tr class="laboratory-table__header">
                <th>{{__t('Đã chỉ định')}}</th>
                <th :key="index" v-for="(col, index) in cols" :class="getColorByRange('', '', '', '', col.Item.Sub_SID)">
                  <p class="m-0">{{col.Id}}</p>
                  <AdInfo :ad="col.Item ? col.Item.CollectedBy : ''"/>
                </th>
              </tr>
              <tr class="laboratory-table__header">
                <th>{{__t('Đã trả kết quả')}}</th>
                <th :key="index" v-for="(col, index) in cols" :class="getColorByRange('', '', '', '', col.Item.Sub_SID)">
                  <p class="m-0">{{col.Item ? formatDateWithoutSecon(col.Item.ResultAt) : ''}}</p>
                  <AdInfo :ad="col.Item ? col.Item.ResultBy : ''"/>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr :key="index" v-for="(row, index) in datas" class="text-center">
                <td class="text-left">{{row.ViName}}</td>
                <template v-for="(result, i) in row.Datas">
                  <td v-if="result.Result" :key="i" :class="getColorByRange(result.Result, result.LowerLimit, result.HigherLimit, result.NormalRange, result.Sub_SID)">
                    {{result.Result}}
                  </td>
                  <td v-else :key="i">N/A</td>
                </template>
                <td>{{row.Datas[row.Datas.length - 1].Unit}}</td>
                <td style="white-space: break-spaces;">{{row.Datas[row.Datas.length - 1].NormalRange}}</td>
                <td>
                  <v-popover @apply-show="handleShowPopover" @show="showChart = true" @apply-hide="showChart = false" :placement="'left'" :trigger="'click'" class="laboratory-popover">
                    <button v-if="!checkViewChart(row.Datas)" class="btn v-yellow-btn tooltip-target b3" type="button">{{__t('Biểu đồ')}}</button>
                    <div slot="popover">
                      <i v-close-popover.all style="cursor: pointer; font-size: 20px; transform: translate(6px,-12px);" class="fa fa-times pull-right fa-2" aria-hidden="true"></i>
                      <h3 class="m-0" style="text-align: left;">{{row.Datas.find(e => e.TestNameE).TestNameE}} ({{row.Datas[0].Unit ? (row.Datas[0].Unit).trim() : ''}})</h3>
                      <p v-if="row.Datas.length > 1" class="mb-0 mt-5" style="white-space: normal; text-align: left;">
                        {{row.Datas[row.length - 1]}}
                        Từ ngày {{ FormDate }} đến ngày {{ ToDate }}
                      </p>
                      <ChartLaboratory ref="ChartLaboratory" v-if="showChart" :Datas="row.Datas"/>
                    </div>
                  </v-popover>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div v-else>
          <div class="text-center">{{__t('Không có thông tin!')}}</div>
        </div>
      </template>
      <div v-else class="loading-text"><v-loading/></div>
      <div slot="footer">
        <div class="d-flex align-center" style="padding: 0 250px; justify-content: center;">
          <div>
            <button type="button" class="btn btn-block v-white-btn" style="width: 150px" @click="handleClose()">{{__t('Đóng')}}</button>
          </div>
          <!-- <div>
            <button type="button" class="btn btn-block v-yellow-btn" style="width: 150px" @click="handlePrint()">{{__t('In')}}</button>
          </div> -->
        </div>
      </div>
    </basepopup>
  </div>
</template>

<script>
// import mockData from '@/pages/MedicalRecords/popup/mock_data'
import ChartLaboratory from '../Laboratory/ChartLaboratory.vue'
import GetLISResultByPID from '@/services/GetLISResultByPID'
import VDateTimePicker from '@/components/VDateTimePicker.vue'
import moment from 'moment'
export default {
  name: 'PopupLaboratory',
  props: ['LaboratoryData', 'PID'],
  components: {
    VDateTimePicker,
    ChartLaboratory
  },
  data () {
    return {
      reset: 0,
      showChart: false,
      datas: null,
      cols: [],
      PrintIsOpen: false,
      loaded: false,
      FormDate: null,
      ToDate: null,
      DataChart: {},
      colorClass: ''
    }
  },
  watch: {
    SID (val) {
      if (val) {
        this.getData()
      }
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    formatDateWithoutSecon (value) {
      if (value) {
        var t = moment(String(value))
        return t.isValid() ? t.format('HH:mm DD/MM/YYYY') : value
      }
    },
    handleShowPopover () {
      window.dispatchEvent(new Event('resize'))
    },
    checkViewChart (rowDatas) {
      return rowDatas.every(item => isNaN(parseFloat(item.Result)))
    },
    getData () {
      if (this.LaboratoryData) {
        // this.cols = mockData.cols
        // console.log('getData ~ this.cols', this.cols)
        // this.datas = mockData.results
        // console.log('getData ~ datas', this.datas)
        new GetLISResultByPID({itemcode: this.LaboratoryData.ItemCode}).find(`${this.PID || this.$route.params.Id}/${this.LaboratoryData.SID}/${this.LaboratoryData.SiteCode}`).then(response => {
          this.cols = response.cols
          this.datas = response.results
          this.FormDate = this.cols[0].Id
          this.ToDate = this.cols[this.cols.length - 1].Id
          this.loaded = true
        })
      }
      this.loaded = true
    },
    handleClose () {
      this.$emit('closePopup', false)
      this.$modal.hide('PopupLaboratory')
    },
    handlePrint () {
      this.PrintIsOpen = true
      this.$htmlToPaper('printMe', false, '')
    },
    getColorByRange (result, lowerLimit, higherLimit, normalRange, subSID) {
      if (parseFloat(result) > parseFloat(higherLimit)) {
        return 'color-red3'
      }
      if (parseFloat(result) < parseFloat(lowerLimit)) {
        return 'color-yellow3'
      }
      // Check higherLimit
      if ((lowerLimit === null || lowerLimit === '') && parseFloat(higherLimit)) {
        if (normalRange.trim().substring(0, 2) === '<=') {
          if (parseFloat(result) <= parseFloat(higherLimit)) {
            return 'color-yellow3'
          }
        }
        if (parseFloat(result) > parseFloat(higherLimit)) {
          return 'color-red3'
        }
        if (parseFloat(result) < parseFloat(higherLimit)) {
          return 'color-yellow3'
        }
      }
      // Check lowerLimit
      if ((higherLimit === null || higherLimit === '') && parseFloat(lowerLimit)) {
        if (normalRange.trim().substring(0, 2) === '<=') {
          if (parseFloat(result) <= parseFloat(lowerLimit)) {
            return 'color-yellow3'
          }
        }
        if (parseFloat(result) > parseFloat(lowerLimit)) {
          return 'color-red3'
        }
        if (parseFloat(result) < parseFloat(lowerLimit)) {
          return 'color-yellow3'
        }
      }
      if (subSID === this.LaboratoryData.SID) {
        return 'color-focus'
      }
      return ''
    }
  }
}
</script>
<style lang='stylus'>
.laboratory-table__header th {
  text-align: center;
  vertical-align: middle !important;
}
.color-focus {
  background-color: #dff9f7 !important;
  color: black !important;
}
.color-yellow3 {
  background-color: #FFD966 !important;
}
.color-red3 {
  background-color: #d86c69 !important;
  color: #fff;
}
.tooltip-inner.popover-inner {
  width 800px !important;
}
#PageChart-Page {
  margin 0;
}
#chart1 {
  margin 0;
}
.text-left {
  text-align: left;
}
</style>
