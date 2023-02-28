<template>
  <div class="flex-box flex-center">
    <label :style="`width: ${widthLabel}`">{{label}}</label>
    <input class="form-control" :style="`width: ${widthInput}`" :class="fullSize ? 'full-size' : ''" type="text" v-model="value2" :placeholder="placeholder">
  </div>
</template>
<script>

export default {
  name: 'MdMiniInputText',
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
    label: {
      type: String,
      default: ''
    },
    fullSize: {
      type: Boolean,
      default: false
    },
    widthLabel: {
      type: String,
      default: '50px'
    },
    widthInput: {
      type: String,
      default: '200px'
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
  }
}
</script>
<style scoped>
  .form-control {
    width: unset;
  }
  .full-size {
    width: 100%!important;
  }
</style>
