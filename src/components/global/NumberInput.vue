<template>
  
</template>
<script>
export default {
  name: 'NumberInput',
  props: ['value'],
  mixins: [],
  watch: {
    value: function (val) {
      this.$emit('input', this.value)
    }
  },
  created () {
  },
  methods: {
  }
}
</script