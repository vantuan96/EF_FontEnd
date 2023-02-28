<template>
  <p v-if="readonly" class="fake-input disable full-width" :class="viewmrb ? 'mrb10' : ''" style="margin: 0">{{__t(value2) || 'N/A'}}</p>
  <textarea-autosize :disabled="disabled" v-else class="form-control" :rows="rows ? rows : 3" :placeholder="placeholder" v-model="value2"/>
</template>
<script>
export default {
  name: 'MDText',
  props: ['readonly', 'rows', 'placeholder', 'value', 'disabled', 'viewmrb'],
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
