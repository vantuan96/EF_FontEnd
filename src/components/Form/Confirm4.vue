<template>
  <div :id="MasterDataCode" class="Confirm2">
    <template v-if="loading">
      <template v-if="!readonly">
        <!-- Chưa xác nhận -->
        <div class="box-confirm" v-if="!dataConfirm">
          <div class="fw600 mrb10" v-if="title && !hideLabel">{{__label(title)}}
          </div>
          <ad-info class="mrb10" v-if="AdInfo" :ad="AdInfo"/>
          <button v-if="!viewOnly" @click="handleConfirm()" class="btn v-white-btn">
            {{ __t("Xác nhận") }}
          </button>
        </div>
        <!-- Đã xác nhận -->
        <div class="box-confirm" v-else>
          <p class="text-center">{{dataConfirm.ConfirmAt | formatDateWithoutSecon}}</p>
          <EformSignature2 :title="__label(title)" :ad="dataConfirm.ConfirmBy" :listUserConfirm="dataConfirm"/>
        </div>
      </template>
      <template v-else>
        <!-- Chưa xác nhận -->
        <div class="box-confirm" v-if="!dataConfirm">
          <div class="fw600" v-if="title && !hideLabel">{{__label(title)}}
          </div>
          <!-- <ad-Info class="fw600" v-if="dataVerOld" :ad="dataVerOld" /> -->
          <button v-if="!viewOnly && !IsLock24h" @click="handleConfirm()" class="btn v-white-btn">
            {{ __t("Xác nhận") }}
          </button>
          <div class="italic fw400" style="color: green">({{__t('Chưa ký xác nhận')}})</div>
        </div>
        <!-- Đã xác nhận -->
        <div class="box-confirm" v-else>
          <p class="text-center">{{dataConfirm.ConfirmAt | formatDateWithoutSecon}}</p>
          <EformSignature2 :title="__label(title)" :ad="dataConfirm.ConfirmBy" :listUserConfirm="dataConfirm"/>
        </div>
      </template>
      <popup-confirm-info
        :popupTitle="popupTitle"
        @popupSave="popupSave"
        :popupid="MasterDataCode"
        :showForLabel="true"/>
    </template>
    <div v-else class="text-center"><v-loading/></div>
  </div>
</template>
<script>
import PopupConfirmInfo from '@/components/Form/PopupConfirmInfo.vue'
import FormApi from '@/services/API.js'
import EIOService from '@/services/IPD/EIOService'
export default {
  name: 'Confirm2',
  props: {
    FormCode: {
      type: String,
      required: true
    },
    VisitId: {
      type: String,
      required: true
    },
    VisitType: {
      type: String
    },
    FormId: {
      type: String
    },
    readonly: {
      type: [Boolean, Object]
    },
    MasterDataCode: {
      type: String
    },
    AdInfo: {
      type: Array
    },
    kind: {
      type: String,
      required: true
    },
    hideLabel: {
      type: Boolean
    },
    title: {
      type: Object
    },
    popupTitle: {
      type: [String, Object]
    },
    viewOnly: {
      type: Boolean
    },
    formcodeunlockform: {
      type: String
    },
    IsLock24h: {
      type: Boolean
    },
    MedicalOutpatient: {
      type: Boolean
    }
  },
  components: {
    PopupConfirmInfo
  },
  computed: {
  },
  data () {
    return {
      loading: false,
      dataConfirm: null
    }
  },
  mounted () {
    this.APIService = new FormApi({
      VisitType: this.VisitType,
      VisitId: this.VisitId,
      FormCode: this.FormCode
    })
    this.getData()
  },
  methods: {
    getData () {
      this.dataConfirm = null
      new EIOService().find('ConfirmForms/GetList/' + this.FormId).then(res => {
        if (this.MedicalOutpatient) {
          this.getConfirm()
        }
        if (res && res.length) {
          this.dataConfirm = res.find(e => {
            if (e.ConfirmType === this.MasterDataCode) {
              return e
            }
          })
        }
        this.loading = true
      }).catch((e) => {
        console.log('e')
        this.loading = true
      })
    },
    handleConfirm () {
      this.$emit('saveConfirm')
      this.showDoctorConfirm()
    },
    showDoctorConfirm () {
      if (this.MasterDataCode) {
        this.$modal.show(`popup${this.MasterDataCode}`)
      }
    },
    popupSave (data) {
      let dataConfirm = {
        Username: data.Username,
        Password: data.Password,
        Kind: this.kind
      }
      if (this.formcodeunlockform) {
        dataConfirm.formcodeunlockform = this.formcodeunlockform
      }
      this.confirm(dataConfirm)
    },
    confirm (data) {
      new EIOService().update('ConfirmForms/Created/' + this._VisitId + '/' + this.FormId + '/' + this.FormCode, data).then(res => {
        this.toastedSuccess(this.$t('Xác nhận thành công'))
        this.$emit('confirmSuccess')
        this.$modal.hide(`popup${this.MasterDataCode}`)
        this.getData()
      }).catch((e) => {
        console.log(e)
      })
    },
    // lấy thông tin sau khi confirm
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
      }).catch((e) => {
      })
    }
  }
}
</script>
<style lang="stylus" scoped>
</style>
