<template>
  <div v-if="dataSubmit && dataSubmit.Datas.length">
    <h2 class="text-center">{{__t('Ghi nhận thực hiện thuốc')}}</h2>
    <table class="standing-order-tbl">
      <tr>
        <th width="40">Stt</th>
        <th>{{__t('Tên phác đồ')}}</th>
        <th width="250">{{__t('Tên thuốc, nồng độ, hàm lượng')}}</th>
        <th width="200">{{__t('Liều dùng')}}</th>
        <th width="170">{{__t('Đường dùng')}}</th>
        <th width="170">{{__t('Ghi chú')}}</th>
        <th width="200">{{__t('Thời điểm dùng')}}</th>
      </tr>
      <template :data="item" v-for="(item,index) in dataSubmit.Datas">
        <template v-if="item.IsConfirm">
          <tr v-bind:key="index">
            <td rowspan="2" align="center">{{index + 1}}</td>
            <td>{{item.StandingOrderName}}</td>
            <td class="wrap">{{item.Drug}}</td>
            <td class="wrap">{{item.Dosage}}</td>
            <td class="wrap">{{item.Route}}</td>
            <td><p>{{item.Note}}</p></td>
            <td>{{item.UsedAt | formatDateTime}}</td>
          </tr>
          <tr v-bind:key="index + 'ex'">
            <td style="border: none;">
              <span v-if="item.MedicalStaffName" style="display: inline-flex;">
                <div><i class="v-icon v-icon-doctor"></i></div>
                <div style="display: grid; margin-left: 5px;">
                  <b>{{__t('Bác sĩ xác nhận')}}</b>
                  <ad-Info :ad="item.DoctorConfirm" />
                </div>
              </span>
            </td>
            <td  colspan="4" style="border: none;">
              <span v-if="item.MedicalStaffName" style="display: inline-flex;">
                <div><i class="v-icon v-icon-nurse"></i></div>
                <div style="display: grid; margin-left: 5px;">
                  <b>{{__t('Người tạo và thực hiện')}}</b>
                  <ad-Info :ad="item.MedicalStaffName" />
                </div>
              </span>
            </td>
            <td style="border: none;"></td>
          </tr>
        </template>
        <template v-else>
          <tr v-bind:key="index + 'ey'">
            <td rowspan="2" align="center">{{index + 1}}</td>
            <td>
              <v-select :multiple="false" v-if="!item.Id" v-model="item.StandingOrderMD" :filterable="false" :options="StandingOrders" @search="onSearch" @input="setSelected(item)" :placeholder="__t('Tên phác đồ')"
                style="background-color: #fff; min-width: 200px;">
                <template slot="no-options">
                  {{__t('Gõ để tìm phác đồ...')}}
                </template>
              </v-select>
              <b v-if="item.Id">{{item.StandingOrderName}}</b>
            </td>
            <td class="wrap">{{item.Drug}}</td>
            <td class="wrap">{{item.Dosage}}</td>
            <td class="wrap">{{item.Route}}</td>
            <td><p>{{item.Note}}</p></td>
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
              <button v-if="!item.IsConfirm && item.Id" class="btn pull-left v-yellow-btn" type="button" @click="confirm(item)">{{__t('btn.bs_xac_nhan')}}</button>
            </td>
            <td  colspan="5" style="border: none;">
              <span v-if="item.MedicalStaffName" style="display: inline-flex;">
                <div><i class="v-icon v-icon-nurse"></i></div>
                <div style="display: grid; margin-left: 5px;">
                  <b>{{__t('Người tạo và thực hiện')}}</b>
                  <ad-Info :ad="item.MedicalStaffName" />
                </div>
              </span>
            </td>
            <td style="border: none;">
              <!-- <button type="button" class="btn v-yellow-btn pull-right" style="margin: 0px 0px 0px 10px;" @click="removeData(index, item)">{{__t('Xóa')}}</button>
              <button v-if="!item.Id" type="button" class="btn v-yellow-btn pull-right" style="margin: 0px 0px 0px 10px;" @click="submit(item)">{{__t('Lưu')}}</button> -->
            </td>
          </tr>
        </template>
      </template>
    </table>
    <!-- <div class="text-center" style="margin-top: 10px;">
      <button type="button" class="btn btn-info" @click="addItem()">
        <span class="glyphicon glyphicon-plus"></span> {{__t('Thêm ghi nhận')}}
      </button>
    </div> -->
    <div v-if="hasConfirmBtn" class="text-right" style="margin-top: 10px;">
      <button type="button" class="btn v-yellow-btn" @click="confirmAll()">
        {{__t('Xác nhận tất cả thực hiện thuốc')}}
      </button>
    </div>
    <modal name="doctorConfirm" transition="pop-out" id="doctor-login" height="auto">
      <div class="box v-model-content-popup">
        <div class="box-header text-center">
          <h3 class="box-title">{{__t('btn.nhap_tai_khoan')}}</h3>
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
          <p style="margin-top: 10px; text-align:center">{{__t('Sử dụng tài khoản máy tính')}}</p>
        </div>
      </div>
    </modal>
  </div>
</template>
<script>
import _ from 'lodash'
import Orders from '@/services/OPD/StandingOrder'
import StandingOrdersMD from '@/services/StandingOrderMasterData'
import VDatePicker from '@/components/VDateTimePicker.vue'
import moment from 'moment'
import MixinForm from '@/mixins/form.js'
export default {
  name: 'StandingOrders',
  data () {
    return {
      dataSubmit: {
        Datas: []
      },
      datas: [],
      user: {},
      StandingOrders: [],
      Type: 'OPD'
    }
  },
  mixins: [MixinForm],
  /**
   * The components that the page can use.
   */
  components: {
    VDatePicker
  },
  mounted () {
    var VisitTypeGroupCode = this.$router.currentRoute.matched.find(m => m.meta.VisitTypeGroupCode)
    this.Type = VisitTypeGroupCode.meta.VisitTypeGroupCode
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
      new StandingOrdersMD({request: search}).all().then(res => {
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
      var value = item.StandingOrderMD
      if (value == null) {
        item.StandingOrderMasterDataId = ''
        item.StandingOrderName = ''
        item.Drug = ''
        item.Dosage = ''
        item.Route = ''
      } else {
        item.StandingOrderMasterDataId = value.StandingOrderMasterDataId
        item.StandingOrderName = value.code
        item.Drug = value.Drug
        item.Dosage = value.Dosage
        item.Route = value.Route
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
      this.dataSubmit.Datas.push({
        Id: '',
        StandingOrderMasterDataId: '',
        Drug: '',
        Dosage: '',
        Route: '',
        UsedAt: new Date(),
        MedicalStaffName: '',
        DoctorConfirm: '',
        IsConfirm: false,
        Status: false,
        StandingOrderMD: '',
        StandingOrderName: ''
      })
    },
    submit (item) {
      if (item.UsedAt && typeof item.UsedAt === 'object') {
        item.UsedAt = moment(item.UsedAt).format(this.vDateTimeFormat)
      }
      var submit = {
        Datas:
        [{
          Id: item.Id,
          Drug: item.Drug,
          Dosage: item.Dosage,
          Route: item.Route,
          StandingOrderMasterDataId: item.StandingOrderMasterDataId,
          UsedAt: item.UsedAt
        }]
      }
      new Orders({}, this.Type).update(this.$route.params.Id, submit).then(response => {
        this.getData()
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
    },
    closeForm () {
      this.$modal.hide('doctorConfirm')
      this.user = {}
    },
    getData () {
      new Orders({}, this.Type).find(this.$route.params.Id).then(response => {
        response.forEach(item => {
          if (item.UsedAt) {
            item.UsedAt = this.string2Moment(item.UsedAt, this.vDateTimeFormat)
          }
        })
        this.dataSubmit.Datas = response
      })
    }
  }
}
</script>
