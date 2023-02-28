<template>
  <div class="main-content" id="ProcedureSummaryPage">
    <h2 class="text-center" v-if="!viewOnly"><b>{{__t('Phiếu phẫu thuật/thủ thuật')}}</b></h2>
    <div v-if="loaded">
      <template v-if="DataSubmit">
        <div class="box-body-bordered">
          <div class="row" v-if="MASTERDATA['OPDTTTTCDT']">
            <div class="col-md-12">
              <div class="form-group">
                <label>{{__label(MASTERDATA['OPDTTTTCDT'])}} <i class="unit-label">{{MASTERDATA['OPDTTTTCDT'].Note}}</i></label>
                <div :data="item" :key="index"  v-for="(item, index) in MASTERDATA['OPDTTTTCDT'].Items">
                  <textarea-autosize :readonly="true" :data-code="item.Code" :id="item.Code" :data="item" class="form-control" rows="3" :placeholder="__label(item)" v-model="item.Value"/>
                </div>
              </div>
            </div>
          </div>
          <div class="row" v-if="MASTERDATA['OPDTTTTCDS']">
            <div class="col-md-12">
              <div class="form-group">
                <label>{{__label(MASTERDATA['OPDTTTTCDS'])}} <i class="unit-label">{{MASTERDATA['OPDTTTTCDS'].Note}}</i></label>
                <div :data="item" :key="index"  v-for="(item, index) in MASTERDATA['OPDTTTTCDS'].Items">
                  <textarea-autosize :readonly="isConfirmed" :data-code="item.Code" :id="item.Code" :data="item" class="form-control" rows="3" :placeholder="__label(item)" v-model="item.Value"/>
                </div>
              </div>
            </div>
          </div>
          <div class="row" v-if="MASTERDATA['OPDTTTTPPL']">
            <div class="col-md-12">
              <div class="form-group">
                <label>{{__label(MASTERDATA['OPDTTTTPPL'])}} <i class="unit-label">{{MASTERDATA['OPDTTTTPPL'].Note}}</i></label>
                <div :data="item" :key="index"  v-for="(item, index) in MASTERDATA['OPDTTTTPPL'].Items">
                  <textarea-autosize :readonly="isConfirmed" :data-code="item.Code" :id="item.Code" :data="item" class="form-control" rows="3" :placeholder="__label(item)" v-model="item.Value"/>
                </div>
              </div>
            </div>
          </div>
          <div class="row" v-if="MASTERDATA['OPDTTTTPPVC']">
            <div class="col-md-12">
              <div class="form-group">
                <label>{{__label(MASTERDATA['OPDTTTTPPVC'])}} <i class="unit-label">{{MASTERDATA['OPDTTTTPPVC'].Note}}</i></label>
                <div :data="item" :key="index"  v-for="(item, index) in MASTERDATA['OPDTTTTPPVC'].Items">
                  <textarea-autosize :readonly="isConfirmed" :data-code="item.Code" :id="item.Code" :data="item" class="form-control" rows="3" :placeholder="__label(item)" v-model="item.Value"/>
                </div>
              </div>
            </div>
          </div>
          <div class="row" v-if="MASTERDATA['OPDTTTTBSL']">
            <div class="col-md-12">
              <div class="form-group">
                <label>{{__label(MASTERDATA['OPDTTTTBSL'])}} <i class="unit-label">{{MASTERDATA['OPDTTTTBSL'].Note}}</i></label>
                <div :data="item" :key="index"  v-for="(item, index) in MASTERDATA['OPDTTTTBSL'].Items">
                  <user-auto-suggest :readonly="isConfirmed" :data-code="item.Code" :id="item.Code" :data="item" :placeholder="__label(item)" v-model="item.Value"/>
                </div>
              </div>
            </div>
          </div>
          <div class="row" v-if="MASTERDATA['OPDTTTTNVP']">
            <div class="col-md-12">
              <div class="form-group">
                <label>{{__label(MASTERDATA['OPDTTTTNVP'])}} <i class="unit-label">{{MASTERDATA['OPDTTTTNVP'].Note}}</i></label>
                <div :data="item" :key="index"  v-for="(item, index) in MASTERDATA['OPDTTTTNVP'].Items">
                  <user-auto-suggest :position="'ALL'" :readonly="isConfirmed" :data-code="item.Code" :id="item.Code" :data="item" :placeholder="__label(item)" v-model="item.Value"/>
                </div>
              </div>
            </div>
          </div>
          <div class="row" v-if="MASTERDATA['OPDTTTTBSGM']">
            <div class="col-md-12">
              <div class="form-group">
                <label>{{__label(MASTERDATA['OPDTTTTBSGM'])}} <i class="unit-label">{{MASTERDATA['OPDTTTTBSGM'].Note}}</i></label>
                <div :data="item" :key="index"  v-for="(item, index) in MASTERDATA['OPDTTTTBSGM'].Items">
                  <user-auto-suggest :readonly="isConfirmed" :data-code="item.Code" :id="item.Code" :data="item" :placeholder="__label(item)" v-model="item.Value"/>
                </div>
              </div>
            </div>
          </div>
          <div class="row" v-if="MASTERDATA['OPDTTTTTGL']">
            <div class="col-md-12">
              <div class="form-group">
                <label>{{__label(MASTERDATA['OPDTTTTTGL'])}} <i class="unit-label">{{MASTERDATA['OPDTTTTTGL'].Note}}</i></label>
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
        <div class="row" v-if="MASTERDATA['OPDTTTTCBC']">
          <div class="col-md-12">
            <div class="form-group">
              <label>{{__label(MASTERDATA['OPDTTTTCBC'])}} <i class="unit-label">{{MASTERDATA['OPDTTTTCBC'].Note}}</i></label>
              <div :data="item" :key="index"  v-for="(item, index) in MASTERDATA['OPDTTTTCBC'].Items">
                <textarea-autosize :readonly="isConfirmed" :data-code="item.Code" :id="item.Code" :data="item" class="form-control" rows="3" :placeholder="__label(item)" v-model="item.Value"/>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-4 col-sm-4">
            <div class="form-group">
              <label>{{__label(MASTERDATA['OPDTTTTSMBP'])}} <i class="unit-label">{{MASTERDATA['OPDTTTTSMBP'].Note}}</i></label>
              <div :data="item" :key="index"  v-for="(item, index) in MASTERDATA['OPDTTTTSMBP'].Items">
                <div class="fake-input disable" v-if="isConfirmed">{{item.Value}}</div>
                <template v-else>
                  <input :data-code="item.Code" :id="item.Code" :data="item" class="form-control" :placeholder="__label(item)" v-model="item.Value"/>
                </template>
              </div>
            </div>
          </div>
          <div class="col-md-4 col-sm-4">
            <div class="form-group">
              <label>{{__label(MASTERDATA['OPDTTTTLMM'])}} <i class="unit-label">{{MASTERDATA['OPDTTTTLMM'].Note}}</i></label>
              <div :data="item" :key="index"  v-for="(item, index) in MASTERDATA['OPDTTTTLMM'].Items">
                <div class="fake-input disable" v-if="isConfirmed">{{item.Value}}</div>
                <template v-else>
                  <input :data-code="item.Code" :id="item.Code" :data="item" class="form-control" :placeholder="__label(item)" v-model="item.Value"/>
                </template>
              </div>
            </div>
          </div>
          <div class="col-md-4 col-sm-4">
            <div class="form-group">
              <label>{{__label(MASTERDATA['OPDTTTTSDK'])}} <i class="unit-label">{{MASTERDATA['OPDTTTTSDK'].Note}}</i></label>
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
          <div class="col-md-4 col-sm-4 text-center">
            <template v-if="DataSubmit.ProcedureTime">
              <p class="text-center">{{DataSubmit.ProcedureTime}}</p>
              <eform-signature :ad="DataSubmit.ProcedureDoctor.Username" :title="'Bác sĩ làm thủ thuật'" />
            </template>
            <template v-else>
              <p><b>{{__t('Bác sĩ làm thủ thuật')}}:</b></p>
              <p><i v-if="viewOnly">Chưa xác nhận</i><button v-else @click="showDoctorConfirm('Surgoen', 'Bác sĩ làm thủ thuật')" class="btn v-white-btn">{{__t('Xác nhận')}}</button></p>
            </template>
          </div>
          <div class="col-md-4 col-sm-4 text-center">
            <template v-if="DataSubmit.HeadOfDepartmentTime">
              <p class="text-center">{{DataSubmit.HeadOfDepartmentTime}}</p>
              <eform-signature :ad="DataSubmit.HeadOfDepartment.Username" :title="'Trưởng khoa'" />
            </template>
            <template v-else>
              <p><b>{{__t('Trưởng khoa')}}:</b></p>
              <p><i v-if="viewOnly">Chưa xác nhận</i><button v-else @click="showDoctorConfirm('Head Of Department', 'Trưởng khoa')" class="btn v-white-btn">{{__t('Xác nhận')}}</button></p>
            </template>
          </div>
          <div class="col-md-4 col-sm-4 text-center">
            <template v-if="DataSubmit.DirectorTime">
              <p class="text-center">{{DataSubmit.DirectorTime}}</p>
              <eform-signature :ad="DataSubmit.Director.Username" :title="'Giám đốc bệnh viện'" />
            </template>
            <template v-else>
              <p><b>{{__t('Giám đốc bệnh viện')}}:</b></p>
              <p><i v-if="viewOnly">Chưa xác nhận</i><button v-else @click="showDoctorConfirm('Director', 'Giám đốc bệnh viện')" class="btn v-white-btn">{{__t('Xác nhận')}}</button></p>
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
        <button class="btn btn-warning" @click="confirmPopup">{{__t('Tạo mới')}}</button>
      </div>
    </div>
    <div v-else class="loading-text"><v-loading/></div>
    <modal name="doctorConfirm" transition="pop-out" id="doctor-login" height="auto" :clickToClose="false">
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
    <logs v-if="!viewOnly" :EdId="this.$route.params.Id" :Type="'OPD/ProcedureSummary'" />
  </div>
</template>
<script>
import MixinMasterData from '@/mixins/masterdata.js'
import MixinForm from '@/mixins/form.js'
import ProcedureSummary from '@/services/OPD/ProcedureSummary'
import VDateTimePicker from '@/components/VDateTimePicker.vue'
import Logs from '@/components/Logs.vue'
import _ from 'lodash'
import NProgress from 'nprogress'
export default {
  name: 'ProcedureSummary',
  props: ['viewOnly'],
  mixins: [MixinMasterData, MixinForm],
  components: {VDateTimePicker, Logs},
  data () {
    return {
      DataSubmit: null,
      loaded: false,
      user: {},
      popupTitle: ''
    }
  },
  computed: {
    isConfirmed: function () {
      return this.viewOnly || (this.DataSubmit.ProcedureTime || this.DataSubmit.HeadOfDepartmentTime || this.DataSubmit.DirectorTime)
    }
  },
  mounted () {
    this.getMasterDatas({Form: 'OPDTTTT'}, () => {
      this.getData()
    })
  },
  methods: {
    getData () {
      new ProcedureSummary().find(this.$route.params.Id + '?hidemsg=' + true).then(response => {
        this.loaded = true
        this.DataSubmit = response
        for (const property in this.MASTERDATA) {
          if (this.MASTERDATA[property].Items) {
            this.MASTERDATA[property].Items.forEach(item => {
              var code = item.Code
              var exited = _.find(this.DataSubmit.Datas, {Code: code})
              if (exited) {
                if (this.checkString(item.DataType, 'CheckBox') || this.checkString(item.DataType, 'Radio')) {
                  var isTrue = (exited.Value === 'True')
                  item.Value = isTrue
                } else if (exited.Value && (item.Code === 'OPDTTTTTGLANS') && !this.isConfirmed) {
                  item.Value = this.string2Moment(exited.Value)
                } else {
                  item.Value = exited.Value
                }
              }
            })
          }
        }
        setTimeout(() => {
          this.edited = false
        }, 500)
      }).catch(e => {
        if (this.$route.query.open) this.confirmPopup()
        this.edited = false
        this.loaded = true
        if (e.status === 404) {}
      })
    },
    showDoctorConfirm (kind, title) {
      this.popupTitle = title
      this.user.kind = kind
      this.$modal.show('doctorConfirm')
    },
    confirm () {
      new ProcedureSummary().update(this.$route.params.Id, this.user, 'Confirm/').then(response => {
        this.getData()
        this.toastedSuccess().scroll2Bottom()
        this.$modal.hide('doctorConfirm')
      }).catch(e => {
        // this.back()
      })
    },
    save () {
      var obj = {}
      NProgress.start()
      this.DataSubmit.Datas = []
      for (const property in this.MASTERDATA) {
        if (this.MASTERDATA[property].Items) {
          this.MASTERDATA[property].Items.forEach(item => {
            var val = item.Value
            if (item.Code === 'OPDTTTTTGLANS' && typeof item.Value === 'object') {
              val = this.moment2String(item.Value) || ''
              console.log(val)
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
      setTimeout(() => {
        new ProcedureSummary().update(this.$route.params.Id, this.DataSubmit).then(response => {
          this.toastedSuccess()
          this.edited = false
        }).catch(e => {
          // this._401ResponseError(e)
        })
      }, 100)
    },
    creat () {
      new ProcedureSummary().update(this.$route.params.Id, {}, 'Create/').then(response => {
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
        title: 'Thông báo',
        text: 'Tạo mới Phiếu phẫu thuật/thủ thuật?',
        class: 'v-dialog v-dialog-warning',
        buttons: [
          {
            title: 'Tôi xác nhận',
            class: 'btn btn-warning',
            handler: () => {
              this.$modal.hide('dialog')
              this.creat()
            }
          },
          {
            title: 'Bỏ qua',
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
