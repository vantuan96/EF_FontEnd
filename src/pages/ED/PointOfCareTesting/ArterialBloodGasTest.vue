<template>
  <div class="main-content disable_ccp" id="di0-page" :class="{'readonly-form': readonly}" v-if="hasData">
    <h2 class="text-center">{{__t('Xét nghiệm tại chỗ - Khí máu Cartridge CG4+')}}</h2>
    <h4 class="text-center" v-if="DataSubmit.Specialty">{{__t('Khoa')}}: <b>{{__label(DataSubmit.Specialty)}}</b></h4>
    <template v-if="hasData">
    <div class="box no-border">
      <div class="box-body">
        <div class="row">
          <div class="col-md-2">
            <div class="group-radio">
              <b class="flex-box-label">{{__t('Thông số bệnh nhân')}}</b>
            </div>
          </div>
          <div class="col-md-8">
            <div class="group-radio">
              <span class="flex-box-label">{{__t('Máy thở')}}</span>
              <span>
                <input id="status_yes" name="status" type="radio" value="true" v-model="DataSubmit.UseBreathingMachine">
                <label for="status_yes">{{__t('Có')}}</label>
              </span>
              <span>
                <input id="status_no" name="status" type="radio" value="false" v-model="DataSubmit.UseBreathingMachine">
                <label for="status_no">{{__t('Không')}}</label>
              </span>
            </div>
          </div>
        </div>
        <table class="table table-bordered table-bordered-x">
          <thead>
            <tr>
              <th>{{__t('Mode thở')}}</th>
              <th>{{__t('Huyết áp')}}<span class="unit-label">(mmHg)</span></th>
              <th colspan="2">Vt/f</th>
              <th>{{__t('Nhịp thở')}}</th>
              <th>{{__t('FIO2')}}<span class="unit-label">(%)</span></th>
              <th>{{__t('Nhiệt độ (Độ C)')}}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <input v-if="!readonly" class="form-control" v-model="DataSubmit.BreathingMode"/>
                <b class="no-wrap" v-else>{{DataSubmit.BreathingMode || 'N/A'}}</b>
              </td>
              <td>
                <input v-if="!readonly" class="form-control" v-model="DataSubmit.BP"/>
                <b class="no-wrap" v-else>{{DataSubmit.BP || 'N/A'}}</b>
              </td>
              <td>
                <div class="input-group" v-if="!readonly">
                  <span class="input-group-addon">Vt:</span>
                  <input class="form-control" v-model="DataSubmit.Vt"/>
                </div>
                <b class="no-wrap" v-else>Vt: {{DataSubmit.Vt || 'N/A'}}</b>
              </td>
              <td>
                <div class="input-group" v-if="!readonly">
                  <span class="input-group-addon">f:</span>
                  <input class="form-control" v-model="DataSubmit.F"/>
                </div>
                <b class="no-wrap" v-else>f: {{DataSubmit.F || 'N/A'}}</b>
              </td>
              <td>
                <input v-if="!readonly" class="form-control" v-model="DataSubmit.RR"/>
                <b class="no-wrap" v-else>{{DataSubmit.RR || 'N/A'}}</b>
              </td>
              <td>
                <input v-if="!readonly" class="form-control" v-model="DataSubmit.FIO2"/>
                <b class="no-wrap" v-else>{{DataSubmit.FIO2 || 'N/A'}}</b>
              </td>
              <td>
                <input v-if="!readonly" class="form-control" v-model="DataSubmit.T"/>
                <b class="no-wrap" v-else>{{DataSubmit.T || 'N/A'}}</b>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <table class="table header-table">
      <tr>
        <th rowspan="2">{{__t('Stt')}}</th>
        <th rowspan="2" colspan="2" class="text-center">{{__t('Thông số')}}</th>
        <th rowspan="2">{{__t('Khoảng tham chiếu')}}</th>
        <th colspan="2" class="text-center">{{__t('Chỉ số báo động')}}</th>
        <th colspan="3" class="text-center">{{__t('Kết quả')}}</th>
      </tr>
      <tr>
        <th>{{__t('Giá trị thấp')}}</th>
        <th>{{__t('Giá trị cao')}}</th>
        <th class="text-center">{{__t('Kết quả')}}</th>
        <th>{{__t('Đơn vị')}}</th>
        <th class="text-center">{{__t('Hình ảnh')}} <button v-if="!readonly" class="btn btn-sync-data" @click="openFile()"><i class="fa fa-upload" aria-hidden="true"></i> {{__t('Tải ảnh')}}</button></th>
      </tr>
      <tbody>
        <tr :data="item" :key="index" v-for="(item, index) in DataSubmit.Datas">
          <td>{{item.Order}}</td>
          <td><unit :unit="item.Name" /></td>
          <td>{{item.ViAge}}</td>
          <td>
            <template v-if="index === 4">
              ({{item.LowerLimit || 'N/A'}}) - (+{{item.HigherLimit || 'N/A'}})
            </template>
            <template v-else>
              {{item.LowerLimit || 'N/A'}} - {{item.HigherLimit || 'N/A'}}
            </template>
          </td>
          <td>{{item.LowerAlert ? '≤' + item.LowerAlert : 'N/A'}}</td>
          <td>{{item.HigherAlert ? '≥' + item.HigherAlert : 'N/A'}}</td>
          <td>
            <!-- @keypress="inputKeyPressNumber(item.Result, $event)" -->
            <input type="text" v-if="!readonly" class="form-control w80" v-model="item.Result" />
            <span v-else :class="wlabel(item.Result, item.LowerAlert, item.HigherAlert)">
              {{item.Result}}
            </span>
          </td>
          <td>{{item.Unit}}</td>
          <td width="220px" v-if="index === 0" :rowspan="DataSubmit.Datas.length">
            <drop-files :readonly="readonly" id="mini-upload" v-if="DataSubmit.Datas" v-model="DataSubmit.Upload" :dataDropfile="dataDropfile"/>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="row">
      <div class="col-md-6 col-sm-6">
        <p class="text-center">{{DataSubmit.ExecutionTime}}</p>
        <eform-signature v-if="DataSubmit.ExecutionUser" :ad="DataSubmit.ExecutionUser.Username" :title="'Người làm xét nghiệm'" />
      </div>
      <div class="col-md-6 col-sm-6 text-center">
        <template v-if="(DataSubmit.DoctorAccept && DataSubmit.DoctorAccept.Username)">
          <p class="text-center">{{DataSubmit.AcceptTime}}</p>
          <eform-signature :ad="DataSubmit.DoctorAccept.Username" :title="'Bác sĩ thực hiện'" />
        </template>
        <template v-else>
          <p>{{DataSubmit.Accept}}</p>
          <p><b>{{__t('Bác sĩ chỉ định')}}:</b></p>
          <p v-if="viewOnly">Chưa xác nhận</p>
          <p v-else><button @click="$modal.show('doctorConfirm')" class="btn v-white-btn">{{__t('Xác nhận')}}</button></p>
        </template>
      </div>
    </div>
    <br/>
    <br/>
    <div class="row" v-if="!viewOnly">
      <div class="col-md-3 col-sm-3">
        <button class="btn v-white-btn btn-block" @click="handleBack">{{__t('btn.back')}}</button>
      </div>
      <div class="col-md-3 col-sm-3">
        <button class="btn v-white-btn btn-block" v-shortkey="['ctrl', 'p']" @shortkey="print()" @click="print()"><i class="fa fa-print" aria-hidden="true"></i> {{__t('btn.print')}}</button>
      </div>
      <div class="col-md-6 col-sm-6" v-if="!readonly">
        <button class="btn v-yellow-btn btn-block" v-shortkey="['ctrl', 's']" @shortkey="submit()" @click="submit()"><i class="fa fa-floppy-o" aria-hidden="true"></i> {{__t('btn.save')}}</button>
      </div>
    </div>
    </template>
    <div v-else class="text-center">
      <button @click="create()" class="btn btn-warning">{{__t('Tạo phiếu')}}</button>
    </div>
    <modal name="doctorConfirm" transition="pop-out" id="doctor-login" height="auto" :clickToClose="false">
      <div class="box v-model-content-popup">
        <div class="box-header text-center">
          <h3 class="box-title">{{__t('Bác sĩ xác nhận')}}.</h3>
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
        </div>
      </div>
    </modal>
    <div v-if="DataSubmit && hasData" hidden id="printArterialBloodGasTest">
      <arterial-blood-gas-test-print :Data="DataSubmit" />
    </div>
    <br/>
    <br/>
    <br/>
    <p>A03_038_050919_V</p>
  </div>
</template>
<script>
/* ============
 * OS0 Page vi sao đặt tên là OS0 hỏi dungnv53
 * ============
 *
 * The home index page.
 */
import MixinForm from '@/mixins/form.js'
import EDPointOfCareTesting from '@/services/ED/EDPointOfCareTesting'
import DropFiles from '@/components/DropFiles.vue'
import ArterialBloodGasTestPrint from '@/components/ED/PointOfCareTesting/ArterialBloodGasTest.vue'
import UploadFileService from '@/services/IPD/UploadFileService'

// import NProgress from 'nprogress'
import moment from 'moment'
import $ from 'jquery'

export default {
  /**
   * The name of the page.
   */
  name: 'ArterialBloodGasTestList',
  props: ['formId', 'viewOnly', 'VisitType'],
  mixins: [MixinForm],
  data () {
    return {
      dataDropfile: {},
      DataSubmit: {
        Datas: [],
        DoctorAccept: null,
        ExecutionUser: null
      },
      now: '',
      user: {},
      hasData: false,
      readonly: true,
      firstData: null
    }
  },
  /**
   * The components that the page can use.
   */
  components: {
    DropFiles,
    ArterialBloodGasTestPrint
  },
  mounted () {
    this.getData()
    this.now = moment().format('HH:mm DD/MM/YYYY')
  },
  computed: {
    _ItemId () {
      return this.formId || this.$route.params.Item
    }
  },
  watch: {
    $route (to, from) {
      this.getData()
    },
    formId () {
      this.getData()
    }
  },
  methods: {
    print () {
      this.$htmlToPaper('printArterialBloodGasTest', false, 'A03_038_050919_V')
    },
    wlabel (current, LowerLimit, HigherLimit) {
      if (current && LowerLimit && current <= LowerLimit) {
        return 'label label-warning'
      }
      if (current && HigherLimit && current >= HigherLimit) {
        return 'label label-danger'
      }
      return ''
    },
    confirm () {
      new EDPointOfCareTesting({VisitType: this._VisitType}).update('/ArterialBloodGasTest/Accept/' + this._ItemId, this.user).then(response => {
        this.toastedSuccess()
        this.$modal.hide('doctorConfirm')
        this.reload()
      })
    },
    openFile () {
      $('#dropzone').click()
    },
    create () {
      new EDPointOfCareTesting({VisitType: this._VisitType}).update('ArterialBloodGasTest/create/' + this._ItemId, {}).then(response => {
        this.reload()
      })
    },
    removedFile (arr) {
      new UploadFileService({hidemsg: true}).update('File/DeleteFileFromForms/' + this._ItemId, {Urls: arr.toString()}).then(response => {
      }).catch(err => {
        console.log(err)
      })
    },
    submit () {
      var arr = this.MASTERDATA['PCKPTTT66'].Items[0].Value ? this.MASTERDATA['PCKPTTT66'].Items[0].Value : []
      console.log('data: ', this.DataSubmit)
      new EDPointOfCareTesting({VisitType: this._VisitType}).update('/ArterialBloodGasTest/update/' + this._ItemId, this.DataSubmit).then(response => {
        // this.readonly = true
        this.removedFile(arr)
        this.toastedSuccess()
        // this.reload()
        this.getData()
      })
    },
    getData () {
      this.hasData = false
      new EDPointOfCareTesting({VisitType: this._VisitType, hidemsg: true}).find('ArterialBloodGasTest/Detail/' + this._ItemId).then(response => {
        this.dataDropfile = {
          ...this.dataDropfile,
          contentImg: 'Tóm tắt thủ thuật can thiệp động mạch vành',
          titleImg: 'Hình ảnh được lấy từ biểu mẫu Tóm tắt thủ thuật can thiệp động mạch vành',
          visittypeImg: this._VisitType,
          visitidImg: this._VisitId,
          formidImg: response.Id || response.ID
        }
        this.DataSubmit = response
        this.DataSubmit.Upload = this.JSONParse(response.Upload)
        this.readonly = (this.DataSubmit.DoctorAccept && this.DataSubmit.DoctorAccept.Username) || this.viewOnly
        this.hasData = true
        this.firstData = JSON.stringify(this.DataSubmit)
      }).catch(e => {
        if (e.status === 404) {
          this.hasData = false
        }
      })
    },
    handleBack () {
      if (this.firstData !== JSON.stringify(this.DataSubmit)) {
        this.confirmPopup()
      } else {
        this.back()
      }
    },
    confirmPopup () {
      this.$modal.show('dialog', {
        clickToClose: false,
        title: this.__t('Thông báo'),
        text: this.__t('Dữ liệu bạn đang làm có thể bị mất nếu chưa lưu'),
        class: 'v-dialog v-dialog-warning',
        buttons: [
          {
            title: this.__t('Đồng ý'),
            class: 'btn btn-warning',
            handler: () => {
              this.$modal.hide('dialog')
              this.back()
            }
          },
          {
            title: this.__t('Hủy bỏ'),
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
