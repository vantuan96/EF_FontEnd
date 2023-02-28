<template>
  <span class="wap-datepicker">
    <input v-model="input" />
    <div class="ext-btn">
      <span class="glyphicon glyphicon-time icon-now" @click="setNow()"></span>
    </div>
  </span>
</template>
<script>
import DatePicker from 'vue2-datepicker'
import moment from 'moment'
export default {
  name: 'v-dateTimePicker',
  props: ['value', 'placeholder', 'format'],
  data () {
    return {
      datetime: null,
      input: null
    }
  },
  components: {
    DatePicker
  },
  created () {
    if (this.format) {
      this.vDateFormat = this.format
    }
    // try again
    if (typeof this.value === 'string') {
      this.datetime = moment(this.value, this.vDateFormat, true)
    } else {
      this.datetime = this.value
    }
  },
  computed: {
  },
  watch: {
    value: function (val) {
      this.datetime = val
    }
  },
  methods: {
    setNow () {
      this.datetime = new Date()
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
