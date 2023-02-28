<template>
  <div>
    <p v-if="!formatDate" class="bold-label fw600 fs16 mrb10">{{label}}</p><p class="text-right" v-if="!formatDate">{{value ? value : 'N/A'}}</p><br>
    <p v-if="formatDate" class="bold-label fw600 fs16 mrb10">{{label}}</p><p class="text-right" v-if="formatDate">{{getDate(value)}}</p><br>
  </div>
</template>
<script>
import moment from 'moment'

export default {
  name: 'TextFillView',
  props: {
    label: {
      type: String,
      default: ''
    },
    value: {
      type: String,
      default: ''
    },
    formatDate: {
      type: String,
      default: ''
    }
  },
  computed: {
  },
  methods: {
    getDate (value) {
      let date = 'N/A'
      if (value) {
        date = moment(value).format(this.formatDate)
      }
      return date
    }
  }
}
</script>
<style scoped>
  .bold-label {
    color: black;
    display: inline-block;
    margin-right: 20px;
    margin-bottom: 0px;
  }
  .text-right {
    display: inline-block;
    margin-bottom: 0px;
  }
</style>
