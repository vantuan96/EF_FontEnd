<template>
  <FakeInput v-if="readonly" v-model="value2" />
  <input v-else type="text"
    :onInput2="!decimal && !pulse && value2 ? value2 = parseInt(value2) : value2"
    :id="code"
    class="form-control number-input"
    :placeholder="placeholder ? placeholder : __t('AdultVitalSigns.placeholder')"
    v-model="value2"
    :maxlength="maxlength"
    @keypress="onlyNumber($event)"
  />
</template>
<script>
export default {
  name: 'MDNumberInput',
  props: {
    value: {
      type: [String, Number],
      default: '',
      required: true
    },
    placeholder: {
      type: String,
      default: ''
    },
    readonly: {
      type: Boolean,
      default: false
    },
    code: {
      type: String,
      default: ''
    },
    decimal: {
      type: Boolean,
      default: false
    },
    pulse: {
      type: Boolean,
      default: false
    },
    realNumber: {
      type: Boolean,
      default: false
    },
    maxlength: {
      type: [String, Number],
      default: '5'
    },
    limitDecimal: {
      type: Boolean,
      default: false
    },
    limitDecimalNumber: {
      type: Number,
      default: 1
    }
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
  methods: {
    onlyNumber (event) {
      const fNumber = event.target._value
      let keyCode = event.keyCode ? event.keyCode : event.which
      if ((keyCode < 48 || keyCode > 57) && keyCode !== 46 && keyCode !== 47 && keyCode !== 45 && keyCode !== 43) {
        event.preventDefault()
      }
      if (event.key === '.' && !this.decimal) {
        event.preventDefault()
      }
      if (event.key === '/' && !this.pulse) {
        event.preventDefault()
      }
      if ((event.key === '-' || event.key === '+') && !this.realNumber) {
        event.preventDefault()
      }
      if (event.key === '.') {
        if (!fNumber.split('.')[0]) {
          event.preventDefault()
        }
      }
      if (fNumber.toString().includes('.') && this.decimal) {
        if (this.maxlength >= 20) {
          if (fNumber.split('.')[1].length >= 10) {
            event.preventDefault()
          }
        }
        if (this.limitDecimal === true) {
          if (fNumber.split('.')[1].length >= this.limitDecimalNumber) {
            event.preventDefault()
          }
        }
        if (event.key === '.') {
          event.preventDefault()
        }
      }
    }
  }
}
</script>
