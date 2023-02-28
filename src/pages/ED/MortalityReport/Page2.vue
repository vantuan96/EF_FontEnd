<template>
  <div class="main-content">
    <template v-if="loaded">
      <template v-if="DataSubmit">
        <h4 class="text-bold">Trích biên bản kiểm thảo tử vong</h4>
        <div class="box form-content mbt30">
          <p><b>- {{ __t('Họ tên người bệnh') }}:</b><span class="tab404">{{ DataSubmit.Customer.Fullname }}</span> <b>{{ __t('Tuổi') }}:</b> <span class="tab404">{{ DataSubmit.Customer.AgeFormated | formatAge }}</span> <b>{{ __t('Giới tính') }}:</b> <span class="tab404">{{ __t(DataSubmit.Customer.Gender) }}</span></p>
          <p><b>- {{ __t('Số vào viện') }}:</b><span class="tab404">{{ DataSubmit.Customer.PID || '' }}</span></p>
          <p><b>- {{ __t('Vào viện lúc') }}:</b>
            <span class="tab404">
              <span>{{ DataSubmit.AdmittedDate || '' }}</span>
            </span>
          </p>
          <p><b>- {{ __t('Tử vong lúc') }}:</b>
            <span class="tab404">
              <span>{{ DataSubmit.DeathAt || '' }}</span>
            </span>
          </p>
          <p><b>- {{ __t('Tại khoa') }}:</b><span class="tab404">{{ __label(DataSubmit.Specialty) }}</span></p>
          <p><b>- Kiểm điểm tử vong lúc:</b>
            <span class="tab404">
              <span>{{ DataSubmit.Time || '' }}</span>
              <!-- <v-date-picker v-else style="display: inline-block;" v-model="DataSubmit.Time" :format="vDateTimeFormat"/> -->
            </span>
          </p>
          <div style="width: 800px;">
            <div class="mgr-5 box-inline flex align-center space-between">
              <p><b>- {{ __t('Chủ tọa') }}: </b><span>{{ getNameMember(DataSubmit.Chairman) }}</span></p>
              <p><b>{{ __t('Thư ký') }}: </b><span>{{ getNameMember(DataSubmit.Secretary) }}</span></p>
            </div>
          </div>
          <div class="mrb10">
            <div class="mgr-5">
              <p><b>- Thành viên tham gia: </b><span v-for="(item, index) in Members" :key="index">{{ getNameMember(item) }}<span v-if="index !== (Members.length - 1)">, </span></span></p>
            </div>
          </div>
          <p class="text-bold font16">Tóm tắt quá trình diễn biến bệnh, quá trình điều trị và chăm sóc người bệnh:</p>
          <p v-if="DataSubmit.PastMedicalHistory"><b>1. {{ __t('Tóm tắt tiền sử bệnh') }}:</b></p>
          <div v-if="DataSubmit.PastMedicalHistory" class="mb10">
            <textarea-autosize
              v-model="DataSubmit.PastMedicalHistory" readonly class="form-control"
              rows="3"
            />
          </div>
          <p v-if="DataSubmit.Status"><b>2. {{ __t('Tình trạng lúc vào viện') }}:</b> <i>({{ __t('toàn thân, các bộ phận, các xét nghiệm ...') }})</i></p>
          <div v-if="DataSubmit.Status" class="mb10">
            <textarea-autosize
              v-model="DataSubmit.Status" readonly class="form-control"
              rows="3"
            />
          </div>
          <p v-if="DataSubmit.Diagnosis"><b>3. {{ __t('Chẩn đoán') }}:</b> <i>({{ __t('của cơ sở, khoa khám bệnh, khoa điều trị, khi tử vong, giải phẫu bệnh nếu có...') }})</i></p>
          <div v-if="DataSubmit.Diagnosis" class="mb10">
            <textarea-autosize
              v-model="DataSubmit.Diagnosis" readonly class="form-control"
              rows="3"
            />
          </div>
          <p v-if="DataSubmit.Progress"><b>4. {{ __t('Tóm tắt diễn biến bệnh, quá trình điều trị, quá trình chăm sóc .... từng giai đoạn của bệnh') }}:</b></p>
          <div v-if="DataSubmit.Progress" class="mb10">
            <textarea-autosize
              v-model="DataSubmit.Progress" readonly class="form-control"
              rows="3"
            />
            <div v-if="progressDatas && progressDatas.length" class="HistoryOfPresentIllness">
              <label> {{ progressDatas.length ? 'Thông tin theo dõi diễn biến can thiệp' : 'Không có thông tin theo dõi diễn biến can thiệp' }}</label>
              <vue-scrolling-table v-if="progressDatas.length">
                <template slot="tbl">
                  <table class="table observation-table">
                    <thead>
                      <tr>
                        <th width="1" class="no-wrap">{{ __t('OS0.ngay_gio') }}</th>
                        <th width="35%">{{ __t('OS0.dien_bien_nguoi_benh') }}</th>
                        <th width="35%">{{ __t('OS0.can_thiep') }}</th>
                        <th width="1" class="no-wrap">{{ __t('Người tạo') }}</th>
                        <th v-if="!isConfirmed" width="1">-/-</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(item, index) in progressDatas" :key="index">
                        <td width="1" class="no-wrap">{{ item.NoteAt }}</td>
                        <td><p>{{ item.Note }}</p></td>
                        <td><p>{{ item.Interventions }}</p></td>
                        <td width="1" class="no-wrap"><ad-Info :ad="item.Username" /></td>
                        <td v-if="!isConfirmed" width="1" class="no-wrap">
                          <button class="btn btn-xs v-white-btn" @click="copyToProgress(item)">Copy</button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </template>
              </vue-scrolling-table>
            </div>
          </div>
          <br>
          <p v-if="DataSubmit.Welcome"><b>5. {{ __t('Tiếp đón người bệnh') }}:</b></p>
          <div v-if="DataSubmit.Welcome" class="mb10">
            <textarea-autosize
              v-model="DataSubmit.Welcome" readonly class="form-control"
              rows="3"
            />
          </div>
          <p v-if="DataSubmit.Assessment"><b>6. {{ __t('Thăm khám và chẩn đoán bệnh, nguyên nhân, triệu chứng, tiên lượng') }}:</b></p>
          <div v-if="DataSubmit.Assessment" class="mb10">
            <textarea-autosize
              v-model="DataSubmit.Assessment" readonly class="form-control"
              rows="3"
            />
          </div>
          <p v-if="DataSubmit.TreatmentAndProcedures"><b>7. {{ __t('Điều trị') }}:</b></p>
          <div v-if="DataSubmit.TreatmentAndProcedures" class="mb10">
            <textarea-autosize
              v-model="DataSubmit.TreatmentAndProcedures" readonly class="form-control"
              rows="3"
            />
          </div>
          <p v-if="DataSubmit.Care"><b>8. {{ __t('Chăm sóc') }}:</b></p>
          <div v-if="DataSubmit.Care" class="mb10">
            <textarea-autosize
              v-model="DataSubmit.Care" readonly class="form-control"
              rows="3"
            />
          </div>
          <p v-if="DataSubmit.RelationShip"><b>9. {{ __t('Mối quan hệ với gia đình người bệnh') }}</b><i> ({{ __t('tình trạng bệnh, tài sản tư trang') }}...):</i></p>
          <div v-if="DataSubmit.RelationShip" class="mb10">
            <textarea-autosize
              v-model="DataSubmit.RelationShip" readonly class="form-control"
              rows="3"
            />
          </div>
          <p class="text-bold font16">{{ __t('Kết luận') }}:</p>
          <div v-if="DataSubmit.Conclusion" class="mb10">
            <textarea-autosize
              v-model="DataSubmit.Conclusion" readonly class="form-control"
              rows="3"
            />
          </div>
        </div>
        <div class="chairman-time">
          <p>Ngày {{ DOBFormart[0] || '.......' }} Tháng {{ DOBFormart[1] || '.......' }} Năm {{ DOBFormart[2] || '.......' }}</p>
        </div>
        <div class="row">
          <div class="row">
            <div class="col-md-6 text-center">
              <template v-if="DataSubmit.SecretaryTime">
                <p><b>{{__t('THƯ KÝ')}}:</b></p>
                <p class="mb-5">{{getFTime(DataSubmit.SecretaryTime)}}</p>
                <EformSignature2 :ad="DataSubmit.Secretary.Username"/>
              </template>
              <template v-else>
                <p><b>{{ __t('THƯ KÝ') }}:</b></p>
                <p class="italic" style="color: green">({{ __t('Chưa ký xác nhận') }})</p>
              </template>
            </div>
            <div class="col-md-6 text-center">
              <template v-if="DataSubmit.ChairmanTime">
                <p><b>{{__t('CHỦ TỌA')}}:</b></p>
                <p>{{getFTime(DataSubmit.ChairmanTime)}}</p>
                <EformSignature2 :ad="DataSubmit.Chairman.Username"/>
              </template>
              <template v-else>
                <p><b>{{ __t('CHỦ TỌA') }}:</b></p>
                <p class="italic" style="color: green">({{ __t('Chưa ký xác nhận') }})</p>
              </template>
            </div>
          </div>
        </div>
        <br/>
        <LastUpdateWithFormCode :FormCode="'A01_154_050919_V'" :DataSubmit="DataSubmit"/>
        <FloatBlock>
          <template slot="buttons">
            <div class="col-md-2 col-sm-2">
              <div class="form-group1">
                <button
                  v-shortkey="['ctrl', 'p']" class="btn v-yellow-btn pull-right" @click="print()"
                  @shortkey="print()"
                ><i class="fa fa-print" aria-hidden="true"/> In ngay</button>
              </div>
            </div>
            <div class="col-md-4 col-sm-4">
              <div class="form-group1"/>
            </div>
            <div class="col-md-6 col-sm-6">
              <div class="form-group1"/>
            </div>
          </template>
        </FloatBlock>
        <Print :data-submit="DataSubmit" class="hidden"/>
      </template>
    </template>
    <div v-else class="loading-text"><v-loading/></div>
  </div>
</template>
<script>
import MortalityReport from '@/services/ED/MortalityReport'
import Print from './PrintPage2.vue'
import VDatePicker from '@/components/VDateTimePicker.vue'
import UsersSelect from '@/components/UsersSelect.vue'
import Logs from '@/components/Logs.vue'
import moment from 'moment'
import { cloneDeep } from 'lodash'
export default {
  name: 'MortalityReportPart2',
  components: {
    VDatePicker, Logs, UsersSelect, Print
  },
  props: ['VisitId'],
  data () {
    return {
      DataSubmit: null,
      loaded: false,
      progressDatas: [],
      Members: []
    }
  },
  computed: {
    age () {
      if (this.DataSubmit.Customer.DateOfBirth) {
        var now = new Date()
        var y = now.getFullYear()
        var dob = this.DataSubmit.Customer.DateOfBirth.split('/')
        return y - parseInt(dob[2])
      }
      return ''
    },
    DOBFormart: function () {
      let ChairmanTime = ''
      if (this.DataSubmit.ChairmanTime) {
        ChairmanTime = this.DataSubmit.ChairmanTime.split(' ')[1]
      }
      return ChairmanTime ? ChairmanTime.split('/') : ['.....', '.....', '.....']
    },
    isConfirmed () {
      return (this.DataSubmit.SecretaryTime || this.DataSubmit.ChairmanTime || this.DataSubmit.Members.find(e => e.ConfirmTime))
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    print () {
      this.$htmlToPaper('printMe', false, 'A01_154_050919_V')
    },
    copyToProgress (item) {
      var str = `${item.NoteAt}: ${item.Note}, ${item.Interventions}`
      str = this.trim_(str)
      if (this.DataSubmit.Progress && this.DataSubmit.Progress.includes(str)) {
      } else {
        var old = this.DataSubmit.Progress ? (this.trim_(this.DataSubmit.Progress) + '\n') : ''
        this.DataSubmit.Progress = this.trim_(old + (str), '\n')
        this.toastedInfo('Đã copy')
      }
    },
    sync (type) {
      new MortalityReport().hideErrorMsg().update('sync/' + this._VisitId, {Method: `Sync${type}`}).then(response => {
        if (type === 'Progress') {
          this.progressDatas = response
        } else {
          this.DataSubmit[type] = response.join('\n')
        }
      })
    },
    getData () {
      new MortalityReport().hideErrorMsg().find(this._VisitId + '?hidemsg=' + true).then(response => {
        this.DataSubmit = response
        this.loaded = true
        if (!this.DataSubmit.Time) {
          this.DataSubmit.Time = moment(new Date()).format(this.vDateTimeFormat)
        }
        // this.sync('Diagnosis')
        // this.sync('Progress')
        this.Members = cloneDeep(this.DataSubmit.Members.filter(item => !item.IsNotMember))
      }).catch(e => {
        this.loaded = true
      })
    },
    getNameMember (item) {
      let name = ''
      if (item.FullName) {
        name = item.FullName
      } else if (item.DisplayName) {
        name = item.DisplayName.split('(')[0]
      } else {
        name = ''
      }
      return name
    }
  }
}
</script>
<style scoped>
.mgr-5 {
  margin-right: 5px;
}
.chairman-time {
  padding-right: 190px;
  font-weight: 600;
  font-style: italic;
  display: flex;
  justify-content: right;
}
</style>
