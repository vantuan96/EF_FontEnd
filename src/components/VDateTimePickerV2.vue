<template>
  <span v-if="readonly" class="fake-input disable no-wrap ">{{datetime || 'N/A'}}</span>
  <span v-else class="wap-datepicker">
    <date-picker
      tabindex="-1"
      :editable="false"
      :value-type="'format'"
      :disabled-date="notAfterToday"
      :disabled-time="notAfterNow"
      @input="emitData"
      @blur="change"
      class="v-datetime"
      type="datetime"
      v-model="datetime"
      :placeholder="placeholder || __t('Chọn ngày')"
      :format="vDateFormat"
      :clearable="!noclearable"
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

// const today = new Date()
// today.setHours(0, 0, 0, 0)
export default {
  name: 'VDateTimePickerV2',
  props: ['value', 'items', 'placeholder', 'multi', 'format', 'allday', 'hideTooltip', 'noclearable', 'readonly', 'max', 'min'],
  data () {
    return {
      today: null,
      datetime: new Date(),
      locale: 'vi'
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
    notAfterNow (date) {
      return this.minutesOfDay(date) < this.minutesOfDay(new Date())
    },
    minutesOfDay (m) {
      return m.getMinutes() + m.getHours() * 60
    },
    notAfterToday (date) {
      return (date) < new Date(new Date().setHours(0, 0, 0, 0))
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
    }
  }
}
</script>
