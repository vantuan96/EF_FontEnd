<template>
  <div class="main-content disable_ccp" id="etr-page">
    <div v-if="DataSubmit && data">
      <print-phr :data="data" :DataSubmit="DataSubmit" :MASTERDATA="MASTERDATA"/>
    </div>
    <div v-else class="loading-text"><v-loading/></div>
  </div>
</template>
<script>
/* ============
 * Add cusotmer Page
 * ============
 *
 * The home index page.
 */

import PatientHandOverRecord from '@/services/ED/PatientHandOverRecord'
import HandOverCheckList from '@/services/ED/HandOverCheckList'
import moment from 'moment'
// const isDate = (value) => !helpers.req(value) || moment(value, 'DD-MM-YYYY', true).isValid()
import MixinMasterData from '@/mixins/masterdata.js'
import _ from 'lodash'
import $ from 'jquery'
import PrintPhr from '@/components/ED/PRINT_PHR.vue'
import storage from '@/lib/storage'
import EventBus from '@/lib/eventBus'

export default {
  /**
   * The name of the page.
   */
  name: 'HandOverCheckList1',
  props: ['VisitId'],
  data () {
    return {
      data: {},
      DataSubmit: null
    }
  },
  mixins: [MixinMasterData],
  /**
   * The components that the page can use.
   */
  components: {
    PrintPhr
  },
  mounted () {
    this.getData()
    this.getHandOverCheckList()
    $('.disable_ccp' + (storage.get('allowcopypaste') ? 'fc' : '')).bind('cut copy paste', e => {
      this.toastedError('Bạn không thể thực hiện thao tác này trên hệ thống!')
      return false
    })
  },
  computed: {
  },
  methods: {
    getHandOverCheckList () {
      this.getMasterDatas({Form: 'HOC'}, () => {
        new HandOverCheckList().find(this._VisitId).then(response => {
          this.DataSubmit = response
          EventBus.$emit('getHandOverCheckList', response)
          if (!this.DataSubmit.HandOverTimeNurse) {
            // this.DataSubmit.HandOverTimeNurse = moment(new Date()).format(this.vDateTimeFormat)
          } else {
            this.DataSubmit.HandOverTimeNurse = moment(this.DataSubmit.HandOverTimeNurse, this.vDateTimeFormat)
          }
          for (const property in this.MASTERDATA) {
            if (this.MASTERDATA[property].Items) {
              this.MASTERDATA[property].Items.forEach(item => {
                var code = item.Code
                var exited = _.find(this.DataSubmit.Datas, {Code: code})
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
        }).catch(e => {
          if (e.status) {
            alert('pl')
          }
        })
      })
    },
    getData () {
      new PatientHandOverRecord().find(this._VisitId).then(response => {
        if (response.IsUseHandOverCheckList) {
          this.data = response
        }
        // if (!this.data.HandOverTimePhysician) {
        //   this.data.HandOverTimePhysician = new Date()
        // } else {
        //   this.data.HandOverTimePhysician = moment(this.data.HandOverTimePhysician, this.vDateTimeFormat)
        // }
      }).catch(e => {
        console.log('abc')
        if (e.status) {
          // this.go2Home()
        }
      })
    }
  }
}
</script>
