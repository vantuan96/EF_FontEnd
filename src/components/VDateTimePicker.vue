<template>
  <span v-if="readonly" class="fake-input disable no-wrap ">{{(datetime && datetime !== 'Invalid date' ? datetime :'') || 'N/A'}}</span>
  <span v-else class="wap-datepicker">
    <date-picker
      :id="code"
      tabindex="-1"
      :editable="false"
      :value-type="format"
      :disabled-date="notAfterToday"
      :disabled-time="notAfterTime"
      @input="emitData"
      @blur="change"
      class="v-datetime"
      :type="type ? type : 'datetime'"
      v-model="datetime"
      :placeholder="placeholder || __t('Chọn ngày')"
      :format="vDateFormat"
      :clearable="!noclearable"
      :lang="locale"
      @change="changeData"
      >
    </date-picker>
    <div class="ext-btn">
      <span class="glyphicon glyphicon-time icon-now" @click="setNow()"></span>
    </div>
  </span>
</template>
<script>
import DatePicker from 'vue2-datepicker'
import moment from 'moment'

// const today = new Date()
// today.setHours(0, 0, 0, 0)
export default {
  name: 'v-datepicker',
  props: ['value', 'items', 'placeholder', 'multi', 'format', 'allday', 'hideTooltip', 'noclearable', 'readonly', 'max', 'min', 'checkDate', 'type', 'code'],
  data () {
    return {
      today: null,
      datetime: null,
      locale: 'vi',
      minDate: null
    }
  },
  components: {
    DatePicker
  },
  created () {
    this.locale = this.$i18n.locale
    this.today = new Date()
    if (this.format) {
      this.vDateFormat = this.format
    }
    if (moment.isMoment(this.value)) {
      this.datetime = this.value.format(this.format || 'HH:mm DD/MM/YYYY')
    } else if (typeof this.value === 'object') {
      this.datetime = moment(this.value).format(this.format || 'HH:mm DD/MM/YYYY')
    } else {
      this.datetime = this.value
    }
  },
  computed: {
  },
  watch: {
    value: function (val) {
      if (moment.isMoment(val)) {
        this.datetime = val.format(this.format || 'HH:mm DD/MM/YYYY')
      } else if (typeof val === 'object') {
        this.datetime = moment(val).format(this.format || 'HH:mm DD/MM/YYYY')
      } else {
        this.datetime = val
      }
    }
  },
  methods: {
    notAfterToday (date) {
      if (this.checkDate) {
        return (date <= new Date(moment(this.checkDate, 'DD/MM/YYYY')) || date >= this.today)
      }
      if (this.max) return date > moment(this.max, 'HH:mm DD/MM/YYYY')
      if (this.min) {
        return date <= new Date(moment(this.min, 'HH:mm DD/MM/YYYY').add('days', -1).format('YYYY-MM-DD HH:mm').toString().replace(' ', 'T'))
      }
      if (this.allday === 'allday') {
        return false
      }

      return date > this.today
    },
    notAfterTime (date) {
      if (this.min) {
        var hour = new Date(moment(this.min, 'HH:mm DD/MM/YYYY').format('YYYY-MM-DD HH:mm').toString().replace(' ', 'T')).getHours()
        var minute = new Date(moment(this.min, 'HH:mm DD/MM/YYYY').format('YYYY-MM-DD HH:mm').toString().replace(' ', 'T')).getMinutes()
        return date <= new Date(moment(this.min, 'HH:mm DD/MM/YYYY').format('YYYY-MM-DD HH:mm').toString().replace(' ', 'T')).setHours(hour, minute, 0, 0)
      }
      if (this.allday === 'allday') {
        return false
      }
      return date > this.today
    },
    defaultValue () {
      if (this.min) {
        return new Date(moment(this.min, 'HH:mm DD/MM/YYYY').add('days', -1).format('YYYY-MM-DD HH:mm').toString().replace(' ', 'T'))
      }
    },
    setNow () {
      this.datetime = moment(new Date()).format(this.format || 'HH:mm DD/MM/YYYY' || 'DD/MM/YYYY')
      this.emitData()
    },
    emitData () {
      this.$emit('input', this.datetime)
    },
    change (date, type) {
      // this.$emit('change', this.datetime)
    },
    changeData () {
      this.$emit('change', this.datetime)
    }
  }
}
</script>
