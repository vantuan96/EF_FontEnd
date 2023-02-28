<template>
<div>
  <div v-if="print">
    <CharWithSquare :text="value2.replace(/[^\w\s]/gi, '')" :defaultlength="defaultlength" />
    <div class="float-right" v-if="showAge"><CharWithSquare :text="age" :defaultlength="2"  /></div>
  </div>
  <div v-if="getyear" class="form-group">
    <div class="flex-box flex-center">
      <div class="mrr5" :class="boldLb ? 'fw600' : null">{{__label(label)}}:</div>
      <div class="input-group" :style="width ? null : 'flex-grow: 1'">
        <VNumberInput :getyear="getyear" :readonly="readonly" class="input-para" v-model="value2" :placeholder="'YYYY'"/>
        <span class="input-group-addon" style="background-color: #eee">{{age}} {{__t('tuổi')}}</span>
      </div>
    </div>
  </div>
  <span v-if="getage">{{(age && age !== 'N/A') ? age : ''}}</span>
  <div v-if="!print && !getage && !getyear" class="form-group">
    <div class="flex-box flex-center">
      <div class="mrr5" :class="boldLb ? 'fw600' : null">{{__label(label)}}:</div>
      <div class="input-group" :style="width ? null : 'flex-grow: 1'">
        <input v-if="readonly" :style="width ? `width: ${width}` : null" readonly v-model="value2" :placeholder="vDateFormat" class="form-control" />
        <v-masked-input v-else :style="width ? `width: ${width}` : null" mask="11/11/1111" v-model="value2" :placeholder="vDateFormat" class="form-control" />
        <span class="input-group-addon" style="background-color: #eee">{{age}} {{__t('tuổi')}}</span>
      </div>
    </div>
  </div>
</div>
</template>
<script>
import VDateTimePicker from '@/components/VDateTimePicker.vue'
export default {
  name: 'VAgeInput',
  props: ['value', 'hideLabel', 'label', 'readonly', 'print', 'showAge', 'defaultlength', 'width', 'boldLb', 'getage', 'getyear', 'DateOfBirth'],
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
        if (this.getyear) {
          if (this.DateOfBirth) {
            return parseInt(this.value2) - parseInt(this.DateOfBirth)
          }
          return y - parseInt(this.value2)
        } else {
          var dob = this.value2.split('/')
          return y - parseInt(dob[2])
        }
      }
      return 'N/A'
    }
  },
  methods: {
  }
}
</script>
