<template>
  <div class="flex align-center" :style="`width: ${width ? width : '50%'}`">
    <div :style="widthLabel" class="mrr20" v-if="!hideLabel">{{__label(label)}}</div>
    <div>
      <v-date-time-picker :type="!format ? 'date' : ''" @change="handleChange" :checkDate="checkDate" :readonly="readonly" :hideTooltip="true" v-model="value2" :format="format ? format : vDateFormat"/>
    </div>
  </div>
</template>
<script>
import VDateTimePicker from '@/components/VDateTimePicker.vue'
import moment from 'moment'
export default {
  name: 'VDateTimeInput',
  props: ['value', 'width', 'readonly', 'hideLabel', 'label', 'format', 'checkDate', 'widthLabel'],
  components: {
    VDateTimePicker
  },
  watch: {
    value (val) {
      this.value2 = val
    },
    value2 (val) {
      this.$emit('input', (val))
    },
    checkDate (val) {
      if (new Date(moment(val, 'DD/MM/YYYY')) > new Date(moment(this.value2, 'DD/MM/YYYY'))) {
        this.value2 = ''
      }
    }
  },
  data () {
    return {
      value2: ''
    }
  },
  created () {
    this.value2 = this.value
    // if (new Date(moment(this.checkDate, 'DD/MM/YYYY')) > new Date(moment(this.value, 'DD/MM/YYYY'))) {
    //   this.value2 = ''
    // }
  },
  methods: {
    handleChange () {
      this.$emit('change')
    }
  }
}
</script>
