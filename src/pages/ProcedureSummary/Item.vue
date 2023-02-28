<template>
    <div>
      <ItemV2 v-if="Version === '2'" />
      <div v-else-if="Version === '1'" class="main-content" id="ProcedureSummaryPage">
        <!-- <h2 class="text-center" v-if="!viewOnly"><b>{{__t('Tóm tắt thủ thuật')}}</b></h2> -->
        <div v-if="loaded">
          <template v-if="DataSubmit">
            <div class="box-body-bordered">
              <div class="row" v-if="MASTERDATA['OPDTTTTCDT']">
                <div class="col-md-12">
                  <div class="form-group">
                    <label>
                      {{__label(MASTERDATA['OPDTTTTCDT'])}} <i class="unit-label" v-if="MASTERDATA['OPDTTTTCDT'].Note">{{MASTERDATA['OPDTTTTCDT'].Note}}</i>
                      <button v-if="_VisitType === 'OPD' && !isConfirmed" class="btn-sync-data btn"  @click="sync">{{__t('Đồng bộ chẩn đoán')}}</button>
                    </label>
                    <div :data="item" :key="index"  v-for="(item, index) in MASTERDATA['OPDTTTTCDT'].Items">
                      <textarea-autosize :readonly="isConfirmed" :data-code="item.Code" :id="item.Code" :data="item" class="form-control" rows="3" :placeholder="__label(item)" v-model="item.Value"/>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row" v-if="MASTERDATA['OPDTTTTCDS']">
                <div class="col-md-12">
                  <div class="form-group">
                    <label>{{__label(MASTERDATA['OPDTTTTCDS'])}}
                      <i class="unit-label" v-if="MASTERDATA['OPDTTTTCDS'].Note">{{MASTERDATA['OPDTTTTCDS'].Note}}</i>
                    </label>
                    <div :data="item" :key="index"  v-for="(item, index) in MASTERDATA['OPDTTTTCDS'].Items">
                      <textarea-autosize :readonly="isConfirmed" :data-code="item.Code" :id="item.Code" :data="item" class="form-control" rows="3" :placeholder="__label(item)" v-model="item.Value"/>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row" v-if="MASTERDATA['OPDTTTTPPL']">
                <div class="col-md-12">
                  <div class="form-group">
                    <label>{{__label(MASTERDATA['OPDTTTTPPL'])}} <i class="unit-label" v-if="MASTERDATA['OPDTTTTPPL'].Note">{{MASTERDATA['OPDTTTTPPL'].Note}}</i></label>
                    <div :data="item" :key="index"  v-for="(item, index) in MASTERDATA['OPDTTTTPPL'].Items">
                      <textarea-autosize :readonly="isConfirmed" :data-code="item.Code" :id="item.Code" :data="item" class="form-control" rows="3" :placeholder="__label(item)" v-model="item.Value"/>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row" v-if="MASTERDATA['OPDTTTTPPVC']">
                <div class="col-md-12">
                  <div class="form-group">
                    <label>{{__label(MASTERDATA['OPDTTTTPPVC'])}} <i class="unit-label" v-if="MASTERDATA['OPDTTTTPPVC'].Note">{{MASTERDATA['OPDTTTTPPVC'].Note}}</i></label>
                    <div :data="item" :key="index"  v-for="(item, index) in MASTERDATA['OPDTTTTPPVC'].Items">
                      <textarea-autosize :readonly="isConfirmed" :data-code="item.Code" :id="item.Code" :data="item" class="form-control" rows="3" :placeholder="__label(item)" v-model="item.Value"/>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row" v-if="MASTERDATA['OPDTTTTBSL']">
                <div class="col-md-12">
                  <div class="form-group">
                    <label>{{__label(MASTERDATA['OPDTTTTBSL'])}} <i class="unit-label" v-if="MASTERDATA['OPDTTTTBSL'].Note">{{MASTERDATA['OPDTTTTBSL'].Note}}</i></label>
                    <div :data="item" :key="index"  v-for="(item, index) in MASTERDATA['OPDTTTTBSL'].Items">
                      <user-auto-suggest :readonly="isConfirmed" :data-code="item.Code" :id="item.Code" :data="item" :placeholder="__label(item)" v-model="item.Value"/>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row" v-if="MASTERDATA['OPDTTTTNVP']">
                <div class="col-md-12">
                  <div class="form-group">
                    <label>{{__label(MASTERDATA['OPDTTTTNVP'])}} <i class="unit-label" v-if="MASTERDATA['OPDTTTTNVP'].Note">{{MASTERDATA['OPDTTTTNVP'].Note}}</i></label>
                    <div :data="item" :key="index"  v-for="(item, index) in MASTERDATA['OPDTTTTNVP'].Items">
                      <user-auto-suggest :position="'ALL'" :readonly="isConfirmed" :data-code="item.Code" :id="item.Code" :data="item" :placeholder="__label(item)" v-model="item.Value"/>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row" v-if="MASTERDATA['OPDTTTTBSGM']">
                <div class="col-md-12 ">
                  <div class="form-group">
                    <label>{{__label(MASTERDATA['OPDTTTTBSGM'])}} <i class="unit-label" v-if="MASTERDATA['OPDTTTTBSGM'].Note">{{MASTERDATA['OPDTTTTBSGM'].Note}}</i></label>
                    <div :data="item" :key="index"  v-for="(item, index) in MASTERDATA['OPDTTTTBSGM'].Items">
                      <user-auto-suggest :readonly="isConfirmed" :data-code="item.Code" :id="item.Code" :data="item" :placeholder="__label(item)" v-model="item.Value"/>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row" v-if="MASTERDATA['OPDTTTTTGL']">
                <div class="col-md-12">
                  <div class="form-group">
                    <label>{{__label(MASTERDATA['OPDTTTTTGL'])}} <i class="unit-label" v-if="MASTERDATA['OPDTTTTTGL'].Note">{{MASTERDATA['OPDTTTTTGL'].Note}}</i></label>
                    <div :data="item" :key="index"  v-for="(item, index) in MASTERDATA['OPDTTTTTGL'].Items">
                      <div class="fake-input disable" v-if="isConfirmed">{{item.Value}}</div>
                      <v-date-time-picker v-else v-model="item.Value" class=" select-boox no-clear" :format="vDateTimeFormat"/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <h3 v-if="MASTERDATA['OPDTTTTTTQT']"><b>{{__label(MASTERDATA['OPDTTTTTTQT'])}}</b></h3>
            <div class="row" v-if="MASTERDATA['OPDTTTTTTQT']">
              <div class="col-md-12">
                <div class="form-group">
                  <div :data="item" :key="index"  v-for="(item, index) in MASTERDATA['OPDTTTTTTQT'].Items">
                    <textarea-autosize :readonly="isConfirmed" :data-code="item.Code" :id="item.Code" :data="item" class="form-control" rows="3" :placeholder="__label(item)" v-model="item.Value"/>
                  </div>
                </div>
              </div>
            </div>
            <div class="v-tab">
              <ul class="nav nav-tabs" role="tablist">
                <li role="presentation" :class="{'active': tab === 'tab1'}"><a href="#tab1" @click="tab = 'tab1'" aria-controls="tab1" role="tab" data-toggle="tab">{{__t('Upload từ thiết bị')}}</a></li>
                <li role="presentation" :class="{'active': tab === 'tab2'}"><a href="#tab2" @click="tab = 'tab2'" aria-controls="tab2" role="tab" data-toggle="tab">{{__t('Hoặc vẽ lược đồ phẫu thuật')}}</a></li>
              </ul>
              <div class="tab-content">
                <div role="tabpanel" class="tab-pane min-height-none" id="tab1" :class="{'active': tab === 'tab1'}">
                  <div class="pomc-upload-area mb-10" v-if="MASTERDATA['OPDTTTTUPL']">
                    <div class="row" v-if="isConfirmed">
                      <div class="col-md-12 col-sm-12">
                        <drop-files id="mini-upload" :readonly="true" v-model="MASTERDATA['OPDTTTTUPL'].Items[0].Value"/>
                      </div>
                    </div>
                    <div class="row" v-else>
                      <div class="col-md-7 col-sm-7">
                        <p><b>{{__t('Upload ảnh')}}:</b></p>
                        <p><button @click="openFile()" class="btn v-white-btn font16 font-bold btn-upload"><i class="fa fa-upload" aria-hidden="true"></i> {{__t('UPLOAD TỪ THIẾT BỊ')}}</button></p>
                        <p>{{__t('Bác sĩ tải hình ảnh mô tả thủ thuật tại đây (cho phép tải 1 hoặc nhiều hình ảnh).')}}</p>
                      </div>
                      <div class="col-md-5 col-sm-5">
                        <drop-files id="mini-upload" v-model="MASTERDATA['OPDTTTTUPL'].Items[0].Value" :dataDropfile="dataDropfile"/>
                      </div>
                    </div>
                  </div>
                </div>
                <div role="tabpanel" class="tab-pane min-height-none" id="tab2" :class="{'active': tab === 'tab2'}">
                  <div class="text-center pomc-upload-area">
                    <div class="EDARRPAMAPALO-BG" v-if="MASTERDATA['OPDTTTTTTQT2']">
                      <img src="static/tivi-bg.png" style="width: 950px;opacity: 0.4;" />
                      <div class="paint-content">
                        <Painting :readonly="isConfirmed" v-model="MASTERDATA['OPDTTTTTTQT2'].Items[0].Value" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <br/>
            <div class="row" v-if="MASTERDATA['OPDTTTTCBC']">
              <div class="col-md-12">
                <div class="form-group">
                  <label>{{__label(MASTERDATA['OPDTTTTCBC'])}} <i class="unit-label" v-if="MASTERDATA['OPDTTTTCBC'].Note">{{MASTERDATA['OPDTTTTCBC'].Note}}</i></label>
                  <div :data="item" :key="index"  v-for="(item, index) in MASTERDATA['OPDTTTTCBC'].Items">
                    <textarea-autosize :readonly="isConfirmed" :data-code="item.Code" :id="item.Code" :data="item" class="form-control" rows="3" :placeholder="__label(item)" v-model="item.Value"/>
                  </div>
                </div>
              </div>
            </div>
            <div class="row" v-if="MASTERDATA['OPDTTTTSMBP']">
              <div class="col-md-4 col-sm-4">
                <div class="form-group">
                  <label>{{__label(MASTERDATA['OPDTTTTSMBP'])}}
                    <i class="unit-label" v-if="MASTERDATA['OPDTTTTSMBP'].Note">{{MASTERDATA['OPDTTTTSMBP'].Note}}</i>
                  </label>
                  <div :data="item" :key="index"  v-for="(item, index) in MASTERDATA['OPDTTTTSMBP'].Items">
                    <div class="fake-input disable" v-if="isConfirmed">{{item.Value}}</div>
                    <template v-else>
                      <input :data-code="item.Code" :id="item.Code" :data="item" class="form-control" :placeholder="__label(item)" v-model="item.Value"/>
                    </template>
                  </div>
                </div>
              </div>
              <div class="col-md-4 col-sm-4" v-if="MASTERDATA['OPDTTTTLMM']">
                <div class="form-group">
                  <label>{{__label(MASTERDATA['OPDTTTTLMM'])}} <i class="unit-label" v-if="MASTERDATA['OPDTTTTLMM'].Note">{{MASTERDATA['OPDTTTTLMM'].Note}}</i></label>
                  <div :data="item" :key="index"  v-for="(item, index) in MASTERDATA['OPDTTTTLMM'].Items">
                    <div class="fake-input disable" v-if="isConfirmed">{{item.Value}}</div>
                    <template v-else>
                      <input :data-code="item.Code" :id="item.Code" :data="item" class="form-control" :placeholder="__label(item)" v-model="item.Value"/>
                    </template>
                  </div>
                </div>
              </div>
              <div class="col-md-4 col-sm-4" v-if="MASTERDATA['OPDTTTTSDK']">
                <div class="form-group">
                  <label>{{__label(MASTERDATA['OPDTTTTSDK'])}} <i class="unit-label" v-if="MASTERDATA['OPDTTTTSDK'].Note">{{MASTERDATA['OPDTTTTSDK'].Note}}</i></label>
                  <div :data="item" :key="index"  v-for="(item, index) in MASTERDATA['OPDTTTTSDK'].Items">
                    <div class="fake-input disable" v-if="isConfirmed">{{item.Value}}</div>
                    <template v-else>
                      <input :data-code="item.Code" :id="item.Code" :data="item" class="form-control" :placeholder="__label(item)" v-model="item.Value"/>
                    </template>
                  </div>
                </div>
              </div>
            </div>
            <br/>
            <br/>
            <br/>
            <div class="row">
              <div class="col-md-6 col-sm-6 text-center">
              </div>
              <div class="col-md-6 col-sm-6 text-center">
                <template v-if="DataSubmit.ProcedureTime">
                  <p class="text-center">{{DataSubmit.ProcedureTime}}</p>
                  <eform-signature :ad="DataSubmit.ProcedureDoctor.Username" :title="'Bác sĩ làm thủ thuật'" />
                </template>
                <template v-else>
                  <p><b>{{__t('Bác sĩ làm thủ thuật')}}:</b></p>
                  <p><i v-if="viewOnly">Chưa xác nhận</i><button v-else @click="showDoctorConfirm('Surgoen', 'Bác sĩ làm thủ thuật')" class="btn v-white-btn">{{__t('Xác nhận')}}</button></p>
                </template>
              </div>
            </div>
            <br/>
            <br/>
            <div class="status-float-block" v-if="!viewOnly">
              <div class="action-btn-block">
                <div class="container">
                  <div class="content-container">
                    <div class="row">
                      <div class="col-md-2 col-sm-2">
                        <div class="form-group1">
                          <button class="btn btn-block v-white-btn" type="button" @click="back()"><i class="fa fa-angle-double-left" aria-hidden="true"></i> {{__t('Quay lại')}}</button>
                        </div>
                      </div>
                      <div class="col-md-4 col-sm-4" v-if="isConfirmed">
                      </div>
                      <div class="col-md-6 col-sm-6">
                        <div class="form-group1 hidden-on-production">
                          <router-link class="btn btn-block v-white-btn" :to="{name: 'ProcedureSummaryCertification', params: { Id: $route.params.Id }, query: { open: true}}">
                            {{__t('GIẤY CHỨNG NHẬN THỦ THUẬT')}}
                          </router-link>
                        </div>
                      </div>
                      <div class="col-md-4 col-sm-4" v-if="!isConfirmed">
                        <div class="form-group1">
                          <button class="btn v-yellow-btn pull-right btn-block hvr-ripple-out" v-shortkey="['ctrl', 's']" @shortkey="save()" type="button" @click="save()"><i class="fa fa-floppy-o" aria-hidden="true"></i> {{__t('btn.luu')}}</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </template>
          <div v-else class="text-center p20">
            <p>{{__t('Chưa có Phiếu phẫu thuật/thủ thuật')}}</p>
            <button class="btn btn-warning" @click="confirmPopup" v-if="!IsLocked">{{__t('Tạo mới')}}</button>
          </div>
        </div>
        <div v-else class="loading-text"><v-loading/></div>
        <modal name="doctorConfirm" transition="pop-out" id="doctor-login" height="200px" :clickToClose="false">
          <div class="box v-model-content-popup">
            <div class="box-header text-center">
              <h3 class="box-title">{{popupTitle}}.</h3>
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
              <p style="margin-top: 10px; text-align:center"> {{__t('Sử dụng tài khoản máy tính')}}</p>
              <p style="margin-top: 10px; text-align:center"> {{__t('Sau khi xác nhận, người dùng sẽ không thể chỉnh sửa thông tin trên phiếu')}}</p>
            </div>
          </div>
        </modal>
        <logs v-if="!viewOnly" :EdId="this._ItemId" :Type="_VisitType + '/ProcedureSummary'" />
        <p>A01_084_050919_V</p>
      </div>
      <ItemV3 v-else-if="Version === '3'"/>
      <ItemV4 v-else-if="Version === '4'"/>
      <!-- <ItemV3 v-else-if="Version !== '4' &&Version !== '3' && Version !== '2' && Version !== '1'"/> -->
    </div>
</template>
<script>
import MixinMasterData from '@/mixins/masterdata.js'
import MixinForm from '@/mixins/form.js'
import ProcedureSummary from '@/services/ProcedureSummary'
import VDateTimePicker from '@/components/VDateTimePicker.vue'
import Logs from '@/components/Logs.vue'
import _ from 'lodash'
import NProgress from 'nprogress'
import $ from 'jquery'
import DropFiles from '@/components/DropFiles.vue'
import Painting from '@/components/Painting.vue'
import ItemV2 from './ItemV2.vue'
import ItemV3 from './ItemV3.vue'
import ItemV4 from './ItemV4.vue'
import SurgeryAndProcedureSummaryV3 from '@/services/SurgeryAndProcedureSummaryV3'
import UploadFileService from '@/services/IPD/UploadFileService'
export default {
  name: 'ProcedureSummary',
  props: ['viewOnly', 'VisitId', 'Form', 'VisitType', 'formId'],
  mixins: [MixinMasterData, MixinForm],
  components: {VDateTimePicker, Logs, DropFiles, Painting, ItemV2, ItemV3, ItemV4},
  data () {
    return {
      dataDropfile: {},
      DataSubmit: {},
      loaded: false,
      IsLocked: false,
      user: {},
      popupTitle: '',
      VisitTypeGroupCode: 'OPD',
      tab: 'tab1',
      // Version: ''
      Version: ''
    }
  },
  watch: {
    formId () {
      this.getData()
    }
  },
  computed: {
    isConfirmed: function () {
      return this.viewOnly ||
      (this.DataSubmit.ProcedureTime ||
      this.DataSubmit.HeadOfDepartmentTime ||
      this.DataSubmit.DirectorTime)
    },
    _ItemId: function () {
      return this.$route.params.Item || this.formId
    }
  },
  mounted () {
    if (this.Version !== '2' && this.Version !== '3' && this.Version !== '4') {
      this.getMasterDatas({ Form: 'OPDTTTT' }, () => {
        this.getData()
      })
    } else {
      this.getData()
    }
  },
  methods: {
    openFile () {
      $('#dropzone').click()
    },
    sync () {
      new ProcedureSummary({}, this._VisitType).update('sync/' + this.$route.params.Id, {}).then(response => {
        if (response) this.MASTERDATA['OPDTTTTCDT'].Items[0].Value = response
      })
    },
    getVersion () {
      new SurgeryAndProcedureSummaryV3({}, this._VisitType).find('GetDetail/' + this._VisitId + '/' + this._ItemId + '?hidemsg=' + true).then(response => {
        console.log(response, 'check response')
        this.Version = response.Version
      }).catch(e => {
        this._401ResponseError(e)
      })
    },
    getData () {
      // this.loaded = true
      if (this.$route.params.Version === '4') {
        this.Version = '4'
        this.loaded = true
        // localStorage.setItem('version', this.Version)
      } else if (this.$route.params.Version === '3') {
        this.Version = '3'
        // localStorage.setItem('version', this.Version)
        this.loaded = true
      } else {
        new ProcedureSummary({}, this._VisitType).find(this._ItemId + '?hidemsg=' + true).then(response => {
          console.log(response, this.MASTERDATA)
          this.IsLocked = response.IsLocked
          this.DataSubmit = response
          console.log('rrr', response)
          this.dataDropfile = {
            ...this.dataDropfile,
            contentImg: 'Tóm tắt thủ thuật can thiệp động mạch vành',
            titleImg: 'Hình ảnh được lấy từ biểu mẫu Tóm tắt thủ thuật can thiệp động mạch vành',
            visittypeImg: this._VisitType,
            visitidImg: this._VisitId,
            formidImg: this.$route.params.Item
          }
          this.Version = response.Version
          // localStorage.setItem('version', response.Version)
          for (const property in this.MASTERDATA) {
            if (this.MASTERDATA[property].Items) {
              this.MASTERDATA[property].Items.forEach(item => {
                console.log(property)
                var code = item.Code
                var exited = _.find(this.DataSubmit.Datas, {Code: code})
                if (exited) {
                  if (this.checkString(item.DataType, 'CheckBox') || this.checkString(item.DataType, 'Radio')) {
                    var isTrue = (exited.Value === 'True')
                    item.Value = isTrue
                  } else if (exited.Value && (item.Code === 'OPDTTTTTGLANS') && !this.isConfirmed) {
                    item.Value = this.string2Moment(exited.Value)
                  } else if (exited.Value && (item.Code === 'OPDTTTTUPLANS')) {
                    item.Value = this.JSONParse(exited.Value, true)
                  } else {
                    console.log(exited.Value)
                    item.Value = exited.Value
                  }
                }
              })
            }
          }
          setTimeout(() => {
            this.edited = false
            this.loaded = true
            this.tab = this.MASTERDATA['OPDTTTTTTQT2'] && (JSON.stringify(this.MASTERDATA['OPDTTTTTTQT2'].Items[0].Value) === '[]' || this.MASTERDATA['OPDTTTTTTQT2'].Items[0].Value === '""' || this.MASTERDATA['OPDTTTTTTQT2'].Items[0].Value === null) ? 'tab1' : 'tab2'
          }, 500)
          // if (this.Version !== '1' && this.Version !== '2') {
          //   this.getVersion()
          // }
        }).catch(e => {
          console.log(e)
          this.getVersion()
          if (this.$route.query.open) this.confirmPopup()
          this.edited = false
          this.loaded = true
          if (e.status === 404) {}
        })
      }
    },
    showDoctorConfirm (kind, title) {
      if (this.edited) {
        this.alert('Thông báo', 'Bạn cần phải lưu thông tin trước khi xác nhận')
        return false
      }
      this.popupTitle = title
      this.user.kind = kind
      this.$modal.show('doctorConfirm')
    },
    async confirm () {
      if (this.edited) {
        await this.save()
      }
      new ProcedureSummary({}, this._VisitType).update(this._ItemId, this.user, 'Confirm/').then(response => {
        this.toastedSuccess()
        this.reload()
        this.$modal.hide('doctorConfirm')
      }).catch(e => {
        // this.back()
      })
    },
    async save () {
      var obj = {}
      NProgress.start()
      this.DataSubmit.Datas = []
      for (const property in this.MASTERDATA) {
        if (this.MASTERDATA[property].Items) {
          this.MASTERDATA[property].Items.forEach(item => {
            var val = item.Value
            if (item.Code === 'OPDTTTTTGLANS' && typeof item.Value === 'object') {
              val = this.moment2String(item.Value) || ''
            }
            if (item.Code === 'OPDTTTTTTQT2ANS') val = JSON.stringify(item.Value)
            if (item.Code === 'OPDTTTTUPLANS') {
              val = JSON.stringify(item.Value) || '[]'
            }
            this.DataSubmit.Datas.push({
              Code: item.Code,
              Value: val,
              Group: property
            })
            obj[item.Code] = item.Value
          })
        }
      }
      var arr = this.MASTERDATA['OPDTTTTUPL'].Items[0].Value ? this.MASTERDATA['OPDTTTTUPL'].Items[0].Value : []
      await new Promise(resolve => setTimeout(async () => {
        await new ProcedureSummary({}, this._VisitType).update(this._ItemId, this.DataSubmit).then(response => {
          this.removedFile(arr)
          this.toastedSuccess().getData()
          this.edited = false
          resolve(true)
        }).catch(e => {
          // this._401ResponseError(e)
        })
      }, 100))
    },
    removedFile (arr) {
      new UploadFileService({hidemsg: true}).update('File/DeleteFileFromForms/' + this._ItemId, {Urls: arr.toString()}).then(response => {
      }).catch(err => {
        console.log(err)
      })
    },
    create () {
      new ProcedureSummary({}, this._VisitType).update(this._ItemId, {}, 'Create/').then(response => {
        if (this.$route.query.open) {
          this.$router.replace({'query': null})
        } else {
          this.reload()
        }
      }).catch(e => {
        // this.back()
      })
    },
    confirmPopup () {
      this.$modal.show('dialog', {
        clickToClose: false,
        title: this.__t('Thông báo'),
        text: this.__t('Tạo mới Phiếu phẫu thuật/thủ thuật'),
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
    }
  }
}
</script>
