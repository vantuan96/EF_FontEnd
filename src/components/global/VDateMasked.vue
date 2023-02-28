<template>
  <span class="wap-datepicker">
    <date-picker
      :editable="false"
      :value-type="'format'"
      :disabled-date="notAfterToday"
      :disabled-time="notAfterToday"
      @input="emitData"
      @blur="change"
      class="v-datetime"
      type="date"
      v-model="datetime"
      :placeholder="placeholder || __t('Chọn ngày')"
      :format="vDateFormat"
      :shortcuts="shortcuts"
      :lang="locale">
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

// today.setHours(0, 0, 0, 0)
export default {
  name: 'VDateMasked',
  props: ['value', 'placeholder'],
  data () {
    return {
      locale: 'vi',
      today: null,
      datetime: null,
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
    if (this.hideTooltip) this.shortcuts = []
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
    // if (typeof this.value === 'string') {
    //   this.datetime = this.value
    // } else {
    //   this.datetime = this.value
    // }
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
      if (this.allday === 'allday') {
        return false
      }
      return date > this.today
    },
    setNow () {
      this.datetime = moment(new Date()).format(this.format || 'HH:mm DD/MM/YYYY')
      this.emitData()
    },
    emitData () {
      this.$emit('input', this.datetime)
    },
    change (date, type) {
    }
  }
}
</script>
