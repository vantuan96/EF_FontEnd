<template>
  <div v-if="loaded">
    <div><b>{{__t('Đánh giá người bệnh')}}</b></div>
    <div>- {{__label(TMPMD['IPDTCOPWC19HH'])}}: <i>{{getRadioValue('IPDTCOPWC19HH', [0, 1, 2])}}{{getValueOfTMPMD('IPDTCOPWC19HH', 'IPDTCOPWC19HH5')}}</i></div>
    <div>- {{__label(TMPMD['IPDTCOPWC19DN'])}}: <i>{{getRadioValue('IPDTCOPWC19DN', [0, 1, 2])}}{{getValueOfTMPMD('IPDTCOPWC19DN', 'IPDTCOPWC19DN5')}}</i></div>
    <div>
      - {{__label(TMPMD['IPDTCOPWC19DD'])}}: <i>{{getRadioValue('IPDTCOPWC19DD', [0, 2, 4])}} {{getTextValue('IPDTCOPWC19DD')}}</i>
    </div>
    <div>- {{__label(TMPMD['IPDTCOPWC19TCK'])}}: <i>{{getRadioValue('IPDTCOPWC19TCK')}}{{getCustomText(TMPMD['IPDTCOPWC19TCK'].Items[6].Value)}}</i></div>
    <div><b>{{__t('Chăm sóc')}}</b></div>
    <div>
      - {{__label(TMPMD['IPDTCOPWC19HTHH'])}}: <i>{{getRadioValue('IPDTCOPWC19HTHH')}} {{getTextValue('IPDTCOPWC19HTHH')}}</i>
    </div>
    <div>
      - {{__label(TMPMD['IPDTCOPWC19CSCB'])}}: <i>{{getRadioValue('IPDTCOPWC19CSCB')}}</i>
    </div>
    <div>- {{__label(TMPMD['IPDTCOPWC19CSK'])}}: <i>{{getRadioValue('IPDTCOPWC19CSK')}}{{getCustomText(TMPMD['IPDTCOPWC19CSK'].Items[2].Value)}}</i></div>
  </div>
</template>
<script>
import _ from 'lodash'
export default {
  name: 'TakeCareOfPatientsWithCovid19FormView',
  props: ['Datas', 'MASTERDATA', 'readonly'],
  data () {
    return {
      TMPMD: {},
      loaded: false
    }
  },
  mounted () {
    this.TMPMD = this.cloneObj(this.MASTERDATA)
    setTimeout(() => {
      this.mapMdData2Data()
    }, 100)
  },
  components: {
  },
  methods: {
    hasData (code) {
      return true
    },
    getValueOfTMPMD (group, code) {
      if (!this.TMPMD[group]) return null
      var item = this.TMPMD[group].Items.find(e => e.Code === code) || {}
      return item.Value
    },
    getRadioValue (code, indexs) {
      var arr = []
      if (this.TMPMD[code]) {
        this.TMPMD[code].Items.forEach((item, index) => {
          if ((this.checkString(item.DataType, 'CheckBox') || this.checkString(item.DataType, 'Radio')) && (!indexs || indexs.includes(index))) {
            if (item.Value) arr.push(item.ViName)
          }
        })
      }
      return arr.join(', ')
    },
    getCustomText (val) {
      var items = val ? (this.JSONParse(val, true)) : []
      var str = items.map(e => e.value).join(', ')
      return str ? (', ' + str) : null
    },
    getTextValue (code, indexs) {
      var arr = []
      if (this.TMPMD[code]) {
        this.TMPMD[code].Items.forEach((item, index) => {
          if (this.checkString(item.DataType, 'Text') && (!indexs || indexs.includes(index))) {
            if (item.Value) arr.push(item.Value)
          }
        })
      }
      var str = arr.join(', ')
      return str ? ('(' + str + ')') : null
    },
    mapMdData2Data () {
      for (const property in this.TMPMD) {
        if (this.TMPMD[property].Items) {
          this.TMPMD[property].Items.forEach(item => {
            var code = item.Code
            var exited = _.find(this.Datas, {Code: code})
            if (exited) {
              if (this.checkString(item.DataType, 'CheckBox') || this.checkString(item.DataType, 'Radio')) {
                var isTrue = (exited.Value === 'True')
                item.Value = isTrue
              } else {
                item.Value = exited.Value
              }
            }
          })
        }
      }
      this.loaded = true
    }
  }
}
</script>
