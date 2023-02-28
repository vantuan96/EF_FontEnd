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
