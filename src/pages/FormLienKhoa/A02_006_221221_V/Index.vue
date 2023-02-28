<template>
  <div class="disable_ccp">
    <template v-if="loaded">
      <div class="cap mrt30 text-center fw600 fs30">{{__t('Đánh giá nguy cơ vi khuẩn đa kháng (MDRO)')}}</div>
      <div class="mrb30 text-center">({{__t('Áp dụng khi NB bắt đầu nhập khoa/ phòng hoặc thủ thật/ can thiệp xâm nhập')}})</div>
      <div v-if="List && List.length">
        <Form :readonly="readonly" :VisitId="VisitId" :VisitType="VisitType" :ItemId="List[0].Id"/>
      </div>
      <div class="text-center" v-else>
        <NewForm @createForm="confirmPopup" :IsLocked="IsLocked" :TitleForm="''"/>
      </div>
      <p>A02_006_221221_V</p>
      <LogForm :DataSubmit="LastInfo"/>
    </template>
    <div v-else class="loading-text"><v-loading/></div>
  </div>
</template>

<script>
import Form from './Form.vue'
import FormApi from '@/services/FormAPI.js'
import $ from 'jquery'
import storage from '@/lib/storage'
export default {
  name: 'A02_006_221221_V',
  props: ['VisitType', 'VisitId', 'viewOnly'],
  components: {
    Form
  },
  mixins: [],
  data () {
    return {
      loaded: false,
      IsLocked: false,
      List: [],
      Version: 1,
      LastInfo: null
    }
  },
  mounted () {
    this.APIService = new FormApi({
      VisitType: this._VisitType,
      VisitId: this._VisitId,
      FormCode: 'A02_006_221221_V'
    })
    this.getData()
    $('.disable_ccp' + (storage.get('allowcopypaste') ? 'fc' : '')).bind('cut copy paste', e => {
      this.toastedError('Bạn không thể thực hiện thao tác này trên hệ thống!')
      return false
    })
  },
  computed: {
    condition () {
      let name = ''
      if (this.$store.state.account.Position.includes('Nurse')) {
        name = 'Nurse'
      }
      if (this.$store.state.account.Position.includes('Doctor')) {
        name = 'Doctor'
      }
      return name
    },
    readonly () {
      return this.viewOnly || !this.hasRole(`APIUD${this._VisitType}A02_006_221221_V`) || (this.LastInfo && (this.LastInfo.CreatedBy !== this.$store.state.account.Username))
    }
  },
  methods: {
    getData () {
      this.APIService.GetList().then(res => {
        // lấy thông tin khoá 24h
        this.IsLocked = res.IsLock24h
        this.Version = res.Version
        this.LastInfo = res.LastInfo
        if (res.FORM_NOT_FOUND && res.FORM_NOT_FOUND.ViMessage === 'Form không tồn tại') {
        } else {
          // lấy danh sách
          this.List = res.Datas
        }
        this.loaded = true
      }).catch((e) => {
        this.IsLocked = e.data.IsLock24h
        this.loaded = true
      })
    },
    // xác nhận tạo mới
    confirmPopup () {
      this.$modal.show('dialog', {
        clickToClose: false,
        title: this.$t('Đánh giá nguy cơ vi khuẩn đa kháng (MDRO)'),
        text: this.$t('Tạo mới Đánh giá nguy cơ vi khuẩn đa kháng (MDRO)'),
        class: 'v-dialog v-dialog-warning',
        buttons: [
          {
            title: this.$t('Tôi xác nhận'),
            class: 'btn btn-warning',
            handler: () => {
              this.$modal.hide('dialog')
              this.handleCreate()
            }
          },
          {
            title: this.$t('Bỏ qua'),
            class: 'btn',
            handler: () => {
              this.$modal.hide('dialog')
            }
          }
        ]
      })
    },
    // tạo mới form
    handleCreate () {
      this.APIService.CreateForm({}).then(res => {
        this.toastedSuccess()
        this.reload()
      })
    }
  }
}
</script>
<style scoped>
</style>
