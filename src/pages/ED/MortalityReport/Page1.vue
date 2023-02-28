<template>
  <div class="main-content">
    <template v-if="loaded">
      <h2 class="text-center" v-if="(Version && Version < 11) || !Version">{{__t('Kiểm thảo tử vong')}}</h2>
      <template v-if="DataSubmit">
        <h4 class="text-bold">{{__t('A. THÀNH PHẦN CHÍNH')}}</h4>
        <div class="box form-content mbt30">
          <table class="table form-inline-table">
            <tr>
              <td width="1" class="no-wrap">
                <b>1. {{__t('Hôm nay')}}:</b>
              </td>
              <td>
                <span v-if="isConfirmed">{{DataSubmit.Time}}</span>
                <v-date-picker v-else  style="display: inline-block;" v-model="DataSubmit.Time" :format="vDateTimeFormat"/>
              </td>
            </tr>
            <tr v-if="Version >= 11">
              <td width="1" class="no-wrap">
                <b>2. {{__t('Chúng tôi gồm')}}: </b>
                <div v-if="!isConfirmed && !DataSubmit.IsLocked"><button @click="handleAddMember" class="btn-add mrt10"><i aria-hidden="true" class="fa fa-plus"></i> Thêm thành viên</button></div>
              </td>
              <td>
                <template>
                  <div class="box-thu-ky flex align-center mrb10" v-for="(items, index) in Members" :key="index">
                    <div class="name-thu-ky"><UsersSelect2 :readonly="isConfirmed || DataSubmit.IsLocked" v-model="Members[index]" /></div>
                    <div class="box-chuc-danh flex align-center"><b class="box-title">Chức danh: </b>
                      <input disabled v-model="items.Title" class="input-chucdanh"/>
                      <div v-if="!isConfirmed && !DataSubmit.IsLocked" class="delete" @click="handleDelete(index)"><i class="fa fa-trash" aria-hidden="true"></i></div>
                    </div>
                  </div>
                </template>
              </td>
            </tr>
            <tr v-else>
              <td width="1" class="no-wrap">
                <b>2. {{__t('Chúng tôi gồm')}}:</b>
              </td>
              <td>
                <UsersSelect :readonly="isConfirmed" :multiple="true" v-model="Members" />
              </td>
            </tr>
            <tr>
              <td width="1" class="no-wrap">
                <b>3. {{__t('Họp tại')}}:</b>
              </td>
              <td>
                {{__label(DataSubmit.Specialty)}}
              </td>
            </tr>
            <tr>
              <td width="1" class="no-wrap">
                <b>4. {{__t('Chủ tọa')}}:</b>
              </td>
              <td>
                <div class="box-thu-ky flex align-center" v-if="Version >= 11">
                  <div class="name-thu-ky"><UsersSelect2 :readonly="isConfirmed || DataSubmit.IsLocked" v-model="DataSubmit.Chairman" /></div>
                  <div class="box-chuc-danh flex align-center"><b class="box-title">Chức danh: </b><input disabled v-model="DataSubmit.Chairman.Title" class="input-chucdanh"/></div>
                </div>
                <UsersSelect v-else :readonly="isConfirmed" v-model="DataSubmit.Chairman" />
              </td>
            </tr>
            <tr>
              <td width="1" class="no-wrap">
                <b>5. {{__t('Thư ký')}}:</b>
              </td>
              <td>
                <div class="box-thu-ky flex align-center" v-if="Version >= 11">
                  <div class="name-thu-ky"><UsersSelect2 :readonly="isConfirmed || DataSubmit.IsLocked" v-model="DataSubmit.Secretary" /></div>
                  <div class="box-chuc-danh flex align-center"><b class="box-title">Chức danh: </b><input disabled v-model="DataSubmit.Secretary.Title" class="input-chucdanh"/></div>
                </div>
                <UsersSelect v-else :readonly="isConfirmed" v-model="DataSubmit.Secretary" />
              </td>
            </tr>
          </table>
        </div>
        <h4 class="text-bold">{{__t('B. NỘI DUNG KIỂM ĐIỂM')}}</h4>
        <div class="box form-content mbt30">
          <p class="text-bold font16">{{__t('I. Phần hành chính người bệnh')}}</p>
          <p><b>- {{__t('Họ tên người bệnh')}}:</b><span class="tab404">{{DataSubmit.Customer.Fullname}}</span> <b>{{__t('Tuổi')}}:</b> <span class="tab404">{{DataSubmit.Customer.AgeFormated | formatAge}}</span> <b>{{__t('Giới tính')}}:</b> <span class="tab404">{{__t(DataSubmit.Customer.Gender)}}</span></p>
          <p><b>- {{__t('Dân tộc')}}:</b><span class="tab404">{{DataSubmit.Customer.Ethnic}}</span><b>{{__t('Ngoại kiều')}}:</b><span class="tab404">{{DataSubmit.Customer.Nationality}}</span></p>
          <p><b>- {{__t('Nghề nghiệp')}}:</b><span class="tab404">{{DataSubmit.Customer.Job}}</span><b>{{__t('Nơi làm việc')}}:</b><span class="tab404">{{DataSubmit.Customer.WorkPlace}}</span></p>
          <p><b>- {{__t('Địa chỉ')}}:</b><span class="tab404">{{DataSubmit.Customer.Address}}</span></p>
          <p><b>- {{__t('Số vào viện')}}:</b><span class="tab404">{{DataSubmit.Customer.PID}}</span></p>
          <p><b>- {{__t('Số CMND/ Hộ chiếu')}}:</b><span class="tab404">{{DataSubmit.Customer.IdentificationCard}}</span></p>
          <p><b>- {{__t('Ngày và nơi cấp')}}:</b><span class="tab404">{{DataSubmit.Customer.IssueDate}},  {{DataSubmit.Customer.IssuePlace}}</span></p>
          <p><b>- {{__t('Vào viện lúc')}}:</b><span class="tab404">{{DataSubmit.AdmittedDate}}</span></p>
          <p><b>- {{__t('Tử vong lúc')}}:</b><span class="tab404"><span v-if="isConfirmed">{{DataSubmit.DeathAt}}</span><v-date-picker v-else style="display: inline-block;" v-model="DataSubmit.DeathAt" :format="vDateTimeFormat"/></span></p>
          <p><b>- {{__t('Tại khoa')}}:</b><span class="tab404">{{__label(DataSubmit.Specialty)}}</span></p>
          <p><b>- {{__t('Nguyên nhân tử vong')}}:</b></p>
          <div class="mb10">
            <textarea-autosize :readonly="isConfirmed" class="form-control" rows="3" :placeholder="__t('Nguyên nhân tử vong')"  v-model="DataSubmit.Reason"/>
          </div>
          <br/>
          <p class="text-bold font16">{{__t('II. Diễn biến bệnh')}}:</p>
          <p><b>1. {{__t('Tóm tắt tiền sử bệnh')}}:</b> <button class="btn btn-sync-data" v-if="!isConfirmed" @click="sync('PastMedicalHistory')">{{__t('Lấy dữ liệu')}}</button></p>
          <div class="mb10">
            <textarea-autosize :readonly="isConfirmed" class="form-control" rows="3" :placeholder="__t('Tóm tắt tiền sử bệnh')"  v-model="DataSubmit.PastMedicalHistory"/>
          </div>
          <p><b>2. {{__t('Tình trạng lúc vào viện')}}:</b> <i>({{__t('toàn thân, các bộ phận, các xét nghiệm ...')}})</i><button class="btn btn-sync-data" v-if="!isConfirmed" @click="sync('Status')">{{__t('Lấy dữ liệu')}}</button></p>
          <div class="mb10">
            <textarea-autosize :readonly="isConfirmed" class="form-control" rows="3" :placeholder="__t('Tình trạng lúc vào viện')"  v-model="DataSubmit.Status"/>
          </div>
          <p><b>3. {{__t('Chẩn đoán')}}:</b> <i>({{__t('của cơ sở, khoa khám bệnh, khoa điều trị, khi tử vong, giải phẫu bệnh nếu có...')}})</i></p>
          <div class="mb10">
            <textarea-autosize :readonly="isConfirmed || DataSubmit.IsLocked" class="form-control" rows="3" v-model="DataSubmit.Diagnosis"/>
          </div>
          <p><b>Mã ICD10:</b></p>
          <icd10 class="mrb10" :readonly="isConfirmed || DataSubmit.IsLocked" @icdChange="icdChange" :single="true" v-model="DataSubmit.ICD10"/>
          <p><b>4. {{__t('Tóm tắt diễn biến bệnh, quá trình điều trị, quá trình chăm sóc .... từng giai đoạn của bệnh')}}:</b></p>
          <div class="mb10">
            <textarea-autosize :readonly="isConfirmed" class="form-control" rows="3" :placeholder="__t('Tóm tắt diễn biến bệnh, quá trình điều trị, quá trình chăm sóc .... từng giai đoạn của bệnh')"  v-model="DataSubmit.Progress"/>
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
          <p><b class="text-bold font16">III. {{__t('Kiểm điểm quá trình điều trị và chăm sóc')}}</b> <i>({{__t('nêu rõ ưu điểm và thiếu sót')}})</i></p>
          <p><b>1. {{__t('Tiếp đón người bệnh')}}:</b></p>
          <div class="mb10">
            <textarea-autosize :readonly="isConfirmed" class="form-control" rows="3" :placeholder="__t('Tiếp đón người bệnh')"  v-model="DataSubmit.Welcome"/>
          </div>
          <p><b>2. {{__t('Thăm khám và chẩn đoán bệnh, nguyên nhân, triệu chứng, tiên lượng')}}:</b><button class="btn btn-sync-data" v-if="!isConfirmed" @click="sync('Assessment')">{{__t('Lấy dữ liệu')}}</button></p>
          <div class="mb10">
            <textarea-autosize :readonly="isConfirmed" class="form-control" rows="3" :placeholder="__t('Thăm khám và chẩn đoán bệnh, nguyên nhân, triệu chứng, tiên lượng')"  v-model="DataSubmit.Assessment"/>
          </div>
          <p><b>3. {{__t('Điều trị')}}:</b><button class="btn btn-sync-data" v-if="!isConfirmed" @click="sync('TreatmentAndProcedures')">{{__t('Lấy dữ liệu')}}</button></p>
          <div class="mb10">
            <textarea-autosize :readonly="isConfirmed" class="form-control" rows="3" :placeholder="__t('Điều trị')"  v-model="DataSubmit.TreatmentAndProcedures"/>
          </div>
          <p><b>4. {{__t('Chăm sóc')}}:</b></p>
          <div class="mb10">
            <textarea-autosize :readonly="isConfirmed" class="form-control" rows="3" :placeholder="__t('Chăm sóc')"  v-model="DataSubmit.Care"/>
          </div>
          <p><b>5. {{__t('Mối quan hệ với gia đình người bệnh')}}</b><i> ({{__t('tình trạng bệnh, tài sản tư trang')}}...):</i></p>
          <div class="mb10">
            <textarea-autosize :readonly="isConfirmed" class="form-control" rows="3" :placeholder="__t('Mối quan hệ với gia định người bệnh')"  v-model="DataSubmit.RelationShip"/>
          </div>
          <br/>
          <p><b class="font16">IV. {{__t('Ý kiến bổ sung của từng người')}}</b><i> ({{__t('Bám sát trọng tâm')}}):</i></p>
          <div class="mb10">
            <textarea-autosize :readonly="isConfirmed" class="form-control" rows="3" :placeholder="__t('Ý kiến bổ sung của từng người')"  v-model="DataSubmit.Extra"/>
          </div>
          <p><b class="font16">V. {{__t('Kết luận')}}</b><i> ({{__t('chủ toạ kết luận: nêu bật diễn biến bệnh, ưu điểm và thiếu sót nếu có trong quá trình chẩn đoán, điều trị, chăm sóc và rút kinh nghiệm nếu có...')}})</i></p>
          <div class="mb10">
            <textarea-autosize :readonly="isConfirmed" class="form-control" rows="3" :placeholder="__t('Kết luận')" v-model="DataSubmit.Conclusion"/>
          </div>
        </div>
        <p class="text-center">{{__t('Biên bản này đã được thư ký đọc cho mọi người nghe và nhất trí cùng ký tên, từng người dưới đây')}}:</p>
        <br/>
        <br/>
        <div class="row" v-if="DataSubmit.Version >= 9">
          <div class="col-md-6 col-sm-6 text-center">
            <template v-if="DataSubmit.Members.length">
              <p><b>{{__t('Các thành viên')}}:</b></p>
              <p v-if="hasMemberConfirm() && !viewOnly && !DataSubmit.IsLocked"><button @click="showDoctorConfirm('Members', 'Các thành viên')" class="btn v-white-btn">{{__t('Xác nhận')}}</button></p>
              <p :key="index" v-for="(member, index) in DataSubmit.Members" v-if="member.ConfirmTime">
                {{member.ConfirmTime | formatDateWithoutSecon}}
                <EformSignature2 :ad="member.Username" :title="''"/>
                <br/>
              </p>
              <p v-if="memberConfimr === 0 && (viewOnly || DataSubmit.IsLocked)" class="italic fw400" style="color: green">({{__t('Chưa ký xác nhận')}})</p>
            </template>
          </div>
          <div class="col-md-6 col-sm-6 text-center">
            <template v-if="DataSubmit.SecretaryTime">
                <p><b>{{__t('THƯ KÝ')}}:</b></p>
                <p class="mb-5">{{getFTime(DataSubmit.SecretaryTime)}}</p>
                <EformSignature2 :ad="DataSubmit.Secretary.Username"/>
            </template>
            <template v-else>
              <p><b>{{__t('THƯ KÝ')}}:</b></p>
              <p v-if="!viewOnly && !DataSubmit.IsLocked"><button @click="showDoctorConfirm('Secretary', 'THƯ KÝ')" class="btn v-white-btn">{{__t('Xác nhận')}}</button></p>
              <p v-if="viewOnly || DataSubmit.IsLocked" class="italic fw400" style="color: green">({{__t('Chưa ký xác nhận')}})</p>
            </template>
            <br/>
            <template v-if="DataSubmit.ChairmanTime">
                <p><b>{{__t('CHỦ TỌA')}}:</b></p>
                <p class="mb-5">{{getFTime(DataSubmit.ChairmanTime)}}</p>
                <EformSignature2 :ad="DataSubmit.Chairman.Username"/>
            </template>
            <template v-else>
              <p><b>{{__t('CHỦ TỌA')}}:</b></p>
              <p v-if="!viewOnly && !DataSubmit.IsLocked"><button @click="showDoctorConfirm('Chairman', 'CHỦ TỌA')" class="btn v-white-btn">{{__t('Xác nhận')}}</button></p>
              <p v-if="viewOnly || DataSubmit.IsLocked" class="italic fw400" style="color: green">({{__t('Chưa ký xác nhận')}})</p>
            </template>
          </div>
        </div>
        <div class="row" v-else>
          <div class="col-md-6 col-sm-6 text-center">
            <template v-if="DataSubmit.Members.length">
              <p><b>{{__t('Các thành viên')}}:</b></p>
              <p v-if="!isConfirmed"><button @click="showDoctorConfirm('Members', 'Các thành viên')" class="btn v-white-btn">{{__t('Xác nhận')}}</button></p>
              <p :key="index" v-for="(member, index) in DataSubmit.Members" v-if="member.ConfirmTime">
                <EformSignature2 :ad="member.Username" :title="''" />
                <br/>
              </p>
            </template>
          </div>
          <div class="col-md-6 col-sm-6 text-center">
            <template v-if="DataSubmit.SecretaryTime">
              <EformSignature2 :ad="DataSubmit.Secretary.Username" :title="'THƯ KÝ'" />
            </template>
            <template v-else>
              <p><b>{{__t('THƯ KÝ')}}:</b></p>
              <p v-if="!isConfirmed"><button @click="showDoctorConfirm('Secretary', 'THƯ KÝ')" class="btn v-white-btn">{{__t('Xác nhận')}}</button></p>
            </template>
            <br/>
            <template v-if="DataSubmit.ChairmanTime">
              <EformSignature2 :ad="DataSubmit.Chairman.Username" :title="'CHỦ TỌA'" />
            </template>
            <template v-else>
              <p><b>{{__t('CHỦ TỌA')}}:</b></p>
              <p v-if="!isConfirmed"><button @click="showDoctorConfirm('Chairman', 'CHỦ TỌA')" class="btn v-white-btn">{{__t('Xác nhận')}}</button></p>
            </template>
          </div>
        </div>
        <LastUpdateWithFormCode :FormCode="Version >= 11 ? 'A01_172_050919_V' : 'A01_172_050919_VE'" :DataSubmit="DataSubmit"/>
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
        <FloatBlock>
          <template slot='buttons'>
            <div class="col-md-2 col-sm-2">
              <div class="form-group1">
                <button
                  v-shortkey="['ctrl', 'p']" class="btn v-yellow-btn pull-right" @click="print()"
                  @shortkey="print()"
                ><i class="fa fa-print" aria-hidden="true"/> In ngay</button>
              </div>
            </div>
            <div class="col-md-4 col-sm-4">
              <div class="form-group1">
              </div>
            </div>
            <div class="col-md-6 col-sm-6" v-if="!viewOnly && !DataSubmit.IsLocked && !isConfirmed">
              <div class="form-group1">
                <button class="btn v-yellow-btn pull-right btn-block hvr-ripple-out" type="button" v-shortkey="['ctrl', 's']" @click="save()"><i class="fa fa-floppy-o" aria-hidden="true"></i> {{__t('btn.luu')}}</button>
              </div>
            </div>
          </template>
        </FloatBlock>
      </template>
      <div v-else>
        <div class="text-center">
          <p v-if="Version >= 11">{{__t('Chưa có Biên bản - Trích biên bản kiểm thảo tử vong')}}</p>
          <p v-else>{{__t('Chưa có kiểm thảo tử vong')}}</p>
          <button v-if="!viewOnly" class="btn btn-warning" @click="confirmPopup">{{__t('Tạo mới')}}</button>
        </div>
      </div>
    </template>
    <div v-else class="loading-text"><v-loading/></div>
    <Print :DataSubmit="DataSubmit" :Members="Members" class="none"/>
  </div>
</template>
<script>
import MortalityReport from '@/services/ED/MortalityReport'
import VDatePicker from '@/components/VDateTimePicker.vue'
import UsersSelect from '@/components/UsersSelect.vue'
import MixinForm from '@/mixins/form.js'
import Logs from '@/components/Logs.vue'
import UsersSelect2 from '@/components/UsersSelect2.vue'
import Print from './PrintPage1.vue'
import { cloneDeep } from 'lodash'
import moment from 'moment'
export default {
  name: 'MortalityReportPart2',
  props: ['viewOnly', 'VisitId', 'VisitType', 'Version'],
  mixins: [MixinForm],
  data () {
    return {
      memberConfimr: 0,
      user: {},
      DataSubmit: null,
      loaded: false,
      users: [
      ],
      progressDatas: [],
      popupTitle: '',
      isSave: false,
      ListMember: [],
      Members: []
    }
  },
  components: {
    VDatePicker, Logs, UsersSelect, UsersSelect2, Print
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
    isConfirmed () {
      return (this.DataSubmit.SecretaryTime || this.DataSubmit.ChairmanTime || this.DataSubmit.Members.find(e => e.ConfirmTime)) || this.viewOnly
    }
  },
  methods: {
    showDoctorConfirm (kind, title) {
      this.popupTitle = title
      this.user.kind = kind
      this.$modal.show('doctorConfirm')
    },
    async confirm () {
      var check = this.DataSubmit.SecretaryTime || this.DataSubmit.ChairmanTime || this.DataSubmit.Members.find(e => e.ConfirmTime)
      if (!check) {
        await this.save('confirm')
        setTimeout(() => {
          new MortalityReport().update(this.$route.params.Id, this.user, 'Confirm/').then(response => {
            this.$modal.hide('doctorConfirm')
            this.toastedSuccess(this.$t('Xác nhận thành công')).scroll2Bottom()
            this.reload()
          }).catch(e => {
          })
        }, 1000)
      } else {
        new MortalityReport().update(this.$route.params.Id, this.user, 'Confirm/').then(response => {
          this.toastedSuccess(this.$t('Xác nhận thành công')).scroll2Bottom()
          this.$modal.hide('doctorConfirm')
          this.reload()
        })
      }
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
      new MortalityReport().update('sync/' + this.$route.params.Id, {Method: `Sync${type}`}).then(response => {
        if (type === 'Progress') {
          this.progressDatas = response
        } else {
          this.DataSubmit[type] = response.join('\n')
        }
        // this.reload()
      }).catch(e => {
        console.log(e)
        // this.back()
      })
    },
    getData () {
      new MortalityReport().find(this._VisitId + '?hidemsg=' + true).then(response => {
        this.DataSubmit = response
        this.memberConfimr = response.Members.filter(member => member.ConfirmTime).length
        if (!this.DataSubmit.Time) {
          this.DataSubmit.Time = moment(new Date()).format(this.vDateTimeFormat)
        }
        if (response.ICD10) {
          this.DataSubmit.ICD10 = this.JSONParse(response.ICD10 || [], true)
        }
        this.Members = cloneDeep(this.DataSubmit.Members.filter(item => !item.IsNotMember))
        this.loaded = true
        this.fillData(response.ICDFromDisChagreInformation)
        this.$store.dispatch('setCurrentFormId', response.Id)
      }).catch(e => {
        // this.back()
        this.loaded = true
      })
    },
    save (confirm) {
      this.DataSubmit.Members = this.Members
      new MortalityReport().update(this.$route.params.Id, this.DataSubmit).then(response => {
        if (confirm === 'confirm') {
          this.isSave = true
          this.edited = false
        } else {
          this.toastedSuccess()
          this.reload()
          this.edited = false
        }
        console.log('save', this.isSave)
      }).catch(e => {
        // this.back()
      })
    },
    create () {
      new MortalityReport().update('create/' + this.$route.params.Id, {}).then(response => {
        this.reload()
      }).catch(e => {
        // this.back()
      })
    },
    handleAddMember () {
      const data = {
        DisplayName: '',
        Fullname: '',
        Id: '',
        Title: '',
        Username: ''
      }
      this.Members.push(data)
    },
    handleDelete (index) {
      this.Members.splice(index, 1)
    },
    confirmPopup () {
      this.$modal.show('dialog', {
        clickToClose: false,
        title: this.__t('Thông báo'),
        text: this.Version >= 11 ? this.__t('Tạo mới Biên bản - Trích biên bản kiểm thảo tử vong?') : this.__t('Tạo mới kiểm thảo tử vong?'),
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
    icdChange (value) {
      var val = (value || []).map(e => e.ViName)
      if (!this.DataSubmit.Diagnosis) this.DataSubmit.Diagnosis = val.join(', ')
    },
    hasMemberConfirm () {
      let check = false
      check = this.DataSubmit.Members.filter(member => member.ConfirmTime).length < this.DataSubmit.Members.length
      return check
    },
    print () {
      let code = 'A01_172_050919_VE'
      if (this.Version >= 11) {
        code = 'A01_172_050919_V'
      }
      this.$htmlToPaper('MedicalRecordPrinter', false, code)
    },
    fillData (Data) {
      if (Data && this.DataSubmit) {
        let icd = this.JSONParse(Data.ICD || [], true)
        if (!this.DataSubmit.ICD10) {
          this.DataSubmit.ICD10 = icd
        }
        if (!this.DataSubmit.Diagnosis) {
          let str = Data.Diagnosis
          if (icd && icd.length) {
            str += ' (' + icd[0].code + ')'
          }
          this.DataSubmit.Diagnosis = str
        }
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
.box-thu-ky {
  .box-chuc-danh {
    width: 369px;
    margin-left: 20px;
    position relative;
    b {
      margin-right: 10px;
    }
    input {
      min-width: 260px;
    }
  }
  .name-thu-ky {
    width: 500px;
  }
}
.input-chucdanh {
  height: 30px;
  padding-left: 5px;
}
.delete {
  position: absolute;
  background-color: #f39c12;
  border: none;
  right: -8px;
  height: 100%;
  width: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
</style>
