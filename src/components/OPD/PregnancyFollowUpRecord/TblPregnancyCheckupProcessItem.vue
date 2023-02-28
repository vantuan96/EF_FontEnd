<template>
  <tr v-if="loaded && !print">
    <td :key="index" v-for="(item, index) in md.Items" v-if="!indexs || indexs.includes(index)" style="position: relative;">
      <template v-if="index === 0 && !viewOnly">
        <button @click="remove" class="btn-pos-left"><i aria-hidden="true" class="fa fa-trash"></i></button>
      </template>
      <input
        class="form-control"
        v-model="item.Value"
        :placeholder="__t('Nhập')"
        v-if="item.DataType === 'Text' && !item.Note"
        :readonly="viewOnly"
      />
      <MDText v-if="item.DataType === 'TextArea'" :readonly="viewOnly" rows="1" :placeholder="__t('Nhập')" v-model="item.Value" />
      <div v-if="item.DataType === 'GA'" class="d-flex flex-center">
        <MDText v-if="item.DataType === 'GA'" :readonly="viewOnly" rows="1" :placeholder="__t('Nhập')" v-model="item.Value"/>
        <p class="ml-5 mb-0 no-wrap">/ 7</p>
      </div>
      <div v-if="!item.DataType">
        <v-date-time-picker v-if="!viewOnly" :type="formatTime ? 'date' : ''" :hideTooltip="true" v-model="item.Value" :format="formatTime ? formatTime :vDateTimeFormat"/>
        <p v-else class="fake-input disable full-width" style="margin: 0">{{item.Value || 'N/A'}}</p>
      </div>
      <div v-if="item.Note === 'getCreatedAt'" class="text-center">
        <ad-Info v-if="item.Value" :ad="item.Value" />
      </div>
      <div v-if="item.Note === 'VisitCode'">
        <p v-if="item.Value" class="fake-input disable">{{item.Value}}</p>
      </div>
      <div class="mt-5" v-if="item.Code === 'PRFOURE112'">
        <MDText v-if="item.DataType === 'TextArea'" :readonly="viewOnly" rows="1" :placeholder="__t('Nhập')" v-model="item.Items[0].Value" />
      </div>
    </td>
  </tr>
</template>
<script>
import _ from 'lodash'
import VDateTimePicker from '@/components/VDateTimePicker.vue'
import moment from 'moment'
export default {
  name: 'TblPregnancyCheckupProcessItem',
  props: [
    'MASTERDATA',
    'value',
    'readonly',
    'indexRow',
    'print',
    'ontop',
    'indexs',
    'formatTime',
    'checkUserEdit',
    'dontGetDate'
  ],
  components: {
    VDateTimePicker
  },
  data () {
    return {
      data: false,
      md: {},
      loaded: false,
      viewOnly: false
    }
  },
  watch: {
    md: {
      handler () {
        if (this.loaded) this.emitData()
      },
      deep: true
    }
  },
  created () {
    this.md_ = this.cloneObj(this.MASTERDATA)
    if (this.md_.Items) {
      this.md_.Items.forEach((item) => {
        var code = item.Code
        var exited = _.find(this.value, { Code: code })
        if (exited) {
          if (this.checkString(item.DataType, 'CheckBox') || this.checkString(item.DataType, 'Radio')) {
            item.Value = exited.Value === 'True' || exited.Value === 'true'
          } else {
            if (item.Code === 'PRFOURE112') {
              item.Items[0].Value = exited.Items[0].Value
            }
            item.Value = exited.Value
          }
          item.Id = exited.Id
        } else {
          item.Value = null
        }
        if (!item.DataType && !item.Value && !this.readonly && !this.dontGetDate) {
          item.Value = moment(new Date()).format(this.formatTime || 'HH:mm DD/MM/YYYY' || 'DD/MM/YYYY')
          setTimeout(() => {
            this.emitData()
          }, 200)
        }
        if (item.DataType === 'Text' && item.Note === 'getCreatedAt') {
          if (!item.Value) {
            item.Value = this.$store.state.account.Username
          }
        }
        if (item.DataType === 'Text' && item.Note === 'VisitCode') {
          if (!item.Value) {
            item.Value = this.CurrentPatientObj.VisitCode
          }
        }
        if (!item.VisitId && exited) {
          item.VisitId = exited.VisitId
        }
      })
    }
    this.md = this.md_
    setTimeout(() => {
      this.loaded = true
    }, 100)
  },
  mounted () {
    if (this.checkUserEdit) {
      setTimeout(() => {
        this.checkUserEdit2()
      }, 500)
    }
    if (this.readonly) {
      this.viewOnly = this.readonly
    }
  },
  methods: {
    remove () {
      this.$emit('onDelete')
    },
    emitData () {
      this.$emit('input', this.md.Items)
    },
    handleChange (val) {
      this.md.Items.find(e => {
        if (e.DataType === 'RadioGroup') {
          if (e.Value === val.toString()) {
            setTimeout(() => {
              e.Value = ''
            }, 100)
            console.log('e: ', e)
          }
        }
      })
    },
    checkUserEdit2 () {
      this.md.Items.find(e => {
        if (e.Note === 'getCreatedAt' && e.Value) {
          if (e.Value !== this.$store.state.account.Username) this.viewOnly = true
        }
        if (e.Code === 'PRFOURE106' && e.VisitId) {
          if (e.VisitId !== this.$route.params.Id) this.viewOnly = true
        }
      })
    }
  }
}
</script>
<style scoped>
input[type=checkbox]:checked:disabled + label:before {
  transform: scale(1);
  background-color: #aaa!important;
  border-color: #aaa!important;
}
input[type=radio]:checked:disabled + label:before {
  transform: scale(1);
  background-color: #aaa!important;
  border-color: #aaa!important;
}
</style>
