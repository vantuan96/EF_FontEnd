<template>
  <div>
    <input class="mini-input-sl" v-model="dataInput.label"/>
  </div>
</template>
<script>
export default {
  name: 'MedicationBolus',
  props: ['value', 'editlabel'],
  data () {
    return {
      dataInput: {
      }
    }
  },
  watch: {
    value: {
      handler (a, b) {
        this.valueUpdate()
      },
      deep: true
    },
    dataInput: {
      handler (a, b) {
        this.$emit('input', JSON.stringify(this.dataInput))
      },
      deep: true
    }
  },
  created () {
    this.valueUpdate()
  },
  methods: {
    valueUpdate () {
      this.dataInput = this.JSONParse(this.value)
    }
  }
}
</script>
