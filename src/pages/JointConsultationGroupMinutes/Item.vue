
<template>
  <div>
    <template v-if="loaded">
      <template v-if="DataSubmit">
        <div v-if="!isConfirmed">
          <h4 class="text-bold">{{__t('A. PHẦN HÀNH CHÍNH')}}</h4>
          <div class="box border-box" style="padding: 20px 25px">
            <div class="box-body">
              <div class="row" v-if="MASTERDATA['EIOJCGMPBPD']">
                <div class="col-md-6">
                  <div class="form-group">
                    <label>{{__label(MASTERDATA['EIOJCGMPBPD'])}}:</label>
                    <div :key="index" v-for="(item,index) in MASTERDATA['EIOJCGMPBPD'].Items">
                      <user-ad :position="'Doctor'" :data-code="item.Code" :id="item.Code" :data="item" :placeholder="__label(item)" v-model="item.Value"/>
                    </div>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <label>{{__t('Khoa')}}:</label>
                    <span class="f-input">{{__label(DataSubmit.SpecialtyInfo)}}</span>
                  </div>
                </div>
              </div>
              <div class="row" v-if="MASTERDATA['EIOJCGMTOJC']">
                <div class="col-md-12">
                  <div class="form-group">
                    <label>{{__t('2. Hình thức hội chẩn')}}<i class="unit-label" v-if="MASTERDATA['EIOJCGMTOJC'].Note"> {{MASTERDATA['EIOJCGMTOJC'].Note}}</i>:</label>
                    <div class="group-radio">
                      <span :data="item" :key="'EIOJCGMTOJC-' + index" v-for="(item,index) in MASTERDATA['EIOJCGMTOJC'].Items" v-if="checkString(item.DataType, 'CheckBox')">
                        <input type="checkbox" :id="'EIOJCGMTOJCradio-' + index" v-model="item.Value">
                        <label :for="'EIOJCGMTOJCradio-' + index">{{__label(item)}}</label>
                      </span>
                    </div>
                    <template v-if="MASTERDATA['EIOJCGMTOJC'].Items[5].Value">
                      <br/>
                      <div :data="item" :key="'EIOJCGMTOJC-' + index" v-for="(item,index) in MASTERDATA['EIOJCGMTOJC'].Items" v-if="checkString(item.DataType, 'Text')">
                        <textarea-autosize :data-code="item.Code" :id="item.Code" :data="item" class="form-control" rows="3" :placeholder="__label(item)"  v-model="item.Value"/>
                      </div>
                    </template>
                  </div>
                </div>
              </div>
              <md-input-text v-if="MASTERDATA['EIOJCGMROJC']" v-model="MASTERDATA['EIOJCGMROJC']"/>
              <div class="row" v-if="MASTERDATA['EIOJCGMJCT']">
                <div class="col-md-12">
                  <div class="form-group">
                    <label>{{__label(MASTERDATA['EIOJCGMJCT'])}}<i v-if="MASTERDATA['EIOJCGMJCT'].Note" class="unit-label"> {{MASTERDATA['EIOJCGMJCT'].Note}}</i>:</label>
                    <div class="inline" :data="item" :key="index"  v-for="(item, index) in MASTERDATA['EIOJCGMJCT'].Items">
                      <v-date-time-picker v-model="item.Value" class=" select-boox" :format="vDateTimeFormat"/>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-12" v-if="MASTERDATA['EIOJCGMATTE']">
                  <div class="form-group">
                    <label>{{__label(MASTERDATA['EIOJCGMATTE'])}}<i v-if="MASTERDATA['EIOJCGMATTE'].Note" class="unit-label"> {{MASTERDATA['EIOJCGMATTE'].Note}}</i></label>
                  </div>
                </div>
              </div>
              <div class="row" v-if="MASTERDATA['EIOJCGMCHMA']">
                <div class="col-md-12">
                  <div class="form-group">
                    <label>{{__label(MASTERDATA['EIOJCGMCHMA'])}}:</label>
                    <div class="d-flex align-items-center">
                      <div class="wpe-50" :key="index" v-for="(item,index) in MASTERDATA['EIOJCGMCHMA'].Items">
                        <user-ad v-if="item.DataType === 'UserAd'" @onSelect="EIOJCGMCHMAOnselect" :data-code="item.Code" :id="item.Code" :data="item" :placeholder="__label(item)" v-model="item.Value"/>
                        <div class="d-flex no-wrap  align-items-center" v-else>
                          <span class="mr-10 ml-10">{{__label(item)}}:</span> <input class="form-control" v-model="item.Value" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-md-12">
                  <div class="form-group">
                    <label>{{__label(MASTERDATA['EIOJCGMSETA'])}}:</label>
                    <div class="d-flex align-items-center">
                      <div class="wpe-50" :key="index" v-for="(item,index) in MASTERDATA['EIOJCGMSETA'].Items">
                        <user-ad v-if="item.DataType === 'UserAd'" @onSelect="EIOJCGMSETAOnselect" :data-code="item.Code" :id="item.Code" :data="item" :placeholder="__label(item)" v-model="item.Value"/>
                        <div class="d-flex no-wrap  align-items-center" v-else>
                          <span class="mr-10 ml-10">{{__label(item)}}:</span> <input class="form-control" v-model="item.Value" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <md-input-text v-if="MASTERDATA['EIOJCGMMEMS']" v-model="MASTERDATA['EIOJCGMMEMS']"/>
            </div>
          </div>
          <h4 class="text-bold">{{__t('B. NỘI DUNG HỘI CHẨN')}}</h4>
          <div class="box border-box" style="padding: 20px 25px">
            <div class="box-body">
              <p class="text-bold">{{__t('I. Phần hành chính người bệnh')}}</p>
              <div class="row" v-if="MASTERDATA['EIOJCGMPBPD']">
                <div class="col-md-6">
                  <div class="form-group">
                    <label>{{__label(MASTERDATA['EIOJCGMADAT'])}}:
                      <span :key="index" v-for="(item,index) in MASTERDATA['EIOJCGMADAT'].Items">
                        {{item.Value}}
                      </span>
                    </label>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <b>{{__t('Tại Khoa')}}: </b> {{__label(this.$store.state.account.Specialty)}}
                  </div>
                </div>
              </div>
              <md-input-text v-if="MASTERDATA['EIOJCGMSOPC']" v-model="MASTERDATA['EIOJCGMSOPC']">
                <div v-if="_VisitType === 'ED'">
                  <button class="btn btn-xs btn-flat btn-primary pull-right" @click="loadEIOJCGMSOPC(MASTERDATA['EIOJCGMSOPC'].Items)">{{__t('btn.lay_du_lieu_gan_nhat')}}</button>
                </div>
                <div v-if="_VisitType === 'IPD'">
                  <button class="btn btn-sync-data pull-right" @click="loadDataFromMedicalRecord()">{{__t('Tham khảo tiền sử bệnh từ bệnh án')}}</button>
                </div>
              </md-input-text>
              <md-input-text v-if="MASTERDATA['EIOJCGMITBD']" v-model="MASTERDATA['EIOJCGMITBD']"/>
              <md-input-text v-if="MASTERDATA['EIOJCGMCAPE']" v-model="MASTERDATA['EIOJCGMCAPE']"/>
              <md-input-text v-if="MASTERDATA['EIOJCGMDIAG']" v-model="MASTERDATA['EIOJCGMDIAG']"/>
              <md-input-text v-if="MASTERDATA['EIOJCGMPOCA']" v-model="MASTERDATA['EIOJCGMPOCA']"/>
              <md-input-text v-if="MASTERDATA['EIOJCGMEXPL']" v-model="MASTERDATA['EIOJCGMEXPL']"/>
              <md-input-text v-if="MASTERDATA['EIOJCGMOTHE']" v-model="MASTERDATA['EIOJCGMOTHE']"/>
            </div>
          </div>
          <div class="hidden">
            <JointConsultationGroupMinutesPrint :data="DataSubmit" :MASTERDATA="MASTERDATA" />
          </div>
        </div>
        <div v-else>
          <JointConsultationGroupMinutesPrint :data="DataSubmit" :MASTERDATA="MASTERDATA" />
        </div>
        <br/>
        <br/>
        <div class="row">
          <div class="col-md-6 col-sm-6 text-center">
            <p><b>{{__t('Các thành viên')}}:</b></p>
            <p v-if="!viewOnly && !IsLocked"><button  @click="showDoctorConfirm('Member', 'Thành viên hội chẩn')" class="btn v-white-btn">{{__t('Xác nhận')}}</button></p>
            <p v-else><i>{{__t('Chưa xác nhận')}}</i></p>
            <p :key="index" v-for="(member, index) in DataSubmit.Members">
              <eform-signature :ad="member.Username" :title="''" />
              <br/>
            </p>
          </div>
          <div class="col-md-6 col-sm-6 text-center">
            <template v-if="DataSubmit.SecretaryConfirm">
              <eform-signature :ad="DataSubmit.Secretary.Username" :title="'THƯ KÝ'" />
            </template>
            <template v-else>
              <p ><b>{{__t('THƯ KÝ')}}:</b></p>
              <p><i v-if="viewOnly || IsLocked">{{__t('Chưa xác nhận')}}</i><button v-else @click="showDoctorConfirm('Secretary', 'THƯ KÝ')" class="btn v-white-btn">{{__t('Xác nhận')}}</button></p>
            </template>
            <br/>
            <template v-if="DataSubmit.ChairmanConfirm">
              <eform-signature :ad="DataSubmit.Chairman.Username" :title="'CHỦ TỌA'" />
            </template>
            <template v-else>
              <p><b>{{__t('CHỦ TỌA')}}:</b></p>
              <p><i v-if="viewOnly">{{__t('Chưa xác nhận')}}</i><button v-else @click="showDoctorConfirm('Chairman', 'CHỦ TỌA')" class="btn v-white-btn">{{__t('Xác nhận')}}</button></p>
            </template>
          </div>
        </div>
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
        <div class="status-float-block" v-if="!viewOnly">
          <div class="action-btn-block">
            <div class="container">
              <div class="content-container">
                <div class="row">
                  <div class="col-md-2 col-sm-2">
                    <div class="form-group1">
                      <button class="btn btn-block v-white-btn" type="button" @click="handleBack"><i class="fa fa-angle-double-left" aria-hidden="true"></i> {{__t('Quay lại')}}</button>
                    </div>
                  </div>
                  <div class="col-md-5 col-sm-5">
                    <div class="form-group1">
                      <button  class="btn btn-block v-white-btn" type="button" v-shortkey="['ctrl', 'p']" @shortkey="print()" @click="print()"><i class="fa fa-print" aria-hidden="true"></i> {{__t('In biên bản')}}</button>
                    </div>
                  </div>
                  <div class="col-md-5 col-sm-5" v-if="!IsLocked">
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
      <div v-else>
        <div class="text-center">
          <p>{{__t('Chưa có biên bản hội chẩn')}}</p>
          <button class="btn btn-warning" @click="confirmPopup">{{__t('Tạo mới')}}</button>
        </div>
      </div>
    </template>
    <div v-else class="loading-text"><v-loading/></div>
    <div>
      <logs v-if="!viewOnly" :EdId="this.$route.params.Id" :Type="'JointConsultationGroupMinutes'" :noDetail="true" />
    </div>
  </div>
</template>
<script>
import MixinMasterData from '@/mixins/masterdata.js'
import MixinForm from '@/mixins/form.js'
import VDateTimePicker from '@/components/VDateTimePicker.vue'
import JointConsultationGroupMinutes from '@/services/JointConsultationGroupMinutes'
import JointConsultationGroupMinutesPrint from './Print.vue'
// import JointConsultationGroupMinutesChecked from '@/services/JointConsultationGroupMinutesChecked'
import _ from 'lodash'
import NProgress from 'nprogress'
import Logs from '@/components/Logs.vue'
import moment from 'moment'
export default {
  name: 'OPDJointConsultationGroupMinutes',
  mixins: [MixinMasterData, MixinForm],
  props: ['viewOnly', 'VisitId', 'VisitType', 'formId'],
  components: {
    VDateTimePicker,
    JointConsultationGroupMinutesPrint,
    Logs
  },
  watch: {
    formId () {
      this.getData()
    }
  },
  data () {
    return {
      IsLocked: false,
      popupTitle: '',
      user: {},
      loaded: false,
      DataSubmit: null,
      data: null,
      dataMaster: null
    }
  },
  computed: {
    isConfirmed: function () {
      return this.IsLocked || this.viewOnly || (this.DataSubmit.ChairmanConfirm || this.DataSubmit.SecretaryConfirm || this.DataSubmit.MemberConfirm)
      // return this.DataSubmit.ChairmanConfirm || this.DataSubmit.SecretaryConfirm || this.DataSubmit.MemberConfirm
    },
    _ItemId: function () {
      return this.formId || this.$route.params.Item
    }
  },
  mounted () {
    this.getMasterDatas({Form: 'EIOJCGM'}, () => {
      this.getData()
    })
  },
  methods: {
    loadEIOJCGMSOPC (data) {
      new JointConsultationGroupMinutes({}, this._VisitType).update('/Sync/' + this.$route.params.Id, {}).then(response => {
        if (response) {
          var arr = []
          if (response.History) {
            arr.push('Bệnh sử:')
            arr.push('' + response.History)
          }
          if (response.Assessment && response.Assessment.length && response.Assessment.find(e => e.Value)) {
            arr.push('Thăm khám:')
            response.Assessment.forEach(e => {
              if (e.Value) arr.push('' + e.ViName + ': ' + e.Value)
            })
          }
          data[0].Value = arr.join('\n')
        }
      }).catch(e => {
        // data[0].Value = ''
      })
    },
    EIOJCGMCHMAOnselect (e) {
      if (e.Title) this.MASTERDATA['EIOJCGMCHMA'].Items[1].Value = e.Title
    },
    EIOJCGMSETAOnselect (e) {
      if (e.Title) this.MASTERDATA['EIOJCGMSETA'].Items[1].Value = e.Title
    },
    print () {
      this.$htmlToPaper('printMe', false, 'A01_057_050919_VE')
    },
    showDoctorConfirm (kind, title) {
      this.popupTitle = title
      this.user.kind = kind
      this.$modal.show('doctorConfirm')
    },
    async confirm () {
      if (this.edited) await this.save()
      new JointConsultationGroupMinutes({}, this._VisitType).update(this.$route.params.Item, this.user, '/Confirm/').then(response => {
        this.getData()
        this.toastedSuccess().scroll2Bottom()
        this.$modal.hide('doctorConfirm')
      }).catch(e => {
        // this.back()
      })
    },
    getData () {
      new JointConsultationGroupMinutes({}, this._VisitType).find(this._ItemId + '?hidemsg=' + true).then(response => {
        this.HasData = true
        this.IsLocked = response.Lock24h
        this.DataSubmit = response
        for (const property in this.MASTERDATA) {
          if (this.MASTERDATA[property].Items) {
            this.MASTERDATA[property].Items.forEach(item => {
              if (!item.Value && (item.Code === 'EIOJCGMJCTANS')) {
                item.Value = moment(new Date()).format(this.vDateTimeFormat)
              }
              var code = item.Code
              var exited = _.find(this.DataSubmit.Datas, {Code: code})
              if (exited) {
                if (this.checkString(item.DataType, 'CheckBox') || this.checkString(item.DataType, 'Radio')) {
                  var isTrue = (exited.Value === 'True')
                  item.Value = isTrue
                } else {
                  item.Value = exited.Value
                }
              }
            })
          }
        }
        this.loaded = true
        this.dataMaster = JSON.stringify(this.MASTERDATA)
      }).catch(e => {
        this.loaded = true
        if (e.status === 404) {}
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
            if (item.Code === 'EIOJCGMJCTANS' && typeof item.Value === 'object') {
              val = this.moment2String(item.Value)
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
      await new JointConsultationGroupMinutes({}, this._VisitType).update('/' + this.$route.params.Item, this.DataSubmit).then(response => {
        this.toastedSuccess()
        this.getData()
        this.edited = false
      }).catch(e => {
        // this._401ResponseError(e)
      })
    },
    creat () {
      new JointConsultationGroupMinutes({}, this._VisitType).update('/Create/' + this.$route.params.Id, {}).then(response => {
        this.reload()
      }).catch(e => {
        // this.back()
      })
    },
    confirmPopup () {
      this.$modal.show('dialog', {
        clickToClose: false,
        title: this.__t('Thông báo'),
        text: this.__t('Tạo mới biên bản hội chẩn?'),
        class: 'v-dialog v-dialog-warning',
        buttons: [
          {
            title: this.__t('Tôi xác nhận'),
            class: 'btn btn-warning',
            handler: () => {
              this.$modal.hide('dialog')
              this.creat()
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
    handleBack () {
      if (this.dataMaster !== JSON.stringify(this.MASTERDATA)) {
        this.confirmPopupBack()
      } else {
        this.back2(`/IPD/JointConsultationGroupMinutes/${this.$route.params.Id}`)
      }
    },
    confirmPopupBack () {
      this.$modal.show('dialog', {
        clickToClose: false,
        title: this.__t('Cảnh báo'),
        text: this.__t('Dữ liệu bạn đang làm có thể bị mất nếu chưa lưu'),
        class: 'v-dialog v-dialog-warning',
        buttons: [
          {
            title: this.__t('Đồng ý'),
            class: 'btn',
            handler: () => {
              this.$modal.hide('dialog')
              this.back2(`/IPD/JointConsultationGroupMinutes/${this.$route.params.Id}`)
            }
          },
          {
            title: this.__t('btnCancel'),
            class: 'btn btn-warning',
            handler: () => {
              // this.back()
              this.$modal.hide('dialog')
            }
          }
        ]
      })
    },
    loadDataFromMedicalRecord () {
      new JointConsultationGroupMinutes({}, this._VisitType).find('MedicalHistory/' + this.$route.params.Id, {}).then(response => {
        if (response.MedicalHistory) {
          this.MASTERDATA['EIOJCGMSOPC'].Items[0].Value += response.MedicalHistory + '\n'
        }
      })
    }
  }
}
</script>
