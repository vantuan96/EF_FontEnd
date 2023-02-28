<template>
  <span @click="onChange()">
    <input
      type="checkbox"
      :id="'radio-' + value.Code"
      v-model="value.Value"
    >
    <label :for="'radio-' + value.Code">{{__label(value)}}</label>
  </span>
</template>
<script>
export default {
  name: 'MDRadioBox',
  props: ['value'],
  watch: {},
  data () {
    return {
      id: ''
    }
  },
  computed: {},
  created () {
    this.id = this.makeid(5)
  },
  methods: {
    onChange () {
      this.$emit('onChange', this.value)
    }
  }
}
</script>
