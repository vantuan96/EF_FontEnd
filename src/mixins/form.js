import $ from 'jquery'
import storage from '@/lib/storage'
import Allergy from '@/services/Allergy.js'
// import HeightAndWeight from '@/services/HeightAndWeight.js'
export default {
  data () {
    return {
      isForm: 'abc',
      edited: false,
      lastMASTERDATA: {},
      LastUpdateWeightHeight: null,
      hasErrForm: false
    }
  },
  beforeDestroy () {
    // console.log('beforeDestroy')
  },
  computed: {
    formedited: function () {
      return true
    }
  },
  watch: {
    MASTERDATA: {
      handler (a, b) {
        this.edited = true
      },
      deep: true
    }
  },
  beforeRouteLeave (to, from, next) {
    if (to.query.plan || !this.edited) {
      next()
      return
    }
    this.$modal.show('dialog', {
      title: this.__t('Cảnh báo'),
      text: this.__t('Dữ liệu bạn đang làm có thể bị mất nếu chưa lưu'),
      class: 'v-dialog v-dialog-warning',
      buttons: [
        {
          title: this.__t('Đồng ý'),
          class: 'btn',
          handler: () => {
            next()
            this.$modal.hide('dialog')
          }
        },
        {
          title: this.__t('Hủy bỏ'),
          class: 'btn bg-yellow',
          handler: () => {
            next(false)
            this.$modal.hide('dialog')
          }
        }
      ]
    })
  },
  methods: {
    confirmPopup () {
      this.$modal.show('dialog', {
        clickToClose: false,
        title: this.TitleForm,
        text: this.$t(`Bạn có chắc tạo ${this.TitleForm} ?`),
        class: 'v-dialog v-dialog-warning',
        buttons: [
          {
            title: this.$t('Tôi xác nhận'),
            class: 'btn btn-warning',
            handler: () => {
              this.$modal.hide('dialog')
              this.create()
            }
          },
          {
            title: this.$t('Bỏ qua'),
            class: 'btn',
            handler: () => {
              // this.back()
              this.$modal.hide('dialog')
            }
          }
        ]
      })
    },
    _401ResponseError (e) {
      if (e.status === 401) {
        this.edited = false
      }
      console.log(e)
    },
    getAllergy (code) {
      new Allergy({hidemsg: true}).find(this.$route.params.Id, {}).then(response => {
        if (response) {
          this.MASTERDATA[code].Items[0].Value = this.checkString(response.Yes, 'True')
          this.MASTERDATA[code].Items[1].Value = this.checkString(response.No, 'True')
          this.MASTERDATA[code].Items[2].Value = this.checkString(response.Na, 'True')
          this.MASTERDATA[code].Items[3].Value = response.Kind
          this.MASTERDATA[code].Items[4].Value = response.Ans
        }
      })
    },
    getHeightAndWeight (HeightCode, WeightCode) {
      // new HeightAndWeight({hidemsg: true}).update(this.$route.params.Id, {}).then(response => {
      //   if (response) {
      //     this.MASTERDATA[HeightCode].Items[0].Value = response.Height
      //     this.MASTERDATA[WeightCode].Items[0].Value = response.Weight
      //     this.LastUpdateWeightHeight = response.LastUpdateHeight || response.LastUpdateWeight
      //   }
      // })
    }
  },
  mounted () {
    if (this.$el && this.$el.classList) {
      this.$el.classList.add('disable_ccp')
      // dragstart drop
      $('.disable_ccp' + (storage.get('allowcopypaste') ? 'fc' : '')).bind('cut copy paste', e => {
        this.toastedError('Bạn không thể thực hiện thao tác này trên hệ thống!')
        return false
      })
    }
  },
  setLastData () {
    this.lastMASTERDATA = this.cloneObj(this.MASTERDATA)
  },
  created () {
    setTimeout(() => {
      this.edited = false
    }, 1000)
  }
}
