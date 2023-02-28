import $ from 'jquery'
import storage from '@/lib/storage'
import Allergy from '@/services/Allergy.js'
export default {
  data () {
    return {
      isForm: 'abc',
      edited: false,
      lastMASTERDATA: {},
      notPermission2Update: false
    }
  },
  beforeDestroy () {
    // console.log('beforeDestroy')
  },
  computed: {
    formedited: function () {
      return JSON.stringify(this.lastMASTERDATA) !== JSON.stringify(this.getMD(this.MASTERDATA))
    }
  },
  watch: {
    MASTERDATA: {
      handler () {
        this.edited = true
      },
      deep: true
    }
  },
  beforeRouteLeave (to, from, next) {
    if (to.query.plan || !this.formedited || this.notPermission2Update) {
      next()
      return
    }
    this.$modal.show('dialog', {
      title: 'Cảnh báo!',
      text: 'Dữ liệu bạn đang làm có thể bị mất nếu chưa lưu',
      class: 'v-dialog v-dialog-warning',
      buttons: [
        {
          title: 'Đồng ý',
          class: 'btn',
          handler: () => {
            next()
            this.$modal.hide('dialog')
          }
        },
        {
          title: 'Hủy bỏ',
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
    _401ResponseError (e) {
      if (e.status === 401 || e.status === 400) {
        this.notPermission2Update = true
      }
      console.log(e)
    },
    getAllergy (code) {
      new Allergy({hidemsg: true}).find(this.$route.params.Id, {}).then(response => {
        if (response) {
          this.MASTERDATA[code].Items[0].Value = response.Yes === 'True'
          this.MASTERDATA[code].Items[1].Value = response.No === 'True'
          this.MASTERDATA[code].Items[2].Value = response.Kind
          this.MASTERDATA[code].Items[3].Value = response.Ans
        }
      })
    },
    setLastData () {
      this.lastMASTERDATA = this.cloneObj(this.getMD(this.MASTERDATA))
    },
    getMD (mds) {
      var md = {}
      if (this.DataSubmit) {
        var ex = ['OPDOENPT0', 'OPDOENDD0', 'OPDOENICD']
        for (const property in mds) {
          if (!ex.includes(property)) this.$set(md, property, mds[property])
        }
        this.$set(md, 'STATUS', this.DataSubmit.Status)
        this.$set(md, 'ExaminationTime', this.DataSubmit.ExaminationTime)
      }
      return md
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
  created () {
    // window.onbeforeunload = () => {
    //   console.log(this.isForm)
    //   return this.isForm
    // }
    setTimeout(() => {
      this.edited = false
    }, 1000)
  }
}
