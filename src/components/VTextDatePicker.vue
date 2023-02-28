<template>
  <span class="wap-datepicker">
    <date-picker @input="emitData" @blur="change" class="v-datetime" type="datetime" v-model="datetime" :placeholder="__t('Chọn ngày')" :format="formatDt" :lang="locale"></date-picker>
    <div class="ext-btn">
      <span class="glyphicon glyphicon-time icon-now" @click="setNow()"></span>
    </div>
    <input type="text" v-model="ouput" />
  </span>
</template>
<script>
import DatePicker from 'vue2-datepicker'
import moment from 'moment'
export default {
  name: 'v-datepicker',
  props: ['value', 'items', 'placeholder', 'multi', 'format'],
  data () {
    return {
      datetime: null,
      formatDt: null,
      ouput: null,
      locale: 'vi'
    }
  },
  components: {
    DatePicker
  },
  created () {
    this.locale = this.$i18n.locale
    this.setValueInput()
  },
  computed: {
  },
  watch: {
    datetime: function (val) {
      this.ouput = moment(this.val).format(this.formatDt)
      this.emitData()
    },
    value: function (val) {
      this.datetime = moment(this.val, this.formatDt, true).format()
    }
  },
  methods: {
    setValueInput () {
      this.formatDt = this.format
      this.datetime = moment(this.value, this.formatDt, true).format()
      this.ouput = this.value + ''
    },
    setNow () {
      this.datetime = new Date()
      this.ouput = moment(this.datetime).format(this.formatDt)
      this.emitData()
    },
    emitData () {
      this.$emit('input', this.ouput)
    },
    change (date, type) {
    }
  }
}
</script>
