<template>
  <div class="main-content disable_ccp" id="di0-page" :class="{'readonly-form': readonly}" v-if="hasData">
    <h2 class="text-center">{{__t('Xét nghiệm tại chỗ - Sinh hóa máu Catridge CHEM8+')}}</h2>
    <h4 class="text-center" v-if="DataSubmit.Specialty">{{__t('Khoa')}}: <b>{{__label(DataSubmit.Specialty)}}</b></h4>
    <br/>
    <template v-if="hasData">
    <table class="table header-table">
      <tr>
        <th rowspan="2">{{__t('Stt')}}</th>
        <th rowspan="2" colspan="2" class="text-center">{{__t('Thông số')}}</th>
        <th rowspan="2">{{__t('Khoảng tham chiếu')}}</th>
        <th colspan="2" class="text-center">{{__t('Chỉ số báo động')}}</th>
        <th colspan="3" class="no-wrap text-center">{{__t('Kết quả')}}</th>
      </tr>
      <tr>
        <th class="no-wrap">{{__t('Giá trị thấp')}}</th>
        <th class="no-wrap">{{__t('Giá trị cao')}}</th>
        <th class="no-wrap text-center">{{__t('Kết quả')}}</th>
        <th>{{__t('Đơn vị')}}</th>
        <th class="text-center">{{__t('Hình ảnh')}} <button v-if="!readonly" class="btn btn-sync-data" @click="openFile()"><i class="fa fa-upload" aria-hidden="true"></i> {{__t('Tải ảnh')}}</button></th>
      </tr>
      <tbody>
        <tr :data="item" :key="index" v-for="(item, index) in DataSubmit.Datas">
          <template v-if="index === 8 || index === 6 || index === 7">
            <td class="align-middle" rowspan="3" v-if="index === 6">{{item.Order}}</td>
            <td class="align-middle" rowspan="3" v-if="index === 6">{{item.Name}}</td>
          </template>
          <template v-else-if="index === 3 || index === 4">
            <td class="align-middle" rowspan="2" v-if="index === 3">{{item.Order}}</td>
            <td class="align-middle" rowspan="2" v-if="index === 3">{{item.Name}}</td>
          </template>
          <template v-else>
            <td>{{item.Order}}</td>
            <td>{{item.Name}}</td>
          </template>
          <td>{{item.ViAge}}</td>
          <template v-if="index === 8 || index === 6 || index === 7">
            <td class="align-middle" rowspan="3" v-if="index === 6">
              {{item.LowerLimit || 'N/A'}} - {{item.HigherLimit || 'N/A'}}
            </td>
            <td class="align-middle" rowspan="3" v-if="index === 6">{{item.LowerAlert ? '≤' + item.LowerAlert : 'N/A'}}</td>
          </template>
          <template v-else>
            <template v-if="index === 3 || index === 4">
              <td class="align-middle" rowspan="2" v-if="index === 3">{{item.LowerLimit || 'N/A'}} - {{item.HigherLimit || 'N/A'}}</td>
            </template>
            <template v-else>
              <td>
                {{item.LowerLimit || 'N/A'}} - {{item.HigherLimit || 'N/A'}}
              </td>
            </template>
            <td>{{item.LowerAlert ? '≤' + item.LowerAlert : 'N/A'}}</td>
          </template>
          <td>{{item.HigherAlert ? '≥' + item.HigherAlert : 'N/A'}}</td>
          <td>
            <input type="text" v-if="!readonly" class="form-control w80" v-model="item.Result" />
            <span v-else :class="wlabel(item.Result, item.LowerAlert, item.HigherAlert)">
              {{item.Result}}
            </span>
          </td>
          <template v-if="index === 8 || index === 6 || index === 7">
            <td class="align-middle" rowspan="3" v-if="index === 6">{{item.Unit}}</td>
          </template>
          <template v-else>
            <td>{{item.Unit}}</td>
          </template>
          <td width="220px" v-if="index === 0" :rowspan="DataSubmit.Datas.length">
            <drop-files :readonly="readonly" id="mini-upload" v-if="DataSubmit.Datas" v-model="DataSubmit.Upload" :dataDropfile="dataDropfile"/>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="row">
      <div class="col-md-6 col-sm-6">
        <p class="text-center">{{DataSubmit.ExecutionTime}}</p>
        <eform-signature v-if="DataSubmit.ExecutionUser" :ad="DataSubmit.ExecutionUser.Username" :title="__t('Người làm xét nghiệm')" />
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
        <button class="btn v-white-btn btn-block" v-shortkey="['ctrl', 'p']" @shortkey="print()" @click="print()"><i class="fa fa-print" aria-hidden="true"></i> {{__t('In')}}</button>
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
    <div v-if="DataSubmit && hasData" hidden id="printChemicalBiologyTest">
      <chemical-biology-test-print :Data="DataSubmit" />
    </div>
    <br/>
    <br/>
    <br/>
    <p>A03_039_050919_V</p>
  </div>
</template>
<script>
/*
 * The home index page.
 */
import MixinForm from '@/mixins/form.js'
import EDPointOfCareTesting from '@/services/ED/EDPointOfCareTesting'
import ChemicalBiologyTestPrint from '@/components/ED/PointOfCareTesting/ChemicalBiologyTest.vue'
import DropFiles from '@/components/DropFiles.vue'
// import NProgress from 'nprogress'
import moment from 'moment'
import $ from 'jquery'
import UploadFileService from '@/services/IPD/UploadFileService'
export default {
  /**
   * The name of the page.
   */
  name: 'ChemicalBiologyTestV1',
  props: ['formId', 'viewOnly', 'VisitType', 'VisitId'],
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
      firstData: null,
      IsLocked: false,
      FormCode: 'A03_039_050919_V'
    }
  },
  /**
   * The components that the page can use.
   */
  components: {
    DropFiles, ChemicalBiologyTestPrint
  },
  watch: {
    $route (to, from) {
      this.getData()
    },
    formId () {
      this.getData()
    }
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
  methods: {
    print () {
      this.$htmlToPaper('printChemicalBiologyTest', false, 'A03_039_050919_V')
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
      new EDPointOfCareTesting({VisitType: this._VisitType}).update('/ChemicalBiologyTest/Accept/' + `${this.FormCode}/` + this._VisitId + '/' + this._ItemId, this.user).then(response => {
        this.toastedSuccess()
        this.reload()
        this.$modal.hide('doctorConfirm')
      })
    },
    openFile () {
      $('#dropzone').click()
    },
    create () {
      new EDPointOfCareTesting({VisitType: this._VisitType}).update('ChemicalBiologyTest/Create/' + `${this.FormCode}/` + this._VisitId + '/' + this._ItemId, {}).then(response => {
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
      var arr = this.DataSubmit.Upload ? this.DataSubmit.Upload : []
      new EDPointOfCareTesting({VisitType: this._VisitType}).update('/ChemicalBiologyTest/Update/' + `${this.FormCode}/` + this._VisitId + '/' + this._ItemId, this.DataSubmit).then(response => {
        // this.readonly = true
        this.removedFile(arr)
        this.toastedSuccess()
        // this.reload()
        this.getData()
      })
    },
    getData () {
      this.hasData = false
      new EDPointOfCareTesting({VisitType: this._VisitType, hidemsg: true}).find('ChemicalBiologyTest/' + `${this.FormCode}/` + this._VisitId + '/' + this._ItemId).then(response => {
        if (this._VisitType === 'IPD') {
          this.IsLocked = response.IsLocked
          this.DataSubmit = response.response
          this.DataSubmit.Upload = this.JSONParse(response.response.Upload)
        } else {
          this.DataSubmit = response
          this.DataSubmit.Upload = this.JSONParse(response.Upload)
        }
        this.dataDropfile = {
          ...this.dataDropfile,
          contentImg: 'Tóm tắt thủ thuật can thiệp động mạch vành',
          titleImg: 'Hình ảnh được lấy từ biểu mẫu Tóm tắt thủ thuật can thiệp động mạch vành',
          visittypeImg: this._VisitType,
          visitidImg: this._VisitId,
          formidImg: this.DataSubmit.Id || this.DataSubmit.ID
        }
        this.readonly = (this.DataSubmit.DoctorAccept && this.DataSubmit.DoctorAccept.Username) || this.formId || this.IsLocked
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
        title: 'Thông báo',
        text: 'Dữ liệu bạn đang làm có thể bị mất nếu chưa lưu',
        class: 'v-dialog v-dialog-warning',
        buttons: [
          {
            title: 'Đồng ý',
            class: 'btn btn-warning',
            handler: () => {
              this.$modal.hide('dialog')
              this.back()
            }
          },
          {
            title: 'Huỷ bỏ',
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
