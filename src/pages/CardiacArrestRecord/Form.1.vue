<template>
  <div>
    <div class="tab-form-content padding-form" v-if="DataSubmit">
      <template v-if="DataSubmit.Version === 1">
        <formV1 :MASTERDATA="MASTERDATA" />
        <div class="row">
          <div class="col-md-4 col-sm-4 text-center">
          </div>
          <div class="col-md-4 col-sm-4 text-center">
          </div>
          <div class="col-md-4 col-sm-4 text-center">
            <p v-if="DataSubmit.DoctorComfirm">{{DataSubmit.DoctorComfirm}}</p>
            <div><b>{{__t('Bác sĩ')}}</b></div>
            <EformSignature2 v-if="DataSubmit.DoctorComfirm" :ad="DataSubmit.Doctor.Username"/>
            <!-- <div v-else><button @click="showDoctorConfirm('TeamLeader', 'Nhóm trưởng ký')" class="btn v-white-btn">{{__t('Xác nhận')}}</button></div> -->
            <!-- <div v-if="DataSubmit.DoctorComfirm"><ad-Info :ad="DataSubmit.Doctor.Username" /></div> -->
            <div v-else><button @click="showDoctorConfirm('Doctor', 'Bác sĩ')" class="btn v-white-btn">{{__t('Xác nhận')}}</button></div>
          </div>
        </div>
      </template>
      <template v-if="DataSubmit.Version === 2">
        <formV2 :MASTERDATA="MASTERDATA" />
      </template>
      <modal name="doctorConfirm" transition="pop-out" id="doctor-login" height="auto" :clickToClose="false">
        <div class="box v-model-content-popup">
          <div class="box-header text-center">
            <h3 class="box-title">{{__t(popupTitle)}}.</h3>
            <div style="color: #fff">{{__t('Bác sĩ đang thực hiện tao tác xác nhận bảng hồi sinh tim phổi bao gồm thông tin hồi sinh tim phổi và bảng hồi sinh tim phổi. Để xác nhận, nhập thông tin đăng nhập phía dưới')}}</div>
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
      <div class="status-float-block">
        <div class="action-btn-block">
          <div class="container">
            <div class="content-container">
              <div class="row">
                <div class="col-md-2 col-sm-2">
                  <div class="form-group1">
                    <button class="btn btn-block v-white-btn" type="button" @click="back()"><i class="fa fa-angle-double-left" aria-hidden="true"></i> {{__t('Quay lại')}}</button>
                  </div>
                </div>
                <div class="col-md-4 col-sm-4">
                  <div class="form-group1">
                    <p class="hidden-text">hidden-text</p>
                  </div>
                </div>
                <div class="col-md-6 col-sm-6">
                  <div class="form-group1">
                    <button class="btn v-yellow-btn pull-right btn-block hvr-ripple-out" v-shortkey="['ctrl', 's']" @shortkey="save()" type="button" @click="save()"><i class="fa fa-floppy-o" aria-hidden="true"></i> {{__t('btn.luu')}}</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div>
      <LastUpdateWithFormCode :FormCode="'A03_050_050919_VE'" :DataSubmit="DataSubmit"/>
      <!-- <logs :EdId="this.$route.params.Id" :Type="'CardiacArrestRecord/Info'" :noDetail="true" />
      <p>A03_050_050919_VE</p> -->
    </div>
  </div>
</template>
<script>
import MixinMasterData from '@/mixins/masterdata.js'
import MixinForm from '@/mixins/form.js'
import _ from 'lodash'
import VDateTimePicker from '@/components/VDateTimePicker.vue'
import formV1 from './FormV1'
import formV2 from './FormV2'
import CardiacArrestRecord from '@/services/CardiacArrestRecord'
import NProgress from 'nprogress'
import Logs from '@/components/Logs.vue'
const masterCode = ['EIOCAARRE', 'EIOCAARRE', 'EIOCRRF']
export default {
  name: 'CardiacArrestRecordForm',
  props: ['formdata', 'VisitType'],
  mixins: [MixinMasterData, MixinForm],
  components: {
    VDateTimePicker, Logs, formV1, formV2
  },
  data () {
    return {
      loaded: false,
      DataSubmit: null,
      user: {},
      popupTitle: ''
    }
  },
  mounted () {
    this.getMasterDatas({Form: masterCode[this.formdata.Version]}, () => {
      this.getData()
    })
  },
  methods: {
    push2Wh (data) {
      if (data.Weight) this.MASTERDATA['EIOCAARREWEI'].Items[0].Value = data.Weight
      if (data.Height) this.MASTERDATA['EIOCAARREHEI'].Items[0].Value = data.Height
    },
    confirm () {
      new CardiacArrestRecord(this.VisitType).update('Confirm/' + this.$route.params.Id, this.user).then(response => {
        this.$modal.hide('doctorConfirm')
        // this.reload()
        this.toastedSuccess(this.$t('Xác nhận thành công'))
      }).catch(e => {
        this.$modal.hide('doctorConfirm')
      })
    },
    showDoctorConfirm (kind, title, id) {
      this.confirmId = id
      this.popupTitle = title
      this.user.kind = kind
      this.$modal.show('doctorConfirm')
    },
    save () {
      var obj = {}
      NProgress.start()
      this.DataSubmit.Datas = []
      for (const property in this.MASTERDATA) {
        if (this.MASTERDATA[property].Items) {
          this.MASTERDATA[property].Items.forEach(item => {
            var val = item.Value
            if (item.Code === 'EIOJCGMJCTANS' && typeof item.Value === 'object') {
              val = this.moment2String(item.Value, this.vDateFormat)
            }
            if (item.Code === 'EIOCAARRETIMANS' && typeof item.Value === 'object') {
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
      new CardiacArrestRecord(this.VisitType).update('Info/' + this.$route.params.Id, this.DataSubmit).then(response => {
        this.toastedSuccess()
        this.edited = false
      })
    },
    getData () {
      this.DataSubmit = this.formdata
      if (this.MASTERDATA['EIOCAARRETIM'] && !this.MASTERDATA['EIOCAARRETIM'].Items[0].Value) this.MASTERDATA['EIOCAARRETIM'].Items[0].Value = new Date()
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
            }
          })
        }
      }
      this.loaded = true
    }
  }
}
</script>
