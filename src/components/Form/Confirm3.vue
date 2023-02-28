<template>
  <div>
    <div id="form-confirm" class="d-flex row">
      <div
        v-for="(item, index) in listUserConfirm"
        :key="item.id"
        class="d-flex-item"
        :class="{
          'col-md-4 col-sm-4 col-md-offset-8 col-sm-offset-8': listUserConfirm.length === 1,
          'col-md-6 col-sm-6': listUserConfirm.length === 2,
          'col-md-4 col-sm-4': listUserConfirm.length === 3,
          'col-md-3 col-sm-3': listUserConfirm.length === 4
        }"
      >
        <div v-if="item.isConfirm">
          <p class="text-center">{{item.ConfirmAt | formatDateWithoutSecon}}</p>
          <EformSignature2 :title="__label(item)" :ad="item.ConfirmBy" :bilingual="Bilingual" :listUserConfirm="item"/>
        </div>
        <div class="text-center" v-else>
          <p v-if="Bilingual"><b>{{item.ViName}}/ <i>{{item.EnName}}</i></b></p>
          <p v-else><b>{{__label(item) }}</b></p>
          <ad-Info :ad="item.AdInfo[index]" class="mb-5"/>
          <div v-if="!ReadOnly">
            <button v-if="ShowButtonConfirm" @click="showDoctorConfirm(item, item.ViName)" class="btn v-white-btn">
              {{ __t("Xác nhận") }}
            </button>
          </div>
          <div v-else>
            <p v-if="ShowButtonConfirm" class="italic" style="color: green">({{__t('Chưa ký xác nhận')}})</p>
          </div>
        </div>
      </div>
    </div>
    <modal name="popupConfirm" transition="pop-out" id="doctor-login" height="auto" :clickToClose="false">
      <div class="box v-model-content-popup">
        <div class="box-header text-center">
          <h3 class="box-title">{{getTitle}}.</h3>
        </div>
        <div class="form-confirm">
          <div class="form-group has-feedback">
            <input v-model="user.Username" type="text" class="form-control" :placeholder="__t('Tên đăng nhập')"/>
            <span class="glyphicon glyphicon-user form-control-feedback"></span>
          </div>
          <div class="form-group has-feedback">
            <input v-model="user.Password" type="password" class="form-control current-password" :placeholder="__t('Mật khẩu')"/>
            <span class="glyphicon glyphicon-lock form-control-feedback"></span>
          </div>
          <div class="row">
            <div class="col-xs-6">
              <button type="button" class="btn btn-block v-white-btn" @click="$modal.hide('popupConfirm')">{{__t('Thoát')}}</button>
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
  </div>
</template>
<script>
import MixinMasterData from '@/mixins/masterdata.js'
import FormApi from '@/services/API.js'
import EIOService from '@/services/IPD/EIOService'
export default {
  name: 'FormWrapCF',
  props: {
    FormCode: {
      type: String,
      required: true
    },
    VisitId: {
      type: String,
      required: true
    },
    FormId: {
      type: String
    },
    ReadOnly: {
      type: Boolean,
      default: false
    },
    MasterDataCode: {
      type: String
    },
    ShowButtonConfirm: {
      type: Boolean,
      default: true
    },
    AdInfo: {
      type: Array,
      default: () => []
    },
    TabActive: {
      type: String
    },
    saveSuccess: {
      type: Boolean,
      default: false
    },
    // Hien song ngu
    Bilingual: {
      type: Boolean,
      default: false
    }
  },
  components: {
  },
  watch: {
    saveSuccess: function (val) {
      console.log('val')
    }
  },
  computed: {
    getTitle () {
      return this.titleConfirm
    }
  },
  mixins: [MixinMasterData],
  data () {
    return {
      user: {},
      titleConfirm: '',
      DataSubmit: {},
      APIService: null,
      loaded: false,
      IsLocked: false,
      Id: '',
      isConfirm: true,
      viewOnly: false,
      listUserConfirm: []
    }
  },
  mounted () {
    this.APIService = new FormApi({
      VisitType: this.VisitType,
      VisitId: this.VisitId,
      FormCode: this.FormCode
    })
    this.getMasterDatas({Form: this.MasterDataCode || 'EFORMDEMOCONFIRM'}, () => {
      this.getConfirm()
    })
  },
  methods: {
    showDoctorConfirm (item, title) {
      this.titleConfirm = title
      this.user.Kind = item.Code
      this.$modal.show('popupConfirm')
    },
    getConfirm () {
      this.listUserConfirm = []
      var confirmTab = []
      new EIOService().find('ConfirmForms/GetList/' + this.FormId).then(res => {
        this.$emit('ResponseData', res)
        // confirm ở form có nhiều tab, truyền tab hiện tại
        if (this.TabActive) {
          for (const property in this.MASTERDATA) {
            if (this.TabActive && this.MASTERDATA[property].Note === this.TabActive) {
              confirmTab.push(this.MASTERDATA[property])
            }
          }
          for (let i = 0; i < confirmTab.length; i++) {
            var checkTab = res.filter(item => item.ConfirmType === confirmTab[i].Code)
            if (checkTab.length > 0) {
              const item = {
                // ...confirmTab,
                isConfirm: true,
                ConfirmAt: checkTab[0].ConfirmAt,
                ConfirmBy: checkTab[0].ConfirmBy,
                AdInfo: this.AdInfo,
                ViName: confirmTab[i].ViName,
                EnName: confirmTab[i].EnName,
                Code: confirmTab[i].Code
              }
              this.listUserConfirm.push(item)
            } else {
              const item = {
                // ...confirmTab,
                isConfirm: false,
                ConfirmAt: '',
                ConfirmBy: '',
                AdInfo: this.AdInfo,
                ViName: confirmTab[i].ViName,
                EnName: confirmTab[i].EnName,
                Code: confirmTab[i].Code
              }
              this.listUserConfirm.push(item)
            }
            this.$emit('getListConfirm', this.listUserConfirm)
          }
        } else {
          for (const property in this.MASTERDATA) {
            if (this.MASTERDATA[property].Items) {
              var check = res.filter(item => item.ConfirmType === this.MASTERDATA[property].Code)
              console.log('varcheck', check)
              if (check.length > 0) {
                const item = {
                  ...this.MASTERDATA[property],
                  isConfirm: true,
                  ConfirmAt: check[0].ConfirmAt,
                  ConfirmBy: check[0].ConfirmBy,
                  AdInfo: this.AdInfo
                }
                this.listUserConfirm.push(item)
              } else {
                const item1 = {
                  ...this.MASTERDATA[property],
                  isConfirm: false,
                  ConfirmAt: '',
                  ConfirmBy: '',
                  AdInfo: this.AdInfo
                }
                this.listUserConfirm.push(item1)
              }
              this.$emit('getListConfirm', this.listUserConfirm)
            }
          }
        }
        this.$emit('checkFormConfirm', this.listUserConfirm[0].isConfirm)
      }).catch((e) => {
      })
    },
    confirm () {
      this.$emit('handleConfirm')
      const data = {
        ...this.user,
        Created: this.user.Username
      }
      new EIOService().update('ConfirmForms/Created/' + this._VisitId + '/' + this.FormId + '/' + this.FormCode, data).then(res => {
        this.toastedSuccess(this.$t('Xác nhận thành công'))
        this.$emit('confirmSuccess')
        this.$modal.hide('popupConfirm')
        this.getConfirm()
      }).catch((e) => {
        console.log(e)
      })
    }
  }
}
</script>
