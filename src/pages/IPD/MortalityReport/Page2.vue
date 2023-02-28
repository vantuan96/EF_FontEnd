<template>
  <div class="main-content">
    <template v-if="loaded">
      <template v-if="DataSubmit">
        <h4 class="text-bold">Trích biên bản kiểm thảo tử vong</h4>
        <div class="box form-content mbt30">
          <p><b>- {{__t('Họ tên người bệnh')}}:</b><span class="tab404">{{DataSubmit.Customer.Fullname}}</span> <b>{{__t('Tuổi')}}:</b> <span class="tab404">{{DataSubmit.Customer.AgeFormated | formatAge}}</span> <b>{{__t('Giới tính')}}:</b> <span class="tab404">{{__t(DataSubmit.Customer.Gender)}}</span></p>
          <p><b>- {{__t('Số vào viện')}}:</b><span class="tab404">{{DataSubmit.Customer.PID || ''}}</span></p>
          <p><b>- {{__t('Vào viện lúc')}}:</b>
            <span class="tab404">
              <span>{{DataSubmit.AdmittedDate || ''}}</span>
            </span>
          </p>
          <p><b>- {{__t('Tử vong lúc')}}:</b>
            <span class="tab404">
              <span>{{DataSubmit.DeathAt || ''}}</span>
            </span>
          </p>
          <p><b>- {{__t('Tại khoa')}}:</b><span class="tab404">{{__label(DataSubmit.Specialty)}}</span></p>
          <p><b>- Kiểm điểm tử vong lúc:</b>
            <span class="tab404">
              <span>{{DataSubmit.Time || ''}}</span>
              <!-- <v-date-picker v-else style="display: inline-block;" v-model="DataSubmit.Time" :format="vDateTimeFormat"/> -->
            </span>
          </p>
          <div style="width: 800px;">
            <div class="mgr-5 box-inline flex align-center space-between">
              <p><b>- {{__t('Chủ tọa')}}: </b><span>{{getNameMember(DataSubmit.Chairman)}}</span></p>
              <p><b>{{__t('Thư ký')}}: </b><span>{{getNameMember(DataSubmit.Secretary)}}</span></p>
            </div>
          </div>
          <div class="mrb10">
            <div class="mgr-5">
              <p><b>- Thành viên tham gia: </b><span  v-for="(item, index) in Members" :key="index">{{getNameMember(item)}}<span v-if="index !== (Members.length - 1)">, </span></span></p>
            </div>
          </div>
          <p class="text-bold font16">Tóm tắt quá trình diễn biến bệnh, quá trình điều trị và chăm sóc người bệnh</p>

          <p v-if="DataSubmit.PastMedicalHistory"><b>1. {{__t('Tóm tắt tiền sử bệnh')}}:</b></p>
          <div class="mb10" v-if="DataSubmit.PastMedicalHistory">
            <textarea-autosize readonly class="form-control" rows="3" v-model="DataSubmit.PastMedicalHistory"/>
          </div>
          <p v-if="DataSubmit.Status"><b>2. {{__t('Tình trạng lúc vào viện')}}:</b> <i>({{__t('toàn thân, các bộ phận, các xét nghiệm ...')}})</i></p>
          <div class="mb10" v-if="DataSubmit.Status">
            <textarea-autosize readonly class="form-control" rows="3"  v-model="DataSubmit.Status"/>
          </div>
          <p v-if="DataSubmit.Diagnosis"><b>3. {{__t('Chẩn đoán')}}:</b> <i>({{__t('của cơ sở, khoa khám bệnh, khoa điều trị, khi tử vong, giải phẫu bệnh nếu có...')}})</i></p>
          <div class="mb10" v-if="DataSubmit.Diagnosis">
            <textarea-autosize readonly class="form-control" rows="3" v-model="DataSubmit.Diagnosis"/>
          </div>
          <p v-if="DataSubmit.Progress"><b>4. {{__t('Tóm tắt diễn biến bệnh, quá trình điều trị, quá trình chăm sóc .... từng giai đoạn của bệnh')}}:</b></p>
          <div class="mb10" v-if="DataSubmit.Progress">
            <textarea-autosize readonly class="form-control" rows="3" v-model="DataSubmit.Progress"/>
            <div class="HistoryOfPresentIllness"  v-if="progressDatas && progressDatas.length">
              <label> {{progressDatas.length ? 'Thông tin theo dõi diễn biến can thiệp' : 'Không có thông tin theo dõi diễn biến can thiệp'}}</label>
              <vue-scrolling-table v-if="progressDatas.length">
                <template slot="tbl">
                  <table class="table observation-table">
                    <thead>
                      <tr>
                        <th width="1" class="no-wrap">{{__t('OS0.ngay_gio')}}</th>
                        <th width="35%">{{__t('OS0.dien_bien_nguoi_benh')}}</th>
                        <th width="35%">{{__t('OS0.can_thiep')}}</th>
                        <!-- <th width="1">-/-</th> -->
                        <th width="1" class="no-wrap">{{__t('Người tạo')}}</th>
                        <th width="1" v-if="!isConfirmed">-/-</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(item, index) in progressDatas" :key="index">
                        <td width="1" class="no-wrap">{{item.NoteAt}}</td>
                        <td><p>{{item.Note}}</p></td>
                        <td><p>{{item.Interventions}}</p></td>
                        <td width="1" class="no-wrap"><ad-Info :ad="item.Username" /></td>
                        <td width="1" class="no-wrap" v-if="!isConfirmed">
                          <button class="btn btn-xs v-white-btn" @click="copyToProgress(item)">Copy</button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </template>
              </vue-scrolling-table>
            </div>
          </div>
          <br/>
          <p v-if="DataSubmit.Welcome"><b>5. {{__t('Tiếp đón người bệnh')}}:</b></p>
          <div class="mb10" v-if="DataSubmit.Welcome">
            <textarea-autosize readonly class="form-control" rows="3" v-model="DataSubmit.Welcome"/>
          </div>
          <p v-if="DataSubmit.Assessment"><b>6. {{__t('Thăm khám và chẩn đoán bệnh, nguyên nhân, triệu chứng, tiên lượng')}}:</b></p>
          <div class="mb10" v-if="DataSubmit.Assessment">
            <textarea-autosize readonly class="form-control" rows="3" v-model="DataSubmit.Assessment"/>
          </div>
          <p v-if="DataSubmit.TreatmentAndProcedures"><b>7. {{__t('Điều trị')}}:</b></p>
          <div class="mb10" v-if="DataSubmit.TreatmentAndProcedures">
            <textarea-autosize readonly class="form-control" rows="3" v-model="DataSubmit.TreatmentAndProcedures"/>
          </div>
          <p v-if="DataSubmit.Care"><b>8. {{__t('Chăm sóc')}}:</b></p>
          <div class="mb10" v-if="DataSubmit.Care">
            <textarea-autosize readonly class="form-control" rows="3" v-model="DataSubmit.Care"/>
          </div>
          <p v-if="DataSubmit.RelationShip"><b>9. {{__t('Mối quan hệ với gia đình người bệnh')}}</b><i> ({{__t('tình trạng bệnh, tài sản tư trang')}}...):</i></p>
          <div class="mb10" v-if="DataSubmit.RelationShip">
            <textarea-autosize readonly class="form-control" rows="3" v-model="DataSubmit.RelationShip"/>
          </div>
          <br/>
          <p v-if="DataSubmit.Conclusion" class="text-bold font16">{{__t('Kết luận')}}</p>
          <div class="mb10" v-if="DataSubmit.Conclusion">
            <textarea-autosize readonly class="form-control" rows="3" v-model="DataSubmit.Conclusion"/>
          </div>

        </div>
        <p class="text-center">{{__t('Biên bản này đã được thư ký đọc cho mọi người nghe và nhất trí cùng ký tên, từng người dưới đây')}}:</p>
        <br/>
        <br/>
        <div class="chairman-time">
          <p>Ngày {{DOBFormart[0] || '.......'}} Tháng {{DOBFormart[1] || '.......'}} Năm {{DOBFormart[2] || '.......'}}</p>
        </div>
        <div class="row">
          <div class="flex align-center space-between" style="padding: 0px 115px;margin-bottom: 40px">
            <div>
              <template v-if="DataSubmit.SecretaryTime">
                <eform-signature :ad="DataSubmit.Secretary.Username" :title="'THƯ KÝ'" />
              </template>
              <template v-else>
                <p><b>{{__t('THƯ KÝ')}}:</b></p>
              </template>
            </div>
            <div style="transform: translateX(-135px);">
              <template v-if="DataSubmit.ChairmanTime">
                <eform-signature :ad="DataSubmit.Chairman.Username" :title="'CHỦ TỌA'" />
              </template>
              <template v-else>
                <p><b>{{__t('CHỦ TỌA')}}:</b></p>
              </template>
            </div>
          </div>
        </div>
        <!-- <p>A01_154_050919_VE</p> -->
        <LastUpdateWithFormCode :FormCode="'A01_154_050919_VE'" :DataSubmit="DataSubmit"/>
        <FloatBlock>
          <template slot='buttons'>
            <div class="col-md-2 col-sm-2">
              <div class="form-group1">
                <button class="btn v-yellow-btn pull-right" @click="print()" v-shortkey="['ctrl', 'p']" @shortkey="print()"><i class="fa fa-print" aria-hidden="true"></i> In ngay</button>
              </div>
            </div>
            <div class="col-md-4 col-sm-4">
              <div class="form-group1">
              </div>
            </div>
            <div class="col-md-6 col-sm-6">
              <div class="form-group1">
              </div>
            </div>
          </template>
        </FloatBlock>
        <modal name="doctorConfirm" transition="pop-out" id="doctor-login" height="auto" :clickToClose="false">
          <div class="box v-model-content-popup">
            <div class="box-header text-center">
              <h3 class="box-title">{{__t(popupTitle)}}.</h3>
              <div style="color: #fff">{{__t('Vui lòng nhập tài khoản ad để xác nhận')}}</div>
            </div>
            <div class="form-confirm">
              <div class="form-group has-feedback">
                <input v-model="user.username" type="text" class="form-control" :placeholder="__t('Tên đăng nhập')"/>
                <span class="glyphicon glyphicon-user form-control-feedback"></span>
              </div>
              <div class="form-group has-feedback">
                <input v-model="user.password" type="password" class="form-control current-password" :placeholder="__t('Mật khẩu')"/>
                <span class="glyphicon glyphicon-lock form-control-feedback"></span>
              </div>
              <div class="row">
                <div class="col-xs-6">
                  <button type="button" class="btn btn-block v-white-btn" @click="$modal.hide('doctorConfirm')">{{__t('Thoát')}}</button>
                </div>
                <div class="col-xs-6">
                  <button type="button" class="btn btn-block v-yellow-btn" @click="confirm()">{{__t('Xác nhận')}}</button>
                </div>
              </div>
              <p style="margin-top: 10px; text-align:center">{{__t('Sử dụng tài khoản máy tính')}}</p>
              <p style="margin-top: 10px; text-align:center">{{__t('Sau khi xác nhận, người dùng sẽ không thể chỉnh sửa thông tin trên phiếu')}}</p>
            </div>
          </div>
        </modal>
      </template>
      <PrintPage2 class="hidden" :DataSubmit="DataSubmit" />
    </template>
    <div v-else class="loading-text"><v-loading/></div>
  </div>
</template>
<script>
import MortalityReport from '@/services/IPD/MortalityReport'
import VDatePicker from '@/components/VDateTimePicker.vue'
import UsersSelect from '@/components/UsersSelect.vue'
import Logs from '@/components/Logs.vue'
import moment from 'moment'
import PrintPage2 from './PrintPage2.vue'
import { cloneDeep } from 'lodash'
export default {
  name: 'MortalityReportPage2',
  props: ['VisitId'],
  data () {
    return {
      user: {},
      DataSubmit: null,
      loaded: false,
      users: [
      ],
      progressDatas: [],
      popupTitle: '',
      hasMemberConfirm: false,
      Members: []
    }
  },
  components: {
    VDatePicker, Logs, UsersSelect, PrintPage2
  },
  mounted () {
    this.getData()
  },
  watch: {
    DataSubmit: {
      handler () {
        this.edited = true
      },
      deep: true
    }
  },
  computed: {
    age () {
      if (this.DataSubmit.Customer.DateOfBirth) {
        // return moment().diff(moment(this.DataSubmit.Customer.DateOfBirth, this.vDateFormat), 'years')
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
  methods: {
    print () {
      this.$htmlToPaper('printMe', false, 'A01_154_050919_VE')
    },
    showDoctorConfirm (kind, title) {
      this.popupTitle = title
      this.user.kind = kind
      this.$modal.show('doctorConfirm')
    },
    confirm () {
      new MortalityReport().hideErrorMsg().update(this._VisitId, this.user, 'Confirm/').then(response => {
        this.getData()
        this.toastedSuccess().scroll2Bottom()
        this.$modal.hide('doctorConfirm')
      }).catch(e => {
        // this.back()
      })
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
        // this.reload()
      }).catch(e => {
        // this.back()
      })
    },
    getData () {
      new MortalityReport().hideErrorMsg().find(this._VisitId + '?hidemsg=' + true).then(response => {
        this.DataSubmit = response
        this.loaded = true
        if (!this.DataSubmit.Time) {
          this.DataSubmit.Time = moment(new Date()).format(this.vDateTimeFormat)
        }
        this.sync('Diagnosis')
        this.sync('Progress')
        this.Members = cloneDeep(this.DataSubmit.Members.filter(item => !item.IsNotMember))
        this.hasMemberConfirm = this.DataSubmit.Members.filter(member => member.ConfirmTime).length < this.DataSubmit.Members.length
      }).catch(e => {
        // this.back()
        this.loaded = true
      })
    },
    save () {
      new MortalityReport().hideErrorMsg().update(this._VisitId, this.DataSubmit).then(response => {
        this.toastedSuccess()
        this.getData()
        this.edited = false
      }).catch(e => {
        // this.back()
      })
    },
    create () {
      new MortalityReport().hideErrorMsg().update('create/' + this._VisitId, {}).then(response => {
        this.reload()
      }).catch(e => {
        // this.back()
      })
    },
    confirmPopup () {
      this.$modal.show('dialog', {
        clickToClose: false,
        title: this.__t('Thông báo'),
        text: this.__t('Tạo mới kiểm thảo tử vong?'),
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
              // this.back()
              this.$modal.hide('dialog')
            }
          }
        ]
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
