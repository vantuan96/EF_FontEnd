import MasterDatas from '@/services/MasterDatas'
import _ from 'lodash'
import moment from 'moment'
export default {
  data () {
    return {
      MASTERDATA: {
      }
    }
  },
  methods: {
    getMasterDatas (query, callback) {
      new MasterDatas(query)
        .all()
        .then(response => {
          response.forEach(item => {
            item.Before = []
            item.hasDifferent = false
            item.After = []
            this.$set(this.MASTERDATA, item.Code, item)
          })
          this.validateMasterDataCode(response)
          callback(response)
        })
    },
    async getAsyncMasterDatas (query, callback) {
      await new MasterDatas(query)
        .all()
        .then(response => {
          response.forEach(item => {
            item.Before = []
            item.hasDifferent = false
            item.After = []
            this.$set(this.MASTERDATA, item.Code, item)
          })
          this.validateMasterDataCode(response)
          callback(response)
        })
    },
    validateMasterDataCode (response) {
      if (this.$store.state.account.Username === 'thangdc3' || this.$store.state.account.Username === 'namnh62') {
        var arr = []
        response.forEach(item => {
          item.Items.forEach(it => {
            arr.push({
              Code: it.Code,
              Label: it.ViName,
              DataType: it.DataType
            })
          })
        })
        const lookup = arr.reduce((a, e) => {
          a[e.Code] = ++a[e.Code] || 0
          return a
        }, {})
        console.log('Trungf max code', arr.filter(e => lookup[e.Code]))
      }
    },
    getRawMasterDatas (query, callback) {
      new MasterDatas(query)
        .all()
        .then(response => {
          callback(response)
        })
    },
    resetMdData (key) {
      if (!this.MASTERDATA[key]) return
      this.MASTERDATA[key].Items.forEach(item => {
        item.Value = null
      })
    },
    resetMdDataValue () {
      for (const property in this.MASTERDATA) {
        if (this.MASTERDATA[property].Items) {
          this.MASTERDATA[property].Items.forEach(item => {
            item.Value = null
          })
        }
      }
    },
    resetMdDataValueVitalSigns () {
      for (const property in this.MASTERDATA) {
        if (this.MASTERDATA[property].Items) {
          this.MASTERDATA[property].Items.forEach(item => {
            item.Value = ''
          })
        }
      }
    },
    mapData2MDData () {
      this.DataSubmit.Datas = []
      var obj = {}
      for (const property in this.MASTERDATA) {
        if (this.MASTERDATA[property].Items) {
          this.MASTERDATA[property].Items.forEach(item => {
            var val = item.Value
            if (item.Code === 'IEOHIREANCOUPFANS' || item.Code === 'HLQACT004') {
              val = JSON.stringify(item.Value) || '[]'
            }
            this.DataSubmit.Datas.push({
              Code: item.Code,
              Value: val,
              Group: property
            })
            obj[item.Code] = item.Value
          })
        }
      }
      return obj
    },
    mapData2MDDataBraden () {
      this.DataSubmit.Datas = []
      var obj = {}
      for (const property in this.MASTERDATA) {
        if (this.MASTERDATA[property].Items) {
          this.MASTERDATA[property].Items.forEach(item => {
            var val = item.Value
            if (item.Code === 'IEOHIREANCOUPFANS') {
              val = JSON.stringify(item.Value) || '[]'
            }
            if (item.DataType === 'Checkbox') {
              if (!item.Value) {
                val = ''
              }
            }
            this.DataSubmit.Datas.push({
              Code: item.Code,
              Value: val,
              Group: property
            })
            obj[item.Code] = item.Value
          })
        }
      }
      return obj
    },
    mapMdData2Data () {
      for (const property in this.MASTERDATA) {
        if (this.MASTERDATA[property].Items) {
          this.MASTERDATA[property].Items.forEach(item => {
            var code = item.Code
            var exited = _.find(this.DataSubmit.Datas, {Code: code})
            if (exited) {
              if (this.checkString(item.DataType, 'CheckBox') || this.checkString(item.DataType, 'Radio')) {
                var isTrue = (exited.Value === 'True')
                item.Value = isTrue
              } else if (exited.Value && (item.Code === 'IEOHIREANCOUPFANS')) {
                item.Value = this.JSONParse(exited.Value, true)
              } else {
                item.Value = exited.Value
              }
            } else {
            }
            if (code === 'IPDDGRLNNGDGANS' && !item.Value) item.Value = moment(new Date()).format(this.vDateTimeFormat)
          })
        }
      }
      setTimeout(() => {
        this.edited = false
      }, 500)
    }
  }
}
