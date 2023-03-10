<template>
  <span v-if="readonly" class="fake-input disable no-wrap ">{{(datetime && datetime !== 'Invalid date') ? datetime : 'N/A'}}</span>
  <span v-else class="wap-datepicker">
    <date-picker
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
      :disabled="disabled"
      :time-title-format="'DD/MM/YYYY'"
      :shortcuts="showshortcuts ? shortcuts : []"
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
import utils from '@/utils.js'

// const today = new Date()
// today.setHours(0, 0, 0, 0)
export default {
  name: 'v-datepicker5',
  props: ['value',
    'items',
    'placeholder',
    'multi', 'format',
    'allday',
    'hideTooltip',
    'noclearable',
    'readonly',
    'max',
    'min',
    'plain',
    'checkDate',
    'freeDate',
    'type',
    'disabled',
    'customMin',
    'showshortcuts',
    'nobang'
  ],
  data () {
    return {
      today: null,
      datetime: null,
      locale: 'vi',
      minDate: null,
      shortcuts: [
        {
          text: this.__t('Ngày mai'),
          onClick () {
            return utils.getDateByDay(1)
          }
        },
        {
          text: this.__t('5 ngày sau'),
          onClick () {
            return utils.getDateByDay(5)
          }
        },
        {
          text: this.__t('1 tuần sau'),
          onClick () {
            return utils.getDateByDay(7)
          }
        },
        {
          text: this.__t('10 ngày sau'),
          onClick () {
            return utils.getDateByDay(10)
          }
        },
        {
          text: this.__t('1 tháng sau'),
          onClick () {
            return utils.getDateByDay(30)
          }
        },
        {
          text: this.__t('2 tháng sau'),
          onClick () {
            return utils.getDateByDay(60)
          }
        },
        {
          text: this.__t('3 tháng sau'),
          onClick () {
            return utils.getDateByDay(90)
          }
        },
        {
          text: this.__t('6 tháng sau'),
          onClick () {
            return utils.getDateByDay(180)
          }
        },
        {
          text: this.__t('1 năm sau'),
          onClick () {
            return utils.getDateByDay(360)
          }
        }
      ]
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
  mounted () {
    if (this.min) {
      if (typeof this.min === 'object') {
        this.min = moment(this.min).format(this.format || 'HH:mm DD/MM/YYYY')
      }
      if (moment(this.min, 'HH:mm DD/MM/YYYY') >= moment(this.datetime, 'HH:mm DD/MM/YYYY')) {
        this.datetime = null
      }
    }
  },
  watch: {
    value: function (val) {
      if (val === 'Invalid date') {
        val = ''
      }
      if (moment.isMoment(val)) {
        this.datetime = val.format(this.format || 'HH:mm DD/MM/YYYY')
      } else if (typeof val === 'object') {
        this.datetime = moment(val).format(this.format || 'HH:mm DD/MM/YYYY')
      } else {
        this.datetime = val
      }
    },
    datetime: function (val) {
      this.$emit('input', (val))
    },
    min (val) {
      if (moment(val, 'HH:mm DD/MM/YYYY') > moment(this.datetime, 'HH:mm DD/MM/YYYY')) {
        this.datetime = null
      }
    },
    max (val) {
      if (this.nobang) {
        if (moment(val, 'HH:mm DD/MM/YYYY') <= moment(this.datetime, 'HH:mm DD/MM/YYYY')) {
          this.datetime = null
        }
      } else {
        if (moment(val, 'HH:mm DD/MM/YYYY') < moment(this.datetime, 'HH:mm DD/MM/YYYY')) {
          this.datetime = null
        }
      }
    }
  },
  methods: {
    notAfterToday (date) {
      if (this.min && this.max) {
        let toDate = new Date(moment(this.min, 'HH:mm DD/MM/YYYY').add(-1, 'days').format('YYYY-MM-DD HH:mm').toString().replace(' ', 'T'))
        let fromDate = moment(this.max, 'HH:mm DD/MM/YYYY')
        return date >= fromDate || date <= toDate
      }
      if (this.checkDate) {
        return (date < new Date(moment(this.checkDate, 'DD/MM/YYYY')) || date > this.today)
      }
      if (this.max) {
        return date > moment(this.max, 'HH:mm DD/MM/YYYY')
      }
      if (this.min) {
        if (this.allday === 'allday') {
          return date <= new Date(moment(this.min, 'HH:mm DD/MM/YYYY').add(-1, 'days').format('YYYY-MM-DD HH:mm').toString().replace(' ', 'T'))
        }
        return date >= this.today || date <= new Date(moment(this.min, 'HH:mm DD/MM/YYYY').add(-1, 'days').format('YYYY-MM-DD HH:mm').toString().replace(' ', 'T'))
      }
      if (this.allday === 'allday') {
        return false
      }
      return date > this.today
    },
    notAfterTime (date) {
      if (this.min && this.max) {
        let hour = new Date(moment(this.min, 'HH:mm DD/MM/YYYY').format('YYYY-MM-DD HH:mm').toString().replace(' ', 'T')).getHours()
        let minute = new Date(moment(this.min, 'HH:mm DD/MM/YYYY').format('YYYY-MM-DD HH:mm').toString().replace(' ', 'T')).getMinutes()
        let hourMax = new Date(moment(this.max, 'HH:mm DD/MM/YYYY').format('YYYY-MM-DD HH:mm').toString().replace(' ', 'T')).getHours()
        let minuteMax = new Date(moment(this.max, 'HH:mm DD/MM/YYYY').format('YYYY-MM-DD HH:mm').toString().replace(' ', 'T')).getMinutes()
        let toDate = new Date(moment(this.min, 'HH:mm DD/MM/YYYY').format('YYYY-MM-DD HH:mm').toString().replace(' ', 'T')).setHours(hour, minute, 0, 0)
        let fromDate = new Date(moment(this.max, 'HH:mm DD/MM/YYYY').format('YYYY-MM-DD HH:mm').toString().replace(' ', 'T')).setHours(hourMax, minuteMax, 0, 0)
        return date >= fromDate || date <= toDate
      }
      if (this.min) {
        let hour = new Date(moment(this.min, 'HH:mm DD/MM/YYYY').format('YYYY-MM-DD HH:mm').toString().replace(' ', 'T')).getHours()
        let minute = new Date(moment(this.min, 'HH:mm DD/MM/YYYY').format('YYYY-MM-DD HH:mm').toString().replace(' ', 'T')).getMinutes()
        return date < new Date(moment(this.min, 'HH:mm DD/MM/YYYY').format('YYYY-MM-DD HH:mm').toString().replace(' ', 'T')).setHours(hour, minute, 0, 0)
      }
      if (this.max) {
        let hourMax = new Date(moment(this.max, 'HH:mm DD/MM/YYYY').format('YYYY-MM-DD HH:mm').toString().replace(' ', 'T')).getHours()
        let minuteMax = new Date(moment(this.max, 'HH:mm DD/MM/YYYY').format('YYYY-MM-DD HH:mm').toString().replace(' ', 'T')).getMinutes()
        if (this.nobang) {
          return date >= new Date(moment(this.max, 'HH:mm DD/MM/YYYY').format('YYYY-MM-DD HH:mm').toString().replace(' ', 'T')).setHours(hourMax, minuteMax, 0, 0)
        }
        return date > new Date(moment(this.max, 'HH:mm DD/MM/YYYY').format('YYYY-MM-DD HH:mm').toString().replace(' ', 'T')).setHours(hourMax, minuteMax, 0, 0)
      }
      if (this.allday === 'allday') {
        return false
      }
      return date > this.today
    },
    defaultValue () {
      if (this.min) {
        return new Date(moment(this.min, 'HH:mm DD/MM/YYYY').add(-1, 'days').format('YYYY-MM-DD HH:mm').toString().replace(' ', 'T'))
      }
    },
    setNow () {
      this.datetime = moment(new Date()).format(this.format || 'HH:mm DD/MM/YYYY' || 'DD/MM/YYYY')
      if (this.max) {
        if (this.nobang) {
          if (this.datetime >= this.max) {
            this.datetime = ''
          }
        } else {
          if (this.datetime > this.max) {
            this.datetime = ''
          }
        }
      }
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
