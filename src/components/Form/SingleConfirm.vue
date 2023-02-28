<template>
  <div v-if="loading">
    <div id="form-confirm" class="FormWrap" v-if="item">
      <!-- Print -->
      <div v-if="print" class="text-center">
        <!-- chưa xác nhận -->
        <template v-if="!confirminfo">
          <div class="fw600 text-center" v-if="title && !hideLabel">{{__t(title)}}</div>
          <ad-Info class="fw600 text-center" v-if="dataVerOld" :ad="dataVerOld" />
          <div class="text-center">{{item.FullName}}</div>
        </template>
        <!-- đã ký xác nhận -->
        <template v-else>
          <div class="fw600 text-center" v-if="title && !hideLabel">{{__t(title)}}</div>
          <div class="italic text-center">{{getFTime(confirminfo.ConfirmAt)}}</div>
          <div class="text-center">{{confirminfo.Fullname}}</div>
        </template>
      </div>
      <!-- Khoá Form -->
      <div v-else-if="readonly" class="text-center">
        <!-- chưa xác nhận -->
        <template v-if="!confirminfo">
          <div class="fw600" v-if="title && !hideLabel">{{__t(title)}}</div>
          <ad-Info class="fw600" v-if="dataVerOld" :ad="dataVerOld" />
          <div class="italic fw400" style="color: green">({{__t('Chưa ký xác nhận')}})</div>
        </template>
        <!-- đã ký xác nhận -->
        <template v-else>
          <div class="fw600" v-if="title && !hideLabel">{{__t(title)}}</div>
          <div class="italic">{{getFTime(confirminfo.ConfirmAt)}}</div>
          <div class="flex align-center" style="justify-content: center;">
            <div class="fw600 mrr5">
              <ad-Info class="fw600" v-if="confirminfo.ConfirmBy" :ad="confirminfo.ConfirmBy" />
            </div>
            <div class="italic fw400" style="color: green">({{__t('Đã ký xác nhận')}})</div>
          </div>
          <div class="fw600">{{confirminfo.Fullname}}</div>
        </template>
      </div>
      <!-- Mở khoá 24h -->
      <div v-else-if="!item.IsLocked && !item.Is24hLocked && item.ConfirmCreated && item.ConfirmCreated.IsUnlockConfirm" class="text-center">
        <!-- chưa xác nhận -->
        <template v-if="!confirminfo">
          <div class="fw600" v-if="title && !hideLabel">{{__t(title)}}</div>
          <div>
            <ad-Info class="fw600" v-if="dataVerOld" :ad="dataVerOld" />
          </div>
          <button v-if="!viewOnly && !hideBtn" @click="handleConfirm()" class="btn v-white-btn">
            {{ __t("Xác nhận") }}
          </button>
          <div v-if="readonly || viewOnly" class="italic fw400" style="color: green">({{__t('Chưa ký xác nhận')}})</div>
        </template>
        <!-- đã ký xác nhận -->
        <template v-else>
          <div class="fw600" v-if="title && !hideLabel">{{__t(title)}}</div>
          <div class="italic">{{getFTime(confirminfo.ConfirmAt)}}</div>
          <div class="flex align-center" style="justify-content: center;">
            <div class="fw600 mrr5">
              <ad-Info class="fw600" v-if="confirminfo.ConfirmBy" :ad="confirminfo.ConfirmBy" />
            </div>
            <div class="italic fw400" style="color: green">({{__t('Đã ký xác nhận')}})</div>
          </div>
          <div class="fw600">{{confirminfo.Fullname}}</div>
        </template>
      </div>
      <!-- Form nhập -->
      <div v-else class="text-center">
        <!-- chưa xác nhận -->
        <template v-if="!confirminfo">
          <div class="fw600" v-if="title && !hideLabel">{{__t(title)}}</div>
          <div>
            <ad-Info class="fw600" v-if="dataVerOld" :ad="dataVerOld" />
          </div>
          <button v-if="!viewOnly && !hideBtn" @click="handleConfirm()" class="btn v-white-btn">
            {{ __t("Xác nhận") }}
          </button>
        </template>
        <!-- đã ký xác nhận -->
        <template v-else>
          <div class="fw600" v-if="title && !hideLabel">{{__t(title)}}</div>
          <div class="italic">{{getFTime(confirminfo.ConfirmAt)}}</div>
          <div class="flex align-center" style="justify-content: center;">
            <div class="fw600 mrr5">
              <ad-Info class="fw600" v-if="confirminfo.ConfirmBy" :ad="confirminfo.ConfirmBy" />
            </div>
            <div class="italic fw400" style="color: green">({{__t('Đã ký xác nhận')}})</div>
          </div>
          <div class="fw600">{{confirminfo.Fullname}}</div>
        </template>
      </div>
      <button
        v-if="(item.Id || item.ItemId) && hasRole('ABCJQK') && !viewOnly && !print"
        class="btn-copy"
        :class="{'btn btn-flat btn-xs': true}"
        :style="styleBtnCopy"
        @click="handleCopy">FormId</button>
      <popup-confirm-info
        :popupTitle="title"
        @popupSave="popupSave"
        :popupid="popupid"/>
    </div>
  </div>
  <div v-else class="text-center">
    <v-loading/>
  </div>
</template>
<script>
import PopupConfirmInfo from '@/components/Form/PopupConfirmInfo.vue'
import ConfirmInfo from '@/components/ConfirmInfo.vue'
import EIOService from '@/services/IPD/EIOService'
export default {
  name: 'FormWrap',
  props: {
    dataVerOld: {
      type: String
    },
    title: {
      type: String
    },
    readonly: {
      type: Boolean
    },
    viewOnly: {
      type: Boolean
    },
    print: {
      type: Boolean
    },
    item: {
      type: Object,
      required: true
    },
    kind: {
      type: String,
      required: true
    },
    VisitId: {
      type: [String, Number]
    },
    FormCode: {
      type: [String, Number],
      required: true
    },
    styleBtnCopy: {
      type: String
    },
    hideLabel: {
      type: Boolean
    },
    hideBtn: {
      type: Boolean
    }
  },
  components: {
    ConfirmInfo, PopupConfirmInfo
  },
  watch: {
    item (val) {
      console.log('val', val)
      if (val.Id) {
        this.setPopupid(val.Id)
      }
    }
  },
  mixins: [],
  data () {
    return {
      loading: false,
      confirminfo: null,
      popupid: '',
      connectReload: false
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    async reloadData () {
      await this.getData()
      await this.showDoctorConfirm()
    },
    setPopupid (Id) {
      this.popupid = Id
      if (this.connectReload) {
        this.reloadData()
      }
    },
    getData () {
      if (this.item.Id) {
        this.popupid = this.item.Id
      }
      if (this.item.ItemId) {
        this.popupid = this.item.ItemId
      }
      if (this.popupid) {
        new EIOService().find('ConfirmForms/GetDetail/' + this.popupid).then(e => {
          this.confirminfo = e
          this.loading = true
        }).catch((e) => {
          this.loading = true
        })
      } else {
        this.loading = true
      }
    },
    handleConfirm () {
      this.$emit('saveRow', this.item)
      this.connectReload = true
      setTimeout(() => {
        this.reloadData()
      }, 200)
    },
    showDoctorConfirm () {
      if (this.popupid) {
        console.log('item', this.item)
        this.$modal.show(`popup${this.popupid}`)
      }
    },
    popupSave (data) {
      let dataConfirm = {
        Username: data.Username,
        Password: data.Password,
        Id: this.popupid,
        Kind: this.kind
      }
      this.ConfirmKyNhay(dataConfirm)
    },
    ConfirmKyNhay (dataConfirm) {
      this.connectReload = false
      new EIOService().update('ConfirmForms/Created/' + this._VisitId + '/' + dataConfirm.Id + '/' + this.FormCode, dataConfirm).then(res => {
        this.toastedSuccess(this.$t('Xác nhận thành công'))
        this.getData()
        this.$emit('success', dataConfirm)
      }).catch((e) => {
        console.log('e', e)
      })
    },
    handleCopy () {
      if (!this.popupid) return false
      const el = document.createElement('textarea')
      el.value = this.popupid
      el.setAttribute('readonly', '')
      el.style.position = 'absolute'
      el.style.left = '-9999px'
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
      this.toastedInfo('Đã copy')
    }
  }
}
</script>
<style lang="stylus" scoped>
  .FormWrap {
    position relative;
    .btn-copy {
      position absolute;
      top: -9px;
      right: -9px;
    }
  }
</style>
