<template>
  <div>
    <v-masked-input @change="checkValue" :readonly="readonly" :placeholder="placeholder ? placeholder : '..h..'" mask="11:11" class="form-control w160" v-model="value2" />
  </div>
</template>
<script>
export default {
  name: 'VMaskedDateInput',
  props: ['placeholder', 'readonly', 'value'],
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
  methods: {
    checkValue (e) {
      // 1_:__
      if (isNaN(Number(this.value2.split('')[0]))) {
        if (parseInt(e.key) > 2) {
          e.preventDefault()
        }
      }
      // _1:__
      if (!isNaN(Number(this.value2.split('')[0])) && isNaN(Number(this.value2.split('')[1]))) {
        if (parseInt(this.value2.split('')[0]) > 1 && parseInt(e.key) > 3) {
          e.preventDefault()
        }
      }
      // __:1_
      if (!isNaN(Number(this.value2.split('')[1])) && isNaN(Number(this.value2.split('')[3]))) {
        if (parseInt(e.key) > 5) {
          e.preventDefault()
        }
      }
    }
  }
}
</script>
