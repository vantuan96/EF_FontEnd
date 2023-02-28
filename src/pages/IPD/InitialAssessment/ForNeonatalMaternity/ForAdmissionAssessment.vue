<template>
  <div>
    <div v-if="loaded">
      <template v-if="DataSubmit.Datas">
        <div v-if="readonly || viewonly">
          <ViewOnly :MASTERDATA="MASTERDATA" :DataSubmit="DataSubmit" :listDoctor="listDoctor" :tableData="tableData" :CreatedAt="CreatedAt" :VisitId="VisitId"/>
        </div>
        <div v-else>
          <!-- Bác sĩ sản khoa -->
          <div
            v-if="MASTERDATA['IPDOAGIANM1']"
            class="flex-box flex-center mb10 mt-10"
          >
            <label
              class="display-inline ml-5 mr-5 w140"
              style="font-weight: bold"
              >{{ __label(MASTERDATA['IPDOAGIANM1']) }}:
            </label>
            <div v-if="listDoctor[0]">
              <ad-Info :ad="listDoctor[0].Username" />
            </div>
            <p v-else>{{ 'N/A' }}</p>
          </div>
          <!-- Bác sĩ sơ sinh -->
          <div
            v-if="MASTERDATA['IPDOAGIANM3']"
            class="flex-box flex-center mb10"
          >
            <label
              class="display-inline ml-5 mr-5 w140"
              style="font-weight: bold"
              >{{ __label(MASTERDATA['IPDOAGIANM3']) }}:</label
            >
            <div v-if="listDoctor[1]">
              <ad-Info :ad="listDoctor[1].Username" />
            </div>
            <p v-else>{{ 'N/A' }}</p>
          </div>
          <!-- Nữ hộ sinh -->
          <div
            v-if="MASTERDATA['IPDOAGIANM5']"
            class="flex-box flex-center mb10"
          >
            <label
              class="display-inline ml-5 mr-5 w140"
              style="font-weight: bold"
              >{{ __label(MASTERDATA['IPDOAGIANM5']) }}:</label
            >
            <div v-if="listDoctor[2]">
              <ad-Info :ad="listDoctor[2].Username" />
            </div>
            <p v-else>{{ 'N/A' }}</p>
          </div>
          <div
            v-if="MASTERDATA['IPDOAGIANM7']"
            class="flex-box flex-center mb10"
          >
            <!-- Thời gian đánh giá -->
            <label
              class="display-inline ml-5 mr-5 w140"
              style="font-weight: bold"
              >{{ __label(MASTERDATA['IPDOAGIANM7']) }}:</label
            >
            <VDatePicker
              :hideTooltip="false"
              class="w1510 display-inline"
              :format="'HH:mm DD/MM/YYYY'"
              v-model="CreatedAt"
            />
            <!-- NVYT tế đánh giá -->
            <div class="flex-box flex-center">
              <label
                class="display-inline ml-20 mr-5"
                style="font-weight: bold; margin-bottom: 0"
                >{{ __t('NVYT đánh giá') }}:</label
              >
              <ad-Info :ad="DataSubmit.CreatedBy" />
            </div>
          </div>
          <table
            style="overflow: hidden; margin-bottom: 0"
            class="table v-table-1 mt-10"
          >
            <tr>
              <th width="5%" class="no-wrap text-center">{{ 'STT' }}</th>
              <th width="20%" class="no-wrap text-center">
                <div>
                  <span class="block">{{ __t('Đánh giá chung') }}</span>
                  <span class="block">{{'(Tick bình thường)'}}</span>
                </div>
              </th>
              <th width="60%" class="no-wrap text-center">
                {{ __t('Nhận xét') }}
              </th>
            </tr>
            <tr v-for="(item, index) in tableData" :key="index">
              <td class="text-center">{{ index + 1 }}</td>
              <td>
                <div class="flex-box flex-center v-checkbox">
                  <input
                    type="checkbox"
                    :id="'IPDOAGIANMAA-' + index"
                    v-model="MASTERDATA[`${item.Code}`].Items[0].Value"
                  />
                  <label
                    style="display: flex; align-items: center; font-weight: normal"
                    :for="'IPDOAGIANMAA-' + index"
                    >{{ __label(MASTERDATA[`${item.Code}`]) }}</label
                  >
                </div>
              </td>
              <td>
                <textarea-autosize
                  rows="1"
                  class="form-control"
                  :placeholder="__t('Nhập (nếu có)')"
                  v-model="MASTERDATA[`${item.Code}`].Items[1].Value"
                />
              </td>
            </tr>
          </table>
        </div>
        <br /><br /><br />
        <div class="row">
          <div class="col-md-6 col-sm-6 text-center"></div>
          <div class="col-md-6 col-sm-6 text-center">
            <template v-if="DataSubmit.UpdatedAt && DataSubmit.UpdatedBy">
              <p>{{ DataSubmit.UpdatedAt }}</p>
              <eform-signature
                :ad="DataSubmit.UpdatedBy.Username"
                :title="__t('Điều dưỡng thực hiện')"
              />
            </template>
          </div>
        </div>
        <br />
        <br />
        <div class="ml-5">
          <p>A02_016_050919_VE</p>
          <p>{{__t('Chỉnh sửa lần cuối bởi')}} <AdInfo v-if="DataSubmit" :ad="DataSubmit.UpdateBy" /> {{__t('lúc')}} {{ UpdatedAt }}</p>
        </div>
        <br />
        <br />
        <div v-if="!viewonly">
          <FloatBlock v-if="!readonly">
            <template slot="top" v-if="synced">
              <div style="color: #fff; text-align: right">
                <b>Dữ liệu được đồng bộ từ khoa:</b> {{__t(specialty.ViName)}}
              </div>
            </template>
            <template slot="buttons">
              <div class="col-md-2 col-sm-2"></div>
              <div class="col-md-2">
                <div class="form-group1">
                  <p class="hidden-text">hidden-text</p>
                </div>
              </div>
              <div class="col-md-3">
                <!-- <div class="form-group1">
                <button class="btn pull-right btn-block" type="button" @click="$router.push({name: 'IPDFallRiskAssessment', params: {Id: $route.params.Id}})">{{__t('Đánh giá nguy cơ ngã')}}</button>
              </div> -->
              </div>
              <div class="col-md-5">
                <div class="form-group1">
                  <button
                    class="btn v-yellow-btn pull-right btn-block hvr-ripple-out"
                    type="button"
                    v-shortkey="['ctrl', 's']"
                    @shortkey="submit()"
                    @click="submit()"
                  >
                    <i class="fa fa-floppy-o" aria-hidden="true"></i>
                    {{ __t('btn.luu') }}
                  </button>
                </div>
              </div>
            </template>
          </FloatBlock>
        </div>
      </template>
      <div v-else style="padding: 20px;">
        <div class="text-center">
          <p>{{ __t('Chưa có đánh giá ngay sau sinh') }}</p>
          <div v-if="!viewonly">
            <button
              v-if="!IsLocked"
              class="btn btn-warning"
              @click="confirmPopup"
            >
              {{ __t('Tạo mới') }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import NeonatalMaternityView from './NeonatalMaternityView.vue'
import MixinMasterData from '@/mixins/masterdata.js'
import MixinForm from '@/mixins/form.js'
import FormMixin from '../Mixi.js'
import InitialAssessment from '@/services/IPD/InitialAssessment'
import ViewOnly from '@/components/IPD/ForNeonatalMaternity/ForAdmissionAssessmentView'
import VDatePicker from '@/components/VDateTimePicker.vue'
import Logs from '@/components/Logs.vue'
import RemoveBtn from '../Delete.vue'
import _ from 'lodash'
import moment from 'moment'
export default {
  name: 'IPDInitialAssessmentForAdmissionAssessment',
  mixins: [MixinMasterData, MixinForm, FormMixin],
  components: {
    VDatePicker,
    RemoveBtn,
    Logs,
    ViewOnly
    // NeonatalMaternityView
  },
  props: {
    viewonly: {
      type: Boolean,
      default: false
    },
    VisitId: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      tableData: [],
      DataSubmit: {},
      loaded: false,
      listDoctor: [],
      UpdatedAt: '',
      IsLocked: false,
      CreatedAt: '',
      syncInfo: null,
      synced: false
    }
  },
  mounted () {
    this.getMasterDatas({ Form: 'A02_016_050919_VE' }, () => {
      for (const property in this.MASTERDATA) {
        if (
          this.MASTERDATA[property].Order >= 149 &&
          this.MASTERDATA[property].Order < 202
        ) {
          this.tableData.push(this.MASTERDATA[property])
        }
      }
      this.getInfo()
      this.getListDoctors()
    })
    this.UpdatedAt = moment(this.DataSubmit.UpdatedAt).format(
      'HH:mm DD/MM/YYYY'
    )
    console.log('readonly:', this.readonly)
  },
  computed: {
    readonly () {
      if (this.DataSubmit.CreatedBy === '') {
        return this.DataSubmit.IsLocked === true
      }
      return (
        this.DataSubmit.CreatedBy !== this.$store.state.account.Username ||
        this.DataSubmit.IsLocked === true
      )
    }
  },
  methods: {
    getInfo () {
      new InitialAssessment().find('ForNewborns/Info/' + 'A02_016_050919_VE/' + this._VisitId + '/ForAdmissionAssessment/').then(response => {
        this.IsLocked = response.IsLocked
        const responseArrivalTime = moment(response.DateOfAdmission).format('HH:mm DD/MM/YYYY')
        this.arrivalTime = responseArrivalTime
        if (response.OldDatas && response.SpecialtyOld) {
          this.syncInfo = response.OldDatas
          this.specialty = response.SpecialtyOld
        } else {
          this.syncInfo = null
          this.specialty = ''
        }
        this.getData()
      }).catch(e => {
        this.IsLocked = e.data.IsLocked
        this.loaded = true
        this._401ResponseError(e)
      })
    },
    getData () {
      new InitialAssessment()
        .find('ForNewborns/' + 'A02_016_050919_VE/' + this._VisitId + '/ForAdmissionAssessment/' + '?hidemsg=' + true)
        .then(response => {
          this.DataSubmit = response
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
                  } else if (this.syncInfo && item.Code === 'IPDOAGIANM216') {
                  } else {
                    item.Value = exited.Value
                  }
                }
              })
            }
          }
          this.UpdatedAt = moment(this.DataSubmit.UpdatedAt).format('HH:mm DD/MM/YYYY')
          if (!this.MASTERDATA['IPDOAGIANM215'].Items[0].Value) {
            this.CreatedAt = moment(this.DataSubmit.CreatedAt).format('HH:mm DD/MM/YYYY')
          } else {
            this.CreatedAt = this.MASTERDATA['IPDOAGIANM215'].Items[0].Value
          }
          this.loaded = true
        })
        .catch(e => {
          this.loaded = true
          this.DataSubmit = false
          if (e.status === 404) {
          }
        })
    },
    getListDoctors () {
      new InitialAssessment()
        .find('ForNewborns/' + 'A02_016_050919_VE/' + this._VisitId + '/ForNeonatalMaternity/' + '?hidemsg=' + true)
        .then(response => {
          this.DataSubmit2 = response
          for (const property in this.MASTERDATA) {
            if (this.MASTERDATA[property].Items) {
              this.MASTERDATA[property].Items.forEach(item => {
                var code = item.Code
                var exited = _.find(this.DataSubmit2.Datas, { Code: code })
                if (exited) {
                  if (
                    item.Code === 'IPDOAGIANM2' ||
                    item.Code === 'IPDOAGIANM4' ||
                    item.Code === 'IPDOAGIANM6'
                  ) {
                    item.Value = this.JSONParse(exited.Value)
                    this.listDoctor.push(item.Value)
                  }
                }
              })
            }
          }
        })
        .catch(e => {
          this.DataSubmit = false
          if (e.status === 404) {
          }
        })
    },
    submit () {
      var obj = {}
      this.DataSubmit.Time = {
        AdmittedFrom: null
      }
      this.MASTERDATA['IPDOAGIANM215'].Items[0].Value = this.CreatedAt
      for (const property in this.MASTERDATA) {
        if (this.MASTERDATA[property].Items) {
          this.MASTERDATA[property].Items.forEach(item => {
            var val = item.Value
            this.DataSubmit.Datas.push({
              Code: item.Code,
              Value: val,
              Group: property
            })
            obj[item.Code] = item.Value
          })
        }
      }
      new InitialAssessment()
        .update('ForNewborns/Update/' + 'A02_016_050919_VE/' + this._VisitId + '/ForAdmissionAssessment/', this.DataSubmit)
        .then(response => {
          this.toastedSuccess()
          setTimeout(() => {
            this.reload()
          }, 500)
        })
        .catch(e => {
          // this._401ResponseError(e)
        })
    },
    create () {
      new InitialAssessment()
        .update('ForNewborns/Create/' + 'A02_016_050919_VE/' + this._VisitId + '/ForAdmissionAssessment/')
        .then(response => {
          console.log('response', response)
          this.reload()
        })
        .catch(e => {
          // this.back()
        })
    },
    confirmPopup () {
      this.$modal.show('dialog', {
        clickToClose: false,
        title: this.__t('Thông báo'),
        text: this.__t('Tạo mới đánh giá ngay sau sinh'),
        class: 'v-dialog v-dialog-warning',
        buttons: [
          {
            title: this.__t('Tôi xác nhận'),
            class: 'btn btn-warning',
            handler: () => {
              this.$modal.hide('dialog')
              this.create()
            }
          },
          {
            title: this.__t('Bỏ qua'),
            class: 'btn',
            handler: () => {
              this.$modal.hide('dialog')
            }
          }
        ]
      })
    }
  }
}
</script>
<style scoped>
.v-checkbox input[type='checkbox'] + label:before {
  margin-left: 0;
  margin-right: 5px;
}
</style>
