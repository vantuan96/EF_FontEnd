<template>
  <div v-if="loaded">
    <div class="boxxx-body">
      <div><label>{{__label(TMPMD['IPDTCOPRC19TG'])}}</label>: {{getValueOfTMPMD('IPDTCOPRC19TG', 'IPDTCOPRC19TGANS')}}</div>
      <div><label>{{__label(TMPMD['IPDTCOPRC19HH'])}}</label>: {{getValueOfTMPMD('IPDTCOPRC19HH', 'IPDTCOPRC19HHANS')}}</div>
      <template :data="item" v-for="(item, index) in TMPMD['IPDTCOPRC19MH'].Items">
        <span :key="item.Code + '-' +index" class="mr-10"><label>{{__label(item)}}</label> {{item.Value || 'N/A'}} {{__t('Điểm')}}</span>
      </template>
      <div class="row">
        <div class="col-md-12" >
          <label>{{__label(TMPMD['IPDTCOPRC19CT'])}}</label>
          {{getRadioValue('IPDTCOPRC19CT', [0, 1, 2, 3])}} {{getTextValue('IPDTCOPRC19CT', [6])}}
          <div><span>{{__t('TD sinh hiệu mỗi')}}</span> {{TMPMD['IPDTCOPRC19CT'].Items[7].Value || 'N/A'}} {{__t('giờ')}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import _ from 'lodash'
export default {
  name: 'TakeCareOfPatientsWithCovid19',
  props: ['Datas', 'MASTERDATA'],
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
      return str ? (', ' + str) : null
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
