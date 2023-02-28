<template>
  <div>
    <div>
      <input v-if="editlabel" class="mini-input-sl" v-model="dataInput.label"/>
      <template v-else>{{dataInput.label}}</template>
    </div>
    <template v-for="(inpt, index) in dataInput.inputs">
      <span :key="index" :data="inpt"><input type="text" class="mini-input-s" v-model="dataInput.inputs[index]" /> {{units[index]}}</span>
    </template>
  </div>
</template>
<script>
export default {
  name: 'MedicationInfusion',
  props: ['value', 'editlabel'],
  data () {
    return {
      dataInput: {
        inputs: ['0', '0', '0']
      },
      units: ['mg/', 'ml;', 'ml/h']
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
      if (!this.dataInput.inputs || this.dataInput.inputs.length === 0) {
        this.dataInput.inputs = ['0', '0', '0']
      }
    }
  }
}
</script>
