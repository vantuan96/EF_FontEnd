<template>
  <div>
    <div v-if="loaded">
      <div v-if="FormCode === 'A02_016_050919_VE'">
        <!-- Bác sĩ sản khoa -->
        <div
          v-if="MASTERDATA['IPDOAGIANM1']"
          class="flex-box flex-center mb10 mt-10"
        >
          <label class="display-inline ml-5 mr-5 w140" style="font-weight: bold"
            >{{ __label(MASTERDATA['IPDOAGIANM1']) }}:
          </label>
          <div v-if="listDoctor[0] && listDoctor.length > 0"><ad-Info :ad="listDoctor[0].Username" /></div>
          <p v-else>N/A</p>
        </div>
        <!-- Bác sĩ sơ sinh -->
        <div v-if="MASTERDATA['IPDOAGIANM3']" class="flex-box flex-center mb10">
          <label class="display-inline ml-5 mr-5 w140" style="font-weight: bold"
            >{{ __label(MASTERDATA['IPDOAGIANM3']) }}:</label
          >
          <div v-if="listDoctor[1] && listDoctor.length > 0"><ad-Info :ad="listDoctor[1].Username" /></div>
          <p v-else>{{ 'N/A' }}</p>
        </div>
        <!-- Nữ hộ sinh -->
        <div v-if="MASTERDATA['IPDOAGIANM5']" class="flex-box flex-center mb10">
          <label class="display-inline ml-5 mr-5 w140" style="font-weight: bold"
            >{{ __label(MASTERDATA['IPDOAGIANM5']) }}:</label
          >
          <div v-if="listDoctor[2] && listDoctor.length > 0"><ad-Info :ad="listDoctor[2].Username" /></div>
          <p v-else>{{ 'N/A' }}</p>
        </div>
      </div>
      <table v-if="MASTERDATA['IPDOAGIANM211']" class="table v-table-1 no-margin mt-10">
        <thead style="border-top: 1px #ccc solid">
          <tr v-if="FormCode === 'A02_016_050919_VE'">
            <th rowspan="2" class="text-center align-middle">{{ __t('ForUterineLife2Hours.NVYTDanhGia') }}</th>
            <th rowspan="2" width="10%" class="text-center align-middle">{{ __t('Thời điểm') }}</th>
            <th rowspan="2" width="5%" class="text-center align-middle">
              {{ __t('Khoảng thời gian sau sinh') }}
            </th>
            <th rowspan="2" width="9%" class="text-center align-middle">{{ __t('Tư thế bé') }}</th>
            <th class="text-center pb-0">{{ __t('Mầu sắc da') }}</th>
            <th rowspan="2" width="8%" class="text-center align-middle">{{ __t('Nhịp tim') }}</th>
            <th rowspan="2" width="8%" class="text-center align-middle">{{ __t('Nhịp thở') }}</th>
            <th rowspan="2" width="8%" class="text-center align-middle">{{ __t('Nhiệt độ') }}</th>
            <th class="text-center pb-0">{{ __t('Trương lực cơ') }}</th>
            <th class="text-center pb-0">{{ __t('Hoạt động') }}</th>
            <th class="text-center pb-0">{{ __t('Mã bú của bé') }}</th>
            <th class="text-center pb-0">{{ __t('Vị trí đặt bé') }}</th>
            <th rowspan="2" width="10%" class="text-center align-middle">{{ __t('ForUterineLife2Hours.GhiChu') }}</th>
          </tr>
          <!-- Ver-2 -->
          <tr v-else>
            <th rowspan="2" class="text-center align-middle">{{ __t('ForUterineLife2Hours.NVYTDanhGiaV2') }}</th>
            <th rowspan="2" width="10%" class="text-center align-middle">{{ __t('Thời điểm') }}</th>
            <th rowspan="2" width="5%" class="text-center align-middle">
              {{ __t('Khoảng thời gian sau sinh ') }}
            </th>
            <th rowspan="2" width="9%" class="text-center align-middle">{{ __t('Tư thế bé') }}</th>
            <th class="text-center pb-0">{{ __t('Màu da') }}</th>
            <th rowspan="2" width="8%" class="text-center align-middle">{{ __t('Nhịp tim') }}</th>
            <th rowspan="2" width="8%" class="text-center align-middle">{{ __t('Nhịp thở ') }}</th>
            <th rowspan="2" width="8%" class="text-center align-middle">{{ __t('Nhiệt độ') }}</th>
            <th class="text-center pb-0">{{ __t('Trương lực cơ ') }}</th>
            <th class="text-center pb-0">{{ __t('Hoạt động') }}</th>
            <th class="text-center pb-0">{{ __t('Mã bú của bé') }}</th>
            <th class="text-center pb-0">{{ __t('Vị trí đặt bé') }}</th>
            <th rowspan="2" width="10%" class="text-center align-middle">{{ __t('Ghi chú ') }}</th>
          </tr>
          <tr>
            <th class="pt-0 h-45">
              <div class="dropdown no-wrap">
                <div class="dropdown-toggle cursor fw200" id="dropdownColour" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <i class="fa fa-angle-double-down"></i> {{__t('Ý nghĩa')}}
                </div>
                <div class="dropdown-menu" aria-labelledby="dropdownColour">
                  <table style="margin: 0" class="table observation-table table-dropdow">
                    <tr>
                      <td class="fw600 text-center">P</td>
                      <td>{{__t('Da hồng hào')}}</td>
                    </tr>
                    <tr>
                      <td class="fw600 text-center">C</td>
                      <td v-if="FormCode === 'A02_016_050919_VE'">{{__t('Da xanh')}}</td>
                      <!-- Ver-2 -->
                      <td v-else>{{__t('Da xanh ')}}</td>
                    </tr>
                    <tr v-if="FormCode !== 'A02_016_050919_VE'">
                      <td class="fw600 text-center">Y/N</td>
                      <td>{{__t('Bình thường')}}</td>
                    </tr>
                  </table>
                </div>
              </div>
            </th>
            <th class="pt-0 h-45">
              <div v-if="FormCode === 'A02_016_050919_VE'" class="dropdown no-wrap">
                <div class="dropdown-toggle cursor fw200" id="dropdownColour" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <i class="fa fa-angle-double-down"></i> {{__t('Ý nghĩa')}}
                </div>
                <div class="dropdown-menu" aria-labelledby="dropdownColour">
                  <table style="margin: 0" class="table observation-table table-dropdow">
                    <tr>
                      <td class="fw600 text-center">Y</td>
                      <td>{{__t('Bình thường')}}</td>
                    </tr>
                    <tr>
                      <td class="fw600 text-center">N</td>
                      <td>{{__t('...')}}</td>
                    </tr>
                  </table>
                </div>
              </div>
            </th>
            <th class="pt-0 h-45">
              <div class="dropdown no-wrap">
                <div class="dropdown-toggle cursor fw200" id="dropdownActivity" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <i class="fa fa-angle-double-down"></i> {{__t('Ý nghĩa')}}
                </div>
                <div class="dropdown-menu" aria-labelledby="dropdownActivity">
                  <table style="margin: 0" class="table observation-table table-dropdow">
                    <tr>
                      <td class="fw600 text-center">F</td>
                      <td>{{__t('Đang bú')}}</td>
                    </tr>
                    <tr>
                      <td class="fw600 text-center">C</td>
                      <td>{{__t('Đang trong vòng tay mẹ')}}</td>
                    </tr>
                    <tr>
                      <td class="fw600 text-center">S</td>
                      <td>{{__t('Đang ngủ')}}</td>
                    </tr>
                    <tr v-if="FormCode === 'A02_016_050919_VE'">
                      <td class="fw600 text-center">O</td>
                      <td>{{__t('Khác, ghi rõ')}}</td>
                    </tr>
                  </table>
                </div>
              </div>
            </th>
            <th class="pt-0 h-45">
              <div class="dropdown no-wrap">
                <div class="dropdown-toggle cursor fw200" id="dropdownFeedingCode" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <i class="fa fa-angle-double-down"></i> {{__t('Ý nghĩa')}}
                </div>
                <div class="dropdown-menu" aria-labelledby="dropdownFeedingCode">
                  <table style="margin: 0" class="table observation-table table-dropdow">
                    <tr>
                      <td class="fw600 text-center">A</td>
                      <td>{{__t('Mẹ tự cho bú')}}</td>
                    </tr>
                    <tr>
                      <td class="fw600 text-center">B</td>
                      <td>{{__t('Cần NHS, ĐD hỗ trợ')}}</td>
                    </tr>
                  </table>
                </div>
              </div>
            </th>
            <th class="pt-0 h-45">
              <div class="dropdown no-wrap">
                <div class="dropdown-toggle cursor fw200" id="dropdownFeedingCode" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <i class="fa fa-angle-double-down"></i> {{__t('Ý nghĩa')}}
                </div>
                <div class="dropdown-menu" aria-labelledby="dropdownFeedingCode">
                  <table style="margin: 0" class="table observation-table table-dropdow">
                    <tr>
                      <td class="fw600 text-center">SS</td>
                      <td>{{__t('Đang ấp da kề da với mẹ')}}</td>
                    </tr>
                    <tr>
                      <td class="fw600 text-center">C</td>
                      <td>{{__t('Tại nôi')}}</td>
                    </tr>
                    <tr>
                      <td class="fw600 text-center">B</td>
                      <td>{{__t('Nằm với mẹ')}}</td>
                    </tr>
                    <tr v-if="FormCode === 'A02_016_050919_VE'">
                      <td class="fw600 text-center">O</td>
                      <td>{{__t('Nơi khác, ghi rõ')}}</td>
                    </tr>
                  </table>
                </div>
              </div>
            </th>
          </tr>
        </thead>
        <tr v-for="(item, index) in tableAssessed" :key="index">
          <td class="text-center" style="position: relative">
            <ad-Info :ad="item.StaffName" />
          </td>
          <td class="text-center">
            <FakeInput v-if="item.Time" v-model="item.Time" />
            <span v-else class="fake-input disable">{{
              'N/A'
            }}</span>
          </td>
          <td class="text-center">
            <span class="fake-input disable">{{
              item.IntervalsFromTimeOfBirth || 'N/A'
            }}</span>
          </td>
          <td class="text-center">
            <span class="fake-input disable">{{
              item.PositionOfBaby || 'N/A'
            }}</span>
          </td>
          <td class="text-center">
            <span class="fake-input disable">{{ item.Colour || 'N/A' }}</span>
          </td>
          <td class="text-center">
            <span class="fake-input disable">{{
              item.HeartRate || 'N/A'
            }}</span>
          </td>
          <td class="text-center">
            <span class="fake-input disable">{{
              item.Respirations || 'N/A'
            }}</span>
          </td>
          <td class="text-center">
            <span class="fake-input disable">{{
              item.Temperature || 'N/A'
            }}</span>
          </td>
          <td class="text-center">
            <span class="fake-input disable">{{ item.Tone || 'N/A' }}</span>
          </td>
          <td class="text-center">
            <span class="display-inline fake-input disable">{{ item.Activity || 'N/A' }}</span>
            <span v-if="item.ActivityText" class="display-inline fake-input disable mt-5">{{ item.ActivityText || 'N/A' }}</span>
          </td>
          <td class="text-center">
            <span class="fake-input disable">{{
              item.FeedingCode || 'N/A'
            }}</span>
          </td>
          <td class="text-center">
            <span class="display-inline fake-input disable">{{ item.Location || 'N/A' }}</span>
            <span v-if="item.LocationText" class="display-inline fake-input disable mt-5">{{ item.LocationText || 'N/A' }}</span>
          </td>
          <td class="text-center">
            <span class="fake-input disable">{{ item.Note || 'N/A' }}</span>
          </td>
        </tr>
      </table>

      <div
        class="flex-box flex-center mt-10"
        v-if="MASTERDATA['IPDOAGIANM203']"
      >
        <b class="ml-5">{{ __label(MASTERDATA['IPDOAGIANM203']) }}:</b>
        <td>
          <FakeInput v-model="MASTERDATA['IPDOAGIANM203'].Items[0].Value" />
        </td>
      </div>
      <br /><br />
      <table class="ml-5" style="width: 100%">
        <tr>
          <th>
            <label>{{ __t('2 NVYT đã kiểm tra ID') }}:</label>
          </th>
        </tr>
        <tr>
          <th v-if="DataSubmit.Confirm" style="width: 50%" class="text-center">
            <template v-if="DataSubmit.Confirm.MedicalStaff1.UserName">
              <div style="font-weight: normal">{{ Confirm1 }}</div>
              <eform-signature
                :ad="DataSubmit.Confirm.MedicalStaff1.UserName"
                :title="__t('Nhân viên Y tế 1')"
              />
            </template>
            <div v-else>
              <p class="mb-10">
                <b v-if="FormCode === 'A02_016_050919_VE'">{{ __t('Nhân viên Y tế 1') }}</b>
                <b v-else>{{ __t('Nhân viên Y tế 1 ') }}</b>
              </p>
              <button
                v-if="!viewOnly && !DataSubmit.IsLocked"
                @click="showDoctorConfirm('MEDICALSTAFF1', 'Nhân viên Y tế 1')"
                class="btn v-white-btn"
              >
                {{ __t('Xác nhận') }}
              </button>
              <i v-else>{{__t('Chưa xác nhận')}}</i>
            </div>
          </th>
          <th v-if="DataSubmit.Confirm" style="width: 50%" class="text-center">
            <template v-if="DataSubmit.Confirm.MedicalStaff2.UserName">
              <div style="font-weight: normal">{{ Confirm2 }}</div>
              <eform-signature
                :ad="DataSubmit.Confirm.MedicalStaff2.UserName"
                :title="__t('Nhân viên Y tế 2')"
              />
            </template>
            <div v-else>
              <p class="mb-10">
                <b v-if="FormCode === 'A02_016_050919_VE'">{{ __t('Nhân viên Y tế 2') }}</b>
                <b v-else>{{ __t('Nhân viên Y tế 2 ') }}</b>
              </p>
              <button
                v-if="!viewOnly && !DataSubmit.IsLocked"
                @click="showDoctorConfirm('MEDICALSTAFF2', 'Nhân viên Y tế 2')"
                class="btn v-white-btn"
              >
                {{ __t('Xác nhận') }}
              </button>
              <i v-else>{{__t('Chưa xác nhận')}}</i>
            </div>
          </th>
        </tr>
      </table>
      <br />
      <br />
      <br />
      <div v-if="viewOnly" class="ml-5">
        <p>{{FormCode}}</p>
        <p>{{__t('Chỉnh sửa lần cuối bởi')}} <AdInfo v-if="DataSubmit" :ad="DataSubmit.UpdateBy" /> {{__t('lúc')}} {{ UpdatedAt }}</p>
      </div>
    </div>
    <div v-else class="loading-text"><v-loading/></div>
  </div>
</template>
<script>
import InitialAssessment from '@/services/IPD/InitialAssessment'
import CreateTable from '@/services/IPD/CreateTable'
import MixinMasterData from '@/mixins/masterdata.js'
import MixinForm from '@/mixins/form.js'
import moment from 'moment'
import _ from 'lodash'
export default {
  name: 'viewOnly',
  mixins: [MixinForm, MixinMasterData],
  props: {
    listDoctor: {
      type: Array,
      default: () => []
    },
    viewOnly: {
      type: Boolean,
      default: false
    },
    // UpdatedAt: {
    //   type: String,
    //   default: ''
    // },
    // tableAssessed: {
    //   type: Array,
    //   default: () => []
    // },
    // DataSubmit: {
    //   type: Object,
    //   default: () => {}
    // },
    VisitId: {
      type: String,
      default: ''
    },
    formId: {
      type: String,
      default: ''
    },
    FormCode: {
      type: String,
      default: 'A02_016_050919_VE'
    }
  },
  watch: {
    formId () {
      this.getData()
    }
  },
  data () {
    return {
      loaded: false,
      tableAssessed: [],
      DataSubmit: {},
      Confirm1: '',
      Confirm2: '',
      historyList: [{
        Code: '',
        Value: ''
      }]
    }
  },
  mounted () {
    this.getMasterDatas({ Form: 'A02_016_050919_VE' }, () => {
      this.getData()
    })
  },
  computed: {
    _ItemId () {
      return this.formId || this.$route.params.Item
    }
  },
  methods: {
    getDataTable () {
      let url = ''
      this.FormCode === 'A02_016_050919_VE' ? url = `AssessedTable/${this.oldVisitId && this.isNew ? this.oldVisitId : this._VisitId}` : url = `AssessedTable/${this._ItemId}`
      new CreateTable().find(url).then(res => {
        console.log('listTableAPI', res.Datas)
        this.historyList = res.Datas
        this.tableAssessed = []
        for (let i = 0; i < res.Datas.length; i++) {
          // eslint-disable-next-line no-unused-expressions
          const historyData = {
            id: this.historyList[i].IdRow,
            Activity: this.historyList[i].RowData[0].Value,
            ActivityText: this.historyList[i].RowData[1].Value,
            Colour: this.historyList[i].RowData[2].Value,
            FeedingCode: this.historyList[i].RowData[3].Value,
            HeartRate: this.historyList[i].RowData[4].Value,
            IntervalsFromTimeOfBirth: this.historyList[i].RowData[5].Value,
            Location: this.historyList[i].RowData[6].Value,
            LocationText: this.historyList[i].RowData[7].Value,
            Note: this.historyList[i].RowData[8].Value,
            PositionOfBaby: this.historyList[i].RowData[9].Value,
            Respirations: this.historyList[i].RowData[10].Value,
            StaffName: this.historyList[i].RowData[11].Value,
            Temperature: this.historyList[i].RowData[12].Value,
            Time: this.historyList[i].RowData[13].Value,
            Tone: this.historyList[i].RowData[14].Value,
            // get id
            idActivity: this.historyList[i].RowData[0].Id,
            idActivityText: this.historyList[i].RowData[1].Id,
            idColour: this.historyList[i].RowData[2].Id,
            idFeedingCode: this.historyList[i].RowData[3].Id,
            idHeartRate: this.historyList[i].RowData[4].Id,
            idIntervalsFromTimeOfBirth: this.historyList[i].RowData[5].Id,
            idLocation: this.historyList[i].RowData[6].Id,
            idLocationText: this.historyList[i].RowData[7].Id,
            idNote: this.historyList[i].RowData[8].Id,
            idPositionOfBaby: this.historyList[i].RowData[9].Id,
            idRespirations: this.historyList[i].RowData[10].Id,
            idStaffName: this.historyList[i].RowData[11].Id,
            idTemperature: this.historyList[i].RowData[12].Id,
            idTime: this.historyList[i].RowData[13].Id,
            idTone: this.historyList[i].RowData[14].Id
          }
          this.tableAssessed.push(historyData)
        }
        const sortDataByTime = _.orderBy(this.tableAssessed, [(item) => moment(item.Time, 'HH:mm DD/MM/YYYY').format()], ['asc'])
        this.tableAssessed = []
        this.tableAssessed = sortDataByTime
        console.log('listtestView', this.tableAssessed)
      }).catch(error => {
        console.log('err', error)
      })
    },
    showDoctorConfirm (TypeConfirm, title) {
      this.$emit('emitDoctorConfirm', { TypeConfirm, title })
    },
    getData () {
      let url = ''
      if (this.FormCode === 'A02_016_050919_VE') {
        url = `ForNewborns/A02_016_050919_VE/${this._VisitId}/ForUterineLife2Hours/?hidemsg=${true}`
      } else {
        // API ver 2
        url = `ForUterineLife2HoursV2/A02_016_061022_VE/${this._VisitId}/ForUterineLife2Hours_Obstetrics/${this._ItemId}`
      }
      new InitialAssessment()
        .find(url)
        .then(response => {
          this.DataSubmit = response
          this.$store.dispatch('setCurrentFormId', response.ID)
          if (this.syncInfo && response.Datas.length === 0) {
            this.DataSubmit.Datas = this.syncInfo
            this.synced = true
          }
          for (const property in this.MASTERDATA) {
            if (this.MASTERDATA[property].Items) {
              this.MASTERDATA[property].Items.forEach(item => {
                var code = item.Code
                var exited = _.find(this.DataSubmit.Datas, { Code: code })
                if (exited) {
                  if (
                    this.checkString(item.DataType, 'CheckBox') ||
                    this.checkString(item.DataType, 'Radio')
                  ) {
                    var isTrue = exited.Value === 'True'
                    item.Value = isTrue
                  } else if (
                    item.Code === 'IPDOAGIANM212'
                  ) {
                    item.Value = this.JSONParse(exited.Value)
                  } else {
                    item.Value = exited.Value
                  }
                }
              })
            }
          }
          this.UpdatedAt = moment(this.DataSubmit.UpdatedAt).format('HH:mm DD/MM/YYYY')
          if (this.DataSubmit.Confirm.MedicalStaff1.UserName) {
            this.Confirm1 = moment(this.DataSubmit.Confirm.MedicalStaff1.ConfirmAt).format('HH:mm DD/MM/YYYY')
          }
          if (this.DataSubmit.Confirm.MedicalStaff2.UserName) {
            this.Confirm2 = moment(this.DataSubmit.Confirm.MedicalStaff2.ConfirmAt).format('HH:mm DD/MM/YYYY')
          }
          this.getDataTable()
          this.loaded = true
        })
        .catch(e => {
          this.loaded = true
          this.DataSubmit = false
          if (e.status === 404) {
          }
        })
    }
  }
}
</script>
<style scoped>
.fake-input.disable {
  display: block !important;
}
.text-center span {
  display: block;
}
.table>thead>tr>th {
  text-align: center;
}
.pb-0 {
  padding-bottom: 0 !important;
}
.pt-0 {
  padding-top: 0;
}
.h-45 {
  height: 45px !important;
}
</style>
