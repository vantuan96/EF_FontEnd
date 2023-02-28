<template>
  <FakeInput v-if="readonly" v-model="value2" :nonemargin="nonemargin" />
  <input v-else type="text"
    :disabled="disabled"
    class="form-control"
    :placeholder="placeholder ? placeholder : __t('AdultVitalSigns.placeholder')"
    v-model="value2"
    :maxlength="maxlength"
    @keypress="onlyNumber($event)"
    @keyup="handleChange"
    @keyup.exact.backspace="handleDelete"
    />
</template>
<script>
export default {
  name: 'VNumberInput',
  props: {
    value: {
      type: [String, Number],
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    maxlength: {
      type: [String, Number],
      default: '5'
    },
    readonly: {
      type: [Boolean, String, Object],
      default: false
    },
    decimal: {
      type: Boolean,
      default: false
    },
    getyear: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    nonemargin: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    value (val) {
      this.value2 = val
    },
    value2 (val) {
      if (this.getyear) {
        var now = new Date()
        var y = now.getFullYear()
        if (y < parseInt(val)) {
          val = ''
        }
      }
      this.$emit('input', (val))
    }
  },
  data () {
    return {
      value2: ''
    }
  },
  created () {
    if (!isNaN(Number(this.value))) {
      this.value2 = this.value
    } else {
      this.value2 = ''
    }
  },
  methods: {
    onlyNumber (event) {
      let keyCode = event.keyCode ? event.keyCode : event.which
      if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) {
        event.preventDefault()
      }
      if (event.key === '.' && !this.decimal) {
        event.preventDefault()
      }
    },
    handleChange () {
      this.$emit('change', (this.value2))
    },
    handleDelete () {
      this.$emit('remove')
    }
  }
}
</script>
