<template>
  <div>
    <div class="tab-form-content padding-form" v-if="DataSubmit">
      <div class="tab-form-content">
        <div>
          <div class="row">
            <div class="col-md-12">
              <div class="form-group">
                <label v-if="MASTERDATA['EIOCAARRETIM']">{{__label(MASTERDATA['EIOCAARRETIM'])}}: <v-date-time-picker v-model="MASTERDATA['EIOCAARRETIM'].Items[0].Value" class="select-boox" :format="vDateTimeFormat"/></label>
                <label style="margin-left: 10px" v-if="MASTERDATA['EIOCAARREWEI']">{{__label(MASTERDATA['EIOCAARREWEI'])}}: <input v-model="MASTERDATA['EIOCAARREWEI'].Items[0].Value" class="form-control input-md"/></label> kg
                <label style="margin-left: 10px" v-if="MASTERDATA['EIOCAARREHEI']">{{__label(MASTERDATA['EIOCAARREHEI'])}}: <input v-model="MASTERDATA['EIOCAARREHEI'].Items[0].Value" class="form-control input-md"/></label> cm
                <height-and-weight  @copy="push2Wh"/>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12" v-if="MASTERDATA['EIOCAARREDIA']">
              <div class="form-group">
                <label>{{__label(MASTERDATA['EIOCAARREDIA'])}}<i class="unit-label" v-if="MASTERDATA['EIOCAARREDIA'].Note"> {{MASTERDATA['EIOCAARREDIA'].Note}}</i>:</label>
                <div :value="item" :key="index + '-' + item.Code"  v-for="(item, index) in MASTERDATA['EIOCAARREDIA'].Items">
                  <textarea-autosize :data-code="item.Code" :id="item.Code" :value="item" class="form-control" rows="3" :placeholder="__label(item)" v-model="item.Value"/>
                </div>
              </div>
            </div>
          </div>
          <table class="table v-table-1">
            <tr v-if="MASTERDATA['EIOCAARRELOA']">
              <th rowspan="2" style="width: 150px">
                {{__label(MASTERDATA['EIOCAARRELOA'])}}
              </th>
              <td>
                <div class="flex-box">
                  <label class="flex-box-label">{{__label(MASTERDATA['EIOCAARRELOA'].Items[0])}}: </label>
                  <div class="group-radio no-flex" style="flex-grow: 1;">
                    <span v-if="index > 0 && index < 4" :data="item" :key="'EIOSOSCSIPNDB-' + index" v-for="(item, index) in MASTERDATA['EIOCAARRELOA'].Items">
                      <input type="checkbox" :id="'EIOCAARRELOAradio-' + index" v-model="item.Value">
                      <label :for="'EIOCAARRELOAradio-' + index" @click="checkbox2Radio(MASTERDATA['EIOCAARRELOA'].Items, item)">{{__label(item)}}</label>
                    </span>
                    <input v-if="MASTERDATA['EIOCAARRELOA'].Items[3].Value" style="flex-grow: 1;" class="form-control" v-model="MASTERDATA['EIOCAARRELOA'].Items[4].Value" />
                  </div>
                </div>
              </td>
            </tr>
            <tr v-if="MASTERDATA['EIOCAARRELOA']">
              <td>
                <div class="flex-box">
                  <label class="flex-box-label">{{__label(MASTERDATA['EIOCAARRELOA'].Items[5])}}: </label>
                  <div class="group-radio no-flex" style="flex-grow: 1;">
                    <span  v-if="index >= 6 && index < 11" :data="item" :key="'EIOSOSCSIPNDB2-' + index" v-for="(item,index) in MASTERDATA['EIOCAARRELOA'].Items">
                      <input type="checkbox" :id="'EIOCAARRELOAradio-' + index" v-model="item.Value">
                      <label :for="'EIOCAARRELOAradio-' + index" @click="checkbox2Radio(MASTERDATA['EIOCAARRELOA'].Items, item)">{{__label(item)}}</label>
                    </span>
                    <input v-if="MASTERDATA['EIOCAARRELOA'].Items[10].Value" class="form-control" v-model="MASTERDATA['EIOCAARRELOA'].Items[11].Value" />
                  </div>
                </div>
              </td>
            </tr>
            <tr v-if="MASTERDATA['EIOCAARRECCA']">
              <th style="width: 200px">
                {{__label(MASTERDATA['EIOCAARRECCA'])}}
              </th>
              <td>
                <div class="rows">
                  <div class="col-md-6 col-sm-6" :data="item" :key="index" v-for="(item, index) in MASTERDATA['EIOCAARRECCA'].Items" v-if="index !== 1">
                    <div class="flex-box flex-center">
                      <div class="v-checkbox">
                        <input type="checkbox" :id="'PHCSCFradio-' + index" v-model="item.Value">
                        <label @click="checkbox2Radio(MASTERDATA['EIOCAARRECCA'].Items, item)" :for="'PHCSCFradio-' + index"></label>
                      </div>
                      <span class="displaytbl" :class="{'no-wrap': index === 0}"><span>{{__label(item)}}</span></span>
                      <input v-if="MASTERDATA['EIOCAARRECCA'].Items[0].Value && index === 0" class="form-control" v-model="MASTERDATA['EIOCAARRECCA'].Items[1].Value" />
                    </div>
                  </div>
                </div>
              </td>
            </tr>
            <tr v-if="MASTERDATA['EIOCAARREMR0']">
              <th style="width: 150px">
                {{__label(MASTERDATA['EIOCAARREMR0'])}}
              </th>
              <td>
                <div class="group-radio" style="flex-grow: 1;">
                  <span :data="item" :key="'EIOSOSCSIPNDB-' + index" v-for="(item,index) in MASTERDATA['EIOCAARREMR0'].Items">
                    <input type="checkbox" :id="'EIOCAARREMR0radio-' + index" v-model="item.Value">
                    <label :for="'EIOCAARREMR0radio-' + index" @click="checkbox2Radio(MASTERDATA['EIOCAARREMR0'].Items, item)">{{__label(item)}}</label>
                  </span>
                </div>
              </td>
            </tr>
            <tr v-if="MASTERDATA['EIOCAARREVEN']">
              <th style="width: 150px">
                {{__label(MASTERDATA['EIOCAARREVEN'])}}
              </th>
              <td>
                <div class="flex-box">
                  <div class="">
                    <div class="group-radio no-nowrap">
                      <span>
                        <input type="checkbox" :id="'EIOCAARREVENradio-' + 0" v-model="MASTERDATA['EIOCAARREVEN'].Items[0].Value">
                        <label :for="'EIOCAARREVENradio-' + 0" @click="checkbox2Radio(MASTERDATA['EIOCAARREVEN'].Items, MASTERDATA['EIOCAARREVEN'].Items[0])">{{__label(MASTERDATA['EIOCAARREVEN'].Items[0])}}</label>
                      </span>
                    </div>
                  </div>
                  <div class="">
                    <div class="group-radio no-nowrap">
                      <span>
                        <input type="checkbox" :id="'EIOCAARREVENradio-' + 1" v-model="MASTERDATA['EIOCAARREVEN'].Items[1].Value">
                        <label :for="'EIOCAARREVENradio-' + 1" @click="checkbox2Radio(MASTERDATA['EIOCAARREVEN'].Items, MASTERDATA['EIOCAARREVEN'].Items[1])">{{__label(MASTERDATA['EIOCAARREVEN'].Items[1])}}</label>
                      </span>
                      <input style="flex-grow: 1;" v-if="MASTERDATA['EIOCAARREVEN'].Items[1].Value" class="form-control" v-model="MASTERDATA['EIOCAARREVEN'].Items[2].Value" />
                    </div>
                  </div>
                  <div class="">
                    <div class="group-radio no-nowrap">
                      <span>
                        <input type="checkbox" :id="'EIOCAARREVENradio-' + 3" v-model="MASTERDATA['EIOCAARREVEN'].Items[3].Value">
                        <label :for="'EIOCAARREVENradio-' + 3" @click="checkbox2Radio(MASTERDATA['EIOCAARREVEN'].Items, MASTERDATA['EIOCAARREVEN'].Items[3])">{{__label(MASTERDATA['EIOCAARREVEN'].Items[3])}}</label>
                      </span>
                      <input style="flex-grow: 1;" v-if="MASTERDATA['EIOCAARREVEN'].Items[3].Value" class="form-control" v-model="MASTERDATA['EIOCAARREVEN'].Items[4].Value" />
                    </div>
                  </div>
                </div>
                <br/>
                <div class="flex-box">
                  <div class="">
                    <div class="group-radio no-nowrap">
                      <span>
                        <input type="checkbox" :id="'EIOCAARREVENradio-' + 5" v-model="MASTERDATA['EIOCAARREVEN'].Items[5].Value">
                        <label :for="'EIOCAARREVENradio-' + 5" @click="checkbox2Radio(MASTERDATA['EIOCAARREVEN'].Items, MASTERDATA['EIOCAARREVEN'].Items[5])">{{__label(MASTERDATA['EIOCAARREVEN'].Items[5])}}</label>
                      </span>
                      <input style="flex-grow: 1;" v-if="MASTERDATA['EIOCAARREVEN'].Items[5].Value" class="form-control" v-model="MASTERDATA['EIOCAARREVEN'].Items[6].Value" />
                    </div>
                  </div>
                  <div class="">
                    <div class="group-radio no-nowrap">
                      <span>
                        <input type="checkbox" :id="'EIOCAARREVENradio-' + 7" v-model="MASTERDATA['EIOCAARREVEN'].Items[7].Value">
                        <label :for="'EIOCAARREVENradio-' + 7" @click="checkbox2Radio(MASTERDATA['EIOCAARREVEN'].Items, MASTERDATA['EIOCAARREVEN'].Items[7])">{{__label(MASTERDATA['EIOCAARREVEN'].Items[7])}}</label>
                      </span>
                    </div>
                  </div>
                  <div class="">
                    <div class="group-radio no-nowrap">
                      <span>
                        <input type="checkbox" :id="'EIOCAARREVENradio-' + 8" v-model="MASTERDATA['EIOCAARREVEN'].Items[8].Value">
                        <label :for="'EIOCAARREVENradio-' + 8" @click="checkbox2Radio(MASTERDATA['EIOCAARREVEN'].Items, MASTERDATA['EIOCAARREVEN'].Items[8])">{{__label(MASTERDATA['EIOCAARREVEN'].Items[8])}}</label>
                      </span>
                      <input style="flex-grow: 1;" v-if="MASTERDATA['EIOCAARREVEN'].Items[9] && MASTERDATA['EIOCAARREVEN'].Items[8].Value" class="form-control" v-model="MASTERDATA['EIOCAARREVEN'].Items[9].Value" />
                    </div>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <th style="width: 150px">
                {{__label(MASTERDATA['EIOCAARRENOT'])}}
              </th>
              <td>
                <div :data="item" :key="'EIOCAARRENOT-' + index" v-for="(item,index) in MASTERDATA['EIOCAARRENOT'].Items">
                  <textarea-autosize :data-code="item.Code" :id="item.Code" :data="item" class="form-control" rows="3" :placeholder="__label(item)"  v-model="item.Value"/>
                </div>
              </td>
            </tr>
          </table>
          <br/><br/>
          <div class="row" style="margin-top:30px">
            <div class="col-md-4 col-sm-4 text-center">
            </div>
            <div class="col-md-4 col-sm-4 text-center">
            </div>
            <div class="col-md-4 col-sm-4 text-center">
              <p v-if="DataSubmit.DoctorComfirm">{{DataSubmit.DoctorComfirm}}</p>
              <div><b>{{__t('Bác sĩ')}}</b></div>
              <EformSignature2 v-if="DataSubmit.TeamLeader && DataSubmit.TeamLeader.Username" :ad="DataSubmit.TeamLeader.Username"/>
              <!-- <div v-else><button @click="showDoctorConfirm('TeamLeader', 'Nhóm trưởng ký')" class="btn v-white-btn">{{__t('Xác nhận')}}</button></div> -->
              <!-- <div v-if="DataSubmit.DoctorComfirm"><ad-Info :ad="DataSubmit.Doctor.Username" /></div> -->
              <div v-else>
                <ad-Info :ad="DataSubmit.CreatedBy" class="mb-5"/>
                <button @click="showDoctorConfirm('Doctor', 'Bác sĩ')" class="btn v-white-btn">{{__t('Xác nhận')}}</button>
              </div>
            </div>
          </div>
          <br/><br/>
        </div>
        <p>{{__t('Chỉnh sửa lần cuối bởi')}} <AdInfo v-if="DataSubmit.UpdatedBy" :ad="DataSubmit.UpdatedBy" /> {{__t('lúc')}} {{ DataSubmit.UpdatedAt | formatDateWithoutSecon}}</p>
      </div>
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
      <logs :EdId="this.$route.params.Id" :Type="'CardiacArrestRecord/Info'" :noDetail="true" />
      <p>A03_050_050919_VE</p>
    </div>
  </div>
</template>
<script>
import MixinMasterData from '@/mixins/masterdata.js'
import MixinForm from '@/mixins/form.js'
import _ from 'lodash'
import VDateTimePicker from '@/components/VDateTimePicker.vue'
import CardiacArrestRecord from '@/services/CardiacArrestRecord'
import NProgress from 'nprogress'
import Logs from '@/components/Logs.vue'
export default {
  name: 'CardiacArrestRecordForm',
  props: ['formdata', 'VisitType'],
  mixins: [MixinMasterData, MixinForm],
  components: {
    VDateTimePicker, Logs
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
    this.getMasterDatas({Form: 'EIOCAARRE'}, () => {
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
        this.relaod()
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
        this.reload()
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
