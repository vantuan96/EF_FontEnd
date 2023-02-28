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
          <div class="fw600 mrb10" v-if="title && !hideLabel">{{__label(title)}}
          </div>
          <div class="italic">{{getFTime(dataConfirm.ConfirmAt)}}</div>
          <div class="flex align-center">
            <div class="fw600 mrr5">
              <ad-Info class="fw600" v-if="dataConfirm.ConfirmBy" :ad="dataConfirm.ConfirmBy" />
            </div>
            <div class="italic fw400" style="color: green">({{__t('Đã ký xác nhận')}})</div>
          </div>
          <div class="fw600">{{DisplayName ? dataConfirm.DisplayName : dataConfirm.Fullname}}</div>
        </div>
      </template>
      <template v-else>
        <!-- Chưa xác nhận -->
        <div class="box-confirm" v-if="!dataConfirm">
          <div class="fw600" v-if="title && !hideLabel">{{__label(title)}}
          </div>
          <ad-Info class="fw600" v-if="dataVerOld" :ad="dataVerOld" />
          <button v-if="!viewOnly && !IsLock24h" @click="handleConfirm()" class="btn v-white-btn">
            {{ __t("Xác nhận") }}
          </button>
          <div class="italic fw400" style="color: green">({{__t('Chưa ký xác nhận')}})</div>
        </div>
        <!-- Đã xác nhận -->
        <div class="box-confirm" v-else>
          <div class="fw600 mrb10" v-if="title && !hideLabel">{{__label(title)}}
          </div>
          <div class="italic">{{getFTime(dataConfirm.ConfirmAt)}}</div>
          <div class="flex align-center">
            <div class="fw600 mrr5">
              <ad-Info class="fw600" v-if="dataConfirm.ConfirmBy" :ad="dataConfirm.ConfirmBy" />
            </div>
            <div class="italic fw400" style="color: green">({{__t('Đã ký xác nhận')}})</div>
          </div>
          <div class="fw600">{{DisplayName ? dataConfirm.DisplayName : dataConfirm.Fullname}}</div>
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
      type: String,
      required: true
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
      type: Object
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
    dontConfirmSite: {
      type: Boolean
    },
    DisplayName: {
      type: Boolean
    },
    HasValidate: {
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
    async handleConfirm () {
      if (this.HasValidate) {
        this.$emit('saveConfirm', this.showDoctorConfirm)
      } else {
        this.$emit('saveConfirm')
        this.showDoctorConfirm(false)
      }
    },
    showDoctorConfirm (hasErr) {
      if (!hasErr) {
        if (this.MasterDataCode) {
          this.$modal.show(`popup${this.MasterDataCode}`)
        }
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
      new EIOService().update('ConfirmForms/Created/' + this._VisitId + '/' + this.FormId + '/' + this.getStr(), data).then(res => {
        this.toastedSuccess(this.$t('Xác nhận thành công'))
        this.$emit('confirmSuccess')
        this.$modal.hide(`popup${this.MasterDataCode}`)
        this.getData()
      }).catch((e) => {
        console.log(e)
      })
    },
    getStr () {
      let str = ''
      if (this.dontConfirmSite) {
        str = this.FormCode
      } else {
        str = this._VisitType + '-' + this.FormCode
      }
      return str
    }
  }
}
</script>
<style lang="stylus" scoped>
</style>
