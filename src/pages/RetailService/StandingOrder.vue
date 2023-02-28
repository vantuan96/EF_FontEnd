<template>
  <div class="main-content" id="StandingOrderForRetailService-page">
    <h2 class="text-center">{{__t('Theo dõi thực hiện thuốc người bệnh sử dụng dịch vụ lẻ')}}</h2>
    <div v-if="DataSubmit">
      <div v-if="!IsFormLocked(DataSubmit)">
        <div class="box border-box">
          <div class="box-body">
            <div class="row">
              <div class="col-md-2 col-sm-2">
                <label>{{__t('Mạch')}} <span class="unit-label"> ({{__t('nhịp/ phút')}})</span></label>
                <input :placeholder="__t('nhịp/ phút')" type="text" class="form-control" readonly v-model="DataSubmit.Pulse">
              </div>
              <div class="col-md-2 col-sm-2">
                <label>{{__t('Nhiệt độ')}} <span class="unit-label"> {{__t('(độ C)')}}</span></label>
                <input :placeholder="__t('(độ C)')" type="text" class="form-control" readonly v-model="DataSubmit.Temparature">
              </div>
              <div class="col-md-2 col-sm-2">
                <label>{{__t('Huyết áp')}} <span class="unit-label">  (mmHg)</span></label>
                <input placeholder="mmHg" type="text" class="form-control" readonly v-model="DataSubmit.BloodPressure">
              </div>
              <div class="col-md-2 col-sm-2">
                <label>{{__t('Chiều cao')}} <span class="unit-label"> (cm)</span></label>
                <input placeholder="cm" type="text" class="form-control" readonly v-model="DataSubmit.Height">
              </div>
              <div class="col-md-2 col-sm-2">
                <label>{{__t('Cân nặng')}} <span class="unit-label"> (Kg)</span></label>
                <input placeholder="Kg" type="text" class="form-control" readonly v-model="DataSubmit.Weight">
              </div>
              <div class="col-md-2 col-sm-2">
                <!-- <label class="hidden-text">{{__t('Cân nặng')}} <span class="unit-label"> (Kg)</span></label>
                <button @click="sync" class="btn btn-warning btn-block">{{__t('LẤY DỮ LIỆU')}}</button> -->
              </div>
            </div>
            <br/>
            <div class="row">
              <div class="col-md-12">
                <div class="form-group">
                  <label>{{__t('Chẩn đoán')}}</label>
                  <textarea-autosize v-model="DataSubmit.Diagnosis" class="form-control" :placeholder="__t('Chẩn đoán')" rows="3"/>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-5">
                <div class="form-group">
                  <label>{{__t('Bác sĩ chỉ định')}}:</label>
                  <user-ad v-if="!syncing" v-model="DataSubmit.Doctor" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="tbldiv">
          <div class="divhead">
            <div class="wdiv400">
              {{__t('Thông tin thuốc')}}
            </div>
            <div class="wlast">
              {{__t('Điều dưỡng xác nhận lượt thực hiện')}}
            </div>
          </div>
          <div class="divcontent" :data="item" :key="index" v-for="(item ,index) in DataSubmit.Datas" v-if="!item.Removed">
            <div class="wdiv400">
              <div class="form-group">
                <b>{{__t('Tên thuốc')}}:</b>
                <medication v-model="item.Drug" />
              </div>
              <div class="row">
                <div class="col-md-7">
                  <label>{{__t('Đường dùng')}}:</label>
                  <medication-route show-field="name" v-model="item.Route" :placeholder="__t('Nhập đường dùng')"/>
                </div>
                <div class="col-md-5">
                  <label>{{__t('Tốc độ (ml/h)')}}:</label>
                  <input class="form-control" v-model="item.Speed" :placeholder="'ml/h'" />
                </div>
              </div>
            </div>
            <div class="wlast">
              <div class="scroll-parrent">
                <div class="drug-notes" :id="'drug-notes-' + index">
                  <div class="drug-note" :key="index + '-' + $i" :data="note" v-for="(note, $i) in item.Note">
                    <p><b><i class="fa fa-clock-o" aria-hidden="true"></i> {{note.NoteAt}}</b></p>
                    <p>{{__t('ĐD')}}:  <ad-Info v-if="note.user" :ad="note.user" /></p>
                    <p class="w200" v-if="note.Note"><b>{{__t('Ghi chú')}}: </b>{{note.Note}}</p>
                    <div class="hidden-text">xxxxxxxxxxxxxxxxxxxxxxxxx</div>
                    <div class="btt-pb">
                      <div><label class="font12">{{__t('Xác nhận')}}:</label></div>
                      <button v-if="!note.Nurse" @click="showDoctorConfirm('Nurse', 'Điều dưỡng trưởng ca', item.Id, note)" class="btn v-white-btn btn-ssm">{{__t('ĐD trưởng ca')}}</button>
                      <ad-Info v-else :ad="note.Nurse" />
                      /
                      <button v-if="!note.Doctor" @click="showDoctorConfirm('Doctor', 'Bác sĩ', item.Id, note)" class="btn v-white-btn btn-ssm">{{__t('Bác sĩ')}}</button>
                      <ad-Info v-else :ad="note.Doctor" />
                    </div>
                  </div>
                  <div class="drug-note-btn">
                    <button class="btn v-white-btn" @click="addNewDrug(item, index)"><i class="fa fa-plus" aria-hidden="true"></i> {{__t('THÊM LƯỢT')}}</button>
                  </div>
                </div>
              </div>
            </div>
            <button @click="item.Removed = true" v-if="!item.Id" class="remove-btn-pos btn btn-flat btn-sm"><i class="fa fa-times" aria-hidden="true"></i></button>
          </div>
        </div>
        <div class="text-center"><button class="btn v-green-btn v-bottom-btn" @click="addNew"><i class="fa fa-plus" aria-hidden="true"></i> {{__t('THÊM THUỐC')}}</button></div>
        <br/><br/>
        <modal name="newNotes" transition="pop-out" height="auto" :clickToClose="false">
          <div class="box v-model-content-popup" v-if="tmp">
            <div class="box-header text-center">
              <h3 class="box-title">{{__t('Xác nhận thêm lượt thực hiện thuốc')}}</h3>
            </div>
            <div class="box-body padding-15">
              <div class="form-group">
                <v-date-picker v-model="tmp.NoteAt" :format="vDateTimeFormat" class="full-w"/>
              </div>
              <div class="form-group">
                <label>{{__t('Ghi chú')}}</label>
                <textarea-autosize v-model="tmp.Note" class="form-control" rows="3"/>
              </div>
            </div>
            <div class="box-footer padding-15">
              <div class="row">
                <div class="col-md-6"><button type="button" class="btn btn-block" @click="close">{{__t('btn.huy')}}</button></div>
                <div class="col-md-6"><button :disabled="!tmp.NoteAt" type="button" class="btn btn-block v-yellow-btn" @click="saveNote">{{__t('btn.luu')}}</button></div>
              </div>
            </div>
          </div>
        </modal>
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
          <template slot='top'>
            <div class="group-radio no-flex" v-if="DataSubmit.ListStatus">
              <template  v-for="(status, index) in DataSubmit.ListStatus">
                <input :data="status" :key="index" type="radio" :id="'a' + index" name="status" :value="status" v-model="DataSubmit.Status">
                <label :key="'a' + index" :for="'a' + index">{{__label(status)}}</label>
              </template>
            </div>
          </template>
          <template slot='buttons'>
            <div class="col-md-3 col-sm-3">
              <div class="form-group"></div>
            </div>
            <div class="col-md-3 col-sm-3">
              <div class="">
                <button class="btn v-white-btn btn-block bubbly-button" type="button"  v-shortkey="['ctrl', 'p']" @shortkey="print()" @click="print()"><i class="fa fa-print" aria-hidden="true"></i> {{__t('In')}}</button>
              </div>
            </div>
            <div class="col-md-6 col-sm-6">
              <div class="form-group">
                <button class="btn v-yellow-btn pull-right hvr-ripple-out btn-block" v-shortkey="['ctrl', 's']" @shortkey="submit()" type="button" @click="submit()"><i class="fa fa-floppy-o" aria-hidden="true"></i> {{__t('btn.luu')}}</button>
              </div>
            </div>
          </template>
        </FloatBlock>
      </div>
      <div v-else>
        <StandingOrderViewOnlyOPD :DataSubmit="DataSubmit" />
      </div>
      <print :data="DataSubmit" hidden/>
    </div>
    <div v-else class="loading-text"><v-loading/></div>
  </div>
</template>
<script>
/* ============
 * Add cusotmer Page
 * ============
 *
 * The home index page.
 */

import StandingOrderForRetailService from '@/services/ED/StandingOrderForRetailService'
import VDatePicker from '@/components/VDateTimePicker.vue'
import Print from './Print.vue'
import moment from 'moment'
import $ from 'jquery'
import MixinForm from '@/mixins/form.js'
import StandingOrderViewOnlyOPD from './StandingOrderViewOnlyOPD.vue'
export default {
  /**
   * The name of the page.
   */
  name: 'StandingOrderForRetailService',
  data () {
    return {
      DataSubmit: null,
      timeout: null,
      suggestions: [],
      inputProps: {
        placeholder: 'Nhập tên thuốc để tìm kiếm?',
        class: 'form-control'
      },
      options: [],
      test: '',
      sectionConfigs: {
      },
      query: '',
      onNewNoteItem: null,
      tmp: {},
      syncing: false,
      user: {},
      popupTitle: '',
      oldStatus: null,
      IdConfirm: '',
      note: null
    }
  },
  mixins: [MixinForm],
  /**
   * The components that the page can use.
   */
  components: {
    VDatePicker,
    Print,
    StandingOrderViewOnlyOPD
  },
  mounted () {
    this.getData()
  },
  computed: {
  },
  watch: {
    DataSubmit: {
      handler () {
        this.edited = true
      },
      deep: true
    }
  },
  methods: {
    print () {
      this.$htmlToPaperLandscape('printMe', false, 'A01_057_050919_VE')
    },
    showDoctorConfirm (kind, title, id, note) {
      this.popupTitle = title
      this.user.kind = kind
      this.note = note
      this.IdConfirm = id
      this.$modal.show('doctorConfirm')
    },
    confirm () {
      new StandingOrderForRetailService({}, this.getVisitTypeGroupCode()).update(this.IdConfirm, this.user, 'Confirm/').then(response => {
        // this.getData()
        this.toastedSuccess('Xác nhận thành công').scroll2Bottom()
        this.$modal.hide('doctorConfirm')
        if (this.user.kind === 'Doctor') {
          this.note.Doctor = this.user.username
          this.note.DoctorFullname = response
        } else {
          this.note.Nurse = this.user.username
          this.note.NurseFullname = response
        }
        this.submit(true)
      }).catch(e => {
        console.log(e)
        // this.back()
      })
    },
    close () {
      this.$modal.hide('newNotes')
      this.onNewNoteItem = null
    },
    scroll2End (index) {
      setTimeout(() => {
        $('#drug-notes-' + index).animate({ scrollLeft: 90000 })
      }, 500)
    },
    saveNote () {
      this.onNewNoteItem.Note.push(this.tmp)
      this.$modal.hide('newNotes')
      this.scroll2End(this.tmp.index)
      this.onNewNoteItem = null
      this.tmp = null
      this.submit(true)
    },
    addNewDrug (item, index) {
      this.onNewNoteItem = item
      this.tmp = {
        user: this.$store.state.account.Username,
        NoteAt: moment(new Date()).format(this.vDateTimeFormat),
        index: index,
        userFullname: this.$store.state.account.Fullname
      }
      // this.onNewNoteItem.Notes.push({
      //   user: 'thangdc3',
      //   Note: '2313',
      //   NoteAt: ''
      // })
      this.$modal.show('newNotes')
    },
    addNew () {
      this.DataSubmit.Datas.push({Drug: '', Note: [], Removed: false})
    },
    isValidateForm () {
      return this.DataSubmit.Status.EnName === 'In hospital' ||
      (this.DataSubmit.Status.EnName === 'Discharged' && this.DataSubmit.Doctor && this.DataSubmit.Diagnosis && this.DataSubmit.BloodPressure && this.DataSubmit.Height && this.DataSubmit.Weight && this.DataSubmit.Temparature && this.DataSubmit.Pulse)
    },
    submit (saveOnlyNote) {
      if (!saveOnlyNote && !this.isValidateForm()) {
        // Bạn cần hoàn thiện toàn thông tin vital sign ,chẩn đoán, bác sĩ chỉ định trước khi click ra viện
        this.alert(this.__t('Cảnh báo'), this.__t('Bạn cần hoàn thiện toàn thông tin vital sign ,chẩn đoán, bác sĩ chỉ định trước khi click ra viện'))
        return false
      }
      if (saveOnlyNote) {
        this.DataSubmit.Status = this.oldStatus
      }
      var data = this.cloneObj(this.DataSubmit)
      data.Datas = data.Datas.filter(e => !e.Removed)
      data.Datas.forEach(item => {
        item.Note = JSON.stringify(item.Note)
      })
      new StandingOrderForRetailService({}, this.getVisitTypeGroupCode()).update(this.$route.params.Id, data).then(response => {
        this.toastedSuccess()
        this.getData()
      }).catch(e => {
        // console.log(e)
      })
    },
    sync () {
      new StandingOrderForRetailService({}, this.getVisitTypeGroupCode()).find('Sync/' + this.$route.params.Id).then(response => {
        this.DataSubmit.BloodPressure = this.DataSubmit.BloodPressure || response.BloodPressure
        this.DataSubmit.Diagnosis = this.DataSubmit.Diagnosis || response.Diagnosis
        this.DataSubmit.Doctor = this.DataSubmit.Doctor || response.Doctor
        this.DataSubmit.Height = this.DataSubmit.Height || response.Height
        this.DataSubmit.Pulse = this.DataSubmit.Pulse || response.Pulse
        this.DataSubmit.Temparature = this.DataSubmit.Temparature || response.Temparature
        this.DataSubmit.Weight = this.DataSubmit.Weight || response.Weight
        this.syncing = true
        setTimeout(() => {
          this.syncing = false
        }, 100)
      })
    },
    getData () {
      new StandingOrderForRetailService({}, this.getVisitTypeGroupCode()).find(this.$route.params.Id + '?hidemsg=' + true).then(response => {
        response.Datas.map((e, index) => {
          if (e.Note) {
            var n = this.JSONParse(e.Note)
            e.Note = n || []
          } else {
            e.Note = []
          }
          if (!e.Route) {
            e.Route = ''
          }
          this.scroll2End(index)
          return e
        })
        if (response.Status && response.Status.EnName === 'In hospital') response.Status.ViName = 'BN đang thực hiện dịch vụ lẻ'
        if (response.Status && response.Status.ViName === 'Hoàn thành khám') response.Status.ViName = 'Hoàn thành'
        response.ListStatus.forEach(e => {
          if (e.EnName === 'In hospital') e.ViName = 'BN đang thực hiện dịch vụ lẻ'
          if (e.ViName === 'Hoàn thành khám') e.ViName = 'Hoàn thành'
        })
        this.oldStatus = this.cloneObj(response.Status)
        this.DataSubmit = response
        setTimeout(() => {
          this.edited = false
        }, 300)
      }).catch(e => {
        if (e.status === 404) {
          this.$modal.show('dialog', {
            clickToClose: false,
            title: 'Thông báo',
            text: 'Đây không phải là bệnh nhân sử dụng dịch vụ lẻ?',
            class: 'v-dialog v-dialog-warning',
            buttons: [
              {
                title: 'Quay lại',
                class: 'btn btn-warning',
                handler: () => {
                  this.$modal.hide('dialog')
                  this.back()
                }
              }
            ]
          })
        }
      })
    }
    // selectHandler (item, e) {
    //   this.onFocus.Drug = item.item
    // },
    // focusItem (item) {
    //   this.onFocus = item
    // },
    // fetchResults (query) {
    //   clearTimeout(this.timeout)
    //   this.timeout = setTimeout(() => {
    //     new MedicationMasterdata({
    //       pageNumber: 1,
    //       pages: 1,
    //       PageSize: process.env.PAGE_SIZE,
    //       search: query
    //     }).all().then(response => {
    //       var data = response.map(e => {
    //         return e.Name
    //       })
    //       this.suggestions = [{data: data}]
    //     })
    //   }, 350)
    // }
  }
}
</script>
