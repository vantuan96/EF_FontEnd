<template>
  <div id="loger" v-if="items.length">
    <span @click="open(items[0], 0)">
      {{(items.length === 1) ? __t('Tạo mới bởi') : __t('Lần chỉnh sửa cuối cùng bởi')}} <b><ad-Info :ad="items[0].Username" /></b> {{__t('lúc')}} {{items[0].UpdatedAt}}
    </span>
    <div class="btn-group btn-group-none-style" v-if="items && items.length > 1">
      <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" @click="getPosition($event)">
        <span class="glyphicon glyphicon glyphicon-edit"></span>
      </button>
      <ul class="dropdown-menu v-dropdown-menu" :class="menuClass">
        <li @click="open(item, i)" :data="item" :key="i" v-for="(item ,i) in items"><a>{{i + 1}}) {{i === (items.length - 1) ? __t('Tạo mới') : __t('Chỉnh sửa')}} {{__t('bởi')}} <b><ad-Info :ad="item.Username" /></b> {{__t('lúc')}} {{item.UpdatedAt}}</a></li>
      </ul>
    </div>
    <modal name="logsTable" transition="pop-out" id="logsTable" height="auto" :scrollable="false" :width="modalWidth" :clickToClose="false">
      <div class="box v-model-content-popup" id="content-wrap-popup">
        <div class="box-content">
          <h3 class="box-title">{{__t('Lịch sử chỉnh sửa')}}</h3>
          <vue-scrolling-table>
            <template slot="tbl">
              <table class="table table-bordered v-table-1">
                <thead>
                <tr>
                  <th width="20%">{{__t('Tiêu đề')}}</th>
                  <td width="40%" v-if="!isFirst">{{__t('Trước')}}</td>
                  <td>{{__t('Sau')}}</td>
                </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in MASTERDATA" :key="index" v-if="MASTERDATA[index].hasDifferent">
                    <th width="20%">
                      <template v-if="MASTERDATA[index].DataType === '_Exception'">{{__t(MASTERDATA[index].ViName)}}</template>
                      <template v-else>{{__label(MASTERDATA[index])}}</template>
                      <template v-if="MASTERDATA[index].Note">{{MASTERDATA[index].Note}}</template>
                    </th>
                    <td width="40%" v-if="!isFirst">
                      <md-view :data="MASTERDATA[index].Before" :isFirst="isFirst" />
                    </td>
                    <td><md-view :data="MASTERDATA[index].After" :isFirst="isFirst" /></td>
                  </tr>
                </tbody>
              </table>
            </template>
          </vue-scrolling-table>
        </div>
        <div class="form-content text-right">
          <button class="btn btn-warning" @click="close()">{{__t('Đóng')}}</button>
        </div>
      </div>
    </modal>
  </div>
</template>
<script>
import Logs from '@/services/Logs'
// import LogsDetail from '@/services/Custome'
import MixinMasterData from '@/mixins/masterdata.js'
// import Logs from '@/services/Logs'
const MODAL_WIDTH = 970
Object.filter = (obj, predicate) =>
  Object.keys(obj)
    .filter(key => predicate(obj[key]))
    .reduce((res, key) => Object.assign(res, { [key]: obj[key] }), {})
export default {
  name: 'history',
  mixins: [MixinMasterData],
  props: ['EdId', 'Type', 'mdcode', 'noDetail'],
  data () {
    return {
      items: [],
      countOfForm: 10,
      heightItemLi: 30,
      menuClass: 'v-top',
      menuTop: 0,
      modalWidth: MODAL_WIDTH,
      mappingKey: {
        'EmergencyTriageRecords': 'ETR',
        'EmergencyRecords': 'ER0',
        'DischargeInformation': 'DI0',
        'PreOperativeProcedureHandoverChecklists': 'PHC',
        'SpongeSharpsAndInstrumentsCountsSheets': 'SSA',
        'ED/HandOverCheckList': 'HOC',
        'OPD/HandOverCheckList': 'OPDHOC',
        'OPD/InitialAssessments/ForShortTerm': 'OPDIAFSTOP',
        'OPD/InitialAssessments/ForOnGoing': 'OPDIAFOGOP',
        'OPD/InitialAssessments/FallRiskScreening': 'OPDFRSFOP',
        'OPD/OPDOutpatientExaminationNote': 'OPDOEN',
        'OPD/InitialAssessments/ForTelehealth': 'OPDIAFTP',
        'Translation': true,
        'CustomersED/ManualUpdate': false,
        'CustomerOPD/ManualUpdate': false,
        'MonitoringChartAndHandoverForm': false,
        'ED/EDAssessmentForRetailServicePatient': 'EDAFRSP',
        'OPD/ProcedureSummary': 'OPDTTTT',
        'ED/ProcedureSummary': 'OPDTTTT',
        'IPD/ProcedureSummary': 'OPDTTTT',
        'ED/SkinTestResult': false,
        'ED/ConsultationDrugWithAnAsterisk': false,
        'ED/JointConsultationForApprovalOfSurgery': 'EDJCFAOS',
        'IPD/JointConsultationForApprovalOfSurgery': 'EDJCFAOS',
        'IPD/GuggingSwallowingScreen': 'IPDDGRLN',
        'InitialAssessment/ForAdult': 'IPDIAAU'
      },
      openModal: false,
      isFirst: true,
      modalHeight: 600,
      NOSHOWMD: ['OPDOENREC', 'OPDOENREC2', 'OPDTRANSCEF', 'DI0REC2', 'DI0REC1']
    }
  },
  computed: {
    hasData: function () {
      var obj = Object.filter(this.MASTERDATA, e => e.hasDifferent === true)
      return obj.Code
    }
  },
  created () {
    this.modalWidth = window.innerWidth < MODAL_WIDTH
      ? '90%'
      : MODAL_WIDTH
    setTimeout(() => {
      // this.getData()
    }, 1000)
  },
  methods: {
    getData () {
      new Logs({noLoading: true, id: this.EdId, modelName: this.Type})
        .all()
        .then(response => {
          this.items = response
          if (this.$route.query.showfirstlog) this.open(this.items[0], 0)
        })
    },
    close () {
      this.openModal = false
      this.$modal.hide('logsTable')
      if (this.$route.query.showfirstlog) this.$router.replace({'query': {showfirstlog: null}})
    },
    loging (item) {
      new Logs({hidemsg: true, hideloading: true, notRedirect: true})
        .update('', {
          url: window.location.href,
          name: 'VIEWLOG?RequestId=' + item.RequestId
        })
        .then(response => {
          // throw new Error('error')
        })
    },
    open (item, index) {
      if (this.noDetail) return true
      this.isFirst = true
      this.loging(item)
      var Before = (index === this.items.length - 1) ? null : this.items[index + 1]
      var BeforeRequest = {
        Datas: []
      }
      var AfterRequest = Object.assign({Datas: []}, this.JSONParse(item.Request))
      if (Before) {
        this.isFirst = false
        BeforeRequest = Object.assign(BeforeRequest, this.JSONParse(Before.Request))
      }
      this.MASTERDATA = {}
      if (BeforeRequest._Exception) {
        BeforeRequest._Exception.forEach(e => {
          BeforeRequest.Datas.push({
            Code: '_' + e.key,
            Value: e.value
          })
          this.MASTERDATA['_' + e.key] = {
            ViName: e.ViName || '_' + e.key,
            EnName: e.EnName || '_' + e.key,
            Code: '_' + e.key,
            Order: 1,
            DataType: '_Exception',
            Level: 1,
            Items: [{
              ViName: ' ',
              EnName: ' ',
              Code: '_' + e.key,
              DataType: '_Exception',
              Value: ''
            }]
          }
        })
      }
      if (AfterRequest._Exception) {
        AfterRequest._Exception.forEach(e => {
          AfterRequest.Datas.push({
            Code: '_' + e.key,
            Value: e.value
          })
          this.MASTERDATA['_' + e.key] = {
            ViName: e.ViName || '_' + e.key,
            EnName: e.EnName || '_' + e.key,
            Code: '_' + e.key,
            Order: 1,
            DataType: '_Exception',
            Level: 1,
            Items: [{
              ViName: ' ',
              EnName: ' ',
              Code: '_' + e.key,
              DataType: '_Exception',
              Value: ''
            }]
          }
        })
      }
      if (BeforeRequest.Status) {
        BeforeRequest.Datas.push({
          Code: 'STATUS',
          Value: BeforeRequest.Status.ViName
        })
      }
      if (AfterRequest.Status) {
        AfterRequest.Datas.push({
          Code: 'STATUS',
          Value: AfterRequest.Status.ViName
        })
        this.MASTERDATA['STATUS1'] = {
          ViName: 'Trạng thái',
          EnName: 'Status',
          Code: 'STATUS1',
          Group: 'STATUS',
          Order: 1,
          DataType: null,
          Level: 1,
          Items: [{
            ViName: ' ',
            EnName: ' ',
            Code: 'STATUS',
            DataType: 'Text',
            Value: ''
          }]
        }
      }
      if (this.mappingKey[this.Type] === false) {
        Object.keys(this.MASTERDATA).forEach(key => {
          if (this.NOSHOWMD.includes(key)) {
            return
          }
          this.MASTERDATA[key].Before = []
          this.MASTERDATA[key].After = []
          this.MASTERDATA[key].hasDifferent = false
          this.MASTERDATA[key].Items.forEach(e => {
            var AfterFinded = AfterRequest.Datas.find(elm => elm.Code === e.Code)
            var BeforeFinded = BeforeRequest.Datas.find(elm => elm.Code === e.Code)
            if (AfterFinded) {
              var afterObj = Object.assign(this.cloneObj(e), {Value: AfterFinded.Value})
              if ((this.checkString(afterObj.DataType, 'Radio') || this.checkString(afterObj.DataType, 'checkbox')) && (afterObj.Value === '' || afterObj.Value === null)) {
                afterObj.Value = false
              }
              var beforeObj = BeforeFinded ? Object.assign(this.cloneObj(e), {Value: BeforeFinded.Value}) : Object.assign(this.cloneObj(afterObj), {Value: 'N/A'})
              if ((this.checkString(beforeObj.DataType, 'Radio') || this.checkString(beforeObj.DataType, 'checkbox')) && (beforeObj.Value === '' || beforeObj.Value === null)) {
                beforeObj.Value = false
              }
              var hasDifferent = Before === null || afterObj.Value !== beforeObj.Value
              afterObj.hasDifferent = hasDifferent
              beforeObj.hasDifferent = hasDifferent
              if (this.MASTERDATA[key].hasDifferent) {
                // pass
              } else {
                this.MASTERDATA[key].hasDifferent = Before === null || afterObj.Value !== beforeObj.Value
              }
              this.MASTERDATA[key].Before.push(beforeObj)
              this.MASTERDATA[key].After.push(afterObj)
            }
          })
        })
        this.openModal = true
        setTimeout(() => {
          this.$modal.show('logsTable')
        }, 10)
      } else {
        this.getMasterDatas({Form: this.mdcode || this.mappingKey[this.Type]}, data => {
          Object.keys(this.MASTERDATA).forEach(key => {
            if (this.NOSHOWMD.includes(key)) {
              return
            }
            this.MASTERDATA[key].Before = []
            this.MASTERDATA[key].After = []
            this.MASTERDATA[key].hasDifferent = false
            this.MASTERDATA[key].Items.forEach(e => {
              var AfterFinded = AfterRequest.Datas.find(elm => elm.Code === e.Code)
              var BeforeFinded = BeforeRequest.Datas.find(elm => elm.Code === e.Code)
              if (AfterFinded) {
                var afterObj = Object.assign(this.cloneObj(e), {Value: AfterFinded.Value})
                if ((this.checkString(afterObj.DataType, 'Radio') || this.checkString(afterObj.DataType, 'checkbox')) && (afterObj.Value === '' || afterObj.Value === null)) {
                  afterObj.Value = false
                }
                var beforeObj = BeforeFinded ? Object.assign(this.cloneObj(e), {Value: BeforeFinded.Value}) : Object.assign(this.cloneObj(afterObj), {Value: 'N/A'})
                if ((this.checkString(beforeObj.DataType, 'Radio') || this.checkString(beforeObj.DataType, 'checkbox')) && (beforeObj.Value === '' || beforeObj.Value === null)) {
                  beforeObj.Value = false
                }
                var hasDifferent = Before === null || afterObj.Value !== beforeObj.Value
                afterObj.hasDifferent = hasDifferent
                beforeObj.hasDifferent = hasDifferent
                if (this.MASTERDATA[key].hasDifferent) {
                  // pass
                } else {
                  this.MASTERDATA[key].hasDifferent = Before === null || afterObj.Value !== beforeObj.Value
                }
                this.MASTERDATA[key].Before.push(beforeObj)
                this.MASTERDATA[key].After.push(afterObj)
              } else {
                this.MASTERDATA[key].hasDifferent = false
              }
            })
          })
          this.openModal = true
          setTimeout(() => {
            this.$modal.show('logsTable')
          }, 10)
        })
      }
    },
    getPosition () {
    }
  }
}
</script>
