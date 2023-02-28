<template>
  <div>
    <Diorpt v-if="data" :dataJson="data" @copy="copyToIPDMRPETTKQ" :hasFormat="true" />
    <p class="text-right"><template v-if="syncAt"><i aria-hidden="true" class="fa fa-check v-green"></i> {{__t('Đồng bộ lần cuối lúc')}}: {{syncAt | formatDateTime('HH:mm:ss DD/MM/YYYY')}}</template><template v-else>Đang tải...</template></p>
  </div>
</template>
<script>
import MedicalRecord from '@/services/IPD/MedicalRecord'
import Diorpt from '@/components/OPD/DI0RPT.vue'
export default {
  name: 'IPDDiorpt',
  props: ['value', 'VisitId'],
  data () {
    return {
      data: null,
      syncAt: null,
      strValue: ''
    }
  },
  components: {
    Diorpt
  },
  watch: {
    value: function (val) {
      this.strValue = this.value
    }
  },
  mounted () {
    this.strValue = this.value
    this.SyncPrincipalTest()
  },
  methods: {
    mapCDHAStr (oldstr, newstr, type) {
      newstr = '- ' + newstr
      if (type === 1) {
        if (this.hasCDHA(oldstr)) {
          oldstr = oldstr.replace('Kết quả chẩn đoán hình ảnh:', `Kết quả chẩn đoán hình ảnh:\n${newstr}`)
        } else {
          if (this.hasKQXN(oldstr)) {
            oldstr = oldstr + '\nKết quả chẩn đoán hình ảnh:\n' + newstr
          } else {
            oldstr = 'Kết quả chẩn đoán hình ảnh:\n' + newstr + '\n' + oldstr
          }
        }
      }
      if (type === 2) {
        if (this.hasKQXN(oldstr)) {
          oldstr = oldstr.replace('Kết quả xét nghiệm:', `Kết quả xét nghiệm:\n${newstr}`)
        } else {
          oldstr = 'Kết quả xét nghiệm:\n' + newstr + '\n' + oldstr
        }
      }
      this.strValue = this.trim_(oldstr, '\n')
    },
    hasKQXN (str) {
      return str.includes('Kết quả xét nghiệm:')
    },
    hasCDHA (str) {
      return str.includes('Kết quả chẩn đoán hình ảnh:')
    },
    copyToIPDMRPETTKQ (str, type) {
      str = this.trim_(str)
      if (this.strValue && this.strValue.includes(str)) {
      } else {
        var old = this.strValue ? (this.trim_(this.strValue)) : ''
        if (type) {
          this.mapCDHAStr(old, str, type)
        } else {
          this.strValue = this.trim_(old + (str), ', ')
        }
      }
      this.$emit('copy', this.strValue)
      this.toastedInfo('Đã copy')
    },
    SyncPrincipalTest () {
      new MedicalRecord({hidemsg: true, noLoading: true}).update('Part3/SyncPrincipalTest/', {Id: this._VisitId}).then(response => {
        this.syncAt = new Date()
        var val = response
        if (val) {
          this.data = JSON.stringify(val)
        }
        this.IPDMRPETTKQTimeout = setTimeout(() => {
          // this.SyncPrincipalTest()
        }, 10 * 1000)
      })
    }
  }
}
</script>
