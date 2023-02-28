<template>
  <div class="BradenScoreboard-PageNurse" id="BradenScoreboard-PageNurse">
    <div class="content">
      <!-- box table -->
      <page-table v-if="!nullContentTable" @handleEdit="handleEdit" :viewOnly="viewOnly" @getIsLocked="getIsLocked" :VisitId="VisitId"/>
      <div v-if="nullContent" class="null-content">{{__t('AdultVitalSigns.labelNull')}}</div>
      <div v-if="showForm" class="box-content">
        <!-- box date time -->
        <div class="box1 mrb30 flex align-center">
          <div class="box-date flex align-center space-between mrr10">
            <div class="title-date fw600 mrr10">{{__t('BradenScoreboard.miniLabel12')}}:</div>
            <v-date-time-picker :hideTooltip="true" v-model="time" :format="vDateTimeFormat"/>
          </div>
          <div class="name fw600">{{__t('BradenScoreboard.miniLabel16')}}:
            <ad-Info v-if="DataSubmit.CreatedBy" :ad="DataSubmit.CreatedBy" />
            <ad-Info v-else :ad="$store.state.account.Username" />
          </div>
        </div>
        <div class="table-create">
          <table class="table observation-table">
            <thead>
              <tr>
                <th width="33%">{{__t('BradenScoreboard.miniLabel13')}}</th>
                <th width="53%" style="background: #f1f1f1; color: black;">{{__t('BradenScoreboard.miniLabel14')}}</th>
                <th width="13%" style="background: #f1f1f1; color: black;">{{__t('BradenScoreboard.miniLabel15')}}</th>
              </tr>
            </thead>
            <tbody>
              <template v-for="(dd) in CODE">
                <tr :key="dd.code" v-if="MASTERDATA[dd]">
                  <td class="criteria" rowspan="4">
                    <template>
                      <p class="fw600">{{__label(MASTERDATA[dd])}}</p>
                      <p class="content-criteria">{{__label(MASTERDATA[dd].Items[0])}}</p>
                    </template>
                  </td>
                  <td><p v-html="__label(MASTERDATA[dd].Items[1])"></p></td>
                  <td>
                    <div class="group-radio full-width">
                      <span>
                        <input :id="dd+'radio-' + 1" :disabled="UserView" type="checkbox" v-model="MASTERDATA[dd].Items[1].Value">
                        <label v-if="!UserView" :for="dd+'radio-' + 1" @click="checkbox2Radio(MASTERDATA[dd].Items, MASTERDATA[dd].Items[1])">1</label>
                        <label v-else :for="dd+'radio-' + 1">1</label>
                      </span>
                    </div>
                  </td>
                </tr>
                <tr :key="dd.code" v-if="MASTERDATA[dd]">
                  <td><p v-html="__label(MASTERDATA[dd].Items[2])"></p></td>
                  <td>
                    <div class="group-radio full-width">
                      <span>
                        <input :id="dd+'radio-' + 2" :disabled="UserView" type="checkbox" v-model="MASTERDATA[dd].Items[2].Value">
                        <label v-if="!UserView" :for="dd+'radio-' + 2" @click="checkbox2Radio(MASTERDATA[dd].Items, MASTERDATA[dd].Items[2])">2</label>
                        <label v-else :for="dd+'radio-' + 2">2</label>
                      </span>
                    </div>
                  </td>
                </tr>
                <tr :key="dd.code" v-if="MASTERDATA[dd]">
                  <td><p v-html="__label(MASTERDATA[dd].Items[3])"></p></td>
                  <td>
                    <div class="group-radio full-width">
                      <span>
                        <input :id="dd+'radio-' + 3" :disabled="UserView" type="checkbox" v-model="MASTERDATA[dd].Items[3].Value">
                        <label v-if="!UserView" :for="dd+'radio-' + 3" @click="checkbox2Radio(MASTERDATA[dd].Items, MASTERDATA[dd].Items[3])">3</label>
                        <label v-else :for="dd+'radio-' + 3">3</label>
                      </span>
                    </div>
                  </td>
                </tr>
                <tr :key="dd.code" v-if="MASTERDATA[dd]">
                  <td><p v-html="__label(MASTERDATA[dd].Items[4])"></p></td>
                  <td>
                    <div class="group-radio full-width">
                      <span>
                        <input :id="dd+'radio-' + 4" :disabled="UserView" type="checkbox" v-model="MASTERDATA[dd].Items[4].Value">
                        <label v-if="!UserView" :for="dd+'radio-' + 4" @click="checkbox2Radio(MASTERDATA[dd].Items, MASTERDATA[dd].Items[4])">4</label>
                        <label v-else :for="dd+'radio-' + 4">4</label>
                      </span>
                    </div>
                  </td>
                </tr>
              </template>

              <tr v-if="MASTERDATA['IPDBRADEN38']">
                <td class="criteria" rowspan="3">
                  <template>
                    <p class="fw600">{{__label(MASTERDATA['IPDBRADEN38'])}}</p>
                  </template>
                </td>
                <td><p v-html="__label(MASTERDATA['IPDBRADEN38'].Items[0])"></p></td>
                <td>
                  <div class="group-radio full-width">
                    <span>
                      <input :id="'IPDBRADEN38radio-' + 1" type="checkbox" :disabled="UserView" v-model="MASTERDATA['IPDBRADEN38'].Items[0].Value">
                      <label v-if="!UserView" :for="'IPDBRADEN38radio-' + 1" @click="checkbox2Radio(MASTERDATA['IPDBRADEN38'].Items, MASTERDATA['IPDBRADEN38'].Items[0])">1</label>
                      <label v-else :for="'IPDBRADEN38radio-' + 1">1</label>
                    </span>
                  </div>
                </td>
              </tr>
              <tr v-if="MASTERDATA['IPDBRADEN38']">
                <td><p v-html="__label(MASTERDATA['IPDBRADEN38'].Items[1])"></p></td>
                <td>
                  <div class="group-radio full-width">
                    <span>
                      <input :id="'IPDBRADEN38radio-' + 2" :disabled="UserView" type="checkbox" v-model="MASTERDATA['IPDBRADEN38'].Items[1].Value">
                      <label v-if="!UserView" :for="'IPDBRADEN38radio-' + 2" @click="checkbox2Radio(MASTERDATA['IPDBRADEN38'].Items, MASTERDATA['IPDBRADEN38'].Items[1])">2</label>
                      <label v-else :for="'IPDBRADEN38radio-' + 2">2</label>
                    </span>
                  </div>
                </td>
              </tr>
              <tr v-if="MASTERDATA['IPDBRADEN38']">
                <td><p v-html="__label(MASTERDATA['IPDBRADEN38'].Items[2])"></p></td>
                <td>
                  <div class="group-radio full-width">
                    <span>
                      <input :id="'IPDBRADEN38radio-' + 3" :disabled="UserView" type="checkbox" v-model="MASTERDATA['IPDBRADEN38'].Items[2].Value">
                      <label v-if="!UserView" :for="'IPDBRADEN38radio-' + 3" @click="checkbox2Radio(MASTERDATA['IPDBRADEN38'].Items, MASTERDATA['IPDBRADEN38'].Items[2])">3</label>
                      <label v-else :for="'IPDBRADEN38radio-' + 3">3</label>
                    </span>
                  </div>
                </td>
              </tr>
              <tr v-if="MASTERDATA['IPDBRADEN38']">
                <td colspan="2" class="fw600">{{__label(MASTERDATA['IPDBRADEN38'].Items[4])}}</td>
                <td class="text-center">{{getTongDiem}}</td>
              </tr>
              <tr>
                <td colspan="2" class="fw600">{{__t('BradenScoreboard.label1')}}</td>
                <td class="text-center" :class="classColor ? classColor : null">{{getNguyCo}}</td>
              </tr>
            </tbody>
            <thead>
              <tr>
                <th colspan="2" style="text-align: left;">{{__t('BradenScoreboard.label24')}}</th>
                <th>{{__t('BradenScoreboard.miniLabel18')}}</th>
              </tr>
            </thead>
            <tbody>
                <template v-if="MASTERDATA['IPDBRADEN44']">
                  <tr :data="item" :key="index + item.Code" v-for="(item, index) in MASTERDATA['IPDBRADEN44'].Items">
                    <td colspan="2">
                      {{__label(item)}}
                    </td>
                    <td>
                      <label class="container-checkbox reset" :for="item.Code + 'IPDMOFRSAD-' + index">
                        <input type="checkbox" :disabled="UserView" :id="item.Code + 'IPDMOFRSAD-' + index" v-model="item.Value">
                        <span class="checkmark"></span>
                      </label>
                    </td>
                  </tr>
                </template>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <FloatBlock v-if="!viewOnly" :showForm="showForm" @handleBack="handleBack">
      <template slot='buttons'>
        <div class="col-md-2 col-sm-2">
          <div class="form-group1">
          </div>
        </div>
        <div class="col-md-4 col-sm-4">
          <div class="form-group1">
          </div>
        </div>
        <div class="col-md-6 col-sm-6" v-if="$store.state.account.Position.includes('Nurse') && !IsLocked && !UserView && !viewOnly">
          <div class="form-group1">
            <button v-if="!showForm" class="btn v-yellow-btn pull-right btn-block hvr-ripple-out" type="button" v-shortkey="['ctrl', 's']" @click="handleInsert"><i class="fa fa-floppy-o" aria-hidden="true"></i> {{__t('BradenScoreboard.miniLabel17')}}</button>
            <button v-if="showForm && condition === 'Nurse' && !DataSubmit.CreatedBy" class="btn v-yellow-btn pull-right btn-block hvr-ripple-out" type="button" v-shortkey="['ctrl', 's']" @click="handleSubmit"><i class="fa fa-floppy-o" aria-hidden="true"></i> {{__t('btn.luu')}}</button>
            <button v-if="showForm && condition === 'Nurse' && DataSubmit.CreatedBy === $store.state.account.Username" class="btn v-yellow-btn pull-right btn-block hvr-ripple-out" type="button" v-shortkey="['ctrl', 's']" @click="handleSubmit"><i class="fa fa-floppy-o" aria-hidden="true"></i> {{__t('btn.luu')}}</button>
          </div>
        </div>
      </template>
    </FloatBlock>
  </div>
</template>

<script>
import moment from 'moment'
import VDateTimePicker from '@/components/VDateTimePicker.vue'
import MixinMasterData from '@/mixins/masterdata.js'
import InsertBradenScoreboard from '@/services/IPD/BradenScoreboard/InsertBradenScoreboard'
import GetDetailBradenScoreboard from '@/services/IPD/BradenScoreboard/GetDetailBradenScoreboard'
import PageTable from './PageTable.vue'
import _ from 'lodash'
import EventBus from '@/lib/eventBus'
import $ from 'jquery'

const CODE = [
  'IPDBRADEN03',
  'IPDBRADEN10',
  'IPDBRADEN17',
  'IPDBRADEN24',
  'IPDBRADEN31'
]
const CODE2 = [
  'IPDBRADEN03',
  'IPDBRADEN10',
  'IPDBRADEN17',
  'IPDBRADEN24',
  'IPDBRADEN31',
  'IPDBRADEN38'
]
export default {
  name: 'BradenScoreboard-PageNurse',
  props: {
    viewOnly: {
      type: Boolean,
      default: false
    },
    VisitId: ''
  },
  components: {
    VDateTimePicker,
    PageTable
  },
  data () {
    return {
      DataSubmit: [],
      IsLocked: false,
      showForm: false,
      nullContent: true,
      time: moment().format('HH:mm DD/MM/YYYY'),
      idRow: '',
      dataMaster: null,
      CODE: CODE,
      CODE2: CODE2,
      nullContentTable: false,
      UserView: false
    }
  },
  mixins: [MixinMasterData],
  mounted () {
    this.getMasterData()
    EventBus.$on('getNullContentBradenScoreboard', this.getNullContent)
  },
  computed: {
    getTongDiem () {
      let num = 0
      let isNum = false
      for (const dd of this.CODE2) {
        if (this.MASTERDATA[dd]) {
          this.MASTERDATA[dd].Items.forEach((e, index) => {
            if (e.DataType === 'Radio' && e.Value) {
              isNum = true
              if (e.Group === 'IPDBRADEN38') {
                num += (index + 1)
              } else {
                num += index
              }
            }
          })
        }
      }
      // if (this.MASTERDATA['IPDBRADEN38']) {
      //   this.MASTERDATA['IPDBRADEN38'].Items[4].Value = num.toString()
      // }
      if (!isNum) {
        num = 'N/A'
        // if (this.MASTERDATA['IPDBRADEN38']) {
        //   this.MASTERDATA['IPDBRADEN38'].Items[4].Value = ''
        // }
      }
      return num
    },
    classColor () {
      let nameClass = ''
      if (this.getTongDiem) {
        if (this.getTongDiem <= 9) {
          nameClass = 'colorRed'
        }
        if (this.getTongDiem >= 10 && this.getTongDiem <= 12) {
          nameClass = 'colorOrange'
        }
        if (this.getTongDiem >= 13 && this.getTongDiem <= 14) {
          nameClass = 'colorYellow'
        }
        if (this.getTongDiem >= 15 && this.getTongDiem <= 18) {
          nameClass = 'colorGreen'
        }
        if (this.getTongDiem >= 19 && this.getTongDiem <= 23) {
          nameClass = 'colorBlue'
        }
      }
      return nameClass
    },
    getNguyCo () {
      let nameNguyCo = 'N/A'
      if (this.classColor === 'colorRed') {
        nameNguyCo = this.__t('BradenScoreboard.labelNguyCo.label1')
      }
      if (this.classColor === 'colorOrange') {
        nameNguyCo = this.__t('BradenScoreboard.labelNguyCo.label2')
      }
      if (this.classColor === 'colorYellow') {
        nameNguyCo = this.__t('BradenScoreboard.labelNguyCo.label3')
      }
      if (this.classColor === 'colorGreen') {
        nameNguyCo = this.__t('BradenScoreboard.labelNguyCo.label4')
      }
      if (this.classColor === 'colorBlue') {
        nameNguyCo = this.__t('BradenScoreboard.labelNguyCo.label5')
      }
      return nameNguyCo
    },
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
    getMasterData () {
      this.getMasterDatas({Form: 'A02_056_050919_VE'}, () => {
        this.dataMaster = JSON.stringify(this.MASTERDATA)
      })
    },
    init (id) {
      new GetDetailBradenScoreboard().hideErrorMsg().update(this._VisitId + '/' + id).then(response => {
        this.DataSubmit = response
        this.time = response.TransactionDate || moment().format('HH:mm DD/MM/YYYY')
        this.mapMdData2Data()
        for (const property in this.MASTERDATA) {
          if (this.MASTERDATA[property].Items) {
            this.MASTERDATA[property].Items.forEach(item => {
              var code = item.Code
              var exited = _.find(this.DataSubmit.Datas, {Code: code})
              if (exited) {
                if (this.checkString(item.DataType, 'CheckBox') || this.checkString(item.DataType, 'Radio')) {
                  var isTrue = (exited.Value === 'True')
                  item.Value = isTrue
                } else {
                  item.Value = exited.Value
                }
              } else {
              }
            })
          }
        }
      }).catch(e => {
        this.loaded = true
        if (e.status === 404) {}
      })
    },
    // popup canh bao
    confirmPopup () {
      this.$modal.show('dialog', {
        clickToClose: false,
        title: this.__t('Cảnh báo'),
        text: this.__t('Dữ liệu bạn đang làm có thể bị mất nếu chưa lưu'),
        class: 'v-dialog v-dialog-warning',
        buttons: [
          {
            title: this.__t('Đồng ý'),
            class: 'btn btn-warning',
            handler: () => {
              this.$modal.hide('dialog')
              this.back()
            }
          },
          {
            title: this.__t('Hủy bỏ'),
            class: 'btn',
            handler: () => {
              // this.back()
              this.$modal.hide('dialog')
            }
          }
        ]
      })
    },
    handleBack () {
      if (this.dataMaster !== JSON.stringify(this.MASTERDATA)) {
        this.confirmPopup()
      } else {
        this.back()
      }
    },
    handleInsert () {
      this.idRow = ''
      this.nullContent = false
      this.showForm = true
      this.time = moment().format('HH:mm DD/MM/YYYY')
      this.scroll2Bottom($('#PageTable-BradenScoreboard').height())
    },
    mapData () {
      if (this.getTongDiem === 'N/A') {
        this.MASTERDATA['IPDBRADEN38'].Items[4].Value = ''
      } else {
        this.MASTERDATA['IPDBRADEN38'].Items[4].Value = this.getTongDiem
      }
    },
    handleSubmit () {
      this.mapData()
      this.DataSubmit.Datas = []
      if (!this._VisitId) return
      for (const property in this.MASTERDATA) {
        if (this.MASTERDATA[property].Items) {
          this.MASTERDATA[property].Items.forEach(item => {
            var code = item.Code
            var exited = _.find(this.DataSubmit.Datas, {Code: code})
            if (exited) {
              if (this.checkString(item.DataType, 'CheckBox') || this.checkString(item.DataType, 'Radio')) {
                var isTrue = (exited.Value === 'True')
                item.Value = isTrue
              } else {
                item.Value = ''
              }
            } else {
            }
          })
        }
      }
      this.mapData2MDDataBraden()
      const DataSubmit = Object.assign({}, this.DataSubmit)
      DataSubmit.TransactionDate = this.time ? this.time : ''
      DataSubmit.Id = this.idRow ? this.idRow : ''
      new InsertBradenScoreboard().update('Insert/' + this._VisitId, DataSubmit).then(() => {
        this.showForm = false
        this.toastedSuccess()
        this.getMasterData()
        EventBus.$emit('reloadTableBraden')
      })
    },
    getNullContent (val) {
      this.nullContent = val
      this.nullContentTable = val
    },
    handleEdit (dataEdit) {
      if (dataEdit) {
        this.GetUserView(dataEdit.CreatedBy)
        this.showForm = true
        this.idRow = dataEdit.id
        this.scroll2Bottom($('#PageTable-BradenScoreboard').height())
        this.init(dataEdit.id)
      }
    },
    getIsLocked (isLock) {
      this.IsLocked = isLock
    },
    GetUserView (CreatedBy) {
      this.UserView = false
      console.log('CreatedBy: ', CreatedBy)
      console.log('User: ', this.$store.state.account.Username)
      if (CreatedBy !== this.$store.state.account.Username) {
        this.UserView = true
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.BradenScoreboard-PageNurse {
  .content {
    .null-content {
      text-align: center;
    }
    .signal, .point {
      padding: 0px!important;
      .mini-box {
        font-size: 16px;
        display: flex;
        align-items: center;
        .box-left {
          border: 1px solid black;
          border-radius: 4px;
          width: 50%;
        }
        .box-right {
          width:50%;
        }
      }
    }
    .signal {
      .mini-box {
        border-right: 0px;
      }
    }
    .criteria {
      text-align: center;
      word-break: break-word;
      .content-criteria {
        font-style: italic;
      }
    }
    .table-create {
      th {
        text-align: center;
        background-color: #1375ba;
        color: #fff;
      }
    }
  }
}
.colorGreen {
  background: #43A286 !important;
  color: #FFF;
}
.colorYellow {
  background: #F4C74C !important;
  color: #FFF;
}
.colorRed {
  background: #E6472D !important;
  color: #FFF;
}
.colorOrange {
  background: #e6a62d !important;
  color: #FFF;
}
.colorBlue {
  background: #2d8fe6 !important;
  color: #FFF;
}
</style>
