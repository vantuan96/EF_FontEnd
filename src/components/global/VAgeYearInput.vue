<template>
<div>
  <div v-if="print">
    <CharWithSquare :text="value2.replace(/[^\w\s]/gi, '')" :defaultlength="defaultlength" />
    <div class="float-right" v-if="showAge"><CharWithSquare :text="age" :defaultlength="2"  /></div>
  </div>
  <div v-if="!getage" class="form-group">
    <div class="flex-box flex-center">
      <span class="text-left no-wrap lb-w2" :class="boldLb ? 'fw600' : null">{{__label(label)}}:</span>
      <div class="input-group" :style="width ? null : 'flex-grow: 1'">
        <VNumberInput :getyear="true" :readonly="readonly" class="input-para" v-model="value2" :placeholder="'YYYY'"/>
        <span class="input-group-addon" style="background-color: #eee">{{age}} {{___t('tuổi')}}</span>
      </div>
    </div>
  </div>
  <span v-if="getage">{{(age && age !== 'N/A') ? age : ''}}</span>
</div>
</template>
<script>
import VDateTimePicker from '@/components/VDateTimePicker.vue'
export default {
  name: 'VAgeYearInput',
  props: ['value', 'hideLabel', 'label', 'readonly', 'print', 'showAge', 'defaultlength', 'width', 'boldLb', 'getage', 'DateOfBirth'],
  components: {
    VDateTimePicker
  },
  watch: {
    value (val) {
      this.value2 = val
    },
    value2 (val) {
      this.$emit('input', (val))
    }
  },
  data () {
    return {
      value2: ''
    }
  },
  created () {
    this.value2 = this.value
  },
  computed: {
    age () {
      if (this.value2) {
        var now = new Date()
        var y = now.getFullYear()
        if (this.DateOfBirth) {
          return parseInt(this.value2) - parseInt(this.DateOfBirth)
        }
        return y - parseInt(this.value2)
      }
      return 'N/A'
    }
  },
  methods: {
  }
}
</script>
