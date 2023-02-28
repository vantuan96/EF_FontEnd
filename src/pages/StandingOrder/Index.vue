<template>
  <div id="StandingOrder-Page" class="main-content">
    <h1 class="text-center">{{__t('Ghi nhận thực hiện thuốc Standing Order')}}</h1>
    <table class="standing-order-tbl">
      <tr>
        <th width="40">{{__t('STT')}}</th>
        <th>{{__t('Tên phác đồ/ Ghi chú')}}</th>
        <th width="250">{{__t('Tên thuốc, nồng độ, hàm lượng')}}</th>
        <th width="160">{{__t('Liều dùng')}}</th>
        <th width="100">{{__t('Đường dùng')}}</th>
        <th width="190">{{__t('standingoder')}}</th>
        <th width="150">{{__t('Thời điểm dùng')}}</th>
      </tr>
      <template :data="item" v-for="(item,index) in dataSubmit.Datas">
        <template v-if="item.IsConfirm">
          <tr v-bind:key="index">
            <td rowspan="2" align="center">{{index + 1}}</td>
            <td>{{item.StandingOrderName}}</td>
            <td class="wrap">{{item.Drug}}</td>
            <td class="wrap">{{item.Dosage}}</td>
            <td class="wrap">{{item.Route}}</td>
            <td class="wrap"><p>{{item.Note}}</p></td>
            <td>{{item.UsedAt | formatDateTime}}</td>
          </tr>
          <tr v-bind:key="index + 'ex'">
            <td style="border: none;">
              <template v-if="Version >= 7">
                <ConfirmDoctor :item="item"/>
              </template>
              <template v-else>
                <span v-if="item.MedicalStaffName" style="display: inline-flex;">
                  <div><i class="v-icon v-icon-doctor"></i></div>
                  <div style="display: grid; margin-left: 5px;">
                    <b>{{__t('Bác sĩ xác nhận')}}</b>
                    <!-- <h3 class="box-title">{{__t('Bác sĩ xác nhận')}}</h3> -->
                    <!-- <div style="color: #fff">{{__t('Vui lòng nhập tài khoản ad để xác nhận')}}</div> -->
                    <ad-Info :ad="item.DoctorConfirm" />
                  </div>
                </span>
              </template>
            </td>
            <td colspan="4" style="border: none;">
              <template v-if="Version >= 7">
                <span v-if="item.MedicalStaffName" style="display: inline-flex;">
                  <div><i :class="{
                      'v-icon v-icon-doctor': item.Position.includes('Doctor'),
                      'v-icon v-icon-nurse': item.Position.includes('Nurse'),
                      'v-icon v-icon-medical-secretary': item.Position.includes('Medical Secretary'),
                      'v-icon v-icon-administrator': item.Position.includes('Administrator')
                      }" aria-hidden="true"></i></div>
                  <div style="display: grid; margin-left: 5px;">
                    <SingleConfirm
                    :kind="'CREATEDCONFIRM_USERCREATED'"
                    :FormCode="'A03_029_050919_VE'"
                    :item="item" :readonly="isLocked"
                    :dataVerOld="item.MedicalStaffName"
                    @saveRow="saveRow"
                    @success="success"
                    :styleBtnCopy="'top: 0px!important; right: -50px!important;'"
                    :title="'Người tạo và thực hiện'"/>
                  </div>
                </span>
                <!-- <Confirm v-if="item" :isLocked="isLocked" @showDoctorConfirm="showDoctorConfirm" :item="item"/> -->
              </template>
              <template v-else-if="Version < 7">
                <span v-if="item.MedicalStaffName" style="display: inline-flex;">
                  <div><i :class="{
                      'v-icon v-icon-doctor': item.Position.includes('Doctor'),
                      'v-icon v-icon-nurse': item.Position.includes('Nurse'),
                      'v-icon v-icon-medical-secretary': item.Position.includes('Medical Secretary'),
                      'v-icon v-icon-administrator': item.Position.includes('Administrator')
                      }" aria-hidden="true"></i></div>
                  <div style="display: grid; margin-left: 5px;">
                    <b>{{__t('Người tạo và thực hiện')}}</b>
                    <ad-Info :ad="item.MedicalStaffName" />
                  </div>
                </span>
              </template>
            </td>
            <td style="border: none;"></td>
          </tr>
        </template>
        <template v-else>
          <tr v-bind:key="index + 'ey'">
            <td rowspan="2" align="center">{{index + 1}}</td>
            <td :class="{'error': item.error}">
              <v-select :multiple="false" v-if="!item.Id" v-model="item.StandingOrderMD" :filterable="false" :options="StandingOrders" @search="onSearch" @input="setSelected(item)" :placeholder="__t('Tên phác đồ')"
                style="background-color: #fff; min-width: 200px;">
                <template slot="no-options">
                  {{__t('Gõ để tìm phác đồ...')}}
                </template>
              </v-select>
              <b v-if="item.Id">{{item.StandingOrderName}}</b>
              <i v-if="item.error" class="error-text">{{__t('Vui lòng chọn phác đồ')}}</i>
            </td>
            <td class="wrap">{{item.Drug}}</td>
            <td class="wrap">{{item.Dosage}}</td>
            <td class="wrap">{{item.Route}}</td>
            <td>
              <textarea-autosize v-if="!item.Id"  rows="2" class="form-control" :placeholder="__t('Ghi chú')" v-model="item.Note"/>
              <p v-else>{{item.Note}}</p>
            </td>
            <td>
              <template v-if="!item.Id">
                <v-date-picker :format="vDateTimeFormat" v-model="item.UsedAt"/>
              </template>
              <template v-else>
                {{item.UsedAt | formatDateTime}}
              </template>
            </td>
          </tr>
          <tr v-bind:key="index + 'ez'">
            <td style="border: none;">
              <template v-if="Version >= 7 && isLocked">
                <ConfirmDoctor :item="item"/>
              </template>
              <template v-else>
                <button v-if="!item.IsConfirm && item.Id && !isLocked" class="btn pull-left v-yellow-btn" type="button" @click="confirm(item)">{{__t('Bác sĩ xác nhận')}}</button>
              </template>
            </td>
            <td colspan="4" style="border: none;">
              <template v-if="Version >= 7">
                <span v-if="item.MedicalStaffName" style="display: inline-flex;">
                  <div><i :class="{
                      'v-icon v-icon-doctor': item.Position.includes('Doctor'),
                      'v-icon v-icon-nurse': item.Position.includes('Nurse'),
                      'v-icon v-icon-medical-secretary': item.Position.includes('Medical Secretary'),
                      'v-icon v-icon-administrator': item.Position.includes('Administrator')
                      }" aria-hidden="true"></i></div>
                    <div style="display: grid; margin-left: 5px;">
                      <SingleConfirm
                      :kind="'CREATEDCONFIRM_USERCREATED'"
                      :FormCode="'A03_029_050919_VE'"
                      :item="item" :readonly="isLocked"
                      :dataVerOld="item.MedicalStaffName"
                      @saveRow="saveRow"
                      @success="success"
                      :styleBtnCopy="'top: 0px!important; right: -50px!important;'"
                      :title="'Người tạo và thực hiện'"/>
                    </div>
                </span>
                <!-- <Confirm v-if="item" :isLocked="isLocked" @showDoctorConfirm="showDoctorConfirm" :item="item"/> -->
              </template>
              <template v-else-if="Version < 7">
                <span v-if="item.MedicalStaffName" style="display: inline-flex;">
                  <div><i :class="{
                      'v-icon v-icon-doctor': item.Position.includes('Doctor'),
                      'v-icon v-icon-nurse': item.Position.includes('Nurse'),
                      'v-icon v-icon-medical-secretary': item.Position.includes('Medical Secretary'),
                      'v-icon v-icon-administrator': item.Position.includes('Administrator')
                      }" aria-hidden="true"></i></div>
                    <div style="display: grid; margin-left: 5px;">
                      <b>{{__t('Người tạo và thực hiện')}}</b>
                      <ad-Info :ad="item.MedicalStaffName" />
                    </div>
                </span>
              </template>
            </td>
            <td style="border: none;">
              <button v-if="!isLocked && ((!item.ConfirmCreated || (item.ConfirmCreated && item.ConfirmCreated.IsUnlockConfirm)) && !item.DoctorConfirm) && Version >= 7" type="button" class="btn v-yellow-btn pull-right" style="margin: 0px 0px 0px 10px;" @click="removeData(index, item)">{{__t('Xóa')}}</button>
              <button v-if="!isLocked && Version < 7" type="button" class="btn v-yellow-btn pull-right" style="margin: 0px 0px 0px 10px;" @click="removeData(index, item)">{{__t('Xóa')}}</button>
              <button v-if="!item.Id" type="button" class="btn v-yellow-btn pull-right" style="margin: 0px 0px 0px 10px;" @click="submit(item)">{{__t('Lưu')}}</button>
            </td>
          </tr>
        </template>
      </template>
    </table>
    <div class="text-center" style="margin-top: 10px;" v-if="!isLocked">
      <button type="button" class="btn btn-info" @click="addItem()">
        <span class="glyphicon glyphicon-plus"></span> {{__t('Thêm ghi nhận')}}
      </button>
    </div>
    <div v-if="hasConfirmBtn && !isLocked" class="text-right" style="margin-top: 10px;">
      <button type="button" class="btn v-yellow-btn" @click="confirmAll()">
        {{__t('Xác nhận tất cả thực hiện thuốc')}}
      </button>
    </div>
    <p>A03_029_050919_VE</p>
    <p>{{__t('Chỉnh sửa lần cuối bởi')}} <AdInfo v-if="dataSubmit.LastUpdated.UpdatedBy" :ad="dataSubmit.LastUpdated.UpdatedBy" /> {{__t('lúc')}} {{ dataSubmit.LastUpdated.UpdatedAt | formatDateHourMinutesDDMMYYY}} </p>
    <modal name="doctorConfirm" transition="pop-out" id="doctor-login" height="auto">
      <div class="box v-model-content-popup">
        <div class="box-header text-center">
          <!-- <h3 class="box-title">{{__t('Bác sĩ xác nhận')}}</h3> -->
          <h3 class="box-title">{{__t('Bác sĩ xác nhận')}}</h3>
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
            <div class="col-xs-8">
              <button type="button" class="btn btn-block v-yellow-btn" @click="confirmed(user.confirmAll)">{{__t('Xác nhận')}}</button>
            </div>
            <div class="col-xs-4">
              <button type="button" class="btn btn-block" @click="closeForm()">{{__t('Hủy')}}</button>
            </div>
          </div>
          <p style="margin-top: 10px; text-align:center"> {{__t('Sử dụng tài khoản máy tính')}}</p>
        </div>
      </div>
    </modal>
    <popupuser-created-confirm :popupTitle="popupTitle" :Id="Id" @popupSave="popupSave"/>
  </div>
</template>
<script>
import _ from 'lodash'
import Orders from '@/services/OPD/StandingOrder'
import StandingOrdersMD from '@/services/StandingOrderMasterData'
import VDatePicker from '@/components/VDateTimePicker.vue'
import moment from 'moment'
import MixinForm from '@/mixins/form.js'
import PopupuserCreatedConfirm from './popup/PopupuserCreatedConfirm.vue'
import Confirm from './component/Confirm.vue'
import ConfirmDoctor from './component/ConfirmDoctor.vue'
import SingleConfirm from '@/components/Form/SingleConfirm.vue'
export default {
  name: 'StandingOrdersList',
  data () {
    return {
      dataSubmit: {
        Datas: [],
        LastUpdated: {}
      },
      isLocked: false,
      datas: [],
      user: {},
      StandingOrders: [],
      Type: 'OPD',
      Version: '',
      popupTitle: '',
      Id: ''
    }
  },
  mixins: [MixinForm],
  /**
   * The components that the page can use.
   */
  components: {
    VDatePicker, PopupuserCreatedConfirm, Confirm, ConfirmDoctor, SingleConfirm
  },
  mounted () {
    var VisitTypeGroupCode = this.$router.currentRoute.matched.find(m => m.meta.VisitTypeGroupCode)
    this.Type = VisitTypeGroupCode.meta.VisitTypeGroupCode
    if (VisitTypeGroupCode.meta.VisitTypeGroupCode === 'IPD') {
      this.getIsLocked()
    }
    this.getData()
  },
  computed: {
    hasConfirmBtn: function () {
      return this.dataSubmit.Datas && this.dataSubmit.Datas.find(e => !e.IsConfirm && e.Id)
    }
  },
  methods: {
    onSearch (search, loading) {
      this.search(loading, search, this)
    },
    search: _.debounce((loading, search, vm) => {
      new StandingOrdersMD({request: search, notRedirectAndLoginPopup: true}).all().then(res => {
        vm.StandingOrders = res.map(e => {
          return {
            code: e.Name,
            label: e.Name,
            Drug: e.Drug,
            Dosage: e.Dosage,
            Route: e.Route,
            StandingOrderMasterDataId: e.Id
          }
        })
      })
    }, 350),
    setSelected (item) {
      // console.log(item)
      var value = item.StandingOrderMD
      if (value == null) {
        item.StandingOrderMasterDataId = ''
        item.StandingOrderName = ''
        item.Drug = ''
        item.Dosage = ''
        item.Route = ''
        item.error = true
      } else {
        item.StandingOrderMasterDataId = value.StandingOrderMasterDataId
        item.StandingOrderName = value.code
        item.Drug = value.Drug
        item.Dosage = value.Dosage
        item.Route = value.Route
        item.error = false
      }
    },
    removeData (index, item) {
      this.$modal.show('dialog', {
        title: this.__t('Cảnh báo!'),
        text: this.__t('Bạn có muốn xóa lượt ghi nhận thực hiện thuốc này?'),
        class: 'v-dialog v-dialog-warning',
        buttons: [
          {
            title: this.__t('Hủy bỏ'),
            class: 'btn',
            handler: () => {
              this.$modal.hide('dialog')
            }
          },
          {
            title: this.__t('Đồng ý'),
            class: 'btn bg-yellow',
            handler: () => {
              if (item.Id) {
                new Orders({}, this.Type).update(item.Id, '', 'Delete/').then(response => {
                  this.getData()
                })
              } else {
                this.dataSubmit.Datas.splice(index, 1)
              }
              this.$modal.hide('dialog')
            }
          }
        ]
      })
    },
    addItem () {
      if (this.Version >= 7) {
        this.dataSubmit.Datas.push({
          Id: '',
          StandingOrderMasterDataId: '',
          Drug: '',
          Dosage: '',
          Route: '',
          UsedAt: new Date(),
          MedicalStaffName: this.$store.state.account.Username,
          DoctorConfirm: '',
          IsConfirm: false,
          Status: false,
          StandingOrderMD: '',
          StandingOrderName: '',
          error: false,
          Position: this.$store.state.account.Position,
          ConfirmCreated: null
        })
      } else {
        this.dataSubmit.Datas.push({
          Id: '',
          StandingOrderMasterDataId: '',
          Drug: '',
          Dosage: '',
          Route: '',
          UsedAt: new Date(),
          MedicalStaffName: this.$store.state.account.Username,
          DoctorConfirm: '',
          IsConfirm: false,
          Status: false,
          StandingOrderMD: '',
          StandingOrderName: '',
          error: false,
          Position: this.$store.state.account.Position
        })
      }
    },
    submit (item, str) {
      if (!item.StandingOrderMasterDataId) {
        item.error = true
        return false
      }
      item.error = false
      if (item.UsedAt && typeof item.UsedAt === 'object') {
        item.UsedAt = moment(item.UsedAt).format(this.vDateTimeFormat)
      }
      var submit = {
        Datas:
        [{
          Id: item.Id,
          Drug: item.Drug,
          Note: item.Note,
          Dosage: item.Dosage,
          Route: item.Route,
          StandingOrderMasterDataId: item.StandingOrderMasterDataId,
          UsedAt: item.UsedAt
        }]
      }
      new Orders({}, this.Type).update(this.$route.params.Id, submit).then(response => {
        item.Id = response[0]
        item.UsedAt = this.string2Moment(item.UsedAt, this.vDateTimeFormat)
        // item.Id = '324234'
        this.getData()
        if (str === 'confirm') {
          this.$modal.show('userCreatedConfirm')
        }
      })
    },
    confirm (item) {
      this.$modal.show('doctorConfirm', {
        height: 'auto',
        width: 'auto'
      })
      this.user = {
        id: item.Id,
        confirmAll: false
      }
    },
    confirmAll () {
      this.$modal.show('doctorConfirm', {
        height: 'auto',
        width: 'auto'
      })
      this.user = {
        id: this.$route.params.Id,
        confirmAll: true
      }
    },
    confirmed () {
      if (this.user.confirmAll) {
        new Orders({}, this.Type).update('ConfirmAll/' + this.user.id, this.user).then(response => {
          this.getData()
          this.closeForm()
        })
      } else {
        new Orders({}, this.Type).update('Confirm/' + this.user.id, this.user).then(response => {
          this.getData()
          this.closeForm()
        })
      }
      this.getData()
    },
    closeForm () {
      this.$modal.hide('doctorConfirm')
      this.user = {}
    },
    getIsLocked () {
      new Orders({}, this.Type).find('IsLocked/' + this.$route.params.Id).then(response => {
        this.isLocked = response.Is24hLocked
      })
    },
    getData () {
      new Orders({}, this.Type).find(this.$route.params.Id).then(response => {
        response.Datas.forEach(item => {
          if (item.UsedAt) {
            item.UsedAt = this.string2Moment(item.UsedAt, this.vDateTimeFormat)
          }
        })
        this.dataSubmit.Datas = response.Datas
        this.dataSubmit.LastUpdated = response.LastUpdated
        this.Version = response.Version
        if (response.LastUpdated) {
          this.isLocked = response.LastUpdated.IsLocked
        }
        console.log('datasubmit123', response)
      })
    },
    showDoctorConfirm (obj) {
      this.popupTitle = obj.title
      this.Id = obj.item.Id
      this.submit(obj.item, 'confirm')
    },
    // emit từ popup về confirm
    popupSave (data) {
      if (this.popupTitle === 'Người tạo và thực hiện') {
        data.kind = 'CREATEDCONFIRM_USERCREATED'
      }
      this.ConfirmKyNhay(data)
    },
    ConfirmKyNhay (data) {
      // this.APIService.ConfirmForm(this._ItemId, data).then(res => {
      //   this.scroll2Bottom()
      //   this.toastedSuccess(this.$t('Xác nhận thành công'))
      //   this.reload()
      // }).catch((e) => {
      // })
      let dateConfirm = {
        confirmAll: false,
        id: data.Id,
        password: data.password,
        username: data.username,
        kind: data.kind
      }
      new Orders({}, this.Type).update('Confirm/' + data.Id, dateConfirm).then(response => {
        this.getData()
        this.toastedSuccess(this.$t('Xác nhận thành công'))
        this.closeForm()
      })
    },
    saveRow (item) {
      if (!item.StandingOrderMasterDataId) {
        item.error = true
        return false
      }
      item.error = false
      if (item.UsedAt && typeof item.UsedAt === 'object') {
        item.UsedAt = moment(item.UsedAt).format(this.vDateTimeFormat)
      }
      let Data = {}
      Data.Datas = [item]
      new Orders({}, this.Type).update(this.$route.params.Id, Data).then(response => {
        item.Id = response[0]
      })
    },
    success () {
      this.getData()
    }
  }
}
</script>
<style scoped>
</style>
